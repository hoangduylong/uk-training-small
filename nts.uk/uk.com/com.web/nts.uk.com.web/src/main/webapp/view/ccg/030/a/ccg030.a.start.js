var ccg030;
(function (ccg030) {
    var a;
    (function (a) {
        var start;
        (function (start) {
            __viewContext.ready(function () {
                var screenModel = new ccg030.a.viewmodel.ScreenModel();
                screenModel.startPage().done(function () {
                    __viewContext.bind(screenModel);
                    $(".browser-button").attr("tabindex", 7);
                    $(".filename").attr("tabindex", 8);
                    _.defer(function () { screenModel.focusToInput(); });
                });
            });
        })(start = a.start || (a.start = {}));
    })(a = ccg030.a || (ccg030.a = {}));
})(ccg030 || (ccg030 = {}));
//# sourceMappingURL=ccg030.a.start.js.map