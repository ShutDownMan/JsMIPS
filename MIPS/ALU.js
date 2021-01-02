const AND = 0;
const OR = 1;
const SUM = 2;
const SUB = 6;
const LST = 7;
const NOR = 12;

class ALU {

    constructor(component = '') {
        this.component = component;
        this.currentOperationType = undefined;

        this.inputABus = undefined;
        this.inputBBus = undefined;
        this.controlBus = undefined;

        this.outBus = new Bus(component, 'out');
        this.zeroBus = new Bus(component, 'zero');
    }

    initialize(inputABusRef, inputBBusRef, aluControlBus, aluControlBusMask) {
        this.inputABus = inputABusRef;
        this.inputBBus = inputBBusRef;
        this.controlBus = aluControlBus;
        this.controlBusMask = aluControlBusMask;
    }

    draw() {
        setLabelText(this.component, 'op_type_label', this.currentOperationType);

        this.outBus.draw('#ffffff', '#00ff00');
        this.zeroBus.draw('#95ffffff', '#0084ffff');
    }

    passiveUpdate() {
        let res = 0;
        let aValue = this.inputABus.getValue();
        let bValue = this.inputBBus.getValue();

        // console.log(this.controlBus.getHexValue());

        switch (this.controlBus.getValue(this.controlBusMask)) {
            case AND:
                console.log("A & B");
                this.currentOperationType = 'A & B';
                res = aValue & bValue;
                break;
            case OR:
                console.log("A | B");
                this.currentOperationType = 'A | B';
                res = aValue | bValue;
                break;
            case SUM:
                console.log("A + B");
                this.currentOperationType = 'A + B';
                res = aValue + bValue;
                break;
            case SUB:
                console.log("A - B");
                this.currentOperationType = 'A - B';
                res = aValue - bValue;
                break;
            case LST:
                console.log("A < B");
                this.currentOperationType = 'A < B';
                res = (aValue < bValue);
                break;
            case NOR:
                console.log("!(A | B)");
                this.currentOperationType = '!(A | B)';
                res = ~(aValue | bValue);
                break;
        }

        this.zeroBus.setValue((res === 0) ? 1 : 0);

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