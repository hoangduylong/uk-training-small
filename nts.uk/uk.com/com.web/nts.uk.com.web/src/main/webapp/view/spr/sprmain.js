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
                //画面モード
                screenMode: 0,
                //社員一覧
                lstEmployee: nts.uk.util.isNullOrEmpty(employeeID) ? [] : [employeeID],
                //エラー参照を起動する
                errorRefStartAtr: true,
                //期間を変更する
                changePeriodAtr: true,
                //処理締め
                targetClosue: null,
                //Optional
                //打刻初期値
                initClock: {
                    dateSpr: date,
                    canEdit: stampProtection == 0 ? false : true,
                    employeeId: nts.uk.util.isNullOrEmpty(employeeID) ? null : employeeID,
                    liveTime: endtime,
                    goOut: starttime, //出勤打刻
                },
                //遷移先の画面
                transitionDesScreen: null,
            };
            var extractionParam = {
                //表示形式
                displayFormat: 0,
                //期間
                startDate: date,
                endDate: date,
                //抽出した社員一覧
                lstExtractedEmployee: nts.uk.util.isNullOrEmpty(employeeID) ? [] : [employeeID],
                //Optional
                //日付別で起動
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
                    agreementTime36: 0, //０＝表示しない、1＝表示する
                }
            });
            break;
        case 5:
            var initParam = {
                //画面モード
                screenMode: 1,
                //社員一覧
                lstEmployee: nts.uk.util.isNullOrEmpty(employeeID) ? [] : [employeeID],
                //エラー参照を起動する
                errorRefStartAtr: true,
                //期間を変更する
                changePeriodAtr: true,
                //処理締め
                targetClosue: null,
                //Optional
                //打刻初期値
                initClock: {
                    dateSpr: date,
                    canEdit: stampProtection == 0 ? false : true,
                    employeeId: nts.uk.util.isNullOrEmpty(employeeID) ? null : employeeID,
                    liveTime: endtime,
                    goOut: starttime, //出勤打刻
                },
                //遷移先の画面
                transitionDesScreen: null,
            };
            var extractionParam = {
                //表示形式
                displayFormat: 1,
                //期間
                startDate: date,
                endDate: date,
                //抽出した社員一覧
                lstExtractedEmployee: nts.uk.util.isNullOrEmpty(employeeID) ? [] : [employeeID],
                //Optional
                //日付別で起動
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