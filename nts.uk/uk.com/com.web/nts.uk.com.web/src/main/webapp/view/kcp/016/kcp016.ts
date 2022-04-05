module nts.uk.com.view.kcp016.a.viewmodel {

    const PATH = {
        getList: "screen/at/ksm008/alarm_contidion/list"
    };

    const template = `
    <div id="kcp016-component" 
        class="panel" 
        style="display: inline-block;" 
        data-bind="css: {
            ntsPanel: !onDialog(), 
            'caret-right': !onDialog(), 
            'caret-background': !onDialog()
        }">
            <table id="single-list" 
                data-bind="ntsGridList: {
                    name: $i18n('KCP016_2'),								
                    rows: rows(),
                    dataSource: items,
                    primaryKey: 'code',
                    columns: columns,
                    multiple: multiple(),
                    value: value
                }"/>
    </div>
    `;

    @component({
        name: 'kcp016-component',
        template: template
    })
    class ViewModel extends ko.ViewModel {
        columns: KnockoutObservableArray<any>;
        multiple: KnockoutObservable<boolean>;
        onDialog: KnockoutObservable<boolean>;
        selectType: KnockoutObservable<SelectType>;
        rows: KnockoutObservable<number>;
        showNoSelectionItem: boolean = false;

        items: KnockoutObservableArray<any> = ko.observableArray([]);
        value: KnockoutObservable<string> | KnockoutObservableArray<string>;
        tabindex: number;

        created(params: Params) {
            const vm = this;
            if (params) {
                vm.multiple = ko.observable(!!params.multiple);
                vm.onDialog = ko.observable(!!params.onDialog);
                vm.selectType = ko.observable(params.selectType);
                vm.rows = ko.observable(params.rows || 10);
                vm.value = params.selectedValue;
                vm.tabindex = params.tabindex;
                vm.showNoSelectionItem = params.showNoSelectionItem;
            } else {
                vm.multiple = ko.observable(false);
                vm.onDialog = ko.observable(false);
                vm.value = ko.observable(null);
                vm.selectType = ko.observable(SelectType.NO_SELECT);
                vm.rows = ko.observable(10);
            }
            vm.columns = ko.observableArray([
                { headerText: vm.$i18n("KCP016_3"), key: 'code', width: 70 },
                { headerText: vm.$i18n("KCP016_4"), key: 'name', width: 200 },
            ]);
        }

        mounted() {
            const vm = this;
            vm.$blockui("show").then(() => {
                return vm.$ajax("at", PATH.getList);
            }).done(data => {
                vm.items(data.map((i: any) => ({code: i.code, name: i.name})));
                if (vm.multiple()) {
                    if (vm.selectType() == SelectType.SELECT_ALL) (vm.value as KnockoutObservableArray<string>)(data.map((i: any) => i.code));
                    else if (vm.selectType() == SelectType.SELECT_FIRST_ITEM && !_.isEmpty(data)) (vm.value as KnockoutObservableArray<string>)([data[0].code]);
                    else if (vm.selectType() == SelectType.NO_SELECT) (vm.value as KnockoutObservableArray<string>)([]);
                } else {
                    if (vm.selectType() == SelectType.SELECT_FIRST_ITEM && !_.isEmpty(data)) (vm.value as KnockoutObservable<string>)(data[0].code);
                    else if (vm.selectType() == SelectType.NO_SELECT) (vm.value as KnockoutObservable<string>)(null);
                    if (vm.showNoSelectionItem) {
                        vm.items.unshift({ code: null, name: nts.uk.resource.getText('KCP001_5')});
                    }
                }
            }).fail(error => {
                vm.$dialog.error(error);
            }).always(() => {
                vm.$blockui("hide");
                if (_.isNumber(vm.tabindex)) $("#kcp016-component #single-list_container").attr('tabindex', 1);
            });
        }
    }

    interface Params {
        onDialog?: boolean; // default: false
        multiple?: boolean; // default: false
        selectType?: SelectType; // default: 4 (NO_SELECT)
        rows?: number; // default: 10
        selectedValue: KnockoutObservable<string> | KnockoutObservableArray<string>;
        tabindex?: number;
        showNoSelectionItem?: boolean;
    }

    class SelectType {
        static SELECT_BY_SELECTED_CODE = 1;
        static SELECT_ALL = 2;
        static SELECT_FIRST_ITEM = 3;
        static NO_SELECT = 4;
    }

}