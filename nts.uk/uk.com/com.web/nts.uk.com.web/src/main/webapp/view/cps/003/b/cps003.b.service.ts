module cps003.b.service {
    import ajax = nts.uk.request.ajax; 
    import format = nts.uk.text.format;
    let paths = {
        checkColum: "basic/organization/empfilemanagement/find/checkFile"  
    }

    export function checkColums(params: any) {
         return ajax(paths.checkColum, params);
    }
}