import { Vue } from '@app/provider';

import { menu } from '@app/utils/menu';
import { SideMenu } from '@app/services';
import { component } from '@app/core/component';

@component({
    route: '/documents',
    template: `<div>
        <div class="markdown-content" v-bind:class="{ 'mb-2': showQuote }">
            <h5 v-on:click="() => showQuote = !showQuote">
                {{'show_or_hide_qt' | i18n}}
                <i class="ml-2 fas fa-angle-down" v-bind:class="{ 'fas fa-angle-up': showQuote, 'fas fa-angle-down': !showQuote }"></i>
            </h5>
            <div v-bind:class="{ 'd-none': !showQuote }">
                <blockquote class="text-justify">{{ 'uk_quote' | i18n }}</blockquote>
                <blockquote class="text-justify">{{ 'uk_comment' | i18n }}</blockquote>
                <blockquote class="text-justify">{{ 'uk_comment_docs' | i18n }}</blockquote>
            </div>
            <hr class="mt-0"/>
        </div>
        <div class="mb-2">
            <h5>{{'important_document' | i18n}}</h5>
            <router-link to="/documents/plugins/i18n" class="mr-2">{{'i18n' | i18n}}</router-link>|
            <!--<router-link to="/documents/component/basic" class="ml-2 mr-2">{{'view_viewmodel' | i18n}}</router-link> | -->
            <router-link to="/documents/plugins/router" class="ml-2 mr-2">{{'routing' | i18n}}</router-link> |
            <a class="ml-2" target="_blank" href="https://getbootstrap.com/docs/4.2/getting-started/introduction/">Bootstrap</a>
            <hr />
        </div>
        <h2 class="mb-2">{{ pgName | i18n }}</h2>
        <router-view />
    </div>`,
    style: `#document_index { margin-bottom: 15px; }`,
    resource: {
        vi: {
            documents: 'Tài liệu',
            MarkdownComponent: 'Markdown',
            'i18n': 'Đa ngôn ngữ',
            'html': 'Mã HTML',
            'show_or_hide_qt': 'Lời ngỏ',
            'routing': 'Điều hướng trang',
            'plugins': 'Trình cắm (Plugin)',
            'components': 'Thành phần (view)',
            'filters': 'Bộ lọc (Filter)',
            'controls': 'Các điều khiển (Control)',
            'directives': 'Các chỉ định (Directive)',
            'important_document': 'Những mục tài liệu quan trọng',
            'sample': 'Ví dụ',
            'uk_quote': `Khác với triết lý thiết kế của UK, UK mobile được sáng tạo ra bởi những con người tâm huyết và có tầm nhìn chiến lược rộng mở. Chính vì thế, UK mobile là sản phẩm đầu tiên hướng đến việc trao quyền thiết kế tổng thể một giao diện chương trình vào tay các developer.`,
            'uk_comment': 'Đội ngũ thiết kế (30%), đội ngũ xây dựng core (10%) và các developers (60%) là những người quyết định chất lượng của sản phẩm này. Chính vì điều ấy, kính mong tất cả mọi người hãy làm việc bằng tâm huyết và tư duy của những người sáng tạo để chúng ta có thể có được một sản phẩm tốt trao tới tận tay người sử dụng. Chân thành cảm ơn mọi người!',
            'uk_comment_docs': 'Tài liệu này viết ra để mọi người hiểu rõ hơn và code tốt hơn, rất mong mọi người đọc kỹ tài liệu trước khi hỏi bất cứ một câu hỏi nào liên quan tới những vấn đề đã được đề cập trong tài liệu.'
        },
        jp: {
            documents: 'Documents',
            MarkdownComponent: 'Markdown',
            'html': 'HTML',
            'plugins': 'Plugin',
            'components': 'Component',
            'filters': 'Filter',
            'controls': 'Control',
            'directives': 'Directive',
            'important_document': 'Important documents',
            'sample': 'サンプル',
            'uk_quote': ``,
            'uk_comment': '',
            'uk_comment_docs': ''
        }
    }
})
export class DocumentIndex extends Vue {
    public items: Array<any> = [];
    public showQuote: boolean = false;

    public mounted() {
        this.items = SideMenu.items;

        SideMenu.items = menu.sample;
        SideMenu.document = true;
    }

    public destroyed() {
        SideMenu.items = this.items;
        SideMenu.document = false;
    }
}