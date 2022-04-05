module kcp005.a {
    __viewContext.ready(function () {
        var screenModel = new viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        // Load listComponent
            $('#component-items-list').ntsListComponent(screenModel.listComponentOption).done(function() {
                $('#component-items-list').focusComponent();
                screenModel.jsonData(JSON.stringify($('#component-items-list').getDataList(), undefined, 1));
            });
    });
}