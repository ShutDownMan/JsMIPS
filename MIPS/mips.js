class MIPS {

    constructor() {
        this.pc = new PCRegister('pcreg');

        this.num4Const = new Bus('4const', 'out');

        this.adder_1 = new Adder('add1');

        this.instructionMemory = new InstructionMemory('instmem');

        this.controller = new Controller('ctrl');

        this.regDstMux = new Multiplexer('regdstmux');

        this.signExtend = new SignExtend('signext');

        this.regDataSrcMux = new Multiplexer('regsrcmux');

        this.registers = new Registers('registers');

        this.aluSrcMux = new Multiplexer('alusrcmux');

        this.branchSrcMux = new Multiplexer('branchsrcmux');

        this.aluController = new ALUController('aluctrl');

        this.shiftLeft2 = new ShiftLeft2('shiftleft2');

        this.adder_2 = new Adder('add2');

        this.alu = new ALU('alu');

        this.branchController = new BranchController('branchctrl');

        this.branchMux = new Multiplexer('branchenmux');

        this.jumpMux = new Multiplexer('jumpsrcmux');

        this.dataMemory = new DataMemory('datamem');

        this.memToRegMux = new Multiplexer('memtoregmux');
    }

    initialize(instructionMemoryBuffer) {
        console.log("Initializing Component: PC Register");
        this.pc.initialize(this.jumpMux.getOutBus());
        // this.pc.initDrawFunction(drawPCRegister);
        // this.pc.initialize(undefined);

        console.log("Initializing Component: Number 4 const");
        this.num4Const.setValue(4);
        // this.num4Const.initDrawFunction(drawNum4Const);

        console.log("Initializing Component: Adder 1");
        this.adder_1.initialize(this.pc.getOutBus(),
            this.num4Const);
        // this.adder_1.initDrawFunction(drawAdder1);

        console.log("Initializing Component: Instruction Memory");
        this.instructionMemory.initialize(instructionMemoryBuffer,
            this.pc.getOutBus());
        // this.instructionMemory.initDrawFunction(drawInstructionMemory);

        console.log("Initializing Component: Controller");
        this.controller.initialize(this.instructionMemory.getInstructionBus(), 0xFC000000);

        console.log("Initializing Component: Sign Extend");
        this.signExtend.initialize(this.instructionMemory.getInstructionBus(), 0x0000FFFF);

        console.log("Initializing Component: Register Destination Multiplexer");
        this.regDstMux.initialize(this.instructionMemory.getInstructionBus(),
            this.instructionMemory.getInstructionBus(),
            this.controller.getRegDstSignal(), 0x001F0000, 0x0000F800);
        // this.regDstMux.initDrawFunction(drawRegDstMux);

        console.log("Initializing Component: Register Data Source Multiplexer");
        this.regDataSrcMux.initialize(this.memToRegMux.getOutBus(),
            this.signExtend.getOutBus(),
            this.controller.getRegDataSrc());

        console.log("Initializing Component: Registers");
        this.registers.initialize(this.instructionMemory.getInstructionBus(),
            this.instructionMemory.getInstructionBus(),
            this.regDstMux.getOutBus(),
            this.regDataSrcMux.getOutBus(),
            this.controller.getRegWriteSignal(), 0x03E00000, 0x001F0000);

        console.log("Initializing Component: Alu Source Multiplexer");
        this.aluSrcMux.initialize(this.registers.getReadData2Bus(),
            this.signExtend.getOutBus(),
            this.controller.getAluSrcSignal());

        console.log("Initializing Component: Alu Controller");
        this.aluController.initialize(this.instructionMemory.getInstructionBus(),
            this.controller.getAluOpSignal(), 0x0000002F, 0x00000003);

        console.log("Initializing Component: Branch Jump Source Multiplexer");
        this.branchSrcMux.initialize(this.signExtend.getOutBus(),
            this.registers.getReadData1Bus(),
            this.aluController.getBranchJumpSrcBus());

        console.log("Initializing Component: Shift Left 2");
        this.shiftLeft2.initialize(this.branchSrcMux.getOutBus());

        console.log("Initializing Component: Adder 2");
        this.adder_2.initialize(this.shiftLeft2.getOutBus(),
            this.adder_1.getOutBus());

        console.log("Initializing Component: ALU");
        this.alu.initialize(this.registers.getReadData1Bus(),
            this.aluSrcMux.getOutBus(),
            this.aluController.getOutBus(), 0x0000000F);

        console.log("Initializing Component: Branch Controller");
        this.branchController.initialize(this.controller.getBranchSignal(),
            this.alu.getZeroBus(), 0x03);

        console.log("Initializing Component: Branch Multiplexer");
        this.branchMux.initialize(this.adder_1.getOutBus(),
            this.adder_2.getOutBus(),
            this.branchController.getOutBus());

        console.log("Initializing Component: Jump Multiplexer");
        this.jumpMux.initialize(this.branchMux.getOutBus(),
            this.shiftLeft2.getOutBus(),
            this.controller.getBranchJumpSignal());

        console.log("Initializing Component: Data Memory");
        this.dataMemory.initialize(this.alu.getOutBus(),
            this.registers.getReadData2Bus(),
            this.controller.getMemWriteSignal(),
            this.controller.getMemReadSignal());

        console.log("Initializing Component: Memory to Register Multiplexer");
        this.memToRegMux.initialize(this.alu.getOutBus(),
            this.dataMemory.getReadDataBus(),
            this.controller.getMemToRegSignal());

    }

    clock() {
        console.log("================================================");
        console.log("Updating Raising Edge Components");
        this.risingEdge();
        console.log("------------------------------------------------");
        console.log("Updating Passive Components");
        this.passiveUpdate();
        console.log("------------------------------------------------");
        console.log("Updating Falling Edge Components");
        this.fallingEdge();
        console.log("------------------------------------------------");

        // this.drawComponents(ctx);

        console.log("Registers");
        this.printRegisters();
        console.log("------------------------------------------------");
        console.log("Memory");
        this.printMemory();
        console.log("------------------------------------------------");
    }

    risingEdge() {
        console.log("Rising Edge: PC Register");
        this.pc.risingEdge();
        this.pc.draw();
        // this.pc.printContents();

        console.log("Rising Edge: Instruction Memory");
        this.instructionMemory.risingEdge();
        this.instructionMemory.draw();

        console.log("Rising Edge: Registers");
        this.registers.risingEdge();
        this.registers.draw();

        console.log("Rising Edge: Data Memory");
        this.dataMemory.risingEdge();
        this.dataMemory.draw();
    }

    fallingEdge() {
        console.log("Falling Edge: PC Register");
        this.pc.fallingEdge();
        this.pc.draw();
        // this.pc.printContents();

        console.log("Falling Edge: Instruction Memory");
        this.instructionMemory.fallingEdge();
        this.instructionMemory.draw();

        console.log("Falling Edge: Registers");
        this.registers.fallingEdge();
        this.registers.draw();

        console.log("Falling Edge: Data Memory");
        this.dataMemory.fallingEdge();
        this.dataMemory.draw();
    }

    passiveUpdate() {
        console.log("Updating Component: PC Register");
        this.pc.passiveUpdate();
        this.pc.draw();
        // this.pc.printContents();

        console.log("Updating Component: Adder 1");
        this.adder_1.passiveUpdate();
        this.adder_1.draw();
        // this.adder_1.printContents();

        console.log("Updating Component: Instruction Memory");
        this.instructionMemory.passiveUpdate();
        this.instructionMemory.draw();
        // this.instructionMemory.printContents();

        console.log("Updating Component: Controller");
        this.controller.passiveUpdate();
        this.controller.draw();
        // this.controller.printContents();

        console.log("Updating Component: Register Destination Multiplexer");
        this.regDstMux.passiveUpdate();
        this.regDstMux.draw();
        // this.regDstMux.printContents();

        console.log("Updating Component: Sign Extend");
        this.signExtend.passiveUpdate();
        this.signExtend.draw();
        // this.signExtend.printContents();

        console.log("Updating Component: Register Data Source Multiplexer");
        this.regDataSrcMux.passiveUpdate();
        this.regDataSrcMux.draw();
        // this.regDataSrcMux.printContents();

        console.log("Updating Component: Registers");
        this.registers.passiveUpdate();
        this.registers.draw();
        // this.registers.printContents();

        console.log("Updating Component: Branch Source Multiplexer");
        this.branchMux.passiveUpdate();
        this.branchMux.draw();
        // this.branchMux.printContents();

        console.log("Updating Component: Shift Left 2");
        this.shiftLeft2.passiveUpdate();
        this.shiftLeft2.draw();
        // this.shiftLeft2.printContents();

        console.log("Updating Component: Branch Jump Source Multiplexer");
        this.branchSrcMux.passiveUpdate();
        this.branchSrcMux.draw();

        console.log("Updating Component: Alu Source Multiplexer");
        this.aluSrcMux.passiveUpdate();
        this.aluSrcMux.draw();
        // this.aluSrcMux.printContents();

        console.log("Updating Component: Alu Controller");
        this.aluController.passiveUpdate();
        this.aluController.draw();
        // this.aluController.printContents();

        console.log("Updating Component: Adder 2");
        this.adder_2.passiveUpdate();
        this.adder_2.draw();
        // this.adder_2.printContents();

        console.log("Updating Component: ALU");
        this.alu.passiveUpdate();
        this.alu.draw();
        this.alu.printContents();

        console.log("Updating Component: Branch Controller");
        this.branchController.passiveUpdate();
        this.branchController.draw();
        this.branchController.printContents();

        console.log("Updating Component: Branch Multiplexer");
        this.branchMux.passiveUpdate();
        this.branchMux.draw();
        // this.branchMux.printContents();

        console.log("Updating Component: Jump Multiplexer");
        this.jumpMux.passiveUpdate();
        this.jumpMux.draw();
        // this.jumpMux.printContents();

        console.log("Updating Component: Data Memory");
        this.dataMemory.passiveUpdate();
        this.dataMemory.draw();
        // this.dataMemory.printContents();

        console.log("Updating Component: Memory to Register Multiplexer");
        this.memToRegMux.passiveUpdate();
        this.memToRegMux.draw();
        this.memToRegMux.printContents();

        // /// Second update

        console.log("Updating Component: PC Register");
        this.pc.passiveUpdate();
        this.pc.draw();
        // this.pc.printContents();

        console.log("Updating Component: Register Data Source Multiplexer");
        this.regDataSrcMux.passiveUpdate();
        this.regDataSrcMux.draw();
        this.regDataSrcMux.printContents();

        console.log("Updating Component: Registers");
        this.registers.passiveUpdate();
        this.registers.draw();
        this.registers.printContents();
    }

    drawComponents(ctx) {
        this.pc.draw(ctx);

        this.adder_1.draw(ctx);

        this.num4Const.draw(ctx);

        this.instructionMemory.draw(ctx);

        this.regDstMux.draw(ctx)
    }

    printRegisters() {
    	console.log(this.registers.getMemory());
    }

    printMemory() {
        console.log(this.dataMemory.getMemory());

    }
}