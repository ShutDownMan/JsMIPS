const IS_RTYPE_INSTRUCTION = 0x00;
const IS_LW_INSTRUCTION = 0x23;
const IS_SW_INSTRUCTION = 0x2B;
const IS_BEQ_INSTRUCTION = 0x04;
const IS_BNE_INSTRUCTION = 0x05;
const IS_LI_INSTRUCTION = 0x0F;
const IS_J_INSTRUCTION = 0x02;

var InstructionTypeList = {
    RTYPE: 1,
    LW: 2,
    SW: 3,
    BEQ: 4,
    BNE: 5,
    LI: 6,
    J: 7,
    NONE: 8
};

class Controller {

    constructor(component = '') {
        this.component = component;
        this.currentInstruction = undefined;

        this.inBus = undefined;

        this.RegDstSignal = new Bus(component, 'regdst');
        this.ALUSrcSignal = new Bus(component, 'alusrc');
        this.MemToRegSignal = new Bus(component, 'memtoreg');
        this.RegWriteSignal = new Bus(component, 'regwrite');
        this.MemReadSignal = new Bus(component, 'memread');
        this.MemWriteSignal = new Bus(component, 'memwrite');
        this.BranchSignal = new Bus(component, 'branch');
        this.ALUOpSignal = new Bus(component, 'aluop');
        this.RegDataSrcSignal = new Bus(component, 'regsrc');
        this.BranchJumpSignal = new Bus(component, 'jump');
    }

    draw() {
        setLabelText(this.component, 'inst_type_label', 'Instruction: ' + this.currentInstructionType);

        this.RegDstSignal.draw('#95ffffff', '#0084ffff');
        this.ALUSrcSignal.draw('#95ffffff', '#0084ffff');
        this.MemToRegSignal.draw('#95ffffff', '#0084ffff');
        this.RegWriteSignal.draw('#95ffffff', '#0084ffff');
        this.MemReadSignal.draw('#95ffffff', '#0084ffff');
        this.MemWriteSignal.draw('#95ffffff', '#0084ffff');
        this.BranchSignal.draw('#95ffffff', '#0084ffff');
        this.ALUOpSignal.draw('#95ffffff', '#0084ffff');
        this.RegDataSrcSignal.draw('#95ffffff', '#0084ffff');
        this.BranchJumpSignal.draw('#95ffffff', '#0084ffff');
    }

    initialize(inBus, mask) {
        this.inBus = inBus;
        this.mask = mask;
    }

    passiveUpdate() {

        this.RegDstSignal.setValue(0);
        this.ALUSrcSignal.setValue(0);
        this.MemToRegSignal.setValue(0);
        this.RegWriteSignal.setValue(0);
        this.MemReadSignal.setValue(0);
        this.MemWriteSignal.setValue(0);
        this.BranchSignal.setValue(0);
        this.ALUOpSignal.setValue(0);
        this.RegDataSrcSignal.setValue(0);
        this.BranchJumpSignal.setValue(0);

        let currentInstructionType = this.getInstructionType();

        switch (currentInstructionType) {
            case InstructionTypeList.RTYPE:
                console.log("R Type Instruction detected");
                this.currentInstructionType = 'R Type';
                this.RegDstSignal.setValue(1);
                this.RegWriteSignal.setValue(1);
                this.ALUOpSignal.setValue(2);
                break;

            case InstructionTypeList.LW:
                console.log("LW Instruction detected");
                this.currentInstructionType = 'LW';
                this.ALUSrcSignal.setValue(1);
                this.MemToRegSignal.setValue(1);
                this.RegWriteSignal.setValue(1);
                this.MemReadSignal.setValue(1);
                break;

            case InstructionTypeList.SW:
                console.log("SW Instruction detected");
                this.currentInstructionType = 'SW';
                this.ALUSrcSignal.setValue(1);
                this.MemWriteSignal.setValue(1);
                break;

            case InstructionTypeList.BEQ:
                console.log("BEQ Instruction detected");
                this.currentInstructionType = 'BEQ';
                this.BranchSignal.setValue(1);
                this.ALUOpSignal.setValue(1);
                break;

            case InstructionTypeList.BNE:
                console.log("BNE Instruction detected");
                this.currentInstructionType = 'BNE';
                this.BranchSignal.setValue(2);
                this.ALUOpSignal.setValue(1);
                break;

            case InstructionTypeList.LI:
                console.log("LI Instruction detected");
                this.currentInstructionType = 'LI';
                this.RegWriteSignal.setValue(1);
                this.RegDataSrcSignal.setValue(1);
                break;

            case InstructionTypeList.J:
                console.log("J Instruction detected");
                this.currentInstructionType = 'J';
                this.BranchSignal.setValue(1);
                this.ALUOpSignal.setValue(1);
                this.BranchJumpSignal.setValue(1);
                break;

            default:
                console.log("INSTRUCTION TYPE NOT DETECTED!");
                this.currentInstructionType = 'ERROR';
                break;
        }
    }

    getRegDstSignal() {
        return this.RegDstSignal;
    }

    getBranchSignal() {
        return this.BranchSignal;
    }

    getMemReadSignal() {
        return this.MemReadSignal;
    }

    getMemToRegSignal() {
        return this.MemToRegSignal;
    }

    getAluOpSignal() {
        return this.ALUOpSignal;
    }

    getMemWriteSignal() {
        return this.MemWriteSignal;
    }

    getAluSrcSignal() {
        return this.ALUSrcSignal;
    }

    getRegWriteSignal() {
        return this.RegWriteSignal;
    }

    getRegDataSrc() {
        return this.RegDataSrcSignal;
    }

    getBranchJumpSignal() {
        return this.BranchJumpSignal;
    }

    getInstructionType() {
        let inBusValue = this.inBus.getValue(this.mask);

        if (inBusValue === IS_RTYPE_INSTRUCTION) return InstructionTypeList.RTYPE;

        if (inBusValue === IS_LW_INSTRUCTION) return InstructionTypeList.LW;

        if (inBusValue === IS_SW_INSTRUCTION) return InstructionTypeList.SW;

        if (inBusValue === IS_BEQ_INSTRUCTION) return InstructionTypeList.BEQ;

        if (inBusValue === IS_BNE_INSTRUCTION) return InstructionTypeList.BNE;

        if (inBusValue === IS_LI_INSTRUCTION) return InstructionTypeList.LI;

        if (inBusValue === IS_J_INSTRUCTION) return InstructionTypeList.J;

        return InstructionTypeList.NONE;
    }

    printContents() {
        console.log(this);
    }
}