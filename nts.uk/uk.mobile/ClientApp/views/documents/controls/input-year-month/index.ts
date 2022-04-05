import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentscontrolsinput-year-month',
    style: require('./style.scss'),
    route: {
        url: '/controls/input-year-month',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    },
    validations: {
        yearMonth1: {
            required: true
        },
        yearMonth2: {
            required: false
        },
        yearMonth3: {
            required: true
        }
    }
})
export class DocumentsControlsInputYearMonthComponent extends Vue {
    public yearMonth1: number = null;

    public yearMonth2: number = null;

    public yearMonth3: number = null;

    public validate(): void {
        this.$validate();
    }
}