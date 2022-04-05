module nts.uk.com.view.cmm013.h {
    __viewContext.ready(function() {
        var screenModel = new nts.uk.com.view.cmm013.h.viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
        });
    });
}