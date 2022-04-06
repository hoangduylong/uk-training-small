__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.height = ko.observable("200px");
            self.labelDistance = ko.observable("30px");
            self.screenMode = ko.observable(1);
            self.masterId = ko.observable("a2316878-a3a5-4362-917e-ad71d956e6c2");
            self.histList = ko.observableArray([]);
            self.selectedHistId = ko.observable();
            self.pathGet = ko.observable("/bs/employee/workplace/hist/".concat(self.masterId()));
            self.pathAdd = ko.observable("bs/employee/workplace/history/save");
            self.pathUpdate = ko.observable("bs/employee/workplace/history/save");
            self.pathDelete = ko.observable("bs/employee/workplace/history/remove");
            self.getQueryResult = function (res) {
                return _.map(res.workplaceHistory, function (h) {
                    return { histId: h.historyId, startDate: h.startDate, endDate: h.endDate, displayText: "".concat(h.startDate, " \uFF5E ").concat(h.endDate) };
                });
            };
            self.getSelectedStartDate = function () {
                var selectedHist = _.find(self.histList(), function (h) { return h.histId === self.selectedHistId(); });
                if (selectedHist)
                    return selectedHist.startDate;
            };
            self.commandAdd = function (masterId, histId, startDate, endDate) {
                return {
                    isAddMode: true,
                    workplaceId: masterId,
                    workplaceHistory: {
                        historyId: '',
                        period: {
                            startDate: startDate,
                            endDate: new Date(endDate)
                        }
                    }
                };
            };
            self.commandUpdate = function (masterId, histId, startDate, endDate) {
                return {
                    isAddMode: false,
                    workplaceId: masterId,
                    workplaceHistory: {
                        historyId: histId,
                        period: {
                            startDate: startDate,
                            endDate: new Date(endDate)
                        }
                    }
                };
            };
            self.commandDelete = function (masterId, histId) {
                return {
                    workplaceId: masterId,
                    historyId: histId
                };
            };
            self.delVisible = ko.observable(true);
            self.delChecked = ko.observable();
            self.afterRender = function () {
                alert("Load!");
            };
            self.afterAdd = function () {
                alert("Added");
            };
            self.afterUpdate = function () {
                alert("Updated");
            };
            self.afterDelete = function () {
                alert("Deleted");
            };
        }
        ScreenModel.prototype.loadHist = function () {
        };
        return ScreenModel;
    }());
    var SCREEN_MODE;
    (function (SCREEN_MODE) {
        SCREEN_MODE[SCREEN_MODE["NEW"] = 0] = "NEW";
        SCREEN_MODE[SCREEN_MODE["UPD"] = 1] = "UPD";
    })(SCREEN_MODE || (SCREEN_MODE = {}));
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map