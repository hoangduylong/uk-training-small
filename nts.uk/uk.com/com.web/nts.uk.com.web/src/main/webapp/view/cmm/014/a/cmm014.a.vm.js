var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm014;
                (function (cmm014) {
                    var a;
                    (function (a) {
                        var blockUI = nts.uk.ui.block;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.isUpdateMode = ko.observable(false);
                                    self.enableDelete = ko.observable(true);
                                    self.classificationModel = ko.observable(new ClassificationModel);
                                    self.selectedCode = ko.observable("");
                                    self.selectedCode.subscribe(function (clfCode) {
                                        if (clfCode) {
                                            self.clearErrors();
                                            self.loadClassification(clfCode);
                                        }
                                        else {
                                            self.clearData();
                                        }
                                    });
                                    // Initial listComponentOption
                                    self.listComponentOption = {
                                        isMultiSelect: false,
                                        listType: ListType.Classification,
                                        selectType: SelectType.SELECT_BY_SELECTED_CODE,
                                        selectedCode: self.selectedCode,
                                        isDialog: false,
                                        tabindex: 5
                                    };
                                    self.clfList = ko.observableArray([]);
                                    self.enableClfCode = ko.observable(false);
                                }
                                /**
                                 * Start Page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var dfd = $.Deferred();
                                    var self = this;
                                    blockUI.invisible();
                                    // Load Component
                                    $('#clf-component').ntsListComponent(self.listComponentOption).done(function () {
                                        // Get Data List
                                        if (($('#clf-component').getDataList() == undefined) || ($('#clf-component').getDataList().length <= 0)) {
                                            self.clearData();
                                        }
                                        else {
                                            // Get Classification List after Load Component
                                            self.clfList($('#clf-component').getDataList());
                                            // Select first Item in Classification List
                                            self.selectedCode(self.clfList()[0].code);
                                            // Find and bind selected Classification
                                            self.loadClassification(self.selectedCode());
                                        }
                                        blockUI.clear();
                                    });
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                /**
                                 * load Classification
                                 */
                                ScreenModel.prototype.loadClassification = function (code) {
                                    var self = this;
                                    a.service.findClassification(code).done(function (classification) {
                                        if (classification) {
                                            self.selectedCode(classification.code);
                                            self.classificationModel().updateData(classification);
                                            self.classificationModel().isEnableCode(false);
                                            self.enableDelete(true);
                                            self.isUpdateMode(true);
                                            $('#clfName').focus();
                                        }
                                    });
                                };
                                /**
                                 * Clear Data
                                 */
                                ScreenModel.prototype.clearData = function () {
                                    var self = this;
                                    self.selectedCode("");
                                    self.classificationModel().resetData();
                                    self.enableDelete(false);
                                    self.clearErrors();
                                    self.isUpdateMode(false);
                                    $('#clfCode').focus();
                                };
                                /**
                                 * Create Employment
                                 */
                                ScreenModel.prototype.createClassification = function () {
                                    var self = this;
                                    // Validate
                                    if (self.hasError()) {
                                        return;
                                    }
                                    var command = {};
                                    command.classificationCode = self.classificationModel().classificationCode();
                                    command.classificationName = self.classificationModel().classificationName();
                                    command.memo = self.classificationModel().memo();
                                    command.isUpdateMode = self.isUpdateMode();
                                    a.service.saveClassification(command).done(function () {
                                        blockUI.invisible();
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                            // ReLoad Component
                                            $('#clf-component').ntsListComponent(self.listComponentOption).done(function () {
                                                // Get Classification List after Load Component
                                                self.clfList($('#clf-component').getDataList());
                                                self.enableDelete(true);
                                                self.classificationModel().isEnableCode(false);
                                                self.selectedCode(self.classificationModel().classificationCode());
                                                $('#clfName').focus();
                                            });
                                        });
                                        blockUI.clear();
                                    }).fail(function (error) {
                                        $('#clfCode').ntsError('set', { messageId: error.messageId });
                                    });
                                };
                                /**
                                 * Delete Classification
                                 */
                                ScreenModel.prototype.deleteClassification = function () {
                                    var self = this;
                                    // Validate
                                    if (self.hasError()) {
                                        return;
                                    }
                                    // Remove
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        var command = {
                                            classificationCode: self.classificationModel().classificationCode()
                                        };
                                        blockUI.invisible();
                                        a.service.removeClassification(command).done(function () {
                                            nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                // Reload Component
                                                $('#clf-component').ntsListComponent(self.listComponentOption).done(function () {
                                                    // Filter selected Item
                                                    var existItem = self.clfList().filter(function (item) {
                                                        return item.code == self.classificationModel().classificationCode();
                                                    })[0];
                                                    // Check Data List
                                                    if (($('#clf-component').getDataList() == undefined) || ($('#clf-component').getDataList().length <= 0)) {
                                                        self.clearData();
                                                    }
                                                    else {
                                                        self.enableDelete(true);
                                                        var index = self.clfList().indexOf(existItem);
                                                        // Get Classification List after Load Component
                                                        self.clfList($('#clf-component').getDataList());
                                                        var emplistLength = self.clfList().length;
                                                        if (index == (self.clfList().length)) {
                                                            self.selectedCode(self.clfList()[index - 1].code);
                                                        }
                                                        else {
                                                            self.selectedCode(self.clfList()[index].code);
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
                                        $('#clfName').focus();
                                    });
                                };
                                /**
                                 * Check Errors all input.
                                 */
                                ScreenModel.prototype.hasError = function () {
                                    var self = this;
                                    self.clearErrors();
                                    $('#clfCode').ntsEditor("validate");
                                    $('#clfName').ntsEditor("validate");
                                    $('#memo').ntsEditor("validate");
                                    if ($('.nts-input').ntsError('hasError')) {
                                        return true;
                                    }
                                    return false;
                                };
                                /**
                                 * Clear Errors
                                 */
                                ScreenModel.prototype.clearErrors = function () {
                                    var self = this;
                                    //                // Clear errors
                                    $('#clfCode').ntsError('clear');
                                    $('#clfName').ntsError('clear');
                                    $('#memo').ntsError('clear');
                                    // Clear error inputs
                                    $('.nts-input').ntsError('clear');
                                };
                                //exportExcel
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
                             * ClassificationModel
                             */
                            var ClassificationModel = /** @class */ (function () {
                                function ClassificationModel() {
                                    this.classificationCode = ko.observable("");
                                    this.classificationName = ko.observable("");
                                    this.memo = ko.observable("");
                                    this.isEnableCode = ko.observable(true);
                                }
                                /**
                                 * Reset Data
                                 */
                                ClassificationModel.prototype.resetData = function () {
                                    this.classificationCode('');
                                    this.classificationName('');
                                    this.memo('');
                                    this.isEnableCode(true);
                                    this.classificationCode.subscribe(function () {
                                    });
                                };
                                /**
                                 * update Data
                                 */
                                ClassificationModel.prototype.updateData = function (dto) {
                                    this.classificationCode(dto.code);
                                    this.classificationName(dto.name);
                                    this.memo(dto.memo);
                                };
                                return ClassificationModel;
                            }());
                            viewmodel.ClassificationModel = ClassificationModel;
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
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmm014.a || (cmm014.a = {}));
                })(cmm014 = view.cmm014 || (view.cmm014 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm014.a.vm.js.map