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
                    var i;
                    (function (i) {
                        var viewmodel;
                        (function (viewmodel) {
                            var blockUI = nts.uk.ui.block;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.passwordPolicy = ko.observable(null);
                                    self.lowestDigits = ko.observable('');
                                    self.numberOfDigits = ko.observable('');
                                    self.symbolCharacters = ko.observable('');
                                    self.alphabetDigit = ko.observable('');
                                    self.historyCount = ko.observable('');
                                }
                                /**
                                 * Start page.
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    // block ui
                                    nts.uk.ui.block.invisible();
                                    //get PasswordPolicy
                                    i.service.getPasswordPolicy().done(function (data) {
                                        //set text
                                        self.lowestDigits(nts.uk.text.format(nts.uk.resource.getText("CCG007_33"), data.lowestDigits));
                                        self.alphabetDigit(nts.uk.text.format(nts.uk.resource.getText("CCG007_35"), data.alphabetDigit));
                                        self.numberOfDigits(nts.uk.text.format(nts.uk.resource.getText("CCG007_36"), data.numberOfDigits));
                                        self.symbolCharacters(nts.uk.text.format(nts.uk.resource.getText("CCG007_37"), data.symbolCharacters));
                                        self.historyCount(nts.uk.text.format(nts.uk.resource.getText("CCG007_39"), data.historyCount));
                                    }).fail(function (res) {
                                        //Return Dialog Error
                                        nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                                        blockUI.clear();
                                    });
                                    dfd.resolve();
                                    //clear block
                                    nts.uk.ui.block.clear();
                                    return dfd.promise();
                                };
                                /**
                                 * close dialog
                                 */
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = i.viewmodel || (i.viewmodel = {}));
                    })(i = ccg007.i || (ccg007.i = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.i.vm.js.map