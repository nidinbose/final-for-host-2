import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavLR from '../../Navlist/NavLR';

const Marklist = () => {
  const [markData, setMarkData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMarklist = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3003/api/getmarklist');
      setMarkData(response.data);
    } catch (err) {
      setError("Error fetching marklist data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarklist();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query) {
      const filtered = markData.filter((student) =>
        student.studentid.toLowerCase().includes(query.toLowerCase()) ||
        student.semester.toString().includes(query)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <div className="marklist-container p-4 bg-[#1B2C39] min-h-screen">
  
      <h2 className="text-2xl font-semibold mb-4 text-[#A0CE4E]">Marklist</h2>
      <div className="mt-[20vh] mb-4 w-36">
      <NavLR/>
        <input
          type="text"
          className="p-2 border rounded w-full text-gray-700 focus:outline-none"
          placeholder="Search by Student ID or Semester"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

         {searchTerm && filteredData.length > 0 ? (
        <div className="overflow-auto rounded-lg border border-[#A0CE4E]">
          <table className="min-w-full bg-[#1B2C39]">
            <thead>
              <tr className="text-[#A0CE4E] text-xs sm:text-sm md:text-base">
                <th className="py-2 px-4 border-b border-[#A0CE4E] font-semibold text-left">Student ID</th>
                <th className="py-2 px-4 border-b border-[#A0CE4E] font-semibold text-left">Semester</th>
                <th className="py-2 px-4 border-b border-[#A0CE4E] font-semibold text-left">Subject</th>
                <th className="py-2 px-4 border-b border-[#A0CE4E] font-semibold text-left">Marks</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student) =>
                student.subjects.map((subject, index) => (
                  <tr key={subject._id} className="hover:bg-[#A0CE4E] text-white text-xs sm:text-sm md:text-base">
                    {index === 0 && (
                      <>
                        <td rowSpan={student.subjects.length} className="py-2 px-4 border-b border-[#A0CE4E]">
                          {student.studentid}
                        </td>
                        <td rowSpan={student.subjects.length} className="py-2 px-4 border-b border-[#A0CE4E]">
                          {student.semester}
                        </td>
                      </>
                    )}
                    <td className="py-2 px-4 border-b border-[#A0CE4E] font-bold">{subject.name}</td>
                    <td className="py-2 px-4 border-b border-[#A0CE4E] font-bold">{subject.mark}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && searchTerm && <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default Marklist;
