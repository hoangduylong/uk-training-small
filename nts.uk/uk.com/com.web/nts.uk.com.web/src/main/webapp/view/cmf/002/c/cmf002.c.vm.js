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
                    var c;
                    (function (c) {
                        var viewmodel;
                        (function (viewmodel) {
                            var block = nts.uk.ui.block;
                            var model = cmf002.share.model;
                            var confirm = nts.uk.ui.dialog.confirm;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var info = nts.uk.ui.dialog.info;
                            var modal = nts.uk.ui.windows.sub.modal;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var errors = nts.uk.ui.errors;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.isNewMode = ko.observable(true);
                                    this.selectedStandardOutputItemCode = ko.observable("");
                                    this.listStandardOutputItem = ko.observableArray([]);
                                    this.listStandardOutputItemTemp = ko.observableArray([]);
                                    this.itemTypes = ko.observableArray([]);
                                    this.itemType = ko.observable(0);
                                    this.formulaResult = ko.observable("");
                                    this.selectedExOutputCateItemDatas = ko.observableArray([]);
                                    this.listExOutCateItemData = ko.observableArray([]);
                                    this.selectedCategoryItems = ko.observableArray([]);
                                    this.categoryItems = ko.observableArray([]);
                                    this.isUpdateExecution = ko.observable(false);
                                    var self = this;
                                    var params = getShared("CMF002_C_PARAMS_FROM_B");
                                    var _rsList = model.getItemTypes();
                                    self.itemTypes(_rsList);
                                    self.dispConditionName = ko.observable(params.conditionSetCode + "　" + params.conditionSetName);
                                    self.conditionName = ko.observable(params.conditionSetName);
                                    self.categoryName = ko.observable(params.categoryName);
                                    self.categoryId = ko.observable(params.categoryId);
                                    self.conditionCode = ko.observable(params.conditionSetCode);
                                    self.currentStandardOutputItem = ko.observable(new model.StandardOutputItem(null, null, self.conditionCode(), 0, null));
                                    self.selectedStandardOutputItemCode.subscribe(function (code) {
                                        self.clearSetting();
                                        if (code) {
                                            block.invisible();
                                            var currentOutputItem = _.find(self.listStandardOutputItem(), function (item) {
                                                return item.outItemCd() == code;
                                            });
                                            if (currentOutputItem) {
                                                self.currentStandardOutputItem(currentOutputItem);
                                                self.itemType(currentOutputItem.itemType());
                                                var categoryItems = _.map(currentOutputItem.categoryItems(), function (x) {
                                                    return new model.CategoryItem(x.categoryId(), x.categoryItemNo(), x.categoryItemName(), x.operationSymbol(), x.displayOrder);
                                                });
                                                categoryItems = _.sortBy(categoryItems, function (item) { return parseInt(item.displayOrder); });
                                                self.categoryItems(categoryItems);
                                                self.selectedCategoryItems([]);
                                                self.isNewMode(false);
                                                c.service.getDataFormatSetting(self.itemType(), self.conditionCode(), code).done(function (data) {
                                                    if (data) {
                                                        switch (self.itemType()) {
                                                            case model.ITEM_TYPE.NUMERIC:
                                                                self.numberDataFormatSetting = ko.observable(new model.NumberDataFormatSetting(data));
                                                                break;
                                                            case model.ITEM_TYPE.CHARACTER:
                                                                self.characterDataFormatSetting = ko.observable(new model.CharacterDataFormatSetting(data));
                                                                break;
                                                            case model.ITEM_TYPE.DATE:
                                                                self.dateDataFormatSetting = ko.observable(new model.DateDataFormatSetting(data));
                                                                break;
                                                            case model.ITEM_TYPE.TIME:
                                                                self.timeDataFormatSetting = ko.observable(new model.TimeDataFormatSetting(data));
                                                                break;
                                                            case model.ITEM_TYPE.INS_TIME:
                                                                self.inTimeDataFormatSetting = ko.observable(new model.InTimeDataFormatSetting(data));
                                                                break;
                                                            case model.ITEM_TYPE.AT_WORK_CLS:
                                                                self.atWorkDataOutputItem = ko.observable(new model.AtWorkDataOutputItem(data));
                                                                break;
                                                        }
                                                    }
                                                }).fail(function (error) {
                                                    alertError(error);
                                                }).always(function () {
                                                    block.clear();
                                                });
                                            }
                                            else {
                                                self.settingNewMode();
                                            }
                                            self.setFocus();
                                            _.defer(function () { errors.clearAll(); });
                                        }
                                        else {
                                            self.settingNewMode();
                                        }
                                    });
                                    self.itemType.subscribe(function (code) {
                                        self.categoryItems([]);
                                        self.selectedExOutputCateItemDatas([]);
                                        self.clearSetting();
                                        c.service.getAllCategoryItem(self.categoryId(), self.itemType()).done(function (listExOutCateItemData) {
                                            if (listExOutCateItemData && listExOutCateItemData.length) {
                                                listExOutCateItemData = _.sortBy(listExOutCateItemData, ['itemNo']);
                                                var rsCategoryItems = _.map(listExOutCateItemData, function (x) {
                                                    // [ver62] ドメインモデル「外部出力カテゴリ項目データ.予約語区分」の値から予約語に変換するかどうか判断する
                                                    var itemName = x.keywordAtr === 1
                                                        ? self.reverseWord(x.itemName)
                                                        : x.itemName;
                                                    return new model.ExternalOutputCategoryItemData(x.itemNo, itemName, x.keywordAtr);
                                                });
                                                self.listExOutCateItemData(rsCategoryItems);
                                                $('#C8_3').ntsError('clear');
                                            }
                                            else {
                                                self.listExOutCateItemData([]);
                                            }
                                        });
                                    });
                                    self.categoryItems.subscribe(function (values) {
                                        var newFormulaResult = "";
                                        if (values && values.length) {
                                            _.forEach(values, function (item) {
                                                newFormulaResult = newFormulaResult + item.dispOperationSymbol + item.categoryItemName();
                                            });
                                        }
                                        self.formulaResult(newFormulaResult);
                                    });
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    block.invisible();
                                    $.when(c.service.getAllCategoryItem(self.categoryId(), self.itemType()), self.getAllOutputItem(null)).done(function (listExOutCateItemData) {
                                        if (listExOutCateItemData && listExOutCateItemData.length) {
                                            listExOutCateItemData = _.sortBy(listExOutCateItemData, ['itemNo']);
                                            var rsCategoryItems = _.map(listExOutCateItemData, function (x) {
                                                // [ver62] ドメインモデル「外部出力カテゴリ項目データ.予約語区分」の値から予約語に変換するかどうか判断する
                                                var itemName = x.keywordAtr === 1
                                                    ? self.reverseWord(x.itemName)
                                                    : x.itemName;
                                                return new model.ExternalOutputCategoryItemData(x.itemNo, itemName, x.keywordAtr);
                                            });
                                            self.listExOutCateItemData(rsCategoryItems);
                                        }
                                        dfd.resolve(self);
                                    }).fail(function (error) {
                                        alertError(error);
                                        dfd.reject();
                                    }).always(function () {
                                        block.clear();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.clearSetting = function () {
                                    var self = this;
                                    self.atWorkDataOutputItem = undefined;
                                    self.characterDataFormatSetting = undefined;
                                    self.dateDataFormatSetting = undefined;
                                    self.inTimeDataFormatSetting = undefined;
                                    self.numberDataFormatSetting = undefined;
                                    self.timeDataFormatSetting = undefined;
                                };
                                ScreenModel.prototype.setFocus = function () {
                                    var self = this;
                                    if (self.isNewMode()) {
                                        $('#C4_1').focus();
                                    }
                                    else {
                                        $('#C7_2_container').focus();
                                    }
                                };
                                // 新規登録を実行する
                                ScreenModel.prototype.createNew = function () {
                                    var self = this;
                                    self.selectedStandardOutputItemCode("");
                                };
                                ScreenModel.prototype.settingNewMode = function () {
                                    var self = this;
                                    self.isNewMode(true);
                                    self.currentStandardOutputItem(new model.StandardOutputItem(null, null, self.conditionCode(), 0, null));
                                    self.itemType(0);
                                    self.categoryItems([]);
                                    self.setFocus();
                                    setTimeout(function () { errors.clearAll(); }, 50);
                                };
                                ScreenModel.prototype.isActiveSymbolAnd = function () {
                                    var self = this;
                                    if (self.itemType() === model.ITEM_TYPE.CHARACTER) {
                                        return true;
                                    }
                                    if (self.itemType() === model.ITEM_TYPE.AT_WORK_CLS
                                        && self.categoryItems().length === 0) {
                                        return true;
                                    }
                                    return false;
                                };
                                ScreenModel.prototype.isActiveSymbolPlus = function () {
                                    var self = this;
                                    if (self.itemType() === model.ITEM_TYPE.NUMERIC) {
                                        return true;
                                    }
                                    if (self.itemType() === model.ITEM_TYPE.DATE
                                        && self.categoryItems().length === 0) {
                                        return true;
                                    }
                                    if (self.itemType() === model.ITEM_TYPE.TIME) {
                                        return true;
                                    }
                                    if (self.itemType() === model.ITEM_TYPE.INS_TIME
                                        && self.categoryItems().length === 0) {
                                        return true;
                                    }
                                    return false;
                                };
                                ScreenModel.prototype.isActiveSymbolMinus = function () {
                                    var self = this;
                                    if (self.itemType() === model.ITEM_TYPE.NUMERIC
                                        && self.categoryItems().length > 0) {
                                        return true;
                                    }
                                    if (self.itemType() === model.ITEM_TYPE.TIME
                                        && self.categoryItems().length > 0) {
                                        return true;
                                    }
                                    return false;
                                };
                                ScreenModel.prototype.clickSymbolAnd = function () {
                                    var self = this;
                                    self.addCategoryItem(model.SYMBOL.AND);
                                };
                                ScreenModel.prototype.clickSymbolPlus = function () {
                                    var self = this;
                                    self.addCategoryItem(model.SYMBOL.PLUS);
                                };
                                ScreenModel.prototype.clickSymbolMinus = function () {
                                    var self = this;
                                    self.addCategoryItem(model.SYMBOL.MINUS);
                                };
                                ScreenModel.prototype.addCategoryItem = function (operatorSymbol) {
                                    var self = this;
                                    if ((self.itemType() === model.ITEM_TYPE.DATE || self.itemType() === model.ITEM_TYPE.INS_TIME
                                        || self.itemType() === model.ITEM_TYPE.AT_WORK_CLS) && self.selectedExOutputCateItemDatas().length > 1) {
                                        var itemType = _.find(self.itemTypes(), function (item) {
                                            return item.code == self.itemType();
                                        });
                                        alertError({ messageId: "Msg_1336", messageParams: [itemType.name] });
                                        return;
                                    }
                                    var categoryItems = self.categoryItems();
                                    var maxDisplayOrder = _.maxBy(categoryItems, function (item) {
                                        return parseInt(item.displayOrder);
                                    });
                                    var nextDisplayOrder = maxDisplayOrder ? parseInt(maxDisplayOrder.displayOrder) + 1 : 1;
                                    var _loop_1 = function (i_1) {
                                        var exOutCateItemData = _.find(self.listExOutCateItemData(), function (item) {
                                            return item.itemNo() == self.selectedExOutputCateItemDatas()[i_1];
                                        });
                                        if (categoryItems.length > 0) {
                                            categoryItems.push(new model.CategoryItem(self.categoryId(), self.selectedExOutputCateItemDatas()[i_1], exOutCateItemData.itemName(), operatorSymbol, nextDisplayOrder + i_1));
                                        }
                                        else {
                                            categoryItems.push(new model.CategoryItem(self.categoryId(), self.selectedExOutputCateItemDatas()[i_1], exOutCateItemData.itemName(), null, nextDisplayOrder + i_1));
                                        }
                                    };
                                    for (var i_1 = 0; i_1 < self.selectedExOutputCateItemDatas().length; i_1++) {
                                        _loop_1(i_1);
                                    }
                                    categoryItems = _.sortBy(categoryItems, function (item) { return parseInt(item.displayOrder); });
                                    if (categoryItems.length > 0) {
                                        $('#C10_1').ntsError('clear');
                                    }
                                    self.categoryItems(categoryItems);
                                };
                                ScreenModel.prototype.clickRemoveCtgItem = function () {
                                    var self = this;
                                    var categoryItems = self.categoryItems();
                                    _.each(self.selectedCategoryItems(), function (key) {
                                        _.remove(categoryItems, function (item) {
                                            return item.displayOrder == key;
                                        });
                                    });
                                    categoryItems = _.sortBy(categoryItems, function (item) { return parseInt(item.displayOrder); });
                                    if (categoryItems.length > 0) {
                                        categoryItems[0].operationSymbol(null);
                                    }
                                    self.categoryItems(categoryItems);
                                    self.selectedCategoryItems([]);
                                };
                                ScreenModel.prototype.getAllOutputItem = function (code) {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    block.invisible();
                                    self.listStandardOutputItem.removeAll();
                                    c.service.getOutItems(self.conditionCode()).done(function (outputItems) {
                                        //  time = performance.now();
                                        if (outputItems && outputItems.length) {
                                            var rsOutputItems = _.map(outputItems, function (x) {
                                                var listCategoryItem = _.map(x.categoryItems, function (y) {
                                                    return new model.CategoryItem(self.categoryId(), y.categoryItemNo, y.categoryItemName, y.operationSymbol, y.displayOrder);
                                                });
                                                return new model.StandardOutputItem(x.outItemCd, x.outItemName, x.condSetCd, x.itemType, listCategoryItem);
                                            });
                                            var rsOutputItemTemp = _.map(outputItems, function (x) {
                                                return { dispOutputItemCode: x.outItemCd, dispOutputItemName: x.outItemName };
                                            });
                                            self.listStandardOutputItemTemp(rsOutputItemTemp);
                                            self.listStandardOutputItem(rsOutputItems);
                                            if (code) {
                                                if (code == self.selectedStandardOutputItemCode())
                                                    self.selectedStandardOutputItemCode.valueHasMutated();
                                                else
                                                    self.selectedStandardOutputItemCode(code);
                                            }
                                            else {
                                                self.selectedStandardOutputItemCode(rsOutputItems[0].outItemCd());
                                            }
                                        }
                                        else {
                                            errors.clearAll();
                                            self.listStandardOutputItem([]);
                                            self.listStandardOutputItemTemp([]);
                                            self.settingNewMode();
                                        }
                                        dfd.resolve();
                                    }).fail(function (res) {
                                        alertError({ messageId: res.messageId });
                                        dfd.reject();
                                    }).always(function () {
                                        block.clear();
                                    });
                                    return dfd.promise();
                                };
                                // 出力項目を登録する
                                ScreenModel.prototype.registerOutputItem = function () {
                                    var self = this;
                                    errors.clearAll();
                                    var currentStandardOutputItem = self.currentStandardOutputItem();
                                    $('.nts-input').trigger("validate");
                                    currentStandardOutputItem.itemType(self.itemType());
                                    currentStandardOutputItem.categoryItems(self.categoryItems());
                                    switch (self.itemType()) {
                                        case model.ITEM_TYPE.NUMERIC:
                                            if (self.numberDataFormatSetting != undefined) {
                                                currentStandardOutputItem.numberDataFormatSetting(self.numberDataFormatSetting());
                                            }
                                            break;
                                        case model.ITEM_TYPE.CHARACTER:
                                            if (self.characterDataFormatSetting != undefined) {
                                                currentStandardOutputItem.characterDataFormatSetting(self.characterDataFormatSetting());
                                            }
                                            break;
                                        case model.ITEM_TYPE.DATE:
                                            if (self.dateDataFormatSetting != undefined) {
                                                currentStandardOutputItem.dateDataFormatSetting(self.dateDataFormatSetting());
                                            }
                                            break;
                                        case model.ITEM_TYPE.TIME:
                                            if (self.timeDataFormatSetting != undefined) {
                                                currentStandardOutputItem.timeDataFormatSetting(self.timeDataFormatSetting());
                                            }
                                            break;
                                        case model.ITEM_TYPE.INS_TIME:
                                            if (self.inTimeDataFormatSetting != undefined) {
                                                currentStandardOutputItem.inTimeDataFormatSetting(self.inTimeDataFormatSetting());
                                            }
                                            break;
                                        case model.ITEM_TYPE.AT_WORK_CLS:
                                            if (self.atWorkDataOutputItem != undefined) {
                                                currentStandardOutputItem.atWorkDataOutputItem(self.atWorkDataOutputItem());
                                            }
                                            break;
                                    }
                                    if (errors.hasError() === false && self.isValid()) {
                                        block.invisible();
                                        for (var i_2 = 0; i_2 < currentStandardOutputItem.categoryItems().length; i_2++) {
                                            currentStandardOutputItem.categoryItems()[i_2].displayOrder = (i_2 + 1);
                                        }
                                        currentStandardOutputItem.isNewMode = self.isNewMode();
                                        currentStandardOutputItem.dispOrder = self.listStandardOutputItem().length > 0 ? self.listStandardOutputItem().length + 1 : 1;
                                        // register
                                        c.service.registerOutputItem(ko.toJS(currentStandardOutputItem)).done(function () {
                                            info({ messageId: "Msg_15" });
                                            self.getAllOutputItem(currentStandardOutputItem.outItemCd()).done(function () {
                                                self.setFocus();
                                                self.isUpdateExecution(true);
                                            });
                                        }).fail(function (error) {
                                            alertError({ messageId: error.messageId });
                                        }).always(function () {
                                            block.clear();
                                        });
                                    }
                                };
                                ScreenModel.prototype.deleteOutputItem = function () {
                                    var self = this;
                                    var currentStandardOutputItem = self.currentStandardOutputItem();
                                    var listOutputItem = self.listStandardOutputItem;
                                    block.invisible();
                                    confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        if (currentStandardOutputItem.outItemCd()) {
                                            var index_1 = _.findIndex(listOutputItem(), function (x) {
                                                return x.outItemCd() == currentStandardOutputItem.outItemCd();
                                            });
                                            c.service.removeOutputItem(ko.toJS(currentStandardOutputItem)).done(function () {
                                                info({ messageId: "Msg_16" });
                                                self.getAllOutputItem(currentStandardOutputItem.outItemCd()).done(function () {
                                                    if (self.listStandardOutputItem().length == 0) {
                                                        self.selectedStandardOutputItemCode("");
                                                    }
                                                    else {
                                                        if (index_1 == self.listStandardOutputItem().length) {
                                                            self.selectedStandardOutputItemCode(self.listStandardOutputItem()[index_1 - 1].outItemCd());
                                                        }
                                                        else {
                                                            self.selectedStandardOutputItemCode(self.listStandardOutputItem()[index_1].outItemCd());
                                                        }
                                                    }
                                                    self.isUpdateExecution(true);
                                                });
                                            }).fail(function (error) {
                                                alertError({ messageId: error.messageId });
                                            }).always(function () {
                                                block.clear();
                                            });
                                        }
                                    }).then(function () {
                                        $('.nts-input').ntsError('clear');
                                        errors.clearAll();
                                        block.clear();
                                    });
                                };
                                // 外部出力項目登録確認
                                ScreenModel.prototype.isValid = function () {
                                    var self = this;
                                    if (self.categoryItems().length === 0) {
                                        $('#C10_1').ntsError('set', { messageId: "Msg_656" });
                                        return false;
                                    }
                                    if (!self.isNewMode()) {
                                        return true;
                                    }
                                    var stdOutItem = _.find(self.listStandardOutputItem(), function (x) {
                                        return x.outItemCd() === self.currentStandardOutputItem().outItemCd();
                                    });
                                    if (stdOutItem) {
                                        alertError({ messageId: "Msg_3" });
                                        return false;
                                    }
                                    return true;
                                };
                                ScreenModel.prototype.openCMF002g = function () {
                                    modal("/view/cmf/002/g/index.xhtml").onClosed(function () {
                                    });
                                };
                                ScreenModel.prototype.openCMF002h = function () {
                                    modal("/view/cmf/002/h/index.xhtml").onClosed(function () {
                                    });
                                };
                                ScreenModel.prototype.openCMF002f = function () {
                                    var self = this;
                                    setShared('CMF002_F_PARAMS', {
                                        conditionSetCode: self.conditionCode(),
                                        conditionSetName: self.conditionName(),
                                        categoryId: self.categoryId(),
                                        categoryName: self.categoryName()
                                    });
                                    modal("/view/cmf/002/f/index.xhtml").onClosed(function () {
                                        var output = getShared('CMF002_C_PARAMS_FROM_F');
                                        if (output) {
                                            if (!self.isUpdateExecution()) {
                                                self.isUpdateExecution(output.isUpdateExecution);
                                            }
                                            if (output.isUpdateExecution) {
                                                self.getAllOutputItem(self.selectedStandardOutputItemCode()).done(function () { });
                                            }
                                        }
                                    });
                                };
                                ScreenModel.prototype.openItemTypeSetting = function () {
                                    var self = this;
                                    var url = "";
                                    var paramName = "";
                                    var formatSetting = null;
                                    switch (self.itemType()) {
                                        case model.ITEM_TYPE.NUMERIC:
                                            url = "/view/cmf/002/i/index.xhtml";
                                            paramName = "CMF002_I_PARAMS";
                                            if (self.numberDataFormatSetting != undefined) {
                                                formatSetting = ko.toJS(self.numberDataFormatSetting);
                                            }
                                            break;
                                        case model.ITEM_TYPE.CHARACTER:
                                            url = "/view/cmf/002/j/index.xhtml";
                                            paramName = "CMF002_J_PARAMS";
                                            if (self.characterDataFormatSetting != undefined) {
                                                formatSetting = ko.toJS(self.characterDataFormatSetting);
                                            }
                                            break;
                                        case model.ITEM_TYPE.DATE:
                                            url = "/view/cmf/002/k/index.xhtml";
                                            paramName = "CMF002_K_PARAMS";
                                            if (self.dateDataFormatSetting != undefined) {
                                                formatSetting = ko.toJS(self.dateDataFormatSetting);
                                            }
                                            break;
                                        case model.ITEM_TYPE.TIME:
                                            url = "/view/cmf/002/l/index.xhtml";
                                            paramName = "CMF002_L_PARAMS";
                                            if (self.timeDataFormatSetting != undefined) {
                                                formatSetting = ko.toJS(self.timeDataFormatSetting);
                                            }
                                            break;
                                        case model.ITEM_TYPE.INS_TIME:
                                            url = "/view/cmf/002/m/index.xhtml";
                                            paramName = "CMF002_M_PARAMS";
                                            if (self.inTimeDataFormatSetting != undefined) {
                                                formatSetting = ko.toJS(self.inTimeDataFormatSetting);
                                            }
                                            break;
                                        case model.ITEM_TYPE.AT_WORK_CLS:
                                            url = "/view/cmf/002/n/index.xhtml";
                                            paramName = "CMF002_N_PARAMS";
                                            if (self.atWorkDataOutputItem != undefined) {
                                                formatSetting = ko.toJS(self.atWorkDataOutputItem);
                                            }
                                            break;
                                    }
                                    setShared(paramName, { screenMode: model.DATA_FORMAT_SETTING_SCREEN_MODE.INDIVIDUAL, formatSetting: formatSetting });
                                    modal(url).onClosed(function () {
                                        var output = getShared('CMF002_C_PARAMS');
                                        if (output) {
                                            var fs = output.formatSetting;
                                            switch (self.itemType()) {
                                                case model.ITEM_TYPE.NUMERIC:
                                                    if (self.numberDataFormatSetting != undefined) {
                                                        self.numberDataFormatSetting(fs);
                                                    }
                                                    else {
                                                        self.numberDataFormatSetting = ko.observable(new model.NumberDataFormatSetting(fs));
                                                    }
                                                    break;
                                                case model.ITEM_TYPE.CHARACTER:
                                                    if (self.characterDataFormatSetting != undefined) {
                                                        self.characterDataFormatSetting(fs);
                                                    }
                                                    else {
                                                        self.characterDataFormatSetting = ko.observable(new model.CharacterDataFormatSetting(fs));
                                                    }
                                                    break;
                                                case model.ITEM_TYPE.DATE:
                                                    if (self.dateDataFormatSetting != undefined) {
                                                        self.dateDataFormatSetting(fs);
                                                    }
                                                    else {
                                                        self.dateDataFormatSetting = ko.observable(new model.DateDataFormatSetting(fs));
                                                    }
                                                    break;
                                                case model.ITEM_TYPE.TIME:
                                                    if (self.timeDataFormatSetting != undefined) {
                                                        self.timeDataFormatSetting(fs);
                                                    }
                                                    else {
                                                        self.timeDataFormatSetting = ko.observable(new model.TimeDataFormatSetting(fs));
                                                    }
                                                    break;
                                                case model.ITEM_TYPE.INS_TIME:
                                                    if (self.inTimeDataFormatSetting != undefined) {
                                                        self.inTimeDataFormatSetting(fs);
                                                    }
                                                    else {
                                                        self.inTimeDataFormatSetting = ko.observable(new model.InTimeDataFormatSetting(fs));
                                                    }
                                                    break;
                                                case model.ITEM_TYPE.AT_WORK_CLS:
                                                    if (self.atWorkDataOutputItem != undefined) {
                                                        self.atWorkDataOutputItem(fs);
                                                    }
                                                    else {
                                                        self.atWorkDataOutputItem = ko.observable(new model.AtWorkDataOutputItem(fs));
                                                    }
                                                    break;
                                            }
                                        }
                                    });
                                };
                                // Close dialog
                                ScreenModel.prototype.closeSetting = function () {
                                    var self = this;
                                    setShared('CMF002_B_PARAMS_FROM_C', { isUpdateExecution: self.isUpdateExecution() });
                                    nts.uk.ui.windows.close();
                                };
                                // Reverse word
                                ScreenModel.prototype.reverseWord = function (word) {
                                    var mapReveseWord = {
                                        employment: '雇用呼称',
                                        department: '部門呼称',
                                        class: '分類呼称',
                                        jobTitle: '職位呼称',
                                        person: '社員呼称',
                                        office: '事業所呼称',
                                        work: '作業呼称',
                                        workPlace: '職場呼称',
                                        project: 'プロジェクト',
                                        adHocWork: '臨時勤務',
                                        substituteHoliday: '振休',
                                        substituteWork: '振出',
                                        compensationHoliday: '代休',
                                        exsessHoliday: '60H超過休暇',
                                        bindingTime: '拘束時間',
                                        payAbsenseDays: '給与欠勤日数',
                                        payAttendanceDays: '給与出勤日数',
                                        import: '取込',
                                        toppage: 'トップページ',
                                        code: 'コード',
                                        name: '名称',
                                    };
                                    var keyword = word.substring(word.lastIndexOf("{#") + 2, word.lastIndexOf("#}"));
                                    var reveseWord = mapReveseWord[keyword];
                                    if (!reveseWord) {
                                        return word;
                                    }
                                    return word.replace("{#".concat(keyword, "#}"), reveseWord);
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = c.viewmodel || (c.viewmodel = {}));
                    })(c = cmf002.c || (cmf002.c = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.c.vm.js.map