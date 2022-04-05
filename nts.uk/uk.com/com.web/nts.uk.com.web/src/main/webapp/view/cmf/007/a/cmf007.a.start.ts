module cmf007.a.start {
    __viewContext.ready(function() {
        var screenModel = new cmf007.a.viewmodel.ScreenModel();
        screenModel.startPage().done(function() {
            __viewContext.bind(screenModel);           
        });
    });
}