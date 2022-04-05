module nts.uk.com.view.cdl002.a {
    __viewContext.ready(function() {
        var screenModel = new viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        // Load Component
        $('#emp-component').ntsListComponent(screenModel.listComponentOption).done(function() {
            $('#emp-component').focusComponent();
            
            // Check init selected code.
            if (screenModel.isMultiSelect()) {
                var dataSelected: string[] = [];
                for (var code of screenModel.selectedMulEmployment()) {
                    if (screenModel.checkExistEmployment(code, $("#emp-component").getDataList())) {
                        dataSelected.push(code);
                    }
                }
                screenModel.selectedMulEmployment(dataSelected);
            } else {
                if (!screenModel.checkExistEmployment(screenModel.selectedSelEmployment(), $("#emp-component").getDataList())) {
                    screenModel.selectedSelEmployment(null);
                }
            }
        });
    });
}
