import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'


const StudentViewSD = () => {
  const [students, setStudents] = useState([]);
  const [department, setDepartment] = useState("All");
  const [name, setName] = useState("");

  const getStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3003/api/getstudent");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);


  const filteredStudents = students.filter((student) => {
    const matchesDepartment = department === "All" || student.department === department;
    const matchesName = student.name.toLowerCase().includes(name.toLowerCase());
    return matchesDepartment && matchesName;
  });

  return (
    <>  <section className="bg-[#1B2C39] py-10 px-12">
            <h1 className="text-center text-4xl font-semibold text-[#A0CE4E]">Students Lists</h1>
        <div className="flex flex-col sm:flex-row sm:justify-between mb-6 gap-4">
  <input
    type="text"
    placeholder="Search by name"
    className="p-2 border border-[#A0CE4E] rounded-lg w-full sm:w-auto"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  <select
    className="p-2 border border-[#A0CE4E] rounded-lg w-full sm:w-auto"
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
  >
    <option value="All">All Departments</option>
    <option value="Computer Science">Computer Science</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>

  </select>
</div>
           <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-screen pb-12 sm:pb-[40vh]">

  
       
        {filteredStudents.map((student, index) => (
           <Link to={`/view/${student._id}`} key={student._id}>
          <div
            key={index}
            className="my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-[#A0CE4E] dark:bg-[#A0CE4E] duration-300 hover:-translate-y-1"
          >
            <a href="#" className="cursor-pointer">
              <figure>
                <img
                  src={student.photo}
                  className="rounded-t h-80 w-full bg-cover p-5"
                  alt={student.name}
                />
                <figcaption className="p-4">
                  <p className="text-lg mb-4 font-bold leading-relaxed text-gray-100 dark:text-gray-100">
                    {student.name}
                  </p>
                  <small className="leading-5 text-[#1B2C39] dark:text-[#1B2C39]">
                    Department: {student.department}
                  </small>
                </figcaption>
              </figure>
            </a>
          </div>
          </Link>
        ))}
      </div>
    </section>
 
    </>

  );
};

export default StudentViewSD;
