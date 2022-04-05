import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { KafS00DComponent } from '../../s00/d';
import { KafS10Component} from '../a/index';
import { ScreenMode } from '../../s00/b';

@component({
    name: 'kafs10step3',
    route: '/kaf/s10/step3',
    style: require('./style.scss'),
    template: require('./index.vue'),
    validations: {},
    constraints: [],
    components : {
        'kafs00d' : KafS00DComponent
    }
})
export class KafS10Step3Component extends Vue {
    public title: string = 'KafS10Step3';
    public kafS00DParams: any = null;
    public params?: any;

    @Prop({ }) public readonly modeNew!: boolean;

    @Prop({default : ' '}) public readonly appId!: string;

    public created() {
        const self = this;

        if (self.$appContext.getNumb == 1) {
            self.pgName = 'kafs10step1';
        } else if (self.$appContext.getNumb == 2) {
            self.pgName = 'kafs10step2';
        } else {
            self.pgName = 'kafs10step3';
        }
        self.setParam();
    }
    get $appContext(): KafS10Component {
        const self = this;

        return self.$parent as KafS10Component;
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