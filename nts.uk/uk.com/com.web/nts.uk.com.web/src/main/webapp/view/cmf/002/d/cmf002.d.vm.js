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
                    var d;
                    (function (d) {
                        var viewmodel;
                        (function (viewmodel) {
                            var close = nts.uk.ui.windows.close;
                            var getText = nts.uk.resource.getText;
                            var getShared = nts.uk.ui.windows.getShared;
                            var block = nts.uk.ui.block;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var shareModel = cmf002.share.model;
                            var info = nts.uk.ui.dialog.info;
                            var validation = nts.uk.ui.validation;
                            var isNullOrEmpty = nts.uk.text.isNullOrEmpty;
                            var ScreenModel = /** @class */ (function () {
                                /**
                                * Constructor.
                                */
                                function ScreenModel() {
                                    this.selectedSearchTable = ko.observable(null);
                                    this.tableItemList = ko.observableArray([]);
                                    this.selectedTable = ko.observable(null);
                                    this.selectedSearchItem = ko.observable(null);
                                    this.itemList = ko.observableArray([]);
                                    this.selectedItem = ko.observable(null);
                                    this.ctgItemDataList = ko.observableArray([]);
                                    this.cndDetai = ko.observable(null);
                                    this.selectedSeriNum = ko.observable(null);
                                    // declare var of params screen B
                                    this.categoryName = '';
                                    this.categoryId = '';
                                    this.cndSetCd = '';
                                    this.cndSetName = '';
                                    var self = this;
                                    self.standardAtr = shareModel.STANDARD_ATR.STANDARD;
                                    self.registerMode = shareModel.SCREEN_MODE.NEW;
                                    self.selectedTable.subscribe(function (table) {
                                        var items = _.filter(self.ctgItemDataList(), { "tableName": table });
                                        self.itemList(items);
                                        self.focusFirstRowD5_4();
                                        $('#D5_4_container').focus();
                                    });
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    block.invisible();
                                    // get data from screen B
                                    var params = getShared('CMF002_D_PARAMS');
                                    if (params) {
                                        self.categoryName = params.categoryName;
                                        self.categoryId = params.categoryId;
                                        self.cndSetCd = params.cndSetCd;
                                        self.cndSetName = params.cndSetName;
                                        d.service.getListCtgItems(params.cndSetCd, params.categoryId).done(function (res) {
                                            //get data return from server
                                            var outputItemList = res;
                                            if (res.cndDetai == null) {
                                                self.registerMode = shareModel.SCREEN_MODE.NEW;
                                                self.cndDetai(new OutCndDetailDto(self.cndSetCd, "", []));
                                            }
                                            else {
                                                self.registerMode = shareModel.SCREEN_MODE.UPDATE;
                                                self.cndDetai(OutCndDetailDto.fromApp(res.cndDetai));
                                            }
                                            var ctgItemDataList = _.map(res.ctgItemDataList, function (item) {
                                                // [ver62] ドメインモデル「外部出力カテゴリ項目データ.予約語区分」の値から予約語に変換するかどうか判断する
                                                var itemName = item.keywordAtr === 1
                                                    ? self.reverseWord(item.itemName)
                                                    : item.itemName;
                                                item.itemName = itemName;
                                                return item;
                                            });
                                            self.ctgItemDataList(ctgItemDataList);
                                            self.loadDetaiItemGrid();
                                            self.setCssClass();
                                            block.clear();
                                            dfd.resolve();
                                        }).fail(function (res) {
                                            alertError(res);
                                            block.clear();
                                            dfd.reject();
                                        });
                                    }
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.setTableItemList = function () {
                                    var self = this;
                                    self.tableItemList.removeAll();
                                    var tableUniq = _.uniqBy(self.ctgItemDataList(), 'tableName');
                                    _.each(tableUniq, function (item) {
                                        self.tableItemList.push(new TableItem(item.tableName, item.displayTableName));
                                    });
                                    self.focusFirstRowD5_2();
                                };
                                ScreenModel.prototype.focusFirstRowD5_2 = function () {
                                    var self = this;
                                    if (_.isEmpty(self.tableItemList())) {
                                        self.selectedTable(null);
                                    }
                                    else {
                                        self.selectedTable(_.head(self.tableItemList()).tableName);
                                    }
                                };
                                ScreenModel.prototype.focusFirstRowD5_4 = function () {
                                    var self = this;
                                    if (_.isEmpty(self.itemList())) {
                                        self.selectedItem(null);
                                    }
                                    else {
                                        self.selectedItem(_.head(self.itemList()).itemNo);
                                    }
                                };
                                ScreenModel.prototype.setDataInitDetailItem = function () {
                                    var self = this;
                                    _.each(self.cndDetai().listOutCndDetailItem(), function (item) {
                                        var ctgItem = self.getCtgItem(item.categoryItemNo());
                                        if (ctgItem) {
                                            item.dataType = ctgItem.dataType;
                                            item.subscribeCondBetween(item.conditionSymbol());
                                            item.searchValueCd = ctgItem.searchValueCd;
                                            item.switchView(OutCndDetailItemDto.getSwitchView(item.dataType, item.conditionSymbol()));
                                            item.formatSearchCodeList(item.joinCode);
                                            item.clearData();
                                        }
                                        else {
                                            item.dataType = null;
                                        }
                                    });
                                };
                                ScreenModel.prototype.loadDetaiItemGrid = function () {
                                    var self = this;
                                    self.setTableItemList();
                                    self.setDataInitDetailItem();
                                    $("#fixed-table").ntsFixedTable({ height: 328 });
                                };
                                ScreenModel.prototype.getCtgItem = function (itemNo) {
                                    var self = this;
                                    return _.find(self.ctgItemDataList(), { 'itemNo': itemNo });
                                };
                                ScreenModel.prototype.getItemName = function (itemNo) {
                                    var self = this;
                                    var item = self.getCtgItem(itemNo);
                                    if (item) {
                                        return item.itemName;
                                    }
                                    return "";
                                };
                                ScreenModel.prototype.getComboboxSource = function (searchValueCd, dataType) {
                                    var self = this;
                                    if (dataType != null) {
                                        return shareModel.getConditonSymbol(searchValueCd, dataType);
                                    }
                                    return [];
                                };
                                ScreenModel.prototype.register = function () {
                                    var self = this;
                                    block.invisible();
                                    _.each(self.cndDetai().listOutCndDetailItem(), function (item) {
                                        item.validate();
                                    });
                                    if (nts.uk.ui.errors.hasError()) {
                                        block.clear();
                                        return;
                                    }
                                    _.each(self.cndDetai().listOutCndDetailItem(), function (item) {
                                        var listSearchCodeList = [];
                                        if (item.switchView() != SWITCH_VIEW.SEARCH_CODE_LIST)
                                            return;
                                        _.each(item.parsedValSearchCodeList, function (searchCode) {
                                            var newSearchCode = new SearchCodeListDto(item.conditionSettingCd(), item.categoryId(), item.categoryItemNo(), item.seriNum(), _.trim(searchCode), self.getItemName(item.categoryItemNo()));
                                            listSearchCodeList.push(newSearchCode);
                                        });
                                        item.listSearchCodeList = listSearchCodeList;
                                    });
                                    var command = new OutCndDetailInfoCommand(OutCndDetailCommand.fromDto(self.cndDetai()), self.standardAtr, self.registerMode);
                                    d.service.register(command).done(function () {
                                        self.registerMode = shareModel.SCREEN_MODE.UPDATE;
                                        info({ messageId: "Msg_15" }).then(function () {
                                            self.focusFirstRowD5_2();
                                            $('#D5_2_container').focus();
                                        });
                                    }).fail(function (res) {
                                        alertError(res);
                                    }).always(function () {
                                        self.setCssClass();
                                        block.clear();
                                    });
                                };
                                //終了する
                                ScreenModel.prototype.closeDialog = function () {
                                    close();
                                };
                                ScreenModel.prototype.btnRightClick = function () {
                                    var self = this;
                                    if (self.selectedItem() == null) {
                                        return;
                                    }
                                    var seriNum = 1;
                                    var item = self.getCtgItem(parseInt(self.selectedItem()));
                                    var itemDetail = _.maxBy(ko.toJS(self.cndDetai().listOutCndDetailItem()), 'seriNum');
                                    if (itemDetail) {
                                        seriNum = itemDetail.seriNum + 1;
                                    }
                                    var newItemDetail = new OutCndDetailItemDto(self.categoryId, item.itemNo, seriNum, self.cndSetCd, null);
                                    newItemDetail.dataType = item.dataType;
                                    newItemDetail.subscribeCondBetween(newItemDetail.conditionSymbol());
                                    newItemDetail.searchValueCd = item.searchValueCd;
                                    self.cndDetai().listOutCndDetailItem.push(newItemDetail);
                                    self.setCssClass();
                                };
                                ScreenModel.prototype.btnLeftClick = function () {
                                    var self = this;
                                    if (self.selectedSeriNum() == null) {
                                        return;
                                    }
                                    self.cndDetai().listOutCndDetailItem.remove(function (item) {
                                        if (item.seriNum() == self.selectedSeriNum()) {
                                            item.removeValidate();
                                            return true;
                                        }
                                        return false;
                                    });
                                    self.setCssClass();
                                    self.selectedSeriNum(null);
                                };
                                ScreenModel.prototype.selectDetailItem = function (seriNum) {
                                    var self = this;
                                    self.selectedSeriNum(seriNum);
                                    $("#fixed-table tr").removeClass("my-active-row");
                                    $("#fixed-table tr[data-id='" + seriNum + "']").addClass("my-active-row");
                                };
                                ScreenModel.prototype.setCssClass = function () {
                                    // let self = this;
                                    // _.each(self.cndDetai().listOutCndDetailItem(), (item: OutCndDetailItemDto) => {
                                    //     item.clazz("")
                                    // })
                                    // let length = self.cndDetai().listOutCndDetailItem().length;
                                    // if (length > 6) {
                                    //     let lastItem1: OutCndDetailItemDto = self.cndDetai().listOutCndDetailItem()[length - 1];
                                    //     lastItem1.clazz("last-item");
                                    // }
                                    // if (length > 7) {
                                    //     let lastItem2: OutCndDetailItemDto = self.cndDetai().listOutCndDetailItem()[length - 2];
                                    //     lastItem2.clazz("last-item");
                                    // }
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
                            var TableItem = /** @class */ (function () {
                                function TableItem(tableName, displayTableName) {
                                    this.tableName = tableName;
                                    this.displayTableName = displayTableName;
                                }
                                return TableItem;
                            }());
                            var CtgItemDataCndDetailDto = /** @class */ (function () {
                                function CtgItemDataCndDetailDto(ctgItemDataList, cndDetaiList) {
                                    this.ctgItemDataList = ctgItemDataList;
                                    this.cndDetai = cndDetaiList;
                                }
                                return CtgItemDataCndDetailDto;
                            }());
                            var CtgItemDataDto = /** @class */ (function () {
                                function CtgItemDataDto(categoryId, itemNo, tableName, displayTableName, itemName, dataType, searchValueCd, displayClassfication) {
                                    this.categoryId = categoryId;
                                    this.itemNo = itemNo;
                                    this.tableName = tableName;
                                    this.displayTableName = displayTableName;
                                    this.itemName = itemName;
                                    this.dataType = dataType;
                                    this.searchValueCd = searchValueCd;
                                    this.displayClassfication = displayClassfication;
                                }
                                return CtgItemDataDto;
                            }());
                            var OutCndDetailDto = /** @class */ (function () {
                                function OutCndDetailDto(conditionSettingCd, exterOutCdnSql, listOutCndDetailItem) {
                                    this.conditionSettingCd = conditionSettingCd;
                                    this.exterOutCdnSql = exterOutCdnSql;
                                    this.listOutCndDetailItem = ko.observableArray(listOutCndDetailItem);
                                }
                                OutCndDetailDto.fromApp = function (app) {
                                    var listOutCndDetailItem = [];
                                    _.each(app.listOutCndDetailItem, function (item) {
                                        listOutCndDetailItem.push(OutCndDetailItemDto.fromApp(item));
                                    });
                                    return new OutCndDetailDto(app.conditionSettingCd, app.exterOutCdnSql, listOutCndDetailItem);
                                };
                                return OutCndDetailDto;
                            }());
                            var OutCndDetailItemDto = /** @class */ (function () {
                                function OutCndDetailItemDto(categoryId, categoryItemNo, seriNum, conditionSettingCd, conditionSymbol) {
                                    this.charValidator = new validation.StringValidator("", "OutCndCharVal", { required: true });
                                    this.numberValidator = new validation.NumberValidator("", "OutCndNumVal", { required: true });
                                    this.timeValidator = new validation.TimeValidator("", "AttendanceTime", { required: true, valueType: "Clock", inputFormat: "hh:mm", outputFormat: "time", mode: "time" });
                                    this.clockValidator = new validation.TimeValidator("", "AttendanceClock", { required: true, valueType: "TimeWithDay", inputFormat: "hh:mm", outputFormat: "time", mode: "time" });
                                    this.searchCdValidator = new validation.StringValidator("", "ExtOutCndSearchCd", { required: true });
                                    var self = this;
                                    self.categoryId = ko.observable(categoryId);
                                    self.categoryItemNo = ko.observable(categoryItemNo);
                                    self.seriNum = ko.observable(seriNum);
                                    self.conditionSettingCd = ko.observable(conditionSettingCd);
                                    self.conditionSymbol = ko.observable(conditionSymbol);
                                    self.searchNum = ko.observable(null);
                                    self.searchNumEndVal = ko.observable(null);
                                    self.searchNumStartVal = ko.observable(null);
                                    self.searchChar = ko.observable(null);
                                    self.searchCharEndVal = ko.observable(null);
                                    self.searchCharStartVal = ko.observable(null);
                                    self.searchDate = ko.observable(null);
                                    self.searchDateEnd = ko.observable(null);
                                    self.searchDateStart = ko.observable(null);
                                    self.searchClock = ko.observable(null);
                                    self.searchClockEndVal = ko.observable(null);
                                    self.searchClockStartVal = ko.observable(null);
                                    self.searchTime = ko.observable(null);
                                    self.searchTimeEndVal = ko.observable(null);
                                    self.searchTimeStartVal = ko.observable(null);
                                    self.listSearchCodeList = [];
                                    self.joinedSearchCodeList = ko.observable(null);
                                    self.switchView = ko.observable(SWITCH_VIEW.NONE);
                                    self.searchValueCd = "";
                                    self.conditionSymbol.subscribe(function (condSymbol) {
                                        self.switchView(OutCndDetailItemDto.getSwitchView(self.dataType, condSymbol));
                                        self.subscribeCondBetween(condSymbol);
                                    });
                                    self.conditionSymbol.subscribe(function (condSymbol) {
                                        self.disposeCondBetween(condSymbol);
                                    }, null, "beforeChange");
                                    self.switchView.subscribe(function (condSymbol) {
                                        self.clearData();
                                    });
                                    self.clazz = ko.observable("");
                                }
                                OutCndDetailItemDto.prototype.subscribeCondBetween = function (condSymbol) {
                                    var _this = this;
                                    var self = this;
                                    if (shareModel.CONDITION_SYMBOL.BETWEEN != condSymbol) {
                                        return;
                                    }
                                    switch (self.dataType) {
                                        case shareModel.ITEM_TYPE.CHARACTER:
                                            self.subCharStart = self.searchCharStartVal.subscribe(function (value) {
                                                _this.clearError("D6_C4_3");
                                                _this.checkError("D6_C4_3");
                                            });
                                            break;
                                        case shareModel.ITEM_TYPE.NUMERIC:
                                            self.subNumStart = self.searchNumStartVal.subscribe(function (value) {
                                                _this.clearError("D6_C4_6");
                                                _this.checkError("D6_C4_6");
                                            });
                                            break;
                                        case shareModel.ITEM_TYPE.DATE:
                                            self.subDateStart = self.searchDateStart.subscribe(function (value) {
                                                _this.clearError("D6_C4_9");
                                                _this.checkError("D6_C4_9");
                                            });
                                            break;
                                        case shareModel.ITEM_TYPE.TIME:
                                            self.subTimeStart = self.searchTimeStartVal.subscribe(function (value) {
                                                _this.clearError("D6_C4_12");
                                                _this.checkError("D6_C4_12");
                                            });
                                            break;
                                        case shareModel.ITEM_TYPE.INS_TIME:
                                            self.subClockStart = self.searchClockStartVal.subscribe(function (value) {
                                                _this.clearError("D6_C4_15");
                                                _this.checkError("D6_C4_15");
                                            });
                                            break;
                                    }
                                };
                                OutCndDetailItemDto.prototype.disposeCondBetween = function (condSymbol) {
                                    var self = this;
                                    if (shareModel.CONDITION_SYMBOL.BETWEEN != condSymbol) {
                                        return;
                                    }
                                    switch (self.dataType) {
                                        case shareModel.ITEM_TYPE.CHARACTER:
                                            self.subCharStart.dispose();
                                            break;
                                        case shareModel.ITEM_TYPE.NUMERIC:
                                            self.subNumStart.dispose();
                                            break;
                                        case shareModel.ITEM_TYPE.DATE:
                                            self.subDateStart.dispose();
                                            break;
                                        case shareModel.ITEM_TYPE.TIME:
                                            self.subTimeStart.dispose();
                                            break;
                                        case shareModel.ITEM_TYPE.INS_TIME:
                                            self.subClockStart.dispose();
                                            break;
                                    }
                                };
                                OutCndDetailItemDto.prototype.formatSearchCodeList = function (joinCode) {
                                    var self = this;
                                    if (joinCode == null) {
                                        return;
                                    }
                                    if (self.dataType == shareModel.ITEM_TYPE.TIME || self.dataType == shareModel.ITEM_TYPE.INS_TIME) {
                                        var parseCode_1 = [];
                                        var codes = joinCode.split(',');
                                        _.each(codes, function (code) {
                                            parseCode_1.push(nts.uk.time.parseTime(code, true).format());
                                        });
                                        this.joinedSearchCodeList(parseCode_1.join(', '));
                                    }
                                    else {
                                        this.joinedSearchCodeList(joinCode);
                                    }
                                };
                                OutCndDetailItemDto.prototype.clearError = function (control) {
                                    var self = this;
                                    $("#fixed-table tr[data-id='" + self.seriNum() + "'] ." + control).ntsError('clear');
                                };
                                OutCndDetailItemDto.prototype.checkError = function (control) {
                                    var self = this;
                                    $("#fixed-table tr[data-id='" + self.seriNum() + "'] ." + control).ntsError('check');
                                };
                                OutCndDetailItemDto.prototype.setError = function (control, messageId) {
                                    var self = this;
                                    $("#fixed-table tr[data-id='" + self.seriNum() + "'] ." + control).ntsError('set', { messageId: messageId });
                                };
                                OutCndDetailItemDto.prototype.setErrorCompare = function (control1, control2) {
                                    var self = this;
                                    $("#fixed-table tr[data-id='" + self.seriNum() + "'] ." + control2)
                                        .ntsError('set', { messageId: 'Msg_1401', messageParams: [getText(self.getControlName(control2)), getText(self.getControlName(control1))] });
                                };
                                OutCndDetailItemDto.prototype.getControlName = function (control) {
                                    switch (control) {
                                        case 'D6_C4_1': return 'CMF002_106';
                                        case 'D6_C4_2': return 'CMF002_107';
                                        case 'D6_C4_3': return 'CMF002_108';
                                        case 'D6_C4_4': return 'CMF002_106';
                                        case 'D6_C4_5': return 'CMF002_107';
                                        case 'D6_C4_6': return 'CMF002_108';
                                        case 'D6_C4_7': return 'CMF002_106';
                                        case 'D6_C4_8': return 'CMF002_107';
                                        case 'D6_C4_9': return 'CMF002_108';
                                        case 'D6_C4_10': return 'CMF002_106';
                                        case 'D6_C4_11': return 'CMF002_107';
                                        case 'D6_C4_12': return 'CMF002_108';
                                        case 'D6_C4_13': return 'CMF002_106';
                                        case 'D6_C4_14': return 'CMF002_107';
                                        case 'D6_C4_15': return 'CMF002_108';
                                        case 'D6_C4_16': return 'CMF002_355';
                                    }
                                };
                                OutCndDetailItemDto.prototype.clearData = function () {
                                    var self = this;
                                    // 文字型
                                    if (self.switchView() != SWITCH_VIEW.CHARACTER_NORMAL) {
                                        self.searchChar(null);
                                        self.clearError("D6_C4_1");
                                    }
                                    if (self.switchView() != SWITCH_VIEW.CHARACTER_PERIOD) {
                                        self.searchCharStartVal(null);
                                        self.searchCharEndVal(null);
                                        self.clearError("D6_C4_2");
                                        self.clearError("D6_C4_3");
                                    }
                                    // 数値型
                                    if (self.switchView() != SWITCH_VIEW.NUMERIC_NORMAL) {
                                        self.searchNum(null);
                                        self.clearError("D6_C4_4");
                                    }
                                    if (self.switchView() != SWITCH_VIEW.NUMERIC_PERIOD) {
                                        self.searchNumStartVal(null);
                                        self.searchNumEndVal(null);
                                        self.clearError("D6_C4_5");
                                        self.clearError("D6_C4_6");
                                    }
                                    // 日付型
                                    if (self.switchView() != SWITCH_VIEW.DATE_NORMAL) {
                                        self.searchDate(null);
                                        self.clearError("D6_C4_7");
                                    }
                                    if (self.switchView() != SWITCH_VIEW.DATE_PERIOD) {
                                        self.searchDateStart(null);
                                        self.searchDateEnd(null);
                                        self.clearError("D6_C4_8");
                                        self.clearError("D6_C4_9");
                                    }
                                    // 時間型
                                    if (self.switchView() != SWITCH_VIEW.TIME_NORMAL) {
                                        self.searchTime(null);
                                        self.clearError("D6_C4_10");
                                    }
                                    if (self.switchView() != SWITCH_VIEW.TIME_PERIOD) {
                                        self.searchTimeStartVal(null);
                                        self.searchTimeEndVal(null);
                                        self.clearError("D6_C4_11");
                                        self.clearError("D6_C4_12");
                                    }
                                    // 時刻型
                                    if (self.switchView() != SWITCH_VIEW.INS_TIME_NORMAL) {
                                        self.searchClock(null);
                                        self.clearError("D6_C4_13");
                                    }
                                    if (self.switchView() != SWITCH_VIEW.INS_TIME_PERIOD) {
                                        self.searchClockStartVal(null);
                                        self.searchClockEndVal(null);
                                        self.clearError("D6_C4_14");
                                        self.clearError("D6_C4_15");
                                    }
                                    if (self.switchView() != SWITCH_VIEW.SEARCH_CODE_LIST) {
                                        self.joinedSearchCodeList(null);
                                        self.clearError("D6_C4_16");
                                    }
                                };
                                OutCndDetailItemDto.prototype.validate = function () {
                                    var self = this;
                                    var checkRequired = false;
                                    var checkCompare = false;
                                    // 項目名が存在し、記号が指定されていない項目が1件以上ある場合
                                    if (_.isNil(self.conditionSymbol())) {
                                        self.setError("D6_C3_1", "Msg_656");
                                        return;
                                    }
                                    // 検索する値が入力されていない項目が１件以上ある場合（複数の場合は全ての項目が入力されていること）
                                    switch (self.switchView()) {
                                        case SWITCH_VIEW.CHARACTER_NORMAL:
                                            if (isNullOrEmpty(self.searchChar())) {
                                                self.setError("D6_C4_1", "Msg_656");
                                                checkRequired = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.CHARACTER_PERIOD:
                                            if (isNullOrEmpty(self.searchCharStartVal())) {
                                                self.setError("D6_C4_2", "Msg_656");
                                                checkRequired = true;
                                            }
                                            if (isNullOrEmpty(self.searchCharEndVal())) {
                                                self.setError("D6_C4_3", "Msg_656");
                                                checkRequired = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.NUMERIC_NORMAL:
                                            if (isNullOrEmpty(self.searchNum())) {
                                                self.setError("D6_C4_4", "Msg_656");
                                                checkRequired = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.NUMERIC_PERIOD:
                                            if (isNullOrEmpty(self.searchNumStartVal())) {
                                                self.setError("D6_C4_5", "Msg_656");
                                                checkRequired = true;
                                            }
                                            if (isNullOrEmpty(self.searchNumEndVal())) {
                                                self.setError("D6_C4_6", "Msg_656");
                                                checkRequired = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.DATE_NORMAL:
                                            if (isNullOrEmpty(self.searchDate())) {
                                                self.setError("D6_C4_7", "Msg_656");
                                                checkRequired = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.DATE_PERIOD:
                                            if (isNullOrEmpty(self.searchDateStart())) {
                                                self.setError("D6_C4_8", "Msg_656");
                                                checkRequired = true;
                                            }
                                            if (isNullOrEmpty(self.searchDateEnd())) {
                                                self.setError("D6_C4_9", "Msg_656");
                                                checkRequired = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.TIME_NORMAL:
                                            if (isNullOrEmpty(self.searchTime())) {
                                                self.setError("D6_C4_10", "Msg_656");
                                                checkRequired = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.TIME_PERIOD:
                                            if (isNullOrEmpty(self.searchTimeStartVal())) {
                                                self.setError("D6_C4_11", "Msg_656");
                                                checkRequired = true;
                                            }
                                            if (isNullOrEmpty(self.searchTimeEndVal())) {
                                                self.setError("D6_C4_12", "Msg_656");
                                                checkRequired = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.INS_TIME_NORMAL:
                                            if (isNullOrEmpty(self.searchClock())) {
                                                self.setError("D6_C4_13", "Msg_656");
                                                checkRequired = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.INS_TIME_PERIOD:
                                            if (isNullOrEmpty(self.searchClockStartVal())) {
                                                self.setError("D6_C4_14", "Msg_656");
                                                checkRequired = true;
                                            }
                                            if (isNullOrEmpty(self.searchClockEndVal())) {
                                                self.setError("D6_C4_15", "Msg_656");
                                                checkRequired = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.SEARCH_CODE_LIST:
                                            if (isNullOrEmpty(self.joinedSearchCodeList())) {
                                                self.setError("D6_C4_16", "Msg_656");
                                                checkRequired = true;
                                            }
                                            break;
                                    }
                                    if (checkRequired) {
                                        return;
                                    }
                                    // 記号に「範囲内」が選択されている場合
                                    switch (self.switchView()) {
                                        case SWITCH_VIEW.CHARACTER_PERIOD:
                                            if (self.searchCharStartVal() > self.searchCharEndVal()) {
                                                self.setErrorCompare("D6_C4_2", "D6_C4_3");
                                                checkCompare = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.NUMERIC_PERIOD:
                                            if (parseFloat(self.searchNumStartVal()) > parseFloat(self.searchNumEndVal())) {
                                                self.setErrorCompare("D6_C4_5", "D6_C4_6");
                                                checkCompare = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.DATE_PERIOD:
                                            if (moment.utc(self.searchDateStart()).diff(moment.utc(self.searchDateEnd()), 'days') > 0) {
                                                self.setErrorCompare("D6_C4_8", "D6_C4_9");
                                                checkCompare = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.TIME_PERIOD:
                                            if (self.searchTimeStartVal() > self.searchTimeEndVal()) {
                                                self.setErrorCompare("D6_C4_11", "D6_C4_12");
                                                checkCompare = true;
                                            }
                                            break;
                                        case SWITCH_VIEW.INS_TIME_PERIOD:
                                            if (self.searchClockStartVal() > self.searchClockEndVal()) {
                                                self.setErrorCompare("D6_C4_14", "D6_C4_15");
                                                checkCompare = true;
                                            }
                                            break;
                                    }
                                    if (checkCompare) {
                                        return;
                                    }
                                    // 記号に「同じ(複数)」「同じでない(複数)」が選択されている場合
                                    if (self.switchView() == SWITCH_VIEW.SEARCH_CODE_LIST) {
                                        self.validateSearchCodeList("D6_C4_16");
                                        return;
                                    }
                                };
                                /**
                                 * 外部出力条件登録チェック複数タイプ
                                 */
                                OutCndDetailItemDto.prototype.validateSearchCodeList = function (control) {
                                    var _this = this;
                                    var self = this;
                                    var listSearchCode = _.split(self.joinedSearchCodeList(), ',');
                                    var check;
                                    this.parsedValSearchCodeList = [];
                                    _.each(listSearchCode, function (item) {
                                        var searchCode = _.trim(item);
                                        // 検索コードがカテゴリ項目の型と同じ場合
                                        switch (self.dataType) {
                                            case shareModel.ITEM_TYPE.CHARACTER:
                                                check = self.charValidator.validate(searchCode);
                                                if (!check.isValid) {
                                                    self.setError(control, "Msg_760");
                                                    return false;
                                                }
                                                _this.parsedValSearchCodeList.push(check.parsedValue);
                                                break;
                                            case shareModel.ITEM_TYPE.NUMERIC:
                                                check = self.numberValidator.validate(searchCode);
                                                if (!check.isValid) {
                                                    self.setError(control, "Msg_760");
                                                    return false;
                                                }
                                                _this.parsedValSearchCodeList.push(check.parsedValue);
                                                break;
                                            case shareModel.ITEM_TYPE.DATE:
                                                check = moment(searchCode, "YYYY/MM/DD", true);
                                                if (!check.isValid()) {
                                                    self.setError(control, "Msg_760");
                                                    return false;
                                                }
                                                _this.parsedValSearchCodeList.push(check._i);
                                                break;
                                            case shareModel.ITEM_TYPE.TIME:
                                                check = self.timeValidator.validate(searchCode);
                                                if (!check.isValid) {
                                                    self.setError(control, "Msg_760");
                                                    return false;
                                                }
                                                _this.parsedValSearchCodeList.push(check.parsedValue);
                                                break;
                                            case shareModel.ITEM_TYPE.INS_TIME:
                                                check = self.clockValidator.validate(searchCode);
                                                if (!check.isValid) {
                                                    self.setError(control, "Msg_760");
                                                    return false;
                                                }
                                                _this.parsedValSearchCodeList.push(check.parsedValue);
                                                break;
                                        }
                                        ;
                                        // 対象の値の桁数が「検索コード」の桁数より大きい場合
                                        if (!self.searchCdValidator.validate(searchCode).isValid) {
                                            self.setError(control, "Msg_1346");
                                            return false;
                                        }
                                    });
                                };
                                OutCndDetailItemDto.prototype.removeValidate = function () {
                                    var self = this;
                                    switch (self.switchView()) {
                                        case SWITCH_VIEW.CHARACTER_NORMAL:
                                            self.clearError("D6_C4_1");
                                            break;
                                        case SWITCH_VIEW.CHARACTER_PERIOD:
                                            self.clearError("D6_C4_2");
                                            self.clearError("D6_C4_3");
                                            break;
                                        case SWITCH_VIEW.NUMERIC_NORMAL:
                                            self.clearError("D6_C4_4");
                                            break;
                                        case SWITCH_VIEW.NUMERIC_PERIOD:
                                            self.clearError("D6_C4_5");
                                            self.clearError("D6_C4_6");
                                            break;
                                        case SWITCH_VIEW.DATE_NORMAL:
                                            self.clearError("D6_C4_7");
                                            break;
                                        case SWITCH_VIEW.DATE_PERIOD:
                                            self.clearError("D6_C4_8");
                                            self.clearError("D6_C4_9");
                                            break;
                                        case SWITCH_VIEW.TIME_NORMAL:
                                            self.clearError("D6_C4_10");
                                        case SWITCH_VIEW.TIME_PERIOD:
                                            self.clearError("D6_C4_11");
                                            self.clearError("D6_C4_12");
                                            break;
                                        case SWITCH_VIEW.INS_TIME_NORMAL:
                                            self.clearError("D6_C4_13");
                                            break;
                                        case SWITCH_VIEW.INS_TIME_PERIOD:
                                            self.clearError("D6_C4_14");
                                            self.clearError("D6_C4_15");
                                            break;
                                        case SWITCH_VIEW.SEARCH_CODE_LIST:
                                            self.clearError("D6_C4_16");
                                            break;
                                    }
                                };
                                OutCndDetailItemDto.getSwitchView = function (dataType, conditionSymbol) {
                                    switch (dataType) {
                                        case shareModel.ITEM_TYPE.CHARACTER:
                                            switch (conditionSymbol) {
                                                case shareModel.CONDITION_SYMBOL.BETWEEN: return SWITCH_VIEW.CHARACTER_PERIOD;
                                                case shareModel.CONDITION_SYMBOL.IN:
                                                case shareModel.CONDITION_SYMBOL.NOT_IN: return SWITCH_VIEW.SEARCH_CODE_LIST;
                                                default: return SWITCH_VIEW.CHARACTER_NORMAL;
                                            }
                                        case shareModel.ITEM_TYPE.NUMERIC:
                                            switch (conditionSymbol) {
                                                case shareModel.CONDITION_SYMBOL.BETWEEN: return SWITCH_VIEW.NUMERIC_PERIOD;
                                                case shareModel.CONDITION_SYMBOL.IN:
                                                case shareModel.CONDITION_SYMBOL.NOT_IN: return SWITCH_VIEW.SEARCH_CODE_LIST;
                                                default: return SWITCH_VIEW.NUMERIC_NORMAL;
                                            }
                                        case shareModel.ITEM_TYPE.DATE:
                                            switch (conditionSymbol) {
                                                case shareModel.CONDITION_SYMBOL.BETWEEN: return SWITCH_VIEW.DATE_PERIOD;
                                                case shareModel.CONDITION_SYMBOL.IN:
                                                case shareModel.CONDITION_SYMBOL.NOT_IN: return SWITCH_VIEW.SEARCH_CODE_LIST;
                                                default: return SWITCH_VIEW.DATE_NORMAL;
                                            }
                                        case shareModel.ITEM_TYPE.TIME:
                                            switch (conditionSymbol) {
                                                case shareModel.CONDITION_SYMBOL.BETWEEN: return SWITCH_VIEW.TIME_PERIOD;
                                                case shareModel.CONDITION_SYMBOL.IN:
                                                case shareModel.CONDITION_SYMBOL.NOT_IN: return SWITCH_VIEW.SEARCH_CODE_LIST;
                                                default: return SWITCH_VIEW.TIME_NORMAL;
                                            }
                                        case shareModel.ITEM_TYPE.INS_TIME:
                                            switch (conditionSymbol) {
                                                case shareModel.CONDITION_SYMBOL.BETWEEN: return SWITCH_VIEW.INS_TIME_PERIOD;
                                                case shareModel.CONDITION_SYMBOL.IN:
                                                case shareModel.CONDITION_SYMBOL.NOT_IN: return SWITCH_VIEW.SEARCH_CODE_LIST;
                                                default: return SWITCH_VIEW.INS_TIME_NORMAL;
                                            }
                                    }
                                };
                                OutCndDetailItemDto.fromApp = function (app) {
                                    var dto = new OutCndDetailItemDto(app.categoryId, app.categoryItemNo, app.seriNum, app.conditionSettingCd, app.conditionSymbol);
                                    dto.searchNum(app.searchNum);
                                    dto.searchNumEndVal(app.searchNumEndVal);
                                    dto.searchNumStartVal(app.searchNumStartVal);
                                    dto.searchChar(app.searchChar);
                                    dto.searchCharEndVal(app.searchCharEndVal);
                                    dto.searchCharStartVal(app.searchCharStartVal);
                                    dto.searchDate(app.searchDate);
                                    dto.searchDateEnd(app.searchDateEnd);
                                    dto.searchDateStart(app.searchDateStart);
                                    dto.searchClock(app.searchClock);
                                    dto.searchClockEndVal(app.searchClockEndVal);
                                    dto.searchClockStartVal(app.searchClockStartVal);
                                    dto.searchTime(app.searchTime);
                                    dto.searchTimeEndVal(app.searchTimeEndVal);
                                    dto.searchTimeStartVal(app.searchTimeStartVal);
                                    dto.joinCode = app.joinedSearchCodeList;
                                    return dto;
                                };
                                return OutCndDetailItemDto;
                            }());
                            var SearchCodeListDto = /** @class */ (function () {
                                function SearchCodeListDto(conditionSetCode, categoryId, categoryItemNo, seriNum, searchCode, searchItemName) {
                                    var self = this;
                                    self.conditionSetCode = conditionSetCode;
                                    self.categoryId = categoryId;
                                    self.categoryItemNo = categoryItemNo;
                                    self.seriNum = seriNum;
                                    self.searchCode = searchCode;
                                    self.searchItemName = searchItemName;
                                }
                                return SearchCodeListDto;
                            }());
                            var SWITCH_VIEW;
                            (function (SWITCH_VIEW) {
                                SWITCH_VIEW[SWITCH_VIEW["NONE"] = 0] = "NONE";
                                SWITCH_VIEW[SWITCH_VIEW["CHARACTER_NORMAL"] = 1] = "CHARACTER_NORMAL";
                                SWITCH_VIEW[SWITCH_VIEW["CHARACTER_PERIOD"] = 2] = "CHARACTER_PERIOD";
                                SWITCH_VIEW[SWITCH_VIEW["NUMERIC_NORMAL"] = 3] = "NUMERIC_NORMAL";
                                SWITCH_VIEW[SWITCH_VIEW["NUMERIC_PERIOD"] = 4] = "NUMERIC_PERIOD";
                                SWITCH_VIEW[SWITCH_VIEW["DATE_NORMAL"] = 5] = "DATE_NORMAL";
                                SWITCH_VIEW[SWITCH_VIEW["DATE_PERIOD"] = 6] = "DATE_PERIOD";
                                SWITCH_VIEW[SWITCH_VIEW["TIME_NORMAL"] = 7] = "TIME_NORMAL";
                                SWITCH_VIEW[SWITCH_VIEW["TIME_PERIOD"] = 8] = "TIME_PERIOD";
                                SWITCH_VIEW[SWITCH_VIEW["INS_TIME_NORMAL"] = 9] = "INS_TIME_NORMAL";
                                SWITCH_VIEW[SWITCH_VIEW["INS_TIME_PERIOD"] = 10] = "INS_TIME_PERIOD";
                                SWITCH_VIEW[SWITCH_VIEW["SEARCH_CODE_LIST"] = 11] = "SEARCH_CODE_LIST";
                            })(SWITCH_VIEW = viewmodel.SWITCH_VIEW || (viewmodel.SWITCH_VIEW = {}));
                            var OutCndDetailInfoCommand = /** @class */ (function () {
                                function OutCndDetailInfoCommand(outCndDetail, standardAtr, registerMode) {
                                    this.outCndDetail = outCndDetail;
                                    this.standardAtr = standardAtr;
                                    this.registerMode = registerMode;
                                }
                                return OutCndDetailInfoCommand;
                            }());
                            var OutCndDetailCommand = /** @class */ (function () {
                                function OutCndDetailCommand() {
                                }
                                OutCndDetailCommand.fromDto = function (dto) {
                                    var cmd = new OutCndDetailCommand();
                                    var listOutCndDetailItem = [];
                                    _.each(dto.listOutCndDetailItem(), function (item) {
                                        listOutCndDetailItem.push(OutCndDetailItemCommand.fromDto(item));
                                    });
                                    cmd.conditionSettingCd = dto.conditionSettingCd;
                                    cmd.exterOutCdnSql = dto.exterOutCdnSql;
                                    cmd.listOutCndDetailItem = listOutCndDetailItem;
                                    return cmd;
                                };
                                return OutCndDetailCommand;
                            }());
                            var OutCndDetailItemCommand = /** @class */ (function () {
                                function OutCndDetailItemCommand() {
                                }
                                OutCndDetailItemCommand.fromDto = function (dto) {
                                    var cmd = new OutCndDetailItemCommand();
                                    cmd.categoryId = dto.categoryId();
                                    cmd.categoryItemNo = dto.categoryItemNo();
                                    cmd.seriNum = dto.seriNum();
                                    cmd.conditionSettingCd = dto.conditionSettingCd();
                                    cmd.conditionSymbol = dto.conditionSymbol();
                                    cmd.searchNum = dto.searchNum();
                                    cmd.searchNumEndVal = dto.searchNumEndVal();
                                    cmd.searchNumStartVal = dto.searchNumStartVal();
                                    if (dto.searchChar() != "") {
                                        cmd.searchChar = dto.searchChar();
                                    }
                                    if (dto.searchCharEndVal() != "") {
                                        cmd.searchCharEndVal = dto.searchCharEndVal();
                                    }
                                    if (dto.searchCharStartVal() != "") {
                                        cmd.searchCharStartVal = dto.searchCharStartVal();
                                    }
                                    if (dto.searchDate() != null) {
                                        cmd.searchDate = moment.utc(dto.searchDate(), "YYYY/MM/DD")._d;
                                    }
                                    if (dto.searchDateEnd() != null) {
                                        cmd.searchDateEnd = moment.utc(dto.searchDateEnd(), "YYYY/MM/DD")._d;
                                    }
                                    if (dto.searchDateStart() != null) {
                                        cmd.searchDateStart = moment.utc(dto.searchDateStart(), "YYYY/MM/DD")._d;
                                    }
                                    cmd.searchClock = dto.searchClock();
                                    cmd.searchClockEndVal = dto.searchClockEndVal();
                                    cmd.searchClockStartVal = dto.searchClockStartVal();
                                    cmd.searchTime = dto.searchTime();
                                    cmd.searchTimeEndVal = dto.searchTimeEndVal();
                                    cmd.searchTimeStartVal = dto.searchTimeStartVal();
                                    cmd.listSearchCodeList = dto.listSearchCodeList;
                                    return cmd;
                                };
                                return OutCndDetailItemCommand;
                            }());
                        })(viewmodel = d.viewmodel || (d.viewmodel = {}));
                    })(d = cmf002.d || (cmf002.d = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.d.vm.js.map