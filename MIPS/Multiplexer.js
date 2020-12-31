class Multiplexer {

    constructor(component = '') {
        this.inputABus = undefined;
        this.inputBBus = undefined;
        this.controlSignal = undefined;

        this.outBus = new Bus(component, 'out');
    }

    draw() {
        this.outBus.draw('#ffffff', '#00ff00');
    }

    passiveUpdate() {
        let outValue = undefined;

        if (this.controlSignal.getValue() === 0) {
            outValue = this.inputABus.getValue(this.inputABusMask);
        } else {
            outValue = this.inputBBus.getValue(this.inputBBusMask);
        }

        console.log(this.controlSignal.getValue());
        this.outBus.setValue(outValue);
    }

    initialize(inputABus, inputBBus, controlSignal, inputABusMask = ALL_SET, inputBBusMask = ALL_SET) {
        this.inputABus = inputABus;
        this.inputBBus = inputBBus;
        this.controlSignal = controlSignal;
        this.inputABusMask = inputABusMask;
        this.inputBBusMask = inputBBusMask;
    }

    initDrawFunction(drawFunc) {
        this.draw = drawFunc;
    }

    getOutBus() {
        return this.outBus;
    }

    printContents() {
        console.log(this);
    }

}