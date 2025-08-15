const router = require("express").Router();
const mongoose = require("mongoose");
const Income = require("../Model/income");
const Expense = require("../Model/expenseModel");
const generateExpenseReport = require("../GeminiReports.js/Report");
const { authMiddleware } = require("../middleWare");

// ✅ Route: Generate Report
router.post("/generate-report", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("🔐 req.user.id:", userId);


    // ✅ Ensure it's an ObjectId
    const objectUserId = new mongoose.Types.ObjectId(userId);

    // ✅ Fetch Income and Expenses
    const income = await Income.find({ userId: objectUserId });
    const expenses = await Expense.find({ userId: objectUserId });

    // ✅ Debug logs
    console.log("🧾 Income:", income.length);
    console.log("🧾 Expenses:", expenses.length);

    // ✅ Handle empty case
    if (!income.length && !expenses.length) {
      return res.status(404).json({ error: "Income and expenses are empty." });
    }

    // ✅ Generate report using Gemini
    const report = await generateExpenseReport(income, expenses);

    // ✅ Return success
    return res.status(200).json({ success: true, report });
  } catch (err) {
    console.error("❌ Report generation failed:", err.message);
    return res.status(500).json({ error: "Failed to generate report." });
  }
});

module.exports = router;
