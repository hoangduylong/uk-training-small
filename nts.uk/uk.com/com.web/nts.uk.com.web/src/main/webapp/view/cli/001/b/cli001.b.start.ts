module cli001.b {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        $(window).resize(() => {
            $("#single-list").igGrid("option", "height", window.innerHeight - 150  + "px");
            $("#single-list").igGrid("option", "alternateRowStyles", false);
            $("#single-list").igGrid("option", "alternateRowStyles", true);
        }).trigger('resize');
        $("#searchInput").focus();
    });
}
