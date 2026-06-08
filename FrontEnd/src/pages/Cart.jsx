import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import OrderForm from "../routes/OrderForm.jsx"; // ✅ Correct import

export default function Cart() {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, getTotalPrice } =
    useContext(CartContext);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const placeSingleOrder = async (item) => {
    if (!token) {
      alert("Please login to place order");
      navigate("/login");
      return;
    }
    try {
      await API.post(
        "/orders",
        { items: [item], totalPrice: item.price * item.quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${item.name} ordered successfully 🎉`);
      removeFromCart(item._id);
    } catch (err) {
      console.error(err);
      alert("Order failed ❌");
    }
  };

  const placeFullCartOrder = async (orderData) => {
    if (!token) {
      alert("Please login to place order");
      navigate("/login");
      return;
    }
    try {
      await API.post(
        "/orders",
        { items: orderData.items, totalPrice: orderData.totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("All items ordered successfully 🎉");
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Order failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart items */}
          <div className="grid gap-4 mb-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p>Price: ₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => decreaseQuantity(item._id)} className="bg-gray-300 px-2 rounded">
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item._id)} className="bg-gray-300 px-2 rounded">
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button onClick={() => placeSingleOrder(item)} className="bg-green-600 text-white px-3 py-1 rounded">
                    Place Order
                  </button>
                  <button onClick={() => removeFromCart(item._id)} className="bg-orange-500 text-white px-3 py-1 rounded">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart summary + Full order */}
          <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-semibold">Total: ₹{getTotalPrice()}</h2>

            <div className="flex gap-4">
              <button onClick={clearCart} className="bg-gray-700 text-white px-4 py-2 rounded">
                Clear Cart
              </button>

              <OrderForm
                products={cart.map((item) => ({
                  id: item._id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                }))}
                onPlaceOrder={(orderData) => placeFullCartOrder(orderData)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
