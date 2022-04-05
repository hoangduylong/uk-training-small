import { Vue } from '@app/provider';
import { component } from '@app/core/component';
import { TotopComponent } from '@app/components/totop';

@component({
    name: 'documentscontrolsto-top',
    route: { 
        url: '/controls/to-top',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    },
    components: {
        'to-top': TotopComponent
    }
})
export class DocumentsControlsToTopComponent extends Vue { }