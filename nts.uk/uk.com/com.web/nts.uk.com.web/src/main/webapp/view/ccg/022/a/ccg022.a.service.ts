module nts.uk.com.view.ccg022.a.service {

    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    var paths: any = {
        find: "ctx/sys/gateway/stopsetting/find/{0}",
        save: "ctx/sys/gateway/stopsetting/save",
    }
    export function find(state: number) {
        var path = format(paths.find, state);
        return ajax(path);
    }

    export function save(command: any) {
        return ajax(paths.save, command);
    }

}