var cps001;
(function (cps001) {
    var h;
    (function (h) {
        var __viewContext = window['__viewContext'] || {};
        __viewContext.ready(function () {
            __viewContext['viewModel'] = new h.vm.ViewModel();
            __viewContext['viewModel'].start().done(function () {
                __viewContext.bind(__viewContext['viewModel']);
            });
        });
    })(h = cps001.h || (cps001.h = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.h.start.js.map