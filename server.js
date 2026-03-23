const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

// 🔹 RDS Connection
const db = mysql.createConnection({
  host: "RDS-ENDPOINT-HERE",
  user: "admin",
  password: "YOUR_PASSWORD",
  database: "testdb",
})

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err)
    return
  }
  console.log("Connected to RDS MySQL")
})

// 🔹 API: Add user
app.post("/add-user", (req, res) => {
  const { name, email } = req.body

  const sql = "INSERT INTO users (name, email) VALUES (?, ?)"
  db.query(sql, [name, email], (err, result) => {
    if (err) return res.status(500).send(err)
    res.send({ message: "User added successfully" })
  })
})

// 🔹 API: Get users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).send(err)
    res.send(results)
  })
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})