import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseOverview = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Course: '',
    Message: '',
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3003/api/getcourseid/${id}`);
        if (response.data) {
          setCourseData(response.data);
        } else {
          setError('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError('Failed to load course data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info('Submitting your message...', { autoClose: 1500 });

    try {
      const response = await axios.post('http://localhost:3003/api/contactn', formData);
      if (response.status === 200) {
        toast.success('Your message has been sent successfully!', { autoClose: 3000 });
        setFormData({
          Name: '',
          Email: '',
          Phone: '',
          Course: '',
          Message: '',
        });
      } else {
        // toast.error('Failed to send your message. Please try again.', { autoClose: 3000 });
      }
    } catch (error) {
      console.error('Error sending contact details:', error);
      toast.error('An error occurred. Please try again.', { autoClose: 3000 });
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading course details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!courseData) {
    return <p className="text-center text-gray-600">Course data is unavailable.</p>;
  }

  return (
    <div className="p-12 mx-auto px-4 py-8 mt-[10h] bg-[#1D1D1D] pt-[12vh]">
      <ToastContainer />
      <div className="container mx-auto max-w-7xl px-4 py-8">
    <ToastContainer />
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    <div>
         <div className="flex justify-start space-x-4 mb-6">
        <button
          className={`px-4 py-2 font-bold ${
            activeTab === 'Overview' ? 'bg-[#A0CE4E] text-white' : 'bg-gray-200 text-gray-800'
          } rounded-md`}
          onClick={() => setActiveTab('Overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-bold ${
            activeTab === 'Fees' ? 'bg-[#A0CE4E] text-white' : 'bg-gray-200 text-gray-800'
          } rounded-md`}
          onClick={() => setActiveTab('Fees')}
        >
          Fees
        </button>
      </div>

            {activeTab === 'Overview' && (
        <div className=''>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#A0CE4E]">
            {courseData.title || 'Course Title'}
          </h2>
          <p className="text-gray-400 text-sm mt-4">
            {courseData.description || 'Course description not available.'}
          </p>
        </div>
      )}

      {activeTab === 'Fees' && (
        <div>
          <p className="text-[#A0CE4E] font-bold border border-[#A0CE4E] p-5">
            {courseData.title || 'Course Title'}
          </p>
          <table className="w-full border border-[#A0CE4E] bg-[#1D1D1D]">
            <tbody className="text-[#A0CE4E]">
              <tr className="border-b border-[#A0CE4E]">
                <td className="font-bold text-[#A0CE4E] px-2 py-2 w-32">Fees:</td>
                <td className="px-2 py-2 text-emerald-500 font-semibold">
                  INR: {courseData.fees || 'N/A'}
                </td>
              </tr>
              <tr className="border-b border-[#A0CE4E]">
                <td className="font-bold px-2 py-2">Year:</td>
                <td className="px-2 py-2 font-bold text-white">{courseData.year || 'N/A'}</td>
              </tr>
              <tr>
                <td className="font-bold px-2 py-2">Course Head:</td>
                <td className="px-2 py-2 text-red-600 font-bold">{courseData.head || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
      <div className="flex flex-col justify-center space-y-4">
        <img
          src={courseData.photo || '/default-image.jpg'}
          alt={courseData.title || 'Course Image'}
          className="w-full h-96 bg-cover rounded-lg shadow-md"
        />
        <div className="p-4 mx-auto max-w-xl bg-transparent border border-[#A0CE4E] rounded-lg shadow mt-5">
          <h1 className="text-2xl text-[#A0CE4E] font-bold text-center">Contact Us</h1>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full rounded-md py-2 px-4 text-gray-800 bg-gray-100 focus:ring-2 focus:ring-[#A0CE4E] text-sm outline-none"
              required
            />
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full rounded-md py-2 px-4 text-gray-800 bg-gray-100 focus:ring-2 focus:ring-[#A0CE4E] text-sm outline-none"
              required
            />
            <input
              type="number"
              name="Phone"
              value={formData.Phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="w-full rounded-md py-2 px-4 text-gray-800 bg-gray-100 focus:ring-2 focus:ring-[#A0CE4E] text-sm outline-none"
              required
            />
            <input
              type="text"
              name="Course"
              value={formData.Course}
              onChange={handleInputChange}
              placeholder="Preferred Course"
              className="w-full rounded-md py-2 px-4 text-gray-800 bg-gray-100 focus:ring-2 focus:ring-[#A0CE4E] text-sm outline-none"
            />
            <textarea
              name="Message"
              value={formData.Message}
              onChange={handleInputChange}
              placeholder="Message"
              rows="5"
              className="w-full rounded-md py-2 px-4 text-gray-800 bg-gray-100 focus:ring-2 focus:ring-[#A0CE4E] text-sm outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full py-2 bg-[#A0CE4E] text-white rounded-md font-semibold hover:bg-emerald-600 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
    </div>
  );
};

export default CourseOverview;


