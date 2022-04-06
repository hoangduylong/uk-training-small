var test;
(function (test) {
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
    })(service = test.service || (test.service = {}));
})(test || (test = {}));
//# sourceMappingURL=test.service.js.map