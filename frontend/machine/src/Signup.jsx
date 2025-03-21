import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const Signup = () => {
  const [name, setName] = useState("");   // these are all three feilds 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // on submiting the final data , we will use axios 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", { name, email, password });

    axios.post('https://agent-management-app.onrender.com/register',{name,email,password})   // axios.post('url'.'{data}')
        .then(result => {console.log(result)
            toast.success("sign-up successfull");
            navigate('/login')
        })
        .catch(err=> console.log(err))
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF3EC]">
      <div className="p-8 bg-white rounded-xl shadow-2xl w-96">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}  // event is firing 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}   // event is firing 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  //event is firing 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
          />
          <button
            type="submit"
            className="w-full p-3 text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-blue-500 hover:to-purple-500 transition duration-300 font-semibold shadow-md"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-purple-500 hover:underline font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
