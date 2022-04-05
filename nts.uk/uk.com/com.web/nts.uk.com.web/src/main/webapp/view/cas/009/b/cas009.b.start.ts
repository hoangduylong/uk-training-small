module cas009.b {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        screenModel.startPage();
        __viewContext.bind(screenModel);
    });
}