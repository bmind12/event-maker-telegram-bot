require('dotenv').config();
import express from 'express';

const app = express();
const port = process.env.PORT;

app.get('/', (_req, res) => {
    res.send('Hello! I am event maker telegram bot');
});

app.listen(port, () => {
    console.log(`Bot listening at http://localhost:${port}`);
});
