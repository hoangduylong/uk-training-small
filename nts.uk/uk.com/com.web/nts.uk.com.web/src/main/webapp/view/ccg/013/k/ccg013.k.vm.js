var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg013;
                (function (ccg013) {
                    var k;
                    (function (k) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
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
                                        { headerText: 'id', key: 'id', width: 20, hidden: true },
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
                                    self.selectedCode.subscribe(function (value) {
                                        self.getListStandardMenu(value);
                                        $("#grid").igGrid("option", "dataSource", self.list());
                                    });
                                }
                                /** get data number "value" in list **/
                                ScreenModel.prototype.getListStandardMenu = function (value) {
                                    var self = this;
                                    self.id(0);
                                    self.list([]);
                                    for (var i_1 = 0; i_1 < self.listStandardMenu().length; i_1++) {
                                        if (self.listStandardMenu()[i_1].webMenuSetting !== WebMenuSetting.Display
                                            || self.listStandardMenu()[i_1].classification === Menu_Cls.TopPage
                                            || self.listStandardMenu()[i_1].classification === Menu_Cls.OfficeHelper) {
                                            continue;
                                        }
                                        if (value === 5) {
                                            self.list.push(new StandardMenu(i_1 + 1, self.id(), self.listStandardMenu()[i_1].order, self.listStandardMenu()[i_1].code, self.listStandardMenu()[i_1].targetItems, self.listStandardMenu()[i_1].displayName, self.listStandardMenu()[i_1].system, self.listStandardMenu()[i_1].classification, self.listStandardMenu()[i_1].displayOrder, self.listStandardMenu()[i_1].webMenuSetting));
                                            self.id(self.id() + 1);
                                        }
                                        else if (self.listStandardMenu()[i_1].system == value) {
                                            self.list.push(new StandardMenu(i_1 + 1, self.id(), self.listStandardMenu()[i_1].order, self.listStandardMenu()[i_1].code, self.listStandardMenu()[i_1].targetItems, self.listStandardMenu()[i_1].displayName, self.listStandardMenu()[i_1].system, self.listStandardMenu()[i_1].classification, self.listStandardMenu()[i_1].displayOrder, self.listStandardMenu()[i_1].webMenuSetting));
                                            self.id(self.id() + 1);
                                        }
                                    }
                                    var listOrder = _.orderBy(self.list(), ['system', 'displayOrder', 'code'], ['asc', 'asc', 'asc']);
                                    var list001 = _.forEach(listOrder, function (item, index) {
                                        item.index = index + 1;
                                    });
                                    self.list(list001);
                                };
                                /** get data when start dialog **/
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    $.when(self.getAllStandardMenu(), self.getSystemEnum()).done(function () {
                                        self.selectedCode(5);
                                        dfd.resolve();
                                    }).fail(function () {
                                        dfd.reject();
                                    });
                                    return dfd.promise();
                                };
                                /** get data when start dialog **/
                                ScreenModel.prototype.getAllStandardMenu = function () {
                                    var self = this;
                                    self.id(0);
                                    var dfd = $.Deferred();
                                    // Get List StandrdMenu
                                    k.service.getAllStandardMenu().done(function (listStandardMenu) {
                                        listStandardMenu = _.orderBy(listStandardMenu, ["code"], ["asc"]);
                                        _.each(listStandardMenu, function (obj, index) {
                                            self.listStandardMenu.push(new StandardMenu(index + 1, self.id(), obj.order, obj.code, obj.targetItems, obj.displayName, obj.system, obj.classification, obj.displayOrder, obj.webMenuSetting));
                                            self.id(self.id() + 1);
                                        });
                                        self.initGrid();
                                        dfd.resolve();
                                    }).fail(function (error) {
                                        dfd.reject();
                                        alert(error.message);
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.getSystemEnum = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    /** Get EditMenuBar*/
                                    k.service.getEditMenuBar().done(function (editMenuBar) {
                                        var newItemList = [];
                                        newItemList.push(new ItemModel(5, nts.uk.resource.getText("CCG013_137")));
                                        _.forEach(editMenuBar.listSystem, function (item) {
                                            newItemList.push(new ItemModel(item.value, item.localizedName));
                                        });
                                        self.itemList(newItemList.filter(function (x) { return x.code !== System.OFFICE_HELPER; }));
                                        dfd.resolve();
                                    }).fail(function (error) {
                                        dfd.reject();
                                        alert(error.message);
                                    });
                                    return dfd.promise();
                                };
                                /** update data when click button register **/
                                ScreenModel.prototype.register = function () {
                                    var self = this;
                                    self.id(0);
                                    nts.uk.ui.errors.clearAll();
                                    if ($("#grid").igGridUpdating('isEditing')) {
                                        $("#grid").igGridUpdating('endEdit', true, true);
                                    }
                                    var a = $("#grid").igGrid("option", "dataSource");
                                    _.forEach(a, function (item) {
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
                                    _.defer(function () {
                                        if (!nts.uk.ui.errors.hasError()) {
                                            nts.uk.ui.block.grayout();
                                            k.service.updateStandardMenu(a).done(function () {
                                                k.service.getAllStandardMenu().done(function (lst) {
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
                                            }).fail(function (error) {
                                                nts.uk.ui.dialog.alertError(error.message);
                                                //                        self.getListStandardMenu(self.selectedCode());
                                            }).always(function () {
                                                nts.uk.ui.block.clear();
                                            });
                                        }
                                    });
                                };
                                /** close Dialog **/
                                ScreenModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                /**
                                 * Init grid
                                 */
                                ScreenModel.prototype.initGrid = function () {
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
                                                    { columnKey: "displayName", editorType: "text", editorOptions: { type: "text", disabled: false } },
                                                    { columnKey: "code", editorOptions: { disabled: true } },
                                                    { columnKey: "targetItems", editorOptions: { disabled: true } },
                                                ],
                                                editCellEnded: function (evt, ui) {
                                                    var dataSource = $("#grid").igGrid("option", "dataSource");
                                                    if (dataSource && dataSource.length > 0) {
                                                        var row = _.find(dataSource, function (item) {
                                                            return ui.rowID == item.id;
                                                        });
                                                        if (row) {
                                                            row.displayName = ui.value;
                                                        }
                                                        $("#grid").igGrid("option", "dataSource", dataSource);
                                                    }
                                                }
                                            }
                                        ]
                                    });
                                    $("#grid").closest('.ui-iggrid').addClass('nts-gridlist');
                                    $("#grid").setupSearchScroll("igGrid", true);
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var ItemModel = /** @class */ (function () {
                                function ItemModel(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ItemModel;
                            }());
                            var Menu_Cls;
                            (function (Menu_Cls) {
                                Menu_Cls[Menu_Cls["Standard"] = 0] = "Standard";
                                Menu_Cls[Menu_Cls["OptionalItemApplication"] = 1] = "OptionalItemApplication";
                                Menu_Cls[Menu_Cls["MobilePhone"] = 2] = "MobilePhone";
                                Menu_Cls[Menu_Cls["Tablet"] = 3] = "Tablet";
                                Menu_Cls[Menu_Cls["CodeName"] = 4] = "CodeName";
                                Menu_Cls[Menu_Cls["GroupCompanyMenu"] = 5] = "GroupCompanyMenu";
                                Menu_Cls[Menu_Cls["Customize"] = 6] = "Customize";
                                Menu_Cls[Menu_Cls["OfficeHelper"] = 7] = "OfficeHelper";
                                Menu_Cls[Menu_Cls["TopPage"] = 8] = "TopPage";
                                Menu_Cls[Menu_Cls["SmartPhone"] = 9] = "SmartPhone";
                            })(Menu_Cls || (Menu_Cls = {}));
                            var WebMenuSetting;
                            (function (WebMenuSetting) {
                                WebMenuSetting[WebMenuSetting["Notdisplay"] = 0] = "Notdisplay";
                                WebMenuSetting[WebMenuSetting["Display"] = 1] = "Display";
                            })(WebMenuSetting || (WebMenuSetting = {}));
                            var System;
                            (function (System) {
                                System[System["COMMON"] = 0] = "COMMON";
                                System[System["TIME_SHEET"] = 1] = "TIME_SHEET";
                                System[System["OFFICE_HELPER"] = 2] = "OFFICE_HELPER";
                                System[System["KYUYOU"] = 3] = "KYUYOU";
                                System[System["JINJIROU"] = 4] = "JINJIROU";
                                System[System["ALL"] = 5] = "ALL";
                            })(System || (System = {}));
                            var StandardMenu = /** @class */ (function () {
                                function StandardMenu(index, id, order, code, targetItems, displayName, system, classification, displayOrder, webMenuSetting) {
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
                                return StandardMenu;
                            }());
                            viewmodel.StandardMenu = StandardMenu;
                        })(viewmodel = k.viewmodel || (k.viewmodel = {}));
                    })(k = ccg013.k || (ccg013.k = {}));
                })(ccg013 = view.ccg013 || (view.ccg013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
/**
 * Validate input display name
 */
function validateInput($input, data) {
    var value = data.value;
    var immediate = ko.unwrap(data.immediate !== undefined ? data.immediate : 'false');
    var valueUpdate = (immediate === true) ? 'input' : 'change';
    var valueUpdate = (immediate === true) ? 'input' : 'change';
    var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
    var constraint = nts.uk.ui.validation.getConstraint(constraintName);
    var newText = data.value;
    var validator = getValidator(data);
    var result = validator.validate(newText);
    if (result.isValid) {
        $input.ntsError('clear');
        $input.removeAttr("style");
        //value(result.parsedValue);
        new nts.uk.util.value.DefaultValue().onReset($input, data.value);
        return true;
    }
    else {
        var error = $input.ntsError('getError');
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
function getValidator(data) {
    var name = data.name !== undefined ? ko.unwrap(data.name) : "";
    name = nts.uk.resource.getControlName(name);
    var required = (data.required !== undefined) ? ko.unwrap(data.required) : false;
    var constraintName = (data.constraint !== undefined) ? ko.unwrap(data.constraint) : "";
    return new nts.uk.ui.validation.StringValidator(name, constraintName, { required: required });
}
//# sourceMappingURL=ccg013.k.vm.js.map