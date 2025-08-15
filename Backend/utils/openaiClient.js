
require("dotenv").config(); 

const OpenAI = require("openai");

console.log("Loaded in openaiClient:", process.env.OPENAI_API_KEY); // debug

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = openai;
