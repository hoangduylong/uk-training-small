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
                    var i;
                    (function (i) {
                        var model = cmf002.share.model;
                        __viewContext.ready(function () {
                            nts.uk.ui.block.invisible();
                            __viewContext['screenModel'] = new i.viewmodel.ScreenModel();
                            __viewContext['screenModel'].start().done(function () {
                                __viewContext.bind(__viewContext['screenModel']);
                                __viewContext['screenModel'].numberDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE ? $('#I2_1').focus() : $('#I7_1').focus();
                            }).always(function () {
                                nts.uk.ui.block.clear();
                            });
                        });
                    })(i = cmf002.i || (cmf002.i = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.i.start.js.map