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
			public static SHARE_IN_DIALOG_ABROGATE_JOB_TITLE: string = "SHARE_IN_DIALOG_ABROGATE_JOB_TITLE";
			public static SHARE_OUT_DIALOG_ABROGATE_JOB_TITLE: string = "SHARE_OUT_DIALOG_ABROGATE_JOB_TITLE"; 
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

			position: Position;
            
            constructor(jobTitleCode: string, jobTitleName: string, positionCode: string, positionName: string, positionOrder: number) {
                this.jobTitleCode = jobTitleCode;
                this.jobTitleName = jobTitleName;
				this.position = new Position(positionCode, positionName, positionOrder);
            }
        }
      
        /**
         * History
         */
        export class History {
            
            jobTitleCode: string;
			jobTitleName: string;
            historyId: string;
            startDate: string;
            endDate: string;
			displayString: string;
            
            constructor(jobTitleCode: string, jobTitleName: string, historyId: string, startDate: string, endDate?: string) {
                this.jobTitleCode = jobTitleCode;
				this.jobTitleName = jobTitleName;
                this.historyId = historyId;
				this.startDate = startDate;
				this.endDate = endDate ? endDate : "9999/12/31";
				this.displayString = `${this.startDate} ~ ${this.endDate}`
            }     
        }

        /**
         * Position
         */
		export class Position {

			positionCode: string;
			positionName: string;
			positionOrder: number;

			constructor(positionCode: string, positionName: string, positionOrder: number) {
				this.positionCode = positionCode;
				this.positionName = positionName;
				this.positionOrder = positionOrder;
			}
		}
	}
}