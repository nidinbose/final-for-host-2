import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa'
import { AiFillVideoCamera } from 'react-icons/ai'
import { FaPeopleCarry } from 'react-icons/fa'

const Achievement = () => {
  return (
    <section className='w-full bg-[url("https://www.asmibmr.edu.in/wp-content/uploads/2023/02/image001.jpg")] p-5 inset-0 relative pt-[10vh] pb-[10vh]'

  >
       <div className="absolute inset-0 bg-black opacity-90"></div>
      <motion.div 
        className='max-w-screen-xl mx-auto grid lg:grid-cols-2 grid-cols-1 gap-8 z-50 relative'
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className='flex flex-col justify-start gap-4'>
          <h1 className='md:leading-[42px] py-2 text-4xl font-bold text-white'>
            Our <span className='text-[#A0CE4E]'>Achievements</span>
          </h1>
          <p className='text-[#536e96] text-xl'>
            Leading companies use the same courses to help their employees keep skills up
          </p>
          <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
            <motion.div 
              className="py-6 flex"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-[#e9f8f3] rounded-xl">
                <FaGraduationCap size={30} style={{ color:'#A0CE4E' }}/>
              </div>
              <div className='px-3'>
                <h1 className='text-2xl font-semibold text-white'>100 +</h1>
                <p className='text-[#60737a]'>Faculties</p>
              </div>
            </motion.div>
            <motion.div 
              className="py-6 flex"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-[#e9f8f3] rounded-xl">
                <AiFillVideoCamera size={30} style={{ color:'#A0CE4E' }}/>
              </div>
              <div className='px-3'>
                <h1 className='text-2xl font-semibold text-white'>10,000 +</h1>
                <p className='text-[#60737a]'>Video Classes</p>
              </div>
            </motion.div>
            <motion.div 
              className="py-6 flex"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-[#e9f8f3] rounded-xl">
                <FaPeopleCarry size={30} style={{ color:'#A0CE4E' }}/>
              </div>
              <div className='px-3'>
                <h1 className='text-2xl font-semibold text-white'>20,000 +</h1>
                <p className='text-[#60737a]'>Placements</p>
              </div>
            </motion.div>
            <motion.div 
              className="py-6 flex"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="p-4 bg-[#e9f8f3] rounded-xl">
                <FaGraduationCap size={30} style={{ color:'#ed4459' }}/>
              </div>
              <div className='px-3'>
                <h1 className='text-2xl font-semibold text-white'>50,000 +</h1>
                <p className='text-[#60737a]'>Students</p>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div 
          className="flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img 
            src="https://image.cnbcfm.com/api/v1/image/105248930-GettyImages-AB28744.jpg?v=1683812481" 
            alt="hero" 
            className='w-full h-auto rounded-xl'
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Achievement
