import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentscomponentsview',
    route: { 
        url: '/components/view',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }
})
export class DocumentsComponentsViewComponent extends Vue { }