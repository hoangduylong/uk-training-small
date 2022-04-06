var cps003;
(function (cps003) {
    var g;
    (function (g) {
        var vm;
        (function (vm) {
            var getShared = nts.uk.ui.windows.getShared;
            var text = nts.uk.resource.getText;
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    var self = this;
                    self.data = [];
                }
                ViewModel.prototype.start = function () {
                    var self = this;
                    var dfd = $.Deferred();
                    var paramA = getShared("CPS003G_ERROR_LIST"), paramC = getShared("CPS003G_ERROR_LIST"), paramSorted = _.sortBy(paramA, ['no']);
                    var count = 0;
                    self.data = _.map(paramSorted, function (a) {
                        return {
                            id: a.employeeId + a.itemName + a.no + (count++),
                            empCd: a.empCd, empName: a.empName,
                            employeeId: a.employeeId, errorType: a.errorType == 0 ? text("CPS003_127") : text("CPS003_128"),
                            isDisplayRegister: a.displayRegister, itemName: a.itemName, message: a.message, no: a.no,
                            resultRegister: a.errorType == 0 ? text("CPS003_126") : text("CPS003_125")
                        };
                    });
                    var isDisplayRegiter = _.filter(self.data, function (c) { return c.isDisplayRegister == true; });
                    $("#grid2").ntsGrid({
                        height: '361px',
                        dataSource: self.data,
                        primaryKey: 'id',
                        virtualization: true,
                        hidePrimaryKey: true,
                        rowVirtualization: true,
                        virtualizationMode: 'continuous',
                        columns: [
                            { headerText: "", key: "id", dataType: "string", width: "1px", hidden: true },
                            { headerText: text("CPS003_100"), key: "empCd", dataType: "string", width: "100px" },
                            { headerText: text("CPS003_101"), key: "empName", dataType: "string", width: "150px" },
                            { headerText: text("CPS003_102"), key: "no", dataType: "string", width: "50px" },
                            { headerText: text("CPS003_103"), key: "resultRegister", dataType: "string", width: "50px", hidden: isDisplayRegiter.length > 0 ? false : true },
                            { headerText: text("CPS003_104"), key: "errorType", dataType: "string", width: "50px" },
                            { headerText: text("CPS003_105"), key: "itemName", dataType: "string", width: isDisplayRegiter.length > 0 ? "150px" : "200px" },
                            { headerText: text("CPS003_106"), key: "message", dataType: "string", width: "500px" }
                        ],
                        features: [
                            {
                                name: "Paging",
                                type: "local",
                                pageSize: 10
                                //                    pageSizeList : [10, 50, 100]
                            },
                            {
                                name: "Tooltips",
                                columnSettings: [
                                    { columnKey: "empName", allowTooltips: true }
                                ],
                                visibility: "overflow"
                            }
                        ]
                    });
                    dfd.resolve();
                    return dfd.promise();
                };
                ViewModel.prototype.close = function () {
                    nts.uk.ui.windows.close();
                };
                ViewModel.prototype.exportFile = function () {
                    var self = this, dataGroup = _.groupBy(self.data, "employeeId"), result = [], isDisplayE1_006 = self.data.length > 0 ? self.data[0].isDisplayRegister : false;
                    _.each(dataGroup, function (c) {
                        var em = { employeeId: c[0].employeeId, employeeCd: c[0].empCd, employeeName: c[0].empName, order: c[0].no, errorLst: [] };
                        _.each(c, function (i) {
                            // 0 - ERROR, 1 - WARNING
                            var item = { itemName: i.itemName, message: i.message, errorType: 0 };
                            em.errorLst.push(item);
                        });
                        result.push(em);
                    });
                    var itemErrorLst = { isDisplayE1_006: isDisplayE1_006, errorEmployeeInfoLst: result };
                    nts.uk.request.exportFile('com', '/person/matrix/report/print/error', itemErrorLst).done(function (data) { console.log(data); }).fail(function (mes) {
                    });
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
        })(vm = g.vm || (g.vm = {}));
    })(g = cps003.g || (cps003.g = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.g.vm.js.map