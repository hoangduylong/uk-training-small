module nts.uk.com.view.cmm022.c {
     __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.start_page().done(function() {
            __viewContext.bind(screenModel);
            $("#multi-list").focus();
        });
    });
}