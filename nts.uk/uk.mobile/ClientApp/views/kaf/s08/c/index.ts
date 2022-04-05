import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import {KafS00DComponent} from '../../s00/d';
import { ScreenMode } from 'views/kaf/s00/b';

@component({
    name: 'kafs08c',
    route: '/kaf/s08/c',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    components : {
        'kafs00d' : KafS00DComponent
    },
    constraints: []
})
export class KafS08CComponent extends Vue {

    public kafS00DParams: any = null;
    public params?: any;
    
    @Prop({ }) public readonly mode!: boolean;

    @Prop({default : ' '}) public readonly appID!: string;

    public created() {
        const vm = this;
        vm.kafS00DParams = {
            mode : vm.mode == true ? ScreenMode.NEW : ScreenMode.DETAIL,
            appID : vm.appID
        };
    }

    public BackToStepOne(res: any) {
        const vm =this;
        vm.$emit('backToStepOne', res);
    }
}
