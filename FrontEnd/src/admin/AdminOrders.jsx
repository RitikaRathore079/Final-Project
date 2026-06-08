import React, { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await API.get("/orders/all", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(res.data);
            setLoading(false);
        } catch (err) {
            toast.error("Failed to fetch orders");
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Manage Orders</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">User</th>
                            <th className="p-4">Items</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" className="p-4 text-center">Loading...</td></tr>
                        ) : orders.length === 0 ? (
                            <tr><td colSpan="6" className="p-4 text-center">No orders found</td></tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 text-sm text-gray-500">{order._id}</td>
                                    <td className="p-4">
                                        <p className="font-semibold">{order.userId?.name || "Unknown"}</p>
                                        <span className="text-xs text-gray-500">{order.userId?.email}</span>
                                    </td>
                                    <td className="p-4 text-sm">
                                        {order.items.map(i => `${i.name} (x${i.quantity})`).join(", ")}
                                    </td>
                                    <td className="p-4 font-bold">₹{order.totalPrice}</td>
                                    <td className="p-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                            Pending
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
