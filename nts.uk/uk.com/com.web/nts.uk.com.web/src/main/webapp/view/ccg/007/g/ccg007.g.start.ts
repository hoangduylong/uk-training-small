module nts.uk.pr.view.ccg007.g {
    __viewContext.ready(function() {
        var parentCodes = nts.uk.ui.windows.getShared('parentCodes');
        var screenModel = new g.viewmodel.ScreenModel(parentCodes);
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            $('#subSendMail').focus();
        });
    });
}