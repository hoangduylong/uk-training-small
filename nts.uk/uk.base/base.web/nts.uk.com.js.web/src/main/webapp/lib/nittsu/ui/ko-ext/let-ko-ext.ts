/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {

    /**
     * Let binding handler
     */
    @handler({
        virtual: true,
        bindingName: 'let'
    })
    export class NtsLetBindingHandler implements KnockoutBindingHandler {
        init = (element: HTMLElement, valueAccessor: any, _allBindingsAccessor: KnockoutAllBindingsAccessor, _viewModel: any, bindingContext: KnockoutBindingContext) => {
            // Make a modified binding context, with extra properties, and apply it to descendant elements
            ko.applyBindingsToDescendants(bindingContext.extend(valueAccessor), element);

            return { controlsDescendantBindings: true };
        }
    }
}
