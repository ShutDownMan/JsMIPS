class Processor {

    constructor() {
        this.pc = new PCRegister();

        this.num4Const = new Bus();

        this.adder_1 = new Adder();

        this.instructionMemory = new InstructionMemory();

        this.controller = new Controller();

        this.regDstMux = new Multiplexer();

        this.signExtend = new SignExtend();

        this.regDataSrcMux = new Multiplexer();

        this.registers = new Registers();

        this.aluSrcMux = new Multiplexer();

        this.branchSrcMux = new Multiplexer();

        this.aluController = new ALUController();

        this.shiftLeft2 = new ShiftLeft2();

        this.adder_2 = new Adder();

        this.alu = new ALU();

        this.branchController = new BranchController();

        this.branchMux = new Multiplexer();

        this.jumpMux = new Multiplexer();

        this.dataMemory = new DataMemory();

        this.memToRegMux = new Multiplexer();

    }

    initialize(instructionMemoryBuffer) {
        console.log("Initializing Component: PC Register");
        this.pc.initialize(this.jumpMux.getOutBus());
        this.pc.initDrawFunction(drawPCRegister);
        // this.pc.initialize(undefined);

        console.log("Initializing Component: Number 4 const");
        this.num4Const.setValue(4);
        this.num4Const.initDrawFunction(drawNum4Const);

        console.log("Initializing Component: Adder 1");
        this.adder_1.initialize(this.pc.getOutBus(),
            this.num4Const);
        this.adder_1.initDrawFunction(drawAdder1);

        console.log("Initializing Component: Instruction Memory");
        this.instructionMemory.initialize(instructionMemoryBuffer,
            this.pc.getOutBus());
        this.instructionMemory.initDrawFunction(drawInstructionMemory);

        console.log("Initializing Component: Controller");
        this.controller.initialize(this.instructionMemory.getInstructionBus(), 0xFC000000);

        console.log("Initializing Component: Sign Extend");
        this.signExtend.initialize(this.instructionMemory.getInstructionBus(), 0x0000FFFF);

        console.log("Initializing Component: Register Destination Multiplexer");
        this.regDstMux.initialize(this.instructionMemory.getInstructionBus(),
            this.instructionMemory.getInstructionBus(),
            this.controller.getRegDstSignal(), 0x001F0000, 0x0000F800);
        this.regDstMux.initDrawFunction(drawRegDstMux);

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

        console.log("Initializing Component: Branch Source Multiplexer");
        this.branchSrcMux.initialize(this.signExtend.getOutBus(),
            this.registers.getReadData1Bus(),
            this.aluController.getBranchJumpSrcBus());

        console.log("Initializing Component: Shift Left 2");
        this.shiftLeft2.initialize(this.signExtend.getOutBus());

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

        this.drawComponents(ctx);

        console.log("Registers");
        this.printRegisters();
        console.log("------------------------------------------------");
        console.log("Memory");
        this.printMemory();
        console.log("------------------------------------------------");
    }

    risingEdge() {
        console.log("Clocking Component: PC Register");
        this.pc.updateState();
        // this.pc.printContents();
    }

    fallingEdge() {
        console.log("Clocking Component: Registers");
        this.registers.updateState();
        // this.registers.printContents();

        console.log("Clocking Component: Data Memory");
        this.dataMemory.updateState();
        // this.dataMemory.printContents();
    }

    passiveUpdate() {
        console.log("Updating Component: PC Register");
        this.pc.passiveUpdate();
        // this.pc.printContents();

        console.log("Updating Component: Adder 1");
        this.adder_1.passiveUpdate();
        // this.adder_1.printContents();

        console.log("Updating Component: Instruction Memory");
        this.instructionMemory.passiveUpdate();
        // this.instructionMemory.printContents();

        console.log("Updating Component: Controller");
        this.controller.passiveUpdate();
        // this.controller.printContents();

        console.log("Updating Component: Register Destination Multiplexer");
        this.regDstMux.passiveUpdate();
        // this.regDstMux.printContents();

        console.log("Updating Component: Sign Extend");
        this.signExtend.passiveUpdate();
        // this.signExtend.printContents();

        console.log("Updating Component: Register Data Source Multiplexer");
        this.regDataSrcMux.passiveUpdate();
        // this.regDataSrcMux.printContents();

        console.log("Updating Component: Registers");
        this.registers.passiveUpdate();
        // this.registers.printContents();

        console.log("Updating Component: Branch Source Multiplexer");
        this.branchMux.passiveUpdate();
        // this.branchMux.printContents();

        console.log("Updating Component: Shift Left 2");
        this.shiftLeft2.passiveUpdate();
        // this.shiftLeft2.printContents();

        console.log("Updating Component: Alu Source Multiplexer");
        this.aluSrcMux.passiveUpdate();
        // this.aluSrcMux.printContents();

        console.log("Updating Component: Alu Controller");
        this.aluController.passiveUpdate();
        // this.aluController.printContents();

        console.log("Updating Component: Adder 2");
        this.adder_2.passiveUpdate();
        // this.adder_2.printContents();

        console.log("Updating Component: ALU");
        this.alu.passiveUpdate();
        this.alu.printContents();

        console.log("Updating Component: Branch Control");
        this.branchController.passiveUpdate();
        // this.branchController.printContents();

        console.log("Updating Component: Branch Multiplexer");
        this.branchMux.passiveUpdate();
        // this.branchMux.printContents();

        console.log("Updating Component: Jump Multiplexer");
        this.jumpMux.passiveUpdate();
        // this.jumpMux.printContents();

        console.log("Updating Component: Data Memory");
        this.dataMemory.passiveUpdate();
        // this.dataMemory.printContents();

        console.log("Updating Component: Memory to Register Multiplexer");
        this.memToRegMux.passiveUpdate();
        this.memToRegMux.printContents();

        // /// Second update

        console.log("Updating Component: PC Register");
        this.pc.passiveUpdate();
        // this.pc.printContents();

        console.log("Updating Component: Register Data Source Multiplexer");
        this.regDataSrcMux.passiveUpdate();
        this.regDataSrcMux.printContents();

        console.log("Updating Component: Registers");
        this.registers.passiveUpdate();
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