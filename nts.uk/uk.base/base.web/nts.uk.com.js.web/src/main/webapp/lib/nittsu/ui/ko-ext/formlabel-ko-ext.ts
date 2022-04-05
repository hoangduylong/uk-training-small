/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {
    export module formlabel {
        interface Accessor {
            text?: KnockoutObservable<string> | string;
            inline?: KnockoutObservable<boolean> | boolean;
            enable?: KnockoutObservable<boolean> | boolean;
            required?: KnockoutObservable<boolean> | boolean;
            cssClass?: KnockoutObservable<string> | string;
            constraint?: KnockoutObservable<string | string[]> | string | string[];
        }

        @handler({
            bindingName: 'ntsFormLabel'
        })
        export class NtsFormLabelBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => Accessor, allBindingsAccessor: KnockoutAllBindingsAccessor, _viewModel: any, bindingContext: KnockoutBindingContext): { controlsDescendantBindings: boolean } {
                const params = valueAccessor();
                const $text = allBindingsAccessor.get('text');
                const $html = element.innerHTML;

                element.classList.add('form-label');

                ko.computed({
                    read: () => {
                        const enable = ko.unwrap(params.enable);
                        const required = ko.unwrap(params.required);

                        if (!enable) {
                            element.classList.add('disabled');
                        } else {
                            element.classList.remove('disabled');
                        }

                        if (required) {
                            element.classList.add('required');
                        } else {
                            element.classList.remove('required');
                        }
                    },
                    disposeWhenNodeIsRemoved: element
                });

                const html = ko.computed({
                    read: () => {
                        const text = ko.unwrap(params.text) || ko.unwrap($text);

                        if (text) {
                            return _.escape(text);
                        }

                        return $html;
                    },
                    disposeWhenNodeIsRemoved: element
                });

                const constraint = ko.computed({
                    read: () => {
                        const primitive = ko.unwrap(params.constraint);

                        if (!primitive) {
                            element.classList.remove('has-contraint');

                            return '';
                        }

                        element.classList.add('has-constraint');

                        const { primitiveValueConstraints } = __viewContext;

                        if (_.isArray(primitive)) {
                            let miss = _.map(primitive, (p: string) => primitiveValueConstraints[p]);

                            if (miss.indexOf(undefined) > -1) {
                                return 'UNKNOW_PRIMITIVE';
                            } else {
                                return util.getConstraintMes(primitive);
                            }
                        } else {
                            if (!primitiveValueConstraints[primitive]) {
                                return 'UNKNOW_PRIMITIVE';
                            } else {
                                return util.getConstraintMes(primitive);
                            }
                        }
                    },
                    disposeWhenNodeIsRemoved: element
                });

                ko.applyBindingsToNode(element, { component: { name: 'nts-form-label', params: { html, constraint } } }, bindingContext);

                element.removeAttribute('data-bind');

                return { controlsDescendantBindings: false };
            }
            update() {
                
            }
        }
    }
}