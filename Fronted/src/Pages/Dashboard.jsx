


// import React, { useEffect, useState, useMemo } from "react";
// import { Card, CardContent } from "../Components/Card";
// import { motion } from "framer-motion";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   LineChart,
//   Line,
// } from "recharts";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA46BE", "#FF6666"];

// const Dashboard = () => {
//   const [income, setIncome] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedUser = JSON.parse(localStorage.getItem("user"));
//     if (!loggedUser) {
//       navigate("/login");
//       return;
//     }
//     setUser(loggedUser);
//     fetchExpenses(loggedUser.role);
//     fetchIncome(loggedUser.role); // ✅ Call fetchIncome with role
//   }, []);

//   const fetchExpenses = async (role) => {
//     try {
//       const token = localStorage.getItem("token");
//       const endpoint =
//         role === "admin"
//           ? "http://localhost:3000/expense/all_expense"
//           : "http://localhost:3000/expense/my_expenses";

//       const res = await fetch(endpoint, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();

//       if (data.success && Array.isArray(data.expenses)) {
//         setExpenses(data.expenses);
//       } else {
//         setExpenses([]);
//       }
//     } catch (err) {
//       console.error("Error fetching expenses", err);
//       setExpenses([]);
//     }
//   };

//   const fetchIncome = async (role) => {
//     try {
//       const token = localStorage.getItem("token");
//       const endpoint =
//         role === "admin"
//           ? "http://localhost:3000/income/all_income"
//           : "http://localhost:3000/income/my_income";

//       const res = await fetch(endpoint, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       console.log("Income data:", data);
//       if (data.success && Array.isArray(data.income)) {
//         setIncome(data.income);
//       } else {
//         setIncome([]);
//       }
//     } catch (err) {
//       console.error("Error fetching income", err);
//       setIncome([]);
//     }
//   };

//   const filteredIncome = useMemo(() => income.filter(item => item.date && !isNaN(new Date(item.date))), [income]);
//   const filteredExpenses = useMemo(() => expenses.filter(item => item.date && !isNaN(new Date(item.date))), [expenses]);

//   const totalIncome = filteredIncome.reduce((acc, item) => acc + item.amount, 0);
//   const totalExpense = filteredExpenses.reduce((acc, item) => acc + item.amount, 0);
//   const remainingBalance = totalIncome - totalExpense;

//   const groupByCategory = (data) => {
//     const result = {};
//     data.forEach(item => {
//       result[item.category] = (result[item.category] || 0) + item.amount;
//     });
//     return Object.entries(result).map(([category, amount]) => ({ name: category, value: amount }));
//   };

//   const incomeByCategory = groupByCategory(filteredIncome);
//   const expenseByCategory = groupByCategory(filteredExpenses);

//   const groupByDate = (data) => {
//     const result = {};
//     data.forEach(item => {
//       const date = new Date(item.date).toLocaleDateString();
//       result[date] = (result[date] || 0) + item.amount;
//     });
//     return Object.entries(result).map(([date, amount]) => ({ date, amount }));
//   };

//   const incomeTrend = groupByDate(filteredIncome);
//   const expenseTrend = groupByDate(filteredExpenses);

//   const incomeVsExpenseData = [
//     { name: "Income", value: totalIncome },
//     { name: "Expenses", value: totalExpense },
//   ];

//   return (
//     <div className="p-4 space-y-4">
//       {user?.role !== "admin" && (
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/admin-dashboard")}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
//         >
//           Go to Admin Dashboard
//         </motion.button>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
//           <Card>
//             <CardContent>
//               <h2 className="text-xl font-bold">Total Income</h2>
//               <p className="text-green-600 text-2xl">₹{totalIncome}</p>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
//           <Card>
//             <CardContent>
//               <h2 className="text-xl font-bold">Total Expenses</h2>
//               <p className="text-red-600 text-2xl">₹{totalExpense}</p>
//             </CardContent>
//           </Card>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
//           <Card>
//             <CardContent>
//               <h2 className="text-xl font-bold">Remaining Balance</h2>
//               <p className="text-blue-600 text-2xl">₹{remainingBalance}</p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//         <Card>
//           <CardContent>
//             <h2 className="text-lg font-semibold mb-2">Income by Category</h2>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={incomeByCategory}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   label
//                 >
//                   {incomeByCategory.map((_, index) => (
//                     <Cell key={`cell-income-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent>
//             <h2 className="text-lg font-semibold mb-2">Expenses by Category</h2>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={expenseByCategory}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   label
//                 >
//                   {expenseByCategory.map((_, index) => (
//                     <Cell key={`cell-exp-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent>
//             <h2 className="text-lg font-semibold mb-2">Income vs Expenses</h2>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={incomeVsExpenseData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#8884d8" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//         <Card>
//           <CardContent>
//             <h2 className="text-lg font-semibold mb-2">Income Trend</h2>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={incomeTrend}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="amount" stroke="#28a745" />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent>
//             <h2 className="text-lg font-semibold mb-2">Expense Trend</h2>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={expenseTrend}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="amount" stroke="#dc3545" />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "../Components/Card";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { useNavigate } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA46BE", "#FF6666"];

const Dashboard = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) {
      navigate("/login");
      return;
    }
    setUser(loggedUser);
    fetchExpenses(loggedUser.role);
    fetchIncome(loggedUser.role);
  }, []);

  const fetchExpenses = async (role) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        role === "admin"
          ? "http://localhost:3000/expense/all_expense"
          : "http://localhost:3000/expense/my_expenses";

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      // ✅ Accept both `success` and `status` fields
      if ((data.success || data.status === "success") && Array.isArray(data.expenses || data.data)) {
        setExpenses(data.expenses || data.data || []);
      } else {
        setExpenses([]);
      }
    } catch (err) {
      console.error("Error fetching expenses", err);
      setExpenses([]);
    }
  };

  const fetchIncome = async (role) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint =
        role === "admin"
          ? "http://localhost:3000/api/income/all_income"
          : "http://localhost:3000/api/income/my_income";

      const res = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("Income data:", data);

      // ✅ Accept both `success` and `status` fields
      if ((data.success || data.status === "success") && Array.isArray(data.income || data.data)) {
        setIncome(data.income || data.data || []);
      } else {
        setIncome([]);
      }
    } catch (err) {
      console.error("Error fetching income", err);
      setIncome([]);
    }
  };

  // ✅ Filter out invalid dates
  const filteredIncome = useMemo(
    () => income.filter(item => item.date && !isNaN(new Date(item.date))),
    [income]
  );
  const filteredExpenses = useMemo(
    () => expenses.filter(item => item.date && !isNaN(new Date(item.date))),
    [expenses]
  );

  const totalIncome = filteredIncome.reduce((acc, item) => acc + (item.amount || 0), 0);
  const totalExpense = filteredExpenses.reduce((acc, item) => acc + (item.amount || 0), 0);
  const remainingBalance = totalIncome - totalExpense;

  const groupByCategory = (data) => {
    const result = {};
    data.forEach(item => {
      result[item.category || "Uncategorized"] = (result[item.category || "Uncategorized"] || 0) + (item.amount || 0);
    });
    return Object.entries(result).map(([category, amount]) => ({ name: category, value: amount }));
  };

  const incomeByCategory = groupByCategory(filteredIncome);
  const expenseByCategory = groupByCategory(filteredExpenses);

  const groupByDate = (data) => {
    const result = {};
    data.forEach(item => {
      const date = new Date(item.date).toLocaleDateString();
      result[date] = (result[date] || 0) + (item.amount || 0);
    });
    return Object.entries(result).map(([date, amount]) => ({ date, amount }));
  };

  const incomeTrend = groupByDate(filteredIncome);
  const expenseTrend = groupByDate(filteredExpenses);

  const incomeVsExpenseData = [
    { name: "Income", value: totalIncome },
    { name: "Expenses", value: totalExpense },
  ];

  return (
    <div className="p-4 space-y-4">
      {user?.role !== "admin" && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/admin-dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Go to Admin Dashboard
        </motion.button>
      )}

      {/* Totals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent>
              <h2 className="text-xl font-bold">Total Income</h2>
              <p className="text-green-600 text-2xl">₹{totalIncome}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent>
              <h2 className="text-xl font-bold">Total Expenses</h2>
              <p className="text-red-600 text-2xl">₹{totalExpense}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent>
              <h2 className="text-xl font-bold">Remaining Balance</h2>
              <p className="text-blue-600 text-2xl">₹{remainingBalance}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Pie Charts & Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Income by Category</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={incomeByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {incomeByCategory.map((_, index) => (
                    <Cell key={`cell-income-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Expenses by Category</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={expenseByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {expenseByCategory.map((_, index) => (
                    <Cell key={`cell-exp-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Income vs Expenses</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={incomeVsExpenseData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Income Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={incomeTrend}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#28a745" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-2">Expense Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={expenseTrend}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#dc3545" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

