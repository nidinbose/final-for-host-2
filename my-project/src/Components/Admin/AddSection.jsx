import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const Addss = () => {
  const navigate = useNavigate();
  const [studentCount, setStudentCount] = useState(null);
  const [staffCount, setStaffCount] = useState(null);
  const [userCount , setUserCount]=useState(null);

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get("http://localhost:3003/api/studentscount"); 
        setStudentCount(response.data.count);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    const fetchStaffCount = async () => {
      try {
        const response = await axios.get("http://localhost:3003/api/staffcount"); 
        setStaffCount(response.data.count);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    const fetchUserCount = async () => {
      try {
        const response = await axios.get("http://localhost:3003/api/usercount"); 
        setUserCount(response.data.count);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };
    fetchUserCount()
    fetchStaffCount()
    fetchStudentCount();
  }, []);

  return (
    <div className="min-h-[60vh] w-full bg-white p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      

      <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#A0CE4E] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-[#1B2C39] hover:text-[#A0CE4E] transition duration-300 p-5 h-36 mb-12"
          onClick={() => handleNavigate("")}
        >
          <h2 className="text-2xl">
            Students Count: {studentCount !== null ? studentCount : "Loading..."}
          </h2>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#A0CE4E] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-[#1B2C39] hover:text-[#A0CE4E] transition duration-300 p-5 h-36 mb-12"
          onClick={() => handleNavigate("")}
        >
          <h2 className="text-2xl">
            Staff Count: {staffCount !== null ? staffCount : "Loading..."}
          </h2>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#A0CE4E] text-white font-bold py-4 rounded-lg shadow-lg hover:bg-[#1B2C39] hover:text-[#A0CE4E] transition duration-300 p-5 h-36 mb-12"
          onClick={() => handleNavigate("")}
        >
          <h2 className="text-2xl">
            Users: {userCount !== null ? userCount : "Loading..."}
          </h2>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#1B2C39] text-[#A0CE4E] font-bold py-4 rounded-lg shadow-lg hover:bg-[#A0CE4E] hover:text-white transition duration-300 p-5 h-56"
          onClick={() => handleNavigate("/addstudents")}
        >
          <h2 className="text-xl">Add Student</h2>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#1B2C39] text-[#A0CE4E] font-bold py-4 rounded-lg shadow-lg hover:bg-[#A0CE4E] hover:text-white transition duration-300 p-5 h-56"
          onClick={() => handleNavigate("/addstaff")}
        >
          <h2 className="text-xl">Add Staff</h2>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#1B2C39] text-[#A0CE4E] font-bold py-4 rounded-lg shadow-lg hover:bg-[#A0CE4E] hover:text-white transition duration-300 p-5 h-56"
          onClick={() => handleNavigate("/signup")}
        >
          <h2 className="text-xl">Create Account</h2>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#1B2C39] text-[#A0CE4E] font-bold py-4 rounded-lg shadow-lg hover:bg-[#A0CE4E] hover:text-white transition duration-300 p-5 h-56"
          onClick={() => handleNavigate("/vstaff")}
        >
          <h2 className="text-xl">Staff List</h2>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#1B2C39] text-[#A0CE4E] font-bold py-4 rounded-lg shadow-lg hover:bg-[#A0CE4E] hover:text-white transition duration-300 p-5 h-56"
          onClick={() => handleNavigate("/vstudent")}
        >
          <h2 className="text-xl">Students List</h2>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#1B2C39] text-[#A0CE4E] font-bold py-4 rounded-lg shadow-lg hover:bg-[#A0CE4E] hover:text-white transition duration-300 p-5 h-56"
          onClick={() => handleNavigate("/vstudent")}
        >
          <h2 className="text-xl">Students List</h2>
        </motion.button>

        {/* Button to display student count */}
     
      </div>
    </div>
  );
};

export default Addss;

