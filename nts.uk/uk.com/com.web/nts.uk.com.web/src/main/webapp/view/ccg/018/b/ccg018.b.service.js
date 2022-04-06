var ccg018;
(function (ccg018) {
    var b;
    (function (b) {
        var service;
        (function (service) {
            var paths = {
                findBySystemMenuCls: "sys/portal/standardmenu/findBySystemMenuCls",
                findDataForAfterLoginDis: "sys/portal/standardmenu/findDataForAfterLoginDis",
                findTopPagePersonSet: "sys/portal/toppagesetting/personset/findBySids",
                update: "sys/portal/toppagesetting/personset/save",
                copy: "sys/portal/toppagesetting/personset/copy",
                remove: "sys/portal/toppagesetting/personset/remove",
                findByCId: "sys/portal/toppagesetting/personset/findByCid",
            };
            function findBySystemMenuCls() {
                return nts.uk.request.ajax("com", paths.findBySystemMenuCls);
            }
            service.findBySystemMenuCls = findBySystemMenuCls;
            function findDataForAfterLoginDis() {
                return nts.uk.request.ajax("com", paths.findDataForAfterLoginDis);
            }
            service.findDataForAfterLoginDis = findDataForAfterLoginDis;
            function findTopPagePersonSet(listSid) {
                return nts.uk.request.ajax("com", paths.findTopPagePersonSet, listSid);
            }
            service.findTopPagePersonSet = findTopPagePersonSet;
            function update(obj) {
                return nts.uk.request.ajax("com", paths.update, obj);
            }
            service.update = update;
            function copy(obj) {
                return nts.uk.request.ajax("com", paths.copy, obj);
            }
            service.copy = copy;
            function remove(obj) {
                return nts.uk.request.ajax("com", paths.remove, obj);
            }
            service.remove = remove;
            function findByCId() {
                return nts.uk.request.ajax("com", paths.findByCId);
            }
            service.findByCId = findByCId;
        })(service = b.service || (b.service = {}));
    })(b = ccg018.b || (ccg018.b = {}));
})(ccg018 || (ccg018 = {}));
//# sourceMappingURL=ccg018.b.service.js.map