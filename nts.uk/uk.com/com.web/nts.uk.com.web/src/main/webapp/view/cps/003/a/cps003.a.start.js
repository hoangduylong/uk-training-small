var cps003;
(function (cps003) {
    var a;
    (function (a) {
        var setShared = nts.uk.ui.windows.setShared;
        var __viewContext = window['__viewContext'] || { ready: function () { }, bind: function (viewModel) { } };
        __viewContext.ready(function () {
            __viewContext.transferred.ifPresent(function (data) {
                setShared("CPS003A_PARAMS", data);
            });
            __viewContext['viewModel'] = new a.vm.ViewModel();
            __viewContext.bind(__viewContext['viewModel']);
        });
    })(a = cps003.a || (cps003.a = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.a.start.js.map