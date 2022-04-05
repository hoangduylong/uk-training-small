import { _, Vue } from '@app/provider';
import { component } from '@app/core/component';
import { KafS10Component } from '../a/index';
import { KafS00SubP3Component } from 'views/kaf/s00/sub/p3';
import { KafS00SubP1Component } from 'views/kaf/s00/sub/p1';
import { KafS00AComponent, KafS00BComponent, KafS00CComponent } from 'views/kaf/s00';
import { ExcessTimeStatus } from '../../s00/sub/p1';
import { KafS00SubP2Component } from 'views/kaf/s00/sub/p2';
import { ReasonDivergence, ExcessStateMidnight, ExcessStateDetail, OutDateApplication, DivergenceReasonSelect, AppOverTime, OvertimeWorkFrame, DivergenceReasonInputMethod, DivergenceTimeRoot, AttendanceType, OvertimeApplicationSetting, HolidayMidNightTime, StaturoryAtrOfHolidayWork, WorkdayoffFrame, AppHolidayWork, NotUseAtr } from '../a/define.interface';

@component({
    name: 'kafs10step2',
    route: '/kaf/s10/step2',
    style: require('./style.scss'),
    template: require('./index.vue'),
    validations: {
        overTimes: {
            applicationTime: {
                loop: true,
                constraint: 'OvertimeAppPrimitiveTime',
                validate: true
            }
        },
        holidayTimes: {
            applicationTime: {
                loop: true,
                constraint: 'OvertimeAppPrimitiveTime',
                validate: true
            }
        },
        reason: {
            reason: {
                constraint: 'DivergenceReasonContent',

            }
        },
        DivergenceReason: {
            constraint: 'DivergenceReason'
        }
    },
    constraints: [
        'nts.uk.ctx.at.request.dom.application.AppReason',
        'nts.uk.shr.com.time.TimeWithDayAttr',
        'nts.uk.ctx.at.request.dom.application.overtime.primitivevalue.OvertimeAppPrimitiveTime',
        'nts.uk.ctx.at.request.dom.application.overtime.CommonAlgorithm.DivergenceReason',
        'nts.uk.ctx.at.request.dom.setting.company.divergencereason.DivergenceReasonContent'
    ],
    components: {
        'kafs00subp3': KafS00SubP3Component,
        'kafs00subp1': KafS00SubP1Component,
        'kafs00subp2': KafS00SubP2Component,
        'kafs00-a': KafS00AComponent,
        'kafs00-b': KafS00BComponent,
        'kafs00-c': KafS00CComponent
    }
})
export class KafS10Step2Component extends Vue {
    public title: string = 'KafS10Step2';

    public overTime: number = null;

    public overTimes: Array<OverTime> = [];
    public holidayTimes: Array<HolidayTime> = [];

    public readonly SPACE_STRING = ' ';

    public reason: Reason = {
        title: '',
        reason: '',
        selectedValue: '',
        dropdownList: [{
            code: '',
            text: this.$i18n('KAFS10_29')
        }]
    } as Reason;

    get $appContext(): KafS10Component {
        const self = this;

        return self.$parent as KafS10Component;
    }

    public created() {
        const self = this;

        if (self.$appContext.getNumb == 1) {
            self.pgName = 'kafs10step1';
        } else if (self.$appContext.getNumb == 2) {
            self.pgName = 'kafs10step2';
        } else {
            self.pgName = 'kafs10step3';
        }
    }
    public mounted() {
        const self = this;
    }

    public loadAllData() {
        const self = this;
        self.bindReasonDivergence();
        self.bindHolidayTime();
        self.bindOverTime();
        self.$updateValidator();
    }

    public bindHolidayTime() {
        const self = this;
        let appHdWorkDispInfo = self.$appContext.model.appHdWorkDispInfo;
        let workdayoffFrameList = _.get(appHdWorkDispInfo, 'workdayoffFrameList') as Array<WorkdayoffFrame>;
        let holidayTimes = [] as Array<HolidayTime>;
        if (!_.isNil(workdayoffFrameList)) {
            _.forEach(workdayoffFrameList, (item: WorkdayoffFrame) => {
                let holidayTime = {} as HolidayTime;
                holidayTime.type = AttendanceType.BREAKTIME;
                holidayTime.frameNo = String(item.workdayoffFrNo);
                holidayTime.title = item.workdayoffFrName;
                holidayTime.visible = true;
                holidayTime.applicationTime = 0;
                holidayTime.preApp = {
                    preAppDisp: self.$appContext.c6,
                    preAppTime: 0,
                    preAppExcess: ExcessTimeStatus.NONE,
                };
                holidayTime.actualApp = {
                    actualDisp: self.$appContext.c6,
                    actualTime: 0,
                    actualExcess: ExcessTimeStatus.NONE
                };
                holidayTimes.push(holidayTime);
            });
        }
        if (self.$appContext.c7) {
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
                holidayTime.visible = self.$appContext.c7;
                holidayTime.preApp = {
                    preAppDisp: self.$appContext.c7_1,
                    preAppTime: 0,
                    preAppExcess: ExcessTimeStatus.NONE,
                };
                holidayTime.actualApp = {
                    actualDisp: self.$appContext.c7_1,
                    actualTime: 0,
                    actualExcess: ExcessTimeStatus.NONE
                };
                holidayTimes.push(holidayTime);
            });
        }
        let calculationResultOp = appHdWorkDispInfo.calculationResult;
        // bind calculate
        {
            // AttendanceType.BREAKTIME
            let applicationTime = _.get(calculationResultOp, 'applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
            //  （申請一覧から起動する　）場合
            if (!self.$appContext.modeNew) {
                // 休日出勤申請起動時の表示情報．休出申請設定．申請詳細設定．時刻計算利用区分＝しない
                if (_.get(appHdWorkDispInfo, 'holidayWorkAppSet.applicationDetailSetting.timeCalUse') == NotUseAtr.Not_USE) {
                    let appHolidayWork = self.$appContext.model.appHolidayWork;
                    applicationTime = _.get(appHolidayWork, 'applicationTime.applicationTime');
                }
            }
            _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                let findResult = _.findLast(holidayTimes, (i: HolidayTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo));
                if (!_.isNil(findResult)) {
                    findResult.applicationTime = item.applicationTime;
                }
            });
            let midNightHolidayTimes = _.get(calculationResultOp, 'applicationTime.overTimeShiftNight.midNightHolidayTimes') as Array<HolidayMidNightTime>;
            //  （申請一覧から起動する　）場合
            if (!self.$appContext.modeNew) {
                // 休日出勤申請起動時の表示情報．休出申請設定．申請詳細設定．時刻計算利用区分＝しない
                if (_.get(appHdWorkDispInfo, 'holidayWorkAppSet.applicationDetailSetting.timeCalUse') == NotUseAtr.Not_USE) {
                    let appHolidayWork = self.$appContext.model.appHolidayWork;
                    midNightHolidayTimes = _.get(appHolidayWork, 'applicationTime.overTimeShiftNight.midNightHolidayTimes');
                }
            }
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
        self.holidayTimes = holidayTimes;
    }

    public bindOverTime() {
        const self = this;
        let appHdWorkDispInfo = self.$appContext.model.appHdWorkDispInfo;
        let overtimeFrameList = appHdWorkDispInfo.overtimeFrameList as Array<OvertimeWorkFrame>;
        let overTimes = [];
        // create overtime object
        _.forEach(overtimeFrameList, (item: OvertimeWorkFrame) => {
            let overTime = {} as OverTime;
            overTime.type = AttendanceType.NORMALOVERTIME;
            overTime.frameNo = String(item.overtimeWorkFrNo);
            overTime.title = item.overtimeWorkFrName;
            overTime.applicationTime = 0;
            overTime.visible = self.$appContext.c9 || self.$appContext.c9_appHolidayWork;
            overTime.preApp = {
                preAppDisp: self.$appContext.c9_3,
                preAppTime: 0,
                preAppExcess: ExcessTimeStatus.NONE,
            };
            overTime.actualApp = {
                actualDisp: self.$appContext.c9_3,
                actualTime: 0,
                actualExcess: ExcessTimeStatus.NONE
            };
            overTimes.push(overTime);
        });
        // create overtime night
        if (self.$appContext.c9_1) {
            let overTime = {} as OverTime;
            overTime.type = AttendanceType.MIDNIGHT_OUTSIDE;
            overTime.frameNo = String(11);
            overTime.title = self.$i18n('KAFS10_18');
            overTime.applicationTime = 0;
            overTime.visible = self.$appContext.c9_1;
            overTime.preApp = {
                preAppDisp: self.$appContext.c9_2,
                preAppTime: 0,
                preAppExcess: ExcessTimeStatus.NONE,
            };
            overTime.actualApp = {
                actualDisp: self.$appContext.c9_2,
                actualTime: 0,
                actualExcess: ExcessTimeStatus.NONE
            };
            overTimes.push(overTime);
        }
        let calculationResultOp = appHdWorkDispInfo.calculationResult;
        // bind calculate 
        {
            // AttendanceType.NORMALOVERTIME
            let applicationTime = _.get(calculationResultOp, 'applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
            //  （申請一覧から起動する　）場合
            if (!self.$appContext.modeNew) {
                // 休日出勤申請起動時の表示情報．休出申請設定．申請詳細設定．時刻計算利用区分＝しない
                if (_.get(appHdWorkDispInfo, 'holidayWorkAppSet.applicationDetailSetting.timeCalUse') == NotUseAtr.Not_USE) {
                    let appHolidayWork = self.$appContext.model.appHolidayWork;
                    applicationTime = _.get(appHolidayWork, 'applicationTime.applicationTime');
                }
            }
            _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo)) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.applicationTime = item.applicationTime || 0;
                }
            });
            // AttendanceType.MIDNIGHT_OUTSIDE
            {
                let overTimeMidNight = _.get(calculationResultOp, 'applicationTime.overTimeShiftNight.overTimeMidNight');
                //  （申請一覧から起動する　）場合
                if (!self.$appContext.modeNew) {
                    // 休日出勤申請起動時の表示情報．休出申請設定．申請詳細設定．時刻計算利用区分＝しない
                    if (_.get(appHdWorkDispInfo, 'holidayWorkAppSet.applicationDetailSetting.timeCalUse') == NotUseAtr.Not_USE) {
                        let appHolidayWork = self.$appContext.model.appHolidayWork;
                        overTimeMidNight = _.get(appHolidayWork, 'applicationTime.overTimeShiftNight.overTimeMidNight');
                    }
                }
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
                let applicationTime = _.get(appHdWorkDispInfo, 'applicationTime.applicationTime') as Array<OvertimeApplicationSetting>;
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
        self.overTimes = overTimes;
    }

    public bindReasonDivergence() {
        const self = this;
        let divergenceTimeRoot = self.$appContext.model.appHdWorkDispInfo.divergenceTimeRoots[0];
        let divergenceReasonInputMethod = self.$appContext.model.appHdWorkDispInfo.divergenceReasonInputMethod[0];

        //init reason
        let reason = {} as Reason;
        reason.title = self.SPACE_STRING;
        reason.reason = '';
        reason.selectedValue = '';
        if (!_.isNil(divergenceTimeRoot)) {
            reason.title = divergenceTimeRoot.divTimeName;
        }
        reason.dropdownList = [] as Array<Object>;
        reason.dropdownList.push({
            code: '',
            text: self.$i18n('KAFS10_29'),
            defaultValue: false
        });
        if (!_.isNil(divergenceReasonInputMethod)) {
            _.forEach(divergenceReasonInputMethod.reasons, (item: DivergenceReasonSelect) => {
                let code = item.divergenceReasonCode;
                let text = item.divergenceReasonCode + ' ' + item.reason;
                reason.dropdownList.push({
                    code,
                    text,
                    defaultValue: false
                });

            });
        }

        //select reason for mode edit
        if (!self.$appContext.modeNew) {
            let findResult = _.findLast(self.$appContext.model.appHolidayWork.applicationTime.reasonDissociation, (item: any) => item.diviationTime == 3);
            if (findResult) {
                reason.reason = findResult.reason || '';
                let code = findResult.reasonCode || null;
                let isFindCode = _.findLast(reason.dropdownList, (item: any) => item.code == code);
                if (!isFindCode && code) {
                    reason.dropdownList.shift();
                    reason.dropdownList.unshift({
                        code,
                        text: code + self.SPACE_STRING + self.$i18n('KAFS05_55')
                    });
                    reason.dropdownList.unshift({
                        code: null,
                        text: self.$i18n('KAFS10_29'),
                    });
                }
                reason.selectedValue = code || '';
            }
        }
        self.reason = reason;
    }

    public getReasonDivergence() {
        const self = this;
        let reason = {} as ReasonDivergence;
        reason.diviationTime = 3;
        reason.reasonCode = self.reason.selectedValue;
        reason.reason = self.reason.reason;

        return reason;
    }

    public backStep1() {
        const self = this;
        self.$appContext.toStep(1);
    }
}

export interface OverTime {
    frameNo: string;
    title: string;
    visible: boolean;
    applicationTime: number;
    preTime: number;
    actualTime: number;
    preApp: ExtraTime;
    actualApp: ExtraTime;
    type: AttendanceType;
}
export interface HolidayTime {
    frameNo: string;
    title: string;
    visible: boolean;
    applicationTime: number;
    preTime: number;
    actualTime: number;
    preApp: ExtraTime;
    actualApp: ExtraTime;
    type: number;
}
export interface Reason {
    title?: string;
    reason: string;
    selectedValue: string;
    titleDrop?: string;
    dropdownList: Array<Object>;
}
export interface ExtraTime {
    preAppDisp?: boolean;
    preAppTime?: number;
    preAppExcess?: ExcessTimeStatus;
    actualDisp?: boolean;
    actualTime?: number;
    actualExcess?: ExcessTimeStatus;
}