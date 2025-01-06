import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import 'tailwindcss/tailwind.css'; 
import '../Components/css/Courses.css';

const Corses = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3003/api/getcourse");
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="mx-auto xl:p-10 p-3 bg-[url('https://iticollege.edu/wp-content/uploads/2023/02/Electrical-Automation-Technology-School.jpg')] relative pt-7">
      <h1 className='relative text-[#A0CE4E] text-4xl font-bold text-center z-50 mb-10  '>Our Preferred Courses</h1>
      <div className="absolute inset-0 bg-black opacity-80"></div>
      
      <section className="relative mx-auto flex overflow-x-auto xl:overflow-x-hidden gap-6 xl:grid xl:grid-cols-4 xl:p-12 xl:gap-10">
        {cards.map((card) => (
          <div
            key={card.id}
            className="group relative min-w-[16rem] sm:min-w-[18rem] md:min-w-[20rem] bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={card.photo}
              alt={card.title}
              className="w-full h-60 bg-cover rounded-t-xl"
            />
            <h1 className="mt-4 pb-7 text-start p-5 text-lg font-semibold text-gray-800">{card.title}</h1>

           <Link to={`/courseoverview/${card._id}`}>
           <div className="absolute bottom-0 right-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-[#A0CE4E] font-bold text-2xl text-white px-3 py-2 h-20 w-11 text-center rounded-l-full transform translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
                →
              </button>
            </div>
           </Link>
          </div>
        ))}
      </section>

      <div className="flex justify-center mt-4 xl:hidden">
        {cards.map((_, index) => (
          <span
            key={index}
            className="mx-1 h-2 w-2 rounded-full bg-gray-400"
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
