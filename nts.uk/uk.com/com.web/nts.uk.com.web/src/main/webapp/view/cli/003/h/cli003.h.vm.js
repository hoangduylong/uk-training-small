var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cli003;
                (function (cli003) {
                    var h;
                    (function (h) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getText = nts.uk.resource.getText;
                            var close = nts.uk.ui.windows.close;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.itemListCbb = ko.observableArray([]);
                                    var self = this;
                                    // get param from screen G
                                    var listDetailConditionSetting = getShared('CLI003GParams_ListSetItemDetail');
                                    var name = getShared("CLI003GParams_ItemName");
                                    $('#H1_2').html(name);
                                    self.itemListCbb.push(new ItemModel('-1', ''));
                                    self.itemListCbb.push(new ItemModel('0', getText('Enum_Symbol_Include')));
                                    self.itemListCbb.push(new ItemModel('1', getText('Enum_Symbol_Equal')));
                                    self.itemListCbb.push(new ItemModel('2', getText('Enum_Symbol_Different')));
                                    self.conditionSets = ko.observableArray((function () {
                                        var list = [];
                                        if (listDetailConditionSetting && listDetailConditionSetting.length > 0) {
                                            for (var i = 0; i < listDetailConditionSetting.length; i++) {
                                                var detailConditionSet = listDetailConditionSetting[i];
                                                if (detailConditionSet.condition) {
                                                    list.push(new DetailConSet(detailConditionSet.frame, String(detailConditionSet.sybol), detailConditionSet.condition));
                                                }
                                                else {
                                                    list.push(new DetailConSet(i, '-1', ''));
                                                }
                                            }
                                        }
                                        else {
                                            for (var i = 0; i < 5; i++) {
                                                list.push(new DetailConSet(i, '-1', ''));
                                            }
                                        }
                                        return list;
                                    })());
                                    $("#H1_2").html(getShared('itemName'));
                                    self.comboColumns = ko.observableArray([{ prop: 'name' }]);
                                }
                                ScreenModel.prototype.enterPress = function () {
                                    //
                                };
                                ScreenModel.prototype.closePopup = function () {
                                    close();
                                };
                                ScreenModel.prototype.submit = function () {
                                    var vm = this;
                                    nts.uk.ui.errors.clearAll();
                                    if (vm.checkData()) {
                                        var list = [];
                                        for (var _i = 0, _a = vm.conditionSets(); _i < _a.length; _i++) {
                                            var detailConditionSet = _a[_i];
                                            if (detailConditionSet.symbolStr() === '-1') {
                                                list.push(new ConSet(detailConditionSet.id(), '0', detailConditionSet.condition()));
                                            }
                                            else {
                                                list.push(new ConSet(detailConditionSet.id(), detailConditionSet.symbolStr(), detailConditionSet.condition()));
                                            }
                                        }
                                        setShared("CLI003GParams_ListSetItemDetailReturn", list);
                                        close();
                                    }
                                };
                                ScreenModel.prototype.validateForm = function () {
                                    $(".validate_form").trigger("validate");
                                    if (nts.uk.ui.errors.hasError()) {
                                        return false;
                                    }
                                    return true;
                                };
                                ;
                                ScreenModel.prototype.checkData = function () {
                                    var self = this;
                                    var flgReturn = true;
                                    _.forEach(self.conditionSets(), function (item) {
                                        if (item.condition() !== '' && item.symbolStr() === '-1') {
                                            flgReturn = false;
                                        }
                                        if (item.condition() === '' && item.symbolStr() !== '-1') {
                                            flgReturn = false;
                                        }
                                        else {
                                            flgReturn = true;
                                        }
                                    });
                                    if (!flgReturn) {
                                        alertError({ messageId: "Msg_1203", messageParams: [getText('CLI003_49')] });
                                    }
                                    else {
                                        if (!self.validateForm()) {
                                            flgReturn = false;
                                        }
                                    }
                                    return flgReturn;
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var DetailConSet = /** @class */ (function () {
                                function DetailConSet(id, symbolStr, condition) {
                                    var self = this;
                                    self.id = ko.observable(id);
                                    self.symbolStr = ko.observable(symbolStr);
                                    self.condition = ko.observable(condition);
                                }
                                return DetailConSet;
                            }());
                            viewmodel.DetailConSet = DetailConSet;
                            var ItemModel = /** @class */ (function () {
                                function ItemModel(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ItemModel;
                            }());
                            viewmodel.ItemModel = ItemModel;
                            var ConSet = /** @class */ (function () {
                                function ConSet(id, symbolStr, condition) {
                                    this.id = id;
                                    this.symbolStr = symbolStr;
                                    this.condition = condition;
                                }
                                return ConSet;
                            }());
                            viewmodel.ConSet = ConSet;
                        })(viewmodel = h.viewmodel || (h.viewmodel = {}));
                    })(h = cli003.h || (cli003.h = {}));
                })(cli003 = view.cli003 || (view.cli003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cli003.h.vm.js.map