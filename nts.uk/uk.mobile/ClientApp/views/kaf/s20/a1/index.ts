import { _, Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { IOptionalItemAppSet } from '../a/define';
import { KafS20ModalComponent } from '../modal';

@component({
    name: 'kafs20a1',
    route: '/kaf/s20/a1',
    style: require('./style.scss'),
    template: require('./index.vue'),
    components: {
        'ModalDescription': KafS20ModalComponent
    },
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class KafS20A1Component extends Vue {
    public title: string = 'KafS20A1';
    public optionalItemAppSets: IOptionalItemAppSet[] = [];

    @Prop({ default: () => true })
    public readonly mode!: boolean;

    public beforeCreate() {
        const vm = this;

    }

    public created() {
        const vm = this;

        vm.$mask('show');
        vm.$http.post('at', API.startA1Screen).then((res: any) => {
            vm.$mask('hide');
            let data = res.data;
            if (data && data.length) {
                data = _.sortBy(data, 'code');
                vm.optionalItemAppSets = data;
            }
            if (vm.optionalItemAppSets.length == 0) {
                vm.$modal.error({messageId: 'Msg_1694',messageParams: []});
            } 
            if (vm.optionalItemAppSets.length == 1) {
                vm.nextToStep2(vm.optionalItemAppSets[0]);
            }
        });


    }

    public nextToStep2(item: IOptionalItemAppSet) {
        const vm = this;

        vm.$emit('nextToStep2', item);
    }

    public showDescription(item) {
        const vm = this;

        vm.$modal('ModalDescription', item, { size: 'sm', animate: 'left', type: 'dropback' })
            .then(() => {

            });
    }
}

const API = {
    startA1Screen: 'ctx/at/request/application/optionalitem/optionalItemAppSetting',
};