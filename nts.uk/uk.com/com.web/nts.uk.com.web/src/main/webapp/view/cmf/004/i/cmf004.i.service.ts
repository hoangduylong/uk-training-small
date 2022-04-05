module nts.uk.com.view.cmf004.i.service {

    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    var paths = {
        performDataRecover: "ctx/sys/assist/datarestoration/performDataRecover",
        followProsess: "ctx/sys/assist/datarestoration/followProsess/{0}",
        breakFollowProcessing: "ctx/sys/assist/datarestoration/breakFollowProcessing",
        deletePerformDataRecover: "ctx/sys/assist/datarestoration/deletePerformDataRecover/{0}",
    }
    /**
       * send for screen I
      */
    export function performDataRecover(paramRestore): JQueryPromise<any> {
        return nts.uk.request.ajax('com', paths.performDataRecover, paramRestore);
    };

    /**
    * get followProsess
    */
    export function followProsess(recoveryProcessingId: string): JQueryPromise<any> {
        let _path = format(paths.followProsess, recoveryProcessingId);
        return ajax('com', _path);
    }
    /**
    * update status followProsess End
    */

    export function deletePerformDataRecover(recoveryProcessingId: string): JQueryPromise<any> {
        let _path = format(paths.deletePerformDataRecover, recoveryProcessingId);
        return nts.uk.request.ajax('com', _path);
    };
    
    export function breakFollowProcessing(paramBreakFollowProcessing): JQueryPromise<any> {
        return nts.uk.request.ajax('com', paths.breakFollowProcessing, paramBreakFollowProcessing);
    };

}
