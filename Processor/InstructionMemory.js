

class InstructionMemory {

	constructor() {
		this.readAddressBus = undefined;
		this.memory = undefined;

		this.instructionBus = new Bus();
	}

	initialize(memory, readAddressBus) {
		this.memory = memory;
		this.readAddressBus = readAddressBus;
	}

	initDrawFunction(drawFunc) {
		this.draw = drawFunc;
	}

	passiveUpdate() {
		this.instructionBus.setValue(this.memory[this.readAddressBus.getValue()/4]);
	}

	getInstructionBus() {
		return this.instructionBus;
	}

	printContents() {
		console.log(this)
	}


}