__viewContext.ready(function () {
    var Control = /** @class */ (function () {
        function Control() {
            var self = this;
            self.controlName = ko.observable("");
            self.properties = ko.observableArray([]);
        }
        return Control;
    }());
    var Property = /** @class */ (function () {
        function Property() {
            var self = this;
            self.propertyName = ko.observable("");
            self.link = ko.observable("");
        }
        return Property;
    }());
    var ViewModel = /** @class */ (function () {
        function ViewModel() {
            var self = this;
            self.controls = ko.observableArray([]);
        }
        return ViewModel;
    }());
    var viewModel = {
        controls: [
            {
                controlName: "テキストボックス--文字列", properties: [
                    { propertyName: "PrimitiveValue", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#primitivevalue" },
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#itemname" },
                    { propertyName: "透かし文字", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#placeholder" }
                ]
            },
            {
                controlName: "テキストボックス--整数", properties: [
                    { propertyName: "PrimitiveValue", link: "/nts.uk.com.web/view/sample/editor/number-editor.xhtml#integer" },
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/editor/number-editor.xhtml#name" },
                    { propertyName: "透かし文字", link: "/nts.uk.com.web/view/sample/editor/number-editor.xhtml#placeholder" },
                    { propertyName: "カンマ編集", link: "/nts.uk.com.web/view/sample/editor/number-editor.xhtml#comma" },
                    { propertyName: "単位", link: "/nts.uk.com.web/view/sample/editor/number-editor.xhtml#unit" }
                ]
            },
            {
                controlName: "テキストボックス--実数", properties: [
                    { propertyName: "PrimitiveValue", link: "/nts.uk.com.web/view/sample/editor/number-editor.xhtml#decimal" },
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/editor/number-editor.xhtml#name" },
                    { propertyName: "透かし文字", link: "/nts.uk.com.web/view/sample/editor/number-editor.xhtml#placeholder" },
                    { propertyName: "カンマ編集", link: "/nts.uk.com.web/view/sample/editor/number-editor.xhtml#comma" },
                    { propertyName: "単位", link: "/nts.uk.com.web/view/sample/editor/number-editor.xhtml#unit" }
                ]
            },
            {
                controlName: "テキストボックス--時間", properties: [
                    { propertyName: "PrimitiveValue", link: "/nts.uk.com.web/view/sample/editor/time-editor.xhtml#primitivevalue" },
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/editor/time-editor.xhtml#itemname" },
                    { propertyName: "透かし文字", link: "/nts.uk.com.web/view/sample/editor/time-editor.xhtml#placeholder" }
                ]
            },
            {
                controlName: "テキストボックス--時刻", properties: [
                    { propertyName: "PrimitiveValue", link: "/nts.uk.com.web/view/sample/editor/time-editor.xhtml#day-primitivevalue" },
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/editor/time-editor.xhtml#day-itemname" },
                    { propertyName: "透かし文字", link: "/nts.uk.com.web/view/sample/editor/time-editor.xhtml#day-placeholder" }
                ]
            },
            {
                controlName: "テキストボックス--社員コード", properties: [
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#employeecocde" },
                    { propertyName: "透かし文字", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#employeecocde" },
                    { propertyName: "Enterマーク", link: "link" }
                ]
            },
            {
                controlName: "テキストボックス--パスワード", properties: [
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#password" },
                    { propertyName: "透かし文字", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#placeholder" },
                    { propertyName: "PrimitiveValue", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#primitivevalue" }
                ]
            },
            {
                controlName: "テキストボックス--複数行", properties: [
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#itemname" },
                    { propertyName: "透かし文字", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#placeholder" },
                    { propertyName: "PrimitiveValue", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#primitivevalue" }
                ]
            },
            {
                controlName: "テキストボックス--日付", properties: [
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#itemname" },
                    { propertyName: "精度", link: "/nts.uk.com.web/view/sample/editor/time-editor.xhtml#inputpattern" },
                    { propertyName: "曜日表示", link: "/nts.uk.com.web/view/sample/datepicker/datepicker.xhtml#dayofweek" },
                    { propertyName: "日付送り", link: "link" }
                ]
            },
            {
                controlName: "テキストボックス--検索", properties: [
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#itemname" },
                    { propertyName: "透かし文字", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#placeholder" },
                    { propertyName: "Enterマーク", link: "link" }
                ]
            },
            {
                controlName: "期間入力フォーム", properties: [
                    { propertyName: "精度", link: "/nts.uk.com.web/view/sample/datepicker/datepicker.xhtml#dayofweek" },
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#itemname" },
                    { propertyName: "最長期間", link: "/nts.uk.com.web/view/sample/datepicker/datepicker.xhtml#maxdate" },
                    { propertyName: "期間送り", link: "link" }
                ]
            },
            {
                controlName: "期間入力フォーム開始", properties: [
                    { propertyName: "項目名", link: "link" }
                ]
            },
            {
                controlName: "期間入力フォーム終了", properties: [
                    { propertyName: "項目名", link: "link" }
                ]
            },
            {
                controlName: "ファイル参照フォーム", properties: [
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/fileupload/index.xhtml" }
                ]
            },
            {
                controlName: "月日入力フォーム", properties: [
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/datepicker/datepicker.xhtml" }
                ]
            },
            {
                controlName: "ドロップダウンリスト", properties: [
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/combobox/combobox.xhtml" },
                    { propertyName: "ソート", link: "link" }
                ]
            },
            {
                controlName: "グリッドリスト", properties: [
                    { propertyName: "選択モード", link: "/nts.uk.com.web/view/sample/gridlist/gridlist.xhtml#single-list_container" },
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/gridlist/gridlist.xhtml#single-list_container" },
                    { propertyName: "ソート", link: "/nts.uk.com.web/view/sample/gridlist/gridlist.xhtml#single-list_container" },
                    { propertyName: "任意列ソート", link: "/nts.uk.com.web/view/sample/gridlist/gridlist.xhtml#single-list_container" },
                    { propertyName: "列幅可変", link: "link" },
                    { propertyName: "ページング", link: "link" },
                ]
            },
            {
                controlName: "シンプルリスト", properties: [
                    { propertyName: "選択モード", link: "/nts.uk.com.web/view/sample/listbox/listbox.xhtml#list-box" },
                    { propertyName: "項目名", link: "link" },
                    { propertyName: "ソート", link: "link" }
                ]
            },
            {
                controlName: "ツリーリスト", properties: [
                    { propertyName: "選択モード", link: "/nts.uk.com.web/view/sample/treegrid/treegrid.xhtml#treegrid2_container" },
                    { propertyName: "項目名", link: "link" },
                    { propertyName: "ソート", link: "link" }
                ]
            },
            {
                controlName: "親子リスト", properties: [
                    { propertyName: "選択モード", link: "/nts.uk.com.web/view/sample/treegrid/treegrid.xhtml#treegrid2_container" },
                    { propertyName: "項目名", link: "link" }
                ]
            },
            {
                controlName: "親子リスト親ノード", properties: [
                    { propertyName: "ソート", link: "/nts.uk.com.web/view/sample/treegrid/treegrid.xhtml#treegrid2_container" }
                ]
            },
            {
                controlName: "親子リスト子ノード", properties: [
                    { propertyName: "ソート", link: "/nts.uk.com.web/view/sample/treegrid/treegrid.xhtml#treegrid2_container" },
                    { propertyName: "選択可能", link: "link" }
                ]
            },
            {
                controlName: "リスト列項目", properties: [
                    { propertyName: "Enum", link: "/nts.uk.com.web/view/sample/listbox/listbox.xhtml#list-box" }
                ]
            },
            {
                controlName: "カラーピッカー", properties: [
                    { propertyName: "項目名", link: "link" }
                ]
            },
            {
                controlName: "ラジオボタングループ", properties: [
                    { propertyName: "項目名", link: "link" },
                    { propertyName: "Enum", link: "/nts.uk.com.web/view/sample/radioboxgroup/radioboxgroup.xhtml#first-list" }
                ]
            },
            {
                controlName: "ラジオボタン", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/radiobox/radiobox.xhtml#radio-box" }
                ]
            },
            {
                controlName: "チェックボックス", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/checkbox/checkbox.xhtml#checkbox" },
                    { propertyName: "スタイル", link: "/nts.uk.com.web/view/sample/checkbox/checkbox.xhtml#checkbox" }
                ]
            },
            {
                controlName: "スイッチボタングループ", properties: [
                    { propertyName: "項目名", link: "link" },
                    { propertyName: "Enum", link: "link" }
                ]
            },
            {
                controlName: "スイッチボタン", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/switch/switch.xhtml#switch-button" }
                ]
            },
            {
                controlName: "スワップリスト", properties: [
                    { propertyName: "項目名", link: "/nts.uk.com.web/view/sample/swaplist/swaplist.xhtml#swap-list_container" }
                ]
            },
            {
                controlName: "ボタン", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/commoncss/button.xhtml" },
                    { propertyName: "色", link: "/nts.uk.com.web/view/sample/commoncss/button.xhtml" },
                    { propertyName: "サイズ", link: "/nts.uk.com.web/view/sample/commoncss/button.xhtml" },
                    { propertyName: "アイコン", link: "/nts.uk.com.web/view/sample/commoncss/button.xhtml" },
                    { propertyName: "キャレット", link: "/nts.uk.com.web/view/sample/commoncss/caret.xhtml" }
                ]
            },
            {
                controlName: "ファンクションボタン", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/commoncss/button.xhtml" },
                    { propertyName: "色", link: "/nts.uk.com.web/view/sample/commoncss/button.xhtml" },
                    { propertyName: "アイコン", link: "/nts.uk.com.web/view/sample/commoncss/button.xhtml" }
                ]
            },
            {
                controlName: "画像ボタン", properties: [
                    { propertyName: "画像ファイル", link: "link" },
                    { propertyName: "影", link: "link" }
                ]
            },
            {
                controlName: "タブグループ", properties: [
                    { propertyName: "配置方向", link: "/nts.uk.com.web/view/sample/tabpanel/tabpanel.xhtml#tab-panel#tab-panel2" }
                ]
            },
            {
                controlName: "タブ", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/tabpanel/tabpanel.xhtml#tab-panel" }
                ]
            },
            {
                controlName: "サイドバー", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/sidebar/sidebar-sub.xhtml#sidebar-area" }
                ]
            },
            {
                controlName: "サイドバーリンクラベル", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/sidebar/sidebar-sub.xhtml#sidebar-area" }
                ]
            },
            {
                controlName: "リンクラベル", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/linkbutton/linkbutton.xhtml" },
                    { propertyName: "スタイル", link: "/nts.uk.com.web/view/sample/linkbutton/linkbutton.xhtml" }
                ]
            },
            {
                controlName: "アコーディオン", properties: [
                    { propertyName: "ヘッダテキスト", link: "/nts.uk.com.web/view/sample/commoncss/accordion.xhtml" },
                    { propertyName: "スタイル", link: "/nts.uk.com.web/view/sample/commoncss/accordion.xhtml" }
                ]
            },
            {
                controlName: "はてなアイコン", properties: [
                    { propertyName: "画像ファイル", link: "/nts.uk.com.web/view/sample/helpbutton/help-button.xhtml" },
                    { propertyName: "スタイル", link: "/nts.uk.com.web/view/sample/helpbutton/help-button.xhtml" }
                ]
            },
            {
                controlName: "凡例ボタン", properties: [
                    { propertyName: "コンテンツパネル", link: "link" },
                    { propertyName: "スタイル", link: "link" }
                ]
            },
            {
                controlName: "ウィザード", properties: [
                    { propertyName: "-", link: "/nts.uk.com.web/view/sample/wizard/wizard.xhtml#wizard" }
                ]
            },
            {
                controlName: "ウィザードタイトル", properties: [
                    { propertyName: "アイコン", link: "/nts.uk.com.web/view/sample/wizard/wizard.xhtml#wizard" },
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/wizard/wizard.xhtml#wizard" }
                ]
            },
            {
                controlName: "ウィザードステップ", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/wizard/wizard.xhtml#wizard" }
                ]
            },
            {
                controlName: "ウィザード終端", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/wizard/wizard.xhtml#wizard" }
                ]
            },
            {
                controlName: "ラベル", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/commoncss/label.xhtml" }
                ]
            },
            {
                controlName: "警告ラベル", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/commoncss/label.xhtml#warning-label" }
                ]
            },
            {
                controlName: "フォームラベル", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/label/form-label.xhtml" },
                    { propertyName: "ラインの色", link: "/nts.uk.com.web/view/sample/label/form-label.xhtml" },
                    { propertyName: "スタイル", link: "/nts.uk.com.web/view/sample/label/form-label.xhtml" },
                    { propertyName: "制約表示", link: "link" }
                ]
            },
            {
                controlName: "グリッドヘッダラベル", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/gridlist/gridlist.xhtml#single-list_headers_v" },
                    { propertyName: "制約表示", link: "link" }
                ]
            },
            {
                controlName: "表示専用テキストボックス", properties: [
                    { propertyName: "-", link: "/nts.uk.com.web/view/sample/editor/text-editor.xhtml#read-only-textbox" }
                ]
            },
            {
                controlName: "ガイドメッセージ", properties: [
                    { propertyName: "テキスト", link: "/nts.uk.com.web/view/sample/userguide/user-guide.xhtml" },
                    { propertyName: "対象項目", link: "/nts.uk.com.web/view/sample/userguide/user-guide.xhtml" }
                ]
            },
            {
                controlName: "キャレット", properties: [
                    { propertyName: "スタイル", link: "/nts.uk.com.web/view/sample/commoncss/caret.xhtml" }
                ]
            },
            {
                controlName: "画像", properties: [
                    { propertyName: "画像ファイル", link: "link" }
                ]
            },
            {
                controlName: "罫線", properties: [
                    { propertyName: "-", link: "link" }
                ]
            },
            {
                controlName: "パネル", properties: [
                    { propertyName: "スタイル", link: "link" },
                    { propertyName: "スクロールバー", link: "link" }
                ]
            },
            {
                controlName: "ポップアップパネル", properties: [
                    { propertyName: "-", link: "/nts.uk.com.web/view/sample/popup/popup.xhtml" }
                ]
            },
            {
                controlName: "マスタリスト選択パネル", properties: [
                    { propertyName: "スタイル", link: "link" }
                ]
            },
            {
                controlName: "ファンクションパネル", properties: [
                    { propertyName: "ボタンテキスト", link: "/nts.uk.com.web/view/sample/functionpanel/index.xhtml" }
                ]
            },
            {
                controlName: "リスト検索フォーム", properties: [
                    { propertyName: "対象リスト", link: "/nts.uk.com.web/view/sample/searchbox/searchbox.xhtml" },
                    { propertyName: "対象列", link: "/nts.uk.com.web/view/sample/searchbox/searchbox.xhtml" },
                    { propertyName: "検索モード", link: "/nts.uk.com.web/view/sample/searchbox/searchbox.xhtml" }
                ]
            },
        ]
    };
    this.bind(ko.mapping.fromJS(viewModel));
    console.log();
});
//# sourceMappingURL=start.js.map