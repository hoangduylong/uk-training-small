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
                    var m;
                    (function (m) {
                        var model = cmf002.share.model;
                        __viewContext.ready(function () {
                            nts.uk.ui.block.invisible();
                            __viewContext['screenModel'] = new m.viewmodel.ScreenModel();
                            __viewContext['screenModel'].start().done(function () {
                                __viewContext.bind(__viewContext['screenModel']);
                                __viewContext['screenModel'].inTimeDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE ? $('#M2_1').focus() : $('#M11_1_1').focus();
                            }).always(function () {
                                nts.uk.ui.block.clear();
                            });
                        });
                    })(m = cmf002.m || (cmf002.m = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.m.start.js.map