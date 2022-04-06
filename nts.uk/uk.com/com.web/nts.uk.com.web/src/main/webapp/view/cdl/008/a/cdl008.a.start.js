var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl008;
                (function (cdl008) {
                    var a;
                    (function (a) {
                        __viewContext.ready(function () {
                            var screenModel = new a.viewmodel.ScreenModel();
                            __viewContext.bind(screenModel);
                            var id = screenModel.workplaces.startMode == 1 ? 'departmentList' : 'workplaceList';
                            $('#' + id).ntsTreeComponent(screenModel.workplaces).done(function () {
                                $('#' + id).focusTreeGridComponent();
                                // get list data to display
                                screenModel.listDataDisplay = screenModel.workplaces.listDataDisplay;
                                // Check selected code.
                                if (screenModel.isMultipleSelect && screenModel.selectedMulWorkplace().length > 0) {
                                    var selectedCodes = $('#' + id).find('#multiple-tree-grid-' + id).igTreeGrid("selectedRows");
                                    var selectedCodesExist = selectedCodes.filter(function (item) { return item.index > -1; }).map(function (item) { return item.id; });
                                    screenModel.selectedMulWorkplace(selectedCodesExist);
                                    return;
                                }
                                ko.tasks.schedule(function () {
                                    var currentDialog = nts.uk.ui.windows.getSelf();
                                    if (screenModel.isMultipleSelect) {
                                        currentDialog.setHeight(600);
                                    }
                                    else {
                                        currentDialog.setWidth(520);
                                    }
                                });
                                if (!screenModel.selectedSelWorkplace()) {
                                    return;
                                }
                                var selectedCode = $('#' + id).find('#single-tree-grid-' + id).igTreeGrid("selectedRow").id || null;
                                screenModel.selectedSelWorkplace(selectedCode);
                            });
                        });
                    })(a = cdl008.a || (cdl008.a = {}));
                })(cdl008 = view.cdl008 || (view.cdl008 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl008.a.start.js.map