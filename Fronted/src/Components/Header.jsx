
import React from "react";
import { motion } from "framer-motion";
import { Home, PlusCircle, BarChart2, LogOut, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Import Theme Context

export default function Header() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className={`fixed left-0 top-0 h-full w-64 shadow-2xl flex flex-col justify-between py-8 px-4 rounded-r-2xl transition-colors
        ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gradient-to-b from-purple-700 to-indigo-900 text-white"}`}
    >
      {/* Logo */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Expense Tracker Logo"
          className="w-16 h-16 mb-2"
        />
        <span className="text-xl font-bold">Expense Tracker</span>
      </div>

      {/* Navigation Links */}
      <div className="space-y-6">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <Home />
          <span className="text-lg font-semibold">Home</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate('/Dashboard')}
        >
          <Home />
          <span className="text-lg font-semibold">Dashboard</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate('/AddExpense')}
        >
          <PlusCircle />
          <span className="text-lg font-semibold">Expense</span>
        </motion.div>


        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate('/AddIncome')}
        >
          <PlusCircle />
          <span className="text-lg font-semibold">Income</span>
        </motion.div>


        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate('/Reports')}
        >
          <BarChart2 />
          <span className="text-lg font-semibold">Reports</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate('/Login')}
        >
          <BarChart2 />
          <span className="text-lg font-semibold">Login</span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate('/Signup')}
        >
          <BarChart2 />
          <span className="text-lg font-semibold">Signup</span>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4">
        {/* Theme Toggle Button */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg shadow bg-indigo-500 text-white hover:bg-indigo-600 transition"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </motion.button>

        {/* Logout */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate('/Logout')}
        >
          <LogOut />
          <span className="text-lg font-semibold">Logout</span>
        </motion.div>
      </div>
    </motion.nav>
  );
}
