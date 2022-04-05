module nts.uk.pr.view.ccg007.h {
    __viewContext.ready(function() {
        var screenModel = new h.viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            $('#password-input').focus();
        });
    });
}