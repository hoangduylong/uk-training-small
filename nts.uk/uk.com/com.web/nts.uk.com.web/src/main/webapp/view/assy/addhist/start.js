var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var assy;
                (function (assy) {
                    var addhist;
                    (function (addhist) {
                        __viewContext.ready(function () {
                            var screenModel = new addhist.viewmodel.ScreenModel();
                            screenModel.startPage().done(function () {
                                __viewContext.bind(screenModel);
                                $("#start-date").focus();
                            });
                        });
                    })(addhist = assy.addhist || (assy.addhist = {}));
                })(assy = view.assy || (view.assy = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=start.js.map