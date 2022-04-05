import { Vue, _ } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { ApprovedComponent } from '@app/components';
import { IApprovalPhase, AppDetailScreenInfo } from 'views/cmm/s45/shr/index.d';
import { Phase } from 'views/cmm/s45/shr/index';
import { CmmS45EComponent } from 'views/cmm/s45/e';
import { CmmS45FComponent } from 'views/cmm/s45/f';
import { AppType, AppTypeName } from 'views/kaf/s00/shr';

import {
    CmmS45ComponentsApp2Component,
    CmmS45ComponentsApp3Component,
    CmmS45ComponentsApp4Component,
    CmmS45ComponentsApp5Component,
    CmmS45ShrComponentsApp7Component,
    CmmS45ShrComponentsApp0Component,
    CmmS45ShrComponentsApp15Component,
    CmmS45ShrComponentsApp10Component,
    CmmS45ShrComponentsApp6Component,
    CmmS45ShrComponentsApp8Component,
    CmmS45ComponentsApp9Component,
    Reason,
} from 'views/cmm/s45/shr/components';
import { CmmS45ShrComponentsApp1Component } from 'views/cmm/s45/shr/components/app1/index';
@component({
    name: 'cmms45d',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {
        memo: {
            constraint: 'ApproverReason'
        }
    },
    constraints: ['nts.uk.ctx.at.request.dom.application.ApproverReason'],
    components: {
        // khai báo virtual tag name
        'approved': ApprovedComponent,
        'app2': CmmS45ComponentsApp2Component,
        'app3': CmmS45ComponentsApp3Component,
        'app4': CmmS45ComponentsApp4Component,
        'app5': CmmS45ComponentsApp5Component,
        'app7': CmmS45ShrComponentsApp7Component,
        'app8': CmmS45ShrComponentsApp8Component,
        'app9': CmmS45ComponentsApp9Component,
        'app0': CmmS45ShrComponentsApp0Component,
        'app15': CmmS45ShrComponentsApp15Component,
        'app1': CmmS45ShrComponentsApp1Component,
        'app10': CmmS45ShrComponentsApp10Component,
        'app6': CmmS45ShrComponentsApp6Component,
        'cmms45e': CmmS45EComponent,
        'cmms45f': CmmS45FComponent
    }
})
export class CmmS45DComponent extends Vue {
    @Prop({ default: () => ({ listAppMeta: [], currentApp: '' }) })
    public readonly params: { listAppMeta: Array<string>, currentApp: string };
    public title: string = 'CmmS45D';
    public showApproval: boolean = false;
    public appCount: number = 0;
    public selected: number = 0;
    public listAppMeta: Array<string> = [];
    public currentApp: string = '';
    // 承認ルートインスタンス
    public phaseLst: Array<Phase> = [];
    public appState: { 
        appStatus: number, 
        reflectStatus: number, 
        version: number,
        authorizableFlags: boolean,
        approvalATR: number,
        alternateExpiration: boolean,
        pastApp: boolean
    } = { appStatus: 0, reflectStatus: 1, version: 0, authorizableFlags: false, approvalATR: 0, alternateExpiration: false, pastApp: false };
    public authorComment: string = '';
    public appType: number = 99;
    public appTransferData: any = {
        appDispInfoStartupOutput: null,
        appDetail: null
    };
    // 差し戻し理由
    public reversionReason: string = '';

    public memo: string = '';
    public commentDis: boolean = false;
    public commentColor: string = '';
    public isLoadingComplete = false;
    public reasons: Array<Reason> = null;

    public opAppStartDate: Date;
    public opAppEndDate: Date;

    public created() {
        let self = this;
        self.listAppMeta = self.params.listAppMeta;
        self.currentApp = self.params.currentApp;
        self.appCount = _.indexOf(self.listAppMeta, self.currentApp);
        Object.defineProperty(self.appState, 'getName', {
            get() {
                switch (this.appStatus) {
                    case ReflectedState.NOTREFLECTED: return 'CMMS45_7'; // 反映状態 = 未反映
                    case ReflectedState.WAITREFLECTION: return 'CMMS45_8'; // 反映状態 = 反映待ち
                    case ReflectedState.REFLECTED: return 'CMMS45_9'; // 反映状態 = 反映済
                    case ReflectedState.CANCELED: return 'CMMS45_10'; // 反映状態 = 取消済
                    case ReflectedState.REMAND: return 'CMMS45_36'; // 反映状態 = 差し戻し
                    case ReflectedState.DENIAL: return 'CMMS45_11'; // 反映状態 = 否認
                    default: break;
                }
            }
        });
        
        Object.defineProperty(self.appState, 'getClass', {
            get() {
                switch (this.appStatus) {
                    case ReflectedState.NOTREFLECTED: return 'apply-unapproved'; // 反映状態 = 未反映
                    case ReflectedState.WAITREFLECTION: return 'apply-approved'; // 反映状態 = 反映待ち
                    case ReflectedState.REFLECTED: return 'apply-reflected'; // 反映状態 = 反映済
                    case ReflectedState.CANCELED: return 'apply-cancel'; // 反映状態 = 取消済
                    case ReflectedState.REMAND: return 'apply-return'; // 反映状態 = 差し戻し
                    case ReflectedState.DENIAL: return 'apply-denial'; // 反映状態 = 否認
                    default: break;
                }
            }
        });

        Object.defineProperty(self.appState, 'getNote', {
            get() {
                switch (this.appStatus) {
                    case ReflectedState.NOTREFLECTED: return 'CMMS45_39'; // 反映状態 = 未反映
                    case ReflectedState.WAITREFLECTION: return 'CMMS45_37'; // 反映状態 = 反映待ち
                    case ReflectedState.REFLECTED: return 'CMMS45_38'; // 反映状態 = 反映済
                    case ReflectedState.CANCELED: return 'CMMS45_42'; // 反映状態 = 取消済
                    case ReflectedState.REMAND: return 'CMMS45_40'; // 反映状態 = 差し戻し
                    case ReflectedState.DENIAL: return 'CMMS45_41'; // 反映状態 = 否認
                    default: break;
                }
            }
        });
    }

    public mounted() {
        let self = this;
        self.isLoadingComplete = false;
        self.$mask('show');
        self.initData();
    }
    public loadingComplete(reason?: any) {
        const self = this;
        self.reasons = reason;
        self.$nextTick(() => {
            self.$mask('hide');
            self.isLoadingComplete = true;
        });
        
    }
    // lấy dữ liệu ban đầu
    public initData() {
        let self = this;
        self.selected = 0;
        self.$http.post('at', API.getDetailMob, self.currentApp)
        .then((successData: any) => {
            self.appTransferData.appDispInfoStartupOutput = successData.data;
            let appDetailScreenInfoDto: AppDetailScreenInfo = successData.data.appDetailScreenInfo;
            self.createPhaseLst(appDetailScreenInfoDto.approvalLst);
            self.appState.appStatus = appDetailScreenInfoDto.reflectPlanState;
            self.appState.reflectStatus = appDetailScreenInfoDto.reflectPlanState;
            self.appState.version = appDetailScreenInfoDto.application.version;
            self.appState.authorizableFlags = appDetailScreenInfoDto.authorizableFlags;
            self.appState.approvalATR = appDetailScreenInfoDto.approvalATR;
            self.appState.alternateExpiration = appDetailScreenInfoDto.alternateExpiration;
            self.appState.pastApp = appDetailScreenInfoDto.pastApp;
            self.authorComment = appDetailScreenInfoDto.authorComment;
            self.reversionReason = appDetailScreenInfoDto.application.opReversionReason;
            self.appType = appDetailScreenInfoDto.application.appType;
            self.opAppStartDate = appDetailScreenInfoDto.application.opAppStartDate;
            self.opAppEndDate = appDetailScreenInfoDto.application.opAppEndDate;
            self.memo = '';
            if (!_.isEmpty(self.authorComment)) {
                self.commentDis = true ;
            } else {
                self.commentDis = false;
            }
            self.setCommentColor(self.phaseLst);




            // self.$mask('hide');
        }).catch((res: any) => {
            // self.$mask('hide');
            self.$modal.error(res.messageId)
                .then(() => {
                    self.back();
                });
        });
    }

    public setCommentColor(phaseLst: Array<Phase>) {
        const self = this;
        self.$auth.user.then((user) => {
            for (let phase of phaseLst) {
                let find = false;
                for (let frame of phase.listApprovalFrame) {
                    for (let approver of frame.listApprover) {
                        if (user.employeeId != approver.approverID) {
                            continue;
                        }
                        find = true;
                        if (approver.approvalAtrValue == ApprovalBehaviorAtr.DENIAL) {
                            self.commentColor = 'uk-bg-dark-salmon';
                        }
                        if (approver.approvalAtrValue == ApprovalBehaviorAtr.APPROVED) {
                            self.commentColor = 'uk-bg-alice-blue';
                        }
                        break;
                    }
                    if (find) {
                        break;    
                    }
                }
                if (find) {
                    break;    
                }
            }
        });    
    }

    // tạo dữ liệu người phê duyệt
    public createPhaseLst(listPhase: Array<IApprovalPhase>): void {
        let self = this;
        let phaseLstConvert: Array<Phase> = [];
        for (let i: number = 1; i <= 5; i++) {
            let containPhase: IApprovalPhase = _.find(listPhase, (phase: IApprovalPhase) => phase.phaseOrder == i);
            phaseLstConvert.push(new Phase(containPhase));
        }
        self.phaseLst = phaseLstConvert;
        self.selected = self.getSelectedPhase();
    }

    // lấy phase chỉ định 
    private getSelectedPhase(): number {
        let self = this;
        let denyPhase: Phase = _.find(self.phaseLst, (phase: Phase) => phase.approvalAtrValue == ApprovalBehaviorAtr.DENIAL);
        if (denyPhase) {
            return denyPhase.phaseOrder - 1;
        }
        let returnPhase: Phase = _.find(self.phaseLst, (phase: Phase) => phase.approvalAtrValue == ApprovalBehaviorAtr.REMAND);
        if (returnPhase) {
            return returnPhase.phaseOrder - 1;
        }
        let unapprovePhaseLst: Array<Phase> = _.filter(self.phaseLst, 
            (phase: Phase) => phase.approvalAtrValue == ApprovalBehaviorAtr.UNAPPROVED || phase.approvalAtrValue == ApprovalBehaviorAtr.ORIGINAL_REMAND);
        if (unapprovePhaseLst.length > 0) {
            return _.sortBy(unapprovePhaseLst, 'phaseOrder').reverse()[0].phaseOrder - 1;
        }
        let approvePhaseLst: Array<Phase> = _.filter(self.phaseLst, (phase: Phase) => phase.approvalAtrValue == ApprovalBehaviorAtr.APPROVED);
        if (approvePhaseLst.length > 0) {
            return _.sortBy(approvePhaseLst, 'phaseOrder')[0].phaseOrder - 1;
        }

        return 0;
    }

    // tiến tới đơn tiếp theo
    public toNextApp(): void {
        let self = this;
        self.$el.scrollTop = 0;
        self.showApproval = false;
        self.appCount++;
        self.currentApp = self.listAppMeta[self.appCount];
        self.reasons = null;
        self.isLoadingComplete = false;
        self.$mask('show');
        self.initData();
    }

    // quay về đơn trước
    public toPreviousApp(): void {
        let self = this;
        self.$el.scrollTop = 0;
        self.showApproval = false;
        self.appCount--;
        self.currentApp = self.listAppMeta[self.appCount];
        self.reasons = null;
        self.isLoadingComplete = false;
        self.$mask('show');
        self.initData();
    }

    // kiểm tra có phải đơn đầu tiên không
    public isFirstApp(): boolean {
        let self = this;

        return self.appCount == 0;
    }

    // kiểm tra có phải đơn cuối cùng không
    public isLastApp(): boolean {
        let self = this;

        return self.appCount == self.listAppMeta.length - 1;
    }

    // kiểm tra list đơn xin rỗng
    public isEmptyApp(): boolean {
        let self = this;

        return self.listAppMeta.length == 0;
    }

    // ẩn hiện người phê duyệt
    public reverseApproval(): void {
        let self = this;
        self.showApproval = !self.showApproval;
    }

    // quay về màn CMMS45B
    public back() {
        let self = this;
        if (self.$router.currentRoute.name == 'cmms45b') {
            self.$close();
        } else {
            self.$goto('cmms45b', { 'CMMS45_FromMenu': false });
        }
    }

    // kích hoạt nút giải phóng
    public releaseApp(): void {
        const self = this;
        self.$modal.confirm('Msg_248')
            .then((v) => {
                if (v == 'yes') {
                    self.$mask('show');
                    self.$http.post('at', API.release, self.appTransferData.appDispInfoStartupOutput)
                    .then((resRelease: any) => {
                        self.$mask('hide');
                        if (resRelease.data.processDone) {
                            self.reflectApp(resRelease.data.reflectAppId);
                            self.$modal.info('Msg_221').then(() => { self.initData(); });
                        }
                    }).catch((failRelease: any) => {
                        self.$mask('hide');
                        if (failRelease.messageId == 'Msg_197') {
                            self.$modal.error(failRelease.messageId)
                                .then(() => {
                                    self.initData();
                                });
                        } else {
                            self.$modal.error(failRelease.messageId)
                                .then(() => {
                                    self.back();
                                });
                        }
                    });              
                }
            });
    }

    // kích hoạt nút chấp nhận
    public approveApp(): void {
        const self = this;
        self.$modal.confirm('Msg_1549')
            .then((v) => {
                if (v == 'yes') {
                    self.$mask('show');
                    self.$http.post('at', API.approve, {
                        memo: self.memo,
                        appDispInfoStartupOutput: self.appTransferData.appDispInfoStartupOutput
                    }).then((resApprove: any) => {
                        self.$mask('hide');
                        if (resApprove.data.processDone) {
                            self.reflectApp(resApprove.data.reflectAppIdLst);
                            self.$modal('cmms45f', { 'action': 1, 'listAppMeta': self.listAppMeta, 'currentApp': self.currentApp })
                            .then((resAfterApprove: any) => {
                                self.controlDialog(resAfterApprove);        
                            }); 
                        }
                    }).catch((failApprove: any) => {
                        self.$mask('hide');
                        if (failApprove.messageId == 'Msg_197') {
                            self.$modal.error(failApprove.messageId)
                                .then(() => {
                                    self.initData();
                                });
                        } else {
                            self.$modal.error(failApprove.messageId)
                                .then(() => {
                                    self.back();
                                });
                        }
                    });            
                }
            });
    }

    // kích hoạt nút từ chối
    public denyApp(): void {
        const self = this;
        self.$modal.confirm('Msg_1550')
            .then((v) => {
                if (v == 'yes') {
                    self.$mask('show');
                    self.$http.post('at', API.deny, {
                        memo: self.memo,
                        appDispInfoStartupOutput: self.appTransferData.appDispInfoStartupOutput     
                    }).then((resDeny: any) => {
                        self.$mask('hide');
                        if (resDeny.data.processDone) {
                            self.reflectApp(resDeny.data.reflectAppId);
                            self.$modal('cmms45f', { 'action': 2, 'listAppMeta': self.listAppMeta, 'currentApp': self.currentApp })
                            .then((resAfterDeny: any) => {
                                self.controlDialog(resAfterDeny);   
                            });
                        }
                    }).catch((failDeny: any) => {
                        self.$mask('hide');
                        if (failDeny.messageId == 'Msg_197') {
                            self.$modal.error(failDeny.messageId)
                                .then(() => {
                                    self.initData();
                                });
                        } else {
                            self.$modal.error(failDeny.messageId)
                                .then(() => {
                                    self.back();
                                });
                        }
                    });           
                }
            });
    }

    // kích hoạt nút trả về
    public returnApp(): void {
        let self = this;
        self.$mask('show');
        self.$http.post('at', API.checkVersion, {
            appID: self.currentApp,
            version: self.appState.version
        }).then(() => {
            self.$mask('hide');
            self.$modal('cmms45e', {'listAppMeta': self.listAppMeta, 'currentApp': self.currentApp, 'version': self.appState.version })
            .then((resReturn: any) => {
                self.controlDialog(resReturn); 
            });
        }).catch((failVersionCheck: any) => {
            self.$mask('hide');
            if (failVersionCheck.messageId == 'Msg_197') {
                self.$modal.error(failVersionCheck.messageId)
                    .then(() => {
                        self.initData();
                    });
            } else {
                self.$modal.error(failVersionCheck.messageId)
                    .then(() => {
                        self.back();
                    });
            }
        });  
        
    }

    // xử lý sau khi từ màn F trở về
    public controlDialog(result: any): void {
        let self = this;
        if (result) {
            switch (result.destination) {
                case 1: self.$close(); break; // đến CMMS45B
                case 2: self.toNextApp(); break; // đến đơn tiếp theo
                case 3: self.initData(); break; // reload đơn hiện tại
                default: break;     
            }
        }
    }

    // phản ánh đơn xin sau khi chấp nhận, từ chối
    public reflectApp(reflectAppIdLst: Array<string>): void {
        let self = this;
        if (!_.isEmpty(reflectAppIdLst)) {
            self.$http.post('at', API.reflectApp, reflectAppIdLst);
        }
    }

    // lấy ID của đơn tiếp theo
    public getNextApp(): string {
        let self = this;
        
        return self.listAppMeta[self.appCount + 1];            
    }

    // kiểm tra có thể thay đổi không dựa vào trạng thái đơn
    public canChangeStatus(): boolean {
        let self = this;
        switch (self.appState.reflectStatus) {
            case ReflectedState.NOTREFLECTED: return true; // 反映状態 = 未反映
            case ReflectedState.WAITREFLECTION: return true; // 反映状態 = 反映待ち
            case ReflectedState.REFLECTED: return false; // 反映状態 = 反映済
            case ReflectedState.CANCELED: return false; // 反映状態 = 取消済
            case ReflectedState.REMAND: return true; // 反映状態 = 差し戻し
            case ReflectedState.DENIAL: return true; // 反映状態 = 否認
            case 99: return false; //
            default: break;
        }
    }

    // kiểm tra trạng thái của người login đối với đơn xin
    public isModify(): boolean {
        let self = this;
        switch (self.appState.approvalATR) {
            case ApprovalBehaviorAtr.UNAPPROVED: return false; // ログイン者の承認区分 = 未承認
            case ApprovalBehaviorAtr.APPROVED: return true; // ログイン者の承認区分 = 承認済
            case ApprovalBehaviorAtr.DENIAL: return true; // ログイン者の承認区分 = 否認
            default: break;  
        }
    }

    // hiển thị lý do approve
    public displayApproveReasonContent(): boolean {
        let self = this;
        if (self.canChangeStatus() && self.appState.authorizableFlags && !self.appState.alternateExpiration) {
            return self.isModify();
        }

        return !self.isModify();
    }

    // hiển thị ô nhập lý do approve
    public displayApproveReasonInput(): boolean {
        let self = this;

        const {appState} = self;
        if (appState.pastApp) {

            return false;
        }
        if (self.canChangeStatus() && self.appState.authorizableFlags && !self.appState.alternateExpiration) {
            return !self.isModify();
        }

        return false;
    }

    // hiển thị nút giải phóng
    public displayReleaseLock(): boolean {
        let self = this;

        const {appState} = self;
        if (appState.pastApp) {

            return false;
        }
        if (self.canChangeStatus() && self.appState.authorizableFlags) {
            return self.isModify();
        }

        return false;
    }

    // hiển thị nút chấp nhận, từ chối, trả về
    public displayReleaseOpen(): boolean {
        let self = this;

        const {appState} = self;
        if (appState.pastApp) {

            return false;
        }
        if (self.canChangeStatus() && self.appState.authorizableFlags && !self.appState.alternateExpiration) {
            return !self.isModify();
        }

        return false;
    }

    get displayCancelLabel() {
        const vm = this;

        return vm.appState.reflectStatus == ReflectedState.CANCELED;
    }

    get applicant() {
        const vm = this;
        if (!vm.appTransferData.appDispInfoStartupOutput) {
            return '';
        }
        let applicantID = vm.appTransferData.appDispInfoStartupOutput.appDetailScreenInfo.application.employeeID,
            employeeInfoLst = vm.appTransferData.appDispInfoStartupOutput.appDispInfoNoDateOutput.employeeInfoLst,
            empInfo = _.find(employeeInfoLst, (o: any) => o.sid == applicantID);
        if (empInfo) {
            return empInfo.bussinessName;
        }

        return '';
    }

    get representerDisp() {
        const vm = this;
        if (!vm.appTransferData.appDispInfoStartupOutput) {
            return false;
        }
        let employeeID = vm.appTransferData.appDispInfoStartupOutput.appDetailScreenInfo.application.employeeID,
            enteredPerson = vm.appTransferData.appDispInfoStartupOutput.appDetailScreenInfo.application.enteredPerson;
        if (employeeID == enteredPerson) {
            return false;
        } else {
            return true;
        } 
    }

    get representer() {
        const vm = this;
        if (!vm.appTransferData.appDispInfoStartupOutput) {
            return false;
        }
        if (vm.representerDisp) {
            return vm.appTransferData.appDispInfoStartupOutput.appDispInfoNoDateOutput.opEmployeeInfo.bussinessName;      
        }

        return '';
    }

    get appDate() {
        const vm = this;
        if (!vm.appTransferData.appDispInfoStartupOutput) {
            return '';
        }
        let appDate = vm.appTransferData.appDispInfoStartupOutput.appDetailScreenInfo.application.appDate;

        return vm.$dt(new Date(appDate), 'YYYY/MM/DD(dd)');
    }

    get appTypeName() {
        const vm = this;
        if (!vm.appTransferData.appDispInfoStartupOutput) {
            return '';
        }
        switch (vm.appTransferData.appDispInfoStartupOutput.appDetailScreenInfo.application.appType) {
            case AppType.OVER_TIME_APPLICATION:
                return AppTypeName.OVER_TIME_APPLICATION;
                break;
            case AppType.ABSENCE_APPLICATION:
                return AppTypeName.ABSENCE_APPLICATION;
                break;
            case AppType.WORK_CHANGE_APPLICATION:
                return AppTypeName.WORK_CHANGE_APPLICATION;
                break;
            case AppType.BUSINESS_TRIP_APPLICATION:
                return AppTypeName.BUSINESS_TRIP_APPLICATION;
                break;
            case AppType.GO_RETURN_DIRECTLY_APPLICATION:
                return AppTypeName.GO_RETURN_DIRECTLY_APPLICATION;
                break;
            case AppType.LEAVE_TIME_APPLICATION:
                return AppTypeName.LEAVE_TIME_APPLICATION;
                break;
            case AppType.STAMP_APPLICATION:
                return AppTypeName.STAMP_APPLICATION;
                break;
            case AppType.ANNUAL_HOLIDAY_APPLICATION:
                return AppTypeName.ANNUAL_HOLIDAY_APPLICATION;
                break;
            case AppType.EARLY_LEAVE_CANCEL_APPLICATION:
                return AppTypeName.EARLY_LEAVE_CANCEL_APPLICATION;
                break;
            case AppType.COMPLEMENT_LEAVE_APPLICATION:
                return AppTypeName.COMPLEMENT_LEAVE_APPLICATION;
                break;
            case AppType.OPTIONAL_ITEM_APPLICATION:
                return AppTypeName.OPTIONAL_ITEM_APPLICATION;
                break;
            default: 
                return '';
                break;
        }
    }

    get prePost() {
        const vm = this;
        if (!vm.appTransferData.appDispInfoStartupOutput) {
            return '';
        }
        let prePostResource = [{
            code: 0,
            text: 'KAFS00_10'
        }, {
            code: 1,
            text: 'KAFS00_11'
        }];

        return _.find(prePostResource, (o: any) => o.code == vm.appTransferData.appDispInfoStartupOutput.appDetailScreenInfo.application.prePostAtr).text;
    }

    get inputDate() {
        const vm = this;
        if (!vm.appTransferData.appDispInfoStartupOutput) {
            return '';
        }
        let appDate = vm.appTransferData.appDispInfoStartupOutput.appDetailScreenInfo.application.inputDate;

        return vm.$dt(new Date(appDate), 'YYYY/MM/DD HH:mm'); 
    }

    get comboReasonDisp() {
        const vm = this;
        if (!vm.appTransferData.appDispInfoStartupOutput) {
            return false;
        }

        return vm.appTransferData.appDispInfoStartupOutput.appDispInfoNoDateOutput.displayStandardReason == 0 ? false : true;
    }

    get textReasonDisp() {
        const vm = this;
        if (!vm.appTransferData.appDispInfoStartupOutput) {
            return false;
        }

        return vm.appTransferData.appDispInfoStartupOutput.appDispInfoNoDateOutput.displayAppReason == 0 ? false : true;
    }

    get comboReason() {
        const vm = this;
        if (!vm.appTransferData.appDispInfoStartupOutput) {
            return '';
        }
        let dropdownList = vm.appTransferData.appDispInfoStartupOutput.appDispInfoNoDateOutput.reasonTypeItemLst,
            opComboReason = _.find(dropdownList, (o: any) => {
            return o.appStandardReasonCD == vm.appTransferData.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppStandardReasonCD;
        });
        if (opComboReason) {
            return opComboReason.reasonForFixedForm;
        }
        if (_.isEmpty(vm.appTransferData.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppStandardReasonCD)) {
            return '';
        }

        return vm.appTransferData.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppStandardReasonCD + ' ' + vm.$i18n('CMMS45_87');
    }

    get textReason() {
        const vm = this;
        if (!vm.appTransferData.appDispInfoStartupOutput) {
            return '';
        }

        return _.escape(vm.appTransferData.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppReason).replace(/\n/g, '<br/>');
    }
}

export enum ReflectedState {
    NOTREFLECTED = 0, // 未反映
    WAITREFLECTION = 1, // 反映待ち
    REFLECTED = 2, // 反映済
    CANCELED = 3, // 取消済
    REMAND = 4, // 差し戻し
    DENIAL = 5 // 否認
}

export enum ApprovalBehaviorAtr {
    UNAPPROVED = 0, // 未承認
    APPROVED = 1, // 承認済
    DENIAL = 2, // 否認
    REMAND = 3, // 差し戻し
    ORIGINAL_REMAND = 4 // 本人差し戻し
}

const API = {
    getDetailMob: 'at/request/app/smartphone/getDetailMob',
    approve: 'at/request/application/approveapp',
    deny: 'at/request/application/denyapp',
    release: 'at/request/application/releaseapp',
    reflectApp: 'at/request/application/reflect-app',
    checkVersion: 'at/request/application/checkVersion'
};