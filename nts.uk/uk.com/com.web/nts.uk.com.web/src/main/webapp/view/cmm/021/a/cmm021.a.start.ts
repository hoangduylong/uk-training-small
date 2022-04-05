module nts.uk.com.view.cmm021.a {
    __viewContext.ready(function() {
        var screenModel = new viewModel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            screenModel.startCcg001();
        });
    });
}