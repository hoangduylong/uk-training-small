/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {
    export module switchbox {
        @handler({
            bindingName: 'ntsSwitchButton',
            validatable: true,
            virtual: false
        })
        export class NtsSwitchButtonBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext): void | { controlsDescendantBindings: boolean; } {
                const $element = $(element);

                $element.addClass('switchbox-wrappers');

                ko.applyBindingsToNode(element, { ntsRadioBoxGroup: valueAccessor() }, bindingContext);

                return { controlsDescendantBindings: true };
            }
        }
    }
}
