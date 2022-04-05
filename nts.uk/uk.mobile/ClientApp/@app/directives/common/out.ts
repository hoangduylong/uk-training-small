
import { Vue, DirectiveBinding, VNode } from '@app/provider';

const nts_outside = '$nts_outside';

Vue.directive('out', {
    bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
        el[nts_outside] = {
            arg: binding.arg || 'click',
            handler: (evt: Event) => {
                if (!el.contains(evt.target as Node)) {
                    binding.value.apply(vnode.context, [el, evt]);
                }
            }
        };

        document.addEventListener(el[nts_outside].arg, el[nts_outside].handler);
    },
    unbind(el: HTMLElement) {
        document.removeEventListener(el[nts_outside].arg, el[nts_outside].handler);
    }
});