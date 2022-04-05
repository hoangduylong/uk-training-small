import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import {KafS00DComponent} from '../../s00/d';
import { KafS05Component} from '../a/index';
import { ScreenMode } from '../../s00/b';

@component({
    name: 'kafs05step3',
    route: '/kaf/s05/step3',
    style: require('./style.scss'),
    template: require('./index.vue'),
    validations: {},
    components : {
        'kafs00d' : KafS00DComponent
    },
    constraints: []
})
export class KafS05Step3Component extends Vue {
    public title: string = 'KafS05Step3';
    public kafS00DParams: any = null;
    public params?: any;

    @Prop({ }) public readonly modeNew!: boolean;

    @Prop({default : ' '}) public readonly appId!: string;

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
        self.setParam();
    }
    get $appContext(): KafS05Component {
        const self = this;

        return self.$parent as KafS05Component;
    }
    public setParam() {
        const self = this;
        self.kafS00DParams = {
            mode : self.$appContext.modeNew ? ScreenMode.NEW : ScreenMode.DETAIL,
            appID : self.$appContext.appId
        };
    }
    public backToStep1(res: any) {
        const self = this;
        self.$emit('backToStep1', res);
    }
}