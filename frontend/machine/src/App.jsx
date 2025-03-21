import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";  // ✅ Import ToastContainer
import "react-toastify/dist/ReactToastify.css";  // ✅ Import Toast styles

import Home from "./Home";

import Login from "./Login";
import Signup from "./Signup";
import AddAgent from "./AddAgent";
import UploadCSV from "./UploadCsv";
import AgentsTaskList from "./AgentTask";
import Dashboard from "./Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div> 
        <Home />
        <Routes>  
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddAgent />} />
          <Route path="/upload-csv" element={<UploadCSV />} />
          <Route path="/with-tasks" element={<AgentsTaskList />} />
        </Routes>

        {/* ✅ Global Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </BrowserRouter>
  );
}

export default App;
