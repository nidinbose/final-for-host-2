import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoLogoInstagram } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { SiWhatsapp } from "react-icons/si";

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://your-backend-url/api/subscribe', { email });
      alert('Subscription successful!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Failed to subscribe. Please try again.');
    }
  };

  return (
    <footer className="bg-[#A0CE4E] text-white py-10 pb-[20vh] md:pb-[40vh] lg:pb-[50vh] xl:pb-[10vh]">
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        
        <div>
          <img src="/images/pl.png" alt="Logo" className="mb-4 w-20" />
          <h2 className="text-sm">Address 1: 123 Main St, City Bangalore</h2>
          <h2 className="text-sm">Phone: (123) 456-7890</h2>
          <h2 className="text-sm">Email 1: cambridgeadmissions@gmail.com</h2>
          <h2 className="text-sm">Email 2: cambridgeconnect@gmail.com</h2>
          <h3 className="text-sm flex gap-3 items-center">
            Website:{" "}
            <a href="https://example.com" className="text-blue-400 hover:underline">
              <p className='text-red-500'>www.cambridgeedu.co.in</p>
            </a>
          </h3>
        </div>

        <div>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-red-500 text-lg font-semibold hover:underline ">Home</Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-red-500 text-lg font-semibold hover:underline ">Courses</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-red-500 text-lg font-semibold hover:underline ">Campus View</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-red-500 text-lg font-semibold hover:underline ">Faculties</Link>
            </li>
          </ul>
        </div>

      
      
        <div>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-red-500 text-lg font-semibold hover:underline ">Partner Companies</Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-red-500 text-lg font-semibold hover:underline ">Placement</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-red-500 text-lg font-semibold hover:underline ">Practicals</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-red-500 text-lg font-semibold hover:underline ">Labs</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-red-500 text-lg font-semibold hover:underline ">Sports</Link>
            </li>
          </ul>
        </div>

        <div>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-black focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-gray-400 hover:bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-6 flex space-x-7 justify-center">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <FaFacebook className='w-8 h-8'/>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <BsTwitterX className='w-8 h-8'/>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <IoLogoInstagram className='w-8 h-8'/>
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <SiWhatsapp className='w-8 h-8'/>
            </a>
          </div>
        </div>
        
      </section>
    </footer>
  );
};

export default Footer;
