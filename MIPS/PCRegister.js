

class PCRegister {
	constructor(component = '') {
		this.inBus = undefined;
		this.pcValue = 0;

		this.outBus = new Bus(component, 'out');
	}

	initialize(inBus) {
		this.inBus = inBus;
	}

	draw() {
		this.outBus.draw('#ffffff', '#00ff00');
	}

	readInput() {
		this.pcValue = this.inBus.getValue();
	}

	edgeTrigger() {
		this.readInput();
	}

	passiveUpdate() {
		this.readInput();

		this.outBus.setValue(this.pcValue);
	}

	getOutBus() {
		return this.outBus;
	}

	printContents() {
		console.log(this);
	}
}