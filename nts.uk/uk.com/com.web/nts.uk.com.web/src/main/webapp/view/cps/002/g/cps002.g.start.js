var cps002;
(function (cps002) {
    var g;
    (function (g) {
        var __viewContext = window['__viewContext'] || {};
        __viewContext.ready(function () {
            __viewContext['viewModel'] = new g.vm.ViewModel();
            __viewContext['viewModel'].start().done(function () {
                __viewContext.bind(__viewContext['viewModel']);
                $("#multiList_headers th:first-child").append(nts.uk.resource.getText("CPS002_74"));
                $("#empInitGroup").focus();
            });
        });
    })(g = cps002.g || (cps002.g = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.g.start.js.map