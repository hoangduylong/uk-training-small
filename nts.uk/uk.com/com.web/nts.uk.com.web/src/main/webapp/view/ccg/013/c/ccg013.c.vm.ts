module nts.uk.com.view.ccg013.c.viewmodel {
    import randomId = nts.uk.util.randomId;
    export class ScreenModel extends ko.ViewModel {
        //Text edittor
        nameTitleBar: KnockoutObservable<string>;
        titleBar: KnockoutObservable<any>;

        //colorpicker
        letterColor: KnockoutObservable<string>;
        backgroundColor: KnockoutObservable<string>;

        systemList: KnockoutObservableArray<SystemModel>;
        systemName: KnockoutObservable<string>;
        currentSystemCode: KnockoutObservable<number>
        selectedSystemCode: KnockoutObservable<number>;

        columns: KnockoutObservableArray<any>;
        newColumns: KnockoutObservableArray<any>;

        allItems: KnockoutObservableArray<ItemModel>;
        items: KnockoutObservableArray<ItemModel>;
        newItems: KnockoutObservableArray<ItemModel>;
        tempItems: KnockoutObservableArray<ItemModel>;
        dataItems: KnockoutObservableArray<ItemModel>;

        currentCode: KnockoutObservable<any>;
        currentCodeList: KnockoutObservableArray<any>;
        newCurrentCodeList: KnockoutObservableArray<any>;

        singleSelectedCode: any;
        singleSelectedNewCode: any;
        selectedCodes: any;
        selectedNewCodes: any;
        // headers: any;

        disableSwap: KnockoutObservable<boolean>;

        titleMenuId: KnockoutObservable<string>;

        getData: boolean;

        constructor() {
            super();
            var self = this;
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

            this.currentCode = ko.observable();
            this.currentCodeList = ko.observableArray([]);
            this.newCurrentCodeList = ko.observableArray([]);

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

        }

        start(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred<void>();

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
                var newData: any = [];
                self.selectedSystemCode(5);
                if (titleBar.treeMenus) {
                    _.forEach(titleBar.treeMenus, function (item: any, index: number) {
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
                .on('click', '.search-btn', () => {
                    const $grid = $('#multi-list1');

                    // Lay danh sach cac item duoc bind vao grid
                    const items = $grid.igGrid('option', 'dataSource');

                    // neu co item
                    if (items && items.length) {
                        // lay ra item dau tien
                        const [first] = items;

                        // neu ton tai item dau tien
                        if (first) {
                            // lay ra khoa chinh
                            const { primaryKey } = first;

                            if (primaryKey) {
                                // gan khoa chinh vao danh sach selected
                                self.currentCodeList([primaryKey]);
                            }
                        }
                    }
                });

            return dfd.promise();
        }

        /**
         * Disable swap button when right contents does not have any items
         */
        disableSwapButton(): void {
            var self = this;

            if (self.newItems().length === 0) {
                self.disableSwap(false);
            } else {
                self.disableSwap(true);
            }
        }

        /**
         * Get data by system id from db
         */
        findAllDisplay(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();

            service.findBySystem().done(function (data, idx) {
                var list001: Array<ItemModel> = [];
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
        }

        getSystemEnum(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();

            /** Get EditMenuBar*/
            service.getEditMenuBar().done(function (editMenuBar: any) {
                self.systemList.push(new SystemModel(5, nts.uk.resource.getText("CCG013_137")));
                _.forEach(editMenuBar.listSystem, function (item) {
                    self.systemList.push(new SystemModel(item.value, item.localizedName));
                });
                self.systemList(self.systemList().filter(x => x.systemCode !== System.OFFICE_HELPER));
                dfd.resolve();
            }).fail(function (error) {
                dfd.reject();
                alert(error.message);
            });
            return dfd.promise();
        }

        findBySystem(system: number): void {
            const self = this;
            let list001: ItemModel[] = [];
            const allItemsClone = _.orderBy(self.allItems(), ['system', 'displayOrder', 'code'], ['asc', 'asc', 'asc']);
            const list002 = _.chain(allItemsClone)
                .filter((item: any) =>
                    item.system === System.COMMON &&
                    item.menu_cls === Menu_Cls.TopPage &&
                    item.webMenuSetting === WebMenuSetting.Display
                )
                .value();
            if (self.selectedSystemCode() === System.ALL) {
                list001 = _.chain(allItemsClone)
                    .filter((item: ItemModel) =>
                        item.menu_cls !== Menu_Cls.TopPage &&
                        item.menu_cls !== Menu_Cls.OfficeHelper &&
                        item.webMenuSetting === WebMenuSetting.Display
                    )
                    .map(item => new ItemModel(list001.length, nts.uk.util.randomId(), item.code, item.targetItem, item.name, list001.length, item.menu_cls, item.system, item.displayOrder, item.webMenuSetting, item.menu_cls))
                    .value();
            } else {
                list001 = _.chain(allItemsClone)
                    .filter((item: ItemModel) =>
                        item.system === system &&
                        item.menu_cls !== Menu_Cls.TopPage &&
                        item.menu_cls !== Menu_Cls.OfficeHelper &&
                        item.webMenuSetting === WebMenuSetting.Display
                    )
                    .map(item => new ItemModel(list001.length, nts.uk.util.randomId(), item.code, item.targetItem, item.name, list001.length, item.menu_cls, item.system, item.displayOrder, item.webMenuSetting, item.menu_cls))
                    .value();
            }
            const listStandardMenu = _.concat(list001, list002);
            self.items(listStandardMenu);
        }

        /**
         * Add items selected from left grid list to right grid list
         */
        add(): void {
            var self = this;
            _.forEach(self.currentCodeList(), function (selected: any) {
                if (_.indexOf(_.map(self.newItems(), 'primaryKey'), selected) == -1) {
                    var item = _.find(self.items(), function (c) { return c.primaryKey == selected; });
                    item.order = self.newItems().length + 1;
                    self.newItems.push(new ItemModel(item.order, nts.uk.util.randomId(), item.code, item.targetItem, item.name, item.order, item.menu_cls, item.system, item.displayOrder, item.webMenuSetting, item.menu_cls));
                }
            });
            _.forEach(self.newItems(), (x, index) => {
                x.index = index + 1;
                x.order = index;
            });
            self.newItems(_.orderBy(self.newItems(), ['order'], ['asc']));
            self.currentCodeList([]);
            self.disableSwapButton();
        }

        /**
         * Remove items selected in right grid list
         */
        remove(): void {
            var self = this;
            var newItems = self.newItems();
            var items = [];
            _.remove(newItems, function (currentObject: ItemModel) {
                return _.indexOf(self.newCurrentCodeList(), currentObject.primaryKey) !== -1;
            });

            self.newItems([]);
            _.forEach(newItems, function (item) {
                item.order = self.newItems().length + 1;
                self.newItems.push(item);
            });
            self.newItems(_.orderBy(self.newItems(), ['order'], ['asc']));
            _.forEach(self.newItems(), (x, index) => {
                x.index = index + 1;
            });
            self.newCurrentCodeList([]);
            self.disableSwapButton();
        }

        /**
         * Pass data to main screen
         * Close the popup
         */
        submit() {
            const vm = this;
            let index = 1;

            vm.$validate().then((valid: boolean) => {
                if (!valid) {
                    return;
                }

                _.each(vm.newItems(), (item) => {
                    item.order = index;
                    item.displayOrder = index;
                    index++;
                });
    
                if (vm.titleMenuId()) {
                    nts.uk.ui.windows.setShared("CCG013C_TEXT_COLOR", vm.letterColor());
                    nts.uk.ui.windows.setShared("CCG013C_BACKGROUND_COLOR", vm.backgroundColor());
                    nts.uk.ui.windows.setShared("CCG013C_TITLE_MENU_NAME", vm.nameTitleBar());
                } else {
                    let titleBar = new TitleBar(vm.nameTitleBar(), vm.letterColor(),
                        vm.backgroundColor(), vm.newItems());
                    nts.uk.ui.windows.setShared("CCG013C_TitleBar", titleBar);
                }
                nts.uk.ui.windows.setShared("CCG013C_MENUS", vm.newItems());
                nts.uk.ui.windows.close();
            });
        }

        /**
         * Click on button d1_26
         * Close the popup
         */
        closeDialog() {
            var self = this;
            nts.uk.ui.windows.close();
        }

        removeTitleBar() {
            var self = this;
            nts.uk.ui.windows.setShared("CCG013C_MENUS_ID", self.titleMenuId());
            nts.uk.ui.windows.close();
        }
    }

    export class TitleBar {
        nameTitleBar: string;
        letterColor: string;
        backgroundColor: string;
        treeMenu: any[]

        constructor(nameTitleBar: string, letterColor: string, backgroundColor: string, treeMenu: any[]) {
            this.nameTitleBar = nameTitleBar;
            this.letterColor = letterColor;
            this.backgroundColor = backgroundColor;
            this.treeMenu = treeMenu;
        }
    }

    export class ItemModel {
        index: number;
        primaryKey: string;
        code: string;
        targetItem: string;
        name: string;
        order: number;
        menu_cls: number;
        system: number;
        displayOrder: number;
        webMenuSetting: number
        classification: number;

        constructor(index: number, id: string, code: string, targetItem: string, name: string, order: number, menu_cls: number, system: number, displayOrder: number, webMenuSetting: number, classification: number) {
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
    }

    export class SystemModel {
        systemCode: number;
        systemName: string;

        constructor(systemCode: number, systemName: string) {
            this.systemCode = systemCode;
            this.systemName = systemName;
        }
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

    export class TitleMenu {
        menuBarId: KnockoutObservable<string>;
        titleMenuId: KnockoutObservable<string>;
        titleMenuName: KnockoutObservable<string>;
        backgroundColor: KnockoutObservable<string>;
        imageFile: KnockoutObservable<string>;
        textColor: KnockoutObservable<string>;
        titleMenuAtr: KnockoutObservable<number>;
        titleMenuCode: KnockoutObservable<string>;
        displayOrder: KnockoutObservable<number>;
        treeMenu: KnockoutObservableArray<TreeMenu>;
        imageName: KnockoutObservable<string>;
        imageSize: KnockoutObservable<string>;

        constructor(param: ITitleMenu) {
            this.menuBarId = ko.observable(param.menuBarId);
            this.titleMenuId = ko.observable(param.titleMenuId);
            this.titleMenuName = ko.observable(param.titleMenuName || '');
            this.backgroundColor = ko.observable(param.backgroundColor);
            this.imageFile = ko.observable(param.imageFile);
            this.textColor = ko.observable(param.textColor);
            this.titleMenuAtr = ko.observable(param.titleMenuAtr);
            this.titleMenuCode = ko.observable(param.titleMenuCode);
            this.displayOrder = ko.observable(param.displayOrder);
            this.treeMenu = ko.observableArray(_.orderBy(param.treeMenu, 'displayOrder', 'asc').map(x => {
                let name = _.find(param.menuNames, c => c.code == x.code && c.system == x.system && c.classification == x.classification);
                x.name = name && name.displayName;
                return new TreeMenu(x);
            }));
            this.imageName = ko.observable(param.imageName);
            this.imageSize = ko.observable(param.imageSize);
        }
    }

    export interface ITitleMenu {
        menuBarId: string;
        titleMenuId: string;
        titleMenuName?: string;
        backgroundColor: string;
        imageFile: string;
        textColor: string;
        titleMenuAtr: number;
        titleMenuCode: string;
        displayOrder: number;
        treeMenu: Array<ITreeMenu>;
        menuNames?: Array<any>;
        imageName?: string;
        imageSize?: string;
    }

    export interface ITreeMenu {
        titleMenuId: string;
        code: string;
        name?: string;
        displayOrder: number;
        classification: number;
        system: number;
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