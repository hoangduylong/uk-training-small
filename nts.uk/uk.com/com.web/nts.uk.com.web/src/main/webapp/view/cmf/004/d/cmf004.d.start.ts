module nts.uk.com.view.cmf004.d {
    __viewContext.ready(function() {
        let screenModel = new nts.uk.com.view.cmf004.d.viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            
        });
    });
}
