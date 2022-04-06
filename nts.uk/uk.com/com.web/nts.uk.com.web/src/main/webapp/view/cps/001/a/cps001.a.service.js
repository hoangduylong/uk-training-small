var cps001;
(function (cps001) {
    var a;
    (function (a) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var format = nts.uk.text.format;
            var paths = {
                layout: {
                    getAll: "ctx/pereg/person/maintenance/findSimple/{0}",
                    getDetails: "ctx/pereg/person/maintenance/findLayoutData",
                    'register': 'facade/pereg/register'
                },
                category: {
                    'getCats': 'ctx/pereg/employee/category/getall/{0}',
                    'getDetails': 'ctx/pereg/layout/find/gettabdetail',
                    'getTabsInfo': 'ctx/pereg/layout/find/getctgtab/{0}',
                    'getHistData': '/ctx/pereg/employee/category/getlistinfocategory',
                    'delete': 'facade/pereg/delete',
                    'permision': 'ctx/pereg/roles/auth/category/find/{0}/{1}'
                },
                person: {
                    'getPerson': 'bs/employee/person/findByEmployeeId/{0}'
                },
                emp: {
                    getInfo: 'bs/employee/person/get-header/{0}',
                    getFile: 'basic/organization/empfilemanagement/find/getAvaOrMap/{0}/{1}',
                    permision: 'ctx/pereg/functions/auth/find-all',
                },
                licenseChecks: {
                    start: 'ctx/pereg/license/checkDipslayStart',
                    getInfo: 'ctx/pereg/license/checkLicense'
                },
                file: '/shr/infra/file/storage/infor/{0}',
                lstcardno: 'at/record/stamp/stampcard/getListCardNo'
            };
            function getPerson(id) {
                return ajax(format(paths.person.getPerson, id));
            }
            service.getPerson = getPerson;
            function getCats(id) {
                return ajax(format(paths.category.getCats, id));
            }
            service.getCats = getCats;
            ;
            function getCatChilds(id) {
                return ajax(format(paths.category.getTabsInfo, id));
            }
            service.getCatChilds = getCatChilds;
            function getCatData(query) {
                return ajax(paths.category.getDetails, query);
            }
            service.getCatData = getCatData;
            function getHistData(query) {
                return ajax(paths.category.getHistData, query);
            }
            service.getHistData = getHistData;
            function getAvatar(id) {
                return ajax(format(paths.emp.getFile, id, 0));
            }
            service.getAvatar = getAvatar;
            function getEmpInfo(id) {
                return ajax(format(paths.emp.getInfo, id));
            }
            service.getEmpInfo = getEmpInfo;
            function getCurrentEmpPermision() {
                return ajax(paths.emp.permision);
            }
            service.getCurrentEmpPermision = getCurrentEmpPermision;
            function getAllLayout(empId) {
                return ajax(format(paths.layout.getAll, empId));
            }
            service.getAllLayout = getAllLayout;
            ;
            function getCurrentLayout(query) {
                return ajax(paths.layout.getDetails, query);
            }
            service.getCurrentLayout = getCurrentLayout;
            function saveCurrentLayout(command) {
                return ajax(paths.layout.register, command);
            }
            service.saveCurrentLayout = saveCurrentLayout;
            function getPermision4Cat(roleId, catId) {
                return ajax(format(paths.category.permision, roleId, catId));
            }
            service.getPermision4Cat = getPermision4Cat;
            function removeCurrentCategoryData(command) {
                return ajax(paths.category.delete, command);
            }
            service.removeCurrentCategoryData = removeCurrentCategoryData;
            function getData() {
                return ajax(paths.getData);
            }
            service.getData = getData;
            function getFileInfo(id) {
                return ajax(paths.file, id);
            }
            service.getFileInfo = getFileInfo;
            function getLstCardNoByContractCd() {
                return ajax('at', paths.lstcardno);
            }
            service.getLstCardNoByContractCd = getLstCardNoByContractCd;
            function licenseCheckStart() {
                return ajax(paths.licenseChecks.start);
            }
            service.licenseCheckStart = licenseCheckStart;
            function licenseCheck() {
                return ajax(paths.licenseChecks.getInfo);
            }
            service.licenseCheck = licenseCheck;
        })(service = a.service || (a.service = {}));
    })(a = cps001.a || (cps001.a = {}));
})(cps001 || (cps001 = {}));
//# sourceMappingURL=cps001.a.service.js.map