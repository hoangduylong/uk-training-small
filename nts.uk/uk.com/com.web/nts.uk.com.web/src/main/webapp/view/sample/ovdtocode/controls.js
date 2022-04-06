var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var ui;
        (function (ui) {
            var sample;
            (function (sample) {
                var controls;
                (function (controls) {
                    var docs = {
                        accordion: { name: "ntsAccordion", path: "component/accordion/accordion.xhtml" },
                        formlabel: { name: "ntsFormLabel", path: "component/label/form-label.xhtml" },
                        linkbutton: { name: "ntsLinkButton", path: "component/linkbutton/linkbutton.xhtml" },
                        checkbox: { name: "ntsCheckBox", path: "component/checkbox/checkbox.xhtml" },
                        radio: { name: "ntsRadioBoxGroup", path: "component/radioboxgroup/radioboxgroup.xhtml" },
                        combobox: { name: "ntsComboBox", path: "component/combobox/combobox.xhtml" },
                        switchbutton: { name: "ntsSwitchButton", path: "component/switch/switch.xhtml" },
                        listbox: { name: "ntsListBox", path: "component/listbox/listbox.xhtml" },
                        gridlist: { name: "ntsGridList", path: "component/gridlist/gridlist.xhtml" },
                        treegrid: { name: "ntsTreeGridView", path: "component/treegrid/treegrid.xhtml" },
                        tree: { name: "ntsTreeDragAndDrop", path: "component/treedraganddrop/tree.xhtml" },
                        searchbox: { name: "ntsSearchBox", path: "component/searchbox/searchbox.xhtml" },
                        wizard: { name: "ntsWizard", path: "component/wizard/wizard.xhtml" },
                        datepicker: { name: "ntsDatePicker", path: "component/datepicker/datepicker.xhtml" },
                        tabpanel: { name: "ntsTabPanel", path: "component/tabpanel/tabpanel.xhtml" },
                        helpbutton: { name: "ntsHelpButton", path: "component/helpbutton/help-button.xhtml" },
                        texteditor: { name: "ntsTextEditor", path: "component/editor/text-editor.xhtml" },
                        multieditor: { name: "ntsMultilineEditor", path: "component/editor/multiline-editor.xhtml" },
                        numbereditor: { name: "ntsNumberEditor", path: "component/editor/number-editor.xhtml" },
                        timedayeditor: { name: "ntsTimeWithDayEditor", path: "component/editor/timewithday-editor.xhtml" },
                        timeeditor: { name: "ntsTimeEditor", path: "component/editor/time-editor.xhtml" },
                        functionpanel: { name: "ntsFunctionPanel", path: "component/functionpanel/functionpanel.xhtml" },
                        colorpicker: { name: "ntsColorPicker", path: "component/colorpicker/colorpicker.xhtml" },
                        monthdaypicker: { name: "ntsMonthDays", path: "component/monthdays/monthdays.xhtml" },
                        daterange: { name: "ntsDateRangePicker", path: "component/daterange/daterange.xhtml" },
                        legendbutton: { name: "ntsLegendButton", path: "component/legendbutton/legendbutton.xhtml" },
                        sidebar: { name: "Sidebar", path: "functionwrap/sidebar/sidebar.xhtml" },
                        button: { name: "Button", path: "component/commoncss/button.xhtml" },
                        label: { name: "Label", path: "commoncss/label.xhtml" },
                        caret: { name: "Caret", path: "commoncss/caret.xhtml" },
                        fileupload: { name: "ntsFileUpload", path: "utilities/fileupload/index.xhtml" },
                        swaplist: { name: "ntsSwapList", path: "component/swaplist/swaplist.xhtml" },
                        userguide: { name: "UserGuide", path: "functionwrap/userguide/user-guide.xhtml" },
                        popup: { name: "ntsPopup", path: "functionwrap/popup/popup.xhtml" },
                        panel: { name: "Panel", path: "component/panel/panel.xhtml" },
                        none: { name: "-", path: "-" }
                    };
                    var controlsMap = {
                        "テキストボックス（文字列）": { doc: docs.texteditor, props: {
                                "PrimitiveValue": { api: "constraint" },
                                "項目名": { api: "name" },
                                "透かし文字": { api: "option.placeholder" }
                            } },
                        "テキストボックス（整数）": { doc: docs.numbereditor, props: {
                                "PrimitiveValue": { api: "constraint" },
                                "項目名": { api: "name" },
                                "カンマ編集": { value: "○", api: "option.numberGroup: true" },
                                "単位": { api: "option.unitID" },
                                "透かし文字": { api: "option.placeholder" }
                            } },
                        "テキストボックス（実数）": { doc: docs.numbereditor, props: {
                                "PrimitiveValue": { api: "constraint" },
                                "項目名": { api: "name" },
                                "カンマ編集": { value: "○", api: "option.numberGroup: true" },
                                "単位": { api: "option.unitID" },
                                "透かし文字": { api: "option.placeholder" }
                            } },
                        "テキストボックス（時間）": { doc: docs.timeeditor, props: {
                                "PrimitiveValue": { api: "constraint" },
                                "項目名": { api: "name" },
                                "透かし文字": { api: "option.placeholder" }
                            } },
                        "テキストボックス（時刻）": { doc: docs.timeeditor, props: {
                                "PrimitiveValue": { api: "constraint" },
                                "項目名": { api: "name" },
                                "透かし文字": { api: "option.placeholder" }
                            } },
                        "テキストボックス（社員コード）": { doc: docs.texteditor, props: {
                                "Enterマーク": { api: "enterkey: (Function)" },
                                "項目名": { api: "name" },
                                "透かし文字": { api: "option.placeholder" }
                            }, remarks: "constraint: 'EmployeeCode'" },
                        "テキストボックス（パスワード）": { doc: docs.texteditor, props: {
                                "PrimitiveValue": { api: "constraint" },
                                "項目名": { api: "name" },
                                "透かし文字": { api: "option.placeholder" }
                            } },
                        "テキストボックス（複数行）": { doc: docs.multieditor, props: {
                                "PrimitiveValue": { api: "constraint" },
                                "項目名": { api: "name" },
                                "透かし文字": { api: "option.placeholder" }
                            } },
                        "テキストボックス（日付）": { doc: docs.datepicker, props: {
                                "精度": [
                                    { value: "年月日", api: "type: 'date' (default)" },
                                    { value: "年月", api: "type: 'yearmonth'" },
                                    { value: "年", api: "type: 'year'" },
                                    { value: "年度", api: "type: 'fiscalYear" },
                                ],
                                "キー入力": { api: "pickOnly: false" },
                                "項目名": { api: "name" },
                                "曜日表示": { api: "type: 'dateWeek' or 'dateWeekFull' " },
                                "日付送り": { value: "○", api: "showJumpButtons: true" }
                            } },
                        "テキストボックス（検索）": { doc: docs.texteditor, props: {
                                "Enterマーク": { api: "enterkey: (Function)" },
                                "項目名": { api: "name" },
                                "透かし文字": { api: "option.placeholder" }
                            } },
                        "日区分時刻入力フォーム": { doc: docs.timedayeditor, props: {
                                "日区分表示": [
                                    { value: "自動", api: "option.timeWithDay: true (default)" },
                                    { value: "非表示", api: "option.timeWithDay: false" },
                                ],
                                "項目名": { api: "name" },
                            } },
                        "期間入力フォーム": { doc: docs.daterange, props: {
                                "精度": [
                                    { value: "年月日", api: "type: 'date' (default)" },
                                    { value: "年月", api: "type: 'yearmonth'" },
                                ],
                                "キー入力": { api: "pickOnly: false" },
                                "項目名": { api: "name" },
                                "最長期間": { api: "maxRange" },
                                "期間送り": { value: "○", api: "showNextPrevious: true" }
                            } },
                        "期間入力フォーム開始": { doc: docs.daterange, props: {
                                "項目名": { api: "startName" }
                            } },
                        "期間入力フォーム終了": { doc: docs.daterange, props: {
                                "項目名": { api: "endName" }
                            } },
                        "月日入力フォーム": { doc: docs.monthdaypicker, props: {
                                "項目名": { api: "name" }
                            } },
                        "ファイル参照フォーム": { doc: docs.fileupload, props: {
                                "項目名": { api: "name" },
                                "ボタンのラベル": { api: "text" },
                                "スタイル": [
                                    { value: "テキストボックス", api: "asLink: false (default)" },
                                    { value: "リンクラベル", api: "asLink: true" },
                                ],
                                "ファイル種別": { api: "stereoType" },
                                "アップロード": [
                                    { value: "任意", api: "immediateUpload: false (default)" },
                                    { value: "即時", api: "immediateUpload: true" },
                                ]
                            } },
                        "igGrid": { doc: docs.none, props: {
                                "-": { api: "" }
                            } },
                        "テーブル": { doc: docs.none, props: {
                                "-": { api: "" },
                            } },
                        "ドロップダウンリスト": { doc: docs.combobox, props: {
                                "最大表示数": { api: "visibleItemsCount" },
                                "項目名": { api: "name" },
                                "ソート": { api: "(bind sorted datasource)" }
                            } },
                        "グリッドリスト": { doc: docs.gridlist, props: {
                                "選択モード": [
                                    { value: "複数選択", api: "multiple: true" },
                                    { value: "単一選択", api: "multiple: false" },
                                ],
                                "項目名": { api: "name" },
                                "ソート": { api: "(bind sorted datasource)" },
                                "任意列ソート": { api: "(not available in common)" },
                                "列幅可変": { api: "columnResize: true" },
                                "ページング": { api: "(not available in common)" }
                            } },
                        "シンプルリスト": { doc: docs.listbox, props: {
                                "選択モード": [
                                    { value: "複数選択", api: "multiple: true" },
                                    { value: "単一選択", api: "multiple: false" },
                                ],
                                "項目名": { api: "name" },
                                "ソート": { api: "(bind sorted datasource)" }
                            } },
                        "ツリーリスト": { doc: docs.treegrid, props: {
                                "選択モード": [
                                    { value: "複数選択", api: "multiple: true" },
                                    { value: "単一選択", api: "multiple: false" },
                                ],
                                "項目名": { api: "name" },
                                "ソート": { api: "(bind sorted datasource)" }
                            } },
                        "親子リスト": { doc: docs.treegrid, props: {
                                "選択モード": { api: "multiple: true or false" },
                                "項目名": { api: "name" }
                            } },
                        "親子リスト親ノード": { doc: docs.treegrid, props: {
                                "ソート": { api: "(bind sorted datasource)" }
                            } },
                        "親子リスト子ノード": { doc: docs.treegrid, props: {
                                "ソート": { api: "(bind sorted datasource)" },
                                "選択可能": { api: "multiple: true or false" }
                            } },
                        "ツリーリスト階層列項目": { doc: docs.treegrid, props: {
                                "-": { api: "" }
                            } },
                        "リスト列項目": { doc: docs.none, props: {
                                "Enum": { api: "(bind datasource)" }
                            } },
                        "ツリー": { doc: docs.tree, props: {
                                "選択モード": [
                                    { value: "複数選択", api: "multiple: true" },
                                    { value: "単一選択", api: "multiple: false" },
                                ],
                                "項目名": { api: "name" },
                                "深さ上限": { api: "maxDeepLeaf" },
                                "兄弟数上限": { api: "maxChildInNode" }
                            } },
                        "カラーピッカー": { doc: docs.colorpicker, props: {
                                "項目名": { api: "name" }
                            } },
                        "ラジオボタングループ": { doc: docs.radio, props: {
                                "項目名": { api: "name" },
                                "Enum": { api: "(bind datasource)" }
                            } },
                        "ラジオボタン": { doc: docs.radio, props: {
                                "テキスト": { api: "optionText" },
                            } },
                        "チェックボックス": { doc: docs.checkbox, props: {
                                "テキスト": { api: "text or (text content in tag)" },
                                "スタイル": [
                                    { value: "一般", api: "style: normal (default)" },
                                    { value: "ボタン", api: "style: button" },
                                    { value: "警告パネル", api: "style: warnpanel" },
                                ]
                            } },
                        "スイッチボタングループ": { doc: docs.switchbutton, props: {
                                "項目名": { api: "name" },
                                "Enum": { api: "(bind datasource)" }
                            } },
                        "スイッチボタン": { doc: docs.switchbutton, props: {
                                "テキスト": { api: "optionText" },
                            } },
                        "スワップリスト": { doc: docs.swaplist, props: {
                                "項目名": { api: "name" },
                                "移動上限": { api: "itemsLimit.right" },
                                "並べ替えボタン": { value: "○", api: "showSort" },
                                "検索フォーム": { value: "○", api: "showSearchBox" }
                            } },
                        "ボタン": { doc: docs.button, props: {
                                "テキスト": { api: "(text content in tag)" },
                                "色": [
                                    { value: "一般", api: "(default)" },
                                    { value: "実行", api: "class=\"proceed\"" },
                                    { value: "危険", api: "class=\"danger\"" },
                                ],
                                "サイズ": [
                                    { value: "特大", api: "class=\"x-large\"" },
                                    { value: "大", api: "class=\"large\"" },
                                    { value: "中", api: "(default)" },
                                    { value: "小", api: "class=\"small\"" },
                                ],
                                "アイコン": { api: "(not common)" },
                                "キャレット": { api: "class='caret-xxx'" }
                            } },
                        "ファンクションボタン": { doc: docs.button, props: {
                                "テキスト": { api: "(text content in tag)" },
                                "色": [
                                    { value: "一般", api: "(default)" },
                                    { value: "実行", api: "class=\"proceed\"" },
                                    { value: "危険", api: "class=\"danger\"" },
                                ],
                                "アイコン": { api: "(not common)" }
                            } },
                        "画像ボタン": { doc: docs.button, props: {
                                "画像ファイル": { api: "use button icon" },
                                "影": { api: "(not common)" },
                            } },
                        "タブグループ": { doc: docs.tabpanel, props: {
                                "配置方向": [
                                    { value: "横", api: "(default)" },
                                    { value: "縦", api: "direction: 'vertical'" },
                                ]
                            } },
                        "タブ": { doc: docs.tabpanel, props: {
                                "テキスト": { api: "title" },
                            } },
                        "サイドバー": { doc: docs.sidebar, props: {
                                "-": { api: "" }
                            } },
                        "サイドバーリンクラベル": { doc: docs.sidebar, props: {
                                "テキスト": { api: "(text content in tag)" },
                            } },
                        "リンクラベル": { doc: docs.linkbutton, props: {
                                "テキスト": { api: "text or (text content in tag)" },
                                "スタイル": { api: "class" },
                            } },
                        "アコーディオン": { doc: docs.accordion, props: {
                                "ヘッダテキスト": { api: "(text content in tag)" },
                            } },
                        "はてなアイコン": { doc: docs.helpbutton, props: {
                                "画像ファイル": { api: "image" },
                                "テキスト": { api: "textId" },
                            } },
                        "凡例ボタン": { doc: docs.legendbutton, props: {
                                "内容": { api: "template or labelText" },
                                "テキスト": { api: "(default)" },
                            } },
                        "ウィザード": { doc: docs.wizard, props: {
                                "-": { api: "" },
                            } },
                        "ウィザードタイトル": { doc: docs.wizard, props: {
                                "アイコン": { api: "data-icon" },
                                "テキスト": { api: "(content in tag with class='content'')" },
                            } },
                        "ウィザードステップ": { doc: docs.wizard, props: {
                                "テキスト": { api: "(content in tag li)" },
                            } },
                        "ウィザード終端": { doc: docs.wizard, props: {
                                "テキスト": { api: "(content in last tag li)" },
                            } },
                        "マスタ言語切替ボタン": { doc: docs.none, props: {
                                "-": { api: "" }
                            } },
                        "ラベル": { doc: docs.label, props: {
                                "テキスト": { api: "(text content in tag)" },
                            } },
                        "警告ラベル": { doc: docs.label, props: {
                                "テキスト": { api: "(text content in tag)" },
                            } },
                        "フォームラベル": { doc: docs.formlabel, props: {
                                "テキスト": { api: "(text content in tag)" },
                                "ラインの色": { api: "required: true" },
                                "スタイル": { api: "inline: true" },
                                "制約表示": { api: "constraint" }
                            } },
                        "グリッドヘッダラベル": { doc: docs.none, props: {
                                "テキスト": { api: "" },
                                "制約表示": { api: "" },
                            } },
                        "表示専用テキストボックス": { doc: docs.none, props: {
                                "項目名": { api: "" },
                            } },
                        "ガイドメッセージ": { doc: docs.userguide, props: {
                                "テキスト": { api: "(text content in tag)" },
                                "対象項目": { api: "data-target" },
                            } },
                        "キャレット": { doc: docs.caret, props: {
                                "スタイル": { api: "class='caret-xxx'" },
                            } },
                        "画像": { doc: docs.none, props: {
                                "画像ファイル": { api: "" },
                            } },
                        "罫線": { doc: docs.none, props: {
                                "-": { api: "" },
                            } },
                        "パネル": { doc: docs.panel, props: {
                                "スタイル": { api: "class" },
                                "スクロールバー": { api: "(use css class)" },
                            } },
                        "ポップアップパネル": { doc: docs.popup, props: {
                                "トリガー": { api: "trigger" },
                            } },
                        "マスタリスト選択パネル": { doc: docs.panel, props: {
                                "スタイル": { api: "" },
                            } },
                        "ファンクションパネル": { doc: docs.functionpanel, props: {
                                "ボタンテキスト": { api: "headerText" },
                            } },
                        "リスト検索フォーム": { doc: docs.searchbox, props: {
                                "対象リスト": { api: "comId" },
                                "対象列": { api: "fields" },
                                "検索モード": { api: "searchMode" }
                            } },
                        "受入ファイル形式指定フォーム": { doc: docs.none, props: {
                                "-": { api: "" },
                            } },
                    };
                    var controlList = [];
                    for (var controlNameDesign in controlsMap) {
                        var control = controlsMap[controlNameDesign];
                        controlList.push({ dn: controlNameDesign, doc: control.doc, props: control.props });
                    }
                    var ControlProperty = /** @class */ (function () {
                        function ControlProperty(nameInDesign, valueInDesign, api) {
                            this.nameInDesign = nameInDesign;
                            this.valueInDesign = valueInDesign;
                            this.api = api;
                        }
                        return ControlProperty;
                    }());
                    var Control = /** @class */ (function () {
                        function Control(nameInDesign, doc, props, remarks) {
                            var _this = this;
                            this.nameInDesign = nameInDesign;
                            this.nameInCode = doc.name;
                            this.pathToDocument = nts.uk.request.location.appRoot.mergeRelativePath("view/sample/" + doc.path).serialize();
                            this.properties = [];
                            var _loop_1 = function (name_1) {
                                var prop = props[name_1];
                                if (!_.isArray(prop)) {
                                    prop = [prop];
                                }
                                prop.map(function (p, i) { return new ControlProperty(i === 0 ? name_1 : "", p.value, p.api); })
                                    .forEach(function (p) { return _this.properties.push(p); });
                            };
                            for (var name_1 in props) {
                                _loop_1(name_1);
                            }
                            this.remarks = remarks || "";
                        }
                        Control.prototype.firstProperty = function () {
                            return this.properties[0];
                        };
                        Control.prototype.propertiesAfterSecond = function () {
                            return this.properties.slice(1);
                        };
                        return Control;
                    }());
                    var ScreenModel = /** @class */ (function () {
                        function ScreenModel() {
                            this.controls = [];
                            for (var controlNameDesign in controlsMap) {
                                var control = controlsMap[controlNameDesign];
                                this.controls.push(new Control(controlNameDesign, control.doc, control.props, control.remarks));
                            }
                        }
                        return ScreenModel;
                    }());
                    __viewContext.ready(function () {
                        this.bind(new ScreenModel());
                    });
                })(controls = sample.controls || (sample.controls = {}));
            })(sample = ui.sample || (ui.sample = {}));
        })(ui = uk.ui || (uk.ui = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=controls.js.map