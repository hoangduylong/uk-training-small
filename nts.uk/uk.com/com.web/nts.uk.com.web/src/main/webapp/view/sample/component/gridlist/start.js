var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var ui;
        (function (ui) {
            var gridlist;
            (function (gridlist) {
                __viewContext.ready(function () {
                    var ScreenModel = /** @class */ (function () {
                        function ScreenModel() {
                            var _this = this;
                            this.count = 100;
                            this.index = ko.observable(0);
                            var self = this;
                            this.enable = ko.observable(true);
                            this.items = ko.observableArray([]);
                            this.disables = ko.observableArray([]);
                            this.dragItems = ko.observableArray([]);
                            for (var i = 1; i < 100; i++) {
                                this.items.push(new ItemModel('00' + i, '基本給 基本給', "description " + i, i % 3 === 0, "2010/1/1"));
                                this.dragItems.push(new ItemModel('00' + i, '基本給 ', "description " + i, i % 3 === 0, "2010/1/1"));
                                if (i % 6 === 0) {
                                    this.disables.push("00" + i);
                                }
                            }
                            this.columns = ko.observableArray([
                                { headerText: 'コード', key: 'code', width: 100, hidden: true },
                                { headerText: '名称', key: 'name', width: 150, columnCssClass: "test" },
                                { headerText: '説明', key: 'description', width: 150 },
                                { headerText: '説明1', key: 'other1', width: 150, formatter: function (v) {
                                        if (v === "2010/1/1") {
                                            return '<div style="text-align: center; max-height: 18px;"><i class="ui-icon ui-icon-info"></i>' + v + '</div>';
                                        }
                                        return '';
                                    } },
                                { headerText: '説明2', key: 'other2', width: 150, isDateColumn: true, format: 'YYYY/MM/DD' }
                            ]);
                            this.currentCode = ko.observable();
                            this.currentCode.subscribe(function (newValue) {
                                self.index(_.findIndex(_this.items(), ["code", newValue]));
                            });
                            this.currentCodeList = ko.observableArray(["006"]);
                            this.codeList = ko.observableArray([]);
                            // Fire event.
                            $("#multi-list").on('itemDeleted', (function (e) {
                                alert("Item is deleted in multi grid is " + e["detail"]["target"]);
                            }));
                            $("#single-list").on('itemDeleted', (function (e) {
                                alert("Item is deleted in single grid is " + e["detail"]["target"]);
                            }));
                        }
                        ScreenModel.prototype.selectSomeItems = function () {
                            this.currentCode('0010');
                            this.currentCodeList.removeAll();
                            this.currentCodeList.push('001');
                            this.currentCodeList.push('002');
                        };
                        ScreenModel.prototype.deselectAll = function () {
                            this.currentCode(null);
                            this.currentCodeList.removeAll();
                        };
                        ScreenModel.prototype.updateItem = function () {
                            this.items()[0].name = "test";
                            this.items.valueHasMutated();
                        };
                        ScreenModel.prototype.addItem = function () {
                            this.items.push(new ItemModel(this.count.toString(), '基本給', "description " + this.count, true, "other " + this.count));
                            this.count++;
                        };
                        ScreenModel.prototype.removeItem = function () {
                            this.items.shift();
                        };
                        ScreenModel.prototype.addDeleteButton = function () {
                            $("#multi-list").ntsGridList("setupDeleteButton", { deleteField: "deletable", sourceTarget: this.items });
                        };
                        ScreenModel.prototype.prev = function () {
                            var self = this;
                            if (self.index() > 0) {
                                self.index(self.index() - 1);
                                self.currentCode(self.items()[self.index()].code);
                            }
                        };
                        ScreenModel.prototype.next = function () {
                            var self = this;
                            if (self.index() < self.items().length - 1) {
                                self.index(self.index() + 1);
                                self.currentCode(self.items()[self.index()].code);
                            }
                        };
                        ScreenModel.prototype.jump = function () {
                            var self = this;
                            self.index(50);
                            self.currentCode(self.items()[self.index()].code);
                        };
                        return ScreenModel;
                    }());
                    var ItemModel = /** @class */ (function () {
                        function ItemModel(code, name, description, deletable, other1, other2) {
                            this.code = code;
                            this.name = name;
                            this.description = description;
                            this.other1 = other1;
                            this.other2 = other2 || other1;
                            this.deletable = deletable;
                        }
                        return ItemModel;
                    }());
                    this.bind(new ScreenModel());
                });
            })(gridlist = ui.gridlist || (ui.gridlist = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=start.js.map