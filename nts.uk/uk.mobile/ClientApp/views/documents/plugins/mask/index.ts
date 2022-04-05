import { Vue } from '@app/provider';
import { component, Watch } from '@app/core/component';

@component({
    name: 'documentspluginsmask',
    route: {
        url: '/plugins/mask',
        parent: '/documents'
    },
    template: require('./index.vue'),
    resource: require('./resources.json'),
    markdown: {
        vi: require('./content/vi.md'),
        jp: require('./content/jp.md')
    }
})
export class DocumentsPluginsMaskComponent extends Vue {
    public messages: string[] = [];

    public timeout: number = 0;

    public showMask() {
        let self = this;

        self.timeout = 5;
        self.messages.push('mask_show');

        self.$mask('show')
            .on(() => {
                self.messages.push('mask_click');
            }, () => {
                self.messages.push('mask_hide');
            });
    }

    @Watch('timeout')
    public countdown(v: number) {
        let self = this;

        if (v >= 1) {
            setTimeout(() => {
                if (self.timeout > 0) {
                    self.timeout--;
                }
            }, 1000);
        } else {
            self.$mask('hide');
        }
    }
}