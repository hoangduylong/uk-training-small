module template {
    sample["ntsGridList"] = new Control("グリッドリスト", 32,
        `<button data-bind="click: selectSomeItems">Select some items</button>
<button data-bind="click: deselectAll">Deselect all</button>
<button data-bind="click: addItem">Add</button>
<button data-bind="click: updateItem">Update Item</button>
<button data-bind="click: removeItem">Remove</button>
<span data-bind="ntsCheckBox: {checked: enable}">Enable</span>
<hr />
<h3>Single selecting mode</h3>
<table id="single-list" data-bind="ntsGridList: {
        height: 350,
        dataSource: items,
        primaryKey: 'code',
        columns: columns,
        enable: enable,
        multiple: false,
        value: currentCode,
        rows: 10
    }"></table>
currentCode: <span data-bind="text: currentCode"></span><br/>
<button data-bind="click: prev">Prev</button>
<button data-bind="click: next">Next</button>
<button data-bind="click: jump">Jump</button>
<hr/>
<h3>Multiple selecting mode</h3>
<table id="multi-list" data-bind="ntsGridList: {
        height: 350,
        dataSource: items,
        optionsValue: 'code',
        columns: columns,
        enable: enable,
        multiple: true,
        value: currentCodeList,
        selectionDisables: disables, 
        rows: 10
    }"></table>
currentCodeList: <span data-bind="text: currentCodeList"></span><br/>
<button data-bind="click: addDeleteButton">Add Delete Button</button>
<hr/>
<h3>Draggable</h3>
<table id="draggable-list" data-bind="ntsGridList: {
    height: 300,
    dataSource: dragItems,
    optionsValue: 'code',
    columns: columns,
    enable: true,
    multiple: true,
    value: codeList,
    itemDraggable: true
}"></table>
currentCodeList: <span data-bind="text: codeList"></span>`,
        `var ItemModel = (function () {
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

self.index = ko.observable(0);
self.enable = ko.observable(true);
self.items = ko.observableArray([]);
self.disables = ko.observableArray([]);
self.dragItems = ko.observableArray([]);

for (let i = 1; i < 100; i++) {
    self.items.push(new ItemModel('00' + i, '基本給 基本給', "description " + i, i % 3 === 0, "2010/1/1"));
    self.dragItems.push(new ItemModel('00' + i, '基本給 ', "description " + i, i % 3 === 0, "2010/1/1"));
    
    if (i % 6 === 0) {
        self.disables.push("00" + i);
    }
}

self.columns = ko.observableArray([
    { headerText: 'コード', key: 'code', width: 100, hidden: true },
    { headerText: '名称', key: 'name', width: 150, columnCssClass: "test" },
    { headerText: '説明', key: 'description', width: 150 },
    { headerText: '説明1', key: 'other1', width: 150, formatter: function(v) {
        if (v === "2010/1/1") {
            return '<div style="text-align: center; max-height: 18px;"><i class="ui-icon ui-icon-info"></i>' + v + '</div>';
        }
        return '';
    } },
    { headerText: '説明2', key: 'other2', width: 150, isDateColumn: true, format: 'YYYY/MM/DD' }
]);
self.currentCode = ko.observable();
self.currentCode.subscribe(function(newValue) {
    self.index(_.findIndex(self.items(), ["code", newValue]));
})
self.currentCodeList = ko.observableArray(["006"]);
self.codeList = ko.observableArray([]);
// Fire event.
$("#multi-list").on('itemDeleted', (function(e) {
    alert("Item is deleted in multi grid is " + e["detail"]["target"]);
}));

$("#single-list").on('itemDeleted', (function(e) {
    alert("Item is deleted in single grid is " + e["detail"]["target"]);
}));

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
};`);
    
    sample["ntsListBox"] = new Control("シンプルリスト", 33,
        `<div>
    <input data-bind="value: itemName"></input>
    <button data-bind="click: addOptions">Add Item</button>
</div>
<button data-bind="click: remove">Remove Item</button>
<button data-bind="click: selectAll">Select All</button>
<button data-bind="click: deselectAll">Deselect All</button>
<span data-bind="ntsCheckBox: { checked: isEnable }">Enable</span>
<span data-bind="ntsCheckBox: { checked: isMulti }">Multiple for list 1</span>
<br />
<!-- Multiple is false -->
<b>Single Selected:</b><span data-bind="text: selectedCode()"></span>
<i><span data-bind="text: selectedCode().code"></span></i><br/>
<!-- Multiple is true -->
<b>Multi Selected:</b><span data-bind="text: selectedCodes()"></span><br />
<b>Selected:</b><span data-bind="text: selectedCodes().length"></span><br />
<br />
<div id="list-box" data-bind="ntsListBox: {
                    options: itemList,
                    optionsValue: 'code',
                    optionsText: 'name',
                    multiple: isMulti(),
                    value: selectedCodes,
                    enable: isEnable(),
                    rows: 10,
                    columns: [
                        { key: 'code', length: 4 },
                        { key: 'name', length: 10 },
                        { key: 'description', length: 10 }
                    ]}"></div>
                    
<div id="list-box2" data-bind="ntsListBox: {
                    options: itemList,
                    optionsValue: 'code',
                    optionsText: 'name',
                    multiple: false,
                    value: selectedCode,
                    enable: isEnable(),
                    rows: 5 }"></div>
<br/>
<button data-bind="click: prev">Prev</button>
<button data-bind="click: next">Next</button>
<button data-bind="click: jump">Jump</button>`,
        `var ItemModel = (function () {
    function ItemModel(code, name, description) {
        this.code = code;
        this.name = name;
        this.description = description;
    }
    return ItemModel;
}());

self.index = ko.observable(0);
var temp = [];
for(var i = 0; i < 100; i++){
    temp.push(new ItemModel((i + 1), '基本給', "description " + (i + 1)));
}
self.itemList = ko.observableArray(temp);
self.itemName = ko.observable('');
self.currentCode = ko.observable(3);
self.selectedCode = ko.observable(temp[2].code);
self.selectedCodes = ko.observableArray([]);
self.isEnable = ko.observable(true);
self.isMulti = ko.observable(true);
self.isMulti2 = ko.observable(true);
self.isValidate = ko.observable(true);

ScreenModel.prototype.addOptions = function () {
    var self = this;
    var newCode = self.currentCode() + 1;
    var itemCode = newCode;
    self.itemList.push(new ItemModel(itemCode, self.itemName(), ""));
    self.currentCode(newCode);
};
ScreenModel.prototype.deselectAll = function () {
    $('#list-box').ntsListBox('deselectAll');
};
ScreenModel.prototype.selectAll = function () {
    $('#list-box').ntsListBox('selectAll');
};
/**
 * Clear options.
 */
ScreenModel.prototype.clearOptions = function () {
    var self = this;
    self.itemList([]);
};
/**
 * Remove item by code;
 */
ScreenModel.prototype.remove = function () {
    var self = this;
    // Remove by code.
    var selected = self.itemList().filter(function (item) { return item.code === self.selectedCode().code; })[0];
    self.itemList.remove(selected);
    // Remove by codes
    var selecteds = self.itemList().filter(function (item) { return self.selectedCodes().indexOf(item) != -1; });
    self.itemList.removeAll(selecteds);
};
ScreenModel.prototype.prev = function () {
    var self = this;
    if (self.index() > 0) {
        self.index(self.index() - 1);
        self.selectedCode(self.itemList()[self.index()]);
    }
};
ScreenModel.prototype.next = function () {
    var self = this;
    if (self.index() < self.itemList().length - 1) {
        self.index(self.index() + 1);
        self.selectedCode(self.itemList()[self.index()]);
    }
};
ScreenModel.prototype.jump = function () {
    var self = this;
    self.index(50);
    self.selectedCode(self.itemList()[self.index()]);
};`);
    
    sample["ntsTreeGridView"] = new Control("ツリーリスト", 34,
        `<button data-bind="click: resetSelection">Reset</button>
<button data-bind="click: changeDataSource">Next
    Datasource</button>
<div class="cf">
    <div style="float: left">
        <h3>Single Selection</h3>
        <table id="treegrid2"
            data-bind="ntsTreeGridView:{
                    width: 700,
                    height: 250,
                    dataSource: items2,
                    value: singleSelectedCode,
                    columns: columns,
                    initialExpandDepth: 0,
                    primaryKey: 'code',
                    childDataKey: 'childs',
                    primaryText: 'nodeText',
                    multiple: false,
                    enable: true,
                    showCheckBox: false}">
        </table>
        
        <table id="treegrid2-limited"
            data-bind="ntsTreeGridView:{
                    width: 700,
                    height: 250,
                    dataSource: items2,
                    value: singleSelectedCode,
                    columns: columns,
                    primaryKey: 'code',
                    childDataKey: 'childs',
                    primaryText: 'nodeText',
                    multiple: false,
                    enable: true,
                    showCheckBox: false,
                    rows: 5}">
        </table>
    </div>
    <div style="float: left">
        <h4>Your single selected code:</h4>
        <span data-bind="text: singleSelectedCode"></span>
        <br />
        <br />
    </div>
</div>
<div class="cf">
    <div style="float: left;">
        <h3>Multi Selection</h3>
        <div>
            <div style="width: 390px" data-bind="ntsSearchBox: {label: '検索', targetKey: 'code', mode:'igTree', comId:'treegrid', items: items1, selected: selectedCodes2, selectedKey: 'code', childField: 'childs', fields: ['name', 'code']}"></div>
            <div style="display: inline-block;">
                <table id="treegrid"
                    data-bind="ntsTreeGridView:{
                    width: 690, 
                    height: 250,
                    options: items1,
                    virtualization: true, 
                    virtualizationMode: 'continuous',
                    selectedValues: selectedCode,
                    optionsValue: 'code',
                    optionsChild: 'childs',
                    optionsText: 'nodeText',
                    multiple: true,
                    enable: true,
                    columns: columns2,
                    showCheckBox: true}">
                </table>
            </div>
            <div id="up-down"
                data-bind="ntsUpDown: {
                targetSource: items1,
                primaryKey: 'code',
                comId: '#treegrid',
                type: 'tree', 
                childDataKey: 'childs'
            }"></div>
        </div>
    </div>
    <div style="float: left">
        <h4>Your multiple selected code:</h4>
        <!-- ko foreach: selectedCode -->
            <div data-bind="text: $data"></div>
        <!-- /ko -->
        <br />
        <br />
    </div>
</div>`,
        `var Node = (function () {
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

self.items1 = ko.observableArray([]);
for(let i = 1; i <= 50; i++) {
    let level1 = new Node('0000' + i, 'サービス部 サービス部 サービス部  vサービス部  サービス部サービス部 サービス部 サービス部 サービス部サービス部 サービス部サービス部' + i, []);
    for(let j = 1; j <= 2; j++) {
        let ij = i + "" + j;
        let level2 = new Node('0000' + ij, 'サービス部' + ij, []);
        level1.childs.push(level2);
        for(let k = 1; k <= 2; k++) {
            let  ijk = ij + "" + k;
            let level3 = new Node('0000' + ijk, 'サービス部' + ijk, []);
            level2.childs.push(level3);
            for(let l = 1; l <= 2; l++) {
                let  ijkl = ijk + "" + l;
                let level4 = new Node('0000' + ijkl, 'サービス部' + ijkl, []);
                level3.childs.push(level4);
                for(let n = 1; n <= 2; n++) {
                    let  ijkln = ijkl + "" + n;
                    let level5 = new Node('0000' + ijkln, 'サービス部' + ijkln, []);
                    level4.childs.push(level5);
                }
            }
        }   
    }
    self.items1.push(level1);
}
self.items2 = ko.observableArray(self.items1());
self.selectedCode = ko.observableArray([]);
self.singleSelectedCode = ko.observable(null);
self.selectedCodes2 = ko.observable([]);
self.index = 0;
self.columns = ko.observableArray([{ headerText: "Item Code", width: "250px", key: 'code', dataType: "string", hidden: false },
{ headerText: "Item Text", key: 'nodeText', width: "200px", dataType: "string" }]);
self.columns2 = ko.observableArray([{ headerText: "Item Code", width: "250px", key: 'code', dataType: "string", hidden: false },
{ headerText: "Item Text", key: 'nodeText', width: "250px", dataType: "string" },
{ headerText: "Item Auto Generated Field", key: 'custom', width: "200px", dataType: "string" }]);
ScreenModel.prototype.resetSelection = function () {
    var self = this;
    var x = self.items2().slice();
    var y = x[0];
    x[0] = x[1];
    x[1] = y;
    self.items2(x);
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
    self.items1(newArrays);
    self.items2(newArrays);
};`);
    
    sample["ntsTreeDragAndDrop"] = new Control("ツリー", 35,
        `<button data-bind="click: resetSelection">Reset</button>
<button data-bind="click: changeDataSource">Next
    Datasource</button>
<div class="cf">
    <div style="float: left">
        <h3>Single Selection</h3>
        <div id="treegrid2"
            data-bind="ntsTreeDragAndDrop:{
                    width: 1000,
                    height: 250,
                    rows: 10,
                    dataSource: items2,
                    value: singleSelectedCode,
                    primaryKey: 'code',
                    childDataKey: 'childs',
                    primaryText: 'nodeText',
                    maxDeepLeaf: 2,
                    maxChildInNode: 3,
                    multiple: false,
                    enable: true}">
        </div>
    </div>
    <div style="float: left">
        <br />
        <br />
        <h4>Your single selected code:</h4>
        <span data-bind="text: singleSelectedCode"></span>
    </div>
</div>
<div class="cf">
    <div style="float: left;">
        <h3>Multi Selection</h3>
        <div>
             <div style="display: inline-block;">
                <div id="treegrid"
                    data-bind="ntsTreeDragAndDrop:{
                    width: 1000, 
                    height: 250,
                    options: items1,
                    selectedValues: selectedCode,
                    optionsValue: 'code',
                    optionsChild: 'childs',
                    optionsText: 'nodeText',
                    multiple: true}">
                </div>
            </div>
        </div>
    </div>
    <div style="float: left">
        <br />
        <br />
        <h4>Your multiple selected code:</h4>
        <!-- ko foreach: selectedCode -->
            <div data-bind="text: $data"></div>
        <!-- /ko -->
    </div>
</div>
<div class="cf">
    <div style="float: left;">
        <h3>With searchbox</h3>
        <div>
            <div data-bind="ntsSearchBox: {targetKey: 'code', mode:'igTreeDrag', comId:'treegrid3', items: items1,           
                searchText: 'test',  selected: selectedCode, selectedKey: 'code', childField: 'childs', fields: ['code', 'nodeText'], enable: true} "></div>
             <div style="display: inline-block;">
                <div id="treegrid3"
                    data-bind="ntsTreeDragAndDrop:{
                    width: 1000, 
                    height: 250,
                    options: items1,
                    selectedValues: selectedCode,
                    optionsValue: 'code',
                    optionsChild: 'childs',
                    optionsText: 'nodeText',
                    multiple: true}">
                </div>
            </div>
        </div>
    </div>
</div>`,
        `var Node = (function () {
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

self.items1 = ko.observableArray([]);
for(let i = 0; i <= 2; i++) {
    let level1 = new Node('0000' + i, 'サービス部 サービス部 サービス部  vサービス部  サービス部サービス部 サービス部 サービス部 サービス部サービス部 サービス部サービス部' + i, []);
    for(let j = 1; j <= 2; j++) {
        let ij = i + "" + j;
        let level2 = new Node('0000' + ij, 'サービス部' + ij, []);
        level1.childs.push(level2);
        for(let k = 1; k <= 2; k++) {
            let  ijk = ij + "" + k;
            let level3 = new Node('0000' + ijk, 'サービス部' + ijk, []);
            level2.childs.push(level3);
            for(let l = 1; l <= 2; l++) {
                let  ijkl = ijk + "" + l;
                let level4 = new Node('0000' + ijkl, 'サービス部' + ijkl, []);
                level3.childs.push(level4);
                for(let n = 1; n <= 2; n++) {
                    let  ijkln = ijkl + "" + n;
                    let level5 = new Node('0000' + ijkln, 'サービス部' + ijkln, []);
                    level4.childs.push(level5);
                }
            }
        }   
    }
    self.items1.push(level1);
}
self.items2 = ko.observableArray(self.items1());
self.selectedCode = ko.observableArray([]);
self.singleSelectedCode = ko.observable(null);
self.index = 0;
self.columns = ko.observableArray([{ headerText: "Item Code", width: "250px", key: 'code', dataType: "string", hidden: false },
{ headerText: "Item Text", key: 'nodeText', width: "200px", dataType: "string" }]);
self.columns2 = ko.observableArray([{ headerText: "Item Code", width: "250px", key: 'code', dataType: "string", hidden: false },
{ headerText: "Item Text", key: 'nodeText', width: "250px", dataType: "string" },
{ headerText: "Item Auto Generated Field", key: 'custom', width: "200px", dataType: "string" }]);
ScreenModel.prototype.resetSelection = function () {
    var self = this;
    self.items1([new Node('0001', 'サービス部', [
            new Node('0001-1', 'サービス部1', []),
            new Node('0001-2', 'サービス部2', []),
            new Node('0001-3', 'サービス部3', [])
        ]), new Node('0002', '開発部', [])]);
    self.items2(self.items1());
    self.singleSelectedCode('0002');
    self.selectedCode(['0001-1', '0002']);
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
};`);
    
        sample["ntsSwapList"] = new Control("スワップリスト", 36,
        `<div data-bind="ntsCheckBox: { checked: disableMoveButton, text: 'Disable Move Button' }"></div>
<div>
    <div style="display: inline-block;">
        <div id="swap-list"
            data-bind="ntsSwapList: {
            showSearchBox: { showLeft : true, showRight: true},
            height: 300,
            dataSource: itemsSwap,
            disableMoveButton: disableMoveButton,
            primaryKey: 'code',
            enableRowNumbering: false,
            columns: columns,
            value: currentCodeListSwap,
            searchMode: 'filter',
            searchCriterion: ['code'],
            draggable: true,
            leftSearchBoxText: 'コードで検索・・・',
            rightSearchBoxText: 'コードで検索・・・',
            multipleDrag: { left: true, right: false },
            innerDrag: { left: false, right: true },
            outerDrag: { left: true, right: true },
            itemsLimit: { left: 10000, right: 10 },
            beforeMoveLeft: beforeLeft,
            beforeMoveRight: beforeRight,
            beforeAllLeft: beforeAllL,
            beforeAllRight: beforeAllR,
            afterMoveLeft: afterLeft,
            afterMoveRight: afterRight,
            afterAllLeft: afterAllL,
            afterAllRight: afterAllR
        }"></div>
    </div>
    <div id="up-down"
        data-bind="ntsUpDown: {
                targetSource: currentCodeListSwap,
                primaryKey: 'code',
                comId: '#swap-list',
                type: 'swap',
                swapTarget: 'right'
            }, visible: disableMoveButton"></div>
</div>
<button id="bindSource" type="button" data-bind="click: bindSource">Bind</button>
<button id="check" type="button">Check</button>
<button data-bind="click: remove">Remove</button>`,
        `var ItemModel = (function () {
    function ItemModel(code, name, description) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.deletable = code % 3 === 0;
    }
    return ItemModel;
}());

self.itemsSwap = ko.observableArray([]);
self.disableMoveButton = ko.observable(false);
var array = [];
self.itemsSwap(array);

self.columns = ko.observableArray([
    { headerText: 'コード', key: 'code', width: 100 },
    { headerText: '名称', key: 'name', width: 150 }
]);
self.leftColumns = ko.observableArray([
    { headerText: 'コード', key: 'code', width: 200 }
]);

let template = '\${name} {{if \${code} == 3 || \${code} == 9}} <button class="setting" onclick="openDlg(\${code})" data-code="\${code}" style="margin-left: 20px;">設定</button> {{/if}}';
self.rightColumns = ko.observableArray([
    { headerText: 'コード', key: 'code', width: 100 },
    { headerText: '名称', key: 'name', width: 150, template: template }
]);
var x = [];
self.currentCodeListSwap = ko.observableArray(x);
self.test = ko.observableArray([]);
ScreenModel.prototype.remove = function () {
    this.itemsSwap.shift();
};
ScreenModel.prototype.bindSource = function () {
    var self = this;
    var array = [];
    for (var i = 0; i < 10000; i++) {
        array.push(new ItemModel(i, '基本給', "description"));
    }
    self.itemsSwap(array);
};
ScreenModel.prototype.beforeLeft = function (toRight, oldSource, newI) {
    
};
ScreenModel.prototype.beforeRight = function (toRight, oldSource, newI) {
    
};
ScreenModel.prototype.beforeAllL = function (toRight, oldSource, newI) {
    
};
ScreenModel.prototype.beforeAllR = function (toRight, oldSource, newI) {
    
};
ScreenModel.prototype.afterLeft = function (toRight, oldSource, newI) {
    
};
ScreenModel.prototype.afterRight = function (toRight, oldSource, newI) {
    
};
ScreenModel.prototype.afterAllL = function (toRight, oldSource, newI) {
    
};
ScreenModel.prototype.afterAllR = function (toRight, oldSource, newI) {
    
};

var openDlg = function (code) {
    alert(code);
};`);
}