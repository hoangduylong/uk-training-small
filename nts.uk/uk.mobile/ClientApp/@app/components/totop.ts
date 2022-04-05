import { dom } from '@app/utils';
import { Vue } from '@app/provider';
import { component } from '@app/core/component';

@component({
    template: `<div class="totop" v-bind:class="{ 'show': show }" v-on:click="scrollToTop"><i class="fas fa-arrow-up"  v-on:click="scrollToTop"></i></div>`,
})
export class TotopComponent extends Vue {
    public show: boolean = false;

    public mounted() {
        let self = this;
        dom.data.set(document.body, '__scroll_top', (evt: Event) => {
            if (window.scrollY > 60) {
                self.show = true;
            } else {
                self.show = false;
            }
        });

        window.addEventListener('scroll', dom.data.get(document.body, '__scroll_top'));
    }

    public destroyed() {
        window.removeEventListener('scroll', dom.data.get(document.body, '__scroll_top'));
    }

    public scrollToTop() {
        let _scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;

            if (c > 0) {
                window.requestAnimationFrame(_scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };

        _scrollToTop();
    }
}