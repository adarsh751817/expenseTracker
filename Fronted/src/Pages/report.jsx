


// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const GeminiReportGenerator = ({ income, expenses }) => {
//   const [report, setReport] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleGenerate = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:3000/api/report/generate-report", {
//         income,
//         expenses,
//       });
//       setReport(res.data.report);
//     } catch (err) {
//       console.error(err);
//       setError("Error generating report.", err.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <motion.div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg mt-4 max-w-3xl mx-auto">
//       <h2 className="text-xl font-bold mb-4 text-center text-gray-700 dark:text-white">
//         💡 AI-Powered Expense Report
//       </h2>
//       <button
//         onClick={handleGenerate}
//         className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition duration-300"
//         disabled={loading}
//       >
//         {loading ? "Generating..." : "Generate Report"}
//       </button>

//       {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

//       {report && (
//         <motion.div
//           className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           {report}
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default GeminiReportGenerator;


import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const GeminiReportGenerator = ({ income = [], expenses = [] }) => {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (income.length === 0 && expenses.length === 0) {
      setError("Income and expenses are empty.");
      return;
    }

    setLoading(true);
    setError("");
    setReport("");

    try {
      const res = await axios.post("http://localhost:3000/api/report/generate-report", {
        income,
        expenses,
      });

      if (res.data?.report) {
        setReport(res.data.report);
      } else {
        throw new Error("No report generated.");
      }
    } catch (err) {
      console.error("Gemini API Error:", err);
      setError("❌ Failed to generate report.");
    }

    setLoading(false);
  };

  return (
    <motion.div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg mt-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700 dark:text-white">
        💡 AI-Powered Expense Report
      </h2>

      <button
        onClick={handleGenerate}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-xl hover:scale-105 transition duration-300"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {report && (
        <motion.div
          className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {report}
        </motion.div>
      )}
    </motion.div>
  );
};

export default GeminiReportGenerator;
