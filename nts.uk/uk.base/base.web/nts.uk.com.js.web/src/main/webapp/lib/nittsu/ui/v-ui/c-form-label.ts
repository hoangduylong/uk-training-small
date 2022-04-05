module nts.uk.ui.formlabel {
    @component({
        name: 'nts-form-label',
        template: `<span class="text" data-bind="html: $component.html"></span>
        <svg data-bind="svg-icon: 'info', label-constraint: $component.constraint"></svg>`
    })
    export class NtsFormLabelComponent extends ko.ViewModel {
        html!: KnockoutComputed<string>;
        constraint!: KnockoutComputed<string>;

        constructor(private params: any) {
            super();

            this.constraint = params.constraint;
        }

        created() {
            const vm = this;
            const { params } = vm;

            vm.html = ko.computed({
                read() {
                    const html = ko.unwrap(params.html);

                    return vm.$i18n(html);
                }
            });
        }

        mounted() {
            const vm = this;

//            $(vm.$el).find('[data-bind]').removeAttr('data-bind');
        }

        destroyed() {
            const vm = this;

            vm.html.dispose();
        }
    }

    export module constraint {
        @handler({
            bindingName: 'label-constraint',
            validatable: true,
            virtual: false
        })
        export class PopperBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => string | KnockoutObservable<string>, _allBindingsAccessor: KnockoutAllBindingsAccessor, _viewModel: any, bindingContext: KnockoutBindingContext): { controlsDescendantBindings: boolean } {
                const $element = $(element);
                const accessor = valueAccessor();

                $element
                    .on('mouseover', () => {
                        const $popper = $element.data('__popper__');

                        if (!!$popper) {
                            return;
                        }

                        const html = ko.unwrap(accessor);
                        const bound = element.getBoundingClientRect();

                        const popper = $(`<div class="constraint"><span>${html}</span></div>`)
                            .appendTo(document.body);

                        const pbound = popper.get(0).getBoundingClientRect();

                        const top = bound.top - pbound.height - 8;
                        const bottom = bound.top + bound.height + 8;

                        if (top < 0) {
                            popper.addClass('below');
                        }

                        popper
                            .css({
                                'top': `${top >= 0 ? top : bottom}px`,
                                'left': `${(bound.left + (bound.width / 2)) - (pbound.width / 2) + 4}px`
                            });

                        $element.data('__popper__', popper);
                    })
                    .on('mouseleave', () => {
                        const $popper = $element.data('__popper__');

                        if ($popper !== undefined) {
                            $popper.remove();
                        }

                        $element.data('__popper__', null);
                    });

                return { controlsDescendantBindings: false };
            }
        }
    }
}