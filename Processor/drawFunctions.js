function drawPCRegister(ctx) {

    ctx.save();

    ctx.font = "bold 15px Arial";
    ctx.textAlign = "center";
    // ctx.fillStyle = 'rgb(25,255,12)';
    ctx.fillStyle = 'rgb(25,135,12)';
    ctx.strokeStyle = 'rgb(25,135,12)';
    ctx.lineWidth = 3;

    ctx.translate(100, 400);

    ctx.fillText("PC", 0, -10);
    ctx.fillText("Register", 0, 5);

    ctx.strokeRect(-35, -30, 70, 50);

    ctx.restore();

    // Set line width
    // ctx.lineWidth = 10;

    // Wall
    // ctx.strokeStyle = 'black';
    // ctx.strokeRect(75, 140, 150, 110);

    // Door
    // ctx.fillStyle = 'black';
    // ctx.fillRect(130, 190, 40, 60);

    // Roof
    // ctx.beginPath();
    // ctx.moveTo(50, 140);
    // ctx.lineTo(150, 60);
    // ctx.lineTo(250, 140);
    // ctx.closePath();
    // ctx.stroke();
}

function drawNum4Const(ctx) {
    ctx.save();

    ctx.font = "bold 15px Arial";
    ctx.textAlign = "center";
    // ctx.fillStyle = 'rgb(25,255,12)';
    ctx.fillStyle = 'rgb(25,135,12)';
    ctx.strokeStyle = 'rgb(25,135,12)';
    ctx.lineWidth = 3;
    ctx.translate(150, 80);

    ctx.fillText("4", 0, 0);

    ctx.restore();
}

function drawAdder1() {
    ctx.save();

    ctx.font = "bold 15px Arial";
    ctx.textAlign = "center";
    // ctx.fillStyle = 'rgb(25,255,12)';
    ctx.fillStyle = 'rgb(25,135,12)';
    ctx.strokeStyle = 'rgb(25,135,12)';
    ctx.lineWidth = 3;
    ctx.translate(250, 100);

    ctx.fillText("Add", 0, 0);

    ctx.strokeRect(-35, -40, 70, 70);

    ctx.restore();
}

function drawInstructionMemory(ctx) {
    ctx.save();

    ctx.font = "bold 15px Arial";
    ctx.textAlign = "center";
    // ctx.fillStyle = 'rgb(25,255,12)';
    ctx.fillStyle = 'rgb(25,135,12)';
    ctx.strokeStyle = 'rgb(25,135,12)';
    ctx.lineWidth = 3;
    ctx.translate(350, 400);

    ctx.fillText("Instruction Memory", 0, 0);

    ctx.strokeRect(-80, -55, 160, 100);

    ctx.restore();
}

function drawRegDstMux(ctx) {
    ctx.save();

    ctx.font = "bold 15px Arial";
    ctx.textAlign = "center";
    // ctx.fillStyle = 'rgb(25,255,12)';
    ctx.fillStyle = 'rgb(25,135,12)';
    ctx.strokeStyle = 'rgb(25,135,12)';
    ctx.lineWidth = 3;
    ctx.translate(570, 430);

    verticalDraw(() => {
        ctx.textAlign = "center";
        ctx.fillText("mux", 0, 0);
    });

    ctx.strokeRect(-25, -65, 25, 65);

    ctx.restore();
}

function verticalDraw(drawFunc) {
    ctx.save();
    ctx.rotate(-Math.PI/2);
    drawFunc();
    ctx.restore();
}