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
        //export abstract class JobTitleHistoryAbstract {   
        
        /**
         * JobTitle
         */
        export class JobTitle {
            
            jobTitleCode: string;
            jobTitleName: string;
            
            constructor(jobTitleCode: string, jobTitleName: string) {
                this.jobTitleCode = jobTitleCode;
                this.jobTitleName = jobTitleName;
            }
        }
                        
        /**
         * History
         */
        export class History {
            
            jobTitleId: string;
            historyId: string;
            startDate: string;
            endDate: string;
            
            constructor(jobTitleId: string, historyId: string, startDate: string, endDate?: string) {
                this.jobTitleId = jobTitleId;
                this.historyId = historyId;
				this.startDate = startDate;
				this.endDate = endDate ? endDate : "31/12/9999";
            }     
        }    
        /*
			

            listHistory: KnockoutObservableArray<History>;
            selectedHistoryId: KnockoutObservable<string>;
            
            constructor() {
                let self = this;
                self.listHistory = ko.observableArray([]);
                self.selectedHistoryId = ko.observable(null);
                
                self.listJobTitleHistory.subscribe((newListHistory) => {
                    _self.fillTextDisplay();               
                });
            }
            
            /**
             * selectFirst
             
            public selectFirst() {
                let _self = this;
                if (_self.listJobTitleHistory()[0]){
                    _self.selectedHistoryId(_self.listJobTitleHistory()[0].historyId);
                }               
            }            
            
            /**
             * getSelectedHistoryByHistoryId
             
            public getSelectedHistoryByHistoryId(): History {
                let _self = this;
                return _self.listJobTitleHistory().filter(item => item.historyId == _self.selectedHistoryId())[0];
            }
            
            /**
             * fillTextDisplay
             
            private fillTextDisplay() {
                let _self = this;
                _.forEach(_self.listJobTitleHistory(), (item: History) => {
                    item.textDisplay = item.period.startDate + " " + nts.uk.resource.getText("CMM013_30") + " " + item.period.endDate;
                })
            }
            
        }     
		 */
        /**
         * Position
         */
		export class Position {

			positionCode: string;
			positionName: string;
			positionOrder: number;

			constructor(positionCode: string, positionName: string, order: number) {
				this.positionCode = positionCode;
				this.positionName = positionName;
				this.positionOrder = order;
			}
		}
	}
}