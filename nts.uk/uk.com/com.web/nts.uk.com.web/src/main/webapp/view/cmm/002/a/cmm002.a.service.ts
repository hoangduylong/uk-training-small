module nts.uk.com.view.cmm002.a.service {
    var paths = {
        getData: "com/screen/cmm002/get",
        add: "com/ctx/sys/gateway/accessrestrictions/add",
        update: "com/ctx/sys/gateway/accessrestrictions/update",
        del: "com/ctx/sys/gateway/accessrestrictions/del"
    }
       
     export function getData(){
        return nts.uk.request.ajax(paths.getData);    
    }
      
    export function add(param: any): JQueryPromise<void>{
        return nts.uk.request.ajax(paths.add, param);     
    }
     
    export function update(param: any): JQueryPromise<void>{
        return nts.uk.request.ajax(paths.update, param);     
    }
    
    export function del(param: any): JQueryPromise<void>{
        return nts.uk.request.ajax(paths.del, param);     
    }
}