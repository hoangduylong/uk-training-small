
import { Vue, DirectiveBinding, VNode } from '@app/provider';

const nts_click = '$nts_click';

Vue.directive('click', {
    bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
        let lastPreventTime: number = new Date().getTime();

        el[nts_click] = (evt: Event) => {
            let currentPreventTime: number = new Date().getTime(),
                time: number = currentPreventTime - lastPreventTime,
                timeClick: number = binding.arg && binding.arg.match(/^\d+$/) ? Number(binding.arg) : 0;

            lastPreventTime = new Date().getTime();

            if (time > timeClick) {
                binding.value.apply(vnode.context, [evt]);
            }
        };

        el.addEventListener('click', el[nts_click]);
    },
    unbind(el: HTMLElement) {
        document.removeEventListener('click', el[nts_click]);
    }
});