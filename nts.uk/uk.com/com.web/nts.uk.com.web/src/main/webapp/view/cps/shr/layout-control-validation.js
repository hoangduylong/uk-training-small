var nts;
(function (nts) {
    var layout;
    (function (layout) {
        var $ = window['$'], _ = window['_'], ko = window['ko'], moment = window['moment'];
        var ajax = nts.uk.request.ajax;
        var modal = nts.uk.ui.windows.sub.modal;
        var nou = nts.uk.util.isNullOrUndefined;
        var setShared = nts.uk.ui.windows.setShared;
        var getShared = nts.uk.ui.windows.getShared;
        var parseTime = nts.uk.time.parseTime;
        var __viewContext = window['__viewContext'] || {}, rmError = nts.uk.ui.errors["removeByCode"], getError = nts.uk.ui.errors["getErrorByElement"], getErrorList = nts.uk.ui.errors["getErrorList"], removeErrorByElement = window['nts']['uk']['ui']['errors']["removeByElement"], clearError = window['nts']['uk']['ui']['errors']['clearAll'], parseTimeWidthDay = window['nts']['uk']['time']['minutesBased']['clock']['dayattr']['create'];
        layout.validate = {
            removeDoubleLine: function (items) {
                var maps = _(items)
                    .map(function (x, i) { return (x.layoutItemType == IT_CLA_TYPE.SPER) ? i : -1; })
                    .filter(function (x) { return x != -1; })
                    .value(), dupl = _(maps)
                    .filter(function (x, i) { return maps[i + 1] == x + 1; })
                    .value();
                _.remove(items, function (m, k) { return dupl.indexOf(k) > -1; });
            },
            initCheckError: function (items) {
                // validate button, radio button
                _(items)
                    .filter(function (x) { return _.has(x, "items") && !!x.items; })
                    .map(function (x) { return x.items; })
                    .flatten()
                    .flatten()
                    .filter(function (x) { return x.type != ITEM_TYPE.SET; })
                    .each(function (x) {
                    var v = ko.toJS(x), id = v.itemDefId.replace(/[-_]/g, ''), element = document.getElementById(id), $element = $(element);
                    if (element && (element.tagName.toUpperCase() == "BUTTON" || $element.hasClass('radio-wrapper'))) {
                        x.value.subscribe(function (d) {
                            !nou(d) && rmError($element, "MsgB_2");
                        });
                    }
                });
                var tout = setTimeout(function () {
                    var _item = _(items)
                        .filter(function (x) { return _.has(x, "items") && !!x.items; })
                        .map(function (x) { return x.items; })
                        .flatten()
                        .flatten()
                        .filter(function (x) { return x.type != ITEM_TYPE.SET; })
                        //.orderBy((x: any) => x.dispOrder)
                        .find(function (x) { return !!ko.toJS(x.editable); });
                    if ($('input[tabindex="17"].ntsDatepicker').length) {
                        $('input[tabindex="17"].ntsDatepicker').focus();
                    }
                    else {
                        if (_item) {
                            if ((_item.item || {}).dataTypeValue != ITEM_SINGLE_TYPE.DATE) {
                                _item.hasFocus(true);
                            }
                            else {
                                $('#COM1000000000000000CS00001IS00001').find('input').focus();
                            }
                        }
                    }
                    clearTimeout(tout);
                }, 50);
            },
            checkError: function (items) {
                _(items)
                    .filter(function (x) { return _.has(x, "items") && !!x.items; })
                    .map(function (x) { return x.items; })
                    .flatten()
                    .flatten()
                    .filter(function (x) { return x.type != ITEM_TYPE.SET; })
                    .map(function (x) { return ko.toJS(x); })
                    .each(function (x) {
                    var id = x.itemDefId.replace(/[-_]/g, ''), element = document.getElementById(id), $element = $(element);
                    if (_.has(x, "recordId") && !x.value && !!$element.parents('.table-scroll').length) {
                        return;
                    }
                    if (element && !!x.editable) {
                        if ((x.itemCode == 'IS00379' || x.itemCode == 'IS01101' || x.itemCode == 'IS00384' || x.itemCode == 'IS01102') && !!x.readonly) {
                            return;
                        }
                        if (element.tagName.toUpperCase() == "INPUT") {
                            $element
                                .trigger('blur')
                                .trigger('change');
                        }
                        else if ((element.tagName.toUpperCase() == "BUTTON" || $element.hasClass('radio-wrapper'))) {
                            if (_.isNil(x.value) && (x.required || !_.isEmpty(x.textValue))) {
                                if (!getError($element).length) {
                                    $element.ntsError('set', {
                                        messageId: "MsgB_2",
                                        messageParams: [x.itemName]
                                    });
                                }
                            }
                        }
                        else {
                            $element
                                .trigger('validate')
                                .find('.nts-input')
                                .trigger('blur')
                                .trigger('change');
                        }
                    }
                });
            }
        };
        var constraint = /** @class */ (function () {
            function constraint(lstCls) {
                var _this = this;
                this.lstCls = [];
                this.find = function (categoryCode, subscribeCode) {
                    var self = _this, controls = _(self.lstCls).filter(function (x) { return _.has(x, "items") && !!x.items; }).map(function (x) { return x.items; }).flatten().flatten().value(), subscribe = _.find(controls, function (x) { return x.categoryCode.indexOf(categoryCode) > -1 && x.itemCode == subscribeCode; });
                    if (subscribe) {
                        return {
                            id: "#".concat(subscribe.itemDefId.replace(/[-_]/g, '')),
                            data: subscribe,
                            ctrl: $('#' + subscribe.itemDefId.replace(/[-_]/g, ''))
                        };
                    }
                    return null;
                };
                this.finds = function (categoryCode, subscribesCode) {
                    if (subscribesCode === void 0) { subscribesCode = undefined; }
                    var self = _this, controls = _(self.lstCls).filter(function (x) { return _.has(x, "items") && !!x.items; }).map(function (x) { return x.items; }).flatten().flatten().value(), subscribes = _.filter(controls, function (x) { return x.categoryCode.indexOf(categoryCode) > -1 && (!!subscribesCode ? subscribesCode.indexOf(x.itemCode) > -1 : true); });
                    return subscribes.map(function (x) {
                        return {
                            id: "#".concat(x.itemDefId.replace(/[-_]/g, '')),
                            data: x,
                            ctrl: $('#' + x.itemDefId.replace(/[-_]/g, ''))
                        };
                    });
                };
                this.findChilds = function (categoryCode, parentCode) {
                    var self = _this, controls = _(self.lstCls).filter(function (x) { return _.has(x, "items") && !!x.items; }).map(function (x) { return x.items; }).flatten().flatten().value(), subscribes = _.filter(controls, function (x) { return x.categoryCode.indexOf(categoryCode) > -1 && x.itemParentCode == parentCode; }), childset = _(subscribes).filter(function (x) { return [ITEM_TYPE.SET, ITEM_TYPE.SET_TABLE].indexOf(x.type) > -1; }).map(function (x) { return x.itemCode; }).value();
                    _.each(childset, function (code) {
                        var child = _.filter(controls, function (x) { return x.categoryCode.indexOf(categoryCode) > -1 && x.itemParentCode == code; });
                        subscribes = _.concat(subscribes, child);
                    });
                    return subscribes.map(function (x) {
                        return {
                            id: "#".concat(x.itemDefId.replace(/[-_]/g, '')),
                            data: x,
                            ctrl: $('#' + x.itemDefId.replace(/[-_]/g, ''))
                        };
                    });
                };
                this.remove = function (item) {
                    var self = _this;
                    _.each(self.lstCls, function (cls) {
                        if (_.has(cls, "items") && cls.items.indexOf(item) > -1) {
                            _.remove(cls.items, item);
                            if (_.has(_.first(cls.renders()), "items")) {
                                cls.renders.remove(function (m) { return m.items.indexOf(item) > -1; });
                            }
                            else {
                                cls.renders.remove(function (m) { return m == item; });
                            }
                        }
                    });
                };
                var self = this;
                self.lstCls = lstCls;
            }
            return constraint;
        }());
        var fetch = {
            get_cats: function (isCps007) { return ajax("ctx/pereg/person/info/category/findby/companyv2/".concat(isCps007)); },
            get_stc_setting: function () { return ajax('at', "record/stamp/stampcardedit/find"); },
            get_cb_data: function (param) { return ajax("ctx/pereg/person/common/getFlexComboBox", param); },
            check_start_end: function (param) { return ajax("ctx/pereg/person/common/checkStartEnd", param); },
            check_multi_time: function (param) { return ajax("ctx/pereg/person/common/checkMultiTime", param); },
            check_mt_se: function (param) { return ajax("ctx/pereg/person/common/checkStartEndMultiTime", param); },
            get_ro_data: function (param) { return ajax('com', "at/record/remainnumber/annlea/event/nextTime", param); },
            get_annLeaNumber: function (sid) { return ajax('at', "at/record/remainnumber/annlea/getAnnLeaNumber/".concat(sid)); },
            get_resvLeaNumber: function (sid) { return ajax('com', "ctx/pereg/layout/getResvLeaNumber/".concat(sid)); },
            get_calDayTime: function (sid, specialCd) { return ajax('com', "ctx/pereg/layout/calDayTime/".concat(sid, "/").concat(specialCd)); },
            check_remain_days: function (sid) { return ajax('com', "ctx/pereg/person/common/checkEnableRemainDays/".concat(sid)); },
            check_remain_left: function (sid) { return ajax('com', "ctx/pereg/person/common/checkEnableRemainLeft/".concat(sid)); },
            get_remain_days: function (sid) { return ajax('at', "at/record/remainnumber/getRemainDays/".concat(sid)); },
            get_remain_left: function (sid) { return ajax('at', "at/record/remainnumber/getRemainLeft/".concat(sid)); },
            perm: function (rid, cid) { return ajax("ctx/pereg/roles/auth/category/find/".concat(rid, "/").concat(cid)); },
            get_sphd_nextGrantDate: function (param) { return ajax('com', "ctx/pereg/layout/getSPHolidayGrantDate", param); },
            checkFunctionNo: function () { return ajax("ctx/pereg/functions/auth/find-with-role-person-info"); },
            // getHealInsStandCompMonth
            getHealInsStandCompMonth: function (param) { return ajax('pr', "ctx/core/socialinsurance/healthinsurance/getHealInsStandCompMonth", param); },
            // getHealthInsuranceStandardGradePerMonth
            getHealthInsuranceStandardGradePerMonth: function (param) { return ajax('pr', "ctx/core/socialinsurance/healthinsurance/getHealthInsuranceStandardGradePerMonth", param); },
            // getMonthlyPensionInsStandardRemuneration
            getMonthlyPensionInsStandardRemuneration: function (param) { return ajax('pr', "ctx/core/socialinsurance/healthinsurance/getMonthlyPensionInsStandardRemuneration", param); },
            // getWelfarePensionStandardGradePerMonth
            getWelfarePensionStandardGradePerMonth: function (param) { return ajax('pr', "ctx/core/socialinsurance/healthinsurance/getWelfarePensionStandardGradePerMonth", param); },
        };
        var validation = /** @class */ (function () {
            function validation(lstCls) {
                var _this = this;
                this.lstCls = lstCls;
                this.finder = undefined;
                this.textBox = function () {
                    var self = _this, finder = self.finder, CS00002_IS00003 = finder.find('CS00002', 'IS00003'), CS00002_IS00004 = finder.find('CS00002', 'IS00004'), CS00002_IS00015 = finder.find('CS00002', 'IS00015'), CS00002_IS00016 = finder.find('CS00002', 'IS00016'), validateName = function (item) {
                        $(item.id).on('blur', function () {
                            var value = ko.toJS(item.data.value), index = value.indexOf('　'), lindex = value.lastIndexOf('　'), dom = $(item.id);
                            if (!value || (index > 0 && lindex < value.length - 1)) {
                                rmError(dom, "Msg_924");
                            }
                            else if (!dom.is(':disabled') && !dom.ntsError('hasError')) {
                                dom.ntsError('set', {
                                    messageId: "Msg_924",
                                    messageParams: [item.data.itemName]
                                });
                            }
                        });
                    };
                    CS00002_IS00003 && validateName(CS00002_IS00003);
                    CS00002_IS00004 && validateName(CS00002_IS00004);
                    CS00002_IS00015 && validateName(CS00002_IS00015);
                    CS00002_IS00016 && validateName(CS00002_IS00016);
                };
                this.radio = function () {
                    var self = _this, finder = self.finder, CS00020_IS00248 = finder.find('CS00020', 'IS00248'), CS00020_IS00121 = finder.find('CS00020', 'IS00121'), CS00020_IS00123 = finder.find("CS00020", "IS00123");
                    if (CS00020_IS00248) {
                        CS00020_IS00248.data.value.subscribe(function (x) {
                            var ctrls = finder.findChilds(CS00020_IS00248.data.categoryCode, CS00020_IS00248.data.itemParentCode);
                            _.each(ctrls, function (c) {
                                if (c.data.itemCode != CS00020_IS00248.data.itemCode) {
                                    c.data.editable(x == 1);
                                }
                            });
                        });
                        var tout_1 = setTimeout(function () {
                            CS00020_IS00248.data.value.valueHasMutated();
                            clearTimeout(tout_1);
                        }, 0);
                    }
                    if (CS00020_IS00121) {
                        CS00020_IS00121.data.value.subscribe(function (x) {
                            var ctrls = finder.findChilds(CS00020_IS00121.data.categoryCode, CS00020_IS00121.data.itemParentCode);
                            _.each(ctrls, function (c) {
                                if (c.data.itemCode != CS00020_IS00121.data.itemCode) {
                                    c.data.editable(x == 1);
                                    if (x == 1 && CS00020_IS00123) {
                                        CS00020_IS00123.data.value.valueHasMutated();
                                    }
                                }
                            });
                        });
                        var tout_2 = setTimeout(function () {
                            CS00020_IS00121.data.value.valueHasMutated();
                            clearTimeout(tout_2);
                        }, 0);
                    }
                };
                this.remain_day = function () {
                    var self = _this, finder = self.finder, empId = ko.toJS((((__viewContext || {}).viewModel || {}).employee || {}).employeeId), CS00035_IS00366 = finder.find('CS00035', 'IS00366'), CS00035_IS00368 = finder.find('CS00035', 'IS00368');
                    if (!empId) {
                        return;
                    }
                    if (CS00035_IS00366) {
                        fetch.check_remain_days(empId).done(function (x) {
                            CS00035_IS00366.data.numberedit(x);
                            if (!x) {
                                fetch.get_remain_days(empId).done(function (value) {
                                    CS00035_IS00366.data.value(value);
                                });
                            }
                        });
                    }
                    if (CS00035_IS00368) {
                        fetch.check_remain_left(empId).done(function (x) {
                            CS00035_IS00368.data.numberedit(x);
                            if (!x) {
                                fetch.get_remain_left(empId).done(function (value) {
                                    CS00035_IS00368.data.value(value);
                                });
                            }
                        });
                    }
                };
                this.grand_radio = function () {
                    var self = _this, finder = self.finder, radios = [{
                            ctgCode: 'CS00025',
                            radioCode: 'IS00296',
                            relateCode: ['IS00297', 'IS00298', 'IS00299', 'IS00300', 'IS00301']
                        }, {
                            ctgCode: 'CS00026',
                            radioCode: 'IS00303',
                            relateCode: ['IS00304', 'IS00305', 'IS00306', 'IS00307', 'IS00308']
                        }, {
                            ctgCode: 'CS00027',
                            radioCode: 'IS00310',
                            relateCode: ['IS00311', 'IS00312', 'IS00313', 'IS00314', 'IS00315']
                        }, {
                            ctgCode: 'CS00028',
                            radioCode: 'IS00317',
                            relateCode: ['IS00318', 'IS00319', 'IS00320', 'IS00321', 'IS00322']
                        }, {
                            ctgCode: 'CS00029',
                            radioCode: 'IS00324',
                            relateCode: ['IS00325', 'IS00326', 'IS00327', 'IS00328', 'IS00329']
                        }, {
                            ctgCode: 'CS00030',
                            radioCode: 'IS00331',
                            relateCode: ['IS00332', 'IS00333', 'IS00334', 'IS00335', 'IS00336']
                        }, {
                            ctgCode: 'CS00031',
                            radioCode: 'IS00338',
                            relateCode: ['IS00339', 'IS00340', 'IS00341', 'IS00342', 'IS00343']
                        }, {
                            ctgCode: 'CS00032',
                            radioCode: 'IS00345',
                            relateCode: ['IS00346', 'IS00347', 'IS00348', 'IS00349', 'IS00350']
                        }, {
                            ctgCode: 'CS00033',
                            radioCode: 'IS00352',
                            relateCode: ['IS00353', 'IS00354', 'IS00355', 'IS00356', 'IS00357']
                        }, {
                            ctgCode: 'CS00034',
                            radioCode: 'IS00359',
                            relateCode: ['IS00360', 'IS00361', 'IS00362', 'IS00363', 'IS00364']
                        }, {
                            ctgCode: 'CS00035',
                            radioCode: 'IS00370',
                            relateCode: ['IS00371', 'IS00372', 'IS00374']
                        }, {
                            ctgCode: 'CS00036',
                            radioCode: 'IS00375',
                            relateCode: ['IS00376', 'IS00377', 'IS00378', 'IS00379', 'IS01101']
                        }, {
                            ctgCode: 'CS00036',
                            radioCode: 'IS00380',
                            relateCode: ['IS00381', 'IS00382', 'IS00383', 'IS00384', 'IS01102']
                        }, {
                            ctgCode: 'CS00049',
                            radioCode: 'IS00560',
                            relateCode: ['IS00561', 'IS00562', 'IS00563', 'IS00564', 'IS00565']
                        }, {
                            ctgCode: 'CS00050',
                            radioCode: 'IS00567',
                            relateCode: ['IS00568', 'IS00569', 'IS00570', 'IS00571', 'IS00572']
                        }, {
                            ctgCode: 'CS00051',
                            radioCode: 'IS00574',
                            relateCode: ['IS00575', 'IS00576', 'IS00577', 'IS00578', 'IS00579']
                        }, {
                            ctgCode: 'CS00052',
                            radioCode: 'IS00581',
                            relateCode: ['IS00582', 'IS00583', 'IS00584', 'IS00585', 'IS00586']
                        }, {
                            ctgCode: 'CS00053',
                            radioCode: 'IS00588',
                            relateCode: ['IS00589', 'IS00590', 'IS00591', 'IS00592', 'IS00593']
                        }, {
                            ctgCode: 'CS00054',
                            radioCode: 'IS00595',
                            relateCode: ['IS00596', 'IS00597', 'IS00598', 'IS00599', 'IS00600']
                        }, {
                            ctgCode: 'CS00055',
                            radioCode: 'IS00602',
                            relateCode: ['IS00603', 'IS00604', 'IS00605', 'IS00606', 'IS00607']
                        }, {
                            ctgCode: 'CS00056',
                            radioCode: 'IS00609',
                            relateCode: ['IS00610', 'IS00611', 'IS00612', 'IS00613', 'IS00614']
                        }, {
                            ctgCode: 'CS00057',
                            radioCode: 'IS00616',
                            relateCode: ['IS00617', 'IS00618', 'IS00619', 'IS00620', 'IS00621']
                        }, {
                            ctgCode: 'CS00058',
                            radioCode: 'IS00623',
                            relateCode: ['IS00624', 'IS00625', 'IS00626', 'IS00627', 'IS00628']
                        }], comboboxs = ["IS00297", "IS00304", "IS00311", "IS00318", "IS00325", "IS00332", "IS00339", "IS00346", "IS00353", "IS00360", "IS00372",
                        "IS00561", "IS00568", "IS00575", "IS00582", "IS00589", "IS00596", "IS00603", "IS00610", "IS00617", "IS00624"], textBoxs = ["IS00298", "IS00305", "IS00312", "IS00319", "IS00326", "IS00334", "IS00340", "IS00347", "IS00354", "IS00361",
                        "IS00562", "IS00569", "IS00576", "IS00583", "IS00590", "IS00597", "IS00604", "IS00611", "IS00618", "IS00625"], validation = function (radio) {
                        var rd = finder.find(radio.rdctCode || radio.ctgCode, radio.radioCode), ctrls = _.map(radio.relateCode, function (x) { return finder.find(radio.ctgCode, x); });
                        if (rd) {
                            rd.data.value.subscribe(function (v) {
                                var cbValue = _.find(ctrls, function (o) { return _.includes(comboboxs, o.data.itemCode); });
                                _.each(ctrls, function (c) {
                                    if (c && c.data) {
                                        var cb = _.find(comboboxs, function (o) { return c.data.itemCode == o; });
                                        if (v == 0) {
                                            c.data.editable(false);
                                        }
                                        else {
                                            if (cb) {
                                                c.data.editable(true);
                                            }
                                            else {
                                                var tb = _.find(textBoxs, function (o) { return c.data.itemCode == o; });
                                                if (tb && cbValue && cbValue.data) {
                                                    c.data.editable(cbValue.data.value() === '1');
                                                }
                                                else if (c && c.data) {
                                                    c.data.editable(true);
                                                }
                                            }
                                        }
                                    }
                                });
                            });
                            rd.data.value.valueHasMutated();
                        }
                    };
                    _(radios).each(function (radio) { return validation(radio); });
                };
                this.grand_combobox = function () {
                    var self = _this, finder = self.finder, comboboxs = [{
                            ctgCode: 'CS00025',
                            comboboxCode: 'IS00297',
                            relateCode: ['IS00296', 'IS00298', 'IS00299', 'IS00300']
                        }, {
                            ctgCode: 'CS00026',
                            comboboxCode: 'IS00304',
                            relateCode: ['IS00303', 'IS00305', 'IS00306', 'IS00307', 'IS00308']
                        }, {
                            ctgCode: 'CS00027',
                            comboboxCode: 'IS00311',
                            relateCode: ['IS00310', 'IS00312', 'IS00313', 'IS00314', 'IS00315']
                        }, {
                            ctgCode: 'CS00028',
                            comboboxCode: 'IS00318',
                            relateCode: ['IS00317', 'IS00319', 'IS00320', 'IS00321', 'IS00322']
                        }, {
                            ctgCode: 'CS00029',
                            comboboxCode: 'IS00325',
                            relateCode: ['IS00324', 'IS00326', 'IS00327', 'IS00328', 'IS00329']
                        }, {
                            ctgCode: 'CS00030',
                            comboboxCode: 'IS00332',
                            relateCode: ['IS00331', 'IS00333', 'IS00334', 'IS00335', 'IS00336']
                        }, {
                            ctgCode: 'CS00031',
                            comboboxCode: 'IS00339',
                            relateCode: ['IS00338', 'IS00340', 'IS00341', 'IS00342', 'IS00343']
                        }, {
                            ctgCode: 'CS00032',
                            comboboxCode: 'IS00346',
                            relateCode: ['IS00345', 'IS00347', 'IS00348', 'IS00349', 'IS00350']
                        }, {
                            ctgCode: 'CS00033',
                            comboboxCode: 'IS00353',
                            relateCode: ['IS00352', 'IS00354', 'IS00355', 'IS00356', 'IS00357']
                        }, {
                            ctgCode: 'CS00034',
                            comboboxCode: 'IS00360',
                            relateCode: ['IS00359', 'IS00361', 'IS00362', 'IS00363', 'IS00364']
                        }, {
                            ctgCode: 'CS00049',
                            comboboxCode: 'IS00561',
                            relateCode: ['IS00560', 'IS00562', 'IS00563', 'IS00564', 'IS00565']
                        }, {
                            ctgCode: 'CS00050',
                            comboboxCode: 'IS00568',
                            relateCode: ['IS00567', 'IS00569', 'IS00570', 'IS00571', 'IS00572']
                        }, {
                            ctgCode: 'CS00051',
                            comboboxCode: 'IS00575',
                            relateCode: ['IS00574', 'IS00576', 'IS00577', 'IS00578', 'IS00579']
                        }, {
                            ctgCode: 'CS00052',
                            comboboxCode: 'IS00582',
                            relateCode: ['IS00581', 'IS00583', 'IS00584', 'IS00585', 'IS00586']
                        }, {
                            ctgCode: 'CS00053',
                            comboboxCode: 'IS00589',
                            relateCode: ['IS00588', 'IS00590', 'IS00591', 'IS00592', 'IS00593']
                        }, {
                            ctgCode: 'CS00054',
                            comboboxCode: 'IS00596',
                            relateCode: ['IS00595', 'IS00597', 'IS00598', 'IS00599', 'IS00600']
                        }, {
                            ctgCode: 'CS00055',
                            comboboxCode: 'IS00603',
                            relateCode: ['IS00602', 'IS00604', 'IS00605', 'IS00606', 'IS00607']
                        }, {
                            ctgCode: 'CS00056',
                            comboboxCode: 'IS00610',
                            relateCode: ['IS00609', 'IS00611', 'IS00612', 'IS00613', 'IS00614']
                        }, {
                            ctgCode: 'CS00057',
                            comboboxCode: 'IS00617',
                            relateCode: ['IS00616', 'IS00618', 'IS00619', 'IS00620', 'IS00621']
                        }, {
                            ctgCode: 'CS00058',
                            comboboxCode: 'IS00624',
                            relateCode: ['IS00623', 'IS00625', 'IS00626', 'IS00627', 'IS00628']
                        }], radios = ['IS00296', 'IS00303', 'IS00310', 'IS00317', 'IS00324', 'IS00331', 'IS00338', 'IS00345', 'IS00352', 'IS00359', 'IS00370',
                        'IS00375', 'IS00380', 'IS00560', 'IS00567', 'IS00574', 'IS00581', 'IS00588', 'IS00595', 'IS00602', 'IS00609', 'IS00616', 'IS00623'], btns = ['IS00301', 'IS00308', 'IS00315', 'IS00322', 'IS00329', 'IS00336', 'IS00343', 'IS00350', 'IS00357', 'IS00364', 'IS00565',
                        'IS00572', 'IS00579', 'IS00586', 'IS00593', 'IS00602', 'IS00600', 'IS00607', 'IS00614', 'IS00621', 'IS00628'], validation = function (combobox) {
                        var cb = finder.find(combobox.rdctCode || combobox.ctgCode, combobox.comboboxCode), ctrls = _.map(combobox.relateCode, function (x) { return finder.find(combobox.ctgCode, x); });
                        if (cb) {
                            var rb = _.find(ctrls, function (o) { return _.includes(radios, o.data.itemCode); });
                            cb.data.value.subscribe(function (v) {
                                if (ctrls[0].data.value() == 1) {
                                    for (i = 1; i < ctrls.length; i++) {
                                        if (ctrls[i] && ctrls[i].data) {
                                            var btn = _.find(btns, function (o) { return ctrls[i].data.itemCode == o; });
                                            if (btn && rb && rb.data) {
                                                ctrls[i].data.editable(rb.data.value() === '1');
                                            }
                                            else {
                                                ctrls[i].data.editable(v == 1);
                                            }
                                        }
                                    }
                                }
                            });
                            cb.data.value.valueHasMutated();
                        }
                    };
                    _(comboboxs).each(function (cbx) { return validation(cbx); });
                };
                this.relate_radio = function () {
                    var self = _this, finder = self.finder, radios = [
                        {
                            ctgCode: 'CS00024',
                            radioCode: 'IS00387',
                            setParentCode: 'IS00388'
                        },
                        {
                            ctgCode: 'CS00024',
                            radioCode: 'IS00400',
                            setParentCode: 'IS00401'
                        },
                        {
                            ctgCode: 'CS00025',
                            radioCode: 'IS00411',
                            setParentCode: 'IS00412'
                        },
                        {
                            ctgCode: 'CS00026',
                            radioCode: 'IS00426',
                            setParentCode: 'IS00427'
                        }, {
                            ctgCode: 'CS00027',
                            radioCode: 'IS00441',
                            setParentCode: 'IS00442'
                        }, {
                            ctgCode: 'CS00028',
                            radioCode: 'IS00456',
                            setParentCode: 'IS00457'
                        }, {
                            ctgCode: 'CS00027',
                            radioCode: 'IS00441',
                            setParentCode: 'IS00442'
                        }, {
                            ctgCode: 'CS00029',
                            radioCode: 'IS00471',
                            setParentCode: 'IS00472'
                        }, {
                            ctgCode: 'CS00030',
                            radioCode: 'IS00486',
                            setParentCode: 'IS00487'
                        }, {
                            ctgCode: 'CS00031',
                            radioCode: 'IS00501',
                            setParentCode: 'IS00502'
                        }, {
                            ctgCode: 'CS00032',
                            radioCode: 'IS00516',
                            setParentCode: 'IS00517'
                        }, {
                            ctgCode: 'CS00033',
                            radioCode: 'IS00531',
                            setParentCode: 'IS00532'
                        }, {
                            ctgCode: 'CS00034',
                            radioCode: 'IS00546',
                            setParentCode: 'IS00547'
                        }, {
                            ctgCode: 'CS00049',
                            radioCode: 'IS00631',
                            setParentCode: 'IS00632'
                        }, {
                            ctgCode: 'CS00049',
                            radioCode: 'IS00646',
                            setParentCode: 'IS00647'
                        }, {
                            ctgCode: 'CS00050',
                            radioCode: 'IS00646',
                            setParentCode: 'IS00647'
                        }, {
                            ctgCode: 'CS00051',
                            radioCode: 'IS00661',
                            setParentCode: 'IS00662'
                        }, {
                            ctgCode: 'CS00052',
                            radioCode: 'IS00676',
                            setParentCode: 'IS00677'
                        }, {
                            ctgCode: 'CS00053',
                            radioCode: 'IS00691',
                            setParentCode: 'IS00692'
                        }, {
                            ctgCode: 'CS00055',
                            radioCode: 'IS00721',
                            setParentCode: 'IS00722'
                        }, {
                            ctgCode: '',
                            radioCode: '',
                            setParentCode: ''
                        }
                    ], validation = function (radio) {
                        var rd = finder.find(radio.ctgCode, radio.radioCode), ctrls = finder.findChilds(radio.ctgCode, radio.setParentCode);
                        if (rd) {
                            rd.data.value.subscribe(function (x) {
                                _.each(ctrls, function (c) {
                                    c.data.editable(x == 1);
                                    removeErrorByElement($(c.id));
                                });
                            });
                            var tout_3 = setTimeout(function () {
                                rd.data.value.valueHasMutated();
                                clearTimeout(tout_3);
                            }, 0);
                        }
                    };
                    _(radios).each(function (radio) { return validation(radio); });
                };
                this.button = function () {
                    var self = _this, finder = self.finder, groups = [
                        {
                            ctgCode: 'CS00019',
                            firstTimes: {
                                start: 'IS00106',
                                end: 'IS00107'
                            },
                            secondTimes: {
                                start: 'IS00109',
                                end: 'IS00110'
                            }
                        },
                        {
                            ctgCode: 'CS00020',
                            workType: 'IS00128'
                        },
                        {
                            ctgCode: 'CS00020',
                            workType: 'IS00130',
                            workTime: 'IS00131',
                            firstTimes: {
                                start: 'IS00133',
                                end: 'IS00134'
                            },
                            secondTimes: {
                                start: 'IS00136',
                                end: 'IS00137'
                            }
                        },
                        {
                            ctgCode: 'CS00020',
                            workType: 'IS00139',
                            workTime: 'IS00140',
                            firstTimes: {
                                start: 'IS00142',
                                end: 'IS00143'
                            },
                            secondTimes: {
                                start: 'IS00145',
                                end: 'IS00146'
                            }
                        },
                        {
                            ctgCode: 'CS00020',
                            workType: 'IS00148',
                            workTime: 'IS00149',
                            firstTimes: {
                                start: 'IS00151',
                                end: 'IS00152'
                            },
                            secondTimes: {
                                start: 'IS00154',
                                end: 'IS00155'
                            }
                        },
                        {
                            ctgCode: 'CS00020',
                            workType: 'IS00157',
                            workTime: 'IS00158',
                            firstTimes: {
                                start: 'IS00160',
                                end: 'IS00161'
                            },
                            secondTimes: {
                                start: 'IS00163',
                                end: 'IS00164'
                            }
                        },
                        {
                            ctgCode: 'CS00020',
                            workType: 'IS00166',
                            workTime: 'IS00167',
                            firstTimes: {
                                start: 'IS00169',
                                end: 'IS00170'
                            },
                            secondTimes: {
                                start: 'IS00172',
                                end: 'IS00173'
                            }
                        },
                        {
                            ctgCode: 'CS00020',
                            workType: 'IS00175',
                            workTime: 'IS00176',
                            firstTimes: {
                                start: 'IS00178',
                                end: 'IS00179'
                            },
                            secondTimes: {
                                start: 'IS00181',
                                end: 'IS00182'
                            }
                        },
                        {
                            ctgCode: 'CS00070',
                            workType: 'IS00193',
                            workTime: 'IS00194',
                            firstTimes: {
                                start: 'IS00196',
                                end: 'IS00197'
                            },
                            secondTimes: {
                                start: 'IS00199',
                                end: 'IS00200'
                            }
                        },
                        {
                            ctgCode: 'CS00070',
                            workType: 'IS00202',
                            workTime: 'IS00203',
                            firstTimes: {
                                start: 'IS00205',
                                end: 'IS00206'
                            },
                            secondTimes: {
                                start: 'IS00208',
                                end: 'IS00209'
                            }
                        },
                        {
                            ctgCode: 'CS00070',
                            workType: 'IS00211',
                            workTime: 'IS00212',
                            firstTimes: {
                                start: 'IS00214',
                                end: 'IS00215'
                            },
                            secondTimes: {
                                start: 'IS00217',
                                end: 'IS00218'
                            }
                        },
                        {
                            ctgCode: 'CS00070',
                            workType: 'IS00220',
                            workTime: 'IS00221',
                            firstTimes: {
                                start: 'IS00223',
                                end: 'IS00224'
                            },
                            secondTimes: {
                                start: 'IS00226',
                                end: 'IS00227'
                            }
                        },
                        {
                            ctgCode: 'CS00070',
                            workType: 'IS00229',
                            workTime: 'IS00230',
                            firstTimes: {
                                start: 'IS00232',
                                end: 'IS00233'
                            },
                            secondTimes: {
                                start: 'IS00235',
                                end: 'IS00236'
                            }
                        },
                        {
                            ctgCode: 'CS00070',
                            workType: 'IS00238',
                            workTime: 'IS00239',
                            firstTimes: {
                                start: 'IS00241',
                                end: 'IS00242'
                            },
                            secondTimes: {
                                start: 'IS00244',
                                end: 'IS00245'
                            }
                        },
                        {
                            ctgCode: 'CS00070',
                            workType: 'IS00184',
                            workTime: 'IS00185',
                            firstTimes: {
                                start: 'IS00187',
                                end: 'IS00188'
                            },
                            secondTimes: {
                                start: 'IS00190',
                                end: 'IS00191'
                            }
                        }
                    ], setData = function (ctrl, value) {
                        if (ctrl) {
                            ctrl.data.value(value);
                        }
                    }, setEditAble = function (ctrl, editable) {
                        ctrl && ctrl.data.editable(editable || false);
                    }, validateGroup = function (group) {
                        var firstTimes = group.firstTimes && {
                            start: finder.find(group.ctgCode, group.firstTimes.start),
                            end: finder.find(group.ctgCode, group.firstTimes.end)
                        }, secondTimes = group.secondTimes && {
                            start: finder.find(group.ctgCode, group.secondTimes.start),
                            end: finder.find(group.ctgCode, group.secondTimes.end)
                        };
                        if (firstTimes && secondTimes) {
                            if (firstTimes.end && secondTimes.start) {
                                $("".concat(firstTimes.end.id, ", ").concat(secondTimes.start.id)).on('blur', function () {
                                    var tout = setTimeout(function () {
                                        var dom1 = $(firstTimes.end.id), dom2 = $(secondTimes.start.id), pv = ko.toJS(firstTimes.end.data.value), nv = ko.toJS(secondTimes.start.data.value), tpt = typeof pv == 'number', tnt = typeof nv == 'number';
                                        if (tpt && tnt && pv > nv) {
                                            if (!dom1.ntsError('hasError')) {
                                                dom1.ntsError('set', {
                                                    messageId: "Msg_859",
                                                    messageParams: [
                                                        firstTimes.end.data.itemName,
                                                        secondTimes.start.data.itemName
                                                    ]
                                                });
                                            }
                                            if (!dom2.ntsError('hasError')) {
                                                dom2.parent().addClass('error');
                                            }
                                        }
                                        if ((tpt && tnt && !(pv > nv)) || (!tpt || !tnt)) {
                                            rmError(dom1, "Msg_859");
                                            if (!dom2.ntsError('hasError')) {
                                                dom2.parent().removeClass('error');
                                            }
                                        }
                                        clearTimeout(tout);
                                    }, 50);
                                });
                            }
                        }
                    }, validateEditable = function (group, wtc, nofetch) {
                        if (nofetch === void 0) { nofetch = undefined; }
                        var command = {
                            workTimeCode: ko.toJS(wtc || undefined)
                        }, firstTimes = group.firstTimes && {
                            start: finder.find(group.ctgCode, group.firstTimes.start),
                            end: finder.find(group.ctgCode, group.firstTimes.end)
                        }, secondTimes = group.secondTimes && {
                            start: finder.find(group.ctgCode, group.secondTimes.start),
                            end: finder.find(group.ctgCode, group.secondTimes.end)
                        }, disableAll = function () {
                            firstTimes && setEditAble(firstTimes.start, false);
                            firstTimes && setEditAble(firstTimes.end, false);
                            secondTimes && setEditAble(secondTimes.start, false);
                            secondTimes && setEditAble(secondTimes.end, false);
                        };
                        if (command.workTimeCode) {
                            if (nofetch) {
                                var head = _.find(nofetch, function (f) { return f.workTimeCode == command.workTimeCode; });
                                if (head) {
                                    firstTimes && setEditAble(firstTimes.start, head.startEnd);
                                    firstTimes && setEditAble(firstTimes.end, head.startEnd);
                                    secondTimes && setEditAble(secondTimes.start, head.startEnd && head.multiTime);
                                    secondTimes && setEditAble(secondTimes.end, head.startEnd && head.multiTime);
                                }
                                else {
                                    disableAll();
                                }
                            }
                            else {
                                fetch.check_start_end(command).done(function (first) {
                                    firstTimes && setEditAble(firstTimes.start, !!first);
                                    firstTimes && setEditAble(firstTimes.end, !!first);
                                    fetch.check_multi_time(command).done(function (second) {
                                        secondTimes && setEditAble(secondTimes.start, !!first && !!second);
                                        secondTimes && setEditAble(secondTimes.end, !!first && !!second);
                                    });
                                });
                            }
                        }
                        else {
                            disableAll();
                        }
                    }, workTimeCodes = _(groups).map(function (group) {
                        var workTime = group.workTime && finder.find(group.ctgCode, group.workTime);
                        if (workTime) {
                            return ko.toJS(workTime.data.value);
                        }
                        return null;
                    })
                        .filter(function (f) { return !!f; })
                        .value();
                    fetch.check_mt_se({ workTimeCodes: workTimeCodes }).done(function (mt) {
                        _.each(groups, function (group) {
                            var workType = group.workType && finder.find(group.ctgCode, group.workType), workTime = group.workTime && finder.find(group.ctgCode, group.workTime), firstTimes = group.firstTimes && {
                                start: finder.find(group.ctgCode, group.firstTimes.start),
                                end: finder.find(group.ctgCode, group.firstTimes.end)
                            }, secondTimes = group.secondTimes && {
                                start: finder.find(group.ctgCode, group.secondTimes.start),
                                end: finder.find(group.ctgCode, group.secondTimes.end)
                            };
                            if (firstTimes && secondTimes) {
                                validateGroup(group);
                            }
                            if (!workType) {
                                if (workTime) {
                                    // handle click event of workTime
                                    workTime.ctrl
                                        .data('safeClick', new Date().getTime())
                                        .on('click', function () {
                                        var timeClick = new Date().getTime(), safeClick = workTime.ctrl.data('safeClick');
                                        // prevent multi click
                                        workTime.ctrl.data('safeClick', timeClick);
                                        if (timeClick - safeClick <= 500) {
                                            return;
                                        }
                                        setShared("kdl00showNoSelectionRow", workTime.data.required == true ? false : true);
                                        setShared("kml001multiSelectMode", false);
                                        setShared("kml001selectedCodeList", _.isNil(workTime.data.value()) ? [] : [workTime.data.value()]);
                                        setShared("kml001isSelection", true);
                                        setShared("kml001selectAbleCodeList", _.map(ko.toJS(workTime.data).lstComboBoxValue, function (x) { return x.optionValue; }), true);
                                        modal('at', '/view/kdl/001/a/index.xhtml').onClosed(function () {
                                            var childData = getShared('kml001selectedTimes');
                                            if (childData) {
                                                if (childData.length > 0) {
                                                    var data = childData[0];
                                                    setData(workTime, data.selectedWorkTimeCode);
                                                    firstTimes && setData(firstTimes.start, data.first && data.first.start);
                                                    firstTimes && setData(firstTimes.end, data.first && data.first.end);
                                                    secondTimes && setData(secondTimes.start, data.second && data.second.start);
                                                    secondTimes && setData(secondTimes.end, data.second && data.second.end);
                                                    validateEditable(group, workTime.data.value);
                                                }
                                            }
                                        });
                                    });
                                }
                                return;
                            }
                            if (!workTime) {
                                workType.ctrl
                                    .data('safeClick', new Date().getTime())
                                    .on('click', function () {
                                    var timeClick = new Date().getTime(), safeClick = workType.ctrl.data('safeClick');
                                    // prevent multi click
                                    workType.ctrl.data('safeClick', timeClick);
                                    if (timeClick - safeClick <= 500) {
                                        return;
                                    }
                                    var possibleItems = _.map(ko.toJS(workType.data).lstComboBoxValue, function (x) { return x.optionValue; });
                                    possibleItems.sort();
                                    setShared("KDL002_isShowNoSelectRow", workType.data.required == true ? false : true);
                                    setShared("KDL002_Multiple", false, true);
                                    setShared('kdl002isSelection', false, true);
                                    setShared("KDL002_SelectedItemId", _.isNil(workType.data.value())
                                        ? (workType.data.required && possibleItems.length > 0 ? possibleItems[0] : [])
                                        : [workType.data.value()], true);
                                    setShared("KDL002_AllItemObj", _.map(ko.toJS(workType.data).lstComboBoxValue, function (x) { return x.optionValue; }), true);
                                    modal('at', '/view/kdl/002/a/index.xhtml').onClosed(function () {
                                        var childData = getShared('KDL002_SelectedNewItem');
                                        if (childData[0]) {
                                            setData(workType, childData[0].code);
                                        }
                                    });
                                });
                            }
                            else {
                                validateEditable(group, workTime.data.value, mt);
                                workType.ctrl
                                    .data('safeClick', new Date().getTime())
                                    .on('click', function () {
                                    var timeClick = new Date().getTime(), safeClick = workType.ctrl.data('safeClick');
                                    // prevent multi click
                                    workType.ctrl.data('safeClick', timeClick);
                                    if (timeClick - safeClick <= 500) {
                                        return;
                                    }
                                    if (['IS00130', 'IS00139'].indexOf(workType.data.itemCode) > -1) {
                                        setShared('parentCodes', {
                                            workTypeCodes: workType && _.map(ko.toJS(workType.data).lstComboBoxValue, function (x) { return x.optionValue; }),
                                            selectedWorkTypeCode: workType && ko.toJS(workType.data).value,
                                            workTimeCodes: workTime && _.map(ko.toJS(workTime.data).lstComboBoxValue, function (x) { return x.optionValue; }),
                                            selectedWorkTimeCode: workTime && ko.toJS(workTime.data).value,
                                            showNone: false
                                        }, true);
                                        modal('at', '/view/kdl/003/a/index.xhtml').onClosed(function () {
                                            var childData = getShared('childData');
                                            if (childData) {
                                                setData(workType, childData.selectedWorkTypeCode);
                                                setData(workTime, childData.selectedWorkTimeCode);
                                                firstTimes && setData(firstTimes.start, childData.first && childData.first.start);
                                                firstTimes && setData(firstTimes.end, childData.first && childData.first.end);
                                                secondTimes && setData(secondTimes.start, childData.second && childData.second.start);
                                                secondTimes && setData(secondTimes.end, childData.second && childData.second.end);
                                                validateEditable(group, workTime.data.value);
                                            }
                                        });
                                    }
                                    else {
                                        var possibleItems = _.map(ko.toJS(workType.data).lstComboBoxValue, function (x) { return x.optionValue; });
                                        possibleItems.sort();
                                        setShared("KDL002_isShowNoSelectRow", workType.data.required == true ? false : true);
                                        setShared("KDL002_Multiple", false, true);
                                        setShared('kdl002isSelection', true, true);
                                        setShared("KDL002_SelectedItemId", _.isNil(workType.data.value())
                                            ? (workType.data.required && possibleItems.length > 0 ? possibleItems[0] : [])
                                            : [workType.data.value()], true);
                                        setShared("KDL002_AllItemObj", _.map(ko.toJS(workType.data).lstComboBoxValue, function (x) { return x.optionValue; }), true);
                                        modal('at', '/view/kdl/002/a/index.xhtml').onClosed(function () {
                                            var childData = getShared('KDL002_SelectedNewItem');
                                            if (childData.length > 0) {
                                                setData(workType, childData[0].code);
                                            }
                                        });
                                    }
                                });
                                // handle click event of workTime
                                workTime.ctrl
                                    .data('safeClick', new Date().getTime())
                                    .on('click', function () {
                                    var timeClick = new Date().getTime(), safeClick = workTime.ctrl.data('safeClick');
                                    // prevent multi click
                                    workTime.ctrl.data('safeClick', timeClick);
                                    if (timeClick - safeClick <= 500) {
                                        return;
                                    }
                                    if (['IS00131', 'IS00140'].indexOf(workTime.data.itemCode) > -1) {
                                        setShared('parentCodes', {
                                            workTypeCodes: workType && _.map(ko.toJS(workType.data).lstComboBoxValue, function (x) { return x.optionValue; }),
                                            selectedWorkTypeCode: workType && ko.toJS(workType.data).value,
                                            workTimeCodes: workTime && _.map(ko.toJS(workTime.data).lstComboBoxValue, function (x) { return x.optionValue; }),
                                            selectedWorkTimeCode: workTime && ko.toJS(workTime.data).value,
                                            showNone: false
                                        }, true);
                                        modal('at', '/view/kdl/003/a/index.xhtml').onClosed(function () {
                                            var childData = getShared('childData');
                                            if (childData) {
                                                setData(workType, childData.selectedWorkTypeCode);
                                                setData(workTime, childData.selectedWorkTimeCode);
                                                firstTimes && setData(firstTimes.start, childData.first && childData.first.start);
                                                firstTimes && setData(firstTimes.end, childData.first && childData.first.end);
                                                secondTimes && setData(secondTimes.start, childData.second && childData.second.start);
                                                secondTimes && setData(secondTimes.end, childData.second && childData.second.end);
                                                validateEditable(group, workTime.data.value);
                                            }
                                        });
                                    }
                                    else {
                                        setShared("kdl00showNoSelectionRow", workTime.data.required == true ? false : true);
                                        setShared("kml001multiSelectMode", false);
                                        setShared("kml001selectedCodeList", _.isNil(workTime.data.value()) ? [] : [workTime.data.value()]);
                                        setShared("kml001isSelection", true);
                                        setShared("kml001selectAbleCodeList", _.map(ko.toJS(workTime.data).lstComboBoxValue, function (x) { return x.optionValue; }), true);
                                        modal('at', '/view/kdl/001/a/index.xhtml').onClosed(function () {
                                            var childData = getShared('kml001selectedTimes');
                                            if (childData) {
                                                if (childData.length > 0) {
                                                    var data = childData[0];
                                                    setData(workTime, data.selectedWorkTimeCode);
                                                    firstTimes && setData(firstTimes.start, data.first && data.first.start);
                                                    firstTimes && setData(firstTimes.end, data.first && data.first.end);
                                                    secondTimes && setData(secondTimes.start, data.second && data.second.start);
                                                    secondTimes && setData(secondTimes.end, data.second && data.second.end);
                                                    validateEditable(group, workTime.data.value);
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                };
                this.relate_button = function () {
                    var self = _this, finder = self.finder, buttons = [{
                            ctgCode: 'CS00024',
                            btnCode: 'IS00276',
                            lblCode: 'IS00277',
                            dialogId: 'g'
                        }, {
                            ctgCode: 'CS00024',
                            btnCode: 'IS00294',
                            dialogId: 'h'
                        }, {
                            ctgCode: 'CS00025',
                            btnCode: 'IS00301',
                            dialogId: 'i',
                            specialCd: 1
                        }, {
                            ctgCode: 'CS00026',
                            btnCode: 'IS00308',
                            dialogId: 'i',
                            specialCd: 2
                        }, {
                            ctgCode: 'CS00027',
                            btnCode: 'IS00315',
                            dialogId: 'i',
                            specialCd: 3
                        }, {
                            ctgCode: 'CS00028',
                            btnCode: 'IS00322',
                            dialogId: 'i',
                            specialCd: 4
                        }, {
                            ctgCode: 'CS00029',
                            btnCode: 'IS00329',
                            dialogId: 'i',
                            specialCd: 5
                        }, {
                            ctgCode: 'CS00030',
                            btnCode: 'IS00336',
                            dialogId: 'i',
                            specialCd: 6
                        }, {
                            ctgCode: 'CS00031',
                            btnCode: 'IS00343',
                            dialogId: 'i',
                            specialCd: 7
                        }, {
                            ctgCode: 'CS00032',
                            btnCode: 'IS00350',
                            dialogId: 'i',
                            specialCd: 8
                        }, {
                            ctgCode: 'CS00033',
                            btnCode: 'IS00357',
                            dialogId: 'i',
                            specialCd: 9
                        }, {
                            ctgCode: 'CS00034',
                            btnCode: 'IS00364',
                            dialogId: 'i',
                            specialCd: 10
                        }, {
                            ctgCode: 'CS00049',
                            btnCode: 'IS00565',
                            dialogId: 'i',
                            specialCd: 11
                        }, {
                            ctgCode: 'CS00050',
                            btnCode: 'IS00572',
                            dialogId: 'i',
                            specialCd: 12
                        }, {
                            ctgCode: 'CS00051',
                            btnCode: 'IS00579',
                            dialogId: 'i',
                            specialCd: 13
                        }, {
                            ctgCode: 'CS00052',
                            btnCode: 'IS00586',
                            dialogId: 'i',
                            specialCd: 14
                        }, {
                            ctgCode: 'CS00053',
                            btnCode: 'IS00593',
                            dialogId: 'i',
                            specialCd: 15
                        }, {
                            ctgCode: 'CS00054',
                            btnCode: 'IS00600',
                            dialogId: 'i',
                            specialCd: 16
                        }, {
                            ctgCode: 'CS00055',
                            btnCode: 'IS00607',
                            dialogId: 'i',
                            specialCd: 17
                        }, {
                            ctgCode: 'CS00056',
                            btnCode: 'IS00614',
                            dialogId: 'i',
                            specialCd: 18
                        }, {
                            ctgCode: 'CS00057',
                            btnCode: 'IS00621',
                            dialogId: 'i',
                            specialCd: 19
                        }, {
                            ctgCode: 'CS00058',
                            btnCode: 'IS00628',
                            dialogId: 'i',
                            specialCd: 20
                        }
                    ], validation = function (btn) {
                        var button = finder.find(btn.ctgCode, btn.btnCode), label = finder.find(btn.ctgCode, btn.lblCode);
                        if (button) {
                            $(button.id)
                                .data('safeClick', new Date().getTime())
                                .on('click', function () {
                                var timeClick = new Date().getTime(), safeClick = $(button.id).data('safeClick');
                                // prevent multi click
                                $(button.id).data('safeClick', timeClick);
                                if (timeClick - safeClick <= 500) {
                                    return;
                                }
                                var sid = ko.toJS((((__viewContext || {}).viewModel || {}).employee || {}).employeeId);
                                setShared('CPS001GHI_VALUES', {
                                    ctgCode: button.data.categoryCode,
                                    sid: sid
                                });
                                modal('com', "/view/cps/001/".concat(btn.dialogId, "/index.xhtml")).onClosed(function () {
                                    // load lai du lieu
                                    if (!sid) {
                                        return;
                                    }
                                    switch (btn.dialogId) {
                                        case "g":
                                            fetch.get_annLeaNumber(sid).done(function (data) {
                                                button.data.value(data.annualLeaveNumber);
                                                if (label) {
                                                    label.data.value(data.lastGrantDate);
                                                }
                                            });
                                            break;
                                        case "h":
                                            fetch.get_resvLeaNumber(sid).done(function (data) {
                                                button.data.value(data);
                                            });
                                            break;
                                        case "i":
                                            fetch.get_calDayTime(sid, btn.specialCd).done(function (data) {
                                                button.data.value(data);
                                            });
                                    }
                                });
                            });
                        }
                    };
                    _(buttons).each(function (btn) { return validation(btn); });
                };
                this.combobox = function () {
                    var self = _this, finder = self.finder, CS00020_IS00123 = finder.find("CS00020", "IS00123"), CS00020_IS00124 = finder.find("CS00020", "IS00124"), CS00020_IS00125 = finder.find("CS00020", "IS00125"), CS00020_IS00126 = finder.find("CS00020", "IS00126"), CS00020_IS00127 = finder.find("CS00020", "IS00127");
                    if (CS00020_IS00123) {
                        CS00020_IS00123.data.value.subscribe(function (v) {
                            switch (v) {
                                case "0":
                                case "1":
                                case "2":
                                    CS00020_IS00124 && CS00020_IS00124.data.editable(true);
                                    CS00020_IS00125 && CS00020_IS00125.data.editable(true);
                                    CS00020_IS00126 && CS00020_IS00126.data.editable(true);
                                    CS00020_IS00127 && CS00020_IS00127.data.editable(false);
                                    break;
                                case "3":
                                    CS00020_IS00124 && CS00020_IS00124.data.editable(false);
                                    CS00020_IS00125 && CS00020_IS00125.data.editable(false);
                                    CS00020_IS00126 && CS00020_IS00126.data.editable(true);
                                    CS00020_IS00127 && CS00020_IS00127.data.editable(true);
                                    break;
                                case "4":
                                    CS00020_IS00124 && CS00020_IS00124.data.editable(false);
                                    CS00020_IS00125 && CS00020_IS00125.data.editable(false);
                                    CS00020_IS00126 && CS00020_IS00126.data.editable(false);
                                    CS00020_IS00127 && CS00020_IS00127.data.editable(false);
                                    break;
                            }
                        });
                        CS00020_IS00123.data.value.valueHasMutated();
                    }
                };
                // validate set table control
                this.setTable = function () {
                    var self = _this, finder = self.finder, times = [{
                            ctgCode: 'CS00024',
                            firstCode: 'IS00287',
                            secondCode: 'IS00288',
                            resultCode: 'IS00289'
                        }, {
                            ctgCode: 'CS00024',
                            firstCode: 'IS00291',
                            secondCode: 'IS00292',
                            resultCode: 'IS00293'
                        }], calc = function (time) {
                        var first = finder.find(time.ctgCode, time.firstCode), second = finder.find(time.ctgCode, time.secondCode), result = finder.find(time.ctgCode, time.resultCode);
                        if (first && second && result) {
                            first.data.value.subscribe(function (x) {
                                var vnb1 = ko.toJS(first.data.value), vnb2 = ko.toJS(second.data.value), nb1 = typeof vnb1 == 'number', nb2 = typeof vnb2 == 'number';
                                if (ITEM_SINGLE_TYPE.TIME == first.data.item.dataTypeValue) {
                                    if (nb1 && nb2) {
                                        result.data.value(parseTime(vnb1 - vnb2, true).format());
                                    }
                                    else if (nb1) {
                                        result.data.value(parseTime(vnb1, true).format());
                                    }
                                    else if (nb2) {
                                        result.data.value(parseTime(-vnb2, true).format());
                                    }
                                    else {
                                        result.data.value(undefined);
                                    }
                                }
                                else if (ITEM_SINGLE_TYPE.TIMEPOINT == first.data.item.dataTypeValue) {
                                    if (nb1 && nb2) {
                                        result.data.value(parseTimeWidthDay(vnb1 - vnb2).shortText);
                                    }
                                    else if (nb1) {
                                        result.data.value(parseTimeWidthDay(vnb1).shortText);
                                    }
                                    else if (nb2) {
                                        result.data.value(parseTimeWidthDay(-vnb2).shortText);
                                    }
                                    else {
                                        result.data.value(undefined);
                                    }
                                }
                                else if (ITEM_SINGLE_TYPE.NUMERIC == first.data.item.dataTypeValue) {
                                    result.data.value(Number(vnb1) - Number(vnb2));
                                }
                                else {
                                    result.data.value(undefined);
                                }
                            });
                            second.data.value.subscribe(function (x) { return first.data.value.valueHasMutated(); });
                            second.data.value.valueHasMutated();
                        }
                    };
                    _(times).each(function (time) { return calc(time); });
                };
                // validate datetime control
                this.dateTime = function () {
                    var self = _this, dfd = $.Deferred(), finder = self.finder, CS00016_IS00077 = finder.find('CS00016', 'IS00077'), CS00016_IS00079 = finder.find('CS00016', 'IS00079'), CS00017_IS00082 = finder.find('CS00017', 'IS00082'), CS00017_IS00084 = finder.find('CS00017', 'IS00084'), CS00017_IS00085 = finder.find('CS00017', 'IS00085'), CS00020_IS00130 = finder.find('CS00020', 'IS00130'), CS00020_IS00131 = finder.find('CS00020', 'IS00131'), CS00020_IS00119 = finder.find('CS00020', 'IS00119'), CS00070_IS00781 = finder.find('CS00070', 'IS00781'), workingCondInfo = [{
                            category: 'CS00020',
                            workTypeCode: 'IS00130',
                            workTypeTime: 'IS00131'
                        }, {
                            category: 'CS00020',
                            workTypeCode: 'IS00139',
                            workTypeTime: 'IS00140'
                        }, {
                            category: 'CS00020',
                            workTypeCode: 'IS00157',
                            workTypeTime: 'IS00158'
                        }, {
                            category: 'CS00020',
                            workTypeCode: 'IS00166',
                            workTypeTime: 'IS00167'
                        }, {
                            category: 'CS00020',
                            workTypeCode: 'IS00175',
                            workTypeTime: 'IS00176'
                        }, {
                            category: 'CS00020',
                            workTypeCode: 'IS00148',
                            workTypeTime: 'IS00149'
                        }, {
                            category: 'CS00070',
                            workTypeCode: 'IS00193',
                            workTypeTime: 'IS00194'
                        }, {
                            category: 'CS00070',
                            workTypeCode: 'IS00202',
                            workTypeTime: 'IS00203'
                        }, {
                            category: 'CS00070',
                            workTypeCode: 'IS00211',
                            workTypeTime: 'IS00212'
                        }, {
                            category: 'CS00070',
                            workTypeCode: 'IS00220',
                            workTypeTime: 'IS00221'
                        }, {
                            category: 'CS00070',
                            workTypeCode: 'IS00229',
                            workTypeTime: 'IS00230'
                        }, {
                            category: 'CS00070',
                            workTypeCode: 'IS00238',
                            workTypeTime: 'IS00239'
                        }, {
                            category: 'CS00070',
                            workTypeCode: 'IS00184',
                            workTypeTime: 'IS00185'
                        }
                    ], initCDL008Data = function (data) {
                        if (location.href.indexOf('/view/cps/002') > -1) {
                            var baseDateParam_1 = ko.toJS((__viewContext || {
                                viewModel: {
                                    currentEmployee: {
                                        hireDate: new Date()
                                    }
                                }
                            }).viewModel.currentEmployee).hireDate;
                            if (__viewContext.viewModel.wrkPlaceStartDate()) {
                                baseDateParam_1 = __viewContext.viewModel.wrkPlaceStartDate();
                            }
                            if (!!CS00017_IS00082) {
                                var startValue = CS00017_IS00082.data.value();
                                baseDateParam_1 = startValue;
                            }
                            if (_.isNil(baseDateParam_1) || !moment.utc(baseDateParam_1, "YYYYMMDD").isValid()) {
                                setShared('inputCDL008', null);
                                dfd.resolve();
                            }
                            else {
                                fetch.checkFunctionNo().done(function (functionNo) {
                                    setShared('inputCDL008', {
                                        selectedCodes: [ko.toJS(data.value)],
                                        baseDate: ko.toJS(moment.utc(baseDateParam_1, "YYYYMMDD").toDate()),
                                        isMultiple: false,
                                        selectedSystemType: 1,
                                        isrestrictionOfReferenceRange: functionNo.available,
                                        showNoSelection: !data.required,
                                        isShowBaseDate: false
                                    }, true);
                                    dfd.resolve();
                                });
                            }
                        }
                        else if (location.href.indexOf('/view/cps/001') > -1) {
                            if (!!CS00017_IS00082) {
                                var v_1 = CS00017_IS00082.data.value();
                                if (!_.isNil(v_1) && moment.utc(v_1, "YYYYMMDD").isValid()) {
                                    fetch.checkFunctionNo().done(function (functionNo) {
                                        setShared('inputCDL008', {
                                            selectedCodes: [data.value],
                                            baseDate: ko.toJS(moment.utc(v_1, "YYYYMMDD").toDate()),
                                            isMultiple: false,
                                            selectedSystemType: 1,
                                            isrestrictionOfReferenceRange: functionNo.available,
                                            showNoSelection: !data.required,
                                            isShowBaseDate: false
                                        }, true);
                                        dfd.resolve();
                                    });
                                }
                                else {
                                    setShared('inputCDL008', null);
                                    dfd.resolve();
                                }
                            }
                            else {
                                if (__viewContext.viewModel.layout.mode() == 'layout') {
                                    fetch.checkFunctionNo().done(function (functionNo) {
                                        setShared('inputCDL008', {
                                            selectedCodes: [data.value],
                                            baseDate: ko.toJS(moment.utc(__viewContext.viewModel.layout.standardDate(), 'YYYYMMDD').toDate()),
                                            isMultiple: false,
                                            selectedSystemType: 1,
                                            isrestrictionOfReferenceRange: functionNo.available,
                                            showNoSelection: !data.required,
                                            isShowBaseDate: false
                                        }, true);
                                        dfd.resolve();
                                    });
                                }
                                else {
                                    fetch.checkFunctionNo().done(function (functionNo) {
                                        setShared('inputCDL008', {
                                            selectedCodes: [data.value],
                                            baseDate: ko.toJS(moment.utc(__viewContext.viewModel.employee.hireDate(), 'YYYYMMDD').toDate()),
                                            isMultiple: false,
                                            selectedSystemType: 1,
                                            isrestrictionOfReferenceRange: functionNo.available,
                                            showNoSelection: !data.required,
                                            isShowBaseDate: false
                                        }, true);
                                        dfd.resolve();
                                    });
                                }
                            }
                        }
                    };
                    if (CS00016_IS00077 && CS00016_IS00079) {
                        CS00016_IS00077.data.value.subscribe(function (_date) {
                            var empId = ko.toJS((((__viewContext || {}).viewModel || {}).employee || {}).employeeId), data = ko.toJS(CS00016_IS00077.data), comboData = ko.toJS(CS00016_IS00079.data);
                            // If input date out of range
                            if (moment.utc(_date).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                || moment.utc(_date).diff(moment.utc('9999/12/31'), 'days', true) > 0) {
                                return;
                            }
                            if (!empId && location.href.indexOf('/view/cps/002/') == -1) {
                                return;
                            }
                            fetch.get_cb_data({
                                comboBoxType: comboData.item.referenceType,
                                categoryId: comboData.categoryId,
                                required: comboData.required,
                                standardDate: moment.utc(_date).toDate(),
                                typeCode: comboData.item.typeCode,
                                masterType: comboData.item.masterType,
                                employeeId: empId,
                                cps002: false,
                                workplaceId: undefined,
                                baseDate: undefined
                            }).done(function (cbx) {
                                CS00016_IS00079.data.lstComboBoxValue(cbx);
                            });
                        });
                    }
                    if (CS00017_IS00082 && CS00017_IS00084) {
                        CS00017_IS00082.data.value.subscribe(function (_date) {
                            var empId = ko.toJS((((__viewContext || {}).viewModel || {}).employee || {}).employeeId), comboData = ko.toJS(CS00017_IS00084.data);
                            // If input date out of range
                            if (moment.utc(_date).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                || moment.utc(_date).diff(moment.utc('9999/12/31'), 'days', true) > 0) {
                                return;
                            }
                            if (!empId && location.href.indexOf('/view/cps/002/') == -1) {
                                return;
                            }
                            fetch.get_cb_data({
                                comboBoxType: comboData.item.referenceType,
                                categoryId: comboData.categoryId,
                                required: comboData.required,
                                standardDate: moment.utc(_date).toDate(),
                                typeCode: comboData.item.typeCode,
                                masterType: comboData.item.masterType,
                                employeeId: empId,
                                cps002: false,
                                workplaceId: undefined,
                                baseDate: undefined
                            }).done(function (cbx) {
                                CS00017_IS00084.data.lstComboBoxValue(cbx);
                                CS00017_IS00084.data.value.valueHasMutated();
                            });
                        });
                    }
                    if (CS00017_IS00082 && CS00017_IS00085) {
                        CS00017_IS00082.data.value.subscribe(function (_date) {
                            var empId = ko.toJS((((__viewContext || {}).viewModel || {}).employee || {}).employeeId), comboData = ko.toJS(CS00017_IS00085.data);
                            // If input date out of range
                            if (moment.utc(_date).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                || moment.utc(_date).diff(moment.utc('9999/12/31'), 'days', true) > 0) {
                                return;
                            }
                            if (!empId && location.href.indexOf('/view/cps/002/') == -1) {
                                return;
                            }
                            fetch.get_cb_data({
                                comboBoxType: comboData.item.referenceType,
                                categoryId: comboData.categoryId,
                                required: comboData.required,
                                standardDate: moment.utc(_date).toDate(),
                                typeCode: comboData.item.typeCode,
                                masterType: comboData.item.masterType,
                                employeeId: empId,
                                cps002: false,
                                workplaceId: undefined,
                                baseDate: undefined
                            }).done(function (cbx) {
                                CS00017_IS00085.data.lstComboBoxValue(cbx);
                                CS00017_IS00085.data.value.valueHasMutated();
                            });
                        });
                    }
                    if (CS00017_IS00084) {
                        CS00017_IS00084.ctrl
                            .data('safeClick', new Date().getTime())
                            .on('click', function () {
                            var timeClick = new Date().getTime(), safeClick = CS00017_IS00084.ctrl.data('safeClick');
                            // prevent multi click
                            CS00017_IS00084.ctrl.data('safeClick', timeClick);
                            if (timeClick - safeClick <= 500) {
                                return;
                            }
                            initCDL008Data(ko.toJS(CS00017_IS00084.data));
                            dfd.promise().done(function () {
                                if (!!getShared('inputCDL008')) {
                                    modal('com', '/view/cdl/008/a/index.xhtml').onClosed(function () {
                                        // Check is cancel.
                                        if (getShared('CDL008Cancel')) {
                                            return;
                                        }
                                        //view all code of selected item
                                        var output = getShared('outputCDL008');
                                        if (!_.isNil(output)) {
                                            CS00017_IS00084.data.value(output);
                                        }
                                    });
                                }
                            });
                        });
                    }
                    if (CS00017_IS00085) {
                        CS00017_IS00085.ctrl
                            .data('safeClick', new Date().getTime())
                            .on('click', function () {
                            var timeClick = new Date().getTime(), safeClick = CS00017_IS00085.ctrl.data('safeClick');
                            // prevent multi click
                            CS00017_IS00085.ctrl.data('safeClick', timeClick);
                            if (timeClick - safeClick <= 500) {
                                return;
                            }
                            initCDL008Data(ko.toJS(CS00017_IS00085.data));
                            dfd.promise().done(function () {
                                if (!!getShared('inputCDL008')) {
                                    modal('com', '/view/cdl/008/a/index.xhtml').onClosed(function () {
                                        // Check is cancel.
                                        if (getShared('CDL008Cancel')) {
                                            return;
                                        }
                                        //view all code of selected item
                                        var output = getShared('outputCDL008');
                                        if (!_.isNil(output)) {
                                            CS00017_IS00085.data.value(output);
                                        }
                                    });
                                }
                            });
                        });
                    }
                    var getComboData = function () {
                        var startDate = CS00020_IS00119 ? CS00020_IS00119.data.value() : undefined, wokPlace = CS00017_IS00084 ? CS00017_IS00084.data.value() : undefined, empId = ko.toJS((((__viewContext || {}).viewModel || {}).employee || {}).employeeId), realBaseDate = undefined;
                        if (!(startDate && !(startDate instanceof Date) && moment.utc(startDate, _.indexOf(startDate, "Z") > -1 ? "YYYY-MM-DD" : "YYYY/MM/DD").isValid() && !!(ko.toJS(startDate) || '').match(/((19|[2-9][0-9])\d{2})(-|\/)(\d{2}|\d{1})(-|\/)(\d{2}|\d{1})/))) {
                            return;
                        }
                        if (!startDate) {
                            startDate = CS00070_IS00781 ? CS00070_IS00781.data.value() : undefined;
                        }
                        if (!startDate && location.href.indexOf('/view/cps/002') > -1) {
                            startDate = __viewContext.viewModel.currentEmployee().hireDate();
                        }
                        if (location.href.indexOf('/view/cps/001') > -1 && __viewContext.viewModel.layout.mode() == 'layout') {
                            realBaseDate = __viewContext.viewModel.layout.standardDate();
                        }
                        _(workingCondInfo).each(function (ctgInfo) {
                            var workTypeCd = finder.find(ctgInfo.category, ctgInfo.workTypeCode), workTypeTime = finder.find(ctgInfo.category, ctgInfo.workTypeTime);
                            if (workTypeCd) {
                                var comboData = ko.toJS(workTypeCd.data);
                                fetch.get_cb_data({
                                    comboBoxType: comboData.item.referenceType,
                                    categoryId: comboData.categoryId,
                                    required: comboData.required,
                                    standardDate: startDate,
                                    typeCode: undefined,
                                    masterType: comboData.item.masterType,
                                    employeeId: empId,
                                    cps002: true,
                                    workplaceId: wokPlace,
                                    baseDate: moment.utc(realBaseDate).toDate()
                                }).done(function (data) {
                                    workTypeCd.data.lstComboBoxValue(data);
                                });
                                ;
                            }
                            if (workTypeTime) {
                                var comboData = ko.toJS(workTypeTime.data);
                                fetch.get_cb_data({
                                    comboBoxType: comboData.item.referenceType,
                                    categoryId: comboData.categoryId,
                                    required: comboData.required,
                                    standardDate: startDate,
                                    typeCode: undefined,
                                    masterType: comboData.item.masterType,
                                    employeeId: empId,
                                    cps002: true,
                                    workplaceId: wokPlace,
                                    baseDate: moment.utc(realBaseDate).toDate()
                                }).done(function (data) {
                                    workTypeTime.data.lstComboBoxValue(data);
                                });
                                ;
                            }
                        });
                    };
                    if (CS00017_IS00084 && (CS00020_IS00130 || CS00020_IS00131)) {
                        CS00017_IS00084.data.value.subscribe(function (wc) {
                            getComboData();
                        });
                    }
                    if (CS00020_IS00119) {
                        CS00020_IS00119.data.value.subscribe(function (x) {
                            getComboData();
                        });
                    }
                    if (CS00070_IS00781) {
                        CS00070_IS00781.data.value.subscribe(function (x) {
                            getComboData();
                        });
                    }
                };
                // 次回年休付与情報を取得する
                this.grantInformation = function () {
                    var self = _this, finder = self.finder, CS00024_IS00279 = finder.find('CS00024', 'IS00279'), CS00024_IS00280 = finder.find('CS00024', 'IS00280'), CS00024_IS00281 = finder.find('CS00024', 'IS00281'), CS00024_IS00282 = finder.find('CS00024', 'IS00282'), CS00024_IS00283 = finder.find('CS00024', 'IS00283'), CS00003_IS00020 = finder.find('CS00003', 'IS00020'), CS00003_IS00021 = finder.find('CS00003', 'IS00021'), CS00020_IS00119 = finder.find('CS00020', 'IS00119'), CS00020_IS00120 = finder.find('CS00020', 'IS00120'), CS00020_IS00253 = finder.find('CS00020', 'IS00253');
                    if (CS00024_IS00279 &&
                        CS00024_IS00280) {
                        CS00024_IS00279.data.value.subscribe(function (x) {
                            var employeeId = ko.toJS((((__viewContext || {}).viewModel || {}).employee || {}).employeeId), standardDate = ko.toJS(CS00024_IS00279.data.value), grantTable = ko.toJS(CS00024_IS00280.data.value), hireDate = CS00003_IS00020 ? ko.toJS(CS00003_IS00020.data.value) : null, startWork = CS00020_IS00119 ? ko.toJS(CS00020_IS00119.data.value) : null, endWork = CS00020_IS00120 ? ko.toJS(CS00020_IS00120.data.value) : null, conTime = CS00020_IS00253 ? ko.toJS(CS00020_IS00253.data.value) : null;
                            if (!x || !grantTable) {
                                if (CS00024_IS00281) {
                                    CS00024_IS00281.data.value('');
                                }
                                if (CS00024_IS00282) {
                                    CS00024_IS00282.data.value('');
                                }
                                if (CS00024_IS00283) {
                                    CS00024_IS00283.data.value('');
                                }
                                return;
                            }
                            // If input date out of range
                            if (!moment.utc(x)._isValid || moment.utc(x).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                || moment.utc(x).diff(moment.utc('9999/12/31'), 'days', true) > 0) {
                                return;
                            }
                            if (location.href.indexOf('/view/cps/002') > -1) {
                                hireDate = __viewContext.viewModel.currentEmployee().hireDate();
                                startWork = CS00020_IS00119 ? ko.toJS(CS00020_IS00119.data.value) : hireDate;
                                endWork = '9999/12/31';
                                conTime = CS00020_IS00253 ? ko.toJS(CS00020_IS00253.data.value) : 0;
                            }
                            var conTimePrimi = CS00020_IS00253 ? __viewContext.primitiveValueConstraints[CS00020_IS00253.data.constraint] : null;
                            // Value is not match with primitive
                            if ((conTime && isNaN(conTime) || (conTime && (conTime < conTimePrimi.min || conTime > conTimePrimi.max)))) {
                                return;
                            }
                            // If input date out of range
                            if (hireDate && (!moment.utc(hireDate)._isValid || moment.utc(hireDate).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                || moment.utc(hireDate).diff(moment.utc('9999/12/31'), 'days', true)) > 0) {
                                return;
                            }
                            // If input date out of range
                            if (startWork && (!moment.utc(startWork)._isValid || moment.utc(startWork).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                || moment.utc(startWork).diff(moment.utc('9999/12/31'), 'days', true)) > 0) {
                                return;
                            }
                            if (endWork && (!moment.utc(endWork)._isValid || moment.utc(endWork).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                || moment.utc(endWork).diff(moment.utc('9999/12/31'), 'days', true)) > 0) {
                                return;
                            }
                            fetch.get_ro_data({
                                employeeId: employeeId,
                                standardDate: moment.utc(standardDate).format('YYYY/MM/DD'),
                                grantTable: grantTable,
                                entryDate: moment.utc(hireDate).toDate(),
                                startWorkCond: moment.utc(startWork).toDate(),
                                endWorkCond: moment.utc(endWork).toDate(),
                                contactTime: conTime
                            }).done(function (result) {
                                if (CS00024_IS00281) {
                                    CS00024_IS00281.data.value(result.nextTimeGrantDate);
                                }
                                if (CS00024_IS00282) {
                                    CS00024_IS00282.data.value(result.nextTimeGrantDays);
                                }
                                if (CS00024_IS00283) {
                                    CS00024_IS00283.data.value(result.nextTimeMaxTime);
                                }
                            });
                        });
                        CS00024_IS00280.data.value.subscribe(function (x) { return CS00024_IS00279.data.value.valueHasMutated(); });
                        CS00024_IS00280.data.value.valueHasMutated();
                        if (CS00003_IS00020) {
                            CS00003_IS00020.data.value.subscribe(function (x) { return CS00024_IS00279.data.value.valueHasMutated(); });
                        }
                        if (CS00020_IS00119) {
                            CS00020_IS00119.data.value.subscribe(function (x) { return CS00024_IS00279.data.value.valueHasMutated(); });
                        }
                        if (CS00020_IS00253) {
                            CS00020_IS00253.data.value.subscribe(function (x) { return CS00024_IS00279.data.value.valueHasMutated(); });
                        }
                    }
                };
                // 次回年休付与情報を取得する
                /*annLeaGrantRemnNum = () => {
                    let self = this,
                        finder: IFinder = self.finder,
                        CS00037_IS00385: IFindData = finder.find('CS00037', 'IS00385'),
                        CS00037_IS00386: IFindData = finder.find('CS00037', 'IS00386'),
                        CS00037_IS00390: IFindData = finder.find('CS00037', 'IS00390'),
                        CS00037_IS00391: IFindData = finder.find('CS00037', 'IS00391'),
                        CS00037_IS00393: IFindData = finder.find('CS00037', 'IS00393'),
                        CS00037_IS00394: IFindData = finder.find('CS00037', 'IS00394'),
                        CS00037_IS00396: IFindData = finder.find('CS00037', 'IS00396'),
                        CS00037_IS00397: IFindData = finder.find('CS00037', 'IS00397'),
                        validate = () => {
                            let v390 = ko.toJS($(CS00037_IS00390.id).val()),
                                v391 = ko.toJS($(CS00037_IS00391.id).val()),
                                v393 = ko.toJS($(CS00037_IS00393.id).val()),
                                v394 = ko.toJS($(CS00037_IS00394.id).val()),
                                v396 = ko.toJS($(CS00037_IS00396.id).val()),
                                v397 = ko.toJS($(CS00037_IS00397.id).val());
        
                            // change require of control
                            if (v390 || v391 || v393 || v394 || v396 || v397) {
                                CS00037_IS00385.data.required(true);
                                CS00037_IS00386.data.required(true);
                                CS00037_IS00390.data.required(true);
                                CS00037_IS00391.data.required(true);
                                CS00037_IS00393.data.required(true);
                                CS00037_IS00394.data.required(true);
                                CS00037_IS00396.data.required(true);
                                CS00037_IS00397.data.required(true);
                            } else {
                                CS00037_IS00385.data.required(false);
                                CS00037_IS00386.data.required(false);
                                CS00037_IS00390.data.required(false);
                                CS00037_IS00391.data.required(false);
                                CS00037_IS00393.data.required(false);
                                CS00037_IS00394.data.required(false);
                                CS00037_IS00396.data.required(false);
                                CS00037_IS00397.data.required(false);
                            }
        
                            // validate again;
                            $(CS00037_IS00390.id).trigger('change');
                            $(CS00037_IS00391.id).trigger('change');
                            $(CS00037_IS00393.id).trigger('change');
                            $(CS00037_IS00394.id).trigger('change');
                            $(CS00037_IS00396.id).trigger('change');
                            $(CS00037_IS00397.id).trigger('change');
        
                        };
        
        
                    $(CS00037_IS00390.id).on('change', () => {
                        validate();
                    }).trigger('change');
        
                    $(CS00037_IS00391.id).on('change', () => {
                        validate();
                    }).trigger('change');
        
                    $(CS00037_IS00393.id).on('change', () => {
                        validate();
                    }).trigger('change');
        
                    $(CS00037_IS00394.id).on('change', () => {
                        validate();
                    }).trigger('change');
        
                    $(CS00037_IS00396.id).on('change', () => {
                        validate();
                    }).trigger('change');
        
                    $(CS00037_IS00397.id).on('change', () => {
                        validate();
                    }).trigger('change');
                } */
                this.specialLeaveInformation = function () {
                    var self = _this, finder = self.finder, specialLeaInfos = [{
                            ctgCode: 'CS00025',
                            inpCode: 'IS00295',
                            mana: 'IS00296',
                            comboboxCode: 'IS00297',
                            inpGrantDay: 'IS00298',
                            comboGrantTbl: 'IS00299',
                            result: 'IS00300',
                            specialCd: 1
                        }, {
                            ctgCode: 'CS00026',
                            inpCode: 'IS00302',
                            mana: 'IS00303',
                            comboboxCode: 'IS00304',
                            inpGrantDay: 'IS00305',
                            comboGrantTbl: 'IS00306',
                            result: 'IS00307',
                            specialCd: 2
                        }, {
                            ctgCode: 'CS00027',
                            inpCode: 'IS00309',
                            mana: 'IS00310',
                            comboboxCode: 'IS00311',
                            inpGrantDay: 'IS00312',
                            comboGrantTbl: 'IS00313',
                            result: 'IS00314',
                            specialCd: 3
                        }, {
                            ctgCode: 'CS00028',
                            inpCode: 'IS00316',
                            mana: 'IS00317',
                            comboboxCode: 'IS00318',
                            inpGrantDay: 'IS00319',
                            comboGrantTbl: 'IS00320',
                            result: 'IS00321',
                            specialCd: 4
                        }, {
                            ctgCode: 'CS00029',
                            inpCode: 'IS00323',
                            mana: 'IS00324',
                            comboboxCode: 'IS00325',
                            inpGrantDay: 'IS00326',
                            comboGrantTbl: 'IS00327',
                            result: 'IS00328',
                            specialCd: 5
                        }, {
                            ctgCode: 'CS00030',
                            inpCode: 'IS00330',
                            mana: 'IS00331',
                            comboboxCode: 'IS00332',
                            inpGrantDay: 'IS00333',
                            comboGrantTbl: 'IS00334',
                            result: 'IS00335',
                            specialCd: 6
                        }, {
                            ctgCode: 'CS00031',
                            inpCode: 'IS00337',
                            mana: 'IS00338',
                            comboboxCode: 'IS00339',
                            inpGrantDay: 'IS00340',
                            comboGrantTbl: 'IS00341',
                            result: 'IS00342',
                            specialCd: 7
                        }, {
                            ctgCode: 'CS00032',
                            inpCode: 'IS00344',
                            mana: 'IS00345',
                            comboboxCode: 'IS00346',
                            inpGrantDay: 'IS00347',
                            comboGrantTbl: 'IS00348',
                            result: 'IS00349',
                            specialCd: 8
                        }, {
                            ctgCode: 'CS00033',
                            inpCode: 'IS00351',
                            mana: 'IS00352',
                            comboboxCode: 'IS00353',
                            inpGrantDay: 'IS00354',
                            comboGrantTbl: 'IS00355',
                            result: 'IS00356',
                            specialCd: 9
                        }, {
                            ctgCode: 'CS00034',
                            inpCode: 'IS00358',
                            mana: 'IS00359',
                            comboboxCode: 'IS00360',
                            inpGrantDay: 'IS00361',
                            comboGrantTbl: 'IS00362',
                            result: 'IS00363',
                            specialCd: 10
                        }, {
                            ctgCode: 'CS00049',
                            inpCode: 'IS00559',
                            mana: 'IS00560',
                            comboboxCode: 'IS00561',
                            inpGrantDay: 'IS00562',
                            comboGrantTbl: 'IS00563',
                            result: 'IS00564',
                            specialCd: 11
                        }, {
                            ctgCode: 'CS00050',
                            inpCode: 'IS00566',
                            mana: 'IS00567',
                            comboboxCode: 'IS00568',
                            inpGrantDay: 'IS00569',
                            comboGrantTbl: 'IS00570',
                            result: 'IS00571',
                            specialCd: 12
                        }, {
                            ctgCode: 'CS00051',
                            inpCode: 'IS00573',
                            mana: 'IS00574',
                            comboboxCode: 'IS00575',
                            inpGrantDay: 'IS00576',
                            comboGrantTbl: 'IS00577',
                            result: 'IS00578',
                            specialCd: 13
                        }, {
                            ctgCode: 'CS00052',
                            inpCode: 'IS00580',
                            mana: 'IS00581',
                            comboboxCode: 'IS00582',
                            inpGrantDay: 'IS00583',
                            comboGrantTbl: 'IS00584',
                            result: 'IS00585',
                            specialCd: 14
                        }, {
                            ctgCode: 'CS00053',
                            inpCode: 'IS00587',
                            mana: 'IS00588',
                            comboboxCode: 'IS00589',
                            inpGrantDay: 'IS00590',
                            comboGrantTbl: 'IS00591',
                            result: 'IS00592',
                            specialCd: 15
                        }, {
                            ctgCode: 'CS00054',
                            inpCode: 'IS00594',
                            mana: 'IS00595',
                            comboboxCode: 'IS00596',
                            inpGrantDay: 'IS00597',
                            comboGrantTbl: 'IS00598',
                            result: 'IS00599',
                            specialCd: 16
                        }, {
                            ctgCode: 'CS00055',
                            inpCode: 'IS00601',
                            mana: 'IS00602',
                            comboboxCode: 'IS00603',
                            inpGrantDay: 'IS00604',
                            comboGrantTbl: 'IS00605',
                            result: 'IS00606',
                            specialCd: 17
                        }, {
                            ctgCode: 'CS00056',
                            inpCode: 'IS00608',
                            mana: 'IS00609',
                            comboboxCode: 'IS00610',
                            inpGrantDay: 'IS00611',
                            comboGrantTbl: 'IS00612',
                            result: 'IS00613',
                            specialCd: 18
                        }, {
                            ctgCode: 'CS00057',
                            inpCode: 'IS00615',
                            mana: 'IS00616',
                            comboboxCode: 'IS00617',
                            inpGrantDay: 'IS00618',
                            comboGrantTbl: 'IS00619',
                            result: 'IS00620',
                            specialCd: 19
                        }, {
                            ctgCode: 'CS00058',
                            inpCode: 'IS00622',
                            mana: 'IS00623',
                            comboboxCode: 'IS00624',
                            inpGrantDay: 'IS00625',
                            comboGrantTbl: 'IS00626',
                            result: 'IS00627',
                            specialCd: 20
                        }
                    ], validation = function (specialLeaInfo) {
                        var inp = finder.find(specialLeaInfo.ctgCode, specialLeaInfo.inpCode), cbx = finder.find(specialLeaInfo.ctgCode, specialLeaInfo.comboboxCode), grantDay = finder.find(specialLeaInfo.ctgCode, specialLeaInfo.inpGrantDay), manage = finder.find(specialLeaInfo.ctgCode, specialLeaInfo.mana), grantTbl = finder.find(specialLeaInfo.ctgCode, specialLeaInfo.comboGrantTbl), result = finder.find(specialLeaInfo.ctgCode, specialLeaInfo.result), CS00003_IS00020 = finder.find('CS00003', 'IS00020'), CS00024_IS00279 = finder.find('CS00024', 'IS00279');
                        if (inp && cbx) {
                            inp.data.value.subscribe(function (x) {
                                // obj để get dữ liệu
                                var sid = ko.toJS((((__viewContext || {}).viewModel || {}).employee || {}).employeeId), grantDate = ko.toJS(inp.data.value), appSet = ko.toJS(cbx.data.value), specialLeaveCD = specialLeaInfo.specialCd, grantDays = grantDay ? ko.toJS(grantDay.data.value) : null, grantTbls = grantTbl ? ko.toJS(grantTbl.data.value) : null, management = manage ? ko.toJS(manage.data.value) : null, hireDate = CS00003_IS00020 ? ko.toJS(CS00003_IS00020.data.value) : null, retireDates = null, yearRefDates = CS00024_IS00279 ? ko.toJS(CS00024_IS00279.data.value) : null;
                                if (!x || !appSet || !management || management == '0') {
                                    if (result) {
                                        //result.data.value('');
                                    }
                                    return;
                                }
                                var consGrantDays = grantDay ? __viewContext.primitiveValueConstraints[grantDay.data.constraint] : null;
                                // If input date out of range
                                if (!moment.utc(x)._isValid || moment.utc(x).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                    || moment.utc(x).diff(moment.utc('9999/12/31'), 'days', true) > 0
                                    || (grantDays && isNaN(grantDays) || (grantDays && (grantDays < consGrantDays.min || grantDays > consGrantDays.max)))) {
                                    return;
                                }
                                if (hireDate && (!moment.utc(hireDate)._isValid || moment.utc(hireDate).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                    || moment.utc(hireDate).diff(moment.utc('9999/12/31'), 'days', true)) > 0) {
                                    return;
                                }
                                if (yearRefDates && (!moment.utc(yearRefDates)._isValid || moment.utc(yearRefDates).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                    || moment.utc(yearRefDates).diff(moment.utc('9999/12/31'), 'days', true)) > 0) {
                                    return;
                                }
                                if (location.href.indexOf('/view/cps/002') > -1) {
                                    hireDate = __viewContext.viewModel.currentEmployee().hireDate();
                                }
                                fetch.get_sphd_nextGrantDate({
                                    sid: sid,
                                    grantDate: moment.utc(grantDate).toDate(),
                                    spLeaveCD: specialLeaveCD,
                                    appSet: appSet,
                                    grantDays: grantDays,
                                    grantTable: grantTbls,
                                    entryDate: moment.utc(hireDate).toDate(),
                                    yearRefDate: moment.utc(yearRefDates).toDate()
                                }).done(function (res) {
                                    if (!result) {
                                        return;
                                    }
                                    if (res) {
                                        var x_1 = moment.utc(ko.toJS(res));
                                        if (x_1._isValid)
                                            result.data.value(x_1.format('YYYY/MM/DD'));
                                        else
                                            result.data.value('');
                                    }
                                    else {
                                        result.data.value('');
                                    }
                                });
                            });
                            cbx.data.value.subscribe(function (x) { return inp.data.value.valueHasMutated(); });
                            if (manage) {
                                manage.data.value.subscribe(function (x) { return inp.data.value.valueHasMutated(); });
                            }
                            if (grantDay) {
                                grantDay.data.value.subscribe(function (x) {
                                    return inp.data.value.valueHasMutated();
                                });
                            }
                            if (grantTbl) {
                                grantTbl.data.value.subscribe(function (x) { return inp.data.value.valueHasMutated(); });
                            }
                            if (CS00003_IS00020) {
                                CS00003_IS00020.data.value.subscribe(function (x) { return inp.data.value.valueHasMutated(); });
                            }
                            if (CS00024_IS00279) {
                                CS00024_IS00279.data.value.subscribe(function (x) { return inp.data.value.valueHasMutated(); });
                            }
                            inp.data.value.valueHasMutated();
                        }
                    };
                    _(specialLeaInfos).each(function (specialLeaInfo) { return validation(specialLeaInfo); });
                };
                // getHealInsStandCompMonth
                this.getHealInsStandCompMonth = function () {
                    var self = _this, finder = self.finder, healInsStandMonInfos = [{
                            ctgCode: 'CS00092',
                            startYM: 'IS01016',
                            healInsGrade: 'IS01020',
                            healInsStandMonthlyRemune: 'IS01021',
                            pensionInsGrade: 'IS01022',
                            pensionInsStandCompenMonthly: 'IS01023'
                        }
                    ], validation = function (healInsStandMonInfo) {
                        var healInsGrade = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.healInsGrade), startYM = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.startYM), pensionInsGrade = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.pensionInsGrade), pensionInsStandCompenMonthly = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.pensionInsStandCompenMonthly), healInsStandMonthlyRemune = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.healInsStandMonthlyRemune);
                        if (healInsGrade) {
                            $(healInsGrade.id).on('blur', function () {
                                // healInsGrade.data.value.subscribe(x => {
                                if (!moment.utc(startYM)._isValid
                                    || moment.utc(ko.toJS(moment.utc(startYM.data.value(), "YYYYMMDD").toDate())).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                    || moment.utc(ko.toJS(moment.utc(startYM.data.value(), "YYYYMMDD").toDate())).diff(moment.utc('9999/12/31'), 'days', true) > 0) {
                                    return;
                                }
                                // obj để get dữ liệu
                                var sid = ko.toJS((((__viewContext || {}).viewModel || {}).employee || {}).employeeId), 
                                // IS01016
                                startYMParam = ko.toJS(startYM.data.value), 
                                // IS01020
                                healInsGradeParam = healInsGrade ? ko.toJS(healInsGrade.data.value) : null, 
                                // IS01021
                                healInsStandMonthlyRemuneParam = healInsStandMonthlyRemune ? ko.toJS(healInsStandMonthlyRemune.data.value) : null, 
                                // IS01022
                                pensionInsGradeParam = pensionInsGrade ? ko.toJS(pensionInsGrade.data.value) : null, 
                                // IS01023
                                pensionInsStandCompenMonthlyParam = pensionInsStandCompenMonthly ? ko.toJS(pensionInsStandCompenMonthly.data.value) : null;
                                fetch.getHealInsStandCompMonth({
                                    sid: sid,
                                    startYM: moment.utc(startYMParam, "YYYYMMDD").toDate(),
                                    healInsGrade: healInsGradeParam,
                                    healInsStandMonthlyRemune: healInsStandMonthlyRemuneParam,
                                    pensionInsGrade: pensionInsGradeParam,
                                    pensionInsStandCompenMonthly: pensionInsStandCompenMonthlyParam
                                }).done(function (res) {
                                    if (healInsStandMonthlyRemune) {
                                        if (res) {
                                            healInsStandMonthlyRemune.data.value(res);
                                        }
                                        else {
                                            healInsStandMonthlyRemune.data.value('');
                                        }
                                    }
                                });
                            });
                            //healInsGrade.data.value.valueHasMutated();
                        }
                    };
                    _(healInsStandMonInfos).each(function (healInsStandMonInfo) { return validation(healInsStandMonInfo); });
                };
                // getHealthInsuranceStandardGradePerMonth
                this.getHealthInsuranceStandardGradePerMonth = function () {
                    var self = _this, finder = self.finder, healInsStandMonInfos = [{
                            ctgCode: 'CS00092',
                            startYM: 'IS01016',
                            healInsGrade: 'IS01020',
                            healInsStandMonthlyRemune: 'IS01021',
                            pensionInsGrade: 'IS01022',
                            pensionInsStandCompenMonthly: 'IS01023'
                        }
                    ], validation = function (healInsStandMonInfo) {
                        var healInsGrade = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.healInsGrade), startYM = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.startYM), pensionInsGrade = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.pensionInsGrade), pensionInsStandCompenMonthly = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.pensionInsStandCompenMonthly), healInsStandMonthlyRemune = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.healInsStandMonthlyRemune);
                        if (healInsStandMonthlyRemune) {
                            $(healInsStandMonthlyRemune.id).on('blur', function () {
                                // healInsStandMonthlyRemune.data.value.subscribe(x => {
                                if (!moment.utc(startYM)._isValid
                                    || moment.utc(ko.toJS(moment.utc(startYM.data.value(), "YYYYMMDD").toDate())).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                    || moment.utc(ko.toJS(moment.utc(startYM.data.value(), "YYYYMMDD").toDate())).diff(moment.utc('9999/12/31'), 'days', true) > 0) {
                                    return;
                                }
                                // obj để get dữ liệu
                                var sid = ko.toJS((((__viewContext || {}).viewModel || {}).employee || {}).employeeId), 
                                // IS01016
                                startYMParam = ko.toJS(startYM.data.value), 
                                // IS01020
                                healInsGradeParam = healInsGrade ? ko.toJS(healInsGrade.data.value) : null, 
                                // IS01021
                                healInsStandMonthlyRemuneParam = healInsStandMonthlyRemune ? ko.toJS(healInsStandMonthlyRemune.data.value) : null, 
                                // IS01022
                                pensionInsGradeParam = pensionInsGrade ? ko.toJS(pensionInsGrade.data.value) : null, 
                                // IS01023
                                pensionInsStandCompenMonthlyParam = pensionInsStandCompenMonthly ? ko.toJS(pensionInsStandCompenMonthly.data.value) : null;
                                fetch.getHealthInsuranceStandardGradePerMonth({
                                    sid: sid,
                                    startYM: moment.utc(startYMParam, "YYYYMMDD").toDate(),
                                    healInsGrade: healInsGradeParam,
                                    healInsStandMonthlyRemune: healInsStandMonthlyRemuneParam,
                                    pensionInsGrade: pensionInsGradeParam,
                                    pensionInsStandCompenMonthly: pensionInsStandCompenMonthlyParam
                                }).done(function (res) {
                                    if (res) {
                                        if (healInsGrade) {
                                            healInsGrade.data.value(res.healthInsuranceGrade);
                                        }
                                        healInsStandMonthlyRemune.data.value(res.standardMonthlyFee);
                                    }
                                    else {
                                        if (healInsGrade) {
                                            healInsGrade.data.value('');
                                        }
                                        healInsStandMonthlyRemune.data.value('');
                                    }
                                });
                            });
                            //healInsStandMonthlyRemune.data.value.valueHasMutated();
                        }
                    };
                    _(healInsStandMonInfos).each(function (healInsStandMonInfo) { return validation(healInsStandMonInfo); });
                };
                // getMonthlyPensionInsStandardRemuneration
                this.getMonthlyPensionInsStandardRemuneration = function () {
                    var self = _this, finder = self.finder, healInsStandMonInfos = [{
                            ctgCode: 'CS00092',
                            startYM: 'IS01016',
                            healInsGrade: 'IS01020',
                            healInsStandMonthlyRemune: 'IS01021',
                            pensionInsGrade: 'IS01022',
                            pensionInsStandCompenMonthly: 'IS01023'
                        }
                    ], validation = function (healInsStandMonInfo) {
                        var healInsGrade = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.healInsGrade), startYM = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.startYM), pensionInsGrade = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.pensionInsGrade), pensionInsStandCompenMonthly = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.pensionInsStandCompenMonthly), healInsStandMonthlyRemune = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.healInsStandMonthlyRemune);
                        if (pensionInsGrade) {
                            $(pensionInsGrade.id).on('blur', function () {
                                // pensionInsGrade.data.value.subscribe(x => {
                                if (!moment.utc(startYM)._isValid
                                    || moment.utc(ko.toJS(moment.utc(startYM.data.value(), "YYYYMMDD").toDate())).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                    || moment.utc(ko.toJS(moment.utc(startYM.data.value(), "YYYYMMDD").toDate())).diff(moment.utc('9999/12/31'), 'days', true) > 0) {
                                    return;
                                }
                                // obj để get dữ liệu
                                var sid = ko.toJS((((__viewContext || {}).viewModel || {}).employee || {}).employeeId), 
                                // IS01016
                                startYMParam = ko.toJS(startYM.data.value), 
                                // IS01020
                                healInsGradeParam = healInsGrade ? ko.toJS(healInsGrade.data.value) : null, 
                                // IS01021
                                healInsStandMonthlyRemuneParam = healInsStandMonthlyRemune ? ko.toJS(healInsStandMonthlyRemune.data.value) : null, 
                                // IS01022
                                pensionInsGradeParam = pensionInsGrade ? ko.toJS(pensionInsGrade.data.value) : null, 
                                // IS01023
                                pensionInsStandCompenMonthlyParam = pensionInsStandCompenMonthly ? ko.toJS(pensionInsStandCompenMonthly.data.value) : null;
                                fetch.getMonthlyPensionInsStandardRemuneration({
                                    sid: sid,
                                    startYM: moment.utc(startYMParam, "YYYYMMDD").toDate(),
                                    healInsGrade: healInsGradeParam,
                                    healInsStandMonthlyRemune: healInsStandMonthlyRemuneParam,
                                    pensionInsGrade: pensionInsGradeParam,
                                    pensionInsStandCompenMonthly: pensionInsStandCompenMonthlyParam
                                }).done(function (res) {
                                    if (pensionInsStandCompenMonthly) {
                                        if (res) {
                                            pensionInsStandCompenMonthly.data.value(res);
                                        }
                                        else {
                                            pensionInsStandCompenMonthly.data.value('');
                                        }
                                    }
                                });
                            });
                            //pensionInsGrade.data.value.valueHasMutated();
                        }
                    };
                    _(healInsStandMonInfos).each(function (healInsStandMonInfo) { return validation(healInsStandMonInfo); });
                };
                // getWelfarePensionStandardGradePerMonth
                this.getWelfarePensionStandardGradePerMonth = function () {
                    var self = _this, finder = self.finder, healInsStandMonInfos = [{
                            ctgCode: 'CS00092',
                            startYM: 'IS01016',
                            healInsGrade: 'IS01020',
                            healInsStandMonthlyRemune: 'IS01021',
                            pensionInsGrade: 'IS01022',
                            pensionInsStandCompenMonthly: 'IS01023'
                        }
                    ], validation = function (healInsStandMonInfo) {
                        var healInsGrade = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.healInsGrade), startYM = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.startYM), pensionInsGrade = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.pensionInsGrade), pensionInsStandCompenMonthly = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.pensionInsStandCompenMonthly), healInsStandMonthlyRemune = finder.find(healInsStandMonInfo.ctgCode, healInsStandMonInfo.healInsStandMonthlyRemune);
                        if (pensionInsStandCompenMonthly) {
                            $(pensionInsStandCompenMonthly.id).on('blur', function () {
                                // pensionInsStandCompenMonthly.data.value.subscribe(x => {
                                if (!moment.utc(startYM)._isValid
                                    || moment.utc(ko.toJS(moment.utc(startYM.data.value(), "YYYYMMDD").toDate())).diff(moment.utc('1900/01/01'), 'days', true) < 0
                                    || moment.utc(ko.toJS(moment.utc(startYM.data.value(), "YYYYMMDD").toDate())).diff(moment.utc('9999/12/31'), 'days', true) > 0) {
                                    return;
                                }
                                // obj để get dữ liệu
                                var sid = ko.toJS((((__viewContext || {}).viewModel || {}).employee || {}).employeeId), 
                                // IS01016
                                startYMParam = ko.toJS(startYM.data.value), 
                                // IS01020
                                healInsGradeParam = healInsGrade ? ko.toJS(healInsGrade.data.value) : null, 
                                // IS01021
                                healInsStandMonthlyRemuneParam = healInsStandMonthlyRemune ? ko.toJS(healInsStandMonthlyRemune.data.value) : null, 
                                // IS01022
                                pensionInsGradeParam = pensionInsGrade ? ko.toJS(pensionInsGrade.data.value) : null, 
                                // IS01023
                                pensionInsStandCompenMonthlyParam = pensionInsStandCompenMonthly ? ko.toJS(pensionInsStandCompenMonthly.data.value) : null;
                                fetch.getWelfarePensionStandardGradePerMonth({
                                    sid: sid,
                                    startYM: moment.utc(startYMParam, "YYYYMMDD").toDate(),
                                    healInsGrade: healInsGradeParam,
                                    healInsStandMonthlyRemune: healInsStandMonthlyRemuneParam,
                                    pensionInsGrade: pensionInsGradeParam,
                                    pensionInsStandCompenMonthly: pensionInsStandCompenMonthlyParam
                                }).done(function (res) {
                                    if (res) {
                                        if (pensionInsGrade) {
                                            pensionInsGrade.data.value(res.welfarePensionGrade);
                                        }
                                        pensionInsStandCompenMonthly.data.value(res.standardMonthlyFee);
                                    }
                                    else {
                                        if (pensionInsGrade) {
                                            pensionInsGrade.data.value('');
                                        }
                                        pensionInsStandCompenMonthly.data.value('');
                                    }
                                });
                            });
                            //pensionInsStandCompenMonthly.data.value.valueHasMutated();
                        }
                    };
                    _(healInsStandMonInfos).each(function (healInsStandMonInfo) { return validation(healInsStandMonInfo); });
                };
                this.time_range = function () {
                    var self = _this;
                    _(self.lstCls)
                        .filter(function (c) { return c.items && _.isFunction(c.items); })
                        .filter(function (c) {
                        var items = _.filter(ko.toJS(c.items), function (t) { return t.item && t.item.dataTypeValue; });
                        return _.filter(items, function (t) { return t.item.dataTypeValue == ITEM_SINGLE_TYPE.SEL_BUTTON; }).length == 2
                            && [2, 4].indexOf(_.filter(items, function (t) { return [ITEM_SINGLE_TYPE.TIME, ITEM_SINGLE_TYPE.TIMEPOINT].indexOf(t.item.dataTypeValue) > -1; }).length) > -1;
                    })
                        .map(function (c) { return c.items(); })
                        .map(function (t) { return ({
                        btns: _.filter(t, function (m) { return m.item && m.item.dataTypeValue == ITEM_SINGLE_TYPE.SEL_BUTTON; }),
                        inps: _(t).filter(function (m) { return m.item && [ITEM_SINGLE_TYPE.TIME, ITEM_SINGLE_TYPE.TIMEPOINT].indexOf(m.item.dataTypeValue) > -1; })
                            .groupBy(function (m) { return m.itemParentCode; })
                            .map(function (g) { return g; })
                            .value()
                    }); })
                        .each(function (c) {
                        _.each(c.inps, function (group) {
                            if (c.btns.length == 2 && group.length == 2) {
                                var id1_1 = "#".concat(group[0].itemDefId.replace(/[-_]/gi, '')), id2_1 = "#".concat(group[1].itemDefId.replace(/[-_]/gi, ''));
                                $("".concat(id1_1, ", ").concat(id2_1)).on('blur', function () {
                                    var ctrl1 = $(id1_1), ctrl2 = $(id2_1), hvl = _.filter(c.btns, function (b) { return !!b.value(); }), vl1 = ko.toJS(group[0].value), vl2 = ko.toJS(group[1].value), nnb = !_.isNumber(vl1) && !_.isNumber(vl2);
                                    var tout = setTimeout(function () {
                                        if (hvl && nnb) {
                                            if (!ctrl1.is(':disabled') && !ctrl1.ntsError('hasError')) {
                                                ctrl1.ntsError('set', {
                                                    messageId: "Msg_998",
                                                    messageParams: [
                                                        group[0].itemName,
                                                        group[1].itemName
                                                    ]
                                                });
                                            }
                                            if (!ctrl2.ntsError('hasError')) {
                                                ctrl2.parent().addClass('error');
                                            }
                                        }
                                        else {
                                            rmError(ctrl1, "Msg_435");
                                            if (!ctrl2.ntsError('hasError')) {
                                                ctrl2.parent().removeClass('error');
                                            }
                                        }
                                        clearTimeout(tout);
                                    }, 50);
                                });
                            }
                        });
                    });
                };
                this.haft_int = function () {
                    var self = _this, finder = self.finder, haft_int = [
                        {
                            'ctgCode': 'CS00035',
                            'inpCode': 'IS00366'
                        },
                        {
                            'ctgCode': 'CS00035',
                            'inpCode': 'IS00368'
                        },
                        {
                            'ctgCode': 'CS00035',
                            'inpCode': 'IS00369'
                        },
                        {
                            'ctgCode': 'CS00036',
                            'inpCode': 'IS00377'
                        },
                        {
                            'ctgCode': 'CS00036',
                            'inpCode': 'IS00378'
                        },
                        {
                            'ctgCode': 'CS00036',
                            'inpCode': 'IS00379'
                        },
                        {
                            'ctgCode': 'CS00036',
                            'inpCode': 'IS00382'
                        },
                        {
                            'ctgCode': 'CS00036',
                            'inpCode': 'IS00383'
                        },
                        {
                            'ctgCode': 'CS00036',
                            'inpCode': 'IS00384'
                        }
                    ], validation = function (haft) {
                        var ctrl = finder.find(haft.ctgCode, haft.inpCode);
                        if (ctrl) {
                            (((__viewContext || {}).primitiveValueConstraints || {})[ctrl.id.replace(/#/g, '')] || {}).valueType = "HalfInt";
                        }
                    };
                    _.each(haft_int, function (h) { return validation(h); });
                };
                this.card_no = function () {
                    var self = _this, finder = self.finder, ctrls = finder.finds("CS00069", undefined), empId = ko.toJS((((__viewContext || {}).viewModel || {}).employee || {}).employeeId), is_self = empId && ((__viewContext || {}).user || {}).employeeId == empId;
                    if (!!ctrls) {
                        var categoryId = ((ctrls[0] || {}).data || {}).categoryId;
                        if (categoryId) {
                            fetch.get_stc_setting().done(function (stt) {
                                var _bind = $(document).data('_nts_bind') || {};
                                if (!_bind["TIME_CARD_VALIDATE"]) {
                                    _bind["TIME_CARD_VALIDATE"] = true;
                                    $(document).data('_nts_bind', _bind);
                                    $(document)
                                        .on('change', "[id=".concat(ctrls[0].id.replace(/#/g, ''), "]"), function (event) {
                                        var $ipc = $(event.target), value = $ipc.val(), len = value.length;
                                        if (!!nts.uk.text.allHalfAlphanumeric(value).probe) {
                                            if (value && len < stt.digitsNumber) {
                                                switch (stt.method) {
                                                    case EDIT_METHOD.PreviousZero:
                                                        $ipc.val(_.padStart(value, stt.digitsNumber, '0'));
                                                        break;
                                                    case EDIT_METHOD.AfterZero:
                                                        $ipc.val(_.padEnd(value, stt.digitsNumber, '0'));
                                                        break;
                                                    case EDIT_METHOD.PreviousSpace:
                                                        $ipc.val(_.padStart(value, stt.digitsNumber, ' '));
                                                        break;
                                                    case EDIT_METHOD.AfterSpace:
                                                        $ipc.val(_.padEnd(value, stt.digitsNumber, ' '));
                                                        break;
                                                }
                                                $ipc.trigger('change');
                                            }
                                        }
                                    });
                                }
                            });
                            fetch.perm((__viewContext || {}).user.role.personalInfo, categoryId).done(function (perm) {
                                if (perm) {
                                    var remove = _.find(ctrls, function (c) { return c.data.recordId && c.data.recordId.indexOf("NID_") > -1; });
                                    if (is_self) {
                                        if (!perm.selfAllowAddMulti && remove) {
                                            if (!ctrls[0].data.recordId) {
                                                _.each(ctrls, function (c) {
                                                    if (ko.isObservable(c.data.editable)) {
                                                        c.data.editable(false);
                                                    }
                                                });
                                            }
                                            else {
                                                finder.remove(remove.data);
                                            }
                                        }
                                        _.each(ctrls, function (c) {
                                            if (ko.isObservable(c.data.checkable)) {
                                                c.data.checkable(!!perm.selfAllowDelMulti);
                                            }
                                        });
                                    }
                                    else {
                                        if (!perm.otherAllowAddMulti && remove) {
                                            if (!ctrls[0].data.recordId) {
                                                _.each(ctrls, function (c) {
                                                    if (ko.isObservable(c.data.editable)) {
                                                        c.data.editable(false);
                                                    }
                                                });
                                            }
                                            else {
                                                finder.remove(remove.data);
                                            }
                                        }
                                        _.each(ctrls, function (c) {
                                            if ((c.data.recordId || '').indexOf("NID_") == -1) {
                                                if (ko.isObservable(c.data.checkable)) {
                                                    c.data.checkable(!!perm.otherAllowDelMulti);
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                };
                var self = this;
                self.finder = new constraint(lstCls);
                var tout = setTimeout(function () {
                    self.textBox();
                    self.radio();
                    self.button();
                    self.combobox();
                    self.grand_combobox();
                    self.grand_radio();
                    //self.relate_radio();
                    self.relate_button();
                    self.remain_day();
                    self.dateTime();
                    self.setTable();
                    self.grantInformation();
                    self.specialLeaveInformation();
                    self.getHealInsStandCompMonth();
                    self.getHealthInsuranceStandardGradePerMonth();
                    self.getMonthlyPensionInsStandardRemuneration();
                    self.getWelfarePensionStandardGradePerMonth();
                    self.time_range();
                    self.haft_int();
                    self.card_no();
                    self.CS00070Validate();
                    // self.annLeaGrantRemnNum();
                    layout.validate.initCheckError(lstCls);
                    clearTimeout(tout);
                }, 50);
            }
            validation.prototype.CS00070Validate = function () {
                var self = this, finder = self.finder, CS00020IS00119 = finder.find('CS00020', 'IS00119'), CS00020IS00120 = finder.find('CS00020', 'IS00120'), CS00070IS00781 = finder.find('CS00070', 'IS00781'), CS00070IS00782 = finder.find('CS00070', 'IS00782');
                if (CS00070IS00781) {
                    fetch.get_cats(false).done(function (cats) {
                        var cat = _(cats.categoryList).find(function (c) { return _.isEqual(c.categoryCode, 'CS00020'); }) || {};
                        // update categoryName
                        CS00070IS00781.data.resourceParams([cat.categoryName]);
                        CS00070IS00781.data.resourceId.valueHasMutated();
                    });
                    CS00070IS00781.data.editable(false);
                    if (CS00020IS00119) {
                        CS00020IS00119.data.value.subscribe(function (v) {
                            CS00070IS00781.data.value(v);
                        });
                        CS00020IS00119.data.value.valueHasMutated();
                    }
                }
                if (CS00070IS00782) {
                    CS00070IS00782.data.editable(false);
                    if (CS00020IS00120) {
                        CS00020IS00120.data.value.subscribe(function (v) {
                            CS00070IS00782.data.value(v);
                        });
                        CS00020IS00119.data.value.valueHasMutated();
                    }
                }
            };
            return validation;
        }());
        layout.validation = validation;
        var ITEM_SINGLE_TYPE;
        (function (ITEM_SINGLE_TYPE) {
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["STRING"] = 1] = "STRING";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["NUMERIC"] = 2] = "NUMERIC";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["DATE"] = 3] = "DATE";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["TIME"] = 4] = "TIME";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["TIMEPOINT"] = 5] = "TIMEPOINT";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SELECTION"] = 6] = "SELECTION";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SEL_RADIO"] = 7] = "SEL_RADIO";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["SEL_BUTTON"] = 8] = "SEL_BUTTON";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["READONLY"] = 9] = "READONLY";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["RELATE_CATEGORY"] = 10] = "RELATE_CATEGORY";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["NUMBERIC_BUTTON"] = 11] = "NUMBERIC_BUTTON";
            ITEM_SINGLE_TYPE[ITEM_SINGLE_TYPE["READONLY_BUTTON"] = 12] = "READONLY_BUTTON";
        })(ITEM_SINGLE_TYPE || (ITEM_SINGLE_TYPE = {}));
        // define ITEM_CLASSIFICATION_TYPE
        var IT_CLA_TYPE;
        (function (IT_CLA_TYPE) {
            IT_CLA_TYPE[IT_CLA_TYPE["ITEM"] = "ITEM"] = "ITEM";
            IT_CLA_TYPE[IT_CLA_TYPE["LIST"] = "LIST"] = "LIST";
            IT_CLA_TYPE[IT_CLA_TYPE["SPER"] = "SeparatorLine"] = "SPER"; // line item
        })(IT_CLA_TYPE || (IT_CLA_TYPE = {}));
        var ITEM_TYPE;
        (function (ITEM_TYPE) {
            ITEM_TYPE[ITEM_TYPE["SET"] = 1] = "SET";
            ITEM_TYPE[ITEM_TYPE["SINGLE"] = 2] = "SINGLE";
            ITEM_TYPE[ITEM_TYPE["SET_TABLE"] = 3] = "SET_TABLE";
        })(ITEM_TYPE || (ITEM_TYPE = {}));
        var EDIT_METHOD;
        (function (EDIT_METHOD) {
            EDIT_METHOD[EDIT_METHOD["PreviousZero"] = 1] = "PreviousZero";
            EDIT_METHOD[EDIT_METHOD["AfterZero"] = 2] = "AfterZero";
            EDIT_METHOD[EDIT_METHOD["PreviousSpace"] = 3] = "PreviousSpace";
            EDIT_METHOD[EDIT_METHOD["AfterSpace"] = 4] = "AfterSpace";
        })(EDIT_METHOD || (EDIT_METHOD = {}));
    })(layout = nts.layout || (nts.layout = {}));
})(nts || (nts = {}));
//# sourceMappingURL=layout-control-validation.js.map