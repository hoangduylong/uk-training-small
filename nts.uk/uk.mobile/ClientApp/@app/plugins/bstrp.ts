import { dom } from '@app/utils';
import { Vue, VueConstructor } from '@app/provider';

const bstrp = {
    install(vue: VueConstructor<Vue>) {
        vue.mixin({
            updated() {
                let root = this.$el as HTMLElement;

                if (root.nodeType != 8) {
                    // tabs
                    ((el: HTMLElement) => {
                        [].slice.call(el.querySelectorAll('.nav.nav-tabs .nav-link.active, .nav.nav-pills .nav-link.active'))
                            .forEach((link: HTMLElement) => link.click());
                    })(root);

                    // checkgroup
                    ((el: HTMLElement) => {
                        [].slice.call(el.querySelectorAll('.btn-group-toggle input'))
                            .forEach((input: HTMLInputElement) => {
                                let label = input.parentElement as HTMLElement;

                                dom.setAttr(label, 'class', 'btn btn-secondary');

                                if (label) {
                                    if (input.checked) {
                                        dom.addClass(label, 'btn-primary');
                                        dom.removeClass(label, 'btn-secondary');
                                    } else {
                                        dom.removeClass(label, 'btn-primary');
                                        dom.addClass(label, 'btn-secondary');
                                    }

                                    if (input.disabled) {
                                        dom.addClass(label, 'disabled');
                                    }
                                }
                            });
                    })(root);
                }
            }
        });

        document.addEventListener('click', function (e) {
            let clicked: HTMLElement | null = null;

            // dropdown menu
            ((evt: MouseEvent) => {
                for (let node = evt.target as HTMLElement; node != document.body; node = node.parentElement as HTMLElement) {
                    if (!node || !node.parentElement) {
                        break;
                    }

                    if (dom.getAttr(node, 'data-dismiss') == 'false') {
                        clicked = node;
                        break;
                    } else if (dom.hasClass(node, 'dropdown') || dom.hasClass(node, 'dropdown-toggle') || dom.getAttr(node, 'data-toggle') == 'dropdown') {
                        clicked = node;
                        break;
                    }
                }

                if (clicked) {
                    [].slice.call(document.querySelectorAll('.dropdown-toggle, [data-toggle="dropdown"]'))
                        .forEach((element: HTMLElement) => {
                            let parent = element.parentElement as HTMLElement,
                                dropdown = parent.querySelector('.dropdown-menu') as HTMLElement | null;

                            dom.addClass(parent, 'dropdown');
                            dom.removeClass(parent, 'dropup');

                            if (dropdown) {
                                if (clicked == element) {
                                    if (!dom.hasClass(dropdown, 'show')) {
                                        dom.addClass(dropdown, 'show');

                                        let scrollTop = window.scrollY,
                                            scrollHeight = window.innerHeight,
                                            offsetTop = parent.offsetTop + parent.clientHeight,
                                            offsetHeight = dropdown.offsetHeight;

                                        if (scrollTop + scrollHeight <= offsetTop + offsetHeight) {
                                            dom.addClass(parent, 'dropup');
                                            dom.removeClass(parent, 'dropdown');
                                        } else {
                                            dom.addClass(parent, 'dropdown');
                                            dom.removeClass(parent, 'dropup');
                                        }
                                    } else {
                                        dom.removeClass(dropdown, 'show');
                                    }
                                } else {
                                    if (!clicked || clicked.getAttribute('data-dismiss') != 'false') {
                                        dom.removeClass(dropdown, 'show');
                                    }
                                }
                            }
                        });
                } else {
                    [].slice.call(document.querySelectorAll('.dropdown-menu'))
                        .forEach((element: HTMLElement) => {
                            dom.removeClass(element, 'show');

                            let parent = element.parentElement as HTMLElement;

                            if (parent) {
                                dom.removeClass(parent, 'dropdown dropup');
                            }
                        });
                }
            })(e);

            // tabs
            ((evt: MouseEvent) => {
                let target = evt.target as HTMLElement;

                if (dom.hasClass(target, 'nav-link') && !dom.hasClass(target, 'disabled')) {
                    let parent = target.closest('.nav.nav-tabs') || target.closest('.nav.nav-pills'),
                        href = dom.getAttr(target, 'href');

                    if (parent) {
                        [].slice.call(parent.querySelectorAll('.nav-link'))
                            .forEach((element: HTMLElement) => {
                                dom.removeClass(element, 'active');
                            });

                        dom.addClass(target, 'active');

                        let siblings = parent.nextElementSibling as HTMLElement;

                        if (siblings && href.match(/#.+/)) {
                            let tab = siblings.querySelector(href) as HTMLElement;

                            [].slice.call(siblings.querySelectorAll('.tab-pane'))
                                .forEach((element: HTMLElement) => {
                                    if (tab == element) {
                                        dom.addClass(element, 'show active');
                                    } else {
                                        dom.removeClass(element, 'show active');
                                    }
                                });
                        }
                        evt.preventDefault();
                    }
                    evt.preventDefault();
                }
            })(e);

            // other event
            // checkbox & radio
            // btn-group-toggle
            ((evt: MouseEvent) => {
                let input = evt.target as HTMLElement,
                    group = input.closest('.btn-group-toggle') as HTMLElement;

                if (group && input.tagName === 'INPUT' && ['radio', 'checkbox'].indexOf(dom.getAttr(input, 'type')) > -1) {
                    [].slice.call(group.querySelectorAll('input'))
                        .forEach((element: HTMLInputElement) => {
                            let btn = element.closest('.btn') as HTMLElement;

                            if (btn) {
                                if (element.checked) {
                                    dom.addClass(btn, 'btn-primary');
                                    dom.removeClass(btn, 'btn-secondary');
                                } else {
                                    dom.removeClass(btn, 'btn-primary');
                                    dom.addClass(btn, 'btn-secondary');
                                }
                            }
                        });
                }
            })(e);

            // accordion
            ((evt: MouseEvent) => {
                let header = evt.target as HTMLElement;

                if ((dom.hasClass(header, 'card-header') || dom.hasClass(header, 'btn-link')) && dom.parents(header, '.accordion')) {
                    let accord = dom.parents(header, '.accordion'),
                        card = dom.parents(header, '.card'),
                        show = dom.hasClass(card, 'show'),
                        cards = accord.querySelectorAll('.card');

                    if (card && cards.length) {

                        if (show) {
                            dom.removeClass(card, 'show');
                        } else {
                            if (dom.getAttr(accord, 'auto-close') === 'true') {
                                [].slice.call(cards)
                                    .forEach((element: HTMLElement) => {
                                        dom.removeClass(element, 'show');
                                    });
                            }
                            dom.addClass(card, 'show');
                        }
                    }
                }
            })(e);

            // truncate text
            ((evt: MouseEvent) => {
                let trunc = evt.target as HTMLElement;

                if (dom.hasClass(trunc, 'text-truncate')) {
                    if (trunc.scrollWidth > trunc.offsetWidth) {
                        if (!dom.data.get(trunc, '__popover__')) {
                            let popover = dom.create('div', {
                                'class': 'popover bg-grey-50',
                                'html': `<div class="popover-body text-justify">${trunc.innerText}</div>`
                            }), arrow = dom.create('div', { 'class': 'arrow' }), popoverLeft: number = 0;

                            dom.registerOnceClickOutEventHandler(trunc, (evt: MouseEvent) => {
                                if (document.body.contains(popover)) {
                                    document.body.removeChild(popover);
                                    dom.data.set(trunc, '__popover__', null);
                                }
                            });

                            document.body.appendChild(popover);

                            let top: boolean = popover.offsetHeight <= trunc.offsetTop - window.scrollY;

                            if (trunc.offsetLeft + popover.offsetWidth < window.innerWidth - 15) {
                                popoverLeft = trunc.offsetLeft;
                            } else {
                                popoverLeft = window.innerWidth - popover.offsetWidth - 15;
                            }

                            if (top) {
                                dom.addClass(popover, 'bs-popover-top');
                            } else {
                                dom.addClass(popover, 'bs-popover-bottom');
                            }

                            dom.setAttr(arrow, 'style', `left: ${Math.min(trunc.offsetWidth, popover.offsetWidth) / 2 - 16}px`);
                            dom.setAttr(popover, 'style', `transform: translate3d(${popoverLeft}px, ${trunc.offsetTop - (top ? (popover.offsetHeight + 7) : -(trunc.offsetHeight + 2))}px, 0px)`);

                            popover.prepend(arrow);

                            dom.data.set(trunc, '__popover__', popover);
                            dom.data.set(popover, '__popover__', trunc);
                        } else {
                            document.body.removeChild(dom.data.get(trunc, '__popover__'));
                            dom.data.set(trunc, '__popover__', null);
                        }
                    }
                }
            })(e);
        }, false);

        window.addEventListener('scroll', (evt: Event) => {
            // toggle dropdown/dropup menu
            [].slice.call(document.querySelectorAll('.dropdown-menu.show'))
                .forEach((dropdown: HTMLElement) => {
                    let parent = dropdown.closest('.dropdown, .dropup') as HTMLElement;
                    if (parent) {

                        let scrollTop = window.scrollY,
                            scrollHeight = window.innerHeight,
                            offsetTop = parent.offsetTop,
                            offsetHeight = dropdown.offsetHeight;

                        if (scrollTop + scrollHeight <= offsetTop + offsetHeight + 35) {
                            dom.addClass(parent, 'dropup');
                            dom.removeClass(parent, 'dropdown');
                        } else {
                            dom.addClass(parent, 'dropdown');
                            dom.removeClass(parent, 'dropup');
                        }
                    }
                });

            // hide all popovers
            [].slice.call(document.querySelectorAll('body>.popover.bs-popover-top, body>.popover.bs-popover-bottom'))
                .forEach((popover: HTMLElement) => {
                    let trunc = dom.data.get(popover, '__popover__');

                    if (trunc) {
                        document.body.removeChild(popover);
                        dom.data.set(trunc, '__popover__', null);
                    }
                });
        });
    }
};

Vue.use(bstrp);