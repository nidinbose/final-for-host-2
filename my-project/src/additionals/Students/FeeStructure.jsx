import React from "react";

const FeeStructure = () => {
  const feeData = [
    {
      department: "Computer Engineering",
      semesters: [80000, 80000, 80000, 80000, 100000, 100000, 120000, 120000],
    },
    {
      department: "Electrical Engineering",
      semesters: [75000, 75000, 75000, 75000, 95000, 95000, 115000, 115000],
    },
    {
      department: "Mechanical Engineering",
      semesters: [70000, 70000, 70000, 70000, 90000, 90000, 110000, 110000],
    },
    {
      department: "Civil Engineering",
      semesters: [65000, 65000, 65000, 65000, 85000, 85000, 105000, 105000],
    },
  ];

  const calculateTotal = (semesters) =>
    semesters.reduce((total, fee) => total + fee, 0);

  const grandTotal = feeData.reduce(
    (sum, course) => sum + calculateTotal(course.semesters),
    0
  );

  return (
    <div className="p-10 pb-[30vh] pt-[20vh]">
      <h2 className="text-2xl font-bold mb-6 text-center">
        University Fee Structure (INR)
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b border-gray-300">
                Department
              </th>
              {Array.from({ length: 8 }, (_, i) => (
                <th
                  key={i}
                  className="px-4 py-2 text-left border-b border-gray-300"
                >
                  Semester {i + 1}
                </th>
              ))}
              <th className="px-4 py-2 text-left border-b border-gray-300">
                Total (Course Fees)
              </th>
            </tr>
          </thead>
          <tbody>
            {feeData.map((course, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="px-4 py-2 border-b border-gray-300">
                  {course.department}
                </td>
                {course.semesters.map((fee, i) => (
                  <td key={i} className="px-4 py-2 border-b border-gray-300">
                    ₹{fee.toLocaleString()}
                  </td>
                ))}
                <td className="px-4 py-2 font-semibold border-b border-gray-300">
                  ₹{calculateTotal(course.semesters).toLocaleString()}
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="10"
                className="px-4 py-4 font-bold text-center bg-gray-300"
              >
          
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeStructure;

