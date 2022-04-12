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
                    var d;
                    (function (d_1) {
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
                                    var dfd = $.Deferred();
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
                                        startDate: _self.startDate(),
                                        endDate: _self.endDate()
                                    };
                                    nts.uk.ui.windows.setShared('DialogDToMaster', data);
                                    _self.close();
                                };
                                ScreenModel.prototype.validate = function () {
                                    var _self = this;
                                    var data = nts.uk.ui.windows.getShared('listMasterToD');
                                    _self.listHistory(data.historyList);
                                    if (new Date(_self.startDate()) < new Date(_self.listHistory()[0].startDate)) {
                                        alert('最新の履歴開始日以前に履歴を追加することはできません。');
                                        return false;
                                    }
                                    return true;
                                };
                                /**
                                 * Close
                                 */
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.checkDate = function (strDate) {
                                    var comp = strDate.split('/');
                                    var d = parseInt(comp[0], 10);
                                    var m = parseInt(comp[1], 10);
                                    var y = parseInt(comp[2], 10);
                                    var date = new Date(y, m - 1, d);
                                    if (date.getFullYear() != y && date.getMonth() + 1 != m && date.getDate() != d) {
                                        return false;
                                    }
                                    if (1900 > y && y > 9999) {
                                        return false;
                                    }
                                    return true;
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = d_1.viewmodel || (d_1.viewmodel = {}));
                    })(d = cmm013.d || (cmm013.d = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.d.vm.js.map