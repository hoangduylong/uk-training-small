module nts.uk.com.view.cps001.i.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    let paths: any = {
        'getAllList': 'at/record/remainnumber/special/getall/{0}/{1}',
        'getDetail': 'at/record/remainnumber/special/get-detail/{0}',
        'save': 'at/record/remainnumber/special/save',
        'delete': 'at/record/remainnumber/special/delete'
    };

    export function getAllList(sid: string, spicialCode: number) {
        return ajax('at', format(paths.getAllList, sid, spicialCode));
    }

    export function getDetail(specialid: any) {
        return ajax('at', format(paths.getDetail, specialid));
    }

    export function saveData(command: any) {
        return ajax('at', paths.save, command);
    }

    export function remove(specialid: any) {
        let command = {"specialid": specialid};
        return ajax('at', paths.delete, command);
    }

    export function getItemDef(ctgCd: string) {
        return ajax('com', format("ctx/pereg/person/info/ctgItem/findby/ctg-cd/{0}", ctgCd));
    }
}