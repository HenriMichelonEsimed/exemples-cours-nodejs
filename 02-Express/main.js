const express = require('express')
const app = express()

app.get("/", (req, res)  => {
    res.send("Hello, World ! from Express")
})

app.get("/lesdonnees", (req, res) => {
    res.json({
        nom: "LeNom",
        prenom: "LePrenom"
    })
})

app.listen(3333)
