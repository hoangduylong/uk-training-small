__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.enable = ko.observable(true);
            self.required = ko.observable(true);
            self.roundingRules = ko.observableArray([
                { code: '1', name: '四捨五入' },
                { code: '2', name: '切り上げ' },
                { code: '3', name: '切り捨て' }
            ]);
            self.selectedRuleCode = ko.observable();
            self.defaultValue = ko.observable();
        }
        ScreenModel.prototype.setDefault = function () {
            var self = this;
            nts.uk.util.value.reset($("#switch-buttons"), self.defaultValue() !== '' ? self.defaultValue() : undefined);
        };
        ScreenModel.prototype.validate = function () {
            $("#switch-buttons").trigger("validate");
        };
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map