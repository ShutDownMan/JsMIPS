

class PCRegister {
	constructor(component = '') {
		this.component = component;

		this.inBus = undefined;
		this.pcValue = 0;

		this.outBus = new Bus(component, 'out');
	}

	initialize(inBus) {
		this.inBus = inBus;
	}

	draw() {
		// draw pcreg label value
		setLabelText(this.component, 'value', this.getHexValue());
		// setLabelText(this.component, 'value', 'test');

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

	getHexValue(mask = ALL_SET) {
		let digits = 8, rightmostSetBit = 0, leftmostSetBit = 0;

		// console.log(bus_element.attr('inkscape:label') + ' - ' + this.value);
		rightmostSetBit = Math.ceil(Math.log2((mask & -mask) + 1)) - 1;
		leftmostSetBit = Math.floor(Math.log2(mask));
		digits = Math.ceil((rightmostSetBit - leftmostSetBit) / 4) - 1;
		// console.log(digits)

		return '0x' + ("000000000000000" + ((this.pcValue & mask) >>> rightmostSetBit).toString(16)).substr(digits).toUpperCase();
	}

	printContents() {
		console.log(this);
	}
}