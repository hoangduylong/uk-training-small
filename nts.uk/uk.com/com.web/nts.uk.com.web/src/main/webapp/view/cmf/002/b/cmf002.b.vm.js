var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf002;
                (function (cmf002) {
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var getText = nts.uk.resource.getText;
                            var dialog = nts.uk.ui.dialog;
                            var model = cmf002.share.model;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var block = nts.uk.ui.block;
                            var modal = nts.uk.ui.windows.sub.modal;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _this = this;
                                    this.isNewMode = ko.observable(true);
                                    this.checkFocus = ko.observable(true);
                                    this.standType = ko.observable(1);
                                    this.index = ko.observable(0);
                                    this.conditionSettingList = ko.observableArray([]);
                                    this.outputItemList = ko.observableArray([]);
                                    this.selectedConditionSetting = ko.observable();
                                    this.selectedConditionSettingCode = ko.observable('');
                                    this.notUseAtrItems = ko.observableArray(getNotUseAtrItems());
                                    this.delimiterItems = ko.observableArray(getDelimiterItems());
                                    this.stringFormatItems = ko.observableArray(getStringFormatItems());
                                    this.listCategory = ko.observableArray([]);
                                    this.categoryName = ko.observable('');
                                    this.outItemCd = ko.observable('');
                                    this.conditionSetData = ko.observable(new ConditionSet({
                                        cId: '',
                                        conditionSetCode: '',
                                        conditionSetName: '',
                                        categoryId: '',
                                        conditionOutputName: 0,
                                        autoExecution: 1,
                                        delimiter: 1,
                                        stringFormat: 0,
                                        itemOutputName: 0
                                    }));
                                    this.checkFocusWhenCopy = false;
                                    this.isSetPeriodText = ko.observable('');
                                    block.invisible();
                                    var self = this;
                                    self.roleAuthority = getShared("CMF002B_PARAMS");
                                    self.index(0);
                                    block.clear();
                                    self.selectedConditionSettingCode.subscribe(function (data) {
                                        if (data == '') {
                                            self.createNewCondition();
                                        }
                                        else {
                                            nts.uk.ui.errors.clearAll();
                                            block.invisible();
                                            self.index(self.getIndex(data));
                                            self.selectedConditionSetting(self.conditionSettingList()[self.index()]);
                                            self.getOutItem(data);
                                            self.settingCurrentCondition();
                                            self.setNewMode(false);
                                            b.service.findOutputPeriodSetting(data)
                                                .then(function (response) {
                                                if (response) {
                                                    self.isSetPeriodText(response.periodSetting === 1 ? getText('CMF002_530') : getText('CMF002_531'));
                                                }
                                                else {
                                                    self.isSetPeriodText(getText('CMF002_531'));
                                                }
                                            })
                                                .always(function () { return block.clear(); });
                                        }
                                    });
                                    self.checkFocus.subscribe(function (data) {
                                        var self = _this;
                                        if (self.checkFocusWhenCopy) {
                                            $("#B5_2").focus();
                                            self.checkFocusWhenCopy = false;
                                            return;
                                        }
                                        if (data) {
                                            $("#B5_1").focus();
                                        }
                                        else {
                                            $("#B3_3_container").focus();
                                        }
                                    });
                                }
                                ScreenModel.prototype.setNewMode = function (mode) {
                                    var self = this;
                                    self.isNewMode(mode);
                                    if (self.checkFocus() == mode) {
                                        self.checkFocus.valueHasMutated();
                                    }
                                    else {
                                        self.checkFocus(mode);
                                    }
                                };
                                ScreenModel.prototype.setCondSetCode = function (code) {
                                    var self = this;
                                    self.selectedConditionSettingCode('');
                                    self.selectedConditionSettingCode(code);
                                };
                                /**
                                 * 起動する
                                 * アルゴリズム「外部出力条件設定一覧」を実行する
                                 */
                                ScreenModel.prototype.initScreen = function (conditionSetCode) {
                                    block.invisible();
                                    var self = this;
                                    var itemList = [];
                                    var conditionSetCodeParam = '';
                                    self.standType(1);
                                    //アルゴリズム「外部出力取得設定一覧」を実行する
                                    return b.service.getCndSet(self.roleAuthority)
                                        .then(function (itemList) {
                                        self.conditionSettingList.removeAll();
                                        if (itemList && itemList.length > 0) {
                                            self.conditionSettingList(itemList);
                                            if (conditionSetCode) {
                                                self.setCondSetCode(conditionSetCode);
                                                self.index(self.getIndex(conditionSetCode));
                                            }
                                            var code_1 = self.conditionSettingList()[self.index()].conditionSetCode;
                                            self.setCondSetCode(code_1);
                                            setTimeout(function () {
                                                $("tr[data-id='" + code_1 + "'] ").focus();
                                                self.setNewMode(false);
                                            }, 100);
                                        }
                                        else {
                                            self.createNewCondition();
                                        }
                                    })
                                        .always(function () { return block.clear(); });
                                };
                                /**
                                 * Setting each item on screen
                                 */
                                ScreenModel.prototype.settingCurrentCondition = function () {
                                    var self = this;
                                    if (!self.conditionSettingList()) {
                                        return;
                                    }
                                    var condSet = self.conditionSettingList()[self.index()], categoryId = condSet.categoryId, categoryName = self.getCategoryName(categoryId);
                                    self.conditionSetData().cId(condSet.cId);
                                    self.conditionSetData().conditionSetCode(condSet.conditionSetCode);
                                    self.conditionSetData().conditionSetName(condSet.conditionSetName);
                                    self.conditionSetData().categoryId(categoryId);
                                    if (self.listCategory() && self.listCategory().length > 0 && categoryName) {
                                        self.categoryName(categoryId + "　" + categoryName);
                                    }
                                    else {
                                        self.categoryName("");
                                    }
                                    self.conditionSetData().conditionOutputName(condSet.conditionOutputName);
                                    self.conditionSetData().autoExecution(condSet.autoExecution);
                                    self.conditionSetData().delimiter(condSet.delimiter);
                                    self.conditionSetData().stringFormat(condSet.stringFormat);
                                    self.conditionSetData().itemOutputName(condSet.itemOutputName);
                                };
                                ScreenModel.prototype.getOutItem = function (selectedConditionSettingCode) {
                                    var self = this;
                                    var itemList = [];
                                    if (selectedConditionSettingCode) {
                                        block.invisible();
                                        self.outputItemList.removeAll();
                                        b.service.outSetContent(selectedConditionSettingCode, self.standType()).done(function (itemList) {
                                            if (itemList && itemList.length > 0) {
                                                self.outputItemList(itemList);
                                            }
                                        }).always(function () {
                                            block.clear();
                                        });
                                    }
                                };
                                ScreenModel.prototype.getCategoryName = function (cateId) {
                                    var self = this;
                                    var category = _.find(self.listCategory(), function (x) { return x.categoryId == cateId; });
                                    if (category) {
                                        return category.categoryName;
                                    }
                                };
                                ScreenModel.prototype.getIndex = function (conditionCode) {
                                    var self = this;
                                    var index = _.findIndex(self.conditionSettingList(), { 'conditionSetCode': conditionCode });
                                    return index;
                                };
                                ScreenModel.prototype.deleteCnd = function () {
                                    var self = this;
                                    dialog.confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        var data = {
                                            conditionSetCode: self.selectedConditionSettingCode()
                                        };
                                        b.service.deleteCnd(data).done(function (result) {
                                            dialog.info({ messageId: "Msg_16" }).then(function () {
                                                var index = 0;
                                                if (self.index() != self.conditionSettingList().length - 1) {
                                                    index = self.index() + 1;
                                                }
                                                else {
                                                    index = self.index() - 1;
                                                }
                                                if (self.conditionSettingList().length != 1) {
                                                    self.initScreen(self.conditionSettingList()[index].conditionSetCode);
                                                }
                                                else {
                                                    self.initScreen(null);
                                                }
                                            });
                                        });
                                    });
                                };
                                ScreenModel.prototype.openCopyScreen = function () {
                                    var self = this;
                                    setShared('CMF002_T_PARAMS', {
                                        standType: self.standType(),
                                        conditionSetCd: self.selectedConditionSetting().conditionSetCode,
                                        conditionName: self.selectedConditionSetting().conditionSetName
                                    });
                                    modal("/view/cmf/002/t/index.xhtml").onClosed(function () {
                                        var params = getShared('CMF002_T_Output');
                                        if (params) {
                                            var override = params.overWrite;
                                            var destinationCode_1 = params.copyDestinationCode;
                                            var destinationName_1 = params.destinationName;
                                            var result = params.result;
                                            var copyParams = {
                                                newMode: self.isNewMode(),
                                                standType: self.standType(),
                                                destinationCode: destinationCode_1,
                                                destinationName: destinationName_1,
                                                categoryId: self.conditionSetData().categoryId(),
                                                conditionSetCode: self.conditionSetData().conditionSetCode(),
                                                conditionSetName: self.conditionSetData().conditionSetName(),
                                                conditionOutputName: self.conditionSetData().conditionOutputName(),
                                                autoExecution: self.conditionSetData().autoExecution(),
                                                delimiter: self.conditionSetData().delimiter(),
                                                itemOutputName: self.conditionSetData().itemOutputName(),
                                                stringFormat: self.conditionSetData().stringFormat()
                                            };
                                            b.service.copy(copyParams).done(function () {
                                                dialog.info({ messageId: "Msg_15" }).then(function () {
                                                    if (destinationCode_1 == self.selectedConditionSettingCode()) {
                                                        self.conditionSetData().conditionSetName(destinationName_1);
                                                    }
                                                    self.checkFocusWhenCopy = true;
                                                    self.initScreen(destinationCode_1);
                                                });
                                            });
                                        }
                                    });
                                };
                                ScreenModel.prototype.openVScreen = function () {
                                    var self = this;
                                    setShared('CMF002_V_PARAMS', {
                                        categoryId: self.conditionSetData().categoryId() || '',
                                        roleAuthority: self.roleAuthority
                                    });
                                    modal("/view/cmf/002/v1/index.xhtml").onClosed(function () {
                                        var params = getShared('CMF002_B_PARAMS');
                                        if (params) {
                                            self.conditionSetData().categoryId(params.categoryId);
                                            self.categoryName(params.categoryId + "　" + params.categoryName);
                                            nts.uk.ui.errors.clearAll();
                                        }
                                    });
                                };
                                ScreenModel.prototype.openDscreen = function () {
                                    var self = this;
                                    setShared('CMF002_D_PARAMS', {
                                        categoryName: self.categoryName(),
                                        categoryId: self.conditionSetData().categoryId(),
                                        cndSetCd: self.conditionSetData().conditionSetCode(),
                                        cndSetName: self.conditionSetData().conditionSetName()
                                    });
                                    modal("/view/cmf/002/d/index.xhtml");
                                };
                                ScreenModel.prototype.openCscreen = function () {
                                    var self = this;
                                    setShared('CMF002_C_PARAMS_FROM_B', {
                                        conditionSetCode: self.conditionSetData().conditionSetCode(),
                                        conditionSetName: self.conditionSetData().conditionSetName(),
                                        categoryId: self.conditionSetData().categoryId(),
                                        categoryName: self.categoryName(),
                                        standType: self.standType()
                                    });
                                    modal("/view/cmf/002/c/index.xhtml").onClosed(function () {
                                        var params = getShared('CMF002_B_PARAMS_FROM_C');
                                        var data = {
                                            conditionSetCd: self.conditionSetData().conditionSetCode(),
                                            standType: self.standType()
                                        };
                                        if (params.isUpdateExecution) {
                                            self.getOutItem(data.conditionSetCd);
                                        }
                                    });
                                };
                                /**
                                 * UKDesign.UniversalK.共通.CMF_補助機能.CMF002_外部出力.B:外部出力設定.B:アルゴリズム.外部出力設定期間実行.外部出力設定期間実行
                                 */
                                ScreenModel.prototype.openWscreen = function () {
                                    var vm = this;
                                    setShared('CMF002_W_PARAMS', {
                                        conditionSetCode: vm.conditionSetData().conditionSetCode(),
                                    });
                                    // W画面(出力期間を設定)を表示する
                                    modal("/view/cmf/002/w/index.xhtml").onClosed(function () {
                                        //「出力期間設定」の期間設定のするしない区分をチェック
                                        var params = getShared('CMF002_B_PARAMS_FROM_W');
                                        if (params) {
                                            vm.isSetPeriodText(params.periodSetting === 1 ? getText('CMF002_530') : getText('CMF002_531'));
                                        }
                                    });
                                };
                                ScreenModel.prototype.createNewCondition = function () {
                                    var self = this;
                                    var outputItem = [];
                                    nts.uk.ui.errors.clearAll();
                                    self.setCondSetCode('');
                                    self.selectedConditionSetting(null);
                                    self.outputItemList(outputItem);
                                    self.categoryName('');
                                    self.conditionSetData().cId('');
                                    self.conditionSetData().conditionSetCode('');
                                    self.conditionSetData().conditionSetName('');
                                    self.conditionSetData().categoryId('');
                                    self.conditionSetData().conditionOutputName(0);
                                    self.conditionSetData().autoExecution(1);
                                    self.conditionSetData().delimiter(1);
                                    self.conditionSetData().stringFormat(0);
                                    self.conditionSetData().itemOutputName(0);
                                    self.setNewMode(true);
                                    self.isSetPeriodText(getText('CMF002_531'));
                                };
                                ScreenModel.prototype.register = function () {
                                    var self = this;
                                    nts.uk.ui.errors.clearAll();
                                    $("#B5_1").trigger("validate");
                                    $("#B5_2").trigger("validate");
                                    if (!self.categoryName() || self.categoryName().trim() == '') {
                                        var CMF002_43 = uk.resource.getText('CMF002_43');
                                        $('#B6_2').ntsError('set', uk.resource.getMessage("MsgB_2", [CMF002_43]), "MsgB_2");
                                    }
                                    if (nts.uk.ui.errors.hasError()) {
                                        return;
                                    }
                                    var data = {
                                        conditionSetCode: self.conditionSetData().conditionSetCode(),
                                        categoryId: self.conditionSetData().categoryId(),
                                        delimiter: self.conditionSetData().delimiter(),
                                        itemOutputName: self.conditionSetData().itemOutputName(),
                                        autoExecution: self.conditionSetData().autoExecution(),
                                        conditionSetName: self.conditionSetData().conditionSetName(),
                                        stringFormat: self.conditionSetData().stringFormat(),
                                        conditionOutputName: self.conditionSetData().conditionOutputName(),
                                        standType: self.standType(),
                                        newMode: self.isNewMode(),
                                        listStandardOutputItem: self.outputItemList()
                                    };
                                    b.service.register(data).done(function (result) {
                                        dialog.info({ messageId: "Msg_15" }).then(function () {
                                            self.initScreen(data.conditionSetCode).then(function () {
                                                if (self.outputItemList() && self.outputItemList().length > 0) {
                                                    self.getOutItem(data.conditionSetCode);
                                                }
                                            });
                                        });
                                    }).fail(function (res) {
                                        if (res)
                                            dialog.alertError(res);
                                    });
                                };
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    if (!self.roleAuthority) {
                                        self.listCategory(null);
                                        return;
                                    }
                                    var dfd = $.Deferred();
                                    block.invisible();
                                    $.when(b.service.getCategory(self.roleAuthority)).done(function (data) {
                                        if (data && data.length > 0) {
                                            self.listCategory(data);
                                        }
                                        self.initScreen(null);
                                        dfd.resolve(self);
                                    }).fail(function (error) {
                                        dialog.alertError(error);
                                        dfd.reject();
                                    }).always(function () {
                                        self.focusUpDown();
                                        block.clear();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.focusUpDown = function () {
                                    $("#B14_2-up").click(function () {
                                        $("#B13_2_container").focus();
                                    });
                                    $("#B14_2-down").click(function () {
                                        $("#B13_2_container").focus();
                                    });
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            //条件名出力選択, 項目名出力選択
                            function getNotUseAtrItems() {
                                return [
                                    new model.ItemModel(1, getText('CMF002_47')),
                                    new model.ItemModel(0, getText('CMF002_48'))
                                ];
                            }
                            viewmodel.getNotUseAtrItems = getNotUseAtrItems;
                            //区切り文字選択
                            function getDelimiterItems() {
                                return [
                                    new model.ItemModel(0, getText('CMF002_358')),
                                    new model.ItemModel(1, getText('CMF002_359')),
                                    new model.ItemModel(2, getText('CMF002_360')),
                                    new model.ItemModel(3, getText('CMF002_361')),
                                    new model.ItemModel(4, getText('CMF002_362'))
                                ];
                            }
                            viewmodel.getDelimiterItems = getDelimiterItems;
                            //文字列形式選択
                            function getStringFormatItems() {
                                return [
                                    new model.ItemModel(0, getText('CMF002_363')),
                                    new model.ItemModel(1, getText('CMF002_364')),
                                    new model.ItemModel(2, getText('CMF002_365'))
                                ];
                            }
                            viewmodel.getStringFormatItems = getStringFormatItems;
                            var ConditionSet = /** @class */ (function () {
                                function ConditionSet(param) {
                                    this.cId = ko.observable('');
                                    this.conditionSetCode = ko.observable('');
                                    this.conditionSetName = ko.observable('');
                                    this.categoryId = ko.observable('');
                                    this.conditionOutputName = ko.observable(0);
                                    this.autoExecution = ko.observable(1);
                                    this.delimiter = ko.observable(0);
                                    this.stringFormat = ko.observable(0);
                                    this.itemOutputName = ko.observable('');
                                    var self = this;
                                    self.cId(param.cId);
                                    self.conditionSetCode(param.conditionSetCode || '');
                                    self.conditionSetName(param.conditionSetName || '');
                                    self.categoryId(param.categoryId || '');
                                    self.conditionOutputName(param.conditionOutputName || 0);
                                    self.autoExecution(param.autoExecution || 1);
                                    self.delimiter(param.delimiter || 0);
                                    self.stringFormat(param.stringFormat || 0);
                                    self.itemOutputName(param.itemOutputName || '');
                                }
                                return ConditionSet;
                            }());
                            viewmodel.ConditionSet = ConditionSet;
                            var OutputItem = /** @class */ (function () {
                                function OutputItem(param) {
                                    this.outItemCd = ko.observable('');
                                    this.outItemName = ko.observable('');
                                    this.order = ko.observable(0);
                                    var self = this;
                                    self.outItemCd(param.outItemCd || '');
                                    self.outItemName(param.outItemName || '');
                                    self.order(param.order || 0);
                                }
                                return OutputItem;
                            }());
                            viewmodel.OutputItem = OutputItem;
                            var Category = /** @class */ (function () {
                                function Category(param) {
                                    this.categoryId = ko.observable('');
                                    this.categoryName = ko.observable('');
                                    var self = this;
                                    self.categoryId(param.categoryId || '');
                                    self.categoryName(param.categoryName || '');
                                }
                                return Category;
                            }());
                            viewmodel.Category = Category;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cmf002.b || (cmf002.b = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.b.vm.js.map