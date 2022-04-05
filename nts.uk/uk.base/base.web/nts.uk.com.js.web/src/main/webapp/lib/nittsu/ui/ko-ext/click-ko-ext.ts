module nts.uk.ui.koExtentions {
    const originalClick = ko.bindingHandlers.click;

    // override click binding with timeClick (default: 500)
    @handler({
        bindingName: 'click'
    })
    export class SafeClickBindingHandler implements KnockoutBindingHandler {
        init = (element: HTMLElement, valueAccessor: () => () => void, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext) => {
            let lastPreventTime: number = new Date().getTime();

            const originalFunction = valueAccessor();
            const newValueAccesssor = function () {
                return function () {
                    const time: number = Date.now() - lastPreventTime;
                    const timeClick: number | undefined = ko.toJS(allBindingsAccessor.get('timeClick'));

                    if (time > (_.isNumber(timeClick) ? timeClick : 500)) {
                        //pass through the arguments
                        originalFunction.apply(viewModel, arguments);
                    }

                    lastPreventTime = new Date().getTime();
                };
            };

            // call originalClick init
            originalClick.init(element, newValueAccesssor, allBindingsAccessor, viewModel, bindingContext);
        }
    }
}