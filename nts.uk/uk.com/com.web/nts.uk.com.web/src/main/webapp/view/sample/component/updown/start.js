__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.itemsSwap = ko.observableArray([]);
            var array = [];
            for (var i = 0; i < 10000; i++) {
                array.push(new ItemModel("test" + i, '基本給', "description"));
            }
            this.itemsSwap(array);
            this.columns = ko.observableArray([
                { headerText: 'コード', key: 'code', width: 100 },
                { headerText: '名称', key: 'name', width: 150 }
            ]);
            this.items1 = ko.observableArray([]);
            for (var i_1 = 1; i_1 <= 2; i_1++) {
                var level1 = new Node('0000' + i_1, 'サービス部' + i_1, []);
                for (var j = 1; j <= 2; j++) {
                    var ij = i_1 + "" + j;
                    var level2 = new Node('0000' + ij, 'サービス部' + ij, []);
                    level1.childs.push(level2);
                    for (var k = 1; k <= 2; k++) {
                        var ijk = ij + "" + k;
                        var level3 = new Node('0000' + ijk, 'サービス部' + ijk, []);
                        level2.childs.push(level3);
                        for (var l = 1; l <= 2; l++) {
                            var ijkl = ijk + "" + l;
                            var level4 = new Node('0000' + ijkl, 'サービス部' + ijkl, []);
                            level3.childs.push(level4);
                            for (var n = 1; n <= 2; n++) {
                                var ijkln = ijkl + "" + n;
                                var level5 = new Node('0000' + ijkln, 'サービス部' + ijkln, []);
                                level4.childs.push(level5);
                            }
                        }
                    }
                }
                this.items1.push(level1);
            }
            this.columns2 = ko.observableArray([{ headerText: "Item Code", width: "250px", key: 'code', dataType: "string", hidden: false },
                { headerText: "Item Text", key: 'nodeText', width: "200px", dataType: "string" }]);
            this.selectedCode = ko.observableArray([]);
            this.currentCodeListSwap = ko.observableArray([]);
            this.test = ko.observableArray([]);
            this.testSingle = ko.observable(null);
        }
        ScreenModel.prototype.remove = function () {
            this.itemsSwap.shift();
        };
        return ScreenModel;
    }());
    var ItemModel = /** @class */ (function () {
        function ItemModel(code, name, description) {
            this.code = code;
            this.name = name;
            this.description = description;
        }
        return ItemModel;
    }());
    var Node = /** @class */ (function () {
        function Node(code, name, childs) {
            var self = this;
            self.code = code;
            self.name = name;
            self.nodeText = self.code + ' ' + self.name;
            self.childs = childs;
            self.custom = 'Random' + new Date().getTime();
        }
        return Node;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map