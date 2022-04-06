var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf003;
                (function (cmf003) {
                    var b;
                    (function (b) {
                        __viewContext.ready(function () {
                            __viewContext['screenModel'] = new b.viewmodel.ScreenModel();
                            var vm = __viewContext['screenModel'];
                            vm.startPage().done(function (self) {
                                __viewContext.bind(self);
                                $("#B3_6").focus();
                                $('#ccgcomponent').ntsGroupComponent(self.ccgcomponent).done(function () {
                                    self.applyKCP005ContentSearch([]);
                                    // Load employee list component
                                    $('#employeeSearch').ntsListComponent(self.lstPersonComponentOption).done(function () {
                                        $('#dateRangePickerPeriod').find('input').first().focus();
                                    });
                                });
                            });
                        });
                    })(b = cmf003.b || (cmf003.b = {}));
                })(cmf003 = view.cmf003 || (view.cmf003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf003.b.start.js.map