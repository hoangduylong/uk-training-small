var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm040;
                (function (cmm040) {
                    var b;
                    (function (b) {
                        __viewContext.ready(function () {
                            var screenModel = new b.viewmodel.ScreenModel();
                            screenModel.startPage().done(function () {
                                __viewContext.bind(screenModel);
                                if (screenModel.isCreate() == true) {
                                    $("#target").focus();
                                }
                            });
                        });
                    })(b = cmm040.b || (cmm040.b = {}));
                })(cmm040 = view.cmm040 || (view.cmm040 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm040.b.start.js.map