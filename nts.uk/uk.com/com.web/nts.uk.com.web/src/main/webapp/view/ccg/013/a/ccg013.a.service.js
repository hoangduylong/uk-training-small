var ccg013;
(function (ccg013) {
    var a;
    (function (a) {
        var service;
        (function (service) {
            // Service paths.
            var servicePath = {
                find: "sys/portal/webmenu/find/{0}",
                findAllWebMenu: "sys/portal/webmenu/find",
                addWebMenu: "sys/portal/webmenu/add",
                updateWebMenu: "sys/portal/webmenu/update",
                findStandardMenuList: "sys/portal/standardmenu/findAll",
                deleteWebMenu: "sys/portal/webmenu/remove"
            };
            function findWebMenu(webMenuCode) {
                var path = nts.uk.text.format(servicePath.find, webMenuCode);
                return nts.uk.request.ajax(path);
            }
            service.findWebMenu = findWebMenu;
            function loadWebMenu() {
                var path = servicePath.findAllWebMenu;
                return nts.uk.request.ajax(path);
            }
            service.loadWebMenu = loadWebMenu;
            function addWebMenu(isCreated, webMenu) {
                var path = isCreated ? servicePath.addWebMenu : servicePath.updateWebMenu;
                return nts.uk.request.ajax("com", path, webMenu);
            }
            service.addWebMenu = addWebMenu;
            function deleteWebMenu(webMenuCd) {
                var path = servicePath.deleteWebMenu;
                var obj = {
                    webMenuCd: webMenuCd
                };
                return nts.uk.request.ajax("com", path, obj);
            }
            service.deleteWebMenu = deleteWebMenu;
            function findStandardMenuList() {
                return nts.uk.request.ajax(servicePath.findStandardMenuList);
            }
            service.findStandardMenuList = findStandardMenuList;
            /**
            * saveAsExcel
            **/
            function saveAsExcel(languageId) {
                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                var domainType = "CCG013";
                if (program.length > 1) {
                    program.shift();
                    domainType = domainType + program.join(" ");
                }
                return nts.uk.request.exportFile('/masterlist/report/print', { domainId: "MenuSetting", domainType: domainType, languageId: 'ja', reportType: 0 });
            }
            service.saveAsExcel = saveAsExcel;
        })(service = a.service || (a.service = {}));
    })(a = ccg013.a || (ccg013.a = {}));
})(ccg013 || (ccg013 = {}));
//# sourceMappingURL=ccg013.a.service.js.map