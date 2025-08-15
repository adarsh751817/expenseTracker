

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CATEGORY_OPTIONS = [
  { name: "Food", icon: "🍽️" },
  { name: "Travel", icon: "✈️" },
  { name: "Entertainment", icon: "🎮" },
  { name: "Shopping", icon: "🛍️" },
  { name: "Bills", icon: "🧾" },
  { name: "Health", icon: "💊" },
  { name: "Education", icon: "📚" },
  { name: "Other", icon: "📦" },
];

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#8E44AD", "#1ABC9C", "#F39C12", "#E67E22", "#2ECC71"];

const AddExpenseModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";

  const fetchExpenses = async () => {
    try {
      const endpoint =
        role === "admin"
          ? "https://expensetracker-backend-sofb.onrender.com/expense/all_expense"
          : "https://expensetracker-backend-sofb.onrender.com/expense/my_expenses";

      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setExpenses(res.data.expenses || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchUsers = async () => {
    if (role !== "admin") return;
    try {
      const res = await axios.get("https://expensetracker-backend-sofb.onrender.com/user/all_users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchUsers();
  }, []);

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
    setSelectedUserId("");
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      amount: Number(amount),
      category,
      description,
      date,
      ...(role === "admin" && selectedUserId ? { userId: selectedUserId } : {}),
    };

    try {
      if (editId) {
        const confirm = window.confirm("Are you sure you want to update this expense?");
        if (!confirm) return;

        await axios.put(`https://expensetracker-backend-sofb.onrender.com/expense/update_expense/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Expense updated successfully!");
      } else {
        await axios.post("https://expensetracker-backend-sofb.onrender.com/expense/add_expense", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Expense added successfully!");
      }

      resetForm();
      setIsOpen(false);
      fetchExpenses();
    } catch (error) {
      console.error("Failed to save expense:", error);
      alert("Failed to save expense.");
    }
  };

  const handleEdit = (exp) => {
    setEditId(exp._id);
    setTitle(exp.title);
    setAmount(exp.amount);
    setCategory(exp.category);
    setDescription(exp.description);
    setDate(exp.date?.split("T")[0] || "");
    setSelectedUserId(exp.userId?._id || "");
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Do you really want to delete this expense?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://expensetracker-backend-sofb.onrender.com/expense/delete_expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Expense deleted successfully.");
      fetchExpenses();
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const total = expenses.reduce((acc, exp) => acc + Number(exp.amount), 0);
  const chartData = CATEGORY_OPTIONS.map((cat) => {
    const total = expenses
      .filter((e) => e.category === cat.name)
      .reduce((sum, e) => sum + Number(e.amount), 0);
    return { name: cat.name, value: total };
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Add Expense Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => {
            resetForm();
            setIsOpen(true);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition"
        >
          Add Expense
        </button>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border"
          >
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
              {editId ? "Edit Expense" : "Add New Expense"}
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {role === "admin" && (
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select User</option>
                  {users.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              )}
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Amount (₹)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-white"
              >
                <option value="">Select Category</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.name}>{cat.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <div className="flex justify-between gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setIsOpen(false);
                  }}
                  className="w-full bg-gray-300 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  {editId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-700 mb-4">Expense by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-blue-700 mb-4">Bar Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Entries */}
      <div className="mt-10 grid gap-4">
        <h3 className="text-2xl font-bold text-gray-700 mb-2">Total Spent: ₹{total}</h3>
        {expenses.length > 0 ? (
          expenses.map((exp) => (
            <motion.div
              key={exp._id}
              className="flex justify-between items-center bg-white border p-4 rounded-xl shadow-md hover:shadow-lg transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">
                  {CATEGORY_OPTIONS.find((c) => c.name === exp.category)?.icon || "💸"}
                </span>
                <div>
                  <p className="text-blue-700 font-medium text-lg">₹{exp.amount}</p>
                  <p className="text-sm text-gray-500">
                    {exp.title} • {exp.category} • {new Date(exp.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(exp)} className="text-blue-600 hover:underline">
                  <Pencil size={18} />
                </button>
                <button onClick={() => handleDelete(exp._id)} className="text-red-500 hover:underline">
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No expenses found.</p>
        )}
      </div>
    </div>
  );
};

export default AddExpenseModal;
