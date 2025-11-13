import React, { useState } from "react";
import API from "../utils/api";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      alert("Signup successful! Now login.");
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.msg || "Error while signing up");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Signup
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
