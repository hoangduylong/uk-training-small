import { Vue, _ } from '@app/provider';
import { component } from '@app/core/component';
import { CdlS04AComponent } from '../a';
@component({
    name: 'cdls04test',
    route: '/cdl/s04/test',
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class CdlS04TestComponent extends Vue {
    public title: string = 'CdlS04Test';
    public returnCode: string = null;
    public data = {
        isShowNoSelectRow: false,
        selectedCode: '',
        date: new Date()
    };
    public result: { id: string, code: string, name: string } = {id: null, code: null, name: ''};

    public openCdlS04A() {
        let self = this;
        self.$modal(CdlS04AComponent, self.data).then((res: any) => {
            if (_.isEmpty(res)) {
                return;
            }
            self.data.selectedCode = res.code;
            self.result = res;
        });
    }
}