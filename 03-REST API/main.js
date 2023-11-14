const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const CarService = require("./services/car")

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

const connectionString = "postgres://user1:default@192.168.56.102/base1"
const db = new pg.Pool({ connectionString: connectionString })
const carService = new CarService(db)
require('./api/car')(app, carService)
require('./datamodel/seeder')(carService)
    .then(app.listen(3333))


