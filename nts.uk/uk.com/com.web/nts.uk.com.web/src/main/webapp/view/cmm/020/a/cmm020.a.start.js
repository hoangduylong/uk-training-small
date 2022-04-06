var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm020;
                (function (cmm020) {
                    var a;
                    (function (a) {
                        __viewContext.ready(function () {
                            var screenModel = new a.viewmodel.ScreenModel();
                            screenModel.start_page().done(function () {
                                __viewContext.bind(screenModel);
                                var do_focus = function () {
                                    $("#single-list_scrollContainer").scrollTop($("#single-list").height());
                                    screenModel.isFocus(true);
                                };
                                setTimeout(do_focus, 500);
                            });
                        });
                    })(a = cmm020.a || (cmm020.a = {}));
                })(cmm020 = view.cmm020 || (view.cmm020 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm020.a.start.js.map