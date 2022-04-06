var cli001;
(function (cli001) {
    var b;
    (function (b) {
        __viewContext.ready(function () {
            var screenModel = new b.viewmodel.ScreenModel();
            __viewContext.bind(screenModel);
            $(window).resize(function () {
                $("#single-list").igGrid("option", "height", window.innerHeight - 150 + "px");
                $("#single-list").igGrid("option", "alternateRowStyles", false);
                $("#single-list").igGrid("option", "alternateRowStyles", true);
            }).trigger('resize');
            $("#searchInput").focus();
        });
    })(b = cli001.b || (cli001.b = {}));
})(cli001 || (cli001 = {}));
//# sourceMappingURL=cli001.b.start.js.map