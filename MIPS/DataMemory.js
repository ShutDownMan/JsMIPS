class DataMemory {

    constructor(component = '') {
        this.addressBus = undefined;
        this.writeDataBus = undefined;
        this.writeMemControlBus = undefined;
        this.readMemControlBus = undefined;
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

    risingEdge() { }

    fallingEdge() {
        if (this.writeMemControlBus.getValue())
            this.memcpy([this.writeDataBus.getValue()], 0,
                this.memory, this.addressBus.getValue(), 4);
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

    passiveUpdate() {
        if (this.readMemControlBus.getValue())
            this.readDataBus.setValue(this.memory[this.addressBus.getValue()]);
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