__viewContext.ready(function () {
    var screenModel = new cmm001.a.ViewModel();
    screenModel.start(undefined).done(function () {
        nts.uk.ui.confirmSave(screenModel.dirtyObject);
        __viewContext.bind(screenModel);
        if (screenModel.sel001Data().length > 0) {
            $("#companyName").focus();
        }
        else {
            screenModel.checkInsert(true);
            $("#companyCode").focus();
        }
    });
});
//# sourceMappingURL=cmm001.a.start.js.map