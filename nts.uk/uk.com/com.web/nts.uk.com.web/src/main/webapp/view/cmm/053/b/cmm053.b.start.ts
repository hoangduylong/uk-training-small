module nts.uk.com.view.cmm053.b {
    __viewContext.ready(function() {
        let screenModel = new viewmodel.ScreenModel();
        screenModel.start().done(function() {
            __viewContext.bind(screenModel);
            _.defer(() => {$("#B1_1").focus();});
        });
    });
}