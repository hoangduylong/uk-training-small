module nts.uk.com.view.cps009.b.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    let paths = {
        getAllItemByCtgId: "ctx/pereg/person/info/setting/init/item/findRequired/{0}/{1}"
    }
    /**
   * Get all init value setting
   */
    export function getAllItemByCtgId(settingId: string, perInfoCtgId: string) {
        return ajax(format(paths.getAllItemByCtgId, settingId, perInfoCtgId));
    }
}
