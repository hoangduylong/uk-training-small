var cps003;
(function (cps003) {
    var d;
    (function (d) {
        var vm;
        (function (vm) {
            var close = nts.uk.ui.windows.close;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var __viewContext = window['__viewContext'] || {};
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.ctgId = ko.observable('');
                    this.ctgName = ko.observable('');
                    this.selecteds = ko.observableArray([]);
                    this.dataSources = ko.observableArray([]);
                    var self = this, data = getShared('CPS003D_PARAM') || {};
                    if (!data.id || !data.name) {
                        self.close();
                    }
                    else {
                        self.ctgId(data.id);
                        self.ctgName(data.name);
                        d.service.fetch.setting(data.id).done(function (resp) {
                            self.dataSources(_.orderBy(resp.perInfoData, ['dispOrder', 'itemCD']));
                        });
                    }
                }
                ViewModel.prototype.pushData = function () {
                    var self = this, ctgId = ko.toJS(self.ctgId), selecteds = ko.toJS(self.selecteds), dataSources = ko.toJS(self.dataSources), personItems = dataSources.map(function (m) { return ({
                        pInfoCategoryID: ctgId,
                        pInfoItemDefiID: m.perInfoItemDefID,
                        columnWidth: m.width || 100,
                        regulationATR: selecteds.indexOf(m.perInfoItemDefID) > -1 ? 1 : 0
                    }); });
                    d.service.push.setting({
                        personInfoItems: personItems
                    }).done(function () {
                        setShared('CPS003D_VALUE', selecteds);
                        self.close();
                    });
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
        })(vm = d.vm || (d.vm = {}));
    })(d = cps003.d || (cps003.d = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.d.vm.js.map