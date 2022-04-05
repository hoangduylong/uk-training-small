import { Vue } from '@app/provider';
import { component } from '@app/core/component';
import { KafS00AComponent, KafS00BComponent, KafS00CComponent } from 'views/kaf/s00';

@component({
    name: 'kafsamplemultistep1',
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
    constraints: [],
    components: {
        'kafs00-a': KafS00AComponent,
        'kafs00-b': KafS00BComponent,
        'kafs00-c': KafS00CComponent
    },
})
export class KafSampleMultiStep1Component extends Vue {

    get $appContext(): any {
        return this.$parent;
    }
}