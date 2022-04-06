var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cli001;
                (function (cli001) {
                    var a;
                    (function (a) {
                        __viewContext.ready(function () {
                            var screenModel = new a.viewmodel.ScreenModel();
                            screenModel.startPage().done(function () {
                                __viewContext.bind(screenModel);
                                _.defer(function () { return screenModel.setInitialFocus(); });
                                $(window).resize(function () {
                                    $("#multi-list").igGrid("option", "height", window.innerHeight - 250 + "px");
                                    $("#multi-list").igGrid("option", "alternateRowStyles", false);
                                    $("#multi-list").igGrid("option", "alternateRowStyles", true);
                                }).trigger('resize');
                            });
                        });
                    })(a = cli001.a || (cli001.a = {}));
                })(cli001 = view.cli001 || (view.cli001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cli001.a.start.js.map