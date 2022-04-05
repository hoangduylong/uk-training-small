import { Vue, _ } from '@app/provider';
import { component } from '@app/core/component';
import { FixTableComponent } from '@app/components/fix-table';

@component({
    name: 'documentscontrolsfix-table',
    route: { 
        url: '/controls/fix-table',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    style: require('./style.scss'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    },
    components: {
        'fix-table': FixTableComponent
    }
})
export class DocumentsControlsFixTableComponent extends Vue { 

    public rows: Array<number> = _.range(20, 31);

    public openB() {
        console.log('Open B screen!');
    }
}