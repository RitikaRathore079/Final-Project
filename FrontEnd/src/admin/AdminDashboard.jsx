import React, { useEffect, useState } from "react";
import API from "../api/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalProducts: 0,
        totalUsers: 0
    });
    const [loading, setLoading] = useState(true);

    // Mock Data for Charts (since we don't have historical data APIs yet)
    const chartData = [
        { name: "Mon", sales: 4000 },
        { name: "Tue", sales: 3000 },
        { name: "Wed", sales: 2000 },
        { name: "Thu", sales: 2780 },
        { name: "Fri", sales: 1890 },
        { name: "Sat", sales: 2390 },
        { name: "Sun", sales: 3490 },
    ];

    const pieData = [
        { name: "Groceries", value: 400 },
        { name: "Electronics", value: 300 },
        { name: "Clothing", value: 300 },
        { name: "Others", value: 200 },
    ];
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };

            // Parallel Fetch
            const [ordersRes, usersRes, productsRes] = await Promise.all([
                API.get("/orders/all", { headers }),
                API.get("/users", { headers }),
                API.get("/products") // Public endpoint
            ]);

            const orders = ordersRes.data;
            const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

            setStats({
                totalOrders: orders.length,
                totalRevenue: totalRevenue,
                totalProducts: productsRes.data.length,
                totalUsers: usersRes.data.length
            });
            setLoading(false);
        } catch (err) {
            console.error("Stats Error:", err);
            toast.error("Failed to load dashboard stats");
            setLoading(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading Dashboard...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                    <h3 className="text-gray-500 font-bold">Total Orders</h3>
                    <p className="text-3xl font-bold">{stats.totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                    <h3 className="text-gray-500 font-bold">Total Revenue</h3>
                    <p className="text-3xl font-bold">₹{stats.totalRevenue}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-orange-500">
                    <h3 className="text-gray-500 font-bold">Total Products</h3>
                    <p className="text-3xl font-bold">{stats.totalProducts}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                    <h3 className="text-gray-500 font-bold">Total Users</h3>
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sales Chart */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Weekly Sales</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="sales" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Category Distribution</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
