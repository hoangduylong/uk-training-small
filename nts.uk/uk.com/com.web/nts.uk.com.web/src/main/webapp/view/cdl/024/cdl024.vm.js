var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var at;
        (function (at) {
            var view;
            (function (view) {
                var cdl024;
                (function (cdl024) {
                    var viewmodel;
                    (function (viewmodel) {
                        var ScreenModel = /** @class */ (function () {
                            function ScreenModel() {
                                this.selectMultiple = ko.observable(true);
                                var self = this;
                                this.columns = [
                                    { headerText: 'コード', prop: 'code', width: 100 },
                                    { headerText: '名称', prop: 'name', width: 258, formatter: _.escape }
                                ];
                            }
                            ScreenModel.prototype.closeDialog = function () {
                                nts.uk.ui.windows.close();
                            };
                            ScreenModel.prototype.sendAttribute = function () {
                                var selectedItems = $("#multi-list").ntsGridList("getSelected");
                                if (this.selectMultiple()) {
                                    this.currentCodeList = _.map(selectedItems, 'id');
                                }
                                else {
                                    this.currentCodeList = selectedItems.id;
                                }
                                nts.uk.ui.windows.setShared("currentCodeList", this.currentCodeList);
                                nts.uk.ui.windows.close();
                            };
                            ScreenModel.prototype.startPage = function () {
                                var self = this, dfd = $.Deferred();
                                cdl024.service.getAll().done(function (data) {
                                    data = _.orderBy(data, ["code"], ['asc']);
                                    self.items = data;
                                    var parameter = nts.uk.ui.windows.getShared("CDL024");
                                    if (parameter != null && parameter.selectMultiple != null && parameter.selectMultiple != undefined) {
                                        self.selectMultiple(parameter.selectMultiple);
                                    }
                                    if (parameter != null && parameter.codeList != null) {
                                        self.currentCodeList = parameter.codeList;
                                    }
                                    dfd.resolve();
                                });
                                return dfd.promise();
                            };
                            return ScreenModel;
                        }());
                        viewmodel.ScreenModel = ScreenModel;
                    })(viewmodel = cdl024.viewmodel || (cdl024.viewmodel = {}));
                })(cdl024 = view.cdl024 || (view.cdl024 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl024.vm.js.map