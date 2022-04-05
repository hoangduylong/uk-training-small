module nts.uk.ui.error {
    import RM = nts.uk.ui.RootViewModel;

    @handler({
        bindingName: 'c-error',
        validatable: true,
        virtual: false
    })
    export class ErrorButtonBindingHandler implements KnockoutBindingHandler {
        init(element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: nts.uk.ui.vm.ViewModel, bindingContext: KnockoutBindingContext): { controlsDescendantBindings: boolean; } {
            element.removeAttribute('data-bind');

            element.setAttribute('class', 'btn-error small danger');

            const root: RM = bindingContext.$root;
            const errorViewModel = root.kiban.errorDialogViewModel;

            ko.applyBindingsToNode(element, {
                component: { name: 'c-error', params: true },
                click: function () { errorViewModel.open() }
            }, bindingContext);

            ko.computed({
                read: () => {
                    const errors = ko.unwrap<any[]>(errorViewModel.errors);

                    if (errors && errors.length) {
                        element.style.display = '';
                    } else {
                        element.style.display = 'none';
                    }
                },
                disposeWhenNodeIsRemoved: element
            });

            return { controlsDescendantBindings: true };
        }
    }

    @component({
        name: 'c-error',
        template: `
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6836 0.705101C10.6187 0.639971 10.5415 0.58832 10.4566 0.55312C10.3717 0.517921 10.2806 0.499868 10.1887 0.500001H4.58867C4.49673 0.499868 4.40567 0.517921 4.32074 0.55312C4.2358 0.58832 4.15867 0.639971 4.09377 0.705101L0.593774 4.2051C0.528644 4.26999 0.476993 4.34713 0.441793 4.43207C0.406593 4.517 0.388541 4.60806 0.388673 4.7V10.3C0.388673 10.4862 0.462174 10.664 0.593774 10.7949L4.09377 14.2949C4.15867 14.36 4.2358 14.4117 4.32074 14.4469C4.40567 14.4821 4.49673 14.5001 4.58867 14.5H10.1887C10.3749 14.5 10.5527 14.4265 10.6836 14.2949L14.1836 10.7949C14.2487 10.73 14.3004 10.6529 14.3356 10.5679C14.3708 10.483 14.3888 10.3919 14.3887 10.3V4.7C14.3888 4.60806 14.3708 4.517 14.3356 4.43207C14.3004 4.34713 14.2487 4.26999 14.1836 4.2051L10.6836 0.705101ZM5.03512 5.14645C5.23038 4.95119 5.54696 4.95119 5.74223 5.14645L7.38867 6.79289L9.03512 5.14645C9.23038 4.95119 9.54696 4.95119 9.74223 5.14645C9.93749 5.34171 9.93749 5.65829 9.74223 5.85355L8.09578 7.5L9.74223 9.14645C9.93749 9.34171 9.93749 9.65829 9.74223 9.85355C9.54696 10.0488 9.23038 10.0488 9.03512 9.85355L7.38867 8.20711L5.74223 9.85355C5.54696 10.0488 5.23038 10.0488 5.03512 9.85355C4.83986 9.65829 4.83986 9.34171 5.03512 9.14645L6.68157 7.5L5.03512 5.85355C4.83986 5.65829 4.83986 5.34171 5.03512 5.14645Z" fill="#D3466D"/>
        </svg>
        <span data-bind="i18n: 'エラーがあります'"></span>`
    })
    export class ErrorButtonViewModel extends ko.ViewModel { }
}