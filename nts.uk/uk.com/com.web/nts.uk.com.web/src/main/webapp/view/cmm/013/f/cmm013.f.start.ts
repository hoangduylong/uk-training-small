module nts.uk.com.view.cmm013.f {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            // Set focus 
            if (screenModel.createMode()) {
                $('#sequence-code').focus();
            } else {
                $('#sequence-name').focus();
            }
        });
    });
}