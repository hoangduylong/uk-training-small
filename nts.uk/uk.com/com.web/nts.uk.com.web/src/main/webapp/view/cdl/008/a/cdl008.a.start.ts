module nts.uk.com.view.cdl008.a {
    __viewContext.ready(function() {
        let screenModel = new viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        let id = screenModel.workplaces.startMode == 1 ? 'departmentList' : 'workplaceList';
        $('#' + id).ntsTreeComponent(screenModel.workplaces).done(function() {
            $('#' + id).focusTreeGridComponent();
            
            // get list data to display
            screenModel.listDataDisplay = screenModel.workplaces.listDataDisplay;
            
            // Check selected code.
            if (screenModel.isMultipleSelect && screenModel.selectedMulWorkplace().length > 0) {
                let selectedCodes = $('#' + id).find('#multiple-tree-grid-' + id).igTreeGrid("selectedRows");
                let selectedCodesExist = selectedCodes.filter(item => item.index > -1).map(item => item.id);
                screenModel.selectedMulWorkplace(selectedCodesExist);
                return;
            }

            ko.tasks.schedule(() => {
                let currentDialog = nts.uk.ui.windows.getSelf();
                if (screenModel.isMultipleSelect) {
                    currentDialog.setHeight(600);
                } else {
                    currentDialog.setWidth(520);
                }
            });
            
            if (!screenModel.selectedSelWorkplace()) {
                return;
            }
            let selectedCode = $('#' + id).find('#single-tree-grid-' + id).igTreeGrid("selectedRow").id || null;
            screenModel.selectedSelWorkplace(selectedCode);
        });
    });
}