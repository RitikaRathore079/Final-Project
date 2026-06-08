import { useEffect, useState } from "react";
import API from "../api/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await API.get("/orders", { headers: { Authorization: `Bearer ${token}` } });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders.length) return <p className="text-center mt-10">No orders yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="bg-white p-4 rounded shadow mb-4">
          <h2 className="font-semibold">Order ID: {order._id}</h2>
          <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
          <p>Total: ₹{order.totalPrice}</p>
          <ul className="mt-2">
            {order.items.map((item) => (
              <li key={item.name}>
                {item.name} - {item.quantity} x ₹{item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
