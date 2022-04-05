module nts.uk.com.view.cmf003.b {
    __viewContext.ready(function() {
       __viewContext['screenModel'] = new viewmodel.ScreenModel();
       let vm: any = __viewContext['screenModel'];
        vm.startPage().done(function(self) {
            __viewContext.bind(self);
            $("#B3_6").focus();
            $('#ccgcomponent').ntsGroupComponent(self.ccgcomponent).done(function() {
                self.applyKCP005ContentSearch([]);
                // Load employee list component
                $('#employeeSearch').ntsListComponent(self.lstPersonComponentOption).done(function() {
                    $('#dateRangePickerPeriod').find('input').first().focus();
                });
            });
        });
    });
}