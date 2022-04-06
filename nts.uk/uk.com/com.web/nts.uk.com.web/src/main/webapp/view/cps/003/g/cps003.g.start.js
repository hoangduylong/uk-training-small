var cps003;
(function (cps003) {
    var g;
    (function (g) {
        var __viewContext = window['__viewContext'] || { ready: function () { }, bind: function (viewModel) { } };
        __viewContext.ready(function () {
            __viewContext['viewModel'] = new g.vm.ViewModel();
            __viewContext.viewModel.start();
            __viewContext.bind(__viewContext['viewModel']);
            $("#G1_001").focus();
        });
    })(g = cps003.g || (cps003.g = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.g.start.js.map