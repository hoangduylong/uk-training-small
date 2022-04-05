import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentscontrolsinput-time',
    route: {
        url: '/controls/input-time',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    },
    validations : {
        timeWithDay : {
            required: true,
            min : -60,
            max : 1380,
            valueType: 'Clock'
        },
        timePoint : {
            min : -60,
            max : 1380,
            valueType: 'TimePoint'
        },
        timeDuration : {
            required: true,
            min : -60,
            max : 1380,
            valueType: 'Duration'
        }

    }
})
export class DocumentsControlsInputTimeComponent extends Vue {

    public timeWithDay: number = null;

    public timePoint: number = null;

    public timeDuration: number = null;

    public validate() {
        this.$validate();

    }
    

}