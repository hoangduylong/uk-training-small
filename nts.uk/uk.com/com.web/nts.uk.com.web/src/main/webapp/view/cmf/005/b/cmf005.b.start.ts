module nts.uk.com.view.cmf005.b {
    __viewContext.ready(function() {
        let screenModel = new viewmodel.ScreenModel();
        screenModel.startPage().done(function(self) {
            __viewContext.bind(self);
            if (screenModel.rdSelected() == 1) {
                $("#B3_5").focus();
            } else {
                //focus  B3_4
            }
            $('#ccgcomponent').ntsGroupComponent(self.ccg001ComponentOption).done(function() {
                self.applyKCP005ContentSearch([]);
                // Load employee list component
                $('#employeeSearch').ntsListComponent(self.listComponentOption).done(function() {
                });
            });
        });
    });
}