var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg;
                (function (ccg_1) {
                    var share;
                    (function (share) {
                        var ccg;
                        (function (ccg) {
                            var ListType = kcp.share.list.ListType;
                            var StartMode = kcp.share.tree.StartMode;
                            var SelectType = kcp.share.list.SelectType;
                            var EmployeeRangeSelection = ccg.service.model.EmployeeRangeSelection;
                            var viewmodel;
                            (function (viewmodel) {
                                /**
                                * Screen Model.
                                */
                                var ListGroupScreenModel = /** @class */ (function () {
                                    /**
                                     * Init screen model
                                     */
                                    function ListGroupScreenModel() {
                                        this.isApplySearchDone = true;
                                        this.hasShownErrorDialog = false;
                                        // flags
                                        this.isFirstTime = true;
                                        this.isHeightFixed = false;
                                        this.tab2HasLoaded = false;
                                        this.isTab2Lazy = true;
                                        this.employmentSubscriptions = [];
                                        this.employeeSubscriptions = [];
                                        var self = this;
                                        self.initQueryParam();
                                        // init datasource
                                        self.initDatasource();
                                        // init selected values
                                        self.selectedTab = ko.observable('tab-1');
                                        self.selectedCodeEmployment = ko.observableArray([]);
                                        self.selectedCodeClassification = ko.observableArray([]);
                                        self.selectedCodeJobtitle = ko.observableArray([]);
                                        self.selectedCodeDepartment = ko.observableArray([]);
                                        self.selectedCodeWorkplace = ko.observableArray([]);
                                        self.selectedCodeEmployee = ko.observableArray([]);
                                        self.closureList = ko.observableArray([]);
                                        self.selectedClosure = ko.observable(null);
                                        // init reserved employee list.
                                        self.reservedEmployees = ko.observableArray([]);
                                        self.reservedEmployeesTab3 = ko.observableArray([]);
                                        // date picker
                                        self.inputBaseDate = ko.observable('');
                                        self.inputPeriod = ko.observable(new DateRangePickerModel(moment().toISOString(), moment().toISOString()));
                                        self.retirePeriod = ko.observable(new DateRangePickerModel('1900/01/01', moment().format(CcgDateFormat.YMD)));
                                        self.retireStart = ko.computed(function () {
                                            return _.replace(self.retirePeriod().startDate, /\//g, '-');
                                        });
                                        self.retireEnd = ko.computed(function () {
                                            return _.replace(self.retirePeriod().endDate, /\//g, '-');
                                        });
                                        // flags
                                        self.isShow = ko.observable(false);
                                        self.isOpenStatusOfEmployeeList = ko.observable(false);
                                        self.isOpenEmploymentList = ko.observable(false);
                                        self.isOpenClassificationList = ko.observable(false);
                                        self.isOpenJoptitleList = ko.observable(false);
                                        self.isOpenDepartmentList = ko.observable(false);
                                        self.isOpenWorkplaceList = ko.observable(false);
                                        self.isOpenWorkTypeList = ko.observable(false);
                                        self.isFocusAdvancedSearchTab = ko.pureComputed(function () {
                                            return self.selectedTab() == 'tab-2';
                                        });
                                        // search reference date & period
                                        self.acquiredBaseDate = ko.observable('');
                                        // status of employee
                                        self.selectedIncumbent = ko.observable(true);
                                        self.selectedClosed = ko.observable(true);
                                        self.selectedLeave = ko.observable(true);
                                        self.selectedRetirement = ko.observable(false);
                                        //WorkType
                                        self.listWorkType = ko.observableArray([]);
                                        self.selectedWorkTypeCode = ko.observableArray([]);
                                        // init computed values
                                        self.initComputedValues();
                                    }
                                    /**
                                     * Initialize computed values
                                     */
                                    ListGroupScreenModel.prototype.initComputedValues = function () {
                                        var self = this;
                                        self.baseDate = ko.computed(function () {
                                            return moment.utc(self.inputBaseDate());
                                        });
                                        self.periodStart = ko.computed(function () {
                                            return moment.utc(self.inputPeriod().startDate, CcgDateFormat.YMD);
                                        });
                                        self.periodEnd = ko.computed(function () {
                                            return moment.utc(self.inputPeriod().endDate, CcgDateFormat.YMD);
                                        });
                                        self.isValidInput = ko.computed(function () {
                                            // trigger computing when base date or period changed
                                            self.inputBaseDate();
                                            self.inputPeriod();
                                            self.retirePeriod();
                                            return !($('#inp_baseDate').ntsError('hasError') ||
                                                $('#ccg001-search-period .ntsDateRangeComponent').ntsError('hasError') ||
                                                $('#ccg001-search-period .ntsStartDate input').ntsError('hasError') ||
                                                $('#ccg001-search-period .ntsEndDate input').ntsError('hasError') ||
                                                $('#ccg001-retire-period .ntsDateRangeComponent').ntsError('hasError') ||
                                                $('#ccg001-retire-period .ntsStartDate input').ntsError('hasError') ||
                                                $('#ccg001-retire-period .ntsEndDate input').ntsError('hasError'));
                                        });
                                        self.isValidEntryDateSearch = ko.computed(function () {
                                            self.entryDateTab3();
                                            return self.isValidInput() &&
                                                !($('#ccg001-date-entry .ntsDateRangeComponent').ntsError('hasError') ||
                                                    $('#ccg001-date-entry .ntsStartDate input').ntsError('hasError') ||
                                                    $('#ccg001-date-entry .ntsEndDate input').ntsError('hasError'));
                                        });
                                        self.isValidRetirementDateSearch = ko.computed(function () {
                                            self.retirementDateTab3();
                                            return self.isValidInput() &&
                                                !($('#ccg001-date-retirement .ntsDateRangeComponent').ntsError('hasError') ||
                                                    $('#ccg001-date-retirement .ntsStartDate input').ntsError('hasError') ||
                                                    $('#ccg001-date-retirement .ntsEndDate input').ntsError('hasError'));
                                        });
                                    };
                                    /**
                                     * Initialize subscribers
                                     */
                                    ListGroupScreenModel.prototype.initSubscribers = function () {
                                        var _this = this;
                                        var self = this;
                                        self.baseDate.subscribe(function (vl) {
                                            self.applyDataSearch();
                                        });
                                        self.selectedTab.subscribe(function (vl) {
                                            if (vl == 'tab-2' && !self.tab2HasLoaded) {
                                                self.reloadAdvanceSearchTab();
                                            }
                                        });
                                        self.selectedTab.valueHasMutated();
                                        self.inputPeriod.subscribe(function (value) {
                                            if (!$('.ntsDatepicker').ntsError('hasError')) {
                                                _.defer(function () { return self.applyDataSearch(); });
                                            }
                                        });
                                        self.isValidInput.subscribe(function (isValid) {
                                            var self = _this;
                                            var executionButton = $('.has-state');
                                            var verticalButtons = executionButton.find('.ccg-btn-vertical');
                                            if (isValid) {
                                                executionButton.removeClass('disabled');
                                                executionButton.attr('tabindex', self.ccg001Tabindex);
                                                verticalButtons.attr('tabindex', self.ccg001Tabindex);
                                            }
                                            else {
                                                executionButton.addClass('disabled');
                                                executionButton.removeAttr('tabindex');
                                                verticalButtons.removeAttr('tabindex');
                                            }
                                        });
                                    };
                                    /**
                                     * Init datasource
                                     */
                                    ListGroupScreenModel.prototype.initDatasource = function () {
                                        var self = this;
                                        self.tabs = ko.observableArray([]);
                                        self.incumbentDatasource = ko.observableArray([
                                            { code: true, name: nts.uk.resource.getText("CCG001_40") },
                                            { code: false, name: nts.uk.resource.getText("CCG001_41") }
                                        ]);
                                        self.closedDatasource = ko.observableArray([
                                            { code: true, name: nts.uk.resource.getText("CCG001_40") },
                                            { code: false, name: nts.uk.resource.getText("CCG001_41") }
                                        ]);
                                        self.leaveOfAbsenceDatasource = ko.observableArray([
                                            { code: true, name: nts.uk.resource.getText("CCG001_40") },
                                            { code: false, name: nts.uk.resource.getText("CCG001_41") }
                                        ]);
                                        self.retirementDatasource = ko.observableArray([
                                            { code: true, name: nts.uk.resource.getText("CCG001_40") },
                                            { code: false, name: nts.uk.resource.getText("CCG001_41") }
                                        ]);
                                        // Define gridlist's columns
                                        self.workTypeColumns = ko.observableArray([
                                            { headerText: nts.uk.resource.getText('CCG001_60'), prop: 'businessTypeCode', width: 100 },
                                            { headerText: nts.uk.resource.getText('CCG001_61'), prop: 'businessTypeName', width: 200 }
                                        ]);
                                        self.employeeListTab3 = ko.observableArray([]);
                                        self.selectedEmployeesTab3 = ko.observableArray([]);
                                        self.inputNameTab3 = ko.observable("");
                                        self.inputCodeTab3 = ko.observable("");
                                        self.entryDateTab3 = ko.observable({});
                                        self.retirementDateTab3 = ko.observable({});
                                    };
                                    /**
                                     * Set QuickSearchParam
                                     */
                                    ListGroupScreenModel.prototype.setQuickSearchParam = function () {
                                        var dfd = $.Deferred();
                                        var self = this;
                                        var param = self.queryParam;
                                        param.filterByEmployment = false;
                                        param.employmentCodes = [];
                                        param.filterByDepartment = false;
                                        param.departmentCodes = [];
                                        param.filterByWorkplace = false;
                                        param.workplaceCodes = [];
                                        param.filterByClassification = false;
                                        param.classificationCodes = [];
                                        param.filterByJobTitle = false;
                                        param.jobTitleCodes = [];
                                        param.filterByWorktype = false;
                                        param.worktypeCodes = [];
                                        param.filterByClosure = false;
                                        param.closureIds = [];
                                        param.includeIncumbents = true;
                                        param.includeWorkersOnLeave = true;
                                        param.includeOccupancy = true;
                                        param.includeRetirees = false;
                                        param.systemType = self.systemType;
                                        param.sortOrderNo = 1; // 並び順NO＝1
                                        param.nameType = 1; // ビジネスネーム（日本語）
                                        param.employeesDoNotManageSchedules = self.employeesDoNotManageSchedules();
                                        // set employments code condition
                                        if (self.showClosure && self.selectedClosure() != ConfigEnumClosure.CLOSURE_ALL) {
                                            ccg.service.getEmploymentCodeByClosureId(self.selectedClosure()).done(function (data) {
                                                param.filterByEmployment = true;
                                                param.employmentCodes = data;
                                                dfd.resolve();
                                            });
                                        }
                                        else {
                                            dfd.resolve();
                                        }
                                        return dfd.promise();
                                    };
                                    ListGroupScreenModel.prototype.initQueryParam = function () {
                                        var self = this;
                                        self.queryParam = {};
                                        self.queryParam.sortOrderNo = 1; // 並び順NO＝1
                                        self.queryParam.nameType = 1; // ビジネスネーム（日本語）
                                        self.queryParam.baseDate = moment().format(CcgDateFormat.DEFAULT_FORMAT);
                                    };
                                    /**
                                     * update select tabs
                                     */
                                    ListGroupScreenModel.prototype.updateTabs = function () {
                                        var self = this;
                                        var arrTabs = [];
                                        // is quick search tab
                                        if (self.showQuickSearchTab) {
                                            // push tab 1
                                            arrTabs.push({
                                                id: 'tab-1',
                                                title: nts.uk.resource.getText("CCG001_22"),
                                                content: '.tab-content-1',
                                            });
                                        }
                                        // is advanced search tab
                                        if (self.showAdvancedSearchTab) {
                                            // push tab 2
                                            arrTabs.push({
                                                id: 'tab-2',
                                                title: nts.uk.resource.getText("CCG001_23"),
                                                content: '.tab-content-2',
                                            });
                                        }
                                        arrTabs.push({
                                            id: 'tab-3',
                                            title: nts.uk.resource.getText("CCG001_103"),
                                            content: '#ccg001-tab-content-3',
                                        });
                                        // => data res
                                        return arrTabs;
                                    };
                                    /**
                                     * get tab by update selected
                                     */
                                    ListGroupScreenModel.prototype.updateSelectedTab = function () {
                                        var self = this;
                                        // res tab 1
                                        if (self.showQuickSearchTab) {
                                            return 'tab-1';
                                        }
                                        // res tab 2
                                        if (self.showAdvancedSearchTab) {
                                            return 'tab-2';
                                        }
                                        // res none tab
                                        return '';
                                    };
                                    /**
                                     * init next tab
                                     */
                                    ListGroupScreenModel.prototype.initNextTabFeature = function () {
                                        var self = this;
                                        var TAB_KEY_CODE = 9;
                                        // when tab to last item of tab 1
                                        $('#component-ccg001 .tab-content-1').children().last().on('keydown', function (e) {
                                            if (e.which == TAB_KEY_CODE && self.showAdvancedSearchTab) {
                                                // switch to tab 2
                                                self.selectedTab('tab-2');
                                            }
                                            if (e.which == TAB_KEY_CODE && !self.showAdvancedSearchTab) {
                                                // switch to tab 3
                                                self.selectedTab('tab-3');
                                            }
                                        });
                                        // when tab to last item of tab 2
                                        if (self.showEmployeeSelection) {
                                            $('#ccg001-btn-advanced-search').on('keydown', function (e) {
                                                if (e.which == TAB_KEY_CODE) {
                                                    // switch to tab 3
                                                    self.selectedTab('tab-3');
                                                }
                                            });
                                        }
                                        else {
                                            $('#ccg001-btn-KCP005-apply').on('keydown', function (e) {
                                                if (e.which == TAB_KEY_CODE) {
                                                    // switch to tab 3
                                                    self.selectedTab('tab-3');
                                                }
                                            });
                                        }
                                        // auto open accordion
                                        $('#StatusOfEmployeeList').on('keydown', function (e) {
                                            if (e.which == TAB_KEY_CODE && !self.isOpenStatusOfEmployeeList()) {
                                                $('#tab-2 #StatusOfEmployeeList .ui-accordion-header').click();
                                                self.isOpenStatusOfEmployeeList(true);
                                            }
                                        });
                                        $('#EmploymentList').on('keydown', function (e) {
                                            if (e.which == TAB_KEY_CODE && !self.isOpenEmploymentList()) {
                                                $('#tab-2 #EmploymentList .ui-accordion-header').click();
                                                self.isOpenEmploymentList(true);
                                            }
                                        });
                                        $('#ClassificationList').on('keydown', function (e) {
                                            if (e.which == TAB_KEY_CODE && !self.isOpenClassificationList()) {
                                                $('#tab-2 #ClassificationList .ui-accordion-header').click();
                                                self.isOpenClassificationList(true);
                                            }
                                        });
                                        $('#JoptitleList').on('keydown', function (e) {
                                            if (e.which == TAB_KEY_CODE && !self.isOpenJoptitleList()) {
                                                $('#tab-2 #JoptitleList .ui-accordion-header').click();
                                                self.isOpenJoptitleList(true);
                                            }
                                        });
                                        $('#DepartmentList').on('keydown', function (e) {
                                            if (e.which == TAB_KEY_CODE && !self.isOpenDepartmentList()) {
                                                $('#tab-2 #DepartmentList .ui-accordion-header').click();
                                                self.isOpenDepartmentList(true);
                                            }
                                        });
                                        $('#WorkplaceList').on('keydown', function (e) {
                                            if (e.which == TAB_KEY_CODE && !self.isOpenWorkplaceList()) {
                                                $('#tab-2 #WorkplaceList .ui-accordion-header').click();
                                                self.isOpenWorkplaceList(true);
                                            }
                                        });
                                        $('#WorkTypeList').on('keydown', function (e) {
                                            if (e.which == TAB_KEY_CODE && !self.isOpenWorkTypeList()) {
                                                $('#tab-2 #WorkTypeList .ui-accordion-header').click();
                                                self.isOpenWorkTypeList(true);
                                            }
                                        });
                                        $("#ccg001-input-code").on("keydown", function (e) {
                                            if (e.keyCode == 13) {
                                                self.inputCodeTab3($(this).val());
                                                $('#ccg001-tab3-search-by-code').click();
                                            }
                                        });
                                        $("#ccg001-inp-name").on("keydown", function (e) {
                                            if (e.keyCode == 13) {
                                                self.inputNameTab3($(this).val());
                                                $('#ccg001-tab3-search-by-name').click();
                                            }
                                        });
                                        $("#ccg001-date-entry .ntsStartDate input").on("keydown", function (e) {
                                            if (e.keyCode == 13) {
                                                $(this).blur();
                                                self.entryDateTab3({ startDate: $(this).val(), endDate: self.entryDateTab3().endDate });
                                                self.entryDateTab3.valueHasMutated();
                                                self.validateTab3EntryDate();
                                                $(this).focus();
                                                if (self.isValidEntryDateSearch()) {
                                                    $('#search-by-entry-date').click();
                                                }
                                            }
                                        });
                                        $("#ccg001-date-entry .ntsEndDate input").on("keydown", function (e) {
                                            if (e.keyCode == 13) {
                                                $(this).blur();
                                                self.entryDateTab3({ startDate: self.entryDateTab3().startDate, endDate: $(this).val() });
                                                self.entryDateTab3.valueHasMutated();
                                                self.validateTab3EntryDate();
                                                $(this).focus();
                                                if (self.isValidEntryDateSearch()) {
                                                    $('#search-by-entry-date').click();
                                                }
                                            }
                                        });
                                        $("#ccg001-date-retirement .ntsStartDate input").on("keydown", function (e) {
                                            if (e.keyCode == 13) {
                                                $(this).blur();
                                                self.retirementDateTab3({ startDate: $(this).val(), endDate: self.retirementDateTab3().endDate });
                                                self.retirementDateTab3.valueHasMutated();
                                                self.validateTab3DateRetirement();
                                                $(this).focus();
                                                if (self.isValidRetirementDateSearch()) {
                                                    self.searchByRetirementDate();
                                                }
                                            }
                                        });
                                        $("#ccg001-date-retirement .ntsEndDate input").on("keydown", function (e) {
                                            if (e.keyCode == 13) {
                                                $(this).blur();
                                                self.retirementDateTab3({ startDate: self.retirementDateTab3().startDate, endDate: $(this).val() });
                                                self.retirementDateTab3.valueHasMutated();
                                                self.validateTab3DateRetirement();
                                                $(this).focus();
                                                if (self.isValidRetirementDateSearch()) {
                                                    self.searchByRetirementDate();
                                                }
                                            }
                                        });
                                    };
                                    ListGroupScreenModel.prototype.validateTab3EntryDate = function () {
                                        $('#ccg001-date-entry .ntsDateRangeComponent').trigger('validate');
                                        $('#ccg001-date-entry .ntsStartDate input').trigger('validate');
                                        $('#ccg001-date-entry .ntsEndDate input').trigger('validate');
                                    };
                                    ListGroupScreenModel.prototype.validateTab3DateRetirement = function () {
                                        $('#ccg001-date-retirement .ntsDateRangeComponent').trigger('validate');
                                        $('#ccg001-date-retirement .ntsStartDate input').trigger('validate');
                                        $('#ccg001-date-retirement .ntsEndDate input').trigger('validate');
                                    };
                                    /**
                                     * Init component.
                                     */
                                    ListGroupScreenModel.prototype.init = function ($input, data) {
                                        var dfd = $.Deferred();
                                        var self = this;
                                        // set component properties
                                        self.setProperties(data);
                                        var initComponent = function () {
                                            // start component
                                            nts.uk.ui.block.invisible(); // block ui
                                            self.startComponent().done(function () {
                                                self.setShowHideByReferenceRange();
                                                // Initial tab panel
                                                self.tabs(self.updateTabs());
                                                self.selectedTab(self.updateSelectedTab());
                                                // init view
                                                $input.html(CCG001_HTML);
                                                _.defer(function () {
                                                    ko.cleanNode($input[0]);
                                                    ko.applyBindings(self, $input[0]);
                                                    // Set tabindex
                                                    self.initNextTabFeature();
                                                    $('#ccg001-btn-search-drawer').attr('tabindex', self.ccg001Tabindex);
                                                    // init ccg show/hide event
                                                    self.initCcgEvent();
                                                    // set component height
                                                    self.setComponentHeight();
                                                    if (data.showOnStart) {
                                                        self.showComponent().done(function () { return dfd.resolve(); });
                                                    }
                                                    else {
                                                        dfd.resolve();
                                                    }
                                                    nts.uk.ui.block.clear();
                                                });
                                            });
                                        };
                                        if (_.isNil(ko.dataFor(document.body))) {
                                            nts.uk.ui.viewModelApplied.add(initComponent);
                                        }
                                        else {
                                            initComponent();
                                        }
                                        return dfd.promise();
                                    };
                                    ListGroupScreenModel.prototype.setShowHideByReferenceRange = function () {
                                        var self = this;
                                        // set advanced search tab flag
                                        self.showAdvancedSearchTab = self.systemType == ConfigEnumSystemType.ADMINISTRATOR ? true :
                                            self.showAdvancedSearchTab;
                                        // always show quick search if advanced search is hidden
                                        self.showQuickSearchTab = self.showAdvancedSearchTab ? self.showQuickSearchTab : true;
                                        self.showAllReferableEmployee = self.systemType == ConfigEnumSystemType.ADMINISTRATOR ? true :
                                            self.showAllReferableEmployee;
                                        // 部門対応 #106786
                                        self.showSameDepartment = self.systemType == ConfigEnumSystemType.ADMINISTRATOR ? true :
                                            self.showSameDepartment;
                                        self.showSameDepartmentAndChild = self.systemType == ConfigEnumSystemType.ADMINISTRATOR ? true :
                                            (self.referenceRange == EmployeeReferenceRange.ALL_REFERENCE_RANGE
                                                || self.referenceRange == EmployeeReferenceRange.AFFILIATION_AND_ALL_SUBORDINATES)
                                                && self.showSameDepartmentAndChild;
                                        self.showSameWorkplace = self.systemType == ConfigEnumSystemType.ADMINISTRATOR ? true :
                                            self.referenceRange != EmployeeReferenceRange.ONLY_MYSELF && self.showSameWorkplace;
                                        self.showSameWorkplaceAndChild = self.systemType == ConfigEnumSystemType.ADMINISTRATOR ? true :
                                            (self.referenceRange == EmployeeReferenceRange.ALL_REFERENCE_RANGE
                                                || self.referenceRange == EmployeeReferenceRange.AFFILIATION_AND_ALL_SUBORDINATES)
                                                && self.showSameWorkplaceAndChild;
                                    };
                                    /**
                                     * Start component
                                     */
                                    ListGroupScreenModel.prototype.startComponent = function () {
                                        var dfd = $.Deferred();
                                        var self = this;
                                        $.when(ccg.service.getRefRangeBySysType(self.systemType), self.loadClosure()).done(function (refRange, noValue) {
                                            self.referenceRange = refRange;
                                            self.loadWkpManagedByLoginnedUser().done(function () {
                                                dfd.resolve();
                                            }).fail(function (err) { return nts.uk.ui.dialog.alertError(err); });
                                        }).fail(function (err) { return nts.uk.ui.dialog.alertError(err); });
                                        return dfd.promise();
                                    };
                                    ListGroupScreenModel.prototype.loadWkpManagedByLoginnedUser = function () {
                                        var dfd = $.Deferred();
                                        var self = this, isCheckForAdvancedSearch = self.showAdvancedSearchTab && self.systemType === ConfigEnumSystemType.EMPLOYMENT && self.referenceRange === EmployeeReferenceRange.ONLY_MYSELF, isCheckForAllReferable = self.showAllReferableEmployee && self.referenceRange === EmployeeReferenceRange.ONLY_MYSELF;
                                        if (isCheckForAdvancedSearch || isCheckForAllReferable) {
                                            ccg.service.getCanManageWpkForLoginUser().done(function (manageWkp) {
                                                self.checkForAdvancedSearch(manageWkp);
                                                self.checkForAllReferable(manageWkp);
                                                dfd.resolve();
                                            }).fail(function (err) { return dfd.reject(err); });
                                        }
                                        else {
                                            self.checkForAdvancedSearch([]);
                                            self.checkForAllReferable([]);
                                            dfd.resolve();
                                        }
                                        return dfd.promise();
                                    };
                                    ListGroupScreenModel.prototype.checkForAdvancedSearch = function (manageWkp) {
                                        var self = this;
                                        if (self.showAdvancedSearchTab) {
                                            if (self.systemType === ConfigEnumSystemType.EMPLOYMENT) {
                                                if (self.referenceRange === EmployeeReferenceRange.ONLY_MYSELF && _.isEmpty(manageWkp)) {
                                                    self.showAdvancedSearchTab = false;
                                                }
                                            }
                                        }
                                    };
                                    ListGroupScreenModel.prototype.checkForAllReferable = function (manageWkp) {
                                        var self = this;
                                        if (self.systemType === ConfigEnumSystemType.ADMINISTRATOR) {
                                            self.showAllReferableEmployee = true;
                                        }
                                        else {
                                            if (self.showAllReferableEmployee) {
                                                if (self.systemType === ConfigEnumSystemType.EMPLOYMENT
                                                    && self.referenceRange === EmployeeReferenceRange.ONLY_MYSELF
                                                    && _.isEmpty(manageWkp)) {
                                                    self.showAdvancedSearchTab = false;
                                                    self.showAllReferableEmployee = false;
                                                    self.showSameDepartment = false;
                                                    self.showSameWorkplace = false;
                                                }
                                                if (self.systemType !== ConfigEnumSystemType.EMPLOYMENT
                                                    && self.referenceRange === EmployeeReferenceRange.ONLY_MYSELF
                                                    && !_.isEmpty(manageWkp)) {
                                                    self.showAdvancedSearchTab = false;
                                                    self.showAllReferableEmployee = false;
                                                    self.showSameWorkplace = false;
                                                }
                                            }
                                        }
                                    };
                                    /**
                                     * Set advanced search param
                                     */
                                    ListGroupScreenModel.prototype.setAdvancedSearchParam = function () {
                                        var self = this;
                                        var param = this.queryParam;
                                        param.referenceRange = SearchReferenceRange.ALL_REFERENCE_RANGE;
                                        // filter param
                                        param.filterByEmployment = self.showEmployment;
                                        param.filterByDepartment = self.showDepartment;
                                        param.filterByWorkplace = self.showWorkplace;
                                        param.filterByClassification = self.showClassification;
                                        param.filterByJobTitle = self.showJobTitle;
                                        param.filterByWorktype = self.showWorktype;
                                        param.filterByClosure = self.showClosure && self.selectedClosure() != ConfigEnumClosure.CLOSURE_ALL;
                                        // filter status of employment
                                        param.includeIncumbents = self.selectedIncumbent();
                                        param.includeWorkersOnLeave = self.selectedLeave();
                                        param.includeOccupancy = self.selectedClosed();
                                        param.includeRetirees = self.selectedRetirement();
                                        param.retireStart = self.retireStart();
                                        param.retireEnd = self.retireEnd();
                                        param.systemType = self.systemType;
                                        param.employeesDoNotManageSchedules = self.employeesDoNotManageSchedules();
                                        self.queryParam.employmentCodes = self.showEmployment ? self.selectedCodeEmployment() : [];
                                        self.queryParam.classificationCodes = self.showClassification ? self.selectedCodeClassification() : [];
                                        self.queryParam.jobTitleCodes = self.showJobTitle ? self.selectedCodeJobtitle() : [];
                                        self.queryParam.departmentCodes = self.showDepartment ? self.selectedCodeDepartment() : [];
                                        self.queryParam.workplaceCodes = self.showWorkplace ? self.selectedCodeWorkplace() : [];
                                        self.queryParam.worktypeCodes = self.showWorktype ? self.selectedWorkTypeCode() : [];
                                        self.queryParam.closureIds = self.showClosure ? [self.selectedClosure()] : [];
                                    };
                                    /**
                                     * Set component properties
                                     */
                                    ListGroupScreenModel.prototype.setProperties = function (options) {
                                        var self = this;
                                        /** Common properties */
                                        self.showEmployeeSelection = _.isNil(options.showEmployeeSelection) ? false : options.showEmployeeSelection;
                                        self.systemType = _.isNil(options.systemType) ? ConfigEnumSystemType.PERSONAL_INFORMATION : options.systemType;
                                        self.employeesDoNotManageSchedules = _.isNil(options.employeesDoNotManageSchedules) ? ko.observable(false) : options.employeesDoNotManageSchedules;
                                        self.showQuickSearchTab = _.isNil(options.showQuickSearchTab) ? true : options.showQuickSearchTab;
                                        self.showAdvancedSearchTab = _.isNil(options.showAdvancedSearchTab) ? true : options.showAdvancedSearchTab;
                                        // showBaseDate and showPeriod can not hide at the same time
                                        var isBaseDateAndPeriodHidden = !options.showBaseDate && !options.showPeriod;
                                        self.showBaseDate = _.isNil(options.showBaseDate) ? true : (isBaseDateAndPeriodHidden ? true : options.showBaseDate);
                                        self.showAllClosure = _.isNil(options.showAllClosure) ? true : options.showAllClosure;
                                        self.showPeriod = _.isNil(options.showPeriod) ? false : options.showPeriod;
                                        self.showClosure = _.isNil(options.showClosure) ? false : options.showClosure;
                                        // if ShowPeriod = false then period accuracy must be false too. 
                                        self.showPeriodYM = _.isNil(self.showPeriod) ? false : (self.showPeriod ? options.periodFormatYM : false);
                                        self.maxPeriodRange = options.maxPeriodRange ? options.maxPeriodRange : 'none';
                                        self.isTab2Lazy = _.isNil(options.isTab2Lazy) ? true : options.isTab2Lazy;
                                        /** Required parameter */
                                        self.setBaseDateAndPeriodOnInit(options);
                                        //                   3.14 #102965                
                                        //                self.selectedIncumbent(options.inService);
                                        //                self.selectedLeave(options.leaveOfAbsence);
                                        //                self.selectedClosed(options.closed);
                                        //                self.selectedRetirement(options.retirement);
                                        /** Quick search tab options */
                                        self.showAllReferableEmployee = _.isNil(options.showAllReferableEmployee) ? true : options.showAllReferableEmployee;
                                        self.showOnlyMe = true;
                                        self.showSameDepartment = _.isNil(options.showSameDepartment) ? false : options.showSameDepartment;
                                        self.showSameDepartmentAndChild = _.isNil(options.showSameDepartmentAndChild) ? false : options.showSameDepartmentAndChild;
                                        self.showSameWorkplace = _.isNil(options.showSameWorkplace) ? false : options.showSameWorkplace;
                                        self.showSameWorkplaceAndChild = _.isNil(options.showSameWorkplaceAndChild) ? false : options.showSameWorkplaceAndChild;
                                        /** Advanced search properties */
                                        // update ver 5.3
                                        self.showEmployment = _.isNil(options.showEmployment) ? false : options.showEmployment;
                                        self.showDepartment = _.isNil(options.showDepartment) ? false : options.showDepartment;
                                        self.showWorkplace = _.isNil(options.showWorkplace) ? false : options.showWorkplace;
                                        self.showClassification = _.isNil(options.showClassification) ? false : options.showClassification;
                                        self.showJobTitle = _.isNil(options.showJobTitle) ? false : options.showJobTitle;
                                        // up ver 5.3
                                        self.showWorktype = self.systemType == ConfigEnumSystemType.EMPLOYMENT && options.showWorktype;
                                        self.isMultiple = _.isNil(options.isMutipleCheck) ? true : options.isMutipleCheck;
                                        /** Optional properties */
                                        self.isInDialog = _.isNil(options.isInDialog) ? false : options.isInDialog;
                                        self.ccg001Tabindex = _.isNil(options.tabindex) ? 1 : options.tabindex;
                                        // return data function
                                        self.returnDataFromCcg001 = options.returnDataFromCcg001;
                                    };
                                    /**
                                     * Set component height
                                     */
                                    ListGroupScreenModel.prototype.setComponentHeight = function () {
                                        var self = this;
                                        var headerHeight = $('#header').outerHeight();
                                        var sidebarHeaderHeight = $('.sidebar-content-header').outerHeight(); // for screen with sidebar
                                        var functionAreaHeight = $('#functions-area').length > 0 ? $('#functions-area').outerHeight() : 0;
                                        var buffer = 25;
                                        var componentHeight = 0;
                                        // calculate component height
                                        if (self.isInDialog) {
                                            componentHeight = window.innerHeight - functionAreaHeight - buffer;
                                        }
                                        else {
                                            var notIncluded = headerHeight + functionAreaHeight + (sidebarHeaderHeight ? sidebarHeaderHeight : 0) + buffer;
                                            componentHeight = window.innerHeight - notIncluded;
                                        }
                                        var minHeight = 450;
                                        if (componentHeight < minHeight) {
                                            componentHeight = minHeight;
                                        }
                                        // set component height
                                        $('#component-ccg001').outerHeight(componentHeight);
                                        $('#ccg001-btn-search-drawer').outerHeight(componentHeight / 2);
                                        // set tab panel height.
                                        var tabpanelHeight = componentHeight - $('#ccg001-header').outerHeight(true) - 10;
                                        var tabpanelNavHeight = 85;
                                        var tabpanelContentHeight = tabpanelHeight - tabpanelNavHeight;
                                        $('.ccg-tabpanel.pull-left').outerHeight(tabpanelHeight);
                                        $('.ccg-tabpanel>#tab-1').css('height', tabpanelContentHeight);
                                        $('.ccg-tabpanel>#tab-2').css('height', tabpanelContentHeight);
                                        $('.ccg-tabpanel>#tab-3').css('height', tabpanelContentHeight);
                                    };
                                    /**
                                     * Load ListClosure
                                     */
                                    ListGroupScreenModel.prototype.loadClosure = function () {
                                        var _this = this;
                                        var self = this;
                                        var dfd = $.Deferred();
                                        if (self.showClosure) {
                                            ccg.service.getClosuresByBaseDate(self.baseDate().format(CcgDateFormat.DEFAULT_FORMAT)).done(function (data) {
                                                if (self.showAllClosure) {
                                                    data.unshift({
                                                        closureId: ConfigEnumClosure.CLOSURE_ALL,
                                                        closureName: ConfigEnumClosure.CLOSURE_ALL_NAME
                                                    });
                                                }
                                                // set closure list
                                                self.closureList(data);
                                                self.getSelectedClosure().done(function (selected) {
                                                    // set selected closure
                                                    self.selectedClosure(selected);
                                                    // initialize selected cosure subscriber
                                                    self.selectedClosure.subscribe(function (vl) {
                                                        // calculate period by current month
                                                        // self.calculatePeriod(parseInt(moment().format(CcgDateFormat.YEAR_MONTH))).done(period => {
                                                        self.calculatePeriod105458().done(function (period) {
                                                            self.isApplySearchDone = false;
                                                            self.inputPeriod(new DateRangePickerModel(self.showPeriodYM ? period.endDate : period.startDate, period.endDate));
                                                            self.inputBaseDate(period.endDate);
                                                            self.isApplySearchDone = true;
                                                            _this.saveEmployeeRangeSelection();
                                                            // apply data search
                                                            self.applyDataSearch();
                                                            self.employeeListTab3([]);
                                                        });
                                                    });
                                                    dfd.resolve();
                                                });
                                            });
                                        }
                                        else {
                                            dfd.resolve();
                                        }
                                        return dfd.promise();
                                    };
                                    /**
                                     * Get selected closure id
                                     */
                                    ListGroupScreenModel.prototype.getSelectedClosure = function () {
                                        var dfd = $.Deferred();
                                        var self = this;
                                        ccg.service.getEmployeeRangeSelection().done(function (data) {
                                            if (data) {
                                                // set employeeRangeSelection
                                                self.employeeRangeSelection = data;
                                                // get selected closure id
                                                switch (self.systemType) {
                                                    case ConfigEnumSystemType.PERSONAL_INFORMATION:
                                                        if (!nts.uk.util.isNullOrEmpty(data.personalInfo.selectedClosureId)) {
                                                            dfd.resolve(data.personalInfo.selectedClosureId);
                                                        }
                                                        else {
                                                            self.getSelectedClosureByEmployment().done(function (id) { return dfd.resolve(id); });
                                                        }
                                                        break;
                                                    case ConfigEnumSystemType.EMPLOYMENT:
                                                        if (!nts.uk.util.isNullOrEmpty(data.employmentInfo.selectedClosureId)) {
                                                            dfd.resolve(data.employmentInfo.selectedClosureId);
                                                        }
                                                        else {
                                                            self.getSelectedClosureByEmployment().done(function (id) { return dfd.resolve(id); });
                                                        }
                                                        break;
                                                    case ConfigEnumSystemType.SALARY:
                                                        if (!nts.uk.util.isNullOrEmpty(data.salaryInfo.selectedClosureId)) {
                                                            dfd.resolve(data.salaryInfo.selectedClosureId);
                                                        }
                                                        else {
                                                            self.getSelectedClosureByEmployment().done(function (id) { return dfd.resolve(id); });
                                                        }
                                                        break;
                                                    case ConfigEnumSystemType.HUMAN_RESOURCES:
                                                        if (!nts.uk.util.isNullOrEmpty(data.humanResourceInfo.selectedClosureId)) {
                                                            dfd.resolve(data.humanResourceInfo.selectedClosureId);
                                                        }
                                                        else {
                                                            self.getSelectedClosureByEmployment().done(function (id) { return dfd.resolve(id); });
                                                        }
                                                        break;
                                                    default: break; // systemType not found
                                                }
                                            }
                                            else {
                                                self.getSelectedClosureByEmployment().done(function (id) { return dfd.resolve(id); });
                                            }
                                        });
                                        return dfd.promise();
                                    };
                                    /**
                                     * Get selected closure by employment
                                     */
                                    ListGroupScreenModel.prototype.getSelectedClosureByEmployment = function () {
                                        var dfd = $.Deferred();
                                        ccg.service.getCurrentHistoryItem().done(function (item) {
                                            if (item) {
                                                ccg.service.getClosureTiedByEmployment(item.employmentCode).done(function (id) { return dfd.resolve(id); });
                                            }
                                            else {
                                                var DEFAULT_VALUE = 1;
                                                // Q&A: #88282 (update specs)
                                                dfd.resolve(DEFAULT_VALUE);
                                            }
                                        });
                                        return dfd.promise();
                                    };
                                    /**
                                     * Initial ccg event
                                     */
                                    ListGroupScreenModel.prototype.initCcgEvent = function () {
                                        var self = this;
                                        $(window).on('click', function (e) {
                                            // Check is click to inside component.
                                            if (e.target.id == "component-ccg001" || $(e.target).parents("#component-ccg001")[0]) {
                                                return;
                                            }
                                            // click when block ui
                                            if (!_.isEmpty($('div.ui-widget-overlay.ui-front'))) {
                                                return;
                                            }
                                            if (!_.isEmpty($('div.blockUI.blockOverlay'))) {
                                                return;
                                            }
                                            // check is click to errors notifier
                                            if (e.target.id == 'func-notifier-errors') {
                                                return;
                                            }
                                            // Check is click to dialog.
                                            if ($(e.target).parents("[role='dialog']")[0]) {
                                                return;
                                            }
                                            // Check is click to ignite combo-box.
                                            if ($(e.target).parents().hasClass('ui-igcombo-dropdown')) {
                                                return;
                                            }
                                            if (e.target.id == "hor-scroll-button-hide" || $(e.target).parents("#hor-scroll-button-hide")[0]) {
                                                return;
                                            }
                                            self.hideComponent();
                                        });
                                    };
                                    /**
                                     * Hide component
                                     */
                                    ListGroupScreenModel.prototype.hideComponent = function () {
                                        var self = this;
                                        if (self.isShow()) {
                                            $('#component-ccg001').toggle('slide', function () {
                                                self.errors = $('#component-ccg001 .error').children();
                                                self.errors.ntsError('clear');
                                                $('#component-ccg001').css('display', '');
                                                $('#component-ccg001').css('visibility', 'hidden');
                                            });
                                            self.isShow(false);
                                        }
                                    };
                                    /**
                                     * Show component
                                     */
                                    ListGroupScreenModel.prototype.showComponent = function () {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        if (self.isFirstTime) {
                                            // Apply data search & load Kcp components
                                            self.synchronizeDate();
                                            self.toggleSlide().done(function () { return $.when(self.applyDataSearch(), self.loadKcp005()).always(function () {
                                                // Set acquired base date to status period end date
                                                self.retirePeriod(new DateRangePickerModel('1900/01/01', self.queryParam.baseDate));
                                                // init subscribers
                                                self.initSubscribers();
                                                // update flag isFirstTime
                                                self.isFirstTime = false;
                                                dfd.resolve();
                                            }); });
                                        }
                                        else {
                                            // toggle slide ccg001
                                            self.toggleSlide().done(function () { return self.synchronizeDate(); });
                                            dfd.resolve();
                                        }
                                        return dfd.promise();
                                    };
                                    /**
                                     * Synchronize date with parent screen
                                     */
                                    ListGroupScreenModel.prototype.synchronizeDate = function () {
                                        var self = this;
                                        self.isApplySearchDone = false;
                                        // synchronize baseDate
                                        if (self.baseDateOfParentScreen) {
                                            var isSameDate = moment.isMoment(self.baseDateOfParentScreen()) ?
                                                self.baseDateOfParentScreen().isSame(self.inputBaseDate()) : self.inputBaseDate() == self.baseDateOfParentScreen();
                                            if (!isSameDate) {
                                                self.inputBaseDate(self.baseDateOfParentScreen());
                                            }
                                        }
                                        // synchronize period
                                        if (self.dateRangeOfParentScreen) {
                                            var dateRangeOfParentScreen = _.clone(self.dateRangeOfParentScreen());
                                            var isSameDate = DateRangePickerModel.isSamePeriod(dateRangeOfParentScreen, self.inputPeriod());
                                            if (!isSameDate) {
                                                self.inputPeriod(dateRangeOfParentScreen);
                                            }
                                        }
                                        else if (self.periodStartOfParentScreen) {
                                            var isSameDate = moment.isMoment(self.periodStartOfParentScreen()) ?
                                                self.periodStartOfParentScreen().isSame(self.inputPeriod().startDate) && self.periodEndOfParentScreen().isSame(self.inputPeriod().endDate) :
                                                self.periodStartOfParentScreen() == self.inputPeriod().startDate && self.periodEndOfParentScreen() == self.inputPeriod().endDate;
                                            if (!isSameDate) {
                                                self.inputPeriod(new DateRangePickerModel(self.periodStartOfParentScreen(), self.periodEndOfParentScreen()));
                                            }
                                        }
                                        // recheck errors
                                        if (!_.isEmpty(self.errors)) {
                                            self.errors.ntsError('check');
                                        }
                                        self.isApplySearchDone = true;
                                    };
                                    /**
                                     * Toggle slide CCG001
                                     */
                                    ListGroupScreenModel.prototype.toggleSlide = function () {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        if (self.isShow()) {
                                            return;
                                        }
                                        var componentElement = document.getElementById('component-ccg001');
                                        if (componentElement.style.visibility == 'hidden') {
                                            componentElement.style.removeProperty('visibility');
                                            componentElement.style.display = 'none';
                                        }
                                        $('#component-ccg001').toggle("slide", function () { return dfd.resolve(); });
                                        self.isShow(true);
                                        return dfd.promise();
                                    };
                                    /**
                                     * Load component KCP005
                                     */
                                    ListGroupScreenModel.prototype.loadKcp005 = function () {
                                        var dfd = $.Deferred();
                                        var self = this;
                                        $.when(self.loadKcp005OnTab2(), self.loadKcp005OnTab3()).done(function () {
                                            self.fixComponentWidth();
                                            dfd.resolve();
                                        });
                                        return dfd.promise();
                                    };
                                    /**
                                     * Calculate KCP005 rows
                                     */
                                    ListGroupScreenModel.prototype.calculateKcp005Rows = function (marginHeight) {
                                        var tabContentHeight = parseInt(document.querySelector('.ccg-tabpanel #ccg001-tab-content-3').style.height);
                                        var heightPerRow = 24;
                                        return (tabContentHeight - marginHeight) / heightPerRow;
                                    };
                                    ListGroupScreenModel.prototype.loadKcp005OnTab2 = function () {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        if (self.showAdvancedSearchTab && self.showEmployeeSelection) {
                                            var Kcp005MarginHeight = 70;
                                            // set KCP005 options
                                            self.employeeinfo = {
                                                isShowAlreadySet: false,
                                                isMultiSelect: self.isMultiple,
                                                isMultipleUse: true,
                                                listType: ListType.EMPLOYEE,
                                                employeeInputList: ko.observableArray([]),
                                                selectType: SelectType.SELECT_BY_SELECTED_CODE,
                                                selectedCode: self.selectedCodeEmployee,
                                                isDialog: true,
                                                hasPadding: false,
                                                isShowNoSelectRow: false,
                                                isShowWorkPlaceName: false,
                                                maxRows: self.calculateKcp005Rows(Kcp005MarginHeight),
                                                tabindex: self.ccg001Tabindex,
                                                subscriptions: self.employeeSubscriptions
                                            };
                                            // Show KCP005
                                            $('#employeeinfo').ntsListComponent(self.employeeinfo).done(function () { return dfd.resolve(); });
                                        }
                                        else {
                                            dfd.resolve();
                                        }
                                        return dfd.promise();
                                    };
                                    ListGroupScreenModel.prototype.loadKcp005OnTab3 = function () {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        // Load KCP05 on tab 3
                                        var Kcp005MarginHeight = 255;
                                        var calculatedRows = self.calculateKcp005Rows(Kcp005MarginHeight);
                                        var maxRows = calculatedRows < 10 ? 10 : calculatedRows;
                                        self.tab3kcp005option = {
                                            isShowAlreadySet: false,
                                            maxWidth: 420,
                                            isMultiSelect: self.isMultiple,
                                            isMultipleUse: true,
                                            listType: ListType.EMPLOYEE,
                                            employeeInputList: self.employeeListTab3,
                                            selectType: SelectType.SELECT_ALL,
                                            selectedCode: self.selectedEmployeesTab3,
                                            isDialog: true,
                                            hasPadding: false,
                                            isShowNoSelectRow: false,
                                            isShowWorkPlaceName: true,
                                            tabindex: self.ccg001Tabindex,
                                            maxRows: maxRows,
                                            isSelectAllAfterReload: true,
                                        };
                                        // Show KCP005
                                        $('#tab3kcp005').ntsListComponent(self.tab3kcp005option).done(function () { return dfd.resolve(); });
                                        return dfd.promise();
                                    };
                                    /**
                                     * Fix component width according to screen width
                                     */
                                    ListGroupScreenModel.prototype.fixComponentWidth = function () {
                                        var self = this;
                                        _.defer(function () {
                                            // update tab 2 width
                                            var totalWidth = 5;
                                            $('#ccg001-tab-content-2').children('div.pull-left.height-maximum').each(function (i, e) { return totalWidth += $(e).outerWidth(true); });
                                            $('#ccg001-tab-content-2').outerWidth(totalWidth);
                                            // Fix component width if screen width is smaller than component
                                            var componentWidth = window.innerWidth - $('#ccg001-btn-search-drawer').offset().left;
                                            if (componentWidth <= $('#ccg001-tab-content-2').outerWidth()) {
                                                var margin = 20;
                                                // fix width and show scrollbar
                                                $('.tab-content-2.height-maximum').outerWidth(componentWidth - margin);
                                                $('.tab-content-2.height-maximum').css('overflow-x', 'auto');
                                                // fix height
                                                if (!self.isHeightFixed) {
                                                    var fixedTabHeight = parseInt(document.querySelector('.ccg-tabpanel>#tab-2').style.height) + 15;
                                                    $('.ccg-tabpanel>#tab-2').css('height', fixedTabHeight);
                                                    self.isHeightFixed = true;
                                                }
                                            }
                                        });
                                    };
                                    /**
                                     * Check future date
                                     */
                                    ListGroupScreenModel.prototype.isFutureDate = function (date) {
                                        return date.isAfter(moment());
                                    };
                                    /**
                                     * function click by apply data search employee (init tab 2)
                                     * get base date
                                     */
                                    ListGroupScreenModel.prototype.applyDataSearch = function () {
                                        var dfd = $.Deferred();
                                        var self = this;
                                        if (!self.isApplySearchDone) {
                                            dfd.resolve();
                                            return dfd.promise();
                                        }
                                        // validate input base date
                                        if (!self.isValidInput() || self.isInvalidBaseDate()) {
                                            dfd.reject();
                                            return dfd.promise();
                                        }
                                        self.isApplySearchDone = false;
                                        nts.uk.ui.block.grayout(); // block ui
                                        self.setBaseDateAndPeriod().done(function () {
                                            // Comparing accquired base date to current system date.
                                            if (self.isFutureDate(moment.utc(self.acquiredBaseDate(), CcgDateFormat.DEFAULT_FORMAT))) {
                                                // If base date is future date, check future reference permission
                                                self.getFuturePermit().done(function (hasPermission) {
                                                    if (hasPermission) {
                                                        self.queryParam.baseDate = self.acquiredBaseDate();
                                                    }
                                                    else {
                                                        var systemDate = moment.utc().toISOString();
                                                        var systemDateFormated = moment.utc().format(CcgDateFormat.DEFAULT_FORMAT);
                                                        self.inputBaseDate(systemDate);
                                                        self.queryParam.baseDate = systemDateFormated;
                                                        if (!self.showPeriod) {
                                                            self.inputPeriod(new DateRangePickerModel(systemDate, systemDate));
                                                            self.queryParam.periodStart = systemDateFormated;
                                                            self.queryParam.periodEnd = systemDateFormated;
                                                        }
                                                    }
                                                    self.loadAdvancedSearchTab().done(function () {
                                                        self.isApplySearchDone = true;
                                                        nts.uk.ui.block.clear();
                                                        dfd.resolve();
                                                    });
                                                }).fail(function (err) {
                                                    nts.uk.ui.dialog.alertError(err);
                                                    self.isApplySearchDone = true;
                                                    nts.uk.ui.block.clear();
                                                    dfd.reject();
                                                });
                                            }
                                            else {
                                                self.queryParam.baseDate = self.acquiredBaseDate();
                                                self.loadAdvancedSearchTab().done(function () {
                                                    self.isApplySearchDone = true;
                                                    nts.uk.ui.block.clear();
                                                    dfd.resolve();
                                                });
                                            }
                                        }).fail(function (err) {
                                            nts.uk.ui.dialog.alertError(err);
                                            self.isApplySearchDone = true;
                                            nts.uk.ui.block.clear();
                                            dfd.reject();
                                        });
                                        return dfd.promise();
                                    };
                                    /**
                                     * Load advanced search tab
                                     */
                                    ListGroupScreenModel.prototype.loadAdvancedSearchTab = function () {
                                        var dfd = $.Deferred();
                                        var self = this;
                                        if (self.isTab2Lazy && !self.isFocusAdvancedSearchTab()) {
                                            dfd.resolve();
                                        }
                                        else {
                                            self.reloadAdvanceSearchTab().done(function () { return dfd.resolve(); });
                                        }
                                        return dfd.promise();
                                    };
                                    /**
                                     * Reload advanced search tab
                                     */
                                    ListGroupScreenModel.prototype.reloadAdvanceSearchTab = function () {
                                        var dfd = $.Deferred();
                                        var self = this;
                                        if (!self.tab2HasLoaded) {
                                            self.tab2HasLoaded = true;
                                        }
                                        // set advanced search param
                                        self.queryParam.retireStart = self.retireStart();
                                        self.queryParam.retireEnd = self.retireEnd();
                                        // reload advanced search tab.
                                        if (_.isEmpty($('.blockUI.blockOverlay'))) {
                                            nts.uk.ui.block.grayout();
                                        }
                                        self.setComponentOptions();
                                        $.when(self.loadEmploymentPart(), self.loadDepartmentPart(), self.loadWorkplacePart(), self.loadWorktypePart()).done(function () {
                                            self.loadClassificationPart().done(function () {
                                                self.loadJobTitlePart().done(function () {
                                                    nts.uk.ui.block.clear(); // clear block UI
                                                    self.fixComponentWidth();
                                                    dfd.resolve();
                                                });
                                            });
                                        });
                                        return dfd.promise();
                                    };
                                    /**
                                     * Load employment part
                                     */
                                    ListGroupScreenModel.prototype.loadEmploymentPart = function () {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        if (self.showEmployment) {
                                            if (_.isNil(self.comEmployment)) {
                                                $('#employmentList').ntsListComponent(self.employments).done(function (emp) {
                                                    self.comEmployment = emp;
                                                    dfd.resolve();
                                                });
                                            }
                                            else {
                                                self.comEmployment.reload();
                                                dfd.resolve();
                                            }
                                        }
                                        else {
                                            dfd.resolve();
                                        }
                                        return dfd.promise();
                                    };
                                    /**
                                     * Load Classification part
                                     */
                                    ListGroupScreenModel.prototype.loadClassificationPart = function () {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        if (self.showClassification) {
                                            if (_.isNil(self.comClassification)) {
                                                $('#classificationList').ntsListComponent(self.classifications).done(function (emp) {
                                                    self.comClassification = emp;
                                                    dfd.resolve();
                                                });
                                            }
                                            else {
                                                self.comClassification.reload();
                                                dfd.resolve();
                                            }
                                        }
                                        else {
                                            dfd.resolve();
                                        }
                                        return dfd.promise();
                                    };
                                    /**
                                     * Load jobtitle part
                                     */
                                    ListGroupScreenModel.prototype.loadJobTitlePart = function () {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        if (self.showJobTitle) {
                                            if (_.isNil(self.comJobTitle)) {
                                                $('#jobtitleList').ntsListComponent(self.jobtitles).done(function (emp) {
                                                    self.comJobTitle = emp;
                                                    dfd.resolve();
                                                });
                                            }
                                            else {
                                                self.comJobTitle.reload();
                                                dfd.resolve();
                                            }
                                        }
                                        else {
                                            dfd.resolve();
                                        }
                                        return dfd.promise();
                                    };
                                    /**
                                     * Load department part
                                     */
                                    ListGroupScreenModel.prototype.loadDepartmentPart = function () {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        if (self.showDepartment) {
                                            $('#departmentList').ntsTreeComponent(self.departments).done(function () {
                                                dfd.resolve();
                                            });
                                        }
                                        else {
                                            dfd.resolve();
                                        }
                                        return dfd.promise();
                                    };
                                    /**
                                     * Load workplace part
                                     */
                                    ListGroupScreenModel.prototype.loadWorkplacePart = function () {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        if (self.showWorkplace) {
                                            $('#workplaceList').ntsTreeComponent(self.workplaces).done(function () {
                                                dfd.resolve();
                                            });
                                        }
                                        else {
                                            dfd.resolve();
                                        }
                                        return dfd.promise();
                                    };
                                    /**
                                     * Load worktype part
                                     */
                                    ListGroupScreenModel.prototype.loadWorktypePart = function () {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        if (self.showWorktype) {
                                            ccg.service.searchAllWorkType().done(function (workTypeList) {
                                                self.listWorkType(workTypeList);
                                                self.selectedWorkTypeCode(_.map(workTypeList, function (vl) { return vl.businessTypeCode; }));
                                                dfd.resolve();
                                            });
                                        }
                                        else {
                                            dfd.resolve();
                                        }
                                        return dfd.promise();
                                    };
                                    /**
                                     * function click by button detail department or work place (open dialog)
                                     */
                                    ListGroupScreenModel.prototype.detailDepartmentWorkplace = function (startMode) {
                                        var self = this;
                                        var inputCDL008 = {
                                            baseDate: moment.utc(self.queryParam.baseDate, 'YYYY-MM-DD').toDate(),
                                            isMultiple: true,
                                            selectedSystemType: self.systemType,
                                            selectedCodes: startMode == 0 ? self.selectedCodeWorkplace() : self.selectedCodeDepartment(),
                                            isShowBaseDate: false,
                                            startMode: startMode
                                        };
                                        nts.uk.ui.windows.setShared('inputCDL008', inputCDL008);
                                        nts.uk.ui.windows.sub.modal('com', "/view/cdl/008/a/index.xhtml").onClosed(function () {
                                            if (nts.uk.ui.windows.getShared('CDL008Cancel')) {
                                                return;
                                            }
                                            // 部門対応
                                            if (startMode == StartMode.WORKPLACE) {
                                                // reload selected workplace
                                                self.selectedCodeWorkplace(nts.uk.ui.windows.getShared('outputCDL008'));
                                                self.workplaces.selectType = SelectType.SELECT_BY_SELECTED_CODE;
                                                $('#workplaceList').ntsTreeComponent(self.workplaces);
                                            }
                                            else {
                                                // reload selected department
                                                self.selectedCodeDepartment(nts.uk.ui.windows.getShared('outputCDL008'));
                                                self.departments.selectType = SelectType.SELECT_BY_SELECTED_CODE;
                                                $('#departmentList').ntsTreeComponent(self.departments);
                                            }
                                        });
                                    };
                                    /**
                                     * function click by button search employee
                                     */
                                    ListGroupScreenModel.prototype.extractSelectedEmployees = function () {
                                        var self = this;
                                        if (!self.isValidInput()) {
                                            return;
                                        }
                                        if (_.isEmpty(self.getSelectedCodeEmployee())) {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_758" });
                                            return;
                                        }
                                        // Filter selected employee
                                        var selectedEmployees = self.getSelectedCodeEmployee();
                                        var filteredList = _.filter(self.reservedEmployees(), function (e) {
                                            return _.includes(selectedEmployees, e.employeeCode);
                                        });
                                        // block ui
                                        nts.uk.ui.block.invisible();
                                        // return data
                                        self.returnDataFromCcg001(self.combineData(filteredList));
                                        // Hide component.
                                        self.hideComponent();
                                        // clear block UI
                                        _.defer(function () { return nts.uk.ui.block.clear(); });
                                    };
                                    ListGroupScreenModel.prototype.extractSelectedEmployeesInTab3 = function () {
                                        var self = this;
                                        if (!self.isValidInput()) {
                                            return;
                                        }
                                        if (_.isEmpty(self.getSelectedCodeEmployeeTab3())) {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_758" });
                                            return;
                                        }
                                        // Filter selected employee
                                        var selectedEmployees = self.getSelectedCodeEmployeeTab3();
                                        var filteredList = _.filter(self.reservedEmployeesTab3(), function (e) {
                                            return _.includes(selectedEmployees, e.employeeCode);
                                        });
                                        // block ui
                                        nts.uk.ui.block.invisible();
                                        // return data
                                        self.returnDataFromCcg001(self.combineData(filteredList));
                                        // Hide component.
                                        self.hideComponent();
                                        // clear block UI
                                        _.defer(function () { return nts.uk.ui.block.clear(); });
                                    };
                                    /**
                                     * clear validate client
                                     */
                                    ListGroupScreenModel.prototype.clearValiate = function () {
                                        $('#inp_baseDate').ntsError('clear');
                                    };
                                    /**
                                     * Validate base date
                                     */
                                    ListGroupScreenModel.prototype.isInvalidBaseDate = function () {
                                        var self = this;
                                        $("#inp_baseDate").ntsEditor("validate");
                                        if ($('#inp_baseDate').ntsError('hasError')) {
                                            return true;
                                        }
                                        if (self.showPeriod && self.showBaseDate && !self.isBaseDateInTargetPeriod()) {
                                            return true;
                                        }
                                        return false;
                                    };
                                    // validate input
                                    ListGroupScreenModel.prototype.isStatusEmployeePeriodInvalid = function () {
                                        var self = this;
                                        $("#ccg001-partg-start").ntsEditor("validate");
                                        $("#ccg001-partg-end").ntsEditor("validate");
                                        return $("#ccg001-partg-start").ntsError('hasError') || $("#ccg001-partg-end").ntsError('hasError');
                                    };
                                    /**
                                     * function click by button employee login
                                     */
                                    ListGroupScreenModel.prototype.getEmployeeLogin = function () {
                                        var self = this;
                                        nts.uk.ui.block.grayout(); // block ui
                                        var param = {
                                            baseDate: moment.utc().toDate(),
                                            systemType: self.systemType,
                                            employeesDoNotManageSchedules: self.employeesDoNotManageSchedules()
                                        };
                                        ccg.service.searchEmployeeByLogin(param)
                                            .done(function (data) {
                                            self.returnDataFromCcg001(self.combineData([data]));
                                            self.hideComponent();
                                        }).fail(function (error) {
                                            nts.uk.ui.dialog.alertError(error);
                                        }).always(function () { return nts.uk.ui.block.clear(); }); // clear block UI
                                    };
                                    /**
                                     * Combine return data
                                     */
                                    ListGroupScreenModel.prototype.combineData = function (listEmployee) {
                                        var self = this;
                                        var dto = {};
                                        dto.baseDate = moment.utc(self.queryParam.baseDate, CcgDateFormat.DEFAULT_FORMAT).toISOString();
                                        dto.closureId = self.showClosure ? self.selectedClosure() : undefined;
                                        dto.periodStart = moment.utc(self.queryParam.periodStart).toISOString();
                                        dto.periodEnd = moment.utc(self.queryParam.periodEnd).toISOString();
                                        dto.listEmployee = listEmployee;
                                        return dto;
                                    };
                                    /**
                                     * Set base date and period
                                     */
                                    ListGroupScreenModel.prototype.setBaseDateAndPeriod = function () {
                                        var dfd = $.Deferred();
                                        var self = this;
                                        // set base date = user input
                                        if (self.showBaseDate) {
                                            self.acquiredBaseDate(self.baseDate().format(CcgDateFormat.DEFAULT_FORMAT));
                                        }
                                        // set period
                                        if (self.showPeriod) {
                                            var periodEnd = self.showPeriodYM ? self.periodEnd().endOf("month") : self.periodEnd();
                                            self.queryParam.periodStart = self.periodStart().format(CcgDateFormat.DEFAULT_FORMAT);
                                            self.queryParam.periodEnd = periodEnd.format(CcgDateFormat.DEFAULT_FORMAT);
                                            if (!self.showBaseDate) {
                                                self.acquiredBaseDate(self.queryParam.periodEnd);
                                            }
                                        }
                                        else {
                                            // set period = base date (Period accuracy is YMD)
                                            self.queryParam.periodStart = self.baseDate().format(CcgDateFormat.DEFAULT_FORMAT);
                                            self.queryParam.periodEnd = self.baseDate().format(CcgDateFormat.DEFAULT_FORMAT);
                                        }
                                        // Period accuracy is YM 
                                        if (self.showPeriodYM) {
                                            //                if (self.showPeriodYM || self.showPeriod) {
                                            self.calculatePeriod(parseInt(self.periodEnd().format(CcgDateFormat.YEAR_MONTH))).done(function (period) {
                                                //                    self.calculatePeriod105458().done(period => {
                                                if (!self.showBaseDate) {
                                                    // set base date = period end
                                                    self.acquiredBaseDate(period.endDate);
                                                }
                                                if (self.showBaseDate && self.showClosure && self.isFirstTime) {
                                                    self.isApplySearchDone = false;
                                                    self.inputPeriod(new DateRangePickerModel(self.showPeriodYM ? period.endDate : period.startDate, period.endDate));
                                                    self.inputBaseDate(period.endDate);
                                                }
                                                dfd.resolve();
                                            });
                                        }
                                        else {
                                            dfd.resolve();
                                        }
                                        return dfd.promise();
                                    };
                                    /**
                                     * Set baseDate & period on init component
                                     */
                                    ListGroupScreenModel.prototype.setBaseDateAndPeriodOnInit = function (options) {
                                        var self = this;
                                        // set baseDate
                                        if (_.isFunction(options.baseDate)) {
                                            self.baseDateOfParentScreen = options.baseDate;
                                            self.inputBaseDate(options.baseDate());
                                        }
                                        else {
                                            self.inputBaseDate(_.isNil(options.baseDate) ? moment().toISOString() : options.baseDate);
                                        }
                                        // set period
                                        if (options.dateRangePickerValue) {
                                            self.dateRangeOfParentScreen = options.dateRangePickerValue;
                                            self.inputPeriod(_.clone(self.dateRangeOfParentScreen()));
                                        }
                                        else if (_.isFunction(options.periodStartDate) && _.isFunction(options.periodEndDate)) {
                                            self.periodStartOfParentScreen = options.periodStartDate;
                                            self.periodEndOfParentScreen = options.periodEndDate;
                                            self.inputPeriod(new DateRangePickerModel(options.periodStartDate(), options.periodEndDate()));
                                        }
                                        else {
                                            var periodStart = _.isNil(options.periodStartDate) ? moment().toISOString() : options.periodStartDate;
                                            var periodEnd = _.isNil(options.periodEndDate) ? moment().toISOString() : options.periodEndDate;
                                            self.inputPeriod(new DateRangePickerModel(periodStart, periodEnd));
                                        }
                                    };
                                    /**
                                     * Calculate date period from selected closure id and yearMonth
                                     */
                                    ListGroupScreenModel.prototype.calculatePeriod = function (yearMonth) {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        var closureId = (self.selectedClosure() == null || self.selectedClosure() == ConfigEnumClosure.CLOSURE_ALL) ? 1 : self.selectedClosure();
                                        // アルゴリズム「当月の期間を算出する」を実行する
                                        ccg.service.calculatePeriod(closureId, yearMonth)
                                            .done(function (period) { return dfd.resolve(period); });
                                        return dfd.promise();
                                    };
                                    /**
                                     * Calculate date period from selected closure id and yearMonth
                                     */
                                    ListGroupScreenModel.prototype.calculatePeriod105458 = function () {
                                        var self = this;
                                        var dfd = $.Deferred();
                                        var closureId = (self.selectedClosure() == null || self.selectedClosure() == ConfigEnumClosure.CLOSURE_ALL) ? 1 : self.selectedClosure();
                                        // アルゴリズム「当月の期間を算出する」を実行する
                                        ccg.service.calculatePeriod105458(closureId)
                                            .done(function (period) { return dfd.resolve(period); });
                                        return dfd.promise();
                                    };
                                    /**
                                     * Get future reference permission
                                     */
                                    ListGroupScreenModel.prototype.getFuturePermit = function () {
                                        var self = this;
                                        switch (self.systemType) {
                                            case ConfigEnumSystemType.PERSONAL_INFORMATION:
                                                return ccg.service.getPersonalRoleFuturePermit();
                                            case ConfigEnumSystemType.EMPLOYMENT:
                                                return ccg.service.getEmploymentRoleFuturePermit();
                                            default:
                                                var dfd = $.Deferred();
                                                dfd.reject();
                                                return dfd.promise(); // systemType not found
                                        }
                                    };
                                    /**
                                     * Validate basedate & target period
                                     */
                                    ListGroupScreenModel.prototype.isBaseDateInTargetPeriod = function () {
                                        var self = this;
                                        var baseDate = self.baseDate();
                                        if (self.showPeriodYM) {
                                            baseDate = moment.utc((self.baseDate()).format("YYYY/MM"), "YYYY/MM");
                                        }
                                        if (baseDate.isBefore(self.periodStart()) || baseDate.isAfter(self.periodEnd())) {
                                            if (!self.hasShownErrorDialog) {
                                                self.hasShownErrorDialog = true;
                                                nts.uk.ui.dialog.alertError({ messageId: 'Msg_765' }).then(function () { return self.hasShownErrorDialog = false; });
                                            }
                                            return false;
                                        }
                                        return true;
                                    };
                                    /**
                                     * function click apply search employee
                                     */
                                    ListGroupScreenModel.prototype.advancedSearchEmployee = function () {
                                        var self = this;
                                        // validate all inputs & conditions
                                        if (!self.isValidInput()
                                            || !self.isValidAdvancedSearchCondition()
                                            || self.isInvalidBaseDate()
                                            || self.isStatusEmployeePeriodInvalid()) {
                                            return;
                                        }
                                        // set param
                                        self.setAdvancedSearchParam();
                                        nts.uk.ui.block.grayout(); // block ui
                                        self.findAndReturnListEmployee(true);
                                    };
                                    /**
                                     * Save employeeRangeSelection
                                     */
                                    ListGroupScreenModel.prototype.saveEmployeeRangeSelection = function () {
                                        var self = this;
                                        if (self.showClosure) { // save EmployeeRangeSelection if show closure
                                            // check data exist
                                            var empRangeSelection = self.employeeRangeSelection ?
                                                self.employeeRangeSelection : new EmployeeRangeSelection();
                                            switch (self.systemType) {
                                                case ConfigEnumSystemType.PERSONAL_INFORMATION:
                                                    empRangeSelection.personalInfo.selectedClosureId = self.selectedClosure();
                                                    break;
                                                case ConfigEnumSystemType.EMPLOYMENT:
                                                    empRangeSelection.employmentInfo.selectedClosureId = self.selectedClosure();
                                                    break;
                                                case ConfigEnumSystemType.SALARY:
                                                    empRangeSelection.salaryInfo.selectedClosureId = self.selectedClosure();
                                                    break;
                                                case ConfigEnumSystemType.HUMAN_RESOURCES:
                                                    empRangeSelection.humanResourceInfo.selectedClosureId = self.selectedClosure();
                                                    break;
                                                default: break; // systemType not found
                                            }
                                            ccg.service.saveEmployeeRangeSelection(empRangeSelection);
                                        }
                                    };
                                    /**
                                     * Check advanced search conditions
                                     */
                                    ListGroupScreenModel.prototype.isValidAdvancedSearchCondition = function () {
                                        var self = this;
                                        if (self.showEmployment && nts.uk.util.isNullOrEmpty(self.selectedCodeEmployment())) {
                                            nts.uk.ui.dialog.alertError({ messageId: 'Msg_1195' });
                                            return false;
                                        }
                                        if (self.showDepartment && nts.uk.util.isNullOrEmpty(self.selectedCodeDepartment())) {
                                            nts.uk.ui.dialog.alertError({ messageId: 'Msg_1196' });
                                            return false;
                                        }
                                        if (self.showWorkplace && nts.uk.util.isNullOrEmpty(self.selectedCodeWorkplace())) {
                                            nts.uk.ui.dialog.alertError({ messageId: 'Msg_1197' });
                                            return false;
                                        }
                                        if (self.showClassification && nts.uk.util.isNullOrEmpty(self.selectedCodeClassification())) {
                                            nts.uk.ui.dialog.alertError({ messageId: 'Msg_1198' });
                                            return false;
                                        }
                                        if (self.showJobTitle && nts.uk.util.isNullOrEmpty(self.selectedCodeJobtitle())) {
                                            nts.uk.ui.dialog.alertError({ messageId: 'Msg_1199' });
                                            return false;
                                        }
                                        /*
                                        if (self.showWorktype && nts.uk.util.isNullOrEmpty(self.selectedWorkTypeCode())) {
                                            nts.uk.ui.dialog.alertError({ messageId: 'Msg_1200' });
                                            return false;
                                        }*/
                                        return true;
                                    };
                                    /**
                                     * function get selected employee to
                                     */
                                    ListGroupScreenModel.prototype.getSelectedCodeEmployee = function () {
                                        var self = this;
                                        if (self.isMultiple) {
                                            return self.selectedCodeEmployee();
                                        }
                                        else {
                                            var employeeCodes = [];
                                            if (!nts.uk.util.isNullOrEmpty(self.selectedCodeEmployee())) {
                                                employeeCodes.push(self.selectedCodeEmployee());
                                            }
                                            return employeeCodes;
                                        }
                                    };
                                    /**
                                     * Get selected code employee in tab3
                                     */
                                    ListGroupScreenModel.prototype.getSelectedCodeEmployeeTab3 = function () {
                                        var self = this;
                                        if (self.isMultiple) {
                                            return self.selectedEmployeesTab3();
                                        }
                                        else {
                                            var employeeCodes = [];
                                            if (!nts.uk.util.isNullOrEmpty(self.selectedEmployeesTab3())) {
                                                employeeCodes.push(self.selectedEmployeesTab3());
                                            }
                                            return employeeCodes;
                                        }
                                    };
                                    /**
                                     * Show data to kcp005 on tab 3
                                     */
                                    ListGroupScreenModel.prototype.showDataOnKcp005Tab3 = function (data) {
                                        var self = this;
                                        // Data not found
                                        if (nts.uk.util.isNullOrEmpty(data)) {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_317" });
                                        }
                                        // sort by code
                                        var sortedList = _.sortBy(data, function (item) { return item.employeeCode; });
                                        // reserve list data
                                        self.reservedEmployeesTab3(sortedList);
                                        // clear selected codes
                                        self.selectedEmployeesTab3([]);
                                        // set data to kcp005
                                        self.employeeListTab3(self.toUnitModelList(sortedList));
                                        $('#tab3kcp005').ntsListComponent(self.tab3kcp005option);
                                        return;
                                    };
                                    /**
                                     * function convert dto to model init data
                                     */
                                    ListGroupScreenModel.prototype.toUnitModelList = function (dataList) {
                                        return _.map(dataList, function (item) {
                                            return {
                                                code: item.employeeCode,
                                                name: item.employeeName,
                                                affiliationName: item.affiliationName
                                            };
                                        });
                                    };
                                    /**
                                     * search Employee by Reference range
                                     */
                                    ListGroupScreenModel.prototype.searchEmployeeByReferenceRange = function (referenceRange) {
                                        var self = this;
                                        self.queryParam.referenceRange = referenceRange;
                                        self.quickSearchEmployee();
                                    };
                                    /**
                                     * Search current login employee
                                     */
                                    ListGroupScreenModel.prototype.searchCurrentLoginEmployee = function () {
                                        var self = this;
                                        if (!self.isValidInput() || self.isInvalidBaseDate()) {
                                            return;
                                        }
                                        // A：締め状態更新
                                        if (self.systemType == ConfigEnumSystemType.EMPLOYMENT && self.showClosure) {
                                            ccg.service.getClosureByCurrentEmployee(self.queryParam.baseDate).done(function (id) {
                                                if (_.isNil(id)) {
                                                    nts.uk.ui.dialog.alertError({ messageId: 'Msg_1434' });
                                                    return;
                                                }
                                                if (self.selectedClosure() != id) {
                                                    self.selectedClosure(id);
                                                }
                                                self.getEmployeeLogin();
                                            });
                                        }
                                        else {
                                            self.getEmployeeLogin();
                                        }
                                    };
                                    /**
                                     * Search employee by code
                                     */
                                    ListGroupScreenModel.prototype.searchByCode = function () {
                                        var self = this;
                                        if (nts.uk.util.isNullOrEmpty(self.inputCodeTab3())) {
                                            nts.uk.ui.dialog.alertError({ messageId: 'Msg_1201' });
                                            return;
                                        }
                                        var query = {
                                            code: self.inputCodeTab3(),
                                            useClosure: self.showClosure,
                                            closureId: self.selectedClosure(),
                                            systemType: self.systemType,
                                            referenceDate: moment.utc(self.acquiredBaseDate(), CcgDateFormat.DEFAULT_FORMAT).toDate(),
                                            employeesDoNotManageSchedules: self.employeesDoNotManageSchedules()
                                        };
                                        nts.uk.ui.block.grayout(); // block ui
                                        ccg.service.searchByCode(query).done(function (data) {
                                            self.showDataOnKcp005Tab3(data);
                                            nts.uk.ui.block.clear(); // clear block UI
                                        });
                                    };
                                    /**
                                     * Search employee by name
                                     */
                                    ListGroupScreenModel.prototype.searchByName = function () {
                                        var self = this;
                                        if (nts.uk.util.isNullOrEmpty(self.inputNameTab3())) {
                                            nts.uk.ui.dialog.alertError({ messageId: 'Msg_1201' });
                                            return;
                                        }
                                        var query = {
                                            name: self.inputNameTab3(),
                                            useClosure: self.showClosure,
                                            closureId: self.selectedClosure(),
                                            systemType: self.systemType,
                                            referenceDate: moment.utc(self.acquiredBaseDate(), CcgDateFormat.DEFAULT_FORMAT).toDate(),
                                            employeesDoNotManageSchedules: self.employeesDoNotManageSchedules()
                                        };
                                        nts.uk.ui.block.grayout(); // block ui
                                        ccg.service.searchByName(query).done(function (data) {
                                            self.showDataOnKcp005Tab3(data);
                                            nts.uk.ui.block.clear(); // clear block UI
                                        });
                                    };
                                    /**
                                     * Search employee by entry date
                                     */
                                    ListGroupScreenModel.prototype.searchByEntryDate = function () {
                                        var self = this;
                                        if ($('#ccg001-date-entry *').ntsError('hasError')) {
                                            return;
                                        }
                                        if (self.isInValidEntryDate()) {
                                            nts.uk.ui.dialog.alertError({ messageId: 'Msg_1201' });
                                            return;
                                        }
                                        var query = {
                                            useClosure: self.showClosure,
                                            closureId: self.selectedClosure(),
                                            systemType: self.systemType,
                                            referenceDate: moment.utc(self.acquiredBaseDate(), CcgDateFormat.DEFAULT_FORMAT).toDate(),
                                            period: self.toPeriodDto(self.entryDateTab3()),
                                            employeesDoNotManageSchedules: self.employeesDoNotManageSchedules()
                                        };
                                        nts.uk.ui.block.grayout(); // block ui
                                        ccg.service.searchByEntryDate(query).done(function (data) {
                                            self.showDataOnKcp005Tab3(data);
                                            nts.uk.ui.block.clear(); // clear block UI
                                        });
                                    };
                                    /**
                                     * Search employee by retirement date
                                     */
                                    ListGroupScreenModel.prototype.searchByRetirementDate = function () {
                                        var self = this;
                                        if ($('#ccg001-date-retirement *').ntsError('hasError')) {
                                            return;
                                        }
                                        if (self.isInValidRetirementDate()) {
                                            nts.uk.ui.dialog.alertError({ messageId: 'Msg_1201' });
                                            return;
                                        }
                                        var query = {
                                            useClosure: self.showClosure,
                                            closureId: self.selectedClosure(),
                                            systemType: self.systemType,
                                            referenceDate: moment.utc(self.acquiredBaseDate(), CcgDateFormat.DEFAULT_FORMAT).toDate(),
                                            period: self.toPeriodDto(self.retirementDateTab3()),
                                            employeesDoNotManageSchedules: self.employeesDoNotManageSchedules()
                                        };
                                        nts.uk.ui.block.grayout(); // block ui
                                        ccg.service.searchByRetirementDate(query).done(function (data) {
                                            self.showDataOnKcp005Tab3(data);
                                            nts.uk.ui.block.clear(); // clear block UI
                                        });
                                    };
                                    /**
                                     * Check input entry date
                                     */
                                    ListGroupScreenModel.prototype.isInValidEntryDate = function () {
                                        var self = this;
                                        return nts.uk.util.isNullOrEmpty(self.entryDateTab3().startDate)
                                            || nts.uk.util.isNullOrEmpty(self.entryDateTab3().endDate);
                                    };
                                    /**
                                     * Check input retirement date
                                     */
                                    ListGroupScreenModel.prototype.isInValidRetirementDate = function () {
                                        var self = this;
                                        return nts.uk.util.isNullOrEmpty(self.retirementDateTab3().startDate)
                                            || nts.uk.util.isNullOrEmpty(self.retirementDateTab3().endDate);
                                    };
                                    /**
                                     * Convert period in dateRangePicker to period dto
                                     */
                                    ListGroupScreenModel.prototype.toPeriodDto = function (period) {
                                        return {
                                            startDate: new Date(period.startDate),
                                            endDate: new Date(period.endDate)
                                        };
                                    };
                                    /**
                                     * Quick search employee
                                     */
                                    ListGroupScreenModel.prototype.quickSearchEmployee = function () {
                                        var self = this;
                                        if (!self.isValidInput() || self.isInvalidBaseDate()) {
                                            return;
                                        }
                                        nts.uk.ui.block.grayout(); // block ui
                                        self.setQuickSearchParam().done(function () {
                                            self.findAndReturnListEmployee(false);
                                        });
                                    };
                                    /**
                                     * Find and return list employee for caller screen.
                                     */
                                    ListGroupScreenModel.prototype.findAndReturnListEmployee = function (isAdvancedSearch) {
                                        var self = this;
                                        ccg.service.findRegulationInfoEmployee(self.queryParam).done(function (data) {
                                            // Data not found
                                            if (nts.uk.util.isNullOrEmpty(data)) {
                                                nts.uk.ui.dialog.alertError({ messageId: "Msg_317" });
                                                nts.uk.ui.block.clear(); // clear block UI
                                                return;
                                            }
                                            // Data found
                                            if (isAdvancedSearch && self.showEmployeeSelection) {
                                                // Set reserved list employees
                                                self.reservedEmployees(data);
                                                // Load list employee to KCP005
                                                self.employeeinfo.employeeInputList(self.toUnitModelList(data));
                                                $('#employeeinfo').ntsListComponent(self.employeeinfo);
                                                // Reset selected employees on KCP005
                                                self.selectedCodeEmployee([]);
                                            }
                                            else {
                                                self.returnDataFromCcg001(self.combineData(data));
                                                // Hide component.
                                                self.hideComponent();
                                            }
                                            nts.uk.ui.block.clear(); // clear block UI
                                        });
                                    };
                                    /**
                                     * Set component options (for advanced search tab)
                                     */
                                    ListGroupScreenModel.prototype.setComponentOptions = function () {
                                        var self = this;
                                        self.employments = {
                                            isShowAlreadySet: false,
                                            isMultiSelect: true,
                                            isMultipleUse: true,
                                            selectType: SelectType.SELECT_ALL,
                                            listType: ListType.EMPLOYMENT,
                                            selectedCode: self.selectedCodeEmployment,
                                            isDialog: true,
                                            isShowNoSelectRow: false,
                                            maxRows: ConfigCCGKCP.MAX_ROWS_EMPLOYMENT,
                                            selectedClosureId: self.showClosure ? self.selectedClosure : undefined,
                                            hasPadding: false,
                                            tabindex: self.ccg001Tabindex,
                                            subscriptions: self.employmentSubscriptions,
                                            maxWidth: 400
                                        };
                                        self.classifications = {
                                            isShowAlreadySet: false,
                                            isMultiSelect: true,
                                            isMultipleUse: true,
                                            listType: ListType.Classification,
                                            selectType: SelectType.SELECT_ALL,
                                            selectedCode: self.selectedCodeClassification,
                                            isDialog: true,
                                            isShowNoSelectRow: false,
                                            hasPadding: false,
                                            tabindex: self.ccg001Tabindex,
                                            maxRows: ConfigCCGKCP.MAX_ROWS_CLASSIFICATION,
                                            maxWidth: 400
                                        };
                                        self.jobtitles = {
                                            isShowAlreadySet: false,
                                            isMultiSelect: true,
                                            isMultipleUse: true,
                                            listType: ListType.JOB_TITLE,
                                            selectType: SelectType.SELECT_ALL,
                                            selectedCode: self.selectedCodeJobtitle,
                                            isDialog: true,
                                            baseDate: ko.observable(moment.utc(self.queryParam.baseDate, CcgDateFormat.DEFAULT_FORMAT).toDate()),
                                            isShowNoSelectRow: false,
                                            hasPadding: false,
                                            tabindex: self.ccg001Tabindex,
                                            maxRows: ConfigCCGKCP.MAX_ROWS_JOBTITLE,
                                            maxWidth: 400
                                        };
                                        self.departments = {
                                            isShowAlreadySet: false,
                                            systemType: self.systemType,
                                            isMultipleUse: true,
                                            isMultiSelect: true,
                                            startMode: StartMode.DEPARTMENT,
                                            selectType: SelectType.SELECT_ALL,
                                            isShowSelectButton: true,
                                            selectedId: self.selectedCodeDepartment,
                                            baseDate: ko.observable(moment.utc(self.queryParam.baseDate, CcgDateFormat.DEFAULT_FORMAT).toDate()),
                                            maxRows: ConfigCCGKCP.MAX_ROWS_WORKPLACE,
                                            isFullView: true,
                                            hasPadding: false,
                                            tabindex: self.ccg001Tabindex,
                                            isDialog: true
                                        };
                                        self.workplaces = {
                                            isShowAlreadySet: false,
                                            systemType: self.systemType,
                                            isMultipleUse: true,
                                            isMultiSelect: true,
                                            startMode: StartMode.WORKPLACE,
                                            selectType: SelectType.SELECT_ALL,
                                            isShowSelectButton: true,
                                            selectedId: self.selectedCodeWorkplace,
                                            baseDate: ko.observable(moment.utc(self.queryParam.baseDate, CcgDateFormat.DEFAULT_FORMAT).toDate()),
                                            maxRows: ConfigCCGKCP.MAX_ROWS_WORKPLACE,
                                            isFullView: true,
                                            hasPadding: false,
                                            tabindex: self.ccg001Tabindex,
                                            isDialog: true,
                                            width: 420
                                        };
                                    };
                                    return ListGroupScreenModel;
                                }());
                                viewmodel.ListGroupScreenModel = ListGroupScreenModel;
                                var ConfigCCGKCP = /** @class */ (function () {
                                    function ConfigCCGKCP() {
                                    }
                                    ConfigCCGKCP.MAX_ROWS_EMPLOYMENT = 10;
                                    ConfigCCGKCP.MAX_ROWS_CLASSIFICATION = 10;
                                    ConfigCCGKCP.MAX_ROWS_JOBTITLE = 9;
                                    ConfigCCGKCP.MAX_ROWS_WORKPLACE = 10;
                                    return ConfigCCGKCP;
                                }());
                                viewmodel.ConfigCCGKCP = ConfigCCGKCP;
                                var ConfigEnumSystemType = /** @class */ (function () {
                                    function ConfigEnumSystemType() {
                                    }
                                    ConfigEnumSystemType.PERSONAL_INFORMATION = 1;
                                    ConfigEnumSystemType.EMPLOYMENT = 2;
                                    ConfigEnumSystemType.SALARY = 3;
                                    ConfigEnumSystemType.HUMAN_RESOURCES = 4;
                                    ConfigEnumSystemType.ADMINISTRATOR = 5;
                                    return ConfigEnumSystemType;
                                }());
                                viewmodel.ConfigEnumSystemType = ConfigEnumSystemType;
                                var CcgDateFormat = /** @class */ (function () {
                                    function CcgDateFormat() {
                                    }
                                    CcgDateFormat.DEFAULT_FORMAT = 'YYYY-MM-DD';
                                    CcgDateFormat.YMD = 'YYYY/MM/DD';
                                    CcgDateFormat.YEAR_MONTH = 'YYYYMM';
                                    return CcgDateFormat;
                                }());
                                viewmodel.CcgDateFormat = CcgDateFormat;
                                var ConfigEnumClosure = /** @class */ (function () {
                                    function ConfigEnumClosure() {
                                    }
                                    ConfigEnumClosure.CLOSURE_ALL = 0;
                                    ConfigEnumClosure.CLOSURE_ALL_NAME = nts.uk.resource.getText("CCG001_64");
                                    return ConfigEnumClosure;
                                }());
                                viewmodel.ConfigEnumClosure = ConfigEnumClosure;
                                var ReferenceRange = /** @class */ (function () {
                                    function ReferenceRange() {
                                    }
                                    ReferenceRange.ALL_REFERENCE_RANGE = 0;
                                    ReferenceRange.AFFILIATION_AND_ALL_SUBORDINATES = 1;
                                    ReferenceRange.AFFILIATION_ONLY = 2;
                                    return ReferenceRange;
                                }());
                                viewmodel.ReferenceRange = ReferenceRange;
                                var EmployeeReferenceRange = /** @class */ (function (_super) {
                                    __extends(EmployeeReferenceRange, _super);
                                    function EmployeeReferenceRange() {
                                        return _super !== null && _super.apply(this, arguments) || this;
                                    }
                                    EmployeeReferenceRange.ONLY_MYSELF = 3;
                                    return EmployeeReferenceRange;
                                }(ReferenceRange));
                                viewmodel.EmployeeReferenceRange = EmployeeReferenceRange;
                                var SearchReferenceRange = /** @class */ (function (_super) {
                                    __extends(SearchReferenceRange, _super);
                                    function SearchReferenceRange() {
                                        return _super !== null && _super.apply(this, arguments) || this;
                                    }
                                    SearchReferenceRange.DO_NOT_CONSIDER_REFERENCE_RANGE = 3;
                                    return SearchReferenceRange;
                                }(ReferenceRange));
                                viewmodel.SearchReferenceRange = SearchReferenceRange;
                                var DateRangePickerModel = /** @class */ (function () {
                                    function DateRangePickerModel(startDate, endDate) {
                                        var self = this;
                                        self.startDate = startDate;
                                        self.endDate = endDate;
                                    }
                                    DateRangePickerModel.isSamePeriod = function (a, b) {
                                        return a.startDate === b.startDate && a.endDate === b.endDate;
                                    };
                                    return DateRangePickerModel;
                                }());
                                viewmodel.DateRangePickerModel = DateRangePickerModel;
                                var CCG001TextResource = /** @class */ (function () {
                                    function CCG001TextResource() {
                                    }
                                    CCG001TextResource.CCG001_2 = nts.uk.resource.getText('CCG001_2');
                                    CCG001TextResource.CCG001_21 = nts.uk.resource.getText('CCG001_21');
                                    CCG001TextResource.CCG001_22 = nts.uk.resource.getText('CCG001_22');
                                    CCG001TextResource.CCG001_23 = nts.uk.resource.getText('CCG001_23');
                                    CCG001TextResource.CCG001_24 = nts.uk.resource.getText('CCG001_24');
                                    CCG001TextResource.CCG001_25 = nts.uk.resource.getText('CCG001_25');
                                    CCG001TextResource.CCG001_26 = nts.uk.resource.getText('CCG001_26');
                                    CCG001TextResource.CCG001_27 = nts.uk.resource.getText('CCG001_27');
                                    CCG001TextResource.CCG001_28 = nts.uk.resource.getText('CCG001_28');
                                    CCG001TextResource.CCG001_29 = nts.uk.resource.getText('CCG001_29');
                                    CCG001TextResource.CCG001_34 = nts.uk.resource.getText('CCG001_34');
                                    CCG001TextResource.CCG001_35 = nts.uk.resource.getText('CCG001_35');
                                    CCG001TextResource.CCG001_36 = nts.uk.resource.getText('CCG001_36');
                                    CCG001TextResource.CCG001_37 = nts.uk.resource.getText('CCG001_37');
                                    CCG001TextResource.CCG001_38 = nts.uk.resource.getText('CCG001_38');
                                    CCG001TextResource.CCG001_39 = nts.uk.resource.getText('CCG001_39');
                                    CCG001TextResource.CCG001_42 = nts.uk.resource.getText('CCG001_42');
                                    CCG001TextResource.CCG001_43 = nts.uk.resource.getText('CCG001_43');
                                    CCG001TextResource.CCG001_45 = nts.uk.resource.getText('CCG001_45');
                                    CCG001TextResource.CCG001_47 = nts.uk.resource.getText('CCG001_47');
                                    CCG001TextResource.CCG001_49 = nts.uk.resource.getText('CCG001_49');
                                    CCG001TextResource.CCG001_55 = nts.uk.resource.getText('CCG001_55');
                                    CCG001TextResource.CCG001_58 = nts.uk.resource.getText('CCG001_58');
                                    CCG001TextResource.CCG001_98 = nts.uk.resource.getText('CCG001_98');
                                    CCG001TextResource.CCG001_99 = nts.uk.resource.getText('CCG001_99');
                                    CCG001TextResource.CCG001_104 = nts.uk.resource.getText('CCG001_104');
                                    CCG001TextResource.CCG001_105 = nts.uk.resource.getText('CCG001_105');
                                    CCG001TextResource.CCG001_108 = nts.uk.resource.getText('CCG001_108');
                                    CCG001TextResource.CCG001_109 = nts.uk.resource.getText('CCG001_109');
                                    CCG001TextResource.Com_Employment = nts.uk.resource.getText('Com_Employment');
                                    CCG001TextResource.Com_Department = nts.uk.resource.getText('Com_Department');
                                    CCG001TextResource.Com_Workplace = nts.uk.resource.getText('Com_Workplace');
                                    CCG001TextResource.Com_Class = nts.uk.resource.getText('Com_Class');
                                    CCG001TextResource.Com_Jobtitle = nts.uk.resource.getText('Com_Jobtitle');
                                    return CCG001TextResource;
                                }());
                                viewmodel.CCG001TextResource = CCG001TextResource;
                                var CCG001_HTML = "<div id=\"component-ccg001\" class=\"cf height-maximum\" style=\"visibility: hidden;\">\n        <div class=\"pull-left ccg001-content\">\n            <div id=\"ccg001-header\" class=\"ccg001-table\">\n                <div class=\"ccg001-cell\">\n                    <!-- ko if: showBaseDate -->\n                        <div class=\"control-group ccg001-control-group\">\n                            <div class=\"ccg001-label\" data-bind=\"ntsFormLabel: {required: true}\">" + CCG001TextResource.CCG001_27 + "</div>\n                            <div id=\"inp_baseDate\"\n                                data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsDatePicker: {\n                                name: '#[CCG001_27]',\n                                dateFormat: 'YYYY/MM/DD',\n                                value: inputBaseDate,\n                                required: true }\"></div>\n                        </div>\n                    <!-- /ko -->\n                    <!-- ko if: showClosure -->\n                        <div class=\"control-group ccg001-control-group\">\n                            <div class=\"ccg001-cell\">\n                                <div class=\"ccg001-label\" data-bind=\"ntsFormLabel: {required: true}\">" + CCG001TextResource.CCG001_28 + "</div>\n                            </div>\n                            <div class=\"ccg001-cell mid\">\n                                <div id=\"cbb-closure\" style=\"margin-left: 4px;\"\n                                    data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsComboBox: {\n                                        name: '#[CCG001_28]',\n                                        options: closureList,\n                                        optionsValue: 'closureId',\n                                        value: selectedClosure,\n                                        optionsText: 'closureName',\n                                        editable: false,\n                                        enable: true,\n                                        columns: [\n                                            { prop: 'closureId', length: 1 },\n                                            { prop: 'closureName', length: 5 },\n                                        ]}\"></div>\n                            </div>\n                        </div>\n                    <!-- /ko -->\n                    <!-- ko if: showPeriod -->\n                        <div class=\"control-group ccg001-control-group\">\n                            <div class=\"ccg001-cell\">\n                                <div class=\"ccg001-label\" data-bind=\"ntsFormLabel: {required: true}\">" + CCG001TextResource.CCG001_29 + "</div>\n                            </div>\n                            <div class=\"ccg001-cell mid\">\n                                <div id=\"ccg001-search-period\" data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsDateRangePicker: {\n                                    type: showPeriodYM ? 'yearmonth' : 'fullDate',\n                                    maxRange: maxPeriodRange,\n                                    required: true,\n                                    enable: true,\n                                    showNextPrevious: true,\n                                    value: inputPeriod}\"/>\n                            </div>\n                        </div>\n                    <!-- /ko -->\n                </div>\n                <div class=\"ccg001-cell bot\">\n                    <button id=\"ccg001-btn-apply-search-condition\"\n                        class=\"proceed caret-bottom\" data-bind=\"attr: {tabindex: ccg001Tabindex},\n                            enable: isValidInput, click: applyDataSearch\">" + CCG001TextResource.CCG001_2 + "</button>\n                </div>\n            </div>\n        <div id=\"tab-panel\" class=\"cf ccg-tabpanel pull-left\"\n            data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsTabPanel: { dataSource: tabs, active: selectedTab}\">\n                <div tabindex=\"-1\" class=\"tab-content-1\" data-bind=\"visible: showQuickSearchTab\">\n                    <!-- ko if: showAllReferableEmployee -->\n                        <div id=\"ccg001-btn-search-all\" class=\"btn-quick-search has-state\" data-bind=\"attr: {tabindex: ccg001Tabindex}\">\n                            <div class=\"flex valign-center btn_big ccg-btn-quick-search ccg001-btn\"\n                                data-bind=\"click: function(){searchEmployeeByReferenceRange(" + SearchReferenceRange.ALL_REFERENCE_RANGE + ")}\">\n                                <i class=\"icon ccg001-icon-btn-big icon-28-allemployee\"></i>\n                                <label class=\"labelBigButton\">" + CCG001TextResource.CCG001_34 + "</label> \n                            </div>\n                            <span class=\"ccg001-caret ccg001-caret-quick-big caret-right\"></span>\n                        </div>\n                    <!-- /ko -->\n                    <!-- ko if: showOnlyMe -->\n                        <div id=\"ccg001-btn-only-me\" class=\"btn-quick-search has-state\" data-bind=\"attr: {tabindex: ccg001Tabindex}\">\n                            <div class=\"flex valign-center btn_big ccg-btn-quick-search ccg001-btn\"\n                                data-bind=\"click: searchCurrentLoginEmployee\">\n                                <i class=\"icon ccg001-icon-btn-big icon-26-onlyemployee\"></i>\n                                <label class=\"labelBigButton\">" + CCG001TextResource.CCG001_35 + "</label> \n                            </div>\n                            <span class=\"ccg001-caret ccg001-caret-quick-big caret-right\"></span>\n                        </div>\n                    <!-- /ko -->\n                    <!-- ko if: showSameDepartment -->\n                        <div id=\"ccg001-btn-same-workplace\" class=\"btn-quick-search has-state\" data-bind=\"attr: {tabindex: ccg001Tabindex}\">\n                            <div class=\"flex valign-center btn_small ccg-btn-quick-search ccg001-btn\"\n                                data-bind=\"click: function(){searchEmployeeByReferenceRange(" + SearchReferenceRange.AFFILIATION_ONLY + ")}\">\n                                <i class=\"icon ccg001-icon-btn-small icon-48-ofworkplace\"></i>\n                                <label class=\"labelSmallButton\">" + CCG001TextResource.CCG001_36 + "</label> \n                            </div>\n                            <span class=\"ccg001-caret ccg001-caret-quick-small caret-right\"></span>\n                        </div>\n                    <!-- /ko -->\n                    <!-- ko if: showSameDepartmentAndChild -->\n                        <div id=\"ccg001-btn-same-workplace-and-child\" class=\"btn-quick-search has-state\" data-bind=\"attr: {tabindex: ccg001Tabindex}\">\n                            <div class=\"flex valign-center btn_small ccg-btn-quick-search ccg001-btn\"\n                                data-bind=\"click: function(){searchEmployeeByReferenceRange(" + SearchReferenceRange.AFFILIATION_AND_ALL_SUBORDINATES + ")}\">\n                                <i class=\"icon ccg001-icon-btn-small icon-49-workplacechild\"></i>\n                                <label class=\"labelSmallButton\">" + CCG001TextResource.CCG001_37 + "</label> \n                            </div>\n                            <span class=\"ccg001-caret ccg001-caret-quick-small caret-right\"></span>\n                        </div>\n                    <!-- /ko -->\n                    <!-- ko if: showSameWorkplace -->\n                        <div id=\"ccg001-btn-same-workplace\" class=\"btn-quick-search has-state\" data-bind=\"attr: {tabindex: ccg001Tabindex}\">\n                            <div class=\"flex valign-center btn_small ccg-btn-quick-search ccg001-btn\"\n                                data-bind=\"click: function(){searchEmployeeByReferenceRange(" + SearchReferenceRange.AFFILIATION_ONLY + ")}\">\n                                <i class=\"icon ccg001-icon-btn-small icon-48-ofworkplace\"></i>\n                                <label class=\"labelSmallButton\">" + CCG001TextResource.CCG001_38 + "</label> \n                            </div>\n                            <span class=\"ccg001-caret ccg001-caret-quick-small caret-right\"></span>\n                        </div>\n                    <!-- /ko -->\n                    <!-- ko if: showSameWorkplaceAndChild -->\n                        <div id=\"ccg001-btn-same-workplace-and-child\" class=\"btn-quick-search has-state\" data-bind=\"attr: {tabindex: ccg001Tabindex}\">\n                            <div class=\"flex valign-center btn_small ccg-btn-quick-search ccg001-btn\"\n                                data-bind=\"click: function(){searchEmployeeByReferenceRange(" + SearchReferenceRange.AFFILIATION_AND_ALL_SUBORDINATES + ")}\">\n                                <i class=\"icon ccg001-icon-btn-small icon-49-workplacechild\"></i>\n                                <label class=\"labelSmallButton\">" + CCG001TextResource.CCG001_39 + "</label> \n                            </div>\n                            <span class=\"ccg001-caret ccg001-caret-quick-small caret-right\"></span>\n                        </div>\n                    <!-- /ko -->\n                </div>\n\n                <div tabindex=\"-1\" class=\"tab-content-2 height-maximum\" data-bind=\"visible: showAdvancedSearchTab\">\n                        <div id=\"ccg001-tab-content-2\" class=\"height-maximum\">\n                            <div class=\"pull-left height-maximum\" style=\"padding-right: 20px; overflow-y: scroll;\">\n                                <div>\n                                    <label>" + CCG001TextResource.CCG001_24 + "</label>\n                                </div>\n                                <div class=\"accordion\" id=\"StatusOfEmployeeList\"\n                                    data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsAccordion: {enable: true}\">\n                                    <h3>\n                                        <label>" + CCG001TextResource.CCG001_42 + "</label>\n                                    </h3>\n                                    <div class=\"contentkcp\">\n                                        <div style=\"padding-bottom: 20px;\">\n                                            <label>" + CCG001TextResource.CCG001_43 + "</label>\n                                            <div class=\"pull-right\" id=\"switch-buttons\" data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsSwitchButton: {\n                                                name: '#[CCG001_44]',\n                                                options: incumbentDatasource,\n                                                optionsValue: 'code',\n                                                optionsText: 'name',\n                                                value: selectedIncumbent,\n                                                enable: true }\">\n                                            </div>\n                                        </div>\n                                        <div style=\"padding-bottom: 20px;\">\n                                            <label>" + CCG001TextResource.CCG001_47 + "</label>\n                                            <div class=\"pull-right\" id=\"switch-buttons\" data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsSwitchButton: {\n                                                name: '#[CCG001_48]',\n                                                options: closedDatasource,\n                                                optionsValue: 'code',\n                                                optionsText: 'name',\n                                                value: selectedClosed,\n                                                enable: true }\">\n                                            </div>\n                                        </div>\n                                        <div style=\"padding-bottom: 20px;\">\n                                            <label>" + CCG001TextResource.CCG001_45 + "</label>\n                                            <div class=\"pull-right\" id=\"switch-buttons\" data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsSwitchButton: {\n                                                name: '#[CCG001_46]',\n                                                options: leaveOfAbsenceDatasource,\n                                                optionsValue: 'code',\n                                                optionsText: 'name',\n                                                value: selectedLeave,\n                                                enable: true }\">\n                                            </div>\n                                        </div>\n                                        <div style=\"padding-bottom: 20px;\">\n                                            <label>" + CCG001TextResource.CCG001_49 + "</label>\n                                            <div class=\"pull-right\" id=\"switch-buttons\" data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsSwitchButton: {\n                                                name: '#[CCG001_50]',\n                                                options: retirementDatasource,\n                                                optionsValue: 'code',\n                                                optionsText: 'name',\n                                                value: selectedRetirement,\n                                                enable: true }\">\n                                            </div>\n                                        </div>\n                                        <div class=\"pull-right\" style=\"padding-top: 10px;\">\n                                            <div id=\"ccg001-retire-period\"\n                                                        data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsDateRangePicker: {\n                                                            name: '#[CCG001_92]',\n                                                            required: true,\n                                                            enable: true,\n                                                            showNextPrevious: false,\n                                                            value: retirePeriod }\"/>\n                                        </div>\n                                    </div>\n                                </div>\n                                <!-- ko if: showEmployment -->\n                                    <div class=\"accordion\" id=\"EmploymentList\"\n                                        data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsAccordion: {enable: true}\">\n                                        <h3>\n                                            <label>" + CCG001TextResource.Com_Employment + "</label>\n                                        </h3>\n                                        <div class=\"contentkcp\">\n                                            <div id=\"employmentList\" style=\"width: 352px; height: 335px;\"></div>\n                                        </div>\n                                    </div>\n                                <!-- /ko -->\n                                <!-- ko if: showDepartment -->\n                                    <div class=\"accordion\" id=\"DepartmentList\"\n                                        data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsAccordion: {enable: true}\">\n                                        <h3>\n                                            <label>" + CCG001TextResource.Com_Department + "</label>\n                                        </h3>\n                                        <div class=\"contentkcpWorkplace\">\n                                            <div id=\"departmentList\"></div><br/>\n                                            <button id=\"btnDetailDepartment\" class=\"small\"\n                                                data-bind=\"attr: {tabindex: ccg001Tabindex}, click: function(){detailDepartmentWorkplace(" + StartMode.DEPARTMENT + ")}\">" + CCG001TextResource.CCG001_55 + "</button>\n                                        </div>\n                                    </div>\n                                <!-- /ko -->\n                                <!-- ko if: showWorkplace -->\n                                    <div class=\"accordion\" id=\"WorkplaceList\"\n                                        data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsAccordion: {enable: true}\">\n                                        <h3>\n                                            <label>" + CCG001TextResource.Com_Workplace + "</label>\n                                        </h3>\n                                        <div class=\"contentkcpWorkplace\">\n                                            <div id=\"workplaceList\"></div><br/>\n                                            <button id=\"btnDetailWorkplace\"  class=\"small\"\n                                                data-bind=\"attr: {tabindex: ccg001Tabindex}, click: function(){detailDepartmentWorkplace(" + StartMode.WORKPLACE + ")}\">" + CCG001TextResource.CCG001_55 + "</button>\n                                        </div>\n                                    </div>\n                                <!-- /ko -->\n                                <!-- ko if: showClassification -->\n                                    <div class=\"accordion\" id=\"ClassificationList\"\n                                        data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsAccordion: {enable: true}\">\n                                        <h3>\n                                            <label>" + CCG001TextResource.Com_Class + "</label>\n                                        </h3>\n                                        <div class=\"contentkcp\">\n                                            <div id=\"classificationList\" style=\"height: 335px;\"></div>\n                                        </div>\n                                    </div>\n                                <!-- /ko -->\n                                <!-- ko if: showJobTitle -->\n                                    <div class=\"accordion\" id=\"JoptitleList\"\n                                        data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsAccordion: {enable: true}\">\n                                        <h3>\n                                            <label>" + CCG001TextResource.Com_Jobtitle + "</label>\n                                        </h3>\n                                        <div class=\"contentkcp\">\n                                            <div id=\"jobtitleList\" style=\"height: 310px;\"></div>\n                                        </div>\n                                    </div>\n                                <!-- /ko -->\n                                <!-- ko if: showWorktype -->\n                                    <div class=\"accordion\" id=\"WorkTypeList\"\n                                        data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsAccordion: {enable: true}\" hidden =\"true\">\n                                        <h3>\n                                            <label>" + CCG001TextResource.CCG001_58 + "</label>\n                                        </h3>\n                                        <div class=\"contentkcp\">\n                                            <div style=\"width: 340px\" data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsSearchBox: {\n                                                searchMode: 'filter',\n                                                targetKey: 'businessTypeCode',\n                                                comId: 'list-worktype', \n                                                items: listWorkType,\n                                                selectedKey: 'businessTypeCode',\n                                                fields: ['businessTypeCode', 'businessTypeName'],\n                                                mode: 'listbox'}\" />\n                                            <table id=\"list-worktype\"\n                                            data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsGridList: {\n                                                name: '#[CCG001_59]',\n                                                height: 235,\n                                                options: listWorkType,\n                                                optionsValue: 'businessTypeCode',\n                                                columns: workTypeColumns,\n                                                multiple: true,\n                                                value: selectedWorkTypeCode\n                                            }\"></table>\n                                        </div>\n                                    </div>\n                                <!-- /ko -->\n                            </div>\n                            <div class=\"pull-left height-maximum margin-left-10 ccg001-table has-state\">\n                                <div class=\"ccg001-cell mid\">\n                                    <div id=\"ccg001-btn-advanced-search\" class=\"ccg001-btn ccg-btn-vertical height-maximum\"\n                                        data-bind=\"attr: {tabindex: ccg001Tabindex}, click: advancedSearchEmployee\">\n                                        <div class=\"ccg001-cell mid\">\n                                            <div class=\"ccg-lbl-vertical ccg-lbl-extract-emp\">" + CCG001TextResource.CCG001_25 + "</div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"ccg001-cell mid\">\n                                    <span class=\"ccg001-caret ccg001-caret-vertical caret-right\"></span>\n                                </div>\n                            </div>\n                            \n                            <!-- ko if: showEmployeeSelection -->\n                                <div class=\"pull-left height-maximum margin-left-10\">\n                                    <div id=\"employeeinfo\"></div>\n                                </div>\n                                <div class=\"pull-left height-maximum margin-left-10 ccg001-table has-state\">\n                                    <div class=\"ccg001-cell mid\">\n                                        <div id=\"ccg001-btn-KCP005-apply\" class=\"ccg001-btn ccg-btn-vertical height-maximum\"\n                                            data-bind=\"attr: {tabindex: ccg001Tabindex}, click: extractSelectedEmployees\">\n                                            <div class=\"ccg001-cell mid\">\n                                                <i class=\"icon icon-47-white-check-mark icon-ml\"></i>\n                                                <div class=\"ccg-lbl-vertical ccg-lbl-extract-emp\">" + CCG001TextResource.CCG001_26 + "</div>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div class=\"ccg001-cell mid\">\n                                        <span class=\"ccg001-caret ccg001-caret-vertical caret-right\"></span>\n                                    </div>\n                                </div>\n                            <!-- /ko -->\n                            <div class=\"cf\"></div>\n                        </div>\n                        <div class=\"cf\"></div>\n                    </div>\n            <div id=\"ccg001-tab-content-3\" class=\"height-maximum\">\n                <div id=\"ccg001-part-g\" class=\"pull-left height-maximum\">\n                    <div class=\"control-group ccg001-control-group\">\n                        <div data-bind=\"ntsFormLabel: {}\">" + CCG001TextResource.CCG001_104 + "</div>\n                        <input class=\"ccg001-inp\" id=\"ccg001-input-code\"\n                                    data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsTextEditor: {\n                                    name: '#[CCG001_106]',\n                                    value: inputCodeTab3,\n                                    valueUpdate: 'keypress',\n                                    required: false\n                                    }\" />\n                        <button class=\"proceed caret-bottom pull-right\" id=\"ccg001-tab3-search-by-code\"\n                            data-bind=\"attr: {tabindex: ccg001Tabindex}, click: searchByCode, enable: isValidInput\">" + CCG001TextResource.CCG001_108 + "</button>\n                    </div>\n                    <div class=\"control-group ccg001-control-group\">\n                        <div data-bind=\"ntsFormLabel: {}\">" + CCG001TextResource.CCG001_105 + "</div>\n                        <input class=\"ccg001-inp\" id=\"ccg001-inp-name\"\n                                    data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsTextEditor: {\n                                    name: '#[CCG001_107]',\n                                    value: inputNameTab3,\n                                    valueUpdate: 'keypress',\n                                    required: false\n                                    }\" />\n                        <button class=\"proceed caret-bottom pull-right\" id=\"ccg001-tab3-search-by-name\"\n                            data-bind=\"attr: {tabindex: ccg001Tabindex}, click: searchByName, enable: isValidInput\">" + CCG001TextResource.CCG001_108 + "</button>\n                    </div>\n                    <div class=\"cf control-group ccg001-control-group\">\n                        <div class=\"pull-left\" data-bind=\"ntsFormLabel: {}\">" + CCG001TextResource.CCG001_98 + "</div>\n                        <div id=\"ccg001-date-entry\" class=\"ccg001-date-range pull-left\"\n                            data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsDateRangePicker: {\n                                name: '#[CCG001_100]',\n                                required: false,\n                                enable: true,\n                                showNextPrevious: false,\n                                value: entryDateTab3\n                                }\"/>\n                        <button class=\"proceed caret-bottom pull-right\" id=\"search-by-entry-date\"\n                            data-bind=\"attr: {tabindex: ccg001Tabindex}, click: searchByEntryDate, enable: isValidEntryDateSearch\">" + CCG001TextResource.CCG001_108 + "</button>\n                    </div>\n                    <div class=\"cf control-group ccg001-control-group\">\n                        <div class=\"pull-left\" data-bind=\"ntsFormLabel: {}\">" + CCG001TextResource.CCG001_99 + "</div>\n                        <div id=\"ccg001-date-retirement\" class=\"ccg001-date-range pull-left\"\n                            data-bind=\"attr: {tabindex: ccg001Tabindex}, ntsDateRangePicker: {\n                                name: '#[CCG001_100]',\n                                required: false,\n                                enable: true,\n                                showNextPrevious: false,\n                                value: retirementDateTab3 }\"/>\n                        <button class=\"proceed caret-bottom pull-right\" id=\"search-by-retirement-date\"\n                            data-bind=\"attr: {tabindex: ccg001Tabindex}, click: searchByRetirementDate, enable: isValidRetirementDateSearch\">" + CCG001TextResource.CCG001_108 + "</button>\n                    </div>\n                    <div id=\"tab3kcp005\"></div>\n                </div>\n                <div class=\"pull-right height-maximum ccg001-table has-state\">\n                    <div class=\"ccg001-cell mid\">\n                        <div id=\"ccg001-btn-KCP005-apply\" class=\"ccg001-btn ccg-btn-vertical height-maximum\"\n                            data-bind=\"attr: {tabindex: ccg001Tabindex}, click: extractSelectedEmployeesInTab3\">\n                            <div class=\"ccg001-cell mid\">\n                                <i class=\"icon icon-47-white-check-mark icon-ml\"></i>\n                                <div class=\"ccg-lbl-vertical ccg-lbl-extract-emp\">" + CCG001TextResource.CCG001_26 + "</div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"ccg001-cell mid\">\n                        <span class=\"ccg001-caret ccg001-caret-vertical caret-right\"></span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        </div>\n    </div>\n    <div id=\"hor-scroll-button-hide\">\n        <span class=\"position-mid ccg001-caret ccg001-caret-vertical caret-right\"></span>\n        <div id=\"ccg001-btn-search-drawer\" class=\"position-mid ccg001-btn ccg-btn-vertical\" data-bind=\"click: showComponent\">\n            <div class=\"ccg001-cell mid\">\n            <i class=\"icon icon-01-searchmode icon-ml\"></i>\n            <div class=\"ccg-lbl-vertical ccg-lbl-search-drawer\">" + CCG001TextResource.CCG001_21 + "</div>\n            </div>\n        </div>\n    </div>";
                            })(viewmodel = ccg.viewmodel || (ccg.viewmodel = {}));
                        })(ccg = share.ccg || (share.ccg = {}));
                    })(share = ccg_1.share || (ccg_1.share = {}));
                })(ccg = view.ccg || (view.ccg = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
(function ($) {
    $.fn.ntsGroupComponent = function (option) {
        var dfd = $.Deferred();
        new nts.uk.com.view.ccg.share.ccg.viewmodel.ListGroupScreenModel().init(this, option).done(function () {
            nts.uk.ui.block.clear();
            dfd.resolve();
        });
        return dfd.promise();
    };
}(jQuery));
//# sourceMappingURL=ccg.vm.js.map