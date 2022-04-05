import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'kafsamplemultistep2',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {
        $appContext: {
            text1: {
                required: true
            },
        }
    },
    constraints: []
})
export class KafSampleMultiStep2Component extends Vue {
    public title: string = 'KafSampleMultiStep2';

    get $appContext() {
        return this.$parent;
    }
}