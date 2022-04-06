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
                    var o;
                    (function (o) {
                        __viewContext.ready(function () {
                            __viewContext.transferred.ifPresent(function (data) {
                                if (!data.roleAuthority) {
                                    nts.uk.request.jump("/view/cmf/002/a/index.xhtml");
                                }
                                else {
                                    nts.uk.ui.windows.setShared("CMF002O_PARAMS", data.roleAuthority);
                                }
                            });
                            var screenModel = new o.viewmodel.ScreenModel();
                            __viewContext.bind(screenModel);
                            // ver62: remove O screen => go to P screen
                            screenModel.selectStandardMode();
                        });
                    })(o = cmf002.o || (cmf002.o = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.o.start.js.map