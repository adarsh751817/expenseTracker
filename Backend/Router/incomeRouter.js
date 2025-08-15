

const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleWare");

const {
  createIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
  myIncome
} = require("../controlers/incomeControler"); 
router.post("/", authMiddleware, createIncome);
router.get("/all_income", authMiddleware, getIncomes);
router.put("/:id", authMiddleware, updateIncome);
router.delete("/:id", authMiddleware, deleteIncome);
router.get("/my_income", authMiddleware, myIncome);

module.exports = router;
