__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.linkText = ko.observable("振込元銀行の登録へ");
        }
        ScreenModel.prototype.doSomething = function () {
            var self = this;
            //            self.linkText(self.linkText() + 'H');
            alert('click');
        };
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map