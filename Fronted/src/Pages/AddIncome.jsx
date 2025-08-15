

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";

const CATEGORY_OPTIONS = [
  { name: "Salary", icon: "💼" },
  { name: "Freelance", icon: "🧑‍💻" },
  { name: "Investment", icon: "📈" },
  { name: "Gift", icon: "🎁" },
  { name: "Other", icon: "🔖" }
];

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const AddIncome = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [isRecurring, setIsRecurring] = useState(false);
  const [incomeList, setIncomeList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchIncomes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/income/my_income", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (Array.isArray(res.data?.income)) {
        setIncomeList(res.data.income);
      }
    } catch (err) {
      console.error("Failed to fetch incomes", err);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { amount, category, description, paymentMode, isRecurring };
    try {
      if (editingId) {
        const confirm = window.confirm("Are you sure you want to update this income?");
        if (!confirm) return;
        await axios.put(`http://localhost:3000/api/income/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        await axios.post("http://localhost:3000/api/income", payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      resetForm();
      fetchIncomes();
    } catch (err) {
      console.error("Error submitting income", err);
    }
  };

  const resetForm = () => {
    setAmount("");
    setCategory("");
    setDescription("");
    setEditingId(null);
    setIsRecurring(false);
    setPaymentMode("Cash");
  };

  const handleEdit = (income) => {
    setAmount(income.amount);
    setCategory(income.category);
    setDescription(income.description);
    setPaymentMode(income.paymentMode || "Cash");
    setIsRecurring(income.isRecurring || false);
    setEditingId(income._id);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this income?");
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:3000/api/income/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchIncomes();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const incomeTotal = incomeList.reduce((sum, inc) => sum + Number(inc.amount), 0);

  const chartData = CATEGORY_OPTIONS.map((cat) => {
    const total = incomeList
      .filter((inc) => inc.category === cat.name)
      .reduce((sum, inc) => sum + Number(inc.amount), 0);
    return { name: cat.name, value: total };
  }).filter((item) => item.value > 0);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl mt-6">
      <motion.h2
        className="text-3xl font-bold text-center text-green-700 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {editingId ? "Edit Income" : "Add New Income"}
      </motion.h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <label className="block text-sm text-gray-500 mb-2">Amount (₹)</label>
          <input
            type="number"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-green-500 shadow"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <label className="block text-sm text-gray-500 mb-2">Category</label>
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-green-500 shadow"
          >
            <option>Select Category</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat.name}>{cat.name}</option>
            ))}
          </select>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <label className="block text-sm text-gray-500 mb-2">Payment Mode</label>
          <select
            value={paymentMode}
            onChange={(e) => setPaymentMode(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-green-500 shadow"
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
            <option>Credit Card</option>
          </select>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <label className="block text-sm text-gray-500 mb-2">Recurring</label>
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="w-5 h-5 text-green-600"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:col-span-2">
          <label className="block text-sm text-gray-500 mb-2">Description (optional)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-green-500 shadow"
          />
        </motion.div>

        <div className="md:col-span-2 flex justify-between items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-green-700 transition"
          >
            {editingId ? "Update Income" : "Add Income"}
          </motion.button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-gray-600 underline hover:text-gray-800"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-green-700 mb-4">Income by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-green-700 mb-4">Bar Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Income Entries (₹{incomeTotal})</h3>
        <ul className="grid gap-4">
          {incomeList.map((inc) => (
            <motion.li
              key={inc._id}
              className="flex justify-between items-center bg-white border border-green-100 p-4 rounded-xl shadow-md hover:shadow-lg transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">
                  {CATEGORY_OPTIONS.find((c) => c.name === inc.category)?.icon || "💰"}
                </span>
                <div>
                  <p className="text-green-700 font-medium text-lg">₹{inc.amount}</p>
                  <p className="text-sm text-gray-500">
                    {inc.category} • {inc.description} • {inc.paymentMode} {inc.isRecurring ? "• 🔁" : ""}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(inc)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(inc._id)}
                  className="text-red-500 font-semibold hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddIncome;
