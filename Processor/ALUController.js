const IS_JR_MASK = 0x08;

class ALUController {
    constructor() {
        this.controlBus = undefined;
        this.functBus = undefined;

        this.outBus = new Bus();
        this.BranchJumpSrcBus = new Bus();
    }

    initialize(inBus, controlBus, inBusMask, controlBusMask) {
        this.functBus = inBus;
        this.controlBus = controlBus;
        this.functBusMask = inBusMask;
        this.controlBusMask = controlBusMask;
    }

    passiveUpdate() {
        this.BranchJumpSrcBus.setValue(0);

        let fsignal = this.functBus.getValue(this.functBusMask);
        let result = 0;

        switch (this.controlBus.getValue(this.controlBusMask)) {
            case 0:
                result = 2;
                break;

            case 1:
                result = 6;
                break;

            case 2:
                if(this.functBus.getValue(this.functBusMask) === IS_JR_MASK)
                    this.BranchJumpSrcBus.setValue(1);

                // XXX?
                if (!(fsignal & 0x09)) // F0 e F3
                    result &= ~(1 << 0);
                else
                    result |= 1 << 0;

                // XX?X
                if ((fsignal & 0x04)) // F2
                    result &= ~(1 << 1);
                else
                    result |= 1 << 1;

                // X?XX
                if (!(fsignal & 0x02)) // F1
                    result &= ~(1 << 2);
                else
                    result |= 1 << 2;

                break;
            case 3:
                // XXX?
                if (!(fsignal & 0x09)) // F0 e F3
                    result |= 1 << 0;
                else
                    result &= ~(1 << 0);

                // XX?X
                if ((fsignal & 0x04)) // F2
                    result &= ~(1 << 1);
                else
                    result |= 1 << 1;

                // X1XX
                result |= 1 << 2;

                break;

            default:
                break;
        }

        this.outBus.setValue(result);

    }

    getOutBus() {
        return this.outBus;
    }

    getBranchJumpSrcBus() {
        return this.BranchJumpSrcBus;
    }

    printContents() {
        console.log(this);
    }

}