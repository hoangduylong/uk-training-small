var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var at;
        (function (at) {
            var view;
            (function (view) {
                var cps013;
                (function (cps013) {
                    var e;
                    (function (e) {
                        __viewContext.ready(function () {
                            var screenModel = new e.viewmodel.ScreenModel();
                            __viewContext["viewmodel"] = screenModel;
                            __viewContext.bind(screenModel);
                            var dataFromA = nts.uk.ui.windows.getShared("CPS013B_PARAMS");
                            screenModel.start(dataFromA);
                            $("#btn-f-close").focus();
                        });
                    })(e = cps013.e || (cps013.e = {}));
                })(cps013 = view.cps013 || (view.cps013 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps013.e.start.js.map