

class PCRegister {
	constructor(component = '') {
		this.inBus = undefined;

		this.outBus = new Bus(component, 'out');
	}

	initialize(inBus) {
		this.inBus = inBus;
	}

	draw() {
		this.outBus.draw('#ffffff', '#00ff00');
	}

	risingEdge() {
		this.outBus.setValue(this.inBus.getValue());
	}

	fallingEdge() {
		this.outBus.setValue(this.inBus.getValue());
	}

	passiveUpdate() { }

	getOutBus() {
		return this.outBus;
	}

	printContents() {
		console.log(this);
	}
}