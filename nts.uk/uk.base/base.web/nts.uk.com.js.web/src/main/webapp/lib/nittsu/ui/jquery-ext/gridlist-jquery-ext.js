var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var ui;
        (function (ui_1) {
            var jqueryExtentions;
            (function (jqueryExtentions) {
                var ntsGridList;
                (function (ntsGridList) {
                    var OUTSIDE_AUTO_SCROLL_SPEED = {
                        RATIO: 0.2,
                        MAX: 30
                    };
                    $.fn.ntsGridListFeature = function (feature, action) {
                        var params = [];
                        for (var _i = 2; _i < arguments.length; _i++) {
                            params[_i - 2] = arguments[_i];
                        }
                        var $grid = $(this);
                        switch (feature) {
                            case 'switch':
                                switch (action) {
                                    case 'setValue':
                                        return setSwitchValue($grid, params);
                                }
                        }
                    };
                    function setSwitchValue($grid) {
                        var params = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            params[_i - 1] = arguments[_i];
                        }
                        var rowId = params[0][0];
                        var columnKey = params[0][1];
                        var selectedValue = params[0][2];
                        var $row = $($grid.igGrid("rowById", rowId));
                        var $parent = $row.find(".ntsControl");
                        var currentSelect = $parent.attr('data-value');
                        if (selectedValue !== currentSelect) {
                            var rowKey = $row.attr("data-id");
                            $parent.find(".nts-switch-button").removeClass("selected");
                            var element = _.find($parent.find(".nts-switch-button"), function (e) {
                                return selectedValue.toString() === $(e).attr('data-value').toString();
                            });
                            if (element !== undefined) {
                                var scrollTop_1 = $("#" + $grid.attr("id") + "_scrollContainer").scrollTop();
                                $(element).addClass('selected');
                                $parent.attr('data-value', selectedValue);
                                $grid.igGridUpdating("setCellValue", rowKey, columnKey, selectedValue);
                                $grid.igGrid("commit");
                                $grid.trigger("switchvaluechanged", { columnKey: columnKey, rowKey: rowKey, value: parseInt(selectedValue) });
                                if ($grid.igGrid("hasVerticalScrollbar")) {
                                    if (!nts.uk.util.isNullOrUndefined(scrollTop_1) && scrollTop_1 !== 0) {
                                        setTimeout(function () {
                                            $("#" + $grid.attr("id") + "_scrollContainer").scrollTop(scrollTop_1);
                                        }, 10);
                                    }
                                }
                            }
                        }
                    }
                    function delegateMethod($grid, action, param) {
                        switch (action) {
                            case 'setupSelecting':
                                return setupSelecting($grid);
                            case 'unsetupSelecting':
                                return unsetupSelecting($grid);
                            case 'getSelected':
                            case 'getSelectedValue':
                                return getSelected($grid);
                            case 'setSelected':
                                return setSelected($grid, param);
                            case 'setSelectedValue':
                                return setSelectedValue($grid, param);
                            case 'setDataSource':
                                $grid.data("initValue", null);
                                $grid.data("selectionDisables", null);
                                return setDataSource($grid, param);
                            case 'getDataSource':
                                return getDataSource($grid);
                            case 'deselectAll':
                                return deselectAll($grid);
                            case 'setupDeleteButton':
                                return setupDeleteButton($grid, param);
                            case 'setupScrollWhenBinding':
                                return setupScrollWhenBinding($grid);
                        }
                    }
                    function setupScrollWhenBinding($grid) {
                        var gridId = "#" + $grid.attr("id");
                        $(document).delegate(gridId, "iggriddatarendered", function (evt, ui) {
                            var oldSelected = getSelectRow($grid);
                            if (!nts.uk.util.isNullOrEmpty(oldSelected)) {
                                _.defer(function () {
                                    var selected = getSelectRow($grid);
                                    if (!nts.uk.util.isNullOrEmpty(selected)) {
                                        selected = oldSelected;
                                    }
                                    if ($grid.data('igGrid')) {
                                        var $scrollContainer = $grid.igGrid("scrollContainer");
                                        if ($scrollContainer.length > 0) {
                                            var firstRowOffset = $($("#single-list").igGrid("rowAt", 0)).offset().top;
                                            var selectRowOffset = $($("#single-list").igGrid("rowAt", index)).offset().top;
                                            $scrollContainer.scrollTop(selectRowOffset - firstRowOffset);
                                        }
                                        else if (selected && oldSelected) {
                                            var index = $(selected["element"]).attr("data-row-idx");
                                            $grid.igGrid("virtualScrollTo", nts.uk.util.isNullOrEmpty(index) ? oldSelected.index : parseInt(index));
                                        }
                                    }
                                });
                            }
                        });
                    }
                    function getSelectRow($grid) {
                        var row = null;
                        if ($grid.data("igGrid")) {
                            var selectedRows = $grid.igGrid("selectedRows");
                            if (selectedRows) {
                                row = selectedRows[0];
                            }
                            else {
                                row = $grid.igGrid("selectedRow");
                            }
                        }
                        return row;
                    }
                    function getSelected($grid) {
                        if ($grid.igGridSelection('option', 'multipleSelection')) {
                            var selectedRows = $grid.igGridSelection('selectedRows');
                            if (selectedRows)
                                return _.map(selectedRows, convertSelected);
                            return [];
                        }
                        else {
                            var selectedRow = $grid.igGridSelection('selectedRow');
                            if (selectedRow)
                                return convertSelected(selectedRow);
                            return undefined;
                        }
                    }
                    function convertSelected(igGridSelectedRow) {
                        return {
                            id: igGridSelectedRow.id,
                            index: igGridSelectedRow.index
                        };
                    }
                    function setSelected($grid, selectedId) {
                        deselectAll($grid);
                        if ($grid.igGridSelection('option', 'multipleSelection')) {
                            selectedId.forEach(function (id) { return $grid.igGridSelection('selectRowById', id); });
                        }
                        else {
                            $grid.igGridSelection('selectRowById', selectedId);
                        }
                    }
                    function deselectAll($grid) {
                        $grid.igGridSelection('clearSelection');
                    }
                    function setupDeleteButton($grid, param) {
                        var itemDeletedEvent = new CustomEvent("itemDeleted", {
                            detail: {},
                        });
                        var currentColumns = $grid.igGrid("option", "columns");
                        currentColumns.push({
                            dataType: "bool", columnCssClass: "delete-column", headerText: "test", key: param.deleteField,
                            width: 60, formatter: function createButton(deleteField, row) {
                                var primaryKey = $grid.igGrid("option", "primaryKey");
                                var result = $('<button tabindex="-1" class="small delete-button">Delete</button>');
                                result.attr("data-value", row[primaryKey]);
                                if (deleteField === true && primaryKey !== null && !uk.util.isNullOrUndefined(row[primaryKey]) && $grid.data("enable") !== false) {
                                    return result[0].outerHTML;
                                }
                                else {
                                    return result.attr("disabled", "disabled")[0].outerHTML;
                                }
                            }
                        });
                        $grid.igGrid("option", "columns", currentColumns);
                        $grid.on("click", ".delete-button", function () {
                            var key = $(this).attr("data-value");
                            var primaryKey = $grid.igGrid("option", "primaryKey");
                            var source = _.cloneDeep($grid.igGrid("option", "dataSource"));
                            _.remove(source, function (current) {
                                return _.isEqual(current[primaryKey].toString(), key.toString());
                            });
                            if (!uk.util.isNullOrUndefined(param.sourceTarget) && typeof param.sourceTarget === "function") {
                                param.sourceTarget(source);
                            }
                            else {
                                $grid.igGrid("option", "dataSource", source);
                                $grid.igGrid("dataBind");
                            }
                            itemDeletedEvent.detail["target"] = key;
                            document.getElementById($grid.attr('id')).dispatchEvent(itemDeletedEvent);
                        });
                    }
                    function setupSelecting($grid) {
                        setupDragging($grid);
                        setupSelectingEvents($grid);
                        return $grid;
                    }
                    function unsetupSelecting($grid) {
                        unsetupDragging($grid);
                        unsetupSelectingEvents($grid);
                        return $grid;
                    }
                    function setupDragging($grid) {
                        var dragSelectRange = [];
                        var mousePos = null;
                        $grid.bind('pointerdown', function (e) {
                            var $container = $grid.closest('.ui-iggrid-scrolldiv');
                            if ($(e.target).closest('.ui-iggrid-table').length === 0) {
                                return;
                            }
                            var gridVerticalRange = new uk.util.Range($container.offset().top, $container.offset().top + $container.height());
                            mousePos = {
                                x: e.pageX,
                                y: e.pageY,
                                rowIndex: ui_1.ig.grid.getRowIndexFrom($(e.target))
                            };
                            dragSelectRange.push(mousePos.rowIndex);
                            var $scroller = $('#' + $grid.attr('id') + '_scrollContainer');
                            var timerAutoScroll = setInterval(function () {
                                var distance = gridVerticalRange.distanceFrom(mousePos.y);
                                if (distance === 0) {
                                    return;
                                }
                                var delta = Math.min(distance * OUTSIDE_AUTO_SCROLL_SPEED.RATIO, OUTSIDE_AUTO_SCROLL_SPEED.MAX);
                                var currentScrolls = $scroller.scrollTop();
                                $grid.igGrid('virtualScrollTo', (currentScrolls + delta) + 'px');
                            }, 20);
                            $(window).bind('pointermove.NtsGridListDragging', function (e) {
                                var newPointedRowIndex = ui_1.ig.grid.getRowIndexFrom($(e.target));
                                if (mousePos.rowIndex === newPointedRowIndex) {
                                    return;
                                }
                                mousePos = {
                                    x: e.pageX,
                                    y: e.pageY,
                                    rowIndex: newPointedRowIndex
                                };
                                if (dragSelectRange.length === 1 && !e.ctrlKey) {
                                    $grid.igGridSelection('clearSelection');
                                }
                                updateSelections();
                            });
                            $(window).one('pointerup', function (e) {
                                mousePos = null;
                                dragSelectRange = [];
                                $(window).unbind('pointermove.NtsGridListDragging');
                                if ($grid.data("selectUpdated") === true) {
                                    $grid.triggerHandler('selectionchanged');
                                }
                                clearInterval(timerAutoScroll);
                                $grid.data("selectUpdated", false);
                            });
                        });
                        function updateSelections() {
                            if (isNaN(mousePos.rowIndex)) {
                                return;
                            }
                            for (var i = 0, i_len = dragSelectRange.length; i < i_len; i++) {
                                $grid.igGridSelection('deselectRow', dragSelectRange[i]);
                            }
                            var newDragSelectRange = [];
                            if (dragSelectRange[0] <= mousePos.rowIndex) {
                                for (var j = dragSelectRange[0]; j <= mousePos.rowIndex; j++) {
                                    $grid.igGridSelection('selectRow', j);
                                    newDragSelectRange.push(j);
                                }
                            }
                            else if (dragSelectRange[0] > mousePos.rowIndex) {
                                for (var j = dragSelectRange[0]; j >= mousePos.rowIndex; j--) {
                                    $grid.igGridSelection('selectRow', j);
                                    newDragSelectRange.push(j);
                                }
                            }
                            dragSelectRange = newDragSelectRange;
                            $grid.data("selectUpdated", true);
                        }
                    }
                    function setupSelectingEvents($grid) {
                        $grid.bind('iggridselectioncellselectionchanging', function () {
                        });
                        $grid.bind('iggridselectionrowselectionchanged', function () {
                            $grid.triggerHandler('selectionchanged');
                        });
                    }
                    function unsetupDragging($grid) {
                        $grid.unbind('pointerdown');
                    }
                    function unsetupSelectingEvents($grid) {
                        $grid.unbind('iggridselectionrowselectionchanged');
                    }
                    $.fn.ntsGridList = function (options) {
                        var self = this;
                        var $grid = $(self);
                        if (typeof options === "string") {
                            return delegateMethod($grid, options, arguments[1]);
                        }
                        var HEADER_HEIGHT = 27;
                        var ROW_HEIGHT = 23;
                        var DIFF_NUMBER = 2;
                        $grid.addClass("nts-gridlist");
                        var gridId = $grid.attr('id');
                        if (nts.uk.util.isNullOrUndefined(gridId)) {
                            throw new Error('the element NtsGridList must have id attribute.');
                        }
                        var optionsValue = options.primaryKey !== undefined ? options.primaryKey : options.optionsValue;
                        var dataSource = options.dataSource;
                        var deleteOptions = options.deleteOptions;
                        var observableColumns = _.cloneDeep(options.columns);
                        var selectionDisables = options.selectionDisables;
                        var showNumbering = options.showNumbering === true ? true : false;
                        var columnResize = options.columnResize;
                        var enable = options.enable;
                        var value = options.value;
                        var rows = options.rows;
                        $grid.data("init", true);
                        $grid.data("selectionDisables", selectionDisables);
                        $grid.data("initValue", value);
                        if (options.multiple) {
                            ROW_HEIGHT = 24;
                            var _document = document;
                            var isIE = false || !!_document.documentMode;
                            var _window = window;
                            var isEdge = !isIE && !!_window.StyleMedia;
                            if (isIE || isEdge) {
                                DIFF_NUMBER = -2;
                            }
                        }
                        var features = [];
                        features.push({ name: 'Selection', multipleSelection: options.multiple });
                        if (options.multiple || showNumbering) {
                            features.push({
                                name: 'RowSelectors',
                                enableCheckBoxes: options.multiple,
                                enableRowNumbering: false,
                                rowSelectorColumnWidth: 25
                            });
                        }
                        if (columnResize) {
                            features.push({
                                name: "Resizing"
                            });
                        }
                        var tabIndex = $grid.attr("tabindex");
                        $grid.data("tabindex", nts.uk.util.isNullOrEmpty(tabIndex) ? "0" : tabIndex);
                        $grid.attr("tabindex", "-1");
                        var gridFeatures = options.features;
                        var iggridColumns = _.map(observableColumns, function (c) {
                            c["key"] = c["key"] === undefined ? c["prop"] : c["key"];
                            c["dataType"] = 'string';
                            var formatter = c["formatter"];
                            if (c["controlType"] === "switch") {
                                var switchF = _.find(gridFeatures, function (s) {
                                    return s["name"] === "Switch";
                                });
                                if (!uk.util.isNullOrUndefined(switchF)) {
                                    features.push({ name: 'Updating', enableAddRow: false, enableDeleteRow: false, editMode: 'none' });
                                    var switchOptions_1 = switchF['options'];
                                    var switchValue_1 = switchF['optionsValue'];
                                    var switchText_1 = switchF['optionsText'];
                                    c["formatter"] = function createButton(val, row) {
                                        var result = $('<div class="ntsControl"/>');
                                        var rVal = nts.uk.util.isNullOrUndefined(formatter) ? val : formatter(val, row);
                                        result.attr("data-value", rVal);
                                        _.forEach(switchOptions_1, function (opt) {
                                            var value = opt[switchValue_1];
                                            var text = opt[switchText_1];
                                            var btn = $('<button class="nts-switch-button" tabindex="-1"/>').text(text);
                                            if ($grid.data("enable") === false) {
                                                btn.attr("disabled", "disabled");
                                            }
                                            btn.attr('data-value', value);
                                            if (rVal == value) {
                                                btn.addClass('selected');
                                            }
                                            btn.appendTo(result);
                                        });
                                        return result[0].outerHTML;
                                    };
                                    $grid.on("click", ".nts-switch-button", function (evt, ui) {
                                        var $element = $(this);
                                        var selectedValue = $element.attr('data-value');
                                        var $tr = $element.closest("tr");
                                        $grid.ntsGridListFeature('switch', 'setValue', $tr.attr("data-id"), c["key"], selectedValue);
                                    });
                                    ROW_HEIGHT = 30;
                                }
                            }
                            else {
                                var formatter_1 = c.formatter;
                                c.formatter = function (val, row) {
                                    if (row) {
                                        setTimeout(function () {
                                            var id = row[optionsValue];
                                            var disables = $grid.data("selectionDisables");
                                            if (!disables)
                                                return;
                                            _.forEach(disables, function (d) {
                                                if (id === d) {
                                                    var $row = $grid.igGrid("rowById", id, false);
                                                    if (!$row.hasClass("row-disable"))
                                                        $row.addClass("row-disable");
                                                    return false;
                                                }
                                            });
                                        }, 0);
                                    }
                                    return nts.uk.util.isNullOrUndefined(formatter_1) ? val : formatter_1(val, row);
                                };
                            }
                            return c;
                        });
                        var isDeleteButton = !uk.util.isNullOrUndefined(deleteOptions) && !uk.util.isNullOrUndefined(deleteOptions.deleteField)
                            && deleteOptions.visible === true;
                        var height = options.height;
                        if (!nts.uk.util.isNullOrEmpty(rows)) {
                            if (isDeleteButton) {
                                ROW_HEIGHT = 30;
                            }
                            height = rows * ROW_HEIGHT + HEADER_HEIGHT - DIFF_NUMBER;
                            var colSettings_1 = [];
                            _.forEach(iggridColumns, function (c) {
                                if (c["hidden"] === undefined || c["hidden"] === false) {
                                    colSettings_1.push({ columnKey: c["key"], allowTooltips: true });
                                    if (nts.uk.util.isNullOrEmpty(c["columnCssClass"])) {
                                        c["columnCssClass"] = "text-limited";
                                    }
                                    else {
                                        c["columnCssClass"] += " text-limited";
                                    }
                                }
                            });
                            features.push({
                                name: "Tooltips",
                                columnSettings: colSettings_1,
                                visibility: "overflow",
                                showDelay: 200,
                                hideDelay: 200
                            });
                            $grid.addClass("row-limited");
                        }
                        $grid.igGrid({
                            width: options.width,
                            height: height,
                            primaryKey: optionsValue,
                            columns: iggridColumns,
                            virtualization: true,
                            virtualizationMode: 'continuous',
                            features: features,
                            tabIndex: -1
                        });
                        $grid.closest('.ui-iggrid').addClass('nts-gridlist').height(height).attr("tabindex", $grid.data("tabindex"));
                        if (isDeleteButton) {
                            $grid.ntsGridList("setupDeleteButton", {
                                deleteField: deleteOptions.deleteField,
                                sourceTarget: options.dataSource
                            });
                        }
                        $grid.ntsGridList('setupSelecting');
                        if (options.multiple) {
                            $grid.bind('iggridrowselectorscheckboxstatechanging', function (eventObject, data) {
                                if (String($grid.data("enable")) === "false")
                                    return false;
                                var disables = $grid.data("selectionDisables");
                                if (disables && !uk.util.isNullOrUndefined(_.find(disables, function (d) { return data.rowKey === d; }))) {
                                    return false;
                                }
                                return true;
                            });
                        }
                        $grid.bind('iggridselectionrowselectionchanging', function (eventObject, ui) {
                            if (String($grid.data("enable")) === "false")
                                return false;
                            var disables = $grid.data("selectionDisables");
                            if (disables && uk.util.isNullOrUndefined(ui.startIndex)
                                && !uk.util.isNullOrUndefined(_.find(disables, function (d) { return ui.row.id === d; }))) {
                                return false;
                            }
                            if (disables && uk.util.isNullOrUndefined(ui.startIndex)
                                && uk.util.isNullOrUndefined(ui.row.id)) {
                                setTimeout(function () {
                                    _.forEach(_.intersection(disables, value), function (iv) {
                                        $grid.igGridSelection("selectRowById", iv);
                                    });
                                    $grid.trigger("selectionchanged");
                                }, 0);
                            }
                            return true;
                        });
                        var $oselect, $iselect;
                        var checkAll = function () {
                            if ($oselect && $iselect && $oselect.attr("data-chk") === "off") {
                                $oselect.attr("data-chk", "on");
                                $iselect.removeClass("ui-igcheckbox-normal-off");
                                $iselect.addClass("ui-igcheckbox-normal-on");
                            }
                        };
                        $grid.bind('selectionchanged', function () {
                            if (options.multiple) {
                                var selected_1 = $grid.ntsGridList('getSelected');
                                var disables_1 = $grid.data("selectionDisables");
                                var disableIds_1 = [];
                                if (disables_1) {
                                    _.forEach(selected_1, function (s, i) {
                                        _.forEach(disables_1, function (d) {
                                            if (d === s.id && uk.util.isNullOrUndefined(_.find(value, function (iv) { return iv === d; }))) {
                                                $grid.igGridSelection("deselectRowById", d);
                                                disableIds_1.push(i);
                                                return false;
                                            }
                                        });
                                    });
                                    disableIds_1.sort(function (i1, i2) { return i2 - i1; }).forEach(function (d) {
                                        selected_1.splice(d, 1);
                                    });
                                    var valueCount = _.intersection(disables_1, value).length;
                                    var ds = $grid.igGrid("option", "dataSource");
                                    if (selected_1.length === ds.length - disables_1.length + valueCount) {
                                        checkAll();
                                    }
                                }
                                if (!nts.uk.util.isNullOrEmpty(selected_1)) {
                                    var newValue = _.map(selected_1, function (s) { return s.id; });
                                    newValue = _.union(_.intersection(disables_1, value), newValue);
                                    setValue($grid, newValue);
                                }
                                else {
                                    setValue($grid, []);
                                }
                            }
                            else {
                                var selected = $grid.ntsGridList('getSelected');
                                if (!nts.uk.util.isNullOrEmpty(selected)) {
                                    setValue($grid, [selected.id]);
                                }
                                else {
                                    setValue($grid, []);
                                }
                            }
                        });
                        $grid.on("iggridvirtualrecordsrender", function (evt, ui) {
                            var disables = $grid.data("selectionDisables");
                            var $header = ui.owner._headerParent;
                            if (!disables || disables.length === 0 || !$header)
                                return;
                            var data = ui.owner.dataSource._data;
                            var selected = $grid.ntsGridList('getSelected');
                            var valueCount = _.intersection(disables, value).length;
                            var selector = $header.find(".ui-iggrid-rowselector-header span");
                            if (selector.length > 1) {
                                $oselect = $(selector[0]);
                                $iselect = $(selector[1]);
                            }
                            if (selected && (data.length - disables.length + valueCount) === selected.length) {
                                checkAll();
                            }
                        });
                        $grid.setupSearchScroll("igGrid", true);
                        $grid.ntsGridList("setupScrollWhenBinding");
                        $grid.on("switchvaluechanged", function (evt, dataX) {
                            setTimeout(function () {
                                var source = _.cloneDeep(options.dataSource);
                                _.forEach(source, function (o) {
                                    if (o[optionsValue] === dataX.rowKey) {
                                        o[dataX.columnKey] = dataX.value;
                                        return true;
                                    }
                                });
                                setDataSource($grid, source, options);
                            }, 100);
                        });
                        $grid.on("checknewitem", function (evt) {
                            return false;
                        });
                        setDataSource($grid, options.dataSource, options);
                        if (!_.isNil(options.value) && !_.isEmpty(options.value)) {
                            setValue($grid, options.value.constructor === Array ? options.value : [options.value]);
                        }
                    };
                    function setDataSource($grid, sources, options) {
                        if (!sources)
                            return;
                        if (!options) {
                            options = $grid.igGrid("option");
                        }
                        var optionsValue = options.primaryKey !== undefined ? options.primaryKey : options.optionsValue;
                        var gridSource = $grid.igGrid('option', 'dataSource');
                        if (String($grid.attr("filtered")) === "true") {
                            var filteredSource_1 = [];
                            _.forEach(gridSource, function (item) {
                                var itemX = _.find(sources, function (s) {
                                    return s[optionsValue] === item[optionsValue];
                                });
                                if (!nts.uk.util.isNullOrUndefined(itemX)) {
                                    filteredSource_1.push(itemX);
                                }
                            });
                            if (!_.isEqual(filteredSource_1, gridSource)) {
                                $grid.igGrid('option', 'dataSource', _.cloneDeep(filteredSource_1));
                                $grid.igGrid("dataBind");
                            }
                        }
                        else {
                            var currentSources = sources.slice();
                            var observableColumns_1 = _.filter(options.columns, function (c) {
                                c["key"] = c["key"] === undefined ? c["prop"] : c["key"];
                                return !_.isNil(c["isDateColumn"]) && c["isDateColumn"] === true;
                            });
                            if (!nts.uk.util.isNullOrEmpty(observableColumns_1)) {
                                _.forEach(currentSources, function (s) {
                                    _.forEach(observableColumns_1, function (c) {
                                        var key = c["key"] === undefined ? c["prop"] : c["key"];
                                        s[key] = moment(s[key]).format(c["format"]);
                                    });
                                });
                            }
                            if (!_.isEqual(currentSources, gridSource)) {
                                $grid.igGrid('option', 'dataSource', _.cloneDeep(currentSources));
                                $grid.igGrid("dataBind");
                            }
                        }
                    }
                    function getDataSource($grid) {
                        return $grid.igGrid("option", "dataSource");
                    }
                    function setValue($grid, value) {
                        if (!value)
                            return;
                        var sources = $grid.igGrid("option", "dataSource");
                        var multiple = $grid.igGridSelection('option', 'multipleSelection');
                        var currentSelectedItems = $grid.ntsGridList('getSelected');
                        var isEqual = _.isEqualWith(currentSelectedItems, value, function (current, newVal) {
                            if ((current === undefined && newVal === undefined) || (current !== undefined && current.id === newVal)) {
                                return true;
                            }
                        });
                        if (!isEqual) {
                            var clickCheckBox = false;
                            if (value.length == sources.length) {
                                if (multiple) {
                                    var features = _.find($grid.igGrid("option", "features"), function (f) {
                                        return f.name === "RowSelectors";
                                    });
                                    clickCheckBox = !nts.uk.util.isNullOrUndefined(features.enableCheckBoxes) && features.enableCheckBoxes;
                                }
                            }
                            if (clickCheckBox) {
                                $grid.closest('.ui-iggrid').find(".ui-iggrid-rowselector-header").find("span[data-role='checkbox']").click();
                            }
                            else {
                                $grid.ntsGridList('setSelected', value.length === 0 ? (!multiple ? undefined : value) : value);
                            }
                            var initVal = $grid.data("initValue");
                            var disables = $grid.data("selectionDisables");
                            if (!disables || !initVal || _.intersection(disables, initVal).length === 0) {
                                _.defer(function () { $grid.trigger("selectChange"); });
                            }
                        }
                    }
                    function setSelectedValue($grid, value) {
                        var multiple = $grid.igGridSelection('option', 'multipleSelection');
                        if (multiple) {
                            var initVal = $grid.data("initValue");
                            var disables = $grid.data("selectionDisables");
                            setValue($grid, _.union(_.intersection(disables, initVal), value));
                        }
                        else {
                            setValue($grid, value);
                        }
                    }
                })(ntsGridList || (ntsGridList = {}));
            })(jqueryExtentions = ui_1.jqueryExtentions || (ui_1.jqueryExtentions = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
