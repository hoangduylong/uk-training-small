module kcp010.a {
    __viewContext.ready(function () {
        var screenModel = new viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        // Load listComponent
        $('#wkp-component').ntsLoadListComponent(screenModel.listComponentOption);
    });
}