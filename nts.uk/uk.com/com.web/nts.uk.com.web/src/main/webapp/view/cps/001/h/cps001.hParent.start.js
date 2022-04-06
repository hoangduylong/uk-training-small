var cps001;
(function (cps001) {
    var hParent;
    (function (hParent) {
        var __viewContext = window['__viewContext'] || {};
        __viewContext.ready(function () {
            __viewContext['viewModel'] = new hParent.vm.ViewModel();
            __viewContext.bind(__viewContext['viewModel']);
            __viewContext['viewModel'].start();
        });
    })(hParent = cps001.hParent || (cps001.hParent = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.hParent.start.js.map