const express = require('express');
const cors = require('cors');
const stripe = require('stripe');

const app = express();

app.use(cors({ origin: "http://127.0.0.1:3000" }));
app.use(express.json);

app.post('/api/checkout', (req, res) => {
    console.log(req.body)
    res.send('received')
})

app.listen(4000, () =>
    console.log('http://localhost:4000')
)