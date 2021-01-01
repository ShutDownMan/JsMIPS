

class InstructionMemory {

	constructor(component = '') {
		this.readAddressBus = undefined;
		this.readAddressValue = 0;
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

	readInput() {
		this.readAddressValue = this.readAddressBus.getValue();
	}

	edgeTrigger() {
		this.readInput();
	}

	passiveUpdate() {
		this.readInput();

		this.instructionBus.setValue(this.memory[this.readAddressValue / 4]);
	}

	getInstructionBus() {
		return this.instructionBus;
	}

	printContents() {
		console.log(this)
	}


}