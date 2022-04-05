module nts.uk.pr.view.ccg007.i {
    __viewContext.ready(function() {
        var screenModel = new i.viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            $('#close-policy').focus();
        });
    });
}