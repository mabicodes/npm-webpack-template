import {Counter} from "../src/js/counter";


describe("Counter", () =>{
    it("should count numbers", () => {

        let counter = new Counter()

        expect(counter.incrementAndReturn()).toBe(1)
        expect(counter.incrementAndReturn()).toBe(2)
        expect(counter.incrementAndReturn()).toBe(3)
    })
})