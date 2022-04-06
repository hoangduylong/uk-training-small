var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm013;
                (function (cmm013) {
                    var a;
                    (function (a) {
                        __viewContext.ready(function () {
                            var screenModel = new a.viewmodel.ScreenModel();
                            screenModel.startPage().done(function () {
                                __viewContext.bind(screenModel);
                                // Set focus 
                                if (screenModel.createMode()) {
                                    $('#job-title-code').focus();
                                }
                                else {
                                    $('#job-title-name').focus();
                                }
                            });
                        });
                    })(a = cmm013.a || (cmm013.a = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.a.start.js.map