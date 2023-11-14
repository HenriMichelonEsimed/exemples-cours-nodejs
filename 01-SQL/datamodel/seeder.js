const Personne = require('./personne')

module.exports = (personneDAO) => {
    return new Promise((resolve, reject) =>
        personneDAO.db.query("CREATE TABLE personne (id SERIAL PRIMARY KEY, nom TEXT, prenom TEXT)")
        .then(async _ => {
            for (let i = 0; i < 5; i++) {
                await personneDAO.insert(new Personne("Nom" + i, "Prenom" + i))
            }
            resolve()
        })
        .catch(e => {
            if (e.code === "42P07") {
                resolve()
            } else {
                reject(e)
            }
        })
    )
}