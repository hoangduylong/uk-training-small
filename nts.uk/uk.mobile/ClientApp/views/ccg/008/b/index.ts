import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';

@component({
    name: 'ccg008b',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class Ccg008BComponent extends Vue {
    
    @Prop({ default: {} })
    public readonly params: any;
    
    public title: string = 'Ccg008B';
    public content = '工事中、英国のモバイル版の次のリリースをお待ちください';

    public closeWithData() {
        this.$close({content: this.content});
    }
}