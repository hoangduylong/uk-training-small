module nts.uk.com.view.cmf002.a {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            _.defer(() => {
                $('#buttonImport').focus();
            });
        });
    });
}
