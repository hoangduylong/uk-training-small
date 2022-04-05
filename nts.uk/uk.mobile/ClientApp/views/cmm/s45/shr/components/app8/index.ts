import { Vue, _ } from '@app/provider';
import { component, Prop, Watch } from '@app/core/component';
import { InitParam } from 'views/kaf/s00';
import {KafS00SubP1Component} from 'views/kaf/s00/sub/p1';
import { TimeDuration } from '@app/utils/time';

@component({
    name: 'cmms45shrcomponentsapp8',
    // style: require('./style.scss'),
    template: require('./index.vue'),
    // resource: require('./resources.json'),
    validations: {},
    constraints: [],
    components: {
        'kafs00subp1': KafS00SubP1Component,
    },
})
export class CmmS45ShrComponentsApp8Component extends Vue {
    @Prop({default: () => ({}) })
    public readonly params: InitParam;
    public calculatedData: any = null;

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
        const initParams = {
            appId: appDispInfoStartupOutput.appDetailScreenInfo.application.appID,
            appDispInfoStartupOutput
        };
        vm.$http.post('at', API.init, initParams).then((res: any) => {
            if (res) {
                vm.params.appDetail = res.data;
                vm.params.appDetail.details.forEach((data) => {
                    data.timeZones = _.sortBy(data.timeZones, ['workNo']);
                });
                const timeZones = [
                    {workNo: 1, startTime: null, endTime: null},
                    {workNo: 2, startTime: null, endTime: null}
                ];
                const outingTimeZones = [];
                res.data.details.forEach((i) => {
                    if (i.appTimeType < 4) {
                        if (i.appTimeType == 0) {
                            timeZones[0].startTime = i.timeZones[0].endTime;
                        } else if (i.appTimeType == 1) {
                            timeZones[0].endTime = i.timeZones[0].startTime;
                        } else if (i.appTimeType == 2) {
                            timeZones[1].startTime = i.timeZones[0].endTime;
                        } else if (i.appTimeType == 3) {
                            timeZones[1].endTime = i.timeZones[0].startTime;
                        }
                    } else {
                        i.timeZones.forEach((j) => {
                            outingTimeZones.push({
                                frameNo: j.workNo,
                                outingAtr: i.appTimeType,
                                startTime: j.startTime,
                                endTime: j.endTime
                            });
                        });
                    }
                });
                if (timeZones[0].startTime == null) {
                    timeZones[0].startTime = vm.params.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheAttendanceTime1;
                }
                if (timeZones[0].endTime == null) {
                    timeZones[0].endTime = vm.params.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheDepartureTime1;
                }
                if (timeZones[1].startTime == null) {
                    timeZones[1].startTime = vm.params.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheAttendanceTime2;
                }
                if (timeZones[1].endTime == null) {
                    timeZones[1].endTime = vm.params.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheDepartureTime2;
                }
                const params = {
                    timeLeaveType: 6, // COMBINATION = 6, // 組合せ利用
                    appDate: new Date(appDispInfoStartupOutput.appDetailScreenInfo.application.appDate).toISOString(),
                    appDisplayInfo: {
                        appDispInfoStartupOutput,
                        timeLeaveManagement: res.data.timeLeaveManagement,
                        timeLeaveRemaining: res.data.timeLeaveRemaining,
                        reflectSetting: res.data.reflectSetting
                    },
                    timeZones,
                    outingTimeZones
                };
                params.appDisplayInfo.timeLeaveRemaining.remainingStart = new Date(params.appDisplayInfo.timeLeaveRemaining.remainingStart).toISOString();
                params.appDisplayInfo.timeLeaveRemaining.remainingEnd = new Date(params.appDisplayInfo.timeLeaveRemaining.remainingEnd).toISOString();

                vm.$http.post('at', API.calculateTime, params).then((res: any) => {
                    if (res) {
                        vm.calculatedData = res.data;
                        vm.$emit('loading-complete');
                    }
                }).catch((error: any) => {
                    vm.$modal.error(error);
                });
            }
        }).catch((error: any) => {
            vm.$modal.error(error);
        });
    }

    public title(appTimeType: number) {
        const appTimeTypeNames = ['KAFS12_20', 'KAFS12_26', 'KAFS12_27', 'KAFS12_28', 'KAFS12_29', 'KAFS12_30'];

        return appTimeTypeNames[appTimeType];
    }

    public specialFrameName(no: number) {
        const vm = this;
        if (no != null) {
            const frame = _.find(vm.params.appDetail.timeLeaveManagement.timeSpecialLeaveMng.listSpecialFrame, (i) => i.specialHdFrameNo == no);
            if (frame) {
                return frame.specialHdFrameName;
            } else {
                return no + ' ' + vm.$i18n('KAFS12_47');
            }
        }

        return '';
    }

    public requiredTime(appTimeType: number) {
        const vm = this;
        if (vm.calculatedData) {
            switch (appTimeType) {
                case 0:
                    return TimeDuration.toString(vm.calculatedData.timeBeforeWork1, 'h');
                case 1:
                    return TimeDuration.toString(vm.calculatedData.timeAfterWork1, 'h');
                case 2:
                    return TimeDuration.toString(vm.calculatedData.timeBeforeWork2, 'h');
                case 3:
                    return TimeDuration.toString(vm.calculatedData.timeAfterWork2, 'h');
                case 4:
                    return TimeDuration.toString(vm.calculatedData.privateOutingTime, 'h');
                case 5:
                    return TimeDuration.toString(vm.calculatedData.unionOutingTime, 'h');
                default:
                    return '';
            }
        }

        return '';
    }

    public totalAppTime(applyTime: any) {
        const vm = this;

        return TimeDuration.toString(applyTime.super60AppTime + applyTime.substituteAppTime + applyTime.annualAppTime + applyTime.childCareAppTime + applyTime.careAppTime + applyTime.specialAppTime, 'h');
    }

    public scheduledTime(appTimeType: number) {
        const self = this;
        let scheduleTime = null;
        if (self.params.appDispInfoStartupOutput
            && self.params.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst
            && self.params.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail) {
            switch (appTimeType) {
                case 0:
                    scheduleTime = self.params.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheAttendanceTime1;
                    break;
                case 1:
                    scheduleTime = self.params.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheDepartureTime1;
                    break;
                case 2:
                    scheduleTime = self.params.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheAttendanceTime2;
                    break;
                case 3:
                    scheduleTime = self.params.appDispInfoStartupOutput.appDispInfoWithDateOutput.opActualContentDisplayLst[0].opAchievementDetail.achievementEarly.scheDepartureTime2;
                    break;
                default:
                    break;
            }
        }

        return {
            scheduleDisp: true,
            scheduleTime,
            scheduleExcess: 0
        };
    }

    public getTime(value: number) {
        return TimeDuration.toString(value, 'h');
    }
}

const API = {
    init: 'at/request/application/timeLeave/init',
    calculateTime: 'at/request/application/timeLeave/calculateTime'
};