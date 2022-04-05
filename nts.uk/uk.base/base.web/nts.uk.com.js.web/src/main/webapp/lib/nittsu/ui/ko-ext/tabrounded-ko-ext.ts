module nts.uk.ui.koExtentions {
    export module tabrounded {
        @handler({
            bindingName: 'tab-rounded'
        })
        export class TabRoundedBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => KnockoutObservable<boolean>, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext) {
                const $element = $(element);
                const rounded = valueAccessor();

                $element
                    // prevent tabable to out of popup control
                    .on("keydown", ":tabbable", (evt: JQueryKeyEventObject) => {
                        if (ko.unwrap(rounded)) {
                            const fable = $element
                                .find(':tabbable')
                                .toArray();

                            const $chain = _.chain(fable).orderBy((el: HTMLElement) => el.getAttribute('tabindex'));

                            const last = $chain.last<_.LoDashImplicitWrapper<HTMLElement>>().value() || _.last(fable);
                            const first = $chain.first<_.LoDashImplicitWrapper<HTMLElement>>().value() || _.first(fable);

                            if (evt.keyCode === 9) {
                                if ($(evt.target).is(last) && evt.shiftKey === false) {
                                    first.focus();

                                    evt.preventDefault();
                                } else if ($(evt.target).is(first) && evt.shiftKey === true) {
                                    last.focus();

                                    evt.preventDefault();
                                }
                            }
                        }
                    });
            }
        }
    }
}