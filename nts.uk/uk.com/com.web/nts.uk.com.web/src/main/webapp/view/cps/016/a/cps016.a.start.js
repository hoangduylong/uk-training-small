var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps016;
                (function (cps016) {
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
                    })(a = cps016.a || (cps016.a = {}));
                })(cps016 = view.cps016 || (view.cps016 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps016.a.start.js.map