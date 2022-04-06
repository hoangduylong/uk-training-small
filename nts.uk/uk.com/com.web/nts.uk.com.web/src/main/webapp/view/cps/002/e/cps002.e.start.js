var cps002;
(function (cps002) {
    var e;
    (function (e) {
        var __viewContext = window['__viewContext'] || {};
        __viewContext.ready(function () {
            __viewContext['viewModel'] = new e.vm.ViewModel();
            __viewContext['viewModel'].start().done(function () {
                __viewContext.bind(__viewContext['viewModel']);
            });
        });
    })(e = cps002.e || (cps002.e = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.e.start.js.map