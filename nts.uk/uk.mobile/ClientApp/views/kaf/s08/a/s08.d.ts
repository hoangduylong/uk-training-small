declare module 's08/model' {
    interface AppCommentSet {
        "comment": string;
        "bold": boolean;
        "colorCode": string;
    }

    interface Setting {
        cid: string;
        "appCommentSet": AppCommentSet;
    }

    interface AppDispInfoStartup {
        "appDispInfoNoDateOutput": {
            "mailServerSet": true,
            "advanceAppAcceptanceLimit": 1,
            "employeeInfoLst": [
                {
                    "sid": "0117dcfc-200b-46e8-a734-d87f1d563b82",
                    "scd": "000001",
                    "bussinessName": "0110の社員1"
                }
            ],
            "applicationSetting": {
                "companyID": "000000000000-0110",
                "appLimitSetting": {
                    "canAppAchievementMonthConfirm": false,
                    "canAppAchievementLock": false,
                    "canAppFinishWork": false,
                    "requiredAppReason": true,
                    "standardReasonRequired": true,
                    "canAppAchievementConfirm": false
                },
                "appTypeSetting": [
                    {
                        "appType": 3,
                        "sendMailWhenRegister": false,
                        "sendMailWhenApproval": false,
                        "displayInitialSegment": 2,
                        "canClassificationChange": true
                    }
                ],
                "appSetForProxyApp": [
                    {
                        "appType": 0,
                        "overtimeAppAtr": 1,
                        "stampRequestMode": null
                    }
                ],
                "appDeadlineSetLst": [
                    {
                        "useAtr": 1,
                        "closureId": 1,
                        "deadline": 10,
                        "deadlineCriteria": 1
                    }
                ],
                "appDisplaySetting": {
                    "prePostDisplayAtr": 1,
                    "manualSendMailAtr": 0
                },
                "receptionRestrictionSetting": [
                    {
                        "otAppBeforeAccepRestric": null,
                        "afterhandRestriction": {
                            "allowFutureDay": true
                        },
                        "beforehandRestriction": {
                            "dateBeforehandRestrictions": 1,
                            "toUse": true
                        },
                        "appType": 3
                    }
                ],
                "recordDate": 0
            },
            "appReasonStandardLst": [],
            "displayAppReason": 1,
            "displayStandardReason": 1,
            "reasonTypeItemLst": [
                {
                    "appStandardReasonCD": 1,
                    "displayOrder": 0,
                    "defaultValue": false,
                    "reasonForFixedForm": "定型理由KAF008"
                }
            ],
            "managementMultipleWorkCycles": true,
            "opAdvanceReceptionHours": null,
            "opAdvanceReceptionDate": "2020/09/22",
            "opEmployeeInfo": {
                "sid": "0117dcfc-200b-46e8-a734-d87f1d563b82",
                "scd": "000001",
                "bussinessName": "0110の社員1"
            }

        }
    }

    interface Holiday {
        "companyId": "000000000000-0110",
        "workTypeCode": "010",
        "name": "土曜休日",
        "abbreviationName": "土曜休",
        "symbolicName": "土",
        "abolishAtr": 0,
        "memo": "",
        "workAtr": 0,
        "oneDayCls": 1,
        "morningCls": 0,
        "afternoonCls": 0,
        "calculatorMethod": 0,
        "dispOrder": null,
        "workTypeSets": null
    }

    interface WorkDay {
        "companyId": "000000000000-0110",
        "workTypeCode": "001",
        "name": "出勤",
        "abbreviationName": "出勤",
        "symbolicName": "出",
        "abolishAtr": 0,
        "memo": "",
        "workAtr": 0,
        "oneDayCls": 0,
        "morningCls": 0,
        "afternoonCls": 0,
        "calculatorMethod": 1,
        "dispOrder": null,
        "workTypeSets": null
    }

    interface WorkType {
        companyId: string;
        workTypeCode: string;
        name: string;
        abbreviationName: string;
        symbolicName: string;
        abolishAtr: number;
        memo: string;
        workAtr: number;
        oneDayCls: number;
        morningCls: number;
        afternoonCls: number;
        calculatorMethod: number;
        dispOrder: null | number;
        workTypeSets: null | number;
    }

    interface InfoBeforeChange {
        date: string;
        workTypeDto: WorkType;
    }

    interface BusinessTripInfoOutput {
        setting: Setting;
        appDispInfoStartup: AppDispInfoStartup;
        holidays: Holiday[];
        workdays: WorkDay[];
        businessTripActualContent: [],
        infoBeforeChange: InfoBeforeChange[];
        infoAfterChange: any[];
    }

    interface BusinessTrip {
        departureTime: null | number;
        returnTime: null | number;
        tripInfos: TripInfo[];
    }

    interface TripInfo {
        date: string;
        wkTypeCd: string;
        wkTimeCd: string;
        startWorkTime: number;
        endWorkTime: number;
    }
}