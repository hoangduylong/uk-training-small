module nts.uk.ui.gridlist {
    __viewContext.ready(function() {

        class ScreenModel {
            items: KnockoutObservableArray<ItemModel>;
            dragItems: KnockoutObservableArray<ItemModel>;
            columns: KnockoutObservableArray<any>;
            currentCode: KnockoutObservable<any>;
            currentCodeList: KnockoutObservableArray<any>;
            codeList: KnockoutObservableArray<any>;
            disables: KnockoutObservableArray<any>;
            count: number = 100;
            enable: KnockoutObservable<boolean>;
            index: KnockoutObservable<number> = ko.observable(0);
            constructor() {
                var self = this;
                this.enable = ko.observable(true);
                this.items = ko.observableArray([]);
                this.disables = ko.observableArray([]);
                this.dragItems = ko.observableArray([]);

                for (let i = 1; i < 100; i++) {
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
                    { headerText: '説明1', key: 'other1', width: 150, formatter: v => {
                        if (v === "2010/1/1") {
                            return '<div style="text-align: center; max-height: 18px;"><i class="ui-icon ui-icon-info"></i>' + v + '</div>';
                        }
                        return '';
                    } },
                    { headerText: '説明2', key: 'other2', width: 150, isDateColumn: true, format: 'YYYY/MM/DD' }
                ]);
                this.currentCode = ko.observable();
                this.currentCode.subscribe((newValue) => {
                    self.index(_.findIndex(this.items(), ["code", newValue]));
                })
                this.currentCodeList = ko.observableArray(["006"]);
                this.codeList = ko.observableArray([]);
                // Fire event.
                $("#multi-list").on('itemDeleted', (function(e: Event) {
                    alert("Item is deleted in multi grid is " + e["detail"]["target"]);
                }));

                $("#single-list").on('itemDeleted', (function(e: Event) {
                    alert("Item is deleted in single grid is " + e["detail"]["target"]);
                }));
            }

            selectSomeItems() {
                this.currentCode('0010');
                this.currentCodeList.removeAll();
                this.currentCodeList.push('001');
                this.currentCodeList.push('002');
            }

            deselectAll() {
                this.currentCode(null);
                this.currentCodeList.removeAll();
            }
            
            updateItem() {
                this.items()[0].name = "test";
                this.items.valueHasMutated();
            }

            addItem() {
                this.items.push(new ItemModel(this.count.toString(), '基本給', "description " + this.count, true, "other " + this.count));
                this.count++;
            }

            removeItem() {
                this.items.shift();
            }

            addDeleteButton() {
                $("#multi-list").ntsGridList("setupDeleteButton", { deleteField: "deletable", sourceTarget: this.items });
            }

            prev() {
                var self = this;
                if (self.index() > 0) {
                    self.index(self.index() - 1);
                    self.currentCode(self.items()[self.index()].code);
                }
            }

            next() {
                var self = this;
                if (self.index() < self.items().length - 1) {
                    self.index(self.index() + 1);
                    self.currentCode(self.items()[self.index()].code);
                }
            }

            jump() {
                var self = this;
                self.index(50);
                self.currentCode(self.items()[self.index()].code);
            }

        }

        class ItemModel {
            code: string;
            name: string;
            description: string;
            other1: string;
            other2: string;
            deletable: boolean;
            constructor(code: string, name: string, description: string, deletable: boolean, other1?: string, other2?: string) {
                this.code = code;
                this.name = name;
                this.description = description;
                this.other1 = other1;
                this.other2 = other2 || other1;
                this.deletable = deletable;
            }
        }

        this.bind(new ScreenModel());
    });
}