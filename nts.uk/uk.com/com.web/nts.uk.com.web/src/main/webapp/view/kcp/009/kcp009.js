var kcp009;
(function (kcp009) {
    var viewmodel;
    (function (viewmodel) {
        var ScreenModel = /** @class */ (function () {
            function ScreenModel() {
                var self = this;
                self.prefix = ko.observable("");
                self.empList = ko.observableArray([]);
                self.targetBtnText = nts.uk.resource.getText("KCP009_3");
                self.empDisplayCode = ko.observable(null);
                self.empBusinessName = ko.observable(null);
                self.organizationDesignation = ko.observable(null);
                self.organizationName = ko.observable('');
                self.keySearch = ko.observable("");
                self.baseDate = ko.observable(null);
                self.isDisplay = ko.observable(true);
                self.isShowEmpList = ko.observable(false);
                self.componentWrapperId = nts.uk.util.randomId();
            }
            // Initialize Component
            ScreenModel.prototype.init = function ($input, data) {
                var _a;
                var dfd = $.Deferred();
                $(document).undelegate('#list-box_grid', 'iggriddatarendered');
                ko.cleanNode($input[0]);
                var self = this;
                self.prefix($input[0].id);
                self.tabIndex = data.tabIndex;
                // System Reference Type
                self.systemType = data.systemReference;
                if (data.baseDate) {
                    self.baseDate = data.baseDate;
                }
                if (data.employeeInputList().length > 1) {
                    data.employeeInputList().sort(function (left, right) {
                        return left.code == right.code ?
                            0 : (left.code < right.code ? -1 : 1);
                    });
                }
                if (data.employeeInputList().length > 0) {
                    self.empList(data.employeeInputList());
                    //input.初期選択社員IDに値がない場合
                    if (_.isNil(data.selectedItem) || _.isNil(data.selectedItem())) {
                        if (_.isNil(data.selectedItem)) {
                            self.selectedItem = ko.observable(null);
                        }
                        else {
                            self.selectedItem = data.selectedItem;
                        }
                        // Set SelectedItem: First Item
                        var codeEmp = _.find(data.employeeInputList(), function (f) { return f.id == __viewContext.user.employeeId; });
                        if (codeEmp) { //社員リストにログイン社員が含まれる
                            self.selectedItem(__viewContext.user.employeeId);
                        }
                        else { //社員リストにログイン社員が含まれない
                            self.selectedItem(data.employeeInputList().length > 0 ? data.employeeInputList()[0].id : null);
                        }
                    }
                    else { //input.初期選択社員IDに値がある場合
                        self.selectedItem = data.selectedItem;
                    }
                    self.isDisplayNumberOfEmployee = (_a = data.isDisplayNumberOfEmployee) !== null && _a !== void 0 ? _a : true;
                }
                else {
                    // message 184
                    nts.uk.ui.dialog.info({ messageId: "Msg_184" });
                }
                // Initial Binding from Selected Item
                self.bindEmployee(self.selectedItem());
                self.targetBtnText = data.targetBtnText;
                self.isDisplayOrganizationName = data.isDisplayOrganizationName;
                if (data.isDisplayOrganizationName) {
                    if (data.systemReference == SystemType.EMPLOYMENT) {
                        // Set Organization Designation if System Reference is Employment
                        self.organizationDesignation(nts.uk.resource.getText("Com_Workplace"));
                    }
                    else {
                        // Set Organization Designation if System Reference is others
                        self.organizationDesignation(nts.uk.resource.getText("Com_Department"));
                    }
                }
                self.selectedItem.subscribe(function (value) {
                    self.bindEmployee(value);
                });
                // Selected OrdinalNumber
                self.selectedOrdinalNumber = ko.computed(function () {
                    var currentItem = self.empList().filter(function (item) {
                        return item.id == self.selectedItem();
                    })[0];
                    return self.empList().indexOf(currentItem) + 1;
                });
                self.isActivePersonalProfile = ko.computed(function () {
                    return data.employeeInputList.length > 0;
                }, self);
                self.isActivePreviousBtn = ko.computed(function () {
                    return (self.empList().length > 0) && self.selectedOrdinalNumber() > 1;
                }, self);
                self.isActiveNextBtn = ko.computed(function () {
                    return (self.empList().length > 0) && self.selectedOrdinalNumber() < self.empList().length;
                }, self);
                self.selectedNumberOfPeople = ko.computed(function () {
                    return self.selectedOrdinalNumber().toString() + "/" + self.empList().length.toString();
                });
                // End of Initialize variables
                var webserviceLocator = nts.uk.request.location.siteRoot
                    .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                    .mergeRelativePath('/view/kcp/009/kcp009.xhtml').serialize();
                $input.load(webserviceLocator, function () {
                    //$input.find('#list-box').empty();
                    ko.applyBindings(self, $input[0]);
                    // Add profile Icon
                    var iconLink = nts.uk.request.location.siteRoot
                        .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                        .mergeRelativePath('/view/kcp/share/icon/7.png').serialize();
                    // $('#profile-icon-'+self.prefix()).attr('style', "background: url('" + iconLink + "'); width: 30px; height: 30px; background-size: 30px 30px;");
                    // Icon for Previous Button
                    var prevIconLink = nts.uk.request.location.siteRoot
                        .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                        .mergeRelativePath('/view/kcp/share/icon/9.png').serialize();
                    // $('#prev-btn-'+self.prefix()).attr('style', "background: url('" + prevIconLink + "'); width: 30px; height: 30px; background-size: 30px 30px;");
                    // Icon for Next Button
                    var nextIconLink = nts.uk.request.location.siteRoot
                        .mergeRelativePath(nts.uk.request.WEB_APP_NAME["com"] + '/')
                        .mergeRelativePath('/view/kcp/share/icon/10.png').serialize();
                    //$('#next-btn-'+self.prefix()).attr('style', "background: url('" + nextIconLink + "'); width: 30px; height: 30px; background-size: 30px 30px;");
                    // Toggle employee list
                    var itemListEl = '#item-list-' + self.prefix();
                    var btnShowListEl = '#btn_show_list-' + self.prefix();
                    $(itemListEl).ntsPopup({
                        position: {
                            my: 'left top',
                            at: 'left bottom',
                            of: btnShowListEl
                        },
                        dismissible: false
                    });
                    // set z-index higher than CCG001
                    $('#item-list-' + self.prefix()).css('z-index', 998);
                    self.initKcp009Event();
                    // Enter keypress
                    $('#search-input-' + self.prefix()).on('keypress', function (e) {
                        if (e.which == 13) {
                            self.keySearch($('#search-input-' + self.prefix()).val());
                            if (self.keySearch()) {
                                self.searchEmp();
                            }
                        }
                    });
                    dfd.resolve();
                });
                return dfd.promise();
            };
            ScreenModel.prototype.initKcp009Event = function () {
                var self = this;
                var componentWrapperParent = $('#' + self.componentWrapperId).parent();
                if (!componentWrapperParent.attr('kcp009-event-click-registered')) {
                    componentWrapperParent.attr('kcp009-event-click-registered', 'true');
                    $(document.body).on('click', function (e) {
                        var listBox = $('#item-list-' + self.prefix());
                        // click button show list box
                        if (e.target.id == 'btn_show_list-' + self.prefix()) {
                            listBox.ntsPopup('toggle');
                            return;
                        }
                        // click select item
                        if ($(e.target).parents('#item-list-' + self.prefix() + ' .ntsListBox').length > 0) {
                            listBox.ntsPopup('toggle');
                        }
                        // click to inside component
                        if (listBox[0] == e.target || jQuery.contains(listBox[0], e.target)) {
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
                        // close listbox popup
                        if (listBox.css('visibility') == 'visible') {
                            listBox.ntsPopup('toggle');
                        }
                    });
                }
            };
            // bindEmployee
            ScreenModel.prototype.bindEmployee = function (id) {
                var self = this;
                if (id) {
                    var currentItem = self.empList().filter(function (item) {
                        return item.id == id;
                    })[0];
                    if (currentItem) {
                        self.empDisplayCode(currentItem.code);
                        self.empBusinessName(currentItem.businessName);
                        // Set OrganizationName
                        self.organizationName((self.systemType == SystemType.EMPLOYMENT) ?
                            currentItem.workplaceName : currentItem.depName);
                    }
                }
                else {
                    self.empDisplayCode("");
                    self.empBusinessName("");
                    self.organizationName("");
                }
            };
            // showEmpList
            ScreenModel.prototype.showEmpList = function () {
                var self = this;
                $("#test1").toggle();
            };
            // Search Employee
            ScreenModel.prototype.searchEmp = function () {
                var self = this;
                //Acquire Employee from key
                // System
                var system = self.systemType;
                // Search
                service.searchEmployee(self.keySearch(), system, self.baseDate()).done(function (employee) {
                    // find Exist Employee in List
                    var existItem = self.empList().filter(function (item) {
                        return item.code == employee.employeeCode;
                    })[0];
                    if (existItem) {
                        // Set Selected Item
                        self.selectedItem(existItem.id);
                        self.empDisplayCode(existItem.code);
                        self.empBusinessName(employee.businessName);
                        self.organizationName((self.systemType == SystemType.EMPLOYMENT) ?
                            employee.wkpDisplayName : employee.deptDisplayName);
                    }
                    else {
                        var newEmpList = [];
                        newEmpList.push({ id: employee.employeeId, code: employee.employeeCode, businessName: employee.businessName, workplaceName: employee.wkpDisplayName, depName: employee.deptDisplayName });
                        self.empList(newEmpList);
                        // Set Selected Item
                        self.selectedItem(employee.employeeId);
                        self.empDisplayCode(employee.employeeCode);
                        self.empBusinessName(employee.businessName);
                        self.organizationName((self.systemType == SystemType.EMPLOYMENT) ?
                            employee.wkpDisplayName : employee.deptDisplayName);
                    }
                }).fail(function (res) {
                    if (res.messageId === 'Msg_7') {
                        nts.uk.ui.dialog.info({ messageId: "Msg_7" });
                    }
                    else {
                        nts.uk.ui.dialog.alert(res.message);
                    }
                });
            };
            // Previous Employee
            ScreenModel.prototype.previousEmp = function () {
                var self = this;
                var currentItem = self.empList().filter(function (item) {
                    return item.id == self.selectedItem();
                })[0];
                var nextId = self.empList()[self.empList().indexOf(currentItem) - 1].id;
                self.selectedItem(nextId);
            };
            // Next Employee
            ScreenModel.prototype.nextEmp = function () {
                var self = this;
                var currentItem = self.empList().filter(function (item) {
                    return item.id == self.selectedItem();
                })[0];
                var prevId = self.empList()[self.empList().indexOf(currentItem) + 1].id;
                self.selectedItem(prevId);
            };
            return ScreenModel;
        }());
        viewmodel.ScreenModel = ScreenModel;
        /**
         * Class SystemType
         */
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
        viewmodel.SystemType = SystemType;
        /**
         * Module Service
         */
        var service;
        (function (service) {
            var paths = {
                searchEmployee: 'screen/com/kcp009/employeesearch',
            };
            function searchEmployee(employeeCode, system, baseDate) {
                return nts.uk.request.ajax('com', paths.searchEmployee, { employeeCode: employeeCode, system: system, baseDate: baseDate });
            }
            service.searchEmployee = searchEmployee;
            /**
             * Module Model
             */
            var model;
            (function (model) {
                var EmployeeSearchData = /** @class */ (function () {
                    function EmployeeSearchData() {
                    }
                    return EmployeeSearchData;
                }());
                model.EmployeeSearchData = EmployeeSearchData;
            })(model = service.model || (service.model = {}));
        })(service = viewmodel.service || (viewmodel.service = {}));
    })(viewmodel = kcp009.viewmodel || (kcp009.viewmodel = {}));
})(kcp009 || (kcp009 = {}));
(function ($) {
    $.fn.ntsLoadListComponent = function (option) {
        // Return.
        return new kcp009.viewmodel.ScreenModel().init(this, option);
    };
}(jQuery));
//# sourceMappingURL=kcp009.js.map