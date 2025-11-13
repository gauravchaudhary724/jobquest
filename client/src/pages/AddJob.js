import React, { useState } from "react";
import API from "../utils/api";

function AddJob() {
  const [form, setForm] = useState({
    jobTitle: "",
    company: "",
    jobLink: "",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", form);
      alert("Job added successfully!");
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Failed to add job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Add Job</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="jobTitle"
            type="text"
            placeholder="Job Title"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="company"
            type="text"
            placeholder="Company"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
            required
          />

          <input
            name="jobLink"
            type="text"
            placeholder="Job Link"
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Notes"
            className="w-full p-3 border rounded h-24 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Add Job
          </button>
        </form>

        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="w-full mt-4 bg-gray-300 text-black py-2 rounded hover:bg-gray-400 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default AddJob;
