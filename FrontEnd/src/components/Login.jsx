import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // ✅ Token + User dono save karo
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");

      // ✅ Redirect based on Role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-[900px] h-[500px] shadow-lg flex rounded-sm overflow-hidden">

        {/* LEFT */}
        <div className="w-2/5 bg-blue-600 text-white p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <p className="text-lg text-blue-100">
              Get access to your Orders,<br />
              Wishlist and Recommendations
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
            alt="login"
            className="w-56 mx-auto"
          />
        </div>

        {/* RIGHT */}
        <div className="w-3/5 p-10">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-600 pb-2 mb-6"
              required
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-600 pb-2 mb-6"
              required
            />

            <p className="text-xs text-gray-500 mb-6">
              By continuing, you agree to KiranaMart's{" "}
              <span className="text-blue-600 cursor-pointer">
                Terms of Use
              </span>{" "}
              and{" "}
              <span className="text-blue-600 cursor-pointer">
                Privacy Policy
              </span>.
            </p>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 font-semibold rounded-sm"
            >
              Login
            </button>
          </form>

          <Link to="/signup">
            <p className="text-center text-blue-600 mt-6 cursor-pointer font-semibold">
              New to KiranaMart? Create an account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
