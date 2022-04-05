import { Vue, DirectiveBinding, VNode } from '@app/provider';

Vue.directive('submit', {
    bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
        if (el.tagName === 'FORM') {
            el.setAttribute('action', '#');

            // tslint:disable-next-line: no-string-literal
            el.addEventListener('submit', el['nts-submit'] = (evt: Event) => {
                evt.preventDefault();
                evt.stopPropagation();

                if (binding.value instanceof Function) {
                    binding.value.apply(vnode.context);
                }
            });
        }
    },
    unbind(el: HTMLElement) {
        // tslint:disable-next-line: no-string-literal
        el.removeEventListener('submit', el['nts-submit']);
    }
});