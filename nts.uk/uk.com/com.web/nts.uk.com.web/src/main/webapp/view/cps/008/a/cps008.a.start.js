var cps008;
(function (cps008) {
    var a;
    (function (a) {
        var setShared = nts.uk.ui.windows.setShared;
        var __viewContext = window['__viewContext'] || {};
        __viewContext.ready(function () {
            __viewContext.transferred.ifPresent(function (data) {
                setShared("CPS008A_PARAMS", data);
            });
            __viewContext['viewModel'] = new a.viewmodel.ViewModel();
            __viewContext.bind(__viewContext['viewModel']);
        });
    })(a = cps008.a || (cps008.a = {}));
})(cps008 || (cps008 = {}));
//# sourceMappingURL=cps008.a.start.js.map