import React from "react";

const Affiliations = () => {
  const affiliations = [
    {
      name: "National Board of Accreditation (NBA)",
      logo: "https://www.ssmpoly.ac.in/source/Files/News%26Events/nba%20newe%20logo.png",
      description:
        "Our programs are accredited by the NBA, ensuring quality education and global recognition.",
    },
    {
      name: "All India Council for Technical Education (AICTE)",
      logo: "https://images.shiksha.com/mediadata/images/articles/1616125734phpcKWM95.jpeg", 
      description:
        "Approved by AICTE for providing high-standard technical education.",
    },
    {
      name: "Industry Partnership with Infosys",
      logo: "https://cdn-ukwest.onetrust.com/logos/8d84415b-1b52-4bc4-8d5f-ca9a8eccaf8a/f7db8968-fc22-4620-92ac-dc05c5d2aa15/02460a41-565e-4cac-80a7-449bc8f77a72/logo-infosys.png", // Replace with actual logo URL
      description:
        "A proud partner of Infosys, enhancing skill-based learning opportunities for students.",
    },
    {
      name: "University Grants Commission (UGC)",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVP_r_rxtyt9q0faUv4-syv4-b30THT0N4KA&s", 
      description:
        "Recognized by UGC as an institute offering higher learning with exceptional standards.",
    },
    {
      name: "Microsoft Learn for Educators",
      logo: "https://www.investmentmonitor.ai/wp-content/uploads/sites/7/2021/12/microsoft-headquarters-fdi.jpg", 
      description:
        "In partnership with Microsoft, we offer industry-relevant curriculum for future-ready careers.",
    },
    {
      name: "Indian Society for Technical Education (ISTE)",
      logo: "https://globaleducationcoalition.unesco.org/uploads/255_InternationalSocietyforTechnologyinEducationISTE_color_logo_m7ceJ5.jpg?v=fim3D7dCTIMAq96ZdL5ZmN_WYii1DZC4-tb4g4Hh7sg", 
      description:
        "Member of ISTE, fostering innovation and quality in technical education.",
    },
    {
      name: "Google for Education",
      logo: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Google_Essentials_v2.width-1200.format-webp.webp",
      description:
        "Collaborating with Google to provide cutting-edge learning tools and resources.",
    },
    {
      name: "Cisco Networking Academy",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSzBJbV32hegB-rvU54ctReEZg8bSBfhvK3cWHf8gEgninT_-wQWj_BUR5W369kmOa3oY&usqp=CAU",
      description:
        "Training students with globally recognized networking skills through Cisco.",
    },
  ];

  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-gray-100 pt-[10vh]">
      <h2 className="text-4xl font-bold text-center mb-8 text-blue-900">
        Affiliations & Accreditations
      </h2>
      <p className="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
        Our engineering college is affiliated with prestigious organizations and
        global leaders in education, ensuring excellence and innovation in our
        academic programs.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {affiliations.map((affiliation, index) => (
          <div
            key={index}
            className="bg-[#A0CE4E] shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-center items-center p-6 ">
              <img
                src={affiliation.logo}
                alt={affiliation.name}
                className="w-28 h-28 object-contain"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-white mb-3">
                {affiliation.name}
              </h3>
              <p className="text-sm text-gray-200">{affiliation.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Affiliations;
