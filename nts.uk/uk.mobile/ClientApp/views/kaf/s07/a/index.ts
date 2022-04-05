import { _, Vue } from '@app/provider';
import { component, Prop, Watch } from '@app/core/component';
import { KDL002Component } from '../../../kdl/002';
import { Kdl001Component } from '../../../kdl/001';
import { KafS00DComponent } from '../../../kaf/s00/d';
import {
    KafS00AComponent,
    KafS00BComponent,
    KafS00CComponent
} from 'views/kaf/s00';
import { KafS00ShrComponent, AppType } from 'views/kaf/s00/shr';
import { CmmS45CComponent } from '../../../cmm/s45/c/index';
// import { AppWorkChange } from '../../../cmm/s45/components/app2/index';
@component({
    name: 'kafs07a',
    route: '/kaf/s07/a',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {
        valueWorkHours1: {
            timeRange: false,
            required: true
        },
        valueWorkHours2: {
            timeRange: false,
            required: false
        }
    },
    constraints: [],
    components: {
        'kafs00-a': KafS00AComponent,
        'kafs00-b': KafS00BComponent,
        'kafs00-c': KafS00CComponent,
        'worktype': KDL002Component,
        'kafs00d': KafS00DComponent,
        'worktime': Kdl001Component,
        'cmms45c': CmmS45CComponent
    },

})
export class KafS07AComponent extends KafS00ShrComponent {
    // to edit
    @Prop({ default: null })
    public params?: any;
    public title: string = 'KafS07A';

    public model: Model = new Model();

    public mode: Boolean = true;

    public valueWorkHours1: { start: number, end: number } = null;

    public valueWorkHours2: { start: number, end: number } = null;

    public isValidateAll: Boolean = true;

    // handle visible of view

    public isCondition1: boolean = false;

    public isCondition2: boolean = false;

    public isCondition3: boolean = false;

    public isCondition4: boolean = false;

    public appWorkChangeDisp: any = null;

    // data is fetched service
    public data: any = 'data';

    public user: any;
    public application: any = {
        version: 1,
        prePostAtr: 1,
        appType: 2,
        appDate: this.$dt(new Date(), 'YYYY/MM/DD'),
        enteredPerson: '1',
        inputDate: this.$dt(new Date(), 'YYYY/MM/DD HH:mm:ss'),
        reflectionStatus: {
            listReflectionStatusOfDay: [{
                actualReflectStatus: 1,
                scheReflectStatus: 1,
                targetDate: '2020/01/07',
                opUpdateStatusAppReflect: {
                    opActualReflectDateTime: '2020/01/07 20:11:11',
                    opScheReflectDateTime: '2020/01/07 20:11:11',
                    opReasonActualCantReflect: 1,
                    opReasonScheCantReflect: 0

                },
                opUpdateStatusAppCancel: {
                    opActualReflectDateTime: '2020/01/07 20:11:11',
                    opScheReflectDateTime: '2020/01/07 20:11:11',
                    opReasonActualCantReflect: 1,
                    opReasonScheCantReflect: 0
                }
            }]
        }


    };
    public appWorkChangeDto: any = {};
    public appDispInfoStartupOutput: any = {};

    public created() {
        const self = this;
        if (self.params && self.params.isDetailMode) {
            self.mode = false;
            self.data = self.params;
            self.appWorkChangeDisp = self.data.appWorkChangeDispInfo;
        }
        

    }

    get application1() {
        const self = this;

        return {
            prePostAtr: self.kaf000_B_Params.output.prePostAtr
        };
    }

    public mounted() {
        const self = this;
        let employeeID = self.params ? self.params.employeeID : null,
            date = self.params ? self.params.date : null;
        self.fetchStart(employeeID ? employeeID : null, date ? [date] : []);
    }
    public fetchStart(employeeID?: string, dateLst?: Array<string>) {
        const self = this;
        if (self.mode) {
            self.$mask('show');
        } else {
            self.$nextTick(() => {
                self.$mask('show');
            });
        }
        self.$auth.user.then((usr: any) => {
            self.user = usr;
        }).then(() => {
            if (self.mode) {
                return self.loadCommonSetting(
                    AppType.WORK_CHANGE_APPLICATION,
                    employeeID, 
                    null, 
                    dateLst, 
                    null);
            }

            return true;
        }).then((loadData: any) => {
            if (loadData) {
                let param = self.mode ? 
                {
                    mode: self.mode,
                    companyId: self.user.companyId,
                    employeeId: employeeID ? employeeID : self.user.employeeId,
                    listDates: dateLst,
                    appWorkChangeOutputDto: null,
                    appWorkChangeDto: self.mode ? null : self.data.appWorkChange
                } : 
                {
                    mode: self.mode,
                    companyId: self.user.companyId,
                    employeeId: self.user.employeeId,
                    listDates: [],
                    appWorkChangeOutputCmd: self.data,
                    appWorkChangeDto: self.mode ? null : self.data.appWorkChange
                };
                if (self.mode) {

                    return self.$http.post('at', API.startS07, param);
                } else {
                    return true;
                }
            }
            if (!_.isNil(_.get(self.appDispInfoStartupOutput, 'appDispInfoWithDateOutput.opErrorFlag'))) {
                if (self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opErrorFlag != 0) {
                    let param = self.mode ? 
                {
                    mode: self.mode,
                    companyId: self.user.companyId,
                    employeeId: employeeID ? employeeID : self.user.employeeId,
                    listDates: dateLst,
                    appWorkChangeOutputDto: null,
                    appWorkChangeDto: self.mode ? null : self.data.appWorkChange
                } : 
                {
                    mode: self.mode,
                    companyId: self.user.companyId,
                    employeeId: self.user.employeeId,
                    listDates: [],
                    appWorkChangeOutputCmd: self.data,
                    appWorkChangeDto: self.mode ? null : self.data.appWorkChange
                };

                    return self.$http.post('at', API.startS07, param);
                }
            }

        }).then((res: any) => {
            if (!res) {
                return;
            }
            if (res !== true) {
                self.data = res.data;

                if (res.data.appWorkChangeDispInfo) {
                    self.appWorkChangeDisp = res.data.appWorkChangeDispInfo;
                }
            }
            self.createParamA();
            self.createParamB();
            self.createParamC();
            // let appWorkChange = res.data.appWorkChange;
            self.bindStart();
        }).catch((err: any) => {
            self.handleErrorMessage(err).then((res: any) => {
                if (err.messageId == 'Msg_43') {
                    self.$goto('ccg008a');
                }
            });
        })
        .then(() => self.$mask('hide'));
    }


    // bind params to components
    public createParamA() {
        const self = this;
        let appDispInfoWithDateOutput = self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDispInfoWithDateOutput;
        let appDispInfoNoDateOutput = self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDispInfoNoDateOutput;
        self.kaf000_A_Params = {
            companyID: self.user.companyId,
            employeeID: self.user.employeeId,
            // 申請表示情報．申請表示情報(基準日関係あり)．社員所属雇用履歴を取得．雇用コード
            employmentCD: appDispInfoWithDateOutput.empHistImport.employmentCode,
            // 申請表示情報．申請表示情報(基準日関係あり)．申請承認機能設定．申請利用設定
            applicationUseSetting: appDispInfoWithDateOutput.approvalFunctionSet.appUseSetLst[0],
            // 申請表示情報．申請表示情報(基準日関係なし)．申請設定．受付制限設定
            receptionRestrictionSetting: appDispInfoNoDateOutput.applicationSetting.receptionRestrictionSetting[0],
            // opOvertimeAppAtr: null
        };
    }
    public createParamB() {
        const self = this;
        self.kaf000_B_Params = null;
        let paramb = {
            mode: self.mode ? 0 : 1,
            appDisplaySetting: self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDispInfoNoDateOutput.applicationSetting.appDisplaySetting,
            newModeContent: {
                // 申請表示情報．申請表示情報(基準日関係なし)．申請設定．申請表示設定																	
                appTypeSetting: self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDispInfoNoDateOutput.applicationSetting.appTypeSetting,
                useMultiDaySwitch: true,
                initSelectMultiDay: false
            },
            detailModeContent: null
        };
        if (self.mode) {
            if (self.params && self.params.date) {
                _.set(paramb.newModeContent, 'appDate', self.params.date);    
            }
        }
        if (!self.mode) {
            paramb.detailModeContent = {
                prePostAtr: self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDetailScreenInfo.application.prePostAtr,
                startDate: self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppStartDate,
                endDate: self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppEndDate,
                employeeName: _.isEmpty(self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDispInfoNoDateOutput.employeeInfoLst) ? 'empty' : self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDispInfoNoDateOutput.employeeInfoLst[0].bussinessName
            };
        }
        self.kaf000_B_Params = paramb;
        


    }
    public createParamC() {
        const self = this;
        // KAFS00_C_起動情報
        let appDispInfoNoDateOutput = self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDispInfoNoDateOutput;
        self.kaf000_C_Params = {
            // 定型理由の表示
            // 申請表示情報．申請表示情報(基準日関係なし)．定型理由の表示区分
            displayFixedReason: appDispInfoNoDateOutput.displayStandardReason,
            // 申請理由の表示
            // 申請表示情報．申請表示情報(基準日関係なし)．申請理由の表示区分
            displayAppReason: appDispInfoNoDateOutput.displayAppReason,
            // 定型理由一覧
            // 申請表示情報．申請表示情報(基準日関係なし)．定型理由項目一覧
            reasonTypeItemLst: appDispInfoNoDateOutput.reasonTypeItemLst,
            // 申請制限設定
            // 申請表示情報．申請表示情報(基準日関係なし)．申請設定．申請制限設定
            appLimitSetting: appDispInfoNoDateOutput.applicationSetting.appLimitSetting,
            // 選択中の定型理由
            // empty
            // opAppStandardReasonCD: this.mode ? 1 : this.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppReason,
            // 入力中の申請理由
            // empty
            // opAppReason: this.mode ? 'Empty' : this.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppStandardReasonCD
                // 定型理由
                opAppStandardReasonCD: self.mode ? null : self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppStandardReasonCD,
                // 申請理由
                opAppReason: self.mode ? null : self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppReason
        };
    }


    public bindStart() {
        const self = this;
        let appWorkChangeDispInfo = self.data.appWorkChangeDispInfo;
        self.bindVisibleView(appWorkChangeDispInfo);
        self.bindCommon(appWorkChangeDispInfo);
        self.bindValueWorkHours(self.data);
        self.bindWork(self.data);
        self.bindDirectBounce(self.data);
    }

    public bindDirectBounce(params: any) {
        const self = this;
        if (!self.mode) {
            self.model.straight = params.appWorkChange.straightGo == 1 ? 1 : 2;
            self.model.bounce = params.appWorkChange.straightBack == 1 ? 1 : 2;
        }
    }
    public bindWork(params: any) {
        const self = this;
        self.model.workType.code = self.mode ? params.appWorkChangeDispInfo.workTypeCD : (params.appWorkChange ? (params.appWorkChange.opWorkTypeCD ? params.appWorkChange.opWorkTypeCD : null) : null);
        let isExist = _.find(params.appWorkChangeDispInfo.workTypeLst, (item: any) => item.workTypeCode == self.model.workType.code);
        self.model.workType.name = isExist ? isExist.name : self.$i18n('KAFS07_10');

        self.model.workTime.code = self.mode ? params.appWorkChangeDispInfo.workTimeCD : (params.appWorkChange ? (params.appWorkChange.opWorkTimeCD ? params.appWorkChange.opWorkTimeCD : null) : null);
        isExist = _.find(params.appWorkChangeDispInfo.appDispInfoStartupOutput.appDispInfoWithDateOutput.opWorkTimeLst, (item: any) => item.worktimeCode == self.model.workTime.code);
        self.model.workTime.name = isExist ? isExist.workTimeDisplayName.workTimeName : (self.model.workTime.code ? self.$i18n('KAFS07_10') : null);
        self.bindWorkTime(params.appWorkChangeDispInfo);
        if (!self.mode) {
            if (!self.model.workTime.code) {
                self.model.workTime.name = '';
            }
        }
    }
    public bindWorkTime(params: any) {
        const self = this;
        if (params.predetemineTimeSetting) {
            let startTime = _.find(params.predetemineTimeSetting.prescribedTimezoneSetting.lstTimezone, (item: any) => item.workNo == 1).start;
            let endTime = _.find(params.predetemineTimeSetting.prescribedTimezoneSetting.lstTimezone, (item: any) => item.workNo == 1).end;
            self.model.workTime.time = self.$dt.timedr(startTime) + '~' + self.$dt.timedr(endTime);
        }
    }
    public bindValueWorkHours(params: any) {
        // *4
        // if (!this.isCondition4)
        const self = this;
        let time1;
        let time2;
        if (params.appWorkChangeDispInfo.predetemineTimeSetting) {
            time1 = _.find(params.appWorkChangeDispInfo.predetemineTimeSetting.prescribedTimezoneSetting.lstTimezone, (item: any) => item.workNo == 1);
            time2 = _.find(params.appWorkChangeDispInfo.predetemineTimeSetting.prescribedTimezoneSetting.lstTimezone, (item: any) => item.workNo == 2 && item.useAtr);
        } 
        if (!self.mode) {
            let appWorkChange = params.appWorkChange;
            if (appWorkChange) {
                time1 = _.find(appWorkChange.timeZoneWithWorkNoLst, (item: any) => item.workNo == 1);
                time2 = _.find(appWorkChange.timeZoneWithWorkNoLst, (item: any) => item.workNo == 2);
            }
            // open dialog is not changed time selector
            if (self.isOpenKDL002) {
                if (params.appWorkChangeDispInfo.predetemineTimeSetting) {
                    time1 = _.find(params.appWorkChangeDispInfo.predetemineTimeSetting.prescribedTimezoneSetting.lstTimezone, (item: any) => item.workNo == 1);
                    time2 = _.find(params.appWorkChangeDispInfo.predetemineTimeSetting.prescribedTimezoneSetting.lstTimezone, (item: any) => item.workNo == 2 && item.useAtr);
                }
            }
            self.bindWorkHours(time1, time2);
            self.isOpenKDL002 = false;

            return;

        }
        if (!self.isCondition4) {
            self.bindWorkHours(time1, time2);
        }
        if (self.isCondition3 && self.isCondition1) {
            self.$updateValidator('valueWorkHours1', {
                timeRange: false,
                required: true
            });
        } else {
            self.$updateValidator('valueWorkHours1', {
                timeRange: false,
                required: false
            });
        }


    }
    public bindWorkHours(time1: any, time2: any) {
        if (this.isCondition1) {
            this.valueWorkHours1 = null;
            if (!this.valueWorkHours1 && time1) {
                this.valueWorkHours1 = {
                    start: 0,
                    end: 0
                };
            }
            if (time1) {

                if (!this.mode) {
                    if (!this.isOpenKDL002) {
                        this.valueWorkHours1.start = time1.timeZone.startTime;
                        this.valueWorkHours1.end = time1.timeZone.endTime;
                    } else {
                        this.valueWorkHours1.start = time1.start;
                        this.valueWorkHours1.end = time1.end;
                    }
                } else {
                    this.valueWorkHours1.start = time1.start;
                    this.valueWorkHours1.end = time1.end;
                }
            }

        } else {
            this.$updateValidator('valueWorkHours1', {
                timeRange: false,
                required: false
            });
        }
        if (this.isCondition2) {
            this.valueWorkHours2 = null;
            if (!this.valueWorkHours2 && time2) {
                this.valueWorkHours2 = {
                    start: 0,
                    end: 0
                };
            }
            if (time2) {
                if (!this.mode) {
                    if (!this.isOpenKDL002) {
                        this.valueWorkHours2.start = time2.timeZone.startTime;
                        this.valueWorkHours2.end = time2.timeZone.endTime;
                    } else {
                        this.valueWorkHours2.start = time2.start;
                        this.valueWorkHours2.end = time2.end;
                    }
                } else {
                    this.valueWorkHours2.start = time2.start;
                    this.valueWorkHours2.end = time2.end;
                }
            }

        } else {
            this.$updateValidator('valueWorkHours2', {
                timeRange: false,
                required: false
            });
        }
        if (!this.isCondition3) {
            this.$updateValidator('valueWorkHours2', {
                timeRange: false,
                required: false
            });
            this.$updateValidator('valueWorkHours1', {
                timeRange: true,
                required: false
            });
        }
    }

    public bindCommon(params: any) {
        // bind appDispInfoStartupOutput to common component
        this.appDispInfoStartupOutput.appDispInfoNoDateOutput = params.appDispInfoStartupOutput.appDispInfoNoDateOutput;
        this.appDispInfoStartupOutput.appDispInfoWithDateOutput = params.appDispInfoStartupOutput.appDispInfoWithDateOutput;
        this.appDispInfoStartupOutput.appDetailScreenInfo = params.appDispInfoStartupOutput.appDetailScreenInfo;
    }
    public bindAppWorkChangeRegister() {
        const self = this;
        self.appWorkChangeDto.straightGo = self.model.straight == 2 ? 0 : 1;
        self.appWorkChangeDto.straightBack = self.model.bounce == 2 ? 0 : 1;
        self.appWorkChangeDto.opWorkTypeCD = self.model.workType.code;
        self.appWorkChangeDto.opWorkTimeCD = self.model.workTime.code;
        if (self.isCondition3) {
            self.appWorkChangeDto.timeZoneWithWorkNoLst = [];
            let a = null;
            let b = null;
            if (self.isCondition1) {
                a = {
                    workNo: 1,
                    timeZone: {
                        startTime: self.valueWorkHours1.start,
                        endTime: self.valueWorkHours1.end
                    }
                };
                self.appWorkChangeDto.timeZoneWithWorkNoLst.push(a);
            }
            if (self.valueWorkHours2) {

                if (self.isCondition2 && !(_.isNull(self.valueWorkHours2.start) && _.isNull(self.valueWorkHours2.end))) {
                    b = {
                        workNo: 2,
                        timeZone: {
                            startTime: self.valueWorkHours2 ? self.valueWorkHours2.start : null,
                            endTime: self.valueWorkHours2 ? self.valueWorkHours2.end : null
                        }
                    };
                    self.appWorkChangeDto.timeZoneWithWorkNoLst.push(b);
                }
            }
        } else {
            self.appWorkChangeDto.timeZoneWithWorkNoLst = null;
        }
        if (!self.mode && !self.isCondition3) {

            self.appWorkChangeDto.timeZoneWithWorkNoLst = [];
            let a = null;
            let b = null;
            if (!_.isNull(self.valueWorkHours1)) {
                if (self.isCondition1 && self.valueWorkHours1.start && self.valueWorkHours1.end) {
                    a = {
                        workNo: 1,
                        timeZone: {
                            startTime: self.valueWorkHours1.start,
                            endTime: self.valueWorkHours1.end
                        }
                    };
                    self.appWorkChangeDto.timeZoneWithWorkNoLst.push(a);
                }

            }
            if (!_.isNull(self.valueWorkHours2)) {
                if (self.isCondition2 && self.valueWorkHours2.start && self.valueWorkHours2.end) {
                    b = {
                        workNo: 2,
                        timeZone: {
                            startTime: self.valueWorkHours2.start,
                            endTime: self.valueWorkHours2.end
                        }
                    };
                    self.appWorkChangeDto.timeZoneWithWorkNoLst.push(b);
                }
            }
        }
        if (!self.mode) {
            let opAppStandardReasonCD =  self.application.opAppStandardReasonCD;
            let opAppReason = self.application.opAppReason;
            self.application = self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDetailScreenInfo.application;
            self.application.opAppStandardReasonCD = opAppStandardReasonCD;
            self.application.opAppReason = opAppReason;
        }
        if (self.mode) {
            self.application.employeeID = self.user.employeeId;
            // ver6 
            // 「事前事後区分」が表示しない場合
            let appDispInfoStartupOutput = self.data.appWorkChangeDispInfo.appDispInfoStartupOutput;
            let isDisplayPre = appDispInfoStartupOutput.appDispInfoNoDateOutput.applicationSetting.appDisplaySetting.prePostDisplayAtr;
            if (isDisplayPre == 0) {
                // 「勤務変更申請の表示情報．申請表示情報.申請表示情報(基準日関係あり).事前事後区分」を使用する
                self.application.prePostAtr = appDispInfoStartupOutput.appDispInfoWithDateOutput.prePostAtr;
            }
        }
        self.application.enteredPerson = self.user.employeeId;


    }

    public changeDate(dates: any) {
        const self = this;
        self.$mask('show');
        self.data.appWorkChangeDispInfo.workTypeCD = self.model.workType.code;
        self.data.appWorkChangeDispInfo.workTimeCD = self.model.workTime.code;
        let params = {
            companyId: self.user.companyId,
            listDates: dates,
            appWorkChangeDispInfo: self.data.appWorkChangeDispInfo
        };
        self.$http.post('at', API.updateAppWorkChange, params)
            .then((res: any) => { 
                self.data.appWorkChangeDispInfo = res.data;
                self.bindStart();
                let useDivision = self.appDispInfoStartupOutput.appDispInfoWithDateOutput.approvalFunctionSet.appUseSetLst[0].useDivision,
                recordDate = self.appDispInfoStartupOutput.appDispInfoNoDateOutput.applicationSetting.recordDate,
                opErrorFlag = self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opErrorFlag,
                msgID = '';
                if (useDivision == 0) {
                    self.$modal.error('Msg_323').then(() => {
                        if (recordDate == 0) {
                            self.$goto('ccg008a');   
                        }
                    });
                    if (recordDate == 0) {
                        self.$mask('hide');

                        return false;
                    }
                    self.$mask('hide');

                    return true;
                }
            
                if (_.isNull(opErrorFlag)) {
                    self.$mask('hide');

                    return true;    
                }
                switch (opErrorFlag) {
                    case 1:
                        msgID = 'Msg_324';
                        break;
                    case 2: 
                        msgID = 'Msg_238';
                        break;
                    case 3:
                        msgID = 'Msg_237';
                        break;
                    default: 
                        break;
                }
                if (_.isEmpty(msgID)) { 
                    self.$mask('hide');

                    return true;
                }
                self.$modal.error({ messageId: msgID }).then(() => {
                    if (recordDate == 0) {
                        self.$goto('ccg008a');    
                    }    
                });
                self.$mask('hide');
                
                return false;
                
            })
            .catch((res: any) => {
                self.$mask('hide');
                self.handleErrorMessage(res).then((msgId: any) => {
                    if (res.messageId == 'Msg_426') {
                        self.$goto('ccg008a');
                    }
                });
            }); 

    }
    public registerData(res: any) {
        const self = this;
        self.$mask('show');
        self.$http.post('at', API.registerAppWorkChange, {
            mode: self.mode,
            companyId: self.user.companyId,
            applicationDto: self.application,
            appWorkChangeDto: self.appWorkChangeDto,
            holidayDates: res.data.holidayDateLst,
            isMail: self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDispInfoNoDateOutput.mailServerSet,
            appDispInfoStartupDto: self.data.appWorkChangeDispInfo.appDispInfoStartupOutput
        }).then((res: any) => {
            self.$mask('hide');
            // KAFS00_D_申請登録後画面に移動する
            // self.$modal('kafs00d', { mode: self.mode ? ScreenMode.NEW : ScreenMode.DETAIL, appID: res.data.appID })
            //     .then((res: any) => {
            //         self.data = res;
            //         self.mode = false;
            //         self.fetchStart();
            //         self.$forceUpdate();
            //     });
            self.$http.post('at', API.reflectApp, res.data.reflectAppIdLst);
            self.$goto('kafs07a1', { mode: self.mode ? ScreenMode.NEW : ScreenMode.DETAIL, appID: res.data.appIDLst[0] });
        }).catch((res: any) => {
            self.$mask('hide');
            self.handleErrorMessage(res);
        });
    }
    public handleConfirmMessage(listMes: any, res: any) {
        const self = this;
        if (!_.isEmpty(listMes)) {
            let item = listMes.shift();
            self.$modal.confirm({ messageId: item.messageId }).then((value) => {
                self.$mask('hide');
                if (value == 'yes') {
                    if (_.isEmpty(listMes)) {
                        self.registerData(res);
                    } else {
                        self.handleConfirmMessage(listMes, res);
                    }

                }
            });
        }
    }
    public register() {
        const self = this;
        self.$mask('show');
        let validAll: boolean = true;
        
        // change work type or worktime that make time selection be can disable
        if (!self.isCondition3) {
            self.$updateValidator('valueWorkHours1', {
                timeRange: false,
                required: false
            });
        } else {
            if (self.isCondition1) {
                self.$updateValidator('valueWorkHours1', {
                    timeRange: true,
                    required: true
                });
            }
        }
        if (self.valueWorkHours1 != null) {
            
            if (self.valueWorkHours1.start != undefined && self.valueWorkHours1.end == undefined) {
                if (self.isCondition1 && self.isCondition3) {
                    self.$updateValidator('valueWorkHours1', {
                        timeRange: true,
                        required: true
                    });

                } else {
                    self.$updateValidator('valueWorkHours1', {
                        timeRange: true,
                        required: false
                    });
                }
            }
            if (self.valueWorkHours1.end != undefined && self.valueWorkHours1.start == undefined) {
                if (self.isCondition1 && self.isCondition3) {
                    self.$updateValidator('valueWorkHours1', {
                        timeRange: true,
                        required: true
                    });

                } else {
                    self.$updateValidator('valueWorkHours1', {
                        timeRange: true,
                        required: false
                    });
                }
            }
        } 
        if (self.valueWorkHours2 != null) {
           
            if (self.valueWorkHours2.start != undefined && self.valueWorkHours2.end == undefined) {
                self.$updateValidator('valueWorkHours2', {
                    timeRange: true,
                    required: true
                });
            }
            if (self.valueWorkHours2.end != undefined && self.valueWorkHours2.start == undefined) {
                self.$updateValidator('valueWorkHours2', {
                    timeRange: true,
                    required: true
                });
            }
        }
        
        for (let child of self.$children) {
            child.$validate();
            if (!child.$valid) {
                validAll = false;
            }
        }
        self.isValidateAll = validAll;
        // check validation 
        self.$validate();
        if (!self.$valid || !validAll) {
            window.scrollTo(500, 0);
            self.$updateValidator('valueWorkHours2', {
                timeRange: false,
                required: false
            });
            if (self.isCondition1 && self.isCondition3) {
                self.$updateValidator('valueWorkHours1', {
                    timeRange: false,
                    required: true
                });
                
            } else {
                self.$updateValidator('valueWorkHours1', {
                    timeRange: false,
                    required: false
                });
            }
            self.$nextTick(() => {
                self.$mask('hide');
            });

            return;
        }
        // if (self.$valid && validAll) {
        //     self.$mask('show');
        // }
        self.bindAppWorkChangeRegister();

        // check before registering application
        self.$http.post('at', API.checkBeforRegister, {
            mode: self.mode,
            companyId: self.user.companyId,
            applicationDto: self.application,
            appWorkChangeDto: self.appWorkChangeDto,
            // 申請表示情報．申請表示情報(基準日関係あり)．承認ルートエラー情報
            opMsgErrorLst: self.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDispInfoWithDateOutput.opMsgErrorLst,
            appDispInfoStartupDto: self.appDispInfoStartupOutput, 
            appWorkChangeDispInfo: self.appWorkChangeDisp
        }).then((res: any) => {
            //self.$mask('hide');
            // confirmMsgLst
            // holidayDateLst
            let isConfirm = true;
            if (!_.isEmpty(res)) {
                // display list confirm message
                if (!_.isEmpty(res.data.confirmMsgLst)) {
                    let listTemp = _.clone(res.data.confirmMsgLst);
                    self.handleConfirmMessage(listTemp, res);

                } else {
                    self.registerData(res);
                }


            } else {
                self.$mask('hide');
            }



        }).catch((res: any) => {
            self.handleErrorMessage(res);

        });

    }

    // visible/ invisible
    // A2_1


    // 「勤務変更申請の表示情報．勤務変更申請の反映.出退勤を反映するか」がする
    public isDisplay1(params: any) {
        return params.reflectWorkChangeAppDto.whetherReflectAttendance == 1;

        // return true;
    }
    // ※1 = ○　AND　「勤務変更申請の表示情報．申請表示情報．申請表示情報(基準日関係なし)．複数回勤務の管理」= true
    public isDisplay2(params: any) {
        return params.reflectWorkChangeAppDto.whetherReflectAttendance == 1 && params.appDispInfoStartupOutput.appDispInfoNoDateOutput.managementMultipleWorkCycles;
        // return false;

    }
    // A4_3  「勤務変更申請の表示情報．就業時間帯の必須区分」が「必須」または「任意」
    public isDisplay3(params: any) {
        return params.setupType == 1 || params.setupType == 0;
    }

    // 「勤務変更申請の表示情報．勤務変更申請設定．勤務時間の初期表示」が「空白」 => clear data ,true
    // 「勤務変更申請の表示情報．勤務変更申請設定．勤務時間の初期表示」が「定時」=> transfer from data ,false
    public isDisplay4(params: any) {
        // return true;
        return params.appWorkChangeSet.initDisplayWorktimeAtr == 1;

    }
    // handle message dialog

    public handleErrorMessage(res: any) {
        const self = this;
        self.$mask('hide');
        if (res.messageId == 'Msg_197') {
            self.$modal.error({ messageId: 'Msg_197', messageParams: [] }).then(() => {
                let appID = self.appDispInfoStartupOutput.appDetailScreenInfo.application.appID;
                self.$modal('cmms45c', { 'listAppMeta': [appID], 'currentApp': appID }).then((newData) => {
                    self.mode = false;
                    self.data = newData;
                    self.appWorkChangeDisp = self.data.appWorkChangeDispInfo;
                    self.fetchStart();     
                });
            });

            return;
        }
        if (res.messageId) {
            return self.$modal.error({ messageId: res.messageId, messageParams: res.parameterIds });
        } else {
            
            if (_.isArray(res.errors)) {
                return self.$modal.error({ messageId: res.errors[0].messageId, messageParams: res.parameterIds});
            } else {
                return self.$modal.error({ messageId: res.errors.messageId, messageParams: res.parameterIds });
            }
        }
    }

    // bind visible of view 
    public bindVisibleView(params: any) {
        const self = this;
        let appWorkChangeDispInfo = params;
        self.isCondition1 = self.isDisplay1(appWorkChangeDispInfo);
        self.isCondition2 = self.isDisplay2(appWorkChangeDispInfo);
        self.isCondition3 = self.isDisplay3(appWorkChangeDispInfo);
        self.isCondition4 = self.isDisplay4(appWorkChangeDispInfo);

    }
    public isOpenKDL002 = false;
    public openKDL002(name: string) {
        const self = this;
        self.isOpenKDL002 = true;
        if (name == 'worktype') {
            this.$modal(
                'worktype',
                {
                    seledtedWkTypeCDs: _.map(_.uniqBy(this.data.appWorkChangeDispInfo.workTypeLst, (e: any) => e.workTypeCode), (item: any) => item.workTypeCode),
                    selectedWorkTypeCD: this.model.workType.code,
                    seledtedWkTimeCDs: _.map(this.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDispInfoWithDateOutput.opWorkTimeLst, (item: any) => item.worktimeCode),
                    selectedWorkTimeCD: this.model.workTime.code,
                    isSelectWorkTime: 1,
                }
            ).then((f: any) => {
                if (f) {
                    // check worktime
                    let appWorkChangeSet = self.data.appWorkChangeDispInfo.appWorkChangeSet;
                    let param = {
                        companyId: self.user.companyId,
                        workType: f.selectedWorkType.workTypeCode,
                        workTime: f.selectedWorkTime ? (f.selectedWorkTime.code ? f.selectedWorkTime.code : null) : null,
                        appWorkChangeSetDto: appWorkChangeSet
                    };
                    self.$mask('show');
                    self.$http.post('at', API.checkWorkTime, param)
                        .then((res: any) => {
                            self.$mask('hide');
                            self.data.appWorkChangeDispInfo.setupType = res.data.setupType;
                            self.data.appWorkChangeDispInfo.predetemineTimeSetting = res.data.opPredetemineTimeSetting;
                            self.bindVisibleView(self.data.appWorkChangeDispInfo);
                            self.bindValueWorkHours(self.data);
                            self.model.workType.code = f.selectedWorkType.workTypeCode;
                            self.model.workType.name = f.selectedWorkType.name;
                            if (!self.isCondition3) {
                                self.model.workTime.code = '';
                                self.model.workTime.name = '';
                                self.model.workTime.time = '';
                            }
                            if (f.selectedWorkTime) {
                                if (self.isCondition3) {
                                    self.model.workTime.code = f.selectedWorkTime.code;
                                    self.model.workTime.name = f.selectedWorkTime.name;
                                    self.model.workTime.time = f.selectedWorkTime.workTime1;
                                } else {
                                    self.model.workTime.code = '';
                                    self.model.workTime.name = '';
                                    self.model.workTime.time = '';
                                }
                            }
                        })
                        .catch((res: any) => {
                            self.handleErrorMessage(res);
                        });
                    
                }
            }).catch((res: any) => {
                self.handleErrorMessage(res);
            });
        } else {
            this.$modal(
                'worktime',
                {
                    isAddNone: 1,
                    seledtedWkTimeCDs: _.map(this.data.appWorkChangeDispInfo.appDispInfoStartupOutput.appDispInfoWithDateOutput.opWorkTimeLst, (item: any) => item.worktimeCode),
                    selectedWorkTimeCD: this.model.workTime.code,
                    isSelectWorkTime: 1
                }
            ).then((f: any) => {
                if (!f) {

                    return;     
                }
                let appWorkChangeSet = self.data.appWorkChangeDispInfo.appWorkChangeSet;
                let param = {
                    companyId: self.user.companyId,
                    workType: this.model.workType.code,
                    workTime: f.selectedWorkTime ? (f.selectedWorkTime.code ? f.selectedWorkTime.code : null) : null,
                    appWorkChangeSetDto: appWorkChangeSet
                };
                self.$http.post('at', API.checkWorkTime, param)
                        .then((res: any) => {
                            self.$mask('hide');
                            self.data.appWorkChangeDispInfo.setupType = res.data.setupType;
                            self.data.appWorkChangeDispInfo.predetemineTimeSetting = res.data.opPredetemineTimeSetting;
                            self.bindVisibleView(self.data.appWorkChangeDispInfo);
                            self.bindValueWorkHours(self.data);
                            if (!(f.selectedWorkTime.code == '' && res.data.setupType == 0)) {
                                self.model.workTime.code = f.selectedWorkTime.code;
                                self.model.workTime.name = f.selectedWorkTime.name;
                                self.model.workTime.time = f.selectedWorkTime.workTime1;
                            }
                        })
                        .catch((res: any) => {
                            self.handleErrorMessage(res);
                        });

            }).catch((res: any) => {
                self.handleErrorMessage(res);
            });
        }


    }

    public kaf000BChangeDate(objectDate) {
        const self = this;
        if (objectDate.startDate) {
            if (self.mode) {
                self.application.appDate = self.$dt.date(objectDate.startDate, 'YYYY/MM/DD');
                self.application.opAppStartDate = self.$dt.date(objectDate.startDate, 'YYYY/MM/DD');
                self.application.opAppEndDate = self.$dt.date(objectDate.endDate, 'YYYY/MM/DD');
                
            }
            let dates = [];
            dates.push(self.$dt(objectDate.startDate, 'YYYY/MM/DD'));
            self.changeDate(dates);
        }
    }
    
    public kaf000BChangePrePost(prePostAtr) {
        const self = this;
        self.application.prePostAtr = prePostAtr;
    }

    public kaf000CChangeReasonCD(opAppStandardReasonCD) {
        const self = this;
        self.application.opAppStandardReasonCD = opAppStandardReasonCD;
    }

    public kaf000CChangeAppReason(opAppReason) {
        const self = this;
        self.application.opAppReason = opAppReason;
    }

    @Watch('params')
    public paramsWatcher() {
        const self = this;
        if (self.params && self.params.isDetailMode) {
            self.mode = false;
            self.data = self.params;
            self.appWorkChangeDisp = self.data.appWorkChangeDispInfo;
        } else {
            self.mode = true;
        }
        let employeeID = self.params ? self.params.employeeID : null,
            date = self.params ? self.params.date : null;
        self.fetchStart(employeeID ? employeeID : null, date ? [date] : []);
    }
}
export class Work {
    public code: String = '';
    public name: String = '';
    constructor() {

    }

}
export class WorkTime extends Work {
    // time is not showed , it displays empty #111775
    public time: String = '';
    constructor() {
        super();
    }
}

export class Model {

    public workType: Work = new Work();

    public workTime: WorkTime = new WorkTime();

    public straight: number = 2;

    public bounce: number = 2;

    constructor() {

    }
}

// 画面モード
export enum ScreenMode {
    // 新規モード
    NEW = 0,
    // 詳細モード
    DETAIL = 1
}

const API = {
    startS07: 'at/request/application/workchange/mobile/startMobile',
    checkBeforRegister: 'at/request/application/workchange/mobile/checkBeforeRegister_New',
    registerAppWorkChange: 'at/request/application/workchange/mobile/addWorkChange_New',
    updateAppWorkChange: 'at/request/application/workchange/mobile/changeDateKAFS07',
    checkWorkTime: 'at/request/application/workchange/mobile/checkWorkTime',
    reflectApp: 'at/request/application/reflect-app'
};
