import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import '../Components/css/Courses.css';
import Ip from '../API.js';

const Corses = () => {
  const [cards, setCards] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const ip = Ip();
        const response = await axios.get(`${ip}getcourse`);
        console.log("Fetched courses data:", response.data); 
        if (Array.isArray(response.data)) {
          setCards(response.data);
        } else {
          throw new Error("Data format incorrect: Expected an array");
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false); 
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p className="text-center text-white mt-10">Loading courses...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="mx-auto xl:p-10 p-3 bg-[url('https://iticollege.edu/wp-content/uploads/2023/02/Electrical-Automation-Technology-School.jpg')] relative pt-7">
      <h1 className="relative text-[#A0CE4E] text-4xl font-bold text-center z-50 mb-10">
        Our Preferred Courses
      </h1>
      <div className="absolute inset-0 bg-black opacity-80"></div>

      <section className="relative mx-auto flex overflow-x-auto xl:overflow-x-hidden gap-6 xl:grid xl:grid-cols-4 xl:p-12 xl:gap-10">
        {Array.isArray(cards) && cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card._id}
              className="group relative min-w-[16rem] sm:min-w-[18rem] md:min-w-[20rem] bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={card.photo}
                alt={card.title}
                className="w-full h-60 bg-cover rounded-t-xl"
              />
              <h1 className="mt-4 pb-7 text-start p-5 text-lg font-semibold text-gray-800">
                {card.title}
              </h1>

              <Link to={`/courseoverview/${card._id}`}>
                <div className="absolute bottom-0 right-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-[#A0CE4E] font-bold text-2xl text-white px-3 py-2 h-20 w-11 text-center rounded-l-full transform translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
                    →
                  </button>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No courses available</p>
        )}
      </section>

      <div className="flex justify-center mt-4 xl:hidden">
        {cards.map((_, index) => (
          <span
            key={index}
            className="mx-1 h-2 w-2 rounded-full"
            style={{
              backgroundColor: index === 0 ? '#A0CE4E' : 'gray',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Corses;
