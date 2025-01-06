import React, { useState, useEffect } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';

export const AdminNavbar = () => {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get("http://localhost:3003/api/home", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const { username, photo, role } = response.data.user;
                    setUser({ username, photo, role });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get('/api/logout');
            localStorage.removeItem('token');
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="bg-[#A0CE4E] text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                
                    <Link to="/">
                    <img src="/images/pl.png" alt="Logo" className='h-[60px] cursor-pointer' />
                </Link>

                
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="/" className="hover:text-gray-300">Home</a>
                        <a href="/profile" className="hover:text-gray-300">Profile</a>
                        <a href="/settings" className="hover:text-gray-300">Settings</a>
                        {user && (
                            <div className="flex items-center space-x-3">
                                <img
                                    src={user.photo}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full"
                                />
                                <span>{user.username}</span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                                      <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

                     {menuOpen && (
                <div className="md:hidden bg-gray-700">
                    <div className="space-y-1 px-4 pt-2 pb-3 sm:px-3">
                        <a href="/" className="block text-white hover:bg-gray-600 rounded py-2 px-3">Home</a>
                        <a href="/profile" className="block text-white hover:bg-gray-600 rounded py-2 px-3">Profile</a>
                        <a href="/settings" className="block text-white hover:bg-gray-600 rounded py-2 px-3">Settings</a>
                        {user && (
                            <div className="flex flex-col items-start px-3">
                                <span className="flex items-center space-x-3 py-2">
                                    <img
                                        src={user.photo}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span>{user.username}</span>
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 bg-red-500 rounded hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};
export default AdminNavbar