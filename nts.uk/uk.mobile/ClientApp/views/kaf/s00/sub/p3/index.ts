import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import * as _ from 'lodash';

@component({
    name: 'kafs00subp3',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class KafS00SubP3Component extends Vue {
    @Prop({ default: () => ({}) })
    public params: KAFS00P3Params;

    get startTime() {
        const vm = this;
        if (_.isNumber(vm.params.startTime)) {
            return vm.$dt.timept(vm.params.startTime);
        }

        return '--:--'; 
    }

    get endTime() {
        const vm = this;
        if (_.isNumber(vm.params.endTime)) {
            return vm.$dt.timept(vm.params.endTime);   
        }

        return '--:--';
    }

    get ApplicationAchievementAtr() {
        return ApplicationAchievementAtr;
    }
}

// 申請・実績区分
export enum ApplicationAchievementAtr {
    // 申請＝０
    APPLICATION = 0,
    // 実績＝１
    ACHIEVEMENT = 1
}

// 新規モード内容
export interface KAFS00P3Params {
    // 申請・実績区分
    applicationAchievementAtr: ApplicationAchievementAtr;
    // 開始時刻
    startTime?: number;
    // 終了時刻
    endTime?: number;
}