import { _, Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { TimeSetDisp, TimeZone, TimeStampAppOtherDto, DestinationTimeZoneAppDto, DestinationTimeAppDto, TimeStampAppDto } from 'views/kaf/s02/shr';
import {
    KafS00SubP3Component
} from 'views/kaf/s00/sub/p3';

@component({
    name: 'cmms45shrcomponentsapp70',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: [],
    components: {
        'kafs00subp3': KafS00SubP3Component,
    },
})
export class CmmS45ShrComponentsApp70Component extends Vue {
    public title: string = 'CmmS45ShrComponentsApp70';

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

    public dataFetch: any;
    public multipleWork: boolean = true;
    public isCondition1: boolean = false;
    public isCondition2: boolean = false;

    public listTimeStampApp: Array<TimeStampAppDto> = [];
    public listDestinationTimeApp: Array<DestinationTimeAppDto> = [];
    public listTimeStampAppOther: Array<TimeStampAppOtherDto> = [];
    public listDestinationTimeZoneApp: Array<DestinationTimeZoneAppDto> = [];

    public listWorkHours: TimeSetDisp[] = [];
    public listTempoHours: TimeSetDisp[] = [];
    public listOutingHours: TimeSetDisp[] = [];
    public listBreakHours: TimeSetDisp[] = [];
    public listNursingHours: TimeSetDisp[] = [];
    public listParentHours: TimeSetDisp[] = [];

    public listDestWorkHour: Number[] = [];
    public listDestTempoHour: Number[] = [];
    public listDestOutingHour: Number[] = [];
    public listDestBreakHour: Number[] = [];
    public listDestNursingHour: Number[] = [];
    public listDestParentHour: Number[] = [];

    public dispTitleWorkHour: boolean = false;
    public dispTitleOutingHour: boolean = false;
    public dispTitleBreakHour: boolean = false;
    public dispTitleParentHour: boolean = false;
    public dispTitleNursingHour: boolean = false;

    public appStamp: AppStamp = new AppStamp();
    public $app() {
        return this.appStamp;
    }

    public user: any;
    public created() {
        const vm = this;
        vm.params.appDetail = {};
        vm.$auth.user.then((usr: any) => {
            vm.user = usr;
        }).then((res: any) => {
            this.fetchData(vm.params);
        });

        vm.$watch('params.appDispInfoStartupOutput', (newV, oldV) => {
            vm.resetData();
            vm.fetchData(vm.params);
        });
    }

    public mounted() {

    }

    private resetData() {
        const self = this;

        self.listWorkHours = [];
        self.listTempoHours = [];
        self.listOutingHours = [];
        self.listBreakHours = [];
        self.listNursingHours = [];
        self.listParentHours = [];

        self.listDestWorkHour = [];
        self.listDestTempoHour = [];
        self.listDestOutingHour = [];
        self.listDestBreakHour = [];
        self.listDestNursingHour = [];
        self.listDestParentHour = [];
    }

    private fetchData(params: any) {
        const self = this;

        self.$http.post('at', API.detailAppStamp, {
            companyId: self.user.companyId,
            appId: self.params.appDispInfoStartupOutput.appDetailScreenInfo.application.appID,
            appDispInfoStartupDto: self.params.appDispInfoStartupOutput,
            recoderFlag: false
        })
            .then((result: any) => {
                if (result) {
                    console.log(result);
                    self.dataFetch = result.data;
                    self.multipleWork = self.dataFetch.appDispInfoStartupOutput.appDispInfoNoDateOutput.managementMultipleWorkCycles;
                    self.bindData();
                    self.params.appDetail = self.dataFetch;
                }
                self.$parent.$emit('loading-complete');
            })
            .catch((result: any) => {
                self.$parent.$emit('loading-complete');
                if (result.messageId) {
                    self.$modal.error({ messageId: result.messageId, messageParams: result.parameterIds });
                } else {
                    if (result.errors) {
                        if (_.isArray(result.errors)) {
                            self.$modal.error({ messageId: result.errors[0].messageId, messageParams: result.parameterIds });
                        } else {
                            self.$modal.error({ messageId: result.errors.messageId, messageParams: result.parameterIds });
                        }
                    }
                }
            });
    }

    private bindData() {
        const self = this;

        self.listTimeStampApp = self.dataFetch.appStampOptional.listTimeStampApp;
        self.listDestinationTimeApp = self.dataFetch.appStampOptional.listDestinationTimeApp;
        self.listTimeStampAppOther = self.dataFetch.appStampOptional.listTimeStampAppOther;
        self.listDestinationTimeZoneApp = self.dataFetch.appStampOptional.listDestinationTimeZoneApp;

        /*
        *
        *    Bind data application
        *
        */
        if (!_.isEmpty(self.listTimeStampApp)) {
            self.listTimeStampApp.forEach((item) => {
                // loop for work hour (type = 0)
                if (item.destinationTimeApp.timeStampAppEnum === 0) {
                    // neu trong list workHours da co item co cung frame -> thay doi start hoac end time
                    if (_.filter(self.listWorkHours, { frame: item.destinationTimeApp.engraveFrameNo }).length > 0) {
                        self.listWorkHours = _.map(self.listWorkHours, (x: TimeSetDisp) => {
                            if (x.frame === item.destinationTimeApp.engraveFrameNo) {
                                if (item.destinationTimeApp.startEndClassification === 0) {
                                    x.appHours.startTime = item.timeOfDay;
                                } else {
                                    x.appHours.endTime = item.timeOfDay;
                                }
                            }

                            return x;
                        });
                    } else {
                        // neu chua co item trong list workHours -> tao moi
                        let workHour: TimeSetDisp;
                        if (item.destinationTimeApp.startEndClassification === 0) {
                            workHour = new TimeSetDisp(item.destinationTimeApp.engraveFrameNo === 1 ? 'KAFS02_4' : 'KAFS02_6', item.destinationTimeApp.engraveFrameNo, null, null, item.timeOfDay, null, false);
                        } else {
                            workHour = new TimeSetDisp(item.destinationTimeApp.engraveFrameNo === 1 ? 'KAFS02_4' : 'KAFS02_6', item.destinationTimeApp.engraveFrameNo, null, null, null, item.timeOfDay, false);
                        }

                        self.listWorkHours.push(workHour);
                    }
                }

                // loop for tempo hour (type = 1)
                if (item.destinationTimeApp.timeStampAppEnum === 1) {
                    // neu trong list tempoHours da co item co cung frame -> thay doi start hoac end time
                    if (_.filter(self.listTempoHours, { frame: item.destinationTimeApp.engraveFrameNo }).length > 0) {
                        self.listTempoHours = _.map(self.listTempoHours, (x: TimeSetDisp) => {
                            if (x.frame === item.destinationTimeApp.engraveFrameNo) {
                                if (item.destinationTimeApp.startEndClassification === 0) {
                                    x.appHours.startTime = item.timeOfDay;
                                } else {
                                    x.appHours.endTime = item.timeOfDay;
                                }
                            }

                            return x;
                        });
                    } else {
                        // neu chua co item trong list tempoHours -> tao moi
                        let tempoHour: TimeSetDisp;
                        if (item.destinationTimeApp.startEndClassification === 0) {
                            tempoHour = new TimeSetDisp('KAFS02_7', item.destinationTimeApp.engraveFrameNo, null, null, item.timeOfDay, null, false);
                        } else {
                            tempoHour = new TimeSetDisp('KAFS02_7', item.destinationTimeApp.engraveFrameNo, null, null, null, item.timeOfDay, false);
                        }

                        self.listTempoHours.push(tempoHour);
                    }
                }

                // loop for goout hour (type = 2)
                if (item.destinationTimeApp.timeStampAppEnum === 2) {
                    // neu trong list gooutHours da co item co cung frame -> thay doi start hoac end time
                    if (_.filter(self.listOutingHours, { frame: item.destinationTimeApp.engraveFrameNo }).length > 0) {
                        self.listOutingHours = _.map(self.listOutingHours, (x: TimeSetDisp) => {
                            if (x.frame === item.destinationTimeApp.engraveFrameNo) {
                                if (item.destinationTimeApp.startEndClassification === 0) {
                                    x.appHours.startTime = item.timeOfDay;
                                    x.outingType = item.appStampGoOutAtr;
                                } else {
                                    x.appHours.endTime = item.timeOfDay;
                                    x.outingType = item.appStampGoOutAtr;
                                }
                            }

                            return x;
                        });
                    } else {
                        // neu chua co item trong list gooutHours -> tao moi
                        let outingHour: TimeSetDisp;
                        if (item.destinationTimeApp.startEndClassification === 0) {
                            outingHour = new TimeSetDisp('KAFS02_9', item.destinationTimeApp.engraveFrameNo, null, null, item.timeOfDay, null, false, item.appStampGoOutAtr);
                        } else {
                            outingHour = new TimeSetDisp('KAFS02_9', item.destinationTimeApp.engraveFrameNo, null, null, null, item.timeOfDay, false, item.appStampGoOutAtr);
                        }

                        self.listOutingHours.push(outingHour);
                    }
                }

            });
        }

        if (!_.isEmpty(self.listTimeStampAppOther)) {
            self.listTimeStampAppOther.forEach((item) => {
                // loop for break hour (type = 2)
                if (item.destinationTimeZoneApp.timeZoneStampClassification === 2) {
                    if (_.filter(self.listBreakHours, { frame: item.destinationTimeZoneApp.engraveFrameNo }).length > 0) {
                        self.listBreakHours = _.map(self.listBreakHours, (x: TimeSetDisp) => {
                            if (x.frame === item.destinationTimeZoneApp.engraveFrameNo) {
                                x.appHours.startTime = item.timeZone.startTime;
                                x.appHours.endTime = item.timeZone.endTime;
                            }

                            return x;
                        });
                    } else {
                        // neu chua co item trong list gooutHours -> tao moi
                        let breakHour: TimeSetDisp;
                        breakHour = new TimeSetDisp('KAFS02_12', item.destinationTimeZoneApp.engraveFrameNo, null, null, item.timeZone.startTime, item.timeZone.endTime, false);

                        self.listBreakHours.push(breakHour);
                    }
                }

                // loop for parentHours (type = 0)
                if (item.destinationTimeZoneApp.timeZoneStampClassification === 0) {
                    if (_.filter(self.listParentHours, { frame: item.destinationTimeZoneApp.engraveFrameNo }).length > 0) {
                        self.listParentHours = _.map(self.listParentHours, (x: TimeSetDisp) => {
                            if (x.frame === item.destinationTimeZoneApp.engraveFrameNo) {
                                x.appHours.startTime = item.timeZone.startTime;
                                x.appHours.endTime = item.timeZone.endTime;
                            }

                            return x;
                        });
                    } else {
                        // neu chua co item trong list parentHours -> tao moi
                        let parentHour: TimeSetDisp;
                        parentHour = new TimeSetDisp('KAFS02_13', item.destinationTimeZoneApp.engraveFrameNo, null, null, item.timeZone.startTime, item.timeZone.endTime, false);

                        self.listParentHours.push(parentHour);
                    }
                }

                // loop for long term hour (type = 1)
                if (item.destinationTimeZoneApp.timeZoneStampClassification === 1) {
                    if (_.filter(self.listNursingHours, { frame: item.destinationTimeZoneApp.engraveFrameNo }).length > 0) {
                        self.listNursingHours = _.map(self.listNursingHours, (x: TimeSetDisp) => {
                            if (x.frame === item.destinationTimeZoneApp.engraveFrameNo) {
                                x.appHours.startTime = item.timeZone.startTime;
                                x.appHours.endTime = item.timeZone.endTime;
                            }

                            return x;
                        });
                    } else {
                        // neu chua co item trong list  -> tao moi
                        let nursingHour: TimeSetDisp;
                        nursingHour = new TimeSetDisp('KAFS02_15', item.destinationTimeZoneApp.engraveFrameNo, null, null, item.timeZone.startTime, item.timeZone.endTime, false);

                        self.listNursingHours.push(nursingHour);
                    }
                }
            });
        }

        if (!_.isEmpty(self.listDestinationTimeApp)) {
            self.listDestinationTimeApp.forEach((item: DestinationTimeAppDto) => {
                // cancel workHour (type = 0)
                if (item.timeStampAppEnum === 0) {
                    self.listDestWorkHour.push(item.engraveFrameNo);
                    if (_.filter(self.listWorkHours, (x) => x.frame === item.engraveFrameNo).length > 0) {
                        self.listWorkHours = _.map(self.listWorkHours, (o: TimeSetDisp) => {
                            if (o.frame === item.engraveFrameNo) {
                                o.cancelAtr = true;
                            }

                            return o;
                        });
                    } else {
                        let workHour = new TimeSetDisp(item.engraveFrameNo === 1 ? 'KAFS02_4' : 'KAFS02_6', item.engraveFrameNo, null, null, null, null, true);
                        self.listWorkHours.push(workHour);
                    }
                }

                // cancel tempoHour (type = 1)
                if (item.timeStampAppEnum === 1) {
                    self.listDestTempoHour.push(item.engraveFrameNo);
                    if (_.filter(self.listTempoHours, (x) => x.frame === item.engraveFrameNo).length > 0) {
                        self.listTempoHours = _.map(self.listTempoHours, (o: TimeSetDisp) => {
                            if (o.frame === item.engraveFrameNo) {
                                o.cancelAtr = true;
                            }

                            return o;
                        });
                    } else {
                        let tempoHour = new TimeSetDisp('KAFS02_7', item.engraveFrameNo, null, null, null, null, true);
                        self.listTempoHours.push(tempoHour);
                    }
                }

                // cancel outingHour (type = 2)
                if (item.timeStampAppEnum === 2) {
                    self.listDestOutingHour.push(item.engraveFrameNo);
                    if (_.filter(self.listOutingHours, (x) => x.frame === item.engraveFrameNo).length > 0) {
                        self.listOutingHours = _.map(self.listOutingHours, (o: TimeSetDisp) => {
                            if (o.frame === item.engraveFrameNo) {
                                o.cancelAtr = true;
                            }

                            return o;
                        });
                    } else {
                        let outingHour = new TimeSetDisp('KAFS02_9', item.engraveFrameNo, null, null, null, null, true, null);
                        self.listOutingHours.push(outingHour);
                    }
                }
            });
        }

        if (!_.isEmpty(self.listDestinationTimeZoneApp)) {
            self.listDestinationTimeZoneApp.forEach((item: DestinationTimeZoneAppDto) => {
                // cancel breakHour (type = 2)
                if (item.timeZoneStampClassification === 2) {
                    self.listDestBreakHour.push(item.engraveFrameNo);
                    if (_.filter(self.listBreakHours, (x) => x.frame === item.engraveFrameNo).length > 0) {
                        self.listBreakHours = _.map(self.listBreakHours, (o: TimeSetDisp) => {
                            if (o.frame === item.engraveFrameNo) {
                                o.cancelAtr = true;
                            }

                            return o;
                        });
                    } else {
                        let breakHour = new TimeSetDisp('KAFS02_12', item.engraveFrameNo, null, null, null, null, true);
                        self.listBreakHours.push(breakHour);
                    }
                }

                // cancel parentHour (type = 0)
                if (item.timeZoneStampClassification === 0) {
                    self.listDestParentHour.push(item.engraveFrameNo);
                    if (_.filter(self.listParentHours, (x) => x.frame === item.engraveFrameNo).length > 0) {
                        self.listParentHours = _.map(self.listParentHours, (o: TimeSetDisp) => {
                            if (o.frame === item.engraveFrameNo) {
                                o.cancelAtr = true;
                            }

                            return o;
                        });
                    } else {
                        let parentHour = new TimeSetDisp('KAFS02_13', item.engraveFrameNo, null, null, null, null, true);
                        self.listParentHours.push(parentHour);
                    }
                }

                // cancel nursing (type = 1)
                if (item.timeZoneStampClassification === 1) {
                    self.listDestNursingHour.push(item.engraveFrameNo);
                    if (_.filter(self.listNursingHours, (x) => x.frame === item.engraveFrameNo).length > 0) {
                        self.listNursingHours = _.map(self.listNursingHours, (o: TimeSetDisp) => {
                            if (o.frame === item.engraveFrameNo) {
                                o.cancelAtr = true;
                            }

                            return o;
                        });
                    } else {
                        let nursingHour = new TimeSetDisp('KAFS02_15', item.engraveFrameNo, null, null, null, null, true);
                        self.listNursingHours.push(nursingHour);
                    }
                }
            });
        }

        /*
        *
        *    Bind data actual
        *
        */
        if (self.dataFetch.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst &&
            self.dataFetch.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst.length > 0 &&
            self.dataFetch.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0] &&
            self.dataFetch.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail &&
            self.dataFetch.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.stampRecordOutput) {
            let stampRecord = self.dataFetch.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.stampRecordOutput;

            // workHours
            stampRecord.workingTime.forEach((item: any) => {
                if (_.filter(self.listWorkHours, { frame: item.frameNo }).length > 0) {
                    self.listWorkHours = _.map(self.listWorkHours, (x: TimeSetDisp) => {
                        if (x.frame === item.frameNo) {
                            x.actualHours.startTime = item.opStartTime;
                            x.actualHours.endTime = item.opEndTime;
                        }

                        return x;
                    });
                }
                //  else {
                //     // neu chua co item trong list workHours -> tao moi
                //     let workHour: TimeSetDisp;
                //     workHour = new TimeSetDisp(item.frameNo === 1 ? 'KAFS02_4' : 'KAFS02_6', item.frameNo, item.opStartTime, item.opEndTime, null, null, false);


                //     self.listWorkHours.push(workHour);
                // }
            });

            // tempoHour
            stampRecord.extraordinaryTime.forEach((item: any) => {
                if (_.filter(self.listTempoHours, { frame: item.frameNo }).length > 0) {
                    self.listTempoHours = _.map(self.listTempoHours, (x: TimeSetDisp) => {
                        if (x.frame === item.frameNo) {
                            x.actualHours.startTime = item.opStartTime;
                            x.actualHours.endTime = item.opEndTime;
                        }

                        return x;
                    });
                }
                // else {
                //     // neu chua co item trong list tempoHour -> tao moi
                //     let tempohour: TimeSetDisp;
                //     tempohour = new TimeSetDisp('KAFS02_7', item.frameNo, item.opStartTime, item.opEndTime, null, null, false);

                //     self.listTempoHours.push(tempohour);
                // }
            });

            // outingHours
            stampRecord.outingTime.forEach((item: any) => {
                if (_.filter(self.listOutingHours, { frame: item.frameNo }).length > 0) {
                    self.listOutingHours = _.map(self.listOutingHours, (x: TimeSetDisp) => {
                        if (x.frame === item.frameNo) {
                            x.actualHours.startTime = item.opStartTime;
                            x.actualHours.endTime = item.opEndTime;
                        }

                        return x;
                    });
                }
                // else {
                //     // neu chua co item trong list workHours -> tao moi
                //     let outingHour: TimeSetDisp;
                //     outingHour = new TimeSetDisp('KAFS02_9', item.frameNo, item.opStartTime, item.opEndTime, null, null, item.opGoOutReasonAtr);

                //     self.listOutingHours.push(outingHour);
                // }
            });

            // breakHours
            stampRecord.breakTime.forEach((item) => {
                if (_.filter(self.listBreakHours, { frame: item.frameNo }).length > 0) {
                    self.listBreakHours = _.map(self.listBreakHours, (x: TimeSetDisp) => {
                        if (x.frame === item.frameNo) {
                            x.actualHours.startTime = item.opStartTime;
                            x.actualHours.endTime = item.opEndTime;
                        }

                        return x;
                    });
                }
                // else {
                //     // neu chua co item trong list breakHours -> tao moi
                //     let breakHour: TimeSetDisp;
                //     breakHour = new TimeSetDisp('KAFS02_12', item.frameNo, item.opStartTime, item.opEndTime, null, null, false);

                //     self.listBreakHours.push(breakHour);
                // }
            });

            // parentingHours
            stampRecord.parentingTime.forEach((item) => {
                if (_.filter(self.listParentHours, { frame: item.frameNo }).length > 0) {
                    self.listParentHours = _.map(self.listParentHours, (x: TimeSetDisp) => {
                        if (x.frame === item.frameNo) {
                            x.actualHours.startTime = item.opStartTime;
                            x.actualHours.endTime = item.opEndTime;
                        }

                        return x;
                    });
                }
                // else {
                //     // neu chua co item trong list parentingHours -> tao moi
                //     let parentHour: TimeSetDisp;
                //     parentHour = new TimeSetDisp('KAFS02_13', item.frameNo, item.opStartTime, item.opEndTime, null, null, false);

                //     self.listParentHours.push(parentHour);
                // }
            });

            // nursingHours
            stampRecord.nursingTime.forEach((item) => {
                if (_.filter(self.listNursingHours, { frame: item.frameNo }).length > 0) {
                    self.listNursingHours = _.map(self.listNursingHours, (x: TimeSetDisp) => {
                        if (x.frame === item.frameNo) {
                            x.actualHours.startTime = item.opStartTime;
                            x.actualHours.endTime = item.opEndTime;
                        }

                        return x;
                    });
                }
                // else {
                //     // neu chua co item trong list nursingHours -> tao moi
                //     let nursingHour: TimeSetDisp;
                //     nursingHour = new TimeSetDisp('KAFS02_15', item.frameNo, item.opStartTime, item.opEndTime, null, null, false);

                //     self.listNursingHours.push(nursingHour);
                // }
            });
        }

        /*
        *
        *    Sort list data
        *
        */
        self.listWorkHours = _.sortBy(self.listWorkHours, ['frame']);
        self.listTempoHours = _.sortBy(self.listTempoHours, ['frame']);
        self.listOutingHours = _.sortBy(self.listOutingHours, ['frame']);
        self.listBreakHours = _.sortBy(self.listBreakHours, ['frame']);
        self.listParentHours = _.sortBy(self.listParentHours, ['frame']);
        self.listNursingHours = _.sortBy(self.listNursingHours, ['frame']);

        self.listWorkHours.forEach((item) => {
            if (item.cancelAtr || item.appHours.startTime !== null || item.appHours.endTime !== null) {
                self.dispTitleWorkHour = true;
            }
        });

        self.listTempoHours.forEach((item) => {
            if (item.cancelAtr || item.appHours.startTime !== null || item.appHours.endTime !== null) {
                self.dispTitleWorkHour = true;
            }
        });

        self.listOutingHours.forEach((item) => {
            if (item.cancelAtr || item.appHours.startTime !== null || item.appHours.endTime !== null) {
                self.dispTitleOutingHour = true;
            }
        });

        self.listBreakHours.forEach((item) => {
            if (item.cancelAtr || item.appHours.startTime !== null || item.appHours.endTime !== null) {
                self.dispTitleBreakHour = true;
            }
        });

        self.listParentHours.forEach((item) => {
            if (item.cancelAtr || item.appHours.startTime !== null || item.appHours.endTime !== null) {
                self.dispTitleParentHour = true;
            }
        });

        self.listNursingHours.forEach((item) => {
            if (item.cancelAtr || item.appHours.startTime !== null || item.appHours.endTime !== null) {
                self.dispTitleNursingHour = true;
            }
        });
    }

    get condition4() {
        const self = this;

        if (self.dataFetch.appStampReflectOptional.temporaryAttendence === 1 && self.dataFetch.useTemporary) {
            return true;
        }

        return false;
    }

    get condition5() {
        const self = this;

        if (self.dataFetch.appStampReflectOptional.attendence === 1) {
            return true;
        }

        return false;
    }

    get condition6() {
        const self = this;

        if (self.dataFetch.appStampReflectOptional.outingHourse === 1) {
            return true;
        }

        return false;
    }

    get condition7() {
        const self = this;

        if (self.dataFetch.appStampReflectOptional.breakTime === 1) {
            return true;
        }

        return false;
    }

    get condition8() {
        const self = this;

        if (self.dataFetch.appStampReflectOptional.parentHours === 1) {
            return true;
        }

        return false;
    }

    get condition9() {
        const self = this;

        if (self.dataFetch.appStampReflectOptional.nurseTime === 1) {
            return true;
        }

        return false;
    }

    public condition1(item: any) {
        const self = this;

        if (item.frame === 2) {
            if (self.multipleWork) {
                return true;
            }

            return false;
        }

        return true;
    }

    public dispHRFrame(itemWH: TimeSetDisp) {
        const self = this;

        if (itemWH.frame === self.listWorkHours.length) {
            if (self.listTempoHours.length > 0) {
                return true;
            }
        }

        return false;
    }
}

const API = {
    detailAppStamp: 'at/request/application/stamp/detailAppStamp',
};

export class AppStamp {

}