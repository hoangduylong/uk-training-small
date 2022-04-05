module nts.uk.com.view.cdl009.a {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        // Load Component
        // BlockUI
        nts.uk.ui.block.invisible();
        $('#workplace-component').ntsTreeComponent(screenModel.treeGrid).done(function() {
            $('#emp-component').ntsListComponent(screenModel.listComponentOpt).done(function() {
                // Clear Block UI
                nts.uk.ui.block.clear();
                $('#workplace-component').focusTreeGridComponent();
            });
        });
    });
}
