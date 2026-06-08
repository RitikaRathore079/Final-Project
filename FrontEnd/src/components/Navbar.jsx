import React, { useState, useContext } from "react";
import { FaSearch, FaShoppingCart, FaStore, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import LoginDropdown from "./LoginDropDown";
import allProducts from "../data/allProducts"; // Import all products

const categories = [
  { name: "Aata", link: "/aata" },
  { name: "Cold-drink", link: "/colddrink" },
  { name: "Snacks", link: "/snacks" },
  { name: "Sweets", link: "/sweets" },
  { name: "Cosmetics", link: "/cosmetics" },
  { name: "Oils", link: "/oils" },
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

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 2) {
      // Search in Categories
      const filteredCategories = categories.filter((c) =>
        c.name.toLowerCase().includes(value.toLowerCase())
      );

      // Search in Products
      const filteredProducts = allProducts.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );

      // Merge results: Categories first, then Products
      setSuggestions([...filteredCategories, ...filteredProducts].slice(0, 10)); // Limit to 10 results
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (link) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(link);
  };

  return (
    <div className="w-full bg-white fixed top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6 relative">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-green-600 cursor-pointer"
        >
          DailyMart
        </div>

        {/* Search Bar */}
        <div className="flex flex-col flex-1 relative">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              className="bg-transparent outline-none w-full text-sm"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (suggestions.length > 0) {
                    handleSelect(suggestions[0].link);
                  }
                }
              }}
            />

            {/* Hidden camera input */}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              id="cameraInput"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  console.log("Captured image:", file);
                  alert(`Captured image: ${file.name}`);
                }
              }}
            />
            <FaCamera
              className="text-gray-600 ml-3 cursor-pointer hover:text-blue-600"
              onClick={() => document.getElementById("cameraInput").click()}
            />
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute bg-white w-full mt-1 top-full shadow-md rounded-md max-h-60 overflow-y-auto z-20">
              {suggestions.map((item, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-green-100 cursor-pointer border-b last:border-none flex justify-between"
                  onClick={() => handleSelect(item.link)}
                >
                  <span>{item.name}</span>
                  {item.category && <span className="text-xs text-gray-500 capitalize">in {item.category}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Login, Cart & Seller */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <LoginDropdown />

          <div
            onClick={() => navigate("/cart")}
            className="relative flex items-center gap-2 cursor-pointer"
          >
            <FaShoppingCart className="text-xl" />
            <span>Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>


        </div>
      </div>
    </div>
  );
};

export default Navbar;
