var cps001;
(function (cps001) {
    var a;
    (function (a) {
        var setShared = nts.uk.ui.windows.setShared;
        var __viewContext = window['__viewContext'] || {};
        __viewContext.ready(function () {
            __viewContext.transferred.ifPresent(function (data) {
                setShared("CPS001A_PARAMS", data);
            });
            __viewContext['viewModel'] = new a.vm.ViewModel();
            __viewContext.bind(__viewContext['viewModel']);
        });
    })(a = cps001.a || (cps001.a = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.a.start.js.map