module nts.uk.com.view.cmm013.a {
    
    export module service {
            
        /**
         *  Service paths
         */
        var servicePath: any = {
            findJobTitleList: "basic/training/jobtitle/find/all",
			updateJobTitle: "basic/training/jobtitle/update",
			addJobTitle: "basic/training/jobtitle/add",
			findHistoryList: "basic/training/jobtitle/find",
        }
    
        /**
         * find history list (get all info of one job title)
         */
        export function findHistoryList(jobTitleId: string): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.findHistoryList, { jobTitleId });
        }
        
        /**
         * find all job title
         */
        export function findAllJobTitle(): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.findJobTitleList);
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
    }
}