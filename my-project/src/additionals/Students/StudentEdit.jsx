import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const StudentsEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [previewSource, setPreviewSource] = useState("");

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.patch(`http://localhost:3003/api/updatestudent/${id}`, data);
        if (res.status === 201) {
            navigate('/vstudent');
        }
    };

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token');
        if (!isAuthenticated) {
            alert("Please log in to continue.");
            navigate('/login');
        }
    }, [navigate]);

    const getUser = async () => {
        const res = await axios.get(`http://localhost:3003/api/getstudentedit/${id}`);
        setData(res.data);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setData((prev) => ({ ...prev, photo: base64 }));
        setPreviewSource(base64);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="bg-[#1B2C39] min-h-full">
               <section className="text-gray-700 body-font bg-[#1B2C39] min-h-full">
            <h1 className="text-start p-10 text-2xl font-bold text-[#A0CE4E]">Edit deatiles</h1>
            <div className="container px-5 py-12 mx-auto">
                <div className="lg:w-4/5 mx-auto bg-[#A0CE4E] rounded-lg shadow-lg overflow-hidden flex flex-wrap">
                    <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                        <div className="p-6">
                            <img
                                alt="Student"
                                className="w-full h-full object-cover rounded border border-gray-200"
                                src={previewSource || data.photo || "https://via.placeholder.com/300"}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-4 w-full text-gray-600 border border-gray-300 rounded p-2 focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </div>
    
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            Student Details
                        </h2>
    
                        <div className="mb-4">
                            <label className="text-sm font-semibold text-white ">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name || ""}
                                onChange={handleChange}
                                className="block w-full mt-2 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                                placeholder="Enter Student Name"
                            />
                        </div>
    
                        <div className="mb-4">
                            <label className="text-sm font-semibold text-white">Student ID</label>
                            <input
                                type="text"
                                name="studentid"
                                value={data.studentid || ""}
                                onChange={handleChange}
                                className="block w-full mt-2 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                                placeholder="Enter Student ID"
                            />
                        </div>
    
                        <div className="mb-4">
                            <label className="text-sm font-semibold text-white">Class</label>
                            <input
                                type="text"
                                name="Class"
                                value={data.Class || ""}
                                onChange={handleChange}
                                className="block w-full mt-2 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                                placeholder="Enter Class"
                            />
                        </div>
    
                        <div className="mb-4">
                            <label className="text-sm font-semibold text-white">Department</label>
                            <select
                                name="department"
                                value={data.department || ""}
                                onChange={handleChange}
                                className="block w-full mt-2 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                            >
                                <option value="" disabled>
                                    Select Department
                                </option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Electrical Engineering">Electrical Engineering</option>
                                <option value="Civil Engineering">Civil Engineering</option>
                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                <option value="BigData Engineering">BigData Engineering</option>
                                <option value="AI Engineering">AI Engineering</option>
                                <option value="Automation Engineering">Automation Engineering</option>
                                
                            </select>
                        </div>
    
                        <div className="mb-4">
                            <label className="text-sm font-semibold text-white">Semester</label>
                            <input
                                type="text"
                                name="semester"
                                value={data.semester || ""}
                                onChange={handleChange}
                                className="block w-full mt-2 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                                placeholder="Enter Semester"
                            />
                        </div>
    
                        <div className="mb-4">
                            <label className="text-sm font-semibold text-white">Blood Group</label>
                            <input
                                type="text"
                                name="bloodType"
                                value={data.bloodType || ""}
                                onChange={handleChange}
                                className="block w-full mt-2 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                                placeholder="Enter Blood Group"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-sm font-semibold text-white">Email Address</label>
                            <input
                                type="text"
                                name="email"
                                value={data.email || ""}
                                onChange={handleChange}
                                className="block w-full mt-2 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                                placeholder="Enter Blood Group"
                            />
                        </div>
    
                        <div className="mb-6">
                            <label className="text-sm font-semibold text-white">Date of Birth</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={data.dateOfBirth || ""}
                                onChange={handleChange}
                                className="block w-full mt-2 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                            />
                        </div>
    
                        <div className="flex items-center">
                            <button
                                onClick={handleSubmit}
                                className="flex-grow text-white bg-green-500 border-1 rounded-lg py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => navigate('/vstudent')}
                                className="flex-grow ml-4 text-white bg-red-500 border-0 rounded-lg py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    
    );
};

export default StudentsEdit;
