class Adder {
    constructor(component='') {
        this.inputABus = undefined;
        this.inputBBus = undefined;

        this.outputBus = new Bus(component, 'out');
    }

    draw(){
        this.outputBus.draw('#ffffff', '#00ff00');
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