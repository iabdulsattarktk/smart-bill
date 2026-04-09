from http.server import BaseHTTPRequestHandler
import json
import os

# Pakistan electricity slab rates (NEPRA 2024-25)
SLAB_RATES = [
    {"min": 0,   "max": 100,  "rate": 7.74},
    {"min": 101, "max": 200,  "rate": 10.06},
    {"min": 201, "max": 300,  "rate": 14.10},
    {"min": 301, "max": 400,  "rate": 16.50},
    {"min": 401, "max": 500,  "rate": 20.00},
    {"min": 501, "max": 600,  "rate": 22.65},
    {"min": 601, "max": 700,  "rate": 25.00},
    {"min": 701, "max": 99999,"rate": 28.00},
]

# Appliance wattage database (watts per hour)
APPLIANCE_WATTS = {
    "ac":          {"inverter": 900,  "non_inverter": 1800},
    "fan":         {"inverter": 30,   "non_inverter": 75},
    "fridge":      {"inverter": 80,   "non_inverter": 180},
    "washing":     {"inverter": 400,  "non_inverter": 700},
    "tv":          {"inverter": 60,   "non_inverter": 120},
    "geyser":      {"inverter": 1500, "non_inverter": 3000},
    "iron":        {"inverter": 1000, "non_inverter": 1000},
    "microwave":   {"inverter": 900,  "non_inverter": 1200},
    "computer":    {"inverter": 150,  "non_inverter": 250},
    "led_bulb":    {"inverter": 10,   "non_inverter": 10},
    "tube_light":  {"inverter": 20,   "non_inverter": 40},
    "pump":        {"inverter": 500,  "non_inverter": 750},
}

# Seasonal multipliers for Pakistan
SEASONAL = {
    1:  0.80,  # January  - Winter
    2:  0.80,  # February - Winter
    3:  0.90,  # March    - Spring
    4:  1.00,  # April    - Warm
    5:  1.15,  # May      - Hot
    6:  1.35,  # June     - Peak Summer
    7:  1.40,  # July     - Peak Summer
    8:  1.35,  # August   - Peak Summer
    9:  1.15,  # September- Post Summer
    10: 0.95,  # October  - Autumn
    11: 0.85,  # November - Cool
    12: 0.80,  # December - Winter
}

def calculate_units_from_appliances(appliances, days=30):
    """Calculate monthly units from appliances list"""
    total_kwh = 0
    for appliance in appliances:
        name = appliance.get("name", "").lower()
        technology = appliance.get("technology", "non_inverter")
        daily_hours = float(appliance.get("daily_hours", 0))
        quantity = int(appliance.get("quantity", 1))

        # Find wattage
        wattage = 0
        for key in APPLIANCE_WATTS:
            if key in name:
                wattage = APPLIANCE_WATTS[key].get(technology,
                          APPLIANCE_WATTS[key]["non_inverter"])
                break

        if wattage == 0:
            wattage = int(appliance.get("wattage", 100))

        # kWh = watts × hours × days ÷ 1000
        kwh = (wattage * daily_hours * days * quantity) / 1000
        total_kwh += kwh

    return round(total_kwh)

def calculate_bill_from_units(units):
    """Calculate bill amount from units using Pakistan slab system"""
    total = 0
    remaining = units

    for slab in SLAB_RATES:
        if remaining <= 0:
            break
        slab_size = slab["max"] - slab["min"] + 1
        units_in_slab = min(remaining, slab_size)
        total += units_in_slab * slab["rate"]
        remaining -= units_in_slab

    # Fixed charges (approximate)
    fixed_charges = 250
    taxes = total * 0.175  # 17.5% GST

    return round(total + fixed_charges + taxes)

def predict_next_bill(bill_history, appliances, next_month):
    """
    Smart Bill AI Prediction Engine
    Combines bill history + appliances + seasonal adjustment
    """
    # Step 1: Get appliance-based units estimate
    appliance_units = calculate_units_from_appliances(appliances)

    # Step 2: Get history-based average (weighted — recent bills matter more)
    history_units = 0
    if bill_history:
        weights = list(range(1, len(bill_history) + 1))
        total_weight = sum(weights)
        weighted_sum = sum(
            bill["units"] * w
            for bill, w in zip(bill_history, weights)
        )
        history_units = weighted_sum / total_weight

    # Step 3: Combine appliance estimate and history
    if history_units > 0 and appliance_units > 0:
        # 60% history, 40% appliance calculation
        base_units = (history_units * 0.60) + (appliance_units * 0.40)
    elif history_units > 0:
        base_units = history_units
    elif appliance_units > 0:
        base_units = appliance_units
    else:
        base_units = 200  # Default fallback

    # Step 4: Apply seasonal adjustment for next month
    seasonal_factor = SEASONAL.get(next_month, 1.0)
    predicted_units = round(base_units * seasonal_factor)

    # Step 5: Calculate bill amount from predicted units
    predicted_amount = calculate_bill_from_units(predicted_units)

    # Step 6: Confidence level
    if len(bill_history) >= 3:
        confidence = "high"
    elif len(bill_history) >= 1:
        confidence = "medium"
    else:
        confidence = "low"

    return {
        "predicted_units": predicted_units,
        "predicted_amount": predicted_amount,
        "confidence": confidence,
        "seasonal_factor": seasonal_factor,
        "appliance_units": appliance_units,
        "history_units": round(history_units) if history_units else 0,
    }


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length))

            bill_history = body.get("bill_history", [])
            appliances = body.get("appliances", [])
            next_month = body.get("next_month", 1)

            result = predict_next_bill(bill_history, appliances, next_month)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"success": True, "data": result}).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
