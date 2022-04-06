var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var sys;
        (function (sys) {
            var view;
            (function (view) {
                var ccg013;
                (function (ccg013) {
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var windows = nts.uk.ui.windows;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.nameMenuBar = ko.observable("");
                                    //Combo box
                                    self.listSystemSelect = ko.observableArray([]);
                                    self.selectedCodeSystemSelect = ko.observable(null);
                                    //Radio button
                                    self.itemRadioAtcClass = ko.observableArray([]);
                                    self.selectedRadioAtcClass = ko.observable(0);
                                    //color picker
                                    self.letterColor = ko.observable('#FFFFFF');
                                    self.backgroundColor = ko.observable('#127D09');
                                    //GridList
                                    self.allPart = ko.observableArray([]);
                                    self.listStandardMenu = ko.observableArray([]);
                                    self.columns = ko.observableArray([
                                        { headerText: '', prop: 'code', key: 'code', width: '0px', hidden: true },
                                        { headerText: '', prop: 'uniqueCode', key: 'uniqueCode', width: '0px', hidden: true },
                                        {
                                            headerText: nts.uk.resource.getText("CCG013_26"),
                                            prop: 'displayOrder',
                                            key: 'displayOrder',
                                            width: '60px',
                                            template: '<div style="text-align: right">${displayOrder}</div>',
                                        },
                                        { headerText: nts.uk.resource.getText("CCG013_27"), prop: 'displayName', key: 'displayName', width: '240px' }
                                    ]);
                                    self.selectedStandardMenuKey = ko.observable('');
                                    //Follow SystemSelect
                                    self.selectedCodeSystemSelect.subscribe(function (value) { self.changeSystem(value); });
                                    self.selectedRadioAtcClass.subscribe(function (value) {
                                        if (value == 0) {
                                            self.selectedStandardMenuKey('');
                                        }
                                    });
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var data = windows.getShared("CCG013A_StandardMeNu");
                                    if (data) {
                                        self.nameMenuBar(data.nameMenuBar);
                                        self.letterColor(data.pickerLetter);
                                        self.backgroundColor(data.pickerBackground);
                                        self.selectedRadioAtcClass(data.radioActlass);
                                    }
                                    /** Get EditMenuBar*/
                                    b.service.getEditMenuBar().done(function (editMenuBar) {
                                        self.itemRadioAtcClass(editMenuBar.listSelectedAtr);
                                        var item1 = [];
                                        item1.push(new EnumConstant(5, nts.uk.resource.getText("CCG013_137"), nts.uk.resource.getText("CCG013_137")));
                                        _.forEach(editMenuBar.listSystem, function (x) {
                                            item1.push(x);
                                        });
                                        self.listSystemSelect(item1.filter(function (x) { return x.value !== System.OFFICE_HELPER; }));
                                        _.forEach(editMenuBar.listStandardMenu, function (item, index) {
                                            self.allPart.push(new MenuBarDto(index, item.afterLoginDisplay, item.classification, item.code, item.companyId, item.displayName, item.displayOrder, item.logSettingDisplay, item.menuAtr, item.system, item.targetItems, item.url, item.webMenuSetting));
                                        });
                                        self.selectedCodeSystemSelect(5);
                                        self.selectedRadioAtcClass(editMenuBar.listSelectedAtr[0].value);
                                        dfd.resolve();
                                    }).fail(function (error) {
                                        dfd.reject();
                                        alert(error.message);
                                    }).always(function () {
                                        $('#B1_3').focus();
                                    });
                                    $('.content-search')
                                        .on('click', '.search-btn', function () {
                                        var $grid = $('#multi-list');
                                        // Lay danh sach cac item duoc bind vao grid
                                        var items = $grid.igGrid('option', 'dataSource');
                                        // neu co item
                                        if (items && items.length) {
                                            // lay ra item dau tien
                                            var first = items[0];
                                            // neu ton tai item dau tien
                                            if (first) {
                                                // lay ra khoa chinh
                                                var uniqueCode = first.uniqueCode;
                                                if (uniqueCode) {
                                                    // gan khoa chinh vao danh sach selected
                                                    self.selectedStandardMenuKey(uniqueCode);
                                                }
                                            }
                                        }
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.cancel_Dialog = function () {
                                    nts.uk.ui.errors.clearAll();
                                    nts.uk.ui.windows.close();
                                };
                                ScreenModel.prototype.submit = function () {
                                    var self = this;
                                    $(".ntsColorPicker_Container").trigger("validate");
                                    var menuCls = null;
                                    var code = null;
                                    var name = null;
                                    validateNameInput($(".menu-bar-name"), '#[CCG013_18]', self.nameMenuBar().trim(), 'MenuBarName');
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    var standMenu = _.find(self.listStandardMenu(), function (item) {
                                        return item.uniqueCode == self.selectedStandardMenuKey();
                                    });
                                    if (standMenu) {
                                        menuCls = standMenu.classification;
                                        code = standMenu.code;
                                        name = self.nameMenuBar();
                                    }
                                    if (self.selectedRadioAtcClass() == 1) {
                                        if (self.selectedStandardMenuKey() !== '') {
                                            var menuBar = new MenuBar({
                                                code: code,
                                                nameMenuBar: name,
                                                letterColor: self.letterColor(),
                                                backgroundColor: self.backgroundColor(),
                                                selectedRadioAtcClass: self.selectedRadioAtcClass(),
                                                system: _.find(self.listStandardMenu(), { uniqueCode: self.selectedStandardMenuKey() }).system,
                                                menuCls: menuCls,
                                            });
                                            windows.setShared("CCG013B_MenuBar", menuBar);
                                            self.cancel_Dialog();
                                        }
                                        else {
                                            var textMsg218 = nts.uk.resource.getMessage("Msg_218", [nts.uk.resource.getText("CCG013_105")]);
                                            nts.uk.ui.dialog.alertError(textMsg218);
                                            return;
                                        }
                                    }
                                    else {
                                        var menuBar = new MenuBar({
                                            code: code,
                                            nameMenuBar: self.nameMenuBar(),
                                            letterColor: self.letterColor(),
                                            backgroundColor: self.backgroundColor(),
                                            selectedRadioAtcClass: self.selectedRadioAtcClass(),
                                            system: 0,
                                            menuCls: menuCls,
                                        });
                                        windows.setShared("CCG013B_MenuBar", menuBar);
                                        self.cancel_Dialog();
                                    }
                                };
                                /** Select by Index: Start & Delete case */
                                ScreenModel.prototype.selectStandardMenuByIndex = function (index) {
                                    var self = this;
                                    var selectStdMenuByIndex = _.nth(self.listStandardMenu(), index);
                                    if (selectStdMenuByIndex !== undefined)
                                        self.selectedStandardMenuKey(selectStdMenuByIndex.uniqueCode);
                                    else
                                        self.selectedStandardMenuKey(null);
                                };
                                ScreenModel.prototype.changeSystem = function (value) {
                                    var self = this;
                                    var newAllPart = _.orderBy(self.allPart(), ['system', 'displayOrder', 'code'], ['asc', 'asc', 'asc']);
                                    var list001 = [];
                                    var list002 = _.chain(newAllPart)
                                        .filter(function (item) {
                                        return item.system === System.COMMON &&
                                            item.classification === MenuClassification.TopPage;
                                    })
                                        .value();
                                    if (value === System.ALL) {
                                        list001 = _.chain(newAllPart)
                                            .filter(function (item) {
                                            return item.classification !== MenuClassification.TopPage &&
                                                item.classification !== MenuClassification.OfficeHelper;
                                        })
                                            .value();
                                    }
                                    else {
                                        list001 = _.chain(newAllPart)
                                            .filter(function (item) {
                                            return item.system === value &&
                                                item.classification !== MenuClassification.TopPage &&
                                                item.classification !== MenuClassification.OfficeHelper;
                                        })
                                            .value();
                                    }
                                    var listStandardMenu = _.concat(list001, list002);
                                    self.listStandardMenu(listStandardMenu);
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var MenuAtr;
                            (function (MenuAtr) {
                                MenuAtr[MenuAtr["Menu"] = 0] = "Menu";
                                MenuAtr[MenuAtr["SeparatorLine"] = 1] = "SeparatorLine";
                            })(MenuAtr || (MenuAtr = {}));
                            var WebMenuSetting;
                            (function (WebMenuSetting) {
                                WebMenuSetting[WebMenuSetting["Notdisplay"] = 0] = "Notdisplay";
                                WebMenuSetting[WebMenuSetting["Display"] = 1] = "Display";
                            })(WebMenuSetting || (WebMenuSetting = {}));
                            var MenuClassification;
                            (function (MenuClassification) {
                                MenuClassification[MenuClassification["Standard"] = 0] = "Standard";
                                MenuClassification[MenuClassification["OptionalItemApplication"] = 1] = "OptionalItemApplication";
                                MenuClassification[MenuClassification["MobilePhone"] = 2] = "MobilePhone";
                                MenuClassification[MenuClassification["Tablet"] = 3] = "Tablet";
                                MenuClassification[MenuClassification["CodeName"] = 4] = "CodeName";
                                MenuClassification[MenuClassification["GroupCompanyMenu"] = 5] = "GroupCompanyMenu";
                                MenuClassification[MenuClassification["Customize"] = 6] = "Customize";
                                MenuClassification[MenuClassification["OfficeHelper"] = 7] = "OfficeHelper";
                                MenuClassification[MenuClassification["TopPage"] = 8] = "TopPage";
                                MenuClassification[MenuClassification["SmartPhone"] = 9] = "SmartPhone";
                            })(MenuClassification || (MenuClassification = {}));
                            var System;
                            (function (System) {
                                System[System["COMMON"] = 0] = "COMMON";
                                System[System["TIME_SHEET"] = 1] = "TIME_SHEET";
                                System[System["OFFICE_HELPER"] = 2] = "OFFICE_HELPER";
                                System[System["KYUYOU"] = 3] = "KYUYOU";
                                System[System["JINJIROU"] = 4] = "JINJIROU";
                                System[System["ALL"] = 5] = "ALL";
                            })(System || (System = {}));
                            var MenuBar = /** @class */ (function () {
                                function MenuBar(param) {
                                    this.code = param.code;
                                    this.nameMenuBar = param.nameMenuBar;
                                    this.letterColor = param.letterColor;
                                    this.backgroundColor = param.backgroundColor;
                                    this.selectedRadioAtcClass = param.selectedRadioAtcClass;
                                    this.system = param.system;
                                    this.menuCls = param.menuCls;
                                    this.uniqueCode = this.code + this.system + this.menuCls;
                                }
                                return MenuBar;
                            }());
                            var MenuBarDto = /** @class */ (function () {
                                function MenuBarDto(index, afterLoginDisplay, classification, code, companyId, displayName, displayOrder, logSettingDisplay, menuAtr, system, targetItems, url, webMenuSetting) {
                                    this.index = index;
                                    this.afterLoginDisplay = afterLoginDisplay;
                                    this.classification = classification;
                                    this.code = code;
                                    this.companyId = companyId;
                                    this.displayName = displayName;
                                    this.displayOrder = displayOrder;
                                    this.logSettingDisplay = logSettingDisplay;
                                    this.menuAtr = menuAtr;
                                    this.system = system;
                                    this.targetItems = targetItems;
                                    this.url = url;
                                    this.webMenuSetting = webMenuSetting;
                                    this.uniqueCode = nts.uk.util.randomId();
                                }
                                return MenuBarDto;
                            }());
                            var EnumConstant = /** @class */ (function () {
                                function EnumConstant(value, fieldName, localizedName) {
                                    this.value = value;
                                    this.fieldName = fieldName;
                                    this.localizedName = localizedName;
                                }
                                return EnumConstant;
                            }());
                            viewmodel.EnumConstant = EnumConstant;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = ccg013.b || (ccg013.b = {}));
                })(ccg013 = view.ccg013 || (view.ccg013 = {}));
            })(view = sys.view || (sys.view = {}));
        })(sys = uk.sys || (uk.sys = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg013.b.vm.js.map