import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import logoImage from '/images/a.avif';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    cpassword: '',
    role: 'student',
    photo: '', 
  });

  const [photoPreview, setPhotoPreview] = useState(''); 

  const navigate = useNavigate(); 
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          photo: reader.result,
        }));
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!validatePassword(formData.password)) {
      alert(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }

    try {
      const response = await axios.post('http://localhost:3003/api/user', formData);
      alert('Signup successful!');
      navigate('/login');  
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed!');
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="flex flex-col-reverse md:flex-row w-full justify-end items-center space-y-6 md:space-y-0 md:space-x-12 mt-10">
        <div className="logo mb-6 md:mb-0 flex-shrink-0">
          <img
            src={logoImage}
            alt="logo"
            className="w-32 md:w-36 lg:w-48 xl:w-[620px]"
          />
        </div>

        <div className="lp flex flex-col items-center md:items-start w-full">
          <div className="field w-full md:w-3/4 lg:w-1/2 bg-white shadow-lg p-6 rounded-lg">
            <h1 className="text-lg font-semibold mb-4 text-center md:text-left">
              Welcome Back :)
            </h1>
            <p className="text-sm text-gray-500 mb-8 text-center md:text-left">
              To keep connected with us please login with your personal
              information by email address and password
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="text-xs text-gray-400 font-semibold block"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  className="w-full bg-gray-100 p-2 rounded-lg mt-2 text-sm focus:outline-none"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="text-xs text-gray-400 font-semibold block"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="email"
                  className="w-full bg-gray-100 p-2 rounded-lg mt-2 text-sm focus:outline-none"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="text-xs text-gray-400 font-semibold block"
                  htmlFor="phone"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  placeholder="Phone number"
                  name="phone"
                  id="phone"
                  className="w-full bg-gray-100 p-2 rounded-lg mt-2 text-sm focus:outline-none"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="text-xs text-gray-400 font-semibold block"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  id="username"
                  className="w-full bg-gray-100 p-2 rounded-lg mt-2 text-sm focus:outline-none"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="text-xs text-gray-400 font-semibold block"
                  htmlFor="password"
                >
                  Enter password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  className="w-full bg-gray-100 p-2 rounded-lg mt-2 text-sm focus:outline-none"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="text-xs text-gray-400 font-semibold block"
                  htmlFor="cpassword"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="cpassword"
                  id="cpassword"
                  className="w-full bg-gray-100 p-2 rounded-lg mt-2 text-sm focus:outline-none"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-xs text-gray-400 mb-2"
                >
                  Choose a role:
                </label>
                <select
                  id="role"
                  name="role"
                  className="w-full p-2 border rounded-lg bg-white text-black"
                  onChange={handleInputChange}
                  value={formData.role}
                >
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="student">Student</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="photo"
                  className="block text-xs text-gray-400 mb-2"
                >
                  Upload Photo:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full p-2 border rounded-lg bg-white text-black"
                />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Photo Preview"
                    className="mt-4 w-32 h-32 object-cover rounded-full"
                  />
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600"
                >
                  Sign up
                </button>
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="w-full py-3 bg-gray-200 text-gray-500 font-semibold rounded-full hover:bg-gray-300"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

