module nts.uk.com.view.ccg008.a.service {
    var paths = {
        getCache: "screen/com/ccg008/get-cache",
        getClosure: "screen/com/ccg008/get-closure",
        getSetting: "screen/com/ccg008/get-setting",
        getDisplayTopPage: "toppage/getTopPage",
        extract: "sys/portal/createflowmenu/extractListFileId",
        getLoginUser: "screen/com/ccg008/get-user"
    }
        
    export function getCache():JQueryPromise<any>{
        return nts.uk.request.ajax("com",paths.getCache);
    }
    
    export function getClosure():JQueryPromise<any>{
        return nts.uk.request.ajax("com",paths.getClosure);
    }

    export function getSetting():JQueryPromise<any>{
      return nts.uk.request.ajax("com",paths.getSetting);
    }

    export function getLoginUser():JQueryPromise<any>{
      return nts.uk.request.ajax("com",paths.getLoginUser);
    }

  export function getTopPage(param:any):JQueryPromise<any>{
    return nts.uk.request.ajax("com", paths.getDisplayTopPage, param);
  }

  export function extractFile(param:any):JQueryPromise<any>{
    return nts.uk.request.ajax("com", paths.extract, param);
  }
}
