import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentshtmlsaccordion',
    route: { 
        url: '/htmls/accordion',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    style: require('./style.scss'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }
})
export class DocumentsHtmlsAccordionComponent extends Vue { }