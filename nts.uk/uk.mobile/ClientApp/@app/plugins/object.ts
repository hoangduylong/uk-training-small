import { obj } from '@app/utils';
import { Vue, VueConstructor } from '@app/provider';

const tojs = {
    install(vue: VueConstructor<Vue>) {
        vue.prototype.toJS = obj.cloneObject;

        obj.extend(Vue, { toJS: obj.cloneObject });
        obj.extend(Vue, {
            vmOf: (el: HTMLElement) => {
                let vm = obj.get(el, '__vue__');

                return obj.get(vm, '$vnode.context') || vm;
            }
        });
    }
};

Vue.use(tojs);