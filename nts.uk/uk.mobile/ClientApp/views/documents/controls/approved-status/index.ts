import { Vue } from '@app/provider';
import { component } from '@app/core/component';
import { ApprovedComponent } from '@app/components';

@component({
    name: 'documentscontrolsapproved-status',
    route: {
        url: '/controls/approved-status',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    },
    components: {
        'approved': ApprovedComponent
    }
})
export class DocumentsControlsApprovedStatusComponent extends Vue {
    public selected: number = 0;
}