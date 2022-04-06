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
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var Constants = cmm013.base.Constants;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.jobTitleId = ko.observable("");
                                    _self.jobTitleCode = ko.observable("");
                                    _self.jobTitleName = ko.observable("");
                                    _self.endDate = ko.observable("");
                                }
                                /**
                                 * Start page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    var jobTitle = nts.uk.ui.windows.getShared(Constants.SHARE_IN_DIALOG_REMOVE_JOB);
                                    _self.jobTitleId(jobTitle.jobTitleId);
                                    _self.jobTitleCode(jobTitle.jobTitleCode);
                                    _self.jobTitleName(jobTitle.jobTitleName);
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
                                    nts.uk.ui.dialog.confirm({ messageId: "Msg_482", messageParams: [moment(_self.endDate()).format("YYYY/MM/DD"), _self.jobTitleCode(), _self.jobTitleName()] })
                                        .ifYes(function () {
                                        nts.uk.ui.block.grayout();
                                        b.service.removeJobTitle(_self.toJSON())
                                            .done(function () {
                                            nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_REMOVE_JOB, true);
                                            nts.uk.ui.dialog.info({ messageId: "Msg_483" }).then(function () {
                                                _self.close();
                                            });
                                        })
                                            .fail(function (res) {
                                            _self.showMessageError(res);
                                        })
                                            .always(function () {
                                            nts.uk.ui.block.clear();
                                        });
                                    })
                                        .ifNo(function () {
                                        // Nothing happen
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
                                    if (!_self.jobTitleId() || !_self.endDate()) {
                                        return {};
                                    }
                                    return {
                                        jobTitleId: _self.jobTitleId(),
                                        endDate: _self.endDate()
                                    };
                                };
                                /**
                                 * Validate
                                 */
                                ScreenModel.prototype.validate = function () {
                                    var _self = this;
                                    // Clear error
                                    nts.uk.ui.errors.clearAll();
                                    $('#end-date').ntsEditor('validate');
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
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cmm013.b || (cmm013.b = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.b.vm.js.map