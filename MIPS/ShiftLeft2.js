
class ShiftLeft2 {

    constructor(component = '') {
        this.inBus = undefined;

        this.outBus = new Bus(component, 'out');
    }

    draw() {
        this.outBus.draw('#ffffff', '#00ff00');
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