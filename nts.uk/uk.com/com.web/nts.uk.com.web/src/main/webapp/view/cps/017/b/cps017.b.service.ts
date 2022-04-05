module nts.uk.com.view.cps017.b.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    var paths = {
        getAllOrderSetting: "ctx/pereg/person/info/setting/selection/OrderSetting/{0}",
        updateSelOrder: "ctx/pereg/person/info/setting/selection/updateSelOrder",
    }
    //get all
    export function getAllOrderSetting(histId: string) {
        let _path = format(paths.getAllOrderSetting, histId);
        return nts.uk.request.ajax("com", _path);
    }
    // update selection order
    export function updateSelOrder(command) {
        return ajax(paths.updateSelOrder, command);
    }
}
