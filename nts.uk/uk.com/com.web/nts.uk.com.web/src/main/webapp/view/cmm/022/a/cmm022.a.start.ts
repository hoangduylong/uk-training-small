module nts.uk.com.view.cmm022.a {
     __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.start_page().done(function() {
            __viewContext.bind(screenModel);
        });
    });
}