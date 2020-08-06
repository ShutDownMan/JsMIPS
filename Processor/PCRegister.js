

class PCRegister {
	constructor() {
		this.inBus = undefined;

		this.outBus = new Bus();
	}

	initialize(inBus) {
		this.inBus = inBus;
	}

	initDrawFunction(drawFunc) {
		this.draw = drawFunc;
	}

	updateState() {
		this.outBus.setValue(this.inBus.getValue());
	}

	passiveUpdate() {
		return;
	}

	getOutBus() {
		return this.outBus;
	}

	printContents() {
		console.log(this);
	}
}