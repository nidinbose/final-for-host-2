import React, { useState } from 'react';
import { FaGripLinesVertical } from "react-icons/fa";

const Gallary = () => {
    const [active, setActive] = useState("https://zolostays.com/blog/wp-content/uploads/2024/02/acharya-institute-of-technology-bangalore.jpg");
  const data = [
    { imgelink: "https://zolostays.com/blog/wp-content/uploads/2024/02/acharya-institute-of-technology-bangalore.jpg" },
    { imgelink: "https://www.mbacollegesbangalore.in/wp-content/uploads/2017/08/Acharya-Institute-of-Technology-2.jpg" },
    { imgelink: "https://i.pinimg.com/736x/16/d8/f1/16d8f110b0cab10e274ffe24050594c3.jpg" },
    { imgelink: "https://www.mbacollegesbangalore.in/wp-content/uploads/2017/08/Acharya-Institute-of-Technology-2.jpg" },
    { imgelink: "https://lh3.googleusercontent.com/-gNnLnOosol0/WCI6r8n3nKI/AAAAAAAAABo/1I79pk_bkXItZyjNIBg8_lJbn5t5ApYhgCLIB/photo.jpg" },
  ];

  return (
    <div className="relative h-full w-full z-50">
      <div className="absolute inset-0 bg-[url('https://www.gopalancolleges.com/gcem/images/gopalan-engineering-college.jpg')] bg-cover bg-center filter brightness-50">
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative z-10 text-white flex flex-col lg:flex-row items-start px-6 py-12 lg:px-12 lg:py-24 gap-8 xl:space-x-20">
             <div className="text-start max-w-xl xl:ml-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center">
            <FaGripLinesVertical className="text-[#A0CE4E] text-3xl mr-2" />
            Our Gallery
          </h1>
          <h2 className="text-2xl font-semibold mb-4 font-semibold ml-10 text-[#A0CE4E]">Explore The Campus</h2>
          <p className="text-base leading-relaxed text-md ml-10">
            Students at  <span className='text-[#A0CE4E] font-bold'>Cambridge Institutions</span> are privy to a unique Wi-Fi campus. The Wi-Fi campus enables
            the students to get online anywhere on campus without the hassle of wires and plug-ins. The campus,
            truly, is the high-tech face of the new age.
          </p>
        </div>
        <div className="flex flex-col w-full max-w-3xl gap-4">
                  <div className="w-full">
            <img
              className="w-full h-auto max-h-[400px] rounded-lg object-cover"
              src={active}
              alt="Selected"
            />
          </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.map(({ imgelink }, index) => (
              <img
                key={index}
                onClick={() => setActive(imgelink)}
                src={imgelink}
                className="h-20 w-full cursor-pointer rounded-lg object-cover transition-transform duration-200 hover:scale-105"
                alt="Gallery Thumbnail"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallary;
