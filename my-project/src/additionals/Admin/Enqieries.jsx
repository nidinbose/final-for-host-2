import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/getcontactslist'); 
      setEnquiries(response.data); 
    } catch (err) {
      console.error(err);
      setError('Failed to fetch enquiries.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/api/deletecontact/${id}`);
      setEnquiries((prev) => prev.filter((enquiry) => enquiry._id !== id)); 
      alert('Enquiry deleted successfully.');
    } catch (err) {
      console.error(err);
      alert('Failed to delete the enquiry.');
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (enquiries.length === 0) return <div>No enquiries available.</div>;

  return (
    <div className="p-6 xl:p-12 bg-[#1D1D1D] min-h-screen pt-12">
      <h2 className="text-2xl font-bold mb-4 text-white">Enquiries</h2>
      <div className="overflow-x-auto bg-  shadow-lg rounded-lg">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 ">
              <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">Name</th>
              <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">Email</th>
              <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">Phone</th>
              <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">Course</th>
              <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">Message</th>
              <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry._id} className="border-b">
                <td className="px-4 py-2 font-medium text-[#A0CE4E] border-r border-gray-300">{enquiry.Name}</td>
                <td className="px-4 py-2 text-[#A0CE4E] border-r border-gray-300">{enquiry.Email}</td>
                <td className="px-4 py-2 text-[#A0CE4E] border-r border-gray-300">{enquiry.Phone}</td>
                <td className="px-4 py-2 text-[#A0CE4E] border-r border-gray-300">{enquiry.Course}</td>
                <td className="px-4 py-2 text-[#A0CE4E] border-r border-gray-300">{enquiry.Message}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(enquiry._id)}
                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquiries;
