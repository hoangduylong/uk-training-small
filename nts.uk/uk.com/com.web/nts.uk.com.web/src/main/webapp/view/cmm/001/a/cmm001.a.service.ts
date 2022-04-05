module cmm001.a.service {
    var paths = {
        getAll: "screen/com/cmm001/findAll",
        getComId: "bs/company/findComId",
        findDiv: "bs/employee/workplacedifferinfor/findDiv",
        findSys: "sys/env/usatr/findSys",
        findPost: "contact/postalcode/findAll",
        findPostId: "contact/postalcode/find",
        findPostCd: "contact/postalcode/findByCode",
        update: "screen/com/cmm001/update",
        add: "screen/com/cmm001/add",
        getAllMasterCopyCategory: "sys/assist/mastercopy/category/getAllMasterCopyCategory",  
    }
       
     export function getAll(){
        return nts.uk.request.ajax(paths.getAll);    
    }
      
    export function getDiv(param: any): JQueryPromise<void>{
        return nts.uk.request.ajax(paths.findDiv, param);     
    }
     
    export function getSys(vari: any): JQueryPromise<void>{
        return nts.uk.request.ajax(paths.findSys, vari);     
    }
    
    export function findPost(){
        return nts.uk.request.ajax(paths.findPost);    
    }
    
     export function findComId(id: String): JQueryPromise<void>{
        return nts.uk.request.ajax("com", paths.getComId + "/" + id);     
    }
    
    export function findPostId(vari: String): JQueryPromise<void>{
        return nts.uk.request.ajax("com", paths.findPostId + "/" + vari);     
    }
    
    export function findPostCd(vari: String): JQueryPromise<void>{
        return nts.uk.request.ajax("com", paths.findPostCd + "/" + vari);     
    }
    
    export function update(command: any): JQueryPromise<void>{
        return nts.uk.request.ajax(paths.update, command);    
    }
    
    export function add(command: any): JQueryPromise<void>{
        return nts.uk.request.ajax(paths.add, command);    
    }
    
    export function getAllMasterCopyCategory() {
        return nts.uk.request.ajax(paths.getAllMasterCopyCategory);
    }
    //saveAsExcel

    export function saveAsExcel(languageId: String): JQueryPromise<any> {
        let program = nts.uk.ui._viewModel.kiban.programName().split(" ");
        let domainType = "CMM001";
            if (program.length > 1) {
                program.shift();
                domainType = domainType + program.join(" ");
            }
        return nts.uk.request.exportFile('/masterlist/report/print', {
            domainId: "Company",
            domainType: domainType, languageId: languageId, reportType: 0
        });
    }

}