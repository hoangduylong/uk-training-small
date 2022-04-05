module nts.uk.ui.gridlist {
    
    __viewContext.ready(function () {
        
        class GridItem {
            id: number;
            flag: boolean;
            ruleCode: string;
            combo: string;
            text1: string;
            constructor(index: number) {
                this.id = index;
                this.flag = index % 2 == 0;
                this.ruleCode = String(index % 3 + 1);
                this.combo = String(index % 3 + 1);
                this.text1 = "TEXT";
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
        
        class CellState {
            rowId: number;
            columnKey: string;
            state: Array<any>
            constructor(rowId: string, columnKey: string, state: Array<any>) {
                this.rowId = rowId;
                this.columnKey = columnKey;
                this.state = state;
            }
        }
        
        class ScreenModel {
            tabs: KnockoutObservableArray<any>;
            selectedTab: KnockoutObservable<string>;
//            modes = ko.observableArray([
//                { code: '1', name: '四捨五入' },
//                { code: '2', name: '切り上げ' },
//                { code: '3', name: '切り捨て' }
//            ]);
//            
//            flagTemplate = '<div class="nts-binding" data-bind="ntsCheckBox: { checked: flag }">Enable</div>';
            
            items0 = (function() {
                let list = [];
                for (let i = 501; i < 1000; i++) {
                    list.push(new GridItem(i));
                }
                return list;
            })();
            
            items = (function () {
                var list = [];
                for (var i = 0; i < 500; i++) {
                    list.push(new GridItem(i));
                }
                return list;
            })();
            
//            rowsRendered(evt, ui) {
//                // 
//                _.defer(() => {
//                    $('.nts-binding').not('.nts-binding-done').each(function () {
//                        var $this = $(this).addClass('.nts-binding-done');
//                        var rowIndex = ig.grid.getRowIndexFrom($this);
//                        var item = model.items()[rowIndex];
//                        ko.applyBindings(item, $(this).closest('tr')[0]);
//                        
//                        $this.one('remove', function (e) {
//                            ko.cleanNode(this);
//                        }); 
//                    });
//                });
//            }
            
            constructor() {
                this.tabs = ko.observableArray([
                    {id: 'tab-1', title: 'Tab Title 1', content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true)},
                    {id: 'tab-2', title: 'Tab Title 2', content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true)}
                ]);
                this.selectedTab = ko.observable('tab-2');
        
                var comboItems = [ new ItemModel('1', '基本給'),
                                    new ItemModel('2', '役職手当'),
                                    new ItemModel('3', '基本給2') ];
                var comboColumns = [{ prop: 'code', length: 4 },
                                    { prop: 'name', length: 8 }];
                
                var statesTable = [];
                statesTable.push(new CellState(546, "flag", [nts.uk.ui.jqueryExtentions.ntsGrid.color.Disable]));
                statesTable.push(new CellState(503, "flag", [nts.uk.ui.jqueryExtentions.ntsGrid.color.Disable]));
                statesTable.push(new CellState(509, "flag", [nts.uk.ui.jqueryExtentions.ntsGrid.color.Disable]));
                statesTable.push(new CellState(511, "flag", [nts.uk.ui.jqueryExtentions.ntsGrid.color.Disable]));
                
                $("#grid0").ntsGrid({ 
                            width: '970px',
                            height: '400px',
                            dataSource: this.items0,
                            primaryKey: 'id',
                            virtualization: true,
                            virtualizationMode: 'continuous',
                            hidePrimaryKey: true,
//                            enter: 'right',
                            columns: [
                                { headerText: 'ID', key: 'id', dataType: 'number', width: '50px', ntsControl: 'Label' },
                                { headerText: 'FLAG', key: 'flag', dataType: 'boolean', width: '200px', showHeaderCheckbox: true, ntsControl: 'Checkbox' },
                                { headerText: 'RULECODE', key: 'ruleCode', dataType: 'string', width: '290px', ntsControl: 'SwitchButtons' },
                                { headerText: 'Combobox', key: 'combo', dataType: 'string', width: '230px', ntsControl: 'Combobox', tabIndex: 0 },
                                { headerText: 'Text', key: 'text1', dataType: 'string', width: '120px' },
                                { headerText: 'Button', key: 'open', dataType: 'string', width: '80px', unbound: true, ntsControl: 'Button' },
                                { headerText: 'Delete', key: 'delete', dataType: 'string', width: '80px', unbound: true, ntsControl: 'DeleteButton' }
                            ], 
                            features: [{ name: 'Resizing',
                                            columnSettings: [{
                                                columnKey: 'id', allowResizing: true, minimumWidth: 30
                                            }, {
                                                columnKey: 'flag', allowResizing: false 
                                            }] 
                                        },
                                        { 
                                            name: 'Selection',
                                            mode: 'row',
                                            multipleSelection: true
                                        }
                            ],
                            ntsFeatures: [
//                                { name: 'CopyPaste' },
                                { name: 'CellState',
                                    rowId: 'rowId',
                                    columnKey: 'columnKey',
                                    state: 'state',
                                    states: statesTable
                                }
                                ],
                            ntsControls: [{ name: 'Checkbox', options: { value: 1, text: 'Custom Check' }, optionsValue: 'value', optionsText: 'text', controlType: 'CheckBox', enable: true },
                                            { name: 'SwitchButtons', options: [{ value: '1', text: 'Option 1' }, { value: '2', text: 'Option 2' }, { value: '3', text: 'Option 3' }], 
                                                optionsValue: 'value', optionsText: 'text', controlType: 'SwitchButtons', enable: true,
                                                distinction: { "503": ['1', '2'], "506": ["2", "3"], "600": ["1", "2"] }},
                                            { name: 'Combobox', options: comboItems, optionsValue: 'code', optionsText: 'name', columns: comboColumns, controlType: 'ComboBox', enable: true },
                                            { name: 'Button', text: 'Open', click: function() { alert("Button!!"); }, controlType: 'Button' },
                                            { name: 'DeleteButton', text: 'Delete', controlType: 'DeleteButton', enable: true }]
                            });
                
                $("#grid2").ntsGrid({ 
                            width: '970px',
                            height: '400px',
                            dataSource: this.items,
                            primaryKey: 'id',
                            virtualization: true,
                            virtualizationMode: 'continuous',
//                            enter: 'right',
                            columns: [
                            { headerText: 'Button', key: 'open', dataType: 'string', width: '80px', unbound: true, ntsControl: 'Button' },
                                { headerText: 'ID', key: 'id', dataType: 'number', width: '50px', ntsControl: 'Label' },
                                { headerText: 'FLAG', key: 'flag', dataType: 'boolean', width: '200px', showHeaderCheckbox: true, ntsControl: 'Checkbox',
                                    hiddenRows: [ 1, 3, 4, 9 ] },
                                { headerText: 'RULECODE', key: 'ruleCode', dataType: 'string', width: '290px', ntsControl: 'SwitchButtons' },
                                { headerText: 'Combobox', key: 'combo', dataType: 'string', width: '230px', ntsControl: 'Combobox', tabIndex: 0 },
                                { headerText: 'Text', key: 'text1', dataType: 'string', width: '120px' },
                                
                                { headerText: 'Delete', key: 'delete', dataType: 'string', width: '80px', unbound: true, ntsControl: 'DeleteButton' }
                            ], 
                            features: [{ name: 'Resizing' },
                                        { 
                                            name: 'Selection',
                                            mode: 'row',
                                            multipleSelection: true
                                        }
                            ],
//                            ntsFeatures: [{ name: 'CopyPaste' }],
                            ntsControls: [{ name: 'Checkbox', options: { value: 1, text: 'Custom Check' }, optionsValue: 'value', optionsText: 'text', controlType: 'CheckBox', enable: true },
                                            { name: 'SwitchButtons', options: [{ value: '1', text: 'Option 1' }, { value: '2', text: 'Option 2' }, { value: '3', text: 'Option 3' }], 
                                                optionsValue: 'value', optionsText: 'text', controlType: 'SwitchButtons', enable: true },
                                            { name: 'Combobox', options: comboItems, optionsValue: 'code', optionsText: 'name', columns: comboColumns, controlType: 'ComboBox', enable: true },
                                            { name: 'Button', text: 'Open', click: function() { alert("Button!!"); }, controlType: 'Button' },
                                            { name: 'DeleteButton', text: 'Delete', controlType: 'DeleteButton', enable: true }]
                            });
                $("#grid2").setupSearchScroll("igGrid", true);
                $("#run").on("click", function() {
                    var source = $("#grid2").igGrid("option", "dataSource");
                    alert(source[1].flag);
                });
                $("#update-row").on("click", function() {
                    $("#grid2").ntsGrid("updateRow", 0, { flag: false, ruleCode: '2', combo: '3' });
                });
                $("#enable-ctrl").on("click", function() {
                    $("#grid2").ntsGrid("enableNtsControlAt", 1, "combo", "ComboBox");
                });
                $("#disable-ctrl").on("click", function() {
                    $("#grid2").ntsGrid("disableNtsControlAt", 1, "combo", "ComboBox");
                });
                $("#disable-all").on("click", function() {
                    $("#grid2").ntsGrid("disableNtsControls", "ruleCode", "SwitchButtons");
                });
                $("#enable-all").on("click", function() {
                    $("#grid2").ntsGrid("enableNtsControls", "ruleCode", "SwitchButtons");
                });
            }
        }
        
        var model = new ScreenModel();
        this.bind(model);
    });
}