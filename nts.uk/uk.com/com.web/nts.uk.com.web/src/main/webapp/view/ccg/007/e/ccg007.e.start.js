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
                    var e;
                    (function (e) {
                        __viewContext.ready(function () {
                            var parentCodes = nts.uk.ui.windows.getShared('parentCodes');
                            var screenModel = new e.viewmodel.ScreenModel(parentCodes);
                            screenModel.startPage().done(function () {
                                __viewContext.bind(screenModel);
                                $('#pass-current').focus();
                            });
                        });
                    })(e = ccg007.e || (ccg007.e = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.e.start.js.map