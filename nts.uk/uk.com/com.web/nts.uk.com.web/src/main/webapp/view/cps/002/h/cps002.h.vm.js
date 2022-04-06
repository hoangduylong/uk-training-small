var cps002;
(function (cps002) {
    var h;
    (function (h) {
        var vm;
        (function (vm) {
            var setShared = nts.uk.ui.windows.setShared;
            var close = nts.uk.ui.windows.close;
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                }
                ViewModel.prototype.continueReg = function () {
                    setShared('isContinue', true);
                    close();
                };
                ViewModel.prototype.moveToViewScreen = function () {
                    setShared('isContinue', false);
                    close();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
        })(vm = h.vm || (h.vm = {}));
    })(h = cps002.h || (cps002.h = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.h.vm.js.map