from http.server import BaseHTTPRequestHandler
import json

# Pakistan electricity slab rates (NEPRA 2024-25)
SLAB_RATES = [
    {"min": 0,   "max": 100,  "rate": 7.74,  "label": "Slab 1 (1-100 units)"},
    {"min": 101, "max": 200,  "rate": 10.06, "label": "Slab 2 (101-200 units)"},
    {"min": 201, "max": 300,  "rate": 14.10, "label": "Slab 3 (201-300 units)"},
    {"min": 301, "max": 400,  "rate": 16.50, "label": "Slab 4 (301-400 units)"},
    {"min": 401, "max": 500,  "rate": 20.00, "label": "Slab 5 (401-500 units)"},
    {"min": 501, "max": 600,  "rate": 22.65, "label": "Slab 6 (501-600 units)"},
    {"min": 601, "max": 700,  "rate": 25.00, "label": "Slab 7 (601-700 units)"},
    {"min": 701, "max": 99999,"rate": 28.00, "label": "Slab 8 (700+ units)"},
]

def calculate_slab(units):
    """Calculate bill breakdown by slab for given units"""
    breakdown = []
    total_energy = 0
    remaining = units

    for slab in SLAB_RATES:
        if remaining <= 0:
            break
        slab_size = slab["max"] - slab["min"] + 1
        units_in_slab = min(remaining, slab_size)
        cost = round(units_in_slab * slab["rate"], 2)
        total_energy += cost
        remaining -= units_in_slab

        breakdown.append({
            "label": slab["label"],
            "units": units_in_slab,
            "rate": slab["rate"],
            "cost": cost,
        })

    fixed_charges = 250
    gst = round(total_energy * 0.175, 2)
    total = round(total_energy + fixed_charges + gst, 2)

    # Find current slab
    current_slab = 1
    for i, slab in enumerate(SLAB_RATES):
        if slab["min"] <= units <= slab["max"]:
            current_slab = i + 1
            break

    # Units to next slab warning
    next_slab_at = None
    units_to_next = None
    if current_slab < len(SLAB_RATES):
        next_slab_at = SLAB_RATES[current_slab]["min"]
        units_to_next = next_slab_at - units

    return {
        "units": units,
        "breakdown": breakdown,
        "energy_charges": round(total_energy, 2),
        "fixed_charges": fixed_charges,
        "gst": gst,
        "total": total,
        "current_slab": current_slab,
        "next_slab_at": next_slab_at,
        "units_to_next_slab": units_to_next,
        "warning": units_to_next is not None and units_to_next <= 20,
    }


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length))
            units = int(body.get("units", 0))

            result = calculate_slab(units)

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

    def do_GET(self):
        # Allow GET with ?units=250
        try:
            from urllib.parse import urlparse, parse_qs
            query = parse_qs(urlparse(self.path).query)
            units = int(query.get("units", [0])[0])
            result = calculate_slab(units)

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
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
