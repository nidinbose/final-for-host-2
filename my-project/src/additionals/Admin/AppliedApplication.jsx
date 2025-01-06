import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppliedApplication = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplicationData = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/getapplied');
      setApplications(response.data); 
    } catch (err) {
      console.error(err);
      setError('Failed to fetch application data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationData();
  }, []);

  const handleApprove = async (application) => {
    try {
      await axios.post('http://localhost:3003/api/send-approveemail', {
        email: application.email,
        name: `${application.firstName} ${application.lastName}`,
      });
      alert(`Email sent successfully to ${application.email}!`);
    } catch (error) {
      console.error(error);
      alert('Failed to send the email.');
    }
  };

  const handleReject = async (application) => {
    try {
        await axios.post('http://localhost:3003/api/send-rejection-email', {
        email: application.email,
        name: `${application.firstName} ${application.lastName}`,
      });

         await axios.delete(`http://localhost:3003/api/deleteapply/${application._id}`);

      setApplications((prevApplications) =>
        prevApplications.filter((app) => app._id !== application._id)
      );

      alert(`Rejection email sent to ${application.email} and application deleted.`);
    } catch (error) {
      console.error(error);
      alert('Failed to reject the application.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (applications.length === 0) return <div>No application data available.</div>;

  return (
    <div className="p-6 xl:p-12 bg-[#1D1D1D] min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white">Applied Applications</h2>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        {applications.map((application, index) => (
          <div key={application._id} className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2 bg-[#A0CE4E]">
              Application {index + 1}
            </h3>
            <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">Field</th>
                  <th className="px-4 py-2 text-left font-semibold border-b border-gray-300">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(application).map(([key, value]) =>
                  key !== "_id" && key !== "__v" ? (
                    <tr key={key} className="border-b">
                      <td className="px-4 py-2 font-medium text-gray-700 capitalize border-r border-gray-300">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </td>
                      <td className="px-4 py-2 text-gray-600">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
            <div className="flex gap-12 items-center justify-end p-5">
              <button
                onClick={() => handleApprove(application)}
                className="px-6 py-2 bg-[#A0CE4E] text-white font-semibold rounded-lg hover:bg-emerald-500 transition"
              >
                Approve
              </button>

              <button
                onClick={() => handleReject(application)}
                className="px-6 py-2 bg-[#A0CE4E] text-white font-semibold rounded-lg hover:bg-red-600 transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedApplication;


