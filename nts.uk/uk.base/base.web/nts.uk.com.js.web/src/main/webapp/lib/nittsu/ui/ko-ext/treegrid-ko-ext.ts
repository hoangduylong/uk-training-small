/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {

    /**
     * TreeGrid binding handler
     */
    class NtsTreeGridViewBindingHandler implements KnockoutBindingHandler {
        /**
         * Constructor.
         */
        constructor() {
        }

        /**
         * Init.
         */
        init(element: HTMLElement, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            let ROW_HEIGHT = 24;
            let HEADER_HEIGHT = 24;
            // Get data.
            var data = valueAccessor();
            var options: Array<any> = ko.unwrap(data.dataSource !== undefined ? data.dataSource : data.options);
            var optionsValue = ko.unwrap(data.primaryKey !== undefined ? data.primaryKey : data.optionsValue);
            var optionsText = ko.unwrap(data.primaryText !== undefined ? data.primaryText : data.optionsText);

            var optionsChild = ko.unwrap(data.childDataKey !== undefined ? data.childDataKey : data.optionsChild);
            var extColumns: Array<any> = ko.unwrap(data.columns !== undefined ? data.columns : data.extColumns);
            let initialExpandDepth: number = ko.unwrap(data.initialExpandDepth);
            var selectedValues: Array<any> = ko.unwrap(data.selectedValues);
            var singleValue = ko.unwrap(data.value);
            let rows = ko.unwrap(data.rows);
            let virtualization = ko.unwrap(!util.isNullOrUndefined(data.virtualization) ? data.virtualization : false);
            let virtualizationMode = ko.unwrap(!util.isNullOrUndefined(data.virtualizationMode) ? data.virtualizationMode : "");
            let isFilter = ko.unwrap(!util.isNullOrUndefined(data.filter) ? data.filter : false);
            
            // Default.
            var showCheckBox = data.showCheckBox !== undefined ? ko.unwrap(data.showCheckBox) : true;

            var enable = data.enable !== undefined ? ko.unwrap(data.enable) : true;

            var height = ko.unwrap(data.height !== undefined ? data.height : 0); 
            var width = ko.unwrap(data.width !== undefined ? data.width : 0);

            if (extColumns !== undefined && extColumns !== null) {
                var displayColumns = extColumns;
            } else {
                var displayColumns: Array<any> = [
                    { headerText: toBeResource.code, key: optionsValue, dataType: "string", hidden: true },
                    { headerText: toBeResource.codeAndName, key: optionsText, dataType: "string" }
                ];
            }
            
            var $treegrid = $(element);
            let tabIndex = nts.uk.util.isNullOrEmpty($treegrid.attr("tabindex")) ? "0" : $treegrid.attr("tabindex");
            $treegrid.attr("tabindex", "-1");
            
            let features = [];
            features.push({
                name: "Selection",
                multipleSelection: true,
                activation: true,
                rowSelectionChanged: function(evt: any, ui: any) {
                    var selectedRows: Array<any> = ui.selectedRows;
                    if (ko.unwrap(data.multiple)) {
                        if (ko.isObservable(data.selectedValues)) {
                            data.selectedValues(_.map(selectedRows, function(row) {
                                return row.id;
                            }));
                        }
                    } else {
                        if (ko.isObservable(data.value)) {
                            let valueX = selectedRows.length <= 0 ? undefined : ui.row.id;
                            if(data.value() === valueX){
                                data.value.valueHasMutated(); 
                            } else {
                                data.value(selectedRows.length <= 0 ? undefined : ui.row.id)
                            } 
                        }
                    }
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
            
            if(!nts.uk.util.isNullOrEmpty(rows)){
                height = rows * ROW_HEIGHT + HEADER_HEIGHT;   
                if (window.navigator.userAgent.indexOf("MSIE") > -1 || window.navigator.userAgent.match(/trident/i)
                    || window.navigator.userAgent.indexOf("Edge") > -1) {
                    height += rows * 0.4;
                }
                
                let colSettings = [];
                _.forEach(displayColumns, function (c){
                    if(c["hidden"] === undefined || c["hidden"] === false){
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
                                    let disabled = $treegrid.data("rowDisabled"), 
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
                                    
                                    $treegrid.data("filterIdx", 0);
                                    $treegrid.data("previousCol", null);
                                }, dropDownOpening: function (evt, ui) {
                                    let colName = ui.dropDown.attr("aria-describedby"),
                                        currentCol = _.find(ui.owner.grid.options.columns, (c) => c.key === colName);
                                    if (!_.isNil(currentCol) && currentCol.formatType === "checkbox") {
                                        let filterOpts = ui.dropDown.find(".ui-iggrid-filterddlistitemicons"),
                                            trueOpt = _.find(filterOpts, (f) => !_.isNil($(f).data("cond")) && $(f).data("cond").toString().toLowerCase().contains("check")),
                                            falseOpt = _.find(filterOpts, (f) => !_.isNil($(f).data("cond")) && $(f).data("cond").toString().toLowerCase().contains("noncheck")),
                                            norTrueOpt = _.find(filterOpts, (f) => !_.isNil($(f).data("cond")) && $(f).data("cond").toString().toLowerCase() === "true"),
                                            norFalseOpt = _.find(filterOpts, (f) => !_.isNil($(f).data("cond")) && $(f).data("cond").toString().toLowerCase() === "false");
                                        
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

            $treegrid.data("expand", new ExpandNodeHolder());
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
                dataSource: _.cloneDeep(options),
                primaryKey: optionsValue,
                columns: cols,
                autoCommit: true,
                childDataKey: optionsChild,
                initialExpandDepth: nts.uk.util.isNullOrUndefined(initialExpandDepth) ? 10 : initialExpandDepth,
                tabIndex: -1,
                features: features,
                virtualization: virtualization,
                virtualizationMode: virtualizationMode,
                rowExpanded: function (evt, ui) {
                    if (!$treegrid.data("autoExpanding")) {
                        let holder: ExpandNodeHolder = $treegrid.data("expand");
                        holder.addNode(ui["dataRecord"][optionsValue]);
                        $treegrid.data("expand", holder);
                    }
                    let disabledRows = $treegrid.data("rowDisabled");
                    if(!_.isEmpty(disabledRows)) {
                        $treegrid.ntsTreeView("disableRows", disabledRows);
                    }
                }, rowCollapsed: function (evt, ui) {
                    if (!$treegrid.data("autoExpanding")) {
                        let holder: ExpandNodeHolder = $treegrid.data("expand");
                        holder.removeNodeAndChilds(ui["dataRecord"], optionsValue, optionsChild);
                        $treegrid.data("expand", holder);
                    }
                }, rowsRendered: function(evt, ui) {
                    $treegrid.data("autoExpanding", true);
                    let holder: ExpandNodeHolder = $treegrid.data("expand");
//                    if(!nts.uk.util.isNullOrEmpty(holder.nodes)){
//                    _.forEach(holder.nodes, function(node: any){
//                        $treegrid.igTreeGrid("expandRow", node); 
//                    });
                    
//                    }
                    if (virtualization) {
                        let disabledRows = $treegrid.data("rowDisabled");
                        if(!_.isEmpty(disabledRows)) {
                            $treegrid.ntsTreeView("disableRows", disabledRows);
                        }   
                    }
                    $treegrid.data("autoExpanding", false);   
                }
            });
            var treeGridId = $treegrid.attr('id');
            $treegrid.closest('.ui-igtreegrid').addClass('nts-treegridview').attr("tabindex", tabIndex);
            
            $treegrid.bind('selectionchanged', () => {
                if (data.multiple) { 
                    let selected: Array<any> = $treegrid.ntsTreeView('getSelected');
                    if (!nts.uk.util.isNullOrEmpty(selected)) {
                        data.selectedValues(_.map(selected, s => s.id));
                    } else {
                        data.selectedValues([]);
                    }
                } else {
                    let selected = $treegrid.ntsTreeView('getSelected');
                    if (!nts.uk.util.isNullOrEmpty(selected)) {
                        data.value(selected.id);
                    } else {
                        data.value('');
                    }
                }
            });
            $treegrid.bind('cellChanging', () => {
                $treegrid.data("notUpdate", true);
                let optionX = data.dataSource !== undefined ? data.dataSource : data.options;
                optionX($treegrid.igTreeGrid("option", "dataSource"));
            });
            
            $treegrid.setupSearchScroll("igTreeGrid");
            
            if(showCheckBox != true){
                $treegrid.closest(".nts-treegridview").addClass("no-selector");
                $treegrid.closest(".nts-treegridview").find("col[data-skip='true']").addClass("no-width");
            }
        }

        /**
         * Update
         */
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            // Get data.
            var data = valueAccessor();
            var options: Array<any> = ko.unwrap(data.dataSource !== undefined ? data.dataSource : data.options);
            var selectedValues: Array<any> = ko.unwrap(data.selectedValues);
            var singleValue = ko.unwrap(data.value);
            var multiple = data.multiple != undefined ? ko.unwrap(data.multiple) : true;
            let $treegrid = $(element);
            if( $treegrid.data("notUpdate") === true) {
                $treegrid.data("notUpdate", false);
                return;
            }
            let disabledRows = $treegrid.data("rowDisabled");
            if(!_.isEmpty(disabledRows)) {
                if (multiple) {
                    _.remove(selectedValues, function(r) {
                        return disabledRows.includes(r);
                    });    
                    if(!_.isEqual(selectedValues, data.selectedValues())) {
                        data.selectedValues(selectedValues);
                        return;
                    }
                } else {
                    if (!_.isNil(singleValue) && disabledRows.includes(singleValue)){
                        data.value(null);
                        return;
                    }
                }
                
                $treegrid.ntsTreeView("disableRows", disabledRows);
            }
            
            // Update datasource.
            var originalSource = $(element).igTreeGrid('option', 'dataSource');
            if (!_.isEqual(originalSource, options)) {
                $treegrid.igTreeGrid("option", "dataSource", _.cloneDeep(options));
                $treegrid.igTreeGrid("dataBind");
            }

            if ($treegrid.igTreeGridSelection("option", "multipleSelection") !== multiple) {
                $treegrid.igTreeGridSelection("option", "multipleSelection", multiple);
            } 

            // Set show checkbox.
            var showCheckBox = ko.unwrap(data.showCheckBox != undefined ? data.showCheckBox : true);
            if ($treegrid.igTreeGridRowSelectors("option", "enableCheckBoxes") !== showCheckBox) {
                $treegrid.igTreeGridRowSelectors("option", "enableCheckBoxes", showCheckBox);
            }

            // Clear selection.
            if ((selectedValues === null || selectedValues === undefined) && (singleValue === null || singleValue === undefined)) {
                $treegrid.igTreeGridSelection("clearSelection");
            } else {
                // Compare value.
                let uiSR =  $treegrid.ntsTreeView('getSelected');
//                _.map($treegrid.igTreeGridSelection("selectedRow") as Array<any>, function(row: any) {
//                    return row.id;
//                });
                // Not change, do nothing.
                if (multiple) {
                    let olds = _.map(uiSR as Array<any>, function(row: any) {
                        return row.id;
                    });
                    if (_.isEqual(selectedValues.sort(), olds.sort())) {
                        return;
                    }
                    // Update.
                    $treegrid.igTreeGridSelection("clearSelection");
                    selectedValues.forEach(function(val) {
                        $treegrid.igTreeGridSelection("selectRowById", val);
                    })
                } else {
                    if (uiSR !== undefined && uiSR.id === singleValue) {
                        return;
                    }
                    $treegrid.igTreeGridSelection("clearSelection");
                    $treegrid.igTreeGridSelection("selectRowById", singleValue);
                    
                    ui.ig.tree.grid.expandTo(singleValue, $treegrid);
                }
            }
        }
    }
    
    import isEmpty = nts.uk.util.isNullOrEmpty;
    
    export class ExpandNodeHolder{
        nodes: Array<any>;
        
        constructor(){
            this.nodes = [];  
        }
        
        isEmpty (): boolean {
            return isEmpty(this.nodes);
        }
        
        addNode (nodeId: any): void {
            this.nodes.push(nodeId);
        }
        
        removeNodeAndChilds(nodeSource: any, nodeKey, nodeChildKey): void {
            let ids: Array<any> = Helper.getAllIdFromNodeSource(_.cloneDeep(nodeSource), nodeKey, nodeChildKey);
            _.remove(this.nodes, function(node: any){
                return ids.indexOf(node) >= 0;
            });
        }
        
    }
     
    module Helper {
        export function getAllIdFromNodeSource(nodeSource: any, nodeKey: string, childKey: string): Array<any>{
            let ids = [nodeSource[nodeKey]];
            let children = [].concat(nodeSource[childKey]);
            while (!isEmpty(children)){
                let currentNode = children.shift();
                ids.push(currentNode[nodeKey]);
                if(!isEmpty(currentNode) && !isEmpty(currentNode[childKey])){
                    children = children.concat(currentNode[childKey]);        
                }
            }
            return ids;
        } 
        
        export function flatTree(tree: Array<any>, childKey: string): Array<any> {
            let ids = [];
            _.forEach(tree, function(nodeSource){
                ids.push(nodeSource);
                let children = [].concat(nodeSource[childKey]);
                while (!isEmpty(children)){
                    let currentNode = children.shift();
                    ids.push(currentNode);
                    if(!isEmpty(currentNode)){
                        children = children.concat(currentNode[childKey]);        
                    }
                }  
            });
            
            return ids;
        }
        
        export function getAllParentId(tree: JQuery, id: string, nodeKey: string, childKey: string): Array<string> {
            let source = _.cloneDeep(tree.igTreeGrid("option", "dataSource"));
            let parentIds = [];
            
            _.forEach(source, function(node){
                let result = checkIfInBranch(node, id, nodeKey, childKey);   
                if(result.inThis){
                    parentIds = [node[nodeKey]].concat(result.ids);
                    return false;
                } 
            });
            
            return parentIds;
        }
        
        function checkIfInBranch(source: any, id: string, nodeKey: string, childKey: string): any{
            if (source[nodeKey] === id) {
                return { 
                    inThis: true,
                    ids: []
                };
            } else {
                let result = { 
                    inThis: false,
                    ids: []
                };
                _.forEach(source[childKey], function(node){
                    result = checkIfInBranch(node, id, nodeKey, childKey);    
                    if (result.inThis) {
                        result.ids = [node[nodeKey]].concat(result.ids);
                        return false;
                    }
                });
                return result;
                
            }
        }
    }

    class ExpandNode{
        nodeKey: string;
        childKey: string;
        nodeSource: any;
        nodeLevel: number;
        element: JQuery;
        
        constructor(source: any, nodeKey?: string, childKey?: string, element?: JQuery, nodeLevel?: number){
            this.nodeSource = source;
            this.nodeLevel = nodeLevel;
            this.element = element;
            this.nodeKey = nodeKey;
            this.childKey = childKey;
        }
        
        getNode() {
           return this.nodeSource; 
        }
    }
    
    ko.bindingHandlers['ntsTreeGridView'] = new NtsTreeGridViewBindingHandler();
}
