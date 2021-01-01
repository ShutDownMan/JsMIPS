class DataMemory {

    constructor(component = '') {
        this.addressBus = undefined;
        this.writeDataBus = undefined;
        this.writeMemControlBus = undefined;
        this.readMemControlBus = undefined;

        this.addressValue = 0;
        this.writeDataValue = 0;
        this.writeMemControlValue = 0;
        this.readMemControlValue = 0;

        this.memory = new Array(256).fill(0);

        this.readDataBus = new Bus(component, 'readdata');
    }

    initialize(addressBus, writeData, writeMemControlBus,
        readMemControlBus) {
        this.addressBus = addressBus;
        this.writeDataBus = writeData;
        this.writeMemControlBus = writeMemControlBus;
        this.readMemControlBus = readMemControlBus;
    }

    draw() {
        this.readDataBus.draw('#ffffff', '#00ff00');
    }

    readInput() {
        this.writeMemControlValue = this.writeMemControlBus.getValue();
        this.writeDataValue = this.writeDataBus.getValue();
        this.addressValue = this.addressBus.getValue();
        this.readMemControlValue = this.readMemControlBus.getValue();
    }

    edgeTrigger() {
        this.readInput();
        if (this.writeMemControlValue)
            this.memcpy([this.writeDataValue], 0,
                this.memory, this.addressValue, 4);
    }

    passiveUpdate() {
        this.readInput();

        if (this.readMemControlValue)
            this.readDataBus.setValue(this.memory[this.addressBus.getValue()]);
    }

    fallingEdge() {
    }

    memcpy(src, srcOffset, dst, dstOffset, length) {
        let i;

        src = src.subarray || src.slice ? src : src.buffer;
        dst = dst.subarray || dst.slice ? dst : dst.buffer;

        src = srcOffset ? src.subarray ?
            src.subarray(srcOffset, length && srcOffset + length) :
            src.slice(srcOffset, length && srcOffset + length) : src;

        if (dst.set) {
            dst.set(src, dstOffset);
        } else {
            for (i = 0; i < src.length; i++) {
                dst[i + dstOffset] = src[i];
            }
        }

        return dst;
    }

    getReadDataBus() {
        return this.readDataBus;
    }

    getMemory() {
        return this.memory;
    }

    printContents() {
        console.log(this);
    }

}