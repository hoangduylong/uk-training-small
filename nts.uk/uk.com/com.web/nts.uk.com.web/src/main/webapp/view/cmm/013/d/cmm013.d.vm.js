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
                    var d;
                    (function (d) {
                        var viewmodel;
                        (function (viewmodel) {
                            var Constants = cmm013.base.Constants;
                            var SavePeriod = cmm013.base.SavePeriod;
                            var SaveHistory = cmm013.base.SaveHistory;
                            var SaveJobTitleHistoryCommand = d.service.model.SaveJobTitleHistoryCommand;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.startDate = ko.observable("");
                                    _self.endDate = ko.observable(nts.uk.resource.getText("CMM013_31"));
                                }
                                /**
                                 * Start page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
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
                                    d.service.saveJobTitleHistory(_self.toJSON())
                                        .done(function () {
                                        nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_ADD_HISTORY, true);
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
                                    var jobTitleId = nts.uk.ui.windows.getShared(Constants.SHARE_IN_DIALOG_ADD_HISTORY);
                                    if (!jobTitleId) {
                                        return null;
                                    }
                                    var jobTitleHistory = new SaveHistory("", new SavePeriod(new Date(_self.startDate()), new Date("9999-12-31")));
                                    var command = new SaveJobTitleHistoryCommand(true, jobTitleId, jobTitleHistory);
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
                        })(viewmodel = d.viewmodel || (d.viewmodel = {}));
                    })(d = cmm013.d || (cmm013.d = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.d.vm.js.map