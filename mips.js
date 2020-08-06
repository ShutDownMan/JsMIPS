console.log("MIPS running...");

const ALL_SET = 0xFFFFFFFF;

const mainCanvas = document.getElementById('main_canvas');
const instructionArea = document.getElementById('instruction_area');
const ctx = mainCanvas.getContext("2d");

ctx.fillStyle = 'rgb(75,137,4)';
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

const pz = panzoom(mainCanvas, {
    maxZoom: 4,
    minZoom: 0.9,
    bounds: true
})

const processor = new Processor();
const instructionMemoryBuffer = getInstructions(instructionArea.value);

console.log(instructionMemoryBuffer);

processor.initialize(instructionMemoryBuffer);

processor.clock();









function getInstructions(instructionsStr) {
    let i = 0;
    let instructionMemory = new Array(256).fill(0);

    console.log("Instructions:");
    instructionsStr.split('\n').forEach((line) => {
        instructionMemory[i] = getNumberFromInstruction(line);
        console.log("Instruction " + instructionMemory[i]);
        i++;
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

function clock() {
    processor.clock();
}