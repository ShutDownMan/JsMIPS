class Bus {
	constructor(value = 0) {
		this.value = value;
	}

	initDrawFunction(drawFunc) {
		this.draw = drawFunc;
	}

	setValue(value) {
		this.value = value;
	}

	getValue(mask=ALL_SET) {

		if(mask === ALL_SET) {
			return this.value;
		}

		/// Find first set bit of mask
		let fistSetBit = Math.ceil(Math.log2((mask & -mask) + 1)) - 1;

		return (this.value & mask) >>> fistSetBit;
	}

}