const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const Router = require('./Router/expenseRouter')
const connectDB = require('./db/expenseDb')
const geminiService = require('./controlers/geminiControler')
const authRouter = require('./Router/authRouter')
const incomeRouter = require('./Router/incomeRouter')


dotenv.config();
const app = express();
app.use(cors())
connectDB()
app.use(express.json());

const PORT = process.env.PORT || 7070;

app.use('/expense', Router);

app.use("/api/auth",authRouter );
app.use('/api/income', incomeRouter)
app.use('/api/report', geminiService)


app.listen(PORT, () => {
    console.log(`My app is listening at ${PORT}`);
});


