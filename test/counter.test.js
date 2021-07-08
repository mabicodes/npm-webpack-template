import {Counter} from "../src/js/counter";


describe("Counter", () =>{
    it("should count numbers", () => {

        let Counter = new counter()

        expect(counter.incrementAndReturn()).toBe(1)
        expect(counter.incrementAndReturn()).toBe(2)
        expect(counter.incrementAndReturn()).toBe(3)
    })
})