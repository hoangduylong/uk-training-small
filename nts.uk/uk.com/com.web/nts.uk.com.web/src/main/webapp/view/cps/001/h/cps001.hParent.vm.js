var cps001;
(function (cps001) {
    var hParent;
    (function (hParent) {
        var vm;
        (function (vm) {
            var modal = nts.uk.ui.windows.sub.modal;
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    var self = this;
                }
                ViewModel.prototype.start = function () {
                };
                ViewModel.prototype.openHDialog = function () {
                    modal('../h/index.xhtml').onClosed(function () {
                    });
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
        })(vm = hParent.vm || (hParent.vm = {}));
    })(hParent = cps001.hParent || (cps001.hParent = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.hParent.vm.js.map