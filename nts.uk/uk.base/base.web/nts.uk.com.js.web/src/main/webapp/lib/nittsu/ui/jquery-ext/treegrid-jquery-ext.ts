
module nts.uk.ui.jqueryExtentions {
    
    module ntsTreeGrid {
        
        $.fn.ntsTreeGrid = function(options: any) {
            let ROW_HEIGHT = 24;
            let HEADER_HEIGHT = 24;
            let self = this;
            let $treegrid = $(self);
            
            if (typeof options === "string") {
                return delegateMethod($treegrid, options, arguments[1]);    
            }
            
            let dataSource: Array<any> = options.dataSource;
            let optionsValue = options.primaryKey !== undefined ? options.primaryKey : options.optionsValue;
            let optionsText = options.primaryText !== undefined ? options.primaryText : options.optionsText;

            let optionsChild = options.childDataKey !== undefined ? options.childDataKey : options.optionsChild;
            let extColumns: Array<any> = options.columns !== undefined ? options.columns : options.extColumns;
            let initialExpandDepth: number = options.initialExpandDepth;
            let selectedValues: Array<any> = options.selectedValues;
            let singleValue = options.value;
            let rows = options.rows;
            let virtualization = !util.isNullOrUndefined(options.virtualization) ? options.virtualization : false;
            let virtualizationMode = !util.isNullOrUndefined(options.virtualizationMode) ? options.virtualizationMode : "";
            let multiple = !_.isNil(options.multiple) ? options.multiple : false;
            let isFilter = ko.unwrap(!util.isNullOrUndefined(options.filter) ? options.filter : false);
            
            // Default.
            let showCheckBox = options.showCheckBox !== undefined ? options.showCheckBox : true;

            let enable = options.enable !== undefined ? options.enable : true;

            let height = options.height !== undefined ? options.height : 0; 
            let width = options.width !== undefined ? options.width : 0;

            let displayColumns;
            if (extColumns !== undefined && extColumns !== null) {
                displayColumns = extColumns;
            } else {
                displayColumns = [
                    { headerText: toBeResource.code, key: optionsValue, dataType: "string", hidden: true },
                    { headerText: toBeResource.codeAndName, key: optionsText, dataType: "string" }
                ];
            }
            
            let tabIndex = nts.uk.util.isNullOrEmpty($treegrid.attr("tabindex")) ? "0" : $treegrid.attr("tabindex");
            $treegrid.attr("tabindex", "-1");
            
            let features = [];
            features.push({
                name: "Selection",
                multipleSelection: multiple,
                activation: true,
                rowSelectionChanged: function(evt: any, ui: any) {
//                    let selectedRows: Array<any> = ui.selectedRows;
//                    if (options.multiple) {
//                        selectRows($treegrid, _.map(selectedRows, function(row) {
//                            return row.id;
//                        }));
//                    } else {
//                        selectRows($treegrid, selectedRows.length <= 0 ? undefined : ui.row.id);
//                    }
                }, rowSelectionChanging: function (evt, ui) {
                    let disabledRows = $treegrid.data("rowDisabled");
                    if(!_.isEmpty(disabledRows)) {
                        _.remove(ui.selectedRows, function(r) {
                            return disabledRows.includes(r.id);
                        });
                    }
                }
            });
            
            features.push({
                name: "RowSelectors",
                enableCheckBoxes: showCheckBox,
                rowSelectorColumnWidth: showCheckBox ? 25 : 0,
                enableRowNumbering: false,
                checkBoxMode: "biState"
            })
            features.push({ name: "Resizing" });
            
            if (!nts.uk.util.isNullOrEmpty(rows)) {
                height = rows * ROW_HEIGHT + HEADER_HEIGHT; 
                if (window.navigator.userAgent.indexOf("MSIE") > -1 || window.navigator.userAgent.match(/trident/i)
                    || window.navigator.userAgent.indexOf("Edge") > -1) {
                    height += rows * 0.4;
                }  
                
                let colSettings = [];
                _.forEach(displayColumns, function (c) {
                    if (c["hidden"] === undefined || c["hidden"] === false) {
                        colSettings.push({ columnKey: c["key"], allowTooltips: true }); 
                        if (nts.uk.util.isNullOrEmpty(c["columnCssClass"])) { 
                            c["columnCssClass"] = "text-limited";             
                        } else {
                            c["columnCssClass"] += " text-limited";
                        }
                    }      
                });
                
                features.push({
                    name: "Tooltips",
                    columnSettings: colSettings,
                    visibility: "overflow",
                    showDelay: 200,
                    hideDelay: 200
                });
                
                $treegrid.addClass("row-limited");
            }
            
            if(isFilter) {
                
                features.push({ name: "Filtering", filterDelay : 100, filterDropDownAnimationDuration : 100, 
                                dataFiltered: function (evt, ui) {
                                    let disabled = $treegrid.data("rowDisabled");
                                    if (!_.isEmpty(disabled)) {
                                        $treegrid.ntsTreeView("disableRows", disabled);
                                    }
                                }, dataFiltering: function (evt, ui) {
                                    let disabled = $treegrid.data("rowDisabled"), treeId = $treegrid.attr("id"), 
                                        currentCol = _.find(ui.owner.grid.options.columns, (c) => c.key === ui.columnKey), 
                                        shouldRemove = $treegrid.data("customExpression");
                                    
                                    _.remove(ui.newExpressions, (ex) => _.isNil(ex.expr));
                                    if (!_.isEmpty(shouldRemove)) {
                                        _.remove(ui.newExpressions, (ex) => !_.isNil(_.find(shouldRemove, sr => _.isEqual(sr, ex))));
                                        $treegrid.data("customExpression", []);
                                    }
                                    
                                    if (!_.isNil(currentCol) && currentCol.formatType === "checkbox" && !_.isNil(currentCol.filterOpts)) {
                                        let currentExp = _.find(ui.newExpressions, (exp) => exp.fieldName === ui.columnKey);
                                        
                                        if (!_.isNil(currentExp)) {
                                            let isFilterTrue = currentExp.expr.toLowerCase() === "check"; 
                                            ui.owner._currentTarget.closest(".ui-iggrid-filtercell").find(".ui-iggrid-filtereditor")
                                                .val(isFilterTrue ? currentCol.filterOpts.trueOpt : currentCol.filterOpts.falseOpt);
                                        }
                                    }
                                    
                                    if (!_.isEmpty(disabled) && !_.isEmpty(ui.newExpressions)) {
                                        let shouldRemove = [];
                                        _.forEach(disabled, (rId) => {
                                            let newExp = { fieldName: optionsValue, cond: "doesNotEqual", expr: rId };
                                            ui.newExpressions.push(newExp);
                                            shouldRemove.push(newExp);
                                        });
                                        $treegrid.data("customExpression", shouldRemove);
                                    } 
                                    
                                    _.forEach(ui.newExpressions, (ex) => {
                                        $treegrid.data("filterIdx_" + ex.fieldName, 0);
                                    });
                                }, dropDownOpening: function (evt, ui) {
                                    let colName = ui.dropDown.attr("aria-describedby"),
                                        currentCol = _.find(ui.owner.grid.options.columns, (c) => c.key === colName);
                                    if (!_.isNil(currentCol) && currentCol.formatType === "checkbox") {
                                        let filterOpts = ui.dropDown.find(".ui-iggrid-filterddlistitemicons"),
                                            trueOpt = _.find(filterOpts, (f) => !_.isNil($(f).data("cond")) && $(f).data("cond").toString().toLowerCase().contains("check")),
                                            falseOpt = _.find(filterOpts, (f) => !_.isNil($(f).data("cond")) && $(f).data("cond").toString().toLowerCase().contains("noncheck")),
                                            norTrueOpt = _.find(filterOpts, (f) => !_.isNil($(f).data("cond")) && $(f).data("cond").toString().toLowerCase() === "true"),
                                            norFalseOpt = _.find(filterOpts, (f) => !_.isNil($(f).data("cond")) && $(f).data("cond").toString().toLowerCase() === ("false"));
                                        
                                        $(norTrueOpt).remove();
                                        $(norFalseOpt).remove();
                                        
                                        if (!_.isNil(currentCol.filterOpts)) {
                                            $(trueOpt).find(".ui-iggrid-filterddlistitemcontainer").html(currentCol.filterOpts.trueOpt);//nts.uk.resource.getText("Enum_UseAtr_Use"));
                                            $(falseOpt).find(".ui-iggrid-filterddlistitemcontainer").html(currentCol.filterOpts.falseOpt);//nts.uk.resource.getText("Enum_UseAtr_NotUse"));
                                        }
                                    } 
                                }, dropDownClosed: function (evt, ui) {
                                    ui.owner._currentTarget.closest(".ui-iggrid-filtercell").find(".ui-iggrid-filterbutton").removeClass("ui-state-active ui-iggrid-filterbuttonactive");
                                }, filterSummaryAlwaysVisible : false });
            }

            $treegrid.data("expand", new koExtentions.ExpandNodeHolder());
            $treegrid.data("autoExpanding", false);
            
            let colSet = _.map(displayColumns, (col) => {
                return { columnKey: col.key, readOnly: true };
            });
            features.push({ name: "Updating", editMode:   "cell", enableAddChild: false, 
                            enableAddRow: false, enableDeleteRow: false, columnSettings: colSet });
            var cols = $treegrid.ntsTreeView("formatColumns", displayColumns, features);
            
            // Init ig grid.
            $treegrid.igTreeGrid({
                width: width,
                height: height,
                indentation: "12px",
                dataSource: _.cloneDeep(dataSource),
                primaryKey: optionsValue,
                columns: cols,
                autoCommit : true,
                childDataKey: optionsChild,
                initialExpandDepth: nts.uk.util.isNullOrUndefined(initialExpandDepth) ? 10 : initialExpandDepth,
                tabIndex: -1,
                features: features,
//                autoCommit: true,
                virtualization: virtualization,
                virtualizationMode: virtualizationMode,
                rowExpanded: function (evt, ui) {
                    if (!$treegrid.data("autoExpanding")) {
                        let holder: koExtentions.ExpandNodeHolder = $treegrid.data("expand");
                        holder.addNode(ui["dataRecord"][optionsValue]);
                        $treegrid.data("expand", holder);
                    }
                    let disabledRows = $treegrid.data("rowDisabled");
                    if(!_.isEmpty(disabledRows)) {
                        $treegrid.ntsTreeView("disableRows", disabledRows);
                    }
                }, rowCollapsed: function (evt, ui) {
                    if (!$treegrid.data("autoExpanding")) {
                        let holder: koExtentions.ExpandNodeHolder = $treegrid.data("expand");
                        holder.removeNodeAndChilds(ui["dataRecord"], optionsValue, optionsChild);
                        $treegrid.data("expand", holder);
                    }
                }, rowsRendered: function(evt, ui) {
                    $treegrid.data("autoExpanding", true);
//                    let holder: koExtentions.ExpandNodeHolder = $treegrid.data("expand");
//                    _.forEach(holder.nodes, function(node: any){
//                        $treegrid.igTreeGrid("expandRow", node); 
//                    });
                    if(virtualization){
                         let disabledRows = $treegrid.data("rowDisabled");
                        if(!_.isEmpty(disabledRows)) {
                            $treegrid.ntsTreeView("disableRows", disabledRows);
                        }   
                    }
                    
                    $treegrid.data("autoExpanding", false);   
                }
            });
            
            let treeGridId = $treegrid.attr('id');
            $treegrid.closest('.ui-igtreegrid').addClass('nts-treegridview').attr("tabindex", tabIndex);
            
            $treegrid.on('selectionchanged', () => {
//                if (options.multiple) { 
//                    let selected: Array<any> = $treegrid.ntsTreeView('getSelected');
//                    if (!nts.uk.util.isNullOrEmpty(selected)) {
//                        selectRows($treegrid, _.map(selected, s => s.id));
//                    } else {
//                        selectRows($treegrid);
//                    }
//                } else {
//                    let selected = $treegrid.ntsTreeView('getSelected');
//                    if (!nts.uk.util.isNullOrEmpty(selected)) {
//                        selectRows($treegrid, selected.id);
//                    } else {
//                        selectRows($treegrid);
//                    }
//                }
            });
            
            $treegrid.bind('cellChanging', () => {
                $treegrid.data("notUpdate", true);
                let optionX = data.dataSource !== undefined ? data.dataSource : data.options;
                if(_.isFunction(optionX)){
                    optionX($treegrid.igTreeGrid("option", "dataSource"));        
                }
                
            });
            
            $treegrid.setupSearchScroll("igTreeGrid");
            
            if(showCheckBox != true){
                $treegrid.closest(".nts-treegridview").addClass("no-selector");
                $treegrid.closest(".nts-treegridview").find("col[data-skip='true']").addClass("no-width");
            }
        };
        
        function selectRows($treegrid: JQuery, selectedValue: any) {
            let dataSource = $treegrid.igTreeGrid('option', 'dataSource');
            let multiple = !_.isNil(selectedValue) && selectedValue.constructor === Array;

            let disabledRows = $treegrid.data("rowDisabled");
            if(!_.isEmpty(disabledRows)) {
                if (multiple) {
                    _.remove(selectedValue, function(r) {
                        return disabledRows.includes(r);
                    });    
                } else {
                    if (!_.isNil(selectedValue) && disabledRows.includes(selectedValue)){
                        selectedValue = null;
                    }
                }
            }
            
            if (nts.uk.util.isNullOrUndefined(selectedValue)) {
                $treegrid.igTreeGridSelection("clearSelection");
            } else {
                let uiSR =  $treegrid.ntsTreeView('getSelected');
                if (multiple) {
                    let olds = _.map(uiSR as Array<any>, function(row: any) {
                        return row.id;
                    });
                    
                    if (_.isEqual(selectedValue.sort(), olds.sort())) {
                        return;
                    }
                    
                    $treegrid.igTreeGridSelection("clearSelection");
                    selectedValue.forEach(function(val) {
                        $treegrid.igTreeGridSelection("selectRowById", val);
                    })
                } else {
                    if (!_.isNil(uiSR) && uiSR.id === selectedValue) {
                        return;
                    }
                    $treegrid.igTreeGridSelection("clearSelection");
                    $treegrid.igTreeGridSelection("selectRowById", selectedValue);
                    
                    ui.ig.tree.grid.expandTo(selectedValue, $treegrid);
                }
            }
        }
        
        function delegateMethod($grid: JQuery, action: string, param: any) {
            switch(action) {
                case "getDataSource":
                    return $grid.igTreeGrid("option", "dataSource");
                case "setDataSource":
                    return setDataSource($grid, param);
                case "getSelected":
                    return $grid.ntsTreeView("getSelected");
                case "setSelected":
                    return selectRows($grid, param);
            }
        }
        
        function setDataSource($grid: JQuery, sources: any) {
            if (_.isNil(sources)) return;
            $grid.igTreeGrid("option", "dataSource", sources);
        }
    }
}
