var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg008;
                (function (ccg008) {
                    var d;
                    (function (d) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.checked = ko.observable(false);
                                    self.enable = ko.observable(false);
                                    self.message = ko.observable("");
                                    self.enable.subscribe(function (newValue) {
                                        var key = "isBirthDay";
                                        nts.uk.characteristics.save(key, newValue);
                                    });
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    self.message(nts.uk.ui.windows.getShared("ALERT_MESSAGE"));
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                /**
                                 * Click on button d1_003
                                 * Close the popup
                                 */
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = d.viewmodel || (d.viewmodel = {}));
                    })(d = ccg008.d || (ccg008.d = {}));
                })(ccg008 = view.ccg008 || (view.ccg008 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg008.d.vm.js.map