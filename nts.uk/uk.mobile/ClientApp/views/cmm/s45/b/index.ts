import { Vue, _ } from '@app/provider';
import { component, Prop, Watch } from '@app/core/component';

import { AppInfo } from '../shr';
import { AppListExtractConditionDto } from '../shr/index.d';
import { AppListExtractCondition, ApplicationListDtoMobile, ListOfApplication, ListOfAppTypes, Mode } from '../a/index';

import { TotopComponent } from '@app/components/totop';
import { storage } from '@app/utils';
import { CmmS45DComponent } from '../d/index';
import { CmmS45EComponent } from '../e/index';

@component({
    name: 'cmms45b',
    route: '/cmm/s45/b',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {
        dateRange: {
            required: true,
            dateRange: true
        },
        selectedValue: {
            required: true
        },
        checkeds: {
            self: {
                test(value: any[]) {
                    return !!value.length;
                },
                messageId: 'Msg_360'
            }
        }
    },
    constraints: [],
    components: {
        'to-top': TotopComponent,
        'cmms45d': CmmS45DComponent,
        'cmms45e': CmmS45EComponent
    }
})

export class CmmS45BComponent extends Vue {
    @Prop({ default: () => ({ CMMS45_FromMenu: true }) })
    public readonly params: { CMMS45_FromMenu: boolean };
    public dateRange: { start?: Date, end?: Date } = { start: null, end: null };//期間
    public checkeds: Array<number> = [1, 5];//未承認: 1, 承認済み: 2, 否認: 3, 代行承認済み: 4, 差戻: 5, 取消: 6
    public selectedValue: string = '-1';//選択した申請種類
    public lstAppType: Array<{ code: string, appType: number; appName: string; }> = [];
    public lstAppByEmp: Array<AppByEmp> = [];
    public modeAppr: boolean = false;
    // public prFilter: AppListExtractConditionDto = null;//抽出条件
    public lstAppr: Array<string> = [];
    // public lstMasterInfo: Array<any> = [];
    // public isDisPreP: number = 0;//申請表示設定.事前事後区分
    public disableB24: boolean = false;
    public displayB513: number = 0;
    public appAllNumber: number = 0;
    public appPerNumber: number = 0;
    public appListExtractCondition: AppListExtractCondition;
    public data: ApplicationListDtoMobile;

    //Refactor4
    public appStatus: ApplicationStatus;
    public arrayAppType = [2, 3, 4, 7, 9, 15, 0, 6, 10, 1, 8];

    @Watch('modeAppr')
    public checkChangeMode(mode: boolean) {
        if (!mode) {
            this.lstAppr = [];
        }
    }

    public mounted() {
        const self = this;
        self.pgName = 'cmms45b';
        self.getData(!this.params.CMMS45_FromMenu, false);


    }
    // click button 抽出実行
    private filterAppr() {
        let self = this;
        self.$validate();
        if (self.$valid) {
            self.getData(true, false);
        }
    }

    public created() {
        const self = this;
        self.$watch('selectedValue', (newV, oldV) => {
            // if (!_.isEmpty(self.lstApp)) {
            //     if (newV == oldV) {

            //         return;
            //     }
            //     self.filterApp();
            // }
            if (newV == oldV) {

                return;
            }
            self.filterApp();
        });
    }

    public filterApp() {
        const self = this;
        self.getData(true, true);
    }
    // 未承認のチェック：する　or　しない
    private checkUnapprovalStatus() {
        return _.filter(this.checkeds, (c) => c == 1).length > 0 ? true : false;
    }
    // 承認のチェック：する　or　しない
    private checkApprovalStatus() {
        return _.filter(this.checkeds, (c) => c == 2).length > 0 ? true : false;
    }
    // 否認のチェック：する　or　しない
    private checkDenialStatus() {
        return _.filter(this.checkeds, (c) => c == 3).length > 0 ? true : false;
    }
    // 代行者が承認済のチェック：する　or　しない
    private checkAgentApprovalStatus() {
        return _.filter(this.checkeds, (c) => c == 4).length > 0 ? true : false;
    }
    // 差戻のチェック：する　or　しない
    private checkRemandStatus() {
        return _.filter(this.checkeds, (c) => c == 5).length > 0 ? true : false;
    }
    // 取消のチェック：する　or　しない
    private checkCancelStatus() {
        return _.filter(this.checkeds, (c) => c == 6).length > 0 ? true : false;
    }

    //データを取る
    private getData(getCache: boolean, filter: boolean) {
        let self = this;
        // check: キャッシュを取るか？
        if (filter) {
            // self.prFilter = {
            //     startDate: self.$dt.date(self.dateRange.start, 'YYYY/MM/DD'),
            //     endDate: self.$dt.date(self.dateRange.end, 'YYYY/MM/DD'),
            //     appListAtr: 1,
            //     appType: Number(self.selectedValue),
            //     unapprovalStatus: self.checkUnapprovalStatus(),
            //     approvalStatus: self.checkApprovalStatus(),
            //     denialStatus: self.checkDenialStatus(),
            //     agentApprovalStatus: self.checkAgentApprovalStatus(),
            //     remandStatus: self.checkRemandStatus(),
            //     cancelStatus: self.checkCancelStatus(),
            //     appDisplayAtr: 0,
            //     listEmployeeId: [],
            //     empRefineCondition: ''
            // } as AppListExtractConditionDto;
            // self.convertAppInfo(self.data.appListInfoDto);
            self.convertAppInfo(self.data);
        } else if (getCache && storage.local.hasItem('CMMS45_AppListExtractConditionNew')) {
            self.$mask('show');
            self.appListExtractCondition.periodStartDate = self.$dt.date(self.dateRange.start, 'YYYY/MM/DD');
            self.appListExtractCondition.periodEndDate = self.$dt.date(self.dateRange.end, 'YYYY/MM/DD');
            let filterByCondition = self.data.appListExtractConditionDto;
            filterByCondition.opApprovalStatus = self.checkApprovalStatus();
            filterByCondition.opCancelStatus = self.checkCancelStatus();
            filterByCondition.opDenialStatus = self.checkDenialStatus();
            filterByCondition.opRemandStatus = self.checkRemandStatus();
            filterByCondition.opUnapprovalStatus = self.checkUnapprovalStatus();
            filterByCondition.opAgentApprovalStatus = self.checkAgentApprovalStatus();

            let paramCmd = {
                appAllNumber: self.data.appAllNumber,
                appPerNumber: self.data.appPerNumber,
                appListExtractCondition: self.data.appListExtractConditionDto,
                appListInfo: self.data.appListInfoDto
            };
            self.$http.post('at', servicePath.filterByDate, { applicationListCmdMobile: paramCmd })
                .then((res: any) => {
                    self.$mask('hide');
                    // let data = res.data as ApplicationListDtoMobile;
                    self.appListExtractCondition = res.data.appListExtractConditionDto;
                    self.data = res.data;

                    storage.local.setItem('CMMS45_AppListExtractConditionNew', self.appListExtractCondition);
                    self.dateRange = { start: self.$dt.fromUTCString(self.appListExtractCondition.periodStartDate, 'YYYY/MM/DD'), end: self.$dt.fromUTCString(self.appListExtractCondition.periodEndDate, 'YYYY/MM/DD') };
                    // self.isDisPreP = 
                    let selectedTemp = self.selectedValue;
                    self.selectedValue = '-1';
                    self.convertAppInfo(self.data);
                    self.createLstAppType(self.data.appListExtractConditionDto.opListOfAppTypes);
                    self.$nextTick(() => {
                        if (_.find(self.lstAppType, (i: any) => i.code == selectedTemp)) {
                            self.selectedValue = selectedTemp;
                        } else {
                            self.selectedValue = '-1';
                        }
                    });
                    // self.disableB24 = data.appStatusCount.unApprovalNumber == 0 ? true : false;
                    self.disableB24 = !self.isEmptyApprovalList();
                }).catch(() => {
                    self.$mask('hide');
                });

        } else {
            // self.prFilter = {
            //     startDate: self.dateRange.start == null ? '' : self.$dt.date(self.dateRange.start, 'YYYY/MM/DD'),
            //     endDate: self.dateRange.end == null ? '' : self.$dt.date(self.dateRange.end, 'YYYY/MM/DD'),
            //     appListAtr: 1,
            //     appType: -1,
            //     unapprovalStatus: true,
            //     approvalStatus: false,
            //     denialStatus: false,
            //     agentApprovalStatus: false,
            //     remandStatus: true,
            //     cancelStatus: false,
            //     appDisplayAtr: 0,
            //     listEmployeeId: [],
            //     empRefineCondition: ''
            // } as AppListExtractConditionDto;
            self.appListExtractCondition = {
                // 申請一覧区分
                // 0: application , 1: approval
                appListAtr: Mode.APPROVAL,
                // 表の幅登録
                tableWidthRegis: false,
                // 事前出力
                preOutput: true,
                // 事後出力
                postOutput: true,
                // 申請表示順
                appDisplayOrder: 0,
                // 期間開始日
                periodStartDate: self.dateRange.start == null ? '' : self.$dt.date(self.dateRange.start, 'YYYY/MM/DD'),
                // 期間終了日
                periodEndDate: self.dateRange.end == null ? '' : self.$dt.date(self.dateRange.end, 'YYYY/MM/DD'),
                // 申請種類
                opAppTypeLst: [],

                // 申請種類リスト
                opListOfAppTypes: [],
                // 社員IDリスト
                opListEmployeeID: null,
                // 承認状況＿未承認
                opUnapprovalStatus: true,
                // 承認状況＿承認済
                opApprovalStatus: false,
                // 承認状況＿否認
                opDenialStatus: false,
                // 承認状況＿代行者承認済 false
                opAgentApprovalStatus: false,
                // 承認状況＿差戻
                opRemandStatus: true,
                // 承認状況＿取消
                opCancelStatus: false

            } as AppListExtractCondition;

            self.$mask('show');
            self.$http.post('at', servicePath.getAppNameInAppList).then((res: any) => {
                if (res) {
                    if (_.isEmpty(self.appListExtractCondition.opListOfAppTypes)) {
                        self.appListExtractCondition.opListOfAppTypes = res.data;       
                    }

                    let paramNew = {
                            listAppType: self.arrayAppType,
                            listOfAppTypes: res.data,
                            appListExtractCondition: self.appListExtractCondition
                    };
                    
                    return self.$http.post('at', servicePath.getApplicationList, paramNew);
                }

            }).then((res: any) => {
                self.$mask('hide');
                self.appListExtractCondition = res.data.appListExtractConditionDto;
                self.data = res.data;

                storage.local.setItem('CMMS45_AppListExtractConditionNew', self.appListExtractCondition);
                self.dateRange = { start: self.$dt.fromUTCString(self.appListExtractCondition.periodStartDate, 'YYYY/MM/DD'), end: self.$dt.fromUTCString(self.appListExtractCondition.periodEndDate, 'YYYY/MM/DD') };
                self.convertAppInfo(self.data);
                self.createLstAppType(self.data.appListExtractConditionDto.opListOfAppTypes);
                self.disableB24 = !self.isEmptyApprovalList();

            }).catch(() => {
                self.$mask('hide');
            });
        }

        // let param = {
        //     condition: self.prFilter,//申請一覧抽出条件
        //     spr: false,//sprから呼ぶか？
        //     extractCondition: 0,
        //     device: 1,//デバイス：PC = 0 or スマートフォン = 1
        //     lstAppType: [0]//対象申請種類List
        // };
        // サービスを呼ぶ
        // self.$http.post('at', servicePath.getApplicationList, param).then((result: { data: any }) => {
        //     self.$mask('hide');
        //     let data = result.data;
        //     self.prFilter.startDate = data.startDate;
        //     self.prFilter.endDate = data.endDate;
        //     self.lstMasterInfo = data.lstMasterInfo;
        //     // キャッシュを変更する
        //     storage.local.setItem('CMMS45_AppListExtractCondition', self.prFilter);

        //     self.createLstAppType(data.lstAppInfor);
        //     self.convertAppInfo(data);
        //     self.dateRange = { start: self.$dt.fromUTCString(data.startDate, 'YYYY/MM/DD'), end: self.$dt.fromUTCString(data.endDate, 'YYYY/MM/DD') };
        //     self.isDisPreP = data.isDisPreP;
        //     self.disableB24 = data.appStatusCount.unApprovalNumber == 0 ? true : false;
        // }).catch(() => {
        //     self.$mask('hide');
        // });




    }
    public isEmptyApprovalList() {
        const self = this;
        let unApprovedLst = [];
        _.forEach(self.lstAppByEmp, (x: AppByEmp) => {
            let unApprovedSubLst = _.filter(x.lstApp, (o) => o.appStatusNo == 5);
            _.forEach(unApprovedSubLst, (item) => {
                unApprovedLst.push(item);
            });
        });
        if (_.isEmpty(unApprovedLst)) {
            return false;
        }
        
        return true;
    }

    public getHtmlPer() {
        return `<div>` + this.$i18n('CMMS45_91', this.appPerNumber.toString()).replace(/\n/g, '<br />') + `</div>`;
    }
    public getHtmlAll() {
        return `<div>` + this.$i18n('CMMS45_90', this.appAllNumber.toString()).replace(/\n/g, '<br />') + `</div>`;
    }
    public getHtmlNone() {
        return `<div>` + this.$i18n('CMMS45_89').replace(/\n/g, '<br />') + `</div>`;
    }

    // convert Application info
    private convertAppInfo(data: ApplicationListDtoMobile) {
        let self = this;
        self.lstAppByEmp = [];
        data.appListInfoDto.appLst = _.filter(data.appListInfoDto.appLst, (i: ListOfApplication) => self.arrayAppType.indexOf(i.appType) >= 0);
        if (data.appListInfoDto.appLst.length == 0) {
            self.displayB513 = 1;
        } else if (data.appListInfoDto.appLst.length > data.appAllNumber) {
            self.displayB513 = 2;
        } else {
            self.displayB513 = 0;
        }
        self.appPerNumber = data.appPerNumber;
        self.appAllNumber = data.appAllNumber;
        let lstSCD = _.uniqBy(data.appListInfoDto.appLst, (o: any) => o.applicantCD);
        lstSCD.forEach((o) => {

            let appInfor = _.filter(data.appListInfoDto.appLst, (i: ListOfApplication) => i.applicantCD == o.applicantCD && (self.selectedValue == '-1' || (!_.isNil(i.opAppTypeDisplay) ? (String(i.appType) + '_' + String(i.opAppTypeDisplay) == self.selectedValue) : String(i.appType) == self.selectedValue)));
            if (!_.isEmpty(self.convertLstApp(appInfor))) {
                self.lstAppByEmp.push(new AppByEmp({
                    empCD: o.applicantCD,
                    empName: o.applicantName,
                    lstApp: self.convertLstApp(appInfor),
                    displayB52: appInfor.length > data.appPerNumber,
                    appPerNumber: data.appPerNumber
                }));
            }
        });
        // count applicaiton
        let count = 0;
        _.forEach(self.lstAppByEmp, (e: AppByEmp) => {
            _.forEach(e, (i: any) => {
                count++;
            });
        });
        self.lstAppByEmp = _.orderBy(self.lstAppByEmp, ['empCD'],['asc']);
        if (count == 0) {
            self.displayB513 = 1;
        } else if (count > data.appAllNumber) {
            self.displayB513 = 2;
        } else {
            self.displayB513 = 0;
        }
    }


    // private getLstApp(appLst: ListOfApplication, sCD: string) {
    //     let self = this;
    //     let lstResult = [];
    //     let lstObj = _.filter(data.lstMasterInfo, (c) => c.empSD == sCD).map((x) => {
    //         return { id: x.appID, name: x.empName };
    //     });
    //     appLst.lstApp.forEach((app) => {
    //         if (self.contains(lstObj, app.applicationID)) {
    //             lstResult.push(app);
    //         }
    //     });

    //     return lstResult;
    // }

    private contains(lst: Array<any>, id: any) {
        return _.find(lst, (c) => c.id == id) != undefined ? true : false;
    }

    private convertLstApp(lstApp: Array<ListOfApplication>) {
        const self = this;
        let lst = [];
        lstApp.forEach((app: any) => {
            if (self.arrayAppType.indexOf(app.appType) >= 0) {
                lst.push(new AppInfo({
                    id: app.appID,
                    appDate: self.$dt.fromUTCString(app.appDate, 'YYYY/MM/DD'),
                    appType: app.appType,
                    appName: self.appTypeName(app.appType, app.opAppTypeDisplay),
                    prePostAtr: app.prePostAtr,
                    reflectStatus: app.reflectionStatus,
                    appStatusNo: self.convertReflectToInt(app.reflectionStatus),
                    frameStatus: null,//this.getFrameStatus(app.appID),
                    version: null,
                    opComplementLeaveApp: app.opComplementLeaveApp,
                    opAppStartDate: app.opAppStartDate,
                    opAppEndDate: app.opAppEndDate
                    
                }));
            }
        });

        return lst;
    }

    public isLinkApp(opComplementLeaveApp: any) {

        const isLinkApp = _.get(opComplementLeaveApp, 'linkAppID');

        return !_.isNil(isLinkApp);
    }
    public convertReflectToInt(value: string) {
        const self = this;
        if (value == 'CMMS45_7') {

            return 5;
        } else if (value == 'CMMS45_8') {

            return 4;
        } else if (value == 'CMMS45_10') {

            return 3;
        } else if (value == 'CMMS45_36') {

            return 2;
        } else if (value == 'CMMS45_11') {

            return 1;
        } else if (value == 'CMMS45_9') {

            return 1;
        } else {

            return -1;
        }
    }

    // private getFrameStatus(appID: string) {
    //     const self = this;
    //     return (_.find(self.data.appListInfoDto.appLst, (app) => app.appID == appID) || { statusFrameAtr: false }).statusFrameAtr;
    // }

    private appTypeName(appType: number, opAppTypeDisplay?: any) {
        const self = this;
        if (_.isNil(opAppTypeDisplay)) {

            return (_.find(self.data.appListExtractConditionDto.opListOfAppTypes, (item) => item.appType === appType) || { appName: '' }).appName;
        } else {

            return (_.find(self.data.appListExtractConditionDto.opListOfAppTypes, (item: any) => item.appType === appType && opAppTypeDisplay == item.opApplicationTypeDisplay) || { appName: '' }).appName;
        }
    }

    // check app7 with mode 0 and 1
    public getStampMode(mode: number) {
        const self = this;
        let isMode = false;
        _.forEach(self.data.appListInfoDto.appLst, (i) => {
            if (i.application.appType == 7) {
                if (i.application.opStampRequestMode == mode) {
                    isMode = true;
                }
            }
        });

        return isMode;
    }
    public isExistSubAppType(appType: any, opApplicationTypeDisplay: any) {
        const self = this;

        let isExist = false;
        _.forEach(self.data.appListInfoDto.appLst, (i) => {
            if (i.appType == appType && i.opAppTypeDisplay == opApplicationTypeDisplay) {
                isExist = true;
            }
        });

        return isExist;
    }

    private createLstAppType(opAppTypeLst: Array<ListOfAppTypes>) {
        // let self = this;
        // self.lstAppType = [];
        // lstAppInfor.forEach((appType) => {
        //     self.lstAppType.push({ code: appType.appType, appType: appType.appType, appName: appType.appName });
        // });
        // if (_.filter(self.lstAppType, (c) => c.appType == self.prFilter.appType).length > 0) {
        //     self.selectedValue = self.prFilter.appType.toString();
        // } else {
        //     self.selectedValue = '-1';
        // }
        let self = this;
        self.lstAppType = [];
        this.lstAppType.push({ code: String(-1), appType: -1, appName: 'すべて' });
        opAppTypeLst.forEach((appType) => {
            if (_.intersection(_.uniq(_.map(_.flatMap(self.lstAppByEmp, (i) => i.lstApp), (x) => x.appType)), self.arrayAppType).indexOf(appType.appType) >= 0) {
                let item = { code: String(appType.appType), appType: appType.appType, appName: appType.appName } as any;
                
                if (_.isNumber(appType.opApplicationTypeDisplay)) {
                    item.code = item.code + '_' + String(appType.opApplicationTypeDisplay);
                }
                if (appType.appType == 7 || appType.appType == 0) {
                    if (self.isExistSubAppType(appType.appType, appType.opApplicationTypeDisplay)) {
                        self.lstAppType.push(item);
                    }  
                } else {
                    self.lstAppType.push(item);
                }        
            }
        });
        self.lstAppType = _.uniqBy(self.lstAppType, (o: any) => {
            return o.code;
        });
        let appType = _.filter(opAppTypeLst, (o: ListOfAppTypes) => {

            return o.choice;
        });
        // if (appType.length > 1) {
        //     self.selectedValue = '-1';
        // } else {
        //     self.selectedValue = String(appType[0].appType);
        // }


        // if (_.filter(self.lstAppType, (c) => c.appType == self.prFilter.appType).length > 0) {
        //     self.selectedValue = self.prFilter.appType.toString();
        // } else {
        //     self.selectedValue = '-1';
        // }
        self.selectedValue = '-1';
    }

    //一括承認モードに切り替える
    //通常モードに切り替える
    get btnChangeMode() {
        return {
            class: this.modeAppr ? 'btn btn-secondary' : 'btn btn-primary',
            name: this.modeAppr ? 'CMMS45_55' : 'CMMS45_54'
        };
    }
    // 詳細を確認する
    private goToDetail(item: AppInfo) {
        let self = this;
        if (!self.modeAppr) {
            let lstAppId = self.findLstIdDisplay();
            //「D：申請内容確認（承認）」画面へ遷移する
            this.$modal('cmms45d', { 'listAppMeta': lstAppId, 'currentApp': item.id }).then(() => {
                //reload
                // self.getData(false, true);
                self.getData(true, false);
            });
        } else {
            if (!item.frameStatus) {//TH đơn không được approve thì bỏ qua
                return;
            }
            let checkSel = _.filter(self.lstAppr, (idSel) => idSel == item.id).length;
            if (checkSel > 0) {//bo check
                self.lstAppr = _.remove(self.lstAppr, (select) => {
                    return select != item.id;
                });
            } else {//them chek
                self.lstAppr.push(item.id);
            }
        }
    }
    //一括承認する
    private processAppr() {
        let self = this;
        self.$mask('show');
        let lstAppID = [];
        if (self.modeAppr && self.lstAppr.length > 0) {
            lstAppID = self.lstAppr;
        } else {
            self.filterByAppType.forEach((app) => {
                app.lstApp.forEach((item) => {
                    if (item.appStatusNo == 5) {
                        lstAppID.push(item.id);
                    }
                });
            });
        }
        let lstAppr = [];
        let lstApplicationTemp = self.data.appListInfoDto.appLst as ListOfApplication;
        let ListOfApplicationCmd = [];
        lstAppID.forEach((id) => {
            lstAppr.push({ appId: id, version: self.findVersion(id) });
            let object = _.filter(lstApplicationTemp, (item) => item.appID == id);
            if (object) {
                ListOfApplicationCmd.push(object[0]);
            }

        });

        let paramCmd = {
            isApprovalAll: true,
            device: 1,
            listOfApplicationCmds: ListOfApplicationCmd
        };
        self.$modal.confirm({ messageId: 'Msg_1551' }).then((value) => {
            if (value == 'yes') {
                self.$http.post('at', servicePath.approvalBatchApp, paramCmd).then((result) => {
                    return self.$http.post('at', servicePath.approverAfterConfirm, paramCmd.listOfApplicationCmds);
                }).then((result) => {
                    self.$mask('hide');
                    self.$modal.info({ messageId: 'Msg_220' }).then(() => {
                        self.$mask('hide');
                        self.lstAppr = [];
                        self.modeAppr = false;
                        self.getData(true, false);
                    });
                }).catch(() => {
                    self.$mask('hide');
                });
            } else {
                self.$mask('hide');
            }
        }).catch(() => {
            self.$mask('hide');
        });
    }

    private findVersion(appId: String) {
        let version = 0;
        this.lstAppByEmp.forEach((emp) => {
            emp.lstApp.forEach((app) => {
                if (app.id == appId) { version = app.version; }
            });
        });

        return version;
    }
    // 申請を絞り込む
    get filterByAppType() {
        let self = this;

        //抽出条件を変更する
        // self.prFilter.appType = Number(self.selectedValue);
        // storage.local.setItem('CMMS45_AppListExtractCondition', self.prFilter);
        let lstDisplay = [];
        let count = 0;
        if (self.displayB513 == 2) {//TH tổng vượt quá
            self.lstAppByEmp.forEach((emp) => {
                if (count >= self.appAllNumber) {
                    return;
                }
                if (count + emp.lstAppDisplay.length < self.appAllNumber) {//TH công thêm không vượt quá tổng
                    lstDisplay.push(new AppByEmp({
                        empCD: emp.empCD,
                        empName: emp.empName,
                        lstApp: emp.lstAppDisplay,
                        displayB52: emp.displayB52,
                        appPerNumber: emp.appPerNumber
                    }));
                    count = count + emp.lstAppDisplay.length;
                } else {//TH cộng thêm sẽ bị vượt quá tổng
                    lstDisplay.push(new AppByEmp({
                        empCD: emp.empCD,
                        empName: emp.empName,
                        lstApp: emp.lstAppDisplay.slice(0, self.appAllNumber - count),
                        displayB52: emp.displayB52,
                        appPerNumber: emp.appPerNumber
                    }));
                    count = count + emp.lstAppDisplay.slice(0, self.appAllNumber - count).length;
                }
            });
        } else {//TH tổng không vượt quá
            self.lstAppByEmp.forEach((emp) => {
                let lstAppD = emp.displayB52 ? emp.lstAppDisplay : emp.lstApp;
                lstDisplay.push(new AppByEmp({
                    empCD: emp.empCD,
                    empName: emp.empName,
                    lstApp: lstAppD,
                    displayB52: emp.displayB52,
                    appPerNumber: emp.appPerNumber
                }));
            });
        }
        let checkCountAll = 0;
        _.each(self.lstAppByEmp, (emp) => {
            checkCountAll = checkCountAll + emp.lstAppDisplay.length;
        });
        if (checkCountAll > self.appAllNumber) {//TH hiển thị vượt quá tổng
            self.displayB513 = 2;
        } else {//TH hiển thị không vượt quá tổng
            self.displayB513 = self.displayB513 == 1 ? self.displayB513 : 0;
        }
        //データをフィルタする
        switch (self.selectedValue) {
            case '-1':
                return lstDisplay;
            case '0_0':
                return lstDisplay;
            case '0_1':
                return lstDisplay;
            case '0_2':
                return lstDisplay;        
            case '1':
                return lstDisplay;
            case '2':
                return lstDisplay;
            case '3':
                return lstDisplay;
            case '4':
                return lstDisplay;
            case '5':
                return lstDisplay;
            case '6':
                return lstDisplay;
            case '7_0':
                return lstDisplay;
            case '7_1':
            return lstDisplay;
            case '8':
                return lstDisplay;
            case '9':
                return lstDisplay;
            case '10':
                return lstDisplay;    
            case '15':
                return lstDisplay;    
            default:
                return [];
        }
        // return [];
    }
    private findLstIdDisplay() {
        let lstId = [];
        this.filterByAppType.forEach((app) => {
            app.lstApp.forEach((item) => {
                lstId.push(item.id);
            });
        });

        return lstId;
    }
    // create appContent
    private appContent(appName: string, prePostAtr: number) {
        // return this.isDisPreP == 1 ? appName + ' ' + this.$i18n('CMMS45_24', prePostName) : appName;
        return appName + ' ' + this.$i18n('CMMS45_24', prePostAtr == 0 ? '事前' : '事後');
    }
}
interface IAppByEmp {
    empCD: string;
    empName: string;
    lstApp: Array<AppInfo>;
    displayB52: boolean;
    appPerNumber: number;
}


class AppByEmp {
    public empCD: string;
    public empName: string;
    public lstApp: Array<AppInfo>;
    public displayB52: boolean;
    public appPerNumber: number;

    constructor(param: IAppByEmp) {
        this.empCD = param.empCD;
        this.empName = param.empName;
        this.lstApp = param.lstApp;
        this.displayB52 = param.displayB52;
        this.appPerNumber = param.appPerNumber;
    }

    get lstAppDisplay() {
        return this.displayB52 ? this.lstApp.slice(0, this.appPerNumber) : this.lstApp;
    }
}
export class ApplicationStatus {
    //  未承認件数
    public unApprovalNumber: number;
    //  承認件数
    public approvalNumber: number;
    //  代行承認件数
    public approvalAgentNumber: number;
    //  取消件数
    public cancelNumber: number;
    //  差戻件数
    public remandNumner: number;
    //  否認件数
    public denialNumber: number;
}
const Type002 = {
    stamp : '_3',
    record : '_4'
};

const servicePath = {
    // getApplicationList: 'at/request/application/applist/getapplist',
    approvalListApp: 'at/request/application/applist/approval',
    // Refactor 4
    getListApproval: 'at/request/application/applist/getapplistApprovalMobile',
    getApplicationList: 'at/request/application/applist/getapplistMobile',
    getAppNameInAppList: 'at/request/application/screen/applist/getAppNameInAppList',
    filterByDate: 'at/request/application/applist/getapplistFilterMobile',
    approvalBatchApp: 'at/request/application/applist/approve',
    approverAfterConfirm: 'at/request/application/applist/approverAfterConfirm'
};