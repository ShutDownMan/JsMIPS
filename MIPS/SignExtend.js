class SignExtend {

    constructor(component = '') {
        this.inBus = undefined;

        this.outBus = new Bus(component, 'out');
    }

    draw() {
        this.outBus.draw('#ffffff', '#00ff00');
    }

    passiveUpdate() {
        let s = this.inBus.getValue(this.mask);

        s <<= 15;

        this.outBus.setValue(s >> 15);
    }

    initialize(inBus, mask = ALL_SET) {
        this.inBus = inBus;
        this.mask = mask;
    }

    getOutBus() {
        return this.outBus;
    }

    printContents() {
        console.log(this);
    }

}