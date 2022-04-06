var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm007;
                (function (cmm007) {
                    var a;
                    (function (a) {
                        var blockUI = nts.uk.ui.block;
                        __viewContext.ready(function () {
                            var mainTab = new a.viewmodel.ScreenModel();
                            blockUI.grayout();
                            mainTab.start_page().done(function (screenModel) {
                                __viewContext.bind(screenModel);
                                screenModel.onSelectTabB();
                                blockUI.clear();
                            });
                        });
                    })(a = cmm007.a || (cmm007.a = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.a.start.js.map