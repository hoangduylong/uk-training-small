import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentscontrolstext-search-box',
    route: {
        url: '/controls/text-search-box',
        parent: '/documents'
    },
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    validations: {},
    constraints: [],
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }
})
export class DocumentsControlsTextSearchBoxComponent extends Vue {

    public manualText: string = null;

    public autoText: string = null;
    
    public searchList(value: string) {
        this.manualText = value;
    }
}