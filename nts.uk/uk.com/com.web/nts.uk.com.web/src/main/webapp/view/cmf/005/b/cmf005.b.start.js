var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf005;
                (function (cmf005) {
                    var b;
                    (function (b) {
                        __viewContext.ready(function () {
                            var screenModel = new b.viewmodel.ScreenModel();
                            screenModel.startPage().done(function (self) {
                                __viewContext.bind(self);
                                if (screenModel.rdSelected() == 1) {
                                    $("#B3_5").focus();
                                }
                                else {
                                    //focus  B3_4
                                }
                                $('#ccgcomponent').ntsGroupComponent(self.ccg001ComponentOption).done(function () {
                                    self.applyKCP005ContentSearch([]);
                                    // Load employee list component
                                    $('#employeeSearch').ntsListComponent(self.listComponentOption).done(function () {
                                    });
                                });
                            });
                        });
                    })(b = cmf005.b || (cmf005.b = {}));
                })(cmf005 = view.cmf005 || (view.cmf005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf005.b.start.js.map