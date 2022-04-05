import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'kafs04b',
    route: '/kaf/s04/b',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class KafS04BComponent extends Vue {
    public title: string = 'KafS04B';
}