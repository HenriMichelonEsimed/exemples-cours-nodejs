const Personne = require('./personne')

module.exports = class PersonneDAO {
    constructor(db) {
        this.db = db
    }
    insert(personne) {
        return this.db.query("INSERT INTO personne(nom,prenom) VALUES ($1, $2)", [personne.nom, personne.prenom])
    }
    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM personne ORDER BY nom,prenom")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    delete(id) {
        return this.db.query("DELETE FROM personne WHERE id=$1", [id])
    }
    update(personne) {
        return this.db.query("UPDATE personne SET nom=$2,prenom=$3 WHERE id=$1", [personne.id, personne.nom, personne.prenom])
    }

}