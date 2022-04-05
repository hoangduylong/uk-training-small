module cps002.i.service{
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
   
    let path = "ctx/bs/person/info/setting/user/update/updateUserSetting";
    
    export function setUserSetting(command){
        return ajax( "com",path, command);
    }
}