var nts;
(function (nts) {
    var custom;
    (function (custom) {
        var component;
        (function (component) {
            var ajax = nts.uk.request.ajax;
            var text = nts.uk.resource.getText;
            var modal = nts.uk.ui.windows.sub.modal;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var liveView = nts.uk.request.liveView;
            var __viewContext = window["__viewContext"] || {};
            var fetch = {
                perm: function () { return ajax('ctx/pereg/functions/auth/find-all'); },
                employee: function (id) { return ajax("bs/employee/person/get-header/".concat(id)); },
                get_list: function (ids) { return ajax('com', 'bs/employee/person/get-list-emps', ids); },
                avartar: function (id) { return ajax("basic/organization/empfilemanagement/find/getAvaOrMap/".concat(id, "/0")); }
            }, DEF_AVATAR = 'images/avatar.svg', style = "<style type=\"text/css\" rel=\"stylesheet\" id=\"header_style\">\n            .header-info .avatar-group,\n            .header-info .person-group,\n            .header-info .action-group {\n                float: left;\n                padding: 0 1px;\n            }\n            \n            .header-info .avatar-group {\n                width: 110px;\n                height: 147px;\n                cursor: pointer;\n            }\n            \n            .header-info .person-group {\n                width: 510px;\n                height: 147px;\n            }\n            \n            .header-info .action-group {\n                width: 234px;\n                height: 147px;\n            }\n            \n            .header-info .action-group .active-panel:first-child {\n                height: 85px;\n            }\n            \n            .header-info .action-group .active-panel:last-child {\n                height: 60px;\n            }\n            \n            .header-info .action-group .column {\n                width: 112px;\n                margin-left: 1px;\n                padding: 3px 0 3px 5px;\n                box-sizing: border-box;\n                float: left;\n            }\n            \n            .header-info .action-group button.btn {\n                width: 100%;\n                margin-bottom: 5px;\n                padding-left: 30px;\n                text-align: left;\n            }\n            \n            .header-info .action-group .btn-print {\n                height: 65px;\n                background-repeat: no-repeat;\n                background-position-x: 2px;\n                background-position-y: center;\n                background-image: url(\"images/print.png\");\n            }\n            \n            .header-info .action-group .btn-location {\n                background-repeat: no-repeat;\n                background-position-x: 2px;\n                background-position-y: center;\n                background-image: url(\"images/location.png\");\n                background-position-y: center;\n            }\n            \n            .header-info .action-group .btn-details {\n                background-repeat: no-repeat;\n                background-position-x: 5px;\n                background-position-y: center;\n                background-image: url(\"images/details.png\");\n            }\n            \n            .header-info .action-group .btn-goout {\n                cursor: pointer;\n                display: block;\n                min-height: 51px;\n                line-height: 50px;\n                padding-left: 60px;\n                background-repeat: no-repeat;\n                background-position-x: 5px;\n                background-position-y: center;\n                background-image: url(\"images/goout.png\");\n                display: block;\n            }\n            \n            .header-info .active-panel {\n                width: 100%;\n                min-height: 52px;\n                height: 100%;\n                box-sizing: border-box;\n                border: 1px solid #999999;\n                margin-bottom: 2px;\n            }\n            \n            .header-info .active-panel:before {\n                content: '';\n                display: block;\n                background-color: #00B050;\n                display: block;\n                background-color: #00B050;\n                height: 7px;\n            }\n            \n            .header-info .avatar-group img.avatar {\n                padding: 5px 2px 2px 5px;\n                width: 100px;\n                height: 130px;\n            }\n            \n            .header-info .person-info {\n                margin: 5px;\n                width: calc(100% - 10px);\n                box-sizing: border-box;\n            }\n            \n            .header-info .person-info .row {\n                margin-top: -1px;\n                line-height: 32px;\n                border: 1px solid #999;\n            }\n            \n            .header-info .person-info .row>div.info {\n                float: left;\n                display: block;\n                padding-left: 5px;\n                min-height: 31px;\n                max-height: 31px;\n                overflow: hidden;\n            }\n            \n            .header-info .person-info .row>div.info>* {\n                display: inline-block;\n                max-width: 200px;\n                text-overflow: ellipsis;\n                height: 30px;\n                overflow: hidden;\n                white-space: nowrap;\n            }\n            \n            .header-info .person-info .row>div.info>*:first-child {\n                min-width: 110px;\n                max-width: 110px;\n            }\n            \n            .header-info .person-info .row>div.info.first {\n                min-width: 170px;\n                max-width: 170px;\n            }\n            \n            .header-info .person-info .row>div.bg-calendar-ym-set {\n                display: inline-block;\n                padding-left: 10px;\n                padding-right: 10px;\n                border-left: 1px solid #999;\n                border-right: 1px solid #999;\n            }\n            \n            .header-info .person-info .row>div.bg-calendar-ym-set:first-child {\n                min-width: 40px;\n                margin-left: -1px;\n            }\n        </style>";
            window["ko"].components.register('employee-list', {
                template: "<!-- ko let: {\n                        text: nts.uk.resource.getText\n                } -->\n            <div class=\"left-area\">\n                <div class=\"bg-green caret-right caret-background\">\n                    <table data-bind=\"attr: { \n                                NameID: text('CPS001_9'), \n                                id: nts.uk.util.randomId().replace(/-/g, '')\n                            }, \n                            ntsGridList: {                              \n                                rows: 10,\n                                multiple: false,\n                                columns: [\n                                    { headerText: '\u30B3\u30FC\u30C9', key: 'employeeId', width: 100, hidden: true },\n                                    { headerText: text('CPS001_9'), key: 'employeeCode', width: 115, hidden: false },\n                                    { headerText: '', key: 'employeeName', width: 145, hidden: false }\n                                ],\n                                primaryKey: 'employeeId',\n                                value: employeeId,\n                                dataSource: employees\n                            }\"></table>\n                </div>\n            </div>\n            <div class=\"right-area\">\n                <div class='header-info'>\n                    <div class=\"avatar-group\">\n                        <div class=\"active-panel\" data-bind=\"click: function() { if(!employee.id()) { return; } action.avatar(); }\">\n                            <img data-bind=\"attr: { src: person.avatar }\" class=\"avatar\" tabindex=\"13\" />\n                        </div>\n                    </div>\n                    <div class=\"person-group\">\n                        <div class=\"active-panel\">\n                            <div class=\"person-info\">\n                                <div class=\"row cf\">\n                                    <div class=\"info bg-calendar-ym-set\" data-bind=\"text: text('CPS001_11')\"></div>\n                                    <div class=\"info\">\n                                        <span data-bind=\"text: employee.code, attr: { title: employee.code }\"></span>\n                                        <span data-bind=\"text: employee.name, attr: { title: employee.name }\"></span>\n                                        <span data-bind=\"text: person.gender, attr: { title: person.gender }\"></span>\n                                    </div>\n                                </div>\n                                <div class=\"row cf\">\n                                    <div class=\"info bg-calendar-ym-set\" data-bind=\"text: text('CPS001_12')\"></div>\n                                    <div class=\"info first\" data-bind=\"text: person.age\"></div>\n                                    <div class=\"info bg-calendar-ym-set\" data-bind=\"text: text('CPS001_13')\"></div>\n                                    <div class=\"info\" data-bind=\"text: employee.entire\"></div>\n                                </div>\n                                <div class=\"row cf\">\n                                    <div class=\"info bg-calendar-ym-set\" data-bind=\"text: text('CPS001_14')\"></div>\n                                    <div class=\"info\">\n                                        <span data-bind=\"text: department.code\"></span>\n                                        <span data-bind=\"text: department.name\"></span>\n                                    </div>\n                                </div>\n                                <div class=\"row cf\">\n                                    <div class=\"info bg-calendar-ym-set\" data-bind=\"text: text('CPS001_15')\"></div>\n                                    <div class=\"info first\" data-bind=\"text: constract.position\"></div>\n                                    <div class=\"info bg-calendar-ym-set\" data-bind=\"text: text('CPS001_16')\"></div>\n                                    <div class=\"info\" data-bind=\"text: constract.contractType\"></div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"action-group\">\n                        <div class=\"active-panel cf\">\n                            <div class=\"column\">\n                                <button class=\"btn btn-location\" type=\"button\" \n                                        data-bind=\"\n                                            enable: !!employee.id(),\n                                            click: action.location,\n                                            text: text('CPS001_20'),\n                                            style: { \n                                                visibility: auth.allowMapBrowse() ? 'visible' : 'hidden' \n                                            }\" \n                                        tabindex=\"14\"></button>\n                                <button class=\"btn btn-details\" type=\"button\" \n                                        data-bind=\"\n                                            enable: !!employee.id(),\n                                            click: action.ebook,\n                                            text: text('CPS001_19'),   \n                                            style: { \n                                                visibility: auth.allowDocRef() ? 'visible' : 'hidden' \n                                            }\" \n                                        tabindex=\"15\"></button>\n                            </div>\n                            <div class=\"column\">\n                                <button class=\"btn btn-print\" type=\"button\" tabindex=\"16\" \n                                        data-bind=\"\n                                            enable: !!employee.id(),\n                                            text: text('CPS001_17'),\n                                            style: { \n                                                visibility: auth.allowPrintRef() ? 'visible' : 'hidden' \n                                            }\"></button>\n                            </div>\n                        </div>\n                        <div class=\"active-panel\">\n                            <a class=\"btn-goout hidden\">\u51FA\u5411\u306B\u6765\u3066\u3044\u307E\u3059</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div style=\"clear: both\"></div>\n        <!-- /ko -->",
                viewModel: function (params) {
                    // add style to <head> on first run
                    if (!$('#header_style').length) {
                        $('head').append(style);
                    }
                    ko.utils.extend(params, {
                        person: {
                            id: params.personId || ko.observable(''),
                            age: ko.observable(''),
                            gender: ko.observable(''),
                            avatar: ko.observable(DEF_AVATAR)
                        },
                        employee: {
                            id: params.employeeId || ko.observable(''),
                            name: ko.observable(''),
                            code: ko.observable(''),
                            entire: ko.observable(''),
                            hireDate: params.hireDate || ko.observable('')
                        },
                        department: {
                            code: ko.observable(''),
                            name: ko.observable('')
                        },
                        constract: {
                            position: ko.observable(''),
                            contractType: ko.observable('')
                        },
                        action: {
                            ebook: function () {
                                var auth = params.auth, pid = ko.toJS(params.person.id), sid = ko.toJS(params.employee.id);
                                setShared("CPS001F_PARAMS", {
                                    pid: pid,
                                    sid: sid
                                });
                                modal('../f/index.xhtml').onClosed(function () { });
                            },
                            avatar: function () {
                                var auth = ko.toJS(params.auth), person = params.person, id = ko.toJS(params.employee.id);
                                if (auth.allowAvatarRef) {
                                    setShared("CPS001D_PARAMS", {
                                        employeeId: id
                                    });
                                    modal('../d/index.xhtml').onClosed(function () {
                                        var data = getShared("CPS001D_VALUES");
                                        if (data) {
                                            person.avatar(data.fileId ? liveView(data.fileId) : DEF_AVATAR);
                                        }
                                    });
                                }
                            },
                            location: function () {
                                var auth = params.auth, id = ko.toJS(params.employee.id);
                                if (auth.allowMapBrowse) {
                                    setShared("CPS001E_PARAMS", {
                                        employeeId: id
                                    });
                                    modal('../e/index.xhtml').onClosed(function () { });
                                }
                            }
                        },
                        auth: {
                            allowDocRef: ko.observable(false),
                            allowMapBrowse: ko.observable(false),
                            allowAvatarRef: ko.observable(false),
                            allowPrintRef: ko.observable(false),
                        }
                    });
                    fetch.perm().done(function (data) {
                        if (data) {
                            _.forEach(data, function (value) {
                                if (value.functionNo == FunctionNo.No3_Allow_RefAva) {
                                    params.auth.allowAvatarRef(!!value.available);
                                }
                                if (value.functionNo == FunctionNo.No5_Allow_RefMap) {
                                    params.auth.allowMapBrowse(!!value.available);
                                }
                                if (value.functionNo == FunctionNo.No7_Allow_RefDoc) {
                                    params.auth.allowDocRef(!!value.available);
                                }
                                if (value.functionNo == FunctionNo.No8_Allow_Print) {
                                    params.auth.allowPrintRef(!!value.available);
                                }
                            });
                        }
                        else {
                            params.auth.allowDocRef(false);
                            params.auth.allowAvatarRef(false);
                            params.auth.allowMapBrowse(false);
                            params.auth.allowPrintRef(false);
                            params.person.avatar(DEF_AVATAR);
                        }
                    });
                    params.employeeId.subscribe(function (id) {
                        var person = params.person, employee = params.employee, department = params.department, constract = params.constract;
                        if (!!id) {
                            fetch.employee(id).done(function (emp) {
                                if (emp) {
                                    if (!params.auth.allowAvatarRef()) {
                                        person.avatar(DEF_AVATAR);
                                    }
                                    else {
                                        fetch.avartar(id).done(function (avatar) {
                                            person.avatar(avatar.fileId ? liveView(avatar.fileId) : DEF_AVATAR);
                                        }).fail(function (msg) { return person.avatar(DEF_AVATAR); });
                                    }
                                    person.id(emp.pid);
                                    if (!emp.gender) {
                                        person.gender('');
                                    }
                                    else {
                                        person.gender("(".concat(emp.gender, ")"));
                                    }
                                    if (!emp.birthday) {
                                        person.age('');
                                    }
                                    else {
                                        var now = moment.utc(), birthDay = moment.utc(emp.birthday, "YYYY/MM/DD").toDate(), duration = moment.duration(now.diff(birthDay));
                                        if (!birthDay) {
                                            person.age('');
                                        }
                                        else {
                                            person.age((duration.years() + text('CPS001_66')));
                                        }
                                    }
                                    if (emp.numberOfWork > -1 && emp.numberOfTempHist > -1) {
                                        var days = emp.numberOfWork - emp.numberOfTempHist, duration = moment.duration(days, "days");
                                        employee.entire("".concat(duration.years()).concat(text('CPS001_67')).concat(duration.months()).concat(text('CPS001_88')));
                                    }
                                    else {
                                        employee.entire('');
                                    }
                                    employee.code(emp.employeeCode);
                                    employee.name(emp.employeeName);
                                    employee.hireDate(emp.hireDate);
                                    department.code(emp.departmentCode);
                                    department.name(emp.departmentName);
                                    constract.position(emp.position);
                                    constract.contractType(emp.contractCodeType);
                                }
                                else {
                                    person.id('');
                                    person.age('');
                                    person.gender('');
                                    person.avatar(DEF_AVATAR);
                                    employee.code('');
                                    employee.name('');
                                    employee.entire('');
                                    department.code('');
                                    department.name('');
                                    constract.position('');
                                    constract.contractType('');
                                }
                            });
                        }
                        else {
                            person.id('');
                            person.age('');
                            person.gender('');
                            person.avatar(DEF_AVATAR);
                            employee.code('');
                            employee.name('');
                            employee.entire('');
                            department.code('');
                            department.name('');
                            constract.position('');
                            constract.contractType('');
                            __viewContext.viewModel.unblock();
                        }
                    });
                    params.employeeIds.subscribe(function (ids) {
                        if (!ids || !ids.length) {
                            params.employeeIds([__viewContext.user.employeeId]);
                            return;
                        }
                        fetch.get_list(ids).done(function (datas) {
                            if (!datas.length) {
                                params.employeeIds([__viewContext.user.employeeId]);
                                return;
                            }
                            datas = _(datas).map(function (d) { return ({ i: ids.indexOf(d.employeeId), v: d }); })
                                .orderBy(function (o) { return o.i; })
                                .map(function (m) { return m.v; })
                                .value();
                            params.employees(datas || []);
                            var _ids = _.map(datas, function (m) { return m.employeeId; });
                            if (_ids.length) {
                                if (_ids.indexOf(params.employeeId()) > -1) {
                                    params.employeeId.valueHasMutated();
                                }
                                else {
                                    var oidx = _.indexOf(ids, params.employeeId());
                                    if (oidx > -1) {
                                        if (oidx < ids.length - 1) {
                                            params.employeeId(ids[oidx + 1]);
                                        }
                                        else {
                                            params.employeeId(ids[oidx - 1]);
                                        }
                                    }
                                    else {
                                        params.employeeId(_ids[0]);
                                    }
                                }
                            }
                            else {
                                params.employeeId(undefined);
                            }
                        });
                    });
                    return params;
                }
            });
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
        })(component = custom.component || (custom.component = {}));
    })(custom = nts.custom || (nts.custom = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps-employees-ko-comp.js.map