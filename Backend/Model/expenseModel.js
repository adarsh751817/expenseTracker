


const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Expense title is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Expense amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Education', 'Other'],
    default: 'Other'
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true  // ✅ This links the expense to the logged-in user
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
