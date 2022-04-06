var cps002;
(function (cps002) {
    var a;
    (function (a) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var format = nts.uk.text.format;
            var block = nts.uk.ui.block;
            var paths = {
                getInitEmployeeCode: 'ctx/pereg/employee/mngdata/getInitEmplCode',
                getEmployeeCode: 'ctx/pereg/employee/mngdata/getGenerateEmplCode',
                getCardNumber: 'ctx/pereg/employee/mngdata/getInitCardNo',
                getStamCardEditing: 'record/stamp/stampcardedit/find',
                getLayout: 'ctx/pereg/person/newlayout/check-new-layout',
                getAllInitValueSetting: 'ctx/pereg/person/info/setting/init/findAllHasChild',
                getUserSetting: 'ctx/pereg/usersetting/getUserSetting',
                getLastRegHistory: 'ctx/pereg/empreghistory/getLastRegHistory',
                validateEmpInfo: 'ctx/pereg/addemployee/validateEmpInfo',
                getCopySetting: 'ctx/pereg/copysetting/setting/getCopySetting',
                getAllCopySettingItem: 'ctx/pereg/copysetting/item/getAll',
                getAllInitValueCtgSetting: 'ctx/pereg/initsetting/category/findAllBySetId/{0}',
                getAllInitValueItemSetting: 'ctx/pereg/initsetting/item/findInit',
                getLayoutByCreateType: 'ctx/pereg/layout/getByCreateType',
                addNewEmployee: 'ctx/pereg/addemployee/addNewEmployee',
                getEmployeeInfo: 'basic/organization/employee/getoffselect',
                permision: 'ctx/pereg/functions/auth/find-all',
                licenseChecks: 'ctx/pereg/license/checkLicenseCPS002'
            };
            function getLayout() {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.invisible(); });
                ajax(paths.getLayout)
                    .done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.getLayout = getLayout;
            function getUserSetting() {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.invisible(); });
                nts.uk.request.ajax(paths.getUserSetting)
                    .done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.getUserSetting = getUserSetting;
            function getLastRegHistory() {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.invisible(); });
                nts.uk.request.ajax(paths.getLastRegHistory)
                    .done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.getLastRegHistory = getLastRegHistory;
            function getEmployeeCode(employeeLetter) {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.invisible(); });
                nts.uk.request.ajax("com", paths.getEmployeeCode, employeeLetter)
                    .done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.getEmployeeCode = getEmployeeCode;
            function getInitEmployeeCode() {
                _.defer(function () { return block.invisible(); });
                return nts.uk.request.ajax("com", paths.getInitEmployeeCode);
            }
            service.getInitEmployeeCode = getInitEmployeeCode;
            function getInitCardNumber(newEmployeeCode) {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.invisible(); });
                nts.uk.request.ajax("com", paths.getCardNumber, newEmployeeCode).done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.getInitCardNumber = getInitCardNumber;
            function getStamCardEdit() {
                return nts.uk.request.ajax("at", paths.getStamCardEditing);
            }
            service.getStamCardEdit = getStamCardEdit;
            function getEmployeeCodeAndComId(employeeLetter) {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.invisible(); });
                nts.uk.request.ajax("com", paths.getCardNumber, employeeLetter)
                    .done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.getEmployeeCodeAndComId = getEmployeeCodeAndComId;
            function validateEmpInfo(command) {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.invisible(); });
                nts.uk.request.ajax("com", paths.validateEmpInfo, command)
                    .done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.validateEmpInfo = validateEmpInfo;
            function getCopySetting() {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.invisible(); });
                nts.uk.request.ajax(paths.getCopySetting)
                    .done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.getCopySetting = getCopySetting;
            function getAllCopySettingItem(employeeId, categoryCd, baseDate) {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.invisible(); });
                var query = {
                    "categoryCd": categoryCd,
                    "selectedEmployeeId": employeeId,
                    "baseDate": baseDate
                };
                nts.uk.request.ajax(paths.getAllCopySettingItem, query)
                    .done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.getAllCopySettingItem = getAllCopySettingItem;
            function getAllInitValueSetting() {
                return ajax(paths.getAllInitValueSetting);
            }
            service.getAllInitValueSetting = getAllInitValueSetting;
            function getAllInitValueCtgSetting(settingId) {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.invisible(); });
                nts.uk.request.ajax(format(paths.getAllInitValueCtgSetting, settingId))
                    .done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.getAllInitValueCtgSetting = getAllInitValueCtgSetting;
            function getAllInitValueItemSetting(command) {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.invisible(); });
                nts.uk.request.ajax(paths.getAllInitValueItemSetting, command)
                    .done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.getAllInitValueItemSetting = getAllInitValueItemSetting;
            function getLayoutByCreateType(command) {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.invisible(); });
                nts.uk.request.ajax(paths.getLayoutByCreateType, command)
                    .done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.getLayoutByCreateType = getLayoutByCreateType;
            function addNewEmployee(command) {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.grayout(); });
                nts.uk.request.ajax(paths.addNewEmployee, command)
                    .done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.addNewEmployee = addNewEmployee;
            function getEmployeeInfo(command) {
                var dfd = $.Deferred();
                var self = this;
                _.defer(function () { return block.invisible(); });
                nts.uk.request.ajax("com", paths.getEmployeeInfo, command)
                    .done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    dfd.reject(res);
                }).always(function () {
                    _.defer(function () { return block.clear(); });
                });
                return dfd.promise();
            }
            service.getEmployeeInfo = getEmployeeInfo;
            function getCurrentEmpPermision() {
                return ajax(paths.permision);
            }
            service.getCurrentEmpPermision = getCurrentEmpPermision;
            function licenseCheck() {
                return ajax(paths.licenseChecks);
            }
            service.licenseCheck = licenseCheck;
        })(service = a.service || (a.service = {}));
    })(a = cps002.a || (cps002.a = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.a.service.js.map