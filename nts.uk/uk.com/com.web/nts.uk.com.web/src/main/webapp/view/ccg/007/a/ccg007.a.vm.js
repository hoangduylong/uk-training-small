var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var pr;
        (function (pr) {
            var view;
            (function (view) {
                var ccg007;
                (function (ccg007) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var blockUI = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.contractCode = ko.observable('');
                                    self.password = ko.observable('');
                                    self.bottomLabel = ko.computed(function () {
                                        return nts.uk.resource.getText("CCG007_11").replace("\n", "<br/>");
                                    });
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.AuthContract = function () {
                                    var self = this;
                                    blockUI.invisible();
                                    if (!nts.uk.ui.errors.hasError()) {
                                        a.service.submitForm({ contractCode: _.escape(self.contractCode()), password: _.escape(self.password()) }).done(function () {
                                            nts.uk.characteristics.remove("contractInfo");
                                            nts.uk.characteristics.save("contractInfo", { contractCode: _.escape(self.contractCode()), contractPassword: _.escape(self.password()) });
                                            nts.uk.ui.windows.setShared('contractCode', _.escape(self.contractCode()));
                                            nts.uk.ui.windows.setShared('contractPassword', _.escape(self.password()));
                                            nts.uk.ui.windows.setShared('isSubmit', true);
                                            nts.uk.ui.windows.close();
                                        }).fail(function (res) {
                                            nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                                        }).always(function () {
                                            blockUI.clear();
                                        });
                                    }
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = ccg007.a || (ccg007.a = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.a.vm.js.map