module nts.uk.com.view.cli001.a {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            _.defer(() => screenModel.setInitialFocus());
            $(window).resize(() => {
                $("#multi-list").igGrid("option", "height", window.innerHeight - 250  + "px");
                $("#multi-list").igGrid("option", "alternateRowStyles", false);
                $("#multi-list").igGrid("option", "alternateRowStyles", true);
            }).trigger('resize'); 
        });
    });
}