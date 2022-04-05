module ccg014.b {
    __viewContext.ready(function() {
        let copyData = nts.uk.ui.windows.getShared("copyData");
        var screenModel = new viewmodel.ScreenModel(copyData);
        __viewContext.bind(screenModel);
    });
}