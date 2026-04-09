import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import styles from './Footer.module.css'

export default function Footer() {
  const { isUrdu } = useLang()

  return (
    <footer className={styles.footer} dir={isUrdu ? 'rtl' : 'ltr'}>
      <div className={styles.grid}>
        <div>
          <div className={styles.logo}>
            <i className="fa-solid fa-bolt"></i> Smart Bill
          </div>
          <p>
            {isUrdu
              ? 'پاکستان کا سب سے ذہین بجلی بل پریڈیکٹر۔ پیسے بچائیں، استعمال ٹریک کریں، اگلا بل آنے سے پہلے جانیں۔'
              : "Pakistan's smartest electricity bill predictor. Save money, track usage, predict your next bill before it arrives."}
          </p>
          <div className={styles.social}>
            <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-youtube"></i></a>
            <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>

        <div>
          <h4>{isUrdu ? 'فوری لنکس' : 'Quick Links'}</h4>
          <ul>
            <li><Link to="/">{isUrdu ? 'ہوم' : 'Home'}</Link></li>
            <li><Link to="/how-it-works">{isUrdu ? 'کیسے کام کرتا ہے' : 'How It Works'}</Link></li>
            <li><Link to="/faq">{isUrdu ? 'سوالات' : 'FAQ'}</Link></li>
          </ul>
        </div>

        <div>
          <h4>{isUrdu ? 'کمپنی' : 'Company'}</h4>
          <ul>
            <li><Link to="/about">{isUrdu ? 'ہمارے بارے میں' : 'About Us'}</Link></li>
            <li><Link to="/contact">{isUrdu ? 'رابطہ' : 'Contact'}</Link></li>
            <li><Link to="/privacy">{isUrdu ? 'رازداری پالیسی' : 'Privacy Policy'}</Link></li>
            <li><Link to="/terms">{isUrdu ? 'شرائط و ضوابط' : 'Terms of Service'}</Link></li>
          </ul>
        </div>

        <div>
          <h4>{isUrdu ? 'ٹاپ DISCOs' : 'Top DISCOs'}</h4>
          <ul>
            <li><a href="#">LESCO — Lahore</a></li>
            <li><a href="#">MEPCO — Multan</a></li>
            <li><a href="#">FESCO — Faisalabad</a></li>
            <li><a href="#">IESCO — Islamabad</a></li>
            <li><a href="#">KE — Karachi</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          &copy; 2025 Smart Bill. {isUrdu ? 'تمام حقوق محفوظ ہیں۔' : 'All rights reserved.'}{' '}
          {isUrdu ? 'پاکستان کے لیے ' : 'Made with '}<i className="fa-solid fa-heart" style={{color:'#E53935'}}></i>
          {isUrdu ? ' بنایا گیا' : ' for Pakistan.'}
        </p>
      </div>
    </footer>
  )
}
