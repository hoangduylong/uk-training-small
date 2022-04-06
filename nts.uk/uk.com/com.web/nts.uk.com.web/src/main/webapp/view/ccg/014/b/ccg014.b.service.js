var ccg014;
(function (ccg014) {
    var b;
    (function (b) {
        var service;
        (function (service) {
            var paths = {
                copyTitleMenu: "sys/portal/titlemenu/copy",
            };
            /** Function is used to copy Title Menu */
            function copyTitleMenu(sourceTitleMenuCD, targetTitleMenuCD, targetTitleMenuName, overwrite) {
                var data = {
                    sourceTitleMenuCD: sourceTitleMenuCD,
                    targetTitleMenuCD: targetTitleMenuCD,
                    targetTitleMenuName: targetTitleMenuName,
                    overwrite: overwrite
                };
                return nts.uk.request.ajax("com", paths.copyTitleMenu, data);
            }
            service.copyTitleMenu = copyTitleMenu;
        })(service = b.service || (b.service = {}));
    })(b = ccg014.b || (ccg014.b = {}));
})(ccg014 || (ccg014 = {}));
//# sourceMappingURL=ccg014.b.service.js.map