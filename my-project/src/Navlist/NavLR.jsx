import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

const NavLR = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); 
  };

  const goForward = () => {
    navigate(1);
  };

  return (
    <div className="fixed top-7 left-0 p-4 z-50 flex space-x-4 items-center">
      <button
        onClick={goBack}
        className="transition duration-200 text-[#A0CE4E] hover:text-gray-500"
        style={{ backgroundColor: 'transparent' }}
      >
        <FaLongArrowAltLeft className='w-7 h-7 '/>
      </button>
      <button
        onClick={goForward}
        className="transition duration-200 text-[#A0CE4E]  hover:text-gray-500"
        style={{ backgroundColor: 'transparent' }}
      >
      <FaLongArrowAltRight  className='w-7 h-7 '/>
      </button>
    </div>
  );
};

export default NavLR;


