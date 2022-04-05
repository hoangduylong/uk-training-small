module nts.uk.ui.koExtentions {
    export module i18n {
        /**
         * i18n: KnockoutObservable<string> | string;
         * params: KnockoutObservableArray<string> | string[];
         * type: KnockoutObservable<'text' | 'message'> | 'text' | 'message';
         * example: data-bind="i18n: 'TEXT_ID', params: [], type: 'text'"
         */
        @handler({
            bindingName: 'i18n',
            validatable: true,
            virtual: false
        })
        export class I18nBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => string | KnockoutObservable<string>, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext): void {
                const resource = valueAccessor();
                const params = allBindingsAccessor.get('params');
                const type = allBindingsAccessor.get('type');

                const text = ko.computed({
                    read: () => {
                        const $res = ko.unwrap(resource);
                        const $params = ko.unwrap(params);
                        const $type = ko.unwrap(type);

                        if ($type !== 'message') {
                            return nts.uk.resource.getText($res, $params);
                        }

                        return nts.uk.resource.getMessage($res, $params);
                    },
                    disposeWhenNodeIsRemoved: element
                });

                // rebind text to node
                ko.applyBindingsToNode(element, { text }, bindingContext);
            }
        }
    }
}