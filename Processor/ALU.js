const AND = 0;
const OR = 1;
const SUM = 2;
const SUB = 6;
const LST = 7;
const NOR = 12;

class ALU {

    constructor() {
        this.inputABus = undefined;
        this.inputBBus = undefined;
        this.controlBus = undefined;

        this.outBus = new Bus();
        this.zeroBus = new Bus();
    }

    initialize(inputABusRef, inputBBusRef, aluControlBus, aluControlBusMask) {
        this.inputABus = inputABusRef;
        this.inputBBus = inputBBusRef;
        this.controlBus = aluControlBus;
        this.controlBusMask = aluControlBusMask;
    }

    passiveUpdate() {
        let res = 0;
        let aValue = this.inputABus.getValue();
        let bValue = this.inputBBus.getValue();

        switch (this.controlBus.getValue(this.aluControlBusMask)) {
            case AND:
                console.log("A & B");
                res = aValue & bValue;
                break;
            case OR:
                console.log("A | B");
                res = aValue | bValue;
                break;
            case SUM:
                console.log("A + B");
                res = aValue + bValue;
                break;
            case SUB:
                console.log("A - B");
                res = aValue - bValue;
                break;
            case LST:
                console.log("A < B");
                res = (aValue < bValue);
                break;
            case NOR:
                console.log("!(A | B)");
                res = ~(aValue | bValue);
                break;
        }

        this.zeroBus.setValue(res === 0);

        this.outBus.setValue(res);
    }

    getOutBus() {
        return this.outBus;
    }

    getZeroBus() {
        return this.zeroBus;
    }

    printContents() {
        console.log(this);
    }
}