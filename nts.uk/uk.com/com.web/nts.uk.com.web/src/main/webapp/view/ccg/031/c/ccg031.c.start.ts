module nts.uk.com.view.ccg031.c {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.startPage();
        __viewContext.bind(screenModel);
    });
}