module kcp010.viewmodel {
    import getShared = nts.uk.ui.windows.getShared;
    import setShared = nts.uk.ui.windows.setShared;
    import modal = nts.uk.ui.windows.sub.modal;
    import block = nts.uk.ui.block;
   
    export class ScreenModel {
        wkpList: KnockoutObservableArray<WorkplaceModel>;
        targetBtnText: string;
        flag: boolean = true;
        selectedItem: KnockoutObservable<string>;
        workplaceId: KnockoutObservable<string>;
        workplaceCode: KnockoutObservable<string>;
        workplaceName: KnockoutObservable<string>;
        selectedNumberOfWorkplace: KnockoutObservable<string>;
        selectedOrdinalNumber: KnockoutObservable<number>;
        isActivePreviousBtn: KnockoutObservable<boolean>;
        isActiveNextBtn: KnockoutObservable<boolean>;
        keySearch: KnockoutObservable<string>;
        isDisplay: KnockoutObservable<boolean>;
        tabIndex: number;
        systemDate : KnockoutObservable<any>;
        constructor() {
            var self = this;
            self.systemDate = ko.observable(null);
            self.wkpList = ko.observableArray([]);
            self.targetBtnText = nts.uk.resource.getText("KCP010_3");
            self.workplaceId = ko.observable(null);
            self.workplaceCode = ko.observable(null);
            self.workplaceName = ko.observable(null);
            self.selectedItem = ko.observable("");
            self.keySearch = ko.observable("");
            self.isDisplay = ko.observable(true);
            
            self.systemDate = ko.observable(null);
            // SelectedItem Subscribe
            self.selectedItem.subscribe(function(value: string) {
                self.bindWorkplace(value);
            });
                    
        }

        // Initialize Component
        public init($input: JQuery, data: ComponentOption): JQueryPromise<void> {
            var dfd = $.Deferred<void>();
            $(document).undelegate('#list-box_grid', 'iggriddatarendered');
            ko.cleanNode($input[0]);
            var self = this;
            if(self.systemDate() == null){
                self.systemDate(moment(new Date()).toDate());   
            }
            service.findWorkplaceTree(self.systemDate()).done(function(dataList: Array<service.model.WorkplaceSearchData>) {
                if (dataList && dataList.length > 0) {
                    self.wkpList(self.convertTreeToArray(dataList));
                    
                    if(self.flag){
                        self.flag = false;
                        self.getWorkplaceBySid();
                    }
                    
                    self.tabIndex = data.tabIndex;
                    if (self.wkpList().length > 1) {
                        self.wkpList().sort(function(left, right) {
                            return left.code == right.code ?
                                0 : (left.code < right.code ? -1 : 1)
                        });
                    }
                    
                    self.targetBtnText = data.targetBtnText;
                    
                    // Selected OrdinalNumber
                    self.selectedOrdinalNumber = ko.computed(function() {
                        self.wkpList(_.sortBy(self.wkpList(), [function(o) { return o.hierarchyCode; }]));
                        var currentItem = self.wkpList().filter((item) => {
                            return item.id == self.selectedItem();
                        })[0];
                        return self.wkpList().indexOf(currentItem) + 1;
                    });
        
                    self.isActivePreviousBtn = ko.computed(function() {
                        return (self.wkpList().length > 0) && self.selectedOrdinalNumber() > 1;
                    }, self);
                    self.isActiveNextBtn = ko.computed(function() {
                        return (self.wkpList().length > 0) && self.selectedOrdinalNumber() < self.wkpList().length;
                    }, self);
                    self.selectedNumberOfWorkplace = ko.computed(function() {
                        return self.selectedOrdinalNumber().toString() + "/" + self.wkpList().length.toString();
                    });
                    // End of Initialize variables
        
                    var webserviceLocator = nts.uk.request.location.siteRoot
                        .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                        .mergeRelativePath('/view/kcp/010/kcp010.xhtml').serialize();
                    $input.load(webserviceLocator, function() {
                        //$input.find('#list-box').empty();
                        ko.applyBindings(self, $input[0]);
        
                        // Icon for Previous Button
                        var prevIconLink = nts.uk.request.location.siteRoot
                            .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                            .mergeRelativePath('/view/kcp/share/icon/9.png').serialize();
                        $('#prev-btn').attr('style', "background-color: white; width: 30px; height: 30px; background-size: 30px 30px;");
        
                        // Icon for Next Button
                        var nextIconLink = nts.uk.request.location.siteRoot
                            .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                            .mergeRelativePath('/view/kcp/share/icon/10.png').serialize();
                        $('#next-btn').attr('style', "background-color: white; width: 30px; height: 30px; background-size: 30px 30px;");
        
                        // Enter keypress
                        $('#search-input').on('keypress', function(e) {
                            if (e.which == 13) {
                                self.keySearch($('#search-input').val());
                                if (self.keySearch()) {
                                    self.searchWkp();
                                }
                            }
                        })
        
                        dfd.resolve();
                    });
                } else {
                    // message 184
                    nts.uk.ui.dialog.info({ messageId: "Msg_184" });
                }
            }).fail(function(res) {
                nts.uk.ui.dialog.alert({ messageId: "Msg_7" });
            });
            
            
            return dfd.promise();
        }
        
        public getWorkplaceBySid(): void {
            let self = this;
            service.getWorkplaceBySid().done(function(workplace: service.model.WorkplaceSearchData) {
                if (workplace && workplace != null) {
                    self.selectedItem(workplace.workplaceId);
                } else {
                    self.selectedItem(self.wkpList()[0].id);
                }
            }).fail(function(res) {
                nts.uk.ui.dialog.alert({ messageId: "Msg_7" });
            });
        }
       
        
        /**
         * open dialog CDL008
         * chose work place
         * @param baseDate, isMultiple, workplaceId
         * @return workplaceId
         */
        openDialogCDL008(){
            let self = this;
            block.grayout();
            if(self.systemDate()==null){
                self.systemDate(moment(new Date()).toDate());
            }
            setShared('inputCDL008', { selectedCodes: self.workplaceId(), 
                                       baseDate: self.systemDate(), 
                                       isMultiple: false, 
                                       selectedSystemType:2 , 
                                       isrestrictionOfReferenceRange:true , 
                                       showNoSelection:false , 
                                       isShowBaseDate:true });
            modal("/view/cdl/008/a/index.xhtml").onClosed(function(){
                block.clear();
                let data = getShared('outputCDL008');
                let baseDate = getShared('baseDateCDL008');  
                if(data == null || data === undefined){
                    return;
                } 
                if(baseDate != null && baseDate != undefined){
                    self.systemDate(moment(new Date(baseDate)).toDate());    
                }
                
                
                let param = {
                    targetBtnText: nts.uk.resource.getText("KCP010_3"),
                    tabIndex: 1
                };
                self.init($("#wkp-component"), param).done(function(){
                    //$('#wkp-component').ntsLoadListComponent(param);
                    self.workplaceId(data);
                    self.selectedItem(data);     
                });
                
            });
        }

        // bindWorkplace
        private bindWorkplace(id: string): void {
            let self = this;
            if (id) {
                var currentItem = self.wkpList().filter((item) => {
                    return item.id == id;
                })[0];
                if (currentItem) {
                    self.workplaceId(currentItem.id);
                    self.workplaceCode(currentItem.code);
                    self.workplaceName(currentItem.name);
                    self.keySearch(currentItem.code);
                }
            } else {
                self.workplaceId("");
                self.workplaceCode("");
                self.workplaceName("");
            }
        }
        
        // Search workplace
        private searchWkp(): void {
            let self = this;
            let param = {
                    baseDate : self.systemDate(),
                    workplaceCode : self.keySearch()
            }
            // Search
            service.searchWorkplace(param).done(function(workplace: service.model.WorkplaceSearchData) {
                // find Exist workplace in List
                let existItem = self.wkpList().filter((item) => {
                    return item.code == workplace.code;
                })[0];

                if (existItem) {
                    // Set Selected Item
                    self.selectedItem(existItem.id);
                    self.workplaceId(existItem.id);
                    self.workplaceCode(existItem.code);
                    self.workplaceName(existItem.name);
                } else {
                    let newWkpList: Array<WorkplaceModel> = [];
                    newWkpList.push({ workplaceId: workplace.id, code: workplace.code, name: workplace.name });
                    self.wkpList(newWkpList);
                    // Set Selected Item
                    self.selectedItem(workplace.id);
                    self.workplaceId(workplace.id);
                    self.workplaceCode(workplace.code);
                    self.workplaceName(workplace.name);
                }

            }).fail(function(res) {
                nts.uk.ui.dialog.alert({ messageId: "Msg_7" });
            });
        }

        // Previous workplace
        private previousWkp(): void {
            var self = this;
            try {
                var currentItem = self.wkpList().filter((item) => {
                    return item.id == self.selectedItem();
                })[0];
                var nextId = self.wkpList()[self.wkpList().indexOf(currentItem) - 1].id;
                self.selectedItem(nextId);
            } catch (e) {
                nts.uk.ui.dialog.alert({ messageId: "Msg_7" });
            }
        }

        // Next workplace
        private nextWkp(): void {
            var self = this;
            try {
                var currentItem = self.wkpList().filter((item) => {
                    return item.id == self.selectedItem();
                })[0];
                var prevId = self.wkpList()[self.wkpList().indexOf(currentItem) + 1].id;
                self.selectedItem(prevId);
            } catch (e) {
                nts.uk.ui.dialog.alert({ messageId: "Msg_7" });
            }
        }
        
        /**
         * Convert tree data to array.
         */
        private convertTreeToArray(dataList: Array<WorkplaceModel>): Array<any> {
            let self = this;
            let res = [];
            _.forEach(dataList, function(item) {
                if (item.children && item.children.length > 0) {
                    res = res.concat(self.convertTreeToArray(item.children));
                }
                res.push(item);
            })
            return res;
        }
    }

    /**
     * Interface ComponentOption
     */
    export interface ComponentOption {
        targetBtnText: string;
        tabIndex: number;
    }

    /**
     * Interface WorkplaceModel
     */
    export interface WorkplaceModel {
        workplaceId: string;
        code: string;
        name: string;
        childs: Array<WorkplaceModel>;
    }

    /**
     * Module Service
     */
    export module service {
        var paths: any = {
            findWorkplaceTree: "bs/employee/wkpdep/get-wkpdepinfo-kcp004",
            searchWorkplace: 'screen/com/kcp010/search/',
            getWorkplaceBySid: 'screen/com/kcp010/getLoginWkp',
        }

        export function findWorkplaceTree(baseDate: Date): JQueryPromise<Array<model.WorkplaceSearchData>> {
            return nts.uk.request.ajax('com', paths.findWorkplaceTree, 
                { 
                    startMode: 0,
                    baseDate: baseDate,
                    systemType: 2,
                    restrictionOfReferenceRange: true 
                });
        }
        
        export function searchWorkplace(input :any): JQueryPromise<model.WorkplaceSearchData> {
            return nts.uk.request.ajax('com', paths.searchWorkplace,input);
        }
        
        export function getWorkplaceBySid(): JQueryPromise<model.WorkplaceSearchData> {
            return nts.uk.request.ajax('com', paths.getWorkplaceBySid);
        }

        /**
         * Module Model
         */
        export module model {
            export class WorkplaceSearchData {
                workplaceId: string;
                code: string;
                name: string;
            }
        }
    }
}
/**
 * Defined Jquery interface.
 */
//var modelkcp010;
interface JQuery {
    ntsLoadListComponent(option: kcp010.viewmodel.ComponentOption): kcp010.viewmodel.ScreenModel;
}

(function($: any) {
    $.fn.ntsLoadListComponent = function(option: kcp010.viewmodel.ComponentOption): kcp010.viewmodel.ScreenModel {
        var modelkcp010 = new kcp010.viewmodel.ScreenModel();
        modelkcp010.init(this, option);
        // Return.
        return modelkcp010;
    }

} (jQuery));