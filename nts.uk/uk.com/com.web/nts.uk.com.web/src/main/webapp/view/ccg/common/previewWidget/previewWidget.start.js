var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg;
                (function (ccg) {
                    var common;
                    (function (common) {
                        var previewWidget;
                        (function (previewWidget) {
                            __viewContext.ready(function () {
                                var screenModel = new previewWidget.viewmodel.ScreenModel();
                                screenModel.startPage().done(function () {
                                    __viewContext.bind(screenModel);
                                });
                            });
                        })(previewWidget = common.previewWidget || (common.previewWidget = {}));
                    })(common = ccg.common || (ccg.common = {}));
                })(ccg = view.ccg || (view.ccg = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=previewWidget.start.js.map