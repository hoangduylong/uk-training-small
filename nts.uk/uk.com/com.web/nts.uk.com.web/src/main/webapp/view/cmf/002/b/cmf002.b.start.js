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
                    var b;
                    (function (b) {
                        __viewContext.ready(function () {
                            __viewContext.transferred.ifPresent(function (data) {
                                if (!data.roleAuthority) {
                                    nts.uk.request.jump("/view/cmf/002/a/index.xhtml");
                                }
                                else {
                                    nts.uk.ui.windows.setShared("CMF002B_PARAMS", data.roleAuthority);
                                }
                            });
                            var screenModel = new b.viewmodel.ScreenModel();
                            screenModel.startPage().done(function () {
                                __viewContext.bind(screenModel);
                            });
                        });
                    })(b = cmf002.b || (cmf002.b = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.b.start.js.map