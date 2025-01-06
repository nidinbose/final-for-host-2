import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="fixed left-2 top-2/3 flex flex-col space-y-4 z-50 pb-[60vh]">
         <div className="flex flex-col items-center space-y-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-500 transition duration-300"
        >
          <FaFacebook size={20} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-blue-400 text-white rounded-full shadow-md hover:bg-blue-300 transition duration-300"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-400 transition duration-300"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-blue-800 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-300"
        >
          <FaLinkedin size={20} />
        </a>


      </div>

      <div className="flex flex-col space-y-4 fixed left-4 mt-10 top-1/3 z-50 gap-[70px]">
   <Link
    to="/applaynow"
    className="px-4 py-2 bg-[#A0CE4E] font-bold text-white rounded-md shadow-md hover:bg-green-400 transition duration-300 text-center transform -rotate-90 origin-left"
  >
    Apply Now
  </Link>
  <Link
    to="/contact"
    className="px-4 py-2 bg-[#A0CE4E] text-white font-bold rounded-md shadow-md hover:bg-yellow-400 transition duration-300 text-center transform -rotate-90 origin-left"
  >
    Contact Us
  </Link>
</div>

    </div>
  );
};

export default Sidebar;
