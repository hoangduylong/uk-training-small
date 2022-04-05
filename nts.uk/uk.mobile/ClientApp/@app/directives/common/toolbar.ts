import { dom } from '@app/utils';
import { Vue, DirectiveBinding } from '@app/provider';
import { NavMenu } from '@app/services';

Vue.directive('toolbar', {
    unbind(el: HTMLElement) {
        NavMenu.visible = true;

        let resize: any = dom.data.get(el, 'resize'),
            $cont = document.querySelector('.container-fluid') as HTMLElement;

        dom.removeEventHandler(window, 'resize', resize);

        if ($cont) {
            $cont.style.paddingTop = null;
        }
    },
    inserted(el: HTMLElement) {
        NavMenu.visible = false;
        dom.addClass(el, 'navbar fixed-top');

        let resize = (evt?: Event) => {
            let $cont = document.querySelector('.container-fluid') as HTMLElement;

            if ($cont) {
                $cont.style.paddingTop = (el.offsetHeight + 15) + 'px';
            }
        };

        dom.data.set(el, 'resize', resize);

        resize();

        dom.registerEventHandler(window, 'resize', resize);
    }
});