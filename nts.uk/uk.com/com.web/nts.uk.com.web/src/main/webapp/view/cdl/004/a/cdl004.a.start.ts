module nts.uk.com.view.cdl004.a {

    __viewContext.ready(function() {

        var screenModel = new viewmodel.ScreenModel();
        __viewContext.bind(screenModel);
        $('#jobtitle').ntsListComponent(screenModel.jobtitles).done(function() {
            $('#jobtitle').focusComponent();
            
            // Check init selected code.
            if (screenModel.isMultiple) {
                var dataSelected: string[] = [];
                for (var code of screenModel.selectedMulJobtitle()) {
                    if (screenModel.checkExistJobtile(code, $("#jobtitle").getDataList())) {
                        dataSelected.push(code);
                    }
                }
                screenModel.selectedMulJobtitle(dataSelected);
            } else {
                if (!screenModel.checkExistJobtile(screenModel.selectedSelJobtitle(), $("#jobtitle").getDataList())) {
                    screenModel.selectedSelJobtitle(null);
                }
            }
        });

    });
}