__viewContext.ready(function () {
    nts.uk.request.login.keepUsedLoginPage("com", "/view/ccg/007/d/index.xhtml");
    var paramSPR = JSON.parse(window.sessionStorage.getItem("paramSPR"));
    window.sessionStorage.removeItem("paramSPR");
    if (!nts.uk.util.isNullOrUndefined(paramSPR.errMsg) && !nts.uk.util.isNullOrEmpty(paramSPR.errMsg)) {
        nts.uk.ui.dialog.alertError({ message: _.escape(paramSPR.errMsg) }).then(function () {
            nts.uk.request.jump("com", "/view/ccg/007/d/index.xhtml");
        });
    }
    else if (!nts.uk.util.isNullOrUndefined(paramSPR.successMsg) && !nts.uk.util.isNullOrEmpty(paramSPR.successMsg)) {
        nts.uk.ui.dialog.info({ messageId: paramSPR.successMsg }).then(function () {
            routeData(paramSPR);
        });
    }
    else {
        routeData(paramSPR);
    }
});
function routeData(paramSPR) {
    var menuCD = parseInt(paramSPR.menu);
    var loginemployeeCD = paramSPR.loginemployeeCode;
    var employeeCode = paramSPR.employeeCode;
    var starttime = parseInt(paramSPR.starttime);
    var endtime = parseInt(paramSPR.endtime);
    var date = paramSPR.date;
    var selecttype = parseInt(paramSPR.selecttype);
    var applicationID = paramSPR.applicationID;
    var reason = paramSPR.reason;
    var stampProtection = parseInt(paramSPR.stampProtection);
    var userID = paramSPR.userID;
    var contractCD = paramSPR.contractCD;
    var companyID = paramSPR.companyID;
    var companyCD = paramSPR.companyCD;
    var personID = paramSPR.personID;
    var loginEmployeeID = paramSPR.loginEmployeeID;
    var roleID = paramSPR.roleID;
    var employeeID = nts.uk.util.isNullOrEmpty(paramSPR.employeeID) ? null : paramSPR.employeeID;
    switch (menuCD) {
        case 1:
            nts.uk.request.jump("at", "/view/kaf/005/a/index.xhtml?a=0", {
                uiType: 2,
                appDate: date,
                startTime: starttime,
                endTime: endtime,
                applicationReason: reason,
                employeeID: nts.uk.util.isNullOrEmpty(employeeID) ? null : employeeID
            });
            break;
        case 2:
            nts.uk.request.jump("at", "/view/kaf/005/a/index.xhtml?a=1", {
                uiType: 2,
                appDate: date,
                startTime: starttime,
                endTime: endtime,
                applicationReason: reason,
                employeeID: nts.uk.util.isNullOrEmpty(employeeID) ? null : employeeID
            });
            break;
        case 3:
            var initParam = {
                //???????????????
                screenMode: 0,
                //????????????
                lstEmployee: nts.uk.util.isNullOrEmpty(employeeID) ? [] : [employeeID],
                //??????????????????????????????
                errorRefStartAtr: true,
                //?????????????????????
                changePeriodAtr: true,
                //????????????
                targetClosue: null,
                //Optional
                //???????????????
                initClock: {
                    dateSpr: date,
                    canEdit: stampProtection == 0 ? false : true,
                    employeeId: nts.uk.util.isNullOrEmpty(employeeID) ? null : employeeID,
                    liveTime: endtime,
                    goOut: starttime, //????????????
                },
                //??????????????????
                transitionDesScreen: null,
            };
            var extractionParam = {
                //????????????
                displayFormat: 0,
                //??????
                startDate: date,
                endDate: date,
                //????????????????????????
                lstExtractedEmployee: nts.uk.util.isNullOrEmpty(employeeID) ? [] : [employeeID],
                //Optional
                //??????????????????
                dateTarget: date,
                individualTarget: nts.uk.util.isNullOrEmpty(employeeID) ? null : employeeID,
            };
            nts.uk.request.jump("at", "/view/kdw/003/a/index.xhtml", { initParam: initParam, extractionParam: extractionParam });
            break;
        case 4:
            nts.uk.localStorage.setItem('UKProgramParam', 'a=1');
            nts.uk.request.jump("at", "/view/cmm/045/a/index.xhtml", { 'PARAM_SPR_CMM045': {
                    mode: 1,
                    startDate: date,
                    endDate: date,
                    extractCondition: selecttype,
                    agreementTime36: 0, //????????????????????????1???????????????
                }
            });
            break;
        case 5:
            var initParam = {
                //???????????????
                screenMode: 1,
                //????????????
                lstEmployee: nts.uk.util.isNullOrEmpty(employeeID) ? [] : [employeeID],
                //??????????????????????????????
                errorRefStartAtr: true,
                //?????????????????????
                changePeriodAtr: true,
                //????????????
                targetClosue: null,
                //Optional
                //???????????????
                initClock: {
                    dateSpr: date,
                    canEdit: stampProtection == 0 ? false : true,
                    employeeId: nts.uk.util.isNullOrEmpty(employeeID) ? null : employeeID,
                    liveTime: endtime,
                    goOut: starttime, //????????????
                },
                //??????????????????
                transitionDesScreen: null,
            };
            var extractionParam = {
                //????????????
                displayFormat: 1,
                //??????
                startDate: date,
                endDate: date,
                //????????????????????????
                lstExtractedEmployee: nts.uk.util.isNullOrEmpty(employeeID) ? [] : [employeeID],
                //Optional
                //??????????????????
                dateTarget: date,
                individualTarget: nts.uk.util.isNullOrEmpty(employeeID) ? null : employeeID,
            };
            nts.uk.request.jump("at", "/view/kdw/003/a/index.xhtml", { initParam: initParam, extractionParam: extractionParam });
            break;
        case 6:
            nts.uk.request.jump("at", "/view/kaf/000/b/index.xhtml", { 'listAppMeta': [applicationID], 'currentApp': applicationID });
            break;
        default:
            nts.uk.request.jump("com", "/view/ccg/008/a/index.xhtml");
    }
}
//# sourceMappingURL=sprmain.js.map