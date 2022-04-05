/// <reference path="../../reference.ts"/>

module nts.uk.ui.koExtentions {
    let $: any = window['$'],
        _: any = window['_'],
        ko: any = window['ko'];
    
     /**
     * SearchBox Binding Handler
     */
    
    export class SearchBox {
        childField: string;
        searchField: Array<string>;
        source: Array<any>;
        key: string;
        
        constructor(source: Array<any>, searchField: Array<string>, childField?: string, key?: string) {
            this.childField = childField;    
            this.source = _.isEmpty(source) ? [] : this.cloneDeep(source);
            this.searchField = searchField;
            this.key = key;
        }
        
        filter(searchKey: string): Array<any>{
            let self = this;
            return self.filterWithSource(searchKey, this.source);
        }
        
        computeSelectingIndex(dataSource: Array<any>, selectedItems: any, key: string): number {
            let selectingIndex = -1;
            if (!_.isEmpty(selectedItems)) {
                let firstItemValue = $.isArray(selectedItems)
                    ? selectedItems[0]["id"].toString() : selectedItems["id"].toString();
                selectingIndex = _.findIndex(dataSource, function(item: any) {
                    return item[key].toString() === firstItemValue;
                });
            }
            return selectingIndex;
        }
        
        search(searchKey: string, selectedItems: Array<any>): any {
            let self = this;
            
            let flatArr = nts.uk.util.flatArray(self.source, this.childField);
            
            let fromIndex = this.computeSelectingIndex(flatArr, selectedItems, self.key);
            // search in the next array
            let nextSource = flatArr.slice(fromIndex + 1);
            let nextFilterdItems = self.filterWithSource(searchKey, nextSource);
            if (nextFilterdItems.length > 0 ) {
                return nextFilterdItems[0];   
            }
            // search in the previous array
            let previousSource = flatArr.slice(0, fromIndex + 1);
            let previouseFilteredItems = self.filterWithSource(searchKey, previousSource);
            if (previouseFilteredItems.length > 0) {
                return previouseFilteredItems[0]; 
            }
            
            // if not match searchKey
            return null;
        }
        
        filterWithSource(searchKey: string, source: Array<any>) {
            let self = this;
            
            if(_.isEmpty(source)){
                return [];        
            }
            
            let filtered = _.filter(source, function(item: any) {
                return _.find(self.searchField, function(x: string) {
                    if(x !== undefined && x !== null){
                        let val: string = item[x].toString();
                        return val.indexOf(searchKey.toString()) >= 0;        
                    }
                    return false;
                }) !== undefined;        
            });
            
            return filtered;
        }
        
        setDataSource(source: Array<any>) {
            this.source = _.isEmpty(source) ? [] : this.cloneDeep(source);       
        }
        
        getDataSource() {
            return this.cloneDeep(this.source);       
        }
        
        private cloneDeep(source: Array<any>): Array<any>{
            let self = this;
            return self.cloneDeepX(source); 
        }
        
        private cloneDeepX(source: Array<any>): Array<any>{
            return _.cloneDeep(source); 
        }
    }
    
    export class SearchResult {
        options: Array<any>;
        selectItems: Array<any>;  
        
        constructor(){
            this.options = []; 
            this.selectItems = [];   
        }
    }
    
    export class SearchPub {
        seachBox: SearchBox;
        mode: string;  
        key: string;
        
        constructor(key: string, mode: string, source: Array<any>, searchField: Array<string>, childField?: string) {
            this.seachBox = new SearchBox(source, searchField, childField, key);    
            this.mode = _.isEmpty(mode) ? "highlight" : mode;
            this.key = key;
        }
        
        search (searchKey: string, selectedItems: Array<any>): SearchResult{
            let result = new SearchResult();   
            let key = this.key;
            
            if(this.mode === "highlight"){
                let dataSource = this.seachBox.getDataSource();     
                
                let selectItem = this.seachBox.search(searchKey, selectedItems); 
                if (selectItem == null ) {
                    return result;    
                }
                
                result.options = dataSource;
                result.selectItems = [selectItem];
                return result;
            } else {
                let filtered = this.seachBox.filter(searchKey);
                
                if (_.isEmpty(filtered)) {
                    return result;    
                }
                let selectItem = _.filter(filtered, function (itemFilterd: any){
                    return _.find(selectedItems, function (item: any){
                        let itemVal = itemFilterd[key];
                        if(_.isNil(itemVal) || _.isNil(item["id"])){
                           return false;
                        }
                        return itemVal.toString() === item["id"].toString();        
                    }) !== undefined;            
                }); 
                
                result.options = filtered;
                result.selectItems = selectItem;
                return result;
            }
        }
        
        public setDataSource(source: Array<any>) {
            this.seachBox.setDataSource(source);       
        }
        
        public getDataSource() {
            return this.seachBox.getDataSource();       
        }
    }
    
    export interface SelectionChangingData {
        selected: Array<any>;
        searchMode: string;
        options?: Array<any>;
    }
    
    class NtsSearchBoxBindingHandler implements KnockoutBindingHandler {
        /**
         * Init.
         */
        init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void | { controlsDescendantBindings: boolean; } {
            let minusWidth = 0;
            
            var data = ko.unwrap(valueAccessor());
            var fields = ko.unwrap(data.fields);
            
            var placeHolder = (data.placeHolder !== undefined) ? ko.unwrap(data.placeHolder) : toBeResource.searchByCodeName; 
            
            var searchMode = (data.searchMode !== undefined) ? ko.unwrap(data.searchMode) : "highlight";
            var defaultSearchText = (searchMode === 'highlight') ? toBeResource.search : toBeResource.filter;
            var searchText = (data.searchText !== undefined) ? ko.unwrap(data.searchText) : defaultSearchText;
            var label = (data.label !== undefined) ? ko.unwrap(data.label) : "";
            var enable = ko.unwrap(data.enable);
            var selectedKey = null;
            if (data.selectedKey) {
                selectedKey = ko.unwrap(data.selectedKey);
            }
            var dataSource = ko.unwrap(data.items);
            var childField = null;
            if (data.childField) {
                childField = ko.unwrap(data.childField);
            }
            let targetMode = data.mode;
            if (targetMode === "listbox") {
                targetMode = "igGrid";    
            }
            
            var $container = $(element);
            let tabIndex = _.isEmpty($container.attr("tabindex")) ? "0" : $container.attr("tabindex");
            $container.addClass("nts-searchbbox-wrapper").removeAttr("tabindex");
            $container.append("<div class='input-wrapper'><span class='nts-editor-wrapped ntsControl'><input class='ntsSearchBox nts-editor ntsSearchBox_Component' type='text' /></span></div>");  
            $container.find('.input-wrapper').append("<i id='search-icon' class='img-icon'></i>");
            $container.append("<div class='input-wrapper'><button class='search-btn caret-bottom ntsSearchBox_Component'>" + searchText + "</button></div>"); 
            
            if(!_.isEmpty(label)){
                var $formLabel = $("<div>", { text: label });
                $formLabel.prependTo($container);
                ko.bindingHandlers["ntsFormLabel"].init($formLabel[0], () => ({}), allBindingsAccessor, viewModel, bindingContext);
                ko.bindingHandlers["ntsFormLabel"].update($formLabel[0], () => ({}), allBindingsAccessor, viewModel, bindingContext);
                minusWidth += $formLabel.outerWidth(true);
            }
            
            var $button = $container.find("button.search-btn");
            var $input = $container.find("input.ntsSearchBox");
            minusWidth += $button.outerWidth(true);
            if(searchMode === "filter"){
                $container.append("<button class='clear-icon proceed ntsSearchBox_Component'>"); 
                let $clearButton = $container.find("button.clear-icon");  
                minusWidth +=  $clearButton.outerWidth(true);
                $clearButton.click(function(evt: Event, ui: any) {
                    let component = $("#" + ko.unwrap(data.comId));    
                    if(component.hasClass("listbox-wrapper")){
                        component = $("#" + ko.unwrap(data.comId)).find(".ntsListBox");     
                    }
                    let srh: SearchPub= $container.data("searchObject");
                    $input.val("");
                    component.igGrid("option", "dataSource", srh.seachBox.getDataSource());  
                    component.igGrid("dataBind"); 
                    $container.data("searchKey", null);    
                    component.attr("filtered", "false");     
                    _.defer(function() {
                        component.trigger("selectChange");    
                    });     
                });      
                
            }
            
            $input.attr("placeholder", placeHolder);
            $input.attr("data-name", nts.uk.ui.toBeResource.searchBox);
            $input.outerWidth($container.outerWidth(true) - minusWidth);　
            
            let primaryKey = ko.unwrap(data.targetKey);
            let searchObject = new SearchPub(primaryKey, searchMode, dataSource, fields, childField);
            $container.data("searchObject", searchObject);
            
            let search = function (searchKey: string){
                if (targetMode) {
                    let selectedItems, isMulti;
                    let component = $("#" + ko.unwrap(data.comId));   
                    if (targetMode == 'igGrid') {
                        if(component.hasClass("listbox-wrapper")){
                            component = $("#" + ko.unwrap(data.comId)).find(".ntsListBox");     
                        }
                        selectedItems = component.ntsGridList("getSelected");
                        isMulti = component.igGridSelection('option', 'multipleSelection');
                    } else if (targetMode == 'igTree') {
                        selectedItems = component.ntsTreeView("getSelected");
                        isMulti = component.igTreeGridSelection('option', 'multipleSelection');
                    } else if (targetMode == 'igTreeDrag') {
                        selectedItems = component.ntsTreeDrag("getSelected");  
                        isMulti = component.ntsTreeDrag('option', 'isMulti') ;  
                    }
                    
                    let srh: SearchPub= $container.data("searchObject");
                    let result = srh.search(searchKey, selectedItems);
                    if(_.isEmpty(result.options)){
                        let mes = '';
                        if(searchMode === "highlight"){
                            mes = nts.uk.resource.getMessage("MsgB_25");
                        } else {
                            mes = nts.uk.ui.toBeResource.targetNotFound;    
                        }
                        nts.uk.ui.dialog.alert(mes).then(() => { 
                            $input.focus(); 
                            $input.select();
                        });
                        return false;        
                    }
                    
                    let selectedProperties = _.map(result.selectItems, primaryKey);
                    
                    component.trigger("searchfinishing", { selected: selectedProperties, searchMode: searchMode, options: result.options })
                    
                    if (targetMode === 'igGrid') {  
                        component.ntsGridList("setSelected", selectedProperties);
                        if(searchMode === "filter"){
                            $container.data("filteredSrouce", result.options); 
                            component.attr("filtered", "true");   
                            //selected(selectedValue);
                            //selected.valueHasMutated();
//                            let source = _.filter(data.items(), function (item: any){
//                                             return _.find(result.options, function (itemFilterd: any){
//                                            return itemFilterd[primaryKey] === item[primaryKey];        
//                                                }) !== undefined || _.find(srh.getDataSource(), function (oldItem: any){
//                                             return oldItem[primaryKey] === item[primaryKey];        
//                                            }) === undefined;            
//                            });
//                            component.igGrid("option", "dataSource", _.cloneDeep(source));  
                            component.igGrid("option", "dataSource", _.cloneDeep(result.options));
                            component.igGrid("dataBind");  
                            
//                            if(_.isEmpty(selectedProperties)){
                                component.trigger("selectionchanged");        
//                            }
                        } else {
                            component.trigger("selectionchanged");    
                        }
                    } else if (targetMode == 'igTree') {
                        component.ntsTreeView("setSelected", selectedProperties);
                        component.trigger("selectionchanged");
                        //selected(selectedValue);
                    } else if(targetMode == 'igTreeDrag'){
                        component.ntsTreeDrag("setSelected", selectedProperties);
                    }
                    _.defer(function() {
                        component.trigger("selectChange");    
                    });
                    
                    $container.data("searchKey", searchKey);  
                }
                return true;    
            } 
            
            var nextSearch = function() {
                let searchKey = $input.val();
                if(_.isEmpty(searchKey)) {
                    nts.uk.ui.dialog.alert(nts.uk.resource.getMessage("MsgB_24")).then(() => { 
                        $input.focus(); 
//                        $input.select();
                    });
                    return false;        
                }
                return search(searchKey);    
            }
            $input.keydown(function(event) {
                if (event.which == 13) {
                    event.preventDefault();
                    let result = nextSearch();
                    _.defer(() => {
                        if(result){
                            $input.focus();         
                        }                
                    });
                }
            });
            $button.click(function() {
                nextSearch();    
            });
            
            $container.find(".ntsSearchBox_Component").attr("tabindex", tabIndex);
            
            if(enable === false){
                $container.find(".ntsSearchBox_Component").attr('disabled', 'disabled');        
            }
            
            return { 'controlsDescendantBindings': true };
        }
        update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void {
            var $searchBox = $(element);
            var data = valueAccessor();
            
            var arr = ko.unwrap(data.items);
            
            var searchMode = ko.unwrap(data.searchMode);
            let primaryKey = ko.unwrap(data.targetKey);
            let enable = ko.unwrap(data.enable);
            let component;
            if (data.mode === "listbox") {
                component = $("#" + ko.unwrap(data.comId)).find(".ntsListBox");    
            } else {
                component = $("#" + ko.unwrap(data.comId));    
            }
            let srhX: SearchPub= $searchBox.data("searchObject");
            
            if(component.attr("filtered") === "true"){
                
                let isCheck = component.triggerHandler("checknewitem");
                if(isCheck !== false){
                    let currentSoruce = srhX.getDataSource();
                
                    let newItems = _.filter(arr, function(i){
                        return _.find(currentSoruce, function(ci){
                            return ci[primaryKey] === i[primaryKey];
                        }) === undefined;            
                    });    
                    if(!_.isEmpty(newItems)){
                        let gridSources = component.igGrid("option", "dataSource");
                        _.forEach(newItems, function (item){
                            gridSources.push(item);            
                        });
                        component.igGrid("option", "dataSource", _.cloneDeep(gridSources));  
                        component.igGrid("dataBind");     
                    }    
                }
                
            }
            
            srhX.setDataSource(arr);
            
            if(enable === false){
                $searchBox.find(".ntsSearchBox_Component").attr('disabled', 'disabled');        
            } else {
                $searchBox.find(".ntsSearchBox_Component").removeAttr('disabled');           
            }
        }
    }
    
    ko.bindingHandlers['ntsSearchBox'] = new NtsSearchBoxBindingHandler();
}
