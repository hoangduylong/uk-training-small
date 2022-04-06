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
                    var updhist;
                    (function (updhist) {
                        __viewContext.ready(function () {
                            var screenModel = new updhist.viewmodel.ScreenModel();
                            screenModel.startPage().done(function () {
                                __viewContext.bind(screenModel);
                                $("#start-date").focus();
                            });
                        });
                    })(updhist = assy.updhist || (assy.updhist = {}));
                })(assy = view.assy || (view.assy = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=start.js.map