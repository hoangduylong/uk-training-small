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
                    var x;
                    (function (x) {
                        var viewmodel;
                        (function (viewmodel) {
                            var block = nts.uk.ui.block;
                            var getText = nts.uk.resource.getText;
                            var shareModel = cmf002.share.model;
                            var confirm = nts.uk.ui.dialog.confirm;
                            var alertError = nts.uk.ui.dialog.alertError;
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var specials = nts.uk.request.specials;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.exePeriod = ko.observable({});
                                    self.cndSetList = ko.observable([]);
                                    self.colCndSet = ko.observableArray([
                                        { headerText: getText("CMF002_307"), key: 'typeCnd', width: 40, hidden: false },
                                        { headerText: getText("CMF002_308"), key: 'code', width: 70, hidden: false },
                                        { headerText: getText("CMF002_309"), key: 'name', width: 200, hidden: false },
                                    ]);
                                    self.selectorCndSet = ko.observable("");
                                    self.execHistList = ko.observable([]);
                                    self.selectorExeHist = ko.observable({});
                                    self.execHistColumns = [
                                        // fix bug 105365
                                        { headerText: "", key: 'outputProcessId', dataType: 'string', ntsControl: "Label" },
                                        // X5_H1_2
                                        { headerText: getText("CMF002_310"), dataType: 'string', key: 'deleteFile', width: '80px', unbound: false, ntsControl: 'ButtonDel' },
                                        // X5_H1_3
                                        { headerText: getText("CMF002_311"), dataType: 'string', key: 'fileDowload', width: '80px', unbound: false, ntsControl: 'FlexImage' },
                                        // X5_H1_4
                                        { headerText: getText("CMF002_312"), template: '<div class="limited-label">${processStartDateTime}</div>', dataType: 'datetime', key: 'processStartDateTime', width: '170px' },
                                        // X5_H1_5
                                        { headerText: getText("CMF002_313"), template: '<div class="limited-label">${empName}</div>', dataType: 'string', key: 'empName', width: '150px' },
                                        // X5_H1_6
                                        { headerText: getText("CMF002_314"), template: '<div class="limited-label">${nameSetting}</div>', dataType: 'string', key: 'nameSetting', width: '100px' },
                                        // X5_H1_7t
                                        // { headerText: getText("CMF002_315"), dataType: 'string', key: 'standardClass', width: '70px' },
                                        // X5_H1_8
                                        { headerText: getText("CMF002_316"), template: '<div class="limited-label">${executeFormName}</div>', dataType: 'string', key: 'executeFormName', width: '70px' },
                                        // X5_H1_9
                                        { headerText: getText("CMF002_317"), template: '<div class="limited-label">${numberOfPerson}</div>', dataType: 'string', key: 'numberOfPerson', width: '70px' },
                                        // X5_H1_10
                                        { headerText: getText("CMF002_318"), template: '<div class="limited-label">${resultStatusName}</div>', dataType: 'string', key: 'resultStatusName', width: '70px' },
                                        // X5_H1_11
                                        { headerText: getText("CMF002_319"), template: '<div class="limited-label">${totalErrorCountName}</div>', dataType: 'string', key: 'totalErrorCountName', width: '70px' },
                                        // X5_H1_12
                                        // fix bug 105365
                                        { headerText: getText("CMF002_320"), dataType: 'string', key: 'totalErrorCountBtn', width: '50px', unbound: true, ntsControl: 'ButtonLog' },
                                        // X5_H1_13
                                        { headerText: getText("CMF002_321"), template: '<div class="limited-label">${fileName}</div>', dataType: 'string', key: 'fileName', width: '190px' },
                                        // X5_H1_14
                                        { headerText: getText("CMF002_322"), template: '<div class="limited-label">${fileSize}</div>', dataType: 'string', key: 'fileSize', width: '100px' },
                                    ];
                                    self.execHistControl = [
                                        { name: 'ButtonDel', text: getText('CMF002_323'), click: function (item) { self.deleteFile(item.outputProcessId); }, controlType: 'Button', enable: true },
                                        { name: 'FlexImage', source: 'img-icon icon-download', click: function (key, outputProcessId) { self.downloadFile(outputProcessId); }, controlType: 'FlexImage' },
                                        { name: 'ButtonLog', text: getText('CMF002_324'), click: function (item) { self.nextToScreenY(item.outputProcessId); }, controlType: 'Button', enable: true },
                                    ];
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this, dfd = $.Deferred();
                                    block.invisible();
                                    self.roleAuthority = getShared("CMF002X_PARAMS");
                                    x.service.getExecHist(self.roleAuthority).done(function (data) {
                                        self.exePeriod().startDate = data.startDate;
                                        self.exePeriod().endDate = data.endDate;
                                        self.exOutCtgIdList = data.exOutCtgIdList;
                                        // 取得した一覧の先頭に「すべて」を追加
                                        self.cndSetList().push(CndSet.createFirstLine());
                                        _.forEach(data.condSetList, function (item) {
                                            self.cndSetList().push(CndSet.fromApp(item));
                                        });
                                        _.forEach(data.execHistList, function (item) {
                                            self.execHistList().push(ExecHist.fromApp(item));
                                        });
                                        self.loadGrid();
                                        block.clear();
                                        dfd.resolve();
                                    }).fail(function (err) {
                                        alertError(err);
                                        block.clear();
                                        dfd.reject();
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.loadGrid = function () {
                                    var self = this;
                                    var cellStates = self.getCellStates(self.execHistList());
                                    $("#execHistGrid").ntsGrid({
                                        width: "1220px",
                                        height: '259px',
                                        dataSource: self.execHistList(),
                                        primaryKey: 'outputProcessId',
                                        rowVirtualization: true,
                                        virtualization: true,
                                        virtualizationMode: 'continuous',
                                        hidePrimaryKey: true,
                                        columns: self.execHistColumns,
                                        ntsControls: self.execHistControl,
                                        features: [
                                            {
                                                name: 'Selection',
                                                mode: 'row',
                                                multipleSelection: false
                                            },
                                            {
                                                name: 'Paging',
                                                pageSize: 5,
                                                currentPageIndex: 0
                                            }
                                        ],
                                        ntsFeatures: [
                                            {
                                                name: 'CellState',
                                                rowId: 'rowId',
                                                columnKey: 'columnKey',
                                                state: 'state',
                                                states: cellStates
                                            },
                                        ],
                                        dataBound: function (evt, ui) {
                                            $(".limited-label-view").remove();
                                        }
                                    });
                                };
                                ScreenModel.prototype.getCellStates = function (items) {
                                    var self = this;
                                    var result = [];
                                    _.each(items, function (item) {
                                        var rowId = item.outputProcessId;
                                        // ファイル削除
                                        if (item.deleteFile == shareModel.NOT_USE_ATR.USE) {
                                            result.push(new CellState(rowId, 'deleteFile', ['hide']));
                                        }
                                        // ダウンロード
                                        if (item.fileDowload == shareModel.NOT_USE_ATR.USE) {
                                            result.push(new CellState(rowId, 'fileDowload', ['hide']));
                                        }
                                        if (item.totalErrorCount == 0) {
                                            result.push(new CellState(rowId, 'totalErrorCountBtn', ['hide']));
                                        }
                                    });
                                    return result;
                                };
                                ScreenModel.prototype.deleteFile = function (outputProcessId) {
                                    var self = this;
                                    var execHist = _.find(self.execHistList(), { outputProcessId: outputProcessId });
                                    confirm({ messageId: "Msg_18" }).ifYes(function () {
                                        block.invisible();
                                        var checkFile = specials.isFileExist(execHist.fileId);
                                        // ドメインモデル「外部出力実行結果ログ」を更新する
                                        var updateDeleteFile = x.service.useDeleteFile(execHist.outputProcessId);
                                        $.when(checkFile, updateDeleteFile).done(function (isExist, useDelFile) {
                                            if (useDelFile == shareModel.NOT_USE_ATR.USE) {
                                                if (isExist) {
                                                    // サーバーの「ファイルID」のファイルを削除する
                                                    specials.deleteFile(execHist.fileId);
                                                }
                                                execHist.updateDeleteFile(shareModel.NOT_USE_ATR.USE);
                                                // update grid
                                                $("#execHistGrid").ntsGrid("setState", execHist.outputProcessId, "deleteFile", ['hide']);
                                                $("#execHistGrid").ntsGrid("setState", execHist.outputProcessId, "fileDowload", ['hide']);
                                            }
                                        }).fail(function (err) {
                                            alertError(err);
                                        }).always(function () {
                                            block.clear();
                                            self.focusX5();
                                        });
                                    });
                                    self.focusX5();
                                };
                                ScreenModel.prototype.downloadFile = function (outputProcessId) {
                                    var self = this;
                                    var fileId = _.find(self.execHistList(), { outputProcessId: outputProcessId }).fileId;
                                    nts.uk.request.specials.donwloadFile(fileId);
                                    self.focusX5();
                                };
                                ScreenModel.prototype.nextToScreenY = function (outputProcessId) {
                                    var self = this;
                                    setShared("CMF002_Y_PROCESINGID", outputProcessId);
                                    nts.uk.ui.windows.sub.modal('../y/index.xhtml').onClosed(function () {
                                        self.focusX5();
                                    });
                                };
                                ScreenModel.prototype.searchExecHist = function () {
                                    var self = this;
                                    block.invisible();
                                    var param = {
                                        inChargeRole: self.roleAuthority.inChargeRole,
                                        startDate: self.exePeriod().startDate == null ? null : new Date(self.exePeriod().startDate),
                                        endDate: self.exePeriod().endDate == null ? null : new Date(self.exePeriod().endDate),
                                        exOutCtgIdList: self.exOutCtgIdList,
                                        condSetCd: self.selectorCndSet()
                                    };
                                    x.service.getExOutExecHistSearch(param).done(function (data) {
                                        var listHist = [];
                                        _.forEach(data, function (item) {
                                            listHist.push(ExecHist.fromApp(item));
                                        });
                                        self.execHistList(listHist);
                                        $("#execHistGrid").ntsGrid("destroy");
                                        self.loadGrid();
                                        self.focusX5();
                                    }).fail(function (err) {
                                        alertError(err);
                                    }).always(function () {
                                        block.clear();
                                    });
                                };
                                ScreenModel.prototype.focusX5 = function () {
                                    $('#execHistGrid').focus();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            var CndSet = /** @class */ (function () {
                                function CndSet(stdAtr, code, name) {
                                    if (stdAtr == shareModel.STANDARD_ATR.STANDARD) {
                                        this.typeCnd = "〇";
                                    }
                                    else {
                                        this.typeCnd = "";
                                    }
                                    this.code = code;
                                    this.name = name;
                                }
                                CndSet.fromApp = function (app) {
                                    return new CndSet(app.standardAtr, app.conditionSetCode, app.conditionSetName);
                                };
                                /**
                                 * 取得した一覧の先頭に「すべて」を追加
                                 */
                                CndSet.createFirstLine = function () {
                                    return new CndSet(null, "", getText("CMF002_500"));
                                };
                                return CndSet;
                            }());
                            var ExecHist = /** @class */ (function () {
                                function ExecHist(outputProcessId, deleteFile, fileId, processStartDateTime, empName, nameSetting, standardClass, executeForm, totalCount, processUnit, resultStatus, totalErrorCount, fileName, fileSize) {
                                    this.outputProcessId = outputProcessId;
                                    this.deleteFile = deleteFile;
                                    this.fileId = fileId;
                                    this.fileDowload = deleteFile;
                                    this.processStartDateTime = moment.utc(processStartDateTime).format("YYYY/MM/DD HH:mm:ss");
                                    this.empName = empName;
                                    this.nameSetting = nameSetting;
                                    this.standardClass = standardClass;
                                    this.executeForm = executeForm;
                                    switch (this.executeForm) {
                                        case 0:
                                            this.executeFormName = getText("CMF002_510");
                                            break;
                                        case 1:
                                            this.executeFormName = getText("CMF002_511");
                                            break;
                                        default: this.executeFormName = "";
                                    }
                                    this.totalCount = totalCount;
                                    this.processUnit = processUnit;
                                    this.numberOfPerson = this.totalCount + this.processUnit;
                                    this.resultStatus = resultStatus;
                                    switch (this.resultStatus) {
                                        case 0:
                                            this.resultStatusName = getText("CMF002_512");
                                            break;
                                        case 1:
                                            this.resultStatusName = getText("CMF002_513");
                                            break;
                                        case 2:
                                            this.resultStatusName = getText("CMF002_514");
                                            break;
                                        default: this.resultStatusName = "";
                                    }
                                    this.totalErrorCount = totalErrorCount;
                                    this.totalErrorCountName = this.totalErrorCount.toString() + getText("CMF002_241");
                                    this.fileName = fileName;
                                    this.fileSize = fileSize == null ? "" : fileSize + "KB";
                                }
                                ExecHist.prototype.updateDeleteFile = function (deleteFile) {
                                    this.deleteFile = deleteFile;
                                    this.fileDowload = deleteFile;
                                };
                                ExecHist.fromApp = function (app) {
                                    return new ExecHist(app.outputProcessId, app.deleteFile, app.fileId, app.processStartDateTime, app.empName, app.nameSetting, app.standardClass, app.executeForm, app.totalCount, app.processUnit, app.resultStatus, app.totalErrorCount, app.fileName, app.fileSize);
                                };
                                return ExecHist;
                            }());
                            var CellState = /** @class */ (function () {
                                function CellState(rowId, columnKey, state) {
                                    this.rowId = rowId;
                                    this.columnKey = columnKey;
                                    this.state = state;
                                }
                                return CellState;
                            }());
                        })(viewmodel = x.viewmodel || (x.viewmodel = {}));
                    })(x = cmf002.x || (cmf002.x = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.x.vm.js.map