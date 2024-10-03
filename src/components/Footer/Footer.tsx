import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <div>
      <div className="Footer-container">
        <div className="Element-container">
          <div className="Element-group">
            <Link to="/business" aria-label="Cult.fit for business">
              cult.fit for business
            </Link>
            <Link to="/franchise" aria-label="Cult.fit franchise">
              cult.fit franchise
            </Link>
            <Link to="/partnerships" aria-label="Corporate partnerships">
              corporate partnerships
            </Link>
            <Link
              to="/terms-business"
              aria-label="Terms and conditions for business"
            >
              t&c for business
            </Link>
          </div>
          <div className="Element-group">
            <Link to="/partner" aria-label="Partner.fit">
              partner.fit
            </Link>
            <Link to="/blogs" aria-label="Blogs">
              blogs
            </Link>
            <Link to="/security" aria-label="Security">
              security
            </Link>
            <Link to="/careers" aria-label="Careers">
              careers
            </Link>
          </div>
          <div className="Element-group">
            <Link to="/partner" aria-label="Partner.fit">
              partner.fit
            </Link>
            <Link to="/blogs" aria-label="Blogs">
              blogs
            </Link>
            <Link to="/security" aria-label="Security">
              security
            </Link>
            <Link to="/careers" aria-label="Careers">
              careers
            </Link>
          </div>
          <div className="Element-group">
            <Link to="/contact" aria-label="Contact us">
              contact us
            </Link>
            <Link to="/privacy-policy" aria-label="Privacy policy">
              privacy policy
            </Link>
            <Link to="/bmi-calculator" aria-label="Cult BMI calculator">
              cult bmi calculator
            </Link>
            <Link to="/terms-conditions" aria-label="Terms and conditions">
              terms & conditions
            </Link>
          </div>
        </div>

        <div className="MainDetails">
          <h1>
            <Link to="/" aria-label="Go to homepage">
              MyDreamFy
            </Link>
          </h1>

          <div className="app-store-section">
            <div className="app-store-buttons">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_178,q_auto:eco,dpr_2,f_auto,fl_progressive//image/icons/cult/appstore.svg"
                    alt="App Store"
                    className="app-store-img"
                  />
                </a>
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play Store"
                  className="google-play-img"
                />
              </a>
            </div>

            <div className="social-icons">
              <FaYoutube />
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedin />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#171a26] py-4">
        <div className="container mx-auto text-center text-blue-200">
          <p>© 2024 Your Website Name. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
