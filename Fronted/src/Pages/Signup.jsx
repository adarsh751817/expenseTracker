import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error on change
  };

  const validateEmail = (email) =>
    /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return setError("Please fill all fields.");
    }

    if (!validateEmail(email)) {
      return setError("Please enter a valid email.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    try {
      const response = await fetch("https://expensetracker-backend-sofb.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        return setError(data.message || "Signup failed.");
      }

      // Redirect to login or dashboard
      navigate("/login");
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-blue-100 to-green-200 flex items-center justify-center px-4">
      <motion.div
        className="bg-white/60 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              onChange={handleChange}
            />
            <span
              className="absolute top-3 right-4 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {error && (
            <motion.p
              className="text-red-500 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Sign Up
          </motion.button>

          <p className="text-center text-gray-600 text-sm mt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-700 font-medium cursor-pointer hover:underline"
            >
              Log In
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
