module nts.uk.com.view.cmm040.b.service {
    let paths: any = {
     getDataStart: "at/screen/cmm040/startB",
     update:"at/screen/cmm040/saveDataScreenB",
     deleteData:"at/screen/cmm040/deleteScreenB"     
    }
    
     export function getDataStart(param: any): JQueryPromise<any>  {
        return nts.uk.request.ajax("at", paths.getDataStart , param);
    } 
     export function update(param): any {
        return nts.uk.request.ajax("at", paths.update, param);
    }
     export function deleteData(param): any {
        return nts.uk.request.ajax("at", paths.deleteData,param);
    }
    
}