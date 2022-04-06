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
                    var f;
                    (function (f) {
                        __viewContext.ready(function () {
                            var screenModel = new f.viewmodel.ScreenModel();
                            screenModel.startPage().done(function () {
                                __viewContext.bind(screenModel);
                                // Set focus 
                                if (screenModel.createMode()) {
                                    $('#sequence-code').focus();
                                }
                                else {
                                    $('#sequence-name').focus();
                                }
                            });
                        });
                    })(f = cmm013.f || (cmm013.f = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.f.start.js.map