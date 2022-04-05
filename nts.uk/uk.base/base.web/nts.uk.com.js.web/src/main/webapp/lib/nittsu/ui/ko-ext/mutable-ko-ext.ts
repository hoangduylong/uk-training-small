/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {
    export module mutable {
        import RM = nts.uk.ui.RootViewModel;

        const DISABLED = 'disabled';

        @handler({
            bindingName: 'mutable',
            validatable: true,
            virtual: false
        })
        export class MutableBindingHandler implements KnockoutBindingHandler {
            init = (element: HTMLElement, valueAccessor: () => KnockoutObservable<boolean> | KnockoutComputed<boolean> | boolean | undefined, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext) => {
                const enable = valueAccessor();
                const $root: RM = bindingContext.$root;
                const { isEmpty } = $root.errors;

                const $enable = () => element.removeAttribute(DISABLED);
                const $disable = () => element.setAttribute(DISABLED, DISABLED);

                ko.computed({
                    read: () => {
                        const en = ko.unwrap(enable);
                        const he = ko.unwrap(isEmpty);

                        // disable save button by kiban error model
                        if (!he) {
                            $disable();

                            return;
                        }

                        // disable save button by developer error model
                        if (en === false) {
                            $disable();

                            return;
                        }

                        // if hasn't error, enable it
                        $enable();
                    },
                    disposeWhenNodeIsRemoved: element
                });
            }
        }
    }
}