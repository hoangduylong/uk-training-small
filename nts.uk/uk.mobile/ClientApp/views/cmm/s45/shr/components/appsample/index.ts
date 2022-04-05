import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';
import { InitParam } from 'views/kaf/s00';

@component({
    name: 'cmms45shrcomponentsappsample',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class CmmS45ShrComponentsAppsampleComponent extends Vue {
    @Prop({default: () => ({}) }) 
    public readonly params!: InitParam;

    public created() {
        const vm = this;
        vm.$emit('loading-complete');
    }

    public toSingle() {
        const vm = this;
        vm.$goto('kafsamplesingle', vm.params);    
    }
    
    public toMulti() {
        const vm = this;
        vm.$goto('kafsamplemulti', vm.params);
    }
}