import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentscontrolslabel',
    route: { 
        url: '/controls/label',
        parent: '/documents'
    },
    template: require('./index.vue'),
    style: require('./style.scss'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }
})
export class DocumentsControlsLabelComponent extends Vue { }