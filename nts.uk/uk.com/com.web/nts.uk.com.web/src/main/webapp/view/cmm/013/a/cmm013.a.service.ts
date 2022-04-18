module nts.uk.com.view.cmm013.a {

	export module service {

        /**
         *  Service paths
         */
		var servicePath: any = {
			findJobTitleList: "basic/training/jobtitle/find/all",
            findAllPosition: "basic/training/position/findAll",
			addJobTitle: "basic/training/jobtitle/add",
			findHistoryList: "basic/training/jobtitle/find",
		}

        /**
         * find history list (get all info of one job title)
         */
		export function findHistoryList(jobTitleCode: string): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.findHistoryList, { jobTitleCode: jobTitleCode });
		}

        /**
         * find all job title
         */
		export function findAllJobTitle(): JQueryPromise<Array<model.JobTitleDto>> {
			return nts.uk.request.ajax(servicePath.findJobTitleList);
		}
		
		// find all positions
		export function findAllPosition(): JQueryPromise<Array<Position>> {
			return nts.uk.request.ajax(servicePath.findAllPosition);
		}
		
        /**
         * update job title
         */
		export function updateJobTitle(command: any): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.updateJobTitle, command);
		}

        /**
         * add job title
         */
		export function addJobTitle(command: any): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.addJobTitle, command);
		}

		export module model {

			export interface JobTitleDto {
				positionCodeTraining: string;
				positionName: string;
				jobTitleCode: string;
				historyTrainings: Array<HistoryDto>;
				isAbrogated: boolean;
				treatAsAManager: boolean;
			}

			export class HistoryDto {
				historyId: string;
				jobTitleCode: string;
				jobTitleName: string;
				startDate: string;
				endDate: string;
				displayString: string;

				constructor(historyId: string, jobTitleCode: string, jobTitleName: string, startDate: string, endDate?: string) {
					this.jobTitleCode = jobTitleCode;
					this.jobTitleName = jobTitleName;
					this.historyId = historyId;
					this.startDate = startDate;
					this.endDate = endDate ? endDate : "9999/12/31";
					this.displayString = `${this.startDate} ~ ${this.endDate}`
			}
		}

		export interface JobTitleDtoTraining {
			positionCodeTraining: string;
			positionName: string;
			jobTitleCode: string;
			isAbrogated: boolean;
			treatAsAManager: boolean;
			historyTrainings: Array<HistoryDto>;
		}

	}
}
}