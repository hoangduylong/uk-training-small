__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.functionItems = ko.observableArray([]);
            var functionItems = [];
            var _loop_1 = function () {
                var x = i;
                functionItems.push({ icon: "19209343.png", text: 'item-' + i, action: function (evt, ui) {
                        alert(x);
                    } });
            };
            for (var i = 0; i < 10; i++) {
                _loop_1();
            }
            this.functionItems(functionItems);
        }
        ScreenModel.prototype.remove = function () {
            this.functionItems.shift();
        };
        return ScreenModel;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map