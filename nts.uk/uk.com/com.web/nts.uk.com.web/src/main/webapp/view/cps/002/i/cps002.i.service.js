var cps002;
(function (cps002) {
    var i;
    (function (i) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var path = "ctx/bs/person/info/setting/user/update/updateUserSetting";
            function setUserSetting(command) {
                return ajax("com", path, command);
            }
            service.setUserSetting = setUserSetting;
        })(service = i.service || (i.service = {}));
    })(i = cps002.i || (cps002.i = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.i.service.js.map