var cps002;
(function (cps002) {
    var g;
    (function (g) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var paths = {
                getUserSetting: 'ctx/pereg/usersetting/getUserSetting',
                setUserSetting: 'ctx/pereg/usersetting/update/updateUserSetting',
                getStamCardEditing: 'record/stamp/stampcardedit/find'
            };
            function setUserSetting(command) {
                return ajax("com", paths.setUserSetting, command);
            }
            service.setUserSetting = setUserSetting;
            function getUserSetting() {
                return ajax(paths.getUserSetting);
            }
            service.getUserSetting = getUserSetting;
            function getStamCardEdit() {
                return ajax("at", paths.getStamCardEditing);
            }
            service.getStamCardEdit = getStamCardEdit;
        })(service = g.service || (g.service = {}));
    })(g = cps002.g || (cps002.g = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.g.service.js.map