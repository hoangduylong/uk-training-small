module nts.uk.com.view.cmf002.a {
    import ajax = nts.uk.request.ajax;
    export module service {
        var paths = {
            startMenu: "exio/exo/menu/startMenu"
        }

        export function startMenu(): JQueryPromise<any> {
            return ajax('com', paths.startMenu);
        };

    }
}