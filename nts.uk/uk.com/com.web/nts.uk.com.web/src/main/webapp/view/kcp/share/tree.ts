module kcp.share.tree {
    export interface UnitModel {
        id: string;
        code: string;
        name: string;
        nodeText?: string;
        level: number;
        hierarchyCode: string;
        isAlreadySetting?: boolean;
        children: Array<UnitModel>;
    }

    export interface UnitAlreadySettingModel {
        /**
         * affiliation id ( department or workplace)
         */
        id: string;

        /**
         * State setting:
         *  true: saved setting.
         *  false: parent setting, child does not setting.
         *  undefined || null: both parent and child do not setting.
         */
        isAlreadySetting: boolean;
    }

    export interface RowSelection {
        id: string;
        code: string;
    }

    export interface TreeComponentOption {
        /**
         * is Show Already setting.
         */
        isShowAlreadySet: boolean;

        /**
         * is Multi use (複数使用区分). Setting use multiple components?
         */
        isMultipleUse: boolean;

        /**
         * is Multi select (選択モード). Setting multiple selection in grid.
         */
        isMultiSelect: boolean;

        /**
         * Tree type, if not set, default is work place.
         */
        startMode?: StartMode;

        /**
         * selected value.
         * May be string or Array<string>
         */
        selectedId: KnockoutObservable<any>;

        /**
         * Base date.
         */
        baseDate: KnockoutObservable<Date>;

        /**
         * Select mode
         */
        selectType: SelectionType;

        /**
         * isShowSelectButton
         * Show/hide button select all and selected sub parent
         */
        isShowSelectButton: boolean;

        /**
         * is dialog, if is main screen, set false,
         */
        isDialog: boolean;

        /**
         * Default padding of KCPs
         */
        hasPadding?: boolean;

        /**
         * Already setting list code. structure: {id: string, isAlreadySetting: boolean}
         * ignore when isShowAlreadySet = false.
         */
        alreadySettingList?: KnockoutObservableArray<UnitAlreadySettingModel>;

        /**
         * Limit display row
         */
        maxRows?: number;

        /**
         * set tabIndex
         */
        tabindex?: number;

        /**
         * system type
         */
        systemType: SystemType;

        // 参照範囲の絞
        restrictionOfReferenceRange?: boolean;

        /**
         * Check is show no select row in grid list.
         */
        isShowNoSelectRow?: boolean;

        /**
         * Show all levels of department workplace on start
         */
        isFullView?: boolean;
        width?: number;
        listDataDisplay: KnockoutObservableArray<any>;
    }

    /**
     * System type ~ システム区分
     *
     */
    export class SystemType {

        // 個人情報
        static PERSONAL_INFORMATION: number = 1;

        // 就業
        static EMPLOYMENT: number = 2;

        // 給与
        static SALARY: number = 3;

        // 人事
        static HUMAN_RESOURCES: number = 4;

        // 管理者
        static ADMINISTRATOR: number = 5;
    }

    export class StartMode {
        static WORKPLACE = 0;

        // 部門対応 #106784
        static DEPARTMENT = 1;
    }

    interface TreeStyle {
        width: number;
        height: number;
    }

    export class SelectionType {
        static SELECT_BY_SELECTED_CODE = 1;
        static SELECT_ALL = 2;
        static SELECT_FIRST_ITEM = 3;
        static NO_SELECT = 4;
    }

    export class TreeComponentScreenModel {
        itemList: KnockoutObservableArray<UnitModel>;
        backupItemList: KnockoutObservableArray<UnitModel>;
        selectedIds: KnockoutObservable<any>;
        isShowSelectButton: boolean;
        treeComponentColumn: Array<any>;
        isMultipleUse: boolean;
        isMultiSelect: boolean;
        isDialog: boolean;
        hasPadding: boolean;
        hasBaseDate: KnockoutObservable<boolean>;
        baseDate: KnockoutObservable<Date>;
        levelList: Array<any>;
        levelSelected: KnockoutObservable<number>;
        listId: Array<string>;
        alreadySettingList: KnockoutObservableArray<UnitAlreadySettingModel>;
        $input: JQuery;
        data: TreeComponentOption;
        maxRows: number;
        systemType: SystemType;
        isFullView: KnockoutObservable<boolean>;
        isShowNoSelectRow: boolean;

        tabindex: number;

        treeStyle: TreeStyle;
        restrictionOfReferenceRange: boolean;
        searchBoxId: string;
        setWidth: KnockoutObservable<boolean> = ko.observable(false);

        // 部門対応 #106784
        startMode: StartMode;

        $inputId: KnockoutObservable<string>;

        constructor() {
            let self = this;
            self.searchBoxId = nts.uk.util.randomId();
            self.itemList = ko.observableArray([]);
            self.backupItemList = ko.observableArray([]);
            self.listId = [];
            self.hasBaseDate = ko.observable(false);
            self.alreadySettingList = ko.observableArray([]);
            self.levelList = [
                { level: 1, name: '1' },
                { level: 2, name: '2' },
                { level: 3, name: '3' },
                { level: 4, name: '4' },
                { level: 5, name: '5' },
                { level: 6, name: '6' },
                { level: 7, name: '7' },
                { level: 8, name: '8' },
                { level: 9, name: '9' },
                { level: 10, name: '10' }
            ];
            self.levelSelected = ko.observable(10);
            self.isMultipleUse = false;
            self.isMultiSelect = false;
            self.isFullView = ko.observable(true);

            self.treeStyle = {
                width: 412,
                height: 0
            };

            // 部門対応 #106784
            self.startMode = StartMode.WORKPLACE;

            self.$inputId = ko.observable("");
        }

        public init($input: JQuery, data: TreeComponentOption): JQueryPromise<void> {
            let self = this;
            let dfd = $.Deferred<void>();
            self.data = data;
            if(data.width){
                self.treeStyle.width = data.width;  
                self.setWidth(true);
            }

            self.isShowNoSelectRow = _.isNil(data.isShowNoSelectRow) ? false : data.isShowNoSelectRow;
            self.$input = $input;
            self.$inputId($input[0].id);
            // set parameter
            self.isFullView(_.isNil(data.isFullView) ? false : data.isFullView); // default = false
            if (data.isMultipleUse) {
                self.isMultipleUse = data.isMultipleUse;
            }
            if (data.isMultiSelect) {
                self.isMultiSelect = data.isMultiSelect;
            }
            self.hasBaseDate(!self.isMultipleUse);
            self.selectedIds = data.selectedId;
            self.isShowSelectButton = data.isShowSelectButton && data.isMultiSelect;
            self.isDialog = data.isDialog;
            self.hasPadding = _.isNil(data.hasPadding) ? true : data.hasPadding; // default = true
            self.baseDate = data.baseDate;
            self.restrictionOfReferenceRange = data.restrictionOfReferenceRange != undefined ? data.restrictionOfReferenceRange : true;
            self.systemType =  data.systemType;

            // 部門対応 #106784
            self.startMode = _.isNil(data.startMode) ? StartMode.WORKPLACE : data.startMode; //default = workplace

            if (data.alreadySettingList) {
                self.alreadySettingList = data.alreadySettingList;
            }
            if (!data.maxRows) {
                self.maxRows = 12;
            } else {
                self.maxRows = data.maxRows;
            }
            self.tabindex = data.tabindex ? data.tabindex : 1;

            // subscribe change selected level
            self.levelSelected.subscribe(function(level) {
                self.filterData();
            });

            // subscribe change item list origin
            self.backupItemList.subscribe((newData) => {
                // data is empty, set selected work place id empty
                if (!newData || newData.length <= 0) {
                    self.selectedIds(self.isMultiSelect ? [] : '');
                }
                self.createGlobalVarDataList();
            });

            // set current system date if baseDate is invalid
            const baseDate = self.$input.find('#work-place-base-date');
            baseDate.ntsError('check');
            if (baseDate.ntsError('hasError')) {
                self.baseDate(new Date());
            }

            // Find data.
            const param = <service.WorkplaceParam>{};
            param.startMode = self.startMode;
            param.baseDate = self.baseDate();
            param.systemType = self.systemType;
            param.restrictionOfReferenceRange = self.restrictionOfReferenceRange;
            service.findDepWkpTree(param).done(function(res1: Array<any>) {
                //hoatt NEW職場・部門
                if (res1 && res1.length > 0) {
                    // Map already setting attr to data list.
                    self.addAlreadySettingAttr(res1, self.alreadySettingList());

                    if (data.isShowAlreadySet) {
                        // subscribe when alreadySettingList update => reload component.
                        self.alreadySettingList.subscribe((newAlreadySettings: any) => {
                            self.addAlreadySettingAttr(self.backupItemList(), newAlreadySettings);

                            // filter data, not change selected department or workplace id
                            let subItemList = self.filterByLevel(self.backupItemList(), self.levelSelected(), new Array<UnitModel>());
                            self.itemList(subItemList);
                            self.createGlobalVarDataList();
                        });
                    }

                    // Init component.
                    data.listDataDisplay = ko.observableArray(res1);
                    self.itemList(res1);
                    self.initNoSelectRow();
                    self.backupItemList(self.itemList());
                }
                // Set default value when initial component.
                self.initSelectedValue();

                self.loadTreeGrid().done(function() {
                    // Special command -> remove unuse.
                    $input.find('#multiple-tree-grid-' + self.$inputId() + '_tooltips_ruler').remove();
                    dfd.resolve();
                });
                
                $(document).delegate('#' + self.getComIdSearchBox(), "igtreegridrowsrendered", function(evt: any) {
                    self.addIconToAlreadyCol();
                });
            });

            // defined function focus
            $.fn.focusTreeGridComponent = function() {
                if (self.hasBaseDate()) {
                    $('.base-date-editor').first().focus();
                } else {
                    $("#combo-box-tree-component").focus();
                }
            }

            // define function get row selected
            $.fn.getRowSelected = function(): Array<any> {
                let listRowSelected: Array<RowSelection> = [];
                self.findSelectionRowData(self.backupItemList(), listRowSelected);
                return listRowSelected;
            }
            
            return dfd.promise();
        }

        /**
         * Add No select row to list
         */
        private initNoSelectRow() {
            let self = this;
            let noSelectItem = {
                code: '',
                nodeText: nts.uk.resource.getText('KCP001_5'),
                name: nts.uk.resource.getText('KCP001_5'),
                isAlreadySetting: false,
                id: '',
                level: 1,
                hierarchyCode: '',
                children: []
            };

            // Remove No select row.
            self.itemList.remove(noSelectItem);

            // Check is show no select row.
            if (self.isShowNoSelectRow && !self.isMultiSelect) {
                self.itemList.unshift(noSelectItem);
            }
        }

        /**
         * Add columns to tree grid list.
         */
        private addColToGrid(data: TreeComponentOption, dataList: Array<UnitModel>) {
            let self = this;
            // Convert tree to array.
            //let maxSizeNameCol = Math.max(self.getMaxSizeOfTextList(self.convertTreeToArray(dataList)), 250);

            // calculate height tree
            self.calHeightTree(300, data);
            let nodeTextWidth = 325;
            if(self.setWidth()){
                nodeTextWidth = self.data.width;
            }
            self.treeComponentColumn = [
                { headerText: "", key: 'id', dataType: "string", hidden: true },
                {
                    headerText: nts.uk.resource.getText("KCP004_5"), key: 'nodeText', width: nodeTextWidth, dataType: "string",
                    template: "<td class='tree-component-node-text-col'>${nodeText}</td>"
                }
            ];
            // If show Already setting.
            if (data.isShowAlreadySet) {
                // Add row already setting.
                self.treeComponentColumn.push({
                    headerText: nts.uk.resource.getText('KCP004_6'), key: 'isAlreadySetting', width: 70, dataType: 'string',
                    formatter: function(isAlreadySetting: string) {
                        if (isAlreadySetting == 'true') {
                            return '<div style="text-align: center;max-height: 18px;"><i class="icon icon icon-78"></i></div>';
                        }
                        if (isAlreadySetting == 'false') {
                            return '<div style="text-align: center;max-height: 18px;"><i class="icon icon icon-84"></i></div>';
                        }
                        return '';
                    }
                });
            }
        }

        /**
         * calHeightTree
         */
        private calHeightTree(widthColText: number, data) {
            let self = this;
            let heightRow = 24, heightScrollX = 0;

            // check has scroll-x
            if (widthColText > self.treeStyle.width) {
                heightScrollX = 18;
            }

            // calculate height tree
            self.treeStyle.height = heightRow * (self.maxRows + 1) + heightScrollX;
            if(data.width && self.setWidth()){
                self.treeStyle.width = data.width;
            }else
            if (self.isFullView()) {
                self.treeStyle.width = widthColText + data.isShowAlreadySet ? 100 : 30;

                // if width tree is small than 412 -> set to 412.
                self.treeStyle.width = self.treeStyle.width < 412 ? 412 : self.treeStyle.width;
            } else {
                self.treeStyle.width = 412;
            }
        }

        /**
         * Convert tree data to array.
         */
        private convertTreeToArray(dataList: Array<UnitModel>): Array<any> {
            let self = this;
            let res = [];
            _.forEach(dataList, function(item) {
                if (item.children && item.children.length > 0) {
                    res = res.concat(self.convertTreeToArray(item.children));
                }
                res.push({ name: item.nodeText, level: item.level });
            })
            return res;
        }
        /**
         * Calculate real size of text.
         */
        private getMaxSizeOfTextList(textArray: Array<any>): number {
            var max = 0;
            var paddingPerLevel = 16;
            var defaultFontSize = 14;
            var defaultFontFamily = ['DroidSansMono', 'Meiryo'];
            _.forEach(textArray, function(item) {
                var o = $('<div id="test">' + item.name + '</div>')
                    .css({
                        'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden',
                        'font-size': defaultFontSize, 'font-family': defaultFontFamily
                    })
                    .appendTo($('body'))
                var w = o.width() + item.level * paddingPerLevel + 30;
                if (w > max) {
                    max = w;
                }
                o.remove();
            });
            return max;
        }

        /**
         * Initial select mode
         */
        private initSelectedValue() {
            let self = this;
            if (_.isEmpty(self.itemList())) {
                self.selectedIds(self.data.isMultiSelect ? [] : '');
                return;
            }
            switch (self.data.selectType) {
                case SelectionType.SELECT_BY_SELECTED_CODE:
                    if(_.isEmpty(self.selectedIds())) {
                        self.selectedIds(self.data.isMultiSelect ? [] : '');
                        break;
                    }

                    if (self.isMultiSelect) {
                        self.selectedIds(self.data.selectedId());
                    } else {
                        const selectedCode = _.isArray(self.data.selectedId()) ?
                            self.data.selectedId()[0] : self.data.selectedId();
                        self.selectedIds(selectedCode);
                    }

                    break;
                case SelectionType.SELECT_ALL:
                    if (self.isMultiSelect) {
                        self.selectAll();
                    }
                    break;
                case SelectionType.SELECT_FIRST_ITEM:
                    self.selectedIds(self.selectData(self.data, self.itemList()[0]));
                    break;
                case SelectionType.NO_SELECT:
                    self.selectedIds(self.data.isMultiSelect ? [] : '');
                    break;
                default:
                    self.selectedIds(self.data.isMultiSelect ? [] : '');
                    break
            }
        }

        /**
         * add icon by already setting
         */
        private addIconToAlreadyCol() {
            var icon84Link = nts.uk.request.location.siteRoot
                .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                .mergeRelativePath('/view/kcp/share/icon/icon84.png').serialize();
            $('.icon-84').attr('style', "background: url('" + icon84Link
                + "');width: 18px;height: 18px;background-size: 20px 20px;")

            var icon78Link = nts.uk.request.location.siteRoot
                .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                .mergeRelativePath('/view/kcp/share/icon/icon78.png').serialize();
            $('.icon-78').attr('style', "background: url('" + icon78Link
                + "');width: 18px;height: 18px;background-size: 20px 20px;")
        }

        /**
         * Add Already Setting Attr into data list.
         */
        private addAlreadySettingAttr(dataList: Array<UnitModel>, alreadySettingList: Array<UnitAlreadySettingModel>) {
            let mapAlreadySetting = _.reduce(alreadySettingList, function(hash, value) {
                let key = value['workplaceId'];
                hash[key] = value['isAlreadySetting'] == false ? null : value['isAlreadySetting'];
                return hash;
            }, {});
            this.updateTreeData(dataList, mapAlreadySetting);
        }

        /**
         * Update setting type for dataList
         */
        private updateTreeData(dataList: Array<UnitModel>, mapAlreadySetting: any, isAlreadySettingParent?: boolean,
                               hierarchyCodeParent?: string) {
            let self = this;
            for (let unitModel of dataList) {

                // add id work place
                self.listId.push(unitModel.id);

                // set level
                unitModel.level = unitModel.hierarchyCode.length / 3;

                // set node text
                unitModel.nodeText = unitModel.code + ' ' + unitModel.name;

                // set already setting 
                let isAlreadySetting = mapAlreadySetting[unitModel.id];
                unitModel.isAlreadySetting = isAlreadySetting;

                let hierarchyCode: string = null;
                // if it is saved already setting, will be save hierarchyCode that it is parent hierarchyCode.
                if (isAlreadySetting == true) {
                    hierarchyCode = unitModel.hierarchyCode;
                }

                // check work place child
                if (hierarchyCodeParent && unitModel.hierarchyCode.startsWith(hierarchyCodeParent)) {

                    // if is work place child and it has not setting, it will set icon flag.
                    if (isAlreadySettingParent == true && typeof unitModel.isAlreadySetting != "boolean") {
                        unitModel.isAlreadySetting = false;
                    }
                    // if is not work place child and it has not setting, it will not set icon.
                    if (typeof isAlreadySettingParent != "boolean" && unitModel.isAlreadySetting == false) {
                        unitModel.isAlreadySetting = isAlreadySettingParent;
                    }
                }
                if (unitModel.children.length > 0) {
                    this.updateTreeData(unitModel.children, mapAlreadySetting,
                        isAlreadySetting ? isAlreadySetting : isAlreadySettingParent,
                        hierarchyCode ? hierarchyCode : hierarchyCodeParent);
                }
            }
        }

        /**
         * Filter data by level
         */
        private filterData() {
            let self = this;
            if (self.backupItemList().length > 0) {
                // clear list selected work place id
                self.listId = [];

                // find sub list unit model by level
                let subItemList = self.filterByLevel(self.backupItemList(), self.levelSelected(), new Array<UnitModel>());
                self.itemList(subItemList);
                self.initSelectedValue();
                
                self.reloadNtsTreeGrid();
                
                self.createGlobalVarDataList();
            }
        }

        private loadTreeGrid(): JQueryPromise<void> {
            let dfd = $.Deferred<void>();
            let self = this;
            self.addColToGrid(self.data, self.itemList());

            const initComponent = () => {
                self.$input.html(TREE_COMPONENT_HTML);
                ko.cleanNode(self.$input[0]);
                ko.applyBindings(self, self.$input[0]);

                
                let found;
                const flat = function(wk) {
                    return [wk.id, _.flatMap(wk.children, flat)];
                };
                const selectableList = _.flatMapDeep(self.itemList(), flat);
                if (self.isMultiSelect) {
                    found = _.filter(self.selectedIds(), id => _.includes(selectableList, id));
                } else {
                    found = _.find(selectableList, id => id == self.selectedIds());
                }
                self.selectedIds(found);
                
                let options = {
                    width: self.treeStyle.width,
                    dataSource: self.itemList(),
                    selectedValues: self.selectedIds(),
                    optionsValue: 'id',
                    optionsChild: 'children',
                    optionsText: 'nodeText',
                    multiple: self.isMultiSelect,
                    virtualization: true,
                    rows: self.maxRows,
                    virtualizationMode: 'continuous',
                    extColumns: self.treeComponentColumn,
                    enable: true,
                    showCheckBox: self.isMultiSelect
                };
                const searchBoxOptions = {
                    childField: 'children',
                    targetKey: 'id',
                    comId: self.getComIdSearchBox(),
                    items: self.itemList(),
                    selected: self.selectedIds(),
                    selectedKey: 'id',
                    fields: ['nodeText', 'code'],
                    mode: 'igTree'
                };

                // fix bug select incorrect element caused by auto generated element
                const generatedElement = $('#' + self.getComIdSearchBox() + '.cf.row-limited.ui-iggrid-table.ui-widget-content');
                if (!_.isEmpty(generatedElement)) {
                    generatedElement.remove();
                }
                
                $('#' + self.getComIdSearchBox()).ntsTreeGrid(options);
                $('#' + self.searchBoxId).ntsSearchBox(searchBoxOptions);

                // init event selected changed
                self.initEvent();

                // set selected workplaced
                self.selectedIds.valueHasMutated();

                // fix bug scroll on tree
                _.defer(() => {
                    $('#' + self.getComIdSearchBox()).igTreeGrid('dataBind');
                });

                // defined function get data list.
                self.createGlobalVarDataList();
                $.fn.getDataList = function(): Array<kcp.share.list.UnitModel> {
                    return window['dataList' + this.attr('id').replace(/-/gi, '')];
                }

                // Create method to full view.
                $.fn.fullView = function() {
                    self.isFullView(true);
                    self.filterData();
                }

                $.fn.scrollView = function() {
                    self.isFullView(false);
                    self.filterData();
                }
                
                dfd.resolve();
            };

            if (_.isNil(ko.dataFor(document.body))) {
                nts.uk.ui.viewModelApplied.add(initComponent);
            } else {
                initComponent();
            }

            return dfd.promise();
        }

        // set up on selected code changed event
        private initEvent(): void {
            let self = this;

            // Reload NtsTreeGrid when itemList changed.
            self.itemList.subscribe(vl => {
                self.reloadNtsTreeGrid();
            });

            $(document).delegate('#' + self.getComIdSearchBox(), "igtreegridselectionrowselectionchanged", (evt, ui) => {
                const selecteds = _.map(ui.selectedRows, o => o.id);
                if (self.isMultiSelect) {
                    self.selectedIds(selecteds);
                } else {
                    self.selectedIds(selecteds[0]);
                }
            });
            
            $(document).delegate('#' + self.getComIdSearchBox(), "ntstreeselectionchanged", (evt, selectedId) => {
                // multiple-case: selectedId is an array
                // single-case: selectedId is a string
                self.selectedIds(selectedId);
            });

            self.selectedIds.subscribe(ids => {
                const grid = $('#' + self.getComIdSearchBox());
                if (_.isNil(grid.data("igGrid"))) {
                    return;
                }
                grid.ntsTreeGrid('setSelected',
                    self.isMultiSelect ? [].slice.call(self.selectedIds()) : self.selectedIds());
            });
        }

        private createGlobalVarDataList() {
            var self = this;
            $('#script-for-' + self.$input.attr('id')).remove();
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.innerHTML = 'var dataList' + self.$input.attr('id').replace(/-/gi, '') + ' = '
                + JSON.stringify(self.backupItemList());
            s.id = 'script-for-' + self.$input.attr('id');
            $("head").append(s);
        }

        private reloadNtsTreeGrid(): void {
            let self = this;
            const treeGrid = $('#' + self.getComIdSearchBox());
            const searchBox = $('#' + self.searchBoxId);
            if (!_.isEmpty(treeGrid) && !_.isEmpty(searchBox)) {
                treeGrid.ntsTreeGrid("setDataSource", self.itemList());
                searchBox.ntsSearchBox("setDataSource", self.itemList());
                self.data.listDataDisplay(self.itemList());
            }
        }

        /**
         * Find list work place by base date
         */
        public reload() {
            let self = this;

            // validate base date
            const baseDate = self.$input.find('#work-place-base-date');
            baseDate.ntsError('check');
            if (baseDate.ntsError('hasError')) {
                return;
            }
            const param = <service.WorkplaceParam>{};
            param.startMode = self.startMode;
            param.baseDate = self.baseDate();
            param.systemType = self.systemType;
            param.restrictionOfReferenceRange = self.restrictionOfReferenceRange;
            service.findDepWkpTree(param).done(function(res: Array<UnitModel>) {
                if (!res || res.length <= 0) {
                    self.itemList([]);
                    self.backupItemList([]);
                    return;
                }
                if (self.alreadySettingList) {
                    self.addAlreadySettingAttr(res, self.alreadySettingList());
                }
                self.itemList(res);
                self.initNoSelectRow();
                self.backupItemList(self.itemList());
                
                self.data.listDataDisplay(self.itemList());
                // Filter data
                self.filterData();
            });
        }

        /**
         * Select all
         */
        private selectAll() {
            let self = this;
            this.selectedIds(this.listId);
        }

        /**
         * Select all children
         */
        private selectSubParent() {
            let self = this;
            let workplaceIdSet = new Set();

            let listModel = self.findUnitModelByListWorkplaceId();
            self.findListSubWorkplaceId(listModel, workplaceIdSet);
            if (workplaceIdSet.size > 0) {
                self.selectedIds(self.convertSetToArray(workplaceIdSet));
            }
        }

        private convertSetToArray(workplaceIdSet: Set<string>) {
            let newArray = [];
            workplaceIdSet.forEach(element => {
                newArray.push(element);
            });
            return newArray;
        }
        /**
         * Find UnitModel By ListWorkplaceId
         */
        private findUnitModelByListWorkplaceId(dataList?: Array<UnitModel>): Array<UnitModel> {
            let self = this;
            let listModel: Array<UnitModel> = [];

            // get selected work place
            let listWorkplaceId = self.getSelectedWorkplace();

            for (let workplaceId of listWorkplaceId) {
                listModel = self.findUnitModelByWorkplaceId(dataList ? self.backupItemList() : self.itemList(),
                    workplaceId, listModel);
            }
            return listModel;
        }

        /**
         * Find list sub id of parent
         */
        private findListSubWorkplaceId(dataList: Array<UnitModel>, workplaceIdSet: Set<string>) {
            let self = this;
            for (let alreadySetting of dataList) {
                workplaceIdSet.add(alreadySetting.id);
                if (alreadySetting.children && alreadySetting.children.length > 0) {
                    this.findListSubWorkplaceId(alreadySetting.children, workplaceIdSet);
                }
            }
        }

        /**
         * Select data for multiple or not
         */
        private selectData(option: TreeComponentOption, data: UnitModel): any {
            if (this.isMultiSelect) {
                return [data.id];
            }
            return data.id;
        }

        /**
         * Get selected work place id
         */
        private getSelectedWorkplace(): any {
            if (this.isMultiSelect) {
                return this.selectedIds() ? this.selectedIds() : [];
            }
            return [this.selectedIds()];
        }

        /**
         * Find UnitModel by id
         */
        private findUnitModelByWorkplaceId(dataList: Array<UnitModel>, workplaceId: string,
                                           listModel: Array<UnitModel>): Array<UnitModel> {
            let self = this;
            for (let item of dataList) {
                if (item.id == workplaceId) {
                    let modelString = JSON.stringify(listModel);
                    // Check item existed
                    if (modelString.indexOf(item.id) < 0) {
                        listModel.push(item);
                    }
                }
                if (item.children.length > 0) {
                    this.findUnitModelByWorkplaceId(item.children, workplaceId, listModel);
                }
            }
            return listModel;
        }

        /**
         * Find selected row data
         */
        private findSelectionRowData(dataList: Array<UnitModel>, listRowData: Array<RowSelection>) {
            let self = this;
            let selectedWorkplaces = self.getSelectedWorkplace();
            for (let unitModel of dataList) {
                if (_.some(selectedWorkplaces, id => id == unitModel.id)) {
                    listRowData.push({
                        id: unitModel.id,
                        code: unitModel.code
                    });
                }
                if (unitModel.children.length > 0) {
                    this.findSelectionRowData(unitModel.children, listRowData);
                }
            }
        }

        /**
         * Get ComId Search Box by multiple choice
         */
        private getComIdSearchBox(): string {
            if (this.isMultiSelect) {
                return 'multiple-tree-grid-' + this.$inputId();
            }
            return 'single-tree-grid-' + this.$inputId();
        }

        /**
         * Filter list work place follow selected level
         */
        private filterByLevel(dataList: Array<UnitModel>, level: number, listModel: Array<UnitModel>): Array<UnitModel> {
            let self = this;
            for (let item of dataList) {
                let newItem: any = {};
                if (item.level <= level) {
                    self.listId.push(item.id);
                    newItem = JSON.parse(JSON.stringify(item));
                    listModel.push(newItem);
                    if (level == 1) {
                        newItem.children = [];
                    } else if (item.children && item.children.length > 0) {
                        let tmpModels = this.filterByLevel(newItem.children, level, new Array<UnitModel>());
                        newItem.children = tmpModels;
                    }
                }
            }
            return listModel;
        }

    }
    export module service {

        // Service paths.
        var servicePath = {
            //hoatt NEW職場・部門
            findDepWkpTree: "bs/employee/wkpdep/get-wkpdepinfo-kcp004",
        };

        /**
         * Find department or workplace list.
         */
        export function findDepWkpTree(param: WorkplaceParam): JQueryPromise<Array<UnitModel>> {
            if (_.isNil(param.systemType)) {
                let dfd = $.Deferred<any>();
                dfd.resolve([]);
                return dfd.promise();
            }
            return nts.uk.request.ajax('com', servicePath.findDepWkpTree, param);
        }

        export interface WorkplaceParam {
            startMode: StartMode,
            baseDate: Date;
            systemType: SystemType;
            restrictionOfReferenceRange: boolean;
        }
    }

    export class TreeComponentTextResource {
        static KCP004_2 = nts.uk.resource.getText('KCP004_2');
        static KCP004_3 = nts.uk.resource.getText('KCP004_3');
        static KCP004_4 = nts.uk.resource.getText('KCP004_4');
        static KCP004_7 = nts.uk.resource.getText('KCP004_7');
        static KCP004_8 = nts.uk.resource.getText('KCP004_8');
    }

var TREE_COMPONENT_HTML = `<style type="text/css">
#nts-component-list .nts-searchbbox-wrapper {
    float: left;
}

/* fix bug show unexpected selector column on page with sidebar on IE */
#single-tree-grid_container .ui-iggrid-rowselector-header {
    border: 0px;
}
#single-tree-grid_container .ui-iggrid-rowselector-class {
    border: 0px;
}

</style>
    <div id="nts-component-tree" style="border-radius: 5px;" tabindex="-1"
        data-bind="css: {'caret-right caret-background bg-green' : !isDialog},
            style: {padding: hasPadding ? '20px' : '0px'}">
        <!-- ko if: !isDialog -->
            <i class="icon icon-searchbox"></i>
        <!-- /ko -->
        <div class="row-search control-group valign-center" style ="width: 430px;" data-bind="visible: !isMultipleUse">
            <div data-bind="ntsFormLabel: {required: true}">`+TreeComponentTextResource.KCP004_2+`</div>
            <div class="base-date-editor" id="work-place-base-date"
                style="margin-left: 0; margin-right: 5px;"
                data-bind="attr: {tabindex: tabindex},
                ntsDatePicker: {dateFormat: 'YYYY/MM/DD', value: baseDate, name:'#[KCP004_2]', required: true}"></div>
            <button
                data-bind="click: reload, attr: {tabindex: tabindex}"
                style="min-width: 65px">`+TreeComponentTextResource.KCP004_3+`</button>
            <div data-bind="ntsFormLabel: {}" style="margin-left: 30px; border-color: transparent;">`+TreeComponentTextResource.KCP004_4+`</div>
            <div id="combo-box-tree-component"
                style="width: 60px; margin-left: -10px;"
                data-bind="attr: {tabindex: tabindex}, ntsComboBox: {
                    options: levelList,
                    optionsValue: 'level',
                    value: levelSelected,
                    optionsText: 'name',
                    editable: false,
                    enable: true,
                    columns: [
                        { prop: 'name', length: 4 },
                    ]}"></div>
        </div>
        <div class = "search-filter" style="margin-top:10px " data-bind="style: { width: '450px' }">
            <div style="display: inline-block; float: left" data-bind="attr: {id: searchBoxId, tabindex: tabindex}, style: { width : !isMultipleUse ? '327px' : '268px'}">
            </div>
            <div style="display: inline-block; margin-left: 2px; float: left">
                <!-- ko if: isShowSelectButton -->
                    <button
                        data-bind="click: selectSubParent, attr: {tabindex: tabindex}">`+TreeComponentTextResource.KCP004_8+`</button>
                <!-- /ko -->
            </div>
            <div id="hierarchy" style="margin-top: 10px; margin-bottom: 10px;" data-bind="visible: isMultipleUse">
                        <div data-bind="ntsFormLabel: {}" style="margin-left: 10px; float: left; border-color: transparent;">`+TreeComponentTextResource.KCP004_4+`</div>
                        <div id="combo-box-tree-component"
                            style="width: 60px; margin-left: 5px; float: left"
                            data-bind="attr: {tabindex: tabindex}, ntsComboBox: {
                                options: levelList,
                                optionsValue: 'level',
                                value: levelSelected,
                                optionsText: 'name',
                                editable: false,
                                enable: true,
                                columns: [
                                    { prop: 'name', length: 4 },
                                ]}"></div>
             </div>
        </div>
        <div class="cf"></div>
        <!-- ko if: !isMultiSelect -->
            <table class="cf" data-bind="attr: {tabindex: tabindex, id: 'single-tree-grid-' + $inputId()}">
            </table>
        <!-- /ko -->
        <!-- ko if: isMultiSelect -->
            <table class="cf" data-bind="attr: {tabindex: tabindex, id: 'multiple-tree-grid-' + $inputId()}">
            </table>
        <!-- /ko -->
    </div>`;
}

/**
 * Defined Jquery interface.
 */
interface JQuery {

    /**
     * Nts tree component.
     */
    ntsTreeComponent(option: kcp.share.tree.TreeComponentOption): JQueryPromise<void>;

    /**
     * Get Data List
     */
    getDataList(): Array<kcp.share.tree.UnitModel>;

    /**
     * Get row selected
     */
    getRowSelected(): Array<any>;

    /**
     * Focus component.
     */
    focusTreeGridComponent(): void;

    /**
     * Go to full view mode.
     */
    fullView(): void;

    /**
     * Go to scroll
     */
    scrollView(): void;
}

(function($: any) {
    $.fn.ntsTreeComponent = function(option: kcp.share.tree.TreeComponentOption): JQueryPromise<void> {

        // Return.
        return new kcp.share.tree.TreeComponentScreenModel().init(this, option);
    }
} (jQuery));
