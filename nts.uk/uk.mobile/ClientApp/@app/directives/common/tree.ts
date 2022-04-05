import { dom } from '@app/utils';
import { Vue, DirectiveBinding, VNode } from '@app/provider';

interface IHierarchy {
    show: boolean;
    rank: number;
    childs: any[];
    collapse: boolean;
}

const bind = (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) => {
    let item: { $h: IHierarchy } = binding.value;

    unbind(el);

    if (item && item.$h) {
        // init indent class
        dom.addClass(el, `indent-${(item.$h.rank || 0) + 1}`);

        if (!item.$h.show) {
            dom.addClass(el, 'd-none');
        } else {
            dom.removeClass(el, 'd-none');
        }

        if (item.$h.childs.length && el.getAttribute('single') !== 'true') {
            let $col = dom.create('i', {
                class: `fas ${item.$h.collapse ? 'fa-chevron-down' : 'fa-chevron-right'} collapse`
            });

            el.prepend($col);

            let event = () => {
                item.$h.collapse = !item.$h.collapse;

                // update component
                if (vnode.context) {
                    vnode.context.$forceUpdate();
                }

                if (item.$h.collapse) {
                    dom.setAttr($col, 'class', 'fas fa-chevron-down collapse');
                } else {
                    dom.setAttr($col, 'class', 'fas fa-chevron-right collapse');
                }
            };

            dom.data.set(el, '_havy_c_evt', event);

            dom.registerEventHandler($col, 'click', event);
        }
    }
}, unbind = (el: HTMLElement) => {
    let collapse = el.querySelector('.fas.collapse') as HTMLElement;

    if (collapse) {
        el.removeChild(collapse);

        dom.removeEventHandler(collapse, 'click', dom.data.get(el, '_havy_c_evt'));
    }

    dom.removeClass(el, [...Array(11).keys()].join(' indent-'));
};

Vue.directive('tree', {
    inserted: bind,
    componentUpdated: bind,
    unbind
});