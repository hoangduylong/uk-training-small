var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps005;
                (function (cps005) {
                    var a;
                    (function (a) {
                        __viewContext.ready(function () {
                            __viewContext['screenModel'] = new a.viewmodel.ScreenModel();
                            var vm = __viewContext['screenModel'];
                            vm.startPage().done(function () {
                                __viewContext.bind(vm);
                                ko.computed(function () {
                                    vm.isEnableButtonProceedA(nts.uk.ui._viewModel.errors.isEmpty() && vm.currentData().isEnableButtonProceed());
                                });
                            });
                        });
                    })(a = cps005.a || (cps005.a = {}));
                })(cps005 = view.cps005 || (view.cps005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps005.a.start.js.map