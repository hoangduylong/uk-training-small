module kcp003.a {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        // Load listComponent and initial Job Title List
        $('#component-items-list').ntsListComponent(screenModel.listComponentOption).done(function() {
            $('#component-items-list').focusComponent();
            // Job Title List
            screenModel.jobTitleList($('#component-items-list').getDataList());
            screenModel.jsonData(JSON.stringify(screenModel.jobTitleList(), undefined, 1));
        });
    });
}