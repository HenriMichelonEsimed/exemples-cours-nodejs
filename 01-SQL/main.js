const pg = require('pg')
const PersonneDAO = require("./datamodel/personnedao")

const connectionString = "postgres://user1:default@192.168.56.101/base1"
const db = new pg.Pool({ connectionString: connectionString })
const personneDAO = new PersonneDAO(db)

require('./datamodel/seeder')(personneDAO)
    .then(_ =>personneDAO.getAll())
    .then(personnes => {
        console.log(personnes)
        personneDAO.delete(personnes[2].id)
            .then(_ => {
                personnes[3].nom = "Modifié"
                personneDAO.update(personnes[3])
                    .then(_ => personneDAO.getAll())
                    .then(personnes => {
                        console.log(personnes)
                        db.end()
                    })
            })
    })


/*
db.query("CREATE TABLE personne (id SERIAL PRIMARY KEY, nom TEXT, prenom TEXT)")
        .catch(e => {})
try {
    db.query("SELECT count(*) FROM personne")
        .then(res => res.rows[0].count)
        .then(count => {
            if (count == 0) {
                for (let i = 0; i < 10; i++) {
                    db.query("INSERT INTO personne(nom,prenom) VALUES ($1, $2)", ["Nom" + i, "Prenom" + i])
                }
            }
        })
} catch (err) {
    console.log(err.stack)
}*/
/*
db.query("SELECT * FROM personne")
    .then(res => {
        for (let row of res.rows) {
            console.log(`nom: ${row.nom}, prénom:${row.prenom}`)
        }
        db.end()
    })
*/
