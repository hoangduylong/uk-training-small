/// <reference path="../../reference.ts"/>

interface JQuery {
    ntsTreeView(action: string, param?: any): any;
    ntsTreeDrag(action: string, param?: any): any;
}

module nts.uk.ui.jqueryExtentions {

    module ntsTreeView {

        let OUTSIDE_AUTO_SCROLL_SPEED = {
            RATIO: 0.2,
            MAX: 30
        };

        $.fn.ntsTreeView = function(action: string, param?: any, param2?: any): any {

            var $tree = $(this);

            switch (action) {
                case 'getSelected':
                    return getSelected($tree);
                case 'setSelected':
                    return setSelected($tree, param);
                case 'deselectAll':
                    return deselectAll($tree);
                case 'virtualScrollTo':
                    return virtualScroll($tree, param);
                case 'formatColumns':
                    return formatColumns($tree, param, param2);
                case 'disableRows':
                    return disableRows($tree, param);
                case 'enableRows':
                    return enableRows($tree, param);
            }
        };
        
        function disableRows($tree, rowIds) {
            if (_.isNil(rowIds)) {
                return;
            }
            let disabled = $tree.data("rowDisabled"), columnSets = $tree.igTreeGrid("option", "columns");
            if (_.isNil(disabled)) {
                disabled = [];
            }
            if (!_.isArray(rowIds)) {
                rowIds = [rowIds]; 
            }
            columnSets = _.filter(columnSets, (col) => { return !_.isNil(col.formatType) });
            
            _.forEach(rowIds, (r) => {
                _.forEach(columnSets, (col) => {
                    if(_.lowerCase(col.formatType) === "checkbox"){
                        var cellContainer = $tree.igTreeGrid("cellById", r, col.key);
                        
                        if(_.isEmpty(cellContainer)) return; 
                        
                        var control = ntsGrid.ntsControls.getControl(ntsGrid.ntsControls.CHECKBOX);
                        let $cellContainer = $(cellContainer);
                        control.disable($cellContainer);     
                    }   
                });
                var row = $tree.igTreeGrid("rowById", r);
                if(_.isEmpty(row) || row.hasClass("row-disabled")) return; 
                row.addClass("row-disabled");
            });  
            
            $tree.data("rowDisabled", _.union(disabled, rowIds));
        }
            
        function enableRows($tree, rowIds) {
            if (_.isNil(rowIds)) {
                return;
            }
            let disabled = $tree.data("rowDisabled"), columnSets = $tree.igTreeGrid("option", "columns");
            if (_.isNil(disabled)) {
                return;
            }
            if (!_.isArray(rowIds)) {
                rowIds = [rowIds]; 
            }
            columnSets = _.filter(columnSets, (col) => { return !_.isNil(col.formatType) });
            
            _.forEach(rowIds, (r) => {
                _.forEach(columnSets, (col) => {
                    if(_.lowerCase(col.formatType) === "checkbox"){
                        var cellContainer = $tree.igTreeGrid("cellById", r, col.key);
                        
                        if(_.isEmpty(cellContainer)) return; 
                        
                        var control = ntsGrid.ntsControls.getControl(ntsGrid.ntsControls.CHECKBOX);
                        let $cellContainer = $(cellContainer);
                        control.enable($cellContainer);     
                    }   
                });
                var row = $tree.igTreeGrid("rowById", r);
                if(_.isEmpty(row)) return; 
                row.removeClass("row-disabled");
            });  
            
            $tree.data("rowDisabled", _.difference(disabled, rowIds));
        }
        
        function formatColumns($tree: JQuery, columns, features): any {
            $tree.data("CB_SELECTED", {});
            $tree.data("UNIQ", _.isNil($tree.attr("id")) ? nts.uk.util.randomId() : $tree.attr("id"));
            let helper = {
                    updateX (data, val, key, childKey, primaryKey) {
                        if(!_.isEmpty(data)){
                            _.forEach(data, (child) => {
                                let rId = child[primaryKey], 
                                    controlCls = "nts-grid-control-" + $tree.data("UNIQ") + "-" + key + "-" + rId, 
                                    $wrapper = $tree.find("." + controlCls), checkbox = $wrapper.find("input[type='checkbox']");
                                if(checkbox.length > 0) {
                                    if(checkbox.is(":checked") !== val) {
                                        $wrapper.data("changeByParent", true);
                                        checkbox.click();
                                    }
                                } else {
                                    $tree.data("igTreeGrid").dataSource.setCellValue(rId, key, val, true);
                                    $tree.data("igTreeGridUpdating")._notifyCellUpdated(rId);
                                    helper.updateX(child[childKey], val, key, childKey, primaryKey);    
                                }
                            });    
                        }
                    }, checkChildSiblings (source, key, childKey, primaryKey) {
                        let isAllCheck = _.isNil(_.find(source[childKey], (c) => {
                            let controlCls = "nts-grid-control-" + $tree.data("UNIQ") + "-" + key + "-" + c[primaryKey],
                                checkbox = $tree.find("." + controlCls).find("input[type='checkbox']");    
                            return !checkbox.is(":checked");
                        }));
                        
                        let controlCls = "nts-grid-control-" + $tree.data("UNIQ") + "-" + key + "-" + source[primaryKey],
                            $wrapper = $tree.find("." + controlCls), $checkbox = $wrapper.find("input[type='checkbox']");
                        if (isAllCheck !== $checkbox.is(":checked")) {
                            $wrapper.data("changeByChild", true);
                            $checkbox.click();
                        }
                        
                        return isAllCheck;
                    }, checkSiblings (rowId, source, key, childKey, primaryKey) {
                        //let source = $tree.igTreeGrid("option", "dataSource");
                        for(var i = 0; i < source.length; i++) {
                            if (!_.isEmpty(source[i][childKey])) {
                                let isParentOf = _.find(source[i][childKey], (c) => c[primaryKey] === rowId);
                                if (isParentOf) {
                                    let isAllCheck = helper.checkChildSiblings(source[i], key, childKey, primaryKey);
                                    
                                    return { process: true, value: isAllCheck };
                                } else {
                                    let checkRel =  helper.checkSiblings(rowId, source[i][childKey], key, childKey, primaryKey);
                                    if (checkRel.process) {
                                        let isAllCheck = helper.checkChildSiblings(source[i], key, childKey, primaryKey);
                                        
                                        return { process: true, value: isAllCheck };
                                    }
                                }   
                            }
                        }
                        
                        return { process: false, value: false };
                    }, getTrueRowData (rowId, primaryKey, childKey) {
                        let dataSource = $tree.data("igTreeGrid").dataSource._origDs,
                            flatSource = helper.flatChild(dataSource, childKey);

                        return _.find(flatSource, (s) => s[primaryKey] === rowId);
                    }, flatChild (dataSource, childKey) {
                        let result = [];
                        if (_.isEmpty(dataSource)) {
                            return result;
                        }
                        _.forEach(dataSource, (s) => {
                            result = _.concat(result, s, helper.flatChild(s[childKey], childKey));
                        });
                        
                        return result;
                    }
                };
            let newColumns = _.map(columns, (colO) => {
                let col = _.cloneDeep(colO);
                if(_.lowerCase(col.formatType) === "checkbox") {
                    let oldFormatter = col.formatte, isParentCompute = _.isNil(col.parentCompute) || !col.parentCompute ? false : true;
                    
                    col.formatter = (value, rowObj) => {
                        if (_.isNil(rowObj)) return "";
                        let primaryKey =  $tree.data("igTreeGrid").options.primaryKey,
                            childKey = $tree.data("igTreeGrid").options.childDataKey, rowId = rowObj[primaryKey],
                            trueRowValue = helper.getTrueRowData(rowId, primaryKey, childKey);
                            
                        if (_.isNil(trueRowValue) || _.isNil(trueRowValue[col.key])) return "";
                         
                        let rowsDisables = $tree.data("rowDisabled"),
                            isRowEnable = _.isNil(rowsDisables) ? true : _.isNil(_.find(rowsDisables, (r) => r === rowId)), 
                            controlCls = "nts-grid-control-" + $tree.data("UNIQ") + "-" + col.key + "-" + rowId, 
                            $wrapper = $("<div/>").addClass(controlCls).css({ "text-align": 'center', "height": "30px"} ),
                            $container = $("<div/>").append($wrapper), $_self = $tree,
                            data: any = {
                                rowId: rowId,
                                columnKey: col.key,
                                update: (val) => {
                                    if (!_.isNil($tree.data("igTreeGrid"))) {
                                        let $wrapper = $tree.find("." + controlCls);
                                        if($wrapper.data("changeByChild")) {
                                            $wrapper.data("changeByChild", false);
                                            return;
                                        }
                                        $tree.data("igTreeGrid").dataSource.setCellValue(rowId, col.key, val, true);
                                        $tree.data("igTreeGridUpdating")._notifyCellUpdated(rowId);
                                        if(isParentCompute) {
                                            helper.updateX(rowObj[childKey], val, col.key, childKey, primaryKey);
                                            if($wrapper.data("changeByParent")) {
                                                $wrapper.data("changeByParent", false);
                                                return;
                                            }
                                            helper.checkSiblings(rowId, $tree.igTreeGrid("option", "dataSource"), col.key, childKey, primaryKey);    
                                        }
                                        $tree.trigger("cellChanging");
                                        $tree.trigger("checkboxChanging", { value: val, rowId: rowId, column: col.key, rowData: rowObj, element: $wrapper });
                                    }
                                }, deleteRow: () => {
                                    if ($tree.data("igTreeGrid") !== null) {
                                        $tree.data("igTreeGridUpdating").deleteRow(rowId);
                                    }    
                                }, initValue: value,
                                rowObj: rowObj,
                                showHeaderCheckbox: col.showHeaderCheckbox,
                                enable: isRowEnable,
                                controlDef: { controlType : "CheckBox", enable : isRowEnable, 
                                                name : "Checkbox", options : {value: 1, text: ""}, 
                                                optionsText : "text", optionsValue: "value"}
                            };
                        let ntsControl = ntsGrid.ntsControls.getControl(ntsGrid.ntsControls.CHECKBOX); 
                        
                        setTimeout(function() {
                            let $self = $_self;   
                            let $treeCell = $self.igTreeGrid("cellById", data.rowId, data.columnKey);
                            let gridCellChild;
                            if (!$treeCell || (gridCellChild = $treeCell.children()).length === 0) return;
                            if (gridCellChild[0].children.length === 0) {
                                let $control = ntsControl.draw(data);
                                let gridControl = $treeCell[0].querySelector("." + controlCls);
                                if (!gridControl) return;
                                gridControl.appendChild($control[0]);
                                /**$control.on("change", function() {
                                });*/
                                ntsControl.$containedGrid = $self;
                            }
                        }, 0);
                        
                        return $container.html();
                    };
                }
                
                return col;
            });
            
            let filterFeature = _.find(features, (f) => f.name === "Filtering");
            if (!_.isNil(filterFeature)) {
                let filterFunc = (value, expression, dataType, ignoreCase, preciseDateFormat, colKey) => {
                    let flatData = $tree.data("igTreeGrid").dataSource._flatData,
                        currentIdx = $tree.data("filterIdx"),
                        prevCol = $tree.data("previousCol"),
                        primaryKey = $tree.data("igTreeGrid").options.primaryKey,
                        childKey = $tree.data("igTreeGrid").options.childDataKey;
                    if (currentIdx === 0) {
                        $tree.data("previousCol", colKey);    
                    }
                    if (!_.isNil(prevCol) && prevCol !== colKey) {
                        currentIdx--;
                    }
                    let trueRowValue = helper.getTrueRowData(flatData[currentIdx][primaryKey], primaryKey, childKey);
                      
                    currentIdx++;
                    $tree.data("filterIdx", currentIdx);
                    if(!_.isNil(trueRowValue)) {
                        if (expression === "check") {
                            return trueRowValue[colKey] == true;
                        } else {
                            return trueRowValue[colKey] == false;
                        }    
                    }
                    
                    return false;
                };
                
                let customFilter = _.map(_.filter(newColumns, (c) => c.formatType === "checkbox"), (c) => {
                    return {
                        columnKey: c.key,
                        customConditions: {
                            check: {
                                labelText: "true",
                                expressionText: "check",
                                requireExpr: false,
                                filterFunc: (value, expression, dataType, ignoreCase, preciseDateFormat, colKey) => {
                                    return filterFunc(value, expression, dataType, ignoreCase, preciseDateFormat, colKey); 
                                }
                            },
                            nonCheck: {
                                labelText: "false",
                                expressionText: "non_check",
                                requireExpr: false,
                                filterFunc: (value, expression, dataType, ignoreCase, preciseDateFormat, colKey) => {
                                    return filterFunc(value, expression, dataType, ignoreCase, preciseDateFormat, colKey);
                                }
                            }
                        },
                        conditionList: []        
                    }; 
                });  
                
                filterFeature.columnSettings = customFilter;  
            }
            
            return newColumns;
        }

        function getSelected($tree: JQuery): any {
            if ($tree.igTreeGridSelection('option', 'multipleSelection')) {
                var selectedRows: Array<any> = $tree.igTreeGridSelection('selectedRows');
                if (selectedRows)
                    return _.map(selectedRows, convertSelected);
                return [];
            } else {
                var selectedRow: any = $tree.igTreeGridSelection('selectedRow');
                if (selectedRow)
                    return convertSelected(selectedRow);
                return undefined;
            }
        }

        function convertSelected(selectedRow: any) {
            return {
                id: selectedRow.id,
                index: selectedRow.index
            };
        }

        function setSelected($tree: JQuery, selectedId: any) {
            deselectAll($tree);
            let disabledRows = $tree.data("rowDisabled");
            
            if ($tree.igTreeGridSelection('option', 'multipleSelection')) {
                if(!_.isEmpty(disabledRows)) {
                    _.remove(selectedId, function(r) {
                        return disabledRows.includes(r);
                    });  
                }
                (<Array<string>>selectedId).forEach(id => { 
                    $tree.igTreeGridSelection('selectRowById', id);
                    virtualScroll($tree, id);
                });
            } else {
                if (selectedId.constructor === Array) {
                    selectedId = selectedId[0];
                }
                if(!(!_.isEmpty(disabledRows) && !_.isNil(selectedId) && disabledRows.includes(selectedId))) {
                    $tree.igTreeGridSelection('selectRowById', selectedId);
                    virtualScroll($tree, selectedId);
                } else {
                    selectedId = null;    
                }
            }
            
            $tree.trigger("ntstreeselectionchanged", [ selectedId ]);
        }
        
        function virtualScroll($tree: JQuery, id: any) {
            let virtualization = $tree.igTreeGrid("option", "virtualization");
            if (virtualization) {
                let pk = $tree.igTreeGrid("option", "primaryKey");
                let childKey = $tree.igTreeGrid("option", "childDataKey");
                let ds = $tree.igTreeGrid("option", "dataSource");
                let res = findIndex(ds, id, pk, childKey, 0);
                if (res.found) { 
                    $tree.igTreeGrid("virtualScrollTo", res.index);
                }
            }
        }
        
        function findIndex(dataSource: Array<any>, id: any, pk: string, childKey: string, cIndex: number) {
            let found = false;
            _.forEach(dataSource, d => {
                if (d[pk] !== id && d[childKey]) {
                    cIndex++;
                    let res = findIndex(d[childKey], id, pk, childKey, cIndex);
                    if (res.found) {
                        found = true;
                        cIndex = res.index;
                        return false;
                    }
                    cIndex = res.index;
                } else if (d[pk] === id) {
                    found = true;
                    return false;
                }
            });
            return { index: cIndex, found: found };
        }

        function deselectAll($grid: JQuery) {
            $grid.igTreeGridSelection('clearSelection');
        }
    }
    
    module ntsTreeDrag {

        $.fn.ntsTreeDrag = function(action: string, param?: any, param2?: any): any {

            var $tree = $(this);

            switch (action) {
                case 'getSelected':
                    return getSelected($tree);
                case 'getSelectedID':
                    return getSelectedID($tree);
                case 'setSelected':
                    return setSelected($tree, param);
                case 'deselectAll':
                    return deselectAll($tree);
                case 'isMulti':
                    return isMultiple($tree);
                case 'getParent':
                    return getParent($tree, param);
                case 'getPrevious':
                    return getPrevious($tree, param);
                case 'moveNext':
                    return moveNext($tree, param, param2);
                case 'moveInto':
                    return moveInto($tree, param, param2);
                case 'moveUp':
                    return moveUp($tree, param);
                case 'moveDown':
                    return moveDown($tree, param);
                case 'getPosition':
                    return getPosition($tree, param);
            }
        };
        
        function isMultiple($tree: JQuery) {
            let isMulti = $tree.igTree("option", "checkboxMode") !== "off";
            return isMulti;
        }
        
        function getPosition($tree: JQuery, $node) {
            var offset = 0, siblings = $node.prevAll(), parent = $node;
//                    var offset = $node[0].offsetTop, parent = $node[0].offsetParent;
            while (true) {   
                siblings.each(function(idx, el) {
                    offset += $(el).height();
                });
                parent = $tree.igTree("parentNode", parent);
                if(_.isNil(parent)){
                    return offset;
                }
                siblings = parent.prevAll();
            } 
            return 0;
        }

        function getSelected($tree: JQuery): any {
            let isMulti = isMultiple($tree);
            if(isMulti){
                let values = $tree.igTree("checkedNodes");
                _.forEach(values, function(e){
                    return e["id"] = e.data[e.binding.valueKey];    
                });  
                return values;
            } else {
                let value: any = $tree.igTree("selectedNode");
                if(_.isNil(value) || _.isNil(value.binding) || _.isNil(value.data)){
                   return null;
                }
                value["id"] = value.data[value.binding.valueKey];     
                return value;      
            }
        }

        function getSelectedID($tree: JQuery): any {
            let isMulti = isMultiple($tree);
            if(isMulti){
                let values = $tree.igTree("checkedNodes");
                return _.map(values, function(e){
                    return e.data[e.binding.valueKey];    
                });  
            } else {
                let value: any = $tree.igTree("selectedNode");
                if(_.isNil(value) || _.isNil(value.binding) || _.isNil(value.data)){
                   return null;
                }
                return value.data[value.binding.valueKey];  
            }
        }
        
        function getParent($tree, target) {
            target = getTarget($tree, target);
            if(_.isNil(target)){
                return null;
            }
            let parent = $tree.igTree( "parentNode", $(target.element) );
            if(_.isNil(parent)){
                return null;
            }
            
            return $tree.igTree("nodeFromElement", parent);
        }
        
        function getTarget($tree, target){
            if(!_.isObjectLike(target)){
                 return $tree.igTree("nodeFromElement",  $tree.igTree("nodesByValue", target));
            }
        }
        
        function getPrevious($tree, target) {
            target = getTarget($tree, target);
            if(_.isNil(target)){
                return null;
            }
            let binding = target.binding;
            let parent = $tree.igTree( "parentNode", $(target.element) );
            if(_.isNil(parent)){
                let source = $tree.igTree("option", "dataSource").__ds, 
                    parentIndex = _.findIndex(source, (v) => v[binding.valueKey] === target.data[binding.valueKey]);
                if(parentIndex <= 0){
                    return null;
                }
                let previous = $tree.igTree("nodesByValue", source[parentIndex - 1][binding.valueKey]);
            
                return $tree.igTree("nodeFromElement", previous);
            }
            let parentData = $tree.igTree("nodeFromElement", parent).data;
            let parentIndex = _.findIndex(parentData[binding.childDataProperty], (v) => v[binding.valueKey] === target.data[binding.valueKey]);
            if(parentIndex <= 0){
                return null;
            }
            let previous = $tree.igTree("nodesByValue", parentData[binding.childDataProperty][parentIndex - 1][binding.valueKey]);
            
            return $tree.igTree("nodeFromElement", previous);
        }
        
        function moveDown($tree, target) {
            target = getTarget($tree, target);
            if(_.isNil(target)){
                return false;
            }
            let binding = target.binding, source = $tree.igTree("option", "dataSource").__ds, 
                parent = $tree.igTree( "parentNode", $(target.element) );
            
            if(_.isNil(parent)){
                let firstIdx = _.findIndex(source, (v) =>  v[binding.valueKey] === target.data[binding.valueKey]);
                if(firstIdx < 0){
                    return false;
                }
                let currentIndex = _.findIndex(source,  (v) => v[binding.valueKey] === target.data[binding.valueKey]);
                if(currentIndex < 0 || currentIndex >= source.length - 1){
                    return false;
                }
                source.splice(currentIndex, 1);
                source.splice(currentIndex + 1, 0, target.data);
            } else {
                let parentClonedData = _.cloneDeep($tree.igTree("nodeFromElement", parent).data);  
                let currentIndex = _.findIndex(parentClonedData[binding.childDataProperty],  (v) => v[binding.valueKey] === target.data[binding.valueKey]);
                if(currentIndex < 0 || currentIndex >= parentClonedData[binding.childDataProperty].length - 1){
                    return false;
                }
                parentClonedData[binding.childDataProperty].splice(currentIndex, 1);
                parentClonedData[binding.childDataProperty].splice(currentIndex + 1, 0, target.data);
                source = resetSource(source, parentClonedData, binding);    
            }
            
            $tree.igTree("option", "dataSource", source);
            $tree.igTree("dataBind");
            $tree.trigger("sourcechanging");
        }
        
        function moveUp($tree, target) {
            target = getTarget($tree, target);
            if(_.isNil(target)){
                return false;
            }
            let binding = target.binding, source = $tree.igTree("option", "dataSource").__ds, 
                parent = $tree.igTree( "parentNode", $(target.element) );
            
            if(_.isNil(parent)){
                let firstIdx = _.findIndex(source, (v) =>  v[binding.valueKey] === target.data[binding.valueKey]);
                if(firstIdx < 0){
                    return false;
                }
                let currentIndex = _.findIndex(source,  (v) => v[binding.valueKey] === target.data[binding.valueKey]);
                if(currentIndex <= 0){
                    return false;
                }
                source.splice(currentIndex, 1);
                source.splice(currentIndex - 1, 0, target.data);
            } else {
                let parentClonedData = _.cloneDeep($tree.igTree("nodeFromElement", parent).data);  
                let currentIndex = _.findIndex(parentClonedData[binding.childDataProperty],  (v) => v[binding.valueKey] === target.data[binding.valueKey]);
                if(currentIndex <= 0){
                    return false;
                }
                parentClonedData[binding.childDataProperty].splice(currentIndex, 1);
                parentClonedData[binding.childDataProperty].splice(currentIndex - 1, 0, target.data);
                source = resetSource(source, parentClonedData, binding);    
            }
            
            $tree.igTree("option", "dataSource", source);
            $tree.igTree("dataBind");
            $tree.trigger("sourcechanging");
        }
        
        function moveInto($tree, nextParent, target) {
            target = getTarget($tree, target);
            nextParent = getTarget($tree, nextParent);
            if(_.isNil(target) || _.isNil(nextParent)){
                return false;
            }
            let binding = target.binding, source = $tree.igTree("option", "dataSource").__ds, 
                parent = $tree.igTree( "parentNode", $(target.element) );
            
            if(_.isNil(parent)){
                let firstIdx = _.findIndex(source, (v) =>  v[binding.valueKey] === target.data[binding.valueKey]);
                if(firstIdx < 0){
                    return false;
                }
                _.remove(source, (v) => v[binding.valueKey] === target.data[binding.valueKey]);
            } else {
                let parentClonedData = _.cloneDeep($tree.igTree("nodeFromElement", parent).data);  
                _.remove(parentClonedData[binding.childDataProperty], (v) => v[binding.valueKey] === target.data[binding.valueKey]);
                source = resetSource(source, parentClonedData, binding);
            }
            
            nextParent.data[binding.childDataProperty].push(target.data);
            source = resetSource(source, nextParent.data, binding);
            
            $tree.igTree("option", "dataSource", source);
            $tree.igTree("dataBind");
            $tree.trigger("sourcechanging");
        }
        
        function moveNext($tree, nextTo, target) {
            target = getTarget($tree, target);
            nextTo = getTarget($tree, nextTo);
            if(_.isNil(target) || _.isNil(nextTo)){
                return false;
            }
            let binding = target.binding, source = $tree.igTree("option", "dataSource").__ds, 
                parent = $tree.igTree( "parentNode", $(target.element) ),
                parentOfPrevious = $tree.igTree( "parentNode", $(nextTo.element));
            
            if(_.isNil(parent)){
                return false;
            }
            let parentClonedData = _.cloneDeep($tree.igTree("nodeFromElement", parent).data);  
            _.remove(parentClonedData[binding.childDataProperty], (v) => v[binding.valueKey] === target.data[binding.valueKey]);
            source = resetSource(source, parentClonedData, binding);
            if(_.isNil(parentOfPrevious)){
                let parentIndex = _.findIndex(source, (v) =>  v[binding.valueKey] === nextTo.data[binding.valueKey]);
                source.splice(parentIndex + 1, 0, target.data);
            } else {
                let parentPreviousData = _.cloneDeep($tree.igTree("nodeFromElement", parentOfPrevious).data);  
                let parentIndex = _.findIndex(parentPreviousData[binding.childDataProperty], (v) => v[binding.valueKey] === nextTo.data[binding.valueKey]);
                parentPreviousData[binding.childDataProperty].splice(parentIndex + 1, 0, target.data);
                source = resetSource(source, parentPreviousData, binding);
            }
            
            $tree.igTree("option", "dataSource", source);
            $tree.igTree("dataBind");
            $tree.trigger("sourcechanging");
        }
        
        function resetSource(source, target, binding) {
            for(let i = 0; i < source.length; i++) {
                if(source[i][binding.valueKey] === target[binding.valueKey]) {
                   source[i] = target; 
                } else {
                    if(!_.isEmpty(source[i][binding.childDataProperty])){
                        let sourceX = resetSource(source[i][binding.childDataProperty], target, binding);
                        source[i][binding.childDataProperty] = sourceX;
                    }    
                }
            }
            return source;
        }

        function setSelected($tree: JQuery, selectedId: any) {
            var oldSelect = $tree.ntsTreeDrag("getSelectedID");
            if(_.isEqual(_.flatMapDeep([oldSelect]), (_.flatMapDeep([selectedId])))) {
                return;
            }
            deselectAll($tree);
            let isMulti = isMultiple($tree);
            if(isMulti){
                if(!$.isArray(selectedId) ){
                    selectedId = [selectedId];        
                }  
                selectedId.forEach(id => {
                    let $node = $tree.igTree("nodesByValue", id);
                    $tree.igTree("select", $node);
                });      
            } else {
                let $node = $tree.igTree("nodesByValue", selectedId);
                $tree.igTree("select", $node);    
            }
        }

        function deselectAll($tree: JQuery) {
            _.forEach($tree.igTree("checkedNodes"), function(node){
                $tree.igTree("toggleCheckstate", node.element);            
            })
        }
    }
}
