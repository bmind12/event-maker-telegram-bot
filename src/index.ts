import express from 'express'

const app = express()
const port = 3000

app.get('/', (_req, res) => {
  res.send('Hello! I am event maker telegram bot')
})

app.listen(port, () => {
  console.log(`Bot listening at http://localhost:${port}`)
})