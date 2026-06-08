import React from "react";
const cities = [
  "Amalpura", "Bhatalpura", "Bhojakhedi", "Chhegaon_Makhan",
  "Chamati", "Deshgaon", "Dodwada", "Dulhar",
  "Gandhwa", "Jaswadi", "Jawar", "Khandwa",
  "Koladit", "Malgaon", "Mundi", "Nagchoon",
  "Nahalda", "Pandhana", "Sirsod", "Singot"
];

const Cities = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Cities with Grocery Delivery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cities.map((city, index) => (
          <div
            key={index}
            className="border rounded-xl px-6 py-4 text-center cursor-pointer 
                       hover:shadow-md hover:bg-gray-300 transition"
          >
            <p className="text-gray-800 font-medium">
              Order grocery delivery in <br />
              <span className="font-semibold">{city}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cities;