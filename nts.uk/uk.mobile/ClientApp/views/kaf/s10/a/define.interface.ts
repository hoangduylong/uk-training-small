export enum NotUseAtr {
    Not_USE,
    USE
}
export interface ParamCalculationCMD {
    companyId: string;
    employeeId: string;
    dateOp: string;
    prePostInitAtr: number;
    overtimeLeaveAppCommonSet: OvertimeLeaveAppCommonSet;
    advanceApplicationTime: ApplicationTime;
    achieveApplicationTime: ApplicationTime;
    workContent: WorkContent;
}
export interface DisplayInfoOverTime {
    infoBaseDateOutput: InfoBaseDateOutput;
    infoNoBaseDate: InfoNoBaseDate;
    workdayoffFrames: Array<WorkdayoffFrame>;
    overtimeAppAtr: OvertimeAppAtr;
    appDispInfoStartup: any;
    isProxy: Boolean;
    calculationResultOp?: CalculationResult;
    infoWithDateApplicationOp?: InfoWithDateApplication;
    calculatedFlag: CalculatedFlag;
}
export interface WorkdayoffFrame {
    workdayoffFrNo: number;
    workdayoffFrName: string;
}
export interface CalculationResult {
    actualOvertimeStatus: any;
    calculatedFlag: number;
    applicationTime: ApplicationTime;
}
export interface OverStateOutput {
    isExistApp: boolean;
    advanceExcess: OutDateApplication;
    achivementStatus: number;
    achivementExcess: OutDateApplication;
}
export enum ExcessState {
    NO_EXCESS,
    EXCESS_ALARM,
    EXCESS_ERROR
}
export interface OutDateApplication {
    flex: number;
    excessStateMidnight: Array<ExcessStateMidnight>;
    overTimeLate: number;
    excessStateDetail: Array<ExcessStateDetail>;
    
}
export interface ExcessStateMidnight {
    excessState: number;
    legalCfl: number;
}
export enum StaturoryAtrOfHolidayWork {
    WithinPrescribedHolidayWork,
    ExcessOfStatutoryHolidayWork,
    PublicHolidayWork
}
export interface ExcessStateDetail {
    frame: number;
    type: number;
    excessState: number;
}
export interface ParamBreakTime {
    companyId: string;
    appDate: string;
    workTypeCode: string;
    workTimeCode: string;
    startTime: number;
    endTime: number;
    appHdWorkDispInfo: any;
}
export interface ParamChangeWorkMobile {
    companyId: string;
    appDate: string;
    workTypeCode: string;
    workTimeCode: string;
    startTime: number;
    endTime: number;
    appHdWorkDispInfo: any;
}
export interface InfoWithDateApplication {
    workTypeCD?: string;
    workTimeCD?: string;
    workHours?: WorkHoursDto;
    breakTime?: BreakTimeZoneSetting;
    applicationTime?: ApplicationTime;
}
export interface BreakTimeZoneSetting {
    timeZones?: Array<TimeZone>;
}
export interface BreakTimeOp {
    timeZone?: Array<TimeZone>;
}
export interface TimeZone {
    frameNo: number;
    start: number;
    end: number;
}
export interface WorkHoursDto {
    startTimeOp1: number;
    endTimeOp1: number;
    startTimeOp2: number;
    endTimeOp2: number;
}
export interface InfoBaseDateOutput {
    worktypes: Array<WorkType>;
    quotaOutput: QuotaOuput;
}
export interface QuotaOuput {
    flexTimeClf: boolean;
    overTimeQuotaList: Array<OvertimeWorkFrame>;
}
export interface OvertimeWorkFrame {
    companyId: string;
    overtimeWorkFrNo: number;
    useClassification: number;
    transferFrName: string;
    overtimeWorkFrName: string;

}
export interface WorkType {
    workTypeCode: string;
    name: string;
}

export interface WorkTime {
    worktimeCode: string;
    workTimeDisplayName: WorkTimeDisplayName;
}
export interface WorkTimeDisplayName {
    workTimeName: string;
}
export interface InfoNoBaseDate {
    overTimeReflect: any;
    overTimeAppSet: OvertimeAppSet;
    agreeOverTimeOutput: AgreeOverTimeOutput;
    divergenceReasonInputMethod: Array<DivergenceReasonInputMethod>;
    divergenceTimeRoot: Array<DivergenceTimeRoot>;
}
export interface DivergenceReasonInputMethod {
    divergenceTimeNo: number;
    divergenceReasonInputed: boolean;
    divergenceReasonSelected: boolean;
    reasons: Array<DivergenceReasonSelect>;
}

export interface DivergenceReasonSelect {
    divergenceReasonCode: string;
    reason: string;
    reasonRequired: number;
}
export interface DivergenceTimeRoot {
    divergenceTimeNo: number;
    companyId: string;
    divTimeUseSet: number;
    divTimeName: string;
    divType: number;
}
export interface DivergenceReasonInputMethod {
    divergenceTimeNo: number;
    companyId: string;
    divergenceReasonInputed: boolean;
    divergenceReasonSelected: boolean;
    reasons: Array<DivergenceReasonSelect>;
}
export interface OvertimeAppSet {
    companyID: string;
    overtimeLeaveAppCommonSetting: any;
    overtimeQuotaSet: Array<any>;
    applicationDetailSetting: any;
}
export interface AgreeOverTimeOutput {
    isCurrentMonth: boolean;
    currentTimeMonth: any;
    currentMonth: string;
    isNextMonth: boolean;
    nextTimeMonth: any;
    nextMonth: string;
}
export interface AgreementTimeOfManagePeriod {
    agreementTime: any;
    sid: string;
    status: number;
    agreementTimeBreakDown: any;
    yearMonth: string;
    legalMaxTime: any;
}

export interface AgreementTimeImport {
    employeeId: string;
    confirmed?: AgreeTimeOfMonthExport;
    afterAppReflect?: AgreeTimeOfMonthExport;
    confirmedMax?: AgreMaxTimeOfMonthExport;
    afterAppReflectMax?: AgreMaxTimeOfMonthExport;
    errorMessage?: string;
}
export interface AgreeTimeOfMonthExport {
    agreementTime: number;
    limitErrorTime: number;
    limitAlarmTime: number;
    exceptionLimitErrorTime?: number;
    exceptionLimitAlarmTime?: number;
    status: number;
}
export interface AgreMaxTimeOfMonthExport {
    agreementTime: number;
    maxTime: number;
    status: number;
}
export enum OvertimeAppAtr {

    EARLY_OVERTIME,
    NORMAL_OVERTIME,
    EARLY_NORMAL_OVERTIME
}
export enum AttendanceType {

    NORMALOVERTIME, // 残業時間

    BREAKTIME, // 休出時間

    BONUSPAYTIME, // 加給時間

    BONUSSPECIALDAYTIME, // 特定日加給時間

    MIDNIGHT,

    SHIFTNIGHT,

    MIDDLE_BREAK_TIME, // 法定内休出

    MIDDLE_EXORBITANT_HOLIDAY, // 法定外休出

    MIDDLE_HOLIDAY_HOLIDAY, // 祝日休出

    FLEX_OVERTIME, // フレックス超過時間

    MIDNIGHT_OUTSIDE // 残業深夜時間
    
    
    
    
    
}

export interface FirstParam { // start param
    companyId: string; // 会社ID
    appType?: number; // 申請種類
    sids?: Array<string>; // 申請者リスト
    dates?: Array<string>; // 申請対象日リスト
    mode: number; // 新規詳細モード
    dateOp?: string; // 申請日
    overtimeAppAtr: number; // 残業申請区分
    appDispInfoStartupDto: any; // 申請表示情報
    startTimeSPR?: number; // SPR連携の開始時刻
    endTimeSPR?: number; // SPR連携の終了時刻
    isProxy: boolean; // 代行申請か
}

export interface SecondParam { // start param
    companyId: string; // 会社ID
    employeeId: string; // 社員ID
    appDate: string; // 申請日
    prePostInitAtr: number; // 事前事後区分
    overtimeLeaveAppCommonSet: OvertimeLeaveAppCommonSet; // 残業休出申請共通設定
    advanceApplicationTime: ApplicationTime; // 事前の申請時間
    achivementApplicationTime: ApplicationTime; // 実績の申請時間
    workContent: WorkContent; // 勤務内容
}
export interface OvertimeLeaveAppCommonSet {
    preExcessDisplaySetting: number; // 事前超過表示設定
    extratimeExcessAtr: number; // 時間外超過区分
    extratimeDisplayAtr: number; // 時間外表示区分
    performanceExcessAtr: number; // 実績超過区分
    checkOvertimeInstructionRegister: number; // 登録時の指示時間超過チェック
    checkDeviationRegister: number; // 登録時の乖離時間チェック
    overrideSet: number; // 実績超過打刻優先設定

}
export interface ApplicationTime {
    applicationTime: Array<OvertimeApplicationSetting>; //  申請時間
    flexOverTime: number; // フレックス超過時間
    overTimeShiftNight: OverTimeShiftNight; // 就業時間外深夜時間
    anyItem: Array<AnyItemValue>; // 任意項目
    reasonDissociation: Array<any>; // 乖離理由
}
export interface OvertimeApplicationSetting {
    frameNo: number;
    attendanceType: number;
    applicationTime: number;
}
export interface OverTimeShiftNight {
    midNightHolidayTimes: Array<HolidayMidNightTime>;
    midNightOutSide: number;
    overTimeMidNight: number;
}
export interface AnyItemValue {
    itemNo: number;
    times: number;
    amount: number;
    time: number;
}
export interface ReasonDivergence {

    reason: any;
    reasonCode: string;
    diviationTime: number;
}
export interface DivergenceReason {
    code: number;
}
export interface WorkContent {
    workTypeCode: string;
    workTimeCode: string;
    timeZones: Array<TimeZone>;
    breakTimes: Array<BreakTimeSheet>;
}
export interface TimeZone {
    start: number;
    end: number;
}
export interface BreakTimeSheet {
    breakFrameNo: number;
    startTime: number;
    endTime: number;
    breakTime: number;
}
export interface TimeZoneWithWorkNo {
    workNo: number;
    timeZone: TimeZoneNew;
}
export interface TimeZoneNew {
    startTime: number;
    endTime: number;
}
export interface AppOverTime {
    overTimeClf: number;
    applicationTime: ApplicationTime;
    breakTimeOp?: Array<TimeZoneWithWorkNo>;
    workHoursOp?: Array<TimeZoneWithWorkNo>;
    workInfoOp?: WorkInformation;
    detailOverTimeOp?: AppOvertimeDetail;
    application: ApplicationDto;
}
export interface AppOvertimeDetail {
    applicationTime: number;
    yearMonth: number;
    actualTime: number;
    limitErrorTime: number;
    limitAlarmTime: number;
    exceptionLimitErrorTime: number;
    exceptionLimitAlarmTime: number;
    year36OverMonth: Array<number>;
    numOfYear36Over: number;
    actualTimeAnnual: number;
    limitTime: number;
    appTimeAgreeUpperLimit: number;
    overTime: number;
    upperLimitTimeMonth: number;
    averageTimeLst: Array<Time36UpLimitMonth>;
    upperLimitTimeAverage: number;

}
export interface Time36UpLimitMonth {
    periodYearStart: number;
    periodYearEnd: number;
    averageTime: number;
    totalTime: number;
}
export interface ApplicationDto {
    version: number;
    appID: string;
    prePostAtr: number;
    employeeID: string;
    appType: number;
    appDate: string;
    enteredPerson: string;
    inputDate: string;
    reflectionStatus: ReflectionStatus;
    opStampRequestMode?: number;
    opReversionReason?: string;
    opAppStartDate?: string;
    opAppEndDate?: string;
    opAppReason?: string;
    opAppStandardReasonCD?: number;
    employeeIDLst: Array<string>;
}
export interface ReflectionStatus {
    code: any;
}
export interface WorkInformation {
    workType: string;
    workTime: string;
}

export interface ParamCheckBeforeRegister {
    require: boolean;
    companyId: string;
    displayInfoOverTime: DisplayInfoOverTime;
    appOverTime: AppOverTime;
}
export interface CheckBeforeOutput {
    appOverTime: AppOverTime;
    confirmMsgOutputs: Array<any>;
}
export interface RegisterCommand {
    companyId: string;
    appOverTime: AppOverTime;
    appDispInfoStartupDto: any;
    isMail: Boolean;
    appTypeSetting: any;
}
export interface HolidayMidNightTime {
    attendanceTime: number;
    legalClf: number;
}

export interface ApplicationInsertCmd {
    prePostAtr: number;
    employeeIDLst: Array<string>;
    appType: number;
    appDate: string;
    opAppReason: string;
    opAppStandardReasonCD: string;
    opAppStartDate: string;
    opAppEndDate: string;
    opStampRequestMode: string;
    
}

export interface ParamStartMobile {
    mode: boolean;
    companyId: string;
    employeeId: string;
    appDate: string;
    appHdWorkDispInfo: any;
    appHolidayWork: any;
    appDispInfoStartupOutput: any;
}

export interface Model {
    appHolidayWork: AppHolidayWork;
    appHdWorkDispInfo: AppHdWorkDispInfo;
}
export interface AppHolidayWork {
    workInformation: WorkInformation;
    applicationTime: ApplicationTime;
    backHomeAtr: boolean;
    goWorkAtr: boolean;
    breakTimeList: Array<TimeZoneWithWorkNo>;
    workingTimeList: Array<TimeZoneWithWorkNo>;
    appOvertimeDetail: AppOvertimeDetail;
    application: ApplicationDto;
}
export interface AppHdWorkDispInfo {
    dispFlexTime: boolean;
    divergenceTimeRoots: any;
    workdayoffFrameList: Array<WorkdayoffFrame>;
    otWorkHoursForApplication: AgreeOverTimeOutput;
    hdWorkDispInfoWithDateOutput: HdWorkDispInfoWithDateOutput;
    calculationResult: CalculationResult;
    appDispInfoStartupOutput: any;
    overtimeFrameList: Array<OvertimeWorkFrame>;
    holidayWorkAppSet: any;
    divergenceReasonInputMethod: Array<DivergenceReasonInputMethod>;
    hdWorkOvertimeReflect: any;
}
export interface HdWorkDispInfoWithDateOutput {
    initWorkType: string;
    initWorkTypeName: string;
    initWorkTime: string;
    initWorkTimeName: string;
    workHours: WorkHoursDto;
    breakTimeZoneSettingList: BreakTimeZoneSetting;
    actualApplicationTime: ApplicationTime;
    workTypeList: Array<WorkType>;
    overtimeStatus: OvertimeStatus;
    subHdManage: boolean;
}
export interface OvertimeStatus {
    isPreApplicationOvertime: boolean;
    attendanceType: number;
    isActualOvertime: boolean;
    frameNo: number;
    isInputCalculationDiff: boolean;
}
export interface ParamBreakTime {	
    workTypeCode: string;
    workTimeCode: string;
    startTime: number;
    endTime: number;
    actualContentDisplayDto: Array<any>;
}

export interface ParamSelectWorkMobile {
    companyId: string;
    employeeId: string;
    dateOp: string;
    workTypeCode: string;
    workTimeCode: string;
    startTimeSPR: number;
    endTimeSPR: number;
    actualContentDisplay: any;
    overtimeAppSet: any;
}
export interface ParamCalculateMobile {
    companyId: string;
    employeeId: string;
    appDate: string;
    mode: Boolean;
    appHdWorkDispInfo: AppHdWorkDispInfo;
    appHolidayWorkInsert: AppHolidayWork;
    appHolidayWorkUpdate: AppHolidayWork;
    isAgent: boolean;
}
export interface BreakTime {
    valueHours: any;
    title: string;
    frameNo: number;
}
export enum CalculatedFlag {
    // 計算済
    CALCULATED, 	
    // 未計算
    UNCALCULATED 
}
export enum TrackRecordAtr {
    DAILY_RESULTS, // 日別実績
    SCHEDULE // スケジュール
}
export enum AppDateContradictionAtr {
    //  チェックしない
    NOTCHECK,
    //  チェックする（登録可）
    CHECKREGISTER,
    //  チェックする（登録不可）
    CHECKNOTREGISTER
}
export enum PrePostAtr {
    PRE,
    POST
}
