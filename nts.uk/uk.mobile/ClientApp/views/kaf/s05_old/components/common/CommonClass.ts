import { _ } from '@app/provider';

export interface ComboReason {
    reasonId: string;
    reasonName: string;
}

export interface AppApprovalPhase {
    phaseID: string;
    approvalForm: string;
    dispOrder: string;
    approvalATR: string;
    approvalFrameCmds: Array<ApprovalFrame>;
}

export interface ApprovalFrame {
    frameID: string;
    dispOrder: string;
    approveAcceptedCmds: Array<ApproveAccepted>;
}

export interface ApproveAccepted {
    appAcceptedID: string;
    approverSID: string;
    approvalATR: string;
    confirmATR: string;
    approvalDate: string;
    reason: string;
    representerSID: string;
}

export interface EmployeeOT {
    id: string;
    name: string;
}

export interface OverTimeInput {
    companyID: string;
    appID: string;
    attendanceID: number;
    attendanceName: string;
    frameNo: number;
    timeItemTypeAtr: number;
    frameName: any;
    applicationTime: number;
    nameID: string;
    restTimeInput: { start: number, end: number };
    startTime: number;
    endTime: number;
}

export interface OvertimeWork {
    yearMonth: string;
    limitTime: string;
    actualTime: string;
    appTime: string;
    totalTime: string;
    color: string;
}

export interface WorkContent {
    //申請日
    applicationDate: string;
    //勤務種類
    workType: string;
    //就業時間帯
    siftType: string;
    //勤務時間
    workClockFrom1: number;
    workClockTo1: number;
    workClockFrom2: number;
    workClockTo2: number;
    //休憩時間
    breakTimes: Array<any>;
    overtimeHours: Array<any>;
}

export interface OvertimeAgreement {
    detailCurrentMonth: AgreementTimeDetail;
    detailNextMonth: AgreementTimeDetail;
    currentMonth: string;
    nextMonth: string;
}

export interface AgreementTimeDetail {
    employeeID: string;
    confirmed: AgreementTimeOfMonthly;
    afterAppReflect: AgreementTimeOfMonthly;
    errorMessage: string;
}

export interface AgreementTimeOfMonthly {
    agreementTime: number;
    limitAlarmTime: number;
    limitErrorTime: number;
    status: number;
    exceptionLimitAlarmTime: number;
    exceptionLimitErrorTime: number;
}

export interface OvertimeCaculation {
    companyID: string;
    appID: string;
    attendanceID: number;
    attendanceName: string;
    frameNo: number;
    timeItemTypeAtr: number;
    frameName: string;
    applicationTime: number;
    preAppTime: string;
    caculationTime: string;
    nameID: string;
    itemName: string;
    color: string;
    preAppExceedState: boolean;
    actualExceedState: number;
}

export enum AgreementTimeStatusOfMonthly {
    /** 正常 */
    NORMAL = 0,
    /** 限度エラー時間超過 */
    EXCESS_LIMIT_ERROR = 1,
    /** 限度アラーム時間超過 */
    EXCESS_LIMIT_ALARM = 2,
    /** 特例限度エラー時間超過 */
    EXCESS_EXCEPTION_LIMIT_ERROR = 3,
    /** 特例限度アラーム時間超過 */
    EXCESS_EXCEPTION_LIMIT_ALARM = 4,
    /** 正常（特例あり） */
    NORMAL_SPECIAL = 5,
    /** 限度エラー時間超過（特例あり） */
    EXCESS_LIMIT_ERROR_SP = 6,
    /** 限度アラーム時間超過（特例あり） */
    EXCESS_LIMIT_ALARM_SP = 7,
}

export interface Kafs05Model {
    isCreate: boolean;
    step1Start: boolean;
    resetTimeRange: number;
    checkBoxValue: boolean;
    enableSendMail: boolean;
    displayBreakTimeFlg: boolean;
    employeeName: string;
    enteredPersonName: string;
    prePostSelected: number;
    workState: boolean;
    typeSiftVisible: boolean;
    appDate: Date;
    workTypeCd: string;
    workTypeName: string;
    siftCD: string;
    siftName: string;
    workTypecodes: Array<string>;
    workTimecodes: Array<string>;
    selectedWorkTime: string;
    reasonCombo: Array<ComboReason>;
    selectedReason: string;
    requiredReason: boolean;
    multilContent: string;
    reasonCombo2: Array<ComboReason>;
    selectedReason2: string;
    requiredReason2: boolean;
    multilContent2: string;
    approvalSource: Array<AppApprovalPhase>;
    employeeID: string;
    employeeIDs: Array<string>;
    employeeList: Array<EmployeeOT>;
    selectedEmplCodes: string;
    employeeFlag: boolean;
    totalEmployee: any;
    heightOvertimeHours: number;
    overtimeAtr: number;
    restTime: Array<OverTimeInput>;
    overtimeHours: Array<OvertimeCaculation>;
    breakTimes: Array<OvertimeCaculation>;
    bonusTimes: Array<OvertimeCaculation>;
    prePostEnable: boolean;
    displayCaculationTime: boolean;
    displayBonusTime: boolean;
    displayPrePostFlg: boolean;
    restTimeDisFlg: boolean;
    typicalReasonDisplayFlg: boolean;
    displayAppReasonContentFlg: boolean;
    displayDivergenceReasonForm: boolean;
    displayDivergenceReasonInput: boolean;
    workTypeChangeFlg: boolean;
    overtimeWork: Array<OvertimeWork>;
    indicationOvertimeFlg: boolean;
    calculateFlag: number;
    uiType: number;
    preWorkContent: WorkContent;
    targetDate: string;
    editable: boolean;
    enableOvertimeInput: boolean;
    isSpr: boolean;
    resultCaculationTimeFlg: boolean;
    workTimeInput: any;
    appID: string;
    version: number;
    reflectPerState: number;
    user: number;
    beforeAppStatus: boolean;
    actualStatus: number;
    performanceExcessAtr: number;
    preExcessDisplaySetting?: number;
    overtimeSettingDataDto: any;
    opAppBefore: any;
    actualLst: any;
}