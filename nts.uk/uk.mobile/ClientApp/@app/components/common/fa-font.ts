import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';

@component({
    template: `<i v-bind:class="className"></i>`
})
export class IconComponent extends Vue {
    @Prop({ default: () => '' })
    public readonly icon!: string;

    @Prop({ default: () => '' })
    public readonly size!: string;

    private icons: Array<{ code: string; class: string; }> = require('@app/components/common/font-awesome.json');

    private get hex2Class() {
        let i = this.icon,
            filter = (f: { code: string; class: string; }) => f.code.endsWith(i) || f.class.endsWith(i);

        return (this.icons.find(filter) || { class: '' }).class;
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

    get className() {
        return `${this.hex2Class} ${this.size2Class}`.trim();
    }
}

Vue.component('fa-font', IconComponent);