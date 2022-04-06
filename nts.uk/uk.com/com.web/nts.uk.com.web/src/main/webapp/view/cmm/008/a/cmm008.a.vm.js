var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm008;
                (function (cmm008) {
                    var a;
                    (function (a) {
                        var blockUI = nts.uk.ui.block;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.showsGroupCompany = ko.observable(true);
                                    self.isUpdateMode = ko.observable(false);
                                    self.enableDelete = ko.observable(true);
                                    self.employmentModel = ko.observable(new EmploymentModel);
                                    self.selectedCode = ko.observable("");
                                    self.commonMasterName = ko.observable("");
                                    self.selectedCodeMaster = ko.observable("");
                                    self.commonMasterItemId = ko.observable("");
                                    //Item List Master Common
                                    self.itemListMatter = ko.observableArray([]);
                                    self.selectedCode.subscribe(function (empCode) {
                                        if (empCode) {
                                            self.clearErrors();
                                            self.loadEmployment(empCode);
                                        }
                                        else {
                                            self.clearData();
                                        }
                                    });
                                    // Initial listComponentOption
                                    self.listComponentOption = {
                                        isMultiSelect: false,
                                        listType: ListType.EMPLOYMENT,
                                        selectType: SelectType.SELECT_BY_SELECTED_CODE,
                                        selectedCode: self.selectedCode,
                                        isDialog: false,
                                        tabindex: 6
                                    };
                                    self.empList = ko.observableArray([]);
                                    self.enableEmpCode = ko.observable(false);
                                }
                                /**
                                 * Start Page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var dfd = $.Deferred();
                                    var self = this;
                                    blockUI.invisible();
                                    $('#emp-component').ntsListComponent(self.listComponentOption).done(function () {
                                        // Get Data List
                                        if (($('#emp-component').getDataList() == undefined) || ($('#emp-component').getDataList().length <= 0)) {
                                            self.clearData();
                                        }
                                        else {
                                            // Get Employment List after Load Component
                                            self.empList($('#emp-component').getDataList());
                                            // Select first Item in Employment List
                                            self.selectedCode(self.empList()[0].code);
                                            // Find and bind selected Employment
                                            //self.loadEmployment(self.selectedCode());
                                        }
                                        a.service.findGroupCommonMaster().done(function (data) {
                                            // self.itemListMatter(data.commonMasterItems);
                                            self.commonMasterName(data.commonMasterName);
                                            self.itemListMatter(data.commonMasterItems);
                                        });
                                        blockUI.clear();
                                    });
                                    // $.when(taskNtsComponent, taskFindGroupCommonMaster).then(function() {
                                    dfd.resolve();
                                    // });
                                    return dfd.promise();
                                };
                                /**
                                 * load Employment
                                 */
                                ScreenModel.prototype.loadEmployment = function (code) {
                                    var self = this;
                                    a.service.findEmployment(code).done(function (employment) {
                                        if (employment) {
                                            self.selectedCode(employment.code);
                                            self.employmentModel().updateEmpData(employment);
                                            self.employmentModel().isEnableCode(false);
                                            self.enableDelete(true);
                                            self.isUpdateMode(true);
                                            self.itemListMatter(employment.commonMasterItems);
                                            self.commonMasterName(employment.commonMasterName);
                                            self.selectedCodeMaster(employment.empCommonMasterItemId);
                                            // => dong nay rat la nham nhi =>> self.commonMasterItemId(employment.commonMasterItemId);
                                            console.log("yeah");
                                            if (employment.errMessage !== null) {
                                                self.showsGroupCompany(false);
                                                self.selectedCode(employment.code);
                                                nts.uk.ui.dialog.alertError({ messageId: employment.errMessage });
                                            }
                                            $('#empName').focus();
                                        }
                                    });
                                };
                                /**
                                 * Clear Data
                                 */
                                ScreenModel.prototype.clearData = function () {
                                    var self = this;
                                    self.selectedCode("");
                                    self.employmentModel().resetEmpData();
                                    self.selectedCodeMaster("");
                                    self.enableDelete(false);
                                    self.clearErrors();
                                    self.isUpdateMode(false);
                                    $('#empCode').focus();
                                };
                                /**
                                 * Create Employment
                                 */
                                ScreenModel.prototype.createEmployment = function () {
                                    var self = this;
                                    // Validate
                                    if (self.hasError()) {
                                        return;
                                    }
                                    var command = {};
                                    command.employmentCode = self.employmentModel().employmentCode();
                                    command.employmentName = self.employmentModel().employmentName();
                                    command.empExternalCode = self.employmentModel().empExternalCode();
                                    command.memo = self.employmentModel().memo();
                                    command.isUpdateMode = self.isUpdateMode();
                                    command.commonMasterName = 'M000031';
                                    command.selectedCodeMaster = self.selectedCodeMaster();
                                    blockUI.invisible();
                                    a.service.saveEmployment(command).done(function () {
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                            // ReLoad Component
                                            $('#emp-component').ntsListComponent(self.listComponentOption).done(function () {
                                                // Get Employment List after Load Component
                                                self.empList($('#emp-component').getDataList());
                                                self.enableDelete(true);
                                                self.employmentModel().isEnableCode(false);
                                                self.selectedCode(self.employmentModel().employmentCode());
                                                $('#empName').focus();
                                            });
                                        });
                                        blockUI.clear();
                                    }).fail(function (error) {
                                        blockUI.clear();
                                        if (error.messageId == 'Msg_3') {
                                            blockUI.clear();
                                            $('#empCode').ntsError('set', { messageId: "Msg_3" });
                                        }
                                        else {
                                            nts.uk.ui.dialog.alertError(error);
                                        }
                                    });
                                };
                                /**
                                 * Delete Employment
                                 */
                                ScreenModel.prototype.deleteEmployment = function () {
                                    var self = this;
                                    // Validate
                                    if (self.hasError()) {
                                        return;
                                    }
                                    // Remove
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        var command = {
                                            employmentCode: self.employmentModel().employmentCode()
                                        };
                                        blockUI.invisible();
                                        a.service.removeEmployment(command).done(function () {
                                            nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                // Reload Component
                                                $('#emp-component').ntsListComponent(self.listComponentOption).done(function () {
                                                    // Filter selected Item
                                                    var existItem = self.empList().filter(function (item) {
                                                        return item.code == self.employmentModel().employmentCode();
                                                    })[0];
                                                    // Check Data List
                                                    if (($('#emp-component').getDataList() == undefined) || ($('#emp-component').getDataList().length <= 0)) {
                                                        self.clearData();
                                                    }
                                                    else {
                                                        self.enableDelete(true);
                                                        var index = self.empList().indexOf(existItem);
                                                        // Get Employment List after Load Component
                                                        self.empList($('#emp-component').getDataList());
                                                        var emplistLength = self.empList().length;
                                                        if (index == (self.empList().length)) {
                                                            self.selectedCode(self.empList()[index - 1].code);
                                                        }
                                                        else {
                                                            self.selectedCode(self.empList()[index].code);
                                                        }
                                                    }
                                                });
                                            });
                                            blockUI.clear();
                                        }).fail(function (res) {
                                            nts.uk.ui.dialog.alertError(res.message).then(function () { blockUI.clear(); });
                                        });
                                    }).ifNo(function () {
                                        blockUI.clear();
                                        $('#empName').focus();
                                    });
                                };
                                /**
                                 * Check Errors all input.
                                 */
                                ScreenModel.prototype.hasError = function () {
                                    var self = this;
                                    self.clearErrors();
                                    $('#empCode').ntsEditor("validate");
                                    $('#empName').ntsEditor("validate");
                                    if ($('.nts-input').ntsError('hasError')) {
                                        return true;
                                    }
                                    return false;
                                    //                return $('.nts-editor').ntsError('hasError');
                                };
                                /**
                                 * Clear Errors
                                 */
                                ScreenModel.prototype.clearErrors = function () {
                                    var self = this;
                                    //                // Clear errors
                                    $('#empCode').ntsError('clear');
                                    $('#empName').ntsError('clear');
                                    $('#extCode').ntsError('clear');
                                    $('#memo').ntsError('clear');
                                    // Clear error inputs
                                    $('.nts-input').ntsError('clear');
                                };
                                ScreenModel.prototype.exportExcel = function () {
                                    var self = this;
                                    nts.uk.ui.block.grayout();
                                    var langId = "ja";
                                    a.service.saveAsExcel(langId).done(function () {
                                    }).fail(function (error) {
                                        nts.uk.ui.dialog.alertError({ messageId: error.messageId });
                                    }).always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            /**
                             * EmploymentModel
                             */
                            var EmploymentModel = /** @class */ (function () {
                                function EmploymentModel() {
                                    this.employmentCode = ko.observable("");
                                    this.employmentName = ko.observable("");
                                    this.empExternalCode = ko.observable("");
                                    this.memo = ko.observable("");
                                    this.isEnableCode = ko.observable(true);
                                }
                                /**
                                 * Reset Data
                                 */
                                EmploymentModel.prototype.resetEmpData = function () {
                                    this.employmentCode('');
                                    this.employmentName('');
                                    this.empExternalCode('');
                                    this.memo('');
                                    this.isEnableCode(true);
                                    this.employmentCode.subscribe(function () {
                                    });
                                };
                                /**
                                 * update Data
                                 */
                                EmploymentModel.prototype.updateEmpData = function (dto) {
                                    this.employmentCode(dto.code);
                                    this.employmentName(dto.name);
                                    this.empExternalCode(dto.empExternalCode);
                                    this.memo(dto.memo);
                                };
                                return EmploymentModel;
                            }());
                            viewmodel.EmploymentModel = EmploymentModel;
                            /**
                            * List Type
                            */
                            var ListType = /** @class */ (function () {
                                function ListType() {
                                }
                                ListType.EMPLOYMENT = 1;
                                ListType.Classification = 2;
                                ListType.JOB_TITLE = 3;
                                ListType.EMPLOYEE = 4;
                                return ListType;
                            }());
                            viewmodel.ListType = ListType;
                            /**
                             * SelectType
                             */
                            var SelectType = /** @class */ (function () {
                                function SelectType() {
                                }
                                SelectType.SELECT_BY_SELECTED_CODE = 1;
                                SelectType.SELECT_ALL = 2;
                                SelectType.SELECT_FIRST_ITEM = 3;
                                SelectType.NO_SELECT = 4;
                                return SelectType;
                            }());
                            viewmodel.SelectType = SelectType;
                            /**
                             * Class ItemModel
                             */
                            var ItemModel = /** @class */ (function () {
                                function ItemModel(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ItemModel;
                            }());
                            /** Item MasterCombobox **/
                            var ItemMaster = /** @class */ (function () {
                                function ItemMaster(commonMasterName, commonMasterItemID) {
                                    this.commonMasterName = commonMasterName;
                                    this.commonMasterItemID = commonMasterItemID;
                                }
                                return ItemMaster;
                            }());
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmm008.a || (cmm008.a = {}));
                })(cmm008 = view.cmm008 || (view.cmm008 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm008.a.vm.js.map