var cps002;
(function (cps002) {
    var a;
    (function (a) {
        var setShared = nts.uk.ui.windows.setShared;
        var __viewContext = window['__viewContext'] || {};
        __viewContext.ready(function () {
            __viewContext.transferred.ifPresent(function (data) {
                setShared("CPS002A_PARAMS", data);
            });
            __viewContext['viewModel'] = new a.vm.ViewModel();
            __viewContext.bind(__viewContext['viewModel']);
        });
    })(a = cps002.a || (cps002.a = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.a.start.js.map