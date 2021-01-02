class Registers {

    constructor(component = '') {
        this.component = component;

        this.readRegister1Bus = undefined;
        this.readRegister2Bus = undefined;
        this.writeDataBus = undefined;
        this.writeRegisterBus = undefined;
        this.writeControlBus = undefined;

        this.readRegister1Value = 0;
        this.readRegister2Value = 0;
        this.writeDataValue = 0;
        this.writeRegisterValue = 0;
        this.writeControlValue = 0;

        this.memory = new Array(32).fill(0);

        this.readData1Bus = new Bus(component, 'readdata1');
        this.readData2Bus = new Bus(component, 'readdata2');
    }

    draw() {
        setLabelText(this.component, 'readaddr_1_label', getHexValue(this.readRegister1Bus.getValue(), this.readRegister1BusMask));
        setLabelText(this.component, 'readaddr_2_label', getHexValue(this.readRegister2Bus.getValue(), this.readRegister2BusMask));

        this.readData1Bus.draw('#ffffff', '#00ff00');
        this.readData2Bus.draw('#ffffff', '#00ff00');
    }

    readInput() {
        this.readRegister1Value = this.readRegister1Bus.getValue(this.readRegister1BusMask);
        this.readRegister2Value = this.readRegister2Bus.getValue(this.readRegister2BusMask);
        this.writeRegisterValue = this.writeRegisterBus.getValue();
        this.writeDataValue = this.writeDataBus.getValue();
        this.writeControlValue = this.writeControlBus.getValue();
    }

    edgeTrigger() {
		this.readInput();

        if (this.writeControlValue) {
            this.memory[this.writeRegisterValue] = this.writeDataValue;
        }

    }

    passiveUpdate() {
		this.readInput();

        this.readData1Bus.setValue(
            this.memory[this.readRegister1Value]);
        this.readData2Bus.setValue(
            this.memory[this.readRegister2Value]);
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