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
                    var v2;
                    (function (v2) {
                        __viewContext.ready(function () {
                            __viewContext['screenModel'] = new v2.viewmodel.ScreenModel();
                            __viewContext['screenModel'].start().done(function () {
                                __viewContext.bind(__viewContext['screenModel']);
                                _.defer(function () {
                                    $('#V2_2_container').focus();
                                });
                            });
                        });
                    })(v2 = cmf002.v2 || (cmf002.v2 = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.v2.start.js.map