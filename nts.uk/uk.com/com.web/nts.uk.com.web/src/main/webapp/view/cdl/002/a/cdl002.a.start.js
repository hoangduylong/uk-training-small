var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl002;
                (function (cdl002) {
                    var a;
                    (function (a) {
                        __viewContext.ready(function () {
                            var screenModel = new a.viewmodel.ScreenModel();
                            __viewContext.bind(screenModel);
                            // Load Component
                            $('#emp-component').ntsListComponent(screenModel.listComponentOption).done(function () {
                                $('#emp-component').focusComponent();
                                // Check init selected code.
                                if (screenModel.isMultiSelect()) {
                                    var dataSelected = [];
                                    for (var _i = 0, _a = screenModel.selectedMulEmployment(); _i < _a.length; _i++) {
                                        var code = _a[_i];
                                        if (screenModel.checkExistEmployment(code, $("#emp-component").getDataList())) {
                                            dataSelected.push(code);
                                        }
                                    }
                                    screenModel.selectedMulEmployment(dataSelected);
                                }
                                else {
                                    if (!screenModel.checkExistEmployment(screenModel.selectedSelEmployment(), $("#emp-component").getDataList())) {
                                        screenModel.selectedSelEmployment(null);
                                    }
                                }
                            });
                        });
                    })(a = cdl002.a || (cdl002.a = {}));
                })(cdl002 = view.cdl002 || (view.cdl002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl002.a.start.js.map