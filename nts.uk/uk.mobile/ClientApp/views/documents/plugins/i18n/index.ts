import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentsfiltersi18n',
    route: { 
        url: '/plugins/i18n',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }
})
export class DocumentsFiltersI18nComponent extends Vue { }