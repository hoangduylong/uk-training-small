module ccg018.b.service {
    let paths: any = {
        findBySystemMenuCls: "sys/portal/standardmenu/findBySystemMenuCls",
        findDataForAfterLoginDis: "sys/portal/standardmenu/findDataForAfterLoginDis",
        findTopPagePersonSet: "sys/portal/toppagesetting/personset/findBySids",
        update: "sys/portal/toppagesetting/personset/save",
        copy: "sys/portal/toppagesetting/personset/copy",
        remove: "sys/portal/toppagesetting/personset/remove",
        findByCId: "sys/portal/toppagesetting/personset/findByCid",
    }

    export function findBySystemMenuCls(): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.findBySystemMenuCls);
    }

    export function findDataForAfterLoginDis(): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.findDataForAfterLoginDis);
    }

    export function findTopPagePersonSet(listSid: any): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.findTopPagePersonSet, listSid);
    }

    export function update(obj: any): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.update, obj);
    }

    export function copy(obj: any): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.copy, obj);
    }

    export function remove(obj: any): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.remove, obj);
    }
    
    export function findByCId(): JQueryPromise<any> {
      return nts.uk.request.ajax("com", paths.findByCId);
  }
}