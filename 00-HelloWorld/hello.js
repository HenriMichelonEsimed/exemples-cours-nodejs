module.exports = () => {
    function privee() {
        return "Hello World ! depuis une fonction privée du module"
    }

    return {
        world() {
            console.log(privee())
            return "Hello World ! depuis une fonction publique du module"
        }
    }
}
