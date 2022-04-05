module nts.uk.com.view.cmm013.a {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            // Set focus 
            if (screenModel.createMode()) {
                $('#job-title-code').focus();
            } else {
                $('#job-title-name').focus();
            }
        });
    });
}