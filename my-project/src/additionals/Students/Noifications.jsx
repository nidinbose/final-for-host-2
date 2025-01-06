import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/getnotification');
        setNotifications(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch notifications.');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading notifications...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-12 w-full bg-[#1B2C39]">
      <h2 className="text-3xl font-bold text-center mb-6">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-[#A0CE4E]"
          >
            <h3 className="text-xl text-white font-semibold mb-2">{notification.Subject}</h3>
            <p className="text-white text-sm mb-1">{notification.Date}</p>
            <p className="text-white mb-2">{notification.Matter}</p>
            <span
  className={`px-3 py-1 text-sm font-medium rounded-full ${
    notification.Type === 'Urgent'
      ? 'bg-red-500 text-white'
      : notification.Type === 'Results'
      ? 'bg-green-100 text-green-700'
      : notification.Type === 'Reminder'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-gray-100 text-gray-700' 
  }`}
>
  {notification.Type}
</span>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

