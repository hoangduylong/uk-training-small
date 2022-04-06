var kcp;
(function (kcp) {
    var share;
    (function (share) {
        var list;
        (function (list) {
            var ClosureSelectionType = /** @class */ (function () {
                function ClosureSelectionType() {
                }
                ClosureSelectionType.SELECT_FULL_OPTION = 1;
                ClosureSelectionType.SELECT_BY_SELECTED_CODE = 2;
                ClosureSelectionType.NO_SELECT = 3;
                return ClosureSelectionType;
            }());
            list.ClosureSelectionType = ClosureSelectionType;
            var SelectType = /** @class */ (function () {
                function SelectType() {
                }
                SelectType.SELECT_BY_SELECTED_CODE = 1;
                SelectType.SELECT_ALL = 2;
                SelectType.SELECT_FIRST_ITEM = 3;
                SelectType.NO_SELECT = 4;
                return SelectType;
            }());
            list.SelectType = SelectType;
            /**
             * List Type
             */
            var ListType = /** @class */ (function () {
                function ListType() {
                }
                ListType.EMPLOYMENT = 1;
                ListType.Classification = 2;
                ListType.JOB_TITLE = 3;
                ListType.EMPLOYEE = 4;
                ListType.WORKPLACE = 5;
                return ListType;
            }());
            list.ListType = ListType;
            /**
             * Screen Model.
             */
            var ListComponentScreenModel = /** @class */ (function () {
                function ListComponentScreenModel() {
                    this.itemList = ko.observableArray([]);
                    this.listComponentColumn = [];
                    this.isMultipleUse = false;
                    this.isMultipleSelect = false;
                    this.componentGridId = (Date.now()).toString();
                    this.alreadySettingList = ko.observableArray([]);
                    this.isDisplayClosureSelection = false;
                    this.isDisplayFullClosureOption = true;
                    this.closureSelectionType = ClosureSelectionType.NO_SELECT;
                    this.closureList = ko.observableArray([]);
                    this.hasUpdatedOptionalContent = ko.observable(false);
                    // set random id to prevent bug caused by calling multiple component on the same page
                    this.componentWrapperId = nts.uk.util.randomId();
                    this.searchBoxId = nts.uk.util.randomId();
                    this.isSelectAllAfterReload = true;
                    this.disableSelection = false;
                    this.isRemoveFilterWhenReload = true;
                }
                /**
                 * Init component.
                 */
                ListComponentScreenModel.prototype.init = function ($input, data) {
                    var dfd = $.Deferred();
                    var self = this;
                    $(document).undelegate('#' + self.componentGridId, 'iggriddatarendered');
                    // clear subscriptions
                    if (data.subscriptions) {
                        _.each(data.subscriptions, function (sub) {
                            sub.dispose();
                        });
                    }
                    // Init self data.
                    if (!nts.uk.util.isNullOrUndefined(data) && !nts.uk.util.isNullOrUndefined(data.isMultipleUse)) {
                        self.isMultipleUse = data.isMultipleUse;
                    }
                    self.componentOption = data;
                    self.isMultipleSelect = data.isMultiSelect;
                    self.targetKey = data.listType == ListType.JOB_TITLE ? 'id' : 'code';
                    self.maxRows = data.maxRows ? data.maxRows : 12;
                    self.selectType = data.selectType;
                    self.selectedCodes = data.selectedCode;
                    self.isDialog = data.isDialog;
                    self.hasPadding = _.isNil(data.hasPadding) ? true : data.hasPadding; // default = true
                    // 複数使用区分　＝　単独使用 : show baseDate
                    // 複数使用区分　＝　複数使用 : hide baseDate
                    self.hasBaseDate = data.listType == ListType.JOB_TITLE && !data.isMultipleUse;
                    self.isShowNoSelectRow = data.isShowNoSelectRow;
                    self.isShowAlreadySet = data.isShowAlreadySet;
                    self.isShowWorkPlaceName = data.isShowWorkPlaceName;
                    self.showOptionalColumn = data.showOptionalColumn ? data.showOptionalColumn : false;
                    self.optionalColumnName = data.optionalColumnName;
                    self.optionalColumnDatasource = (data.optionalColumnDatasource != null) ? data.optionalColumnDatasource : ko.observableArray([]);
                    self.selectedClosureId = ko.observable(null);
                    self.isSelectAllAfterReload = _.isNil(data.isSelectAllAfterReload) ? false : data.isSelectAllAfterReload;
                    self.disableSelection = data.disableSelection;
                    if (data.isRemoveFilterWhenReload !== undefined) {
                        self.isRemoveFilterWhenReload = data.isRemoveFilterWhenReload;
                    }
                    // Init data for employment list component.
                    if (data.listType == ListType.EMPLOYMENT) {
                        self.selectedClosureId = _.isFunction(data.selectedClosureId) ?
                            data.selectedClosureId : ko.observable(data.selectedClosureId);
                        self.isDisplayClosureSelection = data.isDisplayClosureSelection ? true : false;
                        self.isDisplayFullClosureOption = data.isDisplayFullClosureOption ? true : false;
                        self.closureSelectionType = data.closureSelectionType ? data.closureSelectionType : ClosureSelectionType.NO_SELECT;
                        if (data.isDisplayClosureSelection) {
                            self.initSelectClosureOption(data);
                        }
                    }
                    self.initGridStyle(data);
                    self.listType = data.listType;
                    self.tabIndex = this.getTabIndexByListType(data);
                    if (data.baseDate) {
                        self.baseDate = data.baseDate;
                    }
                    else {
                        self.baseDate = ko.observable(new Date());
                    }
                    // Setup list column.
                    self.setupListColumns();
                    // With list type is employee list, use employee input.
                    if (self.listType == ListType.EMPLOYEE) {
                        self.initEmployeeSubscription(data);
                        self.initComponent(data, data.employeeInputList(), $input).done(function () {
                            dfd.resolve(self);
                        });
                        return dfd.promise();
                    }
                    // Find data list.
                    this.findDataList(data.listType).done(function (dataList) {
                        self.initComponent(data, dataList, $input).done(function () {
                            dfd.resolve(self);
                        });
                    });
                    return dfd.promise();
                };
                /**
                 * Reload nts grid list
                 */
                ListComponentScreenModel.prototype.reloadNtsGridList = function () {
                    var self = this;
                    var gridList = $('#' + self.componentGridId);
                    var searchBox = $('#' + self.searchBoxId);
                    if (!_.isEmpty(gridList) && gridList.hasClass('nts-gridlist')) {
                        _.defer(function () {
                            // clear search box before update datasource
                            if (self.isRemoveFilterWhenReload) {
                                searchBox.find('.clear-btn').click();
                            }
                            // update datasource
                            gridList.ntsGridList("setDataSource", self.itemList());
                            _.defer(function () {
                                if (self.listType !== ListType.EMPLOYEE) {
                                    searchBox.ntsSearchBox("setDataSource", self.itemList());
                                }
                                // select all items in multi mode
                                if (self.isSelectAllAfterReload && !_.isEmpty(self.itemList()) && self.isMultipleSelect) {
                                    var selectedValues = _.map(self.itemList(), function (item) { return self.listType == ListType.JOB_TITLE ? item.id : item.code; });
                                    if (_.isEmpty(selectedValues)) {
                                        self.selectedCodes([]);
                                    }
                                    else {
                                        gridList.ntsGridList("setSelectedValue", selectedValues);
                                    }
                                    /*setTimeout(function() {
                                        let chk = gridList.closest('.ui-iggrid').find(".ui-iggrid-rowselector-header").find("span[data-role='checkbox']");
                                        if (chk[0].getAttribute("data-chk") == "off") {
                                            chk.click();
                                        }
                                    }, 1);*/
                                }
                            });
                        });
                    }
                };
                ListComponentScreenModel.prototype.loadNtsGridList = function () {
                    var self = this;
                    self.initNoSelectRow();
                    self.setOptionalContent();
                    _.defer(function () {
                        // Set default value when init component.
                        self.initSelectedValue();
                        var options;
                        // fix bug constructor of value of knockoutObservableArray != Array.
                        var selectedCodes = self.isMultipleSelect ? [].slice.call(self.selectedCodes()) : self.selectedCodes();
                        if (self.disableSelection) {
                            var selectionDisables = _.map(self.itemList(), 'code');
                            options = {
                                width: self.componentOption.width ? self.componentOption.width : self.gridStyle.totalColumnSize,
                                dataSource: self.itemList(),
                                primaryKey: self.targetKey,
                                columns: self.listComponentColumn,
                                multiple: true,
                                value: selectionDisables,
                                name: self.getItemNameForList(),
                                rows: self.maxRows,
                                selectionDisables: selectionDisables
                            };
                        }
                        else {
                            options = {
                                width: self.componentOption.width ? self.componentOption.width : self.gridStyle.totalColumnSize,
                                dataSource: self.itemList(),
                                primaryKey: self.targetKey,
                                columns: self.listComponentColumn,
                                multiple: self.isMultipleSelect,
                                value: selectedCodes,
                                name: self.getItemNameForList(),
                                rows: self.maxRows,
                            };
                        }
                        var searchBoxOptions = {
                            searchMode: 'filter',
                            targetKey: self.targetKey,
                            comId: self.componentGridId,
                            items: self.itemList(),
                            selected: selectedCodes,
                            selectedKey: self.targetKey,
                            fields: ['name', 'code'],
                            mode: 'igGrid'
                        };
                        // load ntsGrid & searchbox component
                        $('#' + self.searchBoxId).ntsSearchBox(searchBoxOptions);
                        $('#' + self.componentGridId).ntsGridList(options);
                        // setup event
                        self.initEvent();
                        // set focus if parent screen has no focus
                        if (document.activeElement.tagName == 'BODY') {
                            _.defer(function () { return $('#' + self.searchBoxId + ' .ntsSearchBox').focus(); });
                        }
                    });
                };
                // set up on selected code changed event
                ListComponentScreenModel.prototype.initEvent = function () {
                    var self = this;
                    var gridList = $('#' + self.componentGridId);
                    gridList.on('selectionchanged', function (evt) {
                        var selectedValues = gridList.ntsGridList("getSelectedValue");
                        var selectedIds = self.isMultipleSelect ? _.map(selectedValues, function (o) { return o.id; }) : selectedValues.id;
                        if (!_.isEqual(self.selectedCodes(), selectedIds)) {
                            self.selectedCodes(selectedIds);
                        }
                    });
                    gridList.on('selectChange', function (evt) {
                        // scroll to top if select all
                        if ((!_.isEmpty(self.selectedCodes())) && (self.itemList().length == self.selectedCodes().length)) {
                            gridList.igGrid("virtualScrollTo", '0px');
                        }
                    });
                    self.selectedCodes.subscribe(function () {
                        // can not use OUTSIDE "gridList" variable here. must to use $('#' + self.componentGridId)
                        var gridList = $('#' + self.componentGridId);
                        if (gridList.length > 0) {
                            _.defer(function () {
                                var selectedValues = gridList.ntsGridList("getSelectedValue");
                                if (_.isEmpty(selectedValues)) {
                                    gridList.ntsGridList('setSelected', self.selectedCodes());
                                }
                                else {
                                    var selectedIds = self.isMultipleSelect ? _.map(selectedValues, function (o) { return o.id; }) : selectedValues.id;
                                    if (!_.isEqual(self.selectedCodes(), selectedIds)) {
                                        gridList.ntsGridList('setSelected', self.selectedCodes());
                                    }
                                }
                            });
                        }
                    });
                };
                ListComponentScreenModel.prototype.initEmployeeSubscription = function (data) {
                    var self = this;
                    if (data.subscriptions) {
                        data.subscriptions.push(data.employeeInputList.subscribe(function (dataList) {
                            self.addAreadySettingAttr(dataList, self.alreadySettingList());
                            self.itemList(dataList);
                        }));
                    }
                    else {
                        data.employeeInputList.subscribe(function (dataList) {
                            self.addAreadySettingAttr(dataList, self.alreadySettingList());
                            self.itemList(dataList);
                        });
                    }
                };
                /**
                 * Setup list columns
                 */
                ListComponentScreenModel.prototype.setupListColumns = function () {
                    var self = this;
                    // id column
                    if (self.listType == ListType.JOB_TITLE) {
                        self.listComponentColumn.push({ headerText: '', hidden: true, prop: 'id' });
                    }
                    // code column
                    self.listComponentColumn.push({
                        headerText: nts.uk.resource.getText('KCP001_2'), prop: 'code', width: self.gridStyle.codeColumnSize,
                        formatter: function (code) {
                            return code;
                        }
                    });
                    // name column
                    self.listComponentColumn.push({
                        headerText: nts.uk.resource.getText('KCP001_3'), prop: 'name', width: self.gridStyle.nameColumnSize,
                        template: "<td class='list-component-name-col'>${name}</td>",
                    });
                    // workplace name column
                    if (self.listType == ListType.EMPLOYEE && self.isShowWorkPlaceName) {
                        self.listComponentColumn.push({
                            headerText: nts.uk.resource.getText('KCP005_4'), prop: 'affiliationName', width: self.gridStyle.workplaceColumnSize,
                            template: "<td class='list-component-name-col'>${affiliationName}</td>"
                        });
                    }
                    // optional column
                    if (self.showOptionalColumn) {
                        self.addOptionalContentToItemList();
                        self.listComponentColumn.push({
                            headerText: self.optionalColumnName, prop: 'optionalColumn', width: self.gridStyle.optionalColumnSize,
                            template: "<td class='list-component-name-col'>${optionalColumn}</td>"
                        });
                    }
                    // Already setting column
                    if (self.isShowAlreadySet) {
                        self.listComponentColumn.push({
                            headerText: nts.uk.resource.getText('KCP001_4'), prop: 'isAlreadySetting', width: self.gridStyle.alreadySetColumnSize,
                            formatter: function (isAlreadySet) {
                                if (isAlreadySet == true || isAlreadySet == 'true') {
                                    return '<div class="already-setting" style="text-align: center;max-height: 18px;"><i class="icon icon-78"></i></div>';
                                }
                                return '';
                            }
                        });
                    }
                };
                /**
                 * Add optional content to item list
                 */
                ListComponentScreenModel.prototype.addOptionalContentToItemList = function () {
                    var self = this;
                    var mappedList = _.map(self.itemList(), function (item) {
                        var found = _.find(self.optionalColumnDatasource(), function (vl) { return vl.empId == item.code; });
                        item.optionalColumn = found ? found.content : '';
                        return item;
                    });
                    self.hasUpdatedOptionalContent(true);
                    self.itemList(mappedList);
                };
                /**
                 * Inint Closure Selection Type.
                 */
                ListComponentScreenModel.prototype.initSelectClosureOption = function (data) {
                    var self = this;
                    switch (data.closureSelectionType) {
                        case ClosureSelectionType.SELECT_FULL_OPTION:
                            if (data.isDisplayFullClosureOption) {
                                self.selectedClosureId(0);
                            }
                            break;
                        case ClosureSelectionType.SELECT_BY_SELECTED_CODE:
                            break;
                        case ClosureSelectionType.NO_SELECT:
                            self.selectedClosureId(data.isDisplayFullClosureOption ? 0 : 1);
                            break;
                        default:
                            break;
                    }
                };
                /**
                 * Init component.
                 */
                ListComponentScreenModel.prototype.initComponent = function (data, dataList, $input) {
                    var dfd = $.Deferred();
                    var self = this;
                    if (self.showOptionalColumn) {
                        self.optionalColumnDatasource.subscribe(function (vl) {
                            self.addOptionalContentToItemList();
                        });
                    }
                    // Map already setting attr to data list.
                    if (!_.isNil(data.alreadySettingList)) {
                        self.alreadySettingList = data.alreadySettingList;
                        self.addAreadySettingAttr(dataList, self.alreadySettingList());
                        // subscribe when alreadySettingList update => reload component.
                        self.alreadySettingList.subscribe(function (newSettings) {
                            var currentDataList = self.itemList();
                            self.addAreadySettingAttr(currentDataList, newSettings);
                            self.itemList(currentDataList);
                        });
                    }
                    self.itemList(dataList);
                    self.addOptionalContentToItemList();
                    // Init component.
                    var fields = ['name', 'code'];
                    if (data.isShowWorkPlaceName) {
                        fields.push('affiliationName');
                    }
                    var startComponent = function () {
                        $input.html(LIST_COMPONENT_HTML);
                        $input.find('table').attr('id', self.componentGridId);
                        ko.cleanNode($input[0]);
                        ko.applyBindings(self, $input[0]);
                        $input.find('.base-date-editor').find('.nts-input').width(133);
                        self.loadNtsGridList();
                        // ReloadNtsGridList when itemList changed
                        self.itemList.subscribe(function (newList) {
                            self.setOptionalContent();
                            self.initNoSelectRow();
                            self.reloadNtsGridList();
                            self.createGlobalVarDataList(newList, $input);
                        });
                        if (data.listType == ListType.EMPLOYMENT) {
                            self.selectedClosureId.subscribe(function (id) {
                                self.componentOption.selectedClosureId(id); // update selected closureId to caller's screen
                                self.reloadEmployment(id);
                            });
                        }
                        $(document).delegate('#' + self.componentGridId, "iggridrowsrendered", function (evt) {
                            self.addIconToAlreadyCol();
                        });
                        // defined function get data list.
                        self.createGlobalVarDataList(dataList, $input);
                        $.fn.getDataList = function () {
                            return window['dataList' + this.attr('id').replace(/-/gi, '')];
                        };
                        // defined function focus
                        $.fn.focusComponent = function () {
                            if (self.hasBaseDate) {
                                $input.find('.base-date-editor').first().focus();
                            }
                            else {
                                $input.find(".ntsSearchBox").focus();
                            }
                        };
                        $.fn.reloadJobtitleDataList = self.reload;
                        $.fn.isNoSelectRowSelected = function () {
                            if (self.isMultipleSelect) {
                                return false;
                            }
                            var selectedRow = $('#' + self.componentGridId).igGridSelection("selectedRow");
                            if (selectedRow && selectedRow.id === '' && selectedRow.index > -1) {
                                return true;
                            }
                            return false;
                        };
                        dfd.resolve();
                    };
                    if (_.isNil(ko.dataFor(document.body))) {
                        nts.uk.ui.viewModelApplied.add(startComponent);
                    }
                    else {
                        startComponent();
                    }
                    if (data.autoAdjustHeight) {
                        self.autoAdjustHeight(data, $input);
                    }
                    return dfd.promise();
                };
                /**
                 * Set optional content
                 */
                ListComponentScreenModel.prototype.setOptionalContent = function () {
                    var self = this;
                    if (self.showOptionalColumn && !self.hasUpdatedOptionalContent()) {
                        self.addOptionalContentToItemList();
                    }
                    self.hasUpdatedOptionalContent(false);
                };
                /**
                 * Add No select row to list
                 */
                ListComponentScreenModel.prototype.initNoSelectRow = function () {
                    var self = this;
                    var noSelectRow = _.find(self.itemList(), function (item) { return item.code === ''; });
                    // Check is show no select row.
                    if (self.isShowNoSelectRow && !self.isMultipleSelect && _.isNil(noSelectRow)) {
                        self.itemList.unshift({ code: '', id: '', name: nts.uk.resource.getText('KCP001_5'), isAlreadySetting: false });
                    }
                    if ((!self.isShowNoSelectRow || self.isMultipleSelect) && !_.isNil(noSelectRow)) {
                        self.itemList.remove(noSelectRow);
                    }
                };
                /**
                 * Get tab index by list type.
                 */
                ListComponentScreenModel.prototype.getTabIndexByListType = function (data) {
                    if (data.tabindex) {
                        return {
                            searchBox: data.tabindex,
                            table: data.tabindex,
                            baseDateInput: data.tabindex,
                            decideButton: data.tabindex
                        };
                    }
                    switch (data.listType) {
                        case ListType.EMPLOYMENT, ListType.Classification:
                            return {
                                searchBox: 1,
                                table: 2
                            };
                        case ListType.JOB_TITLE:
                            return {
                                searchBox: 3,
                                table: 4,
                                baseDateInput: 1,
                                decideButton: 2
                            };
                        case ListType.EMPLOYEE:
                            return {
                                searchBox: 1,
                                table: 2,
                                selectAllButton: 3
                            };
                    }
                    return {
                        searchBox: 1,
                        table: 2
                    };
                };
                /**
                 * create Global Data List.
                 */
                ListComponentScreenModel.prototype.createGlobalVarDataList = function (dataList, $input) {
                    var dataListCloned = _.cloneDeep(dataList);
                    _.remove(dataListCloned, function (item) { return !item.id && !item.code; });
                    $('#script-for-' + $input.attr('id')).remove();
                    var s = document.createElement("script");
                    s.type = "text/javascript";
                    s.innerHTML = 'var dataList' + $input.attr('id').replace(/-/gi, '') + ' = ' + JSON.stringify(dataListCloned);
                    s.id = 'script-for-' + $input.attr('id');
                    $("head").append(s);
                };
                /**
                 * Add Icon to already column setting
                 */
                ListComponentScreenModel.prototype.addIconToAlreadyCol = function () {
                    // Add icon to column already setting.
                    var iconLink = nts.uk.request.location.siteRoot
                        .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                        .mergeRelativePath('/view/kcp/share/icon/icon78.png').serialize();
                    $('.icon-78').attr('style', "background: url('" + iconLink + "');width: 20px;height: 20px;background-size: 20px 20px;");
                };
                /**
                 * Init default selected value.
                 */
                ListComponentScreenModel.prototype.initSelectedValue = function () {
                    var self = this;
                    switch (self.selectType) {
                        case SelectType.SELECT_BY_SELECTED_CODE:
                            if (self.isShowNoSelectRow && _.isEmpty(self.selectedCodes())) {
                                self.selectedCodes("");
                            }
                            return;
                        case SelectType.SELECT_ALL:
                            if (!self.isMultipleSelect) {
                                return;
                            }
                            self.selectedCodes(self.itemList().map(function (item) { return self.listType == ListType.JOB_TITLE ? item.id : item.code; }));
                            return;
                        case SelectType.SELECT_FIRST_ITEM:
                            self.selectedCodes(_.isEmpty(self.itemList()) ? null : self.selectData(self.itemList()[0]));
                            return;
                        case SelectType.NO_SELECT:
                            self.selectedCodes(self.isMultipleSelect ? [] : null);
                            return;
                        default:
                            self.selectedCodes(self.isMultipleSelect ? [] : null);
                    }
                };
                /**
                 * Add Aready Setting Attr into data list.
                 */
                ListComponentScreenModel.prototype.addAreadySettingAttr = function (dataList, alreadySettingList) {
                    if (this.listType == ListType.JOB_TITLE) {
                        // Use id to set already  setting list.
                        var alreadyListCode = alreadySettingList.filter(function (item) { return item.isAlreadySetting; }).map(function (item) { return item.id; });
                        dataList.map((function (item) {
                            item.isAlreadySetting = alreadyListCode.indexOf(item.id) > -1;
                        }));
                        return;
                    }
                    var alreadyListCode = alreadySettingList.filter(function (item) { return item.isAlreadySetting; }).map(function (item) { return item.code; });
                    dataList.map((function (item) {
                        item.isAlreadySetting = alreadyListCode.indexOf(item.code) > -1;
                    }));
                };
                /**
                 * Select data for multiple or not
                 */
                ListComponentScreenModel.prototype.selectData = function (data) {
                    var self = this;
                    if (self.isMultipleSelect) {
                        return self.listType == ListType.JOB_TITLE ? [data.id] : [data.code];
                    }
                    if (self.listType == ListType.JOB_TITLE) {
                        return data.id;
                    }
                    return data.code;
                };
                /**
                 * Init Grid Style.
                 */
                ListComponentScreenModel.prototype.initGridStyle = function (data) {
                    var self = this;
                    var codeColumnSize = 50;
                    var companyColumnSize = 0;
                    var heightOfRow = data.isMultiSelect ? 24 : 23;
                    switch (data.listType) {
                        case ListType.EMPLOYMENT:
                            break;
                        case ListType.JOB_TITLE:
                            codeColumnSize = 70;
                            break;
                        case ListType.Classification:
                            codeColumnSize = 120;
                            break;
                        case ListType.EMPLOYEE:
                            codeColumnSize = 120;
                            companyColumnSize = data.isShowWorkPlaceName ? 150 : 0;
                            break;
                        default:
                            break;
                    }
                    var alreadySettingColSize = data.isShowAlreadySet ? 70 : 0;
                    var multiSelectColSize = data.isMultiSelect ? 55 : 0;
                    var minTotalSize = 280;
                    var totalRowsHeight = heightOfRow * this.maxRows + 20;
                    var totalHeight = self.calcTotalHeightRev(data);
                    var optionalColumnSize = 0;
                    if (this.showOptionalColumn) {
                        codeColumnSize = data.maxWidth ? '15%' : codeColumnSize;
                        var nameColumnSize = data.maxWidth ? '30%' : 170;
                        var workplaceColumnSize = data.maxWidth ? '20%' : 150;
                        var alreadySetColumnSize = data.maxWidth ? '15%' : 40;
                        optionalColumnSize = data.maxWidth ? '20%' : 150;
                    }
                    else {
                        codeColumnSize = data.maxWidth ? '30%' : codeColumnSize;
                        var nameColumnSize = data.maxWidth ? '30%' : 170;
                        var workplaceColumnSize = data.maxWidth ? '30%' : 150;
                        var alreadySetColumnSize = data.maxWidth ? '15%' : 40;
                    }
                    var totalColumnSize = data.maxWidth ? data.maxWidth : codeColumnSize + 170 + companyColumnSize
                        + alreadySettingColSize + multiSelectColSize + optionalColumnSize;
                    this.gridStyle = {
                        codeColumnSize: codeColumnSize,
                        totalColumnSize: Math.max(minTotalSize, totalColumnSize),
                        totalComponentSize: Math.max(minTotalSize, totalColumnSize) + 2,
                        totalHeight: totalHeight + totalRowsHeight,
                        rowHeight: totalRowsHeight,
                        nameColumnSize: nameColumnSize,
                        workplaceColumnSize: workplaceColumnSize,
                        alreadySetColumnSize: alreadySetColumnSize,
                        optionalColumnSize: optionalColumnSize
                    };
                    if (data.maxWidth && data.maxWidth <= 280) {
                        data.maxWidth = 280;
                    }
                };
                ListComponentScreenModel.prototype.calcTotalHeightRev = function (data) {
                    var totalHeightRev = this.hasBaseDate || this.isDisplayClosureSelection ? 97 : 55;
                    if (data.listType === ListType.EMPLOYEE) {
                        totalHeightRev -= 48;
                    }
                    return totalHeightRev;
                };
                ListComponentScreenModel.prototype.autoAdjustHeight = function (data, $input) {
                    var _this = this;
                    _.defer(function () {
                        $("#" + _this.componentWrapperId).css("height", "auto");
                        _this.resetGridHeight(data, $input);
                        $(window).resize(function () { return _this.resetGridHeight(data, $input); });
                    });
                };
                ListComponentScreenModel.prototype.resetGridHeight = function (data, $input) {
                    var offsetTop = $input.offset().top;
                    var totalHeightRev = this.calcTotalHeightRev(data);
                    var PADDING = 20;
                    var MARGIN = 20;
                    var totalHeight = $(window).height() - $input.offset().top - PADDING * 2 - MARGIN;
                    var $grid = $('#' + this.componentGridId);
                    $grid.igGrid("option", "height", totalHeight - totalHeightRev);
                };
                /**
                 * Find data list.
                 */
                ListComponentScreenModel.prototype.findDataList = function (listType) {
                    var self = this;
                    var dfd = $.Deferred();
                    switch (listType) {
                        case ListType.EMPLOYMENT:
                            if (self.isDisplayClosureSelection) {
                                // Find all closure in current month.
                                service.findAllClosure().done(function (items) {
                                    items = _.sortBy(items, function (item) { return item.id; });
                                    self.closureList(items);
                                    // if show FullClosureOption -> add option.
                                    if (self.isDisplayFullClosureOption) {
                                        self.closureList.unshift({ id: 0, name: nts.uk.resource.getText('CCG001_64') });
                                    }
                                    var selectedClosure = 0;
                                    if (!self.selectedClosureId()) {
                                        selectedClosure = self.closureList().length > 1 ? self.closureList()[0].id : 0;
                                    }
                                    else {
                                        selectedClosure = self.selectedClosureId();
                                    }
                                    service.findEmployments(selectedClosure).done(function (data) {
                                        dfd.resolve(data);
                                    });
                                });
                                return dfd.promise();
                            }
                            else {
                                if (self.selectedClosureId()) {
                                    return service.findEmployments(self.selectedClosureId());
                                }
                                return service.findAllEmployments();
                            }
                        case ListType.JOB_TITLE:
                            return service.findJobTitles(this.baseDate());
                        case ListType.Classification:
                            return service.findClassifications();
                        case ListType.WORKPLACE:
                            return service.findAllWorkplace();
                        default:
                            return;
                    }
                };
                /**
                 * Select all.
                 */
                ListComponentScreenModel.prototype.selectAll = function () {
                    var self = this;
                    if (self.itemList().length == 0 || !self.isMultipleSelect) {
                        return;
                    }
                    var gridList = $('#' + self.componentGridId);
                    var allSelectedCodes = gridList.ntsGridList("getDataSource").map(function (item) { return item.code; });
                    self.selectedCodes(allSelectedCodes);
                    gridList.ntsGridList("setSelectedValue", allSelectedCodes);
                };
                /**
                 * Reload screen data.
                 */
                ListComponentScreenModel.prototype.reload = function () {
                    var self = this;
                    // Check if is has base date.
                    if ((self.hasBaseDate && (!self.baseDate() || self.baseDate().toString() == '')) || nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    self.findDataList(self.listType).done(function (data) {
                        if (self.alreadySettingList) {
                            self.addAreadySettingAttr(data, self.alreadySettingList());
                        }
                        _.defer(function () {
                            self.itemList(data);
                        });
                    });
                };
                /**
                 * Reload employment.
                 */
                ListComponentScreenModel.prototype.reloadEmployment = function (closureId) {
                    var self = this;
                    service.findEmployments(closureId).done(function (data) {
                        if (!_.isEmpty(self.alreadySettingList())) {
                            self.addAreadySettingAttr(data, self.alreadySettingList());
                        }
                        self.itemList(data);
                        var check = _.filter(data, function (i) { return self.componentOption.backupSelectedCode && i.code == self.componentOption.backupSelectedCode[0]; });
                        if (check.length > 0) {
                            self.componentOption.selectedCode(self.componentOption.backupSelectedCode);
                        }
                        else {
                            self.componentOption.selectedCode([]);
                        }
                    });
                };
                /**
                 * Get item name for each component type.
                 */
                ListComponentScreenModel.prototype.getItemNameForList = function () {
                    switch (this.listType) {
                        case ListType.EMPLOYMENT:
                            return '#[KCP001_1]';
                        case ListType.JOB_TITLE:
                            return '#[KCP003_1]';
                        case ListType.Classification:
                            return '#[KCP002_1]';
                        case ListType.EMPLOYEE:
                            return '#[KCP005_1]';
                        case ListType.WORKPLACE:
                            return '#[KCP012_1]';
                        default:
                            return '';
                    }
                };
                ListComponentScreenModel.prototype.getItemNameForBaseDate = function () {
                    if (this.hasBaseDate) {
                        return '#[KCP003_2]';
                    }
                    return '';
                };
                return ListComponentScreenModel;
            }());
            list.ListComponentScreenModel = ListComponentScreenModel;
            /**
             * Service,
             */
            var service;
            (function (service) {
                // Service paths.
                var servicePath = {
                    findEmployments: "bs/employee/employment/findAll/",
                    findJobTitles: 'bs/employee/jobtitle/findAll',
                    findClassifications: 'bs/employee/classification/findAll',
                    findAllClosureItems: 'ctx/at/shared/workrule/closure/find/currentyearmonthandused',
                    findEmploymentByClosureId: 'ctx/at/shared/workrule/closure/findEmpByClosureId/',
                    findEmploymentByCodes: 'bs/employee/employment/findByCodes',
                    findAllWorkplace: 'at/record/worklocation/kcp012'
                };
                /**
                 * Find Employment list.
                 */
                function findEmployments(closureId) {
                    // Find Employment Closure.
                    var dfd = $.Deferred();
                    nts.uk.request.ajax('at', servicePath.findEmploymentByClosureId + closureId).done(function (empList) {
                        if (empList && empList.length > 0) {
                            // Find by employment codes.
                            nts.uk.request.ajax('com', servicePath.findEmploymentByCodes, empList).done(function (data) {
                                data = _.sortBy(data, ['code']);
                                dfd.resolve(data);
                            });
                            return dfd.promise();
                        }
                        dfd.resolve([]);
                    });
                    return dfd.promise();
                }
                service.findEmployments = findEmployments;
                function findAllEmployments() {
                    var dfd = $.Deferred();
                    nts.uk.request.ajax('com', servicePath.findEmployments).done(function (data) {
                        data = _.sortBy(data, ['code']);
                        dfd.resolve(data);
                    });
                    return dfd.promise();
                }
                service.findAllEmployments = findAllEmployments;
                /**
                 * Find Closure list.
                 */
                function findAllClosure() {
                    return nts.uk.request.ajax('at', servicePath.findAllClosureItems);
                }
                service.findAllClosure = findAllClosure;
                /**
                 * Find Job title.
                 */
                function findJobTitles(baseDate) {
                    return nts.uk.request.ajax('com', servicePath.findJobTitles, { baseDate: baseDate });
                }
                service.findJobTitles = findJobTitles;
                /**
                 * Find Classification list.
                 */
                function findClassifications() {
                    return nts.uk.request.ajax('com', servicePath.findClassifications);
                }
                service.findClassifications = findClassifications;
                /**
                 * Find Workplace list.
                 */
                function findAllWorkplace() {
                    return nts.uk.request.ajax('at', servicePath.findAllWorkplace);
                }
                service.findAllWorkplace = findAllWorkplace;
            })(service = list.service || (list.service = {}));
            var ListComponentTextResource = /** @class */ (function () {
                function ListComponentTextResource() {
                }
                ListComponentTextResource.KCP003_2 = nts.uk.resource.getText('KCP003_2');
                ListComponentTextResource.KCP003_3 = nts.uk.resource.getText('KCP003_3');
                ListComponentTextResource.KCP004_7 = nts.uk.resource.getText('KCP004_7');
                ListComponentTextResource.CCG001_28 = nts.uk.resource.getText('CCG001_28');
                return ListComponentTextResource;
            }());
            list.ListComponentTextResource = ListComponentTextResource;
            var LIST_COMPONENT_HTML = "<style type=\"text/css\">\n#nts-component-list table tr td {\n    white-space: nowrap;\n}\n\n.float-left {\n    float: left;\n}\n</style>\n    <div style=\"border-radius: 5px;\"\n        data-bind=\"style: {width: gridStyle.totalComponentSize + 'px',\n                height: gridStyle.totalHeight + 'px',\n                padding: hasPadding ? '20px' : '0px'},\n                css: {'caret-right caret-background bg-green': !isDialog},\n                attr: {id: componentWrapperId}\">\n        <!-- ko if: (!isDialog && listType !== kcp.share.list.ListType.EMPLOYEE) -->\n            <i class=\"icon icon-searchbox\"></i>\n        <!-- /ko -->\n        <!-- ko if: hasBaseDate -->\n            <div data-bind=\"ntsFormLabel: {}\" style=\"margin-bottom: 10px;\">" + ListComponentTextResource.KCP003_2 + "</div>\n            <div class=\"base-date-editor\" style=\"margin-left: 20px;\"\n                data-bind=\"attr: {tabindex: tabIndex.baseDateInput}, ntsDatePicker: {dateFormat: 'YYYY/MM/DD', value: baseDate, name: getItemNameForBaseDate(), required: true}\"></div>\n            <div style=\"display: inline-flex\">\n                <button data-bind=\"attr: {tabindex: tabIndex.decideButton}, click: reload\"\n                    style=\"width: 50px\">" + ListComponentTextResource.KCP003_3 + "</button>\n            </div>\n        <!-- /ko -->\n        <!-- Upgrade: Search By closureId-->\n        <!-- ko if: isDisplayClosureSelection -->\n            <div style=\"margin-bottom: 10px\">\n                <div data-bind=\"ntsFormLabel: {required: true}\"\n                    style=\"float: left; margin-left: 10px; margin-right: 15px;\">" + ListComponentTextResource.CCG001_28 + "</div>\n                <div id=\"combo-box\" style=\"min-width: 160px;\"\n                    data-bind=\"ntsComboBox: {\n                                        options: closureList,\n                                        optionsValue: 'id',\n                                        visibleItemsCount: 5,\n                                        value: selectedClosureId,\n                                        enable: true,\n                                        columns: [\n                                            { prop: 'name', length: 4 },\n                                        ]}\"></div>\n            </div>\n        <!-- /ko -->\n        <!-- End of Upgrade -->\n\n        <!-- ko if: (listType !== kcp.share.list.ListType.EMPLOYEE  ) -->\n            <div data-bind=\" attr: {id: searchBoxId}, style:{width: gridStyle.totalComponentSize + 'px'}\" style=\"display: inline-block\"></div>\n        <!-- /ko -->\n        <table id=\"grid-list-all-kcp\"></table>\n    </div>";
        })(list = share.list || (share.list = {}));
    })(share = kcp.share || (kcp.share = {}));
})(kcp || (kcp = {}));
(function ($) {
    $.fn.ntsListComponent = function (option) {
        var $list = $(this);
        // Return.
        var dfd = $.Deferred();
        new kcp.share.list.ListComponentScreenModel().init(this, option).done(function (list) {
            $list.data("ntsListComponent", list);
            dfd.resolve(list);
        }).fail(function (er) {
            dfd.reject(er);
        });
        return dfd.promise();
    };
    $.fn.ntsListComponentApi = function (action, param) {
        var $list = $(this);
        switch (action) {
            case 'getSelectedRecords': {
                var list_1 = $list.data("ntsListComponent");
                if (_.isEmpty(list_1.selectedCodes())) {
                    return [];
                }
                var isId_1 = list_1.listType === kcp.share.list.ListType.JOB_TITLE;
                return _.filter(list_1.itemList(), function (item) {
                    if (list_1.isMultipleSelect) {
                        return list_1.selectedCodes().includes(isId_1 ? item.id : item.code);
                    }
                    return list_1.selectedCodes() === (isId_1 ? item.id : item.code);
                });
            }
        }
    };
}(jQuery));
//# sourceMappingURL=list.js.map