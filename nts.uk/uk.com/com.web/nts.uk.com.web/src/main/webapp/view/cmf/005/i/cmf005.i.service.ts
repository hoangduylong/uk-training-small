module nts.uk.com.view.cmf005.i.service {
  import ajax = nts.uk.request.ajax;
  var paths = {
      findSaveSetHistory: "ctx/sys/assist/deletedata/findSaveSet",
      findData: "ctx/sys/assist/deletedata/findData",
      deleteData: "ctx/sys/assist/deletedata/deleteData"
  }
 
  export function findSaveSetHistory(fromDate: string, toDate: string): JQueryPromise<SaveSetHistoryDto[]> {
    return ajax('com', paths.findSaveSetHistory, { from: fromDate, to: toDate });
  } 

  export function findData(param: any): JQueryPromise<DataDto[]> {
    return ajax('com', paths.findData, param)
  }

  export function deleteData(param: string): JQueryPromise<DataDto[]> {
    return ajax('com', paths.deleteData, param)
  }
}