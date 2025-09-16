import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import geminiAI from './config/gemini.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/api/docter-support', async(req, res) => {
    try{
  const {question} = req.body;
 if(!question){
  return res.status(400).json({error: 'Question is required'});
 }
const model = geminiAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const result = await model.generateContent(
`You are a helpful assistant for doctors. 
Answer the question as best as you can. If you don't know the answer, 
just say that you don't know, don't try to make up an answer.
Question: ${question}

Note: Do not answer any other information 
only answer medical related information
if asked any other not related to medical field say "I'm sorry, I can only answer medical related questions."
`
);
// console.log(result);
  res.json({status: 'success', answer: result?.response?.candidates[0]?.content?.parts[0] ,question});
}catch(error){
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});