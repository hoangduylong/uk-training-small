var cps003;
(function (cps003) {
    var c;
    (function (c) {
        __viewContext.ready(function () {
            __viewContext.viewModel = new c.vm.ScreenModel();
            __viewContext.viewModel.start();
            setTimeout(function () {
                __viewContext.bind(__viewContext.viewModel);
            }, 100);
        });
    })(c = cps003.c || (cps003.c = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.c.start.js.map