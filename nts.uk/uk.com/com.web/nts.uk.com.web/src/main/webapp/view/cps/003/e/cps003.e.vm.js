var cps003;
(function (cps003) {
    var e;
    (function (e) {
        var vm;
        (function (vm) {
            var close = nts.uk.ui.windows.close;
            var setShared = nts.uk.ui.windows.setShared;
            var __viewContext = window['__viewContext'] || {};
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    var self = this;
                }
                ViewModel.prototype.pushData = function () {
                    var self = this;
                    setShared('CPS003E_VALUE', {});
                    self.close();
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
        })(vm = e.vm || (e.vm = {}));
    })(e = cps003.e || (cps003.e = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.e.vm.js.map