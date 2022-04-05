import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentscontrolscheckbox',
    route: {
        url: '/controls/checkbox',
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
export class DocumentsControlsCheckboxComponent extends Vue {   
    // don't use v-for
    public checked1s: Array<number> = [1, 3];

    // use v-for
    public datasource = [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' },
        { id: 4, name: 'Option 4' }
    ];
    public checked2s: Array<number> = [2, 4];
}