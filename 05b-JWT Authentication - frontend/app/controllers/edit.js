class EditController extends BaseFormController {
    constructor() {
        super(true)
        if (indexController.selectedCar) {
            this.car = indexController.selectedCar
            indexController.selectedCar = null
            $('#editTitle').innerText = this.car.toString()
            $("#fieldCarMake").value = this.car.make
            $("#fieldCarModel").value = this.car.model
            $("#fieldCarPrice").value = this.car.price
            $("#fieldCarBuildDate").value = this.car.builddate.toISOString().substr(0, 10)
        }
    }
    async save() {
        let make = this.validateRequiredField('#fieldCarMake', 'Marque')
        let model = this.validateRequiredField("#fieldCarModel", 'Modèle')
        let price = this.validateRequiredField("#fieldCarPrice", 'Prix')
        let buildDate =  this.validateRequiredField("#fieldCarBuildDate", 'Prix')
        if ((make != null) && (model != null) && (price != null) && (buildDate != null)) {
            const date = new Date(buildDate)
            try {
                if (this.car) {
                    this.car.make = make
                    this.car.model = model
                    this.car.price = price
                    this.car.builddate = date
                    if (await this.model.update(this.car) === 200) {
                        this.toast("Le véhicule a bien été modifié")
                        this.car = null
                        navigate('index')
                    } else {
                        this.displayServiceError()
                    }
                } else {
                    if (await this.model.insert(new Car(make, model, true, price, date)) === 200) {
                        this.toast("Le véhicule a bien été inséré")
                        navigate('index')
                    } else {
                        this.displayServiceError()
                    }
                }
            } catch (err) {
                console.log(err)
                this.displayServiceError()
            }
        }
    }
}

window.editController = new EditController()
