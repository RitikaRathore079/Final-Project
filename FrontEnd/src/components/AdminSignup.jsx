import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import toast, { Toaster } from "react-hot-toast";

const AdminSignup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretKey, setSecretKey] = useState(""); // 🔐 Extra security for Admin

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // 🔒 Simple Client-side check (In production, use backend logic)
        if (secretKey !== "admin123") {
            toast.error("Invalid Admin Secret Key!");
            return;
        }

        try {
            const res = await API.post("/auth/signup", {
                name,
                email,
                password,
                role: "admin", // 👑 FORCE ADMIN ROLE
            });

            toast.success("Admin Account created successfully!");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
            <Toaster position="top-right" /> {/* ✅ Add Toaster here */}
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 border-t-4 border-red-600">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
                    Admin Registration
                </h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                    Create an account to manage the platform
                </p>

                <form onSubmit={handleSignup}>
                    {/* Name */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="text-sm text-gray-600">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3 cursor-pointer text-gray-500"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {/* Secret Key */}
                    <div className="mb-6">
                        <label className="text-sm text-gray-600 font-bold text-red-600">Secret Key</label>
                        <input
                            type="password"
                            placeholder="Enter Admin Secret Key"
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border-2 border-red-200 rounded-lg focus:ring-2 focus:ring-red-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
                    >
                        Register as Admin
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Not an admin?{" "}
                    <Link
                        to="/signup"
                        className="text-red-600 font-semibold hover:underline"
                    >
                        User Signup
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AdminSignup;
