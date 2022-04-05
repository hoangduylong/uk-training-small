import { Vue } from '@app/provider';
import { component } from '@app/core/component';
import { CmmS45CComponent } from '../c/index';
import { CmmS45DComponent } from '../d/index';

@component({
    name: 'cmms45test',
    route: '/cmm/s45/test',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: [],
    components: {
        'cmms45c': CmmS45CComponent,
        'cmms45d': CmmS45DComponent
    }
})
export class CmmS45TestComponent extends Vue {
    public title: string = 'CmmS45Test';
    public text: string = 'sample';

    private gotoCMMS45C() {
        let self = this;
        self.$modal('cmms45c', { 'listAppMeta': [self.text], 'currentApp': self.text });
    }

    private gotoCMMS45D() {
        let self = this;
        self.$modal('cmms45d', { 'listAppMeta': [self.text], 'currentApp': self.text });
    }
}