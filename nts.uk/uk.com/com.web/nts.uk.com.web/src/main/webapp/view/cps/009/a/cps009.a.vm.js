// blockui all ajax request on layout
//    $(document)
//        .ajaxStart(() => {
//            $.blockUI({
//                message: null,
//                overlayCSS: { opacity: 0.1 }
//            });
//        }).ajaxStop(() => {
//            $.unblockUI();
//        });
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cps009;
                (function (cps009) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var error = nts.uk.ui.errors;
                            var text = nts.uk.resource.getText;
                            var dialog = nts.uk.ui.dialog;
                            var getShared = nts.uk.ui.windows.getShared;
                            var setShared = nts.uk.ui.windows.setShared;
                            var block = nts.uk.ui.block;
                            var modal = nts.uk.ui.windows.sub.modal;
                            var confirm = nts.uk.ui.dialog.confirm;
                            var formatDate = nts.uk.time.formatDate;
                            var validation = validationcps009;
                            var primitiveConst = CPS009Constraint.primitiveConst;
                            var ViewModel = /** @class */ (function () {
                                function ViewModel() {
                                    this.initValSettingLst = ko.observableArray([]);
                                    this.initValueList = ko.observableArray([]);
                                    this.initSettingId = ko.observable('');
                                    this.isUpdate = false;
                                    //History reference date
                                    this.baseDate = ko.observable(new Date());
                                    this.lstItemFilter = [];
                                    this.ctgIdUpdate = ko.observable(false);
                                    this.currentItemId = ko.observable('');
                                    this.errorList = ko.observableArray([]);
                                    this.dataSourceFilter = [];
                                    this.isFromCPS018 = ko.observable(false);
                                    var self = this;
                                    var params = getShared("CPS009A_PARAMS") || { isFromCPS018: false };
                                    self.isFromCPS018(params.isFromCPS018);
                                    nts.uk.sessionStorage.removeItem(nts.uk.request.STORAGE_KEY_TRANSFER_DATA);
                                    self.initValue();
                                    self.start(undefined);
                                    self.initSettingId.subscribe(function (value) {
                                        error.clearAll();
                                        self.currentCategory().setData({
                                            settingCode: null,
                                            settingName: " ",
                                            ctgList: []
                                        });
                                        self.currentCategory().itemList.removeAll();
                                        if (nts.uk.text.isNullOrEmpty(value))
                                            return;
                                        self.getDetail(value);
                                    });
                                    self.currentItemId.subscribe(function (value) {
                                        nts.uk.ui.errors.clearAll();
                                        if (nts.uk.text.isNullOrEmpty(value))
                                            return;
                                        $('#date1').trigger('validate');
                                        self.getItemList(self.initSettingId(), value);
                                    });
                                    $(window).resize(function () {
                                        var subrightTbodyHeightResize = window.innerHeight - 320;
                                        if (subrightTbodyHeightResize <= 32) {
                                            $('#sub-right>table>tbody').css('max-height', '32px');
                                        }
                                        else {
                                            $('#sub-right>table>tbody').css('max-height', subrightTbodyHeightResize + 'px');
                                        }
                                    }).trigger('resize');
                                }
                                ViewModel.prototype.getDetail = function (value) {
                                    var self = this;
                                    block.grayout();
                                    a.service.getAllCtg(value).done(function (data) {
                                        self.currentCategory().setData({
                                            settingCode: data.settingCode,
                                            settingName: data.settingName,
                                            ctgList: data.ctgList
                                        });
                                        if (!self.ctgIdUpdate()) {
                                            //perInfoCtgId
                                            if (data.ctgList.length > 0) {
                                                self.currentItemId(data.ctgList[0].perInfoCtgId);
                                            }
                                            else {
                                                self.currentItemId(undefined);
                                            }
                                        }
                                        else {
                                            self.ctgIdUpdate(false);
                                        }
                                        self.getItemList(value, self.currentItemId());
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                ViewModel.prototype.getTitleName = function (itemName) {
                                    return ko.computed(function () {
                                        return itemName.length > 5 ? itemName : "";
                                    });
                                };
                                // get item list
                                ViewModel.prototype.getItemList = function (settingId, ctgId) {
                                    var self = this, i = 0, currentCtg;
                                    currentCtg = self.findCtg(self.currentCategory().ctgList(), ctgId);
                                    if (currentCtg === undefined) {
                                        return;
                                    }
                                    self.currentCategory().itemList.removeAll();
                                    block.invisible();
                                    a.service.getAllItemByCtgId(settingId, ctgId, error.hasError() == true ? null : moment(self.baseDate()).format('YYYY-MM-DD')).done(function (item) {
                                        if (item.length > 0) {
                                            var itemConvert_1 = _.map(item, function (obj) {
                                                primitiveConst(obj);
                                                i = i + 1;
                                                return new PerInfoInitValueSettingItemDto({
                                                    categoryType: currentCtg.categoryType,
                                                    indexItem: i,
                                                    fixedItem: obj.fixedItem,
                                                    perInfoItemDefId: obj.perInfoItemDefId,
                                                    settingId: obj.settingId,
                                                    perInfoCtgId: obj.perInfoCtgId,
                                                    itemName: obj.itemName,
                                                    isRequired: obj.isRequired,
                                                    refMethodType: obj.refMethodType,
                                                    saveDataType: obj.saveDataType,
                                                    stringValue: obj.stringValue,
                                                    intValue: obj.intValue,
                                                    dateValue: obj.dateValue,
                                                    itemType: obj.itemType,
                                                    dataType: obj.dataType,
                                                    itemCode: obj.itemCode,
                                                    ctgCode: obj.ctgCode,
                                                    numberIntegerPart: obj.numberIntegerPart,
                                                    numberDecimalPart: obj.numberDecimalPart,
                                                    timeItemMin: obj.timeItemMin,
                                                    timeItemMax: obj.timeItemMax,
                                                    selectionItemId: obj.selectionItemId,
                                                    selection: obj.selection,
                                                    selectionItemRefType: obj.selectionItemRefType,
                                                    dateType: obj.dateType,
                                                    timepointItemMin: obj.timepointItemMin,
                                                    timepointItemMax: obj.timepointItemMax,
                                                    dateWithDay: obj.intValue,
                                                    numericItemMin: obj.numericItemMin,
                                                    numericItemMax: obj.numericItemMax,
                                                    stringItemType: obj.stringItemType,
                                                    stringItemLength: obj.stringItemLength,
                                                    stringItemDataType: obj.stringItemDataType,
                                                    disableCombox: obj.disableCombox,
                                                    enableControl: obj.enableControl,
                                                    initValue: obj.initValue
                                                });
                                            });
                                            _.defer(function () {
                                                self.currentCategory().itemList.removeAll();
                                                self.currentCategory().itemList(itemConvert_1);
                                                self.lstItemFilter = itemConvert_1;
                                                _.defer(function () {
                                                    var ctrl = $("#ctgName"), str = ctrl.val();
                                                    if ($('input.ntsSearchBox.nts-editor.ntsSearchBox_Component:focus').length == 0) {
                                                        ctrl.focus().val('').val(str);
                                                        $("#ctgName").trigger("validate");
                                                    }
                                                });
                                            });
                                        }
                                        else {
                                            _.defer(function () {
                                                self.currentCategory().itemList.removeAll();
                                                self.currentCategory().itemList([]);
                                                _.defer(function () {
                                                    var ctrl = $("#ctgName"), str = ctrl.val();
                                                    if ($('input.ntsSearchBox.nts-editor.ntsSearchBox_Component:focus').length == 0) {
                                                        ctrl.focus().val('').val(str);
                                                        $("#ctgName").trigger("validate");
                                                    }
                                                });
                                            });
                                        }
                                    }).always(function () { block.clear(); });
                                };
                                ViewModel.prototype.start = function (id) {
                                    var self = this, dfd = $.Deferred();
                                    block.grayout();
                                    a.service.getAll().done(function (data) {
                                        self.ctgIdUpdate(false);
                                        if (data.length > 0) {
                                            self.isUpdate = true;
                                            self.initValSettingLst.removeAll();
                                            self.initValSettingLst(data);
                                            if (id === undefined) {
                                                if (self.initValSettingLst().length > 0) {
                                                    self.initSettingId(self.initValSettingLst()[0].settingId);
                                                }
                                                else {
                                                    self.initSettingId("");
                                                }
                                            }
                                            else {
                                                self.initSettingId(id);
                                            }
                                        }
                                        else {
                                            self.isUpdate = false;
                                            self.openDDialog();
                                            self.refresh(undefined);
                                        }
                                    });
                                    return dfd.promise();
                                };
                                ViewModel.prototype.refresh = function (id) {
                                    var self = this;
                                    block.invisible();
                                    a.service.getAll().done(function (data) {
                                        self.initValSettingLst.removeAll();
                                        self.initValSettingLst(data);
                                        if (self.initValSettingLst().length > 0) {
                                            if (id === undefined) {
                                                self.initSettingId(self.initValSettingLst()[0].settingId);
                                            }
                                            else {
                                                self.initSettingId(id);
                                            }
                                        }
                                        else {
                                            self.initSettingId("");
                                        }
                                        block.clear();
                                    });
                                    ;
                                };
                                ViewModel.prototype.initValue = function () {
                                    var self = this;
                                    self.settingColums = ko.observableArray([
                                        { headerText: 'settingId', key: 'settingId', width: 100, hidden: true },
                                        { headerText: text('CPS009_10'), key: 'settingCode', width: 80 },
                                        { headerText: text('CPS009_11'), key: 'settingName', width: 160, formatter: _.escape }
                                    ]);
                                    self.itemValueLst = ko.observableArray([
                                        new ItemModel('1', '基本給'),
                                        new ItemModel('2', '役職手当'),
                                        new ItemModel('3', '基本給2')
                                    ]);
                                    self.selectionColumns = [{ prop: 'id', length: 4 },
                                        { prop: 'itemName', length: 8 }];
                                    self.currentCategory = ko.observable(new InitValueSettingDetail({
                                        settingCode: '', settingName: '', ctgList: [], itemList: []
                                    }));
                                    self.comboItems = [new ItemModel('1', '基本給'),
                                        new ItemModel('2', '役職手当'),
                                        new ItemModel('3', '基本給2')];
                                    self.comboColumns = [{ prop: 'code', length: 4 },
                                        { prop: 'name', length: 8 }];
                                };
                                // thiet lap item hang loat
                                ViewModel.prototype.openBDialog = function () {
                                    var self = this, ctgCurrent = self.findCtg(self.currentCategory().ctgList(), self.currentItemId()), params = {
                                        settingId: self.initSettingId(),
                                        ctgName: ctgCurrent != undefined ? ko.toJS(ctgCurrent.categoryName) : '',
                                        categoryId: self.currentItemId(),
                                        categoryType: ctgCurrent.categoryType
                                    };
                                    self.ctgIdUpdate(false);
                                    setShared('CPS009B_PARAMS', params);
                                    block.invisible();
                                    modal('/view/cps/009/b/index.xhtml', { title: '' }).onClosed(function () {
                                        $('#ctgName').focus();
                                        var itemSelected = getShared('CPS009B_DATA');
                                        if (itemSelected.isCancel) {
                                            return;
                                        }
                                        else {
                                            var itemLst_1 = _.map(ko.toJS(self.currentCategory().itemList()), function (obj) {
                                                return obj.perInfoItemDefId;
                                            });
                                            if (itemSelected.lstItem.length > 0) {
                                                _.each(itemSelected.lstItem, function (item) {
                                                    var i = _.indexOf(itemLst_1, item);
                                                    if (i > -1) {
                                                        self.currentCategory().itemList()[i].selectedRuleCode(Number(itemSelected.refMethodType));
                                                        self.currentCategory().itemList()[i].selectedRuleCode.valueHasMutated();
                                                    }
                                                });
                                            }
                                        }
                                        block.clear();
                                    });
                                };
                                // copy initVal
                                ViewModel.prototype.openCDialog = function () {
                                    var self = this, params = {
                                        settingId: ko.toJS(self.initSettingId()),
                                        settingCode: ko.toJS(self.currentCategory().settingCode),
                                        settingName: ko.toJS(self.currentCategory().settingName)
                                    };
                                    self.ctgIdUpdate(false);
                                    setShared('CPS009C_PARAMS', params);
                                    block.invisible();
                                    modal('/view/cps/009/c/index.xhtml', { title: '' }).onClosed(function () {
                                        $('#ctgName').focus();
                                        var initSetId = getShared('CPS009C_COPY');
                                        if (initSetId !== undefined) {
                                            self.refresh(initSetId);
                                        }
                                        block.clear();
                                    });
                                };
                                // new initVal
                                ViewModel.prototype.openDDialog = function () {
                                    var self = this;
                                    self.ctgIdUpdate(false);
                                    block.invisible();
                                    modal('/view/cps/009/d/index.xhtml', { title: '' }).onClosed(function () {
                                        var id = getShared('CPS009D_PARAMS');
                                        if (id !== undefined) {
                                            self.refresh(id);
                                        }
                                        block.clear();
                                    });
                                };
                                //delete init value
                                ViewModel.prototype.deleteInitValue = function () {
                                    var self = this, objDelete = {
                                        settingId: self.initSettingId(),
                                        settingCode: self.currentCategory().settingCode()
                                    };
                                    self.ctgIdUpdate(false);
                                    confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        a.service.deleteInitVal(objDelete).done(function (data) {
                                            dialog.info({ messageId: "Msg_16" }).then(function () {
                                                $('#ctgName').focus();
                                                var sourceLength = self.initValSettingLst().length;
                                                var i = _.findIndex(self.initValSettingLst(), function (init) { return init.settingId === self.initSettingId(); });
                                                var evens = _.remove(self.initValSettingLst(), function (init) {
                                                    return init.settingId !== self.initSettingId();
                                                });
                                                var newLength = evens.length;
                                                if (newLength > 0) {
                                                    if (i === (sourceLength - 1)) {
                                                        i = newLength - 1;
                                                    }
                                                    self.start(evens[i].settingId);
                                                }
                                                else {
                                                    self.start(undefined);
                                                }
                                            });
                                        });
                                    }).ifNo(function () {
                                        $('#ctgName').focus();
                                        return;
                                    });
                                };
                                // cap nhat init value
                                ViewModel.prototype.update = function () {
                                    var self = this, currentCtg = self.findCtg(self.currentCategory().ctgList(), self.currentItemId()), updateObj = {
                                        settingId: self.initSettingId(),
                                        settingName: self.currentCategory().settingName(),
                                        perInfoCtgId: self.currentItemId(),
                                        isSetting: currentCtg.setting,
                                        itemLst: _.map(ko.toJS(self.currentCategory().itemList()), function (obj) {
                                            return {
                                                ctgCode: obj.ctgCode,
                                                perInfoItemDefId: obj.perInfoItemDefId,
                                                itemName: obj.itemName,
                                                isRequired: obj.isRequired == true ? 1 : 0,
                                                refMethodType: obj.refMethodType,
                                                itemType: obj.itemType,
                                                dataType: obj.dataType,
                                                saveDataType: obj.saveDataType,
                                                stringValue: obj.stringValue,
                                                intValue: obj.intValue,
                                                dateVal: obj.dateValue,
                                                dateWithDay: obj.dateWithDay,
                                                timePoint: obj.timePoint,
                                                value: obj.value,
                                                selectedRuleCode: obj.selectedRuleCode,
                                                selectionId: obj.selectedCode,
                                                numberValue: obj.numbereditor == null ? 0 : obj.numbereditor.value,
                                                dateType: obj.dateType,
                                                time: obj.dateWithDay
                                            };
                                        })
                                    }, itemListSetting = _.filter(self.currentCategory().itemList(), function (item) {
                                        return item.selectedRuleCode() == 2;
                                    });
                                    $('#date1').trigger('validate');
                                    $('.ntsDatepicker.nts-input.reset-element.sub-input-units:not(:disabled)').trigger('validate');
                                    $('.sub-input-units:not(:disabled)').trigger('validate');
                                    validation.initCheckError(itemListSetting);
                                    validation.checkError(itemListSetting);
                                    if (error.hasError()) {
                                        return;
                                    }
                                    block.invisible();
                                    a.service.update(updateObj).done(function (data) {
                                        dialog.info({ messageId: "Msg_15" }).then(function () {
                                            $('#ctgName').focus();
                                            self.initSettingId("");
                                            self.refresh(updateObj.settingId);
                                            self.initSettingId(updateObj.settingId);
                                            self.currentItemId("");
                                            self.currentItemId(updateObj.perInfoCtgId);
                                            self.ctgIdUpdate(true);
                                        });
                                        self.currentItemId(updateObj.perInfoCtgId);
                                        block.clear();
                                    }).fail(function (res) {
                                        self.errorList(res);
                                        nts.uk.ui.dialog.bundledErrors(self.errorList());
                                        block.clear();
                                    });
                                };
                                //履歴参照基準日を適用する (Áp dụng ngày chuẩn để tham chiếu lịch sử)
                                ViewModel.prototype.historyFilter = function () {
                                    if (error.hasError())
                                        return;
                                    var self = this, baseDate = moment(self.baseDate()).format('YYYY-MM-DD'), vm = self.currentCategory().itemList(), itemSelection = _.filter(vm, function (item) {
                                        return item.selectedRuleCode() == 2 && ((item.dataType() == 6 && (item.selectionItemRefType == 2 || item.selectionItemRefType == 1)) || item.itemCode() == "IS00084" || item.itemCode() == "IS00085");
                                    }), itemIdLst = _.map(itemSelection, function (obj) {
                                        return {
                                            dataType: obj.dataType(),
                                            selectionItemId: obj.selectionItemId,
                                            selectionItemRefType: obj.selectionItemRefType,
                                            baseDate: baseDate
                                        };
                                    });
                                    if (itemIdLst.length > 0) {
                                        _.each(itemIdLst, function (item) {
                                            var itemList = ko.toJS(vm), indexList = [], itemIndex = 0;
                                            _.each(itemList, function (obj) {
                                                if (obj.selectionItemId === item.selectionItemId) {
                                                    indexList.push(itemIndex);
                                                }
                                                itemIndex++;
                                            });
                                            if (indexList.length > 0) {
                                                a.service.getAllComboxByHistory(item).done(function (data) {
                                                    if (data) {
                                                        _.each(indexList, function (index) {
                                                            vm[index].selection([]);
                                                            vm[index].selection(data);
                                                            vm[index].selection.valueHasMutated();
                                                            if (item.dataType === ITEM_SINGLE_TYPE.SEL_BUTTON) {
                                                                var objSel = _.find(vm[index].selection(), function (c) { if (c.optionValue == vm[index].selectedCode()) {
                                                                    return c;
                                                                } });
                                                                vm[index].selectionName(objSel == undefined ? (vm[index].selectedCode() == "" || vm[index].selectedCode() == undefined ? "" : (vm[index].ctgCode() === "CS00016" || vm[index].ctgCode() === "CS00017") ? text("CPS001_107") : (vm[index].selectedCode() + "　" + text("CPS001_107"))) : objSel.optionText);
                                                                vm[index].selectionName.valueHasMutated();
                                                            }
                                                            else {
                                                                var value = vm[index].stringValue();
                                                                vm[index].selectedCode(value);
                                                                vm[index].selectedCode.valueHasMutated();
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                };
                                /**
                                 * find item by perInfoItemDefId
                                 */
                                ViewModel.prototype.findItem = function (lstITem, perInfoItemDefId) {
                                    return _.find(lstITem, function (obj) {
                                        return obj.perInfoItemDefId == perInfoItemDefId;
                                    });
                                };
                                /**
                                 * find category is selected
                                 */
                                ViewModel.prototype.findCtg = function (lstCtg, ctgId) {
                                    return _.find(lstCtg, function (obj) {
                                        return obj.perInfoCtgId == ctgId;
                                    });
                                };
                                ViewModel.prototype.closeDialog = function () {
                                    nts.uk.ui.windows.close();
                                };
                                ViewModel.prototype.checkError = function (itemList) {
                                };
                                /**
                                 * export excel
                                 */
                                ViewModel.prototype.exportExcel = function () {
                                    var self = this;
                                    nts.uk.ui.block.grayout();
                                    a.service.saveAsExcel().done(function () {
                                    }).fail(function (error) {
                                        nts.uk.ui.dialog.alertError({ messageId: error.messageId });
                                    }).always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                return ViewModel;
                            }());
                            viewmodel.ViewModel = ViewModel;
                            var InitValueSettingDetail = /** @class */ (function () {
                                function InitValueSettingDetail(params) {
                                    this.currentItemId = ko.observable('');
                                    this.ctgColums = ko.observableArray([
                                        { headerText: '', key: 'perInfoCtgId', width: 100, hidden: true },
                                        { headerText: text('CPS009_15'), key: 'setting', dataType: 'string', width: 50, formatter: makeIcon },
                                        { headerText: text('CPS009_16'), key: 'categoryName', width: 200 }
                                    ]);
                                    var self = this;
                                    self.settingCode = ko.observable(params.settingCode);
                                    self.settingName = ko.observable(params.settingName);
                                    self.ctgList = ko.observableArray(params.ctgList);
                                    self.itemList = ko.observableArray(params.itemList || []);
                                }
                                InitValueSettingDetail.prototype.setData = function (params) {
                                    var self = this;
                                    self.settingCode(params.settingCode);
                                    self.settingName(params.settingName);
                                    self.ctgList(params.ctgList);
                                };
                                return InitValueSettingDetail;
                            }());
                            viewmodel.InitValueSettingDetail = InitValueSettingDetail;
                            var InitValueSetting = /** @class */ (function () {
                                function InitValueSetting(params) {
                                    this.settingId = params.settingId;
                                    this.settingCode = params.settingCode;
                                    this.settingName = params.settingName;
                                }
                                return InitValueSetting;
                            }());
                            viewmodel.InitValueSetting = InitValueSetting;
                            var CategoryInfo = /** @class */ (function () {
                                function CategoryInfo(params) {
                                    this.perInfoCtgId = params.perInfoCtgId;
                                    this.categoryName = params.categoryName;
                                    this.setting = params.setting;
                                }
                                return CategoryInfo;
                            }());
                            viewmodel.CategoryInfo = CategoryInfo;
                            var InitValue = /** @class */ (function () {
                                function InitValue(params) {
                                    this.id = params.id;
                                    this.itemName = params.itemName;
                                    this.comboxValue = params.comboxValue;
                                    this.value = params.value;
                                }
                                return InitValue;
                            }());
                            viewmodel.InitValue = InitValue;
                            var ItemModel = /** @class */ (function () {
                                function ItemModel(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ItemModel;
                            }());
                            viewmodel.ItemModel = ItemModel;
                            var PerInfoInitValueSettingItemDto = /** @class */ (function () {
                                //        isFirstSelected : number = 0;
                                function PerInfoInitValueSettingItemDto(params) {
                                    this.indexItem = 0;
                                    this.radioLst = [];
                                    // xử lý disable or enable cho A22 && A23
                                    this.disableCombox = ko.observable(true);
                                    this.enableControl = ko.observable(true);
                                    this.itemLstTimePoint = [
                                        new ItemCode("IS00131", "IS00133", "IS00134", "IS00136", "IS00137"),
                                        new ItemCode("IS00140", "IS00142", "IS00143", "IS00145", "IS00146"),
                                        new ItemCode("IS00158", "IS00160", "IS00161", "IS00163", "IS00164"),
                                        new ItemCode("IS00167", "IS00169", "IS00170", "IS00172", "IS00173"),
                                        new ItemCode("IS00176", "IS00178", "IS00179", "IS00181", "IS00182"),
                                        new ItemCode("IS00149", "IS00151", "IS00152", "IS00154", "IS00155"),
                                        new ItemCode("IS00194", "IS00196", "IS00197", "IS00199", "IS00200"),
                                        new ItemCode("IS00203", "IS00205", "IS00206", "IS00208", "IS00209"),
                                        new ItemCode("IS00212", "IS00214", "IS00215", "IS00217", "IS00218"),
                                        new ItemCode("IS00221", "IS00223", "IS00224", "IS00226", "IS00227"),
                                        new ItemCode("IS00230", "IS00232", "IS00233", "IS00235", "IS00236"),
                                        new ItemCode("IS00212", "IS00214", "IS00215", "IS00217", "IS00218"),
                                        new ItemCode("IS00239", "IS00241", "IS00242", "IS00244", "IS00245"),
                                        new ItemCode("IS00185", "IS00187", "IS00188", "IS00190", "IS00191"),
                                    ];
                                    var self = this;
                                    self.categoryType = params.categoryType;
                                    self.indexItem = params.indexItem;
                                    self.fixedItem = params.fixedItem;
                                    self.perInfoItemDefId = ko.observable(params.perInfoItemDefId || "");
                                    self.settingId = ko.observable(params.settingId || "");
                                    self.perInfoCtgId = ko.observable(params.perInfoCtgId || "");
                                    self.itemCode = ko.observable(params.itemCode || "");
                                    self.ctgCode = ko.observable(params.ctgCode || "");
                                    self.itemName = ko.observable(params.itemName || "");
                                    self.isRequired = ko.observable(!!params.isRequired || false);
                                    self.refMethodType = ko.observable(params.refMethodType || 0);
                                    self.saveDataType = ko.observable(params.saveDataType || 0);
                                    self.stringValue = ko.observable(params.stringValue || params.initValue);
                                    self.intValue = ko.observable(params.intValue || (params.intValue === 0 ? 0 : params.initValue));
                                    self.dateWithDay = ko.observable(params.dateWithDay || (params.dateWithDay === 0 ? 0 : params.initValue));
                                    self.timePoint = ko.observable(params.timePoint || params.initValue);
                                    self.timeItemMin = params.timeItemMin || undefined;
                                    self.timeItemMax = params.timeItemMax || undefined;
                                    self.timepointItemMin = params.timepointItemMin || undefined;
                                    self.timepointItemMax = params.timepointItemMax || undefined;
                                    self.numericItemMin = params.numericItemMin || undefined;
                                    self.numericItemMax = params.numericItemMax || undefined;
                                    self.itemType = ko.observable(params.itemType || undefined);
                                    self.dataType = ko.observable(params.dataType || undefined);
                                    self.disableCombox(params.disableCombox == true ? false : true);
                                    self.enableControl(params.enableControl);
                                    self.selectedRuleCode = ko.observable(params.refMethodType || 1);
                                    self.selectedCode = ko.observable();
                                    switch (params.dataType) {
                                        case ITEM_SINGLE_TYPE.STRING:
                                            self.stringItemType = params.stringItemType || undefined;
                                            self.stringItemLength = params.stringItemLength || undefined;
                                            self.stringItemDataType = params.stringItemDataType || undefined;
                                            self.numericItemMin = params.numericItemMin || undefined;
                                            self.numericItemMax = params.numericItemMax || undefined;
                                            break;
                                        case ITEM_SINGLE_TYPE.NUMERIC:
                                            self.numbericItem = new NumbericItem(params.dataType, {
                                                numberDecimalPart: params.numberDecimalPart,
                                                numberIntegerPart: params.numberIntegerPart
                                            }) || null;
                                            if (params.numberDecimalPart === 0 && (params.numberIntegerPart === 0 || params.numberIntegerPart === null)) {
                                                self.numbereditor = {
                                                    value: ko.observable(params.intValue || (params.intValue === 0 ? 0 : params.initValue)),
                                                    constraint: params.itemCode,
                                                    option: new nts.uk.ui.option.NumberEditorOption({
                                                        grouplength: params.numberItemMinus && 3,
                                                        decimallength: 0,
                                                        textalign: "left"
                                                    }),
                                                    enable: ko.observable(true),
                                                    readonly: ko.observable(false)
                                                };
                                                break;
                                            }
                                            else {
                                                self.numbereditor = {
                                                    value: ko.observable(params.intValue || (params.intValue === 0 ? 0 : params.initValue)),
                                                    constraint: params.itemCode,
                                                    option: new nts.uk.ui.option.NumberEditorOption({
                                                        grouplength: params.numberItemMinus && 3,
                                                        decimallength: params.numberDecimalPart,
                                                        textalign: "left"
                                                    }),
                                                    enable: ko.observable(true),
                                                    readonly: ko.observable(false)
                                                };
                                                break;
                                            }
                                        case ITEM_SINGLE_TYPE.DATE:
                                            self.dateType = params.dateType || undefined;
                                            switch (params.dateType) {
                                                case DATE_TYPE.YEAR_MONTH_DAY:
                                                    self.dateValue = ko.observable(params.dateValue || undefined);
                                                    break;
                                                case DATE_TYPE.YEAR_MONTH:
                                                    if (params.dateValue === null) {
                                                        self.dateValue = ko.observable(params.initValue == null ? undefined : params.initValue);
                                                        break;
                                                    }
                                                    else {
                                                        self.dateValue = ko.observable(formatDate(new Date(params.dateValue), "yyyy/MM"));
                                                        break;
                                                    }
                                                case DATE_TYPE.YEAR:
                                                    if (params.dateValue === null) {
                                                        self.dateValue = ko.observable(params.initValue == null ? undefined : params.initValue);
                                                        break;
                                                    }
                                                    else {
                                                        self.dateValue = ko.observable(formatDate(new Date(params.dateValue), "yyyy") || undefined);
                                                        break;
                                                    }
                                            }
                                        case ITEM_SINGLE_TYPE.TIME:
                                            break;
                                        case ITEM_SINGLE_TYPE.TIMEPOINT:
                                            break;
                                        case ITEM_SINGLE_TYPE.SELECTION:
                                            self.selectionItemId = params.selectionItemId || undefined;
                                            self.selectionItemRefType = params.selectionItemRefType || undefined;
                                            self.selection = ko.observableArray(params.selection || []);
                                            self.selectedCode = ko.observable(params.stringValue == null ? (params.initValue == null ? undefined : params.initValue) : params.stringValue);
                                            break;
                                        case ITEM_SINGLE_TYPE.SEL_RADIO:
                                            self.radioId = params.selectionItemId || undefined;
                                            self.selectionItemRefType = params.selectionItemRefType || undefined;
                                            self.selection = ko.observableArray(params.selection || []);
                                            self.selectedCode = ko.observable(params.stringValue || (params.initValue == null ? "1" : params.initValue));
                                            break;
                                        case ITEM_SINGLE_TYPE.SEL_BUTTON:
                                            self.selectionItemId = params.selectionItemId || undefined;
                                            self.selectionItemRefType = params.selectionItemRefType || undefined;
                                            self.selection = ko.observableArray(params.selection || []);
                                            self.selectedCode = ko.observable(params.stringValue == null ? (params.initValue == null ? undefined : params.initValue) : params.stringValue);
                                            var objSel = _.find(params.selection, function (c) { if (c.optionValue == self.selectedCode()) {
                                                return c;
                                            } });
                                            self.selectionName = ko.observable(params.stringValue == null ? "" : (objSel == undefined ? ((self.ctgCode() === "CS00016" || self.ctgCode() === "CS00017") ? text("CPS001_107") : (self.selectedCode() + "　" + text("CPS001_107"))) : objSel.optionText));
                                            break;
                                    }
                                    switch (params.dataType) {
                                        case ITEM_SINGLE_TYPE.DATE:
                                            self.listComboItem = ko.observableArray([
                                                { code: 1, name: ReferenceMethodType.NOSETTING },
                                                { code: 2, name: ReferenceMethodType.FIXEDVALUE },
                                                { code: 3, name: ReferenceMethodType.SAMEASLOGIN },
                                                { code: 4, name: ReferenceMethodType.SAMEASEMPLOYMENTDATE },
                                                { code: 6, name: ReferenceMethodType.SAMEASSYSTEMDATE }
                                            ]);
                                            break;
                                        default:
                                            self.listComboItem = ko.observableArray([
                                                { code: 1, name: ReferenceMethodType.NOSETTING },
                                                { code: 2, name: ReferenceMethodType.FIXEDVALUE },
                                                { code: 3, name: ReferenceMethodType.SAMEASLOGIN }
                                            ]);
                                            break;
                                    }
                                    self.selectedRuleCode.subscribe(function (value) {
                                        if (value !== 2) {
                                            error.clearAll();
                                        }
                                        if (value == 2 && self.enableControl() === true) {
                                            setTimeout(function (c) {
                                                var x = "#" + self.perInfoItemDefId(), content = $("#" + self.perInfoItemDefId()).val();
                                                if (!_.isNil(content) && content !== "") {
                                                    $("#" + self.perInfoItemDefId()).trigger("validate");
                                                }
                                            }, 100);
                                        }
                                        if (self.ctgCode() === "CS00020" || self.ctgCode() === "CS00070") {
                                            self.createItemTimePointOfCS00020(value, self.itemCode());
                                        }
                                    });
                                }
                                PerInfoInitValueSettingItemDto.prototype.createItemTimePointOfCS00020 = function (value, itemCode) {
                                    var vm = __viewContext["viewModel"].currentCategory().itemList(), self = this, itemLst = [], itemSelected;
                                    itemSelected = _.filter(self.itemLstTimePoint, { itemCodeParent: itemCode });
                                    if (itemSelected.length > 0) {
                                        itemLst = _.filter(ko.toJS(vm), function (i) {
                                            if ((i.itemCode == itemSelected[0].itemCode1) || (i.itemCode == itemSelected[0].itemCode2) || (i.itemCode == itemSelected[0].itemCode3) || (i.itemCode == itemSelected[0].itemCode4)) {
                                                return i;
                                            }
                                        });
                                        _.each(itemLst, function (x) {
                                            vm[x.indexItem > 0 ? (x.indexItem - 1) : 0].selectedRuleCode(value);
                                        });
                                    }
                                };
                                PerInfoInitValueSettingItemDto.prototype.button = function () {
                                    var self = this, groups = [
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
                                    ], vm = __viewContext["viewModel"].currentCategory().itemList(), workType = _.find(groups, { workType: self.itemCode() }), workTime = _.find(groups, { workTime: self.itemCode() }), isKdl002 = self.itemCode() == "IS00128" ? true : false, isWorkType = workType !== undefined ? true : false, isWorkTime = workTime !== undefined ? true : false, itemWorkTime = _.find(ko.toJS(vm), function (obj) {
                                        if (isWorkType) {
                                            if (obj.itemCode === workType.workTime) {
                                                return obj;
                                            }
                                        }
                                    }), itemWorkType = _.find(ko.toJS(vm), function (obj) {
                                        if (isWorkTime) {
                                            if (obj.itemCode === workTime.workType) {
                                                return obj;
                                            }
                                        }
                                    });
                                    if (self.ctgCode() == "CS00020" || self.ctgCode() == "CS00070") {
                                        if (isKdl002) {
                                            setShared("KDL002_Multiple", false, true);
                                            setShared("KDL002_SelectedItemId", _.isNil(self.selectedCode()) ? [] : [self.selectedCode()], true);
                                            setShared("KDL002_AllItemObj", _.map(ko.toJS(self.selection), function (x) { return x.optionValue; }), true);
                                            modal('at', '/view/kdl/002/a/index.xhtml').onClosed(function () {
                                                var childData = getShared('KDL002_SelectedNewItem');
                                                if (childData[0]) {
                                                    self.selectionName(childData[0].code + "　" + childData[0].name);
                                                    self.selectedCode(childData[0].code);
                                                }
                                            });
                                        }
                                        else {
                                            if (['IS00130', 'IS00131', 'IS00139', 'IS00140'].indexOf(self.itemCode()) > -1) {
                                                var objShare = {};
                                                if (isWorkType) {
                                                    objShare = {
                                                        workTypeCodes: workType && _.map(self.selection(), function (x) { return x.optionValue; }),
                                                        selectedWorkTypeCode: self.selectedCode() && ko.toJS(self.selectedCode),
                                                        workTimeCodes: _.map(itemWorkTime != undefined ? itemWorkTime.selection : [], function (x) { return x.optionValue; }),
                                                        selectedWorkTimeCode: ko.toJS(itemWorkTime.selectedCode),
                                                        showNone: false
                                                    };
                                                }
                                                else {
                                                    objShare = {
                                                        workTypeCodes: _.map(itemWorkType != undefined ? itemWorkType.selection : [], function (x) { return x.optionValue; }),
                                                        selectedWorkTypeCode: ko.toJS(itemWorkType.selectedCode),
                                                        workTimeCodes: workTime && _.map(self.selection(), function (x) { return x.optionValue; }),
                                                        selectedWorkTimeCode: self.selectedCode() && ko.toJS(self.selectedCode),
                                                        showNone: false
                                                    };
                                                }
                                                setShared('parentCodes', objShare, true);
                                                modal('at', '/view/kdl/003/a/index.xhtml').onClosed(function () {
                                                    var childData = getShared('childData');
                                                    self.setValueOfCS00020(childData, isWorkType, isWorkTime, workType, workTime, itemWorkTime, itemWorkType, true);
                                                });
                                            }
                                            else {
                                                if (isWorkType) {
                                                    setShared("KDL002_Multiple", false, true);
                                                    setShared("KDL002_SelectedItemId", _.isNil(self.selectedCode()) ? [] : [self.selectedCode()], true);
                                                    setShared('kdl002isSelection', true, true);
                                                    setShared("KDL002_AllItemObj", _.map(ko.toJS(self.selection), function (x) { return x.optionValue; }), true);
                                                    modal('at', '/view/kdl/002/a/index.xhtml').onClosed(function () {
                                                        var childData = getShared('KDL002_SelectedNewItem');
                                                        if (childData.length > 0) {
                                                            if (childData[0].code == "") {
                                                                self.selectionName(undefined);
                                                                self.selectedCode(undefined);
                                                            }
                                                            else {
                                                                self.selectionName(childData[0].code + "　" + childData[0].name);
                                                                self.selectedCode(childData[0].code);
                                                            }
                                                        }
                                                    });
                                                }
                                                else {
                                                    setShared("kml001multiSelectMode", false);
                                                    setShared("kml001selectedCodeList", _.isNil(ko.toJS(self.selectedCode)) ? [] : [ko.toJS(self.selectedCode)]);
                                                    setShared("kml001isSelection", true);
                                                    setShared("kml001selectAbleCodeList", _.map(self.selection(), function (x) { return x.optionValue; }), true);
                                                    modal('at', '/view/kdl/001/a/index.xhtml').onClosed(function () {
                                                        var childData = getShared('kml001selectedTimes');
                                                        if (childData) {
                                                            if (childData.length > 0) {
                                                                self.setValueOfCS00020(childData[0], isWorkType, isWorkTime, workType, workTime, itemWorkTime, itemWorkType, false);
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    }
                                    if (self.ctgCode() == "CS00017") {
                                        self.clickButtonCS0017();
                                    }
                                };
                                PerInfoInitValueSettingItemDto.prototype.setValueOfCS00020 = function (childData, isWorkType, isWorkTime, workType, workTime, itemWorkTime, itemWorkType, isKdl003) {
                                    var self = this, vm = __viewContext["viewModel"].currentCategory().itemList();
                                    ;
                                    if (isWorkType) {
                                        var itemChilds_1 = _.filter(ko.toJS(vm), function (obj) {
                                            if (obj.itemCode === workType.firstTimes.start || obj.itemCode === workType.firstTimes.end || obj.itemCode === workType.secondTimes.start || obj.itemCode === workType.secondTimes.end) {
                                                return obj;
                                            }
                                        });
                                        if (childData.selectedWorkTypeCode == "") {
                                            self.selectionName(undefined);
                                        }
                                        else {
                                            self.selectionName(childData.selectedWorkTypeCode + "　" + childData.selectedWorkTypeName);
                                            self.selectedCode(childData.selectedWorkTypeCode);
                                        }
                                        self.selectedCode(childData.selectedWorkTypeCode == "" ? undefined : childData.selectedWorkTypeCode);
                                        vm[itemWorkTime.indexItem - 1].selectionName(childData.selectedWorkTimeCode + "　" + childData.selectedWorkTimeName);
                                        vm[itemWorkTime.indexItem - 1].selectedCode(childData.selectedWorkTimeCode);
                                        var params_1 = { workTimeCode: childData.selectedWorkTimeCode };
                                        a.service.checkStartEnd(params_1).done(function (data) {
                                            a.service.checkMutiTime(params_1).done(function (data1) {
                                                self.setData(childData, itemChilds_1, data, data1);
                                            });
                                        });
                                    }
                                    else {
                                        var itemChilds_2 = _.filter(ko.toJS(vm), function (obj) {
                                            if (obj.itemCode === workTime.firstTimes.start || obj.itemCode === workTime.firstTimes.end || obj.itemCode === workTime.secondTimes.start || obj.itemCode === workTime.secondTimes.end) {
                                                return obj;
                                            }
                                        });
                                        if (childData.selectedWorkTimeCode == "") {
                                            self.selectionName(undefined);
                                        }
                                        else {
                                            self.selectionName(childData.selectedWorkTimeCode + "　" + childData.selectedWorkTimeName);
                                        }
                                        self.selectedCode(childData.selectedWorkTimeCode == "" ? undefined : childData.selectedWorkTimeCode);
                                        if (isKdl003) {
                                            vm[itemWorkType.indexItem - 1].selectionName(childData.selectedWorkTypeCode + "　" + childData.selectedWorkTypeName);
                                            vm[itemWorkType.indexItem - 1].selectedCode(childData.selectedWorkTypeCode);
                                        }
                                        var params_2 = { workTimeCode: childData.selectedWorkTimeCode };
                                        a.service.checkStartEnd(params_2).done(function (data) {
                                            a.service.checkMutiTime(params_2).done(function (data1) {
                                                self.setData(childData, itemChilds_2, data, data1);
                                            });
                                        });
                                    }
                                };
                                PerInfoInitValueSettingItemDto.prototype.setData = function (childData, itemChilds, checkStartEnd, mutiTime) {
                                    var vm = __viewContext["viewModel"].currentCategory().itemList(), itemlength = itemChilds.length;
                                    for (var i = 0; i < itemlength; i++) {
                                        if (itemlength <= 2) {
                                            vm[itemChilds[i].indexItem - 1].enableControl(checkStartEnd);
                                            vm[itemChilds[i + 1].indexItem - 1].enableControl(checkStartEnd);
                                            vm[itemChilds[i].indexItem - 1].dateWithDay(childData.first.start);
                                            vm[itemChilds[i + 1].indexItem - 1].dateWithDay(childData.first.end);
                                            i = i + 1;
                                        }
                                        else {
                                            vm[itemChilds[i].indexItem - 1].enableControl(checkStartEnd);
                                            vm[itemChilds[i + 1].indexItem - 1].enableControl(checkStartEnd);
                                            vm[itemChilds[i].indexItem - 1].dateWithDay(childData.first.start);
                                            vm[itemChilds[i + 1].indexItem - 1].dateWithDay(childData.first.end);
                                            vm[itemChilds[i + 2].indexItem - 1].enableControl(mutiTime && checkStartEnd);
                                            vm[itemChilds[i + 3].indexItem - 1].enableControl(mutiTime && checkStartEnd);
                                            vm[itemChilds[i + 2].indexItem - 1].dateWithDay(childData.second.start);
                                            vm[itemChilds[i + 3].indexItem - 1].dateWithDay(childData.second.end);
                                            i = i + 3;
                                        }
                                    }
                                };
                                PerInfoInitValueSettingItemDto.prototype.clickButtonCS0017 = function () {
                                    var self = this, baseDate = moment.utc(__viewContext["viewModel"].baseDate());
                                    if (baseDate._isValid) {
                                        a.service.checkFunctionNo().done(function (data) {
                                            setShared('inputCDL008', {
                                                selectedCodes: [self.selectedCode()],
                                                baseDate: baseDate.toDate(),
                                                isMultiple: false,
                                                selectedSystemType: 1,
                                                isrestrictionOfReferenceRange: data.available,
                                                isShowBaseDate: false
                                            }, true);
                                            modal('com', '/view/cdl/008/a/index.xhtml').onClosed(function () {
                                                // Check is cancel.
                                                if (getShared('CDL008Cancel')) {
                                                    return;
                                                }
                                                //view all code of selected item 
                                                var output = getShared('outputCDL008');
                                                if (output) {
                                                    var objSel = _.find(self.selection(), function (c) { if (c.optionValue == output) {
                                                        return c;
                                                    } });
                                                    self.selectionName(objSel == undefined ? "" : objSel.optionText);
                                                    self.selectedCode(output);
                                                }
                                            });
                                        });
                                    }
                                };
                                return PerInfoInitValueSettingItemDto;
                            }());
                            viewmodel.PerInfoInitValueSettingItemDto = PerInfoInitValueSettingItemDto;
                            var NumbericItem = /** @class */ (function () {
                                function NumbericItem(params, params2) {
                                    var self = this;
                                    if (params === 2) {
                                        this.numberIntegerPart = params2.numberIntegerPart;
                                        this.numberDecimalPart = params2.numberDecimalPart;
                                    }
                                }
                                return NumbericItem;
                            }());
                            viewmodel.NumbericItem = NumbericItem;
                            var ItemCode = /** @class */ (function () {
                                function ItemCode(itemCodeParent, itemCode1, itemCode2, itemCode3, itemCode4) {
                                    var self = this;
                                    self.itemCodeParent = itemCodeParent;
                                    self.itemCode1 = itemCode1;
                                    self.itemCode2 = itemCode2;
                                    self.itemCode3 = itemCode3;
                                    self.itemCode4 = itemCode4;
                                }
                                return ItemCode;
                            }());
                            viewmodel.ItemCode = ItemCode;
                            function makeIcon(value, row) {
                                if (value == "false")
                                    return '';
                                return '●';
                            }
                            var ReferenceMethodType;
                            (function (ReferenceMethodType) {
                                /** (設定なし):1 */
                                ReferenceMethodType["NOSETTING"] = "\u8A2D\u5B9A\u306A\u3057";
                                /** 固定値): 2 **/
                                ReferenceMethodType["FIXEDVALUE"] = "\u56FA\u5B9A\u5024";
                                /** (ログイン者と同じ):3 */
                                ReferenceMethodType["SAMEASLOGIN"] = "\u30ED\u30B0\u30A4\u30F3\u8005\u3068\u540C\u3058";
                                /** (入社日と同じ): 4*/
                                ReferenceMethodType["SAMEASEMPLOYMENTDATE"] = "\u5165\u793E\u65E5\u3068\u540C\u3058";
                                /** (社員コードと同じ):5 */
                                ReferenceMethodType["SAMEASEMPLOYEECODE"] = "\u793E\u54E1\u30B3\u30FC\u30C9\u3068\u540C\u3058";
                                /** (システム日付):6 */
                                ReferenceMethodType["SAMEASSYSTEMDATE"] = "\u30B7\u30B9\u30C6\u30E0\u65E5\u4ED8\u3068\u540C\u3058";
                                /** (氏名と同じ ):7 */
                                ReferenceMethodType["SAMEASNAME"] = "\u6C0F\u540D\u3068\u540C\u3058 ";
                                /** (氏名（カナ）と同じ):8 */
                                ReferenceMethodType["SAMEASKANANAME"] = "\u6C0F\u540D\uFF08\u30AB\u30CA\uFF09\u3068\u540C\u3058";
                            })(ReferenceMethodType = viewmodel.ReferenceMethodType || (viewmodel.ReferenceMethodType = {}));
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
                            })(ITEM_SINGLE_TYPE = viewmodel.ITEM_SINGLE_TYPE || (viewmodel.ITEM_SINGLE_TYPE = {}));
                            var DATE_TYPE;
                            (function (DATE_TYPE) {
                                DATE_TYPE[DATE_TYPE["YEAR_MONTH_DAY"] = 1] = "YEAR_MONTH_DAY";
                                DATE_TYPE[DATE_TYPE["YEAR_MONTH"] = 2] = "YEAR_MONTH";
                                DATE_TYPE[DATE_TYPE["YEAR"] = 3] = "YEAR";
                            })(DATE_TYPE = viewmodel.DATE_TYPE || (viewmodel.DATE_TYPE = {}));
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cps009.a || (cps009.a = {}));
                })(cps009 = view.cps009 || (view.cps009 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps009.a.vm.js.map