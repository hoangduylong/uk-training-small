import { Vue } from '@app/provider';
import { component } from '@app/core/component';
import { date } from '@app/utils';

@component({
    name: 'documentscontrolsinput-date',
    route: {
        url: '/controls/input-date',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    },
    validations: {
        date: {
        }
    }
})
export class DocumentsControlsInputDateComponent extends Vue {
    public date: Date = null; //date.from('2019-02-28', 'yyyy-mm-dd', true);

    public validate() {
        this.$validate();
    }
}