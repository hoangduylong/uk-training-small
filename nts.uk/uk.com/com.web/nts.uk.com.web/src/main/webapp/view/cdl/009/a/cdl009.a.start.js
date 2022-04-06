var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl009;
                (function (cdl009) {
                    var a;
                    (function (a) {
                        __viewContext.ready(function () {
                            var screenModel = new a.viewmodel.ScreenModel();
                            __viewContext.bind(screenModel);
                            // Load Component
                            // BlockUI
                            nts.uk.ui.block.invisible();
                            $('#workplace-component').ntsTreeComponent(screenModel.treeGrid).done(function () {
                                $('#emp-component').ntsListComponent(screenModel.listComponentOpt).done(function () {
                                    // Clear Block UI
                                    nts.uk.ui.block.clear();
                                    $('#workplace-component').focusTreeGridComponent();
                                });
                            });
                        });
                    })(a = cdl009.a || (cdl009.a = {}));
                })(cdl009 = view.cdl009 || (view.cdl009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl009.a.start.js.map