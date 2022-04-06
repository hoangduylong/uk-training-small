var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cdl023;
                (function (cdl023) {
                    var demo;
                    (function (demo) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.code = ko.observable(null);
                                    self.name = ko.observable(null);
                                    self.listRoleType = __viewContext.enums.RoleType;
                                    self.roleType = ko.observable(0);
                                    self.valueReturn = ko.observable(null);
                                    self.workFrameNoSelection = ko.observable(1);
                                    self.targetList = ko.observableArray([
                                        { value: TargetType.EMPLOYMENT, name: '雇用' },
                                        { value: TargetType.CLASSIFICATION, name: '分類' },
                                        { value: TargetType.JOB_TITLE, name: '職位' },
                                        { value: TargetType.WORKPLACE, name: '職場' },
                                        { value: TargetType.DEPARTMENT, name: '部門' },
                                        { value: TargetType.WORKPLACE_PERSONAL, name: '職場個人' },
                                        { value: TargetType.DEPARTMENT_PERSONAL, name: '部門個人' },
                                        { value: TargetType.ROLE, name: 'ロール' },
                                        { value: TargetType.WORK_TYPE, name: '勤務種別' },
                                        { value: TargetType.WORK, name: '作業' }
                                    ]);
                                    self.selectedTarget = ko.observable(1);
                                    self.baseDate = ko.observable(moment(new Date()).toDate());
                                    self.enableBaseDate = ko.computed(function () {
                                        return self.isHasBaseDate();
                                    });
                                    self.requiredRoleType = ko.computed(function () {
                                        return TargetType.ROLE == self.selectedTarget();
                                    });
                                    self.itemSetting = ko.observable(null);
                                    self.selectedItems = ko.observableArray([]);
                                    // subscribe
                                    self.selectedTarget.subscribe(function (newValue) {
                                        self.itemSetting("");
                                        self.selectedItems([]);
                                    });
                                    self.itemSetting.subscribe(function (newValue) {
                                        if (nts.uk.text.isNullOrEmpty(self.itemSetting())) {
                                            self.selectedItems([]);
                                        }
                                        // trim space
                                        self.itemSetting(self.itemSetting().replace(/\s/g, ''));
                                        self.selectedItems(self.itemSetting().split(','));
                                    });
                                }
                                /**
                                 * startPage
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                /**
                                 * closeDialog
                                 */
                                ScreenModel.prototype.openDialog = function () {
                                    var self = this;
                                    // validate
                                    if (!self.validate()) {
                                        nts.uk.ui.dialog.alert("Something fields are required or wrong.");
                                        return;
                                    }
                                    // share data
                                    var object = {
                                        code: self.code(),
                                        name: self.name(),
                                        targetType: self.selectedTarget(),
                                        itemListSetting: self.selectedItems(),
                                        baseDate: moment(self.baseDate()).toDate(),
                                        workFrameNoSelection: self.workFrameNoSelection()
                                    };
                                    if (self.requiredRoleType())
                                        object.roleType = self.roleType();
                                    nts.uk.ui.windows.setShared("CDL023Input", object);
                                    // open dialog
                                    nts.uk.ui.windows.sub.modal('/view/cdl/023/a/index.xhtml').onClosed(function () {
                                        // show data respond
                                        var lstSelection = nts.uk.ui.windows.getShared("CDL023Output");
                                        if (!lstSelection) {
                                            return;
                                        }
                                        self.valueReturn(lstSelection.join(", "));
                                    });
                                };
                                /**
                                 * isHasBaseDate
                                 */
                                ScreenModel.prototype.isHasBaseDate = function () {
                                    var self = this;
                                    return self.selectedTarget() == TargetType.WORKPLACE
                                        || self.selectedTarget() == TargetType.WORKPLACE_PERSONAL
                                        || self.selectedTarget() == TargetType.DEPARTMENT
                                        || self.selectedTarget() == TargetType.DEPARTMENT_PERSONAL
                                        || self.selectedTarget() == TargetType.WORK;
                                };
                                /**
                                 * validate
                                 */
                                ScreenModel.prototype.validate = function () {
                                    var self = this;
                                    // clear error
                                    $('#code').ntsError('clear');
                                    $('#name').ntsError('clear');
                                    // validate
                                    $('#code').ntsEditor('validate');
                                    $('#name').ntsEditor('validate');
                                    // validate base date
                                    if (self.enableBaseDate() && nts.uk.text.isNullOrEmpty(self.baseDate())) {
                                        return false;
                                    }
                                    return !$('.nts-input').ntsError('hasError');
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            /**
                             * TargetType
                             */
                            var TargetType = /** @class */ (function () {
                                function TargetType() {
                                }
                                // 雇用
                                TargetType.EMPLOYMENT = 1;
                                // 分類
                                TargetType.CLASSIFICATION = 2;
                                // 職位
                                TargetType.JOB_TITLE = 3;
                                // 職場
                                TargetType.WORKPLACE = 4;
                                // 部門
                                TargetType.DEPARTMENT = 5;
                                // 職場個人
                                TargetType.WORKPLACE_PERSONAL = 6;
                                // 部門個人
                                TargetType.DEPARTMENT_PERSONAL = 7;
                                // ロール
                                TargetType.ROLE = 8;
                                // 勤務種別
                                TargetType.WORK_TYPE = 9;
                                //作業
                                TargetType.WORK = 10; //ver 6
                                return TargetType;
                            }());
                        })(viewmodel = demo.viewmodel || (demo.viewmodel = {}));
                    })(demo = cdl023.demo || (cdl023.demo = {}));
                })(cdl023 = view.cdl023 || (view.cdl023 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl023.demo.vm.js.map