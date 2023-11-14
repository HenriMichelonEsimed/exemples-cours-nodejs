class IndexController extends BaseController {
    constructor() {
        super(true)
        this.tableAllCars = $('#tableAllCars')
        this.tableBodyAllCars = $('#tableBodyAllCars')
        this.displayAllCars()
    }
    async displayAllCars() {
        let content = ''
        this.tableAllCars.style.display = "none"
        try {
            for (const car of await this.model.getAllCars()) {
                const date = car.builddate.toLocaleDateString()
                content += `<tr><td>${car.toString()}</td>
                    <td>${car.price}</td>
                    <td>${date}</td>
                    <td class="icon">
                    <button class="btn" onclick="indexController.displayConfirmDelete(${car.id})"><i class="material-icons">delete</i></button>
                    <button class="btn" onclick="indexController.edit(${car.id})"><i class="material-icons">edit</i></button>
                    </td></tr>`
            }
            this.tableBodyAllCars.innerHTML = content
            this.tableAllCars.style.display = "block"
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
    async edit(id) {
        try {
            const object = await this.model.getCar(id)
            if (object === undefined) {
                this.displayServiceError()
                return
            }
            if (object === null) {
                this.displayNotFoundError()
                return
            }
            this.selectedCar = object
            navigate("edit")
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
    undoDelete() {
        if (this.deletedCar) {
            this.model.insert(this.deletedCar).then(status => {
                if (status === 200) {
                    this.deletedCar = null
                    this.displayUndoDone()
                    this.displayAllCars()
                }
            }).catch(_ => this.displayServiceError())
        }
    }
    async displayConfirmDelete(id) {
        try {
            const car = await this.model.getCar(id)
            super.displayConfirmDelete(car, async () => {
                switch (await this.model.delete(id)) {
                    case 200:
                        this.deletedCar = car
                        this.displayDeletedMessage("indexController.undoDelete()");
                        break
                    case 404:
                        this.displayNotFoundError();
                        break
                    default:
                        this.displayServiceError()
                }
                this.displayAllCars()
            })
        } catch (err) {
            console.log(err)
            this.displayServiceError()
        }
    }
}

window.indexController = new IndexController()
