module kcp {
    __viewContext.ready(function () {
        var screenModel = new viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        // Load Component
        $('#list').ntsListComponent(screenModel.listComponentOption)
        .done(function () {
            $('#list').focusComponent();
        });
    });
}