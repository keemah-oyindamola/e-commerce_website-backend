const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const connect = require("./Config/database")

const userrouter = require("./route/userrouter")

app.use(express.urlencoded({extended: true, limit:"100mb"}))
app.use(express.json({limit:"100mb"}))
// app.use(cors({origin:"https://e-commerce-website-two-iota-42.vercel.app"}))

app.use("/user", userrouter)


const port = process.env.PORT || 5006
app.listen(port, () => {
    console.log(`app started on port ${port}`); 
})

connect()