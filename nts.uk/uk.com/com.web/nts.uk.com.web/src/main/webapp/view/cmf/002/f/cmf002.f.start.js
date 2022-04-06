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
                    var f;
                    (function (f) {
                        __viewContext.ready(function () {
                            __viewContext['screenModel'] = new f.viewmodel.ScreenModel();
                            __viewContext['screenModel'].start().done(function () {
                                __viewContext.bind(__viewContext['screenModel']);
                                _.defer(function () {
                                    $('#F4_2_container').focus();
                                });
                            });
                        });
                    })(f = cmf002.f || (cmf002.f = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.f.start.js.map