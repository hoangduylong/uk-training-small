/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {
    export module radio {
        interface RadioBoxAccessor {
            name: string | KnockoutObservable<string>;
            group: string | KnockoutObservable<string>;
            option: string | KnockoutObservable<string>;
            checkedValue: string | KnockoutObservable<string>;
            optionText: string | KnockoutObservable<string>;
            optionValue: string | KnockoutObservable<string>;
            enable: boolean | KnockoutObservable<boolean>;
            checked: any | KnockoutObservable<any>;
            tabindex?: number | string | KnockoutObservable<number | string>;
            hasFocus: boolean | KnockoutObservable<boolean>;
            required: boolean | KnockoutObservable<boolean>;
            dataBind: any;
        }

        @handler({
            bindingName: 'ntsRadioButton',
            validatable: true,
            virtual: false
        })
        export class NtsRadioBoxBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => RadioBoxAccessor, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext): void | { controlsDescendantBindings: boolean; } {
                const $element = $(element);
                const accessor = valueAccessor();
                const innerText = $(element).text();

                const hasFocus = accessor.hasFocus || allBindingsAccessor.get('hasFocus');

                const $label = element.tagName === 'LABEL' ? element : $('<label>').appendTo(element).get(0);

                const text = ko.computed({
                    read: () => {
                        const option = ko.unwrap(accessor.option);
                        const optionText = ko.unwrap(accessor.optionText);

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

                const $input = $('<input>', { type: 'radio' })
                    .appendTo($label)
                    .on('change', () => {
                        if (ko.isObservable(accessor.checked)) {
                            const option = ko.unwrap(accessor.option) || ko.unwrap(accessor.checkedValue);
                            const optionValue = ko.unwrap(accessor.optionValue);

                            const value = optionValue !== undefined ? _.get(option, optionValue, optionValue) : (option !== undefined ? option : $input.is(':checked'));

                            accessor.checked(value);
                        }
                    });

                const $span = $('<span>').appendTo($label).get(0);

                const isHTML = (str: any) => {
                    var a = document.createElement('div');
                    a.innerHTML = str;
                  
                    for (var c = a.childNodes, i = c.length; i--; ) {
                      if (c[i].nodeType == 1) return true; 
                    }
                  
                    return false;
                }
                
                if(isHTML(text())){
                    $span.innerHTML = text();
                } else {
                    ko.applyBindingsToNode($span, { i18n: text }, bindingContext);
                }

                if (accessor.dataBind) {
                    $span.classList.add('button');
                    ko.applyBindingsToNode($span, accessor.dataBind, bindingContext);
                }

                if ($element.attr('tabindex')) {
                    const tabindex = $element.attr('tabindex');

                    $input.attr('tabindex', tabindex);
                }

                $element
                    .attr('tabindex', -1)
                    .removeAttr('data-bind')
                    .addClass('radio-wrapper nts-input')
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
            update(element: HTMLElement, valueAccessor: () => RadioBoxAccessor, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext): void {
                const accessor = valueAccessor();
                const name = ko.unwrap(accessor.name);
                const group = ko.unwrap(accessor.group);
                const enable = ko.unwrap(accessor.enable) !== false;
                const tabindex = ko.unwrap(accessor.tabindex);
                const checked = ko.unwrap(accessor.checked);
                const option = ko.unwrap(accessor.option) || ko.unwrap(accessor.checkedValue);
                const optionValue = ko.unwrap(accessor.optionValue);
                const $input = $(element).find('input');

                const value = optionValue !== undefined ? _.get(option, optionValue, optionValue) : (option !== undefined ? option : undefined);

                if (!_.isNil(checked) && !_.isNil(value)) {
                    if (!_.isEqual(ko.toJS(checked), ko.toJS(value))) {
                        $input.removeAttr('checked');
                    } else {
                        $input.attr('checked', 'checked');
                    }

                    $input.prop('checked', _.isEqual(ko.toJS(checked), ko.toJS(value)));
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

                if (tabindex !== undefined) {
                    $input.attr('tabindex', tabindex);
                }
            }
        }

        type RadioOption = any & { enable: boolean | KnockoutObservable<boolean> };

        interface RadioBoxGroupAccessor {
            name: string | KnockoutObservable<string>;
            options: RadioOption[] | KnockoutObservableArray<RadioOption>;
            optionsText: string | KnockoutObservable<string>;
            optionsValue: string | KnockoutObservable<string>;
            value: KnockoutObservable<any>;
            enable: boolean | KnockoutObservable<boolean>;
            tabindex: string | number | KnockoutObservable<string | number>;
            hasFocus: boolean | KnockoutObservable<boolean>;
            required: boolean | KnockoutObservable<boolean>;
        }

        @handler({
            bindingName: 'ntsRadioBoxGroup',
            validatable: true,
            virtual: false
        })
        export class NtsRadioBoxGroupBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => RadioBoxGroupAccessor, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext): void | { controlsDescendantBindings: boolean; } {
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
                            .map((option) => ({
                                name,
                                group,
                                option,
                                checked,
                                optionText,
                                optionValue,
                                tabindex: tabindex !== undefined ? tabindex : $tabindex,
                                enable: enable === false ? enable : option.enable !== undefined ? option.enable : enable,
                                dataBind: option.dataBind
                            }));
                    },
                    disposeWhenNodeIsRemoved: element
                });

                $('<label>', { 'data-bind': 'ntsRadioButton: $data' }).appendTo(element);

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
                    .addClass('radio-wrappers nts-input');

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
