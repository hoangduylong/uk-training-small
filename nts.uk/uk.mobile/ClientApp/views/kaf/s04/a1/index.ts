import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { KafS00DComponent } from '../../s00/d';
import { ScreenMode } from '../../s00/b';
import {IParams} from '../a/define';

@component({
    name: 'kafs04a1',
    route: '/kaf/s04/a1',
    style: require('./style.scss'),
    template: require('./index.vue'),
    components: {
        'kaf-s00-d': KafS00DComponent
    },
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class KafS04A1Component extends Vue {
    
    public kafS00DParams: IParamS00D = null;

    @Prop({default:(): IParams => ({appID: '',mode: true,res: null})}) public readonly params: IParams;
    @Prop({default: true}) public readonly mode!: boolean;

    public created() {
        const vm = this;

        vm.initS00DComponent();
    }

    public initS00DComponent() {
        const vm = this;
        
        vm.kafS00DParams = {
            appID: vm.params.appID,
            mode: vm.params.mode ? ScreenMode.NEW : ScreenMode.DETAIL,
        };
    }

    public handleCloseModel(res) {
        const vm = this;

        vm.params.mode = false;
        vm.$emit('showComponentA', vm.params.mode,res);
    }
}


interface IParamS00D {
     // 画面モード
     mode: ScreenMode;
     // 申請ID
     appID: string;
}
