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
                    var e;
                    (function (e) {
                        var viewmodel;
                        (function (viewmodel) {
                            var Constants = cmm013.base.Constants;
                            var SavePeriod = cmm013.base.SavePeriod;
                            var SaveHistory = cmm013.base.SaveHistory;
                            var SaveJobTitleHistoryCommand = e.service.model.SaveJobTitleHistoryCommand;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.jobTitleId = null;
                                    _self.historyId = null;
                                    _self.startDate = ko.observable("");
                                    _self.endDate = ko.observable(nts.uk.resource.getText("CMM013_38"));
                                }
                                /**
                                 * Start page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    // Load data from parent screen
                                    var transferObj = nts.uk.ui.windows.getShared(Constants.SHARE_IN_DIALOG_EDIT_HISTORY);
                                    _self.jobTitleId = transferObj.jobTitleId;
                                    _self.historyId = transferObj.historyId;
                                    _self.startDate(transferObj.startDate);
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                /**
                                 * Execution
                                 */
                                ScreenModel.prototype.execution = function () {
                                    var _self = this;
                                    if (!_self.validate()) {
                                        return;
                                    }
                                    nts.uk.ui.block.grayout();
                                    e.service.saveJobTitleHistory(_self.toJSON())
                                        .done(function () {
                                        nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_EDIT_HISTORY, true);
                                        _self.close();
                                    })
                                        .fail(function (res) {
                                        _self.showMessageError(res);
                                    })
                                        .always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                /**
                                 * Close
                                 */
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                /**
                                 * toJSON
                                 */
                                ScreenModel.prototype.toJSON = function () {
                                    var _self = this;
                                    var jobTitleHistory = new SaveHistory(_self.historyId, new SavePeriod(new Date(_self.startDate()), new Date("9999-12-31")));
                                    var command = new SaveJobTitleHistoryCommand(false, _self.jobTitleId, jobTitleHistory);
                                    return command;
                                };
                                /**
                                 * Validate
                                 */
                                ScreenModel.prototype.validate = function () {
                                    var _self = this;
                                    // Clear error
                                    nts.uk.ui.errors.clearAll();
                                    $('#start-date').ntsEditor('validate');
                                    return !$('.nts-input').ntsError('hasError');
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
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = e.viewmodel || (e.viewmodel = {}));
                    })(e = cmm013.e || (cmm013.e = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.e.vm.js.map