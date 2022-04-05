import { Vue } from '@app/provider';

Vue.directive('focus', {
    // directive definition
    inserted(el: HTMLInputElement) {
        setTimeout(() => {
            if (el.tabIndex > -1) {
                el.focus();
            } else {
                let focusable = el.querySelector('a, input, select, button, textarea') as HTMLElement;

                if (focusable) {
                    focusable.focus();
                }
            }
        }, 25);
    }
});