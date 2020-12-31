

class InstructionMemory {

	constructor(component = '') {
		this.readAddressBus = undefined;
		this.memory = undefined;

		this.instructionBus = new Bus(component, 'out');
	}

	initialize(memory, readAddressBus) {
		this.memory = memory;
		this.readAddressBus = readAddressBus;
	}

	draw() {
		this.instructionBus.draw('#ffffff', '#00ff00');
	}

	risingEdge() { }

	fallingEdge() { }

	passiveUpdate() {
		this.instructionBus.setValue(this.memory[this.readAddressBus.getValue() / 4]);
	}

	getInstructionBus() {
		return this.instructionBus;
	}

	printContents() {
		console.log(this)
	}


}