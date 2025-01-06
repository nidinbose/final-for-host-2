import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from "../Admin/AdminNavbar";
import AdminFooter from "../Admin/AdminFooter";

const EditStaff = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [previewSource, setPreviewSource] = useState("");

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.patch(`http://localhost:3003/api/updatestaff/${id}`, data);
        if (res.status === 201) {
            navigate('/vstaff');
        }
    };

    const getUser = async () => {
        const res = await axios.get(`http://localhost:3003/api/getstaffedit/${id}`);
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
        <div className="bg-[#1B2C39]">
                       <h1 className="text-center text-4xl font-semibold text-[#A0CE4E] font-semibold pb-10 ">Edit Staff Data</h1>
            <section className="text-gray-700 body-font bg-[#1B2C39] h-full min-h-screen">
                <div className="container mx-auto px-5 py-12">
                    <div className="grid lg:grid-cols-2 gap-5">
                    <div className="w-24 sm:w-32 md:w-48 lg:w-64 xl:w-80 2xl:w-96">
                            <img
                                alt="Staff"
                                className="w-full h-100 object-cover object-center rounded border border-[#A0CE4E]"
                                src={previewSource || data.photo || "https://via.placeholder.com/300"}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="mt-4 w-full text-gray-700 border border-[#A0CE4E] rounded p-2"
                            />
                        </div>
                        <div className="w-full">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-[#A0CE4E]">Staff Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        placeholder="Staff Name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#A0CE4E] text-sm font-semibold mb-2">Staff ID</label>
                                    <input
                                        type="text"
                                        name="staffid"
                                        value={data.staffid || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        placeholder="Staff ID"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#A0CE4E] text-sm font-semibold mb-2">Experience</label>
                                    <input
                                        type="text"
                                        name="experience"
                                        value={data.experience || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        placeholder="Class"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#A0CE4E] text-sm font-semibold mb-2">Qualification</label>
                                    <input
                                        type="text"
                                        name="qualification"
                                        value={data.qualification || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        placeholder="Class"
                                    />
                                </div>

                                

                                <div>
                                    <label className="block text-[#A0CE4E] text-sm font-semibold mb-2">Department</label>
                                    <select
                                        name="department"
                                        value={data.department || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="" disabled>
                                            Select Department
                                        </option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Electrical Engineering">Electrical Engineering</option>
                                        <option value="Civil Engineering">Civil Engineering</option>
                                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                                    </select>
                                </div>

                                <div>
  <label className="block text-[#A0CE4E] text-sm font-semibold mb-2">Semester</label>
  <select
    name="semester"
    value={data.semester || ""}
    onChange={handleChange}
    className="w-full p-2 border rounded"
  >
    <option value="" disabled>Select Semester</option>
    <option value="multyple">Multiple</option>
    <option value="1">Semester 1</option>
    <option value="2">Semester 2</option>
    <option value="3">Semester 3</option>
    <option value="4">Semester 4</option>
    <option value="5">Semester 5</option>
    <option value="6">Semester 6</option>
    <option value="7">Semester 7</option>
    <option value="8">Semester 8</option>
  </select>
</div>



                                <div>
                                    <label className="block text-[#A0CE4E] text-sm font-semibold mb-2">Blood Group</label>
                                    <input
                                        type="text"
                                        name="bloodType"
                                        value={data.bloodType || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        placeholder="Blood Group"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[#A0CE4E] text-sm font-semibold mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={data.dateOfBirth || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <button
                                    onClick={handleSubmit}
                                    className="text-white bg-[#A0CE4E] py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => navigate('/vstaff')}
                                    className="text-white bg-[#A0CE4E] py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
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

export default EditStaff;
