/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
module nts.uk.com.view.cli003.f {
    import service = nts.uk.com.view.cli003.f.service;

    export enum EMPLOYEE_SPECIFIC {
        SPECIFY = 1,
        ALL = 2
    }

    export enum ITEM_PROPERTY {
        ITEM_SRT = "string",
        ITEM_USER_NAME_LOGIN = "userNameLogin",
        ITEM_EMP_CODE_LOGIN = "employeeCodeLogin",
        ITEM_MODIFY_DATE = "modifyDateTime",
        ITEM_LOGIN_STATUS = "loginStatus",
        ITEM_METHOD_NAME = "methodName",
        ITEM_NOTE = "note",
        ITEM_MENU_NAME = "menuName",
        ITEM_USER_NAME_TAGET = "userNameTaget",
        ITEM_EMP_CODE_TAGET = "employeeCodeTaget",
        ITEM_PROCESS_ATTR = "processAttr",
        ITEM_CATEGORY_NAME = "categoryName",
        ITEM_TAGET_DATE = "targetDate",
        ITEM_INFO_OPERATE_ATTR = "infoOperateAttr",
        ITEM_NAME = "itemName",
        ITEM_VALUE_BEFOR = "valueBefore",
        ITEM_VALUE_AFTER = "valueAfter",
        ITEM_CORRECT_ATTR = "correctionAttr",
        ITEM_OPERATION_ID = "operationId",
        ITEM_PARRENT_KEY = "parentKey"
    }

    export enum DATA_TYPE {
        SCHEDULE = 0,
        DAILY_RESULTS = 1,
        MONTHLY_RESULTS = 2,
        ANY_PERIOD_SUMMARY = 3,
        APPLICATION_APPROVAL = 4,
        NOTIFICATION = 5,
        SALARY_DETAIL = 6,
        BONUS_DETAIL = 7,
        YEAR_END_ADJUSTMENT = 8,
        MONTHLY_CALCULATION = 9,
        RISING_SALARY_BACK = 10,
    }
    export enum RECORD_TYPE {
        LOGIN = 0,
        START_UP = 1,
        UPDATE_MASTER = 2,
        UPDATE_PERSION_INFO = 3,
        DATA_REFERENCE = 4,
        DATA_MANIPULATION = 5,
        DATA_CORRECT = 6,
        MY_NUMBER = 7,
        TERMINAL_COMMUNICATION_INFO = 8,
        DATA_STORAGE = 9,
        DATA_RECOVERY = 10,
        DATA_DELETION = 11,
    }

    export enum USE_STAGE {
        NOT_USE = 0,
        USE = 1,
    }

    export enum condSymbol {
        INCLUDE = 0,
        EQUAL = 1,
        DIFFERENT = 2
    }

    export enum ITEM_NO {
        ITEM_NO1 = 1,
        ITEM_NO2 = 2,
        ITEM_NO3 = 3,
        ITEM_NO4 = 4,
        ITEM_NO5 = 5,
        ITEM_NO6 = 6,
        ITEM_NO7 = 7,
        ITEM_NO8 = 8,
        ITEM_NO9 = 9,
        ITEM_NO10 = 10,
        ITEM_NO11 = 11,
        ITEM_NO12 = 12,
        ITEM_NO13 = 13,
        ITEM_NO14 = 14,
        ITEM_NO15 = 15,
        ITEM_NO16 = 16,
        ITEM_NO17 = 17,
        ITEM_NO18 = 18,
        ITEM_NO19 = 19,
        ITEM_NO20 = 20,
        ITEM_NO21 = 21,
        ITEM_NO22 = 22,
        ITEM_NO23 = 23,
        ITEM_NO24 = 24,
        ITEM_NO25 = 25,
        ITEM_NO26 = 26,
        ITEM_NO27 = 27,
        ITEM_NO28 = 28,
        ITEM_NO29 = 29,
        ITEM_NO30 = 30,
        ITEM_NO31 = 31,
        ITEM_NO32 = 32,
        ITEM_NO33 = 33,
        ITEM_NO34 = 34,
        ITEM_NO35 = 35,
        ITEM_NO36 = 36,
        ITEM_NO99 = 99
    }
    export interface PersionCorrectParam {
        operationId: string;
        targetDate: string;
        categoryName: string;
        itemName: string;
        valueBefore: string;
        valueAfter: string;
        infoOperateAttr: string;
    }
    export class ConditionByItemNo {
        itemNo: number;
        symbol: number;
        condition: string;
        constructor(itemNo: number, symbol: number, condition: string) {
            this.itemNo = itemNo;
            this.symbol = symbol;
            this.condition = condition;
        }
    }
    export interface LogBasicInfoParam {
        loginBasicInfor: LogBasicInfoModel;
        lstLogDataCorrectRecordRefeDto: KnockoutObservableArray<DataCorrectLogModel>;
        lstLogPerCateCorrectRecordDto: KnockoutObservableArray<PerCateCorrectRecordModel>
    }
    export interface DataCorrectParam {
        operationId: string;
        targetDate: string;
        targetDataType: number;
        itemName: string;
        valueBefore: string;
        valueAfter: string;
        remarks: string;
        correctionAttr: string;
    }
    export interface LogSettingParam {
        startHistoryRecord: number
        companyId: string
        updateHistoryRecord: number
        loginHistoryRecord: number
        menuClassification: number
        programId: string
        system: number
    }
    class IgGridColumnSwitchModel {
        headerText: string;
        key: string;
        dataType: string;
        hidden: boolean;
        itemName: string;
        width: string;
        constructor(headerText: string, itemNo: number, recordType: number) {
            this.headerText = headerText;
            this.hidden = false;
            this.dataType = ITEM_PROPERTY.ITEM_SRT;
            this.itemName = headerText;
            switch (itemNo) {
                case -1: {
                    this.key = ITEM_PROPERTY.ITEM_OPERATION_ID;
                    this.hidden = true;
                    break;
                }
                case -2: {
                    this.key = ITEM_PROPERTY.ITEM_PARRENT_KEY;
                    this.hidden = true;
                    break;
                }
                case ITEM_NO.ITEM_NO2: {
                    this.key = ITEM_PROPERTY.ITEM_USER_NAME_LOGIN;
                    if (recordType === RECORD_TYPE.UPDATE_PERSION_INFO) {
                        this.width = "120px";
                    } else {
                        this.width = "170px";
                    }

                    break;
                }
                case ITEM_NO.ITEM_NO3: {
                    this.key = ITEM_PROPERTY.ITEM_EMP_CODE_LOGIN;
                    if (recordType === RECORD_TYPE.UPDATE_PERSION_INFO) {
                        this.width = "120px";
                    } else {
                        this.width = "170px";
                    }
                    break;
                }
                case ITEM_NO.ITEM_NO7: {
                    this.key = ITEM_PROPERTY.ITEM_MODIFY_DATE;
                    this.width = "170px";
                    break;
                }
                case ITEM_NO.ITEM_NO36:
                case ITEM_NO.ITEM_NO18: {
                    this.key = ITEM_PROPERTY.ITEM_NOTE;
                    this.width = "120px";
                    break;
                }
                case ITEM_NO.ITEM_NO19: {
                    if (recordType === RECORD_TYPE.LOGIN) {
                        this.key = ITEM_PROPERTY.ITEM_LOGIN_STATUS;
                        this.width = "120px";
                    }
                    if (recordType === RECORD_TYPE.START_UP) {
                        this.key = ITEM_PROPERTY.ITEM_MENU_NAME;
                        this.width = "170px";
                    }
                    break;
                }
                case ITEM_NO.ITEM_NO20: {
                    if (recordType === RECORD_TYPE.LOGIN) {
                        this.key = ITEM_PROPERTY.ITEM_METHOD_NAME;
                    }
                    if (recordType === RECORD_TYPE.DATA_CORRECT
                        || recordType === RECORD_TYPE.UPDATE_PERSION_INFO) {
                        this.key = ITEM_PROPERTY.ITEM_USER_NAME_TAGET;
                    }
                    this.width = "120px";
                    break;
                }
                case ITEM_NO.ITEM_NO21: {
                    if (recordType === RECORD_TYPE.DATA_CORRECT
                        || recordType === RECORD_TYPE.UPDATE_PERSION_INFO) {
                        this.key = ITEM_PROPERTY.ITEM_EMP_CODE_TAGET;
                    }
                    if (recordType === RECORD_TYPE.DATA_CORRECT) {
                        this.width = "170px";
                    } else {
                        this.width = "120px";
                    }
                    break;
                }
                case ITEM_NO.ITEM_NO22: {
                    if (recordType === RECORD_TYPE.LOGIN) {
                        this.key = ITEM_PROPERTY.ITEM_NOTE;
                    }
                    if (recordType === RECORD_TYPE.DATA_CORRECT) {
                        this.key = ITEM_PROPERTY.ITEM_TAGET_DATE;
                    }
                    if (recordType === RECORD_TYPE.UPDATE_PERSION_INFO) {
                        this.key = ITEM_PROPERTY.ITEM_PROCESS_ATTR;
                    }
                    this.width = "120px";
                    break;
                }
                case ITEM_NO.ITEM_NO23: {
                    if (recordType === RECORD_TYPE.DATA_CORRECT) {
                        this.key = ITEM_PROPERTY.ITEM_TAGET_DATE;
                    }
                    if (recordType === RECORD_TYPE.UPDATE_PERSION_INFO) {
                        this.key = ITEM_PROPERTY.ITEM_CATEGORY_NAME;
                    }
                    this.width = "120px";
                    break;
                }
                case ITEM_NO.ITEM_NO24: {
                    if (recordType === RECORD_TYPE.DATA_CORRECT) {
                        this.key = ITEM_PROPERTY.ITEM_TAGET_DATE;
                    }
                    if (recordType === RECORD_TYPE.UPDATE_PERSION_INFO) {
                        this.key = ITEM_PROPERTY.ITEM_INFO_OPERATE_ATTR;
                    }
                    this.width = "120px";
                    break;
                }
                case ITEM_NO.ITEM_NO26: {
                    this.key = ITEM_PROPERTY.ITEM_CORRECT_ATTR;
                    this.width = "120px";
                    break;
                }
                case ITEM_NO.ITEM_NO27: {
                    if (recordType === RECORD_TYPE.DATA_CORRECT) {
                        this.key = ITEM_PROPERTY.ITEM_NAME;
                    }
                    this.width = "120px";
                    break;
                }
                case ITEM_NO.ITEM_NO29: {
                    this.key = ITEM_PROPERTY.ITEM_NAME;
                    this.width = "120px";
                    break;
                }
                case ITEM_NO.ITEM_NO30: {
                    this.key = ITEM_PROPERTY.ITEM_VALUE_BEFOR;
                    this.width = "120px";
                    break;
                }
                case ITEM_NO.ITEM_NO31: {
                    if (recordType === RECORD_TYPE.DATA_CORRECT) {
                        this.key = ITEM_PROPERTY.ITEM_VALUE_AFTER;
                    }
                    if (recordType === RECORD_TYPE.UPDATE_PERSION_INFO) {
                        this.key = ITEM_PROPERTY.ITEM_VALUE_BEFOR;
                    }
                    this.width = "120px";
                    break;
                }
                case ITEM_NO.ITEM_NO33: {
                    this.key = ITEM_PROPERTY.ITEM_VALUE_AFTER;
                    this.width = "120px";
                    break;
                }
                case ITEM_NO.ITEM_NO99: {
                    this.key = ITEM_PROPERTY.ITEM_TAGET_DATE;
                    this.width = "120px";
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }
    class LogOutputItemDto {
        itemNo: number;
        itemName: string;
        recordType: number;
        sortOrder: number;
        parentKey: string;
        constructor(itemNo: number, itemName: string, recordType: number, sortOrder: number, parentKey: string) {
            this.itemNo = itemNo;
            this.itemName = itemName;
            this.recordType = recordType;
            this.sortOrder = sortOrder;
            this.parentKey = parentKey;
        }
    }
    class LogOutputItem {
        itemNo: number;
        itemName: string;
        recordType: number;
        sortOrder: number;
        constructor(itemNo: number, itemName: string, recordType: number, sortOrder: number) {
            this.itemNo = itemNo;
            this.itemName = itemName;
            this.recordType = recordType;
            this.sortOrder = sortOrder;
        }
    }
    class IgGridColumnModel {
        headerText: string;
        key: string;
        dataType: string;
        hidden: boolean;
        width: string;
        template: string;
        // setting for using export csv
        itemName: string;
        constructor(headerText: string, key: string, dataType: string, hidden: boolean, width?: string, template?: string) {
            this.headerText = headerText;
            this.key = key;
            this.dataType = dataType;
            this.hidden = hidden;
            this.itemName = headerText;
            this.width = width;
            this.template = template;
        }
    }
    class PerCateCorrectRecordModel {
        parentKey: string;
        childrentKey: string;
        operationId: string;
        targetDate: string;
        categoryName: string;
        itemName: string;
        valueBefore: string;
        valueAfter: string;
        infoOperateAttr: string;
        constructor(param: PersionCorrectParam) {
            this.operationId = param.operationId;
            this.targetDate = param.targetDate;
            this.itemName = param.itemName;
            this.valueBefore = param.valueBefore;
            this.valueAfter = param.valueAfter;
            this.infoOperateAttr = param.infoOperateAttr;
            this.categoryName = param.categoryName;
        }
    }
    interface LogBasicInfoModel {
        /**
  * Help us generate table in screen F
  */
        parentKey: string;

        /**
         * ログインユーザID / 操作者ユーザID / 修正者 ユーザID / 修正者 ユーザID
         */
        userId: string;

        /**
         * ログインユーザ名 / 操作者ユーザ名 / 修正者 ユーザ名 / 修正者 ユーザ名
         */
        userName: string;

        /**
         * ログイン社員コード / 操作者社員コード / 修正者 社員コード / 修正者 社員コード
         */
        employeeCode: string;

        /**
         * Use to get employee code
         */
        employeeId: string;

        /**
         * IPアドレス
         */
        ipAddress: string;

        /**
         * PC名
         */
        pcName: string;

        /**
         * アカウント
         */
        account: string;

        /**
         * ログイン日時 / 起動日時 / 修正日時 / 修正日時
         */
        modifyDateTime: string;

        /**
         * 就業権限名称
         */
        employmentAuthorityName: string;

        /**
         * 給与権限名称
         */
        salarytAuthorityName: string;

        /**
         * 人事権限名称
         */
        personalAuthorityName: string;

        /**
         * オフィスヘルパー権限名称
         */
        officeHelperAuthorityName: string;

        /**
         * 会計権限名称
         */
        accountAuthorityName: string;

        /**
         * マイナンバー権限名称
         */
        myNumberAuthorityName: string;

        /**
         * グループ会社管理権限名称
         */
        groupCompanyAdminAuthorityName: string;

        /**
         * 会社管理者権限名称
         */
        companyAdminAuthorityName: string;

        /**
         * システム管理者権限名称
         */
        systemAdminAuthorityName: string;

        /**
         * 個人情報権限名称
         */
        personalInfoAuthorityName: string;

        /**
         * メニュー名称
         */
        menuName: string;

        /**
         * 備考
         */
        note: string;

        /**
         * ログイン状態 
         * LOGIN
         */
        loginStatus: string;

        /**
         * ログイン方法
         *  LOGIN
         */
        loginMethod: string;

        /**
         * アクセス元URL 
         * LOGIN
         */
        accessResourceUrl: string;

        /**
         * 起動元メニュー名称 
         * START
         */
        startUpMenuName: string;

        /** List data correct log */
        logDataCorrectChildrenDtos: LogDataCorrectChildrenDto[];

        /** List person update log */
        logPersonalUpdateChildrenDtos: LogPersonalUpdateChildrenDto[];
    }

    interface LogDataCorrectChildrenDto {
        /**	
         * Help us generate table in screen F
         */
        childrenKey: string;

        /**	
         * 対象者 ユーザID	
         */
        targetUserId: string;

        /**	
         * 対象者 ユーザ名	
         */
        targetUserName: string;

        /**	
         * 対象者 社員コード	
         */
        targetEmployeeCode: string;

        /**	
         * 修正前の値	
         */
        itemValueBefore: string;

        /**	
         * 修正後の値	
         */
        itemValueAfter: string;

        /**	
         * 修正前の内容	
         */
        itemContentBefore: string;

        /**	
         * 修正後の内容	
         */
        itemContentAfter: string;

        /**	
         * 年月日 / 対象年月日	
         */
        targetYmd: string;

        /**	
         * 年月 / 対象年月	
         */
        targetYm: string;

        /**	
         * 年 / 対象年	
         */
        targetY: string;

        /**	
         * 対象	
         */
        target: string;

        /**	
         * 修正区分	
         */
        categoryCorrection: string;

        /**	
         * 対象項目	
         */
        targetItem: string;

        /**	
         * 備考	
         */
        remark: string;
    }

    interface LogPersonalUpdateChildrenDto {
        /**	
     * Help us generate table in screen F
     */
        childrenKey: string,

        /**	
         * 対象者 ユーザID	
         */
        targetUserId: string,

        /**	
         * 対象者 ユーザ名	
         */
        targetUserName: string,

        /**	
         * 対象者 社員コード	
         */
        targetEmployeeCode: string,

        /**	
         * 修正前の値	
         */
        itemValueBefore: string,

        /**	
         * 修正後の値	
         */
        itemValueAfter: string,

        /**	
         * 修正前の内容	
         */
        itemContentBefore: string,

        /**	
         * 修正後の内容	
         */
        itemContentAfter: string,

        /**	
         * 年月日 / 対象年月日	
         */
        targetYmd: string,

        /**	
         * 年月 / 対象年月	
         */
        targetYm: string,

        /**	
         * 年 / 対象年	
         */
        targetY: string,

        /**	
         * 対象	
         */
        target: string,

        /**	
         * 処理区分	
         */
        categoryProcess: string,

        /**	
         * カテゴリ名	
         */
        categoryName: string,

        /**	
         * 修正方法	
         */
        methodCorrection: string,

        /**	
         * 項目名	
         */
        itemName: string,

        /**	
         * 補正項目	
         */
        correctionItem: string,

        /**	
         * 補正後年月日	
         */
        correctionYmd: string
    }
    class DataCorrectLogModel {
        parentKey: string;
        childrentKey: string;
        operationId: string;
        targetDate: string;
        targetDataType: number;
        itemName: string;
        valueBefore: string;
        valueAfter: string;
        remarks: string;
        correctionAttr: string;
        showOrder: number;
        constructor(param: DataCorrectParam) {
            this.operationId = param.operationId;
            this.targetDate = param.targetDate;
            this.targetDataType = param.targetDataType;
            this.itemName = param.itemName;
            this.valueBefore = param.valueBefore;
            this.valueAfter = param.valueAfter;
            this.remarks = param.remarks;
            this.correctionAttr = param.correctionAttr;
        }
    }
    interface LogSetOutputs {
        displayOrder: number,
        isUseFlag: number,
        itemNo: number,
        logSetId: string,
        logSetItemDetails: Array<LogSetItemDetails>
    }
    interface LogSetItemDetails {
        condition: string,
        frame: number,
        itemNo: number,
        logSetId: string,
        sybol: number,
    }
    interface LogDataResultDto {
        id: string,
        ipAddress: string,
        pcName: string,
        account: string,
        employeeCode: string,
        employeeName: string,
        startDateTime: string,
        endDateTime: string,
        form: number,
        name: string,
        fileId: string,
        fileName: string,
        fileSize: number,
        status: number,
        targetNumberPeople: number,
        setCode: string,
        isDeletedFilesFlg: number,
        logResult: Array<LogResultDto>,
        subColumnsHeaders: Array<IgGridColumnModel>;
    }
    interface LogResultDto {
        logNumber: number,
        processingContent: string,
        errorContent: string,
        contentSql: string,
        errorDate: string,
        errorEmployeeId: string,
    }
    @bean()
    export class ScreenModel extends ko.ViewModel {
        listLogBasicInforModel: LogBasicInfoModel[] = [];
        listLogDataResult: LogDataResultDto[] = [];
        logDataResultHeader: Array<IgGridColumnModel> = [];
        logDataResultSubHeader: Array<IgGridColumnModel> = [];
        isDisplayText: KnockoutObservable<boolean> = ko.observable(false);
        maxlength: KnockoutObservable<number> = ko.observable(1000);
        selectedEmployeeCodeTarget: KnockoutObservableArray<any> = ko.observableArray([]);
        //Data from B
        logTypeSelectedCode: KnockoutObservable<string> = ko.observable('');
        dataTypeSelectedCode: KnockoutObservable<string> = ko.observable('');
        systemTypeSelectedCode: KnockoutObservable<string> = ko.observable('');
        checkFormatDate: KnockoutObservable<string> = ko.observable('');
        operatorEmployeeIdList: KnockoutObservableArray<any> = ko.observableArray([]);
        dateValue: KnockoutObservable<any> = ko.observable();
        startDateOperator: KnockoutObservable<string> = ko.observable('');
        endDateOperator: KnockoutObservable<string> = ko.observable('');
        targetEmployeeIdList: KnockoutObservableArray<any> = ko.observableArray([]);
        logSetOutputs: KnockoutObservableArray<LogSetOutputs> = ko.observableArray([]);
        logSettingDto: KnockoutObservableArray<LogSettingParam> = ko.observableArray([]);
        displayItemNo: KnockoutObservableArray<string> = ko.observableArray([]);
        LogItemAllName: string[] = [];

        constructor(data: any) {
            super();
            const vm = this;
            vm.initComponentScreenF(data);
        }

        private initComponentScreenF(data: any) {
            const vm = this;
            //ログ照会設定を取得する
            if (data) {
                vm.logSetOutputs(data.logSetOutputs);
                vm.logTypeSelectedCode(data.logTypeSelectedCode);
                vm.dataTypeSelectedCode(data.dataTypeSelectedCode);
                vm.systemTypeSelectedCode(data.systemTypeSelectedCode);
                vm.checkFormatDate(data.checkFormatDate);
                vm.dateValue(data.dateValue);
                vm.startDateOperator(data.startDateOperator);
                vm.endDateOperator(data.endDateOperator);
                vm.displayItemNo(data.displayItemNo);
                data.selectedRuleCodeOperator === 2 ? vm.operatorEmployeeIdList([]) : vm.operatorEmployeeIdList(data.operatorEmployeeIdList);
                data.selectedRuleCodeTarget === 2 ? vm.targetEmployeeIdList([]) : vm.targetEmployeeIdList(data.targetEmployeeIdList);
            }
            // set param log
            const recordType = Number(vm.logTypeSelectedCode());
            vm.handleLog();
            //コードリストからログ出力項目を取得
            //取得した記録データ、ログ出力項目を返す
        }

        private handleLog() {
            const vm = this;
            const format = 'YYYY/MM/DD HH:mm:ss';
            //取得したドメインモデル「ログ照会設定」．記録種類をチェック
            const recordType = Number(vm.logTypeSelectedCode());
            //F：データ保存・復旧・削除の操作ログを取得
            const logDataParams = {
                systemType: Number(vm.systemTypeSelectedCode()),
                recordType: Number(vm.logTypeSelectedCode()),
                startDateOperator: moment.utc(vm.startDateOperator(), format).toISOString(),
                endDateOperator: moment.utc(vm.endDateOperator(), format).toISOString(),
                listOperatorEmployeeId: vm.operatorEmployeeIdList(),
                listCondition: vm.filterLogSetting(),
            };
            vm.$blockui('grayout');
            //generate header
            service.getLogOutputItemsByRecordType(String(vm.logTypeSelectedCode())).done((logOutputItems: LogOutputItem[]) => {
                //set all header
                vm.getHeaderByRecordType(recordType, logOutputItems);
                vm.LogItemAllName = _.map(logOutputItems, item => item.itemName);
                if (recordType === 9 || recordType === 10 || recordType === 11) {
                    //get data
                    service.getLogDataResults(logDataParams).done((data: Array<LogDataResultDto>) => {
                        if (data.length > 0) {
                            const listData = _.map(data, (logDataResultDto) => {
                                //記録の絞り込み
                                logDataResultDto.startDateTime = logDataResultDto.startDateTime ? moment.utc(logDataResultDto.startDateTime).format(format) : "";
                                logDataResultDto.endDateTime = logDataResultDto.endDateTime ? moment.utc(logDataResultDto.endDateTime).format(format) : "";
                                const formType = logDataResultDto.form;
                                const statusType = logDataResultDto.status;
                                const delFlg = logDataResultDto.isDeletedFilesFlg === 1 ? vm.$i18n("CLI003_93") : vm.$i18n("CLI003_94");
                                logDataResultDto.form = vm.getFormName(formType);
                                logDataResultDto.status = vm.getStatusName(statusType);
                                logDataResultDto.isDeletedFilesFlg = delFlg;
                                return logDataResultDto;
                            });
                            vm.listLogDataResult = _.filter(listData, item => item !== undefined);
                            if (vm.listLogDataResult.length === vm.maxlength()) {
                                vm.isDisplayText(true);
                            }
                            //Check after filter
                            if (vm.listLogDataResult.length <= 0) {
                                vm.$dialog.error({ messageId: "Msg_1220" });
                                vm.$blockui('clear');
                            }
                        } else {
                            vm.$dialog.error({ messageId: "Msg_1220" });
                            vm.$blockui('clear');
                        }
                        // Generate table
                        if (vm.logDataResultHeader.length === 1) {
                            vm.generateChildOnlyGrid(vm.listLogDataResult, recordType);
                        } else if (vm.logDataResultSubHeader.length === 1) {
                            vm.generateParentOnlyGrid(vm.listLogDataResult, recordType);
                        } else {
                            vm.generateBothGrid(vm.listLogDataResult, recordType);
                        }
                        vm.$blockui('clear');
                        vm.$errors('clear');
                    }).fail((error: any) => {
                        vm.$dialog.error(error);
                        vm.$blockui('clear');
                    });
                } else {
                    vm.getLogFromAnother();
                }
            }).fail((error: any) => {
                vm.$blockui('clear');
                vm.$dialog.error(error);
            });
        }

        private getLogFromAnother() {
            const vm = this;
            const format = 'YYYY/MM/DD HH:mm:ss';
            const recordType = Number(vm.logTypeSelectedCode());
            const systemType = Number(vm.systemTypeSelectedCode());
            vm.$blockui('grayout');
            // 記録を取得する
            service.getLogSettingsBySystem(systemType).then((logSettings: LogSettingParam[]) => {
                vm.logSettingDto(logSettings);
                const paramLog = {
                    listOperatorEmployeeId: vm.operatorEmployeeIdList(),
                    listTagetEmployeeId: vm.targetEmployeeIdList(),
                    startDateTaget: moment(vm.dateValue().startDate, "YYYY/MM/DD").toISOString(),
                    endDateTaget: moment(vm.dateValue().endDate, "YYYY/MM/DD").toISOString(),
                    startDateOperator: moment.utc(vm.startDateOperator(), format).toISOString(),
                    endDateOperator: moment.utc(vm.endDateOperator(), format).toISOString(),
                    recordType: vm.logTypeSelectedCode(),
                    targetDataType: vm.dataTypeSelectedCode(),
                    listLogSettingDto: logSettings,
                    listCondition: vm.filterLogSetting(),
                }
                if (vm.checkFormatDate() === '2') {
                    paramLog.endDateTaget = moment.utc(vm.dateValue().endDate, "YYYY/MM/DD").endOf('month').toISOString();
                } else {
                    paramLog.endDateTaget = moment.utc(vm.dateValue().endDate, "YYYY/MM/DD").toISOString();
                }
                // Get Log basic info
                service.getLogBasicInfoAllByModifyDate(paramLog).then((data: LogBasicInfoModel[]) => {
                    // Validate
                    if (data.length === vm.maxlength()) {
                        vm.isDisplayText(true);
                    }
                    if (data.length <= 0) {
                        vm.$dialog.error({ messageId: "Msg_1220" });
                    }
                    // Generate table
                    if (vm.logDataResultHeader.length === 1) {
                        vm.generateChildOnlyGrid(data, recordType);
                    } else if (vm.logDataResultSubHeader.length === 1) {
                        vm.generateParentOnlyGrid(data, recordType);
                    } else {
                        vm.generateBothGrid(data, recordType);
                    }
                    vm.$blockui('clear');
                    vm.$errors('clear');
                }).fail((error: any) => {
                    vm.$blockui('clear');
                    vm.$dialog.error(error);
                });
            }).fail((error: any) => {
                vm.$blockui('clear');
                vm.$dialog.alert(error);
            });
        }

        private filterLogSetting(): ConditionByItemNo[] {
            const vm = this;
            let conditions: ConditionByItemNo[] = [];
            for (const logSetOutput of vm.logSetOutputs()) {
                const logSetOutputConditions: ConditionByItemNo[] = _.chain(logSetOutput.logSetItemDetails)
                    .filter((item) => item.condition)
                    .map((detail) => new ConditionByItemNo(logSetOutput.itemNo, detail.sybol, detail.condition))
                    .value();
                conditions = _.concat(conditions, logSetOutputConditions);
            }
            return conditions;
        }

        private getHeaderByRecordType(recordType: number, logOutputItems: LogOutputItem[]) {
            const vm = this;
            switch (recordType) {
                //All is order by SRCMT_LOG_OUTPUT_ITEM
                case RECORD_TYPE.LOGIN:
                    vm.logDataResultHeader = [
                        new IgGridColumnModel(logOutputItems[0].itemName, "userId", "string", false, "150px", "<p class='limited-label'> ${userId} </p>"),
                        new IgGridColumnModel(logOutputItems[1].itemName, "userName", "string", false, "150px", "<p class='limited-label'> ${userName} </p>"),
                        new IgGridColumnModel(logOutputItems[2].itemName, "employeeCode", "string", false, "150px", "<p class='limited-label'> ${employeeCode} </p>"),
                        new IgGridColumnModel(logOutputItems[3].itemName, "ipAddress", "string", false, "150px", "<p class='limited-label'> ${ipAddress} </p>"),
                        new IgGridColumnModel(logOutputItems[4].itemName, "pcName", "string", false, "150px", "<p class='limited-label'> ${pcName} </p>"),
                        new IgGridColumnModel(logOutputItems[5].itemName, "account", "string", false, "150px", "<p class='limited-label'> ${account} </p>"),
                        new IgGridColumnModel(logOutputItems[6].itemName, "modifyDateTime", "string", false, "150px", "<p class='limited-label'> ${modifyDateTime} </p>"),
                        new IgGridColumnModel(logOutputItems[7].itemName, "employmentAuthorityName", "string", false, "150px", "<p class='limited-label'> ${employmentAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[8].itemName, "salarytAuthorityName", "string", false, "150px", "<p class='limited-label'> ${salarytAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[9].itemName, "personalAuthorityName", "string", false, "150px", "<p class='limited-label'> ${personalAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[10].itemName, "targetNumberPeople", "string", false, "150px", "<p class='limited-label'> ${targetNumberPeople} </p>"),
                        new IgGridColumnModel(logOutputItems[11].itemName, "officeHelperAuthorityName", "string", false, "150px", "<p class='limited-label'> ${officeHelperAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[12].itemName, "accountAuthorityName", "string", false, "150px", "<p class='limited-label'> ${accountAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[13].itemName, "myNumberAuthorityName", "string", false, "150px", "<p class='limited-label'> ${myNumberAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[14].itemName, "groupCompanyAdminAuthorityName", "string", false, "150px", "<p class='limited-label'> ${groupCompanyAdminAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[15].itemName, "companyAdminAuthorityName", "string", false, "150px", "<p class='limited-label'> ${companyAdminAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[16].itemName, "systemAdminAuthorityName", "string", false, "150px", "<p class='limited-label'> ${systemAdminAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[17].itemName, "menuName", "string", false, "150px", "<p class='limited-label'> ${menuName} </p>"),
                        new IgGridColumnModel(logOutputItems[18].itemName, "loginStatus", "string", false, "150px", "<p class='limited-label'> ${loginStatus} </p>"),
                        new IgGridColumnModel(logOutputItems[19].itemName, "loginMethod", "string", false, "150px", "<p class='limited-label'> ${loginMethod} </p>"),
                        new IgGridColumnModel(logOutputItems[20].itemName, "accessResourceUrl", "string", false, "150px", "<p class='limited-label'> ${accessResourceUrl} </p>"),
                        new IgGridColumnModel(logOutputItems[21].itemName, "note", "string", false, "150px", "<p class='limited-label'> ${note} </p>"),
                    ];
                    break;
                case RECORD_TYPE.START_UP:
                    vm.logDataResultHeader = [
                        new IgGridColumnModel(logOutputItems[0].itemName, "userId", "string", false, "150px", "<p class='limited-label'> ${userId} </p>"),
                        new IgGridColumnModel(logOutputItems[1].itemName, "userName", "string", false, "150px", "<p class='limited-label'> ${userName} </p>"),
                        new IgGridColumnModel(logOutputItems[2].itemName, "employeeCode", "string", false, "150px", "<p class='limited-label'> ${employeeCode} </p>"),
                        new IgGridColumnModel(logOutputItems[3].itemName, "ipAddress", "string", false, "150px", "<p class='limited-label'> ${ipAddress} </p>"),
                        new IgGridColumnModel(logOutputItems[4].itemName, "pcName", "string", false, "150px", "<p class='limited-label'> ${pcName} </p>"),
                        new IgGridColumnModel(logOutputItems[5].itemName, "account", "string", false, "150px", "<p class='limited-label'> ${account} </p>"),
                        new IgGridColumnModel(logOutputItems[6].itemName, "modifyDateTime", "string", false, "150px", "<p class='limited-label'> ${modifyDateTime} </p>"),
                        new IgGridColumnModel(logOutputItems[7].itemName, "employmentAuthorityName", "string", false, "150px", "<p class='limited-label'> ${employmentAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[8].itemName, "salarytAuthorityName", "string", false, "150px", "<p class='limited-label'> ${salarytAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[9].itemName, "personalAuthorityName", "string", false, "150px", "<p class='limited-label'> ${personalAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[10].itemName, "targetNumberPeople", "string", false, "150px", "<p class='limited-label'> ${targetNumberPeople} </p>"),
                        new IgGridColumnModel(logOutputItems[11].itemName, "officeHelperAuthorityName", "string", false, "150px", "<p class='limited-label'> ${officeHelperAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[12].itemName, "accountAuthorityName", "string", false, "150px", "<p class='limited-label'> ${accountAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[13].itemName, "myNumberAuthorityName", "string", false, "150px", "<p class='limited-label'> ${myNumberAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[14].itemName, "groupCompanyAdminAuthorityName", "string", false, "150px", "<p class='limited-label'> ${groupCompanyAdminAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[15].itemName, "companyAdminAuthorityName", "string", false, "150px", "<p class='limited-label'> ${companyAdminAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[16].itemName, "systemAdminAuthorityName", "string", false, "150px", "<p class='limited-label'> ${systemAdminAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[17].itemName, "note", "string", false, "150px", "<p class='limited-label'> ${note} </p>"),
                        new IgGridColumnModel(logOutputItems[18].itemName, "menuName", "string", false, "150px", "<p class='limited-label'> ${menuName} </p>"),
                        new IgGridColumnModel(logOutputItems[19].itemName, "startUpMenuName", "string", false, "150px", "<p class='limited-label'> ${startUpMenuName} </p>"),
                    ];
                    break;
                case RECORD_TYPE.UPDATE_PERSION_INFO:
                    //parent
                    vm.logDataResultHeader = [
                        new IgGridColumnModel(logOutputItems[0].itemName, "userId", "string", false, "150px", "<p class='limited-label'> ${userId} </p>"),
                        new IgGridColumnModel(logOutputItems[1].itemName, "userName", "string", false, "150px", "<p class='limited-label'> ${userName} </p>"),
                        new IgGridColumnModel(logOutputItems[2].itemName, "employeeCode", "string", false, "150px", "<p class='limited-label'> ${employeeCode} </p>"),
                        new IgGridColumnModel(logOutputItems[3].itemName, "ipAddress", "string", false, "150px", "<p class='limited-label'> ${ipAddress} </p>"),
                        new IgGridColumnModel(logOutputItems[4].itemName, "pcName", "string", false, "150px", "<p class='limited-label'> ${pcName} </p>"),
                        new IgGridColumnModel(logOutputItems[5].itemName, "account", "string", false, "150px", "<p class='limited-label'> ${account} </p>"),
                        new IgGridColumnModel(logOutputItems[6].itemName, "modifyDateTime", "string", false, "150px", "<p class='limited-label'> ${modifyDateTime} </p>"),
                        new IgGridColumnModel(logOutputItems[7].itemName, "employmentAuthorityName", "string", false, "150px", "<p class='limited-label'> ${employmentAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[8].itemName, "salarytAuthorityName", "string", false, "150px", "<p class='limited-label'> ${salarytAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[9].itemName, "personalAuthorityName", "string", false, "150px", "<p class='limited-label'> ${personalAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[10].itemName, "targetNumberPeople", "string", false, "150px", "<p class='limited-label'> ${targetNumberPeople} </p>"),
                        new IgGridColumnModel(logOutputItems[11].itemName, "officeHelperAuthorityName", "string", false, "150px", "<p class='limited-label'> ${officeHelperAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[12].itemName, "accountAuthorityName", "string", false, "150px", "<p class='limited-label'> ${accountAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[13].itemName, "myNumberAuthorityName", "string", false, "150px", "<p class='limited-label'> ${myNumberAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[14].itemName, "groupCompanyAdminAuthorityName", "string", false, "150px", "<p class='limited-label'> ${groupCompanyAdminAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[15].itemName, "companyAdminAuthorityName", "string", false, "150px", "<p class='limited-label'> ${companyAdminAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[16].itemName, "systemAdminAuthorityName", "string", false, "150px", "<p class='limited-label'> ${systemAdminAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[17].itemName, "menuName", "string", false, "150px", "<p class='limited-label'> ${menuName} </p>"),
                        new IgGridColumnModel(logOutputItems[35].itemName, "note", "string", false, "150px", "<p class='limited-label'> ${note} </p>"),
                    ];
                    //sub
                    vm.logDataResultSubHeader = [
                        new IgGridColumnModel(logOutputItems[18].itemName, "targetUserId", "string", false, "150px", "<p class='limited-label'> ${targetUserId} </p>"),
                        new IgGridColumnModel(logOutputItems[19].itemName, "targetUserName", "string", false, "150px", "<p class='limited-label'> ${targetUserName} </p>"),
                        new IgGridColumnModel(logOutputItems[20].itemName, "targetEmployeeCode", "string", false, "150px", "<p class='limited-label'> ${targetEmployeeCode} </p>"),
                        new IgGridColumnModel(logOutputItems[21].itemName, "categoryProcess", "string", false, "150px", "<p class='limited-label'> ${categoryProcess} </p>"),
                        new IgGridColumnModel(logOutputItems[22].itemName, "categoryName", "string", false, "150px", "<p class='limited-label'> ${categoryName} </p>"),
                        new IgGridColumnModel(logOutputItems[23].itemName, "methodCorrection", "string", false, "150px", "<p class='limited-label'> ${methodCorrection} </p>"),
                        new IgGridColumnModel(logOutputItems[24].itemName, "targetYmd", "string", false, "150px", "<p class='limited-label'> ${targetYmd} </p>"),
                        new IgGridColumnModel(logOutputItems[25].itemName, "targetYm", "string", false, "150px", "<p class='limited-label'> ${targetYm} </p>"),
                        new IgGridColumnModel(logOutputItems[26].itemName, "targetY", "string", false, "150px", "<p class='limited-label'> ${targetY} </p>"),
                        new IgGridColumnModel(logOutputItems[27].itemName, "target", "string", false, "150px", "<p class='limited-label'> ${target} </p>"),
                        new IgGridColumnModel(logOutputItems[28].itemName, "itemName", "string", false, "150px", "<p class='limited-label'> ${itemName} </p>"),
                        new IgGridColumnModel(logOutputItems[29].itemName, "itemValueBefore", "string", false, "150px", "<p class='limited-label'> ${itemValueBefore} </p>"),
                        new IgGridColumnModel(logOutputItems[30].itemName, "itemContentBefore", "string", false, "150px", "<p class='limited-label'> ${itemContentBefore} </p>"),
                        new IgGridColumnModel(logOutputItems[31].itemName, "itemValueAfter", "string", false, "150px", "<p class='limited-label'> ${itemValueAfter} </p>"),
                        new IgGridColumnModel(logOutputItems[32].itemName, "itemContentAfter", "string", false, "150px", "<p class='limited-label'> ${itemContentAfter} </p>"),
                        new IgGridColumnModel(logOutputItems[33].itemName, "correctionItem", "string", false, "150px", "<p class='limited-label'> ${correctionItem} </p>"),
                        new IgGridColumnModel(logOutputItems[34].itemName, "correctionYmd", "string", false, "150px", "<p class='limited-label'> ${correctionYmd} </p>"),
                    ];
                    break;
                case RECORD_TYPE.DATA_CORRECT:
                    //parent
                    vm.logDataResultHeader = [
                        new IgGridColumnModel(logOutputItems[0].itemName, "userId", "string", false, "150px", "<p class='limited-label'> ${userId} </p>"),
                        new IgGridColumnModel(logOutputItems[1].itemName, "userName", "string", false, "150px", "<p class='limited-label'> ${userName} </p>"),
                        new IgGridColumnModel(logOutputItems[2].itemName, "employeeCode", "string", false, "150px", "<p class='limited-label'> ${employeeCode} </p>"),
                        new IgGridColumnModel(logOutputItems[3].itemName, "ipAddress", "string", false, "150px", "<p class='limited-label'> ${ipAddress} </p>"),
                        new IgGridColumnModel(logOutputItems[4].itemName, "pcName", "string", false, "150px", "<p class='limited-label'> ${pcName} </p>"),
                        new IgGridColumnModel(logOutputItems[5].itemName, "account", "string", false, "150px", "<p class='limited-label'> ${account} </p>"),
                        new IgGridColumnModel(logOutputItems[6].itemName, "modifyDateTime", "string", false, "150px", "<p class='limited-label'> ${modifyDateTime} </p>"),
                        new IgGridColumnModel(logOutputItems[7].itemName, "employmentAuthorityName", "string", false, "150px", "<p class='limited-label'> ${employmentAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[8].itemName, "salarytAuthorityName", "string", false, "150px", "<p class='limited-label'> ${salarytAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[9].itemName, "personalAuthorityName", "string", false, "150px", "<p class='limited-label'> ${personalAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[10].itemName, "targetNumberPeople", "string", false, "150px", "<p class='limited-label'> ${targetNumberPeople} </p>"),
                        new IgGridColumnModel(logOutputItems[11].itemName, "officeHelperAuthorityName", "string", false, "150px", "<p class='limited-label'> ${officeHelperAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[12].itemName, "accountAuthorityName", "string", false, "150px", "<p class='limited-label'> ${accountAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[13].itemName, "myNumberAuthorityName", "string", false, "150px", "<p class='limited-label'> ${myNumberAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[14].itemName, "groupCompanyAdminAuthorityName", "string", false, "150px", "<p class='limited-label'> ${groupCompanyAdminAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[15].itemName, "companyAdminAuthorityName", "string", false, "150px", "<p class='limited-label'> ${companyAdminAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[16].itemName, "systemAdminAuthorityName", "string", false, "150px", "<p class='limited-label'> ${systemAdminAuthorityName} </p>"),
                        new IgGridColumnModel(logOutputItems[17].itemName, "menuName", "string", false, "150px", "<p class='limited-label'> ${menuName} </p>"),
                    ];
                    //sub
                    vm.logDataResultSubHeader = [
                        new IgGridColumnModel(logOutputItems[18].itemName, "targetUserId", "string", false, "150px", "<p class='limited-label'> ${targetUserId} </p>"),
                        new IgGridColumnModel(logOutputItems[19].itemName, "targetUserName", "string", false, "150px", "<p class='limited-label'> ${targetUserName} </p>"),
                        new IgGridColumnModel(logOutputItems[20].itemName, "targetEmployeeCode", "string", false, "150px", "<p class='limited-label'> ${targetEmployeeCode} </p>"),
                        new IgGridColumnModel(logOutputItems[21].itemName, "targetYmd", "string", false, "150px", "<p class='limited-label'> ${targetYmd} </p>"),
                        new IgGridColumnModel(logOutputItems[22].itemName, "targetYm", "string", false, "150px", "<p class='limited-label'> ${targetYm} </p>"),
                        new IgGridColumnModel(logOutputItems[23].itemName, "targetY", "string", false, "150px", "<p class='limited-label'> ${targetY} </p>"),
                        new IgGridColumnModel(logOutputItems[24].itemName, "target", "string", false, "150px", "<p class='limited-label'> ${target} </p>"),
                        new IgGridColumnModel(logOutputItems[25].itemName, "categoryCorrection", "string", false, "150px", "<p class='limited-label'> ${categoryCorrection} </p>"),
                        new IgGridColumnModel(logOutputItems[26].itemName, "targetItem", "string", false, "150px", "<p class='limited-label'> ${targetItem} </p>"),
                        new IgGridColumnModel(logOutputItems[27].itemName, "itemValueBefore", "string", false, "150px", "<p class='limited-label'> ${itemValueBefore} </p>"),
                        new IgGridColumnModel(logOutputItems[28].itemName, "itemValueAfter", "string", false, "150px", "<p class='limited-label'> ${itemValueAfter} </p>"),
                        new IgGridColumnModel(logOutputItems[29].itemName, "itemContentBefore", "string", false, "150px", "<p class='limited-label'> ${itemContentBefore} </p>"),
                        new IgGridColumnModel(logOutputItems[30].itemName, "itemContentAfter", "string", false, "150px", "<p class='limited-label'> ${itemContentAfter} </p>"),
                        new IgGridColumnModel(logOutputItems[31].itemName, "remark", "string", false, "150px", "<p class='limited-label'> ${remark} </p>"),
                    ];
                    break;
                case RECORD_TYPE.DATA_STORAGE:
                    //parent
                    vm.logDataResultHeader = [
                        new IgGridColumnModel(logOutputItems[0].itemName, "ipAddress", "string", false, "150px", "<p class='limited-label'> ${ipAddress} </p>"),
                        new IgGridColumnModel(logOutputItems[1].itemName, "pcName", "string", false, "150px", "<p class='limited-label'> ${pcName} </p>"),
                        new IgGridColumnModel(logOutputItems[2].itemName, "account", "string", false, "150px", "<p class='limited-label'> ${account} </p>"),
                        new IgGridColumnModel(logOutputItems[3].itemName, "employeeCode", "string", false, "150px", "<p class='limited-label'> ${employeeCode} </p>"),
                        new IgGridColumnModel(logOutputItems[4].itemName, "employeeName", "string", false, "150px", "<p class='limited-label'> ${employeeName} </p>"),
                        new IgGridColumnModel(logOutputItems[5].itemName, "startDateTime", "string", false, "150px", "<p class='limited-label'> ${startDateTime} </p>"),
                        new IgGridColumnModel(logOutputItems[6].itemName, "form", "string", false, "150px", "<p class='limited-label'> ${form} </p>"),
                        new IgGridColumnModel(logOutputItems[7].itemName, "name", "string", false, "150px", "<p class='limited-label'> ${name} </p>"),
                        new IgGridColumnModel(logOutputItems[8].itemName, "fileId", "string", false, "150px", "<p class='limited-label'> ${fileId} </p>"),
                        new IgGridColumnModel(logOutputItems[9].itemName, "fileSize", "string", false, "150px", "<p class='limited-label'> ${fileSize} </p>"),
                        new IgGridColumnModel(logOutputItems[10].itemName, "status", "string", false, "150px", "<p class='limited-label'> ${status} </p>"),
                        new IgGridColumnModel(logOutputItems[11].itemName, "targetNumberPeople", "string", false, "150px", "<p class='limited-label'> ${targetNumberPeople} </p>"),
                        new IgGridColumnModel(logOutputItems[12].itemName, "setCode", "string", false, "150px", "<p class='limited-label'> ${setCode} </p>"),
                        new IgGridColumnModel(logOutputItems[13].itemName, "fileName", "string", false, "150px", "<p class='limited-label'> ${fileName} </p>"),
                        new IgGridColumnModel(logOutputItems[14].itemName, "endDateTime", "string", false, "150px", "<p class='limited-label'> ${endDateTime} </p>"),
                    ];
                    //sub
                    vm.logDataResultSubHeader = [
                        new IgGridColumnModel(logOutputItems[15].itemName, "processingContent", "string", false, "150px", "<p class='limited-label'> ${processingContent} </p>"),
                        new IgGridColumnModel(logOutputItems[16].itemName, "errorContent", "string", false, "150px", "<p class='limited-label'> ${errorContent} </p>"),
                        new IgGridColumnModel(logOutputItems[17].itemName, "errorDate", "string", false, "150px", "<p class='limited-label'> ${errorDate} </p>"),
                        new IgGridColumnModel(logOutputItems[18].itemName, "errorEmployeeId", "string", false, "130px", "<p class='limited-label'> ${errorEmployeeId} </p>")
                    ];
                    break;
                case RECORD_TYPE.DATA_RECOVERY:
                    //parent
                    vm.logDataResultHeader = [
                        new IgGridColumnModel(logOutputItems[0].itemName, "ipAddress", "string", false, "150px", "<p class='limited-label'> ${ipAddress} </p>"),
                        new IgGridColumnModel(logOutputItems[1].itemName, "pcName", "string", false, "150px", "<p class='limited-label'> ${pcName} </p>"),
                        new IgGridColumnModel(logOutputItems[2].itemName, "account", "string", false, "150px", "<p class='limited-label'> ${account} </p>"),
                        new IgGridColumnModel(logOutputItems[3].itemName, "employeeCode", "string", false, "150px", "<p class='limited-label'> ${employeeCode} </p>"),
                        new IgGridColumnModel(logOutputItems[4].itemName, "employeeName", "string", false, "150px", "<p class='limited-label'> ${employeeName} </p>"),
                        new IgGridColumnModel(logOutputItems[5].itemName, "startDateTime", "string", false, "150px", "<p class='limited-label'> ${startDateTime} </p>"),
                        new IgGridColumnModel(logOutputItems[6].itemName, "form", "string", false, "150px", "<p class='limited-label'> ${form} </p>"),
                        new IgGridColumnModel(logOutputItems[7].itemName, "name", "string", false, "150px", "<p class='limited-label'> ${name} </p>"),
                        new IgGridColumnModel(logOutputItems[8].itemName, "endDateTime", "string", false, "150px", "<p class='limited-label'> ${endDateTime} </p>"),
                        new IgGridColumnModel(logOutputItems[9].itemName, "setCode", "string", false, "150px", "<p class='limited-label'> ${setCode} </p>"),
                    ];
                    //sub
                    vm.logDataResultSubHeader = [
                        new IgGridColumnModel(logOutputItems[10].itemName, "processingContent", "string", false, "130px", "<p class='limited-label'> ${processingContent} </p>"),
                        new IgGridColumnModel(logOutputItems[11].itemName, "errorContent", "string", false, "130px", "<p class='limited-label'> ${errorContent} </p>"),
                        new IgGridColumnModel(logOutputItems[12].itemName, "contentSql", "string", false, "130px", "<p class='limited-label'> ${contentSql} </p>"),
                        new IgGridColumnModel(logOutputItems[13].itemName, "errorDate", "string", false, "130px", "<p class='limited-label'> ${errorDate} </p>"),
                        new IgGridColumnModel(logOutputItems[14].itemName, "errorEmployeeId", "string", false, "130px", "<p class='limited-label'> ${errorEmployeeId} </p>")
                    ];
                    break;
                case RECORD_TYPE.DATA_DELETION:
                    //parent
                    vm.logDataResultHeader = [
                        new IgGridColumnModel(logOutputItems[0].itemName, "ipAddress", "string", false, "150px", "<p class='limited-label'> ${ipAddress} </p>"),
                        new IgGridColumnModel(logOutputItems[1].itemName, "pcName", "string", false, "150px", "<p class='limited-label'> ${pcName} </p>"),
                        new IgGridColumnModel(logOutputItems[2].itemName, "account", "string", false, "150px", "<p class='limited-label'> ${account} </p>"),
                        new IgGridColumnModel(logOutputItems[3].itemName, "employeeCode", "string", false, "150px", "<p class='limited-label'> ${employeeCode} </p>"),
                        new IgGridColumnModel(logOutputItems[4].itemName, "employeeName", "string", false, "150px", "<p class='limited-label'> ${employeeName} </p>"),
                        new IgGridColumnModel(logOutputItems[5].itemName, "startDateTime", "string", false, "150px", "<p class='limited-label'> ${startDateTime} </p>"),
                        new IgGridColumnModel(logOutputItems[6].itemName, "form", "string", false, "150px", "<p class='limited-label'> ${form} </p>"),
                        new IgGridColumnModel(logOutputItems[7].itemName, "status", "string", false, "150px", "<p class='limited-label'> ${status} </p>"),
                        new IgGridColumnModel(logOutputItems[8].itemName, "targetNumberPeople", "string", false, "150px", "<p class='limited-label'> ${targetNumberPeople} </p>"),
                        new IgGridColumnModel(logOutputItems[9].itemName, "isDeletedFilesFlg", "string", false, "150px", "<p class='limited-label'> ${isDeletedFilesFlg} </p>"),
                        new IgGridColumnModel(logOutputItems[10].itemName, "fileSize", "string", false, "150px", "<p class='limited-label'> ${fileSize} </p>"),
                        new IgGridColumnModel(logOutputItems[11].itemName, "fileName", "string", false, "150px", "<p class='limited-label'> ${fileName} </p>"),
                        new IgGridColumnModel(logOutputItems[12].itemName, "endDateTime", "string", false, "150px", "<p class='limited-label'> ${endDateTime} </p>"),
                        new IgGridColumnModel(logOutputItems[13].itemName, "setCode", "string", false, "150px", "<p class='limited-label'> ${setCode} </p>"),
                    ];
                    //sub
                    vm.logDataResultSubHeader = [
                        new IgGridColumnModel(logOutputItems[14].itemName, "processingContent", "string", false, "130px", "<p class='limited-label'> ${processingContent} </p>"),
                        new IgGridColumnModel(logOutputItems[15].itemName, "errorContent", "string", false, "130px", "<p class='limited-label'> ${errorContent} </p>"),
                        new IgGridColumnModel(logOutputItems[16].itemName, "errorDate", "string", false, "130px", "<p class='limited-label'> ${errorDate} </p>"),
                        new IgGridColumnModel(logOutputItems[17].itemName, "errorEmployeeId", "string", false, "130px", "<p class='limited-label'> ${errorEmployeeId} </p>")
                    ];
                    break;
                default:
                    break;
            }
            const items = _.filter(logOutputItems, (item: LogOutputItem) => vm.displayItemNo().some(i => i === String(item.itemNo)));
            vm.logDataResultHeader = _.filter(vm.logDataResultHeader, (item: IgGridColumnModel) => items.some(i => i.itemName === String(item.headerText)));
            vm.logDataResultSubHeader = _.filter(vm.logDataResultSubHeader, (item: IgGridColumnModel) => items.some(i => i.itemName === String(item.headerText)));

            if (recordType === RECORD_TYPE.DATA_STORAGE || recordType === RECORD_TYPE.DATA_RECOVERY || recordType === RECORD_TYPE.DATA_DELETION) {
                vm.logDataResultHeader.push(new IgGridColumnModel("id", "id", "string", true));
                vm.logDataResultSubHeader.push(new IgGridColumnModel("logNumber", "logNumber", "string", true));
            } else {
                vm.logDataResultHeader.push(new IgGridColumnModel("parentKey", "parentKey", "string", true));
                vm.logDataResultSubHeader.push(new IgGridColumnModel("childrenKey", "childrenKey", "string", true));
            }
        }

        private getFormName(form: number): string {
            const vm = this;
            switch (form) {
                case 0:
                    return vm.$i18n("Enum_StorageForm_MANUAL");
                case 1:
                    return vm.$i18n("Enum_StorageForm_AUTOMATIC");
                default:
                    return "";
            }
        }

        private getStatusName(status: number): string {
            const vm = this;
            switch (status) {
                case 0:
                    return vm.$i18n("Enum_SaveStatus_SUCCESS");
                case 1:
                    return vm.$i18n("Enum_SaveStatus_INTERRUPTION");
                case 2:
                    return vm.$i18n("Enum_SaveStatus_FAILURE");
                default:
                    return "";
            }
        }

        private generateBothGrid(dataSource: any[], recordType: number) {
            const vm = this;
            const $grid = $("#igGridLog");
            let primaryKeyParentName: string = "id";
            let primaryKeyChildrenName: string = "logNumber";
            let childrenDataProperty: string = "logResult";
            if (!(recordType === RECORD_TYPE.DATA_STORAGE || recordType === RECORD_TYPE.DATA_RECOVERY || recordType === RECORD_TYPE.DATA_DELETION)) {
                primaryKeyParentName = "parentKey";
                primaryKeyChildrenName = "childrenKey";
                if (recordType === RECORD_TYPE.DATA_CORRECT) {
                    childrenDataProperty = "logDataCorrectChildrenDtos";
                }
                if (recordType === RECORD_TYPE.UPDATE_PERSION_INFO) {
                    childrenDataProperty = "logPersonalUpdateChildrenDtos";
                }
            }
            const updateHeight = () => {
                const uh = (h: number) => $grid.igHierarchicalGrid('option', 'height', `${window.innerHeight - h}px`);
                $.Deferred()
                    .resolve(true)
                    .then(() => uh(280))
                    .then(() => uh(281));
            };
            //generate generateHierarchialGrid
            $grid.igHierarchicalGrid({
                width: "125%",
                height: "calc(100% - 15px)",
                initialDataBindDepth: 1,
                dataSource: dataSource,
                dataSourceType: "json",
                primaryKey: primaryKeyParentName,
                autoGenerateColumns: false,
                autoGenerateLayouts: false,
                hidePrimaryKey: true,
                virtualizationMode: 'continuous',
                columns: vm.logDataResultHeader,
                features: [
                    {
                        name: "Responsive",
                        enableVerticalRendering: false
                    },
                    {
                        name: "Resizing",
                        deferredResizing: false,
                        allowDoubleClickToResize: true,
                        inherit: true
                    },
                    {
                        name: "Sorting",
                        inherit: false

                    },
                    {
                        name: "Paging",
                        pageSize: 100,
                        type: "local",
                        inherit: true
                    },
                    {
                        name: "Filtering",
                        type: "local",
                        filterDropDownItemIcons: false,
                        filterDropDownWidth: 200,
                        filterDialogHeight: "390px",
                        filterDialogWidth: "515px",
                        columnSettings: [
                            { columnKey: primaryKeyParentName, allowFiltering: false },
                        ]
                    }
                ],
                columnLayouts: [{
                    width: "100%",
                    key: childrenDataProperty,
                    hidePrimaryKey: true,
                    childrenDataProperty: childrenDataProperty,
                    autoGenerateColumns: false,
                    primaryKey: primaryKeyChildrenName,
                    columns: vm.logDataResultSubHeader,
                    features: [
                        {
                            name: 'Selection',
                            mode: "row",
                            multipleSelection: false
                        },
                        {
                            name: "Responsive",
                            enableVerticalRendering: false,
                            columnSettings: []
                        }
                    ]
                }],
                dataRendered() {
                    updateHeight();
                },
                rowCollapsed() {
                    updateHeight();
                },
                rowExpanded() {
                    updateHeight();
                },
            });
        }

        private generateParentOnlyGrid(dataSource: any[], recordType: number) {
            const vm = this;
            const $grid = $("#igGridLog");
            let primaryKeyName: string = "id";
            if (!(recordType === RECORD_TYPE.DATA_STORAGE || recordType === RECORD_TYPE.DATA_RECOVERY || recordType === RECORD_TYPE.DATA_DELETION)) {
                primaryKeyName = "parentKey";
            }
            //generate generateHierarchialGrid
            $grid.igGrid({
                width: "125%",
                height: "calc(100% - 5px)",
                features: [
                    {
                        name: "Paging",
                        type: "local",
                        pageSize: 100
                    },
                    {
                        name: "Sorting",
                        type: "local"
                    },
                    {
                        name: "Resizing",
                        deferredResizing: false,
                        allowDoubleClickToResize: true
                    },
                    {
                        name: "Filtering",
                        type: "local",
                        filterDropDownItemIcons: false,
                        filterDropDownWidth: 200,
                        filterDialogHeight: "390px",
                        filterDialogWidth: "515px",
                        columnSettings: [
                            { columnKey: primaryKeyName, allowFiltering: false }
                        ]
                    }
                ],
                enableTooltip: true,
                rowVirtualization: true,
                virtualization: true,
                virtualizationMode: 'continuous',
                primaryKey: primaryKeyName,
                dataSource: dataSource,
                columns: vm.logDataResultHeader
            });
        }

        private generateChildOnlyGrid(dataSource: any[], recordType: number) {
            const vm = this;
            let primaryKeyName: string = "logNumber";
            const $grid = $("#igGridLog");
            let ds: any[] = [];
            if (recordType === RECORD_TYPE.DATA_STORAGE || recordType === RECORD_TYPE.DATA_RECOVERY || recordType === RECORD_TYPE.DATA_DELETION) {
                ds = _
                    .chain(dataSource)
                    .map(item => item.logResult)
                    .flatMap()
                    .map((data: any, index: number) => {
                        if (index < 1000) {
                            data.logNumber = index;
                            return data;
                        } else {
                            return undefined;
                        }
                    })
                    .filter(data => data !== undefined)
                    .value();
            } else if (recordType === RECORD_TYPE.UPDATE_PERSION_INFO) {
                ds = _
                    .chain(dataSource)
                    .map(item => item.logPersonalUpdateChildrenDtos)
                    .flatMap()
                    .map((data: any, index: number) => {
                        if (index < 1000) {
                            data.childrenKey = index;
                            return data;
                        } else {
                            return undefined;
                        }
                    })
                    .filter(data => data !== undefined)
                    .value();
                primaryKeyName = "childrenKey";
            } else if (recordType === RECORD_TYPE.DATA_CORRECT) {
                ds = _
                    .chain(dataSource)
                    .map(item => item.logDataCorrectChildrenDtos)
                    .flatMap()
                    .map((data: any, index: number) => {
                        if (index < 1000) {
                            data.childrenKey = index;
                            return data;
                        } else {
                            return undefined;
                        }
                    })
                    .filter(data => data !== undefined)
                    .value();
                primaryKeyName = "childrenKey";
            }
            //validate datasource
            if (ds.length >= vm.maxlength()) {
                vm.isDisplayText(true);
            }
            if (ds.length <= 0) {
                vm.$dialog.error({ messageId: "Msg_1220" });
            }
            //generate generateHierarchialGrid
            $grid.igGrid({
                width: "125%",
                height: "calc(100% - 5px)",
                features: [
                    {
                        name: "Paging",
                        type: "local",
                        pageSize: 100
                    },
                    {
                        name: "Sorting",
                        type: "local"
                    },
                    {
                        name: "Resizing",
                        deferredResizing: false,
                        allowDoubleClickToResize: true
                    },
                    {
                        name: "Filtering",
                        type: "local",
                        filterDropDownItemIcons: false,
                        filterDropDownWidth: 200,
                        filterDialogHeight: "390px",
                        filterDialogWidth: "515px",
                        columnSettings: [
                            { columnKey: primaryKeyName, allowFiltering: false }
                        ]
                    }
                ],
                enableTooltip: true,
                rowVirtualization: true,
                virtualization: true,
                virtualizationMode: 'continuous',
                primaryKey: primaryKeyName,
                dataSource: ds,
                columns: vm.logDataResultSubHeader
            });
        }

        public exportCsvF() {
            //CLI003: fix bug #108873, #108865
            const vm = this;
            const recordType = Number(vm.logTypeSelectedCode());
            const format = 'YYYY/MM/DD HH:mm:ss';
            if (recordType === RECORD_TYPE.DATA_STORAGE ||
                recordType === RECORD_TYPE.DATA_DELETION ||
                recordType === RECORD_TYPE.DATA_RECOVERY) {
                const LogDataParamsExport = {
                    systemType: Number(vm.systemTypeSelectedCode()),
                    recordType: Number(vm.logTypeSelectedCode()),
                    startDateOperator: moment.utc(vm.startDateOperator(), format).toISOString(),
                    endDateOperator: moment.utc(vm.endDateOperator(), format).toISOString(),
                    listOperatorEmployeeId: vm.operatorEmployeeIdList(),
                    listCondition: vm.filterLogSetting(),
                    lstHeaderDto: vm.logDataResultHeader.map(item => item.itemName).filter(item => item !== 'id' && item !== 'logNumber'),
                    lstSubHeaderDto: vm.logDataResultSubHeader.map(item => item.itemName).filter(item => item !== 'id' && item !== 'logNumber'),
                    lstSelectedItemHeader: vm.LogItemAllName
                }
                vm.$blockui('grayout');
                //CLI003: fix bug #108971, #108970
                service.exportCsvForDataResult(LogDataParamsExport).done(() => {
                }).always(() => {
                    vm.$blockui('clear');
                    vm.$errors('clear');
                });
            } else {
                const format = 'YYYY/MM/DD HH:mm:ss';
                const paramLog = {
                    listOperatorEmployeeId: vm.operatorEmployeeIdList(),
                    listTagetEmployeeId: vm.targetEmployeeIdList(),
                    startDateTaget: moment(vm.dateValue().startDate, "YYYY/MM/DD").toISOString(),
                    endDateTaget: moment(vm.dateValue().endDate, "YYYY/MM/DD").toISOString(),
                    startDateOperator: moment.utc(vm.startDateOperator(), format).toISOString(),
                    endDateOperator: moment.utc(vm.endDateOperator(), format).toISOString(),
                    recordType: vm.logTypeSelectedCode(),
                    targetDataType: vm.dataTypeSelectedCode(),
                    listLogSettingDto: vm.logSettingDto(),
                    listCondition: vm.filterLogSetting(),
                }
                if (vm.checkFormatDate() === '2') {
                    paramLog.endDateTaget = moment.utc(vm.dateValue().endDate, "YYYY/MM/DD").endOf('month').toISOString();
                } else {
                    paramLog.endDateTaget = moment.utc(vm.dateValue().endDate, "YYYY/MM/DD").toISOString();
                }
                const params = {
                    logParams: paramLog,
                    lstHeaderDto: vm.logDataResultHeader.map(item => item.itemName).filter(item => item !== 'parentKey' && item !== 'childrenKey'),
                    lstSubHeaderDto: vm.logDataResultSubHeader.map(item => item.itemName).filter(item => item !== 'parentKey' && item !== 'childrenKey'),
                    lstSelectedItemHeader: vm.LogItemAllName
                };
                vm.$blockui('grayout');
                service.logSettingExportCsv(params)
                    .always(() => {
                        vm.$blockui('clear');
                        vm.$errors('clear');
                    });
            }
        }

        //Back to screen B
        public previousScreenB() {
            const vm = this;
            vm.$jump("/view/cli/003/b/index.xhtml");
        }
    }
}
