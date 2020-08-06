class Adder {
    constructor() {
        this.inputABus = undefined;
        this.inputBBus = undefined;

        this.outputBus = new Bus();
    }

    passiveUpdate() {
        this.outputBus.setValue(this.inputABus.getValue() + this.inputBBus.getValue());
    }

    initialize(inputABus, inputBBus) {
        this.inputABus = inputABus;
        this.inputBBus = inputBBus;
    }

    initDrawFunction(drawFunc) {
        this.draw = drawFunc;
    }


    getOutBus() {
        return this.outputBus;
    }

    printContents() {
        console.log(this);
    }

}