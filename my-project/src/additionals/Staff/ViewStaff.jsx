import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from "../Admin/AdminNavbar";
import AdminFooter from "../Admin/AdminFooter";

const ViewStaff = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:3003/api/getstaffedit/${id}`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      setData(null);
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
      await axios.delete(`http://localhost:3003/api/deletestaff/${id}`);
      navigate('/vstaff');
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/editstaff/${id}`);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">Loading...</div>;
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">No staff data found.</div>;
  }

  return (
    <>
        
    <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-[#1B2C39] min-h-screen">

              <h1 className="flex items-center justify-start text-5xl font-semibold text-[#A0CE4E] mb-12">Staff Deatiles</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-center space-y-7">
          <div className="bg-transparent h-80 w-full flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10">
            <img
              alt="Staff Profile"
              className="object-cover object-center h-96 w-auto"
              src={data.photo}
            />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white bg-[#A0CE4E] hover:bg-[#1B2C39] w-64 h-12 rounded-lg flex items-center justify-center">
            {data.name}
          </h1>
        </div>
        <div className="space-y-4 bg-[#A0CE4E] p-6 rounded shadow-lg ">
          <h2 className="text-2xl font-semibold text-gray-100 text-center lg:text-left">Staff Information</h2>
          <div className="bg-violet-50 p-3 rounded-md border">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium text-gray-900 ml-2">{data.name}</span>
          </div>
          <div className="bg-blue-50 p-3 rounded-md border">
            <span className="text-gray-600">Staff ID:</span>
            <span className="font-medium text-gray-900 ml-2">{data.staffid}</span>
          </div>
          <div className="bg-violet-50 p-3 rounded-md border">
            <span className="text-gray-600">Experience:</span>
            <span className="font-medium text-gray-900 ml-2">{data.experience}</span>
          </div>
          <div className="bg-violet-50 p-3 rounded-md border">
            <span className="text-gray-600">Qualification:</span>
            <span className="font-medium text-gray-900 ml-2">{data.qualification}</span>
          </div>
          <div className="bg-blue-50 p-3 rounded-md border">
            <span className="text-gray-600">Department:</span>
            <span className="font-medium text-gray-900 ml-2">{data.department}</span>
          </div>
          <div className="bg-violet-50 p-3 rounded-md border">
            <span className="text-gray-600">Semester:</span>
            <span className="font-medium text-gray-900 ml-2">{data.semester}</span>
          </div>
          <div className="bg-blue-50 p-3 rounded-md border">
            <span className="text-gray-600">Blood Group:</span>
            <span className="font-medium text-gray-900 ml-2">{data.bloodType}</span>
          </div>
          <div className="bg-emerald-50 p-3 rounded-md border">
            <span className="text-gray-600">Date of Birth:</span>
            <span className="font-medium text-gray-900 ml-2">{data.dateOfBirth}</span>
          </div>
          <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
            <a
                  href="#_"
                  className="rounded-md px-4 py-2 sm:px-5 sm:py-3 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#A0CE4E] text-indigo-600 bg-[#1B2C39]"
                  onClick={handleEdit}
                >
                  <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-emerald-500 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                  <span className="relative text-white transition duration-300 group-hover:text-white ease">Edit </span>
                </a>
         
            <a
                  href="#_"
                  className="rounded-md px-4 py-2 sm:px-5 sm:py-3 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#A0CE4E] text-indigo-600 bg-[#1B2C39]"
                  onClick={handleDelete}
                >
                  <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-red-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                  <span className="relative text-white transition duration-300 group-hover:text-white ease">Delete</span>
                </a>
         
          </div>
        </div>
      </div>
   
    </div>

    </>
  );
};

export default ViewStaff;
