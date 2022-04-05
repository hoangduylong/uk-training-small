module cmm044.d {
    __viewContext.ready(function() {
        var screenModel = new cmm044.d.viewmodel.ScreenModel();
            screenModel.start().done(function() {
            __viewContext.bind(screenModel);
        });
    });
}