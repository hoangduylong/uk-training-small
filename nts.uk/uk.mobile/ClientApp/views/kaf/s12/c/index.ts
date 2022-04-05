import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { KafS00DComponent } from '../../s00/d';
import { ScreenMode } from '../../s00/b';

@component({
    name: 'kafs12c',
    route: '/kaf/s12/c',
    style: require('./style.scss'),
    template: require('./index.vue'),
    components: {
        'kafs00d': KafS00DComponent
    },
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class KafS12CComponent extends Vue {
    @Prop({ default: true })
    public readonly newMode: boolean;
    @Prop({ default: '' })
    public readonly appID: string;

    public kafS00DParams: IPramsS00D;

    public created() {
        const vm = this;
        vm.kafS00DParams = {
            appID: vm.appID,
            mode: vm.newMode ? ScreenMode.NEW : ScreenMode.DETAIL
        };
    }

    public backToStep1(res: any) {
        const self = this;
        self.$emit('back-to-step-one', res);
    }
}

interface IPramsS00D {
    // 画面モード
    mode: ScreenMode;
    appID: string;
}