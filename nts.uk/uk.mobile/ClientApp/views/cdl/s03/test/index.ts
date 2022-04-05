import { Vue } from '@app/provider';
import { component } from '@app/core/component';
import { CdlS03AComponent } from '../a';
import * as _ from 'lodash';

@component({
    name: 'cdls03test',
    route: '/cdl/s03/test',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class CdlS03TestComponent extends Vue {
    public title: string = 'CdlS03Test';
    public returnCode: string = null;
    public data = {
        isShowNoSelectRow: false,
        selectedCode: '0000000001',
        selectedName: ''
    };

    public openCdlS03A() {
        let self = this;
        self.$modal(CdlS03AComponent, self.data).then((result: any) => {
            if (_.isUndefined(result)) {
                return;
            }
            self.data.selectedCode = result.code; 
            self.data.selectedName = result.name;     
        });
    }
}