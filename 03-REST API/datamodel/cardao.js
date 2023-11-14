const BaseDAO = require('./basedao')

module.exports = class CarDAO extends BaseDAO{
    constructor(db) {
        super(db, "car")
    }
    insert(car) {
        return this.db.query("INSERT INTO car(make,model,isrunning,price,builddate) VALUES ($1,$2,$3,$4,$5)",
            [car.make, car.model, car.isrunning, car.price, car.builddate])
        // Exemple à modifier pour récupérer le dernier ID généré avec res.rows[0].id
    }
    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM car ORDER BY make,model")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }
    update(car) {
        return this.db.query("UPDATE car SET make=$2,model=$3,isrunning=$4,price=$5,builddate=$6 WHERE id=$1",
            [car.id, car.make, car.model, car.isrunning, car.price, car.builddate])
    }

}