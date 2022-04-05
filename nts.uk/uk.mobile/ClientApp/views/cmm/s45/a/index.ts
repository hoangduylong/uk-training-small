import { Vue, _ } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { TotopComponent } from '@app/components/totop';
import { storage } from '@app/utils';
import { CmmS45CComponent } from '../c/index';

import { AppInfo } from '../shr';
import { AppListExtractConditionDto } from '../shr/index.d';
import { ISO_8601 } from 'moment';

@component({
    name: 'cmms45a',
    route: '/cmm/s45/a',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {
        selectedValue: {
            required: true
        },
        dateRange: {
            required: true,
            dateRange: true
        }
    },
    constraints: [],
    components: {
        'to-top': TotopComponent,
        'cmms45c': CmmS45CComponent
    }
})
export class CmmS45AComponent extends Vue {
    @Prop({ default: () => ({ CMMS45_FromMenu: true }) })
    public readonly params: { CMMS45_FromMenu: boolean };
    public prFilter: AppListExtractConditionDto = null;//抽出条件
    public dateRange: { start?: Date; end?: Date } = { start: null, end: null };//期間
    public selectedValue: string = '-1';//選択した申請種類
    public lstAppType: Array<{ code: string, appType: number; appName: string; opStampRequestMode?: number}> = [];//申請種類リスト
    public lstApp: Array<AppInfo> = [];//申請一覧
    public isDisPreP: number = 0;//申請表示設定.事前事後区分
    public displayA512: number = 0;
    public appAllNumber: number = 0;
    public appListExtractCondition: AppListExtractCondition;
    public data: ApplicationListDtoMobile = new ApplicationListDtoMobile();

    public arrayAppType = [2, 3, 4, 7, 9, 15, 0, 6, 1, 10, 8];

    public mounted() {
        const self = this;
        self.getData(!this.params.CMMS45_FromMenu, false);
        self.pgName = 'cmm045a';
    }

    // 起動する
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

    // 申請種類名称
    private appTypeName(appType: number, opAppTypeDisplay?: string) {
        const self = this;
        if (_.isNil(opAppTypeDisplay)) {

            return (_.find(self.data.appListExtractConditionDto.opListOfAppTypes, (item) => item.appType === appType) || { appName: '' }).appName;
        } else {
            
            return (_.find(self.data.appListExtractConditionDto.opListOfAppTypes, (item: any) => item.appType === appType && opAppTypeDisplay == item.opApplicationTypeDisplay) || { appName: '' }).appName;
        }
    }

    // 申請を絞り込む
    get filterByAppType() {
        let self = this;
        //抽出条件を変更する
        // self.prFilter.appType = Number(this.selectedValue);
        // storage.local.setItem('CMMS45_AppListExtractCondition', this.prFilter);
        //データをフィルタする
        switch (self.selectedValue) {
            case '-1':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            case '0_0':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            case '0_1':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            case '0_2':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;    
            case '1':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            case '2':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            case '3':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            case '4':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            case '5':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            case '6':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            case '7_0':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            case '7_1':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;    
            case '8':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            case '9':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            case '10':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            case '15':
                return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;    

            // case '0':
            //     return self.displayA512 == 2 ? self.lstApp.slice(0, self.appAllNumber) : self.lstApp;
            default:
                return [];
        }
    }
    public filterApp() {
        const self = this;
        self.getData(true, true);
    }

    //データを取る
    private getData(getCache: boolean, filter: boolean) {
        let self = this;
        // check: キャッシュを取るか？
        if (filter) {
            // self.prFilter.startDate = self.$dt.date(self.dateRange.start, 'YYYY/MM/DD');
            // self.prFilter.endDate = self.$dt.date(self.dateRange.end, 'YYYY/MM/DD');
            // self.prFilter.appType = Number(self.selectedValue);
            // if (self.appListExtractCondition.opListOfAppTypes) {
            //     _.forEach(self.appListExtractCondition.opListOfAppTypes, (i) => {
            //         _.set(i, 'appType', self.selectedValue);
            //     });
            // }

            // 抽出条件を変更する
            // self.appListExtractCondition.periodStartDate = self.$dt.date(self.dateRange.start, 'YYYY/MM/DD');
            // self.appListExtractCondition.periodEndDate = self.$dt.date(self.dateRange.end, 'YYYY/MM/DD');
            // if (!_.isEmpty(self.data.appListInfoDto.appLst)) {
            //     _.forEach(self.data.appListInfoDto.appLst, (item: ListOfAppTypes) => {
            //         _.set(item, 'appType', self.selectedValue);
            //     });
            // }

            // return self.$http.post('at', servicePath.filterByDate, {applicationListDtoMobile: self.data})
            //     .then((res: any) => {
            //         self.$mask('hide');
            //         self.data = res.data;
            //         self.convertAppInfo(self.data.appListInfoDto);
            //     })
            //     .catch((res: any) => {
            //         self.$mask('hide');
            //     });
            self.convertAppInfo(self.data.appListInfoDto);



        } else if (getCache && storage.local.hasItem('CMMS45_DataStorage')) {
            // 申請を絞り込む
            // self.prFilter = storage.local.getItem('CMMS45_AppListExtractCondition') as AppListExtractConditionDto;
            // self.appListExtractCondition = storage.local.getItem('CMMS45_AppListExtractConditionNew') as AppListExtractCondition;

            // self.createLstAppType();
            // return service
            self.$mask('show');
            let dataStorage = storage.local.getItem('CMMS45_DataStorage') as any;
            self.data = dataStorage;
            self.appListExtractCondition = dataStorage.appListExtractConditionDto as AppListExtractCondition;
            if (!_.isNull(self.dateRange.start)) {
                self.appListExtractCondition.periodStartDate = self.$dt.date(self.dateRange.start, 'YYYY/MM/DD');
            }
            if (!_.isNull(self.dateRange.end)) {
                self.appListExtractCondition.periodEndDate = self.$dt.date(self.dateRange.end, 'YYYY/MM/DD');
            }
            let paramCmd = {
                appAllNumber: self.data.appAllNumber,
                appPerNumber: self.data.appPerNumber,
                appListExtractCondition: self.data.appListExtractConditionDto,
                appListInfo: self.data.appListInfoDto
            };
            self.$http.post('at', servicePath.filterByDate, { applicationListCmdMobile: paramCmd })
                .then((res: any) => {
                    // let data = res.data as ApplicationListDtoMobile;
                    self.appListExtractCondition = res.data.appListExtractConditionDto;
                    self.data = res.data;
                    let appAllNumber = self.data.appAllNumber;
                    let appPerNumber = self.data.appPerNumber;
                    let appListExtractConditionDto = self.data.appListExtractConditionDto;
                    let dataStorage = {
                        appAllNumber,
                        appPerNumber,
                        appListExtractConditionDto
                    };
                    storage.local.setItem('CMMS45_DataStorage', dataStorage);
                    self.dateRange = { start: self.$dt.fromUTCString(self.appListExtractCondition.periodStartDate, 'YYYY/MM/DD'), end: self.$dt.fromUTCString(self.appListExtractCondition.periodEndDate, 'YYYY/MM/DD') };
                    let selectedTemp = self.selectedValue;
                    self.selectedValue = '-1';
                    self.convertAppInfo(self.data.appListInfoDto);
                    self.createLstAppType(self.data.appListExtractConditionDto.opListOfAppTypes);
                    self.$nextTick(() => {
                        if (_.find(self.lstAppType, (i: any) => i.code == selectedTemp)) {
                            self.selectedValue = selectedTemp;
                        } else {
                            self.selectedValue = '-1';
                        }
                    });
                    self.$mask('hide');

                }).catch(() => {
                    self.$mask('hide');
                });

            // self.selectedValue = self.prFilter.appType.toString();
        } else {
            // self.prFilter = {
            //     startDate: self.dateRange.start == null ? '' : self.$dt.date(self.dateRange.start, 'YYYY/MM/DD'),
            //     endDate: self.dateRange.end == null ? '' : self.$dt.date(self.dateRange.end, 'YYYY/MM/DD'),
            //     appListAtr: 0,
            //     appType: -1,
            //     unapprovalStatus: false,
            //     approvalStatus: false,
            //     denialStatus: false,
            //     agentApprovalStatus: false,
            //     remandStatus: false,
            //     cancelStatus: false,
            //     appDisplayAtr: 0,
            //     listEmployeeId: [],
            //     empRefineCondition: ''
            // } as AppListExtractConditionDto;
            self.$mask('show');
            self.appListExtractCondition = {
                // 申請一覧区分
                // 0: application , 1: approval
                appListAtr: Mode.APPLICATION,
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
                // let data = res.data as ApplicationListDtoMobile;
                self.appListExtractCondition = res.data.appListExtractConditionDto;
                self.data = res.data;
                let appAllNumber = self.data.appAllNumber;
                let appPerNumber = self.data.appPerNumber;
                let appListExtractConditionDto = self.data.appListExtractConditionDto;
                let dataStorage = {
                    appAllNumber,
                    appPerNumber,
                    appListExtractConditionDto
                };
                storage.local.setItem('CMMS45_DataStorage', dataStorage);
                // storage.local.setItem('allNumber', self.data.appAllNumber);
                // storage.local.setItem('appPerNumber', self)
                // storage.local.setItem
                self.dateRange = { start: self.$dt.fromUTCString(self.appListExtractCondition.periodStartDate, 'YYYY/MM/DD'), end: self.$dt.fromUTCString(self.appListExtractCondition.periodEndDate, 'YYYY/MM/DD') };
                // self.isDisPreP = 
                self.convertAppInfo(self.data.appListInfoDto);
                self.createLstAppType(self.data.appListExtractConditionDto.opListOfAppTypes);
                self.$mask('hide');

            }).catch(() => {
                self.$mask('hide');
            });

        }

        // let param = {
        //     condition: self.prFilter, //申請一覧抽出条件
        //     spr: false,//sprから呼ぶか？
        //     extractCondition: 0,
        //     device: 1,//デバイス：PC = 0 or スマートフォン = 1
        //     lstAppType: [0]//対象申請種類List
        // };

        //




        // サービスを呼ぶ
        // self.$http.post('at', servicePath.getApplicationList, param).then((result: { data: any }) => {
        //     self.$mask('hide');
        //     let data = result.data;
        //     self.prFilter.startDate = data.startDate;
        //     self.prFilter.endDate = data.endDate;
        //     // キャッシュを変更する
        //     storage.local.setItem('CMMS45_AppListExtractCondition', self.prFilter);

        //     self.createLstAppType(data.lstAppInfor);
        //     self.convertAppInfo(data);
        //     self.dateRange = { start: self.$dt.fromUTCString(data.startDate, 'YYYY/MM/DD'), end: self.$dt.fromUTCString(data.endDate, 'YYYY/MM/DD') };
        //     self.isDisPreP = data.isDisPreP;
        // }).catch(() => {
        //     self.$mask('hide');
        // });
    }

    // convert data appInfo
    private convertAppInfo(data: any) {
        let self = this;
        self.lstApp = [];

        // data.lstApp.forEach((app: any) => {
        //     self.lstApp.push(new AppInfo({
        //         id: app.applicationID,
        //         appDate: self.$dt.fromUTCString(app.applicationDate, 'YYYY/MM/DD'),
        //         appType: app.applicationType,
        //         appName: self.appTypeName(app.applicationType),
        //         prePostAtr: app.prePostAtr,
        //         reflectStatus: app.reflectStatus,
        //         appStatusNo: app.reflectPerState
        //     }));
        // });
        _.forEach(data.appLst, (app: any) => {
            if (self.selectedValue == '-1' || 
                (!_.isNil(app.opAppTypeDisplay) ? 
                (String(app.appType) + '_' + String(app.opAppTypeDisplay) == self.selectedValue) : 
                String(app.appType) == self.selectedValue)) {
                if (self.arrayAppType.indexOf(app.appType) >= 0) {
                    self.lstApp.push(new AppInfo({
                        id: app.appID,
                        appDate: self.$dt.fromUTCString(app.appDate, 'YYYY/MM/DD'),
                        appType: app.appType,
                        appName: self.appTypeName(app.appType, app.opAppTypeDisplay),
                        prePostAtr: app.prePostAtr,
                        reflectStatus: app.reflectionStatus,
                        appStatusNo: self.convertReflectToInt(app.reflectionStatus),
                        opComplementLeaveApp: app.opComplementLeaveApp,
                        opAppStartDate: app.opAppStartDate,
                        opAppEndDate: app.opAppEndDate
                    }));
                }
            }
        });

        self.lstApp = _.uniqBy(self.lstApp, (o: any) => {
            return o.id;
        });
        self.appAllNumber = self.data.appAllNumber;
        if (self.lstApp.length == 0) {
            self.displayA512 = 1;
        } else if (self.lstApp.length > self.data.appAllNumber) {
            self.displayA512 = 2;
        } else {
            self.displayA512 = 0;
        }
        // data.appLst.array.forEach((app: ListOfApplication) => {
        //     self.lstApp.push(new AppInfo({
        //         id: app.appID,
        //         appDate: self.$dt.fromUTCString(app.appDate, 'YYYY/MM/DD'),
        //         appType: app.appTye,
        //         appName: self.appTypeName(app.appTye),
        //         prePostAtr: app.prePostAtr,
        //         reflectStatus: app.reflectionStatus,
        //         appStatusNo: 2
        //     }));
        // });
    }
    
    public isLinkApp(opComplementLeaveApp: any) {

        const isLinkApp = _.get(opComplementLeaveApp, 'linkAppID');

        return !_.isNil(isLinkApp);
    }

    public convertReflectToInt(value: string) {
        const self = this;
        if (value == 'CMMS45_7') {

            return 0;
        } else if (value == 'CMMS45_8') {

            return 1;
        } else if (value == 'CMMS45_9') {

            return 2;
        } else if (value == 'CMMS45_10') {

            return -1;
        } else if (value == 'CMMS45_36') {

            return 5;
        } else if (value == 'CMMS45_11') {

            return 6;
        }
    }
    // 詳細を確認する
    private goToDetail(id: string) {
        let self = this;
        let lstAppId = [];
        self.lstApp.forEach((app: AppInfo) => {
            lstAppId.push(app.id);
        });
        // 「C：申請内容確認」画面へ遷移する
        let param = {
            'listAppMeta': lstAppId,
            'currentApp': id,
            'action': 0 // delete 1, 
        };
        self.$modal('cmms45c', param).then((res: any) => {
            console.log(res);
            // if (res.action != 0) {
            //     self.getData(true, false);
            // } else {
            //     self.getData(true, true);
            // }
            self.getData(true, false);
        });
    }

    // 抽出条件を変更する
    private filter() {
        const self = this;
        self.$validate();
        if (self.$valid) {
            // self.getData(false, true);
            this.getData(true, false);
        }
    }
    // check app7 with mode 0 and 1
    // public getStampMode(mode: number) {
    //     const self = this;
    //     let isMode = false;
    //     _.forEach(self.data.appListInfoDto.appLst, (i) => {
    //         if (i.application.appType == 7) {
    //             if (i.application.opStampRequestMode == mode) {
    //                 isMode = true;
    //             }
    //         }
    //     });

    //     return isMode;
    // }

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


    // crrate List AppType
    private createLstAppType(opAppTypeLst: Array<ListOfAppTypes>) {
        let self = this;
        self.lstAppType = [];
        self.lstAppType.push({ code: String(-1), appType: -1, appName: 'すべて' });
        opAppTypeLst.forEach((appType) => {
            if (_.intersection(_.uniq(_.map(self.lstApp, (x) => x.appType)), self.arrayAppType).indexOf(appType.appType) >= 0) {
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

    // create appContent
    private appContent(appName: string, prePostAtr: number) {
        return appName + ' ' + this.$i18n('CMMS45_24', prePostAtr == 0 ? '事前' : '事後');
    }
    // Refactor4
    // private appContentNew(isDisPreP: number) {
    //     // return isDisPreP == 1 ? appName + ' ' + $i18n('CMMS45_24', prePostName) : appName;
    //     return 'AppContentNew';
    // }
    public getHtmlAll() {
        return `<div>` + this.$i18n('CMMS45_90', this.appAllNumber.toString()).replace(/\n/g, '<br />') + `</div>`;
    }
    public getHtmlNone() {
        return `<div>` + this.$i18n('CMMS45_89').replace(/\n/g, '<br />') + `</div>`;
    }
}


// 申請一覧抽出条件
export class AppListExtractCondition {
    // 申請一覧区分
    // 0: application , 1: approval
    public appListAtr: number;
    // 表の幅登録
    public tableWidthRegis: boolean;
    // 事前出力
    public preOutput: boolean;
    // 事後出力
    public postOutput: boolean;
    // 申請表示順
    public appDisplayOrder: number;
    // 期間開始日
    public periodStartDate: string;
    // 期間終了日
    public periodEndDate: string;
    // 申請種類
    public opAppTypeLst: Array<ListOfAppTypes>;
    // 申請種類リスト
    public opListOfAppTypes: Array<ListOfAppTypes>;
    // 社員IDリスト
    public opListEmployeeID: Array<string>;
    // 承認状況＿未承認
    public opUnapprovalStatus: boolean;
    // 承認状況＿承認済
    public opApprovalStatus: boolean;
    // 承認状況＿否認
    public opDenialStatus: boolean;
    // 承認状況＿代行者承認済
    public opAgentApprovalStatus: boolean;
    // 承認状況＿差戻
    public opRemandStatus: boolean;
    // 承認状況＿取消
    public opCancelStatus: boolean;

}
export class ListOfAppTypes {

    //  申請種類

    public appType: number;


    // 申請名称

    public appName: string;


    //  選択

    public choice: boolean;


    //  プログラムID

    public opProgramID: string;


    //  申請種類表示

    public opApplicationTypeDisplay: number;

    //  文字列

    public opString: string;
}
export class ApplicationListDtoMobile {

    public appAllNumber: number;

    public appPerNumber: number;
    //  申請一覧抽出条件
    public appListExtractConditionDto: AppListExtractCondition;
    // 申請一覧情報
    public appListInfoDto: AppListInfo;
}
export class AppListInfo {
    //  申請リスト
    public appLst: any;

    // 申請件数
    public numberOfApp: number;

    //  表示行数超
    public moreThanDispLineNO: boolean;

    //  表示設定
    public displaySet: number;
}
class Application {
    public opStampRequestMode: number;
}
export class ListOfApplication {
    public application: Application;
    //  事前事後区分

    public prePostAtr: number;

    //  職場名

    public workplaceName: string;

    //  申請ID

    public appID: string;

    //  申請者CD

    public applicantCD: string;

    //  申請者名

    public applicantName: string;

    // 申請種類

    public appType: number;

    //  申請内容

    public appContent: string;

    // 申請日

    public appDate: string;

    //  入力社名

    public inputCompanyName: string;

    //  入力日

    public inputDate: string;

    //  反映状態

    public reflectionStatus: string;

    //  時刻計算利用区分

    public opTimeCalcUseAtr: number;

    //  承認フェーズインスタンス

    public opApprovalPhaseLst: any;

    //  承認状況照会

    public opApprovalStatusInquiry: string;

    //  承認枠の承認状態

    public opApprovalFrameStatus: number;

    //  振休振出申請

    public opComplementLeaveApp: any;

    //  申請開始日

    public opAppStartDate: string;

    //  申請種類表示

    public opAppTypeDisplay: number;

    //  申請終了日

    public opAppEndDate: string;

    //  定型理由

    public opAppStandardReason: string;

    //  入力者名称

    public opEntererName: string;

    //  背景色

    public opBackgroundColor: number;

    //  表示行数超

    public opMoreThanDispLineNO: boolean;
}
export enum Mode {
    APPLICATION,
    APPROVAL
}

const servicePath = {
    getApplicationList: 'at/request/application/applist/getapplistMobile',
    getAppNameInAppList: 'at/request/application/screen/applist/getAppNameInAppList',
    filterByDate: 'at/request/application/applist/getapplistFilterMobile'
};
