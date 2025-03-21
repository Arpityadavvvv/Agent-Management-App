import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const AddAgent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://agent-management-app.onrender.com/api/agents/add", { name, email, mobile, password });
      alert("Agent added successfully!");
      navigate('/with-tasks');

    } catch (error) {
      alert("Error adding agent");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF3EC]">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Agent</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Add Agent</button>
        </form>

        <div>
      <p className="text-center mt-4 text-sm text-gray-600">
                wanna assign task via CSV files <Link to="/upload-csv" className="text-purple-500 hover:underline font-semibold">click here</Link>
              </p>
      </div>
      </div>
      
      
    </div>
  );
};

export default AddAgent;
