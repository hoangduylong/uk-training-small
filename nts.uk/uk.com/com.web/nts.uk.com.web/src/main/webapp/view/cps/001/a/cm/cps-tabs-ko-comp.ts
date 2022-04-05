module nts.custom.component {
    import ajax = nts.uk.request.ajax;
    import info = nts.uk.ui.dialog.info;
    import alert = nts.uk.ui.dialog.alert;
    import confirm = nts.uk.ui.dialog.confirm;
    import getShared = nts.uk.ui.windows.getShared;

    let $: any = window['$'],
        _: any = window['_'],
        ko: any = window['ko'],
        moment: any = window['moment'],
        __viewContext: any = window['__viewContext'] || {};

    const fetch = {
        get_layout: (sid) => ajax(`ctx/pereg/person/maintenance/findSimple/${sid}`),
        get_category: (sid) => ajax(`ctx/pereg/employee/category/getall/${sid}`),
        get_hist_data: (params) => ajax(`ctx/pereg/employee/category/getlistinfocategory`, params),
        category: {
            'delete': (query) => ajax('facade/pereg/delete', query),
            perm: (rid, cid) => ajax(`ctx/pereg/roles/auth/category/find/${rid}/${cid}`),
        }
    };

    window["ko"].components.register('layout-tabs', {
        template: `<!-- ko let: {
                        text: nts.uk.resource.getText,
                        TABS: {
                            LAYOUT: 'layout',
                            CATEGORY: 'category'
                        },
                        CAT_TYPE: { 
                            SINGLE : 1,
                            MULTI: 2,
                            CONTI: 3, /* continuos history hasn't end date */
                            NODUP: 4,
                            DUPLI: 5,
                            CONTIWED: 6 /* continuos history has end date */
                        }
                } -->
            <div id="lefttabs" data-bind="ntsTabPanel: {
                    dataSource: [
                        {
                            id: TABS.LAYOUT, 
                            title: text('CPS001_23'), 
                            content: '.layouttab', 
                            enable: ko.observable(true),
                            visible: hasLayout
                        },
                        {
                            id: TABS.CATEGORY, 
                            title: text('CPS001_24'), 
                            content: '.categorytab', 
                            enable: ko.observable(true), 
                            visible: hasLayout
                        }], 
                    active: tab
                    }">
                <div class="layouttab" data-bind="if: ko.toJS(tab) == TABS.LAYOUT">
                    <div data-bind="ntsSearchBox: {
                            targetKey: 'maintenanceLayoutID',
                            comId: 'layout-data',
                            items: gridlist.options,
                            selected: gridlist.value,
                            placeHolder: '名称で検索…',
                            selectedKey: 'maintenanceLayoutID', 
                            fields: ['layoutName'], 
                            mode: 'igGrid'
                        }" tabindex="8"></div>
                    <table data-bind="attr: {
                                id: 'layout-data',
                                NameID: text('CPS001_25')
                            }, 
                            ntsGridList: {
                                rows: gridlist.row,
                                multiple: false,
                                columns: [
                                    { headerText: '', key: 'maintenanceLayoutID', width: 100, hidden: true },
                                    { headerText: text('CPS001_26'), key: 'layoutName', width: 240, hidden: false }
                                ],
                                primaryKey: 'maintenanceLayoutID',
                                value: gridlist.value,
                                dataSource: gridlist.options
                            }"></table>
                    </div>
                <div class="categorytab" data-bind="if: ko.toJS(tab) == TABS.CATEGORY">
                    <div class="form-group search-box">
                        <button type="button" class="hidden" data-bind="
                                text: text('CPS001_27'),
                                click: function() {
                                    combobox.value.valueHasMutated();
                                }" tabindex="8"></button>
                        <div tabindex="9" data-bind="attr: {
                                    id: nts.uk.util.randomId().replace(/-/g, '')
                                }, 
                                ntsComboBox: {
                                    width: '100%',
                                    value: combobox.value,
                                    options: combobox.options,
                                    optionsText: 'categoryName',
                                    optionsValue: 'id',
                                    visibleItemsCount: 10,
                                    dropDownAttachedToBody: true,
                                    columns: [
                                        /*{ prop: 'categoryCode', toggle: 'hidden', length: 20 },*/
                                        { prop: 'categoryName', length: 14}
                                    ]
                                 }"
                            tabindex="9"></div>
                    </div>
                    <!-- ko let: {
                            showHist: [
                                CAT_TYPE.CONTI, 
                                CAT_TYPE.CONTIWED, 
                                CAT_TYPE.DUPLI, 
                                CAT_TYPE.NODUP
                            ].indexOf(combobox.object.categoryType()) > -1 && 
                            ['CS00003', 'CS00070'].indexOf(combobox.object.categoryCode()) == -1,
                            showMult: combobox.object.categoryType() == CAT_TYPE.MULTI
                         } -->
                    <!-- ko if: showHist -->
                    <div class="form-group search-box" data-bind="1 == 1">
                        <button type="button" class="btn-add" data-bind="
                                                                click: event.add, 
                                                                enable: permisions.add(),
                                                                text: text('CPS001_32')" tabindex="10"></button>
                        <button type="button" class="btn-repli" data-bind="click: 
                                                                event.copy, 
                                                                enable: permisions.copy() &amp;&amp; gridlist.value(),
                                                                text: text('CPS001_33')" tabindex="11"></button>
                        <button type="button" class="btn-delete danger" data-bind="
                                                                click: event.delete, 
                                                                enable: permisions.delete() &amp;&amp; gridlist.value(),
                                                                text: text('CPS001_34')" tabindex="12"></button>
                    </div>
                    <!-- /ko -->
                    <!-- ko if: showMult -->
                    <div class="form-group search-box">
                        <button type="button" class="btn-add" data-bind="
                                                                click: event.add, 
                                                                enable: permisions.add(),
                                                                text: text('CPS001_30')" tabindex="10"></button>
                        <button type="button" class="btn-delete danger" data-bind="
                                                                click: event.delete, 
                                                                enable: permisions.delete() &amp;&amp; gridlist.value(),
                                                                text: text('CPS001_31')" tabindex="12"></button>
                    </div>
                    <!-- /ko -->
                    <!-- ko if: gridlist.row() == 8 -->
                    <table data-bind="attr: {
                                id: 'category-data'
                            }, 
                            ntsGridList: {
                                rows: 8,
                                multiple: false,
                                columns: [
                                    { headerText: '', key: 'optionValue', width: 100, hidden: true },
                                    { headerText: '', key: 'optionText', width: 240, hidden: false }
                                ],
                                primaryKey: 'optionValue',
                                value: gridlist.value,
                                dataSource: gridlist.options
                            }"></table>
                    <!-- /ko -->
                    <!-- ko if: gridlist.row() == 10 -->
                    <table data-bind="attr: {
                                id: 'category-data'
                            }, 
                            ntsGridList: {
                                rows: 10,
                                multiple: false,
                                columns: [
                                    { headerText: '', key: 'optionValue', width: 100, hidden: true },
                                    { headerText: '', key: 'optionText', width: 240, hidden: false }
                                ],
                                primaryKey: 'optionValue',
                                value: gridlist.value,
                                dataSource: gridlist.options
                            }"></table>
                    <!-- /ko -->
                    <!-- /ko -->
                </div>
            </div>
        <!-- /ko -->`,
        viewModel: function(params: any) {
            let select: { categoryId: string; } = getShared("CPS001A_PARAMS") || { categoryId: undefined };
            
            // remove shared item from another module after get (sit)
            nts.uk.sessionStorage.removeItem(nts.uk.request.STORAGE_KEY_TRANSFER_DATA);

            ko.utils.extend(params, {
                tab: ko.observable(TABS.LAYOUT),
                hasLayout: ko.observable(false),
                roleId: ko.computed(() => (__viewContext.user.role.personalInfo)),
                loginId: ko.computed(() => (__viewContext.user.employeeId)),
                change: params.change || function(evt: IEventData) {

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
                    'add': () => {
                        let rid = ko.toJS(params.roleId),
                            cid = ko.toJS(params.combobox.value),
                            is_self = params.employeeId() == params.loginId(),
                            categoryType = ko.toJS(params.combobox.object.categoryType);

                        fetch.category.perm(rid, cid).done((perm: ICatAuth) => {
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
                            } else {
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
                    'copy': () => {
                        let rid = ko.toJS(params.roleId),
                            cid = ko.toJS(params.combobox.value),
                            iid = ko.toJS(params.gridlist.value),
                            is_self = params.employeeId() == params.loginId(),
                            categoryType = ko.toJS(params.combobox.object.categoryType);

                        fetch.category.perm(rid, cid).done((perm: ICatAuth) => {
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
                    'delete': () => {
                        let rid = ko.toJS(params.roleId),
                            cid = ko.toJS(params.combobox.value),
                            is_self = params.employeeId() == params.loginId(),
                            got = ko.toJS(params.gridlist.options).map(m => m.optionValue),
                            gov = ko.toJS(params.gridlist.value),
                            gidx = _.indexOf(got, gov),
                            categoryType = ko.toJS(params.combobox.object.categoryType);
                        __viewContext.viewModel.layout.outData.refresh();
                        fetch.category.perm(rid, cid).done((perm: ICatAuth) => {
                            if (categoryType == IT_CAT_TYPE.MULTI) {
                                if (perm && !!(is_self ? perm.selfAllowDelMulti : perm.otherAllowDelMulti)) {
                                    confirm({ messageId: "Msg_18" }).ifYes(() => {

                                        let outData = __viewContext.viewModel.layout.outData(),
                                            query = {
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

                                        fetch.category.delete(query).done(x => {
                                            info({ messageId: "Msg_16" }).then(() => {
                                                if (gov != got[got.length - 1]) {
                                                    params.gridlist.value(got[gidx + 1]);
                                                } else {
                                                    params.gridlist.value(got[gidx - 1]);
                                                }
                                                params.combobox.value.valueHasMutated();
                                            });
                                        }).fail(msg => {
                                            alert(msg);
                                        });
                                    });
                                }
                            } else {
                                if (perm && !!(is_self ? perm.selfAllowDelHis : perm.otherAllowDelHis)) {
                                    confirm({ messageId: "Msg_18" }).ifYes(() => {
                                        let outData = __viewContext.viewModel.layout.outData(),
                                            query = {
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

                                        fetch.category.delete(query).done(x => {
                                            info({ messageId: "Msg_16" }).then(() => {
                                                if (gov != got[got.length - 1]) {
                                                    params.gridlist.value(got[gidx + 1]);
                                                } else {
                                                    params.gridlist.value(got[gidx - 1]);
                                                }
                                                params.combobox.value.valueHasMutated();
                                            });
                                        }).fail(msg => {
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

            params.hasLayout.subscribe(h => {
                if (!h) {
                    params.tab(TABS.CATEGORY);
                }
            });

            params.tab.subscribe(t => {
                let sid = ko.toJS(params.employeeId),
                    otab = params.otab;

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

                    fetch.get_layout(sid).done((data: Array<any>) => {
                        if (ko.toJS(params.tab) == TABS.LAYOUT) {
                            if (data.length) {
                                params.gridlist.options(data);

                                let id = ko.toJS(params.gridlist.value),
                                    ids = _.map(data, d => d.maintenanceLayoutID);

                                if (otab == t) {
                                    if (ids.indexOf(id) == -1) {
                                        params.gridlist.value(ids[0]);
                                    } else {
                                        params.gridlist.value.valueHasMutated();
                                    }
                                } else {
                                    if (ids[0] != id) {
                                        params.gridlist.value(ids[0]);
                                    } else {
                                        params.gridlist.value.valueHasMutated();
                                    }
                                }
                            }
                        }
                    });
                } else {
                    fetch.get_category(sid).done((data: Array<ICategory>) => {
                        if (ko.toJS(params.tab) == TABS.CATEGORY) {
                            if (data.length) {
                                params.combobox.options(data);
                                let id = ko.toJS(params.combobox.value),
                                    ids = _.map(data, d => d.id);

                                if (select.categoryId) {
                                    params.combobox.value(select.categoryId);
                                } else if (otab == t) {
                                    if (ids.indexOf(id) == -1) {
                                        params.combobox.value(ids[0]);
                                    } else {
                                        params.combobox.value.valueHasMutated();
                                    }
                                } else {
                                    if (ids[0] != id) {
                                        params.combobox.value(ids[0]);
                                    } else {
                                        params.combobox.value.valueHasMutated();
                                    }
                                }
                            }
                        }
                    });
                }

                params.otab = t;
            });

            params.combobox.value.subscribe(v => {
                let oval = params.combobox.oval;
                __viewContext.viewModel.block();

                if (v) {
                    let cat: any = _.find(ko.toJS(params.combobox.options), (t: any) => t.id == v);
                    if (cat) {
                        let obj = params.combobox.object;

                        obj.categoryId(cat.id);
                        obj.categoryCode(cat.categoryCode);
                        obj.categoryType(cat.categoryType);
                        obj.categoryName(cat.categoryName);

                        let personId = ko.toJS(params.personId),
                            employeeId = ko.toJS(params.employeeId),
                            query = {
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
                                let options: Array<any> = ko.toJS(params.gridlist.options),
                                    oids = _.map(options, o => o.optionValue);

                                fetch.get_hist_data(query).done((data: Array<any>) => {
                                    if (ko.toJS(params.tab) == TABS.CATEGORY) {
                                        let title: any = _.find(data, x => !x.optionValue),
                                            _data: any = _.filter(data, x => !!x.optionValue),
                                            ids = _.map(_data, m => m.optionValue),
                                            id = ko.toJS(params.gridlist.value);

                                        if (title) {
                                            $('#category-data_optionText').text(title.optionText);
                                        }

                                        params.gridlist.options(_data);
                                        if (_data.length) {
                                            if (id && ids.indexOf(id) == -1 || oval != v) {
                                                if (ids[0] != id) {
                                                    params.gridlist.value(ids[0]);
                                                } else {
                                                    params.gridlist.value.valueHasMutated();
                                                }
                                            } else {
                                                let nid = _.find(ids, _i => oids.indexOf(_i) == -1);

                                                if (nid) {
                                                    params.gridlist.value(nid);
                                                }
                                                else if (id) {
                                                    params.gridlist.value.valueHasMutated();
                                                } else {
                                                    params.gridlist.value(ids[0]);
                                                }
                                            }
                                        } else {
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
                                } else {
                                    params.gridlist.row(10);
                                }

                                fetch.get_hist_data(query).done((data: Array<any>) => {
                                    if (ko.toJS(params.tab) == TABS.CATEGORY) {
                                        let title: any = _.find(data, x => !x.optionValue),
                                            _data: Array<any> = _.filter(data, x => !!x.optionValue),
                                            ids: Array<string> = _.map(_data, m => m.optionValue),
                                            id = ko.toJS(params.gridlist.value);

                                        if (title) {
                                            $('#category-data_optionText').text(title.optionText);
                                        }

                                        params.gridlist.options(_data);
                                        if (_data.length) {
                                            if (ids.indexOf(id) == -1 || oval != v) {
                                                if (ids[0] != id) {
                                                    params.gridlist.value(ids[0]);
                                                } else {
                                                    params.gridlist.value.valueHasMutated();
                                                }
                                            } else {
                                                params.gridlist.value.valueHasMutated();
                                            }
                                        } else {
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
                    } else {
                        params.combobox.value(undefined);
                    }
                }
                params.combobox.oval = v;
            });

            params.gridlist.value.subscribe(v => {
                if (ko.toJS(params.tab) == TABS.CATEGORY) {
                    let rid = ko.toJS(params.roleId),
                        cid = ko.toJS(params.combobox.value),
                        is_self = params.employeeId() == params.loginId(),
                        ids = _.map(ko.toJS(params.gridlist.options), (m: any) => m.optionValue),
                        categoryType = ko.toJS(params.combobox.object.categoryType);

                    fetch.category.perm(rid, cid).done((perm: ICatAuth) => {
                        if (ko.toJS(params.tab) == TABS.CATEGORY) {
                            if (categoryType == IT_CAT_TYPE.MULTI) {
                                if (perm && !!(is_self ? perm.selfAllowAddMulti : perm.otherAllowAddMulti)) {
                                    params.permisions.add(true);
                                } else {
                                    params.permisions.add(false);
                                }

                                if (perm && !!(is_self ? perm.selfAllowDelMulti : perm.otherAllowDelMulti)) {
                                    params.permisions.delete(true);
                                } else {
                                    params.permisions.delete(false);
                                }
                            } else {
                                if (perm && !!(is_self ? perm.selfAllowAddHis : perm.otherAllowAddHis)) {
                                    params.permisions.add(true);
                                    params.permisions.copy(true);
                                } else {
                                    params.permisions.add(false);
                                    params.permisions.copy(false);
                                }

                                if (perm && !!(is_self ? perm.selfAllowDelHis : perm.otherAllowDelHis)) {
                                    if (ids.indexOf(v) > -1) {
                                        if (ids.indexOf(v) == 0) {
                                            params.permisions.delete(true);
                                        } else {
                                            if (categoryType == IT_CAT_TYPE.NODUPLICATE) {
                                                params.permisions.delete(true);
                                            } else {
                                                params.permisions.delete(false);
                                            }
                                        }
                                    } else {
                                        params.permisions.delete(false);
                                    }
                                } else {
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
                } else if (ko.toJS(params.tab) == TABS.CATEGORY) {
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

            params.employeeId.subscribe(id => {
                if (id) {
                    fetch.get_layout(id).done((data: Array<any>) => {
                        params.hasLayout(!!data.length);
                        params.tab.valueHasMutated();
                    });
                } else {
                    __viewContext.viewModel.unblock();
                    params.gridlist.options.removeAll();
                }
            });

            return params;
        }
    });

    enum TABS {
        LAYOUT = <any>"layout",
        CATEGORY = <any>"category"
    }

    interface ICategory {
        id: string;
        categoryCode?: string;
        categoryName?: string;
        categoryType?: IT_CAT_TYPE;
    }

    interface IEventData {
        id: string;
        iid?: string;
        tab: TABS;
        act?: string;
        ctype?: IT_CAT_TYPE;
        ccode?: string;
    }

    interface ICatAuth {
        roleId: string;
        personInfoCategoryAuthId: string;
        allowPersonRef: number;
        allowOtherRef: number;
        allowOtherCompanyRef: number;
        selfPastHisAuth: number;
        selfFutureHisAuth: number;
        selfAllowAddHis: number;
        selfAllowDelHis: number;
        otherPastHisAuth: number;
        otherFutureHisAuth: number;
        otherAllowAddHis: number;
        otherAllowDelHis: number;
        selfAllowAddMulti: number;
        selfAllowDelMulti: number;
        otherAllowAddMulti: number;
        otherAllowDelMulti: number;
    }

    // define ITEM_CATEGORY_TYPE
    enum IT_CAT_TYPE {
        SINGLE = 1, // Single info
        MULTI = 2, // Multi info
        CONTINU = 3, // Continuos history
        NODUPLICATE = 4, //No duplicate history
        DUPLICATE = 5, // Duplicate history,
        CONTINUWED = 6 // Continuos history with end date
    }
}