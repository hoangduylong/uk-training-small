__viewContext.ready(function() {

    class ScreenModel {
        itemsSwap: KnockoutObservableArray<ItemModel>;
        columns: KnockoutObservableArray<nts.uk.ui.NtsGridListColumn>;
        leftColumns: KnockoutObservableArray<nts.uk.ui.NtsGridListColumn>;
        rightColumns: KnockoutObservableArray<nts.uk.ui.NtsGridListColumn>;
        currentCodeListSwap: KnockoutObservableArray<any>;
        test: KnockoutObservableArray<any>;
        disableMoveButton: KnockoutObservable<boolean>;

        constructor() {

            this.itemsSwap = ko.observableArray([]);
            this.disableMoveButton = ko.observable(false);
            var array = [];
            this.itemsSwap(array);

            this.columns = ko.observableArray([
                { headerText: 'コード', key: 'code', width: 100 },
                { headerText: '名称', key: 'name', width: 150 }
            ]);
            this.leftColumns = ko.observableArray([
                { headerText: 'コード', key: 'code', width: 200 }
            ]);
            
            let template = '${name} {{if ${code} == 3 || ${code} == 9}} <button class="setting" onclick="openDlg(${code})" data-code="${code}" style="margin-left: 20px;">設定</button> {{/if}}';
            this.rightColumns = ko.observableArray([
                { headerText: 'コード', key: 'code', width: 100 },
                { headerText: '名称', key: 'name', width: 150, template: template }
            ]);
            var x = [];
//            x.push(_.cloneDeep(array[0]));
//            x.push(_.cloneDeep(array[1]));
//            x.push(_.cloneDeep(array[2]));
            this.currentCodeListSwap = ko.observableArray(x);
            this.currentCodeListSwap.subscribe(function (value) {
                console.log(value); 
            });
            this.test = ko.observableArray([]);
        }
        
        remove(){
            this.itemsSwap.shift();            
        }
        
        bindSource (){
            let self = this;
            let array = [];
            for (var i = 0; i < 10000; i++) {
                array.push(new ItemModel(i, '基本給', "description"));
            }    
            self.itemsSwap(array);
        }
        
        beforeLeft(toRight, oldSource, newI){
            console.log("before Left");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        }
        beforeRight(toRight, oldSource, newI){
            console.log("before right");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        }
        beforeAllL(toRight, oldSource, newI){
            console.log("before all Left");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        }
        beforeAllR(toRight, oldSource, newI){
            console.log("before all right");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        }
        afterLeft(toRight, oldSource, newI){
            console.log("after Left");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        }
        afterRight(toRight, oldSource, newI){
            console.log("after right");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        }
        afterAllL(toRight, oldSource, newI){
            console.log("after all Left");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        }
        afterAllR(toRight, oldSource, newI){
            console.log("after all right");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        }
    }
    
    class ItemModel {
        code: number;
        name: string;
        description: string;
        deletable: boolean;
        constructor(code: number, name: string, description: string) {
            this.code = code;
            this.name = name;
            this.description = description;
            this.deletable = code % 3 === 0;
        }
    }

    var screen;
    this.bind(screen = new ScreenModel());
});

let openDlg = function(code) {
    alert(code);
};
