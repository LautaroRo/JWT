import express from "express"
import handlebars from "express-handlebars"
import { authToken, generateToken } from "./utils.js"
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.engine("handlebars", handlebars.engine())
app.set("views", "./src/views")
app.set("view engine", "handlebars")


app.use(express.static("./src/public"))

const users = []


app.get("/", (req, res) => {
    res.render("home")
})


app.get("/register", (req, res) => {
    res.render("register")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/api/register", (req, res) => {

    const { name, email, password } = req.body

    const exists = users.find(element => element.email === email)

    console.log(exists)
    if (exists) return res.send({ status: "Ya existe un usuario" })

    const user = {
        name,
        email,
        password
    }
    users.push(user)

    const acces_token = generateToken(user)
    console.log(users)
    res.send({ status: "succes", acces_token })
})

app.post("/api/login",(req, res) => {
    const { email, password } = req.body

    const user = users.find(element => element.email === email && element.password === password )

    if (!user) return res.send({ status: "no se encontro el usuario" })

    console.log(email)
    const acces_token = generateToken(user)

    res.send({ status: "succes", acces_token })
})

app.get("/api/current", authToken, (req,res) => {

    res.send({status:"succes", payload: req.user})
})

app.listen(5000, () => console.log("Corriendo"))