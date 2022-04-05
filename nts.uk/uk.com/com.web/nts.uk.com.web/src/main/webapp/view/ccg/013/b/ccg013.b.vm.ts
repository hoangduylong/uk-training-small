module nts.uk.sys.view.ccg013.b.viewmodel {
    import windows = nts.uk.ui.windows;

    export class ScreenModel {
        //Text edittor
        nameMenuBar: KnockoutObservable<string>;
        //Combobox
        listSystemSelect: KnockoutObservableArray<any>;
        selectedCodeSystemSelect: KnockoutObservable<number>;
        //colorpicker
        letterColor: KnockoutObservable<string>;
        backgroundColor: KnockoutObservable<string>;
        //Radio button
        itemRadioAtcClass: KnockoutObservableArray<any>;
        selectedRadioAtcClass: KnockoutObservable<number>;
        //GridList
        allPart: KnockoutObservableArray<any>;
        listStandardMenu: KnockoutObservableArray<any>;
        columns: KnockoutObservableArray<any>;
        selectedStandardMenuKey: KnockoutObservable<any>;
        textOption: KnockoutObservable<nts.uk.ui.option.TextEditorOption>;

        constructor() {
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
            self.selectedCodeSystemSelect.subscribe((value) => { self.changeSystem(value); });
            self.selectedRadioAtcClass.subscribe(function(value) {
                if (value == 0) {
                    self.selectedStandardMenuKey('');
                }
            });
        }

        startPage(): JQueryPromise<any> {
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
            service.getEditMenuBar().done(function(editMenuBar: service.EditMenuBarDto) {
                self.itemRadioAtcClass(editMenuBar.listSelectedAtr);
                const item1: any[] = [];
                item1.push(new EnumConstant(5, nts.uk.resource.getText("CCG013_137"), nts.uk.resource.getText("CCG013_137")));
                _.forEach(editMenuBar.listSystem, x => {
                    item1.push(x);
                })
                self.listSystemSelect(item1.filter(x => x.value !== System.OFFICE_HELPER));
                _.forEach(editMenuBar.listStandardMenu, (item, index) => {
                    self.allPart.push(new MenuBarDto(
                        index,
                        item.afterLoginDisplay,
                        item.classification,
                        item.code,
                        item.companyId,
                        item.displayName,
                        item.displayOrder,
                        item.logSettingDisplay,
                        item.menuAtr,
                        item.system,
                        item.targetItems,
                        item.url,
                        item.webMenuSetting
                    ));
                });
                self.selectedCodeSystemSelect(5);
                self.selectedRadioAtcClass(editMenuBar.listSelectedAtr[0].value);
                dfd.resolve();
            }).fail(function(error) {
                dfd.reject();
                alert(error.message);
            }).always(() => {
                $('#B1_3').focus();
            });

            $('.content-search')
            .on('click', '.search-btn', () => {
                const $grid = $('#multi-list');

                // Lay danh sach cac item duoc bind vao grid
                const items = $grid.igGrid('option', 'dataSource');

                // neu co item
                if (items && items.length) {
                    // lay ra item dau tien
                    const [first] = items;

                    // neu ton tai item dau tien
                    if (first) {
                        // lay ra khoa chinh
                        const { uniqueCode } = first;

                        if (uniqueCode) {
                            // gan khoa chinh vao danh sach selected
                            self.selectedStandardMenuKey(uniqueCode);
                        }
                    }
                }
            });

            return dfd.promise();
        }

        cancel_Dialog(): any {
            nts.uk.ui.errors.clearAll();
            nts.uk.ui.windows.close();
        }

        submit() {
            var self = this;
            $(".ntsColorPicker_Container").trigger("validate");
            var menuCls = null;
            var code = null;
            var name = null;

            validateNameInput($(".menu-bar-name"), '#[CCG013_18]', self.nameMenuBar().trim(), 'MenuBarName');

            if (nts.uk.ui.errors.hasError()) {
                return;
            }
            var standMenu = _.find(self.listStandardMenu(), function(item: MenuBarDto) {
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
                } else {
                    var textMsg218 = nts.uk.resource.getMessage("Msg_218",[nts.uk.resource.getText("CCG013_105")]);
                    nts.uk.ui.dialog.alertError(textMsg218);
                    return;
                }
            } else {
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
        }

        /** Select by Index: Start & Delete case */
        private selectStandardMenuByIndex(index: number) {
            var self = this;
            var selectStdMenuByIndex = _.nth(self.listStandardMenu(), index);
            if (selectStdMenuByIndex !== undefined)
                self.selectedStandardMenuKey(selectStdMenuByIndex.uniqueCode);
            else
                self.selectedStandardMenuKey(null);
        }

        private changeSystem(value: number): void {
            const self = this;
            const newAllPart = _.orderBy(self.allPart(), ['system', 'displayOrder', 'code'], ['asc', 'asc', 'asc']);
            let list001 = [];
            const list002 = _.chain(newAllPart)
                .filter(item =>
                    item.system === System.COMMON &&
                    item.classification === MenuClassification.TopPage
                )
                .value();
            if (value === System.ALL) {
                list001 = _.chain(newAllPart)
                    .filter(item =>
                        item.classification !== MenuClassification.TopPage &&
                        item.classification !== MenuClassification.OfficeHelper
                    )
                    .value();
            } else {
                list001 = _.chain(newAllPart)
                    .filter(item =>
                        item.system === value &&
                        item.classification !== MenuClassification.TopPage &&
                        item.classification !== MenuClassification.OfficeHelper
                    )
                    .value();
            }
            const listStandardMenu = _.concat(list001, list002);
            self.listStandardMenu(listStandardMenu);
        }
    }

    enum MenuAtr {
        Menu = 0,
        SeparatorLine = 1
    }

    enum WebMenuSetting {
        Notdisplay = 0,
        Display = 1
    }

    enum MenuClassification {
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

    enum System {
        COMMON = 0,
        TIME_SHEET = 1,
        OFFICE_HELPER = 2,
        KYUYOU = 3,
        JINJIROU= 4,
        ALL = 5
    }

    interface IMenuBar {
        code: string;
        nameMenuBar: string;
        letterColor: string;
        backgroundColor: string;
        selectedRadioAtcClass: number;
        system: number;
        menuCls: number;
    }

    class MenuBar {
        code: string;
        nameMenuBar: string;
        letterColor: string;
        backgroundColor: string;
        selectedRadioAtcClass: number;
        system: number;
        menuCls: number;
        uniqueCode: string;

        constructor(param: IMenuBar) {
            this.code = param.code;
            this.nameMenuBar = param.nameMenuBar;
            this.letterColor = param.letterColor;
            this.backgroundColor = param.backgroundColor;
            this.selectedRadioAtcClass = param.selectedRadioAtcClass;
            this.system = param.system;
            this.menuCls = param.menuCls;
            this.uniqueCode = this.code + this.system + this.menuCls;
        }
    }

    class MenuBarDto {
        index: number;
        afterLoginDisplay: number;
        classification: number;
        code: string;
        companyId: string;
        displayName: string;
        displayOrder: number;
        logSettingDisplay: number;
        menuAtr: number;
        system: number;
        targetItems: string;
        url: string;
        webMenuSetting: number;
        uniqueCode: string;

        constructor(index: number, afterLoginDisplay: number, classification: number, code: string, companyId: string, displayName: string, displayOrder: number, logSettingDisplay: number, menuAtr: number, system: number, targetItems: string, url: string, webMenuSetting: number) {
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
    }

    export class EnumConstant {
        value: number;
        fieldName: string;
        localizedName: string;
        constructor(value: number, fieldName: string, localizedName: string) {
            this.value = value;
            this.fieldName = fieldName;
            this.localizedName = localizedName;
        }
    }
}