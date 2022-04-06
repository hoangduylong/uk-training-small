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
                    var j;
                    (function (j) {
                        var model = cmf002.share.model;
                        __viewContext.ready(function () {
                            nts.uk.ui.block.invisible();
                            __viewContext['screenModel'] = new j.viewmodel.ScreenModel();
                            __viewContext['screenModel'].start().done(function () {
                                __viewContext.bind(__viewContext['screenModel']);
                                __viewContext['screenModel'].characterDataFormatSetting().fixedValue() == model.NOT_USE_ATR.NOT_USE ? $('#J2_1').focus() : $('#J7_1').focus();
                            }).always(function () {
                                nts.uk.ui.block.clear();
                            });
                        });
                    })(j = cmf002.j || (cmf002.j = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.j.start.js.map