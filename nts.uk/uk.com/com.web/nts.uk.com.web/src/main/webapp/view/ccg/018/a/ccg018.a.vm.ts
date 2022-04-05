/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />

module ccg018.a.viewmodel {

    @bean()
    export class ScreenModel extends ko.ViewModel {
        title: KnockoutObservable<string> = ko.observable('');
        tabs: KnockoutObservableArray<TabModel> = ko.observableArray([]);
        currentTab: KnockoutObservable<TabModel> = ko.observable(null);
        baseModel: base.result.BaseResultModel;

        created(params: any) {
            const vm = this;
            vm.baseModel = new base.result.BaseResultModel();
            vm.tabs([
                new TabModel({ id: 'a1', name: vm.$i18n('CCG018_45'), active: true, display: true, templateUrl: "jobtitle-template" }),
                new TabModel({ id: 'b', name: vm.$i18n('CCG018_2'), display: true, templateUrl: "person-template" }),
            ]);
        }

        mounted() {
            const vm = this;
            // show active tab panel
            vm.$blockui('grayout');
            $.when(vm.findBySystemMenuCls(), vm.findDataForAfterLoginDis())
                .then(() => {
                    vm.changeTab(vm.tabs()[0]);
                    $('.navigator li a.active').trigger('click');
                })
                .always(() => vm.$blockui('clear'));
        }

        changeTab(tab: TabModel): any {
            const vm = this;
            tab.active(true);
            vm.currentTab(tab);
            vm.title(tab.name());
            vm.tabs().map(t => (t.id() != tab.id()) && t.active(false));

            // Clean binding area.
            const resultArea = $(".screen-content");
            resultArea.html("");
            // call start function on view at here
            switch (tab.id()) {
                case 'a1':
                    const viewmodelA1 = new ccg018.a1.viewmodel.ScreenModel(vm.baseModel);
                    $(resultArea).load(viewmodelA1.screenTemplateUrl(), () => {
                        ko.applyBindings(viewmodelA1, resultArea.children().get(0));
                        ko.applyBindings(viewmodelA1, resultArea.children().get(1));
                        viewmodelA1.start();
                    });
                    break;
                case 'b':
                    vm.findByCId().then(() => {
                        const viewmodelB = new ccg018.b.viewmodel.ScreenModel(vm.baseModel);
                        $(resultArea).load(viewmodelB.screenTemplateUrl(), () => {
                            // viewmodelB.start().done(function() {
                            ko.applyBindings(viewmodelB, resultArea.children().get(0));
                            ko.applyBindings(viewmodelB, resultArea.children().get(1));
                            _.defer(() => {
                                viewmodelB.bindGrid();
                                viewmodelB.initCCG001();
                            });
                        });
                    });
                    break;
            }
        }

        /**
         * find data in table STANDARD_MENU with companyId and
         * afterLoginDisplay = 1 (display)  or System = 0(common) and MenuClassification = 8(top page)
         */
        findDataForAfterLoginDis(): JQueryPromise<any> {
            const vm = this;
            const dfd = $.Deferred();
            vm.baseModel.comboItemsAfterLogin = [];
            service.findDataForAfterLoginDis()
                .then((data) => {
                    const newComboBox = [];
                    newComboBox.push(new ComboBox({
                        code: '',
                        name: '未設定',
                        system: 0,
                        menuCls: 0
                    }));
                    _.forEach(data, (x) => {
                        newComboBox.push(new ComboBox({
                            code: x.code,
                            name: x.displayName,
                            system: x.system,
                            menuCls: x.classification
                        }));
                    });
                    vm.baseModel.comboItemsAfterLogin = newComboBox;
                    dfd.resolve();
                })
                .fail(() => dfd.reject());
            return dfd.promise();
        }

        /**
         * Find data in table STANDARD_MENU base on CompanyId and System = 0(common) and MenuClassification = 8(top page)
         * Return array comboItemsAsTopPage
         */
        findBySystemMenuCls(): JQueryPromise<any> {
            const vm = this;
            const dfd = $.Deferred();
            vm.baseModel.comboItemsAsTopPage = [];
            service.findBySystemMenuCls()
                .then((data) => {
                    if (data.length >= 0) {
                        const newComboBox = [];
                        newComboBox.push(new ComboBox({
                            code: '',
                            name: '未設定',
                            system: 0,
                            menuCls: 0
                        }));
                        _.forEach(data, (x) => {
                            newComboBox.push(new ComboBox({
                                code: x.code,
                                name: x.displayName,
                                system: x.system,
                                menuCls: x.classification
                            }));
                        });
                        vm.baseModel.comboItemsAsTopPage = newComboBox;
                    }
                    dfd.resolve();
                })
                .fail(() => dfd.reject());
            return dfd.promise();
        }

        /**
         * get categorySet in DB TOPPAGE_SET base on companyId
         */
        findByCId(): JQueryPromise<any> {
            const vm = this;
            const dfd = $.Deferred();
            service.findByCId()
                .then((data) => {
                    if (!(!!data)) {
                        vm.baseModel.categorySet = null;
                    } else {
                        vm.baseModel.categorySet = data.ctgSet;
                    }
                    dfd.resolve();
                }).fail(() => dfd.reject());
            return dfd.promise();
        }
    }

    class TabModel {
        id: KnockoutObservable<string>;
        name: KnockoutObservable<string>;
        active: KnockoutObservable<boolean>;
        display: KnockoutObservable<boolean>;
        templateUrl: KnockoutObservable<string>;

        constructor(param: any) {
            this.id = ko.observable(param.id);
            this.name = ko.observable(param.name);
            this.active = ko.observable(param.active || false);
            this.display = ko.observable(param.display || false);
            this.templateUrl = ko.observable(param.templateUrl);
        }
    }

    interface IComboBox {
        code: string;
        name: string;
        system: number;
        menuCls: number;
        uniqueCode?: string;
    }

    class ComboBox {
        code: string;
        name: string;
        system: number;
        menuCls: number;
        uniqueCode: string;

        constructor(param: IComboBox) {
            this.code = param.code;
            this.name = param.name;
            this.system = param.system;
            this.menuCls = param.menuCls;
            this.uniqueCode = nts.uk.text.format("{0}{1}{2}", param.code, param.system, param.menuCls);
        }
    }
}