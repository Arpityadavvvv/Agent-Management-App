import React from "react";

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF3EC] px-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-[#4A4A4A] mb-4">
        Welcome to Agent Task Manager
      </h1>

      {/* Description */}
      <p className="text-lg text-[#6D6D6D] text-center max-w-2xl mb-6">
        Efficiently assign, track, and manage tasks for your agents. Improve productivity with real-time monitoring and seamless task delegation.
      </p>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-[#4A4A4A]">🔹 Add Agents</h3>
          <p className="text-[#6D6D6D] mt-2">Easily register new agents and manage their details.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-[#4A4A4A]">📂 Upload Tasks</h3>
          <p className="text-[#6D6D6D] mt-2">Upload bulk tasks via CSV files for better organization.</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-[#4A4A4A]">📊 Monitor Progress</h3>
          <p className="text-[#6D6D6D] mt-2">Track agent tasks and ensure smooth operations.</p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        className="mt-8 bg-[#FF6B6B] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#E65C5C] transition"
        onClick={() => (window.location.href = "/signup")}
      >
        Get Started
      </button>
    </div>
  );
}

export default Dashboard;
