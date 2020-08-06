

class BranchController {

    constructor() {
        this.branchSignalBus = undefined;
        this.zeroSignalBus = undefined;

        this.outBus = new Bus();
    }

    initialize(branchSignalBus, zeroSignalBus, branchSignalBusMask) {
        this.branchSignalBus = branchSignalBus;
        this.zeroSignalBus = zeroSignalBus;
        this.branchSignalBusMask = branchSignalBusMask;
    }

    getOutBus() {
        return this.outBus;
    }

    passiveUpdate() {
        this.outBus.setValue(0);

        switch (this.branchSignalBus.getValue(this.branchSignalBusMask)) {
            case 1:
                if(this.branchSignalBus.getValue(this.branchSignalBusMask) && this.zeroSignalBus.getValue())
                    this.outBus.setValue(1);
                break;

            case 2:
                if(this.branchSignalBus.getValue(this.branchSignalBusMask) && !this.zeroSignalBus.getValue())
                    this.outBus.setValue(1);
                break;

            default:
                break;
        }
    }

    printContents() {
        console.log(this);
    }

}