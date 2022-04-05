__viewContext.ready(function() {

    class ScreenModel {
        active: KnockoutObservable<any>;
        enable: KnockoutObservable<boolean>;

        items: KnockoutObservableArray<ItemModel>;
        columns: KnockoutObservableArray<any>;
        currentCode: KnockoutObservable<any>;
        currentCodeList: KnockoutObservableArray<any>;

        constructor() {
            var self = this;
            self.active = ko.observable(false);
            self.enable = ko.observable(true);

            self.items = ko.observableArray([]);
            for (let i = 1; i < 5; i++) {
                self.items.push(new ItemModel('00' + i, '基本給', "description " + i, i % 3 === 0, "2010/1/1"));
            }
            self.columns = ko.observableArray([
                { headerText: 'コード', key: 'code', width: 125 },
                { headerText: '名称', key: 'name', width: 125 },
                { headerText: '説明', key: 'description', width: 125 },
                { headerText: '説明1', key: 'other1', width: 125 },
                { headerText: '説明2', key: 'other2', width: 125, isDateColumn: true, format: 'YYYY/MM/DD' }
            ]);
            self.currentCode = ko.observable("001");
            self.currentCodeList = ko.observableArray([]);

            $("#grid").igGrid({
                dataSource: self.items(),
                primaryKey: 'code',
                width: undefined,
                height: '350px',
                columns: self.columns(),
                virtualization: true,
                virtualizationMode: 'continuous',
                features: [
                    { name: 'Selection', multipleSelection: true },
                    { name: 'RowSelectors', enableCheckBoxes: true, enableRowNumbering: false }
                ]
            });
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