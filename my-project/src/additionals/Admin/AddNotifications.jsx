import React, { useState, useEffect } from "react";
import axios from "axios";

const AddNotifications = () => {
  const [formData, setFormData] = useState({
    Subject: "",
    Date: "",
    Matter: "",
    Type: "",
  });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const currentDate = new Date().toISOString().split("T")[0];
    setFormData((prevData) => ({ ...prevData, Date: currentDate }));
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3003/api/getnotification");
      setNotifications(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3003/api/notify",
        formData
      );
      alert("Notification added successfully!");
      console.log(response.data);
      setFormData({
        Subject: "",
        Date: "",
        Matter: "",
        Type: "",
      });
      fetchNotifications(); 
    } catch (error) {
      console.error("Error adding notification:", error);
      alert("Failed to add notification. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/api/deletenotify/${id}`);
      alert("Notification deleted successfully!");
      setNotifications(notifications.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
      alert("Failed to delete notification. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1D1D1D] p-8">
         <form
        className="bg-[#A0CE4E] p-8 rounded-lg shadow-lg w-full max-w-md mx-auto mb-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Add Notification
        </h2>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-600">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="Subject"
            value={formData.Subject}
            onChange={handleChange}
            placeholder="Enter the subject"
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-600">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="matter" className="block text-sm font-medium text-gray-600">
            Matter
          </label>
          <textarea
            id="matter"
            name="Matter"
            value={formData.Matter}
            onChange={handleChange}
            placeholder="Enter the details of the notification"
            required
            rows="4"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1D1D1D]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-600">
            Type
          </label>
          <select
            id="type"
            name="Type"
            value={formData.Type}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A0CE4E]"
          >
            <option value="" disabled>
              Select a type
            </option>
            <option value="General">General</option>
            <option value="Urgent">Urgent</option>
            <option value="Results">Results</option>
            <option value="Reminder">Reminder</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-[#A0CE4E] focus:ring-offset-2"
        >
          Add Notification
        </button>
      </form>
      <div className="bg-[#A0CE4E] p-4 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Notifications</h2>
        {loading ? (
          <p>Loading notifications...</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md"
            >
              <h3 className="text-lg text-white font-bold">{notification.Subject}</h3>
              <p className="text-white text-sm">{notification.Date}</p>
              <p className="text-white mb-2">{notification.Matter}</p>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  notification.Type === "Urgent"
                    ? "bg-red-500 text-white"
                    : notification.Type === "Results"
                    ? "bg-green-100 text-green-700"
                    : notification.Type === "Reminder"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {notification.Type}
              </span>
           <div className="flex justify-end items-center">
           <button
                onClick={() => handleDelete(notification._id)}
                className="mt-2 block bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
           </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddNotifications;

