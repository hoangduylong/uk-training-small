module cps002.e.service{
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    let basePath = "ctx/pereg/";
    let paths = {
        getEmlCode:"employee/mngdata/getGenerateEmplCode",
        getCardNo: "employee/mngdata/getGenerateCardNo"
    };
    
    export function getEmlCode(startLetters){
        return ajax("com", basePath+paths.getEmlCode, startLetters);
    }
    
    export function getCardNo(startLetters){
        return ajax("com", basePath+paths.getCardNo, startLetters);
    }
}