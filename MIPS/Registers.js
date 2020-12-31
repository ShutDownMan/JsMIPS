class Registers {

    constructor(component = '') {
        this.readRegister1Bus = undefined;
        this.readRegister2Bus = undefined;
        this.writeDataBus = undefined;
        this.writeRegisterBus = undefined;
        this.writeControlBus = undefined;
        this.memory = new Array(32).fill(0);

        this.readData1Bus = new Bus(component, 'readdata1');
        this.readData2Bus = new Bus(component, 'readdata2');
    }

    draw() {
        this.readData1Bus.draw('#ffffff', '#00ff00');
        this.readData2Bus.draw('#ffffff', '#00ff00');
    }

    risingEdge() { }

    fallingEdge() {
        if (this.writeControlBus.getValue()) {
            this.memory[this.writeRegisterBus.getValue()] = this.writeDataBus.getValue();
        }
    }

    passiveUpdate() {
        this.readData1Bus.setValue(
            this.memory[this.readRegister1Bus.getValue(this.readRegister1BusMask)]);
        this.readData2Bus.setValue(
            this.memory[this.readRegister2Bus.getValue(this.readRegister2BusMask)]);
    }

    initialize(readRegister1Bus,
        readRegister2Bus,
        writeRegisterBus,
        writeDataBus,
        writeControlBus,
        readRegister1BusMask = ALL_SET,
        readRegister2BusMask = ALL_SET) {

        this.readRegister1Bus = readRegister1Bus;
        this.readRegister2Bus = readRegister2Bus;
        this.writeRegisterBus = writeRegisterBus;
        this.writeDataBus = writeDataBus;
        this.writeControlBus = writeControlBus;
        this.readRegister1BusMask = readRegister1BusMask;
        this.readRegister2BusMask = readRegister2BusMask;
    }

    getReadData1Bus() {
        return this.readData1Bus;
    }

    getReadData2Bus() {
        return this.readData2Bus;
    }

    getMemory() {
        return this.memory;
    }

    printContents() {
        console.log(this);
    }

}