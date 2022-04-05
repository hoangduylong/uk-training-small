module nts.uk.com.view.cps009.d.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    let paths = {
        add : "ctx/pereg/person/info/setting/init/add"
    }
        /**
    * add  init value setting
    */
    export function add(data: any) {
        return ajax(paths.add, data);
    }

}
