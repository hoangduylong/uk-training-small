import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentshtmlstables',
    route: { 
        url: '/htmls/tables',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }
})
export class DocumentsHtmlsTablesComponent extends Vue { }