/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />

module ccg013.a.viewmodel {
    import randomId = nts.uk.util.randomId;
    import modal = nts.uk.ui.windows.sub.modal;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import errors = nts.uk.ui.errors;

    const menuBarHTML: string = `<li class="context-menu-bar" data-bind="attr: {'id': menuBarId}">
        <a class="tab-item" data-bind="attr: {href: targetContent}" style="background-color: #127D09;">
            <span class="tab-item-content limited-label" data-bind="text: menuBarName" style="color: #ffffff;" />
            <i data-bind="ntsIcon: { no: 5, width: 30, height: 30 }, click:function() { $parent.openIdialog(menuBarId()); }"></i>
        </a></li>`;
    const treeMenuHTML: string = '<li class="context-menu-tree" data-bind="attr:{id: treeMenuId}"><span class="limited-label" data-bind="text: name"></span></li>';

    export class ScreenModel {
        // WebMenu
        listWebMenu: KnockoutObservableArray<WebMenuModel>;
        webMenuColumns: KnockoutObservableArray<any>;
        currentWebMenuCode: KnockoutObservable<any>;
        currentWebMenu: KnockoutObservable<WebMenu>;
        index: KnockoutObservable<number>;

        // MenuBar
        currentMenuBar: KnockoutObservable<MenuBar>;

        // UI
        isCreated: KnockoutObservable<boolean>;
        isDefaultMenu: KnockoutObservable<boolean>;
        widthTab: KnockoutObservable<string> = ko.observable('800px');
        checkDisabled: KnockoutObservable<boolean>;

        constructor() {

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
                var index = _.findIndex(self.listWebMenu(), function (item: WebMenuModel) {
                    return item.webMenuCode == newValue;
                });


                self.index(index);
                service.findWebMenu(newValue).done(function (res: service.WebMenuDto) {
                    nts.uk.ui.errors.clearAll();
                    let webmenu = self.currentWebMenu();
                    if (!newValue) {
                        self.isCreated(true);
                        self.checkDisabled(true);
                        nts.uk.ui.errors.clearAll();
                    } else {
                        self.isCreated(false);
                        self.checkDisabled(false);
                        $('#webMenuName').focus();
                    }
                    webmenu.webMenuCode(res.webMenuCode);
                    webmenu.webMenuName(res.webMenuName);
                    webmenu.defaultMenu(res.defaultMenu);
                    service.findStandardMenuList().done((menuNames: Array<any>) => {
                        webmenu.menuBars.removeAll();
                        _.each(_.orderBy(res.menuBars, 'displayOrder', 'asc'), x => {
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

            $("#single-list tbody").find("td").addClass("text-align")
        }

        /** StartPage */
        startPage(): JQueryPromise<void> {
            var self = this;
            var dfd = $.Deferred<void>();

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
        }

        /** Registry Webmenu */
        addWebMenu(): any {
            $("#webMenuName").trigger("validate");
            nts.uk.ui.block.invisible();
            var self = this;
            var webMenu = self.currentWebMenu();
            var length = webMenu.webMenuCode().length;
            var fullWebMenuCode = webMenu.webMenuCode();
            if (length < 3) {
                if (length == 1) {
                    webMenu.webMenuCode('00' + fullWebMenuCode);
                } else {
                    webMenu.webMenuCode('0' + fullWebMenuCode);
                }
            };

            (self.isDefaultMenu()) ? webMenu.defaultMenu(1) : webMenu.defaultMenu(0);

            service.addWebMenu(self.isCreated(), ko.toJS(webMenu)).done(function () {
                //                nts.uk.ui.dialog.info(nts.uk.resource.getMessage('Msg_15'));
                nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                    self.isCreated(false);
                    self.getWebMenu().done(() => {
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
        }

        /** Remove web menu */
        removeWebMenu(): void {
            nts.uk.ui.block.invisible();
            let self = this,
                webMenuCode = self.currentWebMenuCode();
            if (self.currentWebMenu().defaultMenu()) {
                nts.uk.ui.dialog.alertError({ messageId: "Msg_72" });
            } else {
                nts.uk.ui.dialog.confirm({ messageId: "Msg_18" }).ifYes(() => {
                    service.deleteWebMenu(webMenuCode).done(function () {
                        nts.uk.ui.dialog.info(nts.uk.resource.getMessage('Msg_16')).then(() => {
                            self.getWebMenu().done(() => {
                                if (self.listWebMenu().length == 0) {
                                    self.cleanForm();
                                } else if (self.index() == self.listWebMenu().length) {
                                    self.currentWebMenuCode(self.listWebMenu()[self.index() - 1].webMenuCode);
                                    $('#webMenuName').focus();
                                } else {
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
        }

        /** Remove menu bar */
        private removeMenuBar(menuBarId: string): void {
            let self = this;

            var menubarIndex = _.findIndex(self.currentWebMenu().menuBars(), function (item: MenuBar) {
                return item.menuBarId() == menuBarId;
            });

            self.currentWebMenu().menuBars.remove((item) => {
                return item.menuBarId() == menuBarId;
            });
            if (self.currentMenuBar().menuBarId() == menuBarId) {
                if (menubarIndex == self.currentWebMenu().menuBars().length) {
                    var id = self.currentWebMenu().menuBars()[menubarIndex - 1].menuBarId();
                    $("#menubar-tabs li#" + id + " a").trigger('click');

                } else {
                    var id = self.currentWebMenu().menuBars()[menubarIndex].menuBarId();
                    $("#menubar-tabs li#" + id + " a").trigger('click');
                }
            }

            self.calculateMenuBarOrder();
        }

        /** Remove title bar */
        private removeTitleBar(titleMenuId: string): void {
            var self = this;

            var titleMenu: Array<TitleMenu> = [];
            _.forEach(self.currentMenuBar().titleMenu(), (item: TitleMenu) => {
                titleMenu.push(item);
            });
            _.remove(titleMenu, (item: TitleMenu) => {
                return item.titleMenuId() == titleMenuId;
            });
            self.currentMenuBar().titleMenu.removeAll();
            self.currentMenuBar().titleMenu(titleMenu);
            self.calculateTitleMenuOrder();
            self.setupMenuBar();
        }

        /** Remove TreeMenu */
        private removeTreeMenu(ui: any): void {
            var self = this;
            var treeMenuId = ui.attr("id");
            var titleMenuId = ui.closest(".title-menu-column").attr("id");
            _.forEach(self.currentMenuBar().titleMenu(), function (titleMenu: TitleMenu) {
                titleMenu.treeMenu.remove((x: TreeMenu) => {
                    return x.treeMenuId() == treeMenuId;
                });
                titleMenu.treeMenu.valueHasMutated();
            });
            self.calculateTreeMenuOrder(titleMenuId);
        }

        /** Clean all control in form */
        private cleanForm(): void {
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
        }

        /** Get Webmenu */
        private getWebMenu(): any {
            var self = this;
            var dfd = $.Deferred();
            service.loadWebMenu().done(function (data) {
                if (data.length != 0) {
                    self.listWebMenu.removeAll();
                    var items = [];

                    _.forEach(data, function (item) {
                        items.push(new WebMenuModel(item.webMenuCode, item.webMenuName, item.defaultMenu));
                    });

                    var sortedItems = _.sortBy(items, [function (o) { return o.webMenuCode; }]);
                    self.listWebMenu(sortedItems);
                } else {
                    self.listWebMenu([]);
                }
                dfd.resolve();
            }).fail((res) => { });
            return dfd.promise();
        }

        /**
         *  Init Display
         *  Call when start load done
         */
        private initDisplay(): void {
            var self = this;
            self.setupMenuBar();
            self.setupTitleMenu();
            self.setupTreeMenu();
            // self.setupContextMenu();
        }

        /** Setup MenuBar */
        private setupMenuBar(): void {
            var self = this;
            var active = (nts.uk.util.isNullOrUndefined(self.currentMenuBar())) ? 0 : self.currentMenuBar().displayOrder() - 1;
            $("#menubar-tabs.ui-tabs").tabs("destroy");
            $("#menubar-tabs").tabs({
                active: active,
                create: function (event: Event, ui: any) {
                    $("#menubar-tabs").find('.ui-tabs-panel').addClass('disappear');
                    ui.panel.removeClass('disappear');
                },
                activate: function (evt: Event, ui: any) {
                    $("#menubar-tabs").find('.ui-tabs-panel').addClass('disappear');
                    ui.newPanel.removeClass('disappear');
                    self.currentMenuBar(_.find(self.currentWebMenu().menuBars(), (item) => {
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
        }

        /** Setup TitleMenu */
        private setupTitleMenu(): void {
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
        }

        /** Setup TreeMenu */
        private setupTreeMenu(): void {
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
        }

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
        private rebindMenuBar(): void {
            var self = this;
            ko.cleanNode($(".menubar-navigation")[0]);
            self.calculateMenuBarOrder();
            $(".menubar-navigation").html(menuBarHTML);
            ko.applyBindingsToNode($(".menubar-navigation")[0], {
                foreach: self.currentWebMenu().menuBars
            }, self);
            self.setupMenuBar();
        }

        /** Calculate MenuBar Index */
        private calculateMenuBarOrder(): void {
            var self = this;
            _.forEach(self.currentWebMenu().menuBars(), (item: MenuBar) => {
                item.displayOrder($("#" + item.menuBarId(), ".menubar-navigation").index() + 1);
            });
            self.currentWebMenu().menuBars.sort((left: MenuBar, right: MenuBar) => {
                return left.displayOrder() == right.displayOrder() ? 0 : (left.displayOrder() < right.displayOrder() ? -1 : 1);
            });
        }

        /** Rebind Knockout TreeMenu */
        private rebindTreeMenu(ui: any): void {
            var self = this;
            var titleMenuId = ui.attr("id");
            var titleMenu = _.find(self.currentMenuBar().titleMenu(), (item: TitleMenu) => {
                return item.titleMenuId() == titleMenuId;
            });
            ko.cleanNode($("#" + titleMenuId + " .tree-menu")[0]);
            self.calculateTreeMenuOrder(ui.attr("id"));
            $("#" + titleMenuId + " .tree-menu").html(treeMenuHTML);
            ko.applyBindingsToNode($("#" + titleMenuId + " .tree-menu")[0], {
                foreach: titleMenu.treeMenu
            });
            self.setupTreeMenu();
        }

        /** Calculate TreeMenu Index */
        private calculateTreeMenuOrder(titleMenuId: string): void {
            var self = this;
            var titleMenu = _.find(self.currentMenuBar().titleMenu(), (item: TitleMenu) => {
                return item.titleMenuId() == titleMenuId;
            });
            _.forEach(titleMenu.treeMenu(), (item: TreeMenu) => {
                item.displayOrder($("#" + item.treeMenuId(), "#" + titleMenuId + " .tree-menu").index() + 1);
            });
            titleMenu.treeMenu().sort((left: TreeMenu, right: TreeMenu) => {
                return left.displayOrder() == right.displayOrder() ? 0 : (left.displayOrder() < right.displayOrder() ? -1 : 1);
            });
        }

        /** Calculate MenuBar Index */
        private calculateTitleMenuOrder(): void {
            var self = this;
            _.forEach(self.currentMenuBar().titleMenu(), (item: TitleMenu) => {
                item.displayOrder($("#" + item.titleMenuId(), ".title-menu").index() + 1);
            });
            self.currentMenuBar().titleMenu.sort((left: TitleMenu, right: TitleMenu) => {
                return left.displayOrder() == right.displayOrder() ? 0 : (left.displayOrder() < right.displayOrder() ? -1 : 1);
            });
        }

        /** Add MenuBar Dialog */
        openBdialog(): any {
            var self = this;
            var webmenu = self.currentWebMenu();
            modal("/view/ccg/013/b/index.xhtml").onClosed(function () {
                let id = randomId();
                let data = getShared("CCG013B_MenuBar");
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
        }

        openCdialog(titleMenu: any): void {
            let self = this;
            let mang = [];
            let titleBar = {};
            if (titleMenu.titleMenuId) {
                for (let i = 0; i < titleMenu.treeMenu().length; i++) {
                    let treeMenus = {
                        classification: titleMenu.treeMenu()[i].classification() ? titleMenu.treeMenu()[i].classification() : 0,
                        code: titleMenu.treeMenu()[i].code(),
                        displayOrder: titleMenu.treeMenu()[i].displayOrder(),
                        name: titleMenu.treeMenu()[i].name(),
                        system: titleMenu.treeMenu()[i].system(),
                        titleMenuId: titleMenu.treeMenu()[i].titleMenuId(),
                        treeMenuId: titleMenu.treeMenu()[i].treeMenuId()
                    }
                    mang.push(treeMenus);
                }
                titleBar = {
                    name: titleMenu.titleMenuName(),
                    backgroundColor: titleMenu.backgroundColor(),
                    textColor: titleMenu.textColor(),
                    treeMenus: mang
                };
                setShared("titleMenuId", titleMenu.titleMenuId);
            } else {
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
                    let id = randomId();
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
                    
                } else {
                    let data = getShared("CCG013C_MENUS");
                    if (data !== undefined) {
                        titleMenu.treeMenu.removeAll();
                        if (data && data.length > 0) {
                            _.forEach(data, x => {
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
                    let textColor = getShared("CCG013C_TEXT_COLOR");
                    if (textColor) {
                        titleMenu.textColor(textColor);
                    }
                    let backgroundColor = getShared("CCG013C_BACKGROUND_COLOR");
                    if (backgroundColor) {
                        titleMenu.backgroundColor(backgroundColor);
                    }
                    let titleMenuName = getShared("CCG013C_TITLE_MENU_NAME");
                    if (titleMenuName) {
                        titleMenu.titleMenuName(titleMenuName);
                    }
                    let titleMenuId = getShared("CCG013C_MENUS_ID");
                    if (titleMenuId) {
                        self.removeTitleBar(titleMenuId);
                    }
                }
                setShared("titleBar", undefined);
            });
        }

        openEDialog(): void {
            var self = this;
            var data = ko.toJS(self.currentWebMenu());
            setShared("CCG013E_COPY", data);
            modal("/view/ccg/013/e/index.xhtml").onClosed(function () {
                let newWebMenuCode = getShared("CCG013E_WEB_CODE_COPY");
                self.getWebMenu().done(() => {
                    if (newWebMenuCode != undefined) {
                        self.currentWebMenuCode(newWebMenuCode);
                        self.currentWebMenuCode.valueHasMutated();
                        //   self.currentWebMenuCode.valueHasMutated();
                    }
                });
            });
        }

        openKdialog(): any {
            var self = this;
            modal("/view/ccg/013/k/index.xhtml");
        }

        openIdialog(id: any): any {
            var self = this;
            var datas: Array<any> = ko.toJS(self.currentWebMenu().menuBars);
            var menu = _.find(datas, x => x.menuBarId == id);
            setShared("CCG013I_MENU_BAR1", menu);
            modal("/view/ccg/013/i/index.xhtml").onClosed(function () {
                let data = getShared("CCG013I_MENU_BAR");
                if (data) {
                    let menuBars: Array<MenuBar> = self.currentWebMenu().menuBars();
                    _.forEach(menuBars, function (item: MenuBar) {
                        if (item.menuBarId() == id) {
                            item.menuBarName(data.menuBarName);
                            item.backgroundColor(data.backgroundColor);
                            item.textColor(data.textColor);
                        }
                    });
                    $("#menubar-tabs li#" + id + " a").trigger('click');
                }

                let menuBarId = getShared("CCG013I_MENU_BAR_ID");
                if (menuBarId) {
                    self.removeMenuBar(menuBarId);
                }
            });
        }

        /**
         * Export excel
         */
        private exportExcel(): void {
            const vm = this;
            (nts.uk.ui as any).block.grayout();
            let langId = "ja";
            service.saveAsExcel(langId)
                .then(() => { })
                .fail((error) => (nts.uk.ui as any).dialog.alertError({ messageId: error.messageId }))
                .always(() => (nts.uk.ui as any).block.clear());
        }
    }

    export class WebMenuModel {
        webMenuCode: string;
        webMenuName: string;
        defaultMenu: number;
        icon: string;
        constructor(webMenuCode: string, webMenuName: string, defaultMenu: number) {
            this.webMenuCode = webMenuCode;
            this.webMenuName = webMenuName;
            this.defaultMenu = defaultMenu;
            if (defaultMenu == 0) {
                this.icon = "";
            } else {
                this.icon = '<i class="icon icon-dot"></i>';
            }
        }
    }

    export interface IWebMenu {
        webMenuCode: string;
        webMenuName: string;
        defaultMenu: number;
        menuBars: Array<IMenuBar>;
    }

    export class WebMenu {
        webMenuCode: KnockoutObservable<string>;
        webMenuName: KnockoutObservable<string>;
        defaultMenu: KnockoutObservable<number>;
        menuBars: KnockoutObservableArray<MenuBar>;

        constructor(param: IWebMenu) {
            this.webMenuCode = ko.observable(param.webMenuCode);
            this.webMenuName = ko.observable(param.webMenuName);
            this.defaultMenu = ko.observable(param.defaultMenu);
            this.menuBars = ko.observableArray(param.menuBars.map(x => new MenuBar(x)));
        }
    }

    export interface IMenuBar {
        menuBarId?: string;
        code?: string;
        menuBarName?: string;
        selectedAtr?: number;
        system?: number;
        menuCls?: number;
        backgroundColor?: string;
        textColor?: string;
        displayOrder?: number;
        targetContent?: string;
        titleMenu?: Array<ITitleMenu>;
        menuNames?: Array<any>;
    }

    export class MenuBar {
        menuBarId: KnockoutObservable<string>;
        code: KnockoutObservable<string>;
        menuBarName: KnockoutObservable<string>;
        selectedAtr: KnockoutObservable<number>;
        system: KnockoutObservable<number>;
        menuCls: KnockoutObservable<number>;
        backgroundColor: KnockoutObservable<string>;
        textColor: KnockoutObservable<string>;
        displayOrder: KnockoutObservable<number>;
        targetContent: KnockoutObservable<string>;
        titleMenu: KnockoutObservableArray<TitleMenu>;

        constructor(param: IMenuBar) {
            this.menuBarId = ko.observable(param.menuBarId);
            this.code = ko.observable(param.code);
            this.menuBarName = ko.observable(param.menuBarName || '');
            this.selectedAtr = ko.observable(param.selectedAtr);
            this.system = ko.observable(param.system);
            this.menuCls = ko.observable(param.menuCls);
            this.backgroundColor = ko.observable(param.backgroundColor);
            this.textColor = ko.observable(param.textColor);
            this.displayOrder = ko.observable(param.displayOrder);
            this.titleMenu = ko.observableArray(_.orderBy(param.titleMenu, 'displayOrder', 'asc').map(x => {
                x.menuNames = param.menuNames || [];
                return new TitleMenu(x);
            }));
            this.targetContent = ko.observable("#tab-content-" + param.menuBarId);
        }
    }

    export interface ITitleMenu {
        menuBarId: string;
        titleMenuId: string;
        titleMenuName?: string;
        backgroundColor: string;
        // imageFile: string;
        textColor: string;
        // titleMenuAtr: number;
        // titleMenuCode: string;
        displayOrder: number;
        treeMenu: Array<ITreeMenu>;
        menuNames?: Array<any>;
        // imageName?: string;
        // imageSize?: string;
    }

    export class TitleMenu {
        menuBarId: KnockoutObservable<string>;
        titleMenuId: KnockoutObservable<string>;
        titleMenuName: KnockoutObservable<string>;
        backgroundColor: KnockoutObservable<string>;
        // imageFile: KnockoutObservable<string>;
        textColor: KnockoutObservable<string>;
        // titleMenuAtr: KnockoutObservable<number>;
        // titleMenuCode: KnockoutObservable<string>;
        displayOrder: KnockoutObservable<number>;
        treeMenu: KnockoutObservableArray<TreeMenu>;
        // imageName: KnockoutObservable<string>;
        // imageSize: KnockoutObservable<string>;

        constructor(param: ITitleMenu) {
            this.menuBarId = ko.observable(param.menuBarId);
            this.titleMenuId = ko.observable(param.titleMenuId);
            this.titleMenuName = ko.observable(param.titleMenuName || '');
            this.backgroundColor = ko.observable(param.backgroundColor);
            // this.imageFile = ko.observable(param.imageFile);
            this.textColor = ko.observable(param.textColor);
            // this.titleMenuAtr = ko.observable(param.titleMenuAtr);
            // this.titleMenuCode = ko.observable(param.titleMenuCode);
            this.displayOrder = ko.observable(param.displayOrder);
            this.treeMenu = ko.observableArray(_.orderBy(param.treeMenu, ['displayOrder'], ['asc']).map((x) => {
                if (!x.name) {
                    const name = _.find(param.menuNames, c => c.code === x.code && c.system === x.system && c.classification === x.classification);
                    x.name = name && name.displayName;
                }
                return new TreeMenu(x);
            }));
            // this.imageName = ko.observable(param.imageName);
            // this.imageSize = ko.observable(param.imageSize);
        }
    }

    export interface ITreeMenu {
        titleMenuId: string;
        code: string;
        name?: string;
        displayOrder: number;
        classification: number;
        system: number;
        menu_cls: number;
    }

    export class TreeMenu {
        treeMenuId: KnockoutObservable<string>;
        titleMenuId: KnockoutObservable<string>;
        code: KnockoutObservable<string>;
        name: KnockoutObservable<string>;
        displayOrder: KnockoutObservable<number>;
        classification: KnockoutObservable<number>;
        system: KnockoutObservable<number>;
        constructor(param: ITreeMenu) {
            this.treeMenuId = ko.observable(randomId());
            this.titleMenuId = ko.observable(param.titleMenuId);
            this.code = ko.observable(param.code);
            this.name = ko.observable(param.name || '');
            this.displayOrder = ko.observable(param.displayOrder);
            this.classification = ko.observable(param.classification);
            this.system = ko.observable(param.system);
        }
    }
}