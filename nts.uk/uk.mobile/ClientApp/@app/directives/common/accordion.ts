import { obj, dom, browser } from '@app/utils';
import { Vue, DirectiveBinding } from '@app/provider';
import { Language } from '@app/plugins/i18n';

const toggleDisable = (container: HTMLElement, disable?: { next?: boolean; preview?: boolean }) => {
    let show = container.querySelector('.card.show'),
        cards = container.querySelectorAll('.card'),
        prev = container.querySelector('.accordion-prev'),
        next = container.querySelector('.accordion-next');

    if (prev) {
        if (show == cards[0]) {
            prev.setAttribute('disabled', 'disabled');
        } else {
            if (!disable || !disable.preview) {
                prev.removeAttribute('disabled');
            }
        }
    }

    if (next) {
        if (show == cards[cards.length - 1]) {
            next.setAttribute('disabled', 'disabled');
        } else {
            if (!disable || !disable.next) {
                next.removeAttribute('disabled');
            }
        }
    }
}, accordion = {
    bind(container: HTMLElement, binding: DirectiveBinding) {
        let value: {
            text?: {
                next?: string;
                preview?: string;
            },
            disable?: {
                next?: boolean;
                preview?: boolean;
            }
        } | undefined = binding.value;

        // Bắt sự kiện click vào element đặt directive
        container.addEventListener('click', (evt: MouseEvent) => {
            let title = evt.target as HTMLElement;

            // Tìm title của các group, nếu thấy và đúng định dạng
            if (title) {
                if (dom.hasClass(title, 'btn-link')) {
                    let card = title.closest('.card') as HTMLElement,
                        cards = container.querySelectorAll('.card');

                    // tìm thẻ chứa cả title và body của một collapse
                    if (card) {
                        // kiểm tra trạng thái đang đóng hay mở
                        let showOrHide = dom.hasClass(card, 'show');
                        
                        // đóng tất cả các body khác
                        [].slice.call(cards).forEach((element: HTMLElement) => {
                            dom.removeClass(element, 'show');
                        });

                        // nếu là trạng thái đóng thì mở lại body được click (bằng title)
                        if (!showOrHide || dom.hasClass(container, 'accordion-steps')) {
                            dom.addClass(card, 'show');
                        }
                    }
                } else if (title.classList.contains('accordion-prev')) {
                    let show = container.querySelector('.card.show') as HTMLElement;

                    if (show) {
                        let before = show.previousSibling as HTMLElement;

                        if (before && dom.hasClass(before, 'card')) {
                            dom.addClass(before, `show animated ${browser.mp ? 'slideInLeft' : 'fadeIn'}`);
                            dom.removeClass(show, `show animated ${browser.mp ? 'slideInLeft' : 'fadeIn'}`);
                        }
                    }
                } else if (title.classList.contains('accordion-next')) {
                    let show = container.querySelector('.card.show') as HTMLElement;

                    if (show) {
                        let after = show.nextSibling as HTMLElement;

                        if (after && dom.hasClass(after, 'card')) {
                            dom.addClass(after, `show animated ${browser.mp ? 'slideInRight' : 'fadeIn'}`);
                            dom.removeClass(show, `show animated ${browser.mp ? 'slideInRight' : 'fadeIn'}`);
                        }
                    }
                }
            }

            toggleDisable(container, value && value.disable);
        });

        if (!obj.isEmpty(value)) {
            dom.addClass(container, 'accordion-steps');


            if (obj.isEmpty(value.text)) {
                value.text = {};

                if (!value.text.next) {
                    value.text.next = 'next';
                }

                if (!value.text.preview) {
                    value.text.preview = 'preview';
                }
            }
        }

        if (dom.hasClass(container, 'accordion-steps')) {
            let prev = dom.create('button', {
                class: 'btn btn-primary accordion-prev',
                html: `<i class="fa fa-arrow-left mr-1 accordion-prev"></i>${Language.i18n(value.text.preview)}`
            }), next = dom.create('button', {
                class: 'btn btn-primary accordion-next ml-3',
                html: `${Language.i18n(value.text.next)}<i class="fa fa-arrow-right ml-1 accordion-next"></i>`
            }), btngroup = dom.create('div', {
                class: 'text-right mt-1'
            });

            Language.watch((lng: string) => {
                prev.innerHTML = `<i class="fa fa-arrow-left mr-1 accordion-prev"></i>${Language.i18n(value.text.preview)}`;
                next.innerHTML = `${Language.i18n(value.text.next)}<i class="fa fa-arrow-right ml-1 accordion-next"></i>`;
            });

            btngroup.appendChild(prev);
            btngroup.appendChild(next);

            container.appendChild(btngroup);

            if (!container.querySelector('.card.show')) {
                let first = container.querySelector('.card') as HTMLElement;

                if (first) {
                    dom.addClass(first, 'show');
                }
            }
        }
    }, update(el: HTMLElement, binding: DirectiveBinding) {
        let value: {
            disable?: {
                next?: boolean;
                preview?: boolean;
            }
        } | undefined = binding.value;

        if (value && value.disable) {
            let dab = value.disable,
                next = el.querySelector('.btn.accordion-next'),
                preview = el.querySelector('.btn.accordion-prev');

            if (next) {
                if (!dab.next) {
                    next.removeAttribute('disabled');
                } else {
                    next.setAttribute('disabled', 'disabled');
                }
            }

            if (preview) {
                if (!dab.preview) {
                    preview.removeAttribute('disabled');
                } else {
                    preview.setAttribute('disabled', 'disabled');
                }
            }
        }

        toggleDisable(el, value && value.disable);
    }
};

// khai báo directive là dạng global
Vue.directive('nts-accordion', accordion);