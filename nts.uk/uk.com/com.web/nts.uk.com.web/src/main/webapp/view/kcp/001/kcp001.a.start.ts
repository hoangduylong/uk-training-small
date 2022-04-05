module kcp001.a {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        // Load Component
        $('#empt-list-setting').ntsListComponent(screenModel.listComponentOption).done(function() {
            $('#empt-list-setting').focusComponent();
            // Employment List
            screenModel.employmentList($('#empt-list-setting').getDataList());
            screenModel.jsonData(JSON.stringify(screenModel.employmentList(), undefined, 1));
        });
    });
}