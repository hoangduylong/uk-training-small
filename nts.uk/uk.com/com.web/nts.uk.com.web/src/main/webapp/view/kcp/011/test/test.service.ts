module test.service {
    var paths: any = {
        isMultipleManagement: "",
        startUp: "",
        getShiftMaster: "ctx/at/shared/workrule/shiftmaster/getlistByWorkPlace"
    }

    export function getShiftMaster(command): JQueryPromise<any> {
        return nts.uk.request.ajax( "at", paths.getShiftMaster, command);
    }

}