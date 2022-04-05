module cmm044.a {
    __viewContext.ready(function() {
        var screenModel = new cmm044.a.viewmodel.ScreenModel();
        screenModel.start().done(function() {
            __viewContext.bind(screenModel);
        });
    });
}