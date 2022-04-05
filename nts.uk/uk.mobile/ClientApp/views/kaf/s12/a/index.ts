import { _ } from '@app/provider';
import { StepwizardComponent } from '@app/components';
import { component, Prop } from '@app/core/component';
import { KafS12A1Component } from '../a1';
import { KafS12A2Component } from '../a2';
import { KafS12CComponent } from '../c';
import { KafS00ShrComponent, AppType, Application, InitParam } from 'views/kaf/s00/shr';
import {
    ITimeLeaveAppDispInfo,
    ReflectSetting,
    TimeLeaveRemaining,
    TimeLeaveManagement,
    TimeLeaveAppDetail,
    LateEarlyTimeZone,
    OutingTimeZone,
    LeaveType,
    AppTimeType,
    GoingOutReason
} from '../shr';
import { CmmS45CComponent } from '../../../cmm/s45/c/index';

@component({
    name: 'kafs12a',
    route: '/kaf/s12/a',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    components: {
        'step-wizard': StepwizardComponent,
        'kaf-s12-a1': KafS12A1Component,
        'kaf-s12-a2': KafS12A2Component,
        'kaf-s12-c': KafS12CComponent,
        'cmms45c': CmmS45CComponent
    },
    validations: {},
    constraints: []
})
export class KafS12AComponent extends KafS00ShrComponent {
    public title: string = 'KafS12A1';
    public step: string = 'KAFS12_1';
    public newMode: boolean = true;
    public application: Application;
    public user: any;
    public reflectSetting: ReflectSetting = null;
    public timeLeaveRemaining: TimeLeaveRemaining = null;
    public timeLeaveManagement: TimeLeaveManagement = null;
    public details: Array<TimeLeaveAppDetail> = [];
    public calculatedData: any = null;
    public appID: string = null;

    @Prop()
    public params: InitParam;

    public created() {
        const vm = this;
        if (!_.isNil(vm.params)) {
            vm.newMode = false;
            vm.appDispInfoStartupOutput = vm.params.appDispInfoStartupOutput;
            vm.reflectSetting = vm.params.appDetail.reflectSetting;
            vm.timeLeaveRemaining = vm.params.appDetail.timeLeaveRemaining;
            vm.timeLeaveManagement = vm.params.appDetail.timeLeaveManagement;
            vm.details = vm.params.appDetail.details;
            vm.application = vm.appDispInfoStartupOutput.appDetailScreenInfo.application;
        } else {
            vm.application = vm.createApplicationInsert(AppType.ANNUAL_HOLIDAY_APPLICATION);
        }
    }

    public mounted() {
        const vm = this;
        vm.initService();
    }
    
    public initService() {
        const vm = this;
        vm.$mask('show');
        vm.$auth.user.then((user: any) => {
            vm.user = user;
        }).then(() => {
            if (vm.newMode) {
                return vm.loadCommonSetting(AppType.ANNUAL_HOLIDAY_APPLICATION);
            }

            return true;
        }).then((loadData: any) => {
            if (loadData) {
                vm.updateKaf000_A_Params(vm.user);
                vm.updateKaf000_B_Params(vm.newMode);
                vm.updateKaf000_C_Params(vm.newMode);
                if (vm.newMode) {
                    vm.kaf000_B_Params.newModeContent.useMultiDaySwitch = false;
                    const initParams = {
                        appId: null,
                        appDispInfoStartupOutput: vm.appDispInfoStartupOutput
                    };

                    return vm.$http.post('at', API.initAppNew, initParams);
                }

                return true;
            }
        }).then((result: {data: ITimeLeaveAppDispInfo}) => {
            if (result && vm.newMode) {
                vm.reflectSetting = result.data.reflectSetting;
                vm.timeLeaveRemaining = result.data.timeLeaveRemaining;
                vm.timeLeaveManagement = result.data.timeLeaveManagement;
            }
        }).catch((error: any) => {
            vm.handleErrorCustom(error).then((result) => {
                if (result) {
                    vm.handleErrorCommon(error);
                }
            });
        }).then(() => vm.$mask('hide'));
    }

    get timeLeaveType() {
        const vm = this;
        if (vm.reflectSetting) {
            const timeLeaveTypes: Array<boolean> = [
                vm.reflectSetting.condition.substituteLeaveTime == 1,
                vm.reflectSetting.condition.annualVacationTime == 1,
                vm.reflectSetting.condition.childNursing == 1,
                vm.reflectSetting.condition.nursing == 1,
                vm.reflectSetting.condition.superHoliday60H == 1,
                vm.reflectSetting.condition.specialVacationTime == 1,
            ];
            if (timeLeaveTypes.filter((i: boolean) => i).length > 1) {
                return LeaveType.COMBINATION;
            } else {
                return _.findIndex(timeLeaveTypes, (i: boolean) => i);
            }
        }

        return null;
    }

    public kaf000BChangeDate(objectDate) {
        const vm = this;
        if (objectDate.startDate) {
            if (vm.newMode) {
                vm.application.appDate = vm.$dt.date(objectDate.startDate, 'YYYY/MM/DD');
                vm.application.opAppStartDate = vm.$dt.date(objectDate.startDate, 'YYYY/MM/DD');
                vm.application.opAppEndDate = vm.$dt.date(objectDate.endDate, 'YYYY/MM/DD');
            }
            vm.$mask('show');
            vm.handleChangeDate(objectDate.startDate).then((res: any) => {
                if (res) {
                    vm.timeLeaveManagement = res.data.timeLeaveManagement;
                }
                vm.$mask('hide');
            }).catch((error: any) => {
                if (_.isEmpty(vm.appDispInfoStartupOutput.appDispInfoWithDateOutput.opMsgErrorLst)) {
                    vm.$modal.error(error);
                }
                vm.$mask('hide');
            });
        }
    }

    public kaf000CChangeReasonCD(opAppStandardReasonCD) {
        const self = this;
        self.application.opAppStandardReasonCD = opAppStandardReasonCD;
    }

    public kaf000CChangeAppReason(opAppReason) {
        const self = this;
        self.application.opAppReason = opAppReason;
    }

    public handleErrorCustom(error: any): any {
        const vm = this;

        return new Promise((resolve) => {
            if (error.messageId == 'Msg_474') {
                vm.$modal.error(error).then(() => {
                    vm.$goto('ccg008a');
                });

                return resolve(false);
            }

            return resolve(true);
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
                        self.$mask('show');
                        self.handleRegisterData(res);
                    } else {
                        self.handleConfirmMessage(listMes, res);
                    }

                }
            });
        }
    }

    public handleChangeDate(date: string) {
        const vm = this;
        let command = {
            appDate: new Date(date).toISOString(),
            appDisplayInfo: {
                appDispInfoStartupOutput: vm.appDispInfoStartupOutput,
                timeLeaveManagement: vm.timeLeaveManagement,
                reflectSetting: vm.reflectSetting
            }
        };

        return vm.$http.post('at', API.changeAppDate, command);
    }

    public handleCalculateTime(lateEarlyTimeZones: Array<LateEarlyTimeZone>, outingTimeZones: Array<OutingTimeZone>) {
        const vm = this;
        const params = {
            timeLeaveType: vm.timeLeaveType,
            appDate: new Date(vm.application.appDate).toISOString(),
            appDisplayInfo: {
                appDispInfoStartupOutput: vm.appDispInfoStartupOutput,
                timeLeaveManagement: vm.timeLeaveManagement,
                timeLeaveRemaining: vm.timeLeaveRemaining,
                reflectSetting: vm.reflectSetting
            },
            timeZones: [
                {
                    workNo: 1,
                    startTime: lateEarlyTimeZones[0].timeValue || vm.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheAttendanceTime1,
                    endTime: lateEarlyTimeZones[1].timeValue || vm.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheDepartureTime1
                },
                {
                    workNo: 2,
                    startTime: lateEarlyTimeZones[2].timeValue || vm.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheAttendanceTime2,
                    endTime: lateEarlyTimeZones[3].timeValue || vm.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheDepartureTime2
                }
            ],
            outingTimeZones: outingTimeZones.map((i: OutingTimeZone) => ({
                    frameNo: i.workNo,
                    outingAtr: i.appTimeType == GoingOutReason.PRIVATE ? AppTimeType.PRIVATE : AppTimeType.UNION,
                    startTime: i.timeZone.start,
                    endTime: i.timeZone.end
                }))
        };
        params.appDisplayInfo.timeLeaveRemaining.remainingStart = new Date(params.appDisplayInfo.timeLeaveRemaining.remainingStart).toISOString();
        params.appDisplayInfo.timeLeaveRemaining.remainingEnd = new Date(params.appDisplayInfo.timeLeaveRemaining.remainingEnd).toISOString();

        vm.$http.post('at', API.calculateTime, params).then((res: any) => {
            if (res) {
                vm.calculatedData = res.data;
                // if (vm.details.length == 0) {
                vm.createNewDetails(lateEarlyTimeZones.filter((i: LateEarlyTimeZone) => i.timeValue != null), outingTimeZones);
                // }
                vm.step = 'KAFS12_2';
                vm.$nextTick(() => {
                    window.scrollTo(0, 0);
                });
            }
            vm.$mask('hide');
        }).catch((error: any) => {
            vm.$modal.error(error).then(() => {
                vm.$mask('hide');
            });
        });
    }
    
    public handleNextToStepTwo(lateEarlyTimeZones: Array<LateEarlyTimeZone>, outingTimeZones: Array<OutingTimeZone>) {
        const vm = this;
        // check date => calculate => set details
        vm.$mask('show');
        if (vm.newMode) {
            vm.handleChangeDate(vm.application.appDate).then((res: any) => {
                if (res) {
                    vm.timeLeaveManagement = res.data.timeLeaveManagement;
                    vm.handleCalculateTime(lateEarlyTimeZones, outingTimeZones);
                } else {
                    vm.$mask('hide');
                }
            }).catch((error: any) => {
                vm.$modal.error(error).then(() => {
                    vm.$mask('hide');
                });
            });
        } else {
            vm.handleCalculateTime(lateEarlyTimeZones, outingTimeZones);
        }
    }

    public handleNextToStepThree(applyTimeData: Array<any>, specialLeaveFrame: number) {
        const vm = this;
        vm.$mask('show');
        vm.updateDetails(applyTimeData, specialLeaveFrame, vm.timeLeaveManagement.timeSpecialLeaveMng.listSpecialFrame);
        const timeLeaveAppDisplayInfo = {
            appDispInfoStartupOutput: vm.appDispInfoStartupOutput,
            timeLeaveManagement: vm.timeLeaveManagement,
            timeLeaveRemaining: vm.timeLeaveRemaining,
            reflectSetting: vm.reflectSetting
        };
        timeLeaveAppDisplayInfo.timeLeaveRemaining.remainingStart = new Date(timeLeaveAppDisplayInfo.timeLeaveRemaining.remainingStart).toISOString();
        timeLeaveAppDisplayInfo.timeLeaveRemaining.remainingEnd = new Date(timeLeaveAppDisplayInfo.timeLeaveRemaining.remainingEnd).toISOString();

        const checkParams = {
            timeDigestAppType: vm.timeLeaveType,
            applicationNew: vm.newMode ? vm.application : null,
            applicationUpdate: vm.newMode ? null : vm.application,
            details: vm.details.filter((detail) => {
                return detail.applyTime.annualAppTime > 0
                || detail.applyTime.substituteAppTime > 0
                || detail.applyTime.childCareAppTime > 0
                || detail.applyTime.careAppTime > 0
                || detail.applyTime.super60AppTime > 0
                || detail.applyTime.specialAppTime > 0;
            }),
            timeLeaveAppDisplayInfo,
            agentMode: false
        };
        vm.$http.post('at', API.checkBeforeRegister, checkParams).then((res: any) => {
            if (!_.isEmpty(res)) {
                const registerCommand = {
                    timeLeaveAppDisplayInfo,
                    application: vm.application,
                    details: checkParams.details
                };
                if (!_.isEmpty(res.data)) {
                    let listTemp = _.clone(res.data);
                    vm.handleConfirmMessage(listTemp, registerCommand);

                } else {
                    vm.handleRegisterData(registerCommand);
                }
            } else {
                vm.$mask('hide');
            }
        }).catch((error: any) => {
            if (error.messageId == 'Msg_197') {
                vm.$modal.error({ messageId: 'Msg_197', messageParams: [] }).then(() => {
                    let appID = vm.appDispInfoStartupOutput.appDetailScreenInfo.application.appID;
                    vm.$modal('cmms45c', { 'listAppMeta': [appID], 'currentApp': appID }).then((newData: InitParam) => {
                        vm.params = newData;
                        vm.newMode = false;
                        vm.appDispInfoStartupOutput = vm.params.appDispInfoStartupOutput;
                        vm.reflectSetting = vm.params.appDetail.reflectSetting;
                        vm.timeLeaveRemaining = vm.params.appDetail.timeLeaveRemaining;
                        vm.timeLeaveManagement = vm.params.appDetail.timeLeaveManagement;
                        vm.details = vm.params.appDetail.details;
                        vm.application = vm.appDispInfoStartupOutput.appDetailScreenInfo.application;
                        vm.initService();
                    });
                });
    
                return;
            }
            vm.$modal.error(error).then(() => {
                vm.$mask('hide');
            });
        });
    }

    public handleBackToStepOne(data: any) {
        const vm = this;
        if (data) {
            vm.appDispInfoStartupOutput = data.appDispInfoStartupOutput;
            vm.reflectSetting = data.appDetail.reflectSetting;
            vm.timeLeaveRemaining = data.appDetail.timeLeaveRemaining;
            vm.timeLeaveManagement = data.appDetail.timeLeaveManagement;
            vm.details = data.appDetail.details;
            vm.newMode = false;
            vm.updateKaf000_B_Params(vm.newMode);
            vm.updateKaf000_C_Params(vm.newMode);
        }
        vm.step = 'KAFS12_1';
    }

    private handleRegisterData(data: any) {
        const vm = this;
        if (vm.newMode) {
            vm.$http.post('at', API.register, data).then((res: any) => {
                if (res) {
                    vm.$http.post('at', API.reflectApp, res.data.reflectAppIdLst);
                    vm.appID = res.data.appIDLst[0];
                    vm.step = 'KAFS12_3';
                }
                vm.$mask('hide');
            }).catch((error: any) => {
                vm.$modal.error(error).then(() => {
                    vm.$mask('hide');
                });
            });
        } else {
            vm.$http.post('at', API.update, data).then((res: any) => {
                if (res) {
                    vm.appID = res.data.appIDLst[0];
                    vm.step = 'KAFS12_3';
                }
                vm.$mask('hide');
            }).catch((error: any) => {
                vm.$modal.error(error).then(() => {
                    vm.$mask('hide');
                });
            });
        }
    }

    private getScheduledTime(appTimeType: number) {
        const self = this;
        if (self.appDispInfoStartupOutput
            && self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst
            && self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail) {
            switch (appTimeType) {
                case AppTimeType.ATWORK:
                    return self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheAttendanceTime1;
                case AppTimeType.OFFWORK:
                    return self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheDepartureTime1;
                case AppTimeType.ATWORK2:
                    return self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheAttendanceTime2;
                case AppTimeType.OFFWORK2:
                    return self.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheDepartureTime2;
                default:
                    return null;
            }
        }

        return null;
    }

    private createNewDetails(lateEarlyTimeZones: Array<LateEarlyTimeZone>, outingTimeZones: Array<OutingTimeZone>) {
        const vm = this;
        vm.details = [];
        lateEarlyTimeZones.forEach((i: LateEarlyTimeZone) => {
            vm.details.push({
                appTimeType: i.appTimeType,
                timeZones: [{
                    workNo: i.appTimeType == AppTimeType.ATWORK || i.appTimeType == AppTimeType.OFFWORK ? 1 : 2,
                    startTime: i.appTimeType == AppTimeType.ATWORK || i.appTimeType == AppTimeType.ATWORK2 ? vm.getScheduledTime(i.appTimeType) : i.timeValue,
                    endTime: i.appTimeType == AppTimeType.ATWORK || i.appTimeType == AppTimeType.ATWORK2 ? i.timeValue : vm.getScheduledTime(i.appTimeType),
                }],
                applyTime: {
                    substituteAppTime: 0,
                    annualAppTime: 0,
                    childCareAppTime: 0,
                    careAppTime: 0,
                    super60AppTime: 0,
                    specialAppTime: 0,
                    specialLeaveFrameNo: 0,
                }
            });
        });
        const privateOutings = outingTimeZones.filter((i: OutingTimeZone) => i.appTimeType == GoingOutReason.PRIVATE);
        if (privateOutings.length > 0) {
            vm.details.push({
                appTimeType: AppTimeType.PRIVATE,
                timeZones: privateOutings.map((i: OutingTimeZone) => ({
                    workNo: i.workNo,
                    startTime: i.timeZone.start,
                    endTime: i.timeZone.end
                })),
                applyTime: {
                    substituteAppTime: 0,
                    annualAppTime: 0,
                    childCareAppTime: 0,
                    careAppTime: 0,
                    super60AppTime: 0,
                    specialAppTime: 0,
                    specialLeaveFrameNo: 0,
                }
            });
        }
        const unionOutings = outingTimeZones.filter((i: OutingTimeZone) => i.appTimeType == GoingOutReason.UNION);
        if (unionOutings.length > 0) {
            vm.details.push({
                appTimeType: AppTimeType.UNION,
                timeZones: unionOutings.map((i: OutingTimeZone) => ({
                    workNo: i.workNo,
                    startTime: i.timeZone.start,
                    endTime: i.timeZone.end
                })),
                applyTime: {
                    substituteAppTime: 0,
                    annualAppTime: 0,
                    childCareAppTime: 0,
                    careAppTime: 0,
                    super60AppTime: 0,
                    specialAppTime: 0,
                    specialLeaveFrameNo: 0,
                }
            });
        }
    }

    private updateDetails(applyTimeData: Array<any>, specialLeaveFrame: number, specialLeaveFrames: Array<any>) {
        const vm = this;
        vm.details.forEach((detail: TimeLeaveAppDetail) => {
            applyTimeData.forEach((data: any) => {
                if (detail.appTimeType == data.appTimeType) {
                    detail.applyTime.annualAppTime = data.annualAppTime;
                    detail.applyTime.substituteAppTime = data.substituteAppTime;
                    detail.applyTime.childCareAppTime = data.childNursingAppTime;
                    detail.applyTime.careAppTime = data.nursingAppTime;
                    detail.applyTime.super60AppTime = data.super60AppTime;
                    detail.applyTime.specialAppTime = data.specialAppTime;
                    if (data.specialAppTime > 0) {
                        const tmp = _.find(specialLeaveFrames, (i) => i.specialHdFrameNo == specialLeaveFrame);
                        detail.applyTime.specialLeaveFrameNo = tmp ? specialLeaveFrame : null;
                    } else {
                        data.specialAppTime = null;
                    }
                }
            });
        });
    }
}

const API = {
    initAppNew: 'at/request/application/timeLeave/init',
    changeAppDate: 'at/request/application/timeLeave/changeAppDate',
    calculateTime: 'at/request/application/timeLeave/calculateTime',
    checkBeforeRegister: 'at/request/application/timeLeave/checkBeforeRegister',
    register: 'at/request/application/timeLeave/register',
    update: 'at/request/application/timeLeave/update',
    reflectApp: 'at/request/application/reflect-app'
};