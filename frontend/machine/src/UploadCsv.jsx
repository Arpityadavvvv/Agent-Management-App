import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/csv/tasks");
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to load tasks");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (!selectedFile) {
      console.error("❌ No file selected");
      return;
    }
  
    console.log("📂 File selected:", selectedFile);
    setFile(selectedFile);
  };
  
  

  const handleUpload = async () => {
    if (!file) {
      console.error("❌ No file selected");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    for (let [key, value] of formData.entries()) {
      console.log(`🔍 FormData contains -> ${key}:`, value);
    }
  
    try {
      const response = await axios.post("https://agent-management-app.onrender.com/api/csv/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log("✅ Upload successful:", response.data);
    } catch (error) {
      console.error("❌ Upload failed:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="p-6 bg-[#FFF3EC]">
      <h2 className="text-2xl font-bold mb-4">Upload CSV & Distribute Tasks</h2>
      <input type="file" accept=".csv, .xlsx, .xls" onChange={handleFileChange} className="border p-2 w-full rounded" />
      <button
        onClick={handleUpload}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Upload & Distribute
      </button>

      <h2 className="text-xl font-bold mt-6">Assigned Tasks</h2>
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Agent</th>
            <th className="p-2">First Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="border">
              <td className="p-2">{task.assignedAgent.name}</td>
              <td className="p-2">{task.firstName}</td>
              <td className="p-2">{task.phone}</td>
              <td className="p-2">{task.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadCSV;
