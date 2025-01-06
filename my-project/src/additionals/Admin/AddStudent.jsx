import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudents = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    studentid: "",
    Class: "",
    department: "Computer Science",
    semester: "1st Semester",
    bloodType: "",
    dateOfBirth: "",
    email: "",
    photo: null,
  });

  const [previewSource, setPreviewSource] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    if (!isAuthenticated) {
      alert("Please log in to continue.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setFormData((prev) => ({ ...prev, photo: base64 }));
      setPreviewSource(base64);
    } catch (err) {
      console.error("Error converting file to base64:", err);
    }
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.studentid.trim()) formErrors.studentid = "Student ID is required";
    if (!formData.Class.trim()) formErrors.Class = "Class is required";
    if (!formData.department.trim()) formErrors.department = "Department is required";
    if (!formData.semester.trim()) formErrors.semester = "Semester is required";
    if (!formData.bloodType.trim()) formErrors.bloodType = "Blood Type is required";
    if (!formData.email.trim()) formErrors.email = "Email is required";
    if (!formData.dateOfBirth.trim()) formErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.photo) formErrors.photo = "Photo is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:3003/api/addstudents", formData);
      if (res.status === 200) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="bg-[#1B2C39] h-full pb-12">
      <h1 className="text-center text-4xl font-semibold text-[#A0CE4E]">Add Student Data</h1>
      <section className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* Image Preview */}
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <img
              alt="Student Preview"
              className="w-full h-82 object-cover object-center rounded border border-[#A0CE4E]"
              src={previewSource || "https://via.placeholder.com/300"}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-4 w-full text-gray-700 border border-[#A0CE4E] rounded p-2"
            />
            {errors.photo && <p className="text-red-500">{errors.photo}</p>}
          </div>
          {/* Form Section */}
          <div className="lg:w-1/2 w-full lg:pl-10 space-y-4">
            {["name", "studentid", "Class", "bloodType", "email"].map((field) => (
              <div key={field}>
                <h2 className="text-sm font-semibold text-[#A0CE4E] tracking-widest">
                  {field === "Class" ? "Class" : field.charAt(0).toUpperCase() + field.slice(1)}
                </h2>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#A0CE4E] rounded-md text-gray-800"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
                {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
              </div>
            ))}
            {/* Dropdown Fields */}
            {["department", "semester"].map((field) => (
              <div key={field}>
                <h2 className="text-sm font-semibold text-[#A0CE4E] tracking-widest">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </h2>
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#A0CE4E] rounded-md text-gray-800"
                >
                  {field === "department" ? (
                    <>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                    </>
                  ) : (
                    <>
                      <option value="1st Semester">1st Semester</option>
                      <option value="2nd Semester">2nd Semester</option>
                    </>
                  )}
                </select>
                {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
              </div>
            ))}
            {/* Date Input */}
            <h2 className="text-sm font-semibold text-[#A0CE4E] tracking-widest">Date of Birth</h2>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-3 border border-[#A0CE4E] rounded-md text-gray-800"
            />
            {errors.dateOfBirth && <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>}
            {/* Buttons */}
            <div className="flex justify-between gap-4 mt-8">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-500 text-white rounded-lg"
              >
                Add Student
              </button>
              <button
                onClick={() => navigate("/vstudent")}
                className="px-6 py-3 bg-red-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddStudents;

