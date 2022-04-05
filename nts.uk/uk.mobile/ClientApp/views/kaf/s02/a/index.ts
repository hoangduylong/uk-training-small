import { _, Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { TotopComponent } from '@app/components/totop';
import { KDL002Component } from '../../../kdl/002';
import { Kdl001Component } from '../../../kdl/001';
import { KafS00DComponent } from '../../../kaf/s00/d';
import { WorkHour, GoBackHour, Error, DestinationTimeAppDto, TimeStampAppDto, TimeZone, DestinationTimeZoneAppDto, TimeStampAppOtherDto, ScreenMode } from '../shr/index';
import {
    KafS00AComponent,
    KafS00BComponent,
    KafS00CComponent
} from 'views/kaf/s00';
import {
    KafS00SubP3Component
} from 'views/kaf/s00/sub/p3';
import { KafS00ShrComponent, AppType } from 'views/kaf/s00/shr';
import { xor } from 'lodash';
import { CmmS45CComponent } from '../../../cmm/s45/c/index';

@component({
    name: 'kafs02a',
    route: '/kaf/s02/a',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {
        workHours: {
            timeRange: true,
            required: false,
        }
    },
    components: {
        'kafs00-a': KafS00AComponent,
        'kafs00-b': KafS00BComponent,
        'kafs00-c': KafS00CComponent,
        'worktype': KDL002Component,
        'kafs00d': KafS00DComponent,
        'worktime': Kdl001Component,
        'to-top': TotopComponent,
        'kafs00subp3': KafS00SubP3Component,
        'cmms45c': CmmS45CComponent
    },
})
export class KafS02AComponent extends KafS00ShrComponent {
    public title: string = 'KafS02A';

    @Prop({ default: null })
    public params?: any;

    public data: any = 'data';

    public mode: boolean = true;

    public user: any;

    public isValidateAll: Boolean = true;

    public appStampReflectOptional: any = null;

    public useCancelFunction: boolean = false;

    public useTemporary: boolean = false;

    public multipleWork: boolean = false;

    public appDispInfoStartupOutput: any = {};

    public appStampOutputDto: any = {};

    public application: any = {
        version: 1,
        prePostAtr: 1,
        appType: 7,
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
        },
    };

    public errorList: any[] = [
        new Error({ start: false, end: false, type: 'workHour', frame: 1 }),
        new Error({ start: false, end: false, type: 'workHour', frame: 2 }),
        new Error({ start: false, end: false, type: 'tempoHour', frame: 1 }),
        new Error({ start: false, end: false, type: 'tempoHour', frame: 2 }),
        new Error({ start: false, end: false, type: 'tempoHour', frame: 3 }),
        new Error({ start: false, end: false, type: 'gooutHour', frame: 1 }),
        new Error({ start: false, end: false, type: 'gooutHour', frame: 2 }),
        new Error({ start: false, end: false, type: 'gooutHour', frame: 3 }),
        new Error({ start: false, end: false, type: 'gooutHour', frame: 4 }),
        new Error({ start: false, end: false, type: 'gooutHour', frame: 5 }),
        new Error({ start: false, end: false, type: 'gooutHour', frame: 6 }),
        new Error({ start: false, end: false, type: 'gooutHour', frame: 7 }),
        new Error({ start: false, end: false, type: 'gooutHour', frame: 8 }),
        new Error({ start: false, end: false, type: 'gooutHour', frame: 9 }),
        new Error({ start: false, end: false, type: 'gooutHour', frame: 10 }),
        new Error({ start: false, end: false, type: 'breakHour', frame: 1 }),
        new Error({ start: false, end: false, type: 'breakHour', frame: 2 }),
        new Error({ start: false, end: false, type: 'breakHour', frame: 3 }),
        new Error({ start: false, end: false, type: 'breakHour', frame: 4 }),
        new Error({ start: false, end: false, type: 'breakHour', frame: 5 }),
        new Error({ start: false, end: false, type: 'breakHour', frame: 6 }),
        new Error({ start: false, end: false, type: 'breakHour', frame: 7 }),
        new Error({ start: false, end: false, type: 'breakHour', frame: 8 }),
        new Error({ start: false, end: false, type: 'breakHour', frame: 9 }),
        new Error({ start: false, end: false, type: 'breakHour', frame: 10 }),
        new Error({ start: false, end: false, type: 'childCareHour', frame: 1 }),
        new Error({ start: false, end: false, type: 'childCareHour', frame: 2 }),
        new Error({ start: false, end: false, type: 'longTermHour', frame: 1 }),
        new Error({ start: false, end: false, type: 'longTermHour', frame: 2 }),
    ];

    public actualWorkingTime: any[] = [];
    public actualTempoTime: any[] = [];
    public actualOutingTime: any[] = [];
    public actualBreakTime: any[] = [];
    public actualNursingTime: any[] = [];
    public actualParentingTime: any[] = [];

    public dataSource = [
        { id: 0, name: '私用' },
        { id: 1, name: '公用' },
        { id: 2, name: '有償' },
        { id: 3, name: '組合' }
    ];

    // value workHours
    public workHour1 = new WorkHour({ startTime: null, endTime: null, frame: 1, title: 'KAFS02_4', dispCheckbox: false, disableCheckbox: false, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
    public workHour2 = new WorkHour({ startTime: null, endTime: null, frame: 2, title: 'KAFS02_6', dispCheckbox: false, disableCheckbox: false, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
    public tempWorkHour1 = new WorkHour({ startTime: null, endTime: null, frame: 1, title: 'KAFS02_7', dispCheckbox: false, disableCheckbox: false, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
    public tempWorkHour2 = new WorkHour({ startTime: null, endTime: null, frame: 2, title: 'KAFS02_7', dispCheckbox: false, disableCheckbox: false, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
    public tempWorkHour3 = new WorkHour({ startTime: null, endTime: null, frame: 3, title: 'KAFS02_7', dispCheckbox: false, disableCheckbox: false, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });

    public workHourLst = [this.workHour1, this.workHour2];
    public checkboxWH = [];
    public tempWorkHourLst = [this.tempWorkHour1, this.tempWorkHour2, this.tempWorkHour3];
    public checkboxTH = [];

    // value goOut hour
    public goOut1 = new GoBackHour({ startTime: null, endTime: null, frame: 1, swtModel: 0, title: 'KAFS02_9', dispCheckbox: false, disableCheckbox: false, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
    public goOut2 = new GoBackHour({ startTime: null, endTime: null, frame: 2, swtModel: 0, title: 'KAFS02_9', dispCheckbox: false, disableCheckbox: false, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });

    public goOutLst = [this.goOut1, this.goOut2];
    public checkboxGH = [];

    // value break time
    public break1 = new WorkHour({ startTime: null, endTime: null, frame: 1, title: 'KAFS02_12', dispCheckbox: false, disableCheckbox: false, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
    public break2 = new WorkHour({ startTime: null, endTime: null, frame: 2, title: 'KAFS02_12', dispCheckbox: false, disableCheckbox: false, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });

    public breakLst = [this.break1, this.break2];
    public checkboxBH = [];

    // childCare time
    public childCareTime1 = new WorkHour({ startTime: null, endTime: null, frame: 1, title: 'KAFS02_14', dispCheckbox: false, disableCheckbox: false, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
    public childCareTime2 = new WorkHour({ startTime: null, endTime: null, frame: 2, title: 'KAFS02_14', dispCheckbox: false, disableCheckbox: false, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });

    public childCareLst = [this.childCareTime1, this.childCareTime2];
    public checkboxCH = [];

    // long-term care time
    public longTermTime1 = new WorkHour({ startTime: null, endTime: null, frame: 1, title: 'KAFS02_16', dispCheckbox: false, disableCheckbox: false, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
    public longTermTime2 = new WorkHour({ startTime: null, endTime: null, frame: 2, title: 'KAFS02_16', dispCheckbox: false, disableCheckbox: false, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });

    public longTermLst = [this.longTermTime1, this.longTermTime2];
    public checkboxLH = [];

    public created() {
        const self = this;
        if (self.params) {
            self.mode = false;
            this.data = self.params;
        }
    }

    public mounted() {
        const self = this;

        if (self.mode) {
            self.fetchStart();
        } else {
            self.application = self.data.appDispInfoStartupOutput.appDetailScreenInfo.application;
            self.fetchDataEdit();
        }
    }

    public fetchStart() {
        const self = this;
        self.$mask('show');

        self.$auth.user.then((usr: any) => {
            self.user = usr;
        }).then(() => {
            return self.loadCommonSetting(AppType.STAMP_APPLICATION);
        }).then((data: any) => {
            if (!_.isEmpty(self.appDispInfoStartupOutput)) {
                let command = {
                    companyId: self.user.companyId,
                    date: '',
                    appDispInfoStartupDto: self.appDispInfoStartupOutput,
                    recoderFlag: false
                };

                return self.$http.post('at', API.startStampApp, command);
            }
        }).then((data: any) => {
            if (data) {
                console.log(data);
                self.bindData(data.data);
            }
        }).then(() => self.$mask('hide'))
            .catch((err: any) => {
                self.handleErrorMessage(err).then((res: any) => {
                    if (err.messageId == 'Msg_1757') {
                        self.$goto('ccg008a');
                    }
                });
            });
    }

    public bindData(data: any) {
        const self = this;

        self.appStampReflectOptional = data.appStampReflectOptional;

        self.createParamA(data);
        self.createParamB(data);
        self.createParamC(data);

        self.errorList.map((item) => {
            item.start = false;
            item.end = false;
        });
        self.fetchErrorLst(data.errorListOptional);

        self.useCancelFunction = data.appStampSetting.useCancelFunction === 1 ? true : false;
        self.useTemporary = data.useTemporary;
        self.multipleWork = data.appDispInfoStartupOutput.appDispInfoNoDateOutput.managementMultipleWorkCycles;

        self.appStampOutputDto = data;
        self.appDispInfoStartupOutput = data.appDispInfoStartupOutput;

        self.workHourLst.map((x) => x.dispCheckbox = this.useCancelFunction);
        self.tempWorkHourLst.map((x) => x.dispCheckbox = this.useCancelFunction);
        self.breakLst.map((x) => x.dispCheckbox = this.useCancelFunction);
        self.goOutLst.map((x) => x.dispCheckbox = this.useCancelFunction);
        self.longTermLst.map((x) => x.dispCheckbox = this.useCancelFunction);
        self.childCareLst.map((x) => x.dispCheckbox = this.useCancelFunction);

        let goOutTypeDispControl: any[] = data.appStampSetting.goOutTypeDispControl;

        if (!_.isNil(goOutTypeDispControl) && goOutTypeDispControl.length > 0) {
            goOutTypeDispControl.forEach((item) => {
                if (item.display === 0) {
                    self.dataSource = _.remove(self.dataSource, (x) => x.id !== item.goOutType + 1);
                }
            });
        }

        if (self.dataSource.length === 0) {
            self.goOutLst.forEach((item) => {
                item.swtModel = null;

                return item;
            });
        } else {
            self.goOutLst.forEach((item) => {
                item.swtModel = self.dataSource[0].id;

                return item;
            });
        }
    }

    public fetchDataEdit() {
        const self = this;
        self.$mask('show');

        self.$auth.user.then((usr: any) => {
            self.user = usr;
        }).then(() => {
            self.bindData(self.data);
            if (!self.mode && !self.condition5) {
                self.workHourLst = [];
            }
            if (!self.mode && !self.condition4) {
                self.tempWorkHourLst = [];
            }
            if (!self.mode && !self.condition6) {
                self.goOutLst = [];
            }
            if (!self.mode && !self.condition7) {
                self.breakLst = [];
            }
            if (!self.mode && !self.condition8) {
                self.childCareLst = [];
            }
            if (!self.mode && !self.condition9) {
                self.longTermLst = [];
            }
            self.mappingApplication();
            let opActualContentDisplayLst = self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst;
            if (!_.isEmpty(opActualContentDisplayLst)) {
                this.bindActualAchive(opActualContentDisplayLst);
            }
            self.fetchErrorLst(self.data.errorListOptional);
        });

        self.$mask('hide');
    }

    private mappingApplication() {
        const self = this;

        let appStamp = self.data.appStampOptional;

        appStamp.listTimeStampApp.forEach((item: TimeStampAppDto) => {
            // workHours
            if (item.destinationTimeApp.timeStampAppEnum === 0) {
                if (_.filter(self.workHourLst, { frame: item.destinationTimeApp.engraveFrameNo }).length > 0) {
                    self.workHourLst = _.map(self.workHourLst, (x) => {
                        if (x.frame === item.destinationTimeApp.engraveFrameNo) {
                            if (item.destinationTimeApp.startEndClassification === 0) {
                                x.workHours.start = item.timeOfDay;
                            } else {
                                x.workHours.end = item.timeOfDay;
                            }
                        }

                        return x;
                    });
                } else {
                    let workHour: WorkHour;
                    if (item.destinationTimeApp.startEndClassification === 0) {
                        workHour = new WorkHour({ startTime: item.timeOfDay, endTime: null, frame: item.destinationTimeApp.engraveFrameNo, title: item.destinationTimeApp.engraveFrameNo === 1 ? 'KAFS02_4' : 'KAFS02_6', disableCheckbox: false, dispCheckbox: true, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
                    } else {
                        workHour = new WorkHour({ startTime: null, endTime: item.timeOfDay, frame: item.destinationTimeApp.engraveFrameNo, title: item.destinationTimeApp.engraveFrameNo === 1 ? 'KAFS02_4' : 'KAFS02_6', disableCheckbox: false, dispCheckbox: true, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
                    }

                    self.workHourLst.push(workHour);
                }
            }

            // tempoHours
            if (item.destinationTimeApp.timeStampAppEnum === 1) {
                if (_.filter(self.tempWorkHourLst, { frame: item.destinationTimeApp.engraveFrameNo }).length > 0) {
                    self.tempWorkHourLst = _.map(self.tempWorkHourLst, (x) => {
                        if (x.frame === item.destinationTimeApp.engraveFrameNo) {
                            if (item.destinationTimeApp.startEndClassification === 0) {
                                x.workHours.start = item.timeOfDay;
                            } else {
                                x.workHours.end = item.timeOfDay;
                            }
                        }

                        return x;
                    });
                } else {
                    let tempoHour: WorkHour;
                    if (item.destinationTimeApp.startEndClassification === 0) {
                        tempoHour = new WorkHour({ startTime: item.timeOfDay, endTime: null, frame: item.destinationTimeApp.engraveFrameNo, title: 'KAFS02_7', disableCheckbox: false, dispCheckbox: true, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
                    } else {
                        tempoHour = new WorkHour({ startTime: null, endTime: item.timeOfDay, frame: item.destinationTimeApp.engraveFrameNo, title: 'KAFS02_7', disableCheckbox: false, dispCheckbox: true, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
                    }

                    self.tempWorkHourLst.push(tempoHour);
                }
            }

            // outingHours
            if (item.destinationTimeApp.timeStampAppEnum === 2) {
                if (_.filter(self.goOutLst, { frame: item.destinationTimeApp.engraveFrameNo }).length > 0) {
                    self.goOutLst = _.map(self.goOutLst, (x) => {
                        if (x.frame === item.destinationTimeApp.engraveFrameNo) {
                            if (item.destinationTimeApp.startEndClassification === 0) {
                                x.hours.start = item.timeOfDay;
                                x.swtModel = item.appStampGoOutAtr;
                            } else {
                                x.hours.end = item.timeOfDay;
                                x.swtModel = item.appStampGoOutAtr;
                            }
                        }

                        return x;
                    });
                } else {
                    let outingHour: GoBackHour;
                    if (item.destinationTimeApp.startEndClassification === 0) {
                        outingHour = new GoBackHour({ startTime: item.timeOfDay, endTime: null, frame: item.destinationTimeApp.engraveFrameNo, swtModel: item.appStampGoOutAtr, title: 'KAFS02_9', disableCheckbox: false, dispCheckbox: true, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
                    } else {
                        outingHour = new GoBackHour({ startTime: null, endTime: item.timeOfDay, frame: item.destinationTimeApp.engraveFrameNo, swtModel: item.appStampGoOutAtr, title: 'KAFS02_9', disableCheckbox: false, dispCheckbox: true, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
                    }

                    self.goOutLst.push(outingHour);
                }
            }
        });

        appStamp.listTimeStampAppOther.forEach((item: TimeStampAppOtherDto) => {
            // breakHours
            if (item.destinationTimeZoneApp.timeZoneStampClassification === 2) {
                if (_.filter(self.breakLst, { frame: item.destinationTimeZoneApp.engraveFrameNo }).length > 0) {
                    self.breakLst = _.map(self.breakLst, (x) => {
                        if (x.frame === item.destinationTimeZoneApp.engraveFrameNo) {
                            x.workHours.start = item.timeZone.startTime;
                            x.workHours.end = item.timeZone.endTime;
                        }

                        return x;
                    });
                } else {
                    let breakHour: WorkHour = new WorkHour({ startTime: item.timeZone.startTime, endTime: item.timeZone.endTime, frame: item.destinationTimeZoneApp.engraveFrameNo, title: 'KAFS02_12', disableCheckbox: false, dispCheckbox: true, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
                    self.breakLst.push(breakHour);
                }
            }

            // parentingHours
            if (item.destinationTimeZoneApp.timeZoneStampClassification === 0) {
                if (_.filter(self.childCareLst, { frame: item.destinationTimeZoneApp.engraveFrameNo }).length > 0) {
                    self.childCareLst = _.map(self.childCareLst, (x) => {
                        if (x.frame === item.destinationTimeZoneApp.engraveFrameNo) {
                            x.workHours.start = item.timeZone.startTime;
                            x.workHours.end = item.timeZone.endTime;
                        }

                        return x;
                    });
                } else {
                    let parentHour: WorkHour = new WorkHour({ startTime: item.timeZone.startTime, endTime: item.timeZone.endTime, frame: item.destinationTimeZoneApp.engraveFrameNo, title: 'KAFS02_14', disableCheckbox: false, dispCheckbox: true, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
                    self.childCareLst.push(parentHour);
                }
            }

            // longtermHours
            if (item.destinationTimeZoneApp.timeZoneStampClassification === 1) {
                if (_.filter(self.longTermLst, { frame: item.destinationTimeZoneApp.engraveFrameNo }).length > 0) {
                    self.longTermLst = _.map(self.longTermLst, (x) => {
                        if (x.frame === item.destinationTimeZoneApp.engraveFrameNo) {
                            x.workHours.start = item.timeZone.startTime;
                            x.workHours.end = item.timeZone.endTime;
                        }

                        return x;
                    });
                } else {
                    let longtermHour: WorkHour = new WorkHour({ startTime: item.timeZone.startTime, endTime: item.timeZone.endTime, frame: item.destinationTimeZoneApp.engraveFrameNo, title: 'KAFS02_16', disableCheckbox: false, dispCheckbox: true, isCheck: false, errorMsg: null, actualStart: null, actualEnd: null });
                    self.longTermLst.push(longtermHour);
                }
            }
        });

        appStamp.listDestinationTimeApp.forEach((item: DestinationTimeAppDto) => {
            // cancel workHours
            if (item.timeStampAppEnum === 0) {
                if (_.filter(self.workHourLst, { frame: item.engraveFrameNo }).length > 0) {
                    self.workHourLst = _.map(self.workHourLst, (x) => {
                        x.isCheck = true;

                        return x;
                    });
                } else {
                    let workHour = new WorkHour({ startTime: null, endTime: null, frame: item.engraveFrameNo, title: item.engraveFrameNo === 1 ? 'KAFS02_4' : 'KAFS02_6', disableCheckbox: false, dispCheckbox: true, isCheck: true, errorMsg: null, actualStart: null, actualEnd: null });

                    self.workHourLst.push(workHour);
                }

                if (_.filter(self.checkboxWH, (x) => { if (item.engraveFrameNo === x) { return x; } }).length === 0) {
                    self.checkboxWH.push(item.engraveFrameNo);
                }
            }

            // cancel tempoHours
            if (item.timeStampAppEnum === 1) {
                if (_.filter(self.tempWorkHourLst, { frame: item.engraveFrameNo }).length > 0) {
                    self.tempWorkHourLst = _.map(self.tempWorkHourLst, (x) => {
                        x.isCheck = true;

                        return x;
                    });
                } else {
                    let tempoHour = new WorkHour({ startTime: null, endTime: null, frame: item.engraveFrameNo, title: 'KAFS02_7', disableCheckbox: false, dispCheckbox: true, isCheck: true, errorMsg: null, actualStart: null, actualEnd: null });

                    self.tempWorkHourLst.push(tempoHour);
                }

                if (_.filter(self.checkboxTH, (x) => { if (item.engraveFrameNo === x) { return x; } }).length === 0) {
                    self.checkboxTH.push(item.engraveFrameNo);
                }
            }

            // cancel outingHours
            if (item.timeStampAppEnum === 2) {
                if (_.filter(self.goOutLst, { frame: item.engraveFrameNo }).length > 0) {
                    self.goOutLst = _.map(self.goOutLst, (x) => {
                        x.isCheck = true;

                        return x;
                    });
                } else {
                    let outingHour = new GoBackHour({ startTime: null, endTime: null, frame: item.engraveFrameNo, swtModel: self.dataSource[0].id, title: 'KAFS02_9', disableCheckbox: false, dispCheckbox: true, isCheck: true, errorMsg: null, actualStart: null, actualEnd: null });

                    self.goOutLst.push(outingHour);
                }

                if (_.filter(self.checkboxGH, (x) => { if (item.engraveFrameNo === x) { return x; } }).length === 0) {
                    self.checkboxGH.push(item.engraveFrameNo);
                }
            }
        });

        appStamp.listDestinationTimeZoneApp.forEach((item: DestinationTimeZoneAppDto) => {
            // cancel breakHours
            if (item.timeZoneStampClassification === 2) {
                if (_.filter(self.breakLst, { frame: item.engraveFrameNo }).length > 0) {
                    self.breakLst = _.map(self.breakLst, (x) => {
                        x.isCheck = true;

                        return x;
                    });
                } else {
                    let breakHour = new WorkHour({ startTime: null, endTime: null, frame: item.engraveFrameNo, title: 'KAFS02_12', disableCheckbox: false, dispCheckbox: true, isCheck: true, errorMsg: null, actualStart: null, actualEnd: null });

                    self.breakLst.push(breakHour);
                }

                if (_.filter(self.checkboxBH, (x) => { if (item.engraveFrameNo === x) { return x; } }).length === 0) {
                    self.checkboxBH.push(item.engraveFrameNo);
                }
            }

            // cancel parentingHours
            if (item.timeZoneStampClassification === 0) {
                if (_.filter(self.childCareLst, { frame: item.engraveFrameNo }).length > 0) {
                    self.childCareLst = _.map(self.childCareLst, (x) => {
                        x.isCheck = true;

                        return x;
                    });
                } else {
                    let childCare = new WorkHour({ startTime: null, endTime: null, frame: item.engraveFrameNo, title: 'KAFS02_14', disableCheckbox: false, dispCheckbox: true, isCheck: true, errorMsg: null, actualStart: null, actualEnd: null });

                    self.childCareLst.push(childCare);
                }

                if (_.filter(self.checkboxCH, (x) => { if (item.engraveFrameNo === x) { return x; } }).length === 0) {
                    self.checkboxCH.push(item.engraveFrameNo);
                }
            }

            // cancel longtermHours
            if (item.timeZoneStampClassification === 1) {
                if (_.filter(self.longTermLst, { frame: item.engraveFrameNo }).length > 0) {
                    self.longTermLst = _.map(self.longTermLst, (x) => {
                        x.isCheck = true;

                        return x;
                    });
                } else {
                    let longTermHour = new WorkHour({ startTime: null, endTime: null, frame: item.engraveFrameNo, title: 'KAFS02_16', disableCheckbox: false, dispCheckbox: true, isCheck: true, errorMsg: null, actualStart: null, actualEnd: null });

                    self.longTermLst.push(longTermHour);
                }

                if (_.filter(self.checkboxLH, (x) => { if (item.engraveFrameNo === x) { return x; } }).length === 0) {
                    self.checkboxLH.push(item.engraveFrameNo);
                }
            }
        });

        self.workHourLst = _.sortBy(self.workHourLst, ['frame']);
        self.tempWorkHourLst = _.sortBy(self.tempWorkHourLst, ['frame']);
        self.goOutLst = _.sortBy(self.goOutLst, ['frame']);
        self.breakLst = _.sortBy(self.breakLst, ['frame']);
        self.childCareLst = _.sortBy(self.childCareLst, ['frame']);
        self.longTermLst = _.sortBy(self.longTermLst, ['frame']);
    }

    public fetchErrorLst(errorLst: any[]) {
        const self = this;
        let errorList = self.errorList;

        errorLst.forEach((item) => {
            // workHour
            if (item.timeStampAppEnum === 0) {
                if (item.startEndClassification === 0) {
                    for (let x = 0; x < errorList.length; x++) {
                        if (errorList[x].type === 'workHour' && errorList[x].frame === item.stampFrameNo) {
                            errorList[x].start = true;
                        }
                    }
                } else {
                    for (let x = 0; x < errorList.length; x++) {
                        if (errorList[x].type === 'workHour' && errorList[x].frame === item.stampFrameNo) {
                            errorList[x].end = true;
                        }
                    }
                }
            }

            // tempo hour
            if (item.timeStampAppEnum === 1) {
                if (item.startEndClassification === 0) {
                    for (let x = 0; x < errorList.length; x++) {
                        if (errorList[x].type === 'tempoHour' && errorList[x].frame === item.stampFrameNo) {
                            errorList[x].start = true;
                        }
                    }
                } else {
                    for (let x = 0; x < errorList.length; x++) {
                        if (errorList[x].type === 'tempoHour' && errorList[x].frame === item.stampFrameNo) {
                            errorList[x].end = true;
                        }
                    }
                }
            }

            // gooutHour
            if (item.timeStampAppEnum === 2) {
                if (item.startEndClassification === 0) {
                    for (let x = 0; x < errorList.length; x++) {
                        if (errorList[x].type === 'gooutHour' && errorList[x].frame === item.stampFrameNo) {
                            errorList[x].start = true;
                        }
                    }
                } else {
                    for (let x = 0; x < errorList.length; x++) {
                        if (errorList[x].type === 'gooutHour' && errorList[x].frame === item.stampFrameNo) {
                            errorList[x].end = true;
                        }
                    }
                }
            }

            // breakHour
            if (item.timeStampAppEnum === 6) {
                if (item.startEndClassification === 0) {
                    for (let x = 0; x < errorList.length; x++) {
                        if (errorList[x].type === 'breakHour' && errorList[x].frame === item.stampFrameNo) {
                            errorList[x].start = true;
                        }
                    }
                } else {
                    for (let x = 0; x < errorList.length; x++) {
                        if (errorList[x].type === 'breakHour' && errorList[x].frame === item.stampFrameNo) {
                            errorList[x].end = true;
                        }
                    }
                }
            }

            // childCareHour
            if (item.timeStampAppEnum === 4) {
                if (item.startEndClassification === 0) {
                    for (let x = 0; x < errorList.length; x++) {
                        if (errorList[x].type === 'childCareHour' && errorList[x].frame === item.stampFrameNo) {
                            errorList[x].start = true;
                        }
                    }
                } else {
                    for (let x = 0; x < errorList.length; x++) {
                        if (errorList[x].type === 'childCareHour' && errorList[x].frame === item.stampFrameNo) {
                            errorList[x].end = true;
                        }
                    }
                }
            }

            // longTermHour
            if (item.timeStampAppEnum === 5) {
                if (item.startEndClassification === 0) {
                    for (let x = 0; x < errorList.length; x++) {
                        if (errorList[x].type === 'longTermHour' && errorList[x].frame === item.stampFrameNo) {
                            errorList[x].start = true;
                        }
                    }
                } else {
                    for (let x = 0; x < errorList.length; x++) {
                        if (errorList[x].type === 'longTermHour' && errorList[x].frame === item.stampFrameNo) {
                            errorList[x].end = true;
                        }
                    }
                }
            }
        });

        self.errorList.forEach((item) => {
            if (item.type === 'workHour') {
                for (let x = 0; x < this.workHourLst.length; x++) {
                    if (item.frame === this.workHourLst[x].frame) {
                        this.workHourLst[x].errorMsg = null;
                        if (item.start && item.end && item.frame === 1) {
                            this.workHourLst[x].errorMsg = this.$i18n('KAFS02_22', ' ');
                        }
                        if (!item.start && item.end) {
                            this.workHourLst[x].errorMsg = this.$i18n('KAFS02_22', 'Com_WorkOut');
                        }
                        if (item.start && !item.end) {
                            this.workHourLst[x].errorMsg = this.$i18n('KAFS02_22', 'Com_WorkIn');
                        }
                    }
                }
            }

            if (item.type === 'tempoHour') {
                for (let x = 0; x < this.tempWorkHourLst.length; x++) {
                    if (item.frame === this.tempWorkHourLst[x].frame) {
                        this.tempWorkHourLst[x].errorMsg = null;
                        if (!item.start && item.end) {
                            this.tempWorkHourLst[x].errorMsg = this.$i18n('KAFS02_22', 'Com_ExtraOut');
                        }
                        if (item.start && !item.end) {
                            this.tempWorkHourLst[x].errorMsg = this.$i18n('KAFS02_22', 'Com_ExtraIn');
                        }
                    }
                }
            }

            if (item.type === 'gooutHour') {
                for (let x = 0; x < this.goOutLst.length; x++) {
                    if (item.frame === this.goOutLst[x].frame) {
                        this.goOutLst[x].errorMsg = null;
                        if (!item.start && item.end) {
                            this.goOutLst[x].errorMsg = this.$i18n('KAFS02_22', 'Com_In');
                        }
                        if (item.start && !item.end) {
                            this.goOutLst[x].errorMsg = this.$i18n('KAFS02_22', 'Com_Out');
                        }
                    }
                }
            }

            if (item.type === 'breakHour') {
                for (let x = 0; x < this.breakLst.length; x++) {
                    if (item.frame === this.breakLst[x].frame) {
                        this.breakLst[x].errorMsg = null;
                        if (!item.start && item.end) {
                            this.breakLst[x].errorMsg = this.$i18n('KAFS02_22', 'KAFS02_24');
                        }
                        if (item.start && !item.end) {
                            this.breakLst[x].errorMsg = this.$i18n('KAFS02_22', 'KAFS02_23');
                        }
                    }
                }
            }

            if (item.type === 'childCareHour') {
                for (let x = 0; x < this.childCareLst.length; x++) {
                    if (item.frame === this.childCareLst[x].frame) {
                        this.childCareLst[x].errorMsg = null;
                        if (!item.start && item.end) {
                            this.childCareLst[x].errorMsg = this.$i18n('KAFS02_22', 'KAFS02_26');
                        }
                        if (item.start && !item.end) {
                            this.childCareLst[x].errorMsg = this.$i18n('KAFS02_22', 'KAFS02_25');
                        }
                    }
                }
            }

            if (item.type === 'longTermHour') {
                for (let x = 0; x < this.longTermLst.length; x++) {
                    if (item.frame === this.longTermLst[x].frame) {
                        this.longTermLst[x].errorMsg = null;
                        if (!item.start && item.end) {
                            this.longTermLst[x].errorMsg = this.$i18n('KAFS02_22', 'KAFS02_28');
                        }
                        if (item.start && !item.end) {
                            this.longTermLst[x].errorMsg = this.$i18n('KAFS02_22', 'KAFS02_27');
                        }
                    }
                }
            }
        });
    }

    public createParamA(data: any) {
        const self = this;

        let appDispInfoWithDateOutput = data.appDispInfoStartupOutput.appDispInfoWithDateOutput;
        let appDispInfoNoDateOutput = data.appDispInfoStartupOutput.appDispInfoNoDateOutput;
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

    public createParamB(data: any) {
        const self = this;

        self.kaf000_B_Params = null;
        let paramb = {
            mode: self.mode ? 0 : 1,
            appDisplaySetting: data.appDispInfoStartupOutput.appDispInfoNoDateOutput.applicationSetting.appDisplaySetting,
            newModeContent: {
                // 申請表示情報．申請表示情報(基準日関係なし)．申請設定．申請表示設定																	
                appTypeSetting: data.appDispInfoStartupOutput.appDispInfoNoDateOutput.applicationSetting.appTypeSetting,
                useMultiDaySwitch: false,
                initSelectMultiDay: false
            },
            detailModeContent: null
        };
        if (!self.mode) {
            paramb.detailModeContent = {
                prePostAtr: data.appDispInfoStartupOutput.appDetailScreenInfo.application.prePostAtr,
                startDate: data.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppStartDate,
                endDate: data.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppEndDate,
                employeeName: _.isEmpty(data.appDispInfoStartupOutput.appDispInfoNoDateOutput.employeeInfoLst) ? 'empty' : data.appDispInfoStartupOutput.appDispInfoNoDateOutput.employeeInfoLst[0].bussinessName
            };
        }
        self.kaf000_B_Params = paramb;
    }

    public createParamC(data: any) {
        const self = this;
        // KAFS00_C_起動情報
        let appDispInfoNoDateOutput = data.appDispInfoStartupOutput.appDispInfoNoDateOutput;
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
            opAppStandardReasonCD: self.mode ? null : data.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppStandardReasonCD,
            // 申請理由
            opAppReason: self.mode ? null : data.appDispInfoStartupOutput.appDetailScreenInfo.application.opAppReason
        };
    }

    public changeDate(dates: any) {
        const self = this;
        self.$mask('show');
        let command = {
            companyId: self.user.companyId,
            appStampOutputDto: self.appStampOutputDto,
            date: dates,
            recorderFlag: false,
        };
        self.$http.post('at', API.changeDate, command)
            .then((res: any) => {
                self.appDispInfoStartupOutput = res.data.appDispInfoStartupOutput;
                let opActualContentDisplayLst = self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst;
                if (!_.isEmpty(opActualContentDisplayLst)) {
                    this.bindActualAchive(opActualContentDisplayLst);
                }

                self.errorList.map((item) => {
                    item.start = false;
                    item.end = false;
                });
                self.fetchErrorLst(res.data.errorListOptional);
                self.appStampOutputDto = res.data;
                self.data = res.data;
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
            }).catch((res: any) => {
                self.handleErrorMessage(res).then((msgId: any) => {
                    if (res.messageId == 'Msg_426') {
                        self.$goto('ccg008a');
                    }
                });
                self.$mask('hide');
            });
    }

    public bindActualAchive(actualContentDisplayLst: any) {
        const self = this;
        if (actualContentDisplayLst[0].opAchievementDetail) {
            let stampRecord = actualContentDisplayLst[0].opAchievementDetail.stampRecordOutput;

            let actualWorkingTime: any[] = stampRecord.workingTime;
            let actualTempoTime: any[] = stampRecord.extraordinaryTime;
            let actualOutingTime: any[] = stampRecord.outingTime;
            let actualBreakTime: any[] = stampRecord.breakTime;
            let actualNursingTime: any[] = stampRecord.nursingTime;
            let actualParentingTime: any[] = stampRecord.parentingTime;

            self.actualWorkingTime = actualWorkingTime;
            self.actualTempoTime = actualTempoTime;
            self.actualOutingTime = actualOutingTime;
            self.actualBreakTime = actualBreakTime;
            self.actualNursingTime = actualNursingTime;
            self.actualParentingTime = actualParentingTime;

            // working hour
            if (!_.isEmpty(actualWorkingTime)) {
                actualWorkingTime.forEach((item) => {
                    for (let i = 0; i < this.workHourLst.length; i++) {
                        if (item.frameNo === this.workHourLst[i].frame) {
                            this.workHourLst[i].actualHours.applicationAchievementAtr = 1;
                            this.workHourLst[i].actualHours.startTime = item.opStartTime;
                            this.workHourLst[i].actualHours.endTime = item.opEndTime;
                        }
                    }
                });
            }

            // tempo hour
            if (!_.isEmpty(actualTempoTime)) {
                actualTempoTime.forEach((item) => {
                    for (let i = 0; i < this.tempWorkHourLst.length; i++) {
                        if (item.frameNo === this.tempWorkHourLst[i].frame) {
                            this.tempWorkHourLst[i].actualHours.applicationAchievementAtr = 1;
                            this.tempWorkHourLst[i].actualHours.startTime = item.opStartTime;
                            this.tempWorkHourLst[i].actualHours.endTime = item.opEndTime;
                        }
                    }
                });
            }

            // go out time
            if (!_.isEmpty(actualOutingTime)) {
                actualOutingTime.forEach((item) => {
                    for (let i = 0; i < this.goOutLst.length; i++) {
                        if (item.frameNo === this.goOutLst[i].frame) {
                            this.goOutLst[i].actualHours.applicationAchievementAtr = 1;
                            this.goOutLst[i].actualHours.startTime = item.opStartTime;
                            this.goOutLst[i].actualHours.endTime = item.opEndTime;
                        }
                    }
                });
            }

            // break time
            if (!_.isEmpty(actualBreakTime)) {
                actualBreakTime.forEach((item) => {
                    for (let i = 0; i < this.breakLst.length; i++) {
                        if (item.frameNo === this.breakLst[i].frame) {
                            this.breakLst[i].actualHours.applicationAchievementAtr = 1;
                            this.breakLst[i].actualHours.startTime = item.opStartTime;
                            this.breakLst[i].actualHours.endTime = item.opEndTime;
                        }
                    }
                });
            }

            // parenting time
            if (!_.isEmpty(actualParentingTime)) {
                actualParentingTime.forEach((item) => {
                    for (let i = 0; i < this.childCareLst.length; i++) {
                        if (item.frameNo === this.childCareLst[i].frame) {
                            this.childCareLst[i].actualHours.applicationAchievementAtr = 1;
                            this.childCareLst[i].actualHours.startTime = item.opStartTime;
                            this.childCareLst[i].actualHours.endTime = item.opEndTime;
                        }
                    }
                });
            }

            // long term time
            if (!_.isEmpty(actualNursingTime)) {
                actualNursingTime.forEach((item) => {
                    for (let i = 0; i < this.longTermLst.length; i++) {
                        if (item.frameNo === this.longTermLst[i].frame) {
                            this.longTermLst[i].actualHours.applicationAchievementAtr = 1;
                            this.longTermLst[i].actualHours.startTime = item.opStartTime;
                            this.longTermLst[i].actualHours.endTime = item.opEndTime;
                        }
                    }
                });
            }
        }
    }

    public handleErrorMessage(res: any) {
        const self = this;
        if (res.messageId == 'Msg_197') {
            self.$modal.error({ messageId: 'Msg_197', messageParams: [] }).then(() => {
                let appID = self.data.appDispInfoStartupOutput.appDetailScreenInfo.application.appID;
                self.$modal('cmms45c', { 'listAppMeta': [appID], 'currentApp': appID }).then((newData) => {
                    self.mode = false;
                    self.data = newData;
                    self.application = self.data.appDispInfoStartupOutput.appDetailScreenInfo.application;
                    self.fetchDataEdit();
                });
            });

            return;
        }	
        if (res.messageId) {
            return self.$modal.error({ messageId: res.messageId, messageParams: res.parameterIds });
        } else {
            if (res.errors) {
                if (_.isArray(res.errors)) {
                    return self.$modal.error({ messageId: res.errors[0].messageId, messageParams: res.parameterIds });
                } else {
                    return self.$modal.error({ messageId: res.errors.messageId, messageParams: res.parameterIds });
                }
            }
        }
    }

    public handleConfirmMessage(messages: any) {
        const self = this;

        return new Promise((resolve: any) => {
            if (_.isEmpty(messages)) {
                resolve(true);
            }
            let msg = messages[0].value;

            return self.$modal.confirm({ messageId: msg.messageId })
                .then((value) => {
                    if (value === 'yes') {
                        return self.handleConfirmMessage(messages.data);
                    } else {
                        resolve(false);
                    }
                });
        });
    }

    public addGooutHour() {
        const self = this;

        let currentFrame = self.goOutLst.length;
        let start: any = null;
        let end: any = null;

        for (let i = 0; i < self.actualOutingTime.length; i++) {
            if (self.actualOutingTime[i].frameNo === (currentFrame + 1)) {
                start = self.actualOutingTime[i].opStartTime;
                end = self.actualOutingTime[i].opEndTime;
                break;
            }
        }

        let errors = _.filter(self.errorList, {'type': 'gooutHour', 'frame': (currentFrame + 1)});
        let errorMsg = null;

        if (errors.length > 0) {
            if (!errors[0].start && errors[0].end) {
                errorMsg = this.$i18n('KAFS02_22', 'Com_In');
            }
            if (errors[0].start && !errors[0].end) {
                errorMsg = this.$i18n('KAFS02_22', 'Com_Out');
            }
        }

        if (currentFrame < 10) {
            let goOutHour = new GoBackHour({ startTime: null, endTime: null, frame: (currentFrame + 1), swtModel: self.dataSource[0].id, title: 'KAFS02_9', dispCheckbox: true, disableCheckbox: false, isCheck: false, errorMsg: (errorMsg), actualStart: start, actualEnd: end });

            self.goOutLst.push(goOutHour);
        }
    }

    public addBreakHour() {
        const self = this;

        let currentFrame = self.breakLst.length;
        let actualStart: any = null;
        let actualEnd: any = null;

        for (let i = 0; i < self.actualBreakTime.length; i++) {
            if (self.actualBreakTime[i].frameNo === (currentFrame + 1)) {
                actualStart = self.actualBreakTime[i].opStartTime;
                actualEnd = self.actualBreakTime[i].opEndTime;
                break;
            }
        }

        let errors = _.filter(self.errorList, {'type': 'breakHour', 'frame': (currentFrame + 1)});
        let errorMsg = null;

        if (errors.length > 0) {
            if (!errors[0].start && errors[0].end) {
                errorMsg = this.$i18n('KAFS02_22', 'KAFS02_24');
            }
            if (errors[0].start && !errors[0].end) {
                errorMsg = this.$i18n('KAFS02_22', 'KAFS02_23');
            }
        }

        if (currentFrame < 10) {
            let actualBreakTime = new WorkHour({ startTime: null, endTime: null, frame: (currentFrame + 1), title: 'KAFS02_12', dispCheckbox: true, disableCheckbox: false, isCheck: false, errorMsg: (errorMsg), actualStart: (actualStart), actualEnd: (actualEnd) });

            self.breakLst.push(actualBreakTime);
        }
    }

    public getValidAllValue() {
        const vm = this;
        let validAll: boolean = true;
        for (let child of vm.$children) {
            if (!child.$valid) {
                validAll = false;
            }
        }
        
        return validAll;
    }

    public register() {
        const self = this;
        let validAll: boolean = true;

        self.$mask('show');
        for (let child of self.$children) {
            child.$validate();
            if (!child.$valid) {
                validAll = false;
            }
        }
        self.isValidateAll = validAll;
        self.$validate();
        if (!self.$valid || !validAll) {
            window.scrollTo(500, 0);
            self.$nextTick(() => {
                self.$mask('hide');
            });

            return;
        }

        self.bindDataApplication();
        self.bindDataAppStamp();

        return self.checkBeforeRegister()
            .then((result) => {
                if (result) {
                    return self.handleConfirmMessage(result.data);
                }
            })
            .then((result) => {
                if (result) {
                    console.log(result);

                    return self.registerData();
                }
            })
            .then((result) => {
                if (result) {
                    console.log(result);
                    self.$http.post('at', API.reflectApp, result.data.reflectAppIdLst);
                    self.$mask('hide');
                    self.$goto('kafs02a1', { mode: self.mode ? ScreenMode.NEW : ScreenMode.DETAIL, appID: result.data.appIDLst[0], modeS02: 0 });
                }
            }).catch((err) => {
                if (err) {
                    console.log(err);
                    self.handleErrorMessage(err);
                    self.$mask('hide');
                }
            });
    }

    public checkBeforeRegister(): any {
        const self = this;
        let command = {
            companyId: self.user.companyId,
            agentAtr: false,
            applicationDto: self.application,
            appStampOutputDto: self.appStampOutputDto
        };

        if (self.mode) {
            return self.$http.post('at', API.checkBeforeRegister, command);
        } else {
            return self.$http.post('at', API.checkBeforeUpdate, command);
        }
    }

    private registerData(): any {
        const self = this;

        let command = {
            applicationDto: self.application,
            appStampDto: self.appStampOutputDto.appStampOptional,
            appRecordImageDto: null,
            appStampOutputDto: self.appStampOutputDto,
            recoderFlag: false
        };

        if (self.mode) {
            return self.$http.post('at', API.register, command);
        } else {
            return self.$http.post('at', API.update, command);
        }
    }

    private bindDataAppStamp() {
        const self = this;

        let prePostAtr = self.application.prePostAtr;
        let listTimeStampApp: Array<TimeStampAppDto> = [],
            listDestinationTimeApp: Array<DestinationTimeAppDto> = [],
            listTimeStampAppOther: Array<TimeStampAppOtherDto> = [],
            listDestinationTimeZoneApp: Array<DestinationTimeZoneAppDto> = [];

        if (prePostAtr === 0) {
            // work hour
            self.workHourLst.forEach((item) => {
                if (item.workHours.start) {
                    let destinationApp = new DestinationTimeAppDto(0, item.frame, 0);
                    let hour = new TimeStampAppDto(destinationApp, item.workHours.start, null);

                    listTimeStampApp.push(hour);
                }
                if (item.workHours.end) {
                    let destinationApp = new DestinationTimeAppDto(0, item.frame, 1);
                    let hour = new TimeStampAppDto(destinationApp, item.workHours.end, null);

                    listTimeStampApp.push(hour);
                }
            });

            // tempo hour
            self.tempWorkHourLst.forEach((item) => {
                if (item.workHours.start) {
                    let destinationApp = new DestinationTimeAppDto(1, item.frame, 0);
                    let hour = new TimeStampAppDto(destinationApp, item.workHours.start, null);

                    listTimeStampApp.push(hour);
                }
                if (item.workHours.end) {
                    let destinationApp = new DestinationTimeAppDto(1, item.frame, 1);
                    let hour = new TimeStampAppDto(destinationApp, item.workHours.end, null);

                    listTimeStampApp.push(hour);
                }
            });

            // goout hour
            self.goOutLst.forEach((item) => {
                if (item.hours.start) {
                    let destinationApp = new DestinationTimeAppDto(2, item.frame, 0);
                    let hour = new TimeStampAppDto(destinationApp, item.hours.start, null, item.swtModel);

                    listTimeStampApp.push(hour);
                }
                if (item.hours.end) {
                    let destinationApp = new DestinationTimeAppDto(2, item.frame, 1);
                    let hour = new TimeStampAppDto(destinationApp, item.hours.end, null, item.swtModel);

                    listTimeStampApp.push(hour);
                }
            });

            // break hour
            self.breakLst.forEach((item) => {
                if (item.workHours.start && item.workHours.end) {
                    let destinationApp = new DestinationTimeZoneAppDto(2, item.frame);
                    let timeZone = new TimeZone(item.workHours.start, item.workHours.end);
                    let hour = new TimeStampAppOtherDto(destinationApp, timeZone);

                    listTimeStampAppOther.push(hour);
                } else {
                    if (item.workHours.start || item.workHours.end) {
                        let destinationApp = new DestinationTimeZoneAppDto(2, item.frame);
                        let timeZone = new TimeZone(item.workHours.start, item.workHours.end);
                        let hour = new TimeStampAppOtherDto(destinationApp, timeZone);
    
                        listTimeStampAppOther.push(hour);
                    }
                    
                }
            });

            // child care hour
            self.childCareLst.forEach((item) => {
                if (item.workHours.start && item.workHours.end) {
                    let destinationApp = new DestinationTimeZoneAppDto(0, item.frame);
                    let timeZone = new TimeZone(item.workHours.start, item.workHours.end);
                    let hour = new TimeStampAppOtherDto(destinationApp, timeZone);

                    listTimeStampAppOther.push(hour);
                } else {
                    if (item.workHours.start || item.workHours.end) {
                        let destinationApp = new DestinationTimeZoneAppDto(0, item.frame);
                        let timeZone = new TimeZone(item.workHours.start, item.workHours.end);
                        let hour = new TimeStampAppOtherDto(destinationApp, timeZone);
    
                        listTimeStampAppOther.push(hour);
                    }
                }
            });

            // long term hour
            self.longTermLst.forEach((item) => {
                if (item.workHours.start && item.workHours.end) {
                    let destinationApp = new DestinationTimeZoneAppDto(1, item.frame);
                    let timeZone = new TimeZone(item.workHours.start, item.workHours.end);
                    let hour = new TimeStampAppOtherDto(destinationApp, timeZone);

                    listTimeStampAppOther.push(hour);
                } else {
                    if (item.workHours.start || item.workHours.end) {
                        let destinationApp = new DestinationTimeZoneAppDto(1, item.frame);
                        let timeZone = new TimeZone(item.workHours.start, item.workHours.end);
                        let hour = new TimeStampAppOtherDto(destinationApp, timeZone);
    
                        listTimeStampAppOther.push(hour);
                    }
                }
            });
        } else {
            // work hour
            self.workHourLst.forEach((item) => {
                if (item.dispCheckbox && self.condition2 && (item.actualHours.startTime != null || item.actualHours.endTime != null) && self.checkboxWH.filter((x) => x === item.frame).length > 0) {
                    if (item.actualHours.startTime) {
                        let destinationApp = new DestinationTimeAppDto(0, item.frame, 0);

                        listDestinationTimeApp.push(destinationApp);
                    }
                    if (item.actualHours.endTime) {
                        let destinationApp = new DestinationTimeAppDto(0, item.frame, 1);

                        listDestinationTimeApp.push(destinationApp);
                    }
                } else {
                    if (item.workHours.start) {
                        let destinationApp = new DestinationTimeAppDto(0, item.frame, 0);
                        let hour = new TimeStampAppDto(destinationApp, item.workHours.start, null);

                        listTimeStampApp.push(hour);
                    }
                    if (item.workHours.end) {
                        let destinationApp = new DestinationTimeAppDto(0, item.frame, 1);
                        let hour = new TimeStampAppDto(destinationApp, item.workHours.end, null);

                        listTimeStampApp.push(hour);
                    }
                }
            });

            // tempo hour
            self.tempWorkHourLst.forEach((item) => {
                if (item.dispCheckbox && self.condition2 && (item.actualHours.startTime != null || item.actualHours.endTime != null) && self.checkboxTH.filter((x) => x === item.frame).length > 0) {
                    if (item.actualHours.startTime) {
                        let destinationApp = new DestinationTimeAppDto(1, item.frame, 0);

                        listDestinationTimeApp.push(destinationApp);
                    }
                    if (item.actualHours.endTime) {
                        let destinationApp = new DestinationTimeAppDto(1, item.frame, 1);

                        listDestinationTimeApp.push(destinationApp);
                    }
                } else {
                    if (item.workHours.start) {
                        let destinationApp = new DestinationTimeAppDto(1, item.frame, 0);
                        let hour = new TimeStampAppDto(destinationApp, item.workHours.start, null);

                        listTimeStampApp.push(hour);
                    }
                    if (item.workHours.end) {
                        let destinationApp = new DestinationTimeAppDto(1, item.frame, 1);
                        let hour = new TimeStampAppDto(destinationApp, item.workHours.end, null);

                        listTimeStampApp.push(hour);
                    }
                }
            });

            // goout hour
            self.goOutLst.forEach((item) => {
                if (item.dispCheckbox && self.condition2 && (item.actualHours.startTime != null || item.actualHours.endTime != null) && self.checkboxGH.filter((x) => x === item.frame).length > 0) {
                    if (item.actualHours.startTime) {
                        let destinationApp = new DestinationTimeAppDto(2, item.frame, 0);

                        listDestinationTimeApp.push(destinationApp);
                    }
                    if (item.actualHours.endTime) {
                        let destinationApp = new DestinationTimeAppDto(2, item.frame, 1);

                        listDestinationTimeApp.push(destinationApp);
                    }
                } else {
                    if (item.hours.start) {
                        let destinationApp = new DestinationTimeAppDto(2, item.frame, 0);
                        let hour = new TimeStampAppDto(destinationApp, item.hours.start, null, item.swtModel);

                        listTimeStampApp.push(hour);
                    }
                    if (item.hours.end) {
                        let destinationApp = new DestinationTimeAppDto(2, item.frame, 1);
                        let hour = new TimeStampAppDto(destinationApp, item.hours.end, null, item.swtModel);

                        listTimeStampApp.push(hour);
                    }
                }
            });

            // break hour
            self.breakLst.forEach((item) => {
                if (item.dispCheckbox && self.condition2 && (item.actualHours.startTime != null || item.actualHours.endTime != null) && self.checkboxBH.filter((x) => x === item.frame).length > 0) {
                    let destinationApp = new DestinationTimeZoneAppDto(2, item.frame);

                    listDestinationTimeZoneApp.push(destinationApp);
                } else {
                    if (item.workHours.start && item.workHours.end) {
                        let destinationApp = new DestinationTimeZoneAppDto(2, item.frame);
                        let timeZone = new TimeZone(item.workHours.start, item.workHours.end);
                        let hour = new TimeStampAppOtherDto(destinationApp, timeZone);

                        listTimeStampAppOther.push(hour);
                    } else {
                        if (item.workHours.start || item.workHours.end) {
                            let destinationApp = new DestinationTimeZoneAppDto(2, item.frame);
                            let timeZone = new TimeZone(item.workHours.start, item.workHours.end);
                            let hour = new TimeStampAppOtherDto(destinationApp, timeZone);
    
                            listTimeStampAppOther.push(hour);
                        }
                    }
                }
            });

            // child care hour
            self.childCareLst.forEach((item) => {
                if (item.dispCheckbox && self.condition2 && (item.actualHours.startTime != null || item.actualHours.endTime != null) && self.checkboxCH.filter((x) => x === item.frame).length > 0) {
                    let destinationApp = new DestinationTimeZoneAppDto(0, item.frame);

                    listDestinationTimeZoneApp.push(destinationApp);
                } else {
                    if (item.workHours.start && item.workHours.end) {
                        let destinationApp = new DestinationTimeZoneAppDto(0, item.frame);
                        let timeZone = new TimeZone(item.workHours.start, item.workHours.end);
                        let hour = new TimeStampAppOtherDto(destinationApp, timeZone);

                        listTimeStampAppOther.push(hour);
                    } else {
                        if (item.workHours.start || item.workHours.end) {
                            let destinationApp = new DestinationTimeZoneAppDto(0, item.frame);
                            let timeZone = new TimeZone(item.workHours.start, item.workHours.end);
                            let hour = new TimeStampAppOtherDto(destinationApp, timeZone);
    
                            listTimeStampAppOther.push(hour);
                        }
                    }
                }
            });

            // long term hour
            self.longTermLst.forEach((item) => {
                if (item.dispCheckbox && self.condition2 && (item.actualHours.startTime != null || item.actualHours.endTime != null) && self.checkboxLH.filter((x) => x === item.frame).length > 0) {
                    let destinationApp = new DestinationTimeZoneAppDto(1, item.frame);

                    listDestinationTimeZoneApp.push(destinationApp);
                } else {
                    if (item.workHours.start && item.workHours.end) {
                        let destinationApp = new DestinationTimeZoneAppDto(1, item.frame);
                        let timeZone = new TimeZone(item.workHours.start, item.workHours.end);
                        let hour = new TimeStampAppOtherDto(destinationApp, timeZone);

                        listTimeStampAppOther.push(hour);
                    } else {
                        if (item.workHours.start || item.workHours.end) {
                            let destinationApp = new DestinationTimeZoneAppDto(1, item.frame);
                            let timeZone = new TimeZone(item.workHours.start, item.workHours.end);
                            let hour = new TimeStampAppOtherDto(destinationApp, timeZone);
    
                            listTimeStampAppOther.push(hour);
                        }
                    }
                }
            });
        }

        self.appStampOutputDto.appStampOptional = {
            listTimeStampApp: (listTimeStampApp),
            listDestinationTimeApp: (listDestinationTimeApp),
            listTimeStampAppOther: (listTimeStampAppOther),
            listDestinationTimeZoneApp: (listDestinationTimeZoneApp)
        };
    }

    private bindDataApplication() {
        const self = this;

        // if (!self.mode) {
        //     self.application = self.data.appDispInfoStartupOutput.appDetailScreenInfo.application;
        // }
        if (self.mode) {
            self.application.employeeID = self.user.employeeId;
        }

        self.application.enteredPerson = self.user.employeeId;
    }

    // ※5
    get condition5() {
        const self = this;

        if (self.appStampReflectOptional && self.appStampReflectOptional.attendence === 1) {
            return true;
        }

        return false;
    }

    // ※2
    get condition2() {
        const self = this;

        if (self.application.prePostAtr === 0) {
            return false;
        }

        return true;
    }

    // ※10
    get condition10() {
        const self = this;

        if (self.useCancelFunction) {
            return true;
        }

        return false;
    }

    // ※4
    get condition4() {
        const self = this;

        if (self.useTemporary && self.appStampReflectOptional && self.appStampReflectOptional.temporaryAttendence === 1) {
            return true;
        }

        return false;
    }

    // ※1
    public condition1(item: WorkHour) {
        const self = this;

        if (item.frame === 2) {
            if (self.multipleWork) {
                return true;
            }

            return false;
        }

        return true;
    }

    // ※6
    get condition6() {
        const self = this;

        if (self.appStampReflectOptional && self.appStampReflectOptional.outingHourse === 1) {
            return true;
        }

        return false;
    }

    // ※7
    get condition7() {
        const self = this;

        if (self.appStampReflectOptional && self.appStampReflectOptional.breakTime === 1) {
            return true;
        }

        return false;
    }

    // ※8
    get condition8() {
        const self = this;

        if (self.appStampReflectOptional && self.appStampReflectOptional.parentHours === 1) {
            return true;
        }

        return false;
    }

    // ※9
    get condition9() {
        const self = this;

        if (self.appStampReflectOptional && self.appStampReflectOptional.nurseTime === 1) {
            return true;
        }

        return false;
    }

    get dispAddFrameOut() {
        const self = this;

        if (self.mode) {
            if (self.goOutLst.length < 10) {
                return true;
            }
        } else {
            if (self.condition6) {
                return true;
            }
        }

        return false;
    }

    get dispAddFrameBreak() {
        const self = this;

        if (self.mode) {
            if (self.breakLst.length < 10) {
                return true;
            }
        } else {
            if (self.condition7) {
                return true;
            }
        }

        return false;
    }

    get dispWorkTemp() {
        const self = this;

        if (self.mode) {
            if (self.condition5 || self.condition4) {
                return true;
            }
        } else {
            if (self.workHourLst.length > 0 || self.tempWorkHourLst.length > 0) {
                return true;
            }
            if (self.condition5 || self.condition4) {
                return true;
            }
        }

        return false;
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

    public kafs00BValid(kafs00BValid) {
        const self = this;
        self.isValidateAll = self.getValidAllValue();
    }

    public kafs00CValid(kafs00CValid) {
        const self = this;
        self.isValidateAll = self.getValidAllValue();
    }
}

const API = {
    startStampApp: 'at/request/application/stamp/startStampApp',
    changeDate: 'at/request/application/stamp/changeAppDateMobile',
    checkBeforeRegister: 'at/request/application/stamp/checkBeforeRegister',
    checkBeforeUpdate: 'at/request/application/stamp/checkBeforeUpdate',
    register: 'at/request/application/stamp/register',
    update: 'at/request/application/stamp/updateNew',
    reflectApp: 'at/request/application/reflect-app'
};