import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const StaffSA = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-10 w-[80vw]">
           <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
              <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-full text-center bg-[#1B2C39] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-[#A0CE4E] transition duration-300"
          onClick={() => handleNavigate("/addstudents")}
        >
          Add Student
        </motion.button>
          <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-full text-center bg-[#1B2C39] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-[#A0CE4E] transition duration-300"
          onClick={() => handleNavigate("/ssignup")}
        >
          Create Account
        </motion.button>
              <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-full text-center bg-[#1B2C39] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-[#A0CE4E] transition duration-300"
          onClick={() => handleNavigate("/studentviewsd")}
        >
          Students List
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-full text-center bg-[#1B2C39] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-[#A0CE4E] transition duration-300"
          onClick={() => handleNavigate("/addmarks")}
        >
          Add Marks
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-full h-56 text-center bg-[#1B2C39] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-[#A0CE4E] transition duration-300"
          onClick={() => handleNavigate("/addmarks")}
        >
          Add Marks
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StaffSA;


