
const express = require('express')
const Router = express.Router();

const { addExpense, updateExpense, deleteExpense, getExpenseById, allExpense, myExpenses } = require('../controlers/expenseControlers')
const { authMiddleware, adminMiddleware } = require('../middleWare')


Router.post('/add_expense', authMiddleware, addExpense)
Router.put('/update_expense/:id', authMiddleware, updateExpense)
Router.delete('/delete_expense/:id', authMiddleware, deleteExpense)
Router.get('/get_expense/:id', authMiddleware, getExpenseById)
Router.get('/all_expense', authMiddleware, adminMiddleware, allExpense)
Router.get('/my_expenses',authMiddleware, myExpenses)


module.exports = Router



