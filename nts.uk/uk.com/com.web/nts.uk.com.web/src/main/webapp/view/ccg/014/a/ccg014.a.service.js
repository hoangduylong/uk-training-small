var ccg014;
(function (ccg014) {
    var a;
    (function (a) {
        var service;
        (function (service) {
            var paths = {
                getAllTitleMenu: "sys/portal/titlemenu/findall",
                createTitleMenu: "sys/portal/titlemenu/create",
                deleteTitleMenu: "sys/portal/titlemenu/delete",
                updateTitleMenu: "sys/portal/titlemenu/update",
            };
            /** Get TitleMenu */
            function getAllTitleMenu() {
                return nts.uk.request.ajax("com", paths.getAllTitleMenu);
            }
            service.getAllTitleMenu = getAllTitleMenu;
            /** Function is used to delete Title Menu */
            function deleteTitleMenu(titleMenuCD) {
                return nts.uk.request.ajax("com", paths.deleteTitleMenu, titleMenuCD);
            }
            service.deleteTitleMenu = deleteTitleMenu;
            /** Create Title Menu */
            function createTitleMenu(titleMenu) {
                return nts.uk.request.ajax("com", paths.createTitleMenu, titleMenu);
            }
            service.createTitleMenu = createTitleMenu;
            /** Update Title Menu */
            function updateTitleMenu(titleMenu) {
                return nts.uk.request.ajax("com", paths.updateTitleMenu, titleMenu);
            }
            service.updateTitleMenu = updateTitleMenu;
        })(service = a.service || (a.service = {}));
    })(a = ccg014.a || (ccg014.a = {}));
})(ccg014 || (ccg014 = {}));
//# sourceMappingURL=ccg014.a.service.js.map