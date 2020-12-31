class Bus {
	constructor(component = '', bus_label = '', value = 0) {
		this.component = component;
		this.bus_label = bus_label;
		this.value = value;
	}

	static maskValue(value, mask) {
		/// Find first set bit of mask
		let fistSetBit = Math.ceil(Math.log2((mask & -mask) + 1)) - 1;

		return (value & mask) >>> fistSetBit;
	}

	getHexValue(mask = ALL_SET) {
		let digits = 8, rightmostSetBit = 0, leftmostSetBit = 0;

		// console.log(bus_element.attr('inkscape:label') + ' - ' + this.value);
		rightmostSetBit = Math.ceil(Math.log2((mask & -mask) + 1)) - 1;
		leftmostSetBit = Math.floor(Math.log2(mask));
		digits = Math.ceil((rightmostSetBit - leftmostSetBit) / 4) - 1;
		// console.log(digits)

		return '0x' + ("000000000000000" + ((this.value & mask) >>> rightmostSetBit).toString(16)).substr(digits).toUpperCase();
	}

	draw(default_color = '#ffffff', highlight_color = '#000000') {
		lightupBusLabel(this.component, this.value, this.bus_label, default_color, highlight_color);
		setBusHoverValue(this.component, this.value, this.bus_label);
	}

	setValue(value) {
		this.value = value;
	}

	getValue(mask = ALL_SET) {

		if (mask === ALL_SET) {
			return this.value;
		}

		return Bus.maskValue(this.value, mask);
	}

}