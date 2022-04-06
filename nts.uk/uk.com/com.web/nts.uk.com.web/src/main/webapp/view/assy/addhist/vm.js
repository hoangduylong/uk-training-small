var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var assy;
                (function (assy) {
                    var addhist;
                    (function (addhist) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.startDate = ko.observable('');
                                    self.endDate = ko.observable(nts.uk.resource.getText("CMM011_27"));
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var assyShared = nts.uk.ui.windows.getShared("ASSY_COM_PARAM");
                                    self.masterId = assyShared.masterId;
                                    self.histId = assyShared.histId;
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.execute = function () {
                                    var self = this;
                                    if (!self.validate()) {
                                        return;
                                    }
                                    nts.uk.ui.block.grayout();
                                    var makeCmd = nts.uk.ui.windows.getShared("ASSY_COM_PARAM_CMD"), ajax = nts.uk.ui.windows.getShared("ASSY_COM_PARAM_AJAX"), cmd = makeCmd(self.masterId, self.histId, self.startDate(), self.endDate());
                                    ajax(cmd).done(function () {
                                        nts.uk.ui.block.clear();
                                        nts.uk.ui.windows.setShared("HIST_ADD", true);
                                        self.close();
                                    }).fail(function (res) {
                                        nts.uk.ui.block.clear();
                                        self.showMessageError(res);
                                    });
                                };
                                ScreenModel.prototype.validate = function () {
                                    var self = this;
                                    $('#start-date').ntsError('clear');
                                    $('#start-date').ntsEditor('validate');
                                    return !$('.nts-input').ntsError('hasError');
                                };
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.showMessageError = function (res) {
                                    if (!res.businessException) {
                                        return;
                                    }
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
                        })(viewmodel = addhist.viewmodel || (addhist.viewmodel = {}));
                    })(addhist = assy.addhist || (assy.addhist = {}));
                })(assy = view.assy || (view.assy = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=vm.js.map