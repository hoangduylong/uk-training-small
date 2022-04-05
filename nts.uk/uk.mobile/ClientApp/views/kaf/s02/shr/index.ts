import { _,Vue } from '@app/provider';
import {
    KafS00SubP3Component,
    KAFS00P3Params,
} from 'views/kaf/s00/sub/p3';

export class WorkHour {
    public workHours = { start: null, end: null };
    public actualHours = { applicationAchievementAtr: 1, startTime: null, endTime: null};
    public frame: number;
    public dispCheckbox: boolean;
    public disableCheckbox: boolean;
    public isCheck: boolean;
    public title: string;
    public errorMsg: string;

    constructor(iWorkHour: IWorkHour) {
        this.workHours.start = iWorkHour.startTime,
        this.workHours.end = iWorkHour.endTime,
        this.actualHours.startTime = iWorkHour.actualStart,
        this.actualHours.endTime = iWorkHour.actualEnd,
        this.frame = iWorkHour.frame,
        this.dispCheckbox = iWorkHour.dispCheckbox,
        this.disableCheckbox = iWorkHour.disableCheckbox,
        this.isCheck = iWorkHour.isCheck;
        this.title = iWorkHour.title;
        this.errorMsg = iWorkHour.errorMsg;
    }
}

export class GoBackHour {
    public hours = { start: null, end: null };
    public actualHours = { applicationAchievementAtr: 1, startTime: null, endTime: null};
    public frame: number;
    public dispCheckbox: boolean;
    public disableCheckbox: boolean;
    public isCheck: boolean;
    public title: string;
    public swtModel: number;
    public errorMsg: string;
    constructor(iGoBackHour: IGoBackHour) {
        this.hours.start = iGoBackHour.startTime,
        this.hours.end = iGoBackHour.endTime,
        this.actualHours.startTime = iGoBackHour.actualStart,
        this.actualHours.endTime = iGoBackHour.actualEnd,
        this.frame = iGoBackHour.frame,
        this.dispCheckbox = iGoBackHour.dispCheckbox,
        this.disableCheckbox = iGoBackHour.disableCheckbox,
        this.isCheck = iGoBackHour.isCheck;
        this.title = iGoBackHour.title;
        this.swtModel = iGoBackHour.swtModel;
        this.errorMsg = iGoBackHour.errorMsg;
    }
}

export class Error {
    public start: boolean;
    public end: boolean;
    public type: string;
    public frame: number;
    constructor(error: IError) {
        this.start = error.start;
        this.end = error.end;
        this.type = error.type;
        this.frame = error.frame;
    }
}

export interface IWorkHour {
    startTime: number;
    endTime: number;
    frame: number;
    title: string;
    dispCheckbox: boolean;
    disableCheckbox: boolean;
    isCheck: boolean;
    errorMsg: string;
    actualStart: number;
    actualEnd: number;
}

export interface IGoBackHour {
    startTime: number;
    endTime: number;
    frame: number;
    swtModel: number;
    title: string;
    dispCheckbox: boolean;
    disableCheckbox: boolean;
    isCheck: boolean;
    errorMsg: string;
    actualStart: number;
    actualEnd: number;
}

export interface IError {
    start: boolean;
    end: boolean;
    type: string;
    frame: number;
}

export class TimeStampAppDto {
    public destinationTimeApp: DestinationTimeAppDto;
    public timeOfDay: number;
    public workLocationCd?: string;
    public appStampGoOutAtr?: number;
    constructor (destinationTimeApp: DestinationTimeAppDto, timeOfDay: number, workLocationCd?: string, appStampGoOutAtr?: number) {
        this.destinationTimeApp = destinationTimeApp;
        this.timeOfDay = timeOfDay;
        this.workLocationCd = workLocationCd;
        this.appStampGoOutAtr = appStampGoOutAtr;
    }        
}
export class DestinationTimeAppDto {
    
    public timeStampAppEnum: number;
    public engraveFrameNo: number;
    public startEndClassification: number;
    public supportWork?: number;
    
    constructor (timeStampAppEnum: number, engraveFrameNo: number, startEndClassification: number, supportWork?: number) {
        this.timeStampAppEnum = timeStampAppEnum;
        this.engraveFrameNo = engraveFrameNo;
        this.startEndClassification = startEndClassification;
        this.supportWork = supportWork;
    }
}
export class TimeStampAppOtherDto {
    public destinationTimeZoneApp: DestinationTimeZoneAppDto;
    public timeZone: TimeZone;
    constructor (destinationTimeZoneApp: DestinationTimeZoneAppDto, timeZone: TimeZone) {
        this.destinationTimeZoneApp = destinationTimeZoneApp;
        this.timeZone = timeZone;
    }
}
export class TimeZone {
    public startTime: number;
    public endTime: number;
    constructor (startTime: number, endTime: number) {
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
export class DestinationTimeZoneAppDto {
    public timeZoneStampClassification: number;
    public engraveFrameNo: number;
    constructor (timeZoneStampClassification: number, engraveFrameNo: number) {
        this.timeZoneStampClassification = timeZoneStampClassification;
        this.engraveFrameNo = engraveFrameNo;
    }
}

export enum ScreenMode {
    // 新規モード
    NEW = 0,
    // 詳細モード
    DETAIL = 1
}

// ----------------------------------------------------

export class TimeSetDisp {
    public title: string;
    public frame: number;
    public actualHours = { applicationAchievementAtr: 1, startTime: null, endTime: null };
    public appHours = { applicationAchievementAtr: 0, startTime: null, endTime: null };
    public outingType: number;
    public cancelAtr: boolean;

    constructor( title: string, frame: number, actualStart: number, actulaEnd: number, appStart: number, appEnd: number, cancelAtr: boolean, outingType?: number ) {
        this.title = title;
        this.frame = frame;
        this.actualHours.startTime = actualStart;
        this.actualHours.endTime = actulaEnd;
        this.appHours.startTime = appStart;
        this.appHours.endTime = appEnd;
        this.cancelAtr = cancelAtr;
        this.outingType = outingType;
    }
}