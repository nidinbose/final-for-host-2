import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Start = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    'https://admissiondetails.in/wp-content/uploads/2021/12/SJB-Institute-of-Technology.jpeg',
    'https://t4.ftcdn.net/jpg/06/31/52/61/360_F_631526147_uIiqKqWbZEgwLLd0vbLwcim1cKlQyokN.jpg',
    'https://e1.pxfuel.com/desktop-wallpaper/755/773/desktop-wallpaper-school-graduation-high-quality-graduate.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      className='relative w-full min-h-screen bg-cover bg-center py-24 px-4 flex items-center justify-center transition-all duration-500 ease-in-out'
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className='absolute inset-0 bg-black opacity-70'></div> 
      <div
        className='absolute inset-0 transform scale-100 hover:scale-105 transition-transform duration-700 ease-in-out'
        style={{ backgroundImage: `url(${images[currentImageIndex]})`, zIndex: -1 }}
      ></div> {/* Zooming effect */}
      
      <div className='container mx-auto grid gap-5 max-w-[1100px] text-center relative z-10'>
        <motion.div
          className='flex flex-col justify-center items-center gap-4'
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          <p className="text-2xl font-bold text-[#A0CE4E] font-amsterdam">
            welcome to Cambridge College of Engineering
          </p>

          <p className="py-2 text-3xl md:text-5xl font-bold text-white font-amsterdam tracking-wide leading-tight">
            Join Cambridge College of Engineering and <br className="hidden md:block" />
            Tech for the right path to <span className='border-b-2 border-[#A0CE4E] border-bold '>SUCCESS!</span>
          </p>

          <h1 className='leading-relaxed py-2 text-lg md:text-xl text-white font-semibold hover:text-white/80'>
            Access to over <span className='text-[#A0CE4E]'>1000</span> courses from over <span className='text-[#A0CE4E]'>200</span> professional instructors & institutions
          </h1>

          <p className='py-2 text-base md:text-lg font-semibold text-[#A0CE4E]'>
            Various versions have evolved over the years....
          </p>
        </motion.div>
        
        <motion.div
          className='mt-6 md:mt-0 p-4 bg-transparent text-white text-center'
          initial={{ x: '90vw' }} 
          animate={{ x: 0 }} 
          transition={{ type: 'spring', stiffness: 300  }} 
        >
       <Link to={`/applaynow`}>
       <motion.button
            className='bg-[#A0CE4E] w-full md:w-[14vw] text-center h-14 font-semibold hover:bg-white hover:text-black'
            whileHover={{ x: 10, y: -10 }} 
            transition={{ type: 'spring', stiffness: 300 }}
          >
            ADMISSIONS 2024 - 25
          </motion.button>
       </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Start;




