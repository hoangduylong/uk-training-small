module nts.uk.com.view.cmm040.b {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            if (screenModel.isCreate() == true) {
                $("#target").focus();
            }
        });
    });
}