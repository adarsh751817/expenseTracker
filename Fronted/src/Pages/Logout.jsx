import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all user-related data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optional: clear all localStorage (if needed)
    // localStorage.clear();

    // Redirect to login
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-xl font-semibold text-gray-700">Logging you out...</h1>
    </div>
  );
};

export default Logout;
