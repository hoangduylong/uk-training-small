var cps001;
(function (cps001) {
    var d;
    (function (d) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var format = nts.uk.text.format;
            var parentPath = "basic/organization/empfilemanagement/";
            var paths = {
                getAvaOrMap: 'find/getAvaOrMap/{0}/{1}',
                insertAva: "command/insertAvaOrMap",
                updateAva: "command/updateAvaOrMap",
                removeAva: "command/removeAvaOrMap",
                checkEmpFileMnExist: "find/checkEmpFileMnExist/{0}/{1}",
                permision: 'ctx/pereg/functions/auth/find-all'
            };
            function getFullAvatar(sid) {
                return ajax(format(parentPath + paths.getAvaOrMap, sid, 3));
            }
            service.getFullAvatar = getFullAvatar;
            function checkEmpFileMnExist(sid) {
                return ajax(format(parentPath + paths.checkEmpFileMnExist, sid, 0));
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
        })(service = d.service || (d.service = {}));
    })(d = cps001.d || (cps001.d = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.d.service.js.map