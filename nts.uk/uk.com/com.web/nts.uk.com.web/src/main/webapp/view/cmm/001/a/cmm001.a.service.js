var cmm001;
(function (cmm001) {
    var a;
    (function (a) {
        var service;
        (function (service) {
            var paths = {
                getAll: "screen/com/cmm001/findAll",
                getComId: "bs/company/findComId",
                findDiv: "bs/employee/workplacedifferinfor/findDiv",
                findSys: "sys/env/usatr/findSys",
                findPost: "contact/postalcode/findAll",
                findPostId: "contact/postalcode/find",
                findPostCd: "contact/postalcode/findByCode",
                update: "screen/com/cmm001/update",
                add: "screen/com/cmm001/add",
                getAllMasterCopyCategory: "sys/assist/mastercopy/category/getAllMasterCopyCategory",
            };
            function getAll() {
                return nts.uk.request.ajax(paths.getAll);
            }
            service.getAll = getAll;
            function getDiv(param) {
                return nts.uk.request.ajax(paths.findDiv, param);
            }
            service.getDiv = getDiv;
            function getSys(vari) {
                return nts.uk.request.ajax(paths.findSys, vari);
            }
            service.getSys = getSys;
            function findPost() {
                return nts.uk.request.ajax(paths.findPost);
            }
            service.findPost = findPost;
            function findComId(id) {
                return nts.uk.request.ajax("com", paths.getComId + "/" + id);
            }
            service.findComId = findComId;
            function findPostId(vari) {
                return nts.uk.request.ajax("com", paths.findPostId + "/" + vari);
            }
            service.findPostId = findPostId;
            function findPostCd(vari) {
                return nts.uk.request.ajax("com", paths.findPostCd + "/" + vari);
            }
            service.findPostCd = findPostCd;
            function update(command) {
                return nts.uk.request.ajax(paths.update, command);
            }
            service.update = update;
            function add(command) {
                return nts.uk.request.ajax(paths.add, command);
            }
            service.add = add;
            function getAllMasterCopyCategory() {
                return nts.uk.request.ajax(paths.getAllMasterCopyCategory);
            }
            service.getAllMasterCopyCategory = getAllMasterCopyCategory;
            //saveAsExcel
            function saveAsExcel(languageId) {
                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                var domainType = "CMM001";
                if (program.length > 1) {
                    program.shift();
                    domainType = domainType + program.join(" ");
                }
                return nts.uk.request.exportFile('/masterlist/report/print', {
                    domainId: "Company",
                    domainType: domainType, languageId: languageId, reportType: 0
                });
            }
            service.saveAsExcel = saveAsExcel;
        })(service = a.service || (a.service = {}));
    })(a = cmm001.a || (cmm001.a = {}));
})(cmm001 || (cmm001 = {}));
//# sourceMappingURL=cmm001.a.service.js.map