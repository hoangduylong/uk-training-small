module nts.uk.ui.koExtentions {

    /**
     * Wrapper by ko binding for JqueryUI.Draggable
     * Use: data-bind="draggable: true, enable: true, disable: false"
     * Or use by full options: data-bind="draggable: JQueryUI.DraggableOptions"
     */
    @handler({
        bindingName: 'draggable',
        validatable: true,
        virtual: false
    })
    export class DraggableBindingHandler implements KnockoutBindingHandler {
        init = (element: HTMLElement, valueAccessor: () => KnockoutObservable<JQueryUI.DraggableOptions>, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext) => {
            const $element = $(element);
            const accessor = valueAccessor();
            const enable: KnockoutObservable<boolean> = allBindingsAccessor.get('enable');
            const disable: KnockoutObservable<boolean> = allBindingsAccessor.get('disable');

            ko.computed({
                read: () => {
                    const options = ko.toJS(accessor);

                    $element
                        .css({
                            top: '',
                            left: '',
                            right: '',
                            bottom: ''
                        });

                    if ($element.data('draggable')) {
                        $element.draggable('destroy');
                    }

                    if (options) {
                        if (!_.isObject) {
                            // if empty binding (draggable: true)
                            $element.draggable();
                        } else {
                            // if has options
                            $element.draggable(options);
                        }
                    }
                },
                disposeWhenNodeIsRemoved: element
            });

            ko.computed({
                read: () => {
                    // toggle enable
                    const $ena = ko.unwrap(enable) !== false;

                    if ($ena && $element.data('draggable')) {
                        $element.draggable('enable');
                    }
                },
                disposeWhenNodeIsRemoved: element
            });

            ko.computed({
                read: () => {
                    // toggle disble
                    const $dis = ko.unwrap(disable) === true;

                    if ($dis && $element.data('draggable')) {
                        $element.draggable('disable');
                    }
                },
                disposeWhenNodeIsRemoved: element
            });

            $element.removeAttr('data-bind');
        }
    }
}