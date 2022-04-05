module nts.uk.com.view.ccg026.component {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;

    export module service {
        var paths = {
            getListOfWorkPlaceFunctions: "auth/wplmanagementauthority/workplacefunction/getlistworkplacefunction",
            getListOfWorkPlaceauthorities: "auth/wplmanagementauthority/workplaceauthority/getallWorkplaceauthoritybyid/{0}"
        }
        /**
         * get getListOfFunctionPermission by roleId
         */
        export function getListOfDescriptionFunctionPermission(classification : number): JQueryPromise<Array<any>> {
            
            switch (classification) {
            
            case 1: // workplace
                return ajax("com", paths.getListOfWorkPlaceFunctions);
            default:
                let dfd = $.Deferred();
            
                dfd.resolve([]);
                return dfd.promise();
            }

        }
        export function getListOfAviabilityFunctionPermission(roleId : string, classification : number): JQueryPromise<Array<any>> {
            switch (classification) {
            case 1: // workplace
                return ajax("com", format(paths.getListOfWorkPlaceauthorities, roleId));
            default:
                break;
            }
            return [];
        }
        
    }
}
