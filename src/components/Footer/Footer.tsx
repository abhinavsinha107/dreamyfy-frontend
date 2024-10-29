import React from "react";
import { Link } from "react-router-dom";
import mydreamfylogo from '../../assets/mydreamfy.png';
import {
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col gap-10 md:flex-row items-start">
        {/* Left Section */}
        <div className="mb-6 lg:mb-0 w-full md:w-4/12">
          {/* <h2 className="text-xl font-bold mb-4">MyDreamFy</h2> */}
          <img src={mydreamfylogo} className="w-full max-w-60 mb-5" />
          <p className="text-sm mb-4">
            We are ready to create stylish and beautiful prototypes for your future projects.
          </p>
          <div className="flex space-x-4 mt-4">
            <FaYoutube className="text-white opacity-65 cursor-pointer hover:opacity-100 text-xl duration-500" />
            <FaFacebook className="text-white opacity-65 cursor-pointer hover:opacity-100 text-xl duration-500" />
            <FaTwitter className="text-white opacity-65 cursor-pointer hover:opacity-100 text-xl duration-500" />
            <FaInstagram className="text-white opacity-65 cursor-pointer hover:opacity-100 text-xl duration-500" />
            <FaLinkedin className="text-white opacity-65 cursor-pointer hover:opacity-100 text-xl duration-500" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row gap-8 justify-between w-full md:w-8/12">
          <div className="w-full">
            <h3 className="font-semibold mb-5">Navigation</h3>
            <ul className="text-sm space-y-2 capitalize">
              <li>
                <Link to="/business" className="hover:text-gray-400 duration-500">
                  cult.fit for business
                </Link>
              </li>
              <li>
                <Link to="/franchise" className="hover:text-gray-400 duration-500">
                  cult.fit franchise
                </Link>
              </li>
              <li>
                <Link to="/partnerships" className="hover:text-gray-400 duration-500">
                  corporate partnerships
                </Link>
              </li>
              <li>
                <Link to="/terms-business" className="hover:text-gray-400 duration-500">
                  t&c for business
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div className="w-full capitalize">
            <h3 className="font-semibold mb-5">More</h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link to="/partner" className="hover:text-gray-400 duration-500">
                  partner.fit
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-gray-400 duration-500">
                  blogs
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-gray-400 duration-500">
                  security
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-gray-400 duration-500">
                  careers
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
        </div>
      </div>

      {/* Bottom Section */}
      {/* <div className="bg-gray-800 py-4">
        <div className="container mx-auto text-center text-gray-400">
          <p>© 2024 MyDreamFy. All rights reserved.</p>
        </div>
      </div> */}
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
