var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl004;
                (function (cdl004) {
                    var a;
                    (function (a) {
                        __viewContext.ready(function () {
                            var screenModel = new a.viewmodel.ScreenModel();
                            __viewContext.bind(screenModel);
                            $('#jobtitle').ntsListComponent(screenModel.jobtitles).done(function () {
                                $('#jobtitle').focusComponent();
                                // Check init selected code.
                                if (screenModel.isMultiple) {
                                    var dataSelected = [];
                                    for (var _i = 0, _a = screenModel.selectedMulJobtitle(); _i < _a.length; _i++) {
                                        var code = _a[_i];
                                        if (screenModel.checkExistJobtile(code, $("#jobtitle").getDataList())) {
                                            dataSelected.push(code);
                                        }
                                    }
                                    screenModel.selectedMulJobtitle(dataSelected);
                                }
                                else {
                                    if (!screenModel.checkExistJobtile(screenModel.selectedSelJobtitle(), $("#jobtitle").getDataList())) {
                                        screenModel.selectedSelJobtitle(null);
                                    }
                                }
                            });
                        });
                    })(a = cdl004.a || (cdl004.a = {}));
                })(cdl004 = view.cdl004 || (view.cdl004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl004.a.start.js.map