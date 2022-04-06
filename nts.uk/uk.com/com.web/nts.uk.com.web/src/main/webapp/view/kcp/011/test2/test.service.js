var test2;
(function (test2) {
    var service;
    (function (service) {
        var paths = {
            isMultipleManagement: "",
            startUp: "",
            getShiftMaster: "ctx/at/shared/workrule/shiftmaster/getlistByWorkPlace"
        };
        function getShiftMaster(command) {
            return nts.uk.request.ajax("at", paths.getShiftMaster, command);
        }
        service.getShiftMaster = getShiftMaster;
    })(service = test2.service || (test2.service = {}));
})(test2 || (test2 = {}));
//# sourceMappingURL=test.service.js.map