import React, { useEffect, useState } from "react";
import API from "../utils/api";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      alert("Failed to load jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">JobQuest Dashboard</h2>

        <div>
          <button
            onClick={() => (window.location.href = "/add-job")}
            className="bg-white text-blue-600 px-4 py-2 rounded mr-3 hover:bg-gray-200"
          >
            + Add Job
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Job List */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-5 shadow-lg rounded-lg border"
          >
            <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
            <p className="text-gray-600 mt-1">Company: {job.company}</p>

            {/* Status Dropdown */}
            <div className="mt-3">
              <label className="font-medium">Status:</label>
              <select
                className="ml-2 p-2 border rounded"
                value={job.status}
                onChange={async (e) => {
                  await API.put(`/jobs/${job._id}`, { status: e.target.value });
                  fetchJobs();
                }}
              >
                <option value="applied">Applied</option>
                <option value="screening">Screening</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Delete Button */}
            <button
              onClick={async () => {
                await API.delete(`/jobs/${job._id}`);
                fetchJobs();
              }}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
