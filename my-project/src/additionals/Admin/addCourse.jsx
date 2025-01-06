import React, { useState } from "react";
import axios from "axios";
import NavLR from "../../Navlist/NavLR";

const AddCourse = () => {
  const [data, setData] = useState({
    photo: "",
    title: "",
    description: "",
    fees: "",
    year: "",
    head: "",
  });
  const [photo, setPhoto] = useState("");

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  }

  const handlePhotoChange = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setPhoto(base64);
    setData((prev) => ({ ...prev, photo: base64 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3003/api/addcourse", data);
      console.log("Course added:", res.data);
      window.alert("Course added successfully!");
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1D1D1D]">
      <NavLR />
      <div className="max-w-4xl w-full p-6 bg-[#A0CE4E] rounded-md shadow-lg mt-12">
        <h2 className="text-3xl font-bold mb-6 text-start text-white">ADD New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Course Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium">Fees</label>
              <input
                type="number"
                name="fees"
                value={data.fees}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Year</label>
              <input
                type="text"
                name="year"
                value={data.year}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Course Head</label>
            <input
              type="text"
              name="head"
              value={data.head}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {photo && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Preview:</p>
                <img
                  src={photo}
                  alt="Preview"
                  className="w-full h-full bg-cover rounded-md border border-gray-300 shadow-md"
                />
              </div>
            )}
          </div>
      <div className="text-end ">
      <button
            type="submit"
            className="w-39  py-3 px-4 bg-emerald-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
          >
            Add Course
          </button>
      </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;

