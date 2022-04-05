__viewContext.ready(function () {
    class ScreenModel {
        index: number;
        items1: any;
        items2: any;
        itemsX: any;
        selectedCode: any;
        singleSelectedCode: any;
        columns: any;
        columns2: any;
        columnsX: any;
        selectedCodes2: any;
    
        constructor() {
            var self = this;
            self.items1 = ko.observableArray([]);
            for(let i = 1; i <= 50; i++) {
                let level1 = new Node(_.padStart(i, 6, 0), 'サービス部 サービス部 サービス部  vサービス部  サービス部サービス部 サービス部 サービス部 サービス部サービス部 サービス部サービス部' + i, []);
                for(let j = 1; j <= 2; j++) {
                    let ij = i + "" + j;
                    let level2 = new Node(_.padStart(ij, 7, 0), 'サービス部' + ij, []);
                    level1.childs.push(level2);
                    for(let k = 1; k <= 2; k++) {
                        let  ijk = ij + "" + k;
                        let level3 = new Node(_.padStart(ijk, 8, 0), 'サービス部' + ijk, []);
                        level2.childs.push(level3);
                        for(let l = 1; l <= 2; l++) {
                            let  ijkl = ijk + "" + l;
                            let level4 = new Node(_.padStart(ijkl, 9, 0), 'サービス部' + ijkl, []);
                            level3.childs.push(level4);
                            for(let n = 1; n <= 2; n++) {
                                let  ijkln = ijkl + "" + n;
                                let level5 = new Node(_.padStart(ijkln, 10, 0), 'サービス部' + ijkln, []);
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
            { headerText: "Item Text", key: 'checkbox', width: "200px", dataType: "boolean", formatType : "checkbox", 
                    filterOpts : { trueOpt: nts.uk.resource.getText("Enum_UseAtr_Use"), falseOpt: nts.uk.resource.getText("Enum_UseAtr_NotUse") } }]);
            self.columnsX = ko.observableArray([{ headerText: "Item Code", width: "250px", key: 'code', dataType: "string", hidden: false },
            { headerText: "Item Text", key: 'checkbox', width: "200px", dataType: "boolean", formatType : "checkbox", parentCompute: true }]);
            self.columns2 = ko.observableArray([{ headerText: "Item Code", width: "250px", key: 'code', dataType: "string", hidden: false },
            { headerText: "Item Text", key: 'nodeText', width: "250px", dataType: "string" },
            { headerText: "Item Auto Generated Field", key: 'custom', width: "200px", dataType: "string" }]);            
        }
        
        resetSelection(): void {
            var self = this;
//            self.items1([new Node('0001', 'サービス部', [
//                new Node('0001-1', 'サービス部1', []),
//                new Node('0001-2', 'サービス部2', []),
//                new Node('0001-3', 'サービス部3', [])
//            ]), new Node('0002', '開発部', [])]);
            let x = self.items2().slice();
            let y = x[0];
            x[0]= x[1];
            x[1] = y;
            self.items2(x); 
//            self.singleSelectedCode('0002');
//            self.selectedCode(['0001-1', '0002']);
        }
        
        disableRows(): void {
            $("#treegrid2").ntsTreeView("disableRows", ["000003", "000004"]);    
            $("#treegrid2-limited").ntsTreeView("disableRows", ["000003", "000004"]);
            $("#treegrid").ntsTreeView("disableRows", ["000003", "000004"]);
        }
        
        changeDataSource(): void {
            var self = this;
            var i = 0;
            var newArrays = new Array();
            while (i < 50) {
                self.index ++;
                i++;
                newArrays.push(new Node(self.index.toString(), 'Name ' + self.index.toString(), []));
            };
            self.items1(newArrays);
            self.items2(newArrays);
        }
    }
    
    class Node {
        code: string;
        name: string; 
        nodeText: string;
        custom: string;
        childs: Array<Node>;
        checkbox: boolean;
        constructor(code: string, name: string, childs: Array<Node>) {
            var self = this;
            self.code = code;
            self.name = name;
            self.nodeText = self.code + ' ' + self.name;
            self.childs = childs;
            self.custom = 'Random' + new Date().getTime();
            self.checkbox = true;
        }
    }
    
    this.bind(new ScreenModel());
    $("#treegrid2").ntsTreeView("disableRows", ["0000011", "0000012"]);    
    $("#treegrid2-limited").ntsTreeView("disableRows", ["0000011", "0000012"]);
    $("#treegrid").ntsTreeView("disableRows", ["0000011", "0000012"]);
    
    $("#treegrid2").on("checkboxChanging", function(evt, data) {
        _.forEach(data.rowData.childs, function(c){
                $("#treegrid2").ntsTreeView(data.value ? "enableRows" : "disableRows", c.code);
        });
    });
    
});