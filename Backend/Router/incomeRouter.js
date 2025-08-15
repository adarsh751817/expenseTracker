// const express = require("express");
// const router = express.Router();
// const { authMiddleware } = require("../middleware"); // ✅ make sure it's "middleware" not "middleWare"

// const {
//   createIncome,
//   getIncomes,
//   updateIncome,
//   deleteIncome,
//   myIncome
// } = require("../controlers/incomeControler"); // ✅ also correct "controlers" → "controllers" if needed

// // ✅ Use authMiddleware consistently
// router.post("/", authMiddleware, createIncome);
// router.get("/all_income", authMiddleware, getIncomes);
// router.put("/:id", authMiddleware, updateIncome);
// router.delete("/:id", authMiddleware, deleteIncome);
// router.get("/my_income", authMiddleware, myIncome);    
// module.exports = router;


const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");

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
