


import React from 'react';
import './App.css';
import Layout from './Components/Layout';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom';

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import AddExpense from './Pages/AddExpense';
import Reports from './Pages/report';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import AddIncome from './Pages/AddIncome';
import { ThemeProvider } from './context/themeContext';
// import AdminDashboard from './Pages/AdminDashboard'; // New Admin Page

// ----------------------
// Private Route Wrapper
// ----------------------
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" replace />;
};

// ----------------------
// Admin Route Wrapper
// ----------------------
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin" ? children : <Navigate to="/dashboard" replace />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />

      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/addexpense"
        element={
          <PrivateRoute>
            <AddExpense />
          </PrivateRoute>
        }
      />


      <Route
        path="/AddIncome"
        element={
          <PrivateRoute>
            <AddIncome />
          </PrivateRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />

      {/* Admin Route */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            {/* <AdminDashboard /> */}
          </AdminRoute>
        }
      />
    </Route>
  )
);

function App() {
  return <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>;
}

export default App;
