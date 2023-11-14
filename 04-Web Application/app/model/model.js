class Model {
    constructor() {
        this.api = new CarAPI()
    }
    async getAllCars() {
        //return await this.api.getAll()
        let cars = []
        for (let car of await this.api.getAll()) {
            cars.push(Object.assign(new Car(), car))
            car.builddate = new Date(car.builddate)
        }
        return cars
    }
    async getCar(id) {
        try {
            const car = Object.assign(new Car(), await this.api.get(id))
            car.builddate = new Date(car.builddate)
            return car
        } catch (e) {
            if (e === 404) return null
            return undefined
        }
    }
    delete(id) {
        return this.api.delete(id).then(res => res.status)
    }
    insert(car) {
        return this.api.insert(car).then(res => res.status)
    }
    update(car) {
        return this.api.update(car).then(res => res.status)
    }
}