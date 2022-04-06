var cps002;
(function (cps002) {
    var j;
    (function (j) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var basePath = "ctx/pereg/";
            var paths = {
                getEmlCode: "employee/mngdata/getGenerateEmplCode",
                getCardNo: "employee/mngdata/getGenerateCardNo",
                getStamCardEditing: "record/stamp/stampcardedit/find"
            };
            function getEmlCode(startLetters) {
                return ajax("com", basePath + paths.getEmlCode, startLetters);
            }
            service.getEmlCode = getEmlCode;
            function getCardNo(startLetters) {
                return ajax("com", basePath + paths.getCardNo, startLetters);
            }
            service.getCardNo = getCardNo;
            function getStamCardEdit() {
                return nts.uk.request.ajax("at", paths.getStamCardEditing);
            }
            service.getStamCardEdit = getStamCardEdit;
        })(service = j.service || (j.service = {}));
    })(j = cps002.j || (cps002.j = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.j.service.js.map