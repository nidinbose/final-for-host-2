import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminFooter from "../additionals/Admin/AdminFooter";
import AdminNavbar from "../additionals/Admin/AdminNavbar";

const StaffView = () => {
  const [staff, setStaff] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [name, setName] = useState("");

  const getStaff = async () => {
    try {
      const res = await axios.get("http://localhost:3003/api/getstaff");
      setStaff(res.data);

           const uniqueDepartments = [
        "All",
        ...new Set(res.data.map((staff) => staff.department)),
      ];
      setDepartments(uniqueDepartments);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);
  const filteredStaff = staff.filter((s) => {
    const matchesDepartment =
      selectedDepartment === "All" || s.department === selectedDepartment;
    const matchesName = s.name.toLowerCase().includes(name.toLowerCase());
    return matchesDepartment && matchesName;
  });

  return (
    <>
    
    <section className="bg-[#1B2C39] py-[10vh] px-12 min-h-screen">

      <h1 className="text-center text-4xl font-semibold text-[#A0CE4E]">Staff Lists</h1>
      {/* Filter Inputs */}
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
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-screen pb-12 sm:pb-[40vh]">
        {filteredStaff.map((staffMember) => (
          <Link to={`/views/${staffMember._id}`} key={staffMember._id}>
            <div
              className="rounded shadow-lg bg-[#A0CE4E] duration-300 hover:-translate-y-1"
            >
              <figure>
                <img
                  src={staffMember.photo}
                   className="rounded-t h-80 w-full w-full bg-cover p-4"
                  alt={staffMember.name}
                />
                <figcaption className="p-4">
                  <p className="text-lg mb-4 font-bold leading-relaxed text-gray-100">
                    {staffMember.name}
                  </p>
                  <small className="leading-5 text-[#1B2C39]">
                    Department: {staffMember.department}
                  </small>
                </figcaption>
              </figure>
            </div>
          </Link>
        ))}
      </div>
    </section>
      </>
  );
};

export default StaffView;
