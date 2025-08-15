


const Expense = require('../Model/expenseModel'); // ✅ Import Expense model

// Add Expense
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const newExpense = new Expense({
      title,
      amount,
      category,
      description,
      date,
      userId: req.user.id // ✅ Save userId from JWT
    });

    const savedExpense = await newExpense.save();

    res.status(201).json({
      success: true,
      message: 'Expense added successfully',
      expense: savedExpense
    });
  } catch (error) {
    console.error("Add Expense Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Expense by ID
const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    // Admin can access any expense, user can only access their own
    if (req.user.role !== 'admin' && expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.status(200).json({ success: true, expense });
  } catch (error) {
    console.error("Get Expense Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    // Admin can delete any expense, user can only delete their own
    if (req.user.role !== 'admin' && expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await expense.deleteOne();
    res.status(200).json({ success: true, message: 'Expense deleted' });
  } catch (error) {
    console.error("Delete Expense Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    // Admin can update any expense, user can only update their own
    if (req.user.role !== 'admin' && expense.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const updExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: 'Expense updated', expense: updExpense });
  } catch (error) {
    console.error("Update Expense Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Expenses (Admin Only)
const allExpense = async (req, res) => {
  try {
    const allExpenses = await Expense.find()
      .populate("userId", "name email") // ✅ Populate name and email of the user
      .sort({ date: -1 });

    res.json({ success: true, expenses: allExpenses });
  } catch (error) {
    console.error("All Expense Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Logged-in User's Expenses
const myExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    console.error("My Expense Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addExpense,
  deleteExpense,
  updateExpense,
  getExpenseById,
  allExpense,
  myExpenses
};
