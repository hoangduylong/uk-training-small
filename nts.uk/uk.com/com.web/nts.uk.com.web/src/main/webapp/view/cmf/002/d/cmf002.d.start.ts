module nts.uk.com.view.cmf002.d {
    __viewContext.ready(function() {
        let screenModel = new viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            _.defer(() => {
                $('#D5_2_container').focus();    
            });
        });
    });
}
