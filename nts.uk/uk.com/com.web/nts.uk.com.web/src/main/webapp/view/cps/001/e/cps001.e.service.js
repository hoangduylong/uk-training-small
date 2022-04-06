var cps001;
(function (cps001) {
    var e;
    (function (e) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var format = nts.uk.text.format;
            var parentPath = "basic/organization/empfilemanagement/";
            var paths = {
                getMap: 'find/getAvaOrMap/{0}/{1}',
                insertAva: "command/insertAvaOrMap",
                updateAva: "command/updateAvaOrMap",
                removeAva: "command/removeAvaOrMap",
                checkEmpFileMnExist: "find/checkEmpFileMnExist/{0}/{1}",
                permision: 'ctx/pereg/functions/auth/find-all'
            };
            function getMap(sid) {
                return ajax(format(parentPath + paths.getMap, sid, 1));
            }
            service.getMap = getMap;
            function checkEmpFileMnExist(sid) {
                return ajax(format(parentPath + paths.checkEmpFileMnExist, sid, 1));
            }
            service.checkEmpFileMnExist = checkEmpFileMnExist;
            function insertAvaOrMap(command) {
                return ajax(parentPath + paths.insertAva, command);
            }
            service.insertAvaOrMap = insertAvaOrMap;
            function updateAvaOrMap(command) {
                return ajax(parentPath + paths.updateAva, command);
            }
            service.updateAvaOrMap = updateAvaOrMap;
            function removeAvaOrMap(command) {
                return ajax(parentPath + paths.removeAva, command);
            }
            service.removeAvaOrMap = removeAvaOrMap;
            function getCurrentEmpPermision() {
                return ajax(paths.permision);
            }
            service.getCurrentEmpPermision = getCurrentEmpPermision;
        })(service = e.service || (e.service = {}));
    })(e = cps001.e || (cps001.e = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.e.service.js.map