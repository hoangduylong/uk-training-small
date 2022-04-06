var cas009;
(function (cas009) {
    var b;
    (function (b) {
        var service;
        (function (service) {
            var paths = {
                getPerMissingMenu: "ctx/sys/auth/role/per/setting/menu",
            };
            /** Get PermissionSettingMenu */
            function getPerMissingMenu() {
                return nts.uk.request.ajax("com", paths.getPerMissingMenu + '/8');
            }
            service.getPerMissingMenu = getPerMissingMenu;
        })(service = b.service || (b.service = {}));
    })(b = cas009.b || (cas009.b = {}));
})(cas009 || (cas009 = {}));
//# sourceMappingURL=cas009.b.service.js.map