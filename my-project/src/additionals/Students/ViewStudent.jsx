import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewStudent = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");
  const [selectedSemester, setSelectedSemester] = useState(1);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:3003/api/getstudentedit/${id}`);
      setData(res.data);
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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3003/api/deletestudent/${id}`);
      navigate('/vstudent');
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/editstudent/${id}`);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in to continue.");
      navigate('/login');
    } else {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.role);
    }
  }, [navigate]);

  useEffect(() => {
    getData();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">Loading...</div>;
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center p-4 bg-gray-500">No student data found.</div>;
  }

  const filteredMarks = marks.filter((mark) => mark.semester === selectedSemester);

  return (
    <div className="min-h-screen pb-[20vh] lg:pb-[45vh] md:pb-[40vh] bg-[#1B2C39]">
      <h1 className="text-center text-3xl sm:text-4xl font-bold text-[#A0CE4E] ">Student's Profile</h1>
      <section className="text-gray-700 body-font overflow-hidden bg-[#1B2C39]">
        <div className="container px-4 py-8 md:py-12 lg:py-16 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            
                     <div className="hover:bg-[#A0CE4E] border-[#A0CE4E] p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="grid grid-cols-1 gap-4 bg-transparent space-y-7">
                <div className="bg-transparent h-80 w-full flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10">
                  <img
                    alt="Student Profile"
                    className="object-cover object-center h-96 w-auto"
                    src={data.photo}
                  />
                </div>
                <div className="h-full w-full flex justify-center items-center p-4">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white text-center bg-[#A0CE4E] hover:bg-[#002244] w-64 h-12 rounded-lg ">{data.name}</h1>
                </div>
              </div>
            </div>
            <div className="rounded shadow-lg p-6 space-y-4 bg-[#A0CE4E]">
              <h2 className="text-lg font-semibold text-gray-100">Student Information</h2>
              <div className="bg-violet-50 p-3 rounded-md border">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-900 ml-2">{data.name}</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-md border">
                <span className="text-gray-600">Student ID:</span>
                <span className="font-medium text-gray-900 ml-2">{data.studentid}</span>
              </div>
              <div className="bg-violet-50 p-3 rounded-md border">
                <span className="text-gray-600">Class:</span>
                <span className="font-medium text-gray-900 ml-2">{data.Class}</span>
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
              <div className="bg-emerald-50 p-3 rounded-md border">
                <span className="text-gray-600">Email address:</span>
                <span className="font-medium text-gray-900 ml-2">{data.email}</span>
              </div>
            </div>
            <div className="p-6 w-full lg:w-[90vw] md:w-[84vw] md:ml-10 lg:ml-7 mx-auto border border-[#A0CE4E] rounded-xl shadow-md space-y-4 bg-transparant">
              <h2 className="text-xl font-semibold text-[#A0CE4E]">Student Marks</h2>
              <label htmlFor="semester" className="text-[#A0CE4E]">Select Semester:</label>
              <select
                id="semester"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(parseInt(e.target.value))}
                className="w-full p-2 border rounded-md bg-white/80"
              >
                {[...Array(8)].map((_, index) => {
                  const semester = index + 1;
                  return (
                    <option key={semester} value={semester}
                    className="bg-[#A0CE4E]">
                      Semester {semester}
                    </option>
                  );
                })}
              </select>

              {filteredMarks.length > 0 ? (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-[#A0CE4E]">Subjects</h3>
                  <ul className="space-y-2">
                    {filteredMarks[0].subjects.map((subject) => (
                      <li key={subject._id} className="p-2 border border-[#A0CE4E] rounded-md">
                        <p className="text-white font-bold"><strong className="text-[#A0CE4E] font-semibold">Subject:</strong> {subject.name}</p>
                        <p className="text-white font-bold"><strong className="text-emerald-500 font-semibold">Mark:</strong> {subject.mark}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-4 text-gray-500">No marks available for this semester.</p>
              )}
            </div>
          </div>
        </div>
      </section>

    
      {userRole !== 'student' && (
        <div className="flex justify-end px-6 items-end gap-6 mt-6 lg:col-span-2">
          <a
            href="#_"
            className="rounded-md px-4 py-2 sm:px-5 sm:py-3 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#A0CE4E] text-indigo-600"
            onClick={handleEdit}
          >
            <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#A0CE4E] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
            <span className="relative text-[#A0CE4E] transition duration-300 group-hover:text-white ease">Edit</span>
          </a>

          <a
            href="#_"
            className="rounded-md px-4 py-2 sm:px-5 sm:py-3 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#A0CE4E] text-indigo-600"
            onClick={handleDelete}
          >
            <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#A0CE4E] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
            <span className="relative text-[#A0CE4E] transition duration-300 group-hover:text-white ease">Delete</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default ViewStudent;
