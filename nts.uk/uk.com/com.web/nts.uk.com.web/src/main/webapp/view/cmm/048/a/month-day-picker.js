var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var ui;
        (function (ui) {
            var monthDayPicker;
            (function (monthDayPicker) {
                var MonthDayBindingHandler = /** @class */ (function () {
                    function MonthDayBindingHandler() {
                    }
                    MonthDayBindingHandler.prototype.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                        if (element.tagName !== 'DIV') {
                            element.innerHTML = 'Use DIV tag for this binding';
                            return;
                        }
                        var binding = valueAccessor();
                        // Binding monthDays again
                        ko.applyBindingsToNode(element, { ntsMonthDays: { name: binding.name, value: binding.value, enable: true } }, bindingContext);
                        var comboboxes = $(element).find('.ntsComboBox');
                        $(element)
                            .on('validate', function () {
                            //「月・日・タイトル・内容」は１件以上が入力しました場合、他の件も入力しなければならない
                            if (Number(binding.value()) === 0 || (Number(binding.value()) % 100 === 0)) {
                                $("#month-day-".concat(binding.index)).ntsError('clear');
                                $("#month-day-".concat(binding.index)).ntsError('set', { messageId: "MsgB_2", messageParams: [binding.monthDaysName()] });
                                comboboxes.addClass('error');
                            }
                            else {
                                $("#month-day-".concat(binding.index)).ntsError('clear');
                                comboboxes.removeClass('error');
                            }
                        })
                            .on('focus', function () {
                            comboboxes.first().focus();
                        });
                        // Handle tabindex for control
                        if (binding.index >= 0) {
                            $(element).attr('tabindex', binding.index);
                        }
                        else {
                            $(element).removeAttr('tabindex');
                        }
                        return { controlsDescendantBindings: true };
                    };
                    MonthDayBindingHandler = __decorate([
                        handler({
                            bindingName: 'month-day',
                            validatable: true,
                            virtual: false
                        })
                    ], MonthDayBindingHandler);
                    return MonthDayBindingHandler;
                }());
                monthDayPicker.MonthDayBindingHandler = MonthDayBindingHandler;
            })(monthDayPicker = ui.monthDayPicker || (ui.monthDayPicker = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=month-day-picker.js.map