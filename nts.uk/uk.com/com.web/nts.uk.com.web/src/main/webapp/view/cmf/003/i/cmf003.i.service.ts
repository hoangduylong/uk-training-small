module nts.uk.com.view.cmf003.i.service {
  import ajax = nts.uk.request.ajax;
  var paths = {
      findSaveSetHistory: "ctx/sys/assist/datastorage/findSaveSet",
      findData: "ctx/sys/assist/datastorage/findData",
      deleteData: "ctx/sys/assist/datastorage/deleteData",
      getFreeSpace: "ctx/sys/assist/datastorage/getFreeSpace"
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

  export function getFreeSpace(): JQueryPromise<number> {
    return ajax('com', paths.getFreeSpace);
  }
}