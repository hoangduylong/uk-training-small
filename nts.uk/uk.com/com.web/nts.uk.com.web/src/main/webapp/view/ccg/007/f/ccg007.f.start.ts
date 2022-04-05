module nts.uk.pr.view.ccg007.f {
    __viewContext.ready(function() {
        var parentCodes = nts.uk.ui.windows.getShared('parentCodes');
        var screenModel = new f.viewmodel.ScreenModel(parentCodes);
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);
            $('#subSendMail').focus();
        });
    });
}