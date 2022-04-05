import { component, Prop, Watch } from '@app/core/component';
import { _, Vue } from '@app/provider';
import { KDL002Component } from '../../../../kdl/002';
import { TimeWithDay } from '@app/utils';
import { OvertimeAgreement, AgreementTimeStatusOfMonthly, Kafs05Model } from '../common/CommonClass';
import { CmmS45CComponent } from '../../../../cmm/s45/c';

@component({
    name: 'kafS05_1',
    template: require('./index.html'),
    resource: require('../../resources.json'),
    components: {
        'worktype': KDL002Component,
        'cmms45c': CmmS45CComponent
    },
    validations: {
        kafs05ModelStep1: {
            appDate: {
                required: true
            },
            workTimeInput: {
                timeRange: true,
                required: true,
            },
            prePostSelected: {
                validateSwitchbox: {
                    test(value: number) {
                        if (this.kafs05ModelStep1.isCreate && this.kafs05ModelStep1.displayPrePostFlg) {
                            if (value != 0 && value != 1) {
                                document.body.getElementsByClassName('valid-switchbox')[0].className += ' invalid';

                                return false;
                            }
                            document.body.getElementsByClassName('valid-switchbox')[0].className += 'valid-switchbox';

                            return true;
                        }

                        return true;
                    },
                    messageId: 'MsgB_30'
                }
            },
            workTypeCd: {
                check: {
                    test(value: string) {
                        if (this.kafs05ModelStep1.displayCaculationTime) {
                            if (_.isNil(value) || '' == value) {
                                return false;
                            }

                            return true;
                        }

                        return true;
                    },
                    messageId: 'MsgB_30'
                }
            },
            workTypeName: {
                check(value: string) {
                    if (this.kafs05ModelStep1.displayCaculationTime) {
                        if (value == this.$i18n('KAL003_120')) {
                            return ['Msg_1530', '勤務種類コード' + this.kafs05ModelStep1.workTypeCd];
                        }

                        return false;
                    }

                    return false;
                }
            },
            siftName: {
                check(value: string) {
                    if (this.kafs05ModelStep1.displayCaculationTime) {
                        if (value == this.$i18n('KAL003_120')) {
                            return ['Msg_1530', '就業時間帯コード' + this.kafs05ModelStep1.siftCD];
                        }

                        return false;
                    }

                    return false;
                }
            }
        },
    },
})
export class KafS05aStep1Component extends Vue {
    @Prop()
    public kafs05ModelStep1: Kafs05Model;

    @Watch('kafs05ModelStep1.restTime', { deep: true })
    public setRestTimes(restTime: any) {
        _.map(restTime, (x) => { x.startTime = x.restTimeInput.start; x.endTime = x.restTimeInput.end; });
    }

    @Watch('kafs05ModelStep1.workTimeInput', { deep: true })
    public changeTimeInput(workTimeInput: any) {
        let self = this;

        self.$http.post('at', servicePath.getByChangeTime, {
            workTypeCD: self.kafs05ModelStep1.workTypeCd,
            workTimeCD: self.kafs05ModelStep1.siftCD,
            startTime: workTimeInput.start,
            endTime: workTimeInput.end
        }).then((result: { data: any }) => {
            // 休憩時間
            self.setTimeZones(result.data);
            self.kafs05ModelStep1.resetTimeRange++;
        });
    }

    public mounted() {
        let self = this;
        
        document.scrollingElement.scrollTop = 0;
        if (self.$router.currentRoute.name == 'kafS05a') {
            self.applyWatcher();
        }
        if (self.kafs05ModelStep1.step1Start) {
            self.$mask('show', { message: true });
        }
    }

    public created() {
        let self = this.kafs05ModelStep1;

        if (self.step1Start) {
            this.startPage();
        } else {
            this.$mask('hide');
        }
    }

    public openKDL002() {
        let self = this.kafs05ModelStep1;

        this.$validate('kafs05ModelStep1.appDate');

        this.$modal(
            'worktype',
            {
                seledtedWkTypeCDs: self.workTypecodes,
                selectedWorkTypeCD: self.workTypeCd,
                seledtedWkTimeCDs: self.workTimecodes,
                selectedWorkTimeCD: self.siftCD,
                isSelectWorkTime: '1',
            }
        ).then((f: any) => {
            let self = this.kafs05ModelStep1;
            if (f) {
                self.workTypeCd = f.selectedWorkType.workTypeCode;
                self.workTypeName = f.selectedWorkType.name;
                self.siftCD = f.selectedWorkTime.code;
                self.siftName = f.selectedWorkTime.name;
                self.selectedWorkTime = f.selectedWorkTime.workTime1;
                this.$http.post('at', servicePath.getRecordWork, {
                    employeeID: self.employeeID,
                    appDate: _.isNil(self.appDate) ? null : this.$dt(self.appDate),
                    siftCD: self.siftCD,
                    prePostAtr: self.prePostSelected,
                    overtimeHours: _.map(self.overtimeHours, (item) => this.initCalculateData(item)),
                    workTypeCode: self.workTypeCd,
                    startTimeRests: _.isEmpty(self.restTime) ? [] : _.map(self.restTime, (x) => x.restTimeInput.start),
                    endTimeRests: _.isEmpty(self.restTime) ? [] : _.map(self.restTime, (x) => x.restTimeInput.end),
                    restTimeDisFlg: self.restTimeDisFlg,
                    overtimeSettingDataDto: self.overtimeSettingDataDto
                }).then((result: { data: any }) => {
                    self.workTimeInput.start = result.data.startTime1 == null ? null : result.data.startTime1;
                    self.workTimeInput.end = result.data.endTime1 == null ? null : result.data.endTime1;

                    // 休憩時間
                    this.setTimeZones(result.data.timezones);
                    self.resetTimeRange++;
                });
            }
        }).catch((res: any) => {
            this.$modal.error({ messageId: res.messageId });
        });
    }

    public calculate() {
        let self = this.kafs05ModelStep1;

        if (!self.displayCaculationTime) {
            this.$updateValidator('kafs05ModelStep1.workTimeInput', { required: false });
        }

        this.$validate();
        if (!this.$valid) {
            document.scrollingElement.scrollTop = 0;

            return;
        }

        this.$mask('show', { message: true });
        let param: any = {
            overtimeHours: _.map(self.overtimeHours, (item) => this.initCalculateData(item)),
            bonusTimes: _.map(self.bonusTimes, (item) => this.initCalculateData(item)),
            prePostAtr: self.prePostSelected,
            appDate: _.isNil(self.appDate) ? null : this.$dt(self.appDate),
            siftCD: self.siftCD,
            workTypeCode: self.workTypeCd,
            startTimeRests: _.isEmpty(self.restTime) ? [] : _.map(self.restTime, (x) => x.restTimeInput.start),
            endTimeRests: _.isEmpty(self.restTime) ? [] : _.map(self.restTime, (x) => x.restTimeInput.end),
            startTime: _.isNil(self.workTimeInput.start) ? null : self.workTimeInput.start,
            endTime: _.isNil(self.workTimeInput.end) ? null : self.workTimeInput.end,
            displayCaculationTime: self.displayCaculationTime,
            isFromStepOne: true,
            opAppBefore: self.opAppBefore,
            beforeAppStatus: self.beforeAppStatus,
            actualStatus: self.actualStatus,
            actualLst: self.actualLst,
            overtimeSettingDataDto: self.overtimeSettingDataDto
        };

        let overtimeHoursResult: Array<any>;
        let overtimeHoursbk = self.overtimeHours.slice().concat(self.bonusTimes.slice());

        this.$http.post('at', servicePath.getCalculationResultMob, param).then((result: { data: any }) => {
            _.remove(self.overtimeHours);
            _.remove(self.bonusTimes);
            overtimeHoursResult = result.data.resultLst;
            if (overtimeHoursResult != null) {
                for (let i = 0; i < overtimeHoursResult.length; i++) {
                    //残業時間
                    if (overtimeHoursResult[i].attendanceID == 1) {
                        if (overtimeHoursResult[i].frameNo != 11 && overtimeHoursResult[i].frameNo != 12) {
                            self.overtimeHours.push({
                                companyID: '',
                                appID: '',
                                attendanceID: overtimeHoursResult[i].attendanceID,
                                attendanceName: '',
                                frameNo: overtimeHoursResult[i].frameNo,
                                timeItemTypeAtr: 0,
                                frameName: overtimeHoursbk[i].frameName,
                                applicationTime: overtimeHoursResult[i].appTime,
                                preAppTime: overtimeHoursResult[i].preAppTime,
                                caculationTime: overtimeHoursResult[i].actualTime,
                                nameID: '#[KAF005_55]',
                                itemName: 'KAF005_55',
                                color: '',
                                preAppExceedState: overtimeHoursResult[i].preAppError,
                                actualExceedState: overtimeHoursResult[i].actualError,
                            });
                        } else if (overtimeHoursResult[i].frameNo == 11) {
                            self.overtimeHours.push({
                                companyID: '',
                                appID: '',
                                attendanceID: overtimeHoursResult[i].attendanceID,
                                attendanceName: '',
                                frameNo: overtimeHoursResult[i].frameNo,
                                timeItemTypeAtr: 0,
                                frameName: 'KAF005_63',
                                applicationTime: overtimeHoursResult[i].appTime,
                                preAppTime: overtimeHoursResult[i].preAppTime,
                                caculationTime: overtimeHoursResult[i].actualTime,
                                nameID: '#[KAF005_64]',
                                itemName: 'KAF005_55',
                                color: '',
                                preAppExceedState: overtimeHoursResult[i].preAppError,
                                actualExceedState: overtimeHoursResult[i].actualError,
                            });
                        } else if (overtimeHoursResult[i].frameNo == 12) {
                            self.overtimeHours.push({
                                companyID: '',
                                appID: '',
                                attendanceID: overtimeHoursResult[i].attendanceID,
                                attendanceName: '',
                                frameNo: overtimeHoursResult[i].frameNo,
                                timeItemTypeAtr: 0,
                                frameName: 'KAF005_65',
                                applicationTime: overtimeHoursResult[i].appTime,
                                preAppTime: overtimeHoursResult[i].preAppTime,
                                caculationTime: overtimeHoursResult[i].actualTime,
                                nameID: '#[KAF005_66]',
                                itemName: 'KAF005_55',
                                color: '',
                                preAppExceedState: overtimeHoursResult[i].preAppError,
                                actualExceedState: overtimeHoursResult[i].actualError,
                            });
                        }
                    }
                    //加給時間
                    if (overtimeHoursResult[i].attendanceID == 3) {
                        self.bonusTimes.push({
                            companyID: '',
                            appID: '',
                            attendanceID: overtimeHoursResult[i].attendanceID,
                            attendanceName: '',
                            frameNo: overtimeHoursResult[i].frameNo,
                            timeItemTypeAtr: overtimeHoursbk[i].timeItemTypeAtr,
                            frameName: overtimeHoursbk[i].frameName,
                            applicationTime: overtimeHoursResult[i].appTime,
                            preAppTime: overtimeHoursResult[i].preAppTime,
                            caculationTime: null,
                            nameID: '',
                            itemName: '',
                            color: '',
                            preAppExceedState: overtimeHoursResult[i].preAppError,
                            actualExceedState: overtimeHoursResult[i].actualError,
                        });
                    }
                }
            }
            // 実績なし 登録不可
            if ((self.actualStatus == 3 && self.performanceExcessAtr == 2)) {
                this.$mask('hide');
                setTimeout(() => {
                    document.scrollingElement.scrollTop = 0;
                }, 100);

                return;
            }
            this.$emit('toStep2', this.kafs05ModelStep1);
            this.$mask('hide');
        }).catch((res: any) => {
            if (res.messageId == 'Msg_426') {
                this.$modal.error({ messageId: res.messageId }).then(() => {
                    this.$auth.logout();
                });
            } else if (res.messageId == 'Msg_424') {
                this.$modal.error({ messageId: 'Msg_424', messageParams: [res.parameterIds[0], res.parameterIds[1], res.parameterIds[2]] });
            } else if (res.messageId == 'Msg_1508') {
                this.$modal.error({ messageId: 'Msg_1508', messageParams: [res.parameterIds[0]] });
            } else {
                this.$modal.error({ messageId: res.messageId }).then(() => {
                    this.$mask('hide');
                    this.$goto('ccg008a');
                });
            }
        });
    }
    public startPage() {
        let self = this.kafs05ModelStep1;

        if (!_.isNil(self.appID)) {
            this.$http.post('at', servicePath.getDetailCheck, {
                applicationID: self.appID, baseDate: this.$dt(new Date())
            }).then((result: { data: any }) => {
                self.user = result.data.user;
                self.reflectPerState = result.data.reflectPlanState;
                if (self.reflectPerState != 0 && self.reflectPerState != 5) {
                    this.$modal.error({ messageId: 'Msg_1555' }).then(() => {
                        this.$modal('cmms45c', { 'listAppMeta': [self.appID], 'currentApp': self.appID }).then(() => {
                            self.step1Start = true;
                            this.$emit('backToStep1', self);
                        });
                    });
                }
                this.$http.post('at', servicePath.findByAppID, self.appID)
                .then((result: { data: any }) => {
                    this.initData(result.data);
                    this.$mask('hide');
                    this.$validate('clear');
                }).catch((res: any) => {
                    this.$modal.error({ messageId: res.messageId }).then(() => {
                        this.$mask('hide');
                        this.$goto('ccg008a');
                    });
                });
            }).catch((res: any) => {
                if (res.messageId == 'Msg_426') {
                    this.$modal.error({ messageId: res.messageId }).then(() => {
                        this.$auth.logout();
                    });
                } else {
                    this.$modal.error({ messageId: res.messageId }).then(() => {
                        this.$goto('cmms45a', { CMMS45_FromMenu: false });
                    });
                }
            });            
        } else {
            this.$http.post('at', servicePath.getOvertimeByUI, {
                url: this.$route.query.overworkatr == undefined ? 0 : this.$route.query.overworkatr,
                appDate: self.appDate,
                uiType: self.uiType,
                timeStart1: self.workTimeInput.start,
                timeEnd1: self.workTimeInput.end,
                reasonContent: self.multilContent,
                employeeIDs: self.employeeIDs,
                employeeID: self.employeeID
            }).then((result: { data: any }) => {
                this.initData(result.data);
                this.$mask('hide');
            }).catch((res: any) => {
                if (res.messageId == 'Msg_426') {
                    this.$modal.error({ messageId: res.messageId }).then(() => {
                        this.$auth.logout();
                    });
                } else {
                    this.$modal.error({ messageId: res.messageId }).then(() => {
                        this.$mask('hide');
                        this.$goto('ccg008a');
                    });
                }
            });
        }
    }

    public applyWatcher() {
        this.$watch('kafs05ModelStep1.appDate', function (value: Date) {
            let self = this.kafs05ModelStep1;
            this.$mask('show', { message: true });
            this.$http.post('at', servicePath.findByChangeAppDate, {
                appDate: this.$dt(value),
                prePostAtr: self.prePostSelected,
                siftCD: self.siftCD,
                overtimeHours: _.map(self.overtimeHours, (item) => this.initCalculateData(item)),
                workTypeCode: self.workTypeCd,
                startTimeRests: _.isEmpty(self.restTime) ? [] : _.map(self.restTime, (x) => x.restTimeInput.start),
                endTimeRests: _.isEmpty(self.restTime) ? [] : _.map(self.restTime, (x) => x.restTimeInput.end),
                startTime: _.isEmpty(self.workTimeInput.start) ? null : self.workTimeInput.start,
                endTime: _.isEmpty(self.workTimeInput.end) ? null : self.workTimeInput.end,
                overtimeAtr: self.overtimeAtr,
                changeEmployee: _.isEmpty(self.employeeList) ? null : self.employeeList[0].id
            }).then((result: { data: any }) => {
                this.changeAppDateData(result.data);
                this.checkAppDate(0, this.$dt(value), false, self.employeeID, self.overtimeAtr);
                self.resetTimeRange++;
                this.$mask('hide');
            }).catch((res: any) => {
                this.$mask('hide');
                this.$modal.error({ messageId: res.messageId });
            });
        });
    }

    public checkAppDate(appType: number, appDate: string, isStartup: boolean, employeeID: string, overtimeAtr: any) {
        let self = this.kafs05ModelStep1;
        this.$http.post('at', servicePath.getAppDataDate, {
            appTypeValue: appType,
            appDate,
            isStartup,
            employeeID,
            overtimeAtrkafs05ModelStep1: overtimeAtr
        }).then((result: { data: any }) => {
            if (!_.isNil(result.data.errorFlag)) {
                if (isStartup == false) {
                    switch (result.data.errorFlag) {
                        case 1:
                            this.$modal.error({ messageId: 'Msg_324' }).then(() => {
                                return;
                            });
                            break;
                        case 2:
                            this.$modal.error({ messageId: 'Msg_238' }).then(() => {
                                return;
                            });
                            break;
                        case 3:
                            this.$modal.error({ messageId: 'Msg_237' }).then(() => {
                                return;
                            });
                            break;
                        default:
                    }
                }
            }
        }).catch((res: any) => {
            this.$mask('hide');
            this.$modal.error({ messageId: res.messageId });
        });
    }

    public initData(data) {
        let self = this.kafs05ModelStep1;
        if (!_.isNil(self.appID)) {
            self.appDate = this.$dt.fromString(data.application.applicationDate);
            self.enteredPersonName = data.enteredPersonName;
            self.version = data.application.version;
            self.employeeID = data.application.applicantSID;
        } else {
            self.employeeID = data.employeeID;
        }
        self.requiredReason = data.requireAppReasonFlg;
        self.enableOvertimeInput = data.enableOvertimeInput;
        self.checkBoxValue = !data.manualSendMailAtr;
        self.enableSendMail = !data.sendMailWhenRegisterFlg;
        self.displayPrePostFlg = data.displayPrePostFlg ? true : false;
        self.prePostSelected = data.application.prePostAtr;
        self.displayCaculationTime = data.displayCaculationTime;
        self.typicalReasonDisplayFlg = data.typicalReasonDisplayFlg;
        self.displayAppReasonContentFlg = data.displayAppReasonContentFlg;
        self.displayDivergenceReasonForm = data.displayDivergenceReasonForm;
        self.displayDivergenceReasonInput = data.displayDivergenceReasonInput;
        self.displayBonusTime = data.displayBonusTime;
        self.restTimeDisFlg = data.displayRestTime;
        self.employeeName = data.employeeName;

        if (data.siftType != null) {
            self.siftCD = data.siftType.siftCode;
            self.siftName = this.getName(data.siftType.siftCode, data.siftType.siftName);
        }
        if (data.workType != null) {
            self.workTypeCd = data.workType.workTypeCode;
            self.workTypeName = this.getName(data.workType.workTypeCode, data.workType.workTypeName);
        }
        self.workTypecodes = data.workTypes;
        self.workTimecodes = data.siftTypes;
        self.workTimeInput.start = data.workClockFrom1 == null ? null : data.workClockFrom1;
        self.workTimeInput.end = data.workClockTo1 == null ? null : data.workClockTo1;
        if (data.applicationReasonDtos != null && data.applicationReasonDtos.length > 0) {
            self.reasonCombo = _.map(data.applicationReasonDtos, (o) => ({ reasonId: o.reasonID, reasonName: o.reasonTemp }));
            if (!_.isNil(self.appID)) {
                self.selectedReason = data.applicationReasonDtos[0].reasonID;
            } else {
                self.selectedReason = _.find(data.applicationReasonDtos, (o) => o.defaultFlg == 1).reasonID;
            }
        }
        if (data.application.applicationReason != null) {
            self.multilContent = data.application.applicationReason;
        }
        if (data.divergenceReasonDtos != null && data.divergenceReasonDtos.length > 0) {
            self.reasonCombo2 = _.map(data.divergenceReasonDtos, (o) => ({ reasonId: o.divergenceReasonID, reasonName: o.reasonTemp }));
            let defaultID = _.find(data.divergenceReasonDtos, (o) => o.divergenceReasonIdDefault == 1);
            if (!_.isNil(defaultID)) {
                self.selectedReason2 = defaultID.divergenceReasonID;
            } else {
                self.selectedReason2 = '';
            }
        }
        if (data.divergenceReasonContent != null) {
            self.multilContent2 = data.divergenceReasonContent;
        }

        self.prePostEnable = data.prePostCanChangeFlg;
        if (self.prePostSelected == 2) {
            self.prePostEnable = true;
        }
        self.indicationOvertimeFlg = data.extratimeDisplayFlag;
        if (!_.isNil(self.appID)) {
            if (_.isNil(data.appOvertimeDetailDto)) {
                self.indicationOvertimeFlg = false;
            } else {
                this.setOvertimeWorkDetail(data.appOvertimeDetailDto, self, data.appOvertimeDetailStatus);
            }
        } else {
            if (_.isNil(data.agreementTimeDto)) {
                self.indicationOvertimeFlg = false;
            } else {
                this.setOvertimeWork(data.agreementTimeDto, self);
            }
        }

        self.workTypeChangeFlg = data.workTypeChangeFlg;
        // list employeeID
        if (!_.isEmpty(data.employees)) {
            self.employeeFlag = true;
            for (let i = 0; i < data.employees.length; i++) {
                self.employeeList.push({ id: data.employees[i].employeeIDs, name: data.employees[i].employeeName });
            }
            let total = data.employees.length;
            //self.totalEmployee
        }
        if (_.isNil(self.appID)) {
            // 休憩時間
            this.setTimeZones(data.timezones);

            // 残業時間
            if (!data.resultCaculationTimeFlg) {
                if (data.overTimeInputs != null) {
                    for (let i = 0; i < data.overTimeInputs.length; i++) {
                        if (data.overTimeInputs[i].attendanceID == 1) {
                            self.overtimeHours.push({
                                companyID: '',
                                appID: '',
                                attendanceID: data.overTimeInputs[i].attendanceID,
                                attendanceName: '',
                                frameNo: data.overTimeInputs[i].frameNo,
                                timeItemTypeAtr: 0,
                                frameName: data.overTimeInputs[i].frameName,
                                applicationTime: null,
                                preAppTime: null,
                                caculationTime: null,
                                nameID: '#[KAF005_55]',
                                itemName: 'KAF005_85',
                                color: '',
                                preAppExceedState: false,
                                actualExceedState: 0,
                            });
                        }
                        if (data.overTimeInputs[i].attendanceID == 2) {
                            self.breakTimes.push({
                                companyID: '',
                                appID: '',
                                attendanceID: data.overTimeInputs[i].attendanceID,
                                attendanceName: '',
                                frameNo: data.overTimeInputs[i].frameNo,
                                timeItemTypeAtr: 0,
                                frameName: data.overTimeInputs[i].frameName,
                                applicationTime: null,
                                preAppTime: null,
                                caculationTime: null,
                                nameID: '',
                                itemName: '',
                                color: '',
                                preAppExceedState: false,
                                actualExceedState: 0,
                            });
                        }
                        if (data.overTimeInputs[i].attendanceID == 3) {
                            self.bonusTimes.push({
                                companyID: '',
                                appID: '',
                                attendanceID: data.overTimeInputs[i].attendanceID,
                                attendanceName: '',
                                frameNo: data.overTimeInputs[i].frameNo,
                                timeItemTypeAtr: data.overTimeInputs[i].timeItemTypeAtr,
                                frameName: data.overTimeInputs[i].frameName,
                                applicationTime: null,
                                preAppTime: null,
                                caculationTime: null,
                                nameID: '',
                                itemName: '',
                                color: '',
                                preAppExceedState: false,
                                actualExceedState: 0,
                            });
                        }
                    }
                }

                if (data.appOvertimeNightFlg == 1) {
                    self.overtimeHours.push({
                        companyID: '',
                        appID: '',
                        attendanceID: 1,
                        attendanceName: '',
                        frameNo: 11,
                        timeItemTypeAtr: 0,
                        frameName: this.$i18n('KAF005_63'),
                        applicationTime: null,
                        preAppTime: null,
                        caculationTime: null,
                        nameID: '#[KAF005_64]',
                        itemName: 'KAF005_85',
                        color: '',
                        preAppExceedState: false,
                        actualExceedState: 0,
                    });
                }

                if (data.flexFLag) {
                    self.overtimeHours.push({
                        companyID: '',
                        appID: '',
                        attendanceID: 1,
                        attendanceName: '',
                        frameNo: 12,
                        timeItemTypeAtr: 0,
                        frameName: this.$i18n('KAF005_65'),
                        applicationTime: null,
                        preAppTime: null,
                        caculationTime: null,
                        nameID: '#[KAF005_66]',
                        itemName: 'KAF005_85',
                        color: '',
                        preAppExceedState: false,
                        actualExceedState: 0,
                    });
                }
            } else {
                let dataOverTime = _.filter(data.caculationTimes, { 'attendanceID': 1 });
                let dataBonusTime = _.filter(data.caculationTimes, { 'attendanceID': 3 });
                _.forEach(dataOverTime, (item: any) => {
                    let color: string = '';
                    if (item.errorCode == 1) {
                        color = '#FD4D4D';
                    }
                    if (item.errorCode == 2) {
                        color = '#F6F636';
                    }
                    if (item.errorCode == 3) {
                        color = '#F69164';
                    }
                    if (item.frameNo == 11) {
                        if (data.appOvertimeNightFlg == 1) {
                            self.overtimeHours.push({
                                companyID: item.companyID,
                                appID: item.appID,
                                attendanceID: item.attendanceID,
                                attendanceName: '',
                                frameNo: item.frameNo,
                                timeItemTypeAtr: item.timeItemTypeAtr,
                                frameName: 'KAF005_63',
                                applicationTime: item.applicationTime,
                                preAppTime: null,
                                caculationTime: null,
                                nameID: '#[KAF005_64]',
                                itemName: 'KAF005_85',
                                color,
                                preAppExceedState: false,
                                actualExceedState: 0,
                            });
                        }
                    } else if (item.frameNo == 12) {
                        if (data.flexFLag) {
                            self.overtimeHours.push({
                                companyID: item.companyID,
                                appID: item.appID,
                                attendanceID: item.attendanceID,
                                attendanceName: '',
                                frameNo: item.frameNo,
                                timeItemTypeAtr: item.timeItemTypeAtr,
                                frameName: 'KAF005_65',
                                applicationTime: item.applicationTime,
                                preAppTime: null,
                                caculationTime: null,
                                nameID: '#[KAF005_66]',
                                itemName: 'KAF005_85',
                                color,
                                preAppExceedState: false,
                                actualExceedState: 0,
                            });
                        }
                    } else {
                        self.overtimeHours.push({
                            companyID: item.companyID,
                            appID: item.appID,
                            attendanceID: item.attendanceID,
                            attendanceName: '',
                            frameNo: item.frameNo,
                            timeItemTypeAtr: item.timeItemTypeAtr,
                            frameName: item.frameName,
                            applicationTime: item.applicationTime,
                            preAppTime: null,
                            caculationTime: null,
                            nameID: '#[KAF005_55]',
                            itemName: 'KAF005_85',
                            color,
                            preAppExceedState: false,
                            actualExceedState: 0,
                        });
                    }

                });
                _.forEach(dataBonusTime, (item: any) => {
                    self.bonusTimes.push({
                        companyID: item.companyID,
                        appID: item.appID,
                        attendanceID: item.attendanceID,
                        attendanceName: '',
                        frameNo: item.frameNo,
                        timeItemTypeAtr: item.timeItemTypeAtr,
                        frameName: item.frameName,
                        applicationTime: item.applicationTime,
                        preAppTime: null,
                        caculationTime: null,
                        nameID: '',
                        itemName: '',
                        color: '',
                        preAppExceedState: false,
                        actualExceedState: 0,
                    });
                });
            }
        } else {
            let dataRestTime: any = _.filter(data.overTimeInputs, { 'attendanceID': 0 });
            let dataOverTime: any = _.filter(data.overTimeInputs, { 'attendanceID': 1 });
            let dataBreakTime: any = _.filter(data.overTimeInputs, { 'attendanceID': 2 });
            let dataBonusTime: any = _.filter(data.overTimeInputs, { 'attendanceID': 3 });
            _.remove(self.restTime);
            _.remove(self.overtimeHours);
            _.remove(self.breakTimes);
            _.remove(self.bonusTimes);
            if (_.isEmpty(dataRestTime)) {
                for (let i = 0; i < 11; i++) {
                    self.restTime.push({
                        companyID: '',
                        appID: '',
                        attendanceID: 0,
                        attendanceName: '',
                        frameNo: i,
                        timeItemTypeAtr: 0,
                        frameName: i.toString(),
                        applicationTime: null,
                        nameID: '',
                        restTimeInput: null,
                        startTime: null,
                        endTime: null,
                    });
                }
            } else {
                _.forEach(dataRestTime, (item: any) => {

                    self.restTime.push({
                        companyID: item.companyID,
                        appID: item.appID,
                        attendanceID: item.attendanceID,
                        attendanceName: '',
                        frameNo: item.frameNo,
                        timeItemTypeAtr: item.timeItemTypeAtr,
                        frameName: item.frameName,
                        applicationTime: item.applicationTime,
                        nameID: '',
                        restTimeInput: { start: item.startTime, end: item.endTime },
                        startTime: item.startTime,
                        endTime: item.endTime,
                    });
                });
            }
            _.forEach(dataOverTime, (item: any) => {
                if (item.frameNo == 11) {
                    if (data.appOvertimeNightFlg == 1) {
                        self.overtimeHours.push({
                            companyID: item.companyID,
                            appID: item.appID,
                            attendanceID: item.attendanceID,
                            attendanceName: '',
                            frameNo: item.frameNo,
                            timeItemTypeAtr: item.timeItemTypeAtr,
                            frameName: 'KAF005_63',
                            applicationTime: item.applicationTime,
                            preAppTime: null,
                            caculationTime: null,
                            nameID: '#[KAF005_64]',
                            itemName: '',
                            color: '',
                            preAppExceedState: item.preAppExceedState,
                            actualExceedState: item.actualExceedState,
                        });
                    }
                } else if (item.frameNo == 12) {
                    if (data.flexFLag) {
                        self.overtimeHours.push({
                            companyID: item.companyID,
                            appID: item.appID,
                            attendanceID: item.attendanceID,
                            attendanceName: '',
                            frameNo: item.frameNo,
                            timeItemTypeAtr: item.timeItemTypeAtr,
                            frameName: 'KAF005_65',
                            applicationTime: item.applicationTime,
                            preAppTime: null,
                            caculationTime: null,
                            nameID: '#[KAF005_66]',
                            itemName: '',
                            color: '',
                            preAppExceedState: item.preAppExceedState,
                            actualExceedState: item.actualExceedState,
                        });
                    }
                } else {
                    self.overtimeHours.push({
                        companyID: item.companyID,
                        appID: item.appID,
                        attendanceID: item.attendanceID,
                        attendanceName: '',
                        frameNo: item.frameNo,
                        timeItemTypeAtr: item.timeItemTypeAtr,
                        frameName: item.frameName,
                        applicationTime: item.applicationTime,
                        preAppTime: null,
                        caculationTime: null,
                        nameID: '#[KAF005_55]',
                        itemName: '',
                        color: '',
                        preAppExceedState: item.preAppExceedState,
                        actualExceedState: item.actualExceedState,
                    });
                }

            });
            _.forEach(dataBreakTime, (item: any) => {
                self.breakTimes.push({
                    companyID: item.companyID,
                    appID: item.appID,
                    attendanceID: item.attendanceID,
                    attendanceName: '',
                    frameNo: item.frameNo,
                    timeItemTypeAtr: item.timeItemTypeAtr,
                    frameName: item.frameName,
                    applicationTime: item.applicationTime,
                    preAppTime: null,
                    caculationTime: null,
                    nameID: '',
                    itemName: '',
                    color: '',
                    preAppExceedState: item.preAppExceedState,
                    actualExceedState: item.actualExceedState,
                });
            });
            _.forEach(dataBonusTime, (item) => {
                self.bonusTimes.push({
                    companyID: item.companyID,
                    appID: item.appID,
                    attendanceID: item.attendanceID,
                    attendanceName: '',
                    frameNo: item.frameNo,
                    timeItemTypeAtr: item.timeItemTypeAtr,
                    frameName: item.frameName,
                    applicationTime: item.applicationTime,
                    preAppTime: null,
                    caculationTime: null,
                    nameID: '',
                    itemName: '',
                    color: '',
                    preAppExceedState: item.preAppExceedState,
                    actualExceedState: item.actualExceedState,
                });
            });
        }

        self.overtimeAtr = data.overtimeAtr;
        if (!_.isNil(self.appID)) {
            if (self.overtimeAtr == 0) {
                this.pgName = 'kafS05b0';
            } else if (self.overtimeAtr == 1) {
                this.pgName = 'kafS05b1';
            } else if (self.overtimeAtr == 2) {
                this.pgName = 'kafS05b2';
            } else {
                this.pgName = 'kafS05b2';
            }
        }
        if (!_.isNil(data.worktimeStart) && !_.isNil(data.worktimeEnd)) {
            if (_.isNil(self.siftCD) || self.siftName == this.$i18n('KAL003_120')) {
                self.selectedWorkTime = '';
            } else {
                self.selectedWorkTime = TimeWithDay.toString(data.worktimeStart) + '～' + TimeWithDay.toString(data.worktimeEnd);
            }
        }
        self.performanceExcessAtr = data.performanceExcessAtr;
        self.overtimeSettingDataDto = data.overtimeSettingDataDto;
        self.opAppBefore = data.opAppBefore;
        self.beforeAppStatus = data.beforeAppStatus;
        self.actualStatus = data.actualStatus;
        self.actualLst = data.actualLst;
        self.preExcessDisplaySetting = data.overtimeSettingDataDto.overtimeRestAppCommonSet.preExcessDisplaySetting;
    }

    public changeAppDateData(data: any) {
        let self = this.kafs05ModelStep1;
        self.checkBoxValue = !data.manualSendMailAtr;
        self.enableSendMail = !data.sendMailWhenRegisterFlg;
        self.prePostSelected = data.application.prePostAtr;
        self.displayPrePostFlg = data.displayPrePostFlg ? true : false;
        self.displayCaculationTime = data.displayCaculationTime;
        self.employeeName = data.employeeName;
        if (data.siftType != null) {
            self.siftCD = data.siftType.siftCode;
            self.siftName = this.getName(data.siftType.siftCode, data.siftType.siftName);
        }
        if (data.workType != null) {
            self.workTypeCd = data.workType.workTypeCode;
            self.workTypeName = data.workType.workTypeName || this.$i18n('KAL003_120');
        }

        self.workTimeInput.start = data.workClockFrom1;
        self.workTimeInput.end = data.workClockTo1;

        if (data.applicationReasonDtos != null) {
            self.reasonCombo = _.map(data.applicationReasonDtos, (o) => ({ reasonId: o.reasonID, reasonName: o.reasonTemp }));
            self.selectedReason = _.find(data.applicationReasonDtos, (o) => o.defaultFlg == 1).reasonID;
            self.multilContent = data.application.applicationReason;
        }

        if (data.divergenceReasonDtos != null) {
            self.reasonCombo2 = _.map(data.divergenceReasonDtos, (o) => ({ reasonId: o.divergenceReasonID, reasonName: o.reasonTemp }));
            let defaultID = _.find(data.divergenceReasonDtos, (o) => o.divergenceReasonIdDefault == 1);
            if (!_.isNil(defaultID)) {
                self.selectedReason2 = defaultID.divergenceReasonID;
            } else {
                self.selectedReason2 = '';
            }
            self.multilContent2 = data.divergenceReasonContent;
        }

        // 残業時間
        if (data.overTimeInputs != null) {
            for (let i = 0; i < data.overTimeInputs.length; i++) {
                //1: 残業時間
                if (data.overTimeInputs[i].attendanceID == 1) {
                    self.overtimeHours.push({
                        companyID: '',
                        appID: '',
                        attendanceID: data.overTimeInputs[i].attendanceID,
                        attendanceName: '',
                        frameNo: data.overTimeInputs[i].frameNo,
                        timeItemTypeAtr: 0,
                        frameName: data.overTimeInputs[i].frameName,
                        applicationTime: null,
                        preAppTime: null,
                        caculationTime: null,
                        nameID: '#[KAF005_55]',
                        itemName: '',
                        color: '',
                        preAppExceedState: false,
                        actualExceedState: 0,
                    });
                }
                if (data.overTimeInputs[i].attendanceID == 2) {
                    self.breakTimes.push({
                        companyID: '',
                        appID: '',
                        attendanceID: data.overTimeInputs[i].attendanceID,
                        attendanceName: '',
                        frameNo: data.overTimeInputs[i].frameNo,
                        timeItemTypeAtr: 0,
                        frameName: data.overTimeInputs[i].frameName,
                        applicationTime: null,
                        preAppTime: null,
                        caculationTime: null,
                        nameID: '',
                        itemName: '',
                        color: '',
                        preAppExceedState: false,
                        actualExceedState: 0,
                    });
                }
                if (data.overTimeInputs[i].attendanceID == 3) {
                    self.bonusTimes.push({
                        companyID: '',
                        appID: '',
                        attendanceID: data.overTimeInputs[i].attendanceID,
                        attendanceName: '',
                        frameNo: data.overTimeInputs[i].frameNo,
                        timeItemTypeAtr: data.overTimeInputs[i].timeItemTypeAtr,
                        frameName: data.overTimeInputs[i].frameName,
                        applicationTime: null,
                        preAppTime: null,
                        caculationTime: null,
                        nameID: '',
                        itemName: '',
                        color: '',
                        preAppExceedState: false,
                        actualExceedState: 0,
                    });
                }
            }
        }

        self.opAppBefore = data.opAppBefore;
        self.beforeAppStatus = data.beforeAppStatus;
        self.actualStatus = data.actualStatus;
        self.actualLst = data.actualLst;

        // 休憩時間
        this.setTimeZones(data.timezones);
        if (!_.isNil(data.worktimeStart) && !_.isNil(data.worktimeEnd)) {
            if (_.isNil(self.siftCD) || self.siftName == this.$i18n('KAL003_120')) {
                self.selectedWorkTime = '';
            } else {
                self.selectedWorkTime = TimeWithDay.toString(data.worktimeStart) + '～' + TimeWithDay.toString(data.worktimeEnd);
            }
        }
    }

    public setTimeZones(timeZones) {
        let self = this.kafs05ModelStep1;
        if (timeZones) {
            let times = [];
            for (let i = 1; i < 11; i++) {
                times.push({
                    companyID: '',
                    appID: '',
                    attendanceID: 0,
                    attendanceName: '',
                    frameNo: i,
                    timeItemTypeAtr: 0,
                    frameName: i,
                    applicationTime: null,
                    nameID: '',
                    restTimeInput: { start: timeZones[i - 1] ? timeZones[i - 1].start : null, end: timeZones[i - 1] ? timeZones[i - 1].end : null },
                    startTime: timeZones[i - 1] ? timeZones[i - 1].start : null,
                    endTime: timeZones[i - 1] ? timeZones[i - 1].end : null
                });
            }
            self.restTime = times;
        }
    }

    public getName(code, name) {
        let result = '';
        if (code) {
            result = name || this.$i18n('KAL003_120');
        }

        return result;
    }



    public initCalculateData(item: any): any {
        return {
            companyID: item.companyID,
            appID: item.appID,
            attendanceID: item.attendanceID,
            attendanceName: item.attendanceName,
            frameNo: item.frameNo,
            timeItemTypeAtr: item.timeItemTypeAtr,
            frameName: item.frameName,
            applicationTime: item.applicationTime,
            preAppTime: null,
            caculationTime: null,
            nameID: item.nameID,
            itemName: item.itemName
        };
    }



    public setOvertimeWork(overtimeAgreement: OvertimeAgreement, self: any): void {
        let overtimeWork1 = { yearMonth: '', limitTime: 0, actualTime: 0, color: '' };
        let overtimeWork2 = { yearMonth: '', limitTime: 0, actualTime: 0, color: '' };

        overtimeWork1.yearMonth = overtimeAgreement.currentMonth;
        let exceptionLimitErrorTime1 = overtimeAgreement.detailCurrentMonth.confirmed.exceptionLimitErrorTime;
        let limitErrorTime1 = overtimeAgreement.detailCurrentMonth.confirmed.limitErrorTime;
        if (!_.isNil(exceptionLimitErrorTime1)) {
            overtimeWork1.limitTime = exceptionLimitErrorTime1;
        } else if (!_.isNil(limitErrorTime1)) {
            overtimeWork1.limitTime = limitErrorTime1;
        }
        let agreementTime1 = overtimeAgreement.detailCurrentMonth.confirmed.agreementTime;
        if (!_.isNil(agreementTime1)) {
            overtimeWork1.actualTime = agreementTime1;
        }

        switch (overtimeAgreement.detailCurrentMonth.confirmed.status) {
            case AgreementTimeStatusOfMonthly.EXCESS_LIMIT_ALARM: {
                overtimeWork1.color = 'alarm';
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_LIMIT_ERROR: {
                overtimeWork1.color = 'error';
                break;
            }
            case AgreementTimeStatusOfMonthly.NORMAL_SPECIAL: {
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_LIMIT_ALARM_SP: {
                overtimeWork1.color = 'exception';
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_LIMIT_ERROR_SP: {
                overtimeWork1.color = 'exception';
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_EXCEPTION_LIMIT_ALARM: {
                overtimeWork1.color = 'alarm';
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_EXCEPTION_LIMIT_ERROR: {
                overtimeWork1.color = 'error';
                break;
            }
            default: break;
        }

        overtimeWork2.yearMonth = overtimeAgreement.nextMonth;
        let exceptionLimitErrorTime2 = overtimeAgreement.detailNextMonth.confirmed.exceptionLimitErrorTime;
        let limitErrorTime2 = overtimeAgreement.detailNextMonth.confirmed.limitErrorTime;
        if (!_.isNil(exceptionLimitErrorTime2)) {
            overtimeWork2.limitTime = exceptionLimitErrorTime2;
        } else if (!_.isNil(limitErrorTime2)) {
            overtimeWork2.limitTime = limitErrorTime2;
        }
        let agreementTime2 = overtimeAgreement.detailNextMonth.confirmed.agreementTime;
        if (!_.isNil(agreementTime2)) {
            overtimeWork2.actualTime = agreementTime2;
        }

        switch (overtimeAgreement.detailNextMonth.confirmed.status) {
            case AgreementTimeStatusOfMonthly.EXCESS_LIMIT_ALARM: {
                overtimeWork2.color = 'alarm';
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_LIMIT_ERROR: {
                overtimeWork2.color = 'error';
                break;
            }
            case AgreementTimeStatusOfMonthly.NORMAL_SPECIAL: {
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_LIMIT_ALARM_SP: {
                overtimeWork2.color = 'exception';
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_LIMIT_ERROR_SP: {
                overtimeWork2.color = 'exception';
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_EXCEPTION_LIMIT_ALARM: {
                overtimeWork2.color = 'alarm';
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_EXCEPTION_LIMIT_ERROR: {
                overtimeWork2.color = 'error';
                break;
            }
            default: break;
        }

        _.remove(self.overtimeWork);
        self.overtimeWork.push(overtimeWork1);
        self.overtimeWork.push(overtimeWork2);
    }

    public setOvertimeWorkDetail(appOvertimeDetailDto: any, self: any, status: any): void {
        let overtimeWork = { yearMonth: '', limitTime: 0, actualTime: 0, appTime: 0, totalTime: 0, color: '' };

        overtimeWork.yearMonth = appOvertimeDetailDto.yearMonth;
        if (!_.isNil(appOvertimeDetailDto.exceptionLimitErrorTime)) {
            overtimeWork.limitTime = appOvertimeDetailDto.exceptionLimitErrorTime;
        } else {
            overtimeWork.limitTime = appOvertimeDetailDto.limitErrorTime;
        }
        overtimeWork.actualTime = appOvertimeDetailDto.actualTime;
        overtimeWork.appTime = appOvertimeDetailDto.applicationTime;
        overtimeWork.totalTime = appOvertimeDetailDto.actualTime + appOvertimeDetailDto.applicationTime;
        switch (status) {
            case AgreementTimeStatusOfMonthly.EXCESS_LIMIT_ALARM: {
                overtimeWork.color = 'alarm';
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_LIMIT_ERROR: {
                overtimeWork.color = 'error';
                break;
            }
            case AgreementTimeStatusOfMonthly.NORMAL_SPECIAL: {
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_LIMIT_ALARM_SP: {
                overtimeWork.color = 'exception';
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_LIMIT_ERROR_SP: {
                overtimeWork.color = 'exception';
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_EXCEPTION_LIMIT_ALARM: {
                overtimeWork.color = 'alarm';
                break;
            }
            case AgreementTimeStatusOfMonthly.EXCESS_EXCEPTION_LIMIT_ERROR: {
                overtimeWork.color = 'error';
                break;
            }
            default: break;
        }

        _.remove(self.overtimeWork);
        self.overtimeWork.push(overtimeWork);
    }
}
const servicePath = {
    getRecordWork: 'at/request/application/overtime/getRecordWork',
    calculationresultConfirm: 'at/request/application/overtime/calculationresultConfirm',
    getCalculationResultMob: 'at/request/application/overtime/getCalculationResultMob',
    getOvertimeByUI: 'at/request/application/overtime/getOvertimeByUI',
    findByChangeAppDate: 'at/request/application/overtime/findByChangeAppDate',
    checkConvertPrePost: 'at/request/application/overtime/checkConvertPrePost',
    getAppDataDate: 'at/request/application/getAppDataByDate',
    findByAppID: 'at/request/application/overtime/findByAppID',
    getDetailCheck: 'at/request/application/getdetailcheck',
    getByChangeTime: 'at/request/application/overtime/getByChangeTime'
};