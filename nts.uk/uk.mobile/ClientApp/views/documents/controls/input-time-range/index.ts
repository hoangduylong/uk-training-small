import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentscontrolsinput-time-range',
    route: { 
        url: '/controls/input-time-range',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }, 
    validations: {
        timeRangeValue1: {
            timeRange: true
        },
        timeRangeValue2: {
            timeRange: true,
            required: true
        }
    }
})
export class DocumentsControlsInputTimeRangeComponent extends Vue {

    public timeRangeValue1: { start: number, end: number} = null;
    public timeRangeValue2: { start: number, end: number} = null;

    public validate() {
        this.$validate();
    }

}