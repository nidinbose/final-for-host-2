import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FetchStudent = () => {
    const { studentId } = useParams(); 
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchStudent() {
            try {
                const response = await axios.get(`/api/student/${studentId}`);
                setStudent(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching student data');
                setLoading(false);
            }
        }
        fetchStudent();
    }, [studentId]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
            <div className="bg-gray-800 text-white text-center py-4">
                <h1 className="text-2xl font-bold">{student.name}</h1>
                <p>{student.studentId}</p>
            </div>
            <div className="p-6">
                <img
                    src={student.photo || '/path/to/default-avatar.png'}
                    alt="Student Avatar"
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <div className="text-center mb-4">
                    <p className="text-gray-700"><strong>Class:</strong> {student.class}</p>
                    <p className="text-gray-700"><strong>Department:</strong> {student.department}</p>
                    <p className="text-gray-700"><strong>Semester:</strong> {student.semester}</p>
                    <p className="text-gray-700"><strong>Blood Type:</strong> {student.bloodType}</p>
                    <p className="text-gray-700"><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
                </div>
                <div className="text-center">
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200">
                        Edit Student
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FetchStudent;