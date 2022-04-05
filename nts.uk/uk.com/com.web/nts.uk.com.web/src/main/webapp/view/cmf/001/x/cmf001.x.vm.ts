/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
/// <reference path="../../../../lib/nittsu/nts.uk.com.web.nittsu.bundles.d.ts" />

module nts.uk.com.cmf001.x {
	import ajax = nts.uk.request.ajax;
	import info = nts.uk.ui.dialog.info;

	@bean()
	export class ViewModel extends ko.ViewModel {

		// 受入設定の一覧
		settings: KnockoutObservableArray<any> = ko.observableArray([]);

		// 選択中の受入設定コード
		selectedSettingCode: KnockoutObservable<string> = ko.observable();

		// CSVファイル名
		csvFileName: KnockoutObservable<string> = ko.observable();

		// CSVファイルID
		csvFileId: KnockoutObservable<string> = ko.observable();

		// メッセージ出力
		messageBox: KnockoutObservable<string> = ko.observable();

		// エラーメッセージ
		errorMessage: KnockoutObservable<string> = ko.observable("");

		// エラー出力
		isPreparedSuccess: KnockoutObservable<boolean> = ko.observable();

		// 実行エラー有無
		executionError: KnockoutObservable<boolean> = ko.observable(false);

		// 処理中フラグ
		processing: KnockoutObservable<boolean> = ko.observable(false);

		// 準備完了フラグ
		prepared: KnockoutObservable<boolean> = ko.observable(false);

		constructor() {
			super();
		}

		mounted() {
			this.selectedSettingCode.subscribe(() => {
				this.prepared(false);
			});

			this.loadSettings().done(() => {
				$("body").removeClass("ko-cloak");
			});
		}

		loadSettings() {
			let dfd = $.Deferred();

			let path = "/exio/input/setting/find-all";

			this.$ajax(path).done(res => {
				this.settings(res);
				dfd.resolve();
			});

			return dfd.promise();
		}

		csvFileSelected() {
			nts.uk.ui._viewModel.content.prepared(false);
		}

		csvFileUploaded() {}

		clearFile() {
			this.csvFileName(null);
			this.csvFileId(null);
		}

		prepare(){

			this.processStart();
			// ファイルのアップロード
			$("#file-upload").ntsFileUpload({ stereoType: "csvfile" }).done((res) => {
				this.csvFileId(res[0].id)
				let prepareCommand = {
					settingCode: this.selectedSettingCode(), 
					uploadedCsvFileId: this.csvFileId(),
				};
				ajax("/exio/input/prepare", prepareCommand).done((prepareResult) => {
					// サーバーへタスクの進捗問い合わせ
					this.observeExecution(prepareResult);
				}).fail((err) => {
					// 受入準備に失敗
					this.errorMessage(nts.uk.resource.getMessage(err.messageId, []));
					this.messageBox(this.errorMessage());
					this.processEnd();
				}).always(() => {
					// 一度アップロードしたファイルを変更後、再度アップロードするとブラウザでエラーになってしまう
					// その問題を避けるためここで消す
					this.clearFile();
				});
			}).fail((err) => {
				// ファイルのアップロードに失敗
				this.csvFileId("");
				this.errorMessage(nts.uk.resource.getMessage(err.messageId, []));
				this.messageBox(this.errorMessage());
				this.processEnd();
			});
		}

		// 処理が終わるまで監視する
		observeExecution(prepareResult: any) {

			nts.uk.deferred.repeat(conf => conf
				.task(() => {
					return (<any>nts).uk.request.asyncTask.getInfo(prepareResult.id);
				})
				// 完了するまで問い合わせ続ける
				.while(info => info.pending || info.running)
				.pause(1000)).done((info: any) => {

					let process = info.taskDatas.find(d => d.key === "process");
					if (process && process.valueAsString === "failed") {
						ui.dialog.alert(info.taskDatas.find(d => d.key === "message").valueAsString);
						this.processEnd();
						return;
					}

					if (info.status === "COMPLETED") {
						// 正常に完了していればエラーチェック
						this.loadErrors();
					} else {
						this.handleAbort(info);
					}
					// 処理終了
					this.processEnd();
				});
		}

		handleAbort(info) {
			this.errorMessage(info.error.message);
			if (info.error.businessException) {
				// 業務エラーの場合は画面に表示
				this.messageBox(this.errorMessage());
			} else {
				// システムエラーの場合はエラーダイアログを表示
				(<any>nts).uk.request.specials.errorPages.systemError();
			}
		}

		// エラーメッセージを取得して表示する
		loadErrors() {

			let requestCount: number = 0;
			this.messageBox("");
			nts.uk.deferred.repeat(conf => conf
				.task(() => {
					requestCount++;
					// エラーの問い合わせ
					return ajax("/exio/input/errors/" + this.selectedSettingCode() + "/" + requestCount).done((result) => {
						// 実行エラーがないかチェック
						if (result.execution) {
							// 実行エラーあり
							this.executionError(true);
						}
						// 取得したエラーを蓄積
						this.errorMessage(this.errorMessage() + result.text);
					});
				})
				// エラー件数が0件になるまで繰り返す
				.while(result => result.errosCount === 0))
				.done(result => {
					if (this.errorMessage()) {
						this.messageBox("受入準備が完了しましたが、以下のエラーが発生しています。\r\n" + this.errorMessage());
					} else {
						this.messageBox("受入準備が完了しました。");
					}
					this.prepared(true);
				});
		}

		execute(){
			this.processStart();
			let executeCommand = {
				settingCode: this.selectedSettingCode()
			};
			
			ajax("/exio/input/execute", executeCommand).done((executeResult) => {
				// サーバーへタスクの進捗問い合わせ
				nts.uk.deferred.repeat(conf => conf
					.task(() => {
						return (<any>nts).uk.request.asyncTask.getInfo(executeResult.id);
					})
					// 完了するまで問い合わせ続ける
					.while (info => info.pending || info.running)
					.pause(1000))
					.done((info: any) => {
						
						let process = info.taskDatas.find(d => d.key === "process");
						if (process && process.valueAsString === "failed") {
							ui.dialog.alert(info.taskDatas.find(d => d.key === "message").valueAsString);
							this.processEnd();
							return;
						}
						
						if(info.status ==="COMPLETED"){
							this.messageBox("受入処理が完了しました。");
						}else{
							this.handleAbort(info);
						}
						this.processEnd();
					});
			}).fail(function(err) {
				// 受入実行に失敗
				this.errorMessage(nts.uk.resource.getMessage(err.messageId, []));
				this.messageBox(this.errorMessage());
				this.processEnd();
			})
		}

		processStart(){
			this.errorMessage("");
			this.messageBox("");
			this.executionError(false);
			this.processing(true);
		}

		processEnd(){
			this.processing(false);
		}
		
		canPrepare =  ko.computed(() => 
		  // ファイルが指定されていること
			this.csvFileName() && 
			// 処理中でないこと
			!this.processing());
		
		canExecute = ko.computed(() => 
			// 準備完了していること
			this.prepared() &&
			// 処理中でないこと
			!this.processing() && 
			// 実行エラーが発生していないこと
			!this.executionError());
	}
}