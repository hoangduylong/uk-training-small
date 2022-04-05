/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {
    export module panel {
        interface ValueAccessor {
            direction?: string | KnockoutObservable<string>;
            showIcon?: boolean | KnockoutObservable<boolean>;
            visible?: boolean | KnockoutObservable<boolean>;
            width?: number | string | KnockoutObservable<number | string>;
            height?: number | string | KnockoutObservable<number | string>;
        }

        const IS_SAMPLE = !!location.href.match(/\/sample\//);
        const DEFAULT_CONTAINER_CLASS = 'panel ntsPanel caret-background';

        @handler({
            bindingName: 'ntsPanel'
        })
        export class NtsPanelBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => ValueAccessor, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext) {
                const $panel = $(element);
                const accessor = valueAccessor();
                const { direction, height, showIcon, visible, width } = accessor;
                const $icon = $("<i>", { 'class': 'icon icon-searchbox' });

                // hide knockout binding
                $panel.removeAttr('data-bind');

                if (!IS_SAMPLE) {
                    return;
                } else {
                    $panel.addClass('deprecate');
                }

                // Show or hide icon
                ko.computed({
                    read: () => {
                        const sic = ko.unwrap(showIcon);

                        if (!sic) {
                            $icon.remove();
                        } else {
                            $panel.prepend($icon);
                        }
                    }
                });

                const css = ko.computed({
                    read: () => {
                        const dir = ko.unwrap(direction);

                        if (!dir) {
                            return DEFAULT_CONTAINER_CLASS;
                        }

                        return `${DEFAULT_CONTAINER_CLASS} caret-${direction} direction-${direction}`
                    },
                    disposeWhenNodeIsRemoved: element
                });

                const style = ko.computed({
                    read: () => {
                        const w = ko.unwrap(width);
                        const h = ko.unwrap(height);

                        return {
                            width: `${w || ''}px`.replace(/(px){2,}/, 'px').replace(/%px/, '%'),
                            height: `${h || ''}px`.replace(/(px){2,}/, 'px').replace(/%px/, '%')
                        };
                    },
                    disposeWhenNodeIsRemoved: element
                });

                ko.applyBindingsToNode(element, { css, style, show: visible }, bindingContext);

                // show deprecate message on sample
                $('<div>', { text: 'This feature is deprecate, don\'t use this binding in new UI.' }).prependTo(element);
            }
        }
    }
}