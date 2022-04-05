
module nts.uk.ui.koExtentions {
    export module datetime {
        /**
         * date: KnockoutObservable<Date> | Date;
         * format: KnockoutObservable<string> | string;
         * example: data-bind="date: new Date(), format: 'YYYY-MM-DD'"
         */
        @handler({
            bindingName: 'date',
            validatable: true,
            virtual: false
        })
        export class DateBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => KnockoutObservable<Date> | Date, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext) {
                const data = valueAccessor();
                const format = allBindingsAccessor.get('format');

                const text = ko.computed({
                    read: () => {
                        const date = ko.unwrap(data);
                        const $format = ko.unwrap(format) || 'YYYY/MM/DD';

                        return moment(date).format($format);
                    },
                    disposeWhenNodeIsRemoved: element
                });

                ko.applyBindingsToNode(element, { text }, bindingContext);
            }
        }

        /**
         * time: KnockoutObservable<number> | number;
         * type: KnockoutObservable<'timewd' | 'duration' | 'timepoint' | 'ClockDay_Short_HM' | 'Clock_Short_HM'> | 'timewd' | 'duration' | 'timepoint' | 'ClockDay_Short_HM' | 'Clock_Short_HM';
         * example: data-bind="time: 60, type: 'timewd'"
         */
        @handler({
            bindingName: 'time',
            validatable: true,
            virtual: false
        })
        export class TimeBindingHandler implements KnockoutBindingHandler {
            init(element: HTMLElement, valueAccessor: () => KnockoutObservable<number> | number, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext) {
                const time = valueAccessor();
                const type = allBindingsAccessor.get('type');

                const text = ko.computed({
                    read: () => {
                        const value = ko.unwrap(time);
                        const $type = ko.unwrap(type);

                        if ($type === 'timewd' || $type === 'ClockDay_Short_HM') {
                            return nts.uk.time.format.byId('ClockDay_Short_HM', value);
                        }

                        if ($type === 'duration' || $type === 'Clock_Short_HM') {
                            return nts.uk.time.format.byId('Clock_Short_HM', value);
                        }

                        // timepoint
                        return nts.uk.time.format.byId('Time_Short_HM', value);
                    },
                    disposeWhenNodeIsRemoved: element
                });

                ko.applyBindingsToNode(element, { text }, bindingContext);
            }
        }
    }
}