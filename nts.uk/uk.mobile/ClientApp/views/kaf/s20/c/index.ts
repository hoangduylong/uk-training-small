import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { KafS00DComponent } from '../../s00/d';
import { ScreenMode } from '../../s00/b';
import { IRes } from '../../s04/a/define';

@component({
    name: 'kafs20c',
    route: '/kaf/s20/c',
    style: require('./style.scss'),
    template: require('./index.vue'),
    components: {
        'KafS00DComponent': KafS00DComponent
    },
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class KafS20CComponent extends Vue {
    public title: string = 'KafS20C';
    public kafS00DParams: IKafS00DParams | null = null;

    @Prop({ default: () => true })
    public readonly mode!: boolean;

    @Prop({ default: () => { } })
    public readonly response!: IRes;

    public created() {
        const vm = this;

        const { response } = vm;
        const { data } = response;

        const { appIDLst } = data;

        vm.kafS00DParams = {
            appID: appIDLst[0],
            mode: vm.mode ? ScreenMode.NEW : ScreenMode.DETAIL,
        };
    }

    public handleCloseModel(res) {
        const vm = this;

        vm.$emit('backToStepTwo',res);
    }
}

export interface IKafS00DParams {
    appID: string;
    mode: ScreenMode;
}