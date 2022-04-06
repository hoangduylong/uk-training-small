/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
var ccg013;
(function (ccg013) {
    var a;
    (function (a) {
        var viewmodel;
        (function (viewmodel) {
            var randomId = nts.uk.util.randomId;
            var modal = nts.uk.ui.windows.sub.modal;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var errors = nts.uk.ui.errors;
            var menuBarHTML = "<li class=\"context-menu-bar\" data-bind=\"attr: {'id': menuBarId}\">\n        <a class=\"tab-item\" data-bind=\"attr: {href: targetContent}\" style=\"background-color: #127D09;\">\n            <span class=\"tab-item-content limited-label\" data-bind=\"text: menuBarName\" style=\"color: #ffffff;\" />\n            <i data-bind=\"ntsIcon: { no: 5, width: 30, height: 30 }, click:function() { $parent.openIdialog(menuBarId()); }\"></i>\n        </a></li>";
            var treeMenuHTML = '<li class="context-menu-tree" data-bind="attr:{id: treeMenuId}"><span class="limited-label" data-bind="text: name"></span></li>';
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    this.widthTab = ko.observable('800px');
                    var self = this;
                    // WebMenu
                    self.listWebMenu = ko.observableArray([]);
                    self.webMenuColumns = ko.observableArray([
                        { headerText: nts.uk.resource.getText("CCG013_9"), key: 'webMenuCode', width: 50, formatter: _.escape },
                        { headerText: nts.uk.resource.getText("CCG013_10"), key: 'webMenuName', width: 50, formatter: _.escape }
                    ]);
                    self.currentWebMenu = ko.observable(new WebMenu({
                        webMenuCode: "",
                        webMenuName: "",
                        defaultMenu: 0,
                        menuBars: []
                    }));
                    self.currentWebMenuCode = ko.observable();
                    self.currentWebMenuCode.subscribe(function (newValue) {
                        var index = _.findIndex(self.listWebMenu(), function (item) {
                            return item.webMenuCode == newValue;
                        });
                        self.index(index);
                        a.service.findWebMenu(newValue).done(function (res) {
                            nts.uk.ui.errors.clearAll();
                            var webmenu = self.currentWebMenu();
                            if (!newValue) {
                                self.isCreated(true);
                                self.checkDisabled(true);
                                nts.uk.ui.errors.clearAll();
                            }
                            else {
                                self.isCreated(false);
                                self.checkDisabled(false);
                                $('#webMenuName').focus();
                            }
                            webmenu.webMenuCode(res.webMenuCode);
                            webmenu.webMenuName(res.webMenuName);
                            webmenu.defaultMenu(res.defaultMenu);
                            a.service.findStandardMenuList().done(function (menuNames) {
                                webmenu.menuBars.removeAll();
                                _.each(_.orderBy(res.menuBars, 'displayOrder', 'asc'), function (x) {
                                    x.menuNames = menuNames;
                                    webmenu.menuBars.push(new MenuBar(x));
                                });
                                self.initDisplay();
                                if (webmenu.menuBars().length > 0)
                                    self.currentMenuBar(webmenu.menuBars()[0]);
                            });
                        });
                    });
                    self.currentWebMenu().menuBars([]);
                    self.index = ko.observable(0);
                    // MenuBar
                    self.currentMenuBar = ko.observable(null);
                    // UI
                    self.isCreated = ko.observable(false);
                    self.isDefaultMenu = ko.observable(false);
                    self.checkDisabled = ko.observable(false);
                    $("#single-list tbody").find("td").addClass("text-align");
                }
                /** StartPage */
                ScreenModel.prototype.startPage = function () {
                    var self = this;
                    var dfd = $.Deferred();
                    self.getWebMenu().done(function () {
                        if (self.listWebMenu().length > 0) {
                            self.currentWebMenuCode(self.listWebMenu()[0].webMenuCode);
                        }
                        else {
                            self.cleanForm();
                            nts.uk.ui.errors.clearAll();
                        }
                        dfd.resolve();
                    });
                    return dfd.promise();
                };
                /** Registry Webmenu */
                ScreenModel.prototype.addWebMenu = function () {
                    $("#webMenuName").trigger("validate");
                    nts.uk.ui.block.invisible();
                    var self = this;
                    var webMenu = self.currentWebMenu();
                    var length = webMenu.webMenuCode().length;
                    var fullWebMenuCode = webMenu.webMenuCode();
                    if (length < 3) {
                        if (length == 1) {
                            webMenu.webMenuCode('00' + fullWebMenuCode);
                        }
                        else {
                            webMenu.webMenuCode('0' + fullWebMenuCode);
                        }
                    }
                    ;
                    (self.isDefaultMenu()) ? webMenu.defaultMenu(1) : webMenu.defaultMenu(0);
                    a.service.addWebMenu(self.isCreated(), ko.toJS(webMenu)).done(function () {
                        //                nts.uk.ui.dialog.info(nts.uk.resource.getMessage('Msg_15'));
                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                            self.isCreated(false);
                            self.getWebMenu().done(function () {
                                self.currentWebMenuCode(webMenu.webMenuCode());
                            });
                        });
                    }).fail(function (error) {
                        //                nts.uk.ui.dialog.alertError(error.message);
                        nts.uk.ui.dialog.info({ messageId: error.messageId }).then(function () {
                        });
                    }).always(function () {
                        nts.uk.ui.block.clear();
                    });
                };
                /** Remove web menu */
                ScreenModel.prototype.removeWebMenu = function () {
                    nts.uk.ui.block.invisible();
                    var self = this, webMenuCode = self.currentWebMenuCode();
                    if (self.currentWebMenu().defaultMenu()) {
                        nts.uk.ui.dialog.alertError({ messageId: "Msg_72" });
                    }
                    else {
                        nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                            a.service.deleteWebMenu(webMenuCode).done(function () {
                                nts.uk.ui.dialog.info(nts.uk.resource.getMessage('Msg_16')).then(function () {
                                    self.getWebMenu().done(function () {
                                        if (self.listWebMenu().length == 0) {
                                            self.cleanForm();
                                        }
                                        else if (self.index() == self.listWebMenu().length) {
                                            self.currentWebMenuCode(self.listWebMenu()[self.index() - 1].webMenuCode);
                                            $('#webMenuName').focus();
                                        }
                                        else {
                                            self.currentWebMenuCode(self.listWebMenu()[self.index()].webMenuCode);
                                            $('#webMenuName').focus();
                                        }
                                    });
                                });
                            }).fail(function (error) {
                                self.isCreated(false);
                                nts.uk.ui.dialog.alertError(error.message);
                            });
                        });
                    }
                    nts.uk.ui.block.clear();
                };
                /** Remove menu bar */
                ScreenModel.prototype.removeMenuBar = function (menuBarId) {
                    var self = this;
                    var menubarIndex = _.findIndex(self.currentWebMenu().menuBars(), function (item) {
                        return item.menuBarId() == menuBarId;
                    });
                    self.currentWebMenu().menuBars.remove(function (item) {
                        return item.menuBarId() == menuBarId;
                    });
                    if (self.currentMenuBar().menuBarId() == menuBarId) {
                        if (menubarIndex == self.currentWebMenu().menuBars().length) {
                            var id = self.currentWebMenu().menuBars()[menubarIndex - 1].menuBarId();
                            $("#menubar-tabs li#" + id + " a").trigger('click');
                        }
                        else {
                            var id = self.currentWebMenu().menuBars()[menubarIndex].menuBarId();
                            $("#menubar-tabs li#" + id + " a").trigger('click');
                        }
                    }
                    self.calculateMenuBarOrder();
                };
                /** Remove title bar */
                ScreenModel.prototype.removeTitleBar = function (titleMenuId) {
                    var self = this;
                    var titleMenu = [];
                    _.forEach(self.currentMenuBar().titleMenu(), function (item) {
                        titleMenu.push(item);
                    });
                    _.remove(titleMenu, function (item) {
                        return item.titleMenuId() == titleMenuId;
                    });
                    self.currentMenuBar().titleMenu.removeAll();
                    self.currentMenuBar().titleMenu(titleMenu);
                    self.calculateTitleMenuOrder();
                    self.setupMenuBar();
                };
                /** Remove TreeMenu */
                ScreenModel.prototype.removeTreeMenu = function (ui) {
                    var self = this;
                    var treeMenuId = ui.attr("id");
                    var titleMenuId = ui.closest(".title-menu-column").attr("id");
                    _.forEach(self.currentMenuBar().titleMenu(), function (titleMenu) {
                        titleMenu.treeMenu.remove(function (x) {
                            return x.treeMenuId() == treeMenuId;
                        });
                        titleMenu.treeMenu.valueHasMutated();
                    });
                    self.calculateTreeMenuOrder(titleMenuId);
                };
                /** Clean all control in form */
                ScreenModel.prototype.cleanForm = function () {
                    var self = this;
                    self.checkDisabled(true);
                    self.isCreated(true);
                    errors.clearAll();
                    self.currentWebMenu(new WebMenu({
                        webMenuCode: "",
                        webMenuName: "",
                        defaultMenu: 0,
                        menuBars: []
                    }));
                    self.currentWebMenuCode("");
                    if (self.listWebMenu().length > 0) {
                        nts.uk.ui.errors.clearAll();
                    }
                    $('#webMenuCode').focus();
                };
                /** Get Webmenu */
                ScreenModel.prototype.getWebMenu = function () {
                    var self = this;
                    var dfd = $.Deferred();
                    a.service.loadWebMenu().done(function (data) {
                        if (data.length != 0) {
                            self.listWebMenu.removeAll();
                            var items = [];
                            _.forEach(data, function (item) {
                                items.push(new WebMenuModel(item.webMenuCode, item.webMenuName, item.defaultMenu));
                            });
                            var sortedItems = _.sortBy(items, [function (o) { return o.webMenuCode; }]);
                            self.listWebMenu(sortedItems);
                        }
                        else {
                            self.listWebMenu([]);
                        }
                        dfd.resolve();
                    }).fail(function (res) { });
                    return dfd.promise();
                };
                /**
                 *  Init Display
                 *  Call when start load done
                 */
                ScreenModel.prototype.initDisplay = function () {
                    var self = this;
                    self.setupMenuBar();
                    self.setupTitleMenu();
                    self.setupTreeMenu();
                    // self.setupContextMenu();
                };
                /** Setup MenuBar */
                ScreenModel.prototype.setupMenuBar = function () {
                    var self = this;
                    var active = (nts.uk.util.isNullOrUndefined(self.currentMenuBar())) ? 0 : self.currentMenuBar().displayOrder() - 1;
                    $("#menubar-tabs.ui-tabs").tabs("destroy");
                    $("#menubar-tabs").tabs({
                        active: active,
                        create: function (event, ui) {
                            $("#menubar-tabs").find('.ui-tabs-panel').addClass('disappear');
                            ui.panel.removeClass('disappear');
                        },
                        activate: function (evt, ui) {
                            $("#menubar-tabs").find('.ui-tabs-panel').addClass('disappear');
                            ui.newPanel.removeClass('disappear');
                            self.currentMenuBar(_.find(self.currentWebMenu().menuBars(), function (item) {
                                return item.menuBarId() == ui.newTab.attr("id");
                            }));
                        }
                    });
                    $(".menubar-navigation.ui-sortable").sortable("destroy");
                    $(".menubar-navigation").sortable({
                        opacity: 0.8,
                        distance: 25,
                        axis: "x",
                        revert: false,
                        scroll: true,
                        tolerance: "pointer",
                        placeholder: "menubar-placeholder",
                        stop: function (event, ui) {
                            self.rebindMenuBar();
                        }
                    });
                };
                /** Setup TitleMenu */
                ScreenModel.prototype.setupTitleMenu = function () {
                    var self = this;
                    $(".title-menu.ui-sortable").sortable("destroy");
                    $(".title-menu").sortable({
                        opacity: 0.8,
                        distance: 25,
                        axis: "x",
                        revert: false,
                        scroll: true,
                        items: ".title-menu-column",
                        handle: ".title-menu-name",
                        tolerance: "pointer",
                        placeholder: "titlemenu-placeholder",
                        stop: function (event, ui) {
                            self.calculateTitleMenuOrder();
                        }
                    });
                };
                /** Setup TreeMenu */
                ScreenModel.prototype.setupTreeMenu = function () {
                    var self = this;
                    $(".tree-menu.ui-sortable").sortable("destroy");
                    $(".tree-menu").sortable({
                        opacity: 0.8,
                        distance: 25,
                        axis: "y",
                        revert: false,
                        scroll: true,
                        items: ".context-menu-tree",
                        tolerance: "pointer",
                        placeholder: "treemenu-placeholder",
                        stop: function (event, ui) {
                            self.rebindTreeMenu(ui.item.closest(".title-menu-column"));
                        }
                    });
                };
                /** Setup ContextMenu */
                // private setupContextMenu(): void {
                //     var self = this;
                //     new contextMenu(".context-menu-title", [
                //         new menu("edit", nts.uk.resource.getText('CCG013_124'), (ui) => {
                //             let div = $(ui).parent('div');
                //             self.openJdialog(div.attr('id'));
                //         }),
                //         new menu("delete", nts.uk.resource.getText('CCG013_125'), (ui) => {
                //             let element = $(ui).parent();
                //             let id = element.attr('id');
                //             self.removeTitleBar(id);
                //         })
                //     ]);
                //     new contextMenu(".context-menu-tree", [
                //         new menu("delete", nts.uk.resource.getText('CCG013_126'), (ui) => {
                //             self.removeTreeMenu($(ui));
                //         })
                //     ]);
                // }
                /** Rebind Knockout Menubar */
                ScreenModel.prototype.rebindMenuBar = function () {
                    var self = this;
                    ko.cleanNode($(".menubar-navigation")[0]);
                    self.calculateMenuBarOrder();
                    $(".menubar-navigation").html(menuBarHTML);
                    ko.applyBindingsToNode($(".menubar-navigation")[0], {
                        foreach: self.currentWebMenu().menuBars
                    }, self);
                    self.setupMenuBar();
                };
                /** Calculate MenuBar Index */
                ScreenModel.prototype.calculateMenuBarOrder = function () {
                    var self = this;
                    _.forEach(self.currentWebMenu().menuBars(), function (item) {
                        item.displayOrder($("#" + item.menuBarId(), ".menubar-navigation").index() + 1);
                    });
                    self.currentWebMenu().menuBars.sort(function (left, right) {
                        return left.displayOrder() == right.displayOrder() ? 0 : (left.displayOrder() < right.displayOrder() ? -1 : 1);
                    });
                };
                /** Rebind Knockout TreeMenu */
                ScreenModel.prototype.rebindTreeMenu = function (ui) {
                    var self = this;
                    var titleMenuId = ui.attr("id");
                    var titleMenu = _.find(self.currentMenuBar().titleMenu(), function (item) {
                        return item.titleMenuId() == titleMenuId;
                    });
                    ko.cleanNode($("#" + titleMenuId + " .tree-menu")[0]);
                    self.calculateTreeMenuOrder(ui.attr("id"));
                    $("#" + titleMenuId + " .tree-menu").html(treeMenuHTML);
                    ko.applyBindingsToNode($("#" + titleMenuId + " .tree-menu")[0], {
                        foreach: titleMenu.treeMenu
                    });
                    self.setupTreeMenu();
                };
                /** Calculate TreeMenu Index */
                ScreenModel.prototype.calculateTreeMenuOrder = function (titleMenuId) {
                    var self = this;
                    var titleMenu = _.find(self.currentMenuBar().titleMenu(), function (item) {
                        return item.titleMenuId() == titleMenuId;
                    });
                    _.forEach(titleMenu.treeMenu(), function (item) {
                        item.displayOrder($("#" + item.treeMenuId(), "#" + titleMenuId + " .tree-menu").index() + 1);
                    });
                    titleMenu.treeMenu().sort(function (left, right) {
                        return left.displayOrder() == right.displayOrder() ? 0 : (left.displayOrder() < right.displayOrder() ? -1 : 1);
                    });
                };
                /** Calculate MenuBar Index */
                ScreenModel.prototype.calculateTitleMenuOrder = function () {
                    var self = this;
                    _.forEach(self.currentMenuBar().titleMenu(), function (item) {
                        item.displayOrder($("#" + item.titleMenuId(), ".title-menu").index() + 1);
                    });
                    self.currentMenuBar().titleMenu.sort(function (left, right) {
                        return left.displayOrder() == right.displayOrder() ? 0 : (left.displayOrder() < right.displayOrder() ? -1 : 1);
                    });
                };
                /** Add MenuBar Dialog */
                ScreenModel.prototype.openBdialog = function () {
                    var self = this;
                    var webmenu = self.currentWebMenu();
                    modal("/view/ccg/013/b/index.xhtml").onClosed(function () {
                        var id = randomId();
                        var data = getShared("CCG013B_MenuBar");
                        if (data) {
                            var newMenubar = new MenuBar({
                                menuBarId: id,
                                code: data.code,
                                menuBarName: data.nameMenuBar,
                                selectedAtr: data.selectedRadioAtcClass,
                                system: data.system,
                                menuCls: data.menuCls,
                                backgroundColor: data.backgroundColor,
                                textColor: data.letterColor,
                                displayOrder: self.currentWebMenu().menuBars().length + 1,
                                titleMenu: []
                            });
                            webmenu.menuBars.push(newMenubar);
                            self.currentMenuBar(newMenubar);
                            self.setupMenuBar();
                            $("#menubar-tabs li#" + id + " a").trigger('click');
                        }
                    });
                };
                ScreenModel.prototype.openCdialog = function (titleMenu) {
                    var self = this;
                    var mang = [];
                    var titleBar = {};
                    if (titleMenu.titleMenuId) {
                        for (var i = 0; i < titleMenu.treeMenu().length; i++) {
                            var treeMenus = {
                                classification: titleMenu.treeMenu()[i].classification() ? titleMenu.treeMenu()[i].classification() : 0,
                                code: titleMenu.treeMenu()[i].code(),
                                displayOrder: titleMenu.treeMenu()[i].displayOrder(),
                                name: titleMenu.treeMenu()[i].name(),
                                system: titleMenu.treeMenu()[i].system(),
                                titleMenuId: titleMenu.treeMenu()[i].titleMenuId(),
                                treeMenuId: titleMenu.treeMenu()[i].treeMenuId()
                            };
                            mang.push(treeMenus);
                        }
                        titleBar = {
                            name: titleMenu.titleMenuName(),
                            backgroundColor: titleMenu.backgroundColor(),
                            textColor: titleMenu.textColor(),
                            treeMenus: mang
                        };
                        setShared("titleMenuId", titleMenu.titleMenuId);
                    }
                    else {
                        titleBar = {
                            name: ko.observable(''),
                            backgroundColor: '#FF9900',
                            textColor: '#FFFFFF',
                            treeMenus: []
                        };
                        setShared("titleMenuId", undefined);
                    }
                    setShared("titleBar", titleBar);
                    modal("/view/ccg/013/c/index.xhtml", {
                        resize: true
                    }).onClosed(function () {
                        var titleBar = getShared("CCG013C_TitleBar");
                        if (titleBar) {
                            var id = randomId();
                            titleMenu.titleMenu.push(new TitleMenu({
                                menuBarId: titleMenu.menuBarId(),
                                titleMenuId: id,
                                titleMenuName: titleBar.nameTitleBar,
                                backgroundColor: titleBar.backgroundColor,
                                textColor: titleBar.letterColor,
                                displayOrder: titleMenu.titleMenu().length + 1,
                                treeMenu: titleBar.treeMenu
                            }));
                            self.setupTitleMenu();
                        }
                        else {
                            var data = getShared("CCG013C_MENUS");
                            if (data !== undefined) {
                                titleMenu.treeMenu.removeAll();
                                if (data && data.length > 0) {
                                    _.forEach(data, function (x) {
                                        var treeMenuId = randomId();
                                        titleMenu.treeMenu.push(new TreeMenu({
                                            titleMenuId: titleMenu.titleMenuId(),
                                            code: x.code,
                                            name: x.name,
                                            displayOrder: x.displayOrder,
                                            classification: x.menu_cls,
                                            system: x.system,
                                            menu_cls: x.menu_cls
                                        }));
                                    });
                                }
                                self.setupTreeMenu();
                            }
                            var textColor = getShared("CCG013C_TEXT_COLOR");
                            if (textColor) {
                                titleMenu.textColor(textColor);
                            }
                            var backgroundColor = getShared("CCG013C_BACKGROUND_COLOR");
                            if (backgroundColor) {
                                titleMenu.backgroundColor(backgroundColor);
                            }
                            var titleMenuName = getShared("CCG013C_TITLE_MENU_NAME");
                            if (titleMenuName) {
                                titleMenu.titleMenuName(titleMenuName);
                            }
                            var titleMenuId = getShared("CCG013C_MENUS_ID");
                            if (titleMenuId) {
                                self.removeTitleBar(titleMenuId);
                            }
                        }
                        setShared("titleBar", undefined);
                    });
                };
                ScreenModel.prototype.openEDialog = function () {
                    var self = this;
                    var data = ko.toJS(self.currentWebMenu());
                    setShared("CCG013E_COPY", data);
                    modal("/view/ccg/013/e/index.xhtml").onClosed(function () {
                        var newWebMenuCode = getShared("CCG013E_WEB_CODE_COPY");
                        self.getWebMenu().done(function () {
                            if (newWebMenuCode != undefined) {
                                self.currentWebMenuCode(newWebMenuCode);
                                self.currentWebMenuCode.valueHasMutated();
                                //   self.currentWebMenuCode.valueHasMutated();
                            }
                        });
                    });
                };
                ScreenModel.prototype.openKdialog = function () {
                    var self = this;
                    modal("/view/ccg/013/k/index.xhtml");
                };
                ScreenModel.prototype.openIdialog = function (id) {
                    var self = this;
                    var datas = ko.toJS(self.currentWebMenu().menuBars);
                    var menu = _.find(datas, function (x) { return x.menuBarId == id; });
                    setShared("CCG013I_MENU_BAR1", menu);
                    modal("/view/ccg/013/i/index.xhtml").onClosed(function () {
                        var data = getShared("CCG013I_MENU_BAR");
                        if (data) {
                            var menuBars = self.currentWebMenu().menuBars();
                            _.forEach(menuBars, function (item) {
                                if (item.menuBarId() == id) {
                                    item.menuBarName(data.menuBarName);
                                    item.backgroundColor(data.backgroundColor);
                                    item.textColor(data.textColor);
                                }
                            });
                            $("#menubar-tabs li#" + id + " a").trigger('click');
                        }
                        var menuBarId = getShared("CCG013I_MENU_BAR_ID");
                        if (menuBarId) {
                            self.removeMenuBar(menuBarId);
                        }
                    });
                };
                /**
                 * Export excel
                 */
                ScreenModel.prototype.exportExcel = function () {
                    var vm = this;
                    nts.uk.ui.block.grayout();
                    var langId = "ja";
                    a.service.saveAsExcel(langId)
                        .then(function () { })
                        .fail(function (error) { return nts.uk.ui.dialog.alertError({ messageId: error.messageId }); })
                        .always(function () { return nts.uk.ui.block.clear(); });
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
            var WebMenuModel = /** @class */ (function () {
                function WebMenuModel(webMenuCode, webMenuName, defaultMenu) {
                    this.webMenuCode = webMenuCode;
                    this.webMenuName = webMenuName;
                    this.defaultMenu = defaultMenu;
                    if (defaultMenu == 0) {
                        this.icon = "";
                    }
                    else {
                        this.icon = '<i class="icon icon-dot"></i>';
                    }
                }
                return WebMenuModel;
            }());
            viewmodel.WebMenuModel = WebMenuModel;
            var WebMenu = /** @class */ (function () {
                function WebMenu(param) {
                    this.webMenuCode = ko.observable(param.webMenuCode);
                    this.webMenuName = ko.observable(param.webMenuName);
                    this.defaultMenu = ko.observable(param.defaultMenu);
                    this.menuBars = ko.observableArray(param.menuBars.map(function (x) { return new MenuBar(x); }));
                }
                return WebMenu;
            }());
            viewmodel.WebMenu = WebMenu;
            var MenuBar = /** @class */ (function () {
                function MenuBar(param) {
                    this.menuBarId = ko.observable(param.menuBarId);
                    this.code = ko.observable(param.code);
                    this.menuBarName = ko.observable(param.menuBarName || '');
                    this.selectedAtr = ko.observable(param.selectedAtr);
                    this.system = ko.observable(param.system);
                    this.menuCls = ko.observable(param.menuCls);
                    this.backgroundColor = ko.observable(param.backgroundColor);
                    this.textColor = ko.observable(param.textColor);
                    this.displayOrder = ko.observable(param.displayOrder);
                    this.titleMenu = ko.observableArray(_.orderBy(param.titleMenu, 'displayOrder', 'asc').map(function (x) {
                        x.menuNames = param.menuNames || [];
                        return new TitleMenu(x);
                    }));
                    this.targetContent = ko.observable("#tab-content-" + param.menuBarId);
                }
                return MenuBar;
            }());
            viewmodel.MenuBar = MenuBar;
            var TitleMenu = /** @class */ (function () {
                // imageName: KnockoutObservable<string>;
                // imageSize: KnockoutObservable<string>;
                function TitleMenu(param) {
                    this.menuBarId = ko.observable(param.menuBarId);
                    this.titleMenuId = ko.observable(param.titleMenuId);
                    this.titleMenuName = ko.observable(param.titleMenuName || '');
                    this.backgroundColor = ko.observable(param.backgroundColor);
                    // this.imageFile = ko.observable(param.imageFile);
                    this.textColor = ko.observable(param.textColor);
                    // this.titleMenuAtr = ko.observable(param.titleMenuAtr);
                    // this.titleMenuCode = ko.observable(param.titleMenuCode);
                    this.displayOrder = ko.observable(param.displayOrder);
                    this.treeMenu = ko.observableArray(_.orderBy(param.treeMenu, ['displayOrder'], ['asc']).map(function (x) {
                        if (!x.name) {
                            var name_1 = _.find(param.menuNames, function (c) { return c.code === x.code && c.system === x.system && c.classification === x.classification; });
                            x.name = name_1 && name_1.displayName;
                        }
                        return new TreeMenu(x);
                    }));
                    // this.imageName = ko.observable(param.imageName);
                    // this.imageSize = ko.observable(param.imageSize);
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
        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
    })(a = ccg013.a || (ccg013.a = {}));
})(ccg013 || (ccg013 = {}));
//# sourceMappingURL=ccg013.a.vm.js.map