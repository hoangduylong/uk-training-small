import { _, Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { KafS00SubP1Component, ExcessTimeStatus } from 'views/kaf/s00/sub/p1';
import { KafS00SubP3Component } from 'views/kaf/s00/sub/p3';
import { ExtraTime, OverTime, HolidayTime } from 'views/kaf/s05/step2';
import { AppHolidayWork, AppHdWorkDispInfo, ExcessStateMidnight, AttendanceType, WorkdayoffFrame, OutDateApplication, ExcessStateDetail, BreakTimeZoneSetting, OvertimeWorkFrame, TimeZoneWithWorkNo, DisplayInfoOverTime, TimeZoneNew, HolidayMidNightTime, NotUseAtr, OvertimeApplicationSetting, StaturoryAtrOfHolidayWork } from 'views/kaf/s10/a/define.interface';

@component({
    name: 'cmms45shrcomponentsapp6',
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
export class CmmS45ShrComponentsApp6Component extends Vue {
    public title: string = 'CmmS45ShrComponentsApp6';

    public workInfo: WorkInfo = {} as WorkInfo;

    public reasons: Array<Reason> = [];

    public workHours1: WorkHours = {
        start: '',
        end: ''
    } as WorkHours;

    public workHours2: WorkHours = {
        start: '',
        end: ''
    } as WorkHours;

    public goWorkAtr?: boolean = false;

    public backHomeAtr?: boolean = false;

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
            let data = {} as DataOutput;
            data.appHdWorkDispInfo = res.data.appHdWorkDispInfoOutput;
            data.appHolidayWork = res.data.appHolidayWork;
            self.dataOutput = data;
            self.params.appDetail = self.dataOutput;
            self.bindComponent();
            self.$emit('loading-complete', self.reasons);
        }).catch((res: any) => {
            self.$modal.error({ messageId: res.messageId, messageParams: res.parameterIds });
            self.$emit('loading-complete');
        });
    }

    public bindComponent() {
        const self = this;
        self.bindWorkInfo();
        self.bindWorkHours();
        self.bindGoWorkBackHomeAtr();
        self.bindBreakTime();
        self.bindHolidayTimes();
        self.bindOverTimes();
        self.bindReasons();
    }

    public bindHolidayTimes() {
        const self = this;
        let holidayTimes = [] as Array<HolidayTime>;
        let appHdWorkDispInfo = self.dataOutput.appHdWorkDispInfo;
        let workdayoffFrameList = _.get(appHdWorkDispInfo, 'workdayoffFrameList') as Array<WorkdayoffFrame>;
        if (!_.isNil(workdayoffFrameList)) {
            _.forEach(workdayoffFrameList, (item: WorkdayoffFrame) => {
                let holidayTime = {} as HolidayTime;
                holidayTime.type = AttendanceType.BREAKTIME;
                holidayTime.frameNo = String(item.workdayoffFrNo);
                holidayTime.title = item.workdayoffFrName;
                holidayTime.visible = true;
                holidayTime.applicationTime = 0;
                holidayTime.preApp = {
                    preAppDisp: self.c12,
                    preAppTime: 0,
                    preAppExcess: ExcessTimeStatus.NONE,

                };
                holidayTime.actualApp = {
                    actualDisp: self.c12,
                    actualTime: 0,
                    actualExcess: ExcessTimeStatus.NONE
                };
                holidayTimes.push(holidayTime);
            });
        }
        if (self.c7) {
            _.forEach(_.range(1, 4), (item: any) => {
                let holidayTime = {} as HolidayTime;
                holidayTime.frameNo = '11';
                holidayTime.applicationTime = 0;
                if (item == 1) {
                    holidayTime.type = AttendanceType.MIDDLE_BREAK_TIME;
                    holidayTime.title = self.$i18n('KAFS10_14');
                } else if (item == 2) {
                    holidayTime.type = AttendanceType.MIDDLE_EXORBITANT_HOLIDAY;
                    holidayTime.title = self.$i18n('KAFS10_15');
                } else {
                    holidayTime.type = AttendanceType.MIDDLE_HOLIDAY_HOLIDAY;
                    holidayTime.title = self.$i18n('KAFS10_16');
                }
                holidayTime.visible = self.c7;
                holidayTime.preApp = {
                    preAppDisp: self.c12_1,
                    preAppTime: 0,
                    preAppExcess: ExcessTimeStatus.NONE,

                };
                holidayTime.actualApp = {
                    actualDisp: self.c12_1,
                    actualTime: 0,
                    actualExcess: ExcessTimeStatus.NONE
                };
                holidayTimes.push(holidayTime);
            });
        }
        // bind calculate
        {
            // AttendanceType.BREAKTIME
            let applicationTime = _.get(self.dataOutput.appHolidayWork, 'applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
            _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                let findResult = _.findLast(holidayTimes, (i: HolidayTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo));
                if (!_.isNil(findResult)) {
                    findResult.applicationTime = item.applicationTime;
                }
            });
            let midNightHolidayTimes = _.get(self.dataOutput.appHolidayWork, 'applicationTime.overTimeShiftNight.midNightHolidayTimes') as Array<HolidayMidNightTime>;
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
        let appHolidayWork = _.get(appHdWorkDispInfo, 'appDispInfoStartupOutput.appDispInfoWithDateOutput.opPreAppContentDispDtoLst[0].appHolidayWork') as AppHolidayWork;
        let advanceExcess = _.get(appHdWorkDispInfo, 'calculationResult.actualOvertimeStatus.advanceExcess') as OutDateApplication;
        if (!_.isNil(appHolidayWork)) {
            // AttendanceType.BREAKTIME
            {
                let applicationTime = _.get(appHolidayWork, 'applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
                _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                    let findResult = _.findLast(holidayTimes, (i: OverTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo)) as HolidayTime;
                    if (!_.isNil(findResult)) {
                        findResult.preApp.preAppTime = item.applicationTime;
                    }
                });
            }
            {
                let midNightHolidayTimes = _.get(appHolidayWork, 'applicationTime.overTimeShiftNight.midNightHolidayTimes') as Array<HolidayMidNightTime>;
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
        let hdWorkDispInfoWithDateOutput = appHdWorkDispInfo.hdWorkDispInfoWithDateOutput;
        let achivementExcess = _.get(appHdWorkDispInfo, 'calculationResult.actualOvertimeStatus.achivementExcess') as OutDateApplication;
        if (!_.isNil(hdWorkDispInfoWithDateOutput)) {
            // AttendanceType.BREAKTIME
            {
                let applicationTime = _.get(hdWorkDispInfoWithDateOutput, 'actualApplicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
                _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                    let findResult = _.findLast(holidayTimes, (i: OverTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo)) as HolidayTime;
                    if (!_.isNil(findResult)) {
                        findResult.actualApp.actualTime = item.applicationTime;
                    }
                });
            }
            {
                let midNightHolidayTimes = _.get(hdWorkDispInfoWithDateOutput, 'actualApplicationTime.overTimeShiftNight.midNightHolidayTimes') as Array<HolidayMidNightTime>;
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
        let appHdWorkDispInfo = self.dataOutput.appHdWorkDispInfo;
        let overtimeFrameList = appHdWorkDispInfo.overtimeFrameList as Array<OvertimeWorkFrame>;
        // create overtime object
        _.forEach(overtimeFrameList, (item: OvertimeWorkFrame) => {
            let overTime = {} as OverTime;
            overTime.type = AttendanceType.NORMALOVERTIME;
            overTime.frameNo = String(item.overtimeWorkFrNo);
            overTime.title = item.overtimeWorkFrName;
            overTime.applicationTime = 0;
            overTime.visible = self.c13;
            overTime.preApp = {
                preAppDisp: self.c13_1,
                preAppTime: 0,
                preAppExcess: ExcessTimeStatus.NONE,

            };
            overTime.actualApp = {
                actualDisp: self.c13_1,
                actualTime: 0,
                actualExcess: ExcessTimeStatus.NONE
            };
            overTimes.push(overTime);
        });
        // create overtime night
        if (self.c13_2) {
            let overTime = {} as OverTime;
            overTime.type = AttendanceType.MIDNIGHT_OUTSIDE;
            overTime.frameNo = String(11);
            overTime.title = self.$i18n('KAFS10_18');
            overTime.applicationTime = 0;
            overTime.visible = self.c13_2;
            overTime.preApp = {
                preAppDisp: self.c13_3,
                preAppTime: 0,
                preAppExcess: ExcessTimeStatus.NONE,

            };
            overTime.actualApp = {
                actualDisp: self.c13_3,
                actualTime: 0,
                actualExcess: ExcessTimeStatus.NONE
            };
            overTimes.push(overTime);
        }
        // bind calculate 
        {
            // AttendanceType.NORMALOVERTIME
            let applicationTime = _.get(self.dataOutput.appHolidayWork, 'applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
            _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo)) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.applicationTime = item.applicationTime || 0;
                }
            });
            // AttendanceType.MIDNIGHT_OUTSIDE
            {
                let overTimeMidNight = _.get(self.dataOutput.appHolidayWork, 'applicationTime.overTimeShiftNight.overTimeMidNight');
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == AttendanceType.MIDNIGHT_OUTSIDE) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.applicationTime = overTimeMidNight || 0;
                }
            }
        }
        // bind advanceApp
        let appHolidayWork = _.get(appHdWorkDispInfo, 'appDispInfoStartupOutput.appDispInfoWithDateOutput.opPreAppContentDispDtoLst[0].appHolidayWork') as AppHolidayWork;
        if (!_.isNil(appHolidayWork)) {
            let advanceExcess = _.get(appHdWorkDispInfo, 'calculationResult.actualOvertimeStatus.advanceExcess') as OutDateApplication;
            // AttendanceType.NORMALOVERTIME
            {
                let applicationTime = _.get(appHolidayWork, 'applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
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
                let overTimeMidNight = _.get(appHolidayWork, 'applicationTime.overTimeShiftNight.overTimeMidNight');
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == AttendanceType.MIDNIGHT_OUTSIDE) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.preApp.preAppTime = overTimeMidNight || 0;
                }
                if (advanceExcess) {
                    let findResult = _.findLast(overTimes, (item: OverTime) => item.type == AttendanceType.MIDNIGHT_OUTSIDE) as OverTime;
                    if (!_.isNil(findResult)) {
                        findResult.preApp.preAppExcess = advanceExcess.overTimeLate || ExcessTimeStatus.NONE;
                    }
                }
            }
        }
        // bind archivementApp
        let hdWorkDispInfoWithDateOutput = appHdWorkDispInfo.hdWorkDispInfoWithDateOutput;
        if (!_.isNil(hdWorkDispInfoWithDateOutput)) {
            let achivementExcess = _.get(appHdWorkDispInfo, 'calculationResult.actualOvertimeStatus.achivementExcess') as OutDateApplication;
            // AttendanceType.NORMALOVERTIME
            {
                let applicationTime = _.get(hdWorkDispInfoWithDateOutput, 'actualApplicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
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
                let overTimeMidNight = _.get(hdWorkDispInfoWithDateOutput, 'actualApplicationTime.overTimeShiftNight.overTimeMidNight');
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == AttendanceType.MIDNIGHT_OUTSIDE) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.actualApp.actualTime = overTimeMidNight || 0;
                }
                if (achivementExcess) {
                    let findResult = _.findLast(overTimes, (item: OverTime) => item.type == AttendanceType.MIDNIGHT_OUTSIDE) as OverTime;
                    if (!_.isNil(findResult)) {
                        findResult.actualApp.actualExcess = achivementExcess.overTimeLate || ExcessTimeStatus.NONE;
                    }
                }
            }
        }
        overTimes = _.filter(overTimes, (item: OverTime) => item.applicationTime > 0);
        self.overTimes = overTimes;
    }

    public bindGoWorkBackHomeAtr() {
        const self = this;
        if (self.c14) {
            self.goWorkAtr = _.get(self.dataOutput, 'appHolidayWork.goWorkAtr');
            self.backHomeAtr = _.get(self.dataOutput, 'appHolidayWork.backHomeAtr');
        }
    }

    public bindBreakTime() {
        const self = this;
        let breakTime = [] as Array<BreakTime>;
        _.range(1, 11)
        .forEach((index: number) => {
            let result = _.findLast(_.get(self.dataOutput, 'appHolidayWork.breakTimeList'), (i: TimeZoneWithWorkNo) => i.workNo == index) as any;
            let findResult = _.get(result, 'timeZone') as TimeZoneNew;
            if (!_.isNil(findResult)) {
                let item = {} as BreakTime;
                item.frameNo = index;
                item.title = self.$i18n('KAFS10_10', String(item.frameNo));
                item.valueHours = {start: self.$dt.timedr(findResult.startTime || 0), end: self.$dt.timedr(findResult.endTime || 0)};
                breakTime.push(item);
            }
        });
        self.breakTimes = breakTime;
    }

    public bindWorkInfo() {
        const self = this;
        let appHolidayWork = self.dataOutput.appHolidayWork as AppHolidayWork;
        let appHdWorkDispInfo = self.dataOutput.appHdWorkDispInfo as AppHdWorkDispInfo;
        self.createWorkInfo(_.get(appHolidayWork, 'workInformation.workType'), _.get(appHolidayWork, 'workInformation.workTime'));
    }

    public bindWorkHours() {
        const self = this;
        let appHolidayWork = self.dataOutput.appHolidayWork as AppHolidayWork; 
        // 1
        self.workHours1 = self.createWorkHours(_.get(appHolidayWork, 'workingTimeList[0].timeZone.startTime'),
        _.get(appHolidayWork, 'workingTimeList[0].timeZone.endTime'));
        // 2
        self.workHours2 = self.createWorkHours(_.get(appHolidayWork, 'workingTimeList[1].timeZone.startTime'),
        _.get(appHolidayWork, 'workingTimeList[1].timeZone.endTime'));
    }

    public bindReasons() {
        const self = this;
        let reasons = [] as Array<Reason>;
        let appHolidayWork = self.dataOutput.appHolidayWork as AppHolidayWork;
        let appHdWorkDispInfo = self.dataOutput.appHdWorkDispInfo as AppHdWorkDispInfo;
        let reasonDissociation = _.get(appHolidayWork, 'applicationTime.reasonDissociation') as any;
        let no = _.findLast(reasonDissociation, (item: any) => item.diviationTime == 3);
        let code = _.get(no, 'reasonCode');
        let divergenceReasonInputMethod = _.findLast(appHdWorkDispInfo.divergenceReasonInputMethod, (item: any) => item.divergenceTimeNo == 3);
        let findContentByCode = _.findLast(_.get(divergenceReasonInputMethod, 'reasons'), (item: any) => item.divergenceReasonCode == code) as any;
        let contentByCode= _.get(findContentByCode, 'reason') || (!_.isNil(code) ? self.$i18n('KAFS05_55') : null);
        let content = _.get(no, 'reason');
        let title = _.findLast(appHdWorkDispInfo.divergenceTimeRoots, (item: any) => item.divergenceTimeNo == 3);
        title = _.get(title, 'divTimeName') || '';

        {
            let item = {} as Reason;
            item.c1 = self.c11_1;
            item.c2 = self.c10;
            item.c3 = self.c11;
            item.code = code;
            item.name = contentByCode;
            item.content = content;
            item.title = title;
            reasons.push(item);
        }

        self.reasons = reasons;
    }

    public commandStart() {
        const self = this;

        return {
            companyId: self.user.companyId,
            applicationId: self.params.appDispInfoStartupOutput.appDetailScreenInfo.application.appID,
            appDispInfoStartup: self.params.appDispInfoStartupOutput
        };
    }

    public createWorkHours(start: number, end: number) {
        const self = this;
        if (_.isNil(start) || _.isNil(end)) {

            return {
                start: '',
                end: ''
            } as WorkHours;
        }

        return {
            start: self.$dt.timedr(start || 0),
            end: self.$dt.timedr(end || 0)
        } as WorkHours;
    }

    public createWorkInfo(codeType?: string, codeTime?: string, nameType?: string, nameTime?: string) {
        const self = this;

        let workType = {} as Work;
        workType.code = codeType || '';

        let workTime = {} as Work;
        workTime.code = codeTime || '';
        let appHdWorkDispInfo = _.get(self.dataOutput, 'appHdWorkDispInfo');
        if (appHdWorkDispInfo) {
            if (nameType) {
                workType.name = nameType;
            } else {
                let workTypes = appHdWorkDispInfo.hdWorkDispInfoWithDateOutput.workTypeList;
                let resultWorkType = 
                    _.find(workTypes, (i: any) => i.workTypeCode == workType.code);
                workType.name = resultWorkType ? (resultWorkType.name || '')  : self.$i18n('KAFS10_28');
            }
            if (nameTime) {
                workTime.name = nameTime;
            } else {
                let workTimes = appHdWorkDispInfo.appDispInfoStartupOutput.appDispInfoWithDateOutput.opWorkTimeLst;
                let resultWorkTime = 
                        _.find(workTimes, (i: any) => i.worktimeCode == workTime.code);
                workTime.name = resultWorkTime ? (_.get(resultWorkTime, 'workTimeDisplayName.workTimeName') || '') : self.$i18n('KAFS10_28');
            }
        }
        let workInfo = {} as WorkInfo;
        workInfo.workType = workType;
        workInfo.workTime = workTime;

        self.workInfo = workInfo;
    }
    //  休日出勤申請起動時の表示情報．休出申請設定．残業休出申請共通設定」．時間外表示区分＝表示する
    public get c1() {
        const self = this;

        const displayAtr = _.get(self.dataOutput, 'appHdWorkDispInfo.holidayWorkAppSet.overtimeLeaveAppCommonSet.extratimeDisplayAtr');

        return displayAtr == NotUseAtr.USE;
    }

    //  「休日出勤申請起動時の表示情報．申請表示情報．申請設定（基準日関係なし）．複数回勤務の管理」＝TRUE
    public get c3() {
        const self = this;

        return _.get(self.dataOutput, 'appHdWorkDispInfo.appDispInfoStartupOutput.appDispInfoNoDateOutput.managementMultipleWorkCycles');
    }

    //  「休日出勤申請起動時の表示情報．残業休日出勤申請の反映．休日出勤申請の反映．事後休日出勤申請の反映．休憩・外出を申請反映する」．休憩を反映する＝反映する
    public get c4() {
        const self = this;
        let displayAtr = _.get(self.dataOutput, 'appHdWorkDispInfo.hdWorkOvertimeReflect.holidayWorkAppReflect.after.breakLeaveApplication.breakReflectAtr');

        return displayAtr == NotUseAtr.USE;
    }

    //  「休日出勤申請起動時の表示情報．残業休日出勤申請の反映」．時間外深夜時間を反映する＝反映する
    public get c7() {
        const self = this;
        let displayAtr = _.get(self.dataOutput, 'appHdWorkDispInfo.hdWorkOvertimeReflect.nightOvertimeReflectAtr');

        return displayAtr == NotUseAtr.USE;
    }

    //  ＄：休日出勤申請起動時の表示情報
    //  「＄．利用する乖離理由」<> empty
    //  AND 「＄．利用する乖離理由．乖離理由の選択肢を利用する」がtrue 
    //  AND 「＄．残業休日出勤申請の反映．休日出勤申請の反映．事後休日出勤申請の反映．その他項目の反映．乖離理由を反映する」が反映する
    public get c10() {
        const self = this;
        if (_.get(self.dataOutput, 'appHdWorkDispInfo.appDispInfoStartupOutput.appDetailScreenInfo.application.prePostAtr') == 1) {
            if (_.get(self.dataOutput, 'appHdWorkDispInfo.hdWorkOvertimeReflect.holidayWorkAppReflect.after.othersReflect.reflectDivergentReasonAtr') == NotUseAtr.USE && 
                (_.get(self.dataOutput, 'appHdWorkDispInfo.divergenceReasonInputMethod').length > 0 && _.get(self.dataOutput, 'appHdWorkDispInfo.divergenceReasonInputMethod[0].divergenceReasonSelected'))) {
                return true;
            }
        }

        return false;
    }

    //  ＄：休日出勤申請起動時の表示情報
    //  「＄．利用する乖離理由」<> empty
    //  AND 「＄．利用する乖離理由．乖離理由の入力を利用する」がtrue 
    //  AND 「＄．残業休日出勤申請の反映．休日出勤申請の反映．事後休日出勤申請の反映．その他項目の反映．乖離理由を反映する」が反映する
    public get c11() {
        const self = this;
        if (_.get(self.dataOutput, 'appHdWorkDispInfo.appDispInfoStartupOutput.appDetailScreenInfo.application.prePostAtr') == 1) {
            if (_.get(self.dataOutput, 'appHdWorkDispInfo.hdWorkOvertimeReflect.holidayWorkAppReflect.after.othersReflect.reflectDivergentReasonAtr') == NotUseAtr.USE && 
                (_.get(self.dataOutput, 'appHdWorkDispInfo.divergenceReasonInputMethod').length > 0 && _.get(self.dataOutput, 'appHdWorkDispInfo.divergenceReasonInputMethod[0].divergenceReasonInputed'))) {
                return true;
            }
        }

        return false;
    }

    //  ※10 = ○　OR　※11 = ○
    public get c11_1() {
        const self = this;
        
        return self.c10 || self.c11;
    }

    //  「休日出勤申請起動時の表示情報．申請表示情報．申請詳細画面情報．申請」．事前事後区分=事後
    public get c12() {
        const self = this;
        let displayAtr = _.get(self.dataOutput, 'appHdWorkDispInfo.appDispInfoStartupOutput.appDetailScreenInfo.application.prePostAtr');

        return displayAtr == PrePostAtr.POST;
    }

    //  ※7 = ○　AND　※12 = ○
    public get c12_1() {
        const self = this;

        return self.c7 && self.c12;
    }

    //  起動時取得した「休日出勤申請」．申請時間．申請時間．申請時間（Type＝残業時間）に項目がある
    public get c13() {
        const self = this;
        let applicationTimes = _.get(self.dataOutput, 'appHolidayWork.applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
        if (!_.isEmpty(applicationTimes)
            && applicationTimes.filter((applicationTime) => applicationTime.attendanceType == AttendanceType.NORMALOVERTIME && applicationTime.applicationTime > 0).length > 0) {
            return true;
        }

        return false;
    }

    //  ※12 = ○　AND　※13 = ○
    public get c13_1() {
        const self = this;

        return self.c12 && self.c13;
    }

    //  ※7 = ○　AND　※13 = ○
    public get c13_2() {
        const self = this;

        return self.c7 && self.c13;
    }

    //  ※7 = ○　AND　※12 = ○　AND　※13 = ○
    public get c13_3() {
        const self = this;

        return self.c7 && self.c12 && self.c13;
    }

    //  「休日出勤申請起動時の表示情報．申請表示情報．申請表示情報(基準日関係なし)．申請承認設定のOutputを利用
    //  「休出申請設定」．直行直帰の機能の利用設定 == true AND 「申請詳細設定．時刻計算利用区分」が利用する
    public get c14() {
        const self = this;
        let useDirectBounceFunction = _.get(self.dataOutput, 'appHdWorkDispInfo.holidayWorkAppSet.useDirectBounceFunction');
        let timeCalUse = _.get(self.dataOutput, 'appHdWorkDispInfo.holidayWorkAppSet.applicationDetailSetting.timeCalUse');

        return useDirectBounceFunction == NotUseAtr.USE && timeCalUse == NotUseAtr.USE;
    }

    //  「休日出勤申請起動時の表示情報．休出申請設定．申請詳細設定．時刻計算利用区分」が利用する
    public get c15() {
        const self = this;
        
        const timeCalUse = _.get(self.dataOutput, 'appHdWorkDispInfo.holidayWorkAppSet.applicationDetailSetting.timeCalUse');

        return timeCalUse == NotUseAtr.USE;

    }
}
const API = {
    start: 'at/request/application/holidaywork/mobile/getDetail'
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
    appHolidayWork: AppHolidayWork;
    appHdWorkDispInfo: AppHdWorkDispInfo;
}
interface BreakTime {
    valueHours: any;
    title: string;
    frameNo: number;
}
interface Reason {
    c1: boolean;
    c2: boolean;
    c3: boolean;
    title: string;
    code: string;
    name: string;
    content: string;
}
enum PrePostAtr {
    PRE,
    POST
}