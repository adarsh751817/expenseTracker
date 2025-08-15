const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Set this in .env

async function generateExpenseReport(income, expenses) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const incomeSummary = income
    .map((item, index) => `${index + 1}. ${item.category} - ₹${item.amount}`)
    .join("\n");

  const expenseSummary = expenses
    .map((item, index) => `${index + 1}. ${item.category} - ₹${item.amount}`)
    .join("\n");

  const prompt = `
You are an AI finance assistant. Based on the following income and expenses, generate a detailed financial summary. Include insights like:
- Total income and expenses
- Savings or deficit
- Spending patterns
- Financial advice
- Encourage better saving habits

Income:
${incomeSummary}

Expenses:
${expenseSummary}

Provide a well-structured, helpful and conversational report.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const report = response.text();
    return report;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw new Error("Failed to generate AI report.");
  }
}

module.exports = generateExpenseReport;
