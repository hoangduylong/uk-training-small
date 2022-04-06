var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var pr;
        (function (pr) {
            var view;
            (function (view) {
                var ccg007;
                (function (ccg007) {
                    var f;
                    (function (f) {
                        __viewContext.ready(function () {
                            var parentCodes = nts.uk.ui.windows.getShared('parentCodes');
                            var screenModel = new f.viewmodel.ScreenModel(parentCodes);
                            screenModel.startPage().done(function () {
                                __viewContext.bind(screenModel);
                                $('#subSendMail').focus();
                            });
                        });
                    })(f = ccg007.f || (ccg007.f = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.f.start.js.map