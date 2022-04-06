var cdl022;
(function (cdl022) {
    var a;
    (function (a) {
        var vm;
        (function (vm) {
            var close = nts.uk.ui.windows.close;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var __viewContext = window['__viewContext'] || {};
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    var _this = this;
                    this.sorts = ko.observableArray([]);
                    this.pushData = function () {
                        var self = _this, sorts = _.map(ko.unwrap(self.sorts), function (x) { return x; });
                        setShared('CDL020_VALUES', sorts);
                        close();
                    };
                    this.close = function () {
                        setShared('CDL020_VALUES', undefined);
                        close();
                    };
                    var self = this, params = getShared('CDL020_PARAMS') || [];
                    if (!params || !params.length) {
                        self.close();
                    }
                    self.sorts(params);
                }
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
        })(vm = a.vm || (a.vm = {}));
    })(a = cdl022.a || (cdl022.a = {}));
})(cdl022 || (cdl022 = {}));
//# sourceMappingURL=cdl022.a.vm.js.map