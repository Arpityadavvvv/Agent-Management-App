import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    
    <nav className="bg-[#FFB6A0] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-[#4A4A4A] text-2xl font-bold">Agent Task Manager</h1>
        <ul className="flex space-x-6">
          <li><Link to="/" className="text-[#4A4A4A] font-medium hover:text-white transition">Home</Link></li>
          <li><Link to="/signup" className="text-[#4A4A4A] font-medium hover:text-white transition">Signup</Link></li>
          <li><Link to="/login" className="text-[#4A4A4A] font-medium hover:text-white transition">Login</Link></li>
          <li><Link to="/add" className="text-[#4A4A4A] font-medium hover:text-white transition">Add Agent</Link></li>
          <li><Link to="/upload-csv" className="text-[#4A4A4A] font-medium hover:text-white transition">Upload CSV</Link></li>
          <li><Link to="/with-tasks" className="text-[#4A4A4A] font-medium hover:text-white transition">Agents & Tasks</Link></li>
        </ul>

        
      </div>
    </nav>

  

    
    
  );
}

export default Home;
