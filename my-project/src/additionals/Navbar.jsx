import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
const nav = [
    { name: "Home", path: '/' },
    { name: "About", path: '/feedback' },
    { name: "Our Campus", path: '/gallary' },
    { name: "Courses", path: '/courses' },
    { name: "Admissions", path: '/admissions' },
];
import Ip from "../API.js";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                  const ip=Ip();
                    const response = await axios.get(`${ip}home`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const { username, photo, role } = response.data.user;
                    setUser({ username, photo, role });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get('/api/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const closeMenu = () => {
        setToggle(false);
    };
    const nav = [
      { name: 'Home', path: '/' },
        { name: 'Apply Now', path: '/applaynow' },
        { name: 'Affiliations', path: '/affiliations' },
        { name: 'Campus Tour', path: '/campus' },
        { name: 'Courses', path: '/CL' },
        { name: 'Contact Us', path: '/contact' },
      ];
    return (
        <div className="group w-full bg-transparent z-50 absolute top-0 left-0 hover:bg-white hover:text-black text-[#A0CE4E] font-semibold text-md font-amst">
        <div className="p-4 md:max-w-[1080px] mx-auto flex justify-between items-center">
           <div className="hidden md:flex items-center space-x-12 mx-auto ">
           <ul className="flex gap-10 items-center justify-center">
  <Link to={`/applaynow`}>
  <li className="text-sm sm:text-md lg:text-lg">Apply Now</li></Link>
  <Link to={`/affiliations`}><li className="text-sm sm:text-md lg:text-lg">Affiliations</li></Link>
  
  <Link to={`/campus`}>
    <li className="text-sm sm:text-md lg:text-lg">Campus Tour</li>
  </Link>

  <li>
  <button className="focus:outline-none">
      <Link to="/">
        <img
          src="/images/pl.png"
          alt="Logo"
          className="h-20 w-20 rounded-full cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300"
        />
      </Link>
    </button>
  </li>

  <Link to={`/CL`}>
    <li className="text-sm sm:text-md lg:text-lg">Courses</li>
  </Link>

  <li className="relative text-sm sm:text-md lg:text-lg">
    <button onClick={toggleDropdown} className="cursor-pointer">
      Accounts
    </button>
    {isDropdownOpen && (
      <div className="absolute mt-2 bg-transparant w-40">
        <ul className="flex flex-col">
          {!user && (
           <Link to={`/login`}>  <button  className="p-2 hover:bg-[#A0CE4E] text-[#A0CE4E] hover:text-white cursor-pointer text-sm sm:text-md lg:text-lg">Login</button></Link>
          )}
          {
            user && (  <button onClick={handleLogout} className="p-2 bg-transparant hover:bg-red-600 cursor-pointer text-sm sm:text-md lg:text-lg">Logout</button>)
          }
         
        
        </ul>
      </div>
    )}
  </li>
  <Link to={`/contact`}>
    <li className="text-sm sm:text-md lg:text-lg">Contact us</li>
  </Link>
</ul>

          </div>
  
                   <motion.div
            whileTap={{ scale: 0.8 }}
            className="md:hidden cursor-pointer flex gap-[35vw]"
            onClick={handleToggle}
          >
           <CiMenuFries className="w-7 h-7 font-bold"/>
           <div>
            <img src="/images/pl.png" alt="p1" className="w-10 h-10 rounded-full" />
          </div>
          </motion.div>
        </div>
          <motion.ul
          initial={{ opacity: 0, x: 200 }}
          animate={toggle ? { opacity: 1, x: 0 } : { opacity: 0, x: 200 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white shadow-lg z-50 ${toggle ? 'translate-x-0' : '-translate-x-full'}`}
        >


          <div className="flex justify-end p-4">
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="cursor-pointer"
              onClick={closeMenu}
            >

            <IoClose className="w-7 h-7 font-bold"/>
            </motion.div>
          </div>

          
          <div className="flex flex-col items-center mt-8 space-y-4 w-full px-4 ">
   {nav.map((item, index) => (
    <Link
      key={index}
      to={item.path}
      className="text-lg md:text-xl border w-60 text-center h-12 flex  items-center justify-center border-[#A0CE4E] text-[#A0CE4E] hover:text-[#A0CE4E] transition duration-300"
      onClick={closeMenu}
    >
      {item.name}
    
    </Link>
  ))}
  
 
  <div className="mt-8 w-full flex flex-col items-center justify-center ">
 {!user && (
 <Link to={`/login`}>
   <button className="w-full max-w-xs px-4 py-3 bg-[#A0CE4E] mb-3 text-white rounded-lg shadow-md hover:bg-[#1c6c34] transition duration-300">
   Login
 </button></Link>
 )}
   {user && (
     <button onClick={handleLogout} className="w-full max-w-xs px-4 py-3 bg-[#A0CE4E] text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300">
     Logout
   </button>
   )}
  </div>
</div>

        </motion.ul>
      </div>
   
    );
};

export default Navbar;
