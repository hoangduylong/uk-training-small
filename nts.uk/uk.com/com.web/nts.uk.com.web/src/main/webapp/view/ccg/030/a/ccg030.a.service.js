var ccg030;
(function (ccg030) {
    var a;
    (function (a) {
        var service;
        (function (service) {
            var paths = {
                createFlowMenu: "sys/portal/flowmenu/create",
                fillAllFlowMenu: "sys/portal/flowmenu/findall",
                updateFlowMenu: "sys/portal/flowmenu/update",
                deleteFlowMenu: "sys/portal/flowmenu/delete",
                getFlowMenuById: "sys/portal/flowmenu/findbycode",
            };
            //add new flow menu
            function createFlowMenu(flowMenu) {
                return nts.uk.request.ajax("com", paths.createFlowMenu, flowMenu);
            }
            service.createFlowMenu = createFlowMenu;
            //fill all flow menu by companyId
            function fillAllFlowMenu() {
                return nts.uk.request.ajax("com", paths.fillAllFlowMenu);
            }
            service.fillAllFlowMenu = fillAllFlowMenu;
            //update flowmenu
            function updateFlowMenu(flowMenu) {
                return nts.uk.request.ajax("com", paths.updateFlowMenu, flowMenu);
            }
            service.updateFlowMenu = updateFlowMenu;
            //fill by toppage part id
            function getFlowMenuById(flowMenuID) {
                return nts.uk.request.ajax("com", paths.getFlowMenuById, flowMenuID);
            }
            service.getFlowMenuById = getFlowMenuById;
            //delete flow menu
            function deleteFlowMenu(flowMenuID) {
                var data = {
                    toppagePartID: flowMenuID
                };
                return nts.uk.request.ajax("com", paths.deleteFlowMenu, data);
            }
            service.deleteFlowMenu = deleteFlowMenu;
        })(service = a.service || (a.service = {}));
    })(a = ccg030.a || (ccg030.a = {}));
})(ccg030 || (ccg030 = {}));
//# sourceMappingURL=ccg030.a.service.js.map