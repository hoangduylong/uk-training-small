import { _, Vue } from '@app/provider';
import { component } from '@app/core/component';
import { KafS05Component } from '../a/index';
import { KafS00SubP3Component } from 'views/kaf/s00/sub/p3';
import { KafS00SubP1Component } from 'views/kaf/s00/sub/p1';
import { KafS00AComponent, KafS00BComponent, KafS00CComponent } from 'views/kaf/s00';
import { ExcessTimeStatus } from '../../s00/sub/p1';
import { KafS00SubP2Component } from 'views/kaf/s00/sub/p2';
import { ReasonDivergence, ExcessStateMidnight, ExcessStateDetail, OutDateApplication, DivergenceReasonSelect, AppOverTime, OvertimeWorkFrame, DivergenceReasonInputMethod, DivergenceTimeRoot, AttendanceType, OvertimeApplicationSetting, HolidayMidNightTime, StaturoryAtrOfHolidayWork, WorkdayoffFrame, ExcessState } from '../a/define.interface';
@component({
    name: 'kafs05step2',
    route: '/kaf/s05/step2',
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
        reason1: {
            reason: {
                constraint: 'DivergenceReason',

            }
        },
        reason2: {
            reason: {
                constraint: 'DivergenceReason',
            }
        },
        DivergenceReason: {
            constraint: 'DivergenceReason'
        }
    },
    constraints: [
        'nts.uk.ctx.at.request.dom.application.overtime.CommonAlgorithm.DivergenceReason',
        'nts.uk.ctx.at.request.dom.application.overtime.primitivevalue.OvertimeAppPrimitiveTime'
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
export class KafS05Step2Component extends Vue {
    public title: string = 'KafS05Step2';
    public overTime: number = null;

    public overTimes: Array<OverTime> = [];
    public holidayTimes: Array<HolidayTime> = [];

    public readonly SPACE_STRING = ' ';

    public isMsg_1557 = false;
    public isMsg_1556 = false;

    public reason1: Reason = {
        title: '',
        reason: '',
        selectedValue: '',
        dropdownList: [{
            code: '',
            text: this.$i18n('KAFS05_54')
        }]
    } as Reason;
    

    public reason2: Reason = {
        title: '',
        reason: '',
        selectedValue: '',
        dropdownList: [{
            code: '',
            text: this.$i18n('KAFS05_54')
        }]
    } as Reason;


    public created() {
        const self = this;
        if (self.$appContext.getoverTimeClf() == 0) {
            self.pgName = 'kafs05step1';
        } else if (self.$appContext.getoverTimeClf() == 1) {
            self.pgName = 'kafs05step2';
        } else if (self.$appContext.getoverTimeClf() == 2) {
            self.pgName = 'kafs05step3';
        } else {
            self.pgName = 'kafs05step4';
        }
        
    }
    public mounted() {
        const self = this;
        console.log('mounted');
    }

    public bindOverTime() {
        const self = this;
        let displayInfoOverTime = self.$appContext.model.displayInfoOverTime;
        let overTimeQuotaList = displayInfoOverTime.infoBaseDateOutput.quotaOutput.overTimeQuotaList as Array<OvertimeWorkFrame>;
        let overTimes = [];
        // create overtime object
        _.forEach(overTimeQuotaList, (item: OvertimeWorkFrame) => {
            let overTime = {} as OverTime;
            overTime.type = AttendanceType.NORMALOVERTIME;
            overTime.frameNo = String(item.overtimeWorkFrNo);
            overTime.title = item.overtimeWorkFrName;
            overTime.applicationTime = 0;
            overTime.visible = self.$appContext.c4;
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
            overTime.visible = self.$appContext.c5;
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
            overTime.visible = self.$appContext.c6;
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
        let calculationResultOp = displayInfoOverTime.calculationResultOp;
        // bind calculate 
        {
            // AttendanceType.NORMALOVERTIME
            let applicationTime = _.get(calculationResultOp, 'applicationTimes[0].applicationTime') as Array<OvertimeApplicationSetting>;
            _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo)) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.applicationTime = item.applicationTime || 0;
                }
            });
            // AttendanceType.MIDNIGHT_OUTSIDE
            {
                let overTimeMidNight = _.get(calculationResultOp, 'applicationTimes[0].overTimeShiftNight.overTimeMidNight');
                let findResult = _.findLast(overTimes, (i: OverTime) => i.type == AttendanceType.MIDNIGHT_OUTSIDE) as OverTime;
                if (!_.isNil(findResult)) {
                    findResult.applicationTime = overTimeMidNight || 0;
                }
            }
            // AttendanceType.FLEX_OVERTIME
            {
                let flexOverTime = _.get(calculationResultOp, 'applicationTimes[0].flexOverTime');
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

        // bind origin array
        self.overTimes = overTimes;
        
    }

    public bindHolidayTime() {
        const self = this;
        let displayInfoOverTime = self.$appContext.model.displayInfoOverTime;
        let workdayoffFrames = _.get(displayInfoOverTime, 'workdayoffFrames') as Array<WorkdayoffFrame>;
        let holidayTimes = [] as Array<HolidayTime>;
        if (!_.isNil(workdayoffFrames)) {
            _.forEach(workdayoffFrames, (item: WorkdayoffFrame) => {
                let holidayTime = {} as HolidayTime;
                holidayTime.type = AttendanceType.BREAKTIME;
                holidayTime.frameNo = String(item.workdayoffFrNo);
                holidayTime.title = item.workdayoffFrName;
                holidayTime.visible = self.$appContext.c16_1;
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
                holidayTime.visible = self.$appContext.c16_2;
            } else if (item == 2) {
                holidayTime.type = AttendanceType.MIDDLE_EXORBITANT_HOLIDAY;
                holidayTime.title = self.$i18n('KAFS05_86');
                holidayTime.visible = self.$appContext.c16_3;
            } else {
                holidayTime.type = AttendanceType.MIDDLE_HOLIDAY_HOLIDAY;
                holidayTime.title = self.$i18n('KAFS05_87');
                holidayTime.visible = self.$appContext.c16_4;
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

        let calculationResultOp = displayInfoOverTime.calculationResultOp;
        // bind calculate
        {
            // AttendanceType.BREAKTIME
            let applicationTime = _.get(calculationResultOp, 'applicationTimes[0].applicationTime') as Array<OvertimeApplicationSetting>;
            _.forEach(applicationTime, (item: OvertimeApplicationSetting) => {
                let findResult = _.findLast(holidayTimes, (i: HolidayTime) => i.type == item.attendanceType && i.frameNo == String(item.frameNo));
                if (!_.isNil(findResult)) {
                    findResult.applicationTime = item.applicationTime;
                }
            });

            let midNightHolidayTimes = _.get(calculationResultOp, 'applicationTimes[0].overTimeShiftNight.midNightHolidayTimes') as Array<HolidayMidNightTime>;
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

        self.holidayTimes = holidayTimes;
    }

    get $appContext(): KafS05Component {
        const self = this;

        return self.$parent as KafS05Component;
    }

    public backStep1() {
        const self = this;
        self.$appContext.toStep(1);
    }


    public bindAllReason() {
        const self = this;
        let divergenceTimeRoot1 = _.find(self.$appContext.model.displayInfoOverTime.infoNoBaseDate.divergenceTimeRoot, (item: DivergenceTimeRoot) => item.divergenceTimeNo == 1);
        let divergenceTimeRoot2 = _.find(self.$appContext.model.displayInfoOverTime.infoNoBaseDate.divergenceTimeRoot, (item: DivergenceTimeRoot) => item.divergenceTimeNo == 2);
        let divergenceReasonInputMethod1 = _.find(self.$appContext.model.displayInfoOverTime.infoNoBaseDate.divergenceReasonInputMethod, (item: DivergenceReasonInputMethod) => item.divergenceTimeNo == 1);
        let divergenceReasonInputMethod2 = _.find(self.$appContext.model.displayInfoOverTime.infoNoBaseDate.divergenceReasonInputMethod, (item: DivergenceReasonInputMethod) => item.divergenceTimeNo == 2);

        let reason1 = self.bindReason(divergenceTimeRoot1, divergenceReasonInputMethod1);
        let reason2 = self.bindReason(divergenceTimeRoot2, divergenceReasonInputMethod2);

        if (!self.$appContext.modeNew) {
            let findResult1 = _.findLast(self.$appContext.model.appOverTime.applicationTime.reasonDissociation, (item: any) => item.diviationTime == 1);
            let findResult2 = _.findLast(self.$appContext.model.appOverTime.applicationTime.reasonDissociation, (item: any) => item.diviationTime == 2);
            if (findResult1) {
                reason1.reason = findResult1.reason || '';
                let code = findResult1.reasonCode || null;
                let isFindCode = _.findLast(reason1.dropdownList, (item: any) => item.code == code);
                if (!isFindCode && code) {
                    reason1.dropdownList.shift();
                    reason1.dropdownList.unshift({
                        code,
                        text: code + self.SPACE_STRING + self.$i18n('KAFS05_55')
                    });
                    reason1.dropdownList.unshift({
                        code: null,
                        text: self.$i18n('KAFS05_54'),
                    });
                }
                reason1.selectedValue = code || '';
            }
            if (findResult2) {
                reason2.reason = findResult2.reason || '';
                let code = findResult2.reasonCode || null;
                let isFindCode = _.findLast(reason2.dropdownList, (item: any) => item.code == code);
                if (!isFindCode && code) {
                    reason2.dropdownList.shift();
                    reason2.dropdownList.unshift({
                        code,
                        text: code + self.SPACE_STRING + self.$i18n('KAFS05_55')
                    });
                    reason2.dropdownList.unshift({
                        code: null,
                        text: self.$i18n('KAFS05_54')
                    });
                }
                reason2.selectedValue = code || '';               
            }
        }

        self.reason1 = reason1;
        self.reason2 = reason2;

    }

    public bindReason(divergenceTimeRoot: DivergenceTimeRoot, divergenceReasonInputMethod: DivergenceReasonInputMethod) {
        const self = this;
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
            text: self.$i18n('KAFS05_54'),
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

        return reason;

    }

    public loadAllData() {
        const self = this;
        self.bindAllReason();
        self.bindOverTime();
        self.bindHolidayTime();
        self.checkAlarm();
        self.$updateValidator();
    }
    public checkAlarm() {
        const self = this;
        if (self.$appContext.step != 'step_2') {

            return;
        }
        // ・「残業申請の表示情報．計算結果．事前申請・実績の超過状態．事前申請なし」 = true ⇒#Msg_1557
        let c1 = _.get(self.$appContext.model, 'displayInfoOverTime.calculationResultOp.overStateOutput.isExistApp');
        // ・「残業申請の表示情報．計算結果．事前申請・実績の超過状態．実績状態」 = 超過アラーム⇒#Msg_1556
        let c2 = _.get(self.$appContext.model, 'displayInfoOverTime.calculationResultOp.overStateOutput.achivementStatus') == ExcessState.EXCESS_ALARM;
        if (c1) {
            self.isMsg_1557 = true;
        } else {
            self.isMsg_1557 = false;
        }

        if (c2) {
            self.isMsg_1556 = true;
        } else {
            self.isMsg_1556 = false;
        }

    }


    public getReasonDivergence() {
        const self = this;
        let list = [] as Array<ReasonDivergence>;

        {
            let item = {} as ReasonDivergence;
            item.diviationTime = 1;
            item.reasonCode = self.reason1.selectedValue;
            item.reason = self.reason1.reason;
            list.push(item);
        }
        {
            let item = {} as ReasonDivergence;
            item.diviationTime = 2;
            item.reasonCode = self.reason2.selectedValue;
            item.reason = self.reason2.reason;
            list.push(item);
        }

        return list;
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