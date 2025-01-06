import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewStudentt = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:3003/api/getstudentedit/${id}`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);
  useEffect(() => {
  
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
        alert("Please log in to continue.");
        navigate('/login');
    }
}, [navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3003/api/deletestudent/${id}`);
      navigate('/vstudent'); 
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/editstudent/${id}`); 
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center p-1 bg-gray-50">Loading...</div>;
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">No student data found.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <motion.div
        className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl w-[60vh]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.img
          src={data.photo}
          alt="Student Photo"
          className="w-full h-[50vh] object-cover w-[50vh]"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="p-6">
          <motion.h1
            className="text-3xl font-bold text-gray-800 w-[60vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {data.name}
          </motion.h1>
          <p className="text-gray-600 mt-2"><strong>Student ID:</strong> {data.studentid}</p>
          <p className="text-gray-600 mt-2"><strong>Class:</strong> {data.class}</p>
          <p className="text-gray-600 mt-2"><strong>Department:</strong> {data.department}</p>
          <p className="text-gray-600 mt-2"><strong>Semester:</strong> {data.semester}</p>
          <p className="text-gray-600 mt-2"><strong>Blood Type:</strong> {data.bloodType}</p>
          <p className="text-gray-600 mt-2"><strong>Date of Birth:</strong> {data.dateOfBirth}</p>
        </div>
        <div className="p-6 flex gap-4 justify-end">
          <button 
            onClick={handleDelete} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Student
          </button>
          <button 
            onClick={handleEdit} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Student
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewStudentt;