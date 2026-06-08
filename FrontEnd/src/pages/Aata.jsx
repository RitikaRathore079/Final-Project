import React, { useContext } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import aataProducts from "../data/aataProducts";

// ⭐ Rating Component
function Rating({ rating }) {
  return (
    <div className="flex items-center gap-1 mt-2">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) return <FaStar key={star} className="text-yellow-400" />;
        else if (rating >= star - 0.5) return <FaStarHalfAlt key={star} className="text-yellow-400" />;
        else return <FaRegStar key={star} className="text-gray-300" />;
      })}
      <span className="text-sm text-gray-500 ml-1">({rating})</span>
    </div>
  );
}

// 🛒 Aata Page
export default function Aata() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); // ✅ Cart access

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h2 className="text-2xl font-bold text-center mb-8">
        Pure & Fresh Wheat Flour
      </h2>

      <div className="max-w-8xl mx-auto px-4">
        <div className="grid grid-cols-4 gap-4 max-h-[520px] overflow-y-auto pr-2">
          {aataProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-2 flex flex-col items-center cursor-pointer"
              onClick={() => navigate(`/product/aata/${product.id}`)}
            >
              {/* Product Image */}
              <div className="w-full h-40 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300 hover:-translate-y-2"
                />
              </div>

              {/* Product Info */}
              <h3 className="text-lg font-semibold mt-4 text-center">{product.name}</h3>
              <Rating rating={product.rating} />
              <h3 className="text-lg font-semibold mt-4 text-center">₹{product.price}</h3>

              {/* ✅ Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigate
                  addToCart({
                    _id: product.id,       // 🔑 Important: Cart expects _id
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,           // Default quantity
                  });
                }}
                className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
