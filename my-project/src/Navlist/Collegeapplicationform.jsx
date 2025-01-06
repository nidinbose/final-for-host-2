import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Components/css/C.css'

const CollegeApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    sex: '',
    religion: '',
    cast: '',
    address: '',
    pincode: '',
    schoolName: '',
    yearOfPassout: '',
    aadharNo: '',
    sslcRegistrationNumber: '',
    higherSecondaryRegistrationNumber: '',
    percentageHigherSecondary: '',
    phone:'',
    email:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3003/api//applynowf', formData);
      toast.success('Application submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('College Application Form', 10, 10);

    Object.entries(formData).forEach(([key, value], index) => {
      doc.text(`${key.replace(/([A-Z])/g, ' $1')}: ${value}`, 10, 20 + index * 10);
    });

    doc.save('College_Application_Form.pdf');
    toast.info('PDF downloaded successfully!');
  };

  return (
    <div className="max-w-full mx-auto p-6 sm:p-8 md:p-12 xl:p-16 bg-[#1D1D1D] shadow-lg overflow-x-auto">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row justify-center items-center mb-6">
        <img src="/images/pl.png" alt="College Logo" className="h-16 w-16 mr-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">Cambridge College</h2>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-center text-[#A0CE4E]">Application Form</h3>
        <Link to={``}>
          <h3 className="text-sm font-semibold text-center text-blue-400 underline">Use computer to access form</h3>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
      <table className="w-full bg-[#A0CE4E] rounded-xl border-[#A0CE4E] overflow-x-auto">
  <tbody>
    <tr>
      <td className="p-4 border text-violet-600">First Name</td>
      <td className="p-4 border">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </td>
      <td className="p-4 border text-violet-600">Last Name</td>
      <td className="p-4 border">
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </td>
    </tr>
    <tr>
      <td className="p-4 border text-violet-600">Date of Birth</td>
      <td className="p-4 border">
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </td>
      <td className="p-4 border text-violet-600">Sex</td>
      <td className="p-4 border">
        <select
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="" disabled>Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </td>
    </tr>
    <tr>
      <td className="p-4 border text-violet-600">Religion</td>
      <td className="p-4 border">
        <input
          type="text"
          name="religion"
          value={formData.religion}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </td>
      <td className="p-4 border text-violet-600">Caste</td>
      <td className="p-4 border">
        <input
          type="text"
          name="cast"
          value={formData.cast}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </td>
    </tr>
    <tr>
      <td className="p-4 border text-violet-600">Address</td>
      <td className="p-4 border" colSpan="3">
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="2"
        />
      </td>
    </tr>
    <tr>
      <td className="p-4 border text-violet-600">Pincode</td>
      <td className="p-4 border">
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </td>
      <td className="p-4 border text-violet-600">School Name</td>
      <td className="p-4 border">
        <input
          type="text"
          name="schoolName"
          value={formData.schoolName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </td>
    </tr>
    <tr>
      <td className="p-4 border text-violet-600">Year of Passout</td>
      <td className="p-4 border">
        <input
          type="number"
          name="yearOfPassout"
          value={formData.yearOfPassout}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </td>
      <td className="p-4 border text-violet-600">Aadhar No.</td>
      <td className="p-4 border">
        <input
          type="text"
          name="aadharNo"
          value={formData.aadharNo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </td>
    </tr>
    <tr>
      <td className="p-4 border text-violet-600">SSLC Registration Number</td>
      <td className="p-4 border">
        <input
          type="text"
          name="sslcRegistrationNumber"
          value={formData.sslcRegistrationNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </td>
      <td className="p-4 border text-violet-600">Higher Secondary Registration No.</td>
      <td className="p-4 border">
        <input
          type="text"
          name="higherSecondaryRegistrationNumber"
          value={formData.higherSecondaryRegistrationNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </td>
    </tr>
    <tr>
      <td className="p-4 border text-violet-600">Percentage in Higher Secondary</td>
      <td className="p-4 border" colSpan="3">
        <input
          type="number"
          name="percentageHigherSecondary"
          value={formData.percentageHigherSecondary}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </td>
    </tr>
   
    <tr>
      <td className="p-4 border text-violet-600">Email</td>
      <td className="p-4 border" colSpan="3">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </td>
    </tr>

    <tr>
      <td className="p-4 border text-violet-600">Phonenumber</td>
      <td className="p-4 border" colSpan="3">
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </td>
    </tr>
  </tbody>
</table>

        <div className="flex flex-col sm:flex-row sm:space-x-4 justify-end items-center">
          <button
            type="submit"
            className="w-full sm:w-36 bg-[#A0CE4E] text-white p-2 rounded mt-4 hover:bg-emerald-500 transition"
          >
            Submit
          </button>
          <button
            type="button"
            className="w-full sm:w-36 bg-[#A0CE4E] text-white p-2 rounded mt-4 hover:bg-red-600 transition"
            onClick={generatePDF}
          >
            Download PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default CollegeApplicationForm;
