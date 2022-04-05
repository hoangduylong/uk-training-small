module nts.uk.com.view.cmm049.b {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            $("#menu_set_save_button").focus();
        });
    });
}