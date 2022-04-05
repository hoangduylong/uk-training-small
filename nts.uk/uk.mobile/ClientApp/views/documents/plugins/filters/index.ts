import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentspluginsfilters',
    route: {
        url: '/plugins/filters',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }
})
export class DocumentsPluginsFiltersComponent extends Vue {
    get daterange() {
        let now = new Date();

        return {
            start: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            end: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
        };
    }
}