var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf002;
                (function (cmf002) {
                    var t;
                    (function (t) {
                        var viewmodel;
                        (function (viewmodel) {
                            var block = nts.uk.ui.block;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var error = nts.uk.ui.errors;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.sourceCode = ko.observable('');
                                    this.sourceName = ko.observable('');
                                    this.standardType = ko.observable('');
                                    this.copySourceName = ko.observable('');
                                    this.destinationCategory = ko.observable('');
                                    this.conditionSetCd = ko.observable('');
                                    this.conditionName = ko.observable('');
                                    this.overWrite = ko.observable(false);
                                    this.copyDestinationCode = ko.observable('');
                                    this.destinationName = ko.observable('');
                                    this.result = ko.observable(false);
                                    var self = this;
                                    self.initScreen();
                                }
                                ScreenModel.prototype.initScreen = function () {
                                    block.invisible();
                                    var self = this, info = getShared("CMF002_T_PARAMS");
                                    if (info) {
                                        self.conditionSetCd(info.conditionSetCd);
                                        self.conditionName(info.conditionName);
                                    }
                                    self.overWrite(false);
                                    block.clear();
                                };
                                ScreenModel.prototype.excuteCopy = function () {
                                    error.clearAll();
                                    $("#T3_2").trigger("validate");
                                    $("#T3_3").trigger("validate");
                                    if (!nts.uk.ui.errors.hasError()) {
                                        block.invisible();
                                        var self_1 = this;
                                        var data = {
                                            conditionSetCode: self_1.conditionSetCd(),
                                            conditionName: self_1.conditionName(),
                                            overWrite: self_1.overWrite(),
                                            destinationName: self_1.destinationName(),
                                            copyDestinationCode: self_1.copyDestinationCode()
                                        };
                                        t.service.excuteCopy(data).done(function (res) {
                                            if (res) {
                                                var dataOut = {
                                                    result: res.result,
                                                    destinationName: res.destinationName,
                                                    copyDestinationCode: res.destinationCode,
                                                    overWrite: res.overWrite
                                                };
                                                setShared('CMF002_T_Output', dataOut);
                                            }
                                            nts.uk.ui.windows.close();
                                        }).fail(function (res) {
                                            alertError({ messageId: res.messageId });
                                        }).always(function () {
                                            block.clear();
                                        });
                                    }
                                };
                                /**
                                * Close dialog.
                                */
                                ScreenModel.prototype.cancelSetting = function () {
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = t.viewmodel || (t.viewmodel = {}));
                    })(t = cmf002.t || (cmf002.t = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.t.vm.js.map