var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps009;
                (function (cps009) {
                    var c;
                    (function (c) {
                        var viewmodel;
                        (function (viewmodel) {
                            var close = nts.uk.ui.windows.close;
                            var getShared = nts.uk.ui.windows.getShared;
                            var setShared = nts.uk.ui.windows.setShared;
                            var ViewModel = /** @class */ (function () {
                                function ViewModel() {
                                    this.currentInitVal = ko.observable(new ItemInitValue("", "", ""));
                                    this.isCopy = ko.observable(false);
                                    this.codeCtg = ko.observable('');
                                    this.nameCtg = ko.observable('');
                                    this.codeInput = ko.observable('');
                                    this.nameInput = ko.observable('');
                                    var self = this;
                                    self.param = getShared('CPS009C_PARAMS') || { settingId: '', settingCode: '', settingName: '' };
                                    self.codeCtg(self.param.settingCode);
                                    self.nameCtg(self.param.settingName);
                                }
                                ViewModel.prototype.copyInitValue = function () {
                                    var self = this, copyObj = {
                                        idSource: self.param.settingId,
                                        overWrite: self.isCopy(),
                                        codeInput: self.currentInitVal().itemCode(),
                                        nameInput: self.currentInitVal().itemName()
                                    };
                                    $('.nts-input').trigger("validate");
                                    if (!nts.uk.ui.errors.hasError()) {
                                        c.service.copyInitValue(copyObj).done(function (initSettingId) {
                                            nts.uk.ui.dialog.info({ messageId: "Msg_20" }).then(function () {
                                                setShared('CPS009C_COPY', initSettingId);
                                                //close dialog
                                                close();
                                            });
                                        }).fail(function (res) {
                                            //display message error.
                                            nts.uk.ui.dialog.alertError({ messageId: res.messageId }).then(function () {
                                                if (res.messageId == "Msg_3") {
                                                    $('#codeInput').focus();
                                                }
                                            });
                                        });
                                    }
                                    ;
                                };
                                ViewModel.prototype.cancelCopyInitValue = function () {
                                    close();
                                };
                                return ViewModel;
                            }());
                            viewmodel.ViewModel = ViewModel;
                            var ItemInitValue = /** @class */ (function () {
                                function ItemInitValue(id, itemCode, itemName) {
                                    var self = this;
                                    self.id = ko.observable(id);
                                    self.itemCode = ko.observable(itemCode);
                                    self.itemName = ko.observable(itemName);
                                }
                                return ItemInitValue;
                            }());
                            viewmodel.ItemInitValue = ItemInitValue;
                            var DataCopy = /** @class */ (function () {
                                function DataCopy() {
                                }
                                return DataCopy;
                            }());
                            viewmodel.DataCopy = DataCopy;
                        })(viewmodel = c.viewmodel || (c.viewmodel = {}));
                    })(c = cps009.c || (cps009.c = {}));
                })(cps009 = view.cps009 || (view.cps009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps009.c.vm.js.map