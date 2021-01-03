class Registers {

    constructor(component = '') {
        this.component = component;
        this.registersMemOffsets = [0, 0, 0, 0]; // x, y, dx, dy

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

        this.registersMemOffsets = getRegistersOffsets(this.component);
        // console.log(this.registersMemOffsets);
    }

    draw() {
        setLabelText(this.component, 'readaddr_1_label', getHexValue(this.readRegister1Bus.getValue(), this.readRegister1BusMask));
        setLabelText(this.component, 'readaddr_2_label', getHexValue(this.readRegister2Bus.getValue(), this.readRegister2BusMask));

        setLabelText(this.component, 'writedataregister_label', getHexValue(this.writeRegisterBus.getValue(), '0xFF'));
        setLabelText(this.component, 'writedata_label', getHexValue(this.writeDataBus.getValue()));

        this.drawMemory();

        setRegisterSelectorPosition(this.component, 'writeregister_selector', this.registersMemOffsets, this.writeRegisterValue);
        setRegisterSelectorPosition(this.component, 'readdata1_selector', this.registersMemOffsets, this.readRegister1Value);
        setRegisterSelectorPosition(this.component, 'readdata2_selector', this.registersMemOffsets, this.readRegister2Value);

        this.readData1Bus.draw('#ffffff', '#00ff00');
        this.readData2Bus.draw('#ffffff', '#00ff00');
    }

    drawMemory() {
        let resultMat = [];
        let i, hexValue;
        let splittedValues;

        for (i = 0; i < 32; ++i) {

            if(this.memory[i] >= 0) {
                hexValue = ("000000000000000" + this.memory[i].toString(16)).substr(-8).toUpperCase();
            } else {
                hexValue = ("000000000000000" + (ALL_SET + 1 + this.memory[i]).toString(16)).substr(-8).toUpperCase();
            }
            splittedValues = hexValue.match(/../g);
            // if(this.memory[i])
            //     console.log(splittedValues);

            resultMat.push(splittedValues);
        }
        // console.log(resultMat)

        drawMemoryLabel(this.component, 'memory_label', resultMat);
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