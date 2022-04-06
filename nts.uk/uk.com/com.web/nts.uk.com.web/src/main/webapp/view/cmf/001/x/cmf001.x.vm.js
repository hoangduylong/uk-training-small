/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
/// <reference path="../../../../lib/nittsu/nts.uk.com.web.nittsu.bundles.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var cmf001;
            (function (cmf001) {
                var x;
                (function (x) {
                    var ajax = nts.uk.request.ajax;
                    var ViewModel = /** @class */ (function (_super) {
                        __extends(ViewModel, _super);
                        function ViewModel() {
                            var _this = _super.call(this) || this;
                            // 受入設定の一覧
                            _this.settings = ko.observableArray([]);
                            // 選択中の受入設定コード
                            _this.selectedSettingCode = ko.observable();
                            // CSVファイル名
                            _this.csvFileName = ko.observable();
                            // CSVファイルID
                            _this.csvFileId = ko.observable();
                            // メッセージ出力
                            _this.messageBox = ko.observable();
                            // エラーメッセージ
                            _this.errorMessage = ko.observable("");
                            // エラー出力
                            _this.isPreparedSuccess = ko.observable();
                            // 実行エラー有無
                            _this.executionError = ko.observable(false);
                            // 処理中フラグ
                            _this.processing = ko.observable(false);
                            // 準備完了フラグ
                            _this.prepared = ko.observable(false);
                            _this.canPrepare = ko.computed(function () {
                                // ファイルが指定されていること
                                return _this.csvFileName() &&
                                    // 処理中でないこと
                                    !_this.processing();
                            });
                            _this.canExecute = ko.computed(function () {
                                // 準備完了していること
                                return _this.prepared() &&
                                    // 処理中でないこと
                                    !_this.processing() &&
                                    // 実行エラーが発生していないこと
                                    !_this.executionError();
                            });
                            return _this;
                        }
                        ViewModel.prototype.mounted = function () {
                            var _this = this;
                            this.selectedSettingCode.subscribe(function () {
                                _this.prepared(false);
                            });
                            this.loadSettings().done(function () {
                                $("body").removeClass("ko-cloak");
                            });
                        };
                        ViewModel.prototype.loadSettings = function () {
                            var _this = this;
                            var dfd = $.Deferred();
                            var path = "/exio/input/setting/find-all";
                            this.$ajax(path).done(function (res) {
                                _this.settings(res);
                                dfd.resolve();
                            });
                            return dfd.promise();
                        };
                        ViewModel.prototype.csvFileSelected = function () {
                            nts.uk.ui._viewModel.content.prepared(false);
                        };
                        ViewModel.prototype.csvFileUploaded = function () { };
                        ViewModel.prototype.clearFile = function () {
                            this.csvFileName(null);
                            this.csvFileId(null);
                        };
                        ViewModel.prototype.prepare = function () {
                            var _this = this;
                            this.processStart();
                            // ファイルのアップロード
                            $("#file-upload").ntsFileUpload({ stereoType: "csvfile" }).done(function (res) {
                                _this.csvFileId(res[0].id);
                                var prepareCommand = {
                                    settingCode: _this.selectedSettingCode(),
                                    uploadedCsvFileId: _this.csvFileId(),
                                };
                                ajax("/exio/input/prepare", prepareCommand).done(function (prepareResult) {
                                    // サーバーへタスクの進捗問い合わせ
                                    _this.observeExecution(prepareResult);
                                }).fail(function (err) {
                                    // 受入準備に失敗
                                    _this.errorMessage(nts.uk.resource.getMessage(err.messageId, []));
                                    _this.messageBox(_this.errorMessage());
                                    _this.processEnd();
                                }).always(function () {
                                    // 一度アップロードしたファイルを変更後、再度アップロードするとブラウザでエラーになってしまう
                                    // その問題を避けるためここで消す
                                    _this.clearFile();
                                });
                            }).fail(function (err) {
                                // ファイルのアップロードに失敗
                                _this.csvFileId("");
                                _this.errorMessage(nts.uk.resource.getMessage(err.messageId, []));
                                _this.messageBox(_this.errorMessage());
                                _this.processEnd();
                            });
                        };
                        // 処理が終わるまで監視する
                        ViewModel.prototype.observeExecution = function (prepareResult) {
                            var _this = this;
                            nts.uk.deferred.repeat(function (conf) { return conf
                                .task(function () {
                                return nts.uk.request.asyncTask.getInfo(prepareResult.id);
                            })
                                // 完了するまで問い合わせ続ける
                                .while(function (info) { return info.pending || info.running; })
                                .pause(1000); }).done(function (info) {
                                var process = info.taskDatas.find(function (d) { return d.key === "process"; });
                                if (process && process.valueAsString === "failed") {
                                    uk.ui.dialog.alert(info.taskDatas.find(function (d) { return d.key === "message"; }).valueAsString);
                                    _this.processEnd();
                                    return;
                                }
                                if (info.status === "COMPLETED") {
                                    // 正常に完了していればエラーチェック
                                    _this.loadErrors();
                                }
                                else {
                                    _this.handleAbort(info);
                                }
                                // 処理終了
                                _this.processEnd();
                            });
                        };
                        ViewModel.prototype.handleAbort = function (info) {
                            this.errorMessage(info.error.message);
                            if (info.error.businessException) {
                                // 業務エラーの場合は画面に表示
                                this.messageBox(this.errorMessage());
                            }
                            else {
                                // システムエラーの場合はエラーダイアログを表示
                                nts.uk.request.specials.errorPages.systemError();
                            }
                        };
                        // エラーメッセージを取得して表示する
                        ViewModel.prototype.loadErrors = function () {
                            var _this = this;
                            var requestCount = 0;
                            this.messageBox("");
                            nts.uk.deferred.repeat(function (conf) { return conf
                                .task(function () {
                                requestCount++;
                                // エラーの問い合わせ
                                return ajax("/exio/input/errors/" + _this.selectedSettingCode() + "/" + requestCount).done(function (result) {
                                    // 実行エラーがないかチェック
                                    if (result.execution) {
                                        // 実行エラーあり
                                        _this.executionError(true);
                                    }
                                    // 取得したエラーを蓄積
                                    _this.errorMessage(_this.errorMessage() + result.text);
                                });
                            })
                                // エラー件数が0件になるまで繰り返す
                                .while(function (result) { return result.errosCount === 0; }); })
                                .done(function (result) {
                                if (_this.errorMessage()) {
                                    _this.messageBox("受入準備が完了しましたが、以下のエラーが発生しています。\r\n" + _this.errorMessage());
                                }
                                else {
                                    _this.messageBox("受入準備が完了しました。");
                                }
                                _this.prepared(true);
                            });
                        };
                        ViewModel.prototype.execute = function () {
                            var _this = this;
                            this.processStart();
                            var executeCommand = {
                                settingCode: this.selectedSettingCode()
                            };
                            ajax("/exio/input/execute", executeCommand).done(function (executeResult) {
                                // サーバーへタスクの進捗問い合わせ
                                nts.uk.deferred.repeat(function (conf) { return conf
                                    .task(function () {
                                    return nts.uk.request.asyncTask.getInfo(executeResult.id);
                                })
                                    // 完了するまで問い合わせ続ける
                                    .while(function (info) { return info.pending || info.running; })
                                    .pause(1000); })
                                    .done(function (info) {
                                    var process = info.taskDatas.find(function (d) { return d.key === "process"; });
                                    if (process && process.valueAsString === "failed") {
                                        uk.ui.dialog.alert(info.taskDatas.find(function (d) { return d.key === "message"; }).valueAsString);
                                        _this.processEnd();
                                        return;
                                    }
                                    if (info.status === "COMPLETED") {
                                        _this.messageBox("受入処理が完了しました。");
                                    }
                                    else {
                                        _this.handleAbort(info);
                                    }
                                    _this.processEnd();
                                });
                            }).fail(function (err) {
                                // 受入実行に失敗
                                this.errorMessage(nts.uk.resource.getMessage(err.messageId, []));
                                this.messageBox(this.errorMessage());
                                this.processEnd();
                            });
                        };
                        ViewModel.prototype.processStart = function () {
                            this.errorMessage("");
                            this.messageBox("");
                            this.executionError(false);
                            this.processing(true);
                        };
                        ViewModel.prototype.processEnd = function () {
                            this.processing(false);
                        };
                        ViewModel = __decorate([
                            bean()
                        ], ViewModel);
                        return ViewModel;
                    }(ko.ViewModel));
                    x.ViewModel = ViewModel;
                })(x = cmf001.x || (cmf001.x = {}));
            })(cmf001 = com.cmf001 || (com.cmf001 = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf001.x.vm.js.map