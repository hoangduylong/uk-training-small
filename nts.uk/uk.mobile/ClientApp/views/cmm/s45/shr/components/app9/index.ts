import { Vue, _ } from '@app/provider';
import { component, Prop, Watch } from '@app/core/component';
import {
    IAppDispInfoStartupOutput,
    IArrivedLateLeaveEarly,
    IEarlyInfos,
    ITime
} from '../../../../../kaf/s04/a/define';
import { KafS00SubP1Component, KAFS00P1Params, ExcessTimeStatus } from '../../../../../kaf/s00/sub/p1';

@component({
    name: 'cmms45componentsapp9',
    template: require('./index.vue'),
    validations: {},
    components: {
        'kaf-s00-p1': KafS00SubP1Component
    },
    constraints: []
})
export class CmmS45ComponentsApp9Component extends Vue {

    public appDispInfoStartupOutput: IAppDispInfoStartupOutput;
    public time: ITime = {
        attendanceTime: null,
        leaveTime: null,
        attendanceTime2: null,
        leaveTime2: null,
    };
    public kafS00P1Params1: KAFS00P1Params = {
        actualDisp: false,
        preAppDisp: false,
        scheduleDisp: true,
        actualExcess: null,
        actualTime: null,
        preAppExcess: null,
        preAppTime: null,
        scheduleExcess: null,
        scheduleTime: null
    };
    public kafS00P1Params2: KAFS00P1Params = {
        preAppDisp: false,
        scheduleDisp: true,
        actualExcess: null,
        actualTime: null,
        preAppExcess: null,
        preAppTime: null,
        scheduleExcess: null,
        scheduleTime: null,
        actualDisp: false
    };
    public kafS00P1Params3: KAFS00P1Params = {
        preAppDisp: false,
        scheduleDisp: true,
        actualExcess: null,
        actualTime: null,
        preAppExcess: null,
        preAppTime: null,
        scheduleExcess: null,
        scheduleTime: null,
        actualDisp: false
    };
    public kafS00P1Params4: KAFS00P1Params = {
        preAppDisp: false,
        scheduleDisp: true,
        actualExcess: null,
        actualTime: null,
        preAppExcess: null,
        preAppTime: null,
        scheduleExcess: null,
        scheduleTime: null,
        actualDisp: false
    };

    public cancelAtr: number = 0;
    public managementMultipleWorkCycles: boolean = false;
    @Prop({
        default: () => ({
            appDispInfoStartupOutput: null,
            appDetail: null,
        })

    }) public readonly params: {
        appDispInfoStartupOutput: IAppDispInfoStartupOutput,
        appDetail: IAppDetail,

    };

    public created() {
        const vm = this;
    }

    public mounted() {
        const vm = this;
        vm.$auth.user.then((usr: any) => {
            this.fetchData(vm.params.appDispInfoStartupOutput);
        });
    }

    @Watch('params.appDispInfoStartupOutput')
    public appDispInfoWatcher(value: any) {
        const vm = this;
        vm.fetchData(value);
    }

    public fetchData(appDispInfoStartupOutput: any) {
        const vm = this;

        vm.time = {
            attendanceTime: null,
            leaveTime: null,
            attendanceTime2: null,
            leaveTime2: null,
        };
        vm.kafS00P1Params1 = {
            actualDisp: false,
            preAppDisp: false,
            scheduleDisp: true,
            actualExcess: null,
            actualTime: null,
            preAppExcess: null,
            preAppTime: null,
            scheduleExcess: null,
            scheduleTime: null
        };
        vm.kafS00P1Params2 = {
            actualDisp: false,
            preAppDisp: false,
            scheduleDisp: true,
            actualExcess: null,
            actualTime: null,
            preAppExcess: null,
            preAppTime: null,
            scheduleExcess: null,
            scheduleTime: null
        };
        vm.kafS00P1Params3 = {
            actualDisp: false,
            preAppDisp: false,
            scheduleDisp: true,
            actualExcess: null,
            actualTime: null,
            preAppExcess: null,
            preAppTime: null,
            scheduleExcess: null,
            scheduleTime: null
        };
        vm.kafS00P1Params4 = {
            actualDisp: false,
            preAppDisp: false,
            scheduleDisp: true,
            actualExcess: null,
            actualTime: null,
            preAppExcess: null,
            preAppTime: null,
            scheduleExcess: null,
            scheduleTime: null
        };

        let paramsStartB = {
            appId: appDispInfoStartupOutput.appDetailScreenInfo.application.appID,
            infoStartup: appDispInfoStartupOutput,
        };

        vm.$http.post('at', API.startDetailBScreen, paramsStartB).then((res: any) => {
            vm.params.appDetail = res.data;
            vm.cancelAtr = res.data.lateEarlyCancelAppSet.cancelAtr;
            vm.managementMultipleWorkCycles = appDispInfoStartupOutput.appDispInfoNoDateOutput.managementMultipleWorkCycles;

            vm.params.appDetail.arrivedLateLeaveEarly.lateOrLeaveEarlies.forEach((item) => {
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

            const opAchievementDetail = _.isEmpty(appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst)
                ? null
                : appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail;

            vm.params.appDetail.arrivedLateLeaveEarly.lateCancelation.forEach((item) => {
                if (item.workNo == 1 && item.lateOrEarlyClassification == 0) {
                    vm.time.attendanceTime = opAchievementDetail && opAchievementDetail.trackRecordAtr == 0 ? opAchievementDetail.opWorkTime : null;
                }
                if (item.workNo == 1 && item.lateOrEarlyClassification == 1) {
                    vm.time.leaveTime = opAchievementDetail && opAchievementDetail.trackRecordAtr == 0 ? opAchievementDetail.opLeaveTime : null;
                }
                if (item.workNo == 2 && item.lateOrEarlyClassification == 0) {
                    vm.time.attendanceTime2 = opAchievementDetail && opAchievementDetail.trackRecordAtr == 0 ? opAchievementDetail.opWorkTime2 : null;
                }
                if (item.workNo == 2 && item.lateOrEarlyClassification == 1) {
                    vm.time.leaveTime2 = opAchievementDetail && opAchievementDetail.trackRecordAtr == 0 ? opAchievementDetail.opDepartureTime2 : null;
                }
            });

            //update component S00 P1
            if (opAchievementDetail != null) {
                const {opWorkTime, opLeaveTime, opWorkTime2, opDepartureTime2, trackRecordAtr} = opAchievementDetail;
                const {scheAttendanceTime1, scheAttendanceTime2, scheDepartureTime1, scheDepartureTime2} = opAchievementDetail.achievementEarly;
                vm.kafS00P1Params1.scheduleTime = scheAttendanceTime1;
                vm.kafS00P1Params2.scheduleTime = scheDepartureTime1;
                vm.kafS00P1Params3.scheduleTime = scheAttendanceTime2;
                vm.kafS00P1Params4.scheduleTime = scheDepartureTime2;

                if (trackRecordAtr == 0) {
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
            vm.$emit('loading-complete');
        }).catch((error) => {
            vm.$modal.error(error);
        });
    }

    get displayCancelText() {
        const vm = this;

        return vm.params.appDispInfoStartupOutput.appDetailScreenInfo.application.prePostAtr == 1
            && (vm.cancelAtr == 1 || vm.cancelAtr == 2);
    }

}

const API = {
    startDetailBScreen: 'at/request/application/lateorleaveearly/initPageB',
};

interface IAppDetail {
    appDispInfoStartupOutput: IAppDispInfoStartupOutput;
    arrivedLateLeaveEarly: IArrivedLateLeaveEarly;
    earlyInfos: IEarlyInfos;
    info: string;
    lateEarlyCancelAppSet: ILateEarlyCancelAppSet;

}

interface ILateEarlyCancelAppSet {
    cancelAtr: 0 | 1 | 2;
    companyId: string;
}