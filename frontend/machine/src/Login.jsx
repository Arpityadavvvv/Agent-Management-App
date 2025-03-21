import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { toast } from "react-toastify";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password });

    axios.post('https://agent-management-app.onrender.com/login',{email,password})
    .then(result => {console.log(result)
        if(result.data.message === "Success"){
            toast.success("login succesful");
            navigate('/add');
        }
        
    })
    .catch(err => console.log(err))
  };


  return (
    <div className="flex items-center justify-center min-h-screen  bg-[#FFF3EC]">
      <div className="p-8 bg-white rounded-xl shadow-2xl w-96">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
          />
          <button
            type="submit"
            className="w-full p-3 text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 transition duration-300 font-semibold shadow-md"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-purple-500 hover:underline font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
