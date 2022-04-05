module nts.uk.com.view.kcp011.share {
    const GET_WORKPLACE_URL = "bs/schedule/employeeinfo/workplacegroup/getAll";
    const SELECTED_MODE = {
        NONE: 0,
        FIRST: 1,
        ALL: 2,
        SELECT_ID: 3
    };
    const NASHI_CODE = '     ';
    export class WorkplaceGroupComponent {

        workplaceGroups: KnockoutObservableArray<WorkplaceGroup> = ko.observableArray([]);
        columns: KnockoutObservableArray<any> = ko.observableArray([]);
        setting: KnockoutObservable<Option> = ko.observable({});
        constructor(params: Option) {
            let self = this;
            self.setting(params.options);
            
            if(self.setting().showPanel === undefined) {
                self.setting().showPanel = true;
            }

            let widthCal = self.calculateWidth();
            self.columns([
                { headerText: '', prop: 'id', width: 100, hidden: true },
                { headerText: nts.uk.resource.getText("KCP011_2"), prop: 'code', width: widthCal.codeWidth },
                { headerText: nts.uk.resource.getText("KCP011_3"), prop: 'name', width: widthCal.nameWidth, formatter: _.escape },
                {
                    headerText: nts.uk.resource.getText("KCP011_4"), prop: 'configured', width: widthCal.alreadySettingWidth, hidden: !self.setting().isAlreadySetting,
                    template: '{{if ${configured} == 1 }}<div class="cssDiv"><i  class="icon icon icon-78 cssI"></i></div>{{/if}}'
                }
            ]);

            let setting = self.setting();
            setting.currentIds.subscribe((ids) => {
                if (self.setting().currentCodes) {
                    if (self.setting().multiple) {
                        let selecteds = _.filter(self.workplaceGroups(), (wkp) => {
                            let exist = _.filter(ids, (id) => { return id === wkp.id; });
                            return exist && exist.length > 0;
                        });

                        if (setting.currentCodes) {
                            setting.currentCodes(_.map(selecteds, (wkp) => { return wkp.code; }));
                        }
                        if (setting.currentNames) {
                            setting.currentNames(_.map(selecteds, (wkp) => { return wkp.name; }));
                        }
                    } else {
                        let selected = _.find(self.workplaceGroups(), (wkp) => {
                            return ids === wkp.id;
                        });
                        if (setting.currentCodes && selected) {
                            setting.currentCodes(selected.code);
                        }
                        if (setting.currentNames && selected) {
                            setting.currentNames(selected.name);
                        }
                    }
                }
            });

            if (setting.reloadData) {
                setting.reloadData.subscribe(() => {
                    self.loadData();
                });
            }

            if (setting.isAlreadySetting && setting.alreadySettingList) {
                setting.alreadySettingList.subscribe((values) => {
                    let workplaceGs = self.workplaceGroups();
                    workplaceGs.forEach((workplace) => {
                        let isSetting = _.find(values, (settingId) => { return settingId == workplace.id });
                        workplace.configured = isSetting ? 1 : null;
                    });
                    self.workplaceGroups(workplaceGs);
                });
            }

            self.loadData().done(() => {
                let selectedMode = setting.selectedMode;
                if (selectedMode == SELECTED_MODE.NONE) {
                    setting.currentIds([]);
                } else if (selectedMode == SELECTED_MODE.FIRST) {
                    // show empty item will not select the empty one
                    let idx = setting.showEmptyItem ? 1 : 0;
                    if(setting.multiple) {
                        setting.currentIds(self.workplaceGroups()[idx] ? [self.workplaceGroups()[idx].id] : []);
                    } else {
                        setting.currentIds(self.workplaceGroups()[idx] ? self.workplaceGroups()[idx].id : null);
                    }
                } else if (selectedMode == SELECTED_MODE.ALL) {
                    let notNashi = _.filter(self.workplaceGroups(), (val) => { return val.code != NASHI_CODE; });
                    setting.currentIds(_.map(notNashi, (wkp) => { return wkp.id }));
                } else if (selectedMode == SELECTED_MODE.SELECT_ID) {
                    if(self.setting().alreadySettingList) 
                        {
                        let wpl = _.filter(self.workplaceGroups(), (val) => { return val.id == setting.alreadySettingList()[0]; });
                        setting.currentIds(_.map(wpl, (wkp) => { return wkp.id }));                        
                        }
                }
            });
            
        }

        loadData() {
            let self = this;
            let dfd = $.Deferred();

            nts.uk.ui.block.grayout();
            nts.uk.request.ajax("com", GET_WORKPLACE_URL).done((res) => {
                let workplaces = _.orderBy(res.workplaces, ['code'], ['asc']);
                if (self.setting().showEmptyItem) {
                    workplaces.unshift({ id: Math.random(), code: NASHI_CODE, name: nts.uk.resource.getText("KCP011_5"), configured: null });
                }
                if (self.setting().isAlreadySetting && self.setting().alreadySettingList) {
                    workplaces.forEach((workplace) => {
                        let isSetting = _.find(self.setting().alreadySettingList(), (settingId) => { return settingId == workplace.id });
                        workplace.configured = isSetting ? 1 : null;
                    });
                }
                self.workplaceGroups(workplaces);
                if (self.setting().itemList) {
                    self.setting().itemList(workplaces);
                }
                dfd.resolve();
            }).always(() => {
                nts.uk.ui.block.clear();
            });

            return dfd.promise();
        }

        calculateWidth() {
            let self = this;
            let setting = self.setting();
            let codeWidth = setting.multiple ? 95 : 115;
            let nameWidth = setting.isAlreadySetting ? 165 : 245; 
            let alreadySettingWidth = setting.isAlreadySetting ? 70 : 10;
            return { codeWidth: codeWidth, nameWidth: nameWidth, alreadySettingWidth: alreadySettingWidth };
        }

        calculatePanelHeight() {
            let self = this;
            let height = self.setting().height ? (self.setting().height + 50) : 470;
            return height + 'px';
        }

    }

    export interface WorkplaceGroup {
        id: string;
        code: string;
        name: string;
    }

    export interface Option {
        multiple?: boolean;
        currentCodes?: any;
        currentIds?: any;
        // 未選択表示
        showEmptyItem?: boolean;
        tabindex?: number;
        isResize?: boolean;
        rows?: number;
        isAlreadySetting?: any;
        alreadySettingList: any;
        // パネル有無
        showPanel?: boolean;
        reloadData: any;
        reloadComponent: any;
        // 表示行数
        height: any;
        // 選択モード // NONE = 0, FIRST = 1, ALL = 2
        selectedMode: number;
        itemList: any;
    }
}



ko.components.register('workplace-group', {
    viewModel: nts.uk.com.view.kcp011.share.WorkplaceGroupComponent, template: `
    <div data-bind="if:setting().showPanel ">
        <div id="workplace-group-pannel" class="caret-right caret-background" data-bind="ntsPanel: {width: '380px', height: calculatePanelHeight(), direction: '', showIcon: true, visible: setting().showPanel}">
            <div  data-bind="ntsSearchBox: {searchMode: 'filter',targetKey: 'id', comId: 'multi-list', 
                    items: workplaceGroups, selectedKey: 'id', 
                    fields: ['code', 'name'], 
                    selected: setting().currentIds,
                    mode: 'igGrid'}" />
                <table id="multi-list"
                    data-bind=" 
                    ntsGridList: {
                            height: setting().height ? setting().height: 420,
                            dataSource: workplaceGroups,
                            primaryKey: 'id',
                            columns: columns,
                            multiple: setting().multiple,
                            value: setting().currentIds,
                            rows: setting().rows,
                            columnResize: setting().isResize
                        }">
                </table>
        </div>
    </div>
    <div data-bind="if:!setting().showPanel ">
        <div id="workplace-group-pannel" class="" style="width: 380px" data-bind="if: !setting().showPanel">
            <div  data-bind="ntsSearchBox: {searchMode: 'filter',targetKey: 'id', comId: 'multi-list-nopanel', 
                    items: workplaceGroups, selectedKey: 'id', 
                    fields: ['code', 'name'], 
                    selected: setting().currentIds,
                    mode: 'igGrid'}" />
                <table id="multi-list-nopanel"
                    data-bind="ntsGridList: {
                            height: setting().height ? setting().height: 420,
                            dataSource: workplaceGroups,
                            primaryKey: 'id',
                            columns: columns,
                            multiple: setting().multiple,
                            value: setting().currentIds,
                            rows: setting().rows,
                            columnResize: setting().isResize
                        }">
                </table>
        </div>
    </div>
`});




