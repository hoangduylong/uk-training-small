import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentscontrolsinput-date-range',
    route: { 
        url: '/controls/input-date-range',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    },
    validations: {
        dateRange: {
            required: true,
            dateRange: true
        }
    }
})
export class DocumentsControlsInputDateRangeComponent extends Vue {
    public dateRange: { start?: Date; end?: Date } = {
        // start: date.from('2017-02-28', 'yyyy-mm-dd', true),
        // end: date.from('2019-02-28', 'yyyy-mm-dd', true)
    };

    public validate() {
        this.$validate();
    }
}