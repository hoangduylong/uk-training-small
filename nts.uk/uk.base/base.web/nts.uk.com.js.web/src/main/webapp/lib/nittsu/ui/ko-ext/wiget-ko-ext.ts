module nts.uk.knockout.binding.widget {
    type WG_SIZE_STORAGE = {
        [name: string]: {
            set: boolean;
            value: string;
        };
    };

    @handler({
        bindingName: 'widget',
        validatable: true,
        virtual: false
    })
    export class WidgetBindingHandler implements KnockoutBindingHandler {
        init(element: HTMLDivElement, valueAccessor: () => string | KnockoutObservable<string> | { name: string; params?: any }, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext): { controlsDescendantBindings: boolean; } {
            if (element.tagName !== 'DIV') {
                element.innerText = 'Please use [div] tag as container of widget';
                return;
            }

            const accessor = valueAccessor();

            ko.computed({
                read: () => {
                    element.innerHTML = '';

                    ko.cleanNode(element);

                    const component = ko.unwrap(accessor);

                    ko.applyBindingsToNode(element, { component }, bindingContext);
                },
                disposeWhenNodeIsRemoved: element
            });

            element.removeAttribute('data-bind');
            element.classList.add('widget-container');

            return { controlsDescendantBindings: true };
        }
    }

    @handler({
        bindingName: 'widget-content',
        validatable: true,
        virtual: false
    })
    export class WidgetResizeContentBindingHandler implements KnockoutBindingHandler {
        init(element: HTMLDivElement, valueAccessor: () => number | undefined | KnockoutObservable<number | undefined>, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: nts.uk.ui.vm.ViewModel & { widget: string; }, bindingContext: KnockoutBindingContext): { controlsDescendantBindings: boolean; } {
            const $el = $(element);
            const { widget, $user } = viewModel;
            const WG_SIZE = `${$user.employeeId}.WIDGET_SIZE`;
            const mkv = new ko.ViewModel();
            const minHeight = valueAccessor();
            const key = ko.unwrap<string>(widget);

            const src: string | undefined = allBindingsAccessor.get('src');
            const def: number | undefined = allBindingsAccessor.get('default');

            if (element.tagName !== 'DIV') {
                element.innerText = 'Please use [div] tag with [widget-content] binding';

                return { controlsDescendantBindings: false };
            }

            ko.computed({
                read: () => {
                    const mh = ko.unwrap<number | undefined>(minHeight);

                    if (!mh) {
                        element.style.minHeight = '';
                    } else {
                        element.style.minHeight = `${ko.unwrap(mh)}px`;
                    }
                },
                disposeWhenNodeIsRemoved: element
            });

            if (src) {
                element.innerHTML = '';

                const frame = document.createElement('iframe');

                frame.src = src;

                element.appendChild(frame);
            }

            $el
                .removeAttr('data-bind')
                .addClass('widget-content')
                .resizable({
                    handles: 's',
                    start: () => {
                        // clear max height if resize by enduser
                        element.style.maxHeight = '';
                    },
                    stop: () => {
                        const { offsetHeight } = element;

                        if (key) {
                            mkv
                                .$window
                                .storage(WG_SIZE)
                                .then((size: WG_SIZE_STORAGE) => size || {})
                                .then((size: WG_SIZE_STORAGE) => {
                                    size[key] = {
                                        set: true,
                                        value: offsetHeight + 'px'
                                    };

                                    mkv.$window.storage(WG_SIZE, size);
                                });
                        }
                    },
                    resize: () => $el.trigger('wg.resize')
                })
                .on('wg.resize', () => {
                    const scr = $el.find('div').first();
                    const ctn = $el.closest('.widget-container');

                    if (scr) {
                        const { offsetHeight, scrollHeight } = scr.get(0);

                        if (offsetHeight < scrollHeight) {
                            ctn.addClass('has-scroll');
                        } else {
                            ctn.removeClass('has-scroll');
                        }
                    } else {
                        ctn.removeClass('has-scroll');
                    }
                })
                .find('.ui-resizable-s')
                // support quick toggle widget height
                .on('dblclick', () => {
                    const fx = element.style.height;

                    mkv
                        .$window
                        .storage(WG_SIZE)
                        .then((size: WG_SIZE_STORAGE | undefined) => size || {})
                        .then((size: WG_SIZE_STORAGE) => {
                            const height = size[key] || { value: '' };
                            const { value } = height;

                            if (fx) {
                                element.style.height = '';
                            } else {
                                element.style.height = value;
                            }

                            size[key] = { set: !fx, value };

                            mkv.$window.storage(WG_SIZE, size);
                        })
                        .always(() => $el.trigger('wg.resize'));
                });

            if (widget) {
                mkv
                    .$window
                    .storage(WG_SIZE)
                    .then((size: WG_SIZE_STORAGE) => {
                        if (size) {
                            const height = size[key];

                            if (height && height.set) {
                                element.style.maxHeight = '';
                                element.style.height = height.value;
                            } else if (def) {
                                element.style.height = `${def}px`;
                                element.style.maxHeight = `${def}px`;
                            }
                        } else if (def) {
                            element.style.height = `${def}px`;
                            element.style.maxHeight = `${def}px`;
                        }
                    });
            }

            return { controlsDescendantBindings: false };
        }
    }
}