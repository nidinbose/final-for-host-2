import React, { useState } from 'react';
import axios from 'axios';

function AddMarksForm() {
 
  const [formData, setFormData] = useState({
    semester: '',
    studentid: '',
    subject: {
      name: '',
      mark: '',
    },
  });

   const [responseMessage, setResponseMessage] = useState('');

  const subjectsBySemester = {
    1: ['Math', 'English 101', 'Physics 101'],
    2: ['Math', 'English 102', 'Chemistry 101'],
    3: ['Calculus', 'Literature', 'Biology 101'],
    4: ['Algebra', 'History 101', 'Physics 102'],
    5: ['Statistics', 'Sociology', 'Computer Science 101'],
    6: ['Geometry', 'Political Science', 'Biology 102'],
    7: ['Advanced Calculus', 'Economics', 'Physics 201'],
    8: ['Discrete Math', 'Philosophy', 'Chemistry 201'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' || name === 'mark') {
      setFormData((prevData) => ({
        ...prevData,
        subject: {
          ...prevData.subject,
          [name]: name === 'mark' ? Number(value) : value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/api/addmarks', formData);
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(
        error.response?.data?.message || 'Error adding subject and mark'
      );
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Marks</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="semester" className="block text-gray-700">
            Semester
          </label>
          <select
  id="semester"
  name="semester"
  value={formData.semester}
  onChange={handleChange}
  className="mt-1 block w-full p-2 border rounded overflow-auto"
  required
>
  <option value="">Select Semester</option>
  {Array.from({ length: 8 }, (_, i) => (
    <option key={i + 1} value={i + 1}>
      Semester {i + 1}
    </option>
  ))}
</select>


        </div>

        <div className="mb-4">
          <label htmlFor="studentid" className="block text-gray-700">
            Student ID
          </label>
          <input
            type="text"
            id="studentid"
            name="studentid"
            value={formData.studentid}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Subject Name
          </label>
          <select
            id="name"
            name="name"
            value={formData.subject.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          >
            <option value="">Select Subject</option>
            {subjectsBySemester[formData.semester]?.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="mark" className="block text-gray-700">
            Mark
          </label>
          <input
            type="number"
            id="mark"
            name="mark"
            value={formData.subject.mark}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {responseMessage && (
        <div className="mt-4 text-green-600 font-semibold">{responseMessage}</div>
      )}
    </div>
  );
}

export default AddMarksForm;

