import React from 'react';

const AdminFooter = () => {
  return (
    <footer className="bg-[#A0CE4E] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
          
                <div className="text-center lg:text-left">
            <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="hover:text-gray-300">Dashboard</a></li>
              <li><a href="/settings" className="hover:text-gray-300">Settings</a></li>
              <li><a href="/profile" className="hover:text-gray-300">Profile</a></li>
              <li><a href="/support" className="hover:text-gray-300">Support</a></li>
            </ul>
          </div>
          <div className="text-center lg:text-left">
            <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
            <p>Email: support@adminpanel.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Admin St, Suite 456, City, Country</p>
          </div>

          <div className="text-center lg:text-left">
            <h5 className="text-lg font-semibold mb-4">Follow Us</h5>
            <div className="flex justify-center lg:justify-start space-x-4">
              <a href="https://facebook.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p>&copy; {new Date().getFullYear()} Admin Panel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
