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
    let mask = 0;

    mask = (bus_element.attr('data-bus_mask')) ? parseInt(bus_element.attr('data-bus_mask')) : ALL_SET;

    return getHexValue(value, mask);
}

function getHexValue(value, mask = ALL_SET) {
    let digits = 8, rightmostSetBit = 0, leftmostSetBit = 0;

    rightmostSetBit = Math.ceil(Math.log2((mask & -mask) + 1)) - 1;
    leftmostSetBit = Math.floor(Math.log2(mask));
    digits = Math.ceil((rightmostSetBit - leftmostSetBit) / 4) - 1;
    // console.log(digits)

    return '0x' + ("000000000000000" + ((value & mask) >>> rightmostSetBit).toString(16)).substr(digits).toUpperCase();
}

function lightupBusLabel(component, value, bus_label = '*', default_color = '#000000', highlight_color = '#ffffff') {
    let i = 1;
    while (lightupSequence(component, value, bus_label, String(i++), default_color, highlight_color).length != 0)
        ;
    // let lightupInterval = setInterval(() => {
    //     if (lightupSequence(component, value, bus_label, String(i++), default_color, highlight_color).length == 0)
    //         clearInterval(lightupInterval);
    // }, 1000);
}

function lightupSequence(component, value, bus_label = '*', seq_order = '*', default_color = '#000000', highlight_color = '#ffffff') {
    let search_component = `[data-component='${component}']`;
    let search_bus_label = (bus_label !== '*') ? `[data-part_label='${bus_label}']` : '';
    let search_seq_order = (seq_order !== '*') ? `[data-seq_order='${seq_order}']` : '';

    foundElems = s.selectAll(`*${search_component}${search_bus_label}${search_seq_order}`);
    // console.log(`*${search_component}${search_bus_label}${search_seq_order}`);

    foundElems.forEach(function (elem) {
        let color = (parseInt(getBusHexValue(elem, value)) === 0) ? default_color : highlight_color;

        if (elem.type === "path") {
            if (elem.attr('data-type') == 'end') {
                elem.node.style.fill = color;
            } else {
                if (color === highlight_color) {
                    elem.node.style.strokeDasharray = elem.getTotalLength();
                    elem.node.style.strokeDashoffset = elem.getTotalLength();
                    elem.node.style.animation = "drawline 1s linear forwards";
                    elem.node.style.webkitAnimationPlayState = "running";
                    elem.node.addEventListener('animationend', () => {
                        elem.node.style.strokeDasharray = 0;
                        elem.node.style.strokeDashoffset = 0;
                        elem.node.style.animation = "";
                    });
                } else {
                    // elem.node.style.webkitAnimationPlayState = "paused";
                }
                elem.node.style.stroke = color;
            }
        }
        if (elem.type === "rect") {
            elem.node.style.fill = color;
        }
        if (elem.type === "text") {
            elem.children().forEach(function (child) {
                elem.node.style.fill = color;
            });
        }
    });

    return foundElems;
}

function setBusHoverValue(component, value = 0, bus_label = '*', seq_order = '*') {
    let hexValue = '';
    let search_component = `[data-component='${component}']`;
    let search_bus_label = (bus_label !== '*') ? `[data-part_label='${bus_label}']` : '';
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
    search_bus_label = (bus_label !== '*') ? `[data-part_label='${bus_label}']` : '';
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

function setLabelText(component, part_label, value) {
    search_component = `[data-component='${component}']`;
    search_part_label = (part_label !== '*') ? `[data-part_label='${part_label}']` : '';

    foundElems = s.selectAll(`*${search_component}${search_part_label}`);
    foundElems.forEach(function (element) {
        element.attr('text', value);
    });
}

function drawMemoryLabel(component, part_label, values) {
    let idx;
    let currentColor = '';

    search_component = `[data-component='${component}']`;
    search_part_label = (part_label !== '*') ? `[data-part_label='${part_label}']` : '';

    foundElems = s.selectAll(`*${search_component}${search_part_label}`);
    foundElems.forEach(function (element) {
        idx = 0;
        element.children().forEach(function (tspanLine) {
            if (!tspanLine || tspanLine.type !== 'tspan')
                return;

            // console.log('tspanLine');
            // console.log(tspanLine);

            tspanLine.children().forEach(function (hexBlock) {
                if (!hexBlock || hexBlock.type !== 'tspan')
                    return;

                let i = parseInt(idx / 4), j = idx % 4;

                // console.log('hexBlock');
                // console.log(hexBlock);

                let red = parseInt(values[i][j], 16);
                let green = (139 - parseInt(values[i][j], 16) * 30 >= 0) ? 139 - parseInt(values[i][j], 16) * 30 : '00';
                let blue = (126 - parseInt(values[i][j], 16) * 30 >= 0) ? 126 - parseInt(values[i][j], 16) * 30 : '00';

                // if(parseInt(values[i][j], 16))
                //     console.log(`rgb(${red}, ${green}, ${blue})`);

                hexBlock.node.style.fill = `rgb(${red}, ${green}, ${blue})`;
                hexBlock.node.textContent = values[i][j];

                idx++;
            });

        });
    });

    // for (i = 0; i < 32; ++i) {
    //     for (j = 0; j < values[i].length; ++j) {
    //         currentColor = values[i, j];
    //         currentColor += (parseInt(values[i, j], 16) - 139 >= 0) ? parseInt(values[i, j]) - 139 : 0;
    //         currentColor += (parseInt(values[i, j], 16) - 126 >= 0) ? parseInt(values[i, j]) - 126 : 0;
    //         currentColor += 'ff';

    //     }
    // }

    // for (i = 0; i < splittedValues.length; ++i) {
    //     currentSpan = `<svg:span style="color: ${currentColor};">${splittedValues[i]}${(j % 2) ? ' ' : '\n'}</span>`
    // }

}

function setElementColor(component, part_label, color) {
    search_component = `[data-component='${component}']`;
    search_part_label = (part_label !== '*') ? `[data-part_label='${part_label}']` : '';

    foundElems = s.selectAll(`*${search_component}${search_part_label}`);
    foundElems.forEach(function (element) {

        if (element.type == "path") {
            if (element.attr('data-type') == 'end') {
                element.attr({ "fill": color });
            } else {
                element.attr({ "stroke": color });
            }
        }
        if (element.type == "rect") {
            element.attr({ "fill": color });
        }
        if (element.type == "text") {
            element.children().forEach(function (child) {
                child.attr({ "fill": color });
            });
        }
    });
}

function getRegistersOffsets(component) {
    let readdata1_selector = s.select(`*[data-component=${component}][data-part_label=readdata1_selector]`);
    let readdata2_selector = s.select(`*[data-component=${component}][data-part_label=readdata2_selector]`);

    if (!readdata1_selector || !readdata2_selector)
        return [0, 0, 0, 0]

    let readdata1_selectorBBox = readdata1_selector.getBBox()
    let readdata2_selectorBBox = readdata2_selector.getBBox()

    return [readdata1_selectorBBox.x, readdata1_selectorBBox.y,
    readdata2_selectorBBox.x - readdata1_selectorBBox.x, readdata2_selectorBBox.y - readdata1_selectorBBox.y]
}

function setRegisterSelectorPosition(component, part_label, offsets, value) {
    let selectorElem = s.select(`*[data-component=${component}][data-part_label=${part_label}]`);

    let new_x = offsets[0] + parseInt(value % 2) * offsets[2];
    let new_y = offsets[1] + parseInt(value / 2) * offsets[3];

    // console.log(value);
    // console.log({'x': offsets[0], 'y': offsets[1]});
    // console.log({'x': new_x, 'y': new_y});

    selectorElem.attr({ 'x': new_x, 'y': new_y });
}

function drawInstructionMemoryArea(component, part_label, memory) {
    let memoryAreaElem = s.select(`*[data-component=${component}][data-part_label=${part_label}]`);
    let memoryAreaBBox = memoryAreaElem.getBBox();

    memoryAreaElem.attr({ "fill": "#fff0" });

    let code = `
        START:<br>
        LUI  $1, 1 ; $1 = 1<br>
        LUI  $2, 1 ; $2 = 1<br>
        ADD $3, $2, $1<br>
        AND $2, 0<br>
        ADD $2, $1<br>
        AND $1, 0<br>
        ADD $1, $3<br>
        JMP   START<br>
        ; lui $16, 1<br>
        ; lui $17, 0<br>
        ; lui $18, 3<br>
        ; add $17,$17,$16<br>
        ; bne $18,$17, -2<br>
        ; jump 8<br>
        ; add $17,$16,$17<br>
        ; sub $11,$16,$16<br>
        ; add $17,$18,$17<br>
    `

    let insertedObject = `<code id="instruction_code_area" contenteditable="true" class="mipsasm memory_text" align="left" contenteditable="false" spellcheck="false" style="
    overflow-y: scroll;
    resize: none;
    outline: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-family: 'DejaVu Sans Mono', monospace;
    font-size: 5px;" >${code}</code>`;
    let fobjectSVG = `<foreignObject id="foreignMemory" width="${memoryAreaBBox.width}" height="${memoryAreaBBox.height}" x="${memoryAreaBBox.x}" y="${memoryAreaBBox.y}">${insertedObject}</foreignObject>`;

    let p = Snap.parse(fobjectSVG);

    let g = memoryAreaElem.after(p);

    document.querySelectorAll('#instruction_code_area').forEach(block => {
        // block.addEventListener('input', () => {hljs.highlightBlock(block);})
        hljs.highlightBlock(block);
        console.log(block)
    });
}