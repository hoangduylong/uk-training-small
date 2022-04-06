var cps003;
(function (cps003) {
    var h;
    (function (h) {
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
                    setShared('CPS003H_VALUE', {});
                    self.close();
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
        })(vm = h.vm || (h.vm = {}));
    })(h = cps003.h || (cps003.h = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.h.vm.js.map