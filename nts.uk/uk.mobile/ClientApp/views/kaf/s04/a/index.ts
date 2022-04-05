import { component, Prop, Watch } from '@app/core/component';
import * as _ from 'lodash';
import { vmOf } from 'vue/types/umd';
import { KafS00AComponent, KafS00BComponent, KAFS00BParams, KafS00CComponent, KAFS00CParams } from '../../s00';
import { AppType, KafS00ShrComponent, Application } from '../../s00/shr';
import { KafS00SubP1Component, KAFS00P1Params, ExcessTimeStatus } from '../../s00/sub/p1';
import { CmmS45CComponent } from '../../../cmm/s45/c/index';

import {
    ITime,
    IData,
    IInfoOutput,
    IRes,
    IParams,
    ICheck,
    ILateOrLeaveEarlies,
    IResDetail,
    IResAppDate,
    Params,
} from './define';

@component({
    name: 'kafs04a',
    route: '/kaf/s04/a',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    components: {
        'kaf-s00-a': KafS00AComponent,
        'kaf-s00-b': KafS00BComponent,
        'kaf-s00-c': KafS00CComponent,
        'kaf-s00-shr': KafS00ShrComponent,
        'kaf-s00-p1': KafS00SubP1Component,
        'cmms45c': CmmS45CComponent
    },
    constraints: []
})
export class KafS04AComponent extends KafS00ShrComponent {
    @Prop({ default: null })
    public params: Params;
    public title: string = 'KafS04A';
    public isValidateAll: Boolean = true;
    public user: any = null;
    public kafS00P1Params1: KAFS00P1Params = {
        preAppDisp: false,
        preAppTime: null,
        preAppExcess: null,
        actualDisp: false,
        actualTime: null,
        actualExcess: null,
        scheduleDisp: true,
        scheduleTime: null,
        scheduleExcess: ExcessTimeStatus.NONE
    };
    public kafS00P1Params2: KAFS00P1Params = {
        preAppDisp: false,
        preAppTime: null,
        preAppExcess: null,
        actualDisp: false,
        actualTime: null,
        actualExcess: null,
        scheduleDisp: true,
        scheduleTime: null,
        scheduleExcess: ExcessTimeStatus.NONE
    };
    public kafS00P1Params3: KAFS00P1Params = {
        preAppDisp: false,
        preAppTime: null,
        preAppExcess: null,
        actualDisp: false,
        actualTime: null,
        actualExcess: null,
        scheduleDisp: true,
        scheduleTime: null,
        scheduleExcess: ExcessTimeStatus.NONE
    };
    public kafS00P1Params4: KAFS00P1Params = {
        preAppDisp: false,
        preAppTime: null,
        preAppExcess: null,
        actualDisp: false,
        actualTime: null,
        actualExcess: null,
        scheduleDisp: true,
        scheduleTime: null,
        scheduleExcess: ExcessTimeStatus.NONE
    };
    public time: ITime = { attendanceTime: null, leaveTime: null, attendanceTime2: null, leaveTime2: null };
    public conditionLateEarlyLeave2Show: boolean = true;
    public lateOrLeaveEarlies: ILateOrLeaveEarlies;
    public application: Application = super.createApplicationInsert(AppType.EARLY_LEAVE_CANCEL_APPLICATION);
    public infoOutPut: IInfoOutput = initInfoOutput();
    public paramsAComponent: IParams;
    public cancelAtr: number = 0;
    public check: ICheck = {
        cbCancelLate: {
            value: null
        },
        cbCancelEarlyLeave: {
            value: null
        },
        cbCancelLate2: {
            value: null
        },
        cbCancelEarlyLeave2: {
            value: null
        }
    };

    public mode: boolean = true;
    private errorInfo: string = null;
    private init: boolean = true;

    @Prop({ default: () => ({}) }) public readonly res: IResDetail;

    public created() {
        const vm = this;

        if (vm.params) {
           vm.initFromParam(); 
        }
    }

    public initFromParam() {
        const vm = this;
        vm.mode = false;
        vm.appDispInfoStartupOutput = vm.params.appDispInfoStartupOutput;
        vm.application = vm.appDispInfoStartupOutput.appDetailScreenInfo.application;
        vm.infoOutPut.lateEarlyCancelAppSet = vm.params.lateEarlyCancelAppSet;
        vm.cancelAtr = vm.params.lateEarlyCancelAppSet.cancelAtr;
        vm.conditionLateEarlyLeave2Show = !!vm.appDispInfoStartupOutput.appDispInfoNoDateOutput.managementMultipleWorkCycles;

        const opAchievementDetail = _.isEmpty(vm.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst)
            ? null
            : vm.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail;
        vm.kafS00P1Params1.scheduleExcess = ExcessTimeStatus.NONE;
        vm.kafS00P1Params2.scheduleExcess = ExcessTimeStatus.NONE;
        vm.kafS00P1Params3.scheduleExcess = ExcessTimeStatus.NONE;
        vm.kafS00P1Params4.scheduleExcess = ExcessTimeStatus.NONE;
        vm.kafS00P1Params1.scheduleTime = null;
        vm.kafS00P1Params2.scheduleTime = null;
        vm.kafS00P1Params3.scheduleTime = null;
        vm.kafS00P1Params4.scheduleTime = null;    

        if (opAchievementDetail != null) {
            const {opWorkTime, opLeaveTime, opWorkTime2, opDepartureTime2} = opAchievementDetail;
            const {scheAttendanceTime1, scheDepartureTime1, scheAttendanceTime2, scheDepartureTime2} = opAchievementDetail.achievementEarly;

            vm.kafS00P1Params1.scheduleTime = scheAttendanceTime1;
            vm.kafS00P1Params2.scheduleTime = scheDepartureTime1;
            vm.kafS00P1Params3.scheduleTime = scheAttendanceTime2;
            vm.kafS00P1Params4.scheduleTime = scheDepartureTime2;

            if (opWorkTime != null && scheAttendanceTime1 != null && scheAttendanceTime1 < opWorkTime) {
                vm.kafS00P1Params1.scheduleExcess = ExcessTimeStatus.ALARM;
            }
            if (opLeaveTime != null && scheDepartureTime1 != null && scheDepartureTime1 > opLeaveTime) {
                vm.kafS00P1Params2.scheduleExcess = ExcessTimeStatus.ALARM;
            }
            if (opWorkTime2 != null && scheAttendanceTime2 != null && scheAttendanceTime2 < opWorkTime2) {
                vm.kafS00P1Params3.scheduleExcess = ExcessTimeStatus.ALARM;
            }
            if (opDepartureTime2 != null && scheDepartureTime2 != null && scheDepartureTime2 > opDepartureTime2) {
                vm.kafS00P1Params4.scheduleExcess = ExcessTimeStatus.ALARM;
            }
        }

        vm.params.arrivedLateLeaveEarly.lateOrLeaveEarlies.forEach((item) => {
            if (item.workNo == 1 && item.lateOrEarlyClassification == 0) {
                vm.time.attendanceTime = item.timeWithDayAttr;
            }
            if (item.workNo == 1 && item.lateOrEarlyClassification == 1) {
                vm.time.leaveTime = item.timeWithDayAttr;
            }
            if (item.workNo == 2 && item.lateOrEarlyClassification == 0) {
                vm.time.attendanceTime2 = item.timeWithDayAttr;
            }
            if (item.workNo == 2 && item.lateOrEarlyClassification == 1) {
                vm.time.leaveTime2 = item.timeWithDayAttr;
            }
        });

        vm.params.arrivedLateLeaveEarly.lateCancelation.forEach((item) => {
            if (item.workNo == 1 && item.lateOrEarlyClassification == 0) {
                vm.time.attendanceTime = opAchievementDetail ? opAchievementDetail.opWorkTime : null;
                vm.check.cbCancelLate.value = 'Attendance';
            }
            if (item.workNo == 1 && item.lateOrEarlyClassification == 1) {
                vm.time.leaveTime = opAchievementDetail ? opAchievementDetail.opLeaveTime : null;
                vm.check.cbCancelEarlyLeave.value = 'Early';
            }
            if (item.workNo == 2 && item.lateOrEarlyClassification == 0) {
                vm.time.attendanceTime2 = opAchievementDetail ? opAchievementDetail.opWorkTime2 : null;
                vm.check.cbCancelLate2.value = 'Attendance2';
            }
            if (item.workNo == 2 && item.lateOrEarlyClassification == 1) {
                vm.time.leaveTime2 = opAchievementDetail ? opAchievementDetail.opDepartureTime2 : null;
                vm.check.cbCancelEarlyLeave2.value = 'Early2';
            }
        });
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
            if (vm.mode) {
                return vm.loadCommonSetting(AppType.EARLY_LEAVE_CANCEL_APPLICATION);
            }

            return true;
        }).then((loadData: boolean) => {
            if (loadData) {
                vm.updateKaf000_A_Params(vm.user);
                vm.updateKaf000_B_Params(vm.mode);
                vm.updateKaf000_C_Params(vm.mode);
                if (vm.mode) {
                    vm.kaf000_B_Params.newModeContent.useMultiDaySwitch = false;
                    const initParams = {
                        appDates: [],
                        appDispInfoStartupDto: vm.appDispInfoStartupOutput,
                    };

                    return vm.$http.post('at', API.startKAFS04, initParams);
                }

                return true;
            }
        }).then((res: any) => {
            if (res.data) {
                vm.infoOutPut.lateEarlyCancelAppSet = res.data.lateEarlyCancelAppSet;
                vm.conditionLateEarlyLeave2Show = !!vm.appDispInfoStartupOutput.appDispInfoNoDateOutput.managementMultipleWorkCycles;
                vm.cancelAtr = res.data.lateEarlyCancelAppSet.cancelAtr;
                if (vm.cancelAtr == 2 && vm.mode) {
                    vm.check.cbCancelLate.value = 'Attendance';
                    vm.check.cbCancelEarlyLeave.value = 'Early';
                    vm.check.cbCancelLate2.value = 'Attendance2';
                    vm.check.cbCancelEarlyLeave2.value = 'Early2';
                }
            }
        }).catch((error: any) => {
            vm.handleErrorCommon(error);
        }).then(() => {
            vm.init = false;
            vm.$mask('hide');
        });
    }

    @Watch('application.prePostAtr')
    public prePostWatcher(value: number) {
        const vm = this;
        if (value == 1 && vm.errorInfo) {
            vm.$modal.error({ messageId: vm.errorInfo, messageParams: [vm.application.opAppStartDate] });
        }
    }

    public get showCheckBox() {
        const vm = this;

        return vm.application.prePostAtr == 1 && (vm.cancelAtr == 1 || vm.cancelAtr == 2);
    }

    public initComponentP1() {
        const vm = this;

        vm.kafS00P1Params1 = {
            preAppDisp: false,
            preAppTime: null,
            preAppExcess: null,
            actualDisp: false,
            actualTime: null,
            actualExcess: null,
            scheduleDisp: true,
            scheduleTime: null,
            scheduleExcess: ExcessTimeStatus.NONE
        };
        vm.kafS00P1Params2 = {
            preAppDisp: false,
            preAppTime: null,
            preAppExcess: null,
            actualDisp: false,
            actualTime: null,
            actualExcess: null,
            scheduleDisp: true,
            scheduleTime: null,
            scheduleExcess: ExcessTimeStatus.NONE
        };
        vm.kafS00P1Params3 = {
            preAppDisp: false,
            preAppTime: null,
            preAppExcess: null,
            actualDisp: false,
            actualTime: null,
            actualExcess: null,
            scheduleDisp: true,
            scheduleTime: null,
            scheduleExcess: ExcessTimeStatus.NONE
        };
        vm.kafS00P1Params4 = {
            preAppDisp: false,
            preAppTime: null,
            preAppExcess: null,
            actualDisp: false,
            actualTime: null,
            actualExcess: null,
            scheduleDisp: true,
            scheduleTime: null,
            scheduleExcess: ExcessTimeStatus.NONE
        };
    }

    public checkBeforeRegister() {
        const vm = this;

        vm.infoOutPut.arrivedLateLeaveEarly.lateOrLeaveEarlies = [];
        vm.infoOutPut.earlyInfos = [];
        vm.infoOutPut.arrivedLateLeaveEarly.lateCancelation = [];

        if (vm.time.attendanceTime != null && (vm.application.prePostAtr != 1 || !vm.check.cbCancelLate.value)) {
            vm.infoOutPut.arrivedLateLeaveEarly.lateOrLeaveEarlies.push(
                {
                    lateOrEarlyClassification: 0,
                    timeWithDayAttr: vm.time.attendanceTime,
                    workNo: 1,
                }
            );
        }
        if (vm.time.leaveTime != null && (vm.application.prePostAtr != 1 || !vm.check.cbCancelEarlyLeave.value)) {
            vm.infoOutPut.arrivedLateLeaveEarly.lateOrLeaveEarlies.push(
                {
                    lateOrEarlyClassification: 1,
                    timeWithDayAttr: vm.time.leaveTime,
                    workNo: 1,
                }
            );
        }

        if (vm.conditionLateEarlyLeave2Show) {
            if (vm.time.attendanceTime2 != null && (vm.application.prePostAtr != 1 || !vm.check.cbCancelLate2.value)) {
                vm.infoOutPut.arrivedLateLeaveEarly.lateOrLeaveEarlies.push(
                    {
                        lateOrEarlyClassification: 0,
                        timeWithDayAttr: vm.time.attendanceTime2,
                        workNo: 2,
                    }
                );
            }
            if (vm.time.leaveTime2 != null && (vm.application.prePostAtr != 1 || !vm.check.cbCancelEarlyLeave2.value)) {
                vm.infoOutPut.arrivedLateLeaveEarly.lateOrLeaveEarlies.push(
                    {
                        lateOrEarlyClassification: 1,
                        timeWithDayAttr: vm.time.leaveTime2,
                        workNo: 2,
                    }
                );
            }
        }

        //neu checkbox được check
        if (vm.application.prePostAtr == 1) {
            if (vm.check.cbCancelLate.value) {
                vm.infoOutPut.arrivedLateLeaveEarly.lateCancelation.push(
                    {
                        workNo: 1,
                        lateOrEarlyClassification: 0,
                    }
                );
            }
            if (vm.check.cbCancelEarlyLeave.value) {
                vm.infoOutPut.arrivedLateLeaveEarly.lateCancelation.push(
                    {
                        workNo: 1,
                        lateOrEarlyClassification: 1,
                    }
                );
            }
            if (vm.conditionLateEarlyLeave2Show) {
                if (vm.check.cbCancelLate2.value) {
                    vm.infoOutPut.arrivedLateLeaveEarly.lateCancelation.push(
                        {
                            workNo: 2,
                            lateOrEarlyClassification: 0,
                        }
                    );
                }
                if (vm.check.cbCancelEarlyLeave2.value) {
                    vm.infoOutPut.arrivedLateLeaveEarly.lateCancelation.push(
                        {
                            workNo: 2,
                            lateOrEarlyClassification: 1,
                        }
                    );
                }
            }
        }

        vm.$mask('show');
        vm.infoOutPut.appDispInfoStartupOutput = vm.appDispInfoStartupOutput;

        let paramsErrorLst = {
            agentAtr: true,
            isNew: vm.mode,
            infoOutput: vm.infoOutPut,
            application: _.extend(vm.application, {employeeID: vm.user.employeeId}),
        };

        vm.$mask('show');
        vm.$http.post('at', API.getMsgList + '/' + AppType.EARLY_LEAVE_CANCEL_APPLICATION, paramsErrorLst).then((res: any) => {
            vm.mode ? vm.register() : vm.update();
            vm.$mask('hide');
        }).catch((err: any) => {
            vm.$mask('hide');

            return vm.handleErrorMessage(err);
        });
    }

    public handleClickRegister() {
        const vm = this;
        if (vm.checkValidAll()) {
            if (vm.application.prePostAtr == 1 && vm.errorInfo) {
                vm.$modal.error({ messageId: vm.errorInfo, messageParams: [vm.application.opAppStartDate] });

                return;
            }
            vm.checkBeforeRegister();
        }
    }

    private checkValidAll(component?: string) {
        const vm = this;
        let validAllChild: boolean = true;
        for (let child of vm.$children) {
            if (!component || child.$vnode.componentOptions.tag == component) {
                child.$validate();
            }
            if (!child.$valid) {
                validAllChild = false;
            }
        }
        vm.isValidateAll = validAllChild;
        vm.$validate();
        if (!vm.$valid || !validAllChild) {
            window.scrollTo(500, 0);

            return false;
        }

        return true;
    }

    public register() {
        const vm = this;

        let params = {
            appType: AppType.EARLY_LEAVE_CANCEL_APPLICATION,
            application: _.extend(vm.application, {employeeID: vm.user.employeeId}),
            infoOutput: vm.infoOutPut,
        };
        vm.$mask('show');
        vm.$http.post('at', API.register, params).then((res: IRes) => {
            vm.paramsAComponent = {
                appID: res.data.appIDLst[0],
                mode: vm.mode,
                res: null,
            };
            vm.$http.post('at', API.reflectApp, res.data.reflectAppIdLst);
            vm.$goto('kafs04a1', vm.paramsAComponent);
            vm.$mask('hide');
        });
    }

    public update() {
        const vm = this;

        let paramsUpdate = {
            application: _.extend(vm.application, {employeeID: vm.user.employeeId}),
            arrivedLateLeaveEarlyDto: vm.infoOutPut.arrivedLateLeaveEarly,
            appDispInfoStartupDto: vm.params.appDispInfoStartupOutput
        };
        vm.$mask('show');
        vm.$http.post('at', API.updateApp, paramsUpdate).then((res: any) => {
            vm.paramsAComponent = {
                appID: res.data.appIDLst[0],
                mode: vm.mode,
                res: null,
            };
            vm.$goto('kafs04a1', vm.paramsAComponent);
            vm.$mask('hide');
        });
    }

    public handleErrorMessage(res: any) {
        const vm = this;
        vm.$mask('hide');
        if (res.messageId == 'Msg_197') {
            vm.$modal.error({ messageId: 'Msg_197', messageParams: [] }).then(() => {
                let appID = vm.appDispInfoStartupOutput.appDetailScreenInfo.application.appID;
                vm.$modal('cmms45c', { 'listAppMeta': [appID], 'currentApp': appID }).then((newData: Params) => {
                    vm.params = newData;
                    vm.initFromParam();
                    vm.initService();
                });
            });

            return;
        }
        if (res.messageId) {
            return vm.$modal.error({ messageId: res.messageId, messageParams: res.parameterIds });
        } else {

            if (_.isArray(res.errors)) {
                return vm.$modal.error({ messageId: res.errors[0].messageId, messageParams: res.parameterIds });
            } else {
                return vm.$modal.error({ messageId: res.errors.messageId, messageParams: res.parameterIds });
            }
        }
    }

    public handleChangeDate(paramsDate) {
        const vm = this;
        const appDatesLst = [vm.$dt(paramsDate.startDate, 'YYYY/MM/DD')];
        if (paramsDate.startDate) {
            if (vm.mode) {
                vm.application.appDate = appDatesLst[0];
                vm.application.opAppStartDate = appDatesLst[0];
                vm.application.opAppEndDate = appDatesLst[0];
                if (vm.appDispInfoStartupOutput.appDispInfoNoDateOutput.applicationSetting.appDisplaySetting.prePostDisplayAtr == 0) {
                    vm.application.prePostAtr = vm.appDispInfoStartupOutput.appDispInfoWithDateOutput.prePostAtr;
                }
                vm.checkValidAll('kaf-s00-b');
            }
            let params = {
                appDates: appDatesLst,
                appDispNoDate: vm.appDispInfoStartupOutput.appDispInfoNoDateOutput,
                appDispWithDate: vm.appDispInfoStartupOutput.appDispInfoWithDateOutput,
                appType: AppType.EARLY_LEAVE_CANCEL_APPLICATION,
                baseDate: appDatesLst[0],
                setting: vm.infoOutPut.lateEarlyCancelAppSet
            };
            vm.$mask('show');
            vm.$http.post('at', API.changeAppDate, params).then((response: IResAppDate) => {
                vm.errorInfo = response.data.errorInfo;
                if (vm.application.prePostAtr == 1 && vm.errorInfo) {
                    vm.$modal.error({ messageId: vm.errorInfo, messageParams: [vm.application.opAppStartDate] });
                }

                response.data.appDispInfoWithDateOutput.opActualContentDisplayLst.forEach((item) => {
                    vm.kafS00P1Params1.scheduleExcess = ExcessTimeStatus.NONE;
                    vm.kafS00P1Params2.scheduleExcess = ExcessTimeStatus.NONE;
                    vm.kafS00P1Params3.scheduleExcess = ExcessTimeStatus.NONE;
                    vm.kafS00P1Params4.scheduleExcess = ExcessTimeStatus.NONE;
                    vm.kafS00P1Params1.scheduleTime = null;
                    vm.kafS00P1Params2.scheduleTime = null;
                    vm.kafS00P1Params3.scheduleTime = null;
                    vm.kafS00P1Params4.scheduleTime = null;
                    vm.time.attendanceTime = null;
                    vm.time.leaveTime = null;
                    vm.time.attendanceTime2 = null;
                    vm.time.leaveTime2 = null;

                    if (item.opAchievementDetail) {
                        const {opWorkTime, opLeaveTime, opWorkTime2, opDepartureTime2, trackRecordAtr} = item.opAchievementDetail;
                        const {scheAttendanceTime1, scheDepartureTime1, scheAttendanceTime2, scheDepartureTime2} = item.opAchievementDetail.achievementEarly;

                        vm.kafS00P1Params1.scheduleTime = scheAttendanceTime1;
                        vm.kafS00P1Params2.scheduleTime = scheDepartureTime1;
                        vm.kafS00P1Params3.scheduleTime = scheAttendanceTime2;
                        vm.kafS00P1Params4.scheduleTime = scheDepartureTime2;

                        if (trackRecordAtr == 0) {
                            vm.time.attendanceTime = opWorkTime;
                            vm.time.leaveTime = opLeaveTime;
                            vm.time.attendanceTime2 = opWorkTime2;
                            vm.time.leaveTime2 = opDepartureTime2;

                            if (opWorkTime != null && scheAttendanceTime1 != null && scheAttendanceTime1 < opWorkTime) {
                                vm.kafS00P1Params1.scheduleExcess = ExcessTimeStatus.ALARM;
                            }
                            if (opLeaveTime != null && scheDepartureTime1 != null && scheDepartureTime1 > opLeaveTime) {
                                vm.kafS00P1Params2.scheduleExcess = ExcessTimeStatus.ALARM;
                            }
                            if (opWorkTime2 != null && scheAttendanceTime2 != null && scheAttendanceTime2 < opWorkTime2) {
                                vm.kafS00P1Params3.scheduleExcess = ExcessTimeStatus.ALARM;
                            }
                            if (opDepartureTime2 != null && scheDepartureTime2 != null && scheDepartureTime2 > opDepartureTime2) {
                                vm.kafS00P1Params4.scheduleExcess = ExcessTimeStatus.ALARM;
                            }
                        }
                    }
                });
                vm.$mask('hide');
            });
        }

    }

    public handleChangeAppReason(appReason) {
        const vm = this;
        vm.application.opAppReason = appReason;
        vm.checkValidAll('kaf-s00-c');
    }

    public handleChangeReasonCD(reasonCD) {
        const vm = this;
        vm.application.opAppStandardReasonCD = reasonCD;
        if (!vm.init) {
            vm.checkValidAll('kaf-s00-c');
        }
    }

    public handleChangePrePost(prePost) {
        const vm = this;
        vm.application.prePostAtr = prePost;
        vm.checkValidAll('kaf-s00-b');
    }
}

const API = {
    startKAFS04: 'at/request/application/lateorleaveearly/initPage',
    changeAppDate: 'at/request/application/lateorleaveearly/changeAppDate',
    register: 'at/request/application/lateorleaveearly/register',
    getMsgList: 'at/request/application/lateorleaveearly/getMsgList',
    updateApp: 'at/request/application/lateorleaveearly/updateInfoApp',
    reflectApp: 'at/request/application/reflect-app'
};

const initInfoOutput = (): IInfoOutput => ({
    appDispInfoStartupOutput: null,
    arrivedLateLeaveEarly: {
        lateCancelation: [],
        lateOrLeaveEarlies: [],
    },
    earlyInfos: [{
        category: 0,
        isActive: true,
        isCheck: false,
        isIndicated: true,
        workNo: 0,
    }],
    info: '',
    lateEarlyCancelAppSet: {
        cancelAtr: 0,
        companyId: '',
    }
});

