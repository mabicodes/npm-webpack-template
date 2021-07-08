export class Counter {
    constructor() {
        this.count = 0
    }

    incrementAndReturn() {
        this.count++
        return this.count
    }
}