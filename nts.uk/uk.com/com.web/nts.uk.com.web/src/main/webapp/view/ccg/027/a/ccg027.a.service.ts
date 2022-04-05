module nts.uk.com.view.ccg027.a.service {
    var paths: any = {
        mailServer : "sys/env/mailserver/find",
    }

    export function mailServer(): JQueryPromise<any> {
        return nts.uk.request.ajax("com", paths.mailServer);
    }

}