module kcp002.a {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        //load Classification list
        $('#classification-list-setting').ntsListComponent(screenModel.listComponentOption).done(function() {
            $('#classification-list-setting').focusComponent();
            screenModel.classificationList($('#classification-list-setting').getDataList());
            screenModel.jsonData(JSON.stringify($('#classification-list-setting').getDataList(), undefined,2));
        });

    });
}