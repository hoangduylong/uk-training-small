var nts;
(function (nts) {
    var custom;
    (function (custom) {
        var component;
        (function (component) {
            var ajax = nts.uk.request.ajax;
            var info = nts.uk.ui.dialog.info;
            var alert = nts.uk.ui.dialog.alert;
            var confirm = nts.uk.ui.dialog.confirm;
            var getShared = nts.uk.ui.windows.getShared;
            var $ = window['$'], _ = window['_'], ko = window['ko'], moment = window['moment'], __viewContext = window['__viewContext'] || {};
            var fetch = {
                get_layout: function (sid) { return ajax("ctx/pereg/person/maintenance/findSimple/".concat(sid)); },
                get_category: function (sid) { return ajax("ctx/pereg/employee/category/getall/".concat(sid)); },
                get_hist_data: function (params) { return ajax("ctx/pereg/employee/category/getlistinfocategory", params); },
                category: {
                    'delete': function (query) { return ajax('facade/pereg/delete', query); },
                    perm: function (rid, cid) { return ajax("ctx/pereg/roles/auth/category/find/".concat(rid, "/").concat(cid)); },
                }
            };
            window["ko"].components.register('layout-tabs', {
                template: "<!-- ko let: {\n                        text: nts.uk.resource.getText,\n                        TABS: {\n                            LAYOUT: 'layout',\n                            CATEGORY: 'category'\n                        },\n                        CAT_TYPE: { \n                            SINGLE : 1,\n                            MULTI: 2,\n                            CONTI: 3, /* continuos history hasn't end date */\n                            NODUP: 4,\n                            DUPLI: 5,\n                            CONTIWED: 6 /* continuos history has end date */\n                        }\n                } -->\n            <div id=\"lefttabs\" data-bind=\"ntsTabPanel: {\n                    dataSource: [\n                        {\n                            id: TABS.LAYOUT, \n                            title: text('CPS001_23'), \n                            content: '.layouttab', \n                            enable: ko.observable(true),\n                            visible: hasLayout\n                        },\n                        {\n                            id: TABS.CATEGORY, \n                            title: text('CPS001_24'), \n                            content: '.categorytab', \n                            enable: ko.observable(true), \n                            visible: hasLayout\n                        }], \n                    active: tab\n                    }\">\n                <div class=\"layouttab\" data-bind=\"if: ko.toJS(tab) == TABS.LAYOUT\">\n                    <div data-bind=\"ntsSearchBox: {\n                            targetKey: 'maintenanceLayoutID',\n                            comId: 'layout-data',\n                            items: gridlist.options,\n                            selected: gridlist.value,\n                            placeHolder: '\u540D\u79F0\u3067\u691C\u7D22\u2026',\n                            selectedKey: 'maintenanceLayoutID', \n                            fields: ['layoutName'], \n                            mode: 'igGrid'\n                        }\" tabindex=\"8\"></div>\n                    <table data-bind=\"attr: {\n                                id: 'layout-data',\n                                NameID: text('CPS001_25')\n                            }, \n                            ntsGridList: {\n                                rows: gridlist.row,\n                                multiple: false,\n                                columns: [\n                                    { headerText: '', key: 'maintenanceLayoutID', width: 100, hidden: true },\n                                    { headerText: text('CPS001_26'), key: 'layoutName', width: 240, hidden: false }\n                                ],\n                                primaryKey: 'maintenanceLayoutID',\n                                value: gridlist.value,\n                                dataSource: gridlist.options\n                            }\"></table>\n                    </div>\n                <div class=\"categorytab\" data-bind=\"if: ko.toJS(tab) == TABS.CATEGORY\">\n                    <div class=\"form-group search-box\">\n                        <button type=\"button\" class=\"hidden\" data-bind=\"\n                                text: text('CPS001_27'),\n                                click: function() {\n                                    combobox.value.valueHasMutated();\n                                }\" tabindex=\"8\"></button>\n                        <div tabindex=\"9\" data-bind=\"attr: {\n                                    id: nts.uk.util.randomId().replace(/-/g, '')\n                                }, \n                                ntsComboBox: {\n                                    width: '100%',\n                                    value: combobox.value,\n                                    options: combobox.options,\n                                    optionsText: 'categoryName',\n                                    optionsValue: 'id',\n                                    visibleItemsCount: 10,\n                                    dropDownAttachedToBody: true,\n                                    columns: [\n                                        /*{ prop: 'categoryCode', toggle: 'hidden', length: 20 },*/\n                                        { prop: 'categoryName', length: 14}\n                                    ]\n                                 }\"\n                            tabindex=\"9\"></div>\n                    </div>\n                    <!-- ko let: {\n                            showHist: [\n                                CAT_TYPE.CONTI, \n                                CAT_TYPE.CONTIWED, \n                                CAT_TYPE.DUPLI, \n                                CAT_TYPE.NODUP\n                            ].indexOf(combobox.object.categoryType()) > -1 && \n                            ['CS00003', 'CS00070'].indexOf(combobox.object.categoryCode()) == -1,\n                            showMult: combobox.object.categoryType() == CAT_TYPE.MULTI\n                         } -->\n                    <!-- ko if: showHist -->\n                    <div class=\"form-group search-box\" data-bind=\"1 == 1\">\n                        <button type=\"button\" class=\"btn-add\" data-bind=\"\n                                                                click: event.add, \n                                                                enable: permisions.add(),\n                                                                text: text('CPS001_32')\" tabindex=\"10\"></button>\n                        <button type=\"button\" class=\"btn-repli\" data-bind=\"click: \n                                                                event.copy, \n                                                                enable: permisions.copy() &amp;&amp; gridlist.value(),\n                                                                text: text('CPS001_33')\" tabindex=\"11\"></button>\n                        <button type=\"button\" class=\"btn-delete danger\" data-bind=\"\n                                                                click: event.delete, \n                                                                enable: permisions.delete() &amp;&amp; gridlist.value(),\n                                                                text: text('CPS001_34')\" tabindex=\"12\"></button>\n                    </div>\n                    <!-- /ko -->\n                    <!-- ko if: showMult -->\n                    <div class=\"form-group search-box\">\n                        <button type=\"button\" class=\"btn-add\" data-bind=\"\n                                                                click: event.add, \n                                                                enable: permisions.add(),\n                                                                text: text('CPS001_30')\" tabindex=\"10\"></button>\n                        <button type=\"button\" class=\"btn-delete danger\" data-bind=\"\n                                                                click: event.delete, \n                                                                enable: permisions.delete() &amp;&amp; gridlist.value(),\n                                                                text: text('CPS001_31')\" tabindex=\"12\"></button>\n                    </div>\n                    <!-- /ko -->\n                    <!-- ko if: gridlist.row() == 8 -->\n                    <table data-bind=\"attr: {\n                                id: 'category-data'\n                            }, \n                            ntsGridList: {\n                                rows: 8,\n                                multiple: false,\n                                columns: [\n                                    { headerText: '', key: 'optionValue', width: 100, hidden: true },\n                                    { headerText: '', key: 'optionText', width: 240, hidden: false }\n                                ],\n                                primaryKey: 'optionValue',\n                                value: gridlist.value,\n                                dataSource: gridlist.options\n                            }\"></table>\n                    <!-- /ko -->\n                    <!-- ko if: gridlist.row() == 10 -->\n                    <table data-bind=\"attr: {\n                                id: 'category-data'\n                            }, \n                            ntsGridList: {\n                                rows: 10,\n                                multiple: false,\n                                columns: [\n                                    { headerText: '', key: 'optionValue', width: 100, hidden: true },\n                                    { headerText: '', key: 'optionText', width: 240, hidden: false }\n                                ],\n                                primaryKey: 'optionValue',\n                                value: gridlist.value,\n                                dataSource: gridlist.options\n                            }\"></table>\n                    <!-- /ko -->\n                    <!-- /ko -->\n                </div>\n            </div>\n        <!-- /ko -->",
                viewModel: function (params) {
                    var select = getShared("CPS001A_PARAMS") || { categoryId: undefined };
                    // remove shared item from another module after get (sit)
                    nts.uk.sessionStorage.removeItem(nts.uk.request.STORAGE_KEY_TRANSFER_DATA);
                    ko.utils.extend(params, {
                        tab: ko.observable(TABS.LAYOUT),
                        hasLayout: ko.observable(false),
                        roleId: ko.computed(function () { return (__viewContext.user.role.personalInfo); }),
                        loginId: ko.computed(function () { return (__viewContext.user.employeeId); }),
                        change: params.change || function (evt) {
                        },
                        combobox: {
                            oval: undefined,
                            value: ko.observable(''),
                            options: ko.observableArray([]),
                            object: {
                                'categoryId': ko.observable(''),
                                'categoryCode': ko.observable(''),
                                'categoryType': ko.observable(undefined),
                                'categoryName': ko.observable(undefined)
                            }
                        },
                        gridlist: {
                            oval: undefined,
                            row: ko.observable(8),
                            value: ko.observable(''),
                            options: ko.observableArray([])
                        },
                        otab: undefined,
                        event: {
                            'add': function () {
                                var rid = ko.toJS(params.roleId), cid = ko.toJS(params.combobox.value), is_self = params.employeeId() == params.loginId(), categoryType = ko.toJS(params.combobox.object.categoryType);
                                fetch.category.perm(rid, cid).done(function (perm) {
                                    if (categoryType == IT_CAT_TYPE.MULTI) {
                                        if (perm && !!(is_self ? perm.selfAllowAddMulti : perm.otherAllowAddMulti)) {
                                            params.gridlist.value(undefined);
                                            __viewContext.viewModel.block();
                                            params.change.call(null, {
                                                id: cid,
                                                iid: undefined,
                                                tab: TABS.CATEGORY,
                                                act: 'add',
                                                ccode: ko.toJS(params.combobox.object.categoryCode),
                                                ctype: ko.toJS(params.combobox.object.categoryType)
                                            });
                                        }
                                    }
                                    else {
                                        if (perm && !!(is_self ? perm.selfAllowAddHis : perm.otherAllowAddHis)) {
                                            if (perm && !!(is_self ? perm.selfAllowAddHis : perm.otherAllowAddHis)) {
                                                params.gridlist.value(undefined);
                                                __viewContext.viewModel.block();
                                                params.change.call(null, {
                                                    id: cid,
                                                    iid: undefined,
                                                    tab: TABS.CATEGORY,
                                                    act: 'add',
                                                    ccode: ko.toJS(params.combobox.object.categoryCode),
                                                    ctype: ko.toJS(params.combobox.object.categoryType)
                                                });
                                            }
                                        }
                                    }
                                });
                            },
                            'copy': function () {
                                var rid = ko.toJS(params.roleId), cid = ko.toJS(params.combobox.value), iid = ko.toJS(params.gridlist.value), is_self = params.employeeId() == params.loginId(), categoryType = ko.toJS(params.combobox.object.categoryType);
                                fetch.category.perm(rid, cid).done(function (perm) {
                                    if (perm && !!(is_self ? perm.selfAllowAddHis : perm.otherAllowAddHis)) {
                                        params.gridlist.value(undefined);
                                        __viewContext.viewModel.block();
                                        params.change.call(null, {
                                            id: cid,
                                            iid: iid,
                                            tab: TABS.CATEGORY,
                                            act: 'copy',
                                            ccode: ko.toJS(params.combobox.object.categoryCode),
                                            ctype: ko.toJS(params.combobox.object.categoryType)
                                        });
                                    }
                                });
                            },
                            'delete': function () {
                                var rid = ko.toJS(params.roleId), cid = ko.toJS(params.combobox.value), is_self = params.employeeId() == params.loginId(), got = ko.toJS(params.gridlist.options).map(function (m) { return m.optionValue; }), gov = ko.toJS(params.gridlist.value), gidx = _.indexOf(got, gov), categoryType = ko.toJS(params.combobox.object.categoryType);
                                __viewContext.viewModel.layout.outData.refresh();
                                fetch.category.perm(rid, cid).done(function (perm) {
                                    if (categoryType == IT_CAT_TYPE.MULTI) {
                                        if (perm && !!(is_self ? perm.selfAllowDelMulti : perm.otherAllowDelMulti)) {
                                            confirm({ messageId: "Msg_18" }).ifYes(function () {
                                                var outData = __viewContext.viewModel.layout.outData(), query = {
                                                    recordId: ko.toJS(params.gridlist.value),
                                                    personId: ko.toJS(params.personId),
                                                    employeeId: ko.toJS(params.employeeId),
                                                    categoryId: ko.toJS(params.combobox.object.categoryId),
                                                    categoryType: ko.toJS(params.combobox.object.categoryType),
                                                    categoryName: ko.toJS(params.combobox.object.categoryName),
                                                    categoryCode: ko.toJS(params.combobox.object.categoryCode),
                                                    inputs: !!_.size(outData) ? outData[0].items : []
                                                };
                                                __viewContext.viewModel.block();
                                                fetch.category.delete(query).done(function (x) {
                                                    info({ messageId: "Msg_16" }).then(function () {
                                                        if (gov != got[got.length - 1]) {
                                                            params.gridlist.value(got[gidx + 1]);
                                                        }
                                                        else {
                                                            params.gridlist.value(got[gidx - 1]);
                                                        }
                                                        params.combobox.value.valueHasMutated();
                                                    });
                                                }).fail(function (msg) {
                                                    alert(msg);
                                                });
                                            });
                                        }
                                    }
                                    else {
                                        if (perm && !!(is_self ? perm.selfAllowDelHis : perm.otherAllowDelHis)) {
                                            confirm({ messageId: "Msg_18" }).ifYes(function () {
                                                var outData = __viewContext.viewModel.layout.outData(), query = {
                                                    recordId: ko.toJS(params.gridlist.value),
                                                    personId: ko.toJS(params.personId),
                                                    employeeId: ko.toJS(params.employeeId),
                                                    categoryId: ko.toJS(params.combobox.object.categoryId),
                                                    categoryType: ko.toJS(params.combobox.object.categoryType),
                                                    categoryName: ko.toJS(params.combobox.object.categoryName),
                                                    categoryCode: ko.toJS(params.combobox.object.categoryCode),
                                                    inputs: !!_.size(outData) ? outData[0].items : []
                                                };
                                                __viewContext.viewModel.block();
                                                fetch.category.delete(query).done(function (x) {
                                                    info({ messageId: "Msg_16" }).then(function () {
                                                        if (gov != got[got.length - 1]) {
                                                            params.gridlist.value(got[gidx + 1]);
                                                        }
                                                        else {
                                                            params.gridlist.value(got[gidx - 1]);
                                                        }
                                                        params.combobox.value.valueHasMutated();
                                                    });
                                                }).fail(function (msg) {
                                                    alert(msg);
                                                });
                                            });
                                        }
                                    }
                                });
                            }
                        },
                        permisions: {
                            'add': ko.observable(true),
                            'copy': ko.observable(true),
                            'delete': ko.observable(true)
                        }
                    });
                    if (!!select.categoryId) {
                        params.tab(TABS.CATEGORY);
                    }
                    params.hasLayout.subscribe(function (h) {
                        if (!h) {
                            params.tab(TABS.CATEGORY);
                        }
                    });
                    params.tab.subscribe(function (t) {
                        var sid = ko.toJS(params.employeeId), otab = params.otab;
                        if (!sid) {
                            __viewContext.viewModel.unblock();
                            params.gridlist.options.removeAll();
                            return;
                        }
                        __viewContext.viewModel.block();
                        if (t == TABS.LAYOUT) {
                            if (!params.hasLayout()) {
                                params.tab(TABS.CATEGORY);
                                return;
                            }
                            params.gridlist.row(10);
                            params.combobox.value(undefined);
                            fetch.get_layout(sid).done(function (data) {
                                if (ko.toJS(params.tab) == TABS.LAYOUT) {
                                    if (data.length) {
                                        params.gridlist.options(data);
                                        var id = ko.toJS(params.gridlist.value), ids = _.map(data, function (d) { return d.maintenanceLayoutID; });
                                        if (otab == t) {
                                            if (ids.indexOf(id) == -1) {
                                                params.gridlist.value(ids[0]);
                                            }
                                            else {
                                                params.gridlist.value.valueHasMutated();
                                            }
                                        }
                                        else {
                                            if (ids[0] != id) {
                                                params.gridlist.value(ids[0]);
                                            }
                                            else {
                                                params.gridlist.value.valueHasMutated();
                                            }
                                        }
                                    }
                                }
                            });
                        }
                        else {
                            fetch.get_category(sid).done(function (data) {
                                if (ko.toJS(params.tab) == TABS.CATEGORY) {
                                    if (data.length) {
                                        params.combobox.options(data);
                                        var id = ko.toJS(params.combobox.value), ids = _.map(data, function (d) { return d.id; });
                                        if (select.categoryId) {
                                            params.combobox.value(select.categoryId);
                                        }
                                        else if (otab == t) {
                                            if (ids.indexOf(id) == -1) {
                                                params.combobox.value(ids[0]);
                                            }
                                            else {
                                                params.combobox.value.valueHasMutated();
                                            }
                                        }
                                        else {
                                            if (ids[0] != id) {
                                                params.combobox.value(ids[0]);
                                            }
                                            else {
                                                params.combobox.value.valueHasMutated();
                                            }
                                        }
                                    }
                                }
                            });
                        }
                        params.otab = t;
                    });
                    params.combobox.value.subscribe(function (v) {
                        var oval = params.combobox.oval;
                        __viewContext.viewModel.block();
                        if (v) {
                            var cat = _.find(ko.toJS(params.combobox.options), function (t) { return t.id == v; });
                            if (cat) {
                                var obj = params.combobox.object;
                                obj.categoryId(cat.id);
                                obj.categoryCode(cat.categoryCode);
                                obj.categoryType(cat.categoryType);
                                obj.categoryName(cat.categoryName);
                                var personId = ko.toJS(params.personId), employeeId = ko.toJS(params.employeeId), query = {
                                    infoId: undefined,
                                    categoryId: v,
                                    personId: personId,
                                    employeeId: employeeId,
                                    standardDate: undefined,
                                    categoryCode: cat.categoryCode
                                };
                                switch (cat.categoryType) {
                                    case IT_CAT_TYPE.SINGLE:
                                        params.gridlist.row(10);
                                        params.gridlist.options([]);
                                        params.gridlist.value(undefined);
                                        $('#category-data_optionText').text('');
                                        params.change.call(null, {
                                            id: v,
                                            iid: undefined,
                                            tab: TABS.CATEGORY,
                                            atc: undefined,
                                            ccode: cat.categoryCode,
                                            ctype: cat.categoryType
                                        });
                                        break;
                                    case IT_CAT_TYPE.MULTI:
                                        params.gridlist.row(10);
                                        var options = ko.toJS(params.gridlist.options), oids_1 = _.map(options, function (o) { return o.optionValue; });
                                        fetch.get_hist_data(query).done(function (data) {
                                            if (ko.toJS(params.tab) == TABS.CATEGORY) {
                                                var title = _.find(data, function (x) { return !x.optionValue; }), _data = _.filter(data, function (x) { return !!x.optionValue; }), ids = _.map(_data, function (m) { return m.optionValue; }), id = ko.toJS(params.gridlist.value);
                                                if (title) {
                                                    $('#category-data_optionText').text(title.optionText);
                                                }
                                                params.gridlist.options(_data);
                                                if (_data.length) {
                                                    if (id && ids.indexOf(id) == -1 || oval != v) {
                                                        if (ids[0] != id) {
                                                            params.gridlist.value(ids[0]);
                                                        }
                                                        else {
                                                            params.gridlist.value.valueHasMutated();
                                                        }
                                                    }
                                                    else {
                                                        var nid = _.find(ids, function (_i) { return oids_1.indexOf(_i) == -1; });
                                                        if (nid) {
                                                            params.gridlist.value(nid);
                                                        }
                                                        else if (id) {
                                                            params.gridlist.value.valueHasMutated();
                                                        }
                                                        else {
                                                            params.gridlist.value(ids[0]);
                                                        }
                                                    }
                                                }
                                                else {
                                                    params.change.call(null, {
                                                        id: v,
                                                        iid: undefined,
                                                        tab: TABS.CATEGORY,
                                                        act: 'add',
                                                        ccode: ko.toJS(params.combobox.object.categoryCode),
                                                        ctype: ko.toJS(params.combobox.object.categoryType)
                                                    });
                                                    params.gridlist.value(undefined);
                                                }
                                            }
                                        });
                                        break;
                                    case IT_CAT_TYPE.CONTINU:
                                    case IT_CAT_TYPE.NODUPLICATE:
                                    case IT_CAT_TYPE.DUPLICATE:
                                    case IT_CAT_TYPE.CONTINUWED:
                                        if (['CS00003', 'CS00070'].indexOf(cat.categoryCode) == -1) {
                                            params.gridlist.row(8);
                                        }
                                        else {
                                            params.gridlist.row(10);
                                        }
                                        fetch.get_hist_data(query).done(function (data) {
                                            if (ko.toJS(params.tab) == TABS.CATEGORY) {
                                                var title = _.find(data, function (x) { return !x.optionValue; }), _data = _.filter(data, function (x) { return !!x.optionValue; }), ids = _.map(_data, function (m) { return m.optionValue; }), id = ko.toJS(params.gridlist.value);
                                                if (title) {
                                                    $('#category-data_optionText').text(title.optionText);
                                                }
                                                params.gridlist.options(_data);
                                                if (_data.length) {
                                                    if (ids.indexOf(id) == -1 || oval != v) {
                                                        if (ids[0] != id) {
                                                            params.gridlist.value(ids[0]);
                                                        }
                                                        else {
                                                            params.gridlist.value.valueHasMutated();
                                                        }
                                                    }
                                                    else {
                                                        params.gridlist.value.valueHasMutated();
                                                    }
                                                }
                                                else {
                                                    params.change.call(null, {
                                                        id: v,
                                                        iid: undefined,
                                                        tab: TABS.CATEGORY,
                                                        act: 'add',
                                                        ccode: ko.toJS(params.combobox.object.categoryCode),
                                                        ctype: ko.toJS(params.combobox.object.categoryType)
                                                    });
                                                    params.gridlist.value(undefined);
                                                    params.gridlist.value.valueHasMutated();
                                                }
                                            }
                                        });
                                        break;
                                }
                            }
                            else {
                                params.combobox.value(undefined);
                            }
                        }
                        params.combobox.oval = v;
                    });
                    params.gridlist.value.subscribe(function (v) {
                        if (ko.toJS(params.tab) == TABS.CATEGORY) {
                            var rid = ko.toJS(params.roleId), cid = ko.toJS(params.combobox.value), is_self_1 = params.employeeId() == params.loginId(), ids_1 = _.map(ko.toJS(params.gridlist.options), function (m) { return m.optionValue; }), categoryType_1 = ko.toJS(params.combobox.object.categoryType);
                            fetch.category.perm(rid, cid).done(function (perm) {
                                if (ko.toJS(params.tab) == TABS.CATEGORY) {
                                    if (categoryType_1 == IT_CAT_TYPE.MULTI) {
                                        if (perm && !!(is_self_1 ? perm.selfAllowAddMulti : perm.otherAllowAddMulti)) {
                                            params.permisions.add(true);
                                        }
                                        else {
                                            params.permisions.add(false);
                                        }
                                        if (perm && !!(is_self_1 ? perm.selfAllowDelMulti : perm.otherAllowDelMulti)) {
                                            params.permisions.delete(true);
                                        }
                                        else {
                                            params.permisions.delete(false);
                                        }
                                    }
                                    else {
                                        if (perm && !!(is_self_1 ? perm.selfAllowAddHis : perm.otherAllowAddHis)) {
                                            params.permisions.add(true);
                                            params.permisions.copy(true);
                                        }
                                        else {
                                            params.permisions.add(false);
                                            params.permisions.copy(false);
                                        }
                                        if (perm && !!(is_self_1 ? perm.selfAllowDelHis : perm.otherAllowDelHis)) {
                                            if (ids_1.indexOf(v) > -1) {
                                                if (ids_1.indexOf(v) == 0) {
                                                    params.permisions.delete(true);
                                                }
                                                else {
                                                    if (categoryType_1 == IT_CAT_TYPE.NODUPLICATE) {
                                                        params.permisions.delete(true);
                                                    }
                                                    else {
                                                        params.permisions.delete(false);
                                                    }
                                                }
                                            }
                                            else {
                                                params.permisions.delete(false);
                                            }
                                        }
                                        else {
                                            params.permisions.delete(false);
                                        }
                                    }
                                }
                            });
                        }
                        if (!v) {
                            return;
                        }
                        __viewContext.viewModel.block();
                        if (ko.toJS(params.tab) == TABS.LAYOUT) {
                            params.change.call(null, {
                                id: v,
                                iid: undefined,
                                tab: TABS.LAYOUT,
                                act: undefined,
                                ccode: undefined,
                                ctype: undefined
                            });
                        }
                        else if (ko.toJS(params.tab) == TABS.CATEGORY) {
                            params.change.call(null, {
                                id: ko.toJS(params.combobox.value),
                                iid: v,
                                tab: TABS.CATEGORY,
                                act: undefined,
                                ctype: ko.toJS(params.combobox.object.categoryType),
                                ccode: ko.toJS(params.combobox.object.categoryCode)
                            });
                        }
                    });
                    params.employeeId.subscribe(function (id) {
                        if (id) {
                            fetch.get_layout(id).done(function (data) {
                                params.hasLayout(!!data.length);
                                params.tab.valueHasMutated();
                            });
                        }
                        else {
                            __viewContext.viewModel.unblock();
                            params.gridlist.options.removeAll();
                        }
                    });
                    return params;
                }
            });
            var TABS;
            (function (TABS) {
                TABS[TABS["LAYOUT"] = "layout"] = "LAYOUT";
                TABS[TABS["CATEGORY"] = "category"] = "CATEGORY";
            })(TABS || (TABS = {}));
            // define ITEM_CATEGORY_TYPE
            var IT_CAT_TYPE;
            (function (IT_CAT_TYPE) {
                IT_CAT_TYPE[IT_CAT_TYPE["SINGLE"] = 1] = "SINGLE";
                IT_CAT_TYPE[IT_CAT_TYPE["MULTI"] = 2] = "MULTI";
                IT_CAT_TYPE[IT_CAT_TYPE["CONTINU"] = 3] = "CONTINU";
                IT_CAT_TYPE[IT_CAT_TYPE["NODUPLICATE"] = 4] = "NODUPLICATE";
                IT_CAT_TYPE[IT_CAT_TYPE["DUPLICATE"] = 5] = "DUPLICATE";
                IT_CAT_TYPE[IT_CAT_TYPE["CONTINUWED"] = 6] = "CONTINUWED"; // Continuos history with end date
            })(IT_CAT_TYPE || (IT_CAT_TYPE = {}));
        })(component = custom.component || (custom.component = {}));
    })(custom = nts.custom || (nts.custom = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps-tabs-ko-comp.js.map