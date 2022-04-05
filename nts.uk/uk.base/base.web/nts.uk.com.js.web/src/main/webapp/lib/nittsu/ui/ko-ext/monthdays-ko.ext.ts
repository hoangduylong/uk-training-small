module nts.uk.ui.koExtentions {
    let _: any = window['_'],
        ko: any = window['ko'],
        nts: any = window['nts'],
        moment: any = window['moment'];

    /**
     * Dialog binding handler
     */
    class NtsMonthDaysBindingHandler {

        /**
         * Init. 
         */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: any): any {
            let data = valueAccessor(),
                childBindingContext = bindingContext.createChildContext(),
                getComboBinding = (originalBinding, value, source) => {
                    return _.extend(_.clone(originalBinding), {
                        options: ko.observableArray(source),
                        optionsValue: 'value',
                        value: value,
                        optionsText: 'text',
                        width: '60px',
                        enable: data.enable,
                        name: _.size(source) == 13 ? (nts.uk.resource.getControlName(ko.toJS(data.name) || "") + "の月") : (nts.uk.resource.getControlName(ko.toJS(data.name) || "") + "の日"),
                        required: _.size(source) == 13 ? data.required : ko.computed(() => !!ko.toJS(data.required) || !!ko.toJS(monthValueAccessor.value))
                    });
                },
                getMonths = () => _.range(0, 13).map(m => ({ text: m === 0 ? "" : m, value: m === 0 ? "" : m })),
                getDaysInMonth = (month: number) => _.range(0, moment(month, "MM").daysInMonth() + 1).map(m => ({ text: m === 0 ? "" : m, value: m === 0 ? "" : m })),
                monthValueAccessor = getComboBinding(data, ko.observable(""), getMonths()),
                dayOfMonthValueAccessor = getComboBinding(data, ko.observable(""), [{ text: "", value: "" }]);

            // init binding element
            element.innerHTML = `
                <div tabindex='${element.getAttribute('tabindex') || 0}' class='ntsMonthPicker ntsComboBox ntsMonthDays_Component' id='${nts.uk.util.randomId()}' data-bind='ntsComboBox: $month'></div>
                <div class='ntsMonthLabel ntsLabel ntsMonthDays_Component' id='${nts.uk.util.randomId()}'><label data-bind="text: '月'"></label></div>
                <div tabindex='${element.getAttribute('tabindex') || 0}' class='ntsDayPicker ntsComboBox ntsMonthDays_Component' id='${nts.uk.util.randomId()}' data-bind='ntsComboBox: $dayOfMonth'></div>
                <div class='ntsDayPicker ntsLabel ntsMonthDays_Component' id='${nts.uk.util.randomId()}'><label data-bind="text: '日'"></label></div>
                `;

            // set default attr to element
            element.removeAttribute('tabindex');
            if (!element.className) {
                element.className = 'ntsControl';
            } else {
                element.classList.add('ntsControl');
            }
            element.classList.add('ntsMonthDays_Container');

            // month change
            monthValueAccessor.value.subscribe(month => {
                if (!month) {
                    dayOfMonthValueAccessor.options([{ text: "", value: "" }]);

                    if (dayOfMonthValueAccessor.value()) {
                        dayOfMonthValueAccessor.value("");
                    } else {
                        dayOfMonthValueAccessor.value.valueHasMutated();
                    }
                } else {
                    // change options of combobox days
                    let days = getDaysInMonth(month),
                        curentDay = ko.toJS(dayOfMonthValueAccessor.value),
                        day = _.min([curentDay, days.length - 1]);

                    dayOfMonthValueAccessor.options(days);

                    if (dayOfMonthValueAccessor.value() != day) {
                        dayOfMonthValueAccessor.value(day);
                    } else {
                        dayOfMonthValueAccessor.value.valueHasMutated();
                    }
                }
            });

            // data out
            // day change (bind new value to data.value)
            dayOfMonthValueAccessor.value.subscribe(day => {
                let month = ko.toJS(monthValueAccessor.value);

                if (day && month) {
                    data.value(month * 100 + day);
                }
            });

            // data in
            ko.computed({
                read: () => {
                    let raw = ko.toJS(data.value),
                        month = Math.floor(Number(raw) / 100),
                        dayOfMonth = Math.floor(Number(raw) % 100),
                        mno = monthValueAccessor.value.notifySubscribers,
                        dno = dayOfMonthValueAccessor.value.notifySubscribers;

                    // prevent notifiSubscribers when change values
                    monthValueAccessor.value.notifySubscribers = () => { };
                    monthValueAccessor.value(month || "");
                    monthValueAccessor.value.notifySubscribers = mno;

                    dayOfMonthValueAccessor.value.notifySubscribers = () => { };
                    dayOfMonthValueAccessor.value(dayOfMonth || "");
                    dayOfMonthValueAccessor.value.notifySubscribers = dno;

                    // notifySubscribers
                    monthValueAccessor.value.valueHasMutated();
                },
                disposeWhenNodeIsRemoved: element
            });

            // clear data
            ko.computed({
                read: () => {
                    let required = ko.toJS(data.required),
                        month = ko.toJS(monthValueAccessor.value),
                        dayOfMonth = ko.toJS(dayOfMonthValueAccessor.value);

                    if (!month && !required) {
                        data.value(0);
                    }
                },
                disposeWhenNodeIsRemoved: element
            });

            // attach two accessor to new context
            ko.utils.extend(childBindingContext, {
                $month: monthValueAccessor,
                $dayOfMonth: dayOfMonthValueAccessor
            });

            // binding data
            ko.applyBindingsToDescendants(childBindingContext, element);

            // validate event
            ko.utils.registerEventHandler(element, 'validate', (evt) => {
                if (element == evt.target) {
                    let mpick = element.querySelector('.ntsMonthPicker.ntsComboBox'),
                        dpick = element.querySelector('.ntsDayPicker.ntsComboBox');

                    ko.utils.triggerEvent(mpick, 'validate');
                    ko.utils.triggerEvent(dpick, 'validate');
                }
            });

            return { controlsDescendantBindings: true };
        }
    }

    ko.bindingHandlers['ntsMonthDays'] = new NtsMonthDaysBindingHandler();
}