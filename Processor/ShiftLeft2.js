
class ShiftLeft2 {

    constructor() {
        this.inBus = undefined;
        this.outBus = new Bus();
    }

    passiveUpdate() {
        this.outBus.setValue(this.inBus.getValue() << 2);
    }

    initialize(inBusRef) {
        this.inBus = inBusRef;
    }

    getOutBus() {
        return this.outBus;
    }

    printContents() {
        console.log(this);

    }
}