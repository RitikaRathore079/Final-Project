import React from "react";
import { FaUser, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-md p-6">

        {/* Header */}
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl">
            <FaUser />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Anjali Yadav</h2>
            <p className="text-gray-500 text-sm">anjali@gmail.com</p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <FaUser className="text-gray-500" />
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> Anjali Yadav
            </p>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-gray-500" />
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> anjali@gmail.com
            </p>
          </div>

          <div className="flex items-center gap-3">
            <FaPhone className="text-gray-500" />
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span> +91 98765 43210
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            <FaEdit /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
