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
                    var d;
                    (function (d) {
                        var viewmodel;
                        (function (viewmodel) {
                            var close = nts.uk.ui.windows.close;
                            var dialog = nts.uk.ui.dialog;
                            var setShared = nts.uk.ui.windows.setShared;
                            var block = nts.uk.ui.block;
                            var ViewModel = /** @class */ (function () {
                                function ViewModel() {
                                    this.currentInitVal = ko.observable(new ItemInitValue({
                                        itemCode: "",
                                        itemName: ""
                                    }));
                                }
                                ViewModel.prototype.newInitValue = function () {
                                    var self = this, newInit = {
                                        itemCode: self.currentInitVal().itemCode(),
                                        itemName: self.currentInitVal().itemName()
                                    };
                                    $('.nts-input').trigger("validate");
                                    if (!nts.uk.ui.errors.hasError()) {
                                        block.invisible();
                                        d.service.add(newInit).done(function (initSettingId) {
                                            dialog.info({ messageId: "Msg_15" }).then(function () {
                                                setShared('CPS009D_PARAMS', initSettingId);
                                                close();
                                            });
                                        }).fail(function (res) {
                                            //display message error.
                                            dialog.alertError({ messageId: res.messageId }).then(function () {
                                                $('#roleCode').focus();
                                            });
                                        }).always(function () { block.clear(); });
                                    }
                                };
                                ViewModel.prototype.cancelNewInitValue = function () {
                                    close();
                                };
                                return ViewModel;
                            }());
                            viewmodel.ViewModel = ViewModel;
                            var ItemInitValue = /** @class */ (function () {
                                function ItemInitValue(params) {
                                    var self = this;
                                    self.itemCode = ko.observable(params.itemCode || "");
                                    self.itemName = ko.observable(params.itemName || "");
                                }
                                ItemInitValue.prototype.setData = function (params) {
                                    var self = this;
                                    self.itemCode(params.itemCode || "");
                                    self.itemName(params.itemName || "");
                                };
                                return ItemInitValue;
                            }());
                            viewmodel.ItemInitValue = ItemInitValue;
                        })(viewmodel = d.viewmodel || (d.viewmodel = {}));
                    })(d = cps009.d || (cps009.d = {}));
                })(cps009 = view.cps009 || (view.cps009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps009.d.vm.js.map