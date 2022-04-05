module nts.uk.com.view.ccg013.k.viewmodel {
    
    export class ScreenModel {
        //combobox
        itemList: KnockoutObservableArray<ItemModel>;
        selectedCode: KnockoutObservable<number>;
        isEnable: KnockoutObservable<boolean>;
        //list
        listStandardMenu: KnockoutObservableArray<StandardMenu>;
        list: KnockoutObservableArray<StandardMenu>;
        columns: Array<any>;
        currentCode: KnockoutObservable<any>;
        id: KnockoutObservable<number>;
        constructor() {
            var self = this;
            self.id = ko.observable(null);
            //combobox
            self.itemList = ko.observableArray([]);
            self.selectedCode = ko.observable(0);
            self.isEnable = ko.observable(true);

            // list
            self.listStandardMenu = ko.observableArray([]);
            self.list = ko.observableArray([]);
            self.columns = [
                {headerText:'id', key: 'id', width: 20, hidden: true},
                { headerText: nts.uk.resource.getText("CCG013_51"), key: 'code', width: 80, hidden: true },
                { 
                    headerText: nts.uk.resource.getText("CCG013_51"),
                    key: 'displayOrder',
                    width: 80,
                    template: '<div style="text-align: right">${displayOrder}</div>',
                },
                { headerText: nts.uk.resource.getText("CCG013_52"), key: 'targetItems', width: 150 },
                {
                    headerText: nts.uk.resource.getText("CCG013_53"), key: 'displayName', formatter: _.escape, width: 150
                    //template: "<input class=\"displayName-input\" type=\"text\" value=\"${displayName}\" />"
                }
            ];
            self.currentCode = ko.observable();
            self.selectedCode.subscribe((value) => {
                self.getListStandardMenu(value);
                $("#grid").igGrid("option", "dataSource", self.list()); 
            });
        }

        /** get data number "value" in list **/
        getListStandardMenu(value: any) {
            let self = this;
            self.id(0);
            self.list([]);
            for (let i = 0; i < self.listStandardMenu().length; i++) {
                if (self.listStandardMenu()[i].webMenuSetting !== WebMenuSetting.Display
                    || self.listStandardMenu()[i].classification === Menu_Cls.TopPage
                    || self.listStandardMenu()[i].classification === Menu_Cls.OfficeHelper
                ) {
                    continue;
                }
                if (value === 5) {
                    self.list.push(new StandardMenu(i + 1, self.id(),self.listStandardMenu()[i].order, self.listStandardMenu()[i].code, self.listStandardMenu()[i].targetItems, self.listStandardMenu()[i].displayName, self.listStandardMenu()[i].system, self.listStandardMenu()[i].classification, self.listStandardMenu()[i].displayOrder, self.listStandardMenu()[i].webMenuSetting));
                    self.id(self.id()+1);
                } else if (self.listStandardMenu()[i].system == value){
                    self.list.push(new StandardMenu(i + 1, self.id(),self.listStandardMenu()[i].order, self.listStandardMenu()[i].code, self.listStandardMenu()[i].targetItems, self.listStandardMenu()[i].displayName, self.listStandardMenu()[i].system, self.listStandardMenu()[i].classification, self.listStandardMenu()[i].displayOrder, self.listStandardMenu()[i].webMenuSetting));
                    self.id(self.id()+1);
                }
            }
            const listOrder = _.orderBy(self.list(), ['system', 'displayOrder', 'code'], ['asc', 'asc', 'asc']);
            const list001 = _.forEach(listOrder, (item, index) => {
                item.index = index + 1;
            })
            self.list(list001);
        }

        /** get data when start dialog **/
        startPage(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
            $.when(self.getAllStandardMenu(), self.getSystemEnum()).done(function(){
                self.selectedCode(5);
                dfd.resolve();   
            }).fail(function() {
                dfd.reject();    
            });
            return dfd.promise();
        }  
        
         /** get data when start dialog **/
        getAllStandardMenu(): JQueryPromise<any> {
            let self = this;
            self.id(0);
            let dfd = $.Deferred();
            // Get List StandrdMenu
            service.getAllStandardMenu().done(function(listStandardMenu: Array<viewmodel.StandardMenu>) {
                listStandardMenu = _.orderBy(listStandardMenu, ["code"], ["asc"]);
                _.each(listStandardMenu, function(obj: viewmodel.StandardMenu, index) {
                    self.listStandardMenu.push(new StandardMenu(index + 1, self.id(), obj.order, obj.code, obj.targetItems, obj.displayName, obj.system, obj.classification, obj.displayOrder, obj.webMenuSetting));
                    self.id(self.id()+1);
                });
                
                self.initGrid();
                dfd.resolve();
            }).fail(function(error) {
                dfd.reject();
                alert(error.message);
            });
            return dfd.promise();
        }  
        
        getSystemEnum(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
           
            /** Get EditMenuBar*/
            service.getEditMenuBar().done(function(editMenuBar: any) {
                var newItemList = [];
                newItemList.push(new ItemModel(5, nts.uk.resource.getText("CCG013_137")));
                _.forEach(editMenuBar.listSystem, function(item) {
                   newItemList.push(new ItemModel(item.value, item.localizedName));
                });
                self.itemList(newItemList.filter(x => x.code !== System.OFFICE_HELPER));
                dfd.resolve();
            }).fail(function(error) {
                dfd.reject();
                alert(error.message);
            });
            return dfd.promise();
        }
        
        /** update data when click button register **/
        register() {
            let self = this;  
            self.id(0);
            nts.uk.ui.errors.clearAll();
            
            if ($("#grid").igGridUpdating('isEditing')) {
                $("#grid").igGridUpdating('endEdit', true, true);    
            }
            
            let a: Array<any> = $("#grid").igGrid("option", "dataSource");
            _.forEach(a, function(item) {
                 var data = {
                    name: '#[CCG013_53]',
                    value: item.displayName,
                    required: true,  
                    constraint: 'MenuDisplayName'    
                };
                
                var cell = $("#grid").igGrid("cellById", item.id, "displayName");

                validateInput($(cell), data);
            }); 
                   
            if (nts.uk.ui.errors.hasError()) {
                return;    
            }
            
            _.defer(() => {
                if (!nts.uk.ui.errors.hasError() ) {
                    nts.uk.ui.block.grayout();
                    service.updateStandardMenu(a).done(function() {
                        service.getAllStandardMenu().done(function(lst) {
                            self.listStandardMenu(lst);
                            nts.uk.ui.dialog.info({ messageId: "Msg_15" });
                            self.getListStandardMenu(self.selectedCode());
                            $("#grid").igGrid("option", "dataSource", self.list());
                            if ($("#search").find('input.ntsSearchBox').val()) {
                                $("button.search-btn").trigger("click");
                            }
                            self.closeDialog();
                        });                       
//                        _.remove(self.listStandardMenu(), function(item){                              
//                            return item.system == parseInt(self.selectedCode());                         
//                        });                         
//                         for(let i = 0; i < a.length; i++)  {   
//                            self.listStandardMenu().push(new StandardMenu(self.id(self.id()+1), a[i].code, a[i].targetItems, a[i].displayName, a[i].system, a[i].classification));  
//                         }

                    }).fail(function(error) {
                        nts.uk.ui.dialog.alertError(error.message);
//                        self.getListStandardMenu(self.selectedCode());
                    }).always(() => {
                        nts.uk.ui.block.clear();
                    });
                }
            });

        }    

        /** close Dialog **/
        closeDialog() {   
            nts.uk.ui.windows.close(); 
        }
        
        /**
         * Init grid
         */
        initGrid(): void {
            var self = this;
            $("#grid").igGrid({
                primaryKey: "id",
                columns: self.columns,
                dataSource: self.list(),
                features: [
                {
                    name: 'Selection',
                    mode: 'row',
                    multipleSelection: true,
                    activation: false       
                },
                {
                    name: "Updating",
                    enableAddRow: false,
                    editMode: "cell",
                    autoCommit: true,
                    enableDeleteRow: false,
                    virtualization: true,
                    virtualizationMode: 'continuous',
                    columnSettings: [
                        { columnKey: "displayName", editorType: "text", editorOptions: { type: "text", disabled: false} },
                        { columnKey: "code", editorOptions: { disabled: true} },
                        { columnKey: "targetItems", editorOptions: { disabled: true} },
                    ],
                    editCellEnded: function(evt, ui){ 
                        let dataSource: Array<any> = $("#grid").igGrid("option", "dataSource");
                        if (dataSource && dataSource.length > 0) {
                            let row = _.find(dataSource, function(item:StandardMenu) {
                               return ui.rowID == item.id;     
                            });
                            if (row) {
                                row.displayName = ui.value;
                            }  
                            $("#grid").igGrid("option", "dataSource", dataSource);
                        } 
                    }
                }]
            });   
            
            $("#grid").closest('.ui-iggrid').addClass('nts-gridlist');
            $("#grid").setupSearchScroll("igGrid", true);
        }
    }

    class ItemModel {
        code: number;
        name: string;
        constructor(code: number, name: string) {
            this.code = code;
            this.name = name;
        }
    }

    enum Menu_Cls {
        Standard = 0,
        OptionalItemApplication = 1,
        MobilePhone = 2,
        Tablet = 3,
        CodeName = 4,
        GroupCompanyMenu = 5,
        Customize = 6,
        OfficeHelper = 7,
        TopPage = 8,
        SmartPhone = 9
    }

    enum WebMenuSetting {
        Notdisplay = 0,
        Display = 1
    }

    enum System {
        COMMON = 0,
        TIME_SHEET = 1,
        OFFICE_HELPER = 2,
        KYUYOU = 3,
        JINJIROU= 4,
        ALL = 5
    }

    export class StandardMenu {
        index: number;
        id: number;
        code: string;
        targetItems: string;
        displayName: string;
        system: number;
        classification: number;
        order:number;
        displayOrder: number;
        webMenuSetting: number
        constructor(index: number, id: number, order: number, code: string, targetItems: string, displayName: string, system: number, classification: number, displayOrder: number, webMenuSetting: number) {
            this.index = index;
            this.id = id;
            this.order = order;
            this.code = code;
            this.targetItems = targetItems;
            this.displayName = displayName;
            this.system = system;
            this.classification = classification;
            this.displayOrder = displayOrder;
            this.webMenuSetting = webMenuSetting;
        }
    }
}


/**
 * Validate input display name
 */
function validateInput($input: JQuery, data: any) {
    var value: (newText: string) => {} = data.value;
    var immediate: boolean = ko.unwrap(data.immediate !== undefined ? data.immediate : 'false');
    var valueUpdate: string = (immediate === true) ? 'input' : 'change';
    var valueUpdate: string = (immediate === true) ? 'input' : 'change';
    var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
    var constraint = nts.uk.ui.validation.getConstraint(constraintName);   
 
    var newText = data.value;
    let validator = getValidator(data);
    var result = validator.validate(newText);
    if (result.isValid) {
        $input.ntsError('clear');
        $input.removeAttr("style");
        //value(result.parsedValue);
        new nts.uk.util.value.DefaultValue().onReset($input, data.value);
        return true;
    } else {
        let error = $input.ntsError('getError');
        if (nts.uk.util.isNullOrEmpty(error) || error.messageText !== result.errorMessage) {
            $input.ntsError('clear');
            $input.ntsError('set', result.errorMessage, result.errorCode);
            $input.attr("style", "border-color: red !important;");
        }
        
        new nts.uk.util.value.DefaultValue().onReset($input, data.value);
        //value(newText);
        return false;
    }
}

function getValidator(data: any): nts.uk.ui.validation.IValidator {
    var name: string = data.name !== undefined ? ko.unwrap(data.name) : "";
    name = nts.uk.resource.getControlName(name);
    var required: boolean = (data.required !== undefined) ? ko.unwrap(data.required) : false;
    var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
    return new nts.uk.ui.validation.StringValidator(name, constraintName, { required: required });
}
