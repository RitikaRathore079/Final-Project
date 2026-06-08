import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const menuItems = [
        { name: "Dashboard", path: "/admin" },
        { name: "Products", path: "/admin/products" },
        { name: "Orders", path: "/admin/orders" },
        { name: "Users", path: "/admin/users" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Toaster position="top-right" />

            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-2xl font-bold text-orange-500">Admin Panel</h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`block px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                    ? "bg-orange-600 text-white"
                                    : "hover:bg-gray-800 text-gray-300"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto h-screen">
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
