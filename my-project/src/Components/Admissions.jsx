import React, { useState } from 'react';

const Admissions = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
       console.log(formData);
  };

  return (
    <section className="mt-6 max-w-full h-[80vh] max-lg:max-w-3xl mx-auto bg-[#2e0249] rounded-lg pt-[10vh] pb-[10vh]">
      <div className="grid lg:grid-cols-2 items-center gap-14 sm:p-8 p-4 font-[sans-serif]">
        <div>
          <h1 className="text-4xl font-bold text-white">Get in Touch</h1>
          <p className="text-sm text-gray-300 mt-4 leading-relaxed">
            Have some big idea or brand to develop and need help? Then reach out,
            we'd love to hear about your project and provide help.
          </p>

          <ul className="mt-12 space-y-8">
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="#fff"
                viewBox="0 0 479.058 479.058"
              >
                <path d="..." />
              </svg>
              <a
                href="mailto:info@example.com"
                className="text-white text-sm ml-4 hover:underline"
              >
                info@example.com
              </a>
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="#fff"
                viewBox="0 0 482.6 482.6"
              >
                <path d="..." />
              </svg>
              <a
                href="tel:+158996888"
                className="text-white text-sm ml-4 hover:underline"
              >
                +158 996 888
              </a>
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="#fff"
                viewBox="0 0 368.16 368.16"
              >
                <path d="..." />
              </svg>
              <a
                href="https://goo.gl/maps/xyz"
                className="text-white text-sm ml-4 hover:underline"
              >
                123 Street 256 House
              </a>
            </li>
          </ul>

          <ul className="flex mt-12 space-x-4">
            <li className="bg-[#a91079] hover:bg-[#a91079e2] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  fill="#fff"
                  viewBox="0 0 24 24"
                >
                  <path d="..." />
                </svg>
              </a>
            </li>
          </ul>
        </div>

          <div>
          <h2 className="text-3xl font-semibold text-white">Contact Us</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-white text-sm" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#a91079]"
              />
            </div>

            <div>
              <label className="block text-white text-sm" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#a91079]"
              />
            </div>

            <div>
              <label className="block text-white text-sm" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 mt-1 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#a91079]"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#a91079] hover:bg-[#a91079e2] text-white font-semibold p-3 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Admissions;
