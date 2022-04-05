import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentshtmlsfloat',
    route: { 
        url: '/htmls/float',
        parent: '/documents'
    },
    style: require('./style.scss'),
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }
})
export class DocumentsHtmlsFloatComponent extends Vue { }