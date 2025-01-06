import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const CollegeView = () => {
  return (
    <div className="relative h-[80vh]  w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/v1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

           <div className="relative z-20 flex flex-col items-center justify-center h-full text-white bg-black bg-opacity-60 px-6 sm:px-8">
              <div className="flex items-center justify-between text-center mb-8 space-y-0 w-full">
  <span className="block h-[6px] w-20 sm:w-32 md:w-48 bg-[#A0CE4E]" />

  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mx-4 text-white whitespace-nowrap">
    Your Right Step is <span className="text-[#A0CE4E]">just a click</span> away
  </h1>

  <span className="block h-[6px] w-20 sm:w-32 md:w-48 bg-[#A0CE4E]" />
</div>

<div className="flex flex-col sm:flex-row gap-10 items-center justify-center">
<Link to={`/contact`}>
<button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#A0CE4E] text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-600 hover:scale-105 transform transition duration-300">
    Contact Us <FaArrowRight className="text-sm md:text-base" />
  </button>
</Link>
<Link to={`/applaynow`}>
<button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#A0CE4E] text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-600 hover:scale-105 transform transition duration-300">
    Apply Now <FaArrowRight className="text-sm md:text-base" />
  </button>
</Link>
</div>

      </div>
    </div>
  );
};

export default CollegeView;

