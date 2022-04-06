var cps007;
(function (cps007) {
    var a;
    (function (a) {
        var setShared = nts.uk.ui.windows.setShared;
        var __viewContext = window['__viewContext'] || {};
        __viewContext.ready(function () {
            __viewContext.transferred.ifPresent(function (data) {
                setShared("CPS007A_PARAMS", data);
            });
            __viewContext['viewModel'] = new a.vm.ViewModel();
            __viewContext.bind(__viewContext['viewModel']);
        });
    })(a = cps007.a || (cps007.a = {}));
})(cps007 || (cps007 = {}));
//# sourceMappingURL=cps007.a.start.js.map