import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { IOptionalItemAppSet } from '../a/define';

@component({
    name: 'kafs20modal',
    route: '/kaf/s20/modal',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class KafS20ModalComponent extends Vue {
    public title: string = 'KafS20Modal';

    @Prop({default: null}) public readonly params!: IOptionalItemAppSet;

    public created() {
        const vm = this;

        
    }

    public closeModal() {
        const vm = this;

        vm.$close();
    }
}