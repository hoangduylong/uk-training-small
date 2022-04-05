import { _, Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { KafS00CComponent } from 'views/kaf/s00/c';
import { KafS12AComponent } from 'views/kaf/s12/a';
import { ReflectSetting, TimeLeaveManagement, TimeLeaveRemaining, KafS12ApplyTimeComponent, TimeLeaveAppDetail, LeaveType, AppTimeType } from '../shr';
import {Watch} from 'vue-property-decorator';

@component({
    name: 'kafs12a2',
    route: '/kaf/s12/a2',
    style: require('./style.scss'),
    template: require('./index.vue'),
    components: {
        'kafs00c': KafS00CComponent,
        'kafs12-apply-time': KafS12ApplyTimeComponent,
    },
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class KafS12A2Component extends Vue {
    @Prop({ default: true })
    public readonly newMode: boolean;
    @Prop({ default: null })
    public readonly appDispInfoStartupOutput: any;
    @Prop({ default: null })
    public readonly reflectSetting: ReflectSetting;
    @Prop({ default: null })
    public readonly timeLeaveManagement: TimeLeaveManagement;
    @Prop({ default: null })
    public readonly timeLeaveRemaining: TimeLeaveRemaining;
    @Prop({ default: [] })
    public readonly details: Array<TimeLeaveAppDetail>;

    public isValidateAll: boolean = true;
    public applyTimeData: Array<any> = [];
    public specialLeaveFrame: number = null;

    public created() {
        const vm = this;
        const appTimeTypeNames = ['KAFS12_20', 'KAFS12_26', 'KAFS12_27', 'KAFS12_28', 'KAFS12_29', 'KAFS12_30'];
        for (let i = 0; i < 6; i ++) {
            vm.applyTimeData.push({
                appTimeType: i,
                appTimeTypeName: appTimeTypeNames[i],
                substituteAppTime: 0,
                annualAppTime:  0,
                childNursingAppTime: 0,
                nursingAppTime: 0,
                super60AppTime: 0,
                specialAppTime: 0,
            });
        }
        if (!_.isEmpty(vm.details)) {
            vm.details.forEach((i) => {
                vm.specialLeaveFrame = vm.specialLeaveFrame || i.applyTime.specialLeaveFrameNo;
                vm.applyTimeData[i.appTimeType].substituteAppTime = i.applyTime.substituteAppTime;
                vm.applyTimeData[i.appTimeType].annualAppTime = i.applyTime.annualAppTime;
                vm.applyTimeData[i.appTimeType].childNursingAppTime = i.applyTime.childCareAppTime;
                vm.applyTimeData[i.appTimeType].nursingAppTime = i.applyTime.careAppTime;
                vm.applyTimeData[i.appTimeType].super60AppTime = i.applyTime.super60AppTime;
                vm.applyTimeData[i.appTimeType].specialAppTime = i.applyTime.specialAppTime;
            });
        }
        vm.$watch('timeLeaveManagement', (newVal, oldVal) => {
            if (!oldVal && newVal) {
                if (newVal.timeSpecialLeaveMng.listSpecialFrame && newVal.timeSpecialLeaveMng.listSpecialFrame.length > 0) {
                    vm.specialLeaveFrame = newVal.timeSpecialLeaveMng.listSpecialFrame[0].specialHdFrameNo;
                }
            }
        });
    }

    get $appContext(): KafS12AComponent {
        const self = this;

        return self.$parent as KafS12AComponent;
    }

    @Watch('$appContext.calculatedData')
    public calculatedDataWatcher(value: any) {
        const vm = this;
        if (vm.$appContext.timeLeaveType != LeaveType.COMBINATION) {
            vm.applyTimeData.forEach((applyTime) => {
                switch (applyTime.appTimeType) {
                    case AppTimeType.ATWORK:
                        vm.setCalculatedData(vm.$appContext.timeLeaveType, value.timeBeforeWork1, applyTime);
                        break;
                    case AppTimeType.OFFWORK:
                        vm.setCalculatedData(vm.$appContext.timeLeaveType, value.timeAfterWork1, applyTime);
                        break;
                    case AppTimeType.ATWORK2:
                        vm.setCalculatedData(vm.$appContext.timeLeaveType, value.timeBeforeWork2, applyTime);
                        break;
                    case AppTimeType.OFFWORK2:
                        vm.setCalculatedData(vm.$appContext.timeLeaveType, value.timeAfterWork2, applyTime);
                        break;
                    case AppTimeType.PRIVATE:
                        vm.setCalculatedData(vm.$appContext.timeLeaveType, value.privateOutingTime, applyTime);
                        break;
                    case AppTimeType.UNION:
                        vm.setCalculatedData(vm.$appContext.timeLeaveType, value.unionOutingTime, applyTime);
                        break;
                    default:
                        break;
                }
            });
        }
    }

    private setCalculatedData(timeLeaveType: number, calculatedValue: number, applyTime: any) {
        switch (timeLeaveType) {
            case LeaveType.SUBSTITUTE:
                applyTime.substituteAppTime = calculatedValue;
                break;
            case LeaveType.ANNUAL:
                applyTime.annualAppTime = calculatedValue;
                break;
            case LeaveType.CHILD_NURSING:
                applyTime.childNursingAppTime = calculatedValue;
                break;
            case LeaveType.NURSING:
                applyTime.nursingAppTime = calculatedValue;
                break;
            case LeaveType.SUPER_60H:
                applyTime.super60AppTime = calculatedValue;
                break;
            case LeaveType.SPECIAL:
                applyTime.specialAppTime = calculatedValue;
                break;
            default:
                break;
        }
    }

    public handleChangeSpecialLeaveFrame(value: number) {
        const vm = this;
        if (vm.specialLeaveFrame !== value) {
            vm.specialLeaveFrame = value;
            vm.$mask('show');
            const params = {
                specialLeaveFrameNo: value,
                timeLeaveAppDisplayInfo: {
                    appDispInfoStartupOutput: vm.appDispInfoStartupOutput,
                    timeLeaveManagement: vm.timeLeaveManagement,
                    timeLeaveRemaining: vm.timeLeaveRemaining,
                    reflectSetting: vm.reflectSetting
                }
            };
            params.timeLeaveAppDisplayInfo.timeLeaveRemaining.remainingStart = new Date(params.timeLeaveAppDisplayInfo.timeLeaveRemaining.remainingStart).toISOString();
            params.timeLeaveAppDisplayInfo.timeLeaveRemaining.remainingEnd = new Date(params.timeLeaveAppDisplayInfo.timeLeaveRemaining.remainingEnd).toISOString();
            vm.$http.post('at', API.changeSpecialFrame, params).then((res: any) => {
                if (res) {
                    vm.timeLeaveRemaining.specialTimeFrames = res.data.timeLeaveRemaining.specialTimeFrames;
                }
                vm.$mask('hide');
            }).catch((error: any) => {
                vm.$modal.error(error).then(() => {
                    vm.$mask('hide');
                });
            });
        }
    }

    public nextToStep3() {
        const vm = this;
        vm.isValidateAll = true;
        for (let child of vm.$children) {
            child.$validate();
            if (!child.$valid) {
                vm.isValidateAll = false;
            }
        }
        vm.$validate();
        if (!vm.$valid || !vm.isValidateAll) {
            return;
        }
        vm.$emit('next-to-step-three', vm.applyTimeData, vm.specialLeaveFrame);
    }

    public backToStepOne() {
        const vm = this;
        vm.$emit('back-to-step-one');
    }
}

const API = {
    changeSpecialFrame: 'at/request/application/timeLeave/changeSpecialFrame',
};