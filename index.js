console.log("MIPS running...");

const ALL_SET = 0xFFFFFFFF;

const mainCanvas = document.getElementById('main_canvas');
const instructionArea = document.getElementById('instruction_area');
// const ctx = mainCanvas.getContext("2d");

// ctx.fillStyle = 'rgb(75,137,4)';
// ctx.fillStyle = 'black';
// ctx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

var s = Snap("#main_canvas");
Snap.load("SVG_monocycle.svg", function (loadedFragment) {
    s.append(loadedFragment);
    process_svg_labels();
    // mainCanvas.onmousedown = function (e) {
    //     if (e.button !== 1) e.stopImmediatePropagation();
    // }

    var panZoomTiger = svgPanZoom(mainCanvas, {
        zoomEnabled: true,
        controlIconsEnabled: true,
        contain: true,
        center: true,
        minZoom: 0.9
    });
});

function process_svg_labels() {
    elem_list = s.selectAll('*');
    // console.log(elem_list);
    elem_list.forEach(function (elem) {
        elem_label = elem.attr('inkscape:label');
        // console.log(elem_label);

        if (elem_label != null) {
            splitted_label = elem_label.split('-')


            elem.attr({ "data-component": splitted_label[0] });
            if (splitted_label.length >= 2)
                elem.attr({ "data-part_label": splitted_label[1] });

            if (splitted_label.length >= 3) {
                seq_order = splitted_label[2].match(/\d+/)
                if (seq_order != null) {
                    elem.attr({ "data-seq_order": seq_order });
                    // console.log(elem_label);
                }
            }

            if (splitted_label.length >= 4) {
                elem.attr({ "data-type": splitted_label[3] });
            } else {
                elem.attr({ "data-type": "path" });
            }

            // console.log(elem.attr())
        }
    });
}

// const pz = panzoom(mainCanvas, {
//     maxZoom: 4,
//     minZoom: 0.9,
//     bounds: true
// })

const mips = new MIPS();
const instructionMemoryBuffer = getInstructions(instructionArea.value);

console.log(instructionMemoryBuffer);

mips.initialize(instructionMemoryBuffer);

// mips.edgeTrigger();

function getInstructions(instructionsStr) {
    let i = 0;
    let instructionMemory = new Array(256).fill(0);

    console.log("Instructions:");
    instructionsStr.split('\n').forEach((line) => {
        if (line.length > 0) {
            instructionMemory[i] = getNumberFromInstruction(line);
            console.log("Instruction " + instructionMemory[i]);
            i++;
        }
    });

    console.log("------------------------------------------------");

    return instructionMemory;
}

function getNumberFromInstruction(str) {
    let res = 0,
        aux = 1;
    let i;

    for (i = 31; i >= 0; --i, aux <<= 1) {
        res |= (str[i] - '0') ? aux : 0;
    }

    return res;
}

function edgeTrigger() {
    mips.edgeTrigger();

    // lightupBusLabel('instmem', 'out');

    // s.selectAll("[data-component='ctrl'], [data-component='aluctrl'], [data-component='branchctrl']").forEach(function (elem) {
    //     elem.attr({ "opacity": "0" });
    // })
}
