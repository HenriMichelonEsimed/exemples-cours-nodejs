module.exports = class MaClasse {
    constructor(nom) {
        this.nom = nom
    }
    direBonjour() {
        return `Bonjour ${this.nom} !`
    }
}
