export default class Errors {

    constructor() {
        this.data = {}
    }

    has(field) {
        return this.data.hasOwnProperty(field);
    }

    get(field) {
        if (this.has(field)) {
            return this.data[field][0]
        }
    }

    any() {
        return Object.keys(this.data).length > 0
    }

    record(errors) {
        this.data = errors
    }

    clean(field) {
        if (field) {
            return delete this.data[field]
        }
        this.data = {}
    }

    isEmpty() {
        return Object.keys(this.data).length === 0;
    }
}