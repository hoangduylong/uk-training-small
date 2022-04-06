var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl009;
                (function (cdl009) {
                    var parent;
                    (function (parent) {
                        var viewmodel;
                        (function (viewmodel) {
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.selectFirst = ko.observable(true);
                                    self.isMultiSelect = ko.observable(true);
                                    self.inputWorkplaceIds = ko.observable('');
                                    self.selectedIds = ko.observableArray([]);
                                    self.inputWorkplaceIds.subscribe(function (item) {
                                        if (item) {
                                            self.selectedIds(item.split(","));
                                        }
                                        else {
                                            self.selectedIds([]);
                                        }
                                    });
                                    self.baseDate = ko.observable(moment(new Date()).toDate());
                                    self.target = ko.observable(TargetClassification.WORKPLACE);
                                    self.selectedEmployeeId = ko.observable('');
                                    self.selectedEmps = ko.observableArray([]);
                                    self.selectionOption = ko.observableArray([
                                        { code: 0, name: 'Single' },
                                        { code: 1, name: 'Multiple' },
                                    ]);
                                    self.selectedOption = ko.observable(self.isMultiSelect() ? 1 : 0);
                                    self.selectedOption.subscribe(function (data) {
                                        if (data == 0) {
                                            self.isMultiSelect(false);
                                        }
                                        else {
                                            self.isMultiSelect(true);
                                        }
                                    });
                                    self.targetList = ko.observableArray([
                                        { code: 1, name: 'WorkPlace' },
                                        { code: 2, name: 'Department' },
                                    ]);
                                    self.selectedTarget = ko.observable(self.target());
                                    self.selectedTarget.subscribe(function (data) {
                                        if (data == TargetClassification.DEPARTMENT) {
                                            nts.uk.ui.dialog.alert("Department Target is not covered this time!");
                                            self.selectedTarget(TargetClassification.WORKPLACE);
                                        }
                                    });
                                }
                                // Open Dialog CDL009
                                ScreenModel.prototype.openDialog = function () {
                                    var self = this;
                                    //            self.inputWorkplaceIds.subscribe(function(item: string) {
                                    //                if (item) {
                                    //                    self.selectedIds(item.split(","));
                                    //                }
                                    //            });
                                    // Set Param
                                    setShared('CDL009Params', {
                                        // isMultiSelect For Employee List Kcp005
                                        isMultiple: self.isMultiSelect(),
                                        // For Workplace List Kcp004
                                        selectedIds: self.selectedIds(),
                                        // For Workplace List Kcp004
                                        baseDate: self.baseDate(),
                                        // Workplace or Department
                                        target: self.target(),
                                        // fist item is selected
                                        selectFirst: self.selectFirst()
                                    }, true);
                                    nts.uk.ui.windows.sub.modal("/view/cdl/009/a/index.xhtml").onClosed(function () {
                                        var isCancel = getShared('CDL009Cancel');
                                        if (isCancel) {
                                            return;
                                        }
                                        var output = getShared('CDL009Output');
                                        if (self.isMultiSelect()) {
                                            self.selectedEmps(output);
                                        }
                                        else {
                                            self.selectedEmployeeId(output);
                                        }
                                    });
                                };
                                // Get Code of Selected Employee(s)
                                ScreenModel.prototype.getSelectedEmp = function () {
                                    var self = this;
                                    if (self.isMultiSelect()) {
                                        return self.selectedEmps() ? self.selectedEmps().join(', ') : "";
                                    }
                                    else {
                                        return self.selectedEmployeeId() ? self.selectedEmployeeId() : "";
                                    }
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            /**
                             * Class TargetClassification
                             */
                            var TargetClassification = /** @class */ (function () {
                                function TargetClassification() {
                                }
                                TargetClassification.WORKPLACE = 1;
                                TargetClassification.DEPARTMENT = 2;
                                return TargetClassification;
                            }());
                            viewmodel.TargetClassification = TargetClassification;
                        })(viewmodel = parent.viewmodel || (parent.viewmodel = {}));
                    })(parent = cdl009.parent || (cdl009.parent = {}));
                })(cdl009 = view.cdl009 || (view.cdl009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl009.parent.vm.js.map