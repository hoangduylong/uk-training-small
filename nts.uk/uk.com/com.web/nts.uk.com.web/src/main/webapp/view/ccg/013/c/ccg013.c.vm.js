var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
                    var c;
                    (function (c_1) {
                        var viewmodel;
                        (function (viewmodel) {
                            var randomId = nts.uk.util.randomId;
                            var ScreenModel = /** @class */ (function (_super) {
                                __extends(ScreenModel, _super);
                                function ScreenModel() {
                                    var _this = _super.call(this) || this;
                                    var self = _this;
                                    self.nameTitleBar = ko.observable("");
                                    self.titleBar = ko.observable(null);
                                    //color picker
                                    self.letterColor = ko.observable('#FFFFFF');
                                    self.backgroundColor = ko.observable('#FF9900');
                                    self.systemList = ko.observableArray([]);
                                    self.systemName = ko.observable('');
                                    self.currentSystemCode = ko.observable(0);
                                    self.selectedSystemCode = ko.observable(0);
                                    self.allItems = ko.observableArray([]);
                                    self.items = ko.observableArray([]);
                                    self.newItems = ko.observableArray([]);
                                    self.tempItems = ko.observableArray([]);
                                    self.dataItems = ko.observableArray([]);
                                    self.singleSelectedCode = ko.observable(null);
                                    self.singleSelectedNewCode = ko.observable(null);
                                    self.selectedCodes = ko.observableArray([]);
                                    self.selectedNewCodes = ko.observableArray([]);
                                    _this.currentCode = ko.observable();
                                    _this.currentCodeList = ko.observableArray([]);
                                    _this.newCurrentCodeList = ko.observableArray([]);
                                    self.titleMenuId = ko.observable();
                                    self.getData = false;
                                    self.columns = ko.observableArray([
                                        {
                                            headerText: nts.uk.resource.getText("CCG013_49"),
                                            prop: 'displayOrder',
                                            key: 'displayOrder',
                                            width: 55,
                                            formatter: _.escape,
                                            template: '<div style="text-align: right">${displayOrder}</div>',
                                        },
                                        { headerText: nts.uk.resource.getText("CCG013_49"), prop: 'code', key: 'code', width: 0, formatter: _.escape, hidden: true },
                                        { headerText: nts.uk.resource.getText("CCG013_50"), prop: 'name', key: 'name', width: 167, formatter: _.escape },
                                        { headerText: 'pk', prop: 'primaryKey', key: 'primaryKey', width: 0, hidden: true }
                                    ]);
                                    self.newColumns = ko.observableArray([
                                        {
                                            headerText: nts.uk.resource.getText("CCG013_51"),
                                            prop: 'displayOrder',
                                            width: 55,
                                            formatter: _.escape,
                                            template: '<div style="text-align: right">${displayOrder}</div>',
                                        },
                                        { headerText: nts.uk.resource.getText("CCG013_51"), prop: 'code', width: 0, formatter: _.escape, hidden: true },
                                        { headerText: nts.uk.resource.getText("CCG013_52"), prop: 'targetItem', width: 160, formatter: _.escape },
                                        { headerText: nts.uk.resource.getText("CCG013_53"), prop: 'name', width: 160, formatter: _.escape },
                                        { headerText: 'pk', prop: 'primaryKey', key: 'primaryKey', width: 0, hidden: true }
                                    ]);
                                    self.disableSwap = ko.observable(false);
                                    self.allItems = ko.observableArray([]);
                                    self.items = ko.observableArray([]);
                                    self.newItems = ko.observableArray([]);
                                    self.tempItems = ko.observableArray([]);
                                    self.dataItems = ko.observableArray([]);
                                    //Get data by system
                                    self.selectedSystemCode.subscribe(function (newValue) {
                                        self.findBySystem(Number(newValue));
                                    });
                                    self.disableSwap = ko.observable(false);
                                    return _this;
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var titleBar = nts.uk.ui.windows.getShared("titleBar");
                                    if (titleBar) {
                                        self.titleBar(titleBar);
                                        self.letterColor(titleBar.textColor);
                                        self.backgroundColor(titleBar.backgroundColor);
                                        self.nameTitleBar(titleBar.name);
                                        if (!titleBar.name) {
                                            self.getData = true;
                                        }
                                    }
                                    var titleMenuId = nts.uk.ui.windows.getShared("titleMenuId");
                                    if (titleMenuId) {
                                        self.titleMenuId(titleMenuId);
                                    }
                                    $.when(self.findAllDisplay(), self.getSystemEnum()).done(function () {
                                        var newData = [];
                                        self.selectedSystemCode(5);
                                        if (titleBar.treeMenus) {
                                            _.forEach(titleBar.treeMenus, function (item, index) {
                                                var standardMenu = _.find(self.allItems(), function (standardMenuItem) {
                                                    return standardMenuItem.code == item.code && standardMenuItem.system == item.system && standardMenuItem.menu_cls == item.classification;
                                                });
                                                if (standardMenu) {
                                                    var primaryKey = nts.uk.util.randomId();
                                                    var data = new ItemModel(index + 1, primaryKey, standardMenu.code, standardMenu.targetItem, standardMenu.name, index + 1, standardMenu.menu_cls, standardMenu.system, standardMenu.displayOrder, item.webMenuSetting, item.menu_cls);
                                                    newData.push(data);
                                                    self.tempItems.push(data);
                                                }
                                            });
                                            self.newItems(_.orderBy(newData, ['order'], ['asc']));
                                        }
                                        self.disableSwapButton();
                                        dfd.resolve();
                                    }).fail(function () {
                                        dfd.reject();
                                    });
                                    $('.left-contents')
                                        .on('click', '.search-btn', function () {
                                        var $grid = $('#multi-list1');
                                        // Lay danh sach cac item duoc bind vao grid
                                        var items = $grid.igGrid('option', 'dataSource');
                                        // neu co item
                                        if (items && items.length) {
                                            // lay ra item dau tien
                                            var first = items[0];
                                            // neu ton tai item dau tien
                                            if (first) {
                                                // lay ra khoa chinh
                                                var primaryKey = first.primaryKey;
                                                if (primaryKey) {
                                                    // gan khoa chinh vao danh sach selected
                                                    self.currentCodeList([primaryKey]);
                                                }
                                            }
                                        }
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Disable swap button when right contents does not have any items
                                 */
                                ScreenModel.prototype.disableSwapButton = function () {
                                    var self = this;
                                    if (self.newItems().length === 0) {
                                        self.disableSwap(false);
                                    }
                                    else {
                                        self.disableSwap(true);
                                    }
                                };
                                /**
                                 * Get data by system id from db
                                 */
                                ScreenModel.prototype.findAllDisplay = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    c_1.service.findBySystem().done(function (data, idx) {
                                        var list001 = [];
                                        var index = 0;
                                        _.forEach(data, function (item) {
                                            var id = nts.uk.util.randomId();
                                            self.allItems.push(new ItemModel(idx + 1, id, item.code, item.targetItems, item.displayName, index, item.classification, item.system, item.displayOrder, item.webMenuSetting, item.menu_cls));
                                            if (item.system == self.selectedSystemCode()) {
                                                list001.push(new ItemModel(idx + 1, id, item.code, item.targetItems, item.displayName, index, item.classification, item.system, item.displayOrder, item.webMenuSetting, item.menu_cls));
                                            }
                                        });
                                        var newData = _.orderBy(list001, ['system', 'displayOrder', 'code'], ['asc', 'asc', 'asc']);
                                        self.items(newData);
                                        dfd.resolve(data);
                                    }).fail(function (res) {
                                        dfd.reject(res);
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.getSystemEnum = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    /** Get EditMenuBar*/
                                    c_1.service.getEditMenuBar().done(function (editMenuBar) {
                                        self.systemList.push(new SystemModel(5, nts.uk.resource.getText("CCG013_137")));
                                        _.forEach(editMenuBar.listSystem, function (item) {
                                            self.systemList.push(new SystemModel(item.value, item.localizedName));
                                        });
                                        self.systemList(self.systemList().filter(function (x) { return x.systemCode !== System.OFFICE_HELPER; }));
                                        dfd.resolve();
                                    }).fail(function (error) {
                                        dfd.reject();
                                        alert(error.message);
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.findBySystem = function (system) {
                                    var self = this;
                                    var list001 = [];
                                    var allItemsClone = _.orderBy(self.allItems(), ['system', 'displayOrder', 'code'], ['asc', 'asc', 'asc']);
                                    var list002 = _.chain(allItemsClone)
                                        .filter(function (item) {
                                        return item.system === System.COMMON &&
                                            item.menu_cls === Menu_Cls.TopPage &&
                                            item.webMenuSetting === WebMenuSetting.Display;
                                    })
                                        .value();
                                    if (self.selectedSystemCode() === System.ALL) {
                                        list001 = _.chain(allItemsClone)
                                            .filter(function (item) {
                                            return item.menu_cls !== Menu_Cls.TopPage &&
                                                item.menu_cls !== Menu_Cls.OfficeHelper &&
                                                item.webMenuSetting === WebMenuSetting.Display;
                                        })
                                            .map(function (item) { return new ItemModel(list001.length, nts.uk.util.randomId(), item.code, item.targetItem, item.name, list001.length, item.menu_cls, item.system, item.displayOrder, item.webMenuSetting, item.menu_cls); })
                                            .value();
                                    }
                                    else {
                                        list001 = _.chain(allItemsClone)
                                            .filter(function (item) {
                                            return item.system === system &&
                                                item.menu_cls !== Menu_Cls.TopPage &&
                                                item.menu_cls !== Menu_Cls.OfficeHelper &&
                                                item.webMenuSetting === WebMenuSetting.Display;
                                        })
                                            .map(function (item) { return new ItemModel(list001.length, nts.uk.util.randomId(), item.code, item.targetItem, item.name, list001.length, item.menu_cls, item.system, item.displayOrder, item.webMenuSetting, item.menu_cls); })
                                            .value();
                                    }
                                    var listStandardMenu = _.concat(list001, list002);
                                    self.items(listStandardMenu);
                                };
                                /**
                                 * Add items selected from left grid list to right grid list
                                 */
                                ScreenModel.prototype.add = function () {
                                    var self = this;
                                    _.forEach(self.currentCodeList(), function (selected) {
                                        if (_.indexOf(_.map(self.newItems(), 'primaryKey'), selected) == -1) {
                                            var item = _.find(self.items(), function (c) { return c.primaryKey == selected; });
                                            item.order = self.newItems().length + 1;
                                            self.newItems.push(new ItemModel(item.order, nts.uk.util.randomId(), item.code, item.targetItem, item.name, item.order, item.menu_cls, item.system, item.displayOrder, item.webMenuSetting, item.menu_cls));
                                        }
                                    });
                                    _.forEach(self.newItems(), function (x, index) {
                                        x.index = index + 1;
                                        x.order = index;
                                    });
                                    self.newItems(_.orderBy(self.newItems(), ['order'], ['asc']));
                                    self.currentCodeList([]);
                                    self.disableSwapButton();
                                };
                                /**
                                 * Remove items selected in right grid list
                                 */
                                ScreenModel.prototype.remove = function () {
                                    var self = this;
                                    var newItems = self.newItems();
                                    var items = [];
                                    _.remove(newItems, function (currentObject) {
                                        return _.indexOf(self.newCurrentCodeList(), currentObject.primaryKey) !== -1;
                                    });
                                    self.newItems([]);
                                    _.forEach(newItems, function (item) {
                                        item.order = self.newItems().length + 1;
                                        self.newItems.push(item);
                                    });
                                    self.newItems(_.orderBy(self.newItems(), ['order'], ['asc']));
                                    _.forEach(self.newItems(), function (x, index) {
                                        x.index = index + 1;
                                    });
                                    self.newCurrentCodeList([]);
                                    self.disableSwapButton();
                                };
                                /**
                                 * Pass data to main screen
                                 * Close the popup
                                 */
                                ScreenModel.prototype.submit = function () {
                                    var vm = this;
                                    var index = 1;
                                    vm.$validate().then(function (valid) {
                                        if (!valid) {
                                            return;
                                        }
                                        _.each(vm.newItems(), function (item) {
                                            item.order = index;
                                            item.displayOrder = index;
                                            index++;
                                        });
                                        if (vm.titleMenuId()) {
                                            nts.uk.ui.windows.setShared("CCG013C_TEXT_COLOR", vm.letterColor());
                                            nts.uk.ui.windows.setShared("CCG013C_BACKGROUND_COLOR", vm.backgroundColor());
                                            nts.uk.ui.windows.setShared("CCG013C_TITLE_MENU_NAME", vm.nameTitleBar());
                                        }
                                        else {
                                            var titleBar = new TitleBar(vm.nameTitleBar(), vm.letterColor(), vm.backgroundColor(), vm.newItems());
                                            nts.uk.ui.windows.setShared("CCG013C_TitleBar", titleBar);
                                        }
                                        nts.uk.ui.windows.setShared("CCG013C_MENUS", vm.newItems());
                                        nts.uk.ui.windows.close();
                                    });
                                };
                                /**
                                 * Click on button d1_26
                                 * Close the popup
                                 */
                                ScreenModel.prototype.closeDialog = function () {
                                    var self = this;
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.removeTitleBar = function () {
                                    var self = this;
                                    nts.uk.ui.windows.setShared("CCG013C_MENUS_ID", self.titleMenuId());
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }(ko.ViewModel));
                            viewmodel.ScreenModel = ScreenModel;
                            var TitleBar = /** @class */ (function () {
                                function TitleBar(nameTitleBar, letterColor, backgroundColor, treeMenu) {
                                    this.nameTitleBar = nameTitleBar;
                                    this.letterColor = letterColor;
                                    this.backgroundColor = backgroundColor;
                                    this.treeMenu = treeMenu;
                                }
                                return TitleBar;
                            }());
                            viewmodel.TitleBar = TitleBar;
                            var ItemModel = /** @class */ (function () {
                                function ItemModel(index, id, code, targetItem, name, order, menu_cls, system, displayOrder, webMenuSetting, classification) {
                                    this.index = index;
                                    this.primaryKey = id;
                                    this.code = code;
                                    this.targetItem = targetItem;
                                    this.name = name;
                                    this.order = order;
                                    this.menu_cls = menu_cls;
                                    this.system = system;
                                    this.displayOrder = displayOrder;
                                    this.webMenuSetting = webMenuSetting;
                                    this.classification = classification;
                                }
                                return ItemModel;
                            }());
                            viewmodel.ItemModel = ItemModel;
                            var SystemModel = /** @class */ (function () {
                                function SystemModel(systemCode, systemName) {
                                    this.systemCode = systemCode;
                                    this.systemName = systemName;
                                }
                                return SystemModel;
                            }());
                            viewmodel.SystemModel = SystemModel;
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
                            var TitleMenu = /** @class */ (function () {
                                function TitleMenu(param) {
                                    this.menuBarId = ko.observable(param.menuBarId);
                                    this.titleMenuId = ko.observable(param.titleMenuId);
                                    this.titleMenuName = ko.observable(param.titleMenuName || '');
                                    this.backgroundColor = ko.observable(param.backgroundColor);
                                    this.imageFile = ko.observable(param.imageFile);
                                    this.textColor = ko.observable(param.textColor);
                                    this.titleMenuAtr = ko.observable(param.titleMenuAtr);
                                    this.titleMenuCode = ko.observable(param.titleMenuCode);
                                    this.displayOrder = ko.observable(param.displayOrder);
                                    this.treeMenu = ko.observableArray(_.orderBy(param.treeMenu, 'displayOrder', 'asc').map(function (x) {
                                        var name = _.find(param.menuNames, function (c) { return c.code == x.code && c.system == x.system && c.classification == x.classification; });
                                        x.name = name && name.displayName;
                                        return new TreeMenu(x);
                                    }));
                                    this.imageName = ko.observable(param.imageName);
                                    this.imageSize = ko.observable(param.imageSize);
                                }
                                return TitleMenu;
                            }());
                            viewmodel.TitleMenu = TitleMenu;
                            var TreeMenu = /** @class */ (function () {
                                function TreeMenu(param) {
                                    this.treeMenuId = ko.observable(randomId());
                                    this.titleMenuId = ko.observable(param.titleMenuId);
                                    this.code = ko.observable(param.code);
                                    this.name = ko.observable(param.name || '');
                                    this.displayOrder = ko.observable(param.displayOrder);
                                    this.classification = ko.observable(param.classification);
                                    this.system = ko.observable(param.system);
                                }
                                return TreeMenu;
                            }());
                            viewmodel.TreeMenu = TreeMenu;
                        })(viewmodel = c_1.viewmodel || (c_1.viewmodel = {}));
                    })(c = ccg013.c || (ccg013.c = {}));
                })(ccg013 = view.ccg013 || (view.ccg013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg013.c.vm.js.map