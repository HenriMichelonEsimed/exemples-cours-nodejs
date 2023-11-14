console.log("Hello World!")

const hello = require('./hello')()
//const hello = require(__dirname + '/hello')()
//console.log(hello.privee())
console.log(hello.world())

const MaClasse = require('./maclasse')
const obj1 = new MaClasse("Jean")
console.log(obj1.direBonjour())

const fs = require('fs')
fs.watchFile('hello.txt', () => {
    console.log('Le fichier a été changé, sauvegarde/moulinette/analyse en cours...')
})

const http = require('http')
http.createServer((req, res) => {
     res.writeHeader(200, { 'Content-Type': 'text/plain' })
     res.write(obj1.direBonjour())
     res.end()
 }).listen(3333)
