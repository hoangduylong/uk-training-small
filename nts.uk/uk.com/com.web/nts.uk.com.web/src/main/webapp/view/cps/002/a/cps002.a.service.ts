module cps002.a.service {

    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    import block = nts.uk.ui.block;

    let paths: any = {
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

    export function getLayout() {
        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.invisible());
        
        ajax(paths.getLayout)
            .done(function(res) {
                dfd.resolve(res);
            }).fail(function(res) {
                dfd.reject(res);
            }).always(() => {
                _.defer(() => block.clear());
            });
        return dfd.promise();
    }

    export function getUserSetting() {

        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.invisible());
        nts.uk.request.ajax(paths.getUserSetting)
            .done(function(res) {
                dfd.resolve(res);
            }).fail(function(res) {
                dfd.reject(res);
            }).always(() => {
                _.defer(() => block.clear());
            });
        return dfd.promise();
    }

    export function getLastRegHistory() {

        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.invisible());
        nts.uk.request.ajax(paths.getLastRegHistory)
            .done(function(res) {
                dfd.resolve(res);
            }).fail(function(res) {
                dfd.reject(res);
            }).always(() => {
                _.defer(() => block.clear());
            });
        return dfd.promise();

    }

    export function getEmployeeCode(employeeLetter) {
        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.invisible());
        nts.uk.request.ajax("com", paths.getEmployeeCode, employeeLetter)
            .done(function(res) {
                dfd.resolve(res);
            }).fail(function(res) {
                dfd.reject(res);
            }).always(() => {
                _.defer(() => block.clear());
            });
        return dfd.promise();
    }
    
    export function getInitEmployeeCode() {
        _.defer(() => block.invisible());
        return nts.uk.request.ajax("com", paths.getInitEmployeeCode);
    }

    export function getInitCardNumber(newEmployeeCode) {

        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.invisible());
        nts.uk.request.ajax("com", paths.getCardNumber, newEmployeeCode).done(function(res) {
            dfd.resolve(res);
        }).fail(function(res) {
            dfd.reject(res);
        }).always(() => {
            _.defer(() => block.clear());
        });
        return dfd.promise();
    }
    
    export function getStamCardEdit() {
        return nts.uk.request.ajax("at", paths.getStamCardEditing);
    }

    export function getEmployeeCodeAndComId(employeeLetter) {

        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.invisible());
        nts.uk.request.ajax("com", paths.getCardNumber, employeeLetter)
            .done(function(res) {
                dfd.resolve(res);
            }).fail(function(res) {
                dfd.reject(res);
            }).always(() => {
                _.defer(() => block.clear());
            });
        return dfd.promise();
    }

    export function validateEmpInfo(command) {

        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.invisible());
        nts.uk.request.ajax("com", paths.validateEmpInfo, command)
            .done(function(res) {
                dfd.resolve(res);
            }).fail(function(res) {
                dfd.reject(res);
            }).always(() => {
                _.defer(() => block.clear());
            });
        return dfd.promise();

    }

    export function getCopySetting() {

        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.invisible());
        nts.uk.request.ajax(paths.getCopySetting)
            .done(function(res) {
                dfd.resolve(res);
            }).fail(function(res) {
                dfd.reject(res);
            }).always(() => {
                _.defer(() => block.clear());
            });
        return dfd.promise();
    }

    export function getAllCopySettingItem(employeeId, categoryCd, baseDate) {
        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.invisible());
        let query = {
            "categoryCd": categoryCd,
            "selectedEmployeeId": employeeId,
            "baseDate": baseDate
        };
        nts.uk.request.ajax(paths.getAllCopySettingItem, query)
            .done(function(res) {
                dfd.resolve(res);
            }).fail(function(res) {
                dfd.reject(res);
            }).always(() => {
                _.defer(() => block.clear());
            });
        return dfd.promise();
    }

    export function getAllInitValueSetting() {
        return ajax(paths.getAllInitValueSetting);
    }

    export function getAllInitValueCtgSetting(settingId: string) {
        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.invisible());
        nts.uk.request.ajax(format(paths.getAllInitValueCtgSetting, settingId))
            .done(function(res) {
                dfd.resolve(res);
            }).fail(function(res) {
                dfd.reject(res);
            }).always(() => {
                _.defer(() => block.clear());
            });
        return dfd.promise();

    }

    export function getAllInitValueItemSetting(command) {
        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.invisible());
        nts.uk.request.ajax(paths.getAllInitValueItemSetting, command)
            .done(function(res) {
                dfd.resolve(res);
            }).fail(function(res) {
                dfd.reject(res);
            }).always(() => {
                _.defer(() => block.clear());
            });
        return dfd.promise();
    }

    export function getLayoutByCreateType(command) {
        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.invisible());
        nts.uk.request.ajax(paths.getLayoutByCreateType, command)
            .done(function(res) {
                dfd.resolve(res);
            }).fail(function(res) {
                dfd.reject(res);
            }).always(() => {
                _.defer(() => block.clear());
            });
        return dfd.promise();
    }

    export function addNewEmployee(command) {
        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.grayout());
        nts.uk.request.ajax(paths.addNewEmployee, command)
            .done(function(res) {
                dfd.resolve(res);
            }).fail(function(res) {
                dfd.reject(res);
            }).always(() => {
                _.defer(() => block.clear());
            });
        return dfd.promise();
    }
    export function getEmployeeInfo(command) {
        let dfd = $.Deferred<any>();
        let self = this;
        _.defer(() => block.invisible());
        nts.uk.request.ajax("com", paths.getEmployeeInfo, command)
            .done(function(res) {
                dfd.resolve(res);
            }).fail(function(res) {
                dfd.reject(res);
            }).always(() => {
                _.defer(() => block.clear());
            });
        return dfd.promise();
    }

    export function getCurrentEmpPermision() {
        return ajax(paths.permision);
    }
    
     export function licenseCheck() {
        return ajax(paths.licenseChecks);
    }
}

