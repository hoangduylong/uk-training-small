
module nts.ui.controls.buttons {

    export module links {
        const COMPONENT_NAME = 'btn-link';

        type BS_PARAMS = {
            state: any | KnockoutObservable<any> | KnockoutObservableArray<any>;
            value: any | KnockoutObservable<any>;
            text: string | KnockoutObservable<string>;
            icon: string | KnockoutObservable<string>;
            width: number | KnockoutObservable<number>;
            height: number | KnockoutObservable<number>;
            disabled: boolean | KnockoutObservable<boolean>;
        }

        @handler({
            bindingName: COMPONENT_NAME,
            validatable: true,
            virtual: false
        })
        export class ButtonLinkBindingHandler implements KnockoutBindingHandler {
            init(element: SVGElement, valueAccessor: () => string | KnockoutObservable<string>, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: nts.uk.ui.vm.ViewModel, bindingContext: KnockoutBindingContext): { controlsDescendantBindings: boolean; } {
                element.removeAttribute('data-bind');
                const name = COMPONENT_NAME;

                const text = valueAccessor();
                const icon = allBindingsAccessor.get('icon');
                const state = allBindingsAccessor.get('state');
                const value = allBindingsAccessor.get('value');
                const disabled = allBindingsAccessor.get('disabled') || false;
                const width = allBindingsAccessor.get('size') || allBindingsAccessor.get('width');
                const height = allBindingsAccessor.get('size') || allBindingsAccessor.get('height');

                const params = { text, icon, width, height, state, value, disabled };
                ko.applyBindingsToNode(element, { component: { name, params } }, bindingContext);

                return { controlsDescendantBindings: true };
            }
        }

        @component({
            name: COMPONENT_NAME,
            template: `<svg class="svg" data-bind="
                svg-icon: $component.icon,
                width: $component.params.width,
                height: $component.params.height
            "></svg>
            <span data-bind="i18n: $component.params.text"></span>
            <svg data-bind="
                svg-icon: $component.arrowIcon,
                size: 10
            "></svg>`
        })
        export class ButtonLinkViewModel extends ko.ViewModel {
            icon!: KnockoutComputed<string>;
            arrowIcon!: KnockoutComputed<string>;

            active: KnockoutObservable<boolean> = ko.observable(false);

            constructor(private params: BS_PARAMS) {
                super();

                this.icon = ko.computed({
                    read: () => {
                        const { params } = this;
                        const active = ko.unwrap(this.active);

                        const icon = ko.unwrap(params.icon);
                        const state = ko.unwrap(params.state);
                        const value = ko.unwrap(params.value);
                        const disabled = ko.unwrap<boolean>(params.disabled);

                        if (disabled) {
                            return `${icon}_UNSELECT`;
                        }

                        if (active) {
                            return `${icon}_SELECT`;
                        }

                        if (value === undefined) {
                            if (!!state) {
                                return `${icon}_SELECT`;
                            }

                            return `${icon}_UNSELECT`;
                        }

                        if (!_.isArray(state)) {
                            if (_.isEqual(state, value)) {
                                return `${icon}_SELECT`;
                            }

                            return `${icon}_UNSELECT`;
                        }

                        return _.some(state, (c: any) => _.isEqual(c, value)) ? `${icon}_SELECT` : `${icon}_UNSELECT`;
                    }
                });

                this.arrowIcon = ko.computed({
                    read: () => {
                        const { params } = this;
                        const active = ko.unwrap(this.active);

                        const icon = 'ARROW_RIGHT';
                        const state = ko.unwrap(params.state);
                        const value = ko.unwrap(params.value);
                        const disabled = ko.unwrap(params.disabled);

                        if (disabled) {
                            return `${icon}_UNSELECT`;
                        }

                        if (active) {
                            return `${icon}_SELECT`;
                        }

                        if (value === undefined) {
                            if (!!state) {
                                return `${icon}_SELECT`;
                            }

                            return `${icon}_UNSELECT`;
                        }

                        if (!_.isArray(state)) {
                            if (_.isEqual(state, value)) {
                                return `${icon}_SELECT`;
                            }

                            return `${icon}_UNSELECT`;
                        }

                        return _.some(state, (c: any) => _.isEqual(c, value)) ? `${icon}_SELECT` : `${icon}_UNSELECT`;
                    }
                });
            }

            mounted() {
                const vm = this;
                const { params } = vm;

                ko.computed({
                    read: () => {
                        const icon = ko.unwrap(params.icon);

                        if (icon && !vm.$el.classList.contains('large')) {
                            $(vm.$el).addClass('icon');
                        } else {
                            $(vm.$el).removeClass('icon');
                        }
                    },
                    disposeWhenNodeIsRemoved: vm.$el
                });

                $(vm.$el)
                    .addClass('link')
                    .on('mouseup', () => vm.active(false))
                    .on('mousedown', () => {
                        if (vm.$el.hasAttribute('disabled') || ko.unwrap(vm.params.disabled) || vm.$el.tagName !== 'BUTTON') {
                            return;
                        }

                        vm.active(true);

                        if (ko.isObservable(params.state)) {
                            const value = ko.unwrap(params.value);

                            if (value !== undefined) {
                                if (_.get(params.state, 'remove')) {
                                    const state = ko.unwrap<any[]>(params.state);

                                    if (_.some(state, (c: any) => _.isEqual(value, c))) {
                                        _.remove(state, (c: any) => _.isEqual(value, c));
                                    } else {
                                        state.push(value);
                                    }

                                    params.state(state);
                                } else {
                                    params.state(value);
                                }
                            } else {
                                params.state(!ko.unwrap(params.state));
                            }
                        }
                    })
                    .on('click', () => {
                        if (vm.$el.hasAttribute('disabled') || ko.unwrap(vm.params.disabled) || vm.$el.tagName !== 'BUTTON') {
                            return;
                        }

                        if (ko.isObservable(params.state)) {
                            const value = ko.unwrap(params.value);

                            if (value !== undefined) {
                                if (_.get(params.state, 'remove')) {
                                    const state = ko.unwrap<any[]>(params.state);

                                    if (_.some(state, (c: any) => _.isEqual(value, c))) {
                                        _.remove(state, (c: any) => _.isEqual(value, c));
                                    } else {
                                        state.push(value);
                                    }

                                    params.state(state);
                                } else {
                                    params.state(value);
                                }
                            } else {
                                params.state(!ko.unwrap(params.state));
                            }
                        }
                    });

                ko.computed({
                    read: () => {
                        const state = ko.unwrap(params.state);
                        const value = ko.unwrap(params.value);

                        if (value === undefined ? !!state : (_.get(state, 'push') ? _.some(state, (c: any) => _.isEqual(c, value)) : _.isEqual(state, value))) {
                            $(vm.$el).addClass('selected');
                        } else {
                            $(vm.$el).removeClass('selected');
                        }
                    },
                    disposeWhenNodeIsRemoved: vm.$el
                });
            }

            destroyed() {

            }
        }
    }

    export module schedules {
        const COMPONENT_NAME = 'btn-schedule';

        @handler({
            bindingName: COMPONENT_NAME,
            validatable: true,
            virtual: false
        })
        export class ButtonScheduleBindingHandler implements KnockoutBindingHandler {
            init(element: SVGElement, valueAccessor: () => string | KnockoutObservable<string>, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: nts.uk.ui.vm.ViewModel, bindingContext: KnockoutBindingContext): { controlsDescendantBindings: boolean; } {
                element.removeAttribute('data-bind');
                const name = COMPONENT_NAME;

                const text = valueAccessor();
                const icon = allBindingsAccessor.get('icon');
                const state = allBindingsAccessor.get('state');
                const value = allBindingsAccessor.get('value');
                const disabled = allBindingsAccessor.get('disabled') || false;
                const width = allBindingsAccessor.get('size') || allBindingsAccessor.get('width');
                const height = allBindingsAccessor.get('size') || allBindingsAccessor.get('height');

                const params = { text, icon, width, state, value, height, disabled };
                ko.applyBindingsToNode(element, { component: { name, params } }, bindingContext);

                return { controlsDescendantBindings: true };
            }
        }

        type BS_PARAMS = {
            state: any | KnockoutObservable<any> | KnockoutObservableArray<any>;
            value: any | KnockoutObservable<any>;
            text: string | KnockoutObservable<string>;
            icon: string | KnockoutObservable<string>;
            width: number | KnockoutObservable<number>;
            height: number | KnockoutObservable<number>;
            disabled: boolean | KnockoutObservable<boolean>;
        }

        @component({
            name: COMPONENT_NAME,
            template: `<svg class="svg" data-bind="
                svg-icon: $component.icon,
                width: $component.params.width,
                height: $component.params.height
            "></svg>
            <span data-bind="i18n: $component.params.text"></span>`
        })
        export class ButtonScheduleViewModel extends ko.ViewModel {
            icon!: KnockoutComputed<string>;
            active: KnockoutObservable<boolean> = ko.observable(false);

            constructor(private params: BS_PARAMS) {
                super();

                this.icon = ko.computed({
                    read: () => {
                        const { params } = this;
                        const active = ko.unwrap(this.active);

                        const icon = ko.unwrap(params.icon);
                        const state = ko.unwrap(params.state);
                        const value = ko.unwrap(params.value);
                        const disabled = ko.unwrap(params.disabled);

                        if (disabled) {
                            return `${icon}_UNSELECT`;
                        }

                        if (active) {
                            return `${icon}_SELECT`;
                        }

                        if (value === undefined) {
                            if (!!state) {
                                return `${icon}_SELECT`;
                            }

                            return `${icon}_UNSELECT`;
                        }

                        if (!_.isArray(state)) {
                            if (_.isEqual(state, value)) {
                                return `${icon}_SELECT`;
                            }

                            return `${icon}_UNSELECT`;
                        }

                        return _.some(state, (c: any) => _.isEqual(c, value)) ? `${icon}_SELECT` : `${icon}_UNSELECT`;
                    }
                });
            }

            mounted() {
                const vm = this;
                const { params } = vm;

                $(vm.$el)
                    .addClass('proceed')
                    .addClass('schedule')
                    .on('mouseup', () => vm.active(false))
                    .on('mousedown', () => {
                        if (vm.$el.hasAttribute('disabled')) {
                            return;
                        }

                        vm.active(true);

                        if (ko.isObservable(params.state)) {
                            const value = ko.unwrap(params.value);

                            if (value !== undefined) {
                                if (_.get(params.state, 'remove')) {
                                    const state = ko.unwrap<any[]>(params.state);

                                    if (_.some(state, (c: any) => _.isEqual(value, c))) {
                                        _.remove(state, (c: any) => _.isEqual(value, c));
                                    } else {
                                        state.push(value);
                                    }

                                    params.state(state);
                                } else {
                                    params.state(value);
                                }
                            } else {
                                params.state(!ko.unwrap(params.state));
                            }
                        }
                    });

                ko.computed({
                    read: () => {
                        const text = ko.unwrap(params.text);

                        if (!text) {
                            $(vm.$el).addClass('icon');
                        } else {
                            $(vm.$el).removeClass('icon');
                        }
                    },
                    disposeWhenNodeIsRemoved: vm.$el
                });

                ko.computed({
                    read: () => {
                        const state = ko.unwrap(params.state);
                        const value = ko.unwrap(params.value);

                        if (value === undefined ? !!state : (_.get(state, 'push') ? _.some(state, (c: any) => _.isEqual(c, value)) : _.isEqual(state, value))) {
                            $(vm.$el).addClass('selected');
                        } else {
                            $(vm.$el).removeClass('selected');
                        }
                    },
                    disposeWhenNodeIsRemoved: vm.$el
                });
            }

            destroyed() {
                const vm = this;

                vm.icon.dispose();
            }
        }
    }

    export module functional {
        const COMPONENT_NAME = 'btn-functional';

        interface FunctionalOptions {
            items: string[] | KnockoutObservableArray<string>;
            select: (selected: string) => void;
        }

        interface DropDownItemOption {
            data: FunctionalOptions;
            viewModel: any;
        }

        @handler({
            bindingName: COMPONENT_NAME,
            validatable: true,
            virtual: false
        })
        export class FunctionalBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => FunctionalOptions, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: nts.uk.ui.vm.ViewModel, bindingContext: KnockoutBindingContext): { controlsDescendantBindings: boolean; } {
                if (element.tagName !== 'BUTTON') {
                    element.innerText = 'Please use binding with [button] element';
                    return;
                }

                element.classList.add('functional');
                element.classList.add('transparent');

                const data = valueAccessor();
                const show = ko.observable(false);

                const dropdown = document.createElement('div');
                dropdown.classList.add('functional-dropdown');

                if (element.id) {
                    dropdown.setAttribute('for', element.id);
                }

                document.body.appendChild(dropdown);

                show.subscribe((s) => {
                    if (s) {
                        dropdown.classList.add('show');
                    } else {
                        dropdown.classList.remove('show');
                    }
                });

                ko.applyBindingsToNode(dropdown, { component: { name: 'dropdown-content', params: { data, viewModel } } });

                // render template
                ko.applyBindingsToNode(element, { component: { name: COMPONENT_NAME, params: { show, dropdown } } });

                $(element)
                    .on('click', () => {
                        show(true);

                        const bound = element.getBoundingClientRect();

                        dropdown.style.top = bound.bottom + 10 + 'px';
                        dropdown.style.left = (bound.left + bound.width + 3 - dropdown.offsetWidth) + 'px';
                    })
                    .on('keydown', (evt: JQueryEventObject) => {
                        if (evt.keyCode === 9) {
                            show(false);
                        } else {
                            const selected = $(dropdown).find('li.selected');

                            if (evt.keyCode === 38) {
                                if (selected.length) {
                                    const prev = selected.prev();

                                    if (prev.length) {
                                        prev.addClass('selected');
                                        selected.removeClass('selected');
                                    }
                                } else {
                                    $(dropdown).find('li').last().addClass('selected');
                                }
                            } else if (evt.keyCode === 40) {
                                if (selected.length) {
                                    const next = selected.next();

                                    if (next.length) {
                                        next.addClass('selected');
                                        selected.removeClass('selected');
                                    }
                                } else {
                                    $(dropdown).find('li').first().addClass('selected');
                                }
                            } else if (evt.keyCode === 13) {
                                show(!show());

                                if (show() === false) {
                                    selected.trigger('click');
                                }

                                $(dropdown).find('li').removeClass('selected');

                                evt.preventDefault();
                            }
                        }
                    });

                ko.utils.domData.set(element, '__DROPDOWN__', dropdown);

                return { controlsDescendantBindings: true };
            }
        }

        interface FunctionalParams {
            show: KnockoutObservable<boolean>;
            dropdown: HTMLElement;
        }

        @component({
            name: COMPONENT_NAME,
            template: `
            <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="3" height="3" fill="#30CC40" />
                <rect y="6" width="3" height="3" fill="#30CC40" />
                <rect y="12" width="3" height="3" fill="#30CC40" />
            </svg>
            `
        })
        export class FunctionalButtonViewModel extends ko.ViewModel {
            constructor(private params: FunctionalParams) {
                super();
            }

            mounted() {
                const vm = this;
                const { $el, params } = vm;
                const { show } = params;

                $(window)
                    .on('dr.click', (__: JQueryEventObject, evt: JQueryEventObject) => {
                        const tg = $(evt.target);

                        if (tg.is($el) || tg.closest('button').is($el)) {
                            show(true);
                        } else {
                            show(false);
                        }
                    })
                    .on('click', (evt) => {
                        $(window).trigger('dr.click', [evt]);
                    });

                $($el)
                    .removeAttr('data-bind')
                    .find('[data-bind]')
                    .removeAttr('data-bind');
            }

            // hook for remove dropdown on body
            destroyed() {
                const vm = this;
                const dropdown: HTMLElement = ko.utils.domData.get(vm.$el, '__DROPDOWN__');

                if (dropdown) {
                    dropdown.remove();
                }

                $(window).of('dr.click');
            }
        }

        @component({
            name: 'dropdown-content',
            template:
                `<div>
                <ul data-bind="foreach: $component.items">
                    <li data-bind="i18n: $data, click: function() { $component.select($data) }"></li>
                </ul>
            </div>`
        })
        export class DropdownContentViewModel extends ko.ViewModel {
            items!: string[] | KnockoutObservableArray<string>;

            constructor(private params: DropDownItemOption) {
                super();

                this.items = params.data ? (params.data.items || []) : [];
            }

            mounted() {
                const vm = this;

                vm.$el.removeAttribute('data-bind');

                vm.$el.querySelectorAll('[data-bind]')
                    .forEach((c) => c.removeAttribute('data-bind'))
            }

            select(key: string) {
                const vm = this;
                const { params } = vm;
                const { data, viewModel } = params;

                if (data && typeof data.select === 'function') {
                    data.select.apply(viewModel, [key]);
                }
            }
        }
    }
}