module nts.uk.com.view.cdl027.a {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            $("#A1_1").focus();
        });
    });
}
