import React from "react";
import { Link } from "react-router-dom";
import mydreamfylogo from "../../assets/mydreamfy.png";
import {
  FaYoutube,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col gap-10 md:flex-row items-start">
        {/* Left Section */}
        <div className="mb-6 lg:mb-0 w-full md:w-4/12">
          <img src={mydreamfylogo} className="w-full max-w-60 mb-5" />
          <p className="text-sm mb-4">
            We are ready to create stylish and beautiful prototypes for your
            future projects.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.youtube.com/@Mydreamfy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-white opacity-65 cursor-pointer hover:opacity-100 text-2xl duration-500" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61567331833145"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-white opacity-65 cursor-pointer hover:opacity-100 text-2xl duration-500" />
            </a>
            <a
              href="https://www.instagram.com/mydreamfy.education/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-white opacity-65 cursor-pointer hover:opacity-100 text-2xl duration-500" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row gap-8 justify-between w-full md:w-8/12">
          <div className="w-full">
            <h3 className="font-semibold mb-5">Navigation</h3>
            <ul className="text-sm space-y-2 capitalize">
              <li>
                <Link
                  to="/join-us-form"
                  className="hover:text-gray-400 duration-500"
                >
                  invest in us
                </Link>
              </li>
              <li>
                <Link
                  to="/become-a-tutor"
                  className="hover:text-gray-400 duration-500"
                >
                  become a tutor
                </Link>
              </li>
              <li>
                <Link
                  to="/book-a-session"
                  className="hover:text-gray-400 duration-500"
                >
                  book a session
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full capitalize">
            <h3 className="font-semibold mb-5">Contacts</h3>
            <p className="text-sm mb-1">Country, City, Street Name #12</p>
            <p className="text-sm mb-1">+1 (234) 567-89-00</p>
            <p className="text-sm">info@example.com</p>
          </div>

          {/* More Links */}
          <div className="w-full capitalize">
            <ul className="text-sm space-y-2">
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
                        style={{ width: 200, height: "auto" }}
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
                      style={{ width: 200, height: "auto", marginTop: 15 }}
                    />
                  </a>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-800 text-gray-400">
        <div className="container mx-auto py-4 px-6 flex flex-col md:flex-row-reverse justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Links Section */}
          <div className="flex gap-3 items-center justify-center md:justify-end capitalize text-sm flex-wrap">
            <Link to="/contact" className="hover:text-white">
              contact us
            </Link>
            <Link to="/privacy-policy" className="hover:text-white">
              privacy policy
            </Link>
            <Link to="/bmi-calculator" className="hover:text-white">
              cult bmi calculator
            </Link>
            <Link to="/terms-conditions" className="hover:text-white">
              terms & conditions
            </Link>
          </div>

          {/* Copyright Section */}
          <div className="text-sm text-gray-400">
            © 2024 MyDreamFy. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
