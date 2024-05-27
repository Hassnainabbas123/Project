import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import the CSS file

export default function Footer() {
  return (
    <div>
      <footer className="footer d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p>Contact us: <a href="mailto:info@example.com">khanfrtilizers@example.com</a> | Phone: <a href="tel:+923356023326">03356023326</a></p>
              <p>Address: E-11/3 near Khudadad Heights, Islamabad</p>
              <p>Follow us:
                <a href="https://www.facebook.com" target="_blank" >
                  <img src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" alt="Facebook" />
                </a>
                <a href="https://www.twitter.com" target="_blank" >
                  <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="Twitter" />
                </a>
                <a href="https://www.instagram.com" target="_blank" >
                  <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" >
                  <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" />
                </a>
              </p>
              <p><Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-of-service">Terms of Service</Link></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
