module nts.uk.com.view.cmf002.c.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    import model = cmf002.share.model;

    var paths = {
        getAllCategoryItem: "exio/exo/condset/getAllCategoryItem/{0}/{1}",
        findByCode: "exio/exo/condset/findByCode/{0}/{1}",
        getOutItems: "exio/exo/outputitem/getOutItems",
        registerOutputItem: "exio/exo/outputitem/register",
        removeOutputItem: "exio/exo/outputitem/remove",
        getAtWorkClsDfs: "exio/exo/dataformatsetting/getAtWorkClsDfs/{0}/{1}",
        getCharacterDfs: "exio/exo/dataformatsetting/getCharacterDfs/{0}/{1}",
        getDateDfs: "exio/exo/dataformatsetting/getDateDfs/{0}/{1}",
        getInstantTimeDfs: "exio/exo/dataformatsetting/getInstantTimeDfs/{0}/{1}",
        getNumberDfs: "exio/exo/dataformatsetting/getNumberDfs/{0}/{1}",
        getTimeDfs: "exio/exo/dataformatsetting/getTimeDfs/{0}/{1}",
    }

    export function getAllCategoryItem(categoryId: number, itemType: number): JQueryPromise<any> {
        return ajax(format(paths.getAllCategoryItem, categoryId, itemType));
    }

    export function findByCode(conditionSettingCode: string, outputItemCode: string): JQueryPromise<any> {
        return ajax(format(paths.findByCode, conditionSettingCode, outputItemCode));
    }

    export function getOutItems(condSetCd: string): JQueryPromise<any> {
        return ajax("com", paths.getOutItems, condSetCd);
    }

    // register
    export function registerOutputItem(command): JQueryPromise<any> {
        return ajax(paths.registerOutputItem, command);
    }

    // delete
    export function removeOutputItem(command): JQueryPromise<any> {
        return ajax(paths.removeOutputItem, command);
    }

    export function getDataFormatSetting(itemType: number, conditionSettingCode: string, outputItemCode: string): JQueryPromise<any> {
        switch (itemType) {
            case model.ITEM_TYPE.NUMERIC:
                return ajax(format(paths.getNumberDfs, conditionSettingCode, outputItemCode));
            case model.ITEM_TYPE.CHARACTER:
                return ajax(format(paths.getCharacterDfs, conditionSettingCode, outputItemCode));
            case model.ITEM_TYPE.DATE:
                return ajax(format(paths.getDateDfs, conditionSettingCode, outputItemCode));
            case model.ITEM_TYPE.TIME:
                return ajax(format(paths.getTimeDfs, conditionSettingCode, outputItemCode));
            case model.ITEM_TYPE.INS_TIME:
                return ajax(format(paths.getInstantTimeDfs, conditionSettingCode, outputItemCode));
            case model.ITEM_TYPE.AT_WORK_CLS:
                return ajax(format(paths.getAtWorkClsDfs, conditionSettingCode, outputItemCode));
        }
        return null;
    }
}