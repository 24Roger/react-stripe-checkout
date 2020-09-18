const express = require('express');
const cors = require('cors');
const stripe = require('stripe');

const app = express();

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

app.post("/api/checkout", (req, res) => {
  console.log(req.body);   
  res.send("received");
});

app.listen(3001, () =>
    console.log('http://localhost:3001')
)