module nts.uk.pr.view.ccg007.e {
    __viewContext.ready(function() {
        var parentCodes = nts.uk.ui.windows.getShared('parentCodes');
        var screenModel = new e.viewmodel.ScreenModel(parentCodes);
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            $('#pass-current').focus();
        });
    });
}