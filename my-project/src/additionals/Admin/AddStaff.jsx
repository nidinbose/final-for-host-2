  import React, { useState, useEffect } from "react";
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
import AdminFooter from "./AdminFooter";

  const AddStaff = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: "",
      staffid: "",
      experience: "",
      qualification: "",
      department: "Computer Science", 
      semester: "1st Semester", 
      bloodType: "",
      dateOfBirth: "",
      photo: null
    });

    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
      const isAuthenticated = localStorage.getItem('token');
      if (!isAuthenticated) {
          alert("Please log in to continue.");
          navigate('/login');
      }
    }, [navigate]);

    const handleChange = (e) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setFormData((prev) => ({ ...prev, photo: base64 }));
      setPreview(URL.createObjectURL(file));
    };

    function convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = (error) => reject(error);
      });
    }

    const validate = () => {
      const newErrors = {};

      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.staffid) newErrors.staffid = "Staff ID is required";
      if (!formData.experience) newErrors.experience = "Experience is required";
      if (!formData.qualification) newErrors.qualification = "Qualification is required";
      if (!formData.department) newErrors.department = "Department is required";
      if (!formData.semester) newErrors.semester = "Semester is required";
      if (!formData.bloodType) newErrors.bloodType = "Blood Type is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
      if (!formData.photo) newErrors.photo = "Photo is required";

      return newErrors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      try {
        const res = await axios.post("http://localhost:3003/api/addstaff", formData);
        if (res.status === 200) {
          navigate('/admin');
        }
      } catch (error) {
        console.error("Error adding staff:", error);
      }
    };

    return (
      <div className="bg-[#1B2C39] h-full pb-[12vh] md:pb-[30vh] lg:pb-[16vh] xl:pb-[20vh]">
        <h1 className="text-center text-4xl font-semibold text-[#A0CE4E] p-10">Add Staff Data</h1>
        <section className="text-gray-700 body-font overflow-hidden bg-[#1B2C39] h-full min-h-screen">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap xl:space-x-12" >
            <div className="w-24 sm:w-32 md:w-48 lg:w-64 xl:w-80 2xl:w-96">
                <img
                  alt="Staff"
                  className="w-full h-82 object-cover object-center rounded border border-gray-200"
                  src={preview || formData.photo || "https://via.placeholder.com/300"}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-4 w-full text-gray-700 border border-gray-300 rounded p-2"
                />
                {errors.photo && <p className="text-red-500">{errors.photo}</p>}
              </div>
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
  {[
    { label: "Staff Name", name: "name", placeholder: "Staff Name", type: "text" },
    { label: "Staff ID", name: "staffid", placeholder: "Staff ID", type: "text" },
    { label: "Experience", name: "experience", placeholder: "Experience", type: "text" },
    { label: "Qualification", name: "qualification", placeholder: "Qualification", type: "text" },
    { label: "Blood Group", name: "bloodType", placeholder: "Blood Group", type: "text" },
  ].map((field, index) => (
    <div key={index} className="mb-4">
      <label className="text-sm font-semibold text-[#A0CE4E]">{field.label}</label>
      <input
        type={field.type}
        name={field.name}
        value={formData[field.name]}
        onChange={handleChange}
        className="leading-relaxed w-full mb-2 p-3 border rounded-md border-gray-300 focus:outline-none focus:border-[#A0CE4E] transition duration-300 ease-in-out"
        placeholder={field.placeholder}
      />
      {errors[field.name] && <p className="text-red-500 text-xs">{errors[field.name]}</p>}
    </div>
  ))}

  <div className="mb-4">
    <label className="text-sm font-semibold text-[#A0CE4E]">Department</label>
    <select
      name="department"
      value={formData.department}
      onChange={handleChange}
      className="leading-relaxed w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:border-[#A0CE4E] transition duration-300 ease-in-out"
    >
      <option value="" disabled>Select Department</option>
      <option value="Computer Science">Computer Science</option>
      <option value="Electrical Engineering">Electrical Engineering</option>
      <option value="Civil Engineering">Civil Engineering</option>
      <option value="Mechanical Engineering">Mechanical Engineering</option>
    </select>
    {errors.department && <p className="text-red-500 text-xs">{errors.department}</p>}
  </div>

  <div className="mb-4">
    <label className="text-sm font-semibold text-[#A0CE4E]">Semester</label>
    <select
      name="semester"
      value={formData.semester}
      onChange={handleChange}
      className="leading-relaxed w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:border-[#A0CE4E] transition duration-300 ease-in-out"
    >
      <option value="" disabled>Select Semester</option>
      <option value="1st Semester">1st Semester</option>
      <option value="2nd Semester">2nd Semester</option>
    </select>
    {errors.semester && <p className="text-red-500 text-xs">{errors.semester}</p>}
  </div>

  <div className="mb-4">
    <label className="text-sm font-semibold text-[#A0CE4E]">Date of Birth</label>
    <input
      type="date"
      name="dateOfBirth"
      value={formData.dateOfBirth}
      onChange={handleChange}
      className="leading-relaxed w-full p-3 border rounded-md border-gray-300 focus:outline-none focus:border-[#A0CE4E] transition duration-300 ease-in-out"
    />
    {errors.dateOfBirth && <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>}
  </div>

  <div className="flex mt-6 gap-5 justify-end">
    <button
      className="relative inline-flex items-center px-6 py-3 font-semibold text-indigo-600 border-2 border-[#A0CE4E] rounded-md group overflow-hidden transition duration-300"
      onClick={handleSubmit}
    >
      <span className="absolute inset-0 w-full h-full bg-[#A0CE4E] transition-all duration-300 ease-out transform scale-0 group-hover:scale-100"></span>
      <span className="relative text-[#A0CE4E] group-hover:text-white">Add Staff</span>
    </button>

    <button
      className="relative inline-flex items-center px-6 py-3 font-semibold text-[#A0CE4E] border-2 border-[#A0CE4E] rounded-md group overflow-hidden transition duration-300"
      onClick={() => navigate("/admin")}
    >
      <span className="absolute inset-0 w-full h-full bg-red-500 transition-all duration-300 ease-out transform scale-0 group-hover:scale-100"></span>
      <span className="relative text-[#A0CE4E] group-hover:text-white">Go Back</span>
    </button>
  </div>
</div>

            </div>
          </div>
        </section>
            </div>
    );
  };

  export default AddStaff;
