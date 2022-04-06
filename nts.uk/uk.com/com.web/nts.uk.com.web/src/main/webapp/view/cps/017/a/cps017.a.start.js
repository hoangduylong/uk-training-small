var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps017;
                (function (cps017) {
                    var a;
                    (function (a) {
                        __viewContext.ready(function () {
                            __viewContext["viewModel"] = new a.viewmodel.ScreenModel();
                            __viewContext["viewModel"].start().done(function () {
                                __viewContext.bind(__viewContext["viewModel"]);
                            });
                            if (window.top != window.self) {
                                $("#header").css("display", "none");
                            }
                        });
                    })(a = cps017.a || (cps017.a = {}));
                })(cps017 = view.cps017 || (view.cps017 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps017.a.start.js.map