var $ = window['$'], _ = window['_'], ko = window['ko'], nts = window['nts'], moment = window['moment'], __viewContext = window['__viewContext'];
var cps002;
(function (cps002) {
    var a;
    (function (a) {
        var vm;
        (function (vm_1) {
            var text = nts.uk.resource.getText;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var dialog = nts.uk.ui.dialog.info;
            var subModal = nts.uk.ui.windows.sub.modal;
            var jump = nts.uk.request.jump;
            var liveView = nts.uk.request.liveView;
            var character = nts.uk.characteristics;
            var lv = nts.layout.validate;
            var vc = nts.layout.validation;
            var permision = a.service.getCurrentEmpPermision;
            var alertError = nts.uk.ui.dialog.alertError;
            var alertWarning = nts.uk.ui.dialog.caution;
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    var _this = this;
                    this.date = ko.observable(moment().toDate());
                    this.createTypeList = ko.observableArray([
                        new BoxModel(1, text('CPS002_26')),
                        new BoxModel(2, text('CPS002_27')),
                        new BoxModel(3, text('CPS002_28'))
                    ]);
                    this.categoryList = ko.observableArray([]);
                    this.initValueList = ko.observableArray([]);
                    this.itemSettingList = ko.observableArray([]);
                    this.createTypeId = ko.observable(3);
                    this.currentEmployee = ko.observable(new Employee());
                    this.stampCardEditing = ko.observable({
                        method: EDIT_METHOD.PreviousZero,
                        digitsNumber: 20
                    });
                    this.categorySelectedCode = ko.observable('');
                    this.empRegHistory = ko.observable(null);
                    this.currentStep = ko.observable('CPS002_13');
                    this.initSettingSelectedCode = ko.observable('');
                    this.currentInitSetting = ko.observable(new InitSetting(null));
                    this.copyEmployee = ko.observable(new EmployeeCopy(null));
                    this.isAllowAvatarUpload = ko.observable(false);
                    this.currentUseSetting = ko.observable(null);
                    this.employeeBasicInfo = ko.observable(null);
                    this.layoutData = ko.observableArray([]);
                    this.listItemCls = ko.observableArray([]);
                    this.defaultImgId = ko.observable("");
                    this.subContraint = ko.observable('StampNumber');
                    // check quyen có thể setting copy 
                    this.enaBtnOpenFModal = ko.observable(true);
                    // check quyen có thể setting giá trị ban đầu nhập vào 
                    this.enaBtnOpenInitModal = ko.observable(true);
                    this.wrkPlaceStartDate = ko.observable("");
                    this.ccgcomponent = {
                        /** Common properties */
                        systemType: 1,
                        showEmployeeSelection: true,
                        showQuickSearchTab: false,
                        showAdvancedSearchTab: true,
                        showBaseDate: false,
                        showClosure: false,
                        showAllClosure: false,
                        showPeriod: false,
                        periodFormatYM: true,
                        /** Required parame*/
                        baseDate: moment.utc().toISOString(),
                        periodStartDate: moment.utc("1900/01/01", "YYYY/MM/DD").toISOString(),
                        periodEndDate: moment.utc("9999/12/31", "YYYY/MM/DD").toISOString(),
                        inService: true,
                        leaveOfAbsence: true,
                        closed: true,
                        retirement: false,
                        /** Quick search tab options */
                        showAllReferableEmployee: true,
                        showOnlyMe: true,
                        showSameWorkplace: true,
                        showSameWorkplaceAndChild: true,
                        /** Advanced search properties */
                        showEmployment: true,
                        showWorkplace: true,
                        showClassification: true,
                        showJobTitle: true,
                        showWorktype: false,
                        isMutipleCheck: false,
                        /** Return data */
                        returnDataFromCcg001: function (data) {
                            var self = _this;
                            self.copyEmployee(data.listEmployee[0]);
                        }
                    };
                    this.licenseCheck = ko.observable("");
                    this.licenseCheckDipslay = ko.observable(true);
                    this.classWarning = ko.observable("");
                    this.isFromCPS018 = ko.observable(false);
                    var self = this, employee = self.currentEmployee();
                    var params = getShared("CPS002A_PARAMS") || { isFromCPS018: false };
                    self.isFromCPS018(params.isFromCPS018);
                    nts.uk.sessionStorage.removeItem(nts.uk.request.STORAGE_KEY_TRANSFER_DATA);
                    self.createTypeId.subscribe(function (newValue) {
                        self.initValueList([]);
                        self.categoryList([]);
                        self.itemSettingList([]);
                        self.categorySelectedCode('');
                        self.initSettingSelectedCode('');
                        self.currentInitSetting(new InitSetting(null));
                        nts.uk.ui.errors.clearAll();
                        (nts.uk.ui._viewModel || {
                            kiban: {
                                errorDialogViewModel: {
                                    errors: {
                                        removeAll: function () { }
                                    }
                                }
                            }
                        }).kiban.errorDialogViewModel.errors.removeAll();
                    });
                    self.employeeBasicInfo.subscribe(function (data) {
                        if (data) {
                            employee.hireDate(data.jobEntryDate);
                            self.createTypeId(data.employeeCreationMethod);
                            var copyEmployeeId = data.copyEmployeeId;
                            if (copyEmployeeId != "" && copyEmployeeId != self.copyEmployee().employeeId) {
                                var command = {
                                    baseDate: moment().toDate(),
                                    employeeIds: [data.copyEmployeeId]
                                };
                                a.service.getEmployeeInfo(command).done(function (result) {
                                    self.copyEmployee(new EmployeeCopy(result[0]));
                                });
                            }
                        }
                    });
                    self.initSettingSelectedCode.subscribe(function (initCode) {
                        if (!_.isNil(initCode)) {
                            var InitSetting_1 = _.find(self.initValueList(), function (item) {
                                return item.itemCode == initCode;
                            });
                            if (InitSetting_1) {
                                var currentCtgCode_1 = self.categorySelectedCode();
                                a.service.getAllInitValueCtgSetting(InitSetting_1.itemId).done(function (result) {
                                    if (result.length) {
                                        self.categoryList(_.map(result, function (item) {
                                            return new CategoryItem(item);
                                        }));
                                        if (currentCtgCode_1 === "") {
                                            self.categorySelectedCode(result[0].categoryCd);
                                        }
                                        else {
                                            var currentCtg = _.find(result, function (item) {
                                                return item.categoryCd == currentCtgCode_1;
                                            });
                                            if (currentCtg) {
                                                self.categorySelectedCode.valueHasMutated();
                                            }
                                            else {
                                                self.categorySelectedCode(result[0].categoryCd);
                                            }
                                        }
                                    }
                                    else {
                                        self.categoryList.removeAll();
                                    }
                                });
                                self.currentInitSetting(InitSetting_1);
                            }
                        }
                    });
                    self.copyEmployee.subscribe(function (CopyEmployee) {
                        self.loadCopySettingItemData();
                    });
                    self.categorySelectedCode.subscribe(function (code) {
                        if (!_.isNil(code) && !_.isEmpty(code)) {
                            self.itemSettingList.removeAll();
                            if (self.createTypeId() === 2) {
                                var command = ko.toJS(employee);
                                command = _.omit(command, ['initSettingId', 'baseDate', 'categoryCd']);
                                command = _.extend(command, {
                                    categoryCd: code,
                                    baseDate: employee.hireDate(),
                                    initSettingId: self.currentInitSetting().itemId
                                });
                                a.service.getAllInitValueItemSetting(command).done(function (result) {
                                    if (result.length) {
                                        self.itemSettingList(_.map(result, function (item) {
                                            return new SettingItem(item);
                                        }));
                                    }
                                });
                            }
                            else {
                                self.loadCopySettingItemData();
                            }
                        }
                    });
                    employee.avatarCropedId.subscribe(function (avartarId) {
                        var self = _this, avartarContent = $("#employeeAvatar");
                        if (avartarId != "") {
                            avartarContent.empty()
                                .append($("<img>", {
                                id: "employeeAvatar",
                                src: liveView(avartarId),
                            }));
                            // remove background
                            $(".avatar").removeClass();
                        }
                        else {
                            avartarContent.empty();
                        }
                    });
                    employee.employeeCode.subscribe(function (employeeCode) {
                        var self = _this;
                        self.autoUpdateCardNo(employeeCode);
                    });
                    employee.cardNo.subscribe(function (cardNo) {
                        var ce = ko.toJS(self.stampCardEditing);
                        var emp = employee;
                        if (!!nts.uk.text.allHalfAlphanumeric(cardNo).probe) {
                            if (cardNo && cardNo.length <= ce.digitsNumber) {
                                switch (ce.method) {
                                    case EDIT_METHOD.PreviousZero: {
                                        emp.cardNo(_.padStart(cardNo, ce.digitsNumber, '0'));
                                        break;
                                    }
                                    case EDIT_METHOD.AfterZero: {
                                        emp.cardNo(_.padEnd(cardNo, ce.digitsNumber, '0'));
                                        break;
                                    }
                                    case EDIT_METHOD.PreviousSpace: {
                                        emp.cardNo(_.padStart(cardNo, ce.digitsNumber, ' '));
                                        break;
                                    }
                                    case EDIT_METHOD.AfterSpace: {
                                        emp.cardNo(_.padEnd(cardNo, ce.digitsNumber, ' '));
                                        break;
                                    }
                                }
                            }
                        }
                    });
                    // check quyen có thể setting copy hoặc setting init
                    permision().done(function (data) {
                        if (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].functionNo == FunctionNo.No9_Allow_SetCoppy) {
                                    if (data[i].available == false) {
                                        self.enaBtnOpenFModal(false);
                                    }
                                }
                                if (data[i].functionNo == FunctionNo.No10_Allow_SetInit) {
                                    if (data[i].available == false) {
                                        self.enaBtnOpenInitModal(false);
                                    }
                                }
                            }
                        }
                    });
                    self.checkLicense();
                    self.currentStep.subscribe(function (step) {
                        // clear all error when step change
                        nts.uk.ui.errors.clearAll();
                        (nts.uk.ui._viewModel || {
                            kiban: {
                                errorDialogViewModel: {
                                    errors: {
                                        removeAll: function () { }
                                    }
                                }
                            }
                        }).kiban.errorDialogViewModel.errors.removeAll();
                        switch (step) {
                            case 'CPS002_13':
                                $('#pg-name').text('CPS002A' + ' ' + text('CPS002_1'));
                                self.layoutData.removeAll();
                                self.listItemCls.removeAll();
                                break;
                            case 'CPS002_14':
                                if (ko.toJS(self.createTypeId) === 1) {
                                    //start Screen B
                                    //Set name Screen B　#CPS002_2
                                    $('#pg-name').text('CPS002B' + ' ' + text('CPS002_2'));
                                    // init ccg component
                                    var sto_1 = setTimeout(function () {
                                        $('#ccgcomponent').ntsGroupComponent(self.ccgcomponent).done(function () {
                                            self.loadCopySettingCtgData();
                                        });
                                        clearTimeout(sto_1);
                                    }, 100);
                                }
                                else {
                                    //start Screen C
                                    //Set name Screen C　#CPS002_3
                                    $('#pg-name').text('CPS002C' + ' ' + text('CPS002_3'));
                                    self.loadInitSettingData();
                                }
                                self.layoutData.removeAll();
                                self.listItemCls.removeAll();
                                $('#combo-box').focus();
                                break;
                            case 'CPS002_15':
                                var command = ko.toJS(employee);
                                $('#pg-name').text('CPS002D' + ' ' + text('CPS002_4'));
                                //add atr
                                command.employeeCopyId = self.copyEmployee().employeeId;
                                command.initSettingId = self.currentInitSetting().itemId;
                                command.createType = self.createTypeId();
                                a.service.getLayoutByCreateType(command).done(function (data) {
                                    self.listItemCls(data.itemsClassification || []);
                                    self.wrkPlaceStartDate(data.wrkPlaceStartDate);
                                    if (self.listItemCls().length > 0) {
                                        new vc(self.listItemCls());
                                    }
                                });
                                // check quyen có thể upload Avatar duoc khong
                                permision().done(function (data) {
                                    if (data) {
                                        for (var i = 0; i < data.length; i++) {
                                            if (data[i].functionNo == FunctionNo.No2_Allow_UploadAva) {
                                                self.isAllowAvatarUpload(!!data[i].available);
                                            }
                                        }
                                    }
                                });
                                break;
                        }
                    });
                    self.currentStep.valueHasMutated();
                    self.start();
                }
                ViewModel.prototype.loadCopySettingItemData = function () {
                    var self = this, step = ko.toJS(self.currentStep), currentCopyEmployeeId = self.copyEmployee().employeeId, categorySelectedCode = self.categorySelectedCode(), baseDate = self.currentEmployee().hireDate();
                    if (step == 'CPS002_14') {
                        if (!_.isNil(currentCopyEmployeeId) && !_.isNil(categorySelectedCode)) {
                            a.service.getAllCopySettingItem(currentCopyEmployeeId, categorySelectedCode, baseDate).done(function (result) {
                                if (result.length) {
                                    self.itemSettingList(_.map(result, function (item) {
                                        return new SettingItem(item);
                                    }));
                                }
                            }).fail(function (error) {
                                dialog({ messageId: error.message });
                            });
                        }
                    }
                };
                ViewModel.prototype.logMouseOver = function () {
                    var self = this;
                    self.autoUpdateCardNo(self.currentEmployee().employeeCode());
                };
                ViewModel.prototype.autoUpdateCardNo = function (employeeCode) {
                    var self = this, employee = self.currentEmployee(), userSetting = self.currentUseSetting(), maxLengthCardNo = ko.toJS(self.stampCardEditing).digitsNumber;
                    if (!userSetting || !(ko.toJS(employee) || {}).cardNo) {
                        return;
                    }
                    switch (userSetting.cardNumberType) {
                        case CardNoValType.SAME_AS_EMP_CODE:
                            if (employeeCode.length <= maxLengthCardNo) {
                                employee.cardNo(employeeCode);
                            }
                            break;
                        case CardNoValType.CPC_AND_EMPC:
                            var newCardNo = __viewContext.user.companyCode + (ko.toJS(employee) || {}).employeeCode;
                            if (newCardNo.length <= maxLengthCardNo) {
                                employee.cardNo(newCardNo);
                            }
                            break;
                        default:
                            break;
                    }
                };
                ViewModel.prototype.start = function () {
                    var self = this;
                    var vm = new ko.ViewModel();
                    self.currentEmployee().clearData();
                    setShared("imageId", null);
                    setShared("CPS002A", null);
                    self.defaultImgId("");
                    a.service.getStamCardEdit().done(function (data) {
                        self.stampCardEditing(data);
                        _.set(__viewContext, 'primitiveValueConstraints.StampNumber.maxLength', data.digitsNumber);
                        self.subContraint.valueHasMutated();
                        vm.$window.storage('NewEmployeeBasicInfo')
                            .then(function (data) {
                            {
                                // self.employeeBasicInfo(data);
                                $('#contents-area').removeClass('hidden');
                                self.getLayout();
                                self.employeeBasicInfo(data);
                            }
                        });
                    });
                };
                ViewModel.prototype.getLayout = function () {
                    var self = this;
                    a.service.getLayout().done(function (layout) {
                        if (layout) {
                            a.service.getUserSetting().done(function (userSetting) {
                                if (userSetting) {
                                    a.service.getInitEmployeeCode().done(function (empCode) {
                                        // get employee code
                                        self.currentEmployee().employeeCode(empCode);
                                        // get card number
                                        self.initStampCard(empCode);
                                    }).fail(function (error) {
                                        self.initStampCard("");
                                    });
                                }
                                self.currentUseSetting(new UserSetting(userSetting));
                                self.getLastRegHistory(userSetting);
                                $("#hireDate").focus();
                            }).always(function () {
                                // show content
                                $('#contents-area').css('visibility', 'visible');
                            });
                        }
                        else {
                            dialog({ messageId: "Msg_344" }).then(function () {
                                //move to toppage
                                jump('/view/cps/007/a/index.xhtml');
                            });
                        }
                    });
                };
                ViewModel.prototype.getLastRegHistory = function (userSetting) {
                    var self = this, showHistory = !userSetting ? true : userSetting.recentRegistrationType === 1 ? true : false;
                    if (showHistory) {
                        a.service.getLastRegHistory().done(function (result) {
                            if (result) {
                                self.empRegHistory(new EmpRegHistory(result));
                            }
                        });
                    }
                    else {
                        self.empRegHistory(null);
                    }
                };
                ViewModel.prototype.initStampCard = function (newEmployeeCode) {
                    var self = this, ce = ko.toJS(self.stampCardEditing);
                    a.service.getInitCardNumber(newEmployeeCode).done(function (value) {
                        if (value && value.length <= ce.digitsNumber) {
                            self.currentEmployee().cardNo(value);
                        }
                        else {
                            self.currentEmployee().cardNo("");
                        }
                    });
                };
                ViewModel.prototype.isError = function () {
                    var self = this;
                    if (self.currentStep() == 'CPS002_15') {
                        var controls = self.listItemCls();
                        lv.checkError(controls);
                    }
                    else {
                        $(".form_step1").trigger("validate");
                    }
                    if (nts.uk.ui.errors.hasError()) {
                        return true;
                    }
                    return false;
                };
                ViewModel.prototype.completeStep0 = function () {
                    var self = this, ctyp = ko.toJS(self.createTypeId), employee = self.currentEmployee(), command = {
                        EmployeeCode: employee.employeeCode(),
                        cardNo: employee.cardNo(),
                        LoginId: employee.loginId(),
                        employeeName: employee.employeeName(),
                        password: employee.password()
                    };
                    if (!self.isError()) {
                        a.service.validateEmpInfo(command).done(function () {
                            if ([1, 2].indexOf(ctyp) > -1) {
                                self.currentStep('CPS002_14');
                            }
                            else {
                                self.currentStep('CPS002_15');
                            }
                        }).fail(function (error) {
                            switch (error.messageId) {
                                case "Msg_345":
                                    $('#employeeCode').ntsError('set', error);
                                    break;
                                case "Msg_924":
                                    $('#employeeName').ntsError('set', error);
                                    break;
                                case "Msg_757":
                                    $('#loginId').ntsError('set', error);
                                    break;
                                case "Msg_346":
                                    $('#cardNumber').ntsError('set', error);
                                    break;
                                default:
                                    if (error.errors && error.errors.length > 1) {
                                        error.errors.forEach(function (err) {
                                            $('#password').ntsError('set', err);
                                        });
                                    }
                                    else {
                                        $('#password').ntsError('set', error);
                                    }
                                    break;
                            }
                        });
                    }
                };
                ViewModel.prototype.getUserSetting = function () {
                    var self = this, dfd = $.Deferred();
                    a.service.getUserSetting().done(function (result) {
                        if (!result) {
                            self.currentEmployee().employeeCode("");
                            self.currentEmployee().cardNo("");
                        }
                        dfd.resolve();
                    });
                    return dfd.promise();
                };
                ViewModel.prototype.completeStep1 = function () {
                    var self = this, cep = ko.toJS(self.copyEmployee), iui = ko.toJS(self.createTypeId() === 2), issc = ko.toJS(self.initSettingSelectedCode);
                    if (cep.employeeId === '' && !iui) {
                        dialog({ messageId: "Msg_349" });
                        return;
                    }
                    if (iui && _.isNil(issc)) {
                        dialog({ messageId: "Msg_356" });
                        return;
                    }
                    self.currentStep('CPS002_15');
                };
                ViewModel.prototype.loadCopySettingCtgData = function () {
                    var self = this;
                    self.categoryList.removeAll();
                    a.service.getCopySetting().done(function (result) {
                        if (result.length > 0) {
                            self.categoryList(_.map(result, function (item) {
                                return new CategoryItem(item);
                            }));
                            self.categorySelectedCode(result[0].code);
                        }
                    }).fail(function (error) {
                        dialog({ messageId: error.message }).then(function () {
                            self.currentStep('CPS002_13');
                        });
                    });
                };
                ViewModel.prototype.loadInitSettingData = function () {
                    var self = this;
                    self.initValueList.removeAll();
                    a.service.getAllInitValueSetting().done(function (result) {
                        if (result.length) {
                            self.initValueList(_.map(result, function (item) {
                                return new InitSetting(item);
                            }));
                            self.initSettingSelectedCode.valueHasMutated();
                            if (self.initSettingSelectedCode() == '') {
                                if (self.employeeBasicInfo() && _.find(result, ['settingCode', self.employeeBasicInfo().initialValueCode])) {
                                    self.initSettingSelectedCode(self.employeeBasicInfo().initialValueCode);
                                }
                                else {
                                    self.initSettingSelectedCode(result[0].settingCode);
                                }
                            }
                            else {
                                if (!_.find(result, function (ctg) { return self.initSettingSelectedCode() == ctg.settingCode; })) {
                                    self.initSettingSelectedCode(result[0].settingCode);
                                }
                                else {
                                    self.initSettingSelectedCode.valueHasMutated();
                                }
                            }
                            $("#initSearchBox input").focus();
                        }
                    }).fail(function (error) {
                        dialog({ messageId: error.message }).then(function () {
                            self.currentStep('CPS002_13');
                        });
                    }).always(function () {
                        $('#search_box').show();
                    });
                };
                ViewModel.prototype.prev = function () {
                    var self = this, step = ko.toJS(self.currentStep), ctyp = ko.toJS(self.createTypeId);
                    nts.uk.ui.errors.clearAll();
                    (nts.uk.ui._viewModel || {
                        kiban: {
                            errorDialogViewModel: {
                                errors: {
                                    removeAll: function () { }
                                }
                            }
                        }
                    }).kiban.errorDialogViewModel.errors.removeAll();
                    self.listItemCls.removeAll();
                    setShared("CPS002A", null);
                    setShared("imageId", null);
                    self.defaultImgId("");
                    if (['CPS002_14'].indexOf(step) > -1) {
                        self.currentStep('CPS002_13');
                    }
                    else {
                        if ([1, 2].indexOf(ctyp) > -1) {
                            self.currentStep('CPS002_14');
                        }
                        else {
                            self.currentStep('CPS002_13');
                        }
                    }
                };
                ViewModel.prototype.saveBasicInfo = function (command, employeeId) {
                    var self = this, isInit = self.createTypeId() === 2, currentEmpInfo = self.employeeBasicInfo(), newEmpInfo = {
                        copyEmployeeId: command.employeeCopyId,
                        jobEntryDate: command.hireDate,
                        initialValueCode: self.initSettingSelectedCode(),
                        employeeID: employeeId,
                        employeeCreationMethod: self.createTypeId()
                    };
                    if (currentEmpInfo) {
                        if (isInit) {
                            newEmpInfo.copyEmployeeId = newEmpInfo.copyEmployeeId == '' ? currentEmpInfo.copyEmployeeId : newEmpInfo.copyEmployeeId;
                        }
                        else {
                            newEmpInfo.initialValueCode = newEmpInfo.initialValueCode == '' ? currentEmpInfo.initialValueCode : newEmpInfo.initialValueCode;
                        }
                    }
                    character.save('NewEmployeeBasicInfo', newEmpInfo);
                };
                ViewModel.prototype.finish = function () {
                    var self = this, command = ko.toJS(self.currentEmployee());
                    //add atr
                    command.employeeCopyId = self.copyEmployee().employeeId;
                    command.initSettingId = self.currentInitSetting().itemId;
                    // reload data
                    self.layoutData.refresh();
                    command.inputs = self.layoutData();
                    command.createType = self.createTypeId();
                    command.categoryName = nts.uk.resource.getText("CPS001_152");
                    command.itemName = nts.uk.resource.getText("CPS001_150");
                    if (!self.isError()) {
                        a.service.addNewEmployee(command).done(function (employeeId) {
                            self.saveBasicInfo(command, employeeId);
                            nts.uk.ui.windows.sub.modal('/view/cps/002/h/index.xhtml', { dialogClass: "finish", title: '' }).onClosed(function () {
                                if (getShared('isContinue')) {
                                    self.checkLicense();
                                    self.currentStep('CPS002_13');
                                    self.start();
                                    self.getUserSetting();
                                }
                                else {
                                    jump('/view/cps/001/a/index.xhtml', { employeeId: employeeId });
                                }
                            });
                        }).fail(function (error) {
                            alertError({ messageId: error.messageId, messageParams: error.parameterIds });
                        });
                    }
                };
                ViewModel.prototype.openEModal = function (param, data) {
                    var self = __viewContext['viewModel'], isCardNoMode = param === 'true' ? true : false, useSetting = self.currentUseSetting(), employee = self.currentEmployee();
                    setShared("empCodeMode", isCardNoMode);
                    subModal('/view/cps/002/e/index.xhtml', { title: '' }).onClosed(function () {
                        var result = getShared("CPS002_PARAM_MODE_EMP_CODE"), currentEmp = self.currentEmployee();
                        if (result) {
                            $("#employeeCode").ntsError("clear");
                            if (param === isCardNoMode) {
                                currentEmp.cardNo(result);
                                currentEmp.cardNo.valueHasMutated();
                            }
                            else {
                                currentEmp.employeeCode(result);
                                currentEmp.employeeCode.valueHasMutated();
                            }
                        }
                    });
                };
                ViewModel.prototype.openJModal = function (param, data) {
                    var self = __viewContext['viewModel'], isCardNoMode = param === 'true' ? true : false, useSetting = self.currentUseSetting(), employee = self.currentEmployee();
                    setShared("cardNoMode", isCardNoMode);
                    subModal('/view/cps/002/j/index.xhtml', { title: '' }).onClosed(function () {
                        var result = getShared("CPS002_PARAM_MODE_CARDNO"), currentEmp = self.currentEmployee();
                        if (result) {
                            $("#cardNumber").ntsError("clear");
                            currentEmp.cardNo(result);
                            currentEmp.cardNo.valueHasMutated();
                        }
                    });
                };
                ViewModel.prototype.openFModal = function () {
                    subModal('/view/cps/002/f/index.xhtml', { title: '' }).onClosed(function () { });
                };
                ViewModel.prototype.openGModal = function () {
                    var self = this;
                    subModal('/view/cps/002/g/index.xhtml', { title: '' }).onClosed(function () {
                        if (getShared("userSettingStatus")) {
                            a.service.getUserSetting().done(function (result) {
                                self.currentUseSetting(new UserSetting(result));
                                self.getLastRegHistory(result);
                            });
                        }
                    });
                };
                ViewModel.prototype.openIModal = function () {
                    var self = this, avatarId = self.defaultImgId(), employee = self.currentEmployee();
                    if (avatarId != "") {
                        setShared("CPS002A", avatarId);
                    }
                    if (self.isAllowAvatarUpload()) {
                        setShared("openIDialog", employee.avatarOrgId());
                        subModal('/view/cps/002/i/index.xhtml', { title: '' }).onClosed(function () {
                            var dataShare = getShared("imageId");
                            if (dataShare) {
                                employee.avatarOrgId(dataShare.imageOriginalId);
                                employee.avatarCropedId(dataShare.imageCropedId);
                                employee.fileName(dataShare.fileName);
                                self.defaultImgId(dataShare.imageOriginalId);
                            }
                        });
                    }
                };
                ViewModel.prototype.openInitModal = function () {
                    subModal('/view/cps/009/a/index.xhtml', { title: '', height: 680, width: 1250 }).onClosed(function () { });
                };
                ViewModel.prototype.checkLicense = function () {
                    var self = this;
                    a.service.licenseCheck().done(function (data) {
                        self.licenseCheck(text("CPS001_154", [data.registered, data.maxRegistered]));
                        self.licenseCheckDipslay(data.display);
                        if (!!data.message) {
                            self.classWarning('color-schedule-error');
                            alertWarning({ messageId: data.message, messageParams: [data.canBeRegistered] }).then(function () {
                                if (data.message === 'Msg_1370') {
                                    jump('/view/ccg/008/a/index.xhtml');
                                }
                            });
                        }
                        else {
                            self.classWarning('');
                        }
                    });
                };
                return ViewModel;
            }());
            vm_1.ViewModel = ViewModel;
            var BoxModel = /** @class */ (function () {
                function BoxModel(id, name) {
                    var self = this;
                    self.id = id;
                    self.name = name;
                }
                return BoxModel;
            }());
            var Employee = /** @class */ (function () {
                function Employee() {
                    this.employeeName = ko.observable("");
                    this.employeeCode = ko.observable("");
                    this.hireDate = ko.observable(moment().toDate());
                    this.cardNo = ko.observable("");
                    this.loginId = ko.observable("");
                    this.password = ko.observable("");
                    this.avatarOrgId = ko.observable("");
                    this.avatarCropedId = ko.observable("");
                    this.categoryName = ko.observable("");
                    this.itemName = ko.observable("");
                    this.fileName = ko.observable("");
                }
                Employee.prototype.clearData = function () {
                    var self = this;
                    self.employeeName("");
                    self.employeeCode("");
                    self.loginId("");
                    self.cardNo("");
                    self.password("");
                    self.avatarOrgId("");
                    self.avatarCropedId("");
                    self.categoryName("");
                    self.itemName("");
                    self.fileName("");
                };
                return Employee;
            }());
            var EmployeeCopy = /** @class */ (function () {
                function EmployeeCopy(param) {
                    this.employeeId = param ? param.employeeId : '';
                    this.employeeName = param ? param.employeeName : '';
                    this.employeeCode = param ? param.employeeCode : '';
                    this.workplaceCode = param ? param.workplaceCode : '';
                    this.workplaceId = param ? param.workplaceId : '';
                    this.workplaceName = param ? param.workplaceName : '';
                }
                return EmployeeCopy;
            }());
            var InitSetting = /** @class */ (function () {
                function InitSetting(param) {
                    this.itemId = '';
                    this.itemCode = '';
                    this.itemName = '';
                    this.itemId = param ? param.settingId ? param.settingId : param.employeeId : '';
                    this.itemCode = param ? param.settingCode ? param.settingCode : param.employeeCode : '';
                    this.itemName = param ? param.settingName ? param.settingName : param.employeeName : '';
                }
                return InitSetting;
            }());
            var CategoryItem = /** @class */ (function () {
                function CategoryItem(param) {
                    this.code = param ? param.categoryCd ? param.categoryCd : param.code : '';
                    this.name = param ? param.categoryName ? param.categoryName : param.name : '';
                }
                return CategoryItem;
            }());
            var UserSetting = /** @class */ (function () {
                function UserSetting(param) {
                    this.employeeCodeType = param ? param.employeeCodeType : 0;
                    this.recentRegistrationType = param ? param.recentRegistrationType : 0;
                    this.cardNumberType = param ? param.cardNumberType : 0;
                    this.employeeCodeLetter = param ? param.employeeCodeLetter : "";
                    this.cardNumberLetter = param ? param.cardNumberLetter : "";
                }
                return UserSetting;
            }());
            var SettingItem = /** @class */ (function () {
                function SettingItem(param) {
                    this.itemCode = param ? param.itemCode : '';
                    this.itemName = param ? param.itemName : '';
                    this.isRequired = param ? param.isRequired : 0;
                    this.saveData = param ? param.saveData : null;
                    this.dataType = param ? param.dataType : '';
                    this.dateType = param ? param.dateType : '';
                    this.saveData.value = this.genString(this);
                }
                SettingItem.prototype.genString = function (item) {
                    if (item.dataType === "DATE" && item.saveData.value) {
                        return this.genDateString(item.saveData.value, item.dateType);
                    }
                    if (item.dataType === "TIME" && item.saveData.value) {
                        return nts.uk.time.parseTime(item.saveData.value, true).format();
                    }
                    if (item.dataType === "TIMEPOINT" && item.saveData.value) {
                        return window['nts']['uk']['time']['minutesBased']['clock']['dayattr']['create'](item.saveData.value).fullText;
                    }
                    return item.saveData.value;
                };
                SettingItem.prototype.genDateString = function (value, dateType) {
                    var formatString = "yyyy/MM/dd";
                    switch (dateType) {
                        case "YEARMONTHDAY":
                            formatString = "yyyy/MM/dd";
                            break;
                        case "YEARMONTH":
                            formatString = "yyyy/MM";
                            break;
                        case "YEAR":
                            formatString = "yyyy";
                            break;
                    }
                    return nts.uk.time.formatDate(new Date(value), formatString);
                };
                return SettingItem;
            }());
            var EmpRegHistory = /** @class */ (function () {
                function EmpRegHistory(param) {
                    this.lastRegEmployee = ko.observable(null);
                    this.lastRegEmployeeOfCompany = ko.observable(null);
                    this.lastRegEmployee(param ? param.lastRegEmployee : null);
                    this.lastRegEmployeeOfCompany(param ? param.lastRegEmployeeOfCompany : null);
                }
                return EmpRegHistory;
            }());
            var IEmployeeBasicInfo = /** @class */ (function () {
                function IEmployeeBasicInfo() {
                }
                return IEmployeeBasicInfo;
            }());
            var RegEmployee = /** @class */ (function () {
                function RegEmployee(employeeCd, employeeName) {
                    this.employeeCd = employeeCd;
                    this.employeeName = employeeName;
                }
                return RegEmployee;
            }());
            var EDIT_METHOD;
            (function (EDIT_METHOD) {
                EDIT_METHOD[EDIT_METHOD["PreviousZero"] = 1] = "PreviousZero";
                EDIT_METHOD[EDIT_METHOD["AfterZero"] = 2] = "AfterZero";
                EDIT_METHOD[EDIT_METHOD["PreviousSpace"] = 3] = "PreviousSpace";
                EDIT_METHOD[EDIT_METHOD["AfterSpace"] = 4] = "AfterSpace";
            })(EDIT_METHOD || (EDIT_METHOD = {}));
            var CardNoValType;
            (function (CardNoValType) {
                //頭文字指定 (InitialDesignation)
                CardNoValType[CardNoValType["INIT_DESIGNATION"] = 1] = "INIT_DESIGNATION";
                //空白 (Blank)
                CardNoValType[CardNoValType["BLANK"] = 2] = "BLANK";
                //社員コードと同じ (SameAsEmployeeCode)
                CardNoValType[CardNoValType["SAME_AS_EMP_CODE"] = 3] = "SAME_AS_EMP_CODE";
                //最大値 (MaxValue)
                CardNoValType[CardNoValType["MAXVALUE"] = 4] = "MAXVALUE";
                //会社コード＋社員コード (CompanyCodeAndEmployeeCode)
                CardNoValType[CardNoValType["CPC_AND_EMPC"] = 5] = "CPC_AND_EMPC";
            })(CardNoValType || (CardNoValType = {}));
            var POSITION;
            (function (POSITION) {
                POSITION[POSITION["Previous"] = 0] = "Previous";
                POSITION[POSITION["After"] = 1] = "After";
            })(POSITION || (POSITION = {}));
            var FunctionNo;
            (function (FunctionNo) {
                FunctionNo[FunctionNo["No1_Allow_DelEmp"] = 1] = "No1_Allow_DelEmp";
                FunctionNo[FunctionNo["No2_Allow_UploadAva"] = 2] = "No2_Allow_UploadAva";
                FunctionNo[FunctionNo["No3_Allow_RefAva"] = 3] = "No3_Allow_RefAva";
                FunctionNo[FunctionNo["No4_Allow_UploadMap"] = 4] = "No4_Allow_UploadMap";
                FunctionNo[FunctionNo["No5_Allow_RefMap"] = 5] = "No5_Allow_RefMap";
                FunctionNo[FunctionNo["No6_Allow_UploadDoc"] = 6] = "No6_Allow_UploadDoc";
                FunctionNo[FunctionNo["No7_Allow_RefDoc"] = 7] = "No7_Allow_RefDoc";
                FunctionNo[FunctionNo["No8_Allow_Print"] = 8] = "No8_Allow_Print";
                FunctionNo[FunctionNo["No9_Allow_SetCoppy"] = 9] = "No9_Allow_SetCoppy";
                FunctionNo[FunctionNo["No10_Allow_SetInit"] = 10] = "No10_Allow_SetInit";
                FunctionNo[FunctionNo["No11_Allow_SwitchWpl"] = 11] = "No11_Allow_SwitchWpl"; // Lọc chọn lựa phòng ban trực thuộc/workplace trực tiếp theo bộ phận liên kết cấp dưới tại đăng ký thông tin cá nhân
            })(FunctionNo || (FunctionNo = {}));
        })(vm = a.vm || (a.vm = {}));
    })(a = cps002.a || (cps002.a = {}));
})(cps002 || (cps002 = {}));
//# sourceMappingURL=cps002.a.vm.js.map