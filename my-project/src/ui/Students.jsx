import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';

const Students = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [marks, setMarks] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const navigate = useNavigate();

  const getData = async (username) => {
    try {
      const res = await axios.get(`http://localhost:3003/api/getstudentone`, {
        params: { username },
      });
      setData(res.data);
      console.log(res.data);
      fetchMarks(res.data.studentid);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMarks = async (studentid) => {
    try {
      const res = await axios.get(`http://localhost:3003/api/getmarkedit/${studentid}`);
      setMarks(res.data); 
    } catch (error) {
      console.error("Error fetching marks:", error);
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
      if (role !== "student") {
        alert("Unauthorized access. Students only.");
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

  const filteredMarks = marks.filter((mark) => mark.semester === selectedSemester);

  return (
    <div className='bg-[#1B2C39]'>
    <div className="flex min-h-full bg-[#1B2C39] text-white flex-col md:flex-row">
    <aside className="w-full md:w-64 bg-[#A0CE4E] p-6 flex flex-col items-center">
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
<Link to={`/students`}>  <button
    className="w-full mt-6 px-4 py-2 bg-[#1B2C39] text-white rounded-md hover:bg-emerald-500 transition"
    
  >
    Student Home
  </button></Link>

  <Link to={`/courses`}><button
    className="w-full mt-6 px-4 py-2 bg-[#1B2C39] text-white rounded-md hover:bg-emerald-500 transition"
    
  >
    Courses
  </button></Link>

<Link to={`/fees`}>  <button
    className="w-full mt-6 px-4 py-2 bg-[#1B2C39] text-white rounded-md hover:bg-[#A0CE4E] transition"
    
  >
    Fee Structure
  </button></Link>

<Link to={`/notify`}>  <button
    className="w-full mt-6 px-4 py-2 bg-[#1B2C39] text-white rounded-md hover:bg-[#A0CE4E] transition"
    
  >
    Notifications
  </button></Link>


       <button
    className="w-full mt-6 px-4 py-2 bg-[#1B2C39] text-white rounded-md hover:bg-red-600 transition "
    onClick={handleLogout}
  >
    Logout
  </button>
</div>
</aside>


<main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12">
<header className="py-4">
  <h1 className="text-2xl md:text-3xl font-bold text-[#A0CE4E]">
    <span className='text-white'>Welcome :</span> {user.username}
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
<span className="text-[#A0CE4E] font-semibold mr-2">Student ID:</span>
<p>{data?.studentid || "N/A"}</p>
</div>
<div className="flex items-center border-b border-gray-600 pb-2 mb-2">
<span className="text-[#A0CE4E] font-semibold mr-2">Class:</span>
<p>{data?.class || "N/A"}</p>
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
<div className="w-full mx-auto border-[#A0CE4E] rounded-xl shadow-md space-y-4 bg-transparent p-10">
  <h2 className="text-2xl font-semibold text-[#A0CE4E] text-center mb-5">Student Marks</h2>

  <label htmlFor="semester" className="text-[#A0CE4E]">Select Semester:</label>
  <select
    id="semester"
    value={selectedSemester}
    onChange={(e) => setSelectedSemester(parseInt(e.target.value))}
    className="w-full p-2 border border-[#A0CE4E] text-[#A0CE4E] rounded-md bg-[#1B2C39]"
  >
    {[...Array(8)].map((_, index) => {
      const semester = index + 1;
      return (
        <option key={semester} value={semester}>
          Semester {semester}
        </option>
      );
    })}
  </select>
    {filteredMarks.length > 0 ? (
    <div className="mt-6 overflow-x-auto w-[50vw] mx-auto">
      {/* <h3 className="text-lg font-semibold text-[#A0CE4E] mb-4">Subjects</h3> */}
      <table className="min-w-full bg-transparent border border-[#A0CE4E] rounded-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-[#A0CE4E] text-left text-[#A0CE4E] font-semibold">Subject</th>
            <th className="px-4 py-2 border-b border-[#A0CE4E] text-left text-[#A0CE4E] font-semibold">Mark</th>
          </tr>
        </thead>
        <tbody>
          {filteredMarks[0].subjects.map((subject) => (
            <tr key={subject._id}>
              <td className="px-4 py-2 border-b border-[#A0CE4E] text-white">{subject.name}</td>
              <td className="px-4 py-2 border-b border-[#A0CE4E] text-white">{subject.mark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-white">No marks found for the selected semester.</p>
  )}
</div>

</div>
  );
};

export default Students;