module nts.uk.ui.monthDayPicker {

    interface Params {
        name: string;
        index: number;
        value: KnockoutObservable<null | number>;
        monthDaysName: KnockoutObservable<string>;
    }

    @handler({
        bindingName: 'month-day',
        validatable: true,
        virtual: false
    })
    
    export class MonthDayBindingHandler implements KnockoutBindingHandler {
        init(element: HTMLElement, valueAccessor: () => Params, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext): { controlsDescendantBindings: boolean; } {
            if (element.tagName !== 'DIV') {
                element.innerHTML = 'Use DIV tag for this binding';
                return;
            }

            const binding = valueAccessor();

            // Binding monthDays again
            ko.applyBindingsToNode(element, { ntsMonthDays: { name: binding.name, value: binding.value, enable: true } }, bindingContext);

            const comboboxes = $(element).find('.ntsComboBox');

            $(element)
                .on('validate', () => {
                    //「月・日・タイトル・内容」は１件以上が入力しました場合、他の件も入力しなければならない
                    if (Number(binding.value()) === 0 || (Number(binding.value()) % 100 === 0)) {
                        $(`#month-day-${binding.index}`).ntsError('clear');
                        $(`#month-day-${binding.index}`).ntsError('set', { messageId: "MsgB_2", messageParams: [binding.monthDaysName()] });
                        comboboxes.addClass('error');
                    } else {
                        $(`#month-day-${binding.index}`).ntsError('clear');
                        comboboxes.removeClass('error');
                    }
                })
                .on('focus', () => {
                    comboboxes.first().focus();
                });

            // Handle tabindex for control
            if (binding.index >= 0) {
                $(element).attr('tabindex', binding.index);
            } else {
                $(element).removeAttr('tabindex');
            }

            return { controlsDescendantBindings: true };
        }
    }
}