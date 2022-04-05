module nts.uk.com.view.cmf004.b.viewmodel {
  import getText = nts.uk.resource.getText;
  import setShared = nts.uk.ui.windows.setShared;
  import getShared = nts.uk.ui.windows.getShared;
  import dialog = nts.uk.ui.dialog;
  import block = nts.uk.ui.block;
  export class ScreenModel {
    stepList: Array<NtsWizardStep> = [
      { content: '.step-1' },
      { content: '.step-2' },
      { content: '.step-3' },
      { content: '.step-4' }
    ];
    stepSelected: KnockoutObservable<NtsWizardStep> = ko.observable({ id: 'step-1', content: '.step-1' });
    activeStep: KnockoutObservable<number> = ko.observable(0);
    selectedId: KnockoutObservable<number> = ko.observable(1);
    options: KnockoutObservableArray<any> = ko.observableArray([
      { value: 1, text: getText('CMF004_30') },
      { value: 2, text: getText('CMF004_32') }
    ]);
    //ScreenB
    startDateString: KnockoutObservable<string> = ko.observable("");
    endDateString: KnockoutObservable<string> = ko.observable("");
    dataRecoverySelection: KnockoutObservable<DataRecoverySelection> = ko.observable(new DataRecoverySelection(1, 0, {}, [], null));
    //upload file
    fileId: KnockoutObservable<string> = ko.observable(null);
    fileName: KnockoutObservable<string> = ko.observable(null);
    //Screen E, F, G, H
    dataRecoveryProcessId: KnockoutObservable<string> = ko.observable(null);
    recoverySourceFile: KnockoutObservable<string> = ko.observable("");
    recoverySourceCode: KnockoutObservable<string> = ko.observable("");
    recoverySourceName: KnockoutObservable<string> = ko.observable("");
    supplementaryExplanation: KnockoutObservable<string> = ko.observable("");
    saveForm: KnockoutObservable<string> = ko.observable("");
    //Screen E
    dataContentConfirm: KnockoutObservable<DataContentConfirm> = ko.observable(new DataContentConfirm([], 0));
    switchRules: KnockoutObservableArray<any> = ko.observableArray([
      { code: 1, name: getText('CMF004_472') },
      { code: 2, name: getText('CMF004_473') }
    ]);
    selectedRuleCode: any = ko.observable(1);
    checkboxChk: KnockoutObservable<Boolean> = ko.observable(false);
    pwdCompressEdt: any = {
      value: ko.observable(''),
      enable: ko.observable(true),
      required: ko.observable(true)
    }
    pwdConfirmEdt: any = {
      value: ko.observable(''),
      enable: ko.observable(true),
      required: ko.observable(true)
    }
    explanationValue: KnockoutObservable<string> = ko.observable('');
    output: KnockoutObservableArray<Output> = ko.observableArray([]);
    pwdConstraint: KnockoutObservable<string> = ko.observable('');
    itemSets: any;
    //Screen F
    changeDataRecoveryPeriod: KnockoutObservable<ChangeDataRecoveryPeriod> = ko.observable(new ChangeDataRecoveryPeriod([]));
    selectedEmployee: KnockoutObservableArray<EmployeeSearchDto> = ko.observableArray([]);
    //KCP005
    kcp005ComponentOptionScreenG: any;
    selectedEmployeeCodeScreenG: KnockoutObservableArray<string> = ko.observableArray([]);
    employeeListScreenG: KnockoutObservableArray<UnitModel> = ko.observableArray([]);
    //Screen G
    ccg001ComponentOption: any;
    recoveryMethodOptions: KnockoutObservableArray<any> = ko.observableArray([
      { value: RecoveryMethod.RESTORE_ALL, text: getText('CMF004_92') },
      { value: RecoveryMethod.SELECTED_RANGE, text: getText('CMF004_93') }
    ]);
    datePickerEnb: KnockoutObservable<Boolean> = ko.observable(true);
    dateValue: KnockoutObservable<DateValueDto> = ko.observable(new DateValueDto());
    //Screen H
    buton_I_enable: KnockoutObservable<boolean> = ko.observable(true);
    recoveryMethodDescription1: KnockoutObservable<string> = ko.observable("");
    recoveryMethodDescription2: KnockoutObservable<string> = ko.observable("");
    dataRecoverySummary: KnockoutObservable<DataRecoverySummary> = ko.observable(new DataRecoverySummary([], 0, [], []));
    kcp005ComponentOptionScreenH: any;
    selectedEmployeeCodeScreenH: KnockoutObservableArray<string> = ko.observableArray([]);
    employeeListScreenH: KnockoutObservableArray<UnitModel> = ko.observableArray([]);
    buttonProceed: KnockoutObservable<boolean> = ko.observable(true);
    categoryListOld: Array<any> = [];
    recoveryProcessingId: string;
    periodValueArr: Array<any> = [
      { period: PeriodValue.DAY, format: "YYYY/MM/DD" },
      { period: PeriodValue.MONTH, format: "YYYY/MM" },
      { period: PeriodValue.YEAR, format: "YYYY" },
      { period: PeriodValue.FULLTIME }];

    constructor() {
      let self = this;
      //Fixed table
      if (/Chrome/.test(navigator.userAgent)) {
        $("#E4_1").ntsFixedTable({ height: 164, width: 715 });
        $("#F4_1").ntsFixedTable({ height: 184, width: 715 });
        $("#H4_1").ntsFixedTable({ height: 164, width: 700 });
      } else {
        $("#E4_1").ntsFixedTable({ height: 165, width: 715 });
        $("#F4_1").ntsFixedTable({ height: 184, width: 715 });
        $("#H4_1").ntsFixedTable({ height: 164, width: 700 });
      }
      //_____KCP005G________
      self.kcp005ComponentOptionScreenG = {
        isShowAlreadySet: false,
        isMultiSelect: true,
        listType: ListType.EMPLOYEE,
        employeeInputList: self.employeeListScreenG,
        selectType: SelectType.SELECT_BY_SELECTED_CODE,
        selectedCode: self.selectedEmployeeCodeScreenG,
        isDialog: false,
        isShowNoSelectRow: false,
        alreadySettingList: ko.observableArray([]),
        isShowWorkPlaceName: false,
        isShowSelectAllButton: true,
        maxRows: 15,
        tabindex: -1
      };

      //_____KCP005H________
      self.kcp005ComponentOptionScreenH = {
        isShowAlreadySet: false,
        isMultiSelect: false,
        listType: ListType.EMPLOYEE,
        employeeInputList: self.employeeListScreenH,
        selectType: SelectType.SELECT_BY_SELECTED_CODE,
        selectedCode: self.selectedEmployeeCodeScreenH,
        isDialog: false,
        isShowNoSelectRow: false,
        alreadySettingList: ko.observableArray([]),
        isShowWorkPlaceName: false,
        isShowSelectAllButton: false,
        maxRows: 20,
        tabindex: -1
      };

      // CCG001
      self.ccg001ComponentOption = {
        /** Common properties */
        systemType: 1,
        showEmployeeSelection: true,
        showQuickSearchTab: true,
        showAdvancedSearchTab: true,
        showBaseDate: true,
        showClosure: true,
        showAllClosure: true,
        showPeriod: true,
        periodFormatYM: false,

        /** Required parameter */
        baseDate: moment().format("YYYY-MM-DD"),
        periodStartDate: moment().format("YYYY-MM-DD"),
        periodEndDate: moment().format("YYYY-MM-DD"),
        inService: true,
        leaveOfAbsence: true,
        closed: true,
        retirement: true,

        /** Quick search tab options */
        showAllReferableEmployee: true,
        showOnlyMe: true,
        showSameDepartment: true,
        showSameDepartmentAndChild: true,
        showSameWorkplace: true,
        showSameWorkplaceAndChild: true,

        /** Advanced search properties */
        showEmployment: true,
        showDepartment: true,
        showWorkplace: true,
        showClassification: true,
        showJobTitle: true,
        showWorktype: true,
        isMutipleCheck: true,

        returnDataFromCcg001: (data: Ccg001ReturnedData) => {
          self.employeeListScreenG.removeAll();
          let employeeData: Array<any> = [];
          _.forEach(data.listEmployee, x => {
            employeeData.push({ code: x.employeeCode, name: x.employeeName, id: x.employeeId });
          });
          employeeData = _.sortBy(employeeData, ["code"]);
          self.employeeListScreenG(employeeData);
          self.updateKcp005ScreenG(self.dataContentConfirm().selectedRecoveryMethod() === 0);
        }
      }

      self.startDateString.subscribe(value => {
        self.dataRecoverySelection().executePeriodInput().startDate = value;
        self.dataRecoverySelection().executePeriodInput.valueHasMutated();
      });

      self.endDateString.subscribe(value => {
        self.dataRecoverySelection().executePeriodInput().endDate = value;
        self.dataRecoverySelection().executePeriodInput.valueHasMutated();
      });

      //New code
      self.dataRecoverySelection().selectedUploadCls.subscribe(value => {
        if (value == 1) {
          nts.uk.ui.errors.clearAll();
        }
      });
      //End new code

      self.dataContentConfirm().dataContentcategoryList.subscribe(value => {
        self.setWidthScrollHeader('.contentE', value);
      });

      self.changeDataRecoveryPeriod().changeDataCategoryList.subscribe(value => {
        self.setWidthScrollHeader('.contentF', value);
      });

      self.dataRecoverySummary().recoveryCategoryList.subscribe(value => {
        self.setWidthScrollHeader('.contentH', value);
      });

      self.dataContentConfirm().selectedRecoveryMethod.subscribe(value => {
        self.updateKcp005ScreenG(value === 0);
      });

      self.output.subscribe(value => {
        _.forEach(value, (x, i) => {
          var chosen = self.dataContentConfirm().dataContentcategoryList()
            .filter(d => Number(d.categoryId()) === Number(x.categoryTable.categoryId)).pop();
          if (chosen) {
            chosen.isRecover(x.systemChargeCategory);
            chosen.iscanNotBeOld(x.systemChargeCategory);
          }
        })
      });

      self.checkboxChk.subscribe(value => {
        if (value) {
          self.pwdConstraint('FileCompressionPassword');
          self.pwdConstraint.valueHasMutated();
          $(".password-input").trigger("validate");
        } else {
          self.pwdConstraint("");
          self.pwdConstraint.valueHasMutated();
          self.pwdCompressEdt.value("");
          self.pwdConfirmEdt.value("");
          $('.password-input').ntsError('clear');
        }
      })
    }

    openHandleFileDialog(continueShowHandleDialog: boolean, doUpload: boolean = true) {
      let self = this;
      if (!continueShowHandleDialog) {
        $('#E4_1').focus();
        return;
      }
      nts.uk.ui.windows.sub.modal('../c/index.xhtml').onClosed(() => {
        setShared("CMF004_D_PARAMS", getShared("CMF004_D_PARAMS"));
        if (doUpload) {
          nts.uk.ui.windows.sub.modal('../d/index.xhtml').onClosed(() => {
            if (getShared("CMF004_E_PARAMS")) {
              let recoveryInfo = getShared("CMF004_E_PARAMS");
              if (recoveryInfo) {
                let self = this;
                if (recoveryInfo.continuteProcessing) {
                  self.dataRecoverySelection().selectedRecoveryFile(recoveryInfo.storeProcessingId);
                  self.recoveryProcessingId = recoveryInfo.processingId;
                  self.initScreenE();
                  $('#data-recovery-wizard').ntsWizard("next");
                  $('#E4_1').focus();
                  return;
                } else {
                  if (recoveryInfo.continueShowHandleDialog)
                    self.openHandleFileDialog(true);
                }
              }
            }
            $('#E4_1').focus();
          });
        } else {
          let passwordInfo = getShared("CMF004_D_PARAMS");
          if (passwordInfo.continuteProcessing) {
            self.initScreenE();
            $('#data-recovery-wizard').ntsWizard("next");
            $('#E4_1').focus();
          } else {
            if (passwordInfo.message) {
              dialog.alertError({ messageId: passwordInfo.message });
            }
          }
        }
        $('#E4_1').focus();
      });
    }

    finished(fileInfo: any) {
      let self = this;
      if (fileInfo.id != null && fileInfo.originalName != null) {
        setShared("CMF004lParams", {
          fileId: fileInfo.id,
          fileName: fileInfo.originalName,
          fromServerFile: false
        }, true);
        self.openHandleFileDialog(true);
      }
    }

    setWidthScrollHeader(frame, value): void {
      if (value.length > 5) {
        $(frame + ' .scroll-header.nts-fixed-header').css('width', '17px');
      } else {
        $(frame + ' .scroll-header.nts-fixed-header').css('width', '0px');
      }
    }

    initWizardScreen(): void {
      let self = this;
      self.initScreenB();
    }

    /**
     * B: データ復旧選択
     */
    initScreenB(): void {
      let self = this;
      block.invisible();
      self.startDateString(moment.utc().subtract(1, "M").add(1, "d").format("YYYY/MM/DD"));
      self.endDateString(moment.utc().format("YYYY/MM/DD"));
      let paramSearch = {
        startDate: moment.utc(self.dataRecoverySelection().executePeriodInput().startDate, "YYYY/MM/DD hh:mm:ss").toISOString(),
        endDate: moment.utc(self.dataRecoverySelection().executePeriodInput().endDate, "YYYY/MM/DD hh:mm:ss").add(1, "d").add(-1, "s").toISOString()
      };
      service.findDataRecoverySelection(paramSearch).done(function (data: Array<any>) {
        if (data && data.length) {
          let recoveryFileList: Array<any> = [];
          for (let i = 0; i < data.length; i++) {
            let itemTarget =
            {
              saveSetCode: data[i].code == null ? '' : data[i].code,
              saveSetName: data[i].name,
              supplementaryExplanation: data[i].suppleExplanation,
              storageStartDate: moment.utc(data[i].saveStartDatetime).format('YYYY/MM/DD HH:mm:ss'),
              executeCategory: (data[i].saveForm) == 0 ? getText('CMF004_300') : getText('CMF004_301'),
              targetNumber: data[i].targetNumberPeople + "人",
              saveFileName: data[i].saveFileName + ".zip",
              fileId: data[i].fileId,
              storeProcessingId: data[i].storeProcessingId
            };
            recoveryFileList.push(itemTarget);
          }
          self.dataRecoverySelection().recoveryFileList(recoveryFileList);
        }
      }).always(() => {
        block.clear();
        $("#B3_1").focus();
      });
    }

    searchDataRecovery(): void {
      let self = this;
      $("#daterangepicker_b4_3 .ntsDatepicker").trigger("validate");
      if (!nts.uk.ui.errors.hasError()) {
        block.invisible();
        let paramSearch = {
          startDate: moment.utc(self.dataRecoverySelection().executePeriodInput().startDate, "YYYY/MM/DD hh:mm:ss").toISOString(),
          endDate: moment.utc(self.dataRecoverySelection().executePeriodInput().endDate, "YYYY/MM/DD hh:mm:ss").add(1, "d").add(-1, "s").toISOString()
        };
        self.dataRecoverySelection().recoveryFileList.removeAll();
        service.findDataRecoverySelection(paramSearch).done(function (data: Array<any>) {
          if (data && data.length) {
            let recoveryFileList: Array<any> = [];
            for (let i = 0; i < data.length; i++) {
              let itemTarget =
              {
                saveSetCode: data[i].code ? data[i].code : '',
                saveSetName: data[i].name,
                supplementaryExplanation: data[i].suppleExplanation,
                storageStartDate: moment.utc(data[i].saveStartDatetime).format('YYYY/MM/DD HH:mm:ss'),
                executeCategory: (data[i].saveForm) == 0 ? getText('CMF004_300') : getText('CMF004_301'),
                targetNumber: data[i].targetNumberPeople + "人",
                saveFileName: data[i].saveFileName + ".zip",
                fileId: data[i].fileId,
                storeProcessingId: data[i].storeProcessingId
              };
              recoveryFileList.push(itemTarget);
            }
            self.dataRecoverySelection().recoveryFileList(recoveryFileList);
          }
          self.dataRecoverySelection().selectedRecoveryFile("");
        }).always(() => {
          block.clear();
        });
      }
    }

    /**
     * E:データ内容確認
     */
    initScreenE(): void {
      let self = this;
      block.invisible();
      //Get Data TableList for Screen E
      service.setScreenItem(self.dataRecoverySelection().selectedRecoveryFile()).done((data) => {
        self.itemSets = data;
        let listCategory: Array<CategoryInfo> = [];
        if (data && data.length) {
          _.each(data, (c, i: number) => {
            const x = c.categoryTable;
            let rowNumber = i + 1;
            let iscanNotBeOld: boolean = c.systemChargeCategory;
            let isRecover: boolean = c.systemChargeCategory;
            let categoryName = x.categoryName;
            let categoryId = x.categoryId;
            let recoveryPeriod = x.retentionPeriodCls;
            let startOfPeriod = x.saveDateFrom;
            let endOfPeriod = x.saveDateTo;
            let recoveryMethod = x.storageRangeSaved == 1 ? getText('CMF004_305') : getText('CMF004_306');
            let systemType = x.systemType;
            let saveSetName = x.saveSetName;
            listCategory.push(new CategoryInfo(rowNumber, isRecover, categoryId, categoryName, recoveryPeriod,
              startOfPeriod, endOfPeriod, recoveryMethod, iscanNotBeOld, systemType, saveSetName));
          });
          self.dataContentConfirm().dataContentcategoryList(listCategory);
          self.recoverySourceFile(data[0].categoryTable.compressedFileName + '.zip');
          self.recoverySourceCode(data[0].categoryTable.patternCode);
          self.recoverySourceName(data[0].categoryTable.saveSetName);
          self.saveForm(data[0].categoryTable.saveForm);
          self.supplementaryExplanation(data[0].categoryTable.supplementaryExplanation);
        }
      }).always(() => {
        block.clear();
      });
    }

    getTextRecovery(recoveryPeriod): string {
      if (recoveryPeriod() === 0) return getText("Enum_TimeStore_FULL_TIME");
      if (recoveryPeriod() === 3) return getText("Enum_TimeStore_ANNUAL");
      if (recoveryPeriod() === 2) return getText("Enum_TimeStore_MONTHLY");
      if (recoveryPeriod() === 1) return getText("Enum_TimeStore_DAILY");
    }

    getSystemType(systemType): string {
      switch (systemType) {
        case 0: return getText("Enum_SystemType_PERSON_SYSTEM");
        case 1: return getText("Enum_SystemType_ATTENDANCE_SYSTEM");
        case 2: return getText("Enum_SystemType_PAYROLL_SYSTEM");
        case 3: return getText("Enum_SystemType_OFFICE_HELPER");
      }
    }

    isCheckboxActive(): Boolean {
      var self = this;
      var isActive: Boolean = self.selectedRuleCode() === 1 && self.checkboxChk();
      if (!isActive) {
        nts.uk.ui.errors.clearAll();
      }
      return isActive;
    }

    configEdt(val: Boolean): void {
      var self = this;
      self.pwdCompressEdt.enable(val);
      self.pwdConfirmEdt.enable(val);

      if (!val) {
        nts.uk.ui.errors.clearAll();
      }
    }

    /**
     * F:データ復旧期間変更
     */
    initScreenF(): void {
      let self = this;
    }

    initScreenG(): void {
      let self = this;
      block.invisible();
      //Get Data PerformDataRecover for Screen KCP 005
      const param = {
        itemSets: self.itemSets,
        dataRecoveryProcessId: self.recoveryProcessingId
      };
      service.findPerformDataRecover(param).done(function (data: any) {
        if (data.targets) {
          self.employeeListScreenG.removeAll();
          let employeeData: Array<any> = [];
          _.forEach(data.targets, x => {
            employeeData.push({ code: x.scd, name: x.bussinessName, id: x.sid });
          });
          employeeData = _.sortBy(employeeData, ["code"]);
          self.employeeListScreenG(employeeData);
          $('#kcp005component .nts-gridlist').attr('tabindex', -1);
          self.updateKcp005ScreenG(self.dataContentConfirm().selectedRecoveryMethod() === 0);
        }
        self.dateValue().dateRange({ startDate: data.dailyFrom, endDate: data.dailyTo });
        self.dateValue().monthRange({ startDate: data.monthlyFrom, endDate: data.monthlyTo });
        self.dateValue().yearRange({ startDate: data.annualFrom, endDate: data.annualTo });
        self.dateValue.valueHasMutated();
      }).always(() => {
        block.clear();
      });
      $('#kcp005component .ntsSearchBox').attr('tabindex', -1);
      $('#kcp005component').find(':button').each(function () {
        $(this).attr('tabindex', -1);
      });
      $('#G4_3').ntsGroupComponent(self.ccg001ComponentOption);
    }

    updateKcp005ScreenG(val: boolean): void {
      var self = this;
      self.kcp005ComponentOptionScreenG.selectType = 2;
      self.kcp005ComponentOptionScreenG.disableSelection = val;
      $('#kcp005component').ntsListComponent(self.kcp005ComponentOptionScreenG);
    }

    /**
     * H:データ復旧サマリ
     */
    initScreenH(): void {
      let self = this;
      // check recovery method
      let recoveryMethod = self.dataContentConfirm().selectedRecoveryMethod();
      let _listCategory = self.dataContentConfirm().dataContentcategoryList();


      // _.forEach(_listCategory, (x, i) => {
      //     let isRecover = true;
      //     if (!x.iscanNotBeOld() || !x.isRecover()) {
      //         isRecover = false;
      //     }
      //     let isEnablePeriod = recoveryMethod == RecoveryMethod.SELECTED_RANGE ? true : false;
      //     _itemList.push(new CategoryInfo(i + 1, isRecover, x.categoryId(), x.categoryName(), x.recoveryPeriod(),
      //         x.startOfPeriod(), x.endOfPeriod(), x.recoveryMethod(), isEnablePeriod, x.systemType(), x.saveSetName()));
      // });

      self.changeDataRecoveryPeriod().changeDataCategoryList(_listCategory);
      self.categoryListOld = ko.toJS(_listCategory);

      // $('#kcp005component1 div[id*="horizontalScrollContainer"]').remove();
      let _categoryList = self.getRecoveryCategory(self.changeDataRecoveryPeriod().changeDataCategoryList())
        .filter(data => data.isRecover() && data.iscanNotBeOld());
      if (_categoryList.length > 0) {
        // _.forEach(_categoryList, categoryItem => {
        //     let a = categoryItem;
        //     categoryItem.startOfPeriod(self.formatDate(categoryItem.recoveryPeriod, categoryItem.startOfPeriod()));
        //     categoryItem.endOfPeriod(self.formatDate(categoryItem.recoveryPeriod, categoryItem.endOfPeriod()));
        // });
        self.buttonProceed(true);
      } else self.buttonProceed(false);
      if (self.dataContentConfirm().selectedRecoveryMethod() === 1) {
        let _employeeList = self.getRecoveryEmployee(self.employeeListScreenG(), self.selectedEmployeeCodeScreenG());
        _employeeList = _.sortBy(_employeeList, ["code"]);
        self.employeeListScreenH(_employeeList);
      } else {
        self.employeeListScreenH(self.employeeListScreenG());
      }
      let _recoveryMethod = self.dataContentConfirm().selectedRecoveryMethod();
      let _recoveryMethodDescription1 = self.getRecoveryMethodDescription1(_recoveryMethod);
      let _recoveryMethodDescription2 = self.getRecoveryMethodDescription2(_recoveryMethod);
      self.dataRecoverySummary().recoveryCategoryList(_categoryList);
      self.dataRecoverySummary().recoveryMethod(_recoveryMethod);
      self.recoveryMethodDescription1(_recoveryMethodDescription1);
      self.recoveryMethodDescription2(_recoveryMethodDescription2);
    }

    /**
     * Get recovery category
     */
    getRecoveryCategory(selectedCategory: Array<CategoryInfo>): Array<any> {
      let self = this;
      let _listCategory = _.filter(selectedCategory, x => { return x.isRecover() == true; });
      let _itemList: Array<CategoryInfo> = [];
      _.forEach(_listCategory, (x, i) => {
        _itemList.push(new CategoryInfo(i + 1, x.isRecover(), x.categoryId(), x.categoryName(), x.recoveryPeriod(),
          x.startOfPeriod(), x.endOfPeriod(), x.recoveryMethod(), x.iscanNotBeOld(), x.systemType(), x.saveSetName()));
      });
      return _itemList;
    }

    formatDate(recoveryPeriod, dateFormat): string {
      if (recoveryPeriod() == PeriodEnum.DAY) {
        return moment.utc(dateFormat).format("YYYY/MM/DD");
      }
      if (recoveryPeriod() == PeriodEnum.MONTH) {
        return nts.uk.time.formatYearMonth(parseInt(dateFormat));
      }
      return dateFormat;
    }

    /**
     * Get recovery employee
     */
    getRecoveryEmployee(dataEmployeeList: Array<UnitModel>, selectedEmployeeList: Array<string>): Array<UnitModel> {
      return _.filter(dataEmployeeList, item => _.includes(selectedEmployeeList, item.code));
    }

    getRecoveryMethodDescription1(recoveryMethod: number): string {
      if (recoveryMethod == RecoveryMethod.RESTORE_ALL) return getText('CMF004_92');
      return getText('CMF004_93');
    }

    getRecoveryMethodDescription2(recoveryMethod: number): string {
      if (recoveryMethod == RecoveryMethod.RESTORE_ALL) return getText('CMF004_94');
      return getText('CMF004_95');
    }

    nextToScreenE(): void {
      let self = this;
      self.recoveryProcessingId = nts.uk.util.randomId();
      let paramObtainRecovery = {
        storeProcessingId: self.dataRecoverySelection().selectedRecoveryFile(),
        dataRecoveryProcessId: self.recoveryProcessingId
      };
      nts.uk.ui.block.grayout();
      service.obtainRecovery(paramObtainRecovery).done((res) => {
        if (res) {
          if (res.status) {
            self.initScreenE();
            $('#data-recovery-wizard').ntsWizard("next");
            $('#E4_1').focus();
          } else {
            const arr: string[] = res.message.split("/");
            if (arr.length > 1) {
              setShared("CMF004lParams", {
                fileId: arr[0],
                fileName: arr[1],
                storeProcessingId: paramObtainRecovery.storeProcessingId,
                fromServerFile: true
              }, true);
              self.openHandleFileDialog(true, false);
            } else if (res.message.length > 0) {
              dialog.alertError({ messageId: res.message });
            }
          }
        }
      }).fail((err) => {
        dialog.alertError(err);
        block.clear();
      }).always((err) => {
        block.clear();
      });
      $('#E4_1').focus();
    }

    backToScreenA(): void {
      nts.uk.request.jump("/view/cmf/004/a/index.xhtml");
    }

    nextToScreenF(): void {
      let self = this;
      self.initScreenF();
      nts.uk.ui.errors.clearAll();
      let checkItemE = _.filter(self.dataContentConfirm().dataContentcategoryList(), x => { return x.isRecover() == true; }).length;
      if (checkItemE == 0) {
        dialog.alertError({ messageId: "Msg_1265" });
      } else {

        $('#data-recovery-wizard').ntsWizard("next");
        $("#F5_5:first-child .start-date input:first-child").focus();

      }

    }

    nextToScreenG(): void {
      let self = this;

      let selectedCategory = _.filter(self.dataContentConfirm().dataContentcategoryList(), x => { return x.isRecover() == true; });
      if (selectedCategory.length < 1) {
        nts.uk.ui.dialog.alertError({ messageId: 'Msg_1265' });
        return;
      }

      if (self.isCheckboxActive()) {
        $("#E8_3_2 input").trigger("validate");
        $("#E8_3_4 input").trigger("validate");
        if (!nts.uk.ui.errors.hasError()) {
          if (self.pwdCompressEdt.value() !== self.pwdConfirmEdt.value()) {
            nts.uk.ui.dialog.alertError({ messageId: 'Msg_566' });
            return;
          }
        }
      }

      if (!nts.uk.ui.errors.hasError()) {
        for (let checkRow of ko.toJS(self.changeDataRecoveryPeriod().changeDataCategoryList())) {
          if (checkRow.isRecover) {
            if (checkRow.startOfPeriod > checkRow.endOfPeriod) {
              $('tr[data-id=' + checkRow.rowNumber + ']').find('.ntsDatepicker').eq(0).ntsError('set', { messageId: 'Msg_1320', messageParams: [checkRow.rowNumber] });
            }
            let oldData = _.find(self.categoryListOld, x => {
              return x.categoryId == checkRow.categoryId;
            });
            if (oldData.startOfPeriod > checkRow.startOfPeriod) {
              $('tr[data-id=' + checkRow.rowNumber + ']').find('.ntsDatepicker').eq(0).ntsError('set', { messageId: 'Msg_1319', messageParams: [checkRow.rowNumber] });
            }
            if (oldData.endOfPeriod < checkRow.endOfPeriod) {
              $('tr[data-id=' + checkRow.rowNumber + ']').find('.ntsDatepicker').eq(1).ntsError('set', { messageId: 'Msg_1319', messageParams: [checkRow.rowNumber] });
            }
          }
        }

        if (self.dataContentConfirm().dataContentcategoryList().length < 1) {
          nts.uk.ui.dialog.alertError({ messageId: 'Msg_471' });
          return;
        }
      }
      if (!nts.uk.ui.errors.hasError()) {
        self.initScreenG();
        $('#data-recovery-wizard').ntsWizard("next");
      }

      $('#kcp005component').focus();
    }

    nextToScreenH(): void {
      let self = this;
      if (!nts.uk.ui.errors.hasError()) {
        self.initScreenH();
        $('#data-recovery-wizard').ntsWizard("next");
        $('#H9_2').focus();
      }
    }

    restoreData_click(): void {
      let self = this;
      if (self.employeeListScreenG().length !== self.selectedEmployeeCodeScreenG().length) {
        self.employeeListScreenG(_.filter(self.employeeListScreenG(), e => _.includes(self.selectedEmployeeCodeScreenG(), e.code)));
      }
      setShared("CMF004IParams", {
        saveForm: self.saveForm(),
        employeeList: ko.toJS(self.employeeListScreenG),
        recoveryCategoryList: ko.toJS(self.dataRecoverySummary().recoveryCategoryList),
        recoveryFile: self.recoverySourceFile(),
        recoverySourceCode: self.recoverySourceCode(),
        recoverySourceName: self.recoverySourceName(),
        supplementaryExplanation: self.supplementaryExplanation(),
        recoveryMethodOptions: self.dataContentConfirm().selectedRecoveryMethod(),
        recoveryProcessingId: self.recoveryProcessingId,
        store_del_ProcessingId: self.dataRecoverySelection().selectedRecoveryFile()
      });
      if (self.selectedRuleCode() === 1) {
        service.addMalSet(self.createManualSettings()).done((res) => {
          if ((res != null) && (res != "")) {
            setShared("CMF004KParams", {
              storeProcessingId: res,
              dataSaveSetName: self.dataRecoverySelection().recoveryFileList().filter(data => data.storeProcessingId).pop().saveSetName,
              dayValue: self.dateValue().dateRange(),
              monthValue: self.dateValue().monthRange(),
              yearValue: self.dateValue().yearRange()
            });
            nts.uk.ui.windows.sub.modal("/view/cmf/004/k/index.xhtml").onClosed(() => {
              const param = getShared("CMF004KParams");
              if (param.isSuccess) {
                nts.uk.ui.windows.sub.modal("/view/cmf/004/i/index.xhtml").onClosed(() => {
                  self.buton_I_enable(false);
                });
              }
            });
          }
        })
      } else {
        nts.uk.ui.windows.sub.modal("/view/cmf/004/i/index.xhtml").onClosed(() => {
          self.buton_I_enable(false);
        });
      }
    }

    createManualSettings(): ManualSettingModal {
      var self = this;
      var dateValue: DateValueDto = new DateValueDto();
      if (self.dataContentConfirm().selectedRecoveryMethod() === 0) {
        _.each(self.periodValueArr, (item) => {
          var val = self.dataRecoverySummary().recoveryCategoryList().filter(data => data.recoveryPeriod() === item.period).pop();
          if (val) {
            var temp: DateDto;
            switch (item.period) {
              case PeriodValue.DAY:
                dateValue.dateRange = ko.observable(temp);
                break;
              case PeriodValue.MONTH:
                dateValue.monthRange = ko.observable(temp);
                break;
              case PeriodValue.YEAR:
                dateValue.yearRange = ko.observable(temp);
                break;
              case PeriodValue.FULLTIME:
                if (self.dataRecoverySummary().recoveryCategoryList().every(data => data.recoveryPeriod() === item.period)) {
                  dateValue.dateRange = ko.observable();
                  dateValue.monthRange = ko.observable();
                  dateValue.yearRange = ko.observable();
                }
                break;
            }
            temp.startDate = val.startOfPeriod();
            temp.endDate = val.endOfPeriod();
          }
        })
      } else {
        dateValue.dateRange(self.dateValue().dateRange);
        dateValue.monthRange(self.dateValue().monthRange);
        dateValue.yearRange(self.dateValue().yearRange);
      }
      return new ManualSettingModal(Number(self.isCheckboxActive()),
        self.dataContentConfirm().dataContentcategoryList().map(data => data.saveSetName()).pop(), moment.utc().toISOString(), self.pwdCompressEdt.value(),
        moment.utc().toISOString(), moment.utc(dateValue.dateRange().endDate, "YYYY/MM/DD").toISOString(), moment.utc(dateValue.dateRange().startDate, "YYYY/MM/DD").toISOString(),
        moment.utc(dateValue.monthRange().endDate, "YYYY/MM/DD").toISOString(), moment.utc(dateValue.monthRange().startDate, "YYYY/MM/DD").toISOString(), self.explanationValue(),
        Number(dateValue.yearRange().endDate), Number(dateValue.yearRange().startDate), self.dataContentConfirm().selectedRecoveryMethod(),
        self.employeeListScreenG(), _.map(self.dataRecoverySummary().recoveryCategoryList(), data => new CategoryTableList(data.categoryId(), data.systemType())), 
        self.recoverySourceCode());
    }

    backToPreviousScreen(): void {
      const self = this;
      $('#data-recovery-wizard').ntsWizard("prev");
      nts.uk.ui.errors.clearAll();
    }

    start(): JQueryPromise<any> {
      let self = this;
      let dfd = $.Deferred();
      self.initWizardScreen();
      dfd.resolve(self);
      return dfd.promise();
    }
  }

  export enum PeriodEnum {
    FULLTIME = 0, //全期間一律
    YEAR = 3, //日次
    MONTH = 2, //月次
    DAY = 1  //年次
  }

  export enum PeriodValue {
    FULLTIME = '全期間一律',
    YEAR = '日次',
    MONTH = '月次',
    DAY = '年次'
  }

  export enum RecoveryMethod {
    RESTORE_ALL = 0, //全件復旧
    SELECTED_RANGE = 1 //選択した範囲で復旧
  }

  export class CategoryInfo {
    rowNumber: KnockoutObservable<number>;
    isRecover: KnockoutObservable<boolean>;
    categoryId: KnockoutObservable<string>;
    categoryName: KnockoutObservable<string>;
    recoveryPeriod: KnockoutObservable<string>;
    recoveryMethod: KnockoutObservable<string>;
    startOfPeriod: KnockoutObservable<string>;
    endOfPeriod: KnockoutObservable<string>;
    iscanNotBeOld: KnockoutObservable<boolean>;
    isEnablePeriod: KnockoutObservable<boolean>;
    systemType: KnockoutObservable<number>;
    saveSetName: KnockoutObservable<string>;

    constructor(rowNumber: number, isRecover: boolean, categoryId: string, categoryName: string,
      recoveryPeriod: string, startOfPeriod: string, endOfPeriod: string, recoveryMethod: string,
      isEnablePeriod: boolean, systemType: number, saveSetName: string) {
      let self = this;
      self.rowNumber = ko.observable(rowNumber);
      self.isRecover = ko.observable(isRecover);
      self.categoryId = ko.observable(categoryId);
      self.categoryName = ko.observable(categoryName);
      self.recoveryPeriod = ko.observable(recoveryPeriod);
      self.startOfPeriod = ko.observable(startOfPeriod);
      self.endOfPeriod = ko.observable(endOfPeriod);
      self.recoveryMethod = ko.observable(recoveryMethod);
      self.iscanNotBeOld = ko.observable(isEnablePeriod);
      self.isEnablePeriod = ko.observable(isEnablePeriod);
      self.systemType = ko.observable(systemType);
      self.saveSetName = ko.observable(saveSetName);
    }
  }


  export interface IRecoveryFileInfo {
    saveSetCode: string;
    saveSetName: string;
    supplementaryExplanation: string;
    storageStartDate: string;
    executeCategory: string;
    targetNumber: string;
    saveFileName: string;
    fileId: string;
    storeProcessingId: string;
  }

  export class RecoveryFileInfo {
    saveSetCode: string;
    saveSetName: string;
    supplementaryExplanation: string;
    storageStartDate: string;
    executeCategory: string;
    targetNumber: string;
    saveFileName: string;
    fileId: string;
    storeProcessingId: string;
    constructor(input: IRecoveryFileInfo) {
      let self = this;
      self.saveSetCode = input.saveSetCode;
      self.saveSetName = input.saveSetName;
      self.supplementaryExplanation = input.supplementaryExplanation;
      self.storageStartDate = input.storageStartDate;
      self.executeCategory = input.executeCategory;
      self.targetNumber = input.targetNumber;
      self.saveFileName = input.saveFileName;
      self.fileId = input.fileId;
      this.storeProcessingId = input.storeProcessingId;
    }
  }

  /**
   * B: データ復旧選択
   */
  export class DataRecoverySelection {
    selectedUploadCls: KnockoutObservable<number>;
    selectedSaveFileCls: KnockoutObservable<number>;
    executePeriodInput: KnockoutObservable<any>;
    recoveryFileList: KnockoutObservableArray<IRecoveryFileInfo>;
    selectedRecoveryFile: KnockoutObservable<string>;
    constructor(selectedUploadCls: number, selectedSaveFileCls: number, executePeriodInput: any, recoveryFileList: Array<any>, selectedRecoveryFile: string) {
      let self = this;
      self.selectedUploadCls = ko.observable(selectedUploadCls);
      self.selectedSaveFileCls = ko.observable(selectedSaveFileCls);
      self.executePeriodInput = ko.observable(executePeriodInput);
      self.recoveryFileList = ko.observableArray(recoveryFileList);
      self.selectedRecoveryFile = ko.observable(selectedRecoveryFile);
    }
  }

  /**
   * E:データ内容確認
   */
  export class DataContentConfirm {
    dataContentcategoryList: KnockoutObservableArray<CategoryInfo>;
    selectedRecoveryMethod: KnockoutObservable<number>;
    constructor(categoryList: Array<any>, selectedRecoveryMethod: number) {
      let self = this;
      self.dataContentcategoryList = ko.observableArray(categoryList);
      self.selectedRecoveryMethod = ko.observable(selectedRecoveryMethod);
    }
  }

  export class Output {
    categoryTable: CategoryTableList;
    systemChargeCategory: boolean;
  }

  export class CategoryTableList {
    categoryId: string;
    systemType: number

    constructor(categoryId: string, systemType: number) {
      var self = this;
      self.categoryId = categoryId;
      self.systemType = systemType;
    }
  }

  /**
   * F:データ復旧期間変更
   */
  export class ChangeDataRecoveryPeriod {
    changeDataCategoryList: KnockoutObservableArray<CategoryInfo>;
    constructor(categoryList: Array<any>) {
      let self = this;
      self.changeDataCategoryList = ko.observableArray(categoryList);
    }
  }

  /**
   * G:
   */
  export class DateValueDto {
    dateRange: KnockoutObservable<any>;
    monthRange: KnockoutObservable<any>;
    yearRange: KnockoutObservable<any>;
    constructor() {
      this.dateRange = ko.observable({ startDate: moment.utc().subtract(1, 'months').add(1, 'days').format("YYYY/MM/DD"), endDate: moment.utc().format("YYYY/MM/DD") });
      this.monthRange = ko.observable({ startDate: moment.utc().format("YYYY/MM"), endDate: moment.utc().format("YYYY/MM") });
      this.yearRange = ko.observable({ startDate: moment.utc().format("YYYY"), endDate: moment.utc().format("YYYY") });
    }
  }


  /**
   * H:データ復旧サマリ
   */
  export class DataRecoverySummary {
    recoveryCategoryList: KnockoutObservableArray<CategoryInfo>;
    recoveryMethod: KnockoutObservable<number>;
    recoveryEmployee: KnockoutObservableArray<EmployeeSearchDto>;
    selectedEmployee: KnockoutObservableArray<any>;
    constructor(recoveryCategoryList: Array<any>, recoveryMethod: number, recoveryEmployee: Array<any>, selectedEmployee: Array<any>) {
      let self = this;
      self.recoveryCategoryList = ko.observableArray(recoveryCategoryList);
      self.recoveryMethod = ko.observable(recoveryMethod);
      self.recoveryEmployee = ko.observableArray(recoveryEmployee);
      self.selectedEmployee = ko.observableArray(selectedEmployee);
    }
  }

  export class ManualSettingModal {
    passwordAvailability: number;
    saveSetName: string;
    referenceDate: string;
    compressedPassword: string;
    executionDateAndTime: string;
    daySaveEndDate: string;
    daySaveStartDate: string;
    monthSaveEndDate: string;
    monthSaveStartDate: string;
    suppleExplanation: string;
    endYear: number;
    startYear: number;
    presenceOfEmployee: number;
    employees: TargetEmployee[];
    category: CategoryTableList[];
    patternCode: string;

    constructor(passwordAvailability: number, saveSetName: string, referenceDate: string, compressedPassword: string,
      executionDateAndTime: string, daySaveEndDate: string, daySaveStartDate: string, monthSaveEndDate: string, monthSaveStartDate: string,
      suppleExplanation: string, endYear: number, startYear: number, presenceOfEmployee: number, 
      employees: UnitModel[], category: CategoryTableList[], patternCode: string) {
      this.passwordAvailability = passwordAvailability;
      this.saveSetName = saveSetName;
      this.referenceDate = referenceDate;
      this.compressedPassword = compressedPassword;
      this.executionDateAndTime = executionDateAndTime;
      this.daySaveEndDate = daySaveEndDate;
      this.daySaveStartDate = daySaveStartDate;
      this.monthSaveEndDate = monthSaveEndDate;
      this.monthSaveStartDate = monthSaveStartDate;
      this.suppleExplanation = suppleExplanation;
      this.endYear = endYear;
      this.startYear = startYear;
      this.presenceOfEmployee = presenceOfEmployee;
      this.employees = _.map(employees, e => new TargetEmployee(e.id, e.code, e.name));
      this.category = category;
      this.patternCode = patternCode;
    }
  }

  export class TargetEmployee {
    sid: string;
    scd: string;
    name: string;

    constructor(sid: string, scd: string, name: string) {
      this.sid = sid;
      this.scd = scd;
      this.name = name;
    }
  }

  export interface EmployeeSearchDto {
    employeeId: string;
    employeeCode: string;
    employeeName: string;
    workplaceId: string;
    workplaceName: string;
  }

  /**
   * KCP005
   */
  export class ListType {
    static EMPLOYMENT = 1;
    static CLASSIFICATION = 2;
    static JOB_TITLE = 3;
    static EMPLOYEE = 4;
  }

  export interface GroupOption {
    /** Common properties */
    showEmployeeSelection?: boolean; // 検索タイプ
    systemType: number; // システム区分
    showQuickSearchTab?: boolean; // クイック検索
    showAdvancedSearchTab?: boolean; // 詳細検索
    showBaseDate?: boolean; // 基準日利用
    showClosure?: boolean; // 就業締め日利用
    showAllClosure?: boolean; // 全締め表示
    showPeriod?: boolean; // 対象期間利用
    periodFormatYM?: boolean; // 対象期間精度
    maxPeriodRange?: string; // 最長期間
    showSort?: boolean; // 並び順利用
    nameType?: number; // 氏名の種類

    /** Required parameter */
    baseDate?: any; // 基準日 KnockoutObservable<string> or string
    periodStartDate?: any; // 対象期間開始日 KnockoutObservable<string> or string
    periodEndDate?: any; // 対象期間終了日 KnockoutObservable<string> or string
    dateRangePickerValue?: KnockoutObservable<any>;
    inService: boolean; // 在職区分
    leaveOfAbsence: boolean; // 休職区分
    closed: boolean; // 休業区分
    retirement: boolean; // 退職区分

    /** Quick search tab options */
    showAllReferableEmployee?: boolean; // 参照可能な社員すべて
    showOnlyMe?: boolean; // 自分だけ
    showSameDepartment?: boolean; //同じ部門の社員
    showSameDepartmentAndChild?: boolean; // 同じ部門とその配下の社員
    showSameWorkplace?: boolean; // 同じ職場の社員
    showSameWorkplaceAndChild?: boolean; // 同じ職場とその配下の社員

    /** Advanced search properties */
    showEmployment?: boolean; // 雇用条件
    showDepartment?: boolean; // 部門条件
    showWorkplace?: boolean; // 職場条件
    showClassification?: boolean; // 分類条件
    showJobTitle?: boolean; // 職位条件
    showWorktype?: boolean; // 勤種条件
    isMutipleCheck?: boolean; // 選択モード

    /** Optional properties */
    isInDialog?: boolean;
    showOnStart?: boolean;
    isTab2Lazy?: boolean;
    tabindex?: number;

    /** Data returned */
    returnDataFromCcg001: (data: Ccg001ReturnedData) => void;
  }

  export interface Ccg001ReturnedData {
    baseDate: string; // 基準日
    closureId?: number; // 締めID
    periodStart: string; // 対象期間（開始)
    periodEnd: string; // 対象期間（終了）
    listEmployee: Array<EmployeeSearchDto>; // 検索結果
  }

  export interface UnitModel {
    code: string;
    id: string;
    name?: string;
    workplaceName?: string;
    isAlreadySetting?: boolean;
  }

  export interface DateDto {
    startDate: string;
    endDate: string;
  }

  export class SelectType {
    static SELECT_BY_SELECTED_CODE = 1;
    static SELECT_ALL = 2;
    static SELECT_FIRST_ITEM = 3;
    static NO_SELECT = 4;
  }
}