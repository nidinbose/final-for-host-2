import React, { useState } from 'react';
import axios from 'axios';

function AddMarksForm() {
  const [formData, setFormData] = useState({
    semester: '',
    studentid: '',
    subjects: [], 
  });

  const [responseMessage, setResponseMessage] = useState('');

   const subjectsBySemester = {
    1: [{ name: 'History' }, { name: 'Biology' }, { name: 'Math' }],
    2: [{ name: 'Math ' }, { name: 'English ' }, { name: 'Chemistry ' }],
    3: [{ name: 'Calculus' }, { name: 'Literature' }, { name: 'Biology ' }],
    4: [{ name: 'Calculus' }, { name: 'Literature' }, { name: 'Biology ' }],
    5: [{ name: 'Calculus' }, { name: 'Literature' }, { name: 'Biology ' }],
    6: [{ name: 'Calculus' }, { name: 'Literature' }, { name: 'Biology ' }],
    7: [{ name: 'Calculus' }, { name: 'Literature' }, { name: 'Biology ' }],
    8: [{ name: 'Calculus' }, { name: 'Literature' }, { name: 'Biology ' }],
   };


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'semester') {
         setFormData({
        ...formData,
        semester: value,
        subjects: subjectsBySemester[value]?.map((subject) => ({
          name: subject.name,
          mark: '',
        })) || [],
      });
    } else if (name === 'studentid') {
      setFormData({ ...formData, studentid: value });
    }
  };

  const handleMarkChange = (index, value) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index].mark = value;
    setFormData({ ...formData, subjects: updatedSubjects });
  };

   const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { name: '', mark: '' }],
    });
  };

  const removeSubject = (index) => {
    const updatedSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const subject of formData.subjects) {
      const payload = {
        semester: formData.semester,
        studentid: formData.studentid,
        subject: subject,
      };

      try {
        const response = await axios.post('http://localhost:3003/api/addmarks', payload);
        setResponseMessage(response.data.message || 'Marks added successfully');
      } catch (error) {
        setResponseMessage(
          error.response?.data?.message || 'Error adding marks'
        );
      }
    }
  };

  return (
    <div className="bg-[#1B2C39] min-h-screen p-4 sm:p-8 md:p-12 pb-[20vh] lg:pb-[45vh]">
      <h1 className='text-center mb-12 text-[#A0CE4E] text-4xl font-semibold'>Students Acadamics</h1>
    <div className="p-6 bg-white/10 rounded-lg shadow-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto border border-[#A0CE4E]">
      <h2 className="text-3xl font-semibold mb-6 text-center text-[#A0CE4E]">Enter Marks</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="semester" className="block text-[#A0CE4E] font-medium">Semester</label>
          <select
  id="semester"
  name="semester"
  value={formData.semester}
  onChange={handleChange}
  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#A0CE4E] focus:ring-2 focus:ring-[#A0CE4E]"
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
          <label htmlFor="studentid" className="block text-[#A0CE4E] font-medium">Student ID</label>
          <input
            type="text"
            id="studentid"
            name="studentid"
            value={formData.studentid}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#A0CE4E] focus:ring-2 focus:ring-[#A0CE4E]"
            required
          />
        </div>
  
        {formData.subjects.map((subject, index) => (
          <div key={index} className="mb-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8">
              <div className="flex-1">
                <label className="block text-[#A0CE4E] font-medium">{subject.name || 'Subject'}</label>
                <input
                  type="text"
                  value={subject.name}
                  onChange={(e) => handleMarkChange(index, e.target.value)}
                  placeholder="Enter subject name"
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#A0CE4E] focus:ring-2 focus:ring-[#A0CE4E]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium">Mark</label>
                <input
                  type="number"
                  value={subject.mark}
                  onChange={(e) => handleMarkChange(index, e.target.value)}
                  placeholder="Enter mark"
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#A0CE4E] focus:ring-2 focus:ring-[#A0CE4E]"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeSubject(index)}
              className="mt-2 text-red-600 hover:text-red-700"
            >
              Remove Subject
            </button>
          </div>
        ))}
  
  <div className='grid grid-cols-1 sm:grid-cols-2 gap-12 '>
  <button
          type="button"
          onClick={addSubject}
          className="w-full py-3 px-4 bg-[#A0CE4E] text-white font-semibold rounded-md shadow-lg hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-[#A0CE4E] focus:ring-opacity-50 mt-4"
        >
          Add Subject
        </button>
  
           <button
          type="submit"
          className="w-full py-3 px-4 bg-[#A0CE4E] text-white font-semibold rounded-md shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-[#A0CE4E] focus:ring-opacity-50 mt-4"
        >
          Submit
        </button>
  </div>
      </form>

      {responseMessage && (
        <div className="mt-6 text-center text-[#A0CE4E] font-semibold">{responseMessage}</div>
      )}
    </div>
  </div>
  
  );
}

export default AddMarksForm;
