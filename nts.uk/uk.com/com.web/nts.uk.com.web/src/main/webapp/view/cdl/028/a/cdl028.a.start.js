var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl028;
                (function (cdl028) {
                    var a;
                    (function (a) {
                        __viewContext.ready(function () {
                            var screenModel = new a.viewmodel.ScreenModel();
                            screenModel.startPage().done(function () {
                                __viewContext.bind(screenModel);
                                $("#A1_2").focus();
                                if (screenModel.modeScreen() == 5 || screenModel.modeScreen() == 2) {
                                    $("input")[0].focus();
                                }
                            });
                        });
                    })(a = cdl028.a || (cdl028.a = {}));
                })(cdl028 = view.cdl028 || (view.cdl028 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl028.a.start.js.map