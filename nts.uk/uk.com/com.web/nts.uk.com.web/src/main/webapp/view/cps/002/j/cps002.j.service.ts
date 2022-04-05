module cps002.j.service{
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    let basePath = "ctx/pereg/";
    let paths = {
        getEmlCode:"employee/mngdata/getGenerateEmplCode",
        getCardNo: "employee/mngdata/getGenerateCardNo",
        getStamCardEditing: "record/stamp/stampcardedit/find"
    };
    
    export function getEmlCode(startLetters){
        return ajax("com", basePath+paths.getEmlCode, startLetters);
    }
    
    export function getCardNo(startLetters){
        return ajax("com", basePath+paths.getCardNo, startLetters);
    }
    
    export function getStamCardEdit() {
        return nts.uk.request.ajax("at", paths.getStamCardEditing);
    }

}