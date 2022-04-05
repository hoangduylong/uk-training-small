import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import * as _ from 'lodash';

@component({
    name: 'kafs00subp1',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class KafS00SubP1Component extends Vue {
    @Prop({ default: () => ({}) })
    public params: KAFS00P1Params;

    get preAppTime() {
        const vm = this;
        if (_.isNumber(vm.params.preAppTime)) {
            return vm.$dt.timept(vm.params.preAppTime);
        }

        return '--:--'; 
    }

    get actualTime() {
        const vm = this;
        if (_.isNumber(vm.params.actualTime)) {
            return vm.$dt.timept(vm.params.actualTime);
        }

        return '--:--'; 
    }

    get scheduleTime() {
        const vm = this;
        if (_.isNumber(vm.params.scheduleTime)) {
            return vm.$dt.timept(vm.params.scheduleTime);
        }

        return '--:--'; 
    }

    public getExcessTimeStatusClass(excessTimeStatus: ExcessTimeStatus) {
        if (!excessTimeStatus) {
            return 'uk-text-excess-time-none';
        }
        switch (excessTimeStatus) {
            case ExcessTimeStatus.ALARM: 
                return 'uk-text-excess-time-alarm';
            case ExcessTimeStatus.ERROR: 
                return 'uk-text-excess-time-error';
            default: 
                return 'uk-text-excess-time-none';
        }
    }
}

// 申請・実績区分
export enum ExcessTimeStatus {
    // 超過なし
    NONE = 0,
    // 超過アラーム
    ALARM = 1,
    // 超過エラー
    ERROR = 2
}

// 新規モード内容
export interface KAFS00P1Params {
    // 事前時間表示
    preAppDisp: boolean;
    // 事前時間
    preAppTime?: number;
    // 事前時間超過
    preAppExcess?: ExcessTimeStatus;
    // 実績時間表示
    actualDisp: boolean;
    // 実績時間
    actualTime?: number;
    // 実績時間超過
    actualExcess?: ExcessTimeStatus;
    // 予定時刻表示
    scheduleDisp: boolean;
    // 予定時刻
    scheduleTime?: number;
    // 予定時刻超過
    scheduleExcess?: ExcessTimeStatus;
}