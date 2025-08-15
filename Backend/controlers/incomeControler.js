


// const Income = require("../Model/income");

// // ✅ Create Income - auto add date if not provided
// exports.createIncome = async (req, res) => {
//   try {
//     const income = new Income({
//       ...req.body,
//       userId: req.user.id,
//       date: req.body.date || new Date(), // ✅ ensure date exists
//     });

//     await income.save();
//     res.status(201).json({ status: "success", data: income });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // ✅ Get all incomes for logged-in user (sorted by date)
// exports.getIncomes = async (req, res) => {
//   try {
//     const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });
//     res.json({ status: "success", data: incomes });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // ✅ myIncome - for route "/income/my_income"
// exports.myIncome = async (req, res) => {
//   try {
//     const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });

//     res.json({
//       success: true,
//       income: incomes,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Income fetch failed",
//     });
//   }
// };

// // ✅ Update Income
// exports.updateIncome = async (req, res) => {
//   try {
//     const updated = await Income.findOneAndUpdate(
//       { _id: req.params.id, userId: req.user.id },
//       req.body,
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ error: "Income not found or unauthorized" });
//     }

//     res.json({ status: "success", data: updated });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // ✅ Delete Income
// exports.deleteIncome = async (req, res) => {
//   try {
//     const deleted = await Income.findOneAndDelete({
//       _id: req.params.id,
//       userId: req.user.id,
//     });

//     if (!deleted) {
//       return res.status(404).json({ error: "Income not found or unauthorized" });
//     }

//     res.json({ status: "success", message: "Income deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



const Income = require("../Model/income");

// ✅ Create Income - auto add date if not provided
exports.createIncome = async (req, res) => {
  try {
    const income = new Income({
      ...req.body,
      userId: req.user.id,
      date: req.body.date || new Date(),
    });

    await income.save();
    res.status(201).json({ success: true, income: income });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Get all incomes for logged-in user (sorted by date)
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });
    res.json({ success: true, income: incomes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ myIncome - for route "/income/my_income"
exports.myIncome = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });
    res.json({ success: true, income: incomes });
  } catch (err) {
    res.status(500).json({ success: false, message: "Income fetch failed" });
  }
};

// ✅ Admin - Get all incomes from all users
exports.allIncome = async (req, res) => {
  try {
    const incomes = await Income.find().sort({ date: -1 });
    res.json({ success: true, income: incomes });
  } catch (err) {
    res.status(500).json({ success: false, message: "All incomes fetch failed" });
  }
};

// ✅ Update Income
exports.updateIncome = async (req, res) => {
  try {
    const updated = await Income.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Income not found or unauthorized" });
    }

    res.json({ success: true, income: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Delete Income
exports.deleteIncome = async (req, res) => {
  try {
    const deleted = await Income.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Income not found or unauthorized" });
    }

    res.json({ success: true, message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


