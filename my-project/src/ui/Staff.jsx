

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const Staff = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const getData = async (username) => {
    try {
      const res = await axios.get(`http://localhost:3003/api/getstaffone`, {
        params: { username },
      });
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to continue.");
      return navigate("/login");
    }
    try {
      const res = await axios.get("http://localhost:3003/api/home", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { username, photo, role, email } = res.data.user;
      localStorage.setItem("user", JSON.stringify({ username, photo, role, email }));
      if (role !== "staff") {
        alert("Unauthorized access. Staff only.");
        return navigate("/login");
      }
      setUser({ username, image: photo, role, email });
      getData(username);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Failed to fetch user data. Please log in again.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    validateToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-full bg-white/30 text-white flex-col sm:flex-row ">

            <aside className="w-full md:w-64 bg-[#1B2C39] p-6 flex flex-col items-center h-full">
        <div className="space-y-6 w-full">
                   <div className="flex flex-col items-center text-center ">
            <img
              src={user.image || 'placeholder.jpg'}
              alt="User Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
            />
            <h2 className="text-lg font-bold mt-4">{user.username}</h2>
            <p className="text-sm text-gray-300">{user.role}</p>
          </div>


          <Link to={`/courses`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Courses
          </button></Link>

<Link to={`/fees`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Fee Structure
          </button></Link>

          <Link to={`/vstudent`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Students List
          </button></Link>

          <Link to={`/ssignup`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Create Account
          </button></Link>
          <Link to={`/addmarks`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Add Mark
          </button></Link>

          <Link to={`/marklist`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Marklist
          </button></Link>

          <Link to={`/notify`}>
          <button
            className="w-full mt-6 px-4 py-2 bg-[#A0CE4E] text-white rounded-md hover:bg-white/30 transition"
            
          >
            Notifications
          </button></Link>
          

          
               <button
            className="w-full mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

   
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 bg-white/80">
        <header className="py-4  ">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1B2C39]">
            <span className='text-[#1B2C39]'>Welcome :</span> {user.username}
          </h1>
        </header>

        <section className="grid gap-6 lg:gap-10 mt-8">
                   {user.username === data?.name ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                       <div className="p-6 rounded-lg bg-[#243B51] hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center items-center p-4">
                  <img
                    alt="Student Profile"
                    className="bg-cover object-center w-auto h-full max-h-96"
                    src={data?.photo || 'placeholder.jpg'}
                  />
                </div>
                <h1 className="text-lg md:text-xl font-bold bg-[#A0CE4E] text-white py-2 px-4 rounded-lg mx-auto mt-4 w-fit">
  {data?.name || 'Student Name'}
</h1>

              </div>

              <div className="rounded-lg p-6 bg-[#1F2D3D] shadow-lg">
                <h2 className="text-md md:text-lg xl:text-xl font-semibold text-[#A0CE4E] mb-4">Student Information</h2>
                <div className="space-y-2 md:space-y-4">
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2"> Name:</span>
    <p className='font-semibold text-xl'>{data?.name || "N/A"}</p>
  </div>
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2">Staff ID:</span>
    <p>{data?.staffid || "N/A"}</p>
  </div>
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2">Qualification:</span>
    <p>{data?.qualification || "N/A"}</p>
  </div>
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2">Experience:</span>
    <p>{data?.experience || "N/A"}</p>
  </div>
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2">Department:</span>
    <p>{data?.department || "N/A"}</p>
  </div>
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2">Semester:</span>
    <p>{data?.semester || "N/A"}</p>
  </div>
  <div className="flex items-center border-b border-gray-600 pb-2 mb-2">
    <span className="text-[#A0CE4E] font-semibold mr-2">Blood Type:</span>
    <p>{data?.bloodType || "N/A"}</p>
  </div>
  <div className="flex items-center">
    <span className="text-[#A0CE4E] font-semibold mr-2">Date of Birth:</span>
    <p>{data?.dateOfBirth || "N/A"}</p>
  </div>
</div>

              </div>
            </div>
          ) : (
            <p className="text-center">You are not authorized to view this profile.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Staff;
