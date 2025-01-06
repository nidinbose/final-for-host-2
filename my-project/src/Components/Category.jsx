import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from '../additionals/CategoryCrd';
import { BsVectorPen, BsBank, BsMusicNote } from 'react-icons/bs';
import { TiHtml5, TiMicrophone, TiBriefcase } from 'react-icons/ti';
import { FaRobot, FaDatabase, FaPencilRuler } from 'react-icons/fa';
import { SiAdobecreativecloud } from 'react-icons/si';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';

const Categories = () => {
  return (
    <motion.section
      className="relative w-full bg-white p-5 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <div className="absolute inset-0 z-0">
        <video
          src="https://videos.pexels.com/video-files/7534244/7534244-sd_640_360_25fps.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black opacity-50"></div> 
      </div>
      <div className="relative z-10 max-w-screen-xl mx-auto text-center text-white">
        <h1 className="leading-tight text-3xl md:text-4xl font-bold pt-7">
          Our <span className="text-[#A0CE4E]">Additional Courses</span>
        </h1>
        <p className="text-lg text-gray-200 mt-4 ">
          Various versions have evolved over the years
        </p>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 py-12 text-black/60 ">
          <CategoryCard icon={<BsVectorPen size={30} />} title="Design"/>
          <CategoryCard icon={<TiHtml5 size={30} />} title="Web Development" />
                   <CategoryCard icon={<FaPencilRuler size={30} />} title="Architecture" />
          <CategoryCard icon={<SiAdobecreativecloud size={30} />} title="3D Plans" />
          <CategoryCard icon={<AiOutlineSafetyCertificate size={30} />} title={'Ethical Hacking'} />
          <CategoryCard icon={<FaRobot size={30} />} title={'AI and ML'} />
          <CategoryCard icon={<FaRobot size={30} />} title="AI with Automation" />
          <CategoryCard icon={<BsBank size={30} />} title="Robotics" />
          <CategoryCard icon={<FaDatabase size={30} />} title="Data Science" />
        </div>
      </div>
    </motion.section>
  );
};

export default Categories;

