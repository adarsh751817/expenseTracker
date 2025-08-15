

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";

// const Login = () => {
//   const navigate = useNavigate();

//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     setError(""); // clear error on input
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = credentials;

//     if (!email || !password) {
//       return setError("Please enter both email and password.");
//     }

//     try {
//       const response = await fetch("http://localhost:3000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return setError(data.message || "Invalid login.");
//       }

//       // Store JWT and user details in localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // Redirect based on role
//       if (data.user.role === "admin") {
//         navigate("/admin"); // Redirect to admin dashboard
//       } else {
//         navigate("/dashboard"); // Redirect to user dashboard
//       }
//     } catch (err) {
//       setError("Server error. Try again later.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-bl from-green-200 via-blue-100 to-purple-300 flex items-center justify-center px-4">
//       <motion.div
//         className="bg-white/60 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Welcome Back
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//             onChange={handleChange}
//           />
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
//               onChange={handleChange}
//             />
//             <span
//               className="absolute top-3 right-4 cursor-pointer text-gray-600"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </span>
//           </div>

//           {error && (
//             <motion.p
//               className="text-red-500 text-sm text-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               {error}
//             </motion.p>
//           )}

//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             whileHover={{ scale: 1.02 }}
//             type="submit"
//             className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
//           >
//             Log In
//           </motion.button>

//           <p className="text-center text-gray-600 text-sm mt-2">
//             Don't have an account?{" "}
//             <span
//               onClick={() => navigate("/signup")}
//               className="text-green-700 font-medium cursor-pointer hover:underline"
//             >
//               Sign Up
//             </span>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(""); // clear error on input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    if (!email || !password) {
      return setError("Please enter both email and password.");
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return setError(data.message || "Invalid login.");
      }

      // ✅ Store JWT and user details in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role); // ✅ Store role separately

      // ✅ Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-green-200 via-blue-100 to-purple-300 flex items-center justify-center px-4">
      <motion.div
        className="bg-white/60 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
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
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Log In
          </motion.button>

          <p className="text-center text-gray-600 text-sm mt-2">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-green-700 font-medium cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
