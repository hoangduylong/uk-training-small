var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm013;
                (function (cmm013) {
                    var e;
                    (function (e) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.listHistory = ko.observableArray([]);
                                    var _self = this;
                                    _self.startDate = ko.observable("");
                                    _self.endDate = ko.observable("9999/12/31");
                                }
                                /**
                                 * Start page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    // Load data from parent screen
                                    var data = nts.uk.ui.windows.getShared('listMasterToE');
                                    _self.startDate(data.startDate);
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                /**
                                 * Execution
                                 */
                                ScreenModel.prototype.execution = function () {
                                    var _self = this;
                                    if (!_self.validate()) {
                                        return;
                                    }
                                    var data = {
                                        startDate: _self.startDate,
                                        endDate: _self.endDate
                                    };
                                    nts.uk.ui.windows.setShared('DialogEToMaster', data);
                                    _self.close();
                                };
                                /**
                                 * Close
                                 */
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                /**
                                 * Validate
                                 */
                                ScreenModel.prototype.validate = function () {
                                    var _self = this;
                                    if (_self.startDate() == "") {
                                        alert('開始日を入力してください。');
                                        return false;
                                    }
                                    if (_self.checkDate(_self.startDate())) {
                                        alert("開始日は 1900/01/01 ～ 9999/12/31 の日付を入力してください");
                                        return false;
                                    }
                                    var data = nts.uk.ui.windows.getShared('listMasterToE');
                                    _self.listHistory(data.historyList);
                                    if (new Date(_self.startDate()) < new Date(_self.listHistory()[0].startDate)) {
                                        alert('最新の履歴開始日以前に履歴を追加することはできません。');
                                        return false;
                                    }
                                    return true;
                                };
                                ScreenModel.prototype.checkDate = function (strDate) {
                                    var comp = strDate.split('/');
                                    var d = parseInt(comp[0], 10);
                                    var m = parseInt(comp[1], 10);
                                    var y = parseInt(comp[2], 10);
                                    var date = new Date(y, m - 1, d);
                                    if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
                                        return true;
                                    }
                                    return false;
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = e.viewmodel || (e.viewmodel = {}));
                    })(e = cmm013.e || (cmm013.e = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.e.vm.js.map