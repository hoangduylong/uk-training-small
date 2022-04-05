import { _, Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { KafS00SubP1Component, ExcessTimeStatus } from 'views/kaf/s00/sub/p1';
import { KafS00SubP3Component } from 'views/kaf/s00/sub/p3';
import { ExtraTime, OverTime, HolidayTime } from 'views/kaf/s05/step2';
import { AppOverTime, ExcessStateMidnight, AttendanceType, WorkdayoffFrame, OutDateApplication, ExcessStateDetail, BreakTimeZoneSetting, OvertimeWorkFrame, TimeZoneWithWorkNo, DisplayInfoOverTime, TimeZoneNew, HolidayMidNightTime, NotUseAtr, OvertimeApplicationSetting, StaturoryAtrOfHolidayWork } from 'views/kaf/s05/a/define.interface';
@component({
    name: 'cmms45shrcomponentsapp0',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: [],
    components: {
        'kafs00subp3': KafS00SubP3Component,
        'kafs00subp1': KafS00SubP1Component,
    }
})
export class CmmS45ShrComponentsApp0Component extends Vue {

    public title: string = 'CmmS45ShrComponentsApp0';

    public workInfo: WorkInfo = {} as WorkInfo;

    public reasons: Array<Reason> = [];

    public isEmptyBreakTime: boolean = false;

    public workHours1: WorkHours = {
        start: '',
        end: ''
    } as WorkHours;

    public workHours2: WorkHours = {
        start: '',
        end: ''
    } as WorkHours;

    public breakTimes: Array<BreakTime> = [];

    public preApp: ExtraTime = {
        preAppDisp: true,
        preAppTime: 0,
        preAppExcess: ExcessTimeStatus.NONE
    } as ExtraTime;

    public actualApp: ExtraTime = {
        actualDisp: true,
        actualTime: 0,
        actualExcess: ExcessTimeStatus.NONE
    } as ExtraTime;
    @Prop({
        default: () => ({
            appDispInfoStartupOutput: null,
            appDetail: null
        })
    })
    public readonly params: {
        appDispInfoStartupOutput: any,
        appDetail: any
    };
    public user: any;
    public dataOutput: DataOutput = {} as DataOutput;

    public overTimes: Array<OverTime> = [
        {
            frameNo: '1',
            title: 'title',
            visible: true,
            applicationTime: 0,
            preTime: 0,
            actualTime: 0,
            preApp: {
                preAppDisp: true,
                preAppTime: 0,
                preAppExcess: ExcessTimeStatus.NONE
            },
            actualApp: {
                actualDisp: true,
                actualTime: 0,
                actualExcess: ExcessTimeStatus.NONE
            },
            type: AttendanceType.NORMALOVERTIME
        },
        {
            frameNo: '1',
            title: 'title',
            visible: true,
            applicationTime: 0,
            preTime: 0,
            actualTime: 0,
            preApp: {
                preAppDisp: true,
                preAppTime: 0,
                preAppExcess: ExcessTimeStatus.NONE
            },
            actualApp: {
                actualDisp: true,
                actualTime: 0,
                actualExcess: ExcessTimeStatus.NONE
            },
            type: AttendanceType.NORMALOVERTIME
        }
    ];
    public holidayTimes: Array<HolidayTime> = [
        {
            frameNo: '1',
            title: 'title',
            visible: true,
            applicationTime: 0,
            preTime: 0,
            actualTime: 0,
            preApp: {
                preAppDisp: true,
                preAppTime: 0,
                preAppExcess: ExcessTimeStatus.NONE
            },
            actualApp: {
                actualDisp: true,
                actualTime: 0,
                actualExcess: ExcessTimeStatus.NONE
            },
            type: AttendanceType.NORMALOVERTIME
        }
    ];

    // 「残業申請の表示情報．基準日に関係しない情報．残業申請設定．申請詳細設定．時刻計算利用区分」＝する
    public get c3() {
        const self = this;

        let c3 = _.get(self.dataOutput, 'displayInfoOverTime.infoNoBaseDate.overTimeAppSet.applicationDetailSetting.timeCalUse');

        return c3 == NotUseAtr.USE;
    }
    // ※表3 = ○　OR　※表3-1-1 = ○
    // public get c3_1() {
    //     const self = this;

    //     return self.c3_1_1 || self.c3;
    // }
    // ※表15 = × AND「残業申請の表示情報．基準日に関係しない情報．残業休日出勤申請の反映．残業申請．事前．休憩・外出を申請反映する」＝する
    // ※表15 = ○ AND「残業申請の表示情報．基準日に関係しない情報．残業休日出勤申請の反映．残業申請．事後．休憩・外出を申請反映する」= する
    public get c3_1_1() {
        const self = this;
        let value1 = _.get(self.dataOutput, 'displayInfoOverTime.infoNoBaseDate.overTimeReflect.overtimeWorkAppReflect.reflectBeforeBreak');
        let value2 = _.get(self.dataOutput, 'displayInfoOverTime.infoNoBaseDate.overTimeReflect.overtimeWorkAppReflect.reflectBreakOuting');

        return ((!self.c15 && value1 == NotUseAtr.USE) || (self.c15 && value2 == NotUseAtr.USE)); 
    }
    // c3 ＝ ○ AND「残業申請の表示情報．申請表示情報．申請表示情報(基準日関係なし)．複数回勤務の管理」＝true"
    public get c3_1() {
        const self = this;
        let c3_1 = _.get(self.dataOutput, 'displayInfoOverTime.appDispInfoStartup.appDispInfoNoDateOutput.managementMultipleWorkCycles');

        return self.c3 && c3_1;
    }
    // 「残業申請の表示情報．基準日に関する情報．残業申請で利用する残業枠．残業枠一覧」 <> empty
    public get c4() {
        const self = this;
        let list = _.get(self.dataOutput, 'displayInfoOverTime.infoBaseDateOutput.quotaOutput.overTimeQuotaList');
        
        return !_.isEmpty(list);
    }
    // 残業申請．事前事後区分＝事後 => O
    public get c4_1() {
        const self = this;
        let prePost = _.get(self.dataOutput, 'displayInfoOverTime.appDispInfoStartup.appDetailScreenInfo.application.prePostAtr');
        
        return prePost == 1;
    }
    // 「残業申請の表示情報．基準日に関係しない情報．残業休日出勤申請の反映．時間外深夜時間を反映する」= する
    public get c5() {
        const self = this;
        let c5 = _.get(self.dataOutput, 'displayInfoOverTime.infoNoBaseDate.overTimeReflect.nightOvertimeReflectAtr');
        
        return c5 == NotUseAtr.USE;
    }
    // 「残業申請の表示情報．基準日に関する情報．残業申請で利用する残業枠．フレックス時間表示区分」= true
    public get c6() {
        const self = this;
        let c6 = _.get(self.dataOutput, 'displayInfoOverTime.infoBaseDateOutput.quotaOutput.flexTimeClf');
        
        return c6;
    }
    public get c13() {
        const self = this;
        let findResult = _.find(_.get(self.dataOutput, 'displayInfoOverTime.infoNoBaseDate.divergenceReasonInputMethod'), { divergenceTimeNo: 1 });
        let c13_1 = !_.isNil(findResult);
        let c13_2 = c13_1 ? findResult.divergenceReasonSelected : false;
        
        return c13_1 && c13_2;
    }
    public get c14() {
        const self = this;
        let findResult = _.find(_.get(self.dataOutput, 'displayInfoOverTime.infoNoBaseDate.divergenceReasonInputMethod'), { divergenceTimeNo: 1 });
        let c14_1 = !_.isNil(findResult);
        let c14_2 = c14_1 ? findResult.divergenceReasonInputed : false;
        
        return c14_1 && c14_2;
    }

    public get c15 () {
        const self = this;

        return _.get(self.dataOutput, 'displayInfoOverTime.appDispInfoStartup.appDetailScreenInfo.application.prePostAtr') == 1;
    }
    public get c12() {
        const self = this;

        return self.c13 || self.c14;
    }
    // 「残業申請．申請時間．申請時間．Type」= 休出時間 があるの場合
    public get c18_1() {
        const self = this;
        let isHoliday = _.findLast(_.get(self.dataOutput, 'appOverTime.applicationTime.applicationTime'), 
            (item: OvertimeApplicationSetting) => item.attendanceType == AttendanceType.BREAKTIME);
        
        return !_.isNil(isHoliday);
    }
    // ※表5 = ○ AND「残業申請．申請時間．就業時間外深夜時間．休出深夜時間．法定区分」= 法定内休出 があるの場合
    public get c18_2() {
        const self = this;
        let isType = _.findLast(_.get(self.dataOutput, 'appOverTime.applicationTime.overTimeShiftNight.midNightHolidayTimes'),
            (item: HolidayMidNightTime) => item.legalClf == StaturoryAtrOfHolidayWork.WithinPrescribedHolidayWork);
        
        return self.c5 && !_.isNil(isType);
    }
    public get c18_3() {
        const self = this;
        let isType = _.findLast(_.get(self.dataOutput, 'appOverTime.applicationTime.overTimeShiftNight.midNightHolidayTimes'),
            (item: HolidayMidNightTime) => item.legalClf == StaturoryAtrOfHolidayWork.ExcessOfStatutoryHolidayWork);
        
        return self.c5 && !_.isNil(isType);
    }
    public get c18_4() {
        const self = this;
        let isType = _.findLast(_.get(self.dataOutput, 'appOverTime.applicationTime.overTimeShiftNight.midNightHolidayTimes'),
            (item: HolidayMidNightTime) => item.legalClf == StaturoryAtrOfHolidayWork.PublicHolidayWork);
        
        return self.c5 && !_.isNil(isType);
    }

    public get c18() {
        const self = this;
        
        return self.c18_1 || self.c18_2 || self.c18_3 || self.c18_4;
    }

    public get c19() {
        const self = this;

        return self.c20 || self.c21;
    }
    public get c20() {
        const self = this;
        let findResult = _.find(_.get(self.dataOutput, 'displayInfoOverTime.infoNoBaseDate.divergenceReasonInputMethod'), { divergenceTimeNo: 2 });
        let c20_1 = !_.isNil(findResult);
        let c20_2 = c20_1 ? findResult.divergenceReasonSelected : false;

        return c20_1 && c20_2;
    }
    public get c21() {
        const self = this;
        let findResult = _.find(_.get(self.dataOutput, 'displayInfoOverTime.infoNoBaseDate.divergenceReasonInputMethod'), { divergenceTimeNo: 2 });
        let c21_1 = !_.isNil(findResult);
        let c21_2 = c21_1 ? findResult.divergenceReasonInputed : false;

        return c21_1 && c21_2;
    }

    public mounted() {
        const self = this;
        self.$auth.user.then((usr: any) => {
            self.user = usr;
        }).then((res: any) => {
            self.fetchData(self.params);
        });
        self.$watch('params.appDispInfoStartupOutput', (newV, oldV) => {
            self.fetchData(self.params);
        });
    }

    public created() {
        const self = this;
        self.createWorkInfo();
        
    }
     
    public fetchData(getParams: any) {
        const self = this;
        self.$http.post('at', API.start, self.commandStart()).then((res: any) => {
            self.dataOutput = res.data;
            self.params.appDetail = self.dataOutput;
            self.bindComponent();
            self.$emit('loading-complete', self.reasons);
        }).catch((res: any) => {
            self.$modal.error({ messageId: res.messageId, messageParams: res.parameterIds });
            self.$emit('loading-complete');
        });
    }

    public bindReasons() {
        const self = this;
        let reasons = [] as Array<Reason>;
        let appOverTime = self.dataOutput.appOverTime as AppOverTime;
        let displayInfoOverTime = self.dataOutput.displayInfoOverTime as DisplayInfoOverTime;
        let reasonDissociation = _.get(appOverTime, 'applicationTime.reasonDissociation') as any;
        let no1 = _.findLast(reasonDissociation, (item: any) => item.diviationTime == 1);
        let code1 = _.get(no1, 'reasonCode');
        let divergenceReasonInputMethod1 = _.findLast(displayInfoOverTime.infoNoBaseDate.divergenceReasonInputMethod, (item: any) => item.divergenceTimeNo == 1);
        let findContentByCode1 = _.findLast(_.get(divergenceReasonInputMethod1, 'reasons'), (item: any) => item.divergenceReasonCode == code1) as any;
        let contentByCode1= _.get(findContentByCode1, 'reason') || (!_.isNil(code1) ? self.$i18n('KAFS05_55') : null);
        let content1 = _.get(no1, 'reason');
        let title1 = _.findLast(displayInfoOverTime.infoNoBaseDate.divergenceTimeRoot, (item: any) => item.divergenceTimeNo == 1);
        title1 = _.get(title1, 'divTimeName') || '';

        let no2 = _.findLast(reasonDissociation, (item: any) => item.diviationTime == 2);
        let code2 = _.get(no2, 'reasonCode');
        let divergenceReasonInputMethod2 = _.findLast(displayInfoOverTime.infoNoBaseDate.divergenceReasonInputMethod, (item: any) => item.divergenceTimeNo == 2);
        let findContentByCode2 = _.findLast(_.get(divergenceReasonInputMethod2, 'reasons'), (item: any) => item.divergenceReasonCode == code2) as any;
        let contentByCode2 = _.get(findContentByCode2, 'reason') || (!_.isNil(code2) ? self.$i18n('KAFS05_55') : null);
        let content2 = _.get(no2, 'reason');
        let title2 = _.findLast(displayInfoOverTime.infoNoBaseDate.divergenceTimeRoot, (item: any) => item.divergenceTimeNo == 2);
        title2 = _.get(title2, 'divTimeName') || '';
        {
            let item = {} as Reason;
            item.c1 = self.c12;
            item.c2 = self.c13;
            item.c3 = self.c14;
            item.code = code1;
            item.name = contentByCode1;
            item.content = content1;
            item.title = title1;
            reasons.push(item);
        }

        {
            let item = {} as Reason;
            item.c1 = self.c19;
            item.c2 = self.c20;
            item.c3 = self.c21;
            item.code = code2;
            item.name = contentByCode2;
            item.content = content2;
            item.title = title2;
            reasons.push(item);
        }

        self.reasons = reasons;

    }
    public bindComponent() {
        const self = this;
        self.bindWorkInfo();
        self.bindWorkHours();
        self.bindBreakTime();
        self.bindOverTimes();
        self.bindHolidayTimes();
        self.bindReasons();
    }
    public bindHolidayTimes() {
        const self = this;
        let holidayTimes = [] as Array<HolidayTime>;
        let displayInfoOverTime = self.dataOutput.displayInfoOverTime;
        let workdayoffFrames = _.get(displayInfoOverTime, 'workdayoffFrames') as Array<WorkdayoffFrame>;
        if (!_.isNil(workdayoffFrames)) {
            _.forEach(workdayoffFrames, (item: WorkdayoffFrame) => {
                let holidayTime = {} as HolidayTime;
                holidayTime.type = AttendanceType.BREAKTIME;
                holidayTime.frameNo = String(item.workdayoffFrNo);
                holidayTime.title = item.workdayoffFrName;
                holidayTime.visible = self.c18_1;
                holidayTime.applicationTime = 0;
                holidayTime.preApp = {
                    preAppDisp: true,
                    preAppTime: 0,
                    preAppExcess: ExcessTimeStatus.NONE,

                };
                holidayTime.actualApp = {
                    actualDisp: true,
                    actualTime: 0,
                    actualExcess: ExcessTimeStatus.NONE
                };
                holidayTimes.push(holidayTime);
            });
        }
        _.forEach(_.range(1, 4), (item: any) => {
            let holidayTime = {} as HolidayTime;
            holidayTime.frameNo = '11';
            holidayTime.applicationTime = 0;
            if (item == 1) {
                holidayTime.type = AttendanceType.MIDDLE_BREAK_TIME;
                holidayTime.title = self.$i18n('KAFS05_85');
                holidayTime.visible = self.c18_2;
            } else if (item == 2) {
                holidayTime.type = AttendanceType.MIDDLE_EXORBITANT_HOLIDAY;
                holidayTime.title = self.$i18n('KAFS05_86');
                holidayTime.visible = self.c18_3;
            } else {
                holidayTime.type = AttendanceType.MIDDLE_HOLIDAY_HOLIDAY;
                holidayTime.title = self.$i18n('KAFS05_87');
                holidayTime.visible = self.c18_4;
            }
            holidayTime.preApp = {
                preAppDisp: true,
                preAppTime: 0,
                preAppExcess: ExcessTimeStatus.NONE,

            };
            holidayTime.actualApp = {
                actualDisp: true,
                actualTime: 0,
                actualExcess: ExcessTimeStatus.NONE
            };
            holidayTimes.push(holidayTime);
        });

        // bind calculate
        {
            // AttendanceType.BREAKTIME
            let applicationTime = _.get(self.dataOutput.appOverTime, 'applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
            _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                let findResult = _.findLast(holidayTimes, (i: HolidayTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo));
                if (!_.isNil(findResult)) {
                    findResult.applicationTime = item.applicationTime;
                }
            });

            let midNightHolidayTimes = _.get(self.dataOutput.appOverTime, 'applicationTime.overTimeShiftNight.midNightHolidayTimes') as Array<HolidayMidNightTime>;
            _.forEach(midNightHolidayTimes, (item: HolidayMidNightTime) => {
                let findResult: HolidayTime;
                // AttendanceType.MIDDLE_BREAK_TIME
                if (item.legalClf == StaturoryAtrOfHolidayWork.WithinPrescribedHolidayWork) {
                    findResult = _.findLast(holidayTimes, (i: HolidayTime) => i.type == AttendanceType.MIDDLE_BREAK_TIME);
                } else if (item.legalClf == StaturoryAtrOfHolidayWork.ExcessOfStatutoryHolidayWork) { // AttendanceType.MIDDLE_EXORBITANT_HOLIDAY
                    findResult = _.findLast(holidayTimes, (i: HolidayTime) => i.type == AttendanceType.MIDDLE_EXORBITANT_HOLIDAY);
                } else {
                    findResult = _.findLast(holidayTimes, (i: HolidayTime) => i.type == AttendanceType.MIDDLE_HOLIDAY_HOLIDAY); // AttendanceType.MIDDLE_HOLIDAY_HOLIDAY
                }
                if (!_.isNil(findResult)) {
                    findResult.applicationTime = item.attendanceTime || 0;
                }

            });

        }

        // bind advanceApp
        let apOptional = _.get(displayInfoOverTime, 'appDispInfoStartup.appDispInfoWithDateOutput.opPreAppContentDispDtoLst[0].apOptional') as AppOverTime;
        let advanceExcess = _.get(displayInfoOverTime, 'calculationResultOp.overStateOutput.advanceExcess') as OutDateApplication;
        if (!_.isNil(apOptional)) {
            // AttendanceType.BREAKTIME
            {
                let applicationTime = _.get(apOptional, 'applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
                _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                    let findResult = _.findLast(holidayTimes, (i: OverTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo)) as HolidayTime;
                    if (!_.isNil(findResult)) {
                        findResult.preApp.preAppTime = item.applicationTime;
                    }
                });


            }

            {
                let midNightHolidayTimes = _.get(apOptional, 'applicationTime.overTimeShiftNight.midNightHolidayTimes') as Array<HolidayMidNightTime>;
                _.forEach(midNightHolidayTimes, (item: HolidayMidNightTime) => {
                    let findResult: HolidayTime;
                    // AttendanceType.MIDDLE_BREAK_TIME
                    if (item.legalClf == StaturoryAtrOfHolidayWork.WithinPrescribedHolidayWork) {
                        findResult = _.findLast(holidayTimes, (i: HolidayTime) => i.type == AttendanceType.MIDDLE_BREAK_TIME);
                    } else if (item.legalClf == StaturoryAtrOfHolidayWork.ExcessOfStatutoryHolidayWork) { // AttendanceType.MIDDLE_EXORBITANT_HOLIDAY
                        findResult = _.findLast(holidayTimes, (i: HolidayTime) => i.type == AttendanceType.MIDDLE_EXORBITANT_HOLIDAY);
                    } else {
                        findResult = _.findLast(holidayTimes, (i: HolidayTime) => i.type == AttendanceType.MIDDLE_HOLIDAY_HOLIDAY); // AttendanceType.MIDDLE_HOLIDAY_HOLIDAY
                    }
                    if (!_.isNil(findResult)) {
                        findResult.preApp.preAppTime = item.attendanceTime || 0;
                    }

                });

            }




        }
        // set color advance
        _.forEach(holidayTimes, (item: HolidayTime) => {

            if (item.type == AttendanceType.MIDDLE_BREAK_TIME) {
                let findResult = _.findLast(_.get(advanceExcess, 'excessStateMidnight'), (item: ExcessStateMidnight) => item.legalCfl == StaturoryAtrOfHolidayWork.WithinPrescribedHolidayWork);
                if (!_.isNil(findResult) && item.applicationTime > 0) {
                    item.preApp.preAppExcess = findResult.excessState || ExcessTimeStatus.NONE;
                }
            } else if (item.type == AttendanceType.MIDDLE_EXORBITANT_HOLIDAY) {
                let findResult = _.findLast(_.get(advanceExcess, 'excessStateMidnight'), (item: ExcessStateMidnight) => item.legalCfl == StaturoryAtrOfHolidayWork.ExcessOfStatutoryHolidayWork);
                if (!_.isNil(findResult) && item.applicationTime > 0) {
                    item.preApp.preAppExcess = findResult.excessState || ExcessTimeStatus.NONE;
                }
            } else if (item.type == AttendanceType.MIDDLE_HOLIDAY_HOLIDAY) {
                let findResult = _.findLast(_.get(advanceExcess, 'excessStateMidnight'), (item: ExcessStateMidnight) => item.legalCfl == StaturoryAtrOfHolidayWork.PublicHolidayWork);
                if (!_.isNil(findResult) && item.applicationTime > 0) {
                    item.preApp.preAppExcess = findResult.excessState || ExcessTimeStatus.NONE;
                }
            } else {
                let findResult = _.findLast(_.get(advanceExcess, 'excessStateDetail'), (i: ExcessStateDetail) => i.type == item.type && i.frame == Number(item.frameNo)) as ExcessStateDetail;
                if (!_.isNil(findResult)) {
                    item.preApp.preAppExcess = findResult.excessState || ExcessTimeStatus.NONE;
                }
            }

        });


        // bind archivementApp
        let infoWithDateApplicationOp = displayInfoOverTime.infoWithDateApplicationOp;
        let achivementExcess = _.get(displayInfoOverTime, 'calculationResultOp.overStateOutput.achivementExcess') as OutDateApplication;
        if (!_.isNil(infoWithDateApplicationOp)) {
            // AttendanceType.BREAKTIME
            {
                let applicationTime = _.get(infoWithDateApplicationOp, 'applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
                _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                    let findResult = _.findLast(holidayTimes, (i: OverTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo)) as HolidayTime;
                    if (!_.isNil(findResult)) {
                        findResult.actualApp.actualTime = item.applicationTime;
                    }
                });
            }

            {
                let midNightHolidayTimes = _.get(infoWithDateApplicationOp, 'applicationTime.overTimeShiftNight.midNightHolidayTimes') as Array<HolidayMidNightTime>;
                _.forEach(midNightHolidayTimes, (item: HolidayMidNightTime) => {
                    let findResult: HolidayTime;
                    // AttendanceType.MIDDLE_BREAK_TIME
                    if (item.legalClf == StaturoryAtrOfHolidayWork.WithinPrescribedHolidayWork) {
                        findResult = _.findLast(holidayTimes, (i: HolidayTime) => i.type == AttendanceType.MIDDLE_BREAK_TIME);
                    } else if (item.legalClf == StaturoryAtrOfHolidayWork.ExcessOfStatutoryHolidayWork) { // AttendanceType.MIDDLE_EXORBITANT_HOLIDAY
                        findResult = _.findLast(holidayTimes, (i: HolidayTime) => i.type == AttendanceType.MIDDLE_EXORBITANT_HOLIDAY);
                    } else {
                        findResult = _.findLast(holidayTimes, (i: HolidayTime) => i.type == AttendanceType.MIDDLE_HOLIDAY_HOLIDAY); // AttendanceType.MIDDLE_HOLIDAY_HOLIDAY
                    }
                    if (!_.isNil(findResult)) {
                        findResult.actualApp.actualTime = item.attendanceTime || 0;
                    }

                });
            }
        }

        // set color achievement
        _.forEach(holidayTimes, (item: HolidayTime) => {

            if (item.type == AttendanceType.MIDDLE_BREAK_TIME) {
                let findResult = _.findLast(_.get(achivementExcess, 'excessStateMidnight'), (item: ExcessStateMidnight) => item.legalCfl == StaturoryAtrOfHolidayWork.WithinPrescribedHolidayWork);
                if (!_.isNil(findResult) && item.applicationTime > 0) {
                    item.actualApp.actualExcess = findResult.excessState || ExcessTimeStatus.NONE;
                }
            } else if (item.type == AttendanceType.MIDDLE_EXORBITANT_HOLIDAY) {
                let findResult = _.findLast(_.get(achivementExcess, 'excessStateMidnight'), (item: ExcessStateMidnight) => item.legalCfl == StaturoryAtrOfHolidayWork.ExcessOfStatutoryHolidayWork);
                if (!_.isNil(findResult) && item.applicationTime > 0) {
                    item.actualApp.actualExcess = findResult.excessState || ExcessTimeStatus.NONE;
                }
            } else if (item.type == AttendanceType.MIDDLE_HOLIDAY_HOLIDAY) {
                let findResult = _.findLast(_.get(achivementExcess, 'excessStateMidnight'), (item: ExcessStateMidnight) => item.legalCfl == StaturoryAtrOfHolidayWork.PublicHolidayWork);
                if (!_.isNil(findResult) && item.applicationTime > 0) {
                    item.actualApp.actualExcess = findResult.excessState || ExcessTimeStatus.NONE;
                }
            } else {
                let findResult = _.findLast(_.get(achivementExcess, 'excessStateDetail'), (i: ExcessStateDetail) => i.type == item.type && i.frame == Number(item.frameNo)) as ExcessStateDetail;
                if (!_.isNil(findResult)) {
                    item.actualApp.actualExcess = findResult.excessState || ExcessTimeStatus.NONE;
                }
            }

        });


        holidayTimes = _.filter(holidayTimes, (item: HolidayTime) => item.applicationTime > 0);
        self.holidayTimes = holidayTimes;

    }
    public bindOverTimes() {
        const self = this;
        let overTimes = [] as Array<OverTime>;
        let displayInfoOverTime = self.dataOutput.displayInfoOverTime;
        let overTimeQuotaList = displayInfoOverTime.infoBaseDateOutput.quotaOutput.overTimeQuotaList as Array<OvertimeWorkFrame>;
        // create overtime object
        _.forEach(overTimeQuotaList, (item: OvertimeWorkFrame) => {
            let overTime = {} as OverTime;
            overTime.type = AttendanceType.NORMALOVERTIME;
            overTime.frameNo = String(item.overtimeWorkFrNo);
            overTime.title = item.overtimeWorkFrName;
            overTime.applicationTime = 0;
            overTime.visible = self.c4;
            overTime.preApp = {
                preAppDisp: true,
                preAppTime: 0,
                preAppExcess: ExcessTimeStatus.NONE,

            };
            overTime.actualApp = {
                actualDisp: true,
                actualTime: 0,
                actualExcess: ExcessTimeStatus.NONE
            };
            overTimes.push(overTime);
        });
        // create overtime night and flex
        {
            let overTime = {} as OverTime;
            overTime.type = AttendanceType.MIDNIGHT_OUTSIDE;
            overTime.frameNo = String(11);
            overTime.title = self.$i18n('KAFS05_71');
            overTime.applicationTime = 0;
            overTime.visible = self.c5;
            overTime.preApp = {
                preAppDisp: true,
                preAppTime: 0,
                preAppExcess: ExcessTimeStatus.NONE,

            };
            overTime.actualApp = {
                actualDisp: true,
                actualTime: 0,
                actualExcess: ExcessTimeStatus.NONE
            };
            overTimes.push(overTime);
        }

        {
            let overTime = {} as OverTime;
            overTime.type = AttendanceType.FLEX_OVERTIME;
            overTime.frameNo = String(12);
            overTime.title = self.$i18n('KAFS05_72');
            overTime.applicationTime = 0;
            overTime.visible = self.c6;
            overTime.preApp = {
                preAppDisp: true,
                preAppTime: 0,
                preAppExcess: ExcessTimeStatus.NONE,

            };
            overTime.actualApp = {
                actualDisp: true,
                actualTime: 0,
                actualExcess: ExcessTimeStatus.NONE
            };
            overTimes.push(overTime);
        }
        // bind calculate 
        {
            // AttendanceType.NORMALOVERTIME
            let applicationTime = _.get(self.dataOutput.appOverTime, 'applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
            _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo)) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.applicationTime = item.applicationTime || 0;
                }
            });
            // AttendanceType.MIDNIGHT_OUTSIDE
            {
                let overTimeMidNight = _.get(self.dataOutput.appOverTime, 'applicationTime.overTimeShiftNight.overTimeMidNight');
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == AttendanceType.MIDNIGHT_OUTSIDE) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.applicationTime = overTimeMidNight || 0;
                }
            }
            // AttendanceType.FLEX_OVERTIME
            {
                let flexOverTime = _.get(self.dataOutput.appOverTime, 'applicationTime.flexOverTime');
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == AttendanceType.FLEX_OVERTIME) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.applicationTime = flexOverTime || 0;
                }
            }
        }
        // bind advanceApp
        let apOptional = _.get(displayInfoOverTime, 'appDispInfoStartup.appDispInfoWithDateOutput.opPreAppContentDispDtoLst[0].apOptional') as AppOverTime;
        if (!_.isNil(apOptional)) {
            let advanceExcess = _.get(displayInfoOverTime, 'calculationResultOp.overStateOutput.advanceExcess') as OutDateApplication;
            // AttendanceType.NORMALOVERTIME
            {
                let applicationTime = _.get(apOptional, 'applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
                _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                    let findResult = _.findLast(overTimes, (i: OverTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo)) as OverTime;
                    if (!_.isNil(findResult)) {
                        findResult.preApp.preAppTime = item.applicationTime;
                    }
                });
                // set color
                _.forEach(_.filter(overTimes, (item: OverTime) => item.type == AttendanceType.NORMALOVERTIME), (item: OverTime) => {
                    let findResult = _.findLast(_.get(advanceExcess, 'excessStateDetail'), (i: ExcessStateDetail) => i.type == item.type && i.frame == Number(item.frameNo)) as ExcessStateDetail;
                    if (!_.isNil(findResult)) {
                        item.preApp.preAppExcess = findResult.excessState;
                    }
                });
            }

            // AttendanceType.MIDNIGHT_OUTSIDE
            {
                let overTimeMidNight = _.get(apOptional, 'applicationTime.overTimeShiftNight.overTimeMidNight');
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == AttendanceType.MIDNIGHT_OUTSIDE) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.preApp.preAppTime = overTimeMidNight || 0;
                }
                if (advanceExcess) {
                    let findResult = _.findLast(overTimes, (item: OverTime) => item.type == AttendanceType.MIDNIGHT_OUTSIDE) as OverTime;
                    findResult.preApp.preAppExcess = advanceExcess.overTimeLate || ExcessTimeStatus.NONE;
                }
            }
            // AttendanceType.FLEX_OVERTIME
            {
                let flexOverTime = _.get(apOptional, 'applicationTime.flexOverTime');
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == AttendanceType.FLEX_OVERTIME) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.preApp.preAppTime = flexOverTime || 0;
                }
                if (advanceExcess) {
                    let findResult = _.findLast(overTimes, (item: OverTime) => item.type == AttendanceType.FLEX_OVERTIME) as OverTime;
                    findResult.preApp.preAppExcess = advanceExcess.flex || ExcessTimeStatus.NONE;
                }
            }

        }

        // bind archivementApp
        let infoWithDateApplicationOp = displayInfoOverTime.infoWithDateApplicationOp;
        if (!_.isNil(infoWithDateApplicationOp)) {
            let achivementExcess = _.get(displayInfoOverTime, 'calculationResultOp.overStateOutput.achivementExcess') as OutDateApplication;
            // AttendanceType.NORMALOVERTIME
            {
                let applicationTime = _.get(infoWithDateApplicationOp, 'applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
                _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                    let findResult = _.findLast(overTimes, (i: OverTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo)) as OverTime;
                    if (!_.isNil(findResult)) {
                        findResult.actualApp.actualTime = item.applicationTime;
                    }
                });
                // set color
                _.forEach(_.filter(overTimes, (item: OverTime) => item.type == AttendanceType.NORMALOVERTIME), (item: OverTime) => {
                    let findResult = _.findLast(_.get(achivementExcess, 'excessStateDetail'), (i: ExcessStateDetail) => i.type == item.type && i.frame == Number(item.frameNo)) as ExcessStateDetail;
                    if (!_.isNil(findResult)) {
                        item.actualApp.actualExcess = findResult.excessState || ExcessTimeStatus.NONE;
                    }
                });
            }

            // AttendanceType.MIDNIGHT_OUTSIDE
            {
                let overTimeMidNight = _.get(infoWithDateApplicationOp, 'applicationTime.overTimeShiftNight.overTimeMidNight');
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == AttendanceType.MIDNIGHT_OUTSIDE) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.actualApp.actualTime = overTimeMidNight || 0;

                }
                if (achivementExcess) {
                    let findResult = _.findLast(overTimes, (item: OverTime) => item.type == AttendanceType.MIDNIGHT_OUTSIDE) as OverTime;
                    findResult.actualApp.actualExcess = achivementExcess.overTimeLate || ExcessTimeStatus.NONE;
                }
            }
            // AttendanceType.FLEX_OVERTIME
            {
                let flexOverTime = _.get(infoWithDateApplicationOp, 'applicationTime.flexOverTime');
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == AttendanceType.FLEX_OVERTIME) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.actualApp.actualTime = flexOverTime || 0;
                }
                if (achivementExcess) {
                    let findResult = _.findLast(overTimes, (item: OverTime) => item.type == AttendanceType.FLEX_OVERTIME) as OverTime;
                    findResult.actualApp.actualExcess = achivementExcess.flex || ExcessTimeStatus.NONE;
                }
            }
        }

        overTimes = _.filter(overTimes, (item: OverTime) => item.applicationTime > 0);
        self.overTimes = overTimes;

    }

    public bindBreakTime() {
        const self = this;
        let breakTime = [] as Array<BreakTime>;
        let countBreakTime = 0;
        _.range(1, 10)
        .forEach((index: number) => {
            let result = _.findLast(_.get(self.dataOutput, 'appOverTime.breakTimeOp'), (i: TimeZoneWithWorkNo) => i.workNo == index) as any;
            let findResult = _.get(result, 'timeZone') as TimeZoneNew;
            if (!_.isNil(findResult)) {
                let item = {} as BreakTime;
                item.frameNo = index;
                item.title = self.$i18n('KAFS05_69', String(item.frameNo));
                item.valueHours = {start: self.$dt.timedr(findResult.startTime || 0), end: self.$dt.timedr(findResult.endTime || 0)};
                breakTime.push(item);
                countBreakTime++;
            }
        });
        if (countBreakTime === 0) {
            self.isEmptyBreakTime = true;
        }
        self.breakTimes = breakTime;

    }

    public bindWorkInfo() {
        const self = this;
        let appOverTime = self.dataOutput.appOverTime as AppOverTime;
        self.createWorkInfo(_.get(appOverTime, 'workInfoOp.workType'), _.get(appOverTime, 'workInfoOp.workTime'));
        

    }
    public bindWorkHours() {
        const self = this;
        let appOverTime = self.dataOutput.appOverTime as AppOverTime; 
        let workHours1 = _.findLast(_.get(appOverTime, 'workHoursOp'), (item: any) => item.workNo == 1);
        let workHours2 = _.findLast(_.get(appOverTime, 'workHoursOp'), (item: any) => item.workNo == 2);
        // 1
        self.workHours1 = self.createWorkHours(_.get(workHours1, 'timeZone.startTime'),
                _.get(workHours1, 'timeZone.endTime'));
        // 2
        self.workHours2 = self.createWorkHours(_.get(workHours2, 'timeZone.startTime'),
                _.get(workHours2, 'timeZone.endTime'));
    }
    public commandStart() {
        const self = this;

        return {
            companyId: self.user.companyId,
            appId: self.params.appDispInfoStartupOutput.appDetailScreenInfo.application.appID,
            appDispInfoStartup: self.params.appDispInfoStartupOutput
        };
    }
    public createWorkHours(start: number, end: number) {
        const self = this;
        if (!_.isNumber(start) || !_.isNumber(end)) {

            return {
                start: self.$i18n('KAFS05_54'),
                end: ''
            } as WorkHours;
        }

        return {
            start: self.$dt.timedr(start || 0),
            end: self.$dt.timedr(end || 0)
        } as WorkHours;
    }
    public createWorkInfo(codeType?: string, codeTime?: string) {
        const self = this;

        let workType = {} as Work;
        workType.code = codeType || '';

        let workTime = {} as Work;
        workTime.code = codeTime || self.$i18n('KAFS07_9');
        let displayInfoOverTime = _.get(self.dataOutput, 'displayInfoOverTime');
        if (displayInfoOverTime) {
            let workTypes = displayInfoOverTime.infoBaseDateOutput.worktypes;
            let resultWorkType = 
                _.find(workTypes, (i: any) => i.workTypeCode == workType.code);
            workType.name = resultWorkType ? (resultWorkType.name || '')  : self.$i18n('KAFS05_55');

            let workTimes = displayInfoOverTime.appDispInfoStartup.appDispInfoWithDateOutput.opWorkTimeLst;
            if (codeTime) {
                let resultWorkTime = 
                        _.find(workTimes, (i: any) => i.worktimeCode == workTime.code);
                workTime.name = resultWorkTime ? (_.get(resultWorkTime, 'workTimeDisplayName.workTimeName') || '') : self.$i18n('KAFS05_55');
            }
  
        }
        let workInfo = {} as WorkInfo;
        workInfo.workType = workType;
        workInfo.workTime = workTime;

        self.workInfo = workInfo;
    }
}
const API = {
    start: 'at/request/application/overtime/mobile/getDetail'
};
interface WorkInfo {
    workType: Work;
    workTime: Work;
}
interface Work {
    code: string;
    name: string;
    time?: string;
}
interface WorkHours {
    start: string;
    end: string;
}
interface DataOutput {
    appOverTime: AppOverTime;
    displayInfoOverTime: DisplayInfoOverTime;
}
interface BreakTime {
    valueHours: any;
    title: string;
    frameNo: number;
}
export interface Reason {
    c1: boolean;
    c2: boolean;
    c3: boolean;
    title: string;
    code: string;
    name: string;
    content: string;
}
