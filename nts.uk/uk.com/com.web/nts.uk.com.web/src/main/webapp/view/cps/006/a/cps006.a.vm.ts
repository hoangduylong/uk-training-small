module nts.uk.com.view.cps006.a.viewmodel {
    import error = nts.uk.ui.errors;
    import text = nts.uk.resource.getText;
    import close = nts.uk.ui.windows.close;
    import dialog = nts.uk.ui.dialog;
    import getShared = nts.uk.ui.windows.getShared;
    import setShared = nts.uk.ui.windows.setShared;
    import block = nts.uk.ui.block;
    export class ScreenModel {
        id: KnockoutObservable<string> = ko.observable('');
        ctgColums: KnockoutObservableArray<any> = ko.observableArray([
            { headerText: 'id', key: 'id', width: 100, hidden: true },
            { headerText: text('CPS006_6'), key: 'categoryName', width: 230, formatter: _.escape },
            {
                headerText: text('CPS006_7'), key: 'isAbolition', width: 50,
                formatter: makeIcon
            }
        ]);
        langId: KnockoutObservable<string> = ko.observable('ja');
        categoryList: KnockoutObservableArray<any> = ko.observableArray([]);
        categorySourceLst: KnockoutObservableArray<any> = ko.observableArray([]);
        currentCategory: KnockoutObservable<CategoryInfoDetail> = ko.observable((new CategoryInfoDetail({
            id: '', categoryNameDefault: '',
            categoryName: '', categoryType: 4, isAbolition: "",
            personEmployeeType: 0, itemList: []
        })));
        // nếu sử dụng thì bằng true và ngược lại __viewContext["viewModel"].currentCategory().personEmployeeType
        isAbolished: KnockoutObservable<boolean> = ko.observable(false);

        isFiltered: boolean = false;
        ctgLstFilter: Array<any> = [];

        constructor() {
            let self = this;
            self.start(undefined);
            
            self.id.subscribe(function(value) {
                $('#ctgName').focus();
                nts.uk.ui.errors.clearAll();
                if (nts.uk.text.isNullOrEmpty(value)) return;
                self.getDetailCategory(value);
            });
            
            self.isAbolished.subscribe(function(value) {
                nts.uk.ui.errors.clearAll();
                if (value) {
                    if (!self.isFiltered) {
                        self.categoryList.removeAll();
                        service.getAllCategory().done(function(data: Array<any>) {
                            if (data.length > 0) {
                                self.categoryList(_.map(data, x => new CategoryInfo({
                                    id: x.id,
                                    categoryCode: x.categoryCode,
                                    categoryName: x.categoryName,
                                    categoryType: x.categoryType,
                                    isAbolition: x.isAbolition
                                })));
                                $("#category_grid").igGrid("option", "dataSource", self.categoryList());
                                self.id(self.categoryList()[0].id);
                            }
                        });
                    } else {

                        service.getAllCategory().done(function(data: Array<any>) {
                            if (data.length > 0) {
                                self.categoryList(data);
                                $("#category_grid").igGrid("option", "dataSource", self.categoryList());
                                $('.search-btn').trigger('click');
                            }
                        });

                        $("#category_grid").igGrid("option", "dataSource", self.ctgLstFilter);
                    }

                } else {
                    if (self.isFiltered) {
                        $("#category_grid").igGrid("option", "dataSource", _.filter(self.ctgLstFilter, x => { return x.isAbolition == 0 }));

                    } else {
                        let oldlst: Array<any> = _.map(ko.toJS(self.categoryList), x => x);

                        self.categoryList.removeAll();
                        service.getAllCategory().done(function(data: Array<any>) {
                            if (data.length > 0) {
                                self.categoryList(_.map(_.filter(data, x => { return x.isAbolition == 0 }), x => new CategoryInfo({
                                    id: x.id,
                                    categoryCode: x.categoryCode,
                                    categoryName: x.categoryName,
                                    categoryType: x.categoryType,
                                    isAbolition: x.isAbolition
                                })));
                                let category = _.find(self.categoryList(), x => { return x.id == self.currentCategory().id() });
                                if (category === undefined) {
                                    let oldIndex = oldlst.indexOf(_.find(oldlst, x => { return x.id == self.currentCategory().id() }));
                                    for (var i = oldIndex; i >= 0; i--) {
                                        let curCtg = oldlst[i];
                                        let newctg = _.find(self.categoryList(), x => { return x.id == curCtg.id })
                                        if (newctg != undefined) {
                                            self.currentCategory().id(newctg.id);
                                            break;
                                        }
                                    }
                                }
                                $("#category_grid").igGrid("option", "dataSource", self.categoryList());
                                self.id(self.categoryList()[0].id);
                            }
                        });

                    }

                }

            });

        }

        private exportExcel(domainId: string) {
            var self = this;
            nts.uk.ui.block.grayout();
            let program = nts.uk.ui._viewModel.kiban.programName().split(" ");
            let domainType = "CPS006";
            if (program.length > 1){
                program.shift();
                domainType = domainType + program.join(" ");
            }
            service.exportExcel(self.langId(), domainId, domainType)
                .fail(function(res) {
                    nts.uk.ui.dialog.alertError(res);
                }).always(function() {
                    nts.uk.ui.block.clear();
                });
        }
        
        getDetailCategory(id: string) {
            let self = this;
            service.getDetailCtgInfo(id).done(function(data: any) {
                nts.uk.ui.errors.clearAll();
                if (data) {
                    self.currentCategory().setData({
                        categoryNameDefault: data.categoryNameDefault, categoryName: data.categoryName,
                        categoryType: data.categoryType, isAbolition: data.abolition,
                        personEmployeeType: data.personEmployeeType, itemList: data.itemLst
                    }, data.canAbolition, data.isExistedItemLst);
//                    if (data.itemLst.length > 0) {
//                        self.currentCategory().currentItemId(data.itemLst[0].id);
//                    }
                }
            });
        }

        start(id: string): JQueryPromise<any> {
            let self = this,
                dfd = $.Deferred();
            self.categoryList.removeAll();
            if (self.isAbolished()) {
                service.getAllCategory().done(function(data: Array<any>) {
                    if (data.length > 0) {
                        self.categoryList(_.map(data, x => new CategoryInfo({
                            id: x.id,
                            categoryCode: x.categoryCode,
                            categoryName: x.categoryName,
                            categoryType: x.categoryType,
                            isAbolition: x.isAbolition,
                        })));

                        self.categorySourceLst(_.map(data, x => new CategoryInfo({
                            id: x.id,
                            categoryCode: x.categoryCode,
                            categoryName: x.categoryName,
                            categoryType: x.categoryType,
                            isAbolition: x.isAbolition
                        })));

                        if (id === undefined) {
                            self.id(self.categoryList()[0].id);
                        } else {
                            self.id(id);
                        }

                    } else {

                        dialog.alertError({ messageId: 'Msg_291' });

                    }
                    dfd.resolve();
                });
            } else {
                service.getAllCategory().done(function(data: Array<any>) {
                    if (data.length > 0) {
                        self.categoryList(_.map(_.filter(data, x => { return x.isAbolition == 0 }), x => new CategoryInfo({
                            id: x.id,
                            categoryCode: x.categoryCode,
                            categoryName: x.categoryName,
                            categoryType: x.categoryType,
                            isAbolition: x.isAbolition
                        })));
                        self.categorySourceLst(_.map(data, x => new CategoryInfo({
                            id: x.id,
                            categoryCode: x.categoryCode,
                            categoryName: x.categoryName,
                            categoryType: x.categoryType,
                            isAbolition: x.isAbolition
                        })));

                        if (id === undefined) {
                            self.id(self.categoryList()[0].id);
                        } else {
                            self.id(id);
                        }

                    } else {

                        dialog.alertError({ messageId: 'Msg_291' });

                    }
                    dfd.resolve();
                });

            }


            return dfd.promise();
        }

        reload(id: string, index: any): JQueryPromise<any> {
            let self = this,
                dfd = $.Deferred();
            self.categoryList.removeAll();
            if (self.isAbolished()) {
                service.getAllCategory().done(function(data: Array<any>) {
                    if (data.length > 0) {
                        self.categoryList(_.map(data, x => new CategoryInfo({
                            id: x.id,
                            categoryCode: x.categoryCode,
                            categoryName: x.categoryName,
                            categoryType: x.categoryType,
                            isAbolition: x.isAbolition,
                        })));

                        self.categorySourceLst(_.map(data, x => new CategoryInfo({
                            id: x.id,
                            categoryCode: x.categoryCode,
                            categoryName: x.categoryName,
                            categoryType: x.categoryType,
                            isAbolition: x.isAbolition
                        })));

                        let categoryOld = _.filter(self.categoryList(), function(cate: any) { return cate.id == id });

                        if (categoryOld.length == 0) {
                            if (self.categoryList().length > index) {
                                self.id(self.categoryList()[index].id);
                            } else if (self.categoryList().length === 0) {
                                self.id(self.categoryList()[0].id);
                            } else if (self.categoryList().length > index) {
                                self.id(self.categoryList()[self.categoryList().length - 1]);
                            }
                        } else if (categoryOld.length > 0) {
                            self.id(categoryOld[0].id);
                        }

                    } else {

                        dialog.alertError({ messageId: 'Msg_291' });

                    }
                    dfd.resolve();
                });
            } else {
                service.getAllCategory().done(function(data: Array<any>) {
                    if (data.length > 0) {
                        self.categoryList(_.map(_.filter(data, x => { return x.isAbolition == 0 }), x => new CategoryInfo({
                            id: x.id,
                            categoryCode: x.categoryCode,
                            categoryName: x.categoryName,
                            categoryType: x.categoryType,
                            isAbolition: x.isAbolition
                        })));
                        self.categorySourceLst(_.map(data, x => new CategoryInfo({
                            id: x.id,
                            categoryCode: x.categoryCode,
                            categoryName: x.categoryName,
                            categoryType: x.categoryType,
                            isAbolition: x.isAbolition
                        })));

                        let categoryOld = _.filter(self.categoryList(), function(cate: any) { return cate.id == id });

                        if (categoryOld.length == 0) {
                            if (self.categoryList().length > index) {
                                self.id(self.categoryList()[index].id);
                            } else if (self.categoryList().length === 0) {
                                self.id(self.categoryList()[0].id);
                            } else if (self.categoryList().length > index) {
                                self.id(self.categoryList()[self.categoryList().length - 1]);
                            }
                        } else if (categoryOld.length > 0) {
                            self.id(categoryOld[0].id);
                        }

                    } else {

                        dialog.alertError({ messageId: 'Msg_291' });

                    }
                    dfd.resolve();
                });

            }


            return dfd.promise();
        }


        openBModal() {

            let self = this;
            setShared('categoryInfo', {
                id: self.id(),
                personEmployeeType: self.currentCategory().personEmployeeType
            });
            if (nts.uk.text.isNullOrEmpty(self.id())) {
                return;
            }
            block.invisible();
            nts.uk.ui.windows.sub.modal('/view/cps/006/b/index.xhtml', { title: '' }).onClosed(function(): any {
                self.getDetailCategory(self.id());
                block.clear();
            });
        }

        openCDL022Modal() {
            let self = this,
                cats = _.map(ko.toJS(self.categorySourceLst), (x: any) => { return { id: x.id, name: x.categoryName }; });
            block.invisible();
            setShared('CDL020_PARAMS', cats);
            nts.uk.ui.windows.sub.modal('/view/cdl/022/a/index.xhtml', { title: '' }).onClosed(function(): any {
                let CTGlist: Array<any> = getShared('CDL020_VALUES');
                if (CTGlist) {
                    let CTGsorrList = _.map(CTGlist, (x, i) => ({
                        id: x.id,
                        order: i + 1
                    }));
                    service.updateCtgOrder(CTGsorrList).done(function(data: Array<any>) {
                        self.start(self.id()).done(() => {
                            block.clear();
                        });
                    });
                }
                $('#ctgName').focus();
            });
        }

        registerCategoryInfo() {
            let self = this,
                cat = ko.toJS(self.currentCategory),
                command = {
                    categoryId: self.id(),
                    categoryName: cat.categoryName,
                    isAbolition: cat.isAbolition

                };
            block.grayout();
            service.updateCtgInfo(command).done(function(data) {
                dialog.info({ messageId: "Msg_15" }).then(function() {
                    let index = _.indexOf(_.map(self.categoryList(), function(obj) { return obj.id }), command.categoryId);
                    if (index >= 0) {
                        self.reload(command.categoryId, index);
                    }
                });
            }).fail(function(res: any) {
                if (res.messageId == "Msg_928") {
                    dialog.alertError({
                        messageId: res.messageId,
                        messageParams: ["個人情報カテゴリ"]
                    }).then(() => {
                        $('#ctgName').focus();
                    })
                } else {
                    dialog.alertError({ messageId: res.messageId });
                }
            }).always(() => {
                $('#ctgName').focus();
                block.clear();
            });

        }


    }
    export interface ICategoryInfo {
        id: string;
        categoryName: string;
        categoryCode: string;
        categoryType: number;
        isAbolition: number;
    }

    export class CategoryInfo {
        id: string;
        categoryCode: string;
        categoryName: string;
        categoryType: number;
        isAbolition: number;
        constructor(params: ICategoryInfo) {
            this.id = params.id;
            this.categoryName = params.categoryName;
            this.categoryCode = params.categoryCode;
            this.categoryType = params.categoryType;
            this.isAbolition = params.isAbolition;
        }

    }

    export interface IItemInfo {
        id: string;
        perInfoCtgId: string;
        itemName: string;
        systemRequired: number;
        isAbolition: string;
    }

    export class ItemInfo {
        id: string;
        perInfoCtgId: string;
        itemName: string;
        systemRequired: number;
        isAbolition: string;
        constructor(params: IItemInfo) {
            this.id = params.id;
            this.perInfoCtgId = params.perInfoCtgId;
            this.itemName = params.itemName;
            this.systemRequired = params.systemRequired;
            this.isAbolition = params.isAbolition;
        }
    }
    
    function makeIcon(value, row) {
        if (value == '1')
            return '<img src="images/checked.png" style="margin-left: 15px; width: 20px; height: 20px;" />';
        return '<span></span>';
    }

    export interface ICategoryInfoDetail {
        id: string;
        categoryNameDefault: string;
        categoryName: string;
        categoryType: number;
        isAbolition: string;
        canAbolition: boolean;
        personEmployeeType: number;
        itemList?: Array<any>;
    }

    export class CategoryInfoDetail {
        id: KnockoutObservable<string>;
        categoryNameDefault: KnockoutObservable<string>;
        categoryName: KnockoutObservable<string>;
        categoryType: KnockoutObservable<number>;
        isAbolition: KnockoutObservable<boolean>;
        canAbolition: KnockoutObservable<boolean>;
        personEmployeeType: number;
        isExistedItemLst: KnockoutObservable<number>;
        displayIsAbolished: KnockoutObservable<number> = ko.observable(0);
        itemList: KnockoutObservableArray<any>;
        currentItemId: KnockoutObservable<string> = ko.observable('');
        itemColums: KnockoutObservableArray<any> = ko.observableArray([
            { headerText: 'id', key: 'id', width: 100, hidden: true },
            { headerText: text('CPS006_16'), key: 'itemName', width: 250, formatter: _.escape},
            {
                headerText: text('CPS006_17'), key: 'isAbolition', width: 50,
                formatter: makeIcon, 
            }
        ]);
        constructor(params: ICategoryInfoDetail) {
            this.id = ko.observable("");
            this.categoryNameDefault = ko.observable(params.categoryNameDefault);
            this.categoryName = ko.observable(params.categoryName);
            this.categoryType = ko.observable(params.categoryType);
            this.isAbolition = ko.observable(false);
            this.canAbolition = ko.observable(params.canAbolition);
            this.itemList = ko.observableArray(params.itemList || []);
            this.personEmployeeType = params.personEmployeeType || 1;
            this.isExistedItemLst = ko.observable(0);
        }

        setData(params: any, displayIsAbolished: boolean, isExistedItemLst: number) {
            this.id(params.id);
            this.categoryNameDefault(params.categoryNameDefault);
            this.categoryName(params.categoryName);
            this.categoryType(params.categoryType);
            this.isAbolition(params.isAbolition);
            this.canAbolition(params.canAbolition);
            this.displayIsAbolished(displayIsAbolished == true ? 1 : 0);
            this.isExistedItemLst(isExistedItemLst);
            this.personEmployeeType = params.personEmployeeType;
            this.itemList(params.itemList);
        }
    }

}