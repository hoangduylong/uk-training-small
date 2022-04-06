var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm013;
                (function (cmm013) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var Constants = cmm013.base.Constants;
                            var JobTitleHistoryAbstract = cmm013.base.JobTitleHistoryAbstract;
                            var History = cmm013.base.History;
                            var Period = cmm013.base.Period;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.jobTitleHistoryModel = ko.observable(new JobTitleHistoryModel(_self));
                                    _self.createMode = ko.observable(null);
                                    _self.createMode.subscribe(function (newValue) {
                                        _self.changeMode(newValue);
                                    });
                                    // Init list JobTitle setting
                                    _self.baseDate = ko.observable(moment(new Date()).toDate());
                                    _self.selectedJobTitleId = ko.observable("");
                                    _self.selectedJobTitleId.subscribe(function (newValue) {
                                        if (_.isEmpty(newValue) || newValue == "undefined") {
                                            _self.startCreateMode();
                                        }
                                        else {
                                            _self.findJobHistoryById(newValue);
                                        }
                                    });
                                    _self.isShowAlreadySet = ko.observable(false);
                                    _self.isShowAlreadySet.subscribe(function () {
                                        _self.reloadComponent();
                                    });
                                    _self.isShowNoSelectRow = ko.observable(false);
                                    _self.isShowNoSelectRow.subscribe(function () {
                                        _self.reloadComponent();
                                    });
                                    _self.listJobTitleOption = {
                                        baseDate: _self.baseDate,
                                        isShowAlreadySet: _self.isShowAlreadySet(),
                                        isMultiSelect: false,
                                        listType: 3,
                                        selectType: 3,
                                        selectedCode: _self.selectedJobTitleId,
                                        isDialog: false,
                                        isShowNoSelectRow: _self.isShowNoSelectRow(),
                                        maxRows: 13,
                                        tabindex: 6
                                    };
                                    // Init JobTitle form
                                    _self.jobTitleCode = ko.observable("");
                                    _self.jobTitleName = ko.observable("");
                                    _self.jobTitleIsManager = ko.observable(false);
                                    _self.sequenceCode = ko.observable("");
                                    _self.sequenceName = ko.observable("");
                                    // UI
                                    _self.enable_button_create_mode = ko.observable(null);
                                    _self.enable_button_delete = ko.observable(null);
                                    _self.enable_button_add_history = ko.observable(null);
                                    _self.enable_button_update_history = ko.observable(null);
                                    _self.enable_button_delete_history = ko.observable(null);
                                    _self.enable_input_job_title_code = ko.observable(null);
                                }
                                /**
                                 * Reload component
                                 */
                                ScreenModel.prototype.reloadComponent = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    _self.listJobTitleOption.isShowAlreadySet = _self.isShowAlreadySet();
                                    _self.listJobTitleOption.isShowNoSelectRow = _self.isShowNoSelectRow();
                                    $('#job-title-items-list').ntsListComponent(_self.listJobTitleOption)
                                        .then(function () {
                                        var dataList = $('#job-title-items-list').getDataList();
                                        if (dataList && _self.selectedJobTitleId()) {
                                            var filtered = _.filter(dataList, function (item) { return item.id === _self.selectedJobTitleId(); });
                                            if (filtered.length == 0) {
                                                _self.selectedJobTitleId(dataList[0].id);
                                            }
                                            else {
                                                // Reload history
                                                _self.findJobHistoryById(_self.selectedJobTitleId());
                                            }
                                        }
                                        else {
                                            // Set create mode
                                            _self.createMode(true);
                                        }
                                        dfd.resolve();
                                    }).done(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                    if (_self.listJobTitleOption.selectType === 3) {
                                        _self.listJobTitleOption.selectType = 1;
                                    }
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.reloadDoneComponent = function () {
                                    var _self = this;
                                    _self.reloadComponent().done(function () {
                                        a.service.findJobInfoByJobCode(_self.jobTitleCode())
                                            .done(function (data) {
                                            _self.selectedJobTitleId(data.jobTitleId);
                                            _self.createMode(false);
                                        })
                                            .fail(function (res) {
                                        });
                                    });
                                };
                                /**
                                 * Start page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    _self.reloadComponent();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                /**
                                 * Find JobTitle history by id
                                 */
                                ScreenModel.prototype.findJobHistoryById = function (jobTitleId) {
                                    var _self = this;
                                    if (!jobTitleId) {
                                        // No JobTitle has been choosed, switch to create mode
                                        _self.createMode(true);
                                        return;
                                    }
                                    // Load JobTitle history info 
                                    //nts.uk.ui.block.grayout();
                                    _self.jobTitleHistoryModel().clearData();
                                    a.service.findJobHistoryList(jobTitleId)
                                        .done(function (data) {
                                        //nts.uk.ui.block.clear();
                                        if (data) {
                                            // Load JobTitle History
                                            var listHistory = _.map(data.jobTitleHistory, function (item) {
                                                return new History(data.jobTitleId, item.historyId, item.period);
                                            });
                                            _self.jobTitleHistoryModel().init(listHistory);
                                        }
                                    })
                                        .fail(function (res) {
                                        //nts.uk.ui.block.clear();
                                    });
                                };
                                /**
                                 * Find JobTitle info by job title id and job history id
                                 */
                                ScreenModel.prototype.findJobInfo = function (jobTitleId, jobHistoryId) {
                                    var _self = this;
                                    if (!jobTitleId || !jobHistoryId) {
                                        return;
                                    }
                                    //nts.uk.ui.block.grayout();    // Cause history list lost focus
                                    a.service.findJobInfoByJobIdAndHistoryId(jobTitleId, jobHistoryId)
                                        .done(function (data) {
                                        //nts.uk.ui.block.clear();
                                        if (data) {
                                            _self.createMode(false);
                                            _self.jobTitleCode(data.jobTitleCode);
                                            _self.jobTitleName(data.jobTitleName);
                                            _self.jobTitleIsManager(data.manager);
                                            _self.sequenceCode(data.sequenceCode);
                                            _self.sequenceName(data.sequenceName);
                                            // Set focus
                                            $('#job-title-name').focus();
                                        }
                                    })
                                        .fail(function (res) {
                                        //nts.uk.ui.block.clear();
                                    });
                                };
                                /**
                                 * Callback: change mode based on createMode value
                                 */
                                ScreenModel.prototype.changeMode = function (newValue) {
                                    var _self = this;
                                    if (newValue) {
                                        var defaultHistory = [];
                                        defaultHistory.push(_self.createHistory());
                                        _self.selectedJobTitleId(null);
                                        _self.jobTitleHistoryModel().clearData();
                                        _self.jobTitleHistoryModel().init(defaultHistory);
                                        _self.jobTitleCode("");
                                        _self.jobTitleName("");
                                        _self.jobTitleIsManager(false);
                                        _self.sequenceCode("");
                                        _self.sequenceName("");
                                        // UI
                                        _self.enable_button_create_mode(false);
                                        _self.enable_button_delete(false);
                                        _self.enable_button_add_history(false);
                                        _self.enable_button_update_history(false);
                                        _self.enable_button_delete_history(false);
                                        _self.enable_input_job_title_code(true);
                                        // Set focus
                                        $('#job-title-code').focus();
                                    }
                                    else {
                                        // UI
                                        _self.enable_button_create_mode(true);
                                        _self.enable_input_job_title_code(false);
                                        // Set focus
                                        $('#job-title-name').focus();
                                    }
                                    // Clear error
                                    nts.uk.ui.errors.clearAll();
                                };
                                /**
                                 * Callback: change history mode based on A3_2 value
                                 */
                                ScreenModel.prototype.historyChangeMode = function (newValue) {
                                    var _self = this;
                                    _self.enable_button_delete(newValue);
                                    _self.enable_button_add_history(newValue);
                                    _self.enable_button_update_history(newValue);
                                    _self.enable_button_delete_history(newValue);
                                };
                                /**
                                 * Validate
                                 */
                                ScreenModel.prototype.validate = function () {
                                    var _self = this;
                                    // Clear error
                                    nts.uk.ui.errors.clearAll();
                                    $('#job-title-code').ntsEditor('validate');
                                    $('#job-title-name').ntsEditor('validate');
                                    return !$('.nts-input').ntsError('hasError');
                                };
                                /**
                                 * toJSON
                                 */
                                ScreenModel.prototype.toJSON = function () {
                                    var _self = this;
                                    return {
                                        isCreateMode: _self.createMode(),
                                        jobTitleInfo: {
                                            jobTitleId: _self.selectedJobTitleId(),
                                            jobTitleHistoryId: _self.jobTitleHistoryModel().selectedHistoryId(),
                                            isManager: _self.jobTitleIsManager(),
                                            jobTitleCode: _self.jobTitleCode(),
                                            jobTitleName: _self.jobTitleName(),
                                            sequenceCode: _self.sequenceCode()
                                        }
                                    };
                                };
                                /**
                                 * Create default history
                                 */
                                ScreenModel.prototype.createHistory = function () {
                                    var _self = this;
                                    return new History("", "", new Period("1900/01/01", "9999/12/31"));
                                };
                                /**
                                 * Show Error Message
                                 */
                                ScreenModel.prototype.showMessageError = function (res) {
                                    // check error business exception
                                    if (!res.businessException) {
                                        return;
                                    }
                                    // show error message
                                    if (Array.isArray(res.errors)) {
                                        nts.uk.ui.dialog.bundledErrors(res);
                                    }
                                    else {
                                        nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                                    }
                                };
                                /**
                                 * Start create mode
                                 */
                                ScreenModel.prototype.startCreateMode = function () {
                                    var _self = this;
                                    _self.createMode(true);
                                };
                                /**
                                 * Save JobTitle
                                 */
                                ScreenModel.prototype.saveJobTitle = function () {
                                    var _self = this;
                                    // Validate
                                    if (!_self.validate()) {
                                        return;
                                    }
                                    $('#job-title-code').trigger('validate');
                                    $('#job-title-name').trigger('validate');
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    nts.uk.ui.block.grayout();
                                    a.service.saveJobTitle(_self.toJSON())
                                        .done(function () {
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                            _self.reloadDoneComponent();
                                        });
                                    })
                                        .fail(function (res) {
                                        _self.showMessageError(res);
                                    })
                                        .always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                /**
                                 * Remove history
                                 */
                                ScreenModel.prototype.removeHistory = function () {
                                    var _self = this;
                                    if (!nts.uk.text.isNullOrEmpty(_self.jobTitleHistoryModel().selectedHistoryId())) {
                                        nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
                                            .ifYes(function () {
                                            nts.uk.ui.block.grayout();
                                            var removeCommand = {};
                                            removeCommand.jobTitleId = _self.selectedJobTitleId();
                                            removeCommand.historyId = _self.jobTitleHistoryModel().selectedHistoryId();
                                            a.service.removeJobTitleHistory(removeCommand)
                                                .done(function () {
                                                // Show message
                                                nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                    // Reload list
                                                    _self.reloadDoneComponent();
                                                });
                                            })
                                                .fail(function (res) {
                                                // Show error list
                                                nts.uk.ui.dialog.bundledErrors(res);
                                            })
                                                .always(function () {
                                                nts.uk.ui.block.clear();
                                            });
                                        })
                                            .ifNo(function () {
                                        });
                                    }
                                };
                                // Load Dialog
                                /**
                                 * Screen B - openDeleteDialog
                                 */
                                ScreenModel.prototype.openDeleteDialog = function () {
                                    var _self = this;
                                    var transferObj = {};
                                    transferObj.jobTitleId = _self.selectedJobTitleId();
                                    transferObj.jobTitleCode = _self.jobTitleCode();
                                    transferObj.jobTitleName = _self.jobTitleName();
                                    nts.uk.ui.windows.setShared(Constants.SHARE_IN_DIALOG_REMOVE_JOB, transferObj);
                                    nts.uk.ui.windows.sub.modal('/view/cmm/013/b/index.xhtml').onClosed(function () {
                                        var isSuccess = nts.uk.ui.windows.getShared(Constants.SHARE_OUT_DIALOG_REMOVE_JOB);
                                        if (isSuccess) {
                                            // Reload list
                                            _self.reloadComponent();
                                        }
                                    });
                                };
                                /**
                                 * Screen C - checkSequenceList
                                 */
                                ScreenModel.prototype.checkSequenceList = function () {
                                    var _self = this;
                                    // Load sequence data list
                                    nts.uk.ui.block.grayout();
                                    a.service.findAllSequenceMaster()
                                        .done(function (data) {
                                        // Load data
                                        _self.openSelectSequenceDialog(data);
                                    })
                                        .fail(function (res) {
                                        nts.uk.ui.dialog.bundledErrors(res).then(function () {
                                            // Load sequence register screen
                                            _self.openSequenceManageDialog();
                                        });
                                    })
                                        .always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                /**
                                 * Screen C - openSelectSequenceDialog
                                 */
                                ScreenModel.prototype.openSelectSequenceDialog = function (data) {
                                    var _self = this;
                                    nts.uk.ui.windows.setShared("currentSelectedCode", _self.sequenceCode());
                                    nts.uk.ui.windows.setShared(Constants.SHARE_IN_DIALOG_SELECT_SEQUENCE, data);
                                    nts.uk.ui.windows.sub.modal('/view/cmm/013/c/index.xhtml').onClosed(function () {
                                        // Check if apply button was clicked
                                        var isSelected = nts.uk.ui.windows.getShared(Constants.IS_ACCEPT_DIALOG_SELECT_SEQUENCE);
                                        if (!isSelected) {
                                            return;
                                        }
                                        // Get data
                                        var dialogData = nts.uk.ui.windows.getShared(Constants.SHARE_OUT_DIALOG_SELECT_SEQUENCE);
                                        if (!dialogData) {
                                            _self.sequenceCode("");
                                            _self.sequenceName("");
                                            return;
                                        }
                                        _self.sequenceCode(dialogData.sequenceCode);
                                        _self.sequenceName(dialogData.sequenceName);
                                    });
                                };
                                /**
                                 * Screen D - openAddHistoryDialog
                                 */
                                ScreenModel.prototype.openAddHistoryDialog = function () {
                                    var _self = this;
                                    nts.uk.ui.windows.setShared(Constants.SHARE_IN_DIALOG_ADD_HISTORY, _self.selectedJobTitleId());
                                    nts.uk.ui.windows.sub.modal('/view/cmm/013/d/index.xhtml').onClosed(function () {
                                        var isSuccess = nts.uk.ui.windows.getShared(Constants.SHARE_OUT_DIALOG_ADD_HISTORY);
                                        if (isSuccess) {
                                            // Reload list
                                            _self.reloadDoneComponent();
                                        }
                                    });
                                };
                                /**
                                 * Screen E - openUpdateHistoryDialog
                                 */
                                ScreenModel.prototype.openUpdateHistoryDialog = function () {
                                    var _self = this;
                                    var transferObj = {};
                                    transferObj.jobTitleId = _self.selectedJobTitleId();
                                    transferObj.historyId = _self.jobTitleHistoryModel().selectedHistoryId();
                                    transferObj.startDate = _self.jobTitleHistoryModel().getSelectedHistoryByHistoryId().period.startDate;
                                    nts.uk.ui.windows.setShared(Constants.SHARE_IN_DIALOG_EDIT_HISTORY, transferObj);
                                    nts.uk.ui.windows.sub.modal('/view/cmm/013/e/index.xhtml').onClosed(function () {
                                        var isSuccess = nts.uk.ui.windows.getShared(Constants.SHARE_OUT_DIALOG_EDIT_HISTORY);
                                        if (isSuccess) {
                                            // Reload list
                                            _self.reloadDoneComponent();
                                        }
                                    });
                                };
                                /**
                                 * Screen F - openSequenceManageDialog
                                 */
                                ScreenModel.prototype.openSequenceManageDialog = function () {
                                    var _self = this;
                                    nts.uk.ui.windows.sub.modal('/view/cmm/013/f/index.xhtml').onClosed(function () { });
                                };
                                ScreenModel.prototype.opencdl028Dialog = function () {
                                    var self = this;
                                    var params = {
                                        //    date: moment(new Date()).toDate(),
                                        mode: 1
                                    };
                                    nts.uk.ui.windows.setShared("CDL028_INPUT", params);
                                    nts.uk.ui.windows.sub.modal("com", "/view/cdl/028/a/index.xhtml").onClosed(function () {
                                        var params = nts.uk.ui.windows.getShared("CDL028_A_PARAMS");
                                        if (params.status) {
                                            self.exportExcel(params.mode, params.standardDate);
                                        }
                                    });
                                };
                                ScreenModel.prototype.exportExcel = function (mode, baseDate) {
                                    var self = this;
                                    nts.uk.ui.block.grayout();
                                    a.service.saveAsExcel(mode, baseDate).done(function () {
                                    }).fail(function (error) {
                                        nts.uk.ui.dialog.alertError({ messageId: error.messageId });
                                    }).always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                ScreenModel.prototype.openHScreen = function () {
                                    var self = this;
                                    nts.uk.ui.windows.sub.modal("/view/cmm/013/h/index.xhtml").onClosed(function () {
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            /**
                             * JobTitleHistoryModel
                             */
                            var JobTitleHistoryModel = /** @class */ (function (_super) {
                                __extends(JobTitleHistoryModel, _super);
                                function JobTitleHistoryModel(parentModel) {
                                    var _this = _super.call(this) || this;
                                    var _self = _this;
                                    _self.parentModel = parentModel;
                                    _self.selectedHistoryId.subscribe(function (jobHistoryId) {
                                        _self.parentModel.findJobInfo(_self.parentModel.selectedJobTitleId(), jobHistoryId);
                                        _self.validateHistory();
                                    });
                                    _self.init([]);
                                    return _this;
                                }
                                JobTitleHistoryModel.prototype.init = function (data) {
                                    var _self = this;
                                    _self.listJobTitleHistory(data);
                                    _self.selectFirst();
                                };
                                JobTitleHistoryModel.prototype.clearData = function () {
                                    var _self = this;
                                    _self.listJobTitleHistory([]);
                                    _self.selectedHistoryId(null);
                                };
                                JobTitleHistoryModel.prototype.validateHistory = function () {
                                    var _self = this;
                                    var currentHistory = _self.getSelectedHistoryByHistoryId();
                                    if (currentHistory && _self.isSelectedLatestHistory() && currentHistory.period.endDate === "9999/12/31") {
                                        _self.parentModel.historyChangeMode(true);
                                    }
                                    else {
                                        _self.parentModel.historyChangeMode(false);
                                    }
                                };
                                return JobTitleHistoryModel;
                            }(JobTitleHistoryAbstract));
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmm013.a || (cmm013.a = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.a.vm.js.map