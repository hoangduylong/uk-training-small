__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.items1 = ko.observableArray([]);
            for (var i = 1; i <= 50; i++) {
                var level1 = new Node(_.padStart(i, 6, 0), 'サービス部 サービス部 サービス部  vサービス部  サービス部サービス部 サービス部 サービス部 サービス部サービス部 サービス部サービス部' + i, []);
                for (var j = 1; j <= 2; j++) {
                    var ij = i + "" + j;
                    var level2 = new Node(_.padStart(ij, 7, 0), 'サービス部' + ij, []);
                    level1.childs.push(level2);
                    for (var k = 1; k <= 2; k++) {
                        var ijk = ij + "" + k;
                        var level3 = new Node(_.padStart(ijk, 8, 0), 'サービス部' + ijk, []);
                        level2.childs.push(level3);
                        for (var l = 1; l <= 2; l++) {
                            var ijkl = ijk + "" + l;
                            var level4 = new Node(_.padStart(ijkl, 9, 0), 'サービス部' + ijkl, []);
                            level3.childs.push(level4);
                            for (var n = 1; n <= 2; n++) {
                                var ijkln = ijkl + "" + n;
                                var level5 = new Node(_.padStart(ijkln, 10, 0), 'サービス部' + ijkln, []);
                                level4.childs.push(level5);
                            }
                        }
                    }
                }
                self.items1.push(level1);
            }
            self.items2 = ko.observableArray(self.items1());
            self.itemsX = ko.observableArray(_.cloneDeep(self.items1()));
            self.selectedCode = ko.observableArray([]);
            self.singleSelectedCode = ko.observable(null);
            self.selectedCodes2 = ko.observable([]);
            self.index = 0;
            self.columns = ko.observableArray([{ headerText: "Item Code", width: "250px", key: 'code', dataType: "string", hidden: false },
                { headerText: "Item Text", key: 'checkbox', width: "200px", dataType: "boolean", formatType: "checkbox",
                    filterOpts: { trueOpt: nts.uk.resource.getText("Enum_UseAtr_Use"), falseOpt: nts.uk.resource.getText("Enum_UseAtr_NotUse") } }]);
            self.columnsX = ko.observableArray([{ headerText: "Item Code", width: "250px", key: 'code', dataType: "string", hidden: false },
                { headerText: "Item Text", key: 'checkbox', width: "200px", dataType: "boolean", formatType: "checkbox", parentCompute: true }]);
            self.columns2 = ko.observableArray([{ headerText: "Item Code", width: "250px", key: 'code', dataType: "string", hidden: false },
                { headerText: "Item Text", key: 'nodeText', width: "250px", dataType: "string" },
                { headerText: "Item Auto Generated Field", key: 'custom', width: "200px", dataType: "string" }]);
        }
        ScreenModel.prototype.resetSelection = function () {
            var self = this;
            //            self.items1([new Node('0001', 'サービス部', [
            //                new Node('0001-1', 'サービス部1', []),
            //                new Node('0001-2', 'サービス部2', []),
            //                new Node('0001-3', 'サービス部3', [])
            //            ]), new Node('0002', '開発部', [])]);
            var x = self.items2().slice();
            var y = x[0];
            x[0] = x[1];
            x[1] = y;
            self.items2(x);
            //            self.singleSelectedCode('0002');
            //            self.selectedCode(['0001-1', '0002']);
        };
        ScreenModel.prototype.disableRows = function () {
            $("#treegrid2").ntsTreeView("disableRows", ["000003", "000004"]);
            $("#treegrid2-limited").ntsTreeView("disableRows", ["000003", "000004"]);
            $("#treegrid").ntsTreeView("disableRows", ["000003", "000004"]);
        };
        ScreenModel.prototype.changeDataSource = function () {
            var self = this;
            var i = 0;
            var newArrays = new Array();
            while (i < 50) {
                self.index++;
                i++;
                newArrays.push(new Node(self.index.toString(), 'Name ' + self.index.toString(), []));
            }
            ;
            self.items1(newArrays);
            self.items2(newArrays);
        };
        return ScreenModel;
    }());
    var Node = /** @class */ (function () {
        function Node(code, name, childs) {
            var self = this;
            self.code = code;
            self.name = name;
            self.nodeText = self.code + ' ' + self.name;
            self.childs = childs;
            self.custom = 'Random' + new Date().getTime();
            self.checkbox = true;
        }
        return Node;
    }());
    this.bind(new ScreenModel());
    $("#treegrid2").ntsTreeView("disableRows", ["0000011", "0000012"]);
    $("#treegrid2-limited").ntsTreeView("disableRows", ["0000011", "0000012"]);
    $("#treegrid").ntsTreeView("disableRows", ["0000011", "0000012"]);
    $("#treegrid2").on("checkboxChanging", function (evt, data) {
        _.forEach(data.rowData.childs, function (c) {
            $("#treegrid2").ntsTreeView(data.value ? "enableRows" : "disableRows", c.code);
        });
    });
});
//# sourceMappingURL=start.js.map