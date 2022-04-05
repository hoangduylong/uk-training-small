__viewContext.ready(function() {

    class ScreenModel {
        masterId: KnockoutObservable<string>;
        histList: KnockoutObservableArray<any>;
        selectedHistId: KnockoutObservable<any>;
        
        constructor() {
            let self = this;
            self.height = ko.observable("200px");
            self.labelDistance = ko.observable("30px");
            self.screenMode = ko.observable(1);
            self.masterId = ko.observable("a2316878-a3a5-4362-917e-ad71d956e6c2");
            self.histList = ko.observableArray([]);
            self.selectedHistId = ko.observable();
            self.pathGet = ko.observable(`/bs/employee/workplace/hist/${self.masterId()}`);
            self.pathAdd = ko.observable(`bs/employee/workplace/history/save`);
            self.pathUpdate = ko.observable(`bs/employee/workplace/history/save`);
            self.pathDelete = ko.observable(`bs/employee/workplace/history/remove`);
            self.getQueryResult = (res) => {
                return _.map(res.workplaceHistory, h => {
                    return { histId: h.historyId, startDate: h.startDate, endDate: h.endDate, displayText: `${h.startDate} ～ ${h.endDate}` };
                });
            };
            self.getSelectedStartDate = () => {
                let selectedHist = _.find(self.histList(), h => h.histId === self.selectedHistId());
                if (selectedHist) return selectedHist.startDate;
            };
            self.commandAdd = (masterId, histId, startDate, endDate) => {
                return {
                    isAddMode: true,
                    workplaceId: masterId,
                    workplaceHistory: {
                        historyId: '',
                        period: {
                            startDate: startDate,
                            endDate: new Date(endDate)
                        }
                    }
                }
            };
            self.commandUpdate = (masterId, histId, startDate, endDate) => {
                return {
                    isAddMode: false,
                    workplaceId: masterId,
                    workplaceHistory: {
                        historyId: histId,
                        period: {
                            startDate: startDate,
                            endDate: new Date(endDate)
                        }
                    }
                }
            };
            self.commandDelete = (masterId, histId) => {
                return {
                    workplaceId: masterId,
                    historyId: histId
                };
            };
            self.delVisible = ko.observable(true);
            self.delChecked = ko.observable();
            self.afterRender = () => {
                alert("Load!"); 
            };
            self.afterAdd = () => {
                alert("Added");
            };
            self.afterUpdate = () => {
                alert("Updated");
            };
            self.afterDelete = () => {
                alert("Deleted");
            };
        }
        
        loadHist() {
            
        }
    }
    
    export interface IHistory {
        workplaceId?: string;
        historyId: string;
        startDate: string;
        endDate: string;
        textDisplay?: string;
    }
    
    enum SCREEN_MODE {
        NEW = 0,
        UPD = 1
    }

    this.bind(new ScreenModel());
});