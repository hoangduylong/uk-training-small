var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm018;
                (function (cmm018) {
                    var shr;
                    (function (shr) {
                        var servicebase = cmm018.shr.servicebase;
                        var vmbase;
                        (function (vmbase) {
                            //data register
                            var DataResigterDto = /** @class */ (function () {
                                function DataResigterDto(systemAtr, rootType, checkAddHist, workpplaceId, employeeId, startDate, endDate, addHist, lstAppType, root, checkMode) {
                                    this.systemAtr = systemAtr;
                                    this.rootType = rootType;
                                    this.checkAddHist = checkAddHist;
                                    this.workpplaceId = workpplaceId;
                                    this.employeeId = employeeId;
                                    this.startDate = startDate;
                                    this.endDate = endDate;
                                    this.addHist = addHist;
                                    this.lstAppType = lstAppType;
                                    this.root = root;
                                    this.checkMode = checkMode;
                                }
                                return DataResigterDto;
                            }());
                            vmbase.DataResigterDto = DataResigterDto;
                            //data root delete
                            var DataDeleteDto = /** @class */ (function () {
                                function DataDeleteDto(approvalId, historyId) {
                                    this.approvalId = approvalId;
                                    this.historyId = historyId;
                                }
                                return DataDeleteDto;
                            }());
                            vmbase.DataDeleteDto = DataDeleteDto;
                            //data after grouping history (get from db)
                            var DataFullDto = /** @class */ (function () {
                                function DataFullDto() {
                                }
                                return DataFullDto;
                            }());
                            vmbase.DataFullDto = DataFullDto;
                            //data after grouping history of company
                            var DataDisplayComDto = /** @class */ (function () {
                                function DataDisplayComDto() {
                                }
                                return DataDisplayComDto;
                            }());
                            vmbase.DataDisplayComDto = DataDisplayComDto;
                            //data after grouping history of work place
                            var DataDisplayWpDto = /** @class */ (function () {
                                function DataDisplayWpDto() {
                                }
                                return DataDisplayWpDto;
                            }());
                            vmbase.DataDisplayWpDto = DataDisplayWpDto;
                            //data after grouping history of person
                            var DataDisplayPsDto = /** @class */ (function () {
                                function DataDisplayPsDto() {
                                }
                                return DataDisplayPsDto;
                            }());
                            vmbase.DataDisplayPsDto = DataDisplayPsDto;
                            //app type
                            var ApplicationType = /** @class */ (function () {
                                function ApplicationType(value, localizedName, employRootAtr, lowerApprove) {
                                    this.value = value;
                                    this.localizedName = localizedName;
                                    this.employRootAtr = employRootAtr;
                                    this.lowerApprove = lowerApprove;
                                }
                                return ApplicationType;
                            }());
                            vmbase.ApplicationType = ApplicationType;
                            //screenA
                            var ListHistory = /** @class */ (function () {
                                function ListHistory(id, dateRange, startDate, endDate, overLap) {
                                    this.id = id;
                                    this.dateRange = dateRange;
                                    this.startDate = startDate;
                                    this.endDate = endDate;
                                    this.overLap = overLap;
                                }
                                return ListHistory;
                            }());
                            vmbase.ListHistory = ListHistory;
                            //screenA
                            var ListApproval = /** @class */ (function () {
                                function ListApproval(approvalId, name, lstApprover) {
                                    var self = this;
                                    this.approvalId = approvalId;
                                    self.name = name;
                                    self.lstApprover = lstApprover;
                                }
                                return ListApproval;
                            }());
                            vmbase.ListApproval = ListApproval;
                            //ScreenI
                            var IData = /** @class */ (function () {
                                function IData(startDate, startDateOld, check, mode, copyDataFlag, lstAppType, overLap) {
                                    this.startDate = startDate;
                                    this.startDateOld = startDateOld;
                                    this.check = check;
                                    this.mode = mode;
                                    this.copyDataFlag = copyDataFlag;
                                    this.lstAppType = lstAppType;
                                    this.overLap = overLap;
                                }
                                return IData;
                            }());
                            vmbase.IData = IData;
                            //ScreenJ
                            var JData = /** @class */ (function () {
                                function JData(startDate, endDate, workplaceId, employeeId, check, editOrDelete, startDatePrevious, lstUpdate, checkMode, sysAtr) {
                                    this.startDate = startDate;
                                    this.endDate = endDate;
                                    this.workplaceId = workplaceId;
                                    this.employeeId = employeeId;
                                    this.check = check;
                                    this.editOrDelete = editOrDelete;
                                    this.startDatePrevious = startDatePrevious;
                                    this.lstUpdate = lstUpdate;
                                    this.checkMode = checkMode;
                                    this.sysAtr = sysAtr;
                                }
                                return JData;
                            }());
                            vmbase.JData = JData;
                            //ScreenJ
                            var UpdateHistoryDto = /** @class */ (function () {
                                function UpdateHistoryDto(approvalId, historyId, applicationType, employRootAtr) {
                                    this.approvalId = approvalId;
                                    this.historyId = historyId;
                                    this.applicationType = applicationType;
                                    this.employRootAtr = employRootAtr;
                                }
                                return UpdateHistoryDto;
                            }());
                            vmbase.UpdateHistoryDto = UpdateHistoryDto;
                            //data screen A,C,E
                            var CommonApprovalRootDto = /** @class */ (function () {
                                function CommonApprovalRootDto() {
                                }
                                return CommonApprovalRootDto;
                            }());
                            vmbase.CommonApprovalRootDto = CommonApprovalRootDto;
                            //data screen A
                            var CompanyAppRootDto = /** @class */ (function () {
                                function CompanyAppRootDto() {
                                }
                                return CompanyAppRootDto;
                            }());
                            vmbase.CompanyAppRootDto = CompanyAppRootDto;
                            var DataTreeB = /** @class */ (function () {
                                function DataTreeB(approvalId, nameAppType, lstbyApp) {
                                    this.approvalId = approvalId;
                                    this.nameAppType = nameAppType;
                                    this.lstbyApp = lstbyApp;
                                }
                                return DataTreeB;
                            }());
                            vmbase.DataTreeB = DataTreeB;
                            //data check list left view model B
                            var DataCheckModeB = /** @class */ (function () {
                                function DataCheckModeB(approvalId, startDate, endDate, applicationType, confirmationRootType, employmentRootAtr) {
                                    this.approvalId = approvalId;
                                    this.startDate = startDate;
                                    this.endDate = endDate;
                                    this.applicationType = applicationType;
                                    this.confirmationRootType = confirmationRootType;
                                    this.employmentRootAtr = employmentRootAtr;
                                }
                                return DataCheckModeB;
                            }());
                            vmbase.DataCheckModeB = DataCheckModeB;
                            var DataTree = /** @class */ (function () {
                                function DataTree(approvalId, nameAppType, employmentRootAtr, lstbyApp) {
                                    this.approvalId = approvalId;
                                    this.nameAppType = nameAppType;
                                    this.employmentRootAtr = employmentRootAtr;
                                    this.lstbyApp = lstbyApp;
                                }
                                return DataTree;
                            }());
                            vmbase.DataTree = DataTree;
                            var Com = /** @class */ (function () {
                                function Com(approvalId, nameAppType, employmentRootAtr) {
                                    this.nameAppType = nameAppType;
                                    this.approvalId = approvalId;
                                    this.employmentRootAtr = employmentRootAtr;
                                }
                                return Com;
                            }());
                            vmbase.Com = Com;
                            //data display
                            var ComRootDto = /** @class */ (function () {
                                function ComRootDto(name, company, lstAppPhase) {
                                    this.name = name;
                                    this.company = company;
                                    this.lstAppPhase = lstAppPhase;
                                }
                                return ComRootDto;
                            }());
                            vmbase.ComRootDto = ComRootDto;
                            //list display right
                            var CompanyAppRootADto = /** @class */ (function () {
                                function CompanyAppRootADto(color, employRootAtr, appTypeValue, appTypeName, approvalId, historyId, branchId, appPhase1, appPhase2, appPhase3, appPhase4, appPhase5) {
                                    this.color = color;
                                    this.employRootAtr = employRootAtr;
                                    this.appTypeValue = appTypeValue;
                                    this.appTypeName = appTypeName;
                                    this.approvalId = approvalId;
                                    this.historyId = historyId;
                                    this.branchId = branchId;
                                    this.appPhase1 = appPhase1;
                                    this.appPhase2 = appPhase2;
                                    this.appPhase3 = appPhase3;
                                    this.appPhase4 = appPhase4;
                                    this.appPhase5 = appPhase5;
                                }
                                return CompanyAppRootADto;
                            }());
                            vmbase.CompanyAppRootADto = CompanyAppRootADto;
                            //list check root < 14
                            var DataRootCheck = /** @class */ (function () {
                                function DataRootCheck(approvalId, historyId, applicationType, employmentRootAtr, branchId, lstAppPhase) {
                                    this.approvalId = approvalId;
                                    this.historyId = historyId;
                                    this.applicationType = applicationType;
                                    this.employmentRootAtr = employmentRootAtr;
                                    this.branchId = branchId;
                                    this.lstAppPhase = lstAppPhase;
                                }
                                return DataRootCheck;
                            }());
                            vmbase.DataRootCheck = DataRootCheck;
                            //data screen C
                            var WorkPlaceAppRootDto = /** @class */ (function () {
                                function WorkPlaceAppRootDto() {
                                }
                                return WorkPlaceAppRootDto;
                            }());
                            vmbase.WorkPlaceAppRootDto = WorkPlaceAppRootDto;
                            //data screen E
                            var PersonAppRootDto = /** @class */ (function () {
                                function PersonAppRootDto() {
                                }
                                return PersonAppRootDto;
                            }());
                            vmbase.PersonAppRootDto = PersonAppRootDto;
                            var ComApprovalRootDto = /** @class */ (function () {
                                function ComApprovalRootDto() {
                                }
                                return ComApprovalRootDto;
                            }());
                            vmbase.ComApprovalRootDto = ComApprovalRootDto;
                            var WpApprovalRootDto = /** @class */ (function () {
                                function WpApprovalRootDto() {
                                }
                                return WpApprovalRootDto;
                            }());
                            vmbase.WpApprovalRootDto = WpApprovalRootDto;
                            var PsApprovalRootDto = /** @class */ (function () {
                                function PsApprovalRootDto() {
                                }
                                return PsApprovalRootDto;
                            }());
                            vmbase.PsApprovalRootDto = PsApprovalRootDto;
                            var ApprovalPhaseDto = /** @class */ (function () {
                                function ApprovalPhaseDto(approver, approvalId, approvalForm, appFormName, browsingPhase, phaseOrder, approvalAtr) {
                                    this.approver = approver;
                                    this.approvalId = approvalId;
                                    this.approvalForm = approvalForm;
                                    this.appFormName = appFormName;
                                    this.browsingPhase = browsingPhase;
                                    this.phaseOrder = phaseOrder;
                                    this.approvalAtr = approvalAtr;
                                }
                                return ApprovalPhaseDto;
                            }());
                            vmbase.ApprovalPhaseDto = ApprovalPhaseDto;
                            var ApproverDto = /** @class */ (function () {
                                function ApproverDto(jobGCD, employeeId, empCode, name, approverOrder, approvalAtr, confirmPerson, confirmName, specWkpId) {
                                    this.jobGCD = jobGCD;
                                    this.employeeId = employeeId;
                                    this.approverOrder = approverOrder;
                                    this.name = name;
                                    this.approvalAtr = approvalAtr;
                                    this.confirmPerson = confirmPerson;
                                    this.confirmName = confirmName;
                                    this.specWkpId = specWkpId;
                                    this.empCode = empCode;
                                }
                                return ApproverDto;
                            }());
                            vmbase.ApproverDto = ApproverDto;
                            var EmployeeKcp009 = /** @class */ (function () {
                                function EmployeeKcp009(id, code, businessName, workplaceName, depName) {
                                    this.id = id;
                                    this.code = code;
                                    this.businessName = businessName;
                                    this.workplaceName = workplaceName;
                                    this.depName = depName;
                                }
                                return EmployeeKcp009;
                            }());
                            vmbase.EmployeeKcp009 = EmployeeKcp009;
                            var ProcessHandler = /** @class */ (function () {
                                function ProcessHandler() {
                                }
                                /**
                                 * sort by list root
                                 */
                                ProcessHandler.orderByList = function (lstRoot) {
                                    var result = [];
                                    var lstA = []; //common
                                    var lstB = []; //application
                                    var lstC = []; //confirmation
                                    var lstD = []; //anyItem
                                    var lstE = []; //notice
                                    var lstF = []; //event
                                    _.each(lstRoot, function (obj) {
                                        if (obj.employRootAtr == 0) { //common
                                            lstA.push(obj);
                                        }
                                        if (obj.employRootAtr == 1) { //application
                                            lstB.push(obj);
                                        }
                                        if (obj.employRootAtr == 2) { //confirmation
                                            lstC.push(obj);
                                        }
                                        if (obj.employRootAtr == 3) { //anyItem
                                            lstD.push(obj);
                                        }
                                        if (obj.employRootAtr == 4) { //notice
                                            lstE.push(obj);
                                        }
                                        if (obj.employRootAtr == 5) { //event
                                            lstF.push(obj);
                                        }
                                    });
                                    var sortByA = _.orderBy(lstA, ["appTypeValue"], ["asc"]);
                                    var sortByB = _.orderBy(lstB, ["appTypeValue"], ["asc"]);
                                    var sortByC = _.orderBy(lstC, ["appTypeValue"], ["asc"]);
                                    var sortByD = _.orderBy(lstD, ["appTypeValue"], ["asc"]);
                                    var sortByE = _.orderBy(lstE, ["appTypeValue"], ["asc"]);
                                    var sortByF = _.orderBy(lstF, ["appTypeValue"], ["asc"]);
                                    //push list A (common)
                                    _.each(sortByA, function (obj) {
                                        result.push(obj);
                                    });
                                    //push list B (application)
                                    _.each(sortByB, function (obj) {
                                        result.push(obj);
                                    });
                                    //push list C (confirmation)
                                    _.each(sortByC, function (obj) {
                                        result.push(obj);
                                    });
                                    //push list D (anyItem)
                                    _.each(sortByD, function (obj) {
                                        result.push(obj);
                                    });
                                    //push list E (notice)
                                    _.each(sortByE, function (obj) {
                                        result.push(obj);
                                    });
                                    //push list F (event)
                                    _.each(sortByF, function (obj) {
                                        result.push(obj);
                                    });
                                    return result;
                                };
                                /**
                                * find appType by value
                                */
                                ProcessHandler.findAppbyValue = function (applicationType, employRootAtr, lstNameAppType) {
                                    var self = this;
                                    return _.find(lstNameAppType, function (obj) {
                                        return obj.value == applicationType && obj.employRootAtr == employRootAtr;
                                    });
                                };
                                /**
                                 * check input date before or equal date
                                 */
                                ProcessHandler.validateDateInput = function (inputDate, date) {
                                    return moment(inputDate).isSameOrAfter(moment(date));
                                };
                                /**
                                 * check appType is exist in list root ?
                                 */
                                ProcessHandler.checkExist = function (lstRoot, appType, employRootAtr) {
                                    var check = false;
                                    _.each(lstRoot, function (root) {
                                        if (root.appTypeValue == appType && root.employRootAtr == employRootAtr) {
                                            check = true;
                                            return true;
                                        }
                                    });
                                    if (!check) {
                                        return false;
                                    }
                                    else {
                                        return true;
                                    }
                                };
                                //承認単位の設定を取得
                                ProcessHandler.getSettingApprovalUnit = function (sysAtr) {
                                    var dfd = $.Deferred();
                                    //会社単位の表示区分　＝　False、職場単位の表示区分　＝　False、社員単位の表示区分　＝False
                                    var setUnit = {
                                        companyUnit: 0,
                                        workplaceUnit: 0,
                                        employeeUnit: 0
                                    };
                                    if (sysAtr == 0) { //SHUUGYOU
                                        //就業ロールを取得
                                        servicebase.settingKaf022().done(function (kaf022) {
                                            var appSet = kaf022;
                                            setUnit.employeeUnit = appSet.employeeUnit;
                                            setUnit.workplaceUnit = appSet.workplaceUnit;
                                            setUnit.companyUnit = appSet.companyUnit;
                                            dfd.resolve(setUnit);
                                        });
                                        // });
                                    }
                                    else { //JINJI
                                        servicebase.setDisHR().done(function (disHr) {
                                            //COM_MODE
                                            setUnit.companyUnit = disHr.comMode;
                                            //DEV_MODE
                                            setUnit.workplaceUnit = disHr.devMode;
                                            //EMP_MODE
                                            setUnit.employeeUnit = disHr.empMode;
                                            dfd.resolve(setUnit);
                                        });
                                    }
                                    return dfd.promise();
                                };
                                //単位の表示区分をチェック
                                ProcessHandler.checkDis = function (setUnit) {
                                    if (setUnit.companyUnit == 0 && setUnit.workplaceUnit == 0 && setUnit.employeeUnit == 0) {
                                        //エラーメッセージ「Msg_1607」を表示
                                        nts.uk.ui.dialog.alertError({ messageId: "Msg_1607" }).then(function () {
                                            //トップページを戻す
                                            nts.uk.request.jump("/view/ccg/008/a/index.xhtml");
                                        });
                                        return;
                                    }
                                    return setUnit;
                                };
                                ProcessHandler.resizeColumn = function (root, tabSelected, mode) {
                                    var helpButtonSelect = undefined;
                                    var listButtonHelp = document.getElementsByClassName('help-button-custom');
                                    _.forEach(document.getElementsByClassName('help-button-custom'), function (item) {
                                        if (item.getBoundingClientRect().top > 0) {
                                            helpButtonSelect = item;
                                        }
                                    });
                                    document.onclick = function (e) {
                                        if (!_.isUndefined(helpButtonSelect)) {
                                            var helpButton = helpButtonSelect.getBoundingClientRect();
                                            $('#help-content').css('top', (helpButton.top + window.pageYOffset) + 'px');
                                            $('#help-content').css('left', (helpButton.left + window.pageXOffset + 45) + 'px');
                                        }
                                        if (!e.target.classList.contains('help-button-custom')) {
                                            $('#help-content').css('display', 'none');
                                        }
                                        else {
                                            if ($('#help-content').css('display') == 'none') {
                                                $('#help-content').css('display', '');
                                            }
                                            else {
                                                $('#help-content').css('display', 'none');
                                            }
                                        }
                                    };
                                    try {
                                        ProcessHandler.resizeColumnIndex(0, root, tabSelected, mode);
                                        ProcessHandler.resizeColumnIndex(1, root, tabSelected, mode);
                                        ProcessHandler.resizeColumnIndex(2, root, tabSelected, mode);
                                        ProcessHandler.resizeColumnIndex(3, root, tabSelected, mode);
                                        ProcessHandler.resizeColumnIndex(4, root, tabSelected, mode);
                                        ProcessHandler.resizeColumnIndex(5, root, tabSelected, mode);
                                    }
                                    catch (error) {
                                    }
                                };
                                ProcessHandler.resizeColumnIndex = function (index, root, tabSelected, mode) {
                                    var widthPhase = 100;
                                    var gridName = '#grid_matome';
                                    if (tabSelected == vmbase.RootType.COMPANY) {
                                        gridName = mode == vmbase.MODE.MATOME ? '#grid_matome' : '#grid_matomeB';
                                    }
                                    else if (tabSelected == vmbase.RootType.WORKPLACE) {
                                        gridName = mode == vmbase.MODE.MATOME ? '#grid_matomeC' : '#grid_matomeD';
                                    }
                                    else { //PERSON
                                        gridName = mode == vmbase.MODE.MATOME ? '#grid_matomeE' : '#grid_matomeF';
                                    }
                                    if (index == 0) {
                                        $(gridName).igGridResizing("resize", index, 130);
                                        return;
                                    }
                                    if (_.isEmpty(root)) {
                                        $(gridName).igGridResizing("resize", index, widthPhase);
                                        return;
                                    }
                                    var sum = $(gridName + ' .hyperlink.approver-line.openK_Phase' + index).length;
                                    for (cmm018.i = 0; cmm018.i < sum; cmm018.i++) {
                                        var compareWidth = $(gridName + ' .hyperlink.approver-line.openK_Phase' + index + ':eq(' + cmm018.i + ') span').width();
                                        if (compareWidth > widthPhase) {
                                            widthPhase = compareWidth;
                                        }
                                    }
                                    $(gridName).igGridResizing("resize", index, Math.ceil(widthPhase) + 12);
                                };
                                ProcessHandler.cal = function (inputText) {
                                    var font = "1rem, Meiryo UI";
                                    var canvas = document.createElement("canvas");
                                    var context = canvas.getContext("2d");
                                    // context.font = font; 
                                    var width = context.measureText(inputText).width;
                                    var textPixel = Math.ceil(width);
                                    var halfPixel = nts.uk.text.countHalf(inputText) * 10;
                                    // console.log(inputText);
                                    // console.log(textPixel);
                                    // console.log(halfPixel);
                                    // console.log((textPixel + halfPixel)/2);
                                    return (textPixel + halfPixel) / 2 + 8;
                                };
                                return ProcessHandler;
                            }());
                            vmbase.ProcessHandler = ProcessHandler;
                            var ApproverDtoK = /** @class */ (function () {
                                function ApproverDtoK(id, code, name, approvalAtr, dispOrder) {
                                    this.id = id;
                                    this.code = code;
                                    this.name = name;
                                    this.approvalAtr = approvalAtr;
                                    this.dispOrder = dispOrder;
                                }
                                return ApproverDtoK;
                            }());
                            vmbase.ApproverDtoK = ApproverDtoK;
                            var SystemType = /** @class */ (function () {
                                function SystemType() {
                                }
                                SystemType.EMPLOYMENT = 1;
                                SystemType.SALARY = 2;
                                SystemType.PERSONNEL = 3;
                                SystemType.ACCOUNTING = 4;
                                SystemType.OH = 6;
                                return SystemType;
                            }());
                            vmbase.SystemType = SystemType;
                            var CellState = /** @class */ (function () {
                                function CellState(rowId, columnKey, state) {
                                    this.rowId = rowId;
                                    this.columnKey = columnKey;
                                    this.state = state;
                                }
                                return CellState;
                            }());
                            vmbase.CellState = CellState;
                            var RootType;
                            (function (RootType) {
                                RootType[RootType["COMPANY"] = 0] = "COMPANY";
                                RootType[RootType["WORKPLACE"] = 1] = "WORKPLACE";
                                RootType[RootType["PERSON"] = 2] = "PERSON";
                            })(RootType = vmbase.RootType || (vmbase.RootType = {}));
                            var ApprovalForm;
                            (function (ApprovalForm) {
                                /** 全員承認*/
                                ApprovalForm[ApprovalForm["EVERYONE_APPROVED"] = 1] = "EVERYONE_APPROVED";
                                /** 誰か一人*/
                                ApprovalForm[ApprovalForm["SINGLE_APPROVED"] = 2] = "SINGLE_APPROVED";
                            })(ApprovalForm = vmbase.ApprovalForm || (vmbase.ApprovalForm = {}));
                            var SystemAtr;
                            (function (SystemAtr) {
                                /**就業*/
                                SystemAtr[SystemAtr["WORK"] = 0] = "WORK";
                                /**人事*/
                                SystemAtr[SystemAtr["HUMAN_RESOURCES"] = 1] = "HUMAN_RESOURCES";
                            })(SystemAtr = vmbase.SystemAtr || (vmbase.SystemAtr = {}));
                            var MODE;
                            (function (MODE) {
                                /** まとめて設定モード(0)*/
                                MODE[MODE["MATOME"] = 0] = "MATOME";
                                /**申請個別設定モード(1)*/
                                MODE[MODE["SHINSEI"] = 1] = "SHINSEI";
                            })(MODE = vmbase.MODE || (vmbase.MODE = {}));
                        })(vmbase = shr.vmbase || (shr.vmbase = {}));
                    })(shr = cmm018.shr || (cmm018.shr = {}));
                })(cmm018 = view.cmm018 || (view.cmm018 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm018.shr.vmbase.js.map