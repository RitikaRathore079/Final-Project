// import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const products = [
//   { name: "Sweets", link: "/sweets" },
//   { name: "Cosmetics", link: "/cosmatics" },
//   { name: "Cold-drink", link: "/colddrink" },
//   { name: "Oils", link: "/oils" },
//   { name: "Aata", link: "/aata" },
//   { name: "Snacks", link: "/snacks" },
//   { name: "Masala", link: "/masala" },
//   { name: "Instant Food", link: "/instant-food" },
//   { name: "DryFruits", link: "/dry-fruits" },
//   { name: "Pickle", link: "/pickle" },
//   { name: "Cleaning & Essentials", link: "/clean" },
//   { name: "Tea, Coffee & Milk Drinks", link: "/tcmd" },
//   { name: "Rice", link: "/rice" },
//   { name: "Salt", link: "/salt" },
//   { name: "Pulses", link: "/pulses" },
// ];

// const Home = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     if (value.length >= 2) {
//       const filtered = products.filter((product) =>
//         product.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setSuggestions(filtered);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleSelect = (link) => {
//     navigate(link);
//   };

//   return (
//     <div
//       className="relative w-full h-screen bg-no-repeat bg-cover bg-center"
//       style={{ backgroundImage: "url('/grocery.jpeg')" }}
//     >
//       {/* Home Content */}
//       <div className="relative z-10 flex items-center h-full px-12">
//         <div className="w-1/2">
//           <h1 className="text-4xl font-bold text-black leading-snug">
//             Fresh & Affordable Kirana Items <br />
//             Delivered to Your Home
//           </h1>

//           {/* Search Bar */}
//           <div className="relative mt-6 w-full max-w-md">
//             <div className="flex bg-white rounded-md overflow-hidden shadow-lg">
//               <input
//                 type="text"
//                 placeholder="Search your daily groceries..."
//                 className="flex-1 px-4 py-3 text-black outline-none"
//                 value={searchTerm}
//                 onChange={handleChange}
//               />
//               <button
//                 onClick={() => {}}
//                 className="bg-green-600 px-5 flex items-center justify-center"
//               >
//                 <FaSearch className="text-white" />
//               </button>
//             </div>

//             {/* Suggestions Dropdown */}
//             {suggestions.length > 0 && (
//               <ul className="absolute bg-white w-full mt-1 shadow-md rounded-md max-h-60 overflow-y-auto z-20">
//                 {suggestions.map((product, idx) => (
//                   <li
//                     key={idx}
//                     className="px-4 py-2 hover:bg-green-100 cursor-pointer"
//                     onClick={() => handleSelect(product.link)}
//                   >
//                     {product.name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const products = [
  { name: "Sweets", link: "/sweets" },
  { name: "Cosmetics", link: "/cosmetics" },
  { name: "Cold-drink", link: "/colddrink" },
  { name: "Oils", link: "/oils" },
  { name: "Aata", link: "/aata" },
  { name: "Snacks", link: "/snacks" },
  { name: "Masala", link: "/masala" },
  { name: "Instant Food", link: "/instant-food" },
  { name: "DryFruits", link: "/dry-fruits" },
  { name: "Pickle", link: "/pickle" },
  { name: "Cleaning & Essentials", link: "/clean" },
  { name: "Tea, Coffee & Milk Drinks", link: "/tcmd" },
  { name: "Rice", link: "/rice" },
  { name: "Salt", link: "/salt" },
  { name: "Pulses", link: "/pulses" },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 2) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (link) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(link); // Navigate to category page like /aata, /colddrink etc.
  };

  return (
    <div
      className="relative w-full h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/grocery.jpeg')" }}
    >
      {/* Home Content */}
      <div className="relative z-10 flex items-center h-full px-12">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold text-black leading-snug">
            Fresh & Affordable Kirana Items <br />
            Delivered to Your Home
          </h1>

          {/* Search Bar */}
          <div className="relative mt-6 w-full max-w-md">
            <div className="flex bg-white rounded-md overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Search your daily groceries..."
                className="flex-1 px-4 py-3 text-black outline-none"
                value={searchTerm}
                onChange={handleChange}
              />
              <button
                onClick={() => {}}
                className="bg-green-600 px-5 flex items-center justify-center"
              >
                <FaSearch className="text-white" />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute bg-white w-full mt-1 shadow-md rounded-md max-h-60 overflow-y-auto z-20">
                {suggestions.map((product, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                    onClick={() => handleSelect(product.link)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
