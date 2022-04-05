import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { KafS00DComponent } from 'views/kaf/s00/d';

@component({
    name: 'kafs11a1',
    route: '/kaf/s11/a1',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: [],
    components: {
        'kafs00d': KafS00DComponent
    }
})
export class KafS11A1Component extends Vue {
    @Prop({ default: null })
    public params?: any;
    // public kaf000_D_Params: any = {
    //     mode: 1,
    //     appID: ''
    // };

    // public created() {
    //     const self = this;
    //     self.kaf000_D_Params = self.params;
    // }
}