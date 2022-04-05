
import { IAppInfo, IApprovalPhase, IApprovalFrame } from './index.d';


export class AppInfo {
    public id: string;
    public appDate: Date;
    public appName: string;
    public appType: number;
    public prePostAtr: number;
    public reflectStatus: string;
    public appStatusNo: number;
    public frameStatus: boolean;
    public version: number;
    public opComplementLeaveApp: any;
    public opAppStartDate: Date;
    public opAppEndDate: Date;


    constructor(params: IAppInfo) {
        this.id = params.id;
        this.appDate = params.appDate;
        this.appType = params.appType;
        this.appName = params.appName;
        this.prePostAtr = params.prePostAtr;
        this.reflectStatus = params.reflectStatus;
        this.appStatusNo = params.appStatusNo;
        this.frameStatus = params.frameStatus ? params.frameStatus : false;
        this.version = params.version ? params.version : 0;
        this.opComplementLeaveApp = params.opComplementLeaveApp;
        this.opAppStartDate = params.opAppStartDate;
        this.opAppEndDate = params.opAppEndDate;
    }

    
    get prePostName() {
        return this.prePostAtr == 0 ? '事前' : '事後';
    }

    get linkAppDateCss() {
        let a: number = new Date(this.opComplementLeaveApp.linkAppDate).getDay();

        return a == 6 ? 'uk-text-saturday' : a == 0 ? 'uk-text-sunday' : '';
    }

    get opAppStartDateCss() {
        let a: number = new Date(this.opAppStartDate).getDay();

        return a == 6 ? 'uk-text-saturday' : a == 0 ? 'uk-text-sunday' : '';
    }

    get opAppEndDateCss() {
        let a: number = new Date(this.opAppEndDate).getDay();

        return a == 6 ? 'uk-text-saturday' : a == 0 ? 'uk-text-sunday' : '';
    }

    get appDateCss() {
        let a: number = new Date(this.appDate).getDay();

        return a == 6 ? 'uk-text-saturday' : a == 0 ? 'uk-text-sunday' : '';
    }

    //fill color in 承認状況　－　申請モード
    get reflectCss() {
        switch (this.appStatusNo) {
            case 0:
                return 'uk-apply-unapproved';//下書き保存/未反映　=　未
            case 1:
                return 'uk-apply-approved';//反映待ち　＝　承認済み
            case 2:
                return 'uk-apply-reflected';//反映済　＝　反映済み
            case 5:
                return 'uk-apply-return';//差し戻し　＝　差戻
            case 6:
                return 'uk-apply-denial';//否認　=　否
            default:
                return 'uk-apply-cancel';//取消待ち/取消済　＝　取消
        }
    }
    //fill color in 承認状況　－ 承認モード
    get reflectCssAppr() {
        switch (this.appStatusNo) {
            case 5:
                return 'uk-apply-unapproved';//下書き保存/未反映　=　未
            case 4:
                return 'uk-apply-approved';//反映待ち　＝　承認済み
            case 3:
                return 'uk-apply-cancel';//取消待ち/取消済　＝　取消
            case 2:
                return 'uk-apply-return';//差し戻し　＝　差戻
            case 1:
                return 'uk-apply-denial';//否認　=　否
            case 0:
                return 'uk-apply-reflected';    
            default:
                return '';
        }
    }
}

export class Phase {
    public approvalAtrName: string = '';
    public approvalAtrValue: number = -1;
    public listApprovalFrame: Array<IApprovalFrame> = [];
    public phaseOrder: number = -1;

    constructor(params: IApprovalPhase) {
        Object.assign(this, params);
    }

    get isExist() {
        return this.phaseOrder > 0;
    }

    get className() {
        switch (this.approvalAtrValue) {
            case 0: // 承認区分 = 未承認
                return 'apply-unapproved';
            case 1: // 承認区分 = 承認済
                return 'apply-approved';
            case 2: // 承認区分 = 否認
                return 'apply-denial';
            case 3: // 承認区分 = 差し戻し
                return 'apply-return';
            case 4: // 承認区分 = 本人差し戻し
                return 'apply-unapproved';
            default:
                return 'uk-bg-light-gray';
        }
    }

    get phaseText() {
        switch (this.approvalAtrValue) {
            case 0: // 承認区分 = 未承認
                return 'CMMS45_48';
            case 1: // 承認区分 = 承認済
                return 'CMMS45_49';
            case 2: // 承認区分 = 否認
                return 'CMMS45_50';
            case 3: // 承認区分 = 差し戻し
                return 'CMMS45_51';
            case 4: // 承認区分 = 本人差し戻し
                return 'CMMS45_48';
            default:
                return '';
        }
    }

    get infoLabel() {
        switch (this.approvalAtrValue) {
            case 0: // 承認区分 = 未承認
                return 'CMMS45_44';
            case 1: // 承認区分 = 承認済
                return 'CMMS45_43';
            case 2: // 承認区分 = 否認
                return 'CMMS45_46';
            case 3: // 承認区分 = 差し戻し
                return 'CMMS45_45';
            case 4: // 承認区分 = 本人差し戻し
                return 'CMMS45_44';
            default:
                return '';
        }
    }
}