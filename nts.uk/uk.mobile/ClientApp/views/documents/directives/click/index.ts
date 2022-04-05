import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentsdirectivesclick',
    route: {
        url: '/directives/click',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }
})
export class DocumentsDirectivesClickComponent extends Vue {
    public results: string[] = [];

    public multiClick() {
        this.results.push('Click time: ' + new Date().toISOString());
    }
}