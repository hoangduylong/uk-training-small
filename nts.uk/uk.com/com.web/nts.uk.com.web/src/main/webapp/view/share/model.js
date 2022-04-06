var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var at;
        (function (at) {
            var view;
            (function (view) {
                var qmm011;
                (function (qmm011) {
                    var share;
                    (function (share) {
                        var model;
                        (function (model) {
                            var getText = nts.uk.resource.getText;
                            var ExecuteMode;
                            (function (ExecuteMode) {
                                ExecuteMode[ExecuteMode["INSERT"] = 0] = "INSERT";
                                ExecuteMode[ExecuteMode["UPDATE"] = 1] = "UPDATE";
                                ExecuteMode[ExecuteMode["DELETE"] = 2] = "DELETE";
                            })(ExecuteMode = model.ExecuteMode || (model.ExecuteMode = {}));
                            function getNumberOfDays() {
                                return [
                                    new model.ItemModel(1.0, getText('KDM001_127')),
                                    new model.ItemModel(0.5, getText('KDM001_128'))
                                ];
                            }
                            model.getNumberOfDays = getNumberOfDays;
                            function getNumberDays() {
                                return [
                                    new model.ItemModel(1.0, getText('KDM001_127')),
                                    new model.ItemModel(0.5, getText('KDM001_128'))
                                ];
                            }
                            model.getNumberDays = getNumberDays;
                            function getOccurredDays() {
                                return [
                                    new model.ItemModel('1.0', getText('KDM001_127')),
                                    new model.ItemModel('0.5', getText('KDM001_128'))
                                ];
                            }
                            model.getOccurredDays = getOccurredDays;
                            function getLawAtr() {
                                return [
                                    new model.ItemModel('0', getText('KDM001_146')),
                                    new model.ItemModel('1', getText('KDM001_147')),
                                    new model.ItemModel('2', getText('KDM001_148'))
                                ];
                            }
                            model.getLawAtr = getLawAtr;
                            function getRemainDaysItemList() {
                                return [
                                    new model.ItemModel('1.0', getText('KDM001_127')),
                                    new model.ItemModel('0.5', getText('KDM001_128')),
                                    new model.ItemModel('0', getText('KDM001_129'))
                                ];
                            }
                            model.getRemainDaysItemList = getRemainDaysItemList;
                            function getRequireDayList() {
                                return [
                                    new model.ItemModel('1.0', getText('KDM001_127')),
                                    new model.ItemModel('0.5', getText('KDM001_128'))
                                ];
                            }
                            model.getRequireDayList = getRequireDayList;
                            function getRequireDay() {
                                return [
                                    new model.ItemModel(1.0, getText('KDM001_127')),
                                    new model.ItemModel(0.5, getText('KDM001_128'))
                                ];
                            }
                            model.getRequireDay = getRequireDay;
                            function getTypeHoliday() {
                                return [
                                    new model.ItemModel('0', getText('KDM001_146')),
                                    new model.ItemModel('1', getText('KDM001_147')),
                                    new model.ItemModel('2', getText('KDM001_148'))
                                ];
                            }
                            model.getTypeHoliday = getTypeHoliday;
                            function getDaysNumber() {
                                return [
                                    new model.ItemModel(1.0, getText('KDM001_127')),
                                    new model.ItemModel(0.5, getText('KDM001_128'))
                                ];
                            }
                            model.getDaysNumber = getDaysNumber;
                            function getremainDay() {
                                return [
                                    new model.ItemModel(1.0, getText('KDM001_127')),
                                    new model.ItemModel(0.5, getText('KDM001_128')),
                                    new model.ItemModel(0, getText('KDM001_129'))
                                ];
                            }
                            model.getremainDay = getremainDay;
                            function formatterDay(value) {
                                if (value) {
                                    return value == "0" ? value + getText('KDM001_27') : parseFloat(value).toFixed(1) + getText('KDM001_27');
                                }
                                else {
                                    return "0" + getText('KDM001_27');
                                }
                            }
                            model.formatterDay = formatterDay;
                            var ItemModel = /** @class */ (function () {
                                function ItemModel(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ItemModel;
                            }());
                            model.ItemModel = ItemModel;
                        })(model = share.model || (share.model = {}));
                    })(share = qmm011.share || (qmm011.share = {}));
                })(qmm011 = view.qmm011 || (view.qmm011 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=model.js.map