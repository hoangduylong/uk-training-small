module nts.uk.com.view.cps009.c.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    let paths: any = {
        copyInitValue: "ctx/pereg/person/info/setting/init/copyInitValue"
    }
    
    export function copyInitValue(data): JQueryPromise<any> {
            return nts.uk.request.ajax("com", paths.copyInitValue, data);
    }
}
