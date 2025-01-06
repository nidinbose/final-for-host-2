import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewMark = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:3003/api/getmark/${id}`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching mark data:", error);
      setError('Error fetching mark data');
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
      await axios.delete(`http://localhost:3003/api/deletemark/${id}`);
      alert("Marks deleted successfully");
      navigate('/marks');
    } catch (error) {
      console.error("Error deleting marks:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/editmark/${id}`);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center p-1 bg-gray-50">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">{error}</div>;
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">No mark data found.</div>;
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
        <div className="p-6">
          <motion.h1
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Student Marks
          </motion.h1>
          <p className="text-gray-600 mt-2"><strong>Physics:</strong> {data.physics}</p>
          <p className="text-gray-600 mt-2"><strong>Chemistry:</strong> {data.chemistry}</p>
          <p className="text-gray-600 mt-2"><strong>Maths:</strong> {data.maths}</p>
          <p className="text-gray-600 mt-2"><strong>Statistics:</strong> {data.stats}</p>
          <p className="text-gray-600 mt-2"><strong>DBMS:</strong> {data.dbms}</p>
          <p className="text-gray-600 mt-2"><strong>PBD:</strong> {data.pbd}</p>
          <p className="text-gray-600 mt-2"><strong>Student ID:</strong> {data.studentid}</p>
        </div>
        <div className="p-6 flex gap-4 justify-end">
          <button 
            onClick={handleDelete} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete Marks
          </button>
          <button 
            onClick={handleEdit} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Marks
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewMark;
