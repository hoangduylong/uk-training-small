import { _, Vue } from '@app/provider';
import { component } from '@app/core/component';
import { CdlS02AComponent } from '../a';

@component({
    name: 'cdls02test',
    route: '/cdl/s02/test',
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: []
})
export class CdlS02TestComponent extends Vue {
    public title: string = 'CdlS02Test';
    public data = {
        isDisplayClosureSelection: false,
        isShowNoSelectRow: false,
        selectedCode: '',        
    };
    public selectedName: string = '';


    public openCdls02() {
        let self = this;
        self.$modal(CdlS02AComponent, self.data).then((result: any) => {
            if (result == 'back') {
                return;
            }
            self.data.selectedCode = result.code;
            self.selectedName = result.name;
        });
    }
}