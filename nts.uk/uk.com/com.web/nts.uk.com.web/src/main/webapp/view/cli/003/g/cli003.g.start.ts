module nts.uk.com.view.cli003.g {
    __viewContext.ready(function() {
        let screenModel = new viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
        });
        __viewContext.bind(screenModel);
    });
}