const Car = require('./car')

module.exports = (carService) => {
    return new Promise(async (resolve, reject) => {
            try {
                await carService.dao.db.query("CREATE TABLE car (id SERIAL PRIMARY KEY, make TEXT, model TEXT, isrunning BOOLEAN, price NUMERIC, builddate DATE)")
                // autres CREATE TABLE...
                for (let i = 0; i < 5; i++) {
                    await carService.dao.insert(new Car("Make" + i, "Model" + i, true,
                        Math.floor(Math.random() * 30000),
                        new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))
                    ))
                }
                resolve()
            } catch (e) {
                if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                    resolve()
                } else {
                    reject(e)
                }
                return
            }

        }
    )
}