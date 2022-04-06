var kcp;
(function (kcp) {
    var share;
    (function (share) {
        var tree;
        (function (tree) {
            /**
             * System type ~ システム区分
             *
             */
            var SystemType = /** @class */ (function () {
                function SystemType() {
                }
                // 個人情報
                SystemType.PERSONAL_INFORMATION = 1;
                // 就業
                SystemType.EMPLOYMENT = 2;
                // 給与
                SystemType.SALARY = 3;
                // 人事
                SystemType.HUMAN_RESOURCES = 4;
                // 管理者
                SystemType.ADMINISTRATOR = 5;
                return SystemType;
            }());
            tree.SystemType = SystemType;
            var StartMode = /** @class */ (function () {
                function StartMode() {
                }
                StartMode.WORKPLACE = 0;
                // 部門対応 #106784
                StartMode.DEPARTMENT = 1;
                return StartMode;
            }());
            tree.StartMode = StartMode;
            var SelectionType = /** @class */ (function () {
                function SelectionType() {
                }
                SelectionType.SELECT_BY_SELECTED_CODE = 1;
                SelectionType.SELECT_ALL = 2;
                SelectionType.SELECT_FIRST_ITEM = 3;
                SelectionType.NO_SELECT = 4;
                return SelectionType;
            }());
            tree.SelectionType = SelectionType;
            var TreeComponentScreenModel = /** @class */ (function () {
                function TreeComponentScreenModel() {
                    this.setWidth = ko.observable(false);
                    var self = this;
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
                TreeComponentScreenModel.prototype.init = function ($input, data) {
                    var self = this;
                    var dfd = $.Deferred();
                    self.data = data;
                    if (data.width) {
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
                    self.systemType = data.systemType;
                    // 部門対応 #106784
                    self.startMode = _.isNil(data.startMode) ? StartMode.WORKPLACE : data.startMode; //default = workplace
                    if (data.alreadySettingList) {
                        self.alreadySettingList = data.alreadySettingList;
                    }
                    if (!data.maxRows) {
                        self.maxRows = 12;
                    }
                    else {
                        self.maxRows = data.maxRows;
                    }
                    self.tabindex = data.tabindex ? data.tabindex : 1;
                    // subscribe change selected level
                    self.levelSelected.subscribe(function (level) {
                        self.filterData();
                    });
                    // subscribe change item list origin
                    self.backupItemList.subscribe(function (newData) {
                        // data is empty, set selected work place id empty
                        if (!newData || newData.length <= 0) {
                            self.selectedIds(self.isMultiSelect ? [] : '');
                        }
                        self.createGlobalVarDataList();
                    });
                    // set current system date if baseDate is invalid
                    var baseDate = self.$input.find('#work-place-base-date');
                    baseDate.ntsError('check');
                    if (baseDate.ntsError('hasError')) {
                        self.baseDate(new Date());
                    }
                    // Find data.
                    var param = {};
                    param.startMode = self.startMode;
                    param.baseDate = self.baseDate();
                    param.systemType = self.systemType;
                    param.restrictionOfReferenceRange = self.restrictionOfReferenceRange;
                    service.findDepWkpTree(param).done(function (res1) {
                        //hoatt NEW職場・部門
                        if (res1 && res1.length > 0) {
                            // Map already setting attr to data list.
                            self.addAlreadySettingAttr(res1, self.alreadySettingList());
                            if (data.isShowAlreadySet) {
                                // subscribe when alreadySettingList update => reload component.
                                self.alreadySettingList.subscribe(function (newAlreadySettings) {
                                    self.addAlreadySettingAttr(self.backupItemList(), newAlreadySettings);
                                    // filter data, not change selected department or workplace id
                                    var subItemList = self.filterByLevel(self.backupItemList(), self.levelSelected(), new Array());
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
                        self.loadTreeGrid().done(function () {
                            // Special command -> remove unuse.
                            $input.find('#multiple-tree-grid-' + self.$inputId() + '_tooltips_ruler').remove();
                            dfd.resolve();
                        });
                        $(document).delegate('#' + self.getComIdSearchBox(), "igtreegridrowsrendered", function (evt) {
                            self.addIconToAlreadyCol();
                        });
                    });
                    // defined function focus
                    $.fn.focusTreeGridComponent = function () {
                        if (self.hasBaseDate()) {
                            $('.base-date-editor').first().focus();
                        }
                        else {
                            $("#combo-box-tree-component").focus();
                        }
                    };
                    // define function get row selected
                    $.fn.getRowSelected = function () {
                        var listRowSelected = [];
                        self.findSelectionRowData(self.backupItemList(), listRowSelected);
                        return listRowSelected;
                    };
                    return dfd.promise();
                };
                /**
                 * Add No select row to list
                 */
                TreeComponentScreenModel.prototype.initNoSelectRow = function () {
                    var self = this;
                    var noSelectItem = {
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
                };
                /**
                 * Add columns to tree grid list.
                 */
                TreeComponentScreenModel.prototype.addColToGrid = function (data, dataList) {
                    var self = this;
                    // Convert tree to array.
                    //let maxSizeNameCol = Math.max(self.getMaxSizeOfTextList(self.convertTreeToArray(dataList)), 250);
                    // calculate height tree
                    self.calHeightTree(300, data);
                    var nodeTextWidth = 325;
                    if (self.setWidth()) {
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
                            formatter: function (isAlreadySetting) {
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
                };
                /**
                 * calHeightTree
                 */
                TreeComponentScreenModel.prototype.calHeightTree = function (widthColText, data) {
                    var self = this;
                    var heightRow = 24, heightScrollX = 0;
                    // check has scroll-x
                    if (widthColText > self.treeStyle.width) {
                        heightScrollX = 18;
                    }
                    // calculate height tree
                    self.treeStyle.height = heightRow * (self.maxRows + 1) + heightScrollX;
                    if (data.width && self.setWidth()) {
                        self.treeStyle.width = data.width;
                    }
                    else if (self.isFullView()) {
                        self.treeStyle.width = widthColText + data.isShowAlreadySet ? 100 : 30;
                        // if width tree is small than 412 -> set to 412.
                        self.treeStyle.width = self.treeStyle.width < 412 ? 412 : self.treeStyle.width;
                    }
                    else {
                        self.treeStyle.width = 412;
                    }
                };
                /**
                 * Convert tree data to array.
                 */
                TreeComponentScreenModel.prototype.convertTreeToArray = function (dataList) {
                    var self = this;
                    var res = [];
                    _.forEach(dataList, function (item) {
                        if (item.children && item.children.length > 0) {
                            res = res.concat(self.convertTreeToArray(item.children));
                        }
                        res.push({ name: item.nodeText, level: item.level });
                    });
                    return res;
                };
                /**
                 * Calculate real size of text.
                 */
                TreeComponentScreenModel.prototype.getMaxSizeOfTextList = function (textArray) {
                    var max = 0;
                    var paddingPerLevel = 16;
                    var defaultFontSize = 14;
                    var defaultFontFamily = ['DroidSansMono', 'Meiryo'];
                    _.forEach(textArray, function (item) {
                        var o = $('<div id="test">' + item.name + '</div>')
                            .css({
                            'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden',
                            'font-size': defaultFontSize, 'font-family': defaultFontFamily
                        })
                            .appendTo($('body'));
                        var w = o.width() + item.level * paddingPerLevel + 30;
                        if (w > max) {
                            max = w;
                        }
                        o.remove();
                    });
                    return max;
                };
                /**
                 * Initial select mode
                 */
                TreeComponentScreenModel.prototype.initSelectedValue = function () {
                    var self = this;
                    if (_.isEmpty(self.itemList())) {
                        self.selectedIds(self.data.isMultiSelect ? [] : '');
                        return;
                    }
                    switch (self.data.selectType) {
                        case SelectionType.SELECT_BY_SELECTED_CODE:
                            if (_.isEmpty(self.selectedIds())) {
                                self.selectedIds(self.data.isMultiSelect ? [] : '');
                                break;
                            }
                            if (self.isMultiSelect) {
                                self.selectedIds(self.data.selectedId());
                            }
                            else {
                                var selectedCode = _.isArray(self.data.selectedId()) ?
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
                            break;
                    }
                };
                /**
                 * add icon by already setting
                 */
                TreeComponentScreenModel.prototype.addIconToAlreadyCol = function () {
                    var icon84Link = nts.uk.request.location.siteRoot
                        .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                        .mergeRelativePath('/view/kcp/share/icon/icon84.png').serialize();
                    $('.icon-84').attr('style', "background: url('" + icon84Link
                        + "');width: 18px;height: 18px;background-size: 20px 20px;");
                    var icon78Link = nts.uk.request.location.siteRoot
                        .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                        .mergeRelativePath('/view/kcp/share/icon/icon78.png').serialize();
                    $('.icon-78').attr('style', "background: url('" + icon78Link
                        + "');width: 18px;height: 18px;background-size: 20px 20px;");
                };
                /**
                 * Add Already Setting Attr into data list.
                 */
                TreeComponentScreenModel.prototype.addAlreadySettingAttr = function (dataList, alreadySettingList) {
                    var mapAlreadySetting = _.reduce(alreadySettingList, function (hash, value) {
                        var key = value['workplaceId'];
                        hash[key] = value['isAlreadySetting'] == false ? null : value['isAlreadySetting'];
                        return hash;
                    }, {});
                    this.updateTreeData(dataList, mapAlreadySetting);
                };
                /**
                 * Update setting type for dataList
                 */
                TreeComponentScreenModel.prototype.updateTreeData = function (dataList, mapAlreadySetting, isAlreadySettingParent, hierarchyCodeParent) {
                    var self = this;
                    for (var _i = 0, dataList_1 = dataList; _i < dataList_1.length; _i++) {
                        var unitModel = dataList_1[_i];
                        // add id work place
                        self.listId.push(unitModel.id);
                        // set level
                        unitModel.level = unitModel.hierarchyCode.length / 3;
                        // set node text
                        unitModel.nodeText = unitModel.code + ' ' + unitModel.name;
                        // set already setting 
                        var isAlreadySetting = mapAlreadySetting[unitModel.id];
                        unitModel.isAlreadySetting = isAlreadySetting;
                        var hierarchyCode = null;
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
                            this.updateTreeData(unitModel.children, mapAlreadySetting, isAlreadySetting ? isAlreadySetting : isAlreadySettingParent, hierarchyCode ? hierarchyCode : hierarchyCodeParent);
                        }
                    }
                };
                /**
                 * Filter data by level
                 */
                TreeComponentScreenModel.prototype.filterData = function () {
                    var self = this;
                    if (self.backupItemList().length > 0) {
                        // clear list selected work place id
                        self.listId = [];
                        // find sub list unit model by level
                        var subItemList = self.filterByLevel(self.backupItemList(), self.levelSelected(), new Array());
                        self.itemList(subItemList);
                        self.initSelectedValue();
                        self.reloadNtsTreeGrid();
                        self.createGlobalVarDataList();
                    }
                };
                TreeComponentScreenModel.prototype.loadTreeGrid = function () {
                    var dfd = $.Deferred();
                    var self = this;
                    self.addColToGrid(self.data, self.itemList());
                    var initComponent = function () {
                        self.$input.html(TREE_COMPONENT_HTML);
                        ko.cleanNode(self.$input[0]);
                        ko.applyBindings(self, self.$input[0]);
                        var found;
                        var flat = function (wk) {
                            return [wk.id, _.flatMap(wk.children, flat)];
                        };
                        var selectableList = _.flatMapDeep(self.itemList(), flat);
                        if (self.isMultiSelect) {
                            found = _.filter(self.selectedIds(), function (id) { return _.includes(selectableList, id); });
                        }
                        else {
                            found = _.find(selectableList, function (id) { return id == self.selectedIds(); });
                        }
                        self.selectedIds(found);
                        var options = {
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
                        var searchBoxOptions = {
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
                        var generatedElement = $('#' + self.getComIdSearchBox() + '.cf.row-limited.ui-iggrid-table.ui-widget-content');
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
                        _.defer(function () {
                            $('#' + self.getComIdSearchBox()).igTreeGrid('dataBind');
                        });
                        // defined function get data list.
                        self.createGlobalVarDataList();
                        $.fn.getDataList = function () {
                            return window['dataList' + this.attr('id').replace(/-/gi, '')];
                        };
                        // Create method to full view.
                        $.fn.fullView = function () {
                            self.isFullView(true);
                            self.filterData();
                        };
                        $.fn.scrollView = function () {
                            self.isFullView(false);
                            self.filterData();
                        };
                        dfd.resolve();
                    };
                    if (_.isNil(ko.dataFor(document.body))) {
                        nts.uk.ui.viewModelApplied.add(initComponent);
                    }
                    else {
                        initComponent();
                    }
                    return dfd.promise();
                };
                // set up on selected code changed event
                TreeComponentScreenModel.prototype.initEvent = function () {
                    var self = this;
                    // Reload NtsTreeGrid when itemList changed.
                    self.itemList.subscribe(function (vl) {
                        self.reloadNtsTreeGrid();
                    });
                    $(document).delegate('#' + self.getComIdSearchBox(), "igtreegridselectionrowselectionchanged", function (evt, ui) {
                        var selecteds = _.map(ui.selectedRows, function (o) { return o.id; });
                        if (self.isMultiSelect) {
                            self.selectedIds(selecteds);
                        }
                        else {
                            self.selectedIds(selecteds[0]);
                        }
                    });
                    $(document).delegate('#' + self.getComIdSearchBox(), "ntstreeselectionchanged", function (evt, selectedId) {
                        // multiple-case: selectedId is an array
                        // single-case: selectedId is a string
                        self.selectedIds(selectedId);
                    });
                    self.selectedIds.subscribe(function (ids) {
                        var grid = $('#' + self.getComIdSearchBox());
                        if (_.isNil(grid.data("igGrid"))) {
                            return;
                        }
                        grid.ntsTreeGrid('setSelected', self.isMultiSelect ? [].slice.call(self.selectedIds()) : self.selectedIds());
                    });
                };
                TreeComponentScreenModel.prototype.createGlobalVarDataList = function () {
                    var self = this;
                    $('#script-for-' + self.$input.attr('id')).remove();
                    var s = document.createElement("script");
                    s.type = "text/javascript";
                    s.innerHTML = 'var dataList' + self.$input.attr('id').replace(/-/gi, '') + ' = '
                        + JSON.stringify(self.backupItemList());
                    s.id = 'script-for-' + self.$input.attr('id');
                    $("head").append(s);
                };
                TreeComponentScreenModel.prototype.reloadNtsTreeGrid = function () {
                    var self = this;
                    var treeGrid = $('#' + self.getComIdSearchBox());
                    var searchBox = $('#' + self.searchBoxId);
                    if (!_.isEmpty(treeGrid) && !_.isEmpty(searchBox)) {
                        treeGrid.ntsTreeGrid("setDataSource", self.itemList());
                        searchBox.ntsSearchBox("setDataSource", self.itemList());
                        self.data.listDataDisplay(self.itemList());
                    }
                };
                /**
                 * Find list work place by base date
                 */
                TreeComponentScreenModel.prototype.reload = function () {
                    var self = this;
                    // validate base date
                    var baseDate = self.$input.find('#work-place-base-date');
                    baseDate.ntsError('check');
                    if (baseDate.ntsError('hasError')) {
                        return;
                    }
                    var param = {};
                    param.startMode = self.startMode;
                    param.baseDate = self.baseDate();
                    param.systemType = self.systemType;
                    param.restrictionOfReferenceRange = self.restrictionOfReferenceRange;
                    service.findDepWkpTree(param).done(function (res) {
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
                };
                /**
                 * Select all
                 */
                TreeComponentScreenModel.prototype.selectAll = function () {
                    var self = this;
                    this.selectedIds(this.listId);
                };
                /**
                 * Select all children
                 */
                TreeComponentScreenModel.prototype.selectSubParent = function () {
                    var self = this;
                    var workplaceIdSet = new Set();
                    var listModel = self.findUnitModelByListWorkplaceId();
                    self.findListSubWorkplaceId(listModel, workplaceIdSet);
                    if (workplaceIdSet.size > 0) {
                        self.selectedIds(self.convertSetToArray(workplaceIdSet));
                    }
                };
                TreeComponentScreenModel.prototype.convertSetToArray = function (workplaceIdSet) {
                    var newArray = [];
                    workplaceIdSet.forEach(function (element) {
                        newArray.push(element);
                    });
                    return newArray;
                };
                /**
                 * Find UnitModel By ListWorkplaceId
                 */
                TreeComponentScreenModel.prototype.findUnitModelByListWorkplaceId = function (dataList) {
                    var self = this;
                    var listModel = [];
                    // get selected work place
                    var listWorkplaceId = self.getSelectedWorkplace();
                    for (var _i = 0, listWorkplaceId_1 = listWorkplaceId; _i < listWorkplaceId_1.length; _i++) {
                        var workplaceId = listWorkplaceId_1[_i];
                        listModel = self.findUnitModelByWorkplaceId(dataList ? self.backupItemList() : self.itemList(), workplaceId, listModel);
                    }
                    return listModel;
                };
                /**
                 * Find list sub id of parent
                 */
                TreeComponentScreenModel.prototype.findListSubWorkplaceId = function (dataList, workplaceIdSet) {
                    var self = this;
                    for (var _i = 0, dataList_2 = dataList; _i < dataList_2.length; _i++) {
                        var alreadySetting = dataList_2[_i];
                        workplaceIdSet.add(alreadySetting.id);
                        if (alreadySetting.children && alreadySetting.children.length > 0) {
                            this.findListSubWorkplaceId(alreadySetting.children, workplaceIdSet);
                        }
                    }
                };
                /**
                 * Select data for multiple or not
                 */
                TreeComponentScreenModel.prototype.selectData = function (option, data) {
                    if (this.isMultiSelect) {
                        return [data.id];
                    }
                    return data.id;
                };
                /**
                 * Get selected work place id
                 */
                TreeComponentScreenModel.prototype.getSelectedWorkplace = function () {
                    if (this.isMultiSelect) {
                        return this.selectedIds() ? this.selectedIds() : [];
                    }
                    return [this.selectedIds()];
                };
                /**
                 * Find UnitModel by id
                 */
                TreeComponentScreenModel.prototype.findUnitModelByWorkplaceId = function (dataList, workplaceId, listModel) {
                    var self = this;
                    for (var _i = 0, dataList_3 = dataList; _i < dataList_3.length; _i++) {
                        var item = dataList_3[_i];
                        if (item.id == workplaceId) {
                            var modelString = JSON.stringify(listModel);
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
                };
                /**
                 * Find selected row data
                 */
                TreeComponentScreenModel.prototype.findSelectionRowData = function (dataList, listRowData) {
                    var self = this;
                    var selectedWorkplaces = self.getSelectedWorkplace();
                    var _loop_1 = function (unitModel) {
                        if (_.some(selectedWorkplaces, function (id) { return id == unitModel.id; })) {
                            listRowData.push({
                                id: unitModel.id,
                                code: unitModel.code
                            });
                        }
                        if (unitModel.children.length > 0) {
                            this_1.findSelectionRowData(unitModel.children, listRowData);
                        }
                    };
                    var this_1 = this;
                    for (var _i = 0, dataList_4 = dataList; _i < dataList_4.length; _i++) {
                        var unitModel = dataList_4[_i];
                        _loop_1(unitModel);
                    }
                };
                /**
                 * Get ComId Search Box by multiple choice
                 */
                TreeComponentScreenModel.prototype.getComIdSearchBox = function () {
                    if (this.isMultiSelect) {
                        return 'multiple-tree-grid-' + this.$inputId();
                    }
                    return 'single-tree-grid-' + this.$inputId();
                };
                /**
                 * Filter list work place follow selected level
                 */
                TreeComponentScreenModel.prototype.filterByLevel = function (dataList, level, listModel) {
                    var self = this;
                    for (var _i = 0, dataList_5 = dataList; _i < dataList_5.length; _i++) {
                        var item = dataList_5[_i];
                        var newItem = {};
                        if (item.level <= level) {
                            self.listId.push(item.id);
                            newItem = JSON.parse(JSON.stringify(item));
                            listModel.push(newItem);
                            if (level == 1) {
                                newItem.children = [];
                            }
                            else if (item.children && item.children.length > 0) {
                                var tmpModels = this.filterByLevel(newItem.children, level, new Array());
                                newItem.children = tmpModels;
                            }
                        }
                    }
                    return listModel;
                };
                return TreeComponentScreenModel;
            }());
            tree.TreeComponentScreenModel = TreeComponentScreenModel;
            var service;
            (function (service) {
                // Service paths.
                var servicePath = {
                    //hoatt NEW職場・部門
                    findDepWkpTree: "bs/employee/wkpdep/get-wkpdepinfo-kcp004",
                };
                /**
                 * Find department or workplace list.
                 */
                function findDepWkpTree(param) {
                    if (_.isNil(param.systemType)) {
                        var dfd = $.Deferred();
                        dfd.resolve([]);
                        return dfd.promise();
                    }
                    return nts.uk.request.ajax('com', servicePath.findDepWkpTree, param);
                }
                service.findDepWkpTree = findDepWkpTree;
            })(service = tree.service || (tree.service = {}));
            var TreeComponentTextResource = /** @class */ (function () {
                function TreeComponentTextResource() {
                }
                TreeComponentTextResource.KCP004_2 = nts.uk.resource.getText('KCP004_2');
                TreeComponentTextResource.KCP004_3 = nts.uk.resource.getText('KCP004_3');
                TreeComponentTextResource.KCP004_4 = nts.uk.resource.getText('KCP004_4');
                TreeComponentTextResource.KCP004_7 = nts.uk.resource.getText('KCP004_7');
                TreeComponentTextResource.KCP004_8 = nts.uk.resource.getText('KCP004_8');
                return TreeComponentTextResource;
            }());
            tree.TreeComponentTextResource = TreeComponentTextResource;
            var TREE_COMPONENT_HTML = "<style type=\"text/css\">\n#nts-component-list .nts-searchbbox-wrapper {\n    float: left;\n}\n\n/* fix bug show unexpected selector column on page with sidebar on IE */\n#single-tree-grid_container .ui-iggrid-rowselector-header {\n    border: 0px;\n}\n#single-tree-grid_container .ui-iggrid-rowselector-class {\n    border: 0px;\n}\n\n</style>\n    <div id=\"nts-component-tree\" style=\"border-radius: 5px;\" tabindex=\"-1\"\n        data-bind=\"css: {'caret-right caret-background bg-green' : !isDialog},\n            style: {padding: hasPadding ? '20px' : '0px'}\">\n        <!-- ko if: !isDialog -->\n            <i class=\"icon icon-searchbox\"></i>\n        <!-- /ko -->\n        <div class=\"row-search control-group valign-center\" style =\"width: 430px;\" data-bind=\"visible: !isMultipleUse\">\n            <div data-bind=\"ntsFormLabel: {required: true}\">" + TreeComponentTextResource.KCP004_2 + "</div>\n            <div class=\"base-date-editor\" id=\"work-place-base-date\"\n                style=\"margin-left: 0; margin-right: 5px;\"\n                data-bind=\"attr: {tabindex: tabindex},\n                ntsDatePicker: {dateFormat: 'YYYY/MM/DD', value: baseDate, name:'#[KCP004_2]', required: true}\"></div>\n            <button\n                data-bind=\"click: reload, attr: {tabindex: tabindex}\"\n                style=\"min-width: 65px\">" + TreeComponentTextResource.KCP004_3 + "</button>\n            <div data-bind=\"ntsFormLabel: {}\" style=\"margin-left: 30px; border-color: transparent;\">" + TreeComponentTextResource.KCP004_4 + "</div>\n            <div id=\"combo-box-tree-component\"\n                style=\"width: 60px; margin-left: -10px;\"\n                data-bind=\"attr: {tabindex: tabindex}, ntsComboBox: {\n                    options: levelList,\n                    optionsValue: 'level',\n                    value: levelSelected,\n                    optionsText: 'name',\n                    editable: false,\n                    enable: true,\n                    columns: [\n                        { prop: 'name', length: 4 },\n                    ]}\"></div>\n        </div>\n        <div class = \"search-filter\" style=\"margin-top:10px \" data-bind=\"style: { width: '450px' }\">\n            <div style=\"display: inline-block; float: left\" data-bind=\"attr: {id: searchBoxId, tabindex: tabindex}, style: { width : !isMultipleUse ? '327px' : '268px'}\">\n            </div>\n            <div style=\"display: inline-block; margin-left: 2px; float: left\">\n                <!-- ko if: isShowSelectButton -->\n                    <button\n                        data-bind=\"click: selectSubParent, attr: {tabindex: tabindex}\">" + TreeComponentTextResource.KCP004_8 + "</button>\n                <!-- /ko -->\n            </div>\n            <div id=\"hierarchy\" style=\"margin-top: 10px; margin-bottom: 10px;\" data-bind=\"visible: isMultipleUse\">\n                        <div data-bind=\"ntsFormLabel: {}\" style=\"margin-left: 10px; float: left; border-color: transparent;\">" + TreeComponentTextResource.KCP004_4 + "</div>\n                        <div id=\"combo-box-tree-component\"\n                            style=\"width: 60px; margin-left: 5px; float: left\"\n                            data-bind=\"attr: {tabindex: tabindex}, ntsComboBox: {\n                                options: levelList,\n                                optionsValue: 'level',\n                                value: levelSelected,\n                                optionsText: 'name',\n                                editable: false,\n                                enable: true,\n                                columns: [\n                                    { prop: 'name', length: 4 },\n                                ]}\"></div>\n             </div>\n        </div>\n        <div class=\"cf\"></div>\n        <!-- ko if: !isMultiSelect -->\n            <table class=\"cf\" data-bind=\"attr: {tabindex: tabindex, id: 'single-tree-grid-' + $inputId()}\">\n            </table>\n        <!-- /ko -->\n        <!-- ko if: isMultiSelect -->\n            <table class=\"cf\" data-bind=\"attr: {tabindex: tabindex, id: 'multiple-tree-grid-' + $inputId()}\">\n            </table>\n        <!-- /ko -->\n    </div>";
        })(tree = share.tree || (share.tree = {}));
    })(share = kcp.share || (kcp.share = {}));
})(kcp || (kcp = {}));
(function ($) {
    $.fn.ntsTreeComponent = function (option) {
        // Return.
        return new kcp.share.tree.TreeComponentScreenModel().init(this, option);
    };
}(jQuery));
//# sourceMappingURL=tree.js.map