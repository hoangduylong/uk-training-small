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
                    var y;
                    (function (y) {
                        __viewContext.ready(function () {
                            var screenModel = new y.viewmodel.ScreenModel();
                            screenModel.start().done(function () {
                                __viewContext.bind(screenModel);
                                _.defer(function () {
                                    $('#listlog_container').removeAttr('tabindex');
                                    $('#Y20_1').focus();
                                });
                            });
                        });
                    })(y = cmf002.y || (cmf002.y = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.y.start.js.map