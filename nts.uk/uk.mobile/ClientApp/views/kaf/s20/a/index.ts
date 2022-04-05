import { Vue } from '@app/provider';
import { component, Prop, Watch } from '@app/core/component';
import { StepwizardComponent } from '@app/components';
import { KafS20A1Component } from '../a1';
import { KafS20A2Component } from '../a2';
import { KafS20CComponent } from '../c';
import { IOptionalItemAppSet, IParams } from './define';
import { IRes } from '../../s04/a/define';

@component({
    name: 'kafs20a',
    route: '/kaf/s20/a',
    style: require('./style.scss'),
    template: require('./index.vue'),
    components: {
        'step-wizard': StepwizardComponent,
        'kaf-s20-a1': KafS20A1Component,
        'kaf-s20-a2': KafS20A2Component,
        'kaf-s20-c': KafS20CComponent,
    },
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class KafS20AComponent extends Vue {
    public title: string = 'KafS20A';
    public step: string = 'KAFS20_10';
    public settingItems: IOptionalItemAppSet = null;
    public mode: boolean = true;
    public response: IRes = null;
    public _params: any = null;
    
    @Prop()
    public readonly params: IParams;
    @Watch('step', {deep: true})
    public watchStep(data: any) {
        const vm = this;

        if (data === 'KAFS20_10') {
            vm.pgName = 'kafs20a1';
        } else if (data == 'KAFS20_11') {
            vm.pgName = 'kafs20a2';
        } else if (data == 'KAFS20_12') {
            vm.pgName = 'kafs20c';
        }
        
    }

    public beforeCreate() {
        const vm = this;

    }

    public created() {
        const vm = this;
        if (vm.params) {
            vm.$mask('show');
            vm.$http
            .post('at',API.getItemSetting, vm.params.appDetail.application.code)
            .then((res: {data: IOptionalItemAppSet}) => {
                vm.handleNextToStep2(res.data);
            }).catch((err) => {
                vm.$modal.error(err);
            });
            vm.mode = false;
            vm._params = vm.params;
        }
    }

    public handleNextToStep2(item: IOptionalItemAppSet) {
        const vm = this;

        vm.step = 'KAFS20_11';
        vm.settingItems = item;
    }

    public handleBackToStep1() {
        const vm = this;

        vm.step = 'KAFS20_10';
    }

    public handleNextToStep3(res: IRes) {
        const vm = this;

        vm.response = res;
        vm.step = 'KAFS20_12';
    }

    public handleBackToStepTwo(res) {
        const vm = this;

        vm._params = res;
        vm.mode = false;
        vm.step = 'KAFS20_11';
    }
}

const API = {
    getItemSetting: 'at/request/setting/company/applicationapproval/optionalitem/findone'
};