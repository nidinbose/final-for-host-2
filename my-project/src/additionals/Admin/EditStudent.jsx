// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const EditStudents = () => {
//   const { studentid } = useParams();  
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     studentid: "",
//     class: "",
//     department: "",
//     semester: "",
//     bloodType: "",
//     dateOfBirth: "",
//     photo: null
//   });

//   const [previewSource, setPreviewSource] = useState(null);
//   const [errors, setErrors] = useState({});

 
//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3003/api/getstudentedit/${studentid}`);
//         const student = res.data;
//         setFormData({
//           name: student.name,
//           studentid: student.studentid,
//           class: student.class,
//           department: student.department,
//           semester: student.semester,
//           bloodType: student.bloodType,
//           dateOfBirth: student.dateOfBirth,
//           photo: student.photo
//         });
//         setPreviewSource(student.photo);
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };

//     fetchStudentData();
//   }, [studentid]);

//   useEffect(() => {
  
//     const isAuthenticated = localStorage.getItem('token');

//     if (!isAuthenticated) {
//         alert("Please log in to continue.");
//         navigate('/login');
//     }
// }, [navigate]);
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     const base64 = await convertToBase64(file);
//     setFormData((prev) => ({ ...prev, photo: base64 }));
//     setPreviewSource(base64);
//   };

//   function convertToBase64(file) {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);

//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   }

//   const validateForm = () => {
//     let formErrors = {};
//     if (!formData.name.trim()) formErrors.name = "Name is required";
//     if (!formData.studentid.trim()) formErrors.studentid = "Student ID is required";
//     if (!formData.class.trim()) formErrors.class = "Class is required";
//     if (!formData.department.trim()) formErrors.department = "Department is required";
//     if (!formData.semester.trim()) formErrors.semester = "Semester is required";
//     if (!formData.bloodType.trim()) formErrors.bloodType = "Blood Type is required";
//     if (!formData.dateOfBirth.trim()) formErrors.dateOfBirth = "Date of Birth is required";
//     if (!formData.photo) formErrors.photo = "Photo is required";

//     setErrors(formErrors);
//     return Object.keys(formErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       return;
//     }
//     try {
//       const res = await axios.put(`http://localhost:3003/api/updatestudent/${studentid}`, formData); 
//       console.log(res);
//       if (res.status === 200) {
//         navigate('/admin');
//       }
//     } catch (error) {
//       console.error("Error updating student:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white/80 flex items-center justify-center p-6">
//       <motion.div
//         className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="text-2xl font-bold text-center text-red-700 mb-6">
//           Edit Student
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="flex flex-col">
//             <label className="text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : ''}`}
//             />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//           </div>

      
//           <div className="flex flex-col">
//             <label className="text-gray-700">Student ID</label>
//             <input
//               type="text"
//               name="studentid"
//               value={formData.studentid}
//               onChange={handleChange}
//               className={`mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.studentid ? 'border-red-500' : ''}`}
//               disabled
//             />
//             {errors.studentid && <p className="text-red-500 text-sm">{errors.studentid}</p>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-gray-700">Class</label>
//             <input
//               type="text"
//               name="class"
//               value={formData.class}
//               onChange={handleChange}
//               className={`mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.class ? 'border-red-500' : ''}`}
//             />
//             {errors.class && <p className="text-red-500 text-sm">{errors.class}</p>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-gray-700">Department</label>
//             <input
//               type="text"
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               className={`mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.department ? 'border-red-500' : ''}`}
//             />
//             {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-gray-700">Semester</label>
//             <input
//               type="text"
//               name="semester"
//               value={formData.semester}
//               onChange={handleChange}
//               className={`mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.semester ? 'border-red-500' : ''}`}
//             />
//             {errors.semester && <p className="text-red-500 text-sm">{errors.semester}</p>}
//           </div>

//               <div className="flex flex-col">
//             <label className="text-gray-700">Blood Type</label>
//             <input
//               type="text"
//               name="bloodType"
//               value={formData.bloodType}
//               onChange={handleChange}
//               className={`mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.bloodType ? 'border-red-500' : ''}`}
//             />
//             {errors.bloodType && <p className="text-red-500 text-sm">{errors.bloodType}</p>}
//           </div>

//           <div className="flex flex-col">
//             <label className="text-gray-700">Date of Birth</label>
//             <input
//               type="date"
//               name="dateOfBirth"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//               className={`mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
//             />
//             {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
//           </div>

//             <div className="flex flex-col">
//             <label className="text-gray-700">Photo</label>
//             <input
//               type="file"
//               name="photo"
//               accept="image/*"
//               onChange={handleFileChange}
//               className={`mt-1 p-2 border rounded-lg focus:outline-none bg-cover focus:ring-2 focus:ring-indigo-500 ${errors.photo ? 'border-red-500' : ''}`}
//             />
//             {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
//             {previewSource && (
//               <img src={previewSource} alt="Preview" className="mt-4 rounded-lg h-[90vh] w-24 bg-cover" />
//             )}
//           </div>

//           <div className="flex justify-between items-center">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               Save Changes
//             </button>
//             <button
//               type="button"
//               className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               onClick={() => navigate('/admin')}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default EditStudents;
