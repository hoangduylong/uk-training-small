import { dom } from '@app/utils';
import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    name: 'documentshtmlsicons',
    route: {
        url: '/htmls/icons',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    },
    style: `.uk-icons .uk-icons-name {
        font-size: 0.75rem;
        font-family: Tahoma;
    }
    `
})
export class DocumentsHtmlsIconsComponent extends Vue {
    public size: string = '2';
    public keyword: string = '';
    public icons: Array<{ code: string; class: string; }> = require('@app/components/common/font-awesome.json');

    get filtereds() {
        let kw: string = this.keyword.toUpperCase();

        if (!kw) {
            return this.icons.filter((item: { code: string; class: string; }, index: number) => index < 100);
        } else {
            return this.icons.filter((item: { code: string; class: string; }, index: number) => index < 100 && item.code.toUpperCase().indexOf(kw) > -1 || item.class.toUpperCase().indexOf(kw) > -1);
        }
    }

    private get size2Class() {
        if (['lg', 'xs', 'sm', ''].indexOf(this.size.trim()) > -1) {
            return `fa-${this.size}`;
        } else if (this.size.match(/^\d+$/)) {
            return `fa-${this.size}x`;
        } else {
            return '';
        }
    }

    public faClass(item: { code: string; class: string; }) {
        return `${item.class} ${this.size2Class}`.trim();
    }

    public searchClicked(value: string) {
        this.keyword = value.trim().toLowerCase();
    }
}