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
                    var k;
                    (function (k) {
                        var model = cmf002.share.model;
                        __viewContext.ready(function () {
                            nts.uk.ui.block.invisible();
                            __viewContext['screenModel'] = new k.viewmodel.ScreenModel();
                            __viewContext['screenModel'].start().done(function () {
                                __viewContext.bind(__viewContext['screenModel']);
                                __viewContext['screenModel'].dateDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE ? $('#K2_1').focus() : $('#K4_1').focus();
                            }).always(function () {
                                nts.uk.ui.block.clear();
                            });
                        });
                    })(k = cmf002.k || (cmf002.k = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.k.start.js.map