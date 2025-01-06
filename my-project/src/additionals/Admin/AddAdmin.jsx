import React, { useState } from "react";
import { motion } from "framer-motion";
import NavLR from "../../Navlist/NavLR";

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    adminId: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.adminId) formErrors.adminId = "Admin ID is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.password) formErrors.password = "Password is required";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:3003/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add admin");
      }

      console.log("Admin added successfully");
    
      setFormData({
        name: "",
        adminId: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 flex items-center justify-center p-6">
      <NavLR/>
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Add Admin
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Admin ID</label>
            <input
              type="text"
              name="adminId"
              value={formData.adminId}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.adminId && (
              <span className="text-red-500 text-sm">{errors.adminId}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          {errors.submit && (
            <span className="text-red-500 text-sm text-center block">
              {errors.submit}
            </span>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold text-lg mt-4 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Admin"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddAdmin;
