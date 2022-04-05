/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {

    export module checkbox {
        interface CheckBoxAccessor {
            name: string | KnockoutObservable<string>;
            group: string | KnockoutObservable<string>;
            checked: boolean | any | KnockoutObservable<boolean | any>;
            text: string | KnockoutObservable<string>;
            optionText: string | KnockoutObservable<string>;
            optionValue: string | KnockoutObservable<string>;
            value: any | KnockoutObservable<any>;
            readonly: boolean | KnockoutObservable<boolean>;
            enable: boolean | KnockoutObservable<boolean>;
            required: boolean | KnockoutObservable<boolean>;
            style: string | KnockoutObservable<string>;
            hasFocus: boolean | KnockoutObservable<boolean>;
            tabindex: string | number | KnockoutObservable<string | number>;
            test: string | KnockoutObservable<string>;
        }

        @handler({
            bindingName: 'ntsCheckBox',
            validatable: true,
            virtual: false
        })
        export class NtsCheckboxBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => CheckBoxAccessor, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext): void | { controlsDescendantBindings: boolean; } {
                const $element = $(element);
                const accessor = valueAccessor();
                const innerText = $element.text();
                const style: string = "style-" + (accessor.style || "normal");

                $element
                    .text('')
                    .addClass('checkbox-wrapper nts-input ' + style);

                const hasFocus = accessor.hasFocus || allBindingsAccessor.get('hasFocus');

                const $label = element.tagName === 'LABEL' ? element : $('<label>').prependTo(element).get(0);

                const text = ko.computed({
                    read: () => {
                        const option = ko.unwrap(accessor.value);
                        const optionText = ko.unwrap(accessor.text) || ko.unwrap(accessor.optionText);

                        const text = (_.get(option, optionText, optionText) || innerText).trim();

                        if (!text) {
                            element.classList.remove('with-text');
                            element.classList.add('without-text');
                        } else {
                            element.classList.remove('without-text');
                            element.classList.add('with-text');
                        }

                        return text;
                    },
                    disposeWhenNodeIsRemoved: element
                });

                const $input = $('<input>', { type: 'checkbox' })
                    .appendTo($label)
                    .on('click', () => !ko.unwrap(accessor.readonly))
                    .on('change', () => {
                        if (ko.isObservable(accessor.checked)) {
                            const option = ko.unwrap(accessor.value);
                            const checkeds = ko.toJS(accessor.checked);
                            const optionValue = ko.unwrap(accessor.optionValue);

                            const value = optionValue !== undefined ? _.get(option, optionValue, optionValue) : (option !== undefined ? option : $input.is(':checked'));

                            if (typeof _.get(accessor.checked, 'push') !== "function") {
                                accessor.checked(value);
                            } else {
                                if (!_.isArray(checkeds)) {
                                    if (_.isEqual(checkeds, ko.toJS(value))) {
                                        accessor.checked([]);
                                    } else {
                                        accessor.checked([value]);
                                    }
                                } else {
                                    const exist = _.find(checkeds, (c: any) => _.isEqual(c, ko.toJS(value)));

                                    if (!exist) {
                                        accessor.checked([...checkeds, value]);
                                    } else {
                                        _.remove(checkeds, (c: any) => _.isEqual(c, ko.toJS(value)));

                                        accessor.checked(checkeds);
                                    }
                                }
                            }
                        }
                    });

                const $span = $('<span>').appendTo($label).get(0);

                ko.applyBindingsToNode($span, { i18n: text }, bindingContext);

                if ($element.attr('tabindex')) {
                    const tabindex = $element.attr('tabindex');

                    $input.attr('tabindex', tabindex);
                }

                $element
                    .attr('tabindex', -1)
                    .removeAttr('data-bind')
                    .on('validate', () => {
                        if (ko.unwrap(accessor.required) === true && ko.unwrap(accessor.enable) !== false) {
                            const checked = ko.unwrap(accessor.checked);

                            if (_.isNil(checked)) {
                                $element
                                    .addClass('error')
                                    .ntsError("set", resource.getMessage("MsgB_2", [ko.unwrap(accessor.name) || '']), "MsgB_2");
                            } else {
                                $element
                                    .removeClass('error')
                                    .ntsError("clear");
                            }
                        } else {
                            $element
                                .removeClass('error')
                                .ntsError("clear");
                        }
                    });

                if (ko.isObservable(accessor.checked)) {
                    accessor.checked
                        .subscribe(() => $element.trigger('validate'));
                }

                ko.applyBindingsToNode($input.get(0), { hasFocus }, bindingContext);

                return { controlsDescendantBindings: true };
            }
            update(element: HTMLElement, valueAccessor: () => CheckBoxAccessor, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext): void {
                const accessor = valueAccessor();
                const name = ko.unwrap(accessor.name);
                const group = ko.unwrap(accessor.group);
                const enable = ko.unwrap(accessor.enable) !== false;
                const readonly = ko.unwrap(accessor.readonly) === true;
                const tabindex = ko.unwrap(accessor.tabindex);
                const checked = ko.unwrap(accessor.checked);
                const option = ko.unwrap(accessor.value);
                const optionValue = ko.unwrap(accessor.optionValue);
                const $input = $(element).find('input');

                const value = optionValue !== undefined ? _.get(option, optionValue, optionValue) : (option !== undefined ? option : undefined);

                if (!_.isNil(checked)) {
                    if (typeof _.get(accessor.checked, 'push') === 'function') {
                        const exist = _.find(checked, (c: any) => _.isEqual(ko.toJS(c), ko.toJS(value)));

                        if (!exist) {
                            $input.removeAttr('checked');
                        } else {
                            $input.attr('checked', 'checked');
                        }

                        $input.prop('checked', !!exist);
                    } else {
                        if (!_.isNil(value)) {
                            const equal = _.isEqual(ko.toJS(checked), ko.toJS(value));

                            if (!equal) {
                                $input.removeAttr('checked');
                            } else {
                                $input.attr('checked', 'checked');
                            }

                            $input.prop('checked', !!equal);
                        } else {
                            if (!ko.toJS(checked)) {
                                $input.removeAttr('checked');
                            } else {
                                $input.attr('checked', 'checked');
                            }

                            $input.prop('checked', !!ko.toJS(checked));
                        }
                    }
                } else {
                    $input.removeAttr('checked').prop('checked', false);
                }

                if (!group) {
                    $input.attr('name', name);
                } else {
                    $input.attr('name', group);
                }

                $input
                    .prop('disabled', !enable);

                if (enable) {
                    $input.removeAttr('disabled');
                    element.setAttribute('tabindex', '-1');
                } else {
                    $input.attr('disabled', 'disabled');
                    element.removeAttribute('tabindex');
                }

                $input
                    .prop('readonly', readonly);

                if (!readonly) {
                    $input.removeAttr('readonly');
                } else {
                    $input.attr('readonly', 'true');
                }

                if (tabindex !== undefined) {
                    $input.attr('tabindex', tabindex);
                }
            }
        }

        type CheckboxOption = any & { enable: boolean | KnockoutObservable<boolean> };

        interface CheckBoxGroupAccessor {
            name: string | KnockoutObservable<string>;
            options: CheckboxOption[] | KnockoutObservableArray<CheckboxOption>;
            optionsText: string | KnockoutObservable<string>;
            optionsValue: string | KnockoutObservable<string>;
            value: KnockoutObservable<any>;
            enable: boolean | KnockoutObservable<boolean>;
            tabindex: string | number | KnockoutObservable<string | number>;
            hasFocus: boolean | KnockoutObservable<boolean>;
            required: boolean | KnockoutObservable<boolean>;
        }

        @handler({
            bindingName: 'ntsMultiCheckBox',
            validatable: true,
            virtual: false
        })
        export class NtsMultiCheckBoxBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => CheckBoxGroupAccessor, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext): void | { controlsDescendantBindings: boolean; } {
                const $element = $(element);
                const accessor = valueAccessor();
                const $tabindex = element.getAttribute('tabindex');
                const group = Math.random().toString(36).substr(2, 9);
                const hasFocus = accessor.hasFocus || allBindingsAccessor.get('hasFocus');

                const $options = ko.computed({
                    read: () => {
                        const checked = accessor.value;
                        const name = ko.unwrap(accessor.name);
                        const enable = ko.unwrap(accessor.enable);
                        const tabindex = ko.unwrap(accessor.tabindex);
                        const options = ko.unwrap<any[]>(accessor.options);
                        const optionText = ko.unwrap(accessor.optionsText);
                        const optionValue = ko.unwrap(accessor.optionsValue);

                        return options
                            .map((value) => ({
                                name,
                                group,
                                value,
                                checked,
                                optionText,
                                optionValue,
                                tabindex: tabindex !== undefined ? tabindex : $tabindex,
                                enable: enable === false ? enable : value.enable !== undefined ? value.enable : enable
                            }));
                    },
                    disposeWhenNodeIsRemoved: element
                });

                $('<label>', { 'data-bind': 'ntsCheckBox: $data' }).appendTo(element);

                ko.applyBindingsToNode(element, { foreach: $options }, bindingContext);

                $element
                    .on('focus', () => {
                        if (ko.isObservable(hasFocus)) {
                            hasFocus(true);
                        } else {
                            const focuseds = $element.find('input:not(:disabled)');
                            const checkeds = $element.find('input:not(:disabled):checked');

                            if (checkeds.length) {
                                checkeds.focus();
                            } else {
                                focuseds.first().focus();
                            }
                        }
                    })
                    .on('focus', 'input', () => {
                        if (ko.isObservable(hasFocus)) {
                            hasFocus(true);
                        }
                    })
                    .on('blur', 'input', () => {
                        if (ko.isObservable(hasFocus)) {
                            hasFocus(false);
                        }
                    })
                    .on('validate', () => {
                        if (ko.unwrap(accessor.required) === true && ko.unwrap(accessor.enable) !== false) {
                            const checked = ko.unwrap(accessor.value);

                            if (_.isNil(checked)) {
                                $element
                                    .addClass('error')
                                    .ntsError("set", resource.getMessage("MsgB_2", [ko.unwrap(accessor.name) || '']), "MsgB_2");
                            } else {
                                $element
                                    .removeClass('error')
                                    .ntsError("clear");
                            }
                        } else {
                            $element
                                .removeClass('error')
                                .ntsError("clear");
                        }
                    })
                    .attr('tabindex', -1)
                    .removeAttr('data-bind')
                    .addClass('checkbox-wrappers nts-input');

                ko.computed({
                    read: () => {
                        const focus = ko.unwrap(hasFocus);
                        const focuseds = $element.find('input:not(:disabled)');
                        const checkeds = $element.find('input:not(:disabled):checked');

                        if (!focus) {
                            focuseds.blur();
                        } else {
                            const focus = $element.find(':focus');

                            if (!focus.length) {
                                if (checkeds.length) {
                                    checkeds.focus();
                                } else {
                                    focuseds.first().focus();
                                }
                            }
                        }
                    },
                    disposeWhenNodeIsRemoved: element
                });

                if (ko.isObservable(accessor.value)) {
                    accessor.value
                        .subscribe(() => $element.trigger('validate'));
                }

                return { controlsDescendantBindings: true };
            }
            update() { }
        }
    }
}