module nts.uk.com.view.ccg013.k {
    __viewContext.ready(function() {
        let screenModel = new k.viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
        });
    });
}
