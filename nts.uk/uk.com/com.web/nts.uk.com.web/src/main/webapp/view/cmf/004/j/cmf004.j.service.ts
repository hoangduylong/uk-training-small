module nts.uk.com.view.cmf004.j.service {
  import ajax = nts.uk.request.ajax;
  var paths = {
      findSaveSetHistory: "ctx/sys/assist/datarestoration/findSaveSet",
      findData: "ctx/sys/assist/datarestoration/findData"
  }
 
  export function findSaveSetHistory(fromDate: string, toDate: string): JQueryPromise<SaveSetHistoryDto[]> {
    return ajax('com', paths.findSaveSetHistory, { from: fromDate, to: toDate });
  } 

  export function findData(param: any): JQueryPromise<DataDto[]> {
    return ajax('com', paths.findData, param)
  }
}