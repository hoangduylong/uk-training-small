var cps002;
(function (cps002) {
    var e;
    (function (e) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var basePath = "ctx/pereg/";
            var paths = {
                getEmlCode: "employee/mngdata/getGenerateEmplCode",
                getCardNo: "employee/mngdata/getGenerateCardNo"
            };
            function getEmlCode(startLetters) {
                return ajax("com", basePath + paths.getEmlCode, startLetters);
            }
            service.getEmlCode = getEmlCode;
            function getCardNo(startLetters) {
                return ajax("com", basePath + paths.getCardNo, startLetters);
            }
            service.getCardNo = getCardNo;
        })(service = e.service || (e.service = {}));
    })(e = cps002.e || (cps002.e = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.e.service.js.map