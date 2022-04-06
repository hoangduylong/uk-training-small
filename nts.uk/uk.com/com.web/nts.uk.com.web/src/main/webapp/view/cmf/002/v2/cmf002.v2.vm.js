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
                    var v2;
                    (function (v2) {
                        var viewmodel;
                        (function (viewmodel) {
                            var block = nts.uk.ui.block;
                            var getText = nts.uk.resource.getText;
                            var model = cmf002.share.model;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.selectedOutputCodeConvert = ko.observable("");
                                    var self = this;
                                    var firstItem = new model.OutputCodeConvert("", getText('CMF002_502'), 0);
                                    self.listOutputCodeConvert = ko.observableArray([firstItem]);
                                    var parameter = getShared('CMF002_V2_PARAMS');
                                    if (parameter) {
                                        self.selectedOutputCodeConvert = ko.observable(parameter.formatSetting);
                                    }
                                    $('#V2_2_container').focus();
                                }
                                ScreenModel.prototype.start = function () {
                                    block.invisible();
                                    var self = this;
                                    var dfd = $.Deferred();
                                    dfd.resolve();
                                    v2.service.getOutputCodeConvertByCompanyId().done(function (result) {
                                        if (result && result.length) {
                                            var _outputCodeConverttResult = _.sortBy(result, ['convertCode']);
                                            var _listOutputCodeConvert = _.map(_outputCodeConverttResult, function (x) {
                                                return new model.OutputCodeConvert(x.convertCode, x.convertName, x.acceptWithoutSetting);
                                            });
                                            self.listOutputCodeConvert.push.apply(self.listOutputCodeConvert, _listOutputCodeConvert);
                                        }
                                        block.clear();
                                        dfd.resolve();
                                    }).fail(function (error) {
                                        alertError(error);
                                        block.clear();
                                        dfd.reject();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.selectConvertCode = function () {
                                    var self = this;
                                    var outputCodeConvert = _.find(ko.toJS(self.listOutputCodeConvert), function (x) { return x.dispConvertCode == self.selectedOutputCodeConvert(); });
                                    setShared("CMF002_J_PARAMS", { outputCodeConvert: outputCodeConvert });
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.cancelSelectConvertCode = function () {
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = v2.viewmodel || (v2.viewmodel = {}));
                    })(v2 = cmf002.v2 || (cmf002.v2 = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.v2.vm.js.map