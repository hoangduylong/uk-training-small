var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps013;
                (function (cps013) {
                    var a;
                    (function (a) {
                        __viewContext.ready(function () {
                            var screenModel = new a.viewmodel.ScreenModel();
                            nts.uk.ui.block.invisible();
                            screenModel.startPage().done(function () {
                                __viewContext.bind(screenModel);
                                setTimeout(function () {
                                    $('span.box').attr("tabindex", "7");
                                }, 1000);
                            }).always(function () {
                                nts.uk.ui.block.clear();
                            });
                        });
                    })(a = cps013.a || (cps013.a = {}));
                })(cps013 = view.cps013 || (view.cps013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps013.a.start.js.map