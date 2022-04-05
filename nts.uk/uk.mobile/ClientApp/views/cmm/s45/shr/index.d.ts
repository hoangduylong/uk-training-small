
export interface IApprovalPhase {
    approvalAtrName: string;
    approvalAtrValue: number;
    listApprovalFrame: Array<IApprovalFrame>;
    phaseOrder: number;
}

export interface IApprovalFrame {
    frameOrder: number;
    listApprover: Array<IApprover>;
}

export interface IApprover {
    approverID: string;
    approvalAtrName: string;
    approvalAtrValue: number;
    agentID: string;
    approverName: string;
    representerID: string;
    representerName: string;
    approvalDate: any;
    approvalReason: string;
    approverMail: string;
    representerMail: string;
    
}

export interface IAppInfo {
    id: string;
    appDate: Date;
    appType: number;
    appName: string;
    prePostAtr: number;
    reflectStatus: string;
    appStatusNo: number;
    frameStatus?: boolean;
    version?: number;
    opComplementLeaveApp?: any;
    opAppStartDate?: Date;
    opAppEndDate?: Date;
}

export interface AppListExtractConditionDto {
    //期間開始日付
    startDate: string;
    //期間終了日付
    endDate: string;
    //申請一覧区分
    appListAtr: number;
    //申請種類
    appType: number;
    //承認状況＿未承認
    unapprovalStatus: boolean;
    //承認状況＿承認済
    approvalStatus: boolean;
    //承認状況＿否認
    denialStatus: boolean;
    //承認状況＿代行承認済
    agentApprovalStatus: boolean;
    //承認状況＿差戻
    remandStatus: boolean;
    //承認状況＿取消
    cancelStatus: boolean;
    //申請表示対象
    appDisplayAtr: number;
    //社員IDリスト
    listEmployeeId: Array<string>;
    //社員絞込条件
    empRefineCondition: string;
}

export interface AppDetailScreenInfo {
    application: any;
    approvalLst: Array<IApprovalPhase>;
    authorComment: string;
    user: number;
    reflectPlanState: number;
    outputMode: number;
    authorizableFlags: boolean;
    approvalATR: number;
    alternateExpiration: boolean;
    pastApp: boolean;
}

