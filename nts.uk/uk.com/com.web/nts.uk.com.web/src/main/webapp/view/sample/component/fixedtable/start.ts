__viewContext.ready(function () {
    class ScreenModel {
        itemList: KnockoutObservableArray<ScreenItem>;
        
        constructor() {
            var self = this;
            self.itemList = ko.observableArray([]);
            $("#fixed-table").ntsFixedTable({ height: 300, width: 600 });
        }
        
        addItem(){
            var self = this;
            self.itemList.push(new ScreenItem());    
        }
        
        removeItem(){
            var self = this;
            self.itemList.pop();    
        }
    }
    
    class ScreenItem {
        text: KnockoutObservable<string>;
        enable: KnockoutObservable<boolean>;
        
        itemList: KnockoutObservableArray<ItemModel>;
        selectedCode: KnockoutObservable<string>;
        
        constructor() {
            var self = this;
            self.text = ko.observable("abc");
            self.enable = ko.observable(true);
            self.itemList = ko.observableArray([
                new ItemModel('1', '基本給'),
                new ItemModel('2', '役職手当'),
                new ItemModel('3', '基本給')
            ]);
            self.selectedCode = ko.observable('1');
        }
    }
    
     class ItemModel {
        code: string;
        name: string;

        constructor(code: string, name: string) {
            this.code = code;
            this.name = name;
        }
    }
    
    this.bind(new ScreenModel());
    
});