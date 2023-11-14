class CarAPI extends BaseAPIService {
    constructor() {
        super("car")
    }
    getAll() {
        return fetchJSON(this.url, this.token)
    }
    get(id) {
        return fetchJSON(`${this.url}/${id}`, this.token)
    }
    delete(id) {
        this.headers.delete('Content-Type')
        return fetch(`${this.url}/${id}`, { method: 'DELETE', headers: this.headers })
    }
    insert(car) {
        this.headers.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(car)
        })
    }
    update(car) {
        this.headers.set( 'Content-Type', 'application/json' )
        return fetch(this.url, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(car)
        })
    }
}
