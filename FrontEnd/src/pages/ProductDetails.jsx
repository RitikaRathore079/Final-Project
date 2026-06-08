import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api/api"; // make sure your backend API is configured
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Import all product data
import aataProducts from "../data/aataProducts";
import TcmdProducts from "../data/TcmdProducts";
import colddrink from "../data/Colddrink";
import cosmetics from "../data/Cosmetic";
import dryfruits from "../data/DryFruits";
import sweetsProduct from "../data/Sweets";
import cleaningProducts from "../data/CleaningProducts";
import instantFood from "../data/InstantFood";
import masala from "../data/Masala";
import salt from "../data/Salt";
import oils from "../data/Oils";
import snacks from "../data/Snacks";
import pickle from "../data/Pickle";
import rice from "../data/Rice";
import pulses from "../data/Pulses";

// Map category names to data arrays
const productDataMap = {
  aata: aataProducts,
  clean: cleaningProducts,
  colddrink: colddrink,
  cosmetics: cosmetics,
  tcmd: TcmdProducts,
  sweets: sweetsProduct,
  oils: oils,
  snacks: snacks,
  masala: masala,
  instantfood: instantFood,
  dryfruits: dryfruits,
  pickle: pickle,
  rice: rice,
  salt: salt,
  pulses: pulses,
};

export default function ProductDetails() {
  const { category, id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const categoryKey = category.toLowerCase();
  const productsArray = productDataMap[categoryKey];
  const product = productsArray?.find((p) => p.id === Number(id));

  if (!product) {
    return <h2 className="text-center mt-10">Product not found</h2>;
  }

  // ✅ Add to Cart and go to Cart page
  const handleAddToCart = (product) => {
    addToCart(product);   // product add to cart
    toast.success("Added to Cart!");
    // navigate("/cart");    // Optional: stay on page or navigate? User request implies "view page... descriptions... toast"
  };

  // ✅ Buy Now: direct order
  const buyNow = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    try {
      await API.post(
        "/orders",
        { items: [{ ...product, quantity: 1 }], totalPrice: product.price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`${product.name} ordered successfully 🎉`);
    } catch (err) {
      toast.error("Order failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 grid grid-cols-2 gap-8">
      {/* Product Image */}
      <img src={product.image} className="h-80 mx-auto" alt={product.name} />

      {/* Product Info */}
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        {/* Description: specific or default */}
        <p className="mt-2 text-gray-600">
          {product.description || `Fresh and high quality ${product.name}. sourced directly from the best farms/brands to ensure premium quality.`}
        </p>
        <p className="text-xl font-bold mt-4">₹{product.price}</p>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add to Cart
          </button>

          <button
            onClick={() => buyNow(product)}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
