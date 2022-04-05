export * from './comp1';
export * from './comp2';
export * from './comp3';

export enum AppTimeType {
    ATWORK = 0,
    OFFWORK = 1,
    ATWORK2 = 2,
    OFFWORK2 = 3,
    PRIVATE = 4,
    UNION = 5
}

export enum GoingOutReason {
    PRIVATE = 0,        /* 私用 */
    PUBLIC = 1,         /* 公用 */
    COMPENSATION = 2,   /* 有償 */
    UNION = 3           /* 組合 */
}

export enum LeaveType {
    SUBSTITUTE = 0, // 時間代休
    ANNUAL = 1, // 時間年休
    CHILD_NURSING = 2, // 子看護
    NURSING = 3, // 介護
    SUPER_60H = 4, // 60H超休
    SPECIAL = 5, // 時間特別休暇
    COMBINATION = 6, // 組合せ利用
}

export interface ReflectSetting {
    condition: {
        annualVacationTime: number,
        childNursing: number,
        nursing: number,
        specialVacationTime: number,
        substituteLeaveTime: number,
        superHoliday60H: number
    };
    destination: {
        firstAfterWork: number,
        firstBeforeWork: number,
        privateGoingOut: number,
        secondAfterWork: number,
        secondBeforeWork: number,
        unionGoingOut: number
    };
    reflectActualTimeZone: number;
}

export interface TimeLeaveManagement {
    nursingLeaveMng: {
        timeCareLeaveMngAtr: boolean,
        timeCareLeaveUnit: number,
        timeChildCareLeaveMngAtr: boolean,
        timeChildCareLeaveUnit: number,
    };
    super60HLeaveMng: {
        super60HLeaveMngAtr: boolean,
        super60HLeaveUnit: number,
    };
    timeAnnualLeaveMng: {
        timeAnnualLeaveMngAtr: boolean,
        timeAnnualLeaveUnit: number,
    };
    timeSpecialLeaveMng: {
        listSpecialFrame: Array<any>,
        timeSpecialLeaveMngAtr: boolean,
        timeSpecialLeaveUnit: number
    };
    timeSubstituteLeaveMng: {
        timeSubstituteLeaveMngAtr: boolean,
        timeSubstituteLeaveUnit: number,
    };
}

export interface TimeLeaveRemaining {
    annualTimeLeaveRemainingDays: number;
    annualTimeLeaveRemainingTime: number;
    careRemainingDays: number;
    careRemainingTime: number;
    childCareRemainingDays: number;
    childCareRemainingTime: number;
    specialTimeFrames: Array<any>;
    subTimeLeaveRemainingTime: number;
    super60HRemainingTime: number;
    remainingStart: string;
    remainingEnd: string;
    grantDate: string;
    grantedDays: number;
}

export interface ITimeLeaveAppDispInfo {
    appDispInfoStartupOutput: any;
    reflectSetting: ReflectSetting;
    timeLeaveManagement: TimeLeaveManagement;
    timeLeaveRemaining: TimeLeaveRemaining;
}

export interface TimeLeaveAppDetail {
    appTimeType: number;
    timeZones: Array<{
        workNo: number,
        startTime: number,
        endTime: number
    }>;
    applyTime: {
        substituteAppTime: number,
        annualAppTime: number,
        childCareAppTime: number,
        careAppTime: number,
        super60AppTime: number,
        specialAppTime: number,
        specialLeaveFrameNo: number,
    };
}

export class LateEarlyTimeZone {
    public appTimeType: number;
    public workNo: number;
    public title: string;
    public description: string;
    public name: string;
    public timeValue: number;

    constructor(type: number, params?: TimeLeaveAppDetail) {
        const self = this;
        self.appTimeType = type;
        self.workNo = type == AppTimeType.ATWORK || AppTimeType.OFFWORK ? 1 : 2;
        switch (type) {
            case AppTimeType.ATWORK:
                self.title = 'KAFS12_5';
                self.description = 'KAFS12_6';
                self.name = 'KAFS12_5';
                break;
            case AppTimeType.OFFWORK:
                self.title = 'KAFS12_7';
                self.description = 'KAFS12_8';
                self.name = 'KAFS12_7';
                break;
            case AppTimeType.ATWORK2:
                self.title = 'KAFS12_9';
                self.description = 'KAFS12_10';
                self.name = 'KAFS12_9';
                break;
            case AppTimeType.OFFWORK2:
                self.title = 'KAFS12_11';
                self.description = 'KAFS12_12';
                self.name = 'KAFS12_11';
                break;
            default:
                break;
        }
        if (params) {
            self.timeValue = type == AppTimeType.ATWORK || AppTimeType.ATWORK ? params.timeZones[0].endTime : params.timeZones[0].startTime;
        } else {
            self.timeValue = null;
        }
    }
}

export class OutingTimeZone {
    public appTimeType: number;
    public workNo: number;
    public timeZone: {
        start: number,
        end: number
    };
    public display: boolean;

    constructor(no: number, display: boolean, params?: any) {
        const self = this;
        self.appTimeType = GoingOutReason.PRIVATE;
        self.workNo = no;
        self.timeZone = {
            start: null,
            end: null
        };
        self.display = display;
    }
}