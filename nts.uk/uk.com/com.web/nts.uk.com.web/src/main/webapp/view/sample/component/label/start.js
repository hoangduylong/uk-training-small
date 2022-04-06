__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.text = ko.observable("レイアウトコード");
            self.constraint = ko.observable('ResidenceCode');
            self.constraints = ko.observableArray(['ResidenceCode', 'ResidenceCode']);
            self.inline = ko.observable(true);
            self.required = ko.observable(true);
            self.css = ko.observable("abc");
            self.enable = ko.observable(true);
        }
        ScreenModel.prototype.changePrimitive = function () {
            var self = this;
            __viewContext.primitiveValueConstraints['ResidenceCode'].maxLength = Math.floor(Math.random() * 20) + 1;
            self.constraint.valueHasMutated();
            self.constraints.valueHasMutated();
        };
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map