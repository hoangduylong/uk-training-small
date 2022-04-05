module nts.uk.com.view.cmm013 {
    
    export module base {

        /**
         * Constants
         */
        export class Constants {           
            public static IS_ACCEPT_DIALOG_SELECT_SEQUENCE: string = "IS_ACCEPT_DIALOG_SELECT_SEQUENCE";
            public static SHARE_IN_DIALOG_REMOVE_JOB: string = "SHARE_IN_DIALOG_REMOVE_JOB";
            public static SHARE_OUT_DIALOG_REMOVE_JOB: string = "SHARE_OUT_DIALOG_REMOVE_JOB"; 
            public static SHARE_IN_DIALOG_SELECT_SEQUENCE: string = "SHARE_IN_DIALOG_SELECT_SEQUENCE";
            public static SHARE_OUT_DIALOG_SELECT_SEQUENCE: string = "SHARE_OUT_DIALOG_SELECT_SEQUENCE"; 
            public static SHARE_IN_DIALOG_ADD_HISTORY: string = "SHARE_IN_DIALOG_ADD_HISTORY"; 
            public static SHARE_OUT_DIALOG_ADD_HISTORY: string = "SHARE_OUT_DIALOG_ADD_HISTORY"; 
            public static SHARE_IN_DIALOG_EDIT_HISTORY: string = "SHARE_IN_DIALOG_EDIT_HISTORY"; 
            public static SHARE_OUT_DIALOG_EDIT_HISTORY: string = "SHARE_OUT_DIALOG_EDIT_HISTORY"; 
        }
        
        /**
         * JobTitleHistoryAbstract
         */
        export abstract class JobTitleHistoryAbstract {

            listJobTitleHistory: KnockoutObservableArray<History>;
            selectedHistoryId: KnockoutObservable<string>;
            
            constructor() {
                let _self = this;
                _self.listJobTitleHistory = ko.observableArray([]);
                _self.selectedHistoryId = ko.observable(null);
                
                _self.listJobTitleHistory.subscribe((newListHistory) => {
                    _self.fillTextDisplay();               
                });
            }
            
            /**
             * selectFirst
             */
            public selectFirst() {
                let _self = this;
                if (_self.listJobTitleHistory()[0]){
                    _self.selectedHistoryId(_self.listJobTitleHistory()[0].historyId);
                }               
            }            
            
            /**
             * getSelectedHistoryByHistoryId
             */
            public getSelectedHistoryByHistoryId(): History {
                let _self = this;
                return _self.listJobTitleHistory().filter(item => item.historyId == _self.selectedHistoryId())[0];
            }
            
            /**
             * fillTextDisplay
             */
            private fillTextDisplay() {
                let _self = this;
                _.forEach(_self.listJobTitleHistory(), (item: History) => {
                    item.textDisplay = item.period.startDate + " " + nts.uk.resource.getText("CMM013_30") + " " + item.period.endDate;
                })
            }
            
            /**
             * isSelectedLatestHistory
             */
            public isSelectedLatestHistory() {
                let _self = this;
                if (_self.listJobTitleHistory().length > 0) {
                    return _self.selectedHistoryId() == _self.listJobTitleHistory()[0].historyId;
                }
                return false;
            }
        }        
        
        /**
         * JobTitle
         */
        export class JobTitle {
            
            companyId: string;
            jobTitleId: string;
            
            constructor(companyId: string, jobTitleId: string) {
                this.companyId = companyId;
                this.jobTitleId = jobTitleId;
            }
        }
                        
        /**
         * History
         */
        export class History {
            
            jobTitleId: string;
            historyId: string;
            period: Period;
            textDisplay: string;
            
            constructor(jobTitleId: string, historyId: string, period: Period, textDisplay?: string) {
                this.jobTitleId = jobTitleId;
                this.historyId = historyId;
                this.period = period;
                this.textDisplay = textDisplay;
            }          
        }    
        
        /**
         * History (for save command)
         */
        export class SaveHistory {
            
            historyId: string;
            period: SavePeriod;
            
            constructor(historyId: string, period: SavePeriod) {
                this.historyId = historyId;
                this.period = period
            }          
        }
        
        /**
         * Period
         */
        export class Period {
            
            startDate: string;
            endDate: string;
            
            constructor(startDate: string, endDate: string){
                this.startDate = startDate;
                this.endDate = endDate;
            }
        }
        
        /**
         * Period (for save command)
         */
        export class SavePeriod {
            
            startDate: Date;
            endDate: Date;
            
            constructor(startDate: Date, endDate: Date){
                this.startDate = startDate;
                this.endDate = endDate;
            }
        }
        
        /**
         * SequenceMaster
         */
        export class SequenceMaster {
                    
            sequenceCode: string;
            sequenceName: string;
            order: number;
                                      
            constructor(sequenceCode: string, sequenceName: string, order: number) {
                this.sequenceCode = sequenceCode;
                this.sequenceName = sequenceName;
                this.order = order;
            }    
        }
               
    }
}