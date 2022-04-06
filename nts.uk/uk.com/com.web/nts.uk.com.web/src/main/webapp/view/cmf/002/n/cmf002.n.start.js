var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf002;
                (function (cmf002) {
                    var n;
                    (function (n) {
                        var model = cmf002.share.model;
                        __viewContext.ready(function () {
                            nts.uk.ui.block.invisible();
                            __viewContext['screenModel'] = new n.viewmodel.ScreenModel();
                            __viewContext['screenModel'].start().done(function () {
                                __viewContext.bind(__viewContext['screenModel']);
                                __viewContext['screenModel'].atWorkDataOutputItem().fixedValue() == model.NOT_USE_ATR.NOT_USE ? $('#N2_1_2').focus() : $('#N3_1').focus();
                            }).always(function () {
                                nts.uk.ui.block.clear();
                            });
                        });
                    })(n = cmf002.n || (cmf002.n = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.n.start.js.map