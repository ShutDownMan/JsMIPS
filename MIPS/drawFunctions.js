function drawPCRegister(ctx) {
}

function drawNum4Const(ctx) {
}

function drawAdder1() {
}

function drawInstructionMemory(ctx) {
}

function drawRegDstMux(ctx) {
}

function verticalDraw(drawFunc) {
    ctx.save();
    ctx.rotate(-Math.PI / 2);
    drawFunc();
    ctx.restore();
}

function getBusHexValue(bus_element, value) {
    let mask = 0, digits = 8, rightmostSetBit = 0, leftmostSetBit = 0;

    mask = (bus_element.attr('data-bus_mask')) ? parseInt(bus_element.attr('data-bus_mask')) : ALL_SET;
    // console.log(bus_element.attr('inkscape:label') + ' - ' + value);
    rightmostSetBit = Math.ceil(Math.log2((mask & -mask) + 1)) - 1;
    leftmostSetBit = Math.floor(Math.log2(mask));
    digits = Math.ceil((rightmostSetBit - leftmostSetBit) / 4) - 1;
    // console.log(digits)

    return '0x' + ("000000000000000" + ((value & mask) >>> rightmostSetBit).toString(16)).substr(digits).toUpperCase();
}

function lightupBusLabel(component, value, bus_label = '*', default_color = '#000000', highlight_color = '#ffffff') {
    let i = 1;
    let lightupInterval = setInterval(() => {
        if (lightupSequence(component, value, bus_label, String(i++), default_color, highlight_color).length == 0)
            clearInterval(lightupInterval);
    }, 10);
}

function lightupSequence(component, value, bus_label = '*', seq_order = '*', default_color = '#000000', highlight_color = '#ffffff') {
    let search_component = `[data-component='${component}']`;
    let search_bus_label = (bus_label !== '*') ? `[data-bus_label='${bus_label}']` : '';
    let search_seq_order = (seq_order !== '*') ? `[data-seq_order='${seq_order}']` : '';

    foundElems = s.selectAll(`*${search_component}${search_bus_label}${search_seq_order}`);
    // console.log(`*${search_component}${search_bus_label}${search_seq_order}`);

    foundElems.forEach(function (elem) {
        let color = (parseInt(getBusHexValue(elem, value)) === 0) ? default_color : highlight_color;
        
        if (elem.type == "path") {
            if (elem.attr('data-type') == 'end') {
                elem.attr({ "fill": color });
            } else {
                elem.attr({ "stroke": color });
            }
        }
        if (elem.type == "rect") {
            elem.attr({ "fill": color });
        }
        if (elem.type == "text") {
            elem.children().forEach(function (child) {
                child.attr({ "fill": color });
            });
        }
    });

    return foundElems;
}

function setBusHoverValue(component, value = 0, bus_label = '*', seq_order = '*') {
    let hexValue = '';
    let search_component = `[data-component='${component}']`;
    let search_bus_label = (bus_label !== '*') ? `[data-bus_label='${bus_label}']` : '';
    let search_seq_order = (seq_order !== '*') ? `[data-seq_order='${seq_order}']` : '';

    foundElems = s.selectAll(`*${search_component}${search_bus_label}${search_seq_order}`);
    foundElems.forEach(function (element) {
        // console.log(element.attr('data-bus_mask'));

        hexValue = getBusHexValue(element, value);

        title = element.select(`title`);
        if (!title) {
            element.append(Snap.parse(`<title>${hexValue}</title>`))
        } else {
            // console.log(title)
            title.innerText(hexValue);
        }
    });
}

function setHoverValue(component, value = 0, bus_label = '*', seq_order = '*') {
    search_component = `[data-component='${component}']`;
    search_bus_label = (bus_label !== '*') ? `[data-bus_label='${bus_label}']` : '';
    search_seq_order = (seq_order !== '*') ? `[data-seq_order='${seq_order}']` : '';

    foundElems = s.selectAll(`*${search_component}${search_bus_label}${search_seq_order}`);
    foundElems.forEach(function (element) {

        title = element.select(`title`);
        if (!title) {
            element.append(Snap.parse(`<title>${value}</title>`))
        } else {
            // console.log(title)
            title.innerText(value);
        }
    });

}

Snap.plugin(function (Snap, Element, Paper, global) {
    Element.prototype.innerText = function (text) {
        return text ? this.node.firstChild.textContent = text : this.node.firstChild.textContent;
    };
});