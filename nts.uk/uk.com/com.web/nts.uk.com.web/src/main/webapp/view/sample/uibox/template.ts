module template {
    export let sample = {};
    export class Control {
        constructor(name, order, html, js, script) {
            this.name = name;
            this.order = order;
            this.html = html;
            this.js = js;
            this.script = script;
        }
    }
    
    sample["ntsTextEditor"] = new Control("テキストボックス（文字列）", 1,
        `<h3>Reset Value</h3>
<div class="control-group valign-center">
    <input data-bind="ntsTextEditor: {value: defaultvalue}" />
    <button id="reset" data-bind="click: setDefault">Reset</button>
</div>
        
<h3>Auto padding code</h3>
<div class="control-group valign-center">
    <input id="text-1" data-name="text-1" data-bind="ntsTextEditor: {
        name: '#[FND_L_SEARCH_RELEASE]',
        value: value,
        constraint: 'SampleCode',
        required: required,
        enable: enable,
        readonly: readonly}" />
    <span data-bind="ntsCheckBox: {checked: required}">Required</span>
    <span data-bind="ntsCheckBox: {checked: enable}">Enable</span>
    <span data-bind="ntsCheckBox: {checked: readonly}">Readonly</span>
    <button data-bind="click: clear">Clear Error</button>
</div>

<h3>Kana</h3>
<div class="control-group valign-center">
    <div data-bind="ntsFormLabel: { constraint: 'SampleKana' }">SampleKana</div>
    <input id="kana-txt" data-bind="ntsTextEditor: { name: '#[FND_N_SPAN_YM_END, FND_L_SEARCH_RELEASE]', value: valueKana, constraint: 'SampleKana' }"/>
</div>

<h3>Upper case alpha numeric</h3>
<div class="control-group valign-center">
    <div data-bind="ntsFormLabel: { constraint: 'PersonalWageCode' }">PersonalWageCode</div>
    <input id="an-txt" data-bind="ntsTextEditor: { name: 'Uppercase', value: valueUan, constraint: 'PersonalWageCode' }"/>
</div>

<h3>Employee Code</h3>
<div class="control-group valign-center">
    <div data-bind="ntsFormLabel: { constraint: 'EmployeeCode', required: true }">EmployeeCode</div>
    <input id="ec-txt" data-bind="ntsTextEditor: { name: 'Employee code', value: valueEc, constraint: 'EmployeeCode', required: true }"/>
</div>

<h3>Handle enter key</h3>
<div class="control-group valign-center">
    <input data-bind="ntsTextEditor: { value: value, enterkey: submit }" />
</div>`,
        `self.defaultvalue = ko.observable('');
self.value = ko.observable("");
self.valueKana = ko.observable('');
self.valueUan = ko.observable('');
self.valueEc = ko.observable('');
self.required = ko.observable(false),
self.enable = ko.observable(true),
self.readonly = ko.observable(false),

self.option = new nts.uk.ui.option.TextEditorOption({
    textmode: "text",
    placeholder: "Placeholder for text editor",
    width: "",
    textalign: "left",
    autofill: true,
    filldirection: "left",
    fillcharacter: "0"
});

ScreenModel.prototype.clear = function() {
    $("#text-1").ntsError("clear");
};

ScreenModel.prototype.setDefault = function() {
    var self = this;
    nts.uk.util.value.reset($("#text-1"), self.defaultvalue() !== '' ? self.defaultvalue() : undefined);
};

ScreenModel.prototype.submit = function() {
    nts.uk.ui.dialog.info("submit: " + this.value());
};`,
        `nts.arc.time.YearMonth
nts.uk.shr.com.primitive.sample.ResidenceCode
nts.uk.shr.com.primitive.sample.ProcessingNo
nts.uk.shr.com.primitive.sample.PersonalWageCode
nts.uk.shr.com.primitive.sample.CommonAmount
nts.uk.shr.com.primitive.sample.SampleKana
nts.uk.shr.com.primitive.sample.SampleCode`);
    
    sample["ntsNumberEditor"] = new Control("テキストボックス（整数・実数）", 2,
        `<h1>NumberEditor</h1>
<div data-bind="with: numbereditor">
    <input id="number-1" data-bind="ntsNumberEditor: { name: 'Number', value: value, constraint: constraint, option: option, required: required, enable: enable, readonly: readonly}" />
    <span data-bind="ntsCheckBox: {checked: enable}">Enable</span>
    <span data-bind="ntsCheckBox: {checked: readonly}">Readonly</span>
</div>
<h3>Half integer</h3>
<input id="half-int" data-bind="ntsNumberEditor: { name: 'HalfInt', value: valueHalfInt, constraint: 'SampleHalfInt', option: { decimallength: 1, unitID: 'PERCENT' } }"/>
<br/>
<div data-bind="with: numbereditor2">
    <input id="number-2" data-bind="ntsNumberEditor: { name:'Deci', value: value, constraint: constraint, option: option, required: required, enable: enable, readonly: readonly}" />
    <span data-bind="ntsCheckBox: {checked: enable}">Enable</span>
    <span data-bind="ntsCheckBox: {checked: readonly}">Readonly</span>
    <span data-bind="ntsCheckBox: {checked: required}">Required</span>
</div>
<hr/>
<h1>CurrencyEditor</h1>
<div data-bind="with: currencyeditor">
    <h3>Yen</h3>
    <input id="currency-1" data-bind="ntsNumberEditor: {value: value, constraint: constraint, option: option, required: required, enable: enable, readonly: readonly}" />
    <span data-bind="ntsCheckBox: {checked: enable}">Enable</span>
    <span data-bind="ntsCheckBox: {checked: readonly}">Readonly</span>
</div>
<br/>
<div data-bind="with: currencyeditor2">
    <h3>USD</h3>
    <input id="currency-2" data-bind="ntsNumberEditor: {value: value, constraint: constraint, option: option, required: required, enable: enable, readonly: readonly}" />
    <span data-bind="ntsCheckBox: {checked: enable}">Enable</span>
    <span data-bind="ntsCheckBox: {checked: readonly}">Readonly</span>
</div>`,
        `self.value = ko.observable(123);
self.valueHalfInt = ko.observable();

// NumberEditor
self.numbereditor = {
    value: ko.observable(),
    constraint: 'CommonAmount',
    option: {
        width: "100",
        defaultValue: 2,
        unitID: 'DAYS'
    },
    required: ko.observable(true),
    enable: ko.observable(true),
    readonly: ko.observable(false),
};
// NumberEditor
self.numbereditor2 = {
    value: ko.observable(12),
    constraint: 'CommonAmount',
    option: ko.mapping.fromJS({
        width: "50",
        grouplength: 3,
        decimallength: 2
    }),
    required: ko.observable(true),
    enable: ko.observable(true),
    readonly: ko.observable(false)
};
// CurrencyEditor
self.currencyeditor = {
    value: ko.observable(1200),
    constraint: '',
    option: new nts.uk.ui.option.CurrencyEditorOption({
        width: "200",
        grouplength: 3,
        decimallength: 2,
        currencyformat: "JPY"
    }),
    required: ko.observable(false),
    enable: ko.observable(true),
    readonly: ko.observable(false)
};
// CurrencyEditor
self.currencyeditor2 = {
    value: ko.observable(200000),
    constraint: '',
    option: new nts.uk.ui.option.CurrencyEditorOption({
        width: "200",
        grouplength: 3,
        decimallength: 2,
        currencyformat: "USD"
    }),
    required: ko.observable(false),
    enable: ko.observable(true),
    readonly: ko.observable(false)
};`,
        `nts.uk.shr.com.primitive.sample.ResidenceCode
nts.uk.shr.com.primitive.sample.ProcessingNo
nts.uk.shr.com.primitive.sample.PersonalWageCode
nts.uk.shr.com.primitive.sample.CommonAmount
nts.arc.time.YearMonth
nts.uk.shr.com.primitive.sample.SampleHalfInt`);
    
    sample["ntsTimeEditor"] = new Control("テキストボックス（時間・時刻）", 3,
        `<h1>TimeEditor</h1>
<h2>Overview</h2>
<!-- Binding with Value -->
<span data-bind="ntsCheckBox: {checked: enable}">Enable</span>
<span data-bind="ntsCheckBox: {checked: readonly}">Readonly</span>
<p>
    <h3>Date (YYYY/MM/DD)</h3>
    <input data-name="Date Editor" data-bind="ntsTimeEditor: { name: 'dateEditor', value: date, inputFormat: 'date', enable: enable, readonly: readonly, required: true }" />
    binding: "<span data-bind="text: date"></span>"
</p>
<p>
    <h3>Duration (HH:mm)</h3>
    <input data-name="Time Editor" data-bind="ntsTimeEditor: {name: 'Duration', constraint: 'SampleTimeDuration', value: time, inputFormat: 'time', mode: 'time', enable: enable, readonly: readonly, required: false}" />
    binding: <span data-bind="text: time"></span>
</p>
<br/>
<hr/>
<!-- Binding with Object -->
<div data-bind="with: yearmontheditor">
    <h3>YearMonth (YYYY/MM)</h3>
    <span data-bind="ntsCheckBox: {checked: enable}">Enable</span>
    <span data-bind="ntsCheckBox: {checked: readonly}">Readonly</span>
    <br/><br/>
    <input data-name="YearMonth Editor" data-bind="ntsTimeEditor: {value: value, constraint: constraint, option: option, required: required, enable: enable, readonly: readonly}" />
    binding: <span data-bind="text: value"></span>
</div>
<hr />
<h3>Year</h3>
<input id="yearEditor" data-name="Year Editor" data-bind="ntsTimeEditor: {inputFormat: 'YYYY', value: year, required: true, mode: 'year'}" />
<input id="fiscalYearEditor" data-name="Fiscal Year Editor" data-bind="ntsTimeEditor: {inputFormat: 'YYYY', value: year, required: true, mode: 'fiscal'}" />`,
        `self.enable = ko.observable(true);
self.readonly = ko.observable(false);

self.date = ko.observable("1990/01/01");
self.timeOfDayAsString = ko.observable("12:00");
self.time = ko.observable(1200);
self.year = ko.observable(2000);
// YearMonth Editor
self.yearmontheditor = {
    value: ko.observable(200001),
    constraint: 'LayoutCode',
    option: ko.mapping.fromJS(new nts.uk.ui.option.TimeEditorOption({
        inputFormat: 'yearmonth',
        defaultValue: "201101"
    })),
    required: ko.observable(false),
    enable: ko.observable(true),
    readonly: ko.observable(false)
};`,
        `nts.uk.shr.com.primitive.sample.ResidenceCode
nts.uk.shr.com.primitive.sample.ProcessingNo
nts.uk.shr.com.primitive.sample.PersonalWageCode
nts.uk.shr.com.primitive.sample.CommonAmount
nts.arc.time.YearMonth
nts.uk.shr.com.primitive.sample.SampleTimeDuration
nts.uk.shr.com.primitive.sample.SampleTimeClock`);
    
    sample["ntsMultilineEditor"] = new Control("テキストボックス（複数行）", 4,
        `<div data-bind="with: multilineeditor">
    <h3>MultilineEditor</h3>
    <textarea data-name="テスト" data-bind="ntsMultilineEditor: {value: value, constraint: constraint, option: option, enable: enable, readonly: readonly}" />
    <br/>
    <span data-bind="ntsCheckBox: {checked: enable}">Enable</span>
    <span data-bind="ntsCheckBox: {checked: readonly}">Readonly</span>
</div>`,
        `self.simpleValue = ko.observable("123");
// MultilineEditor
self.multilineeditor = {
    value: ko.observable(''),
    constraint: 'ResidenceCode',
    option: ko.mapping.fromJS(new nts.uk.ui.option.MultilineEditorOption({
        resizeable: true,
        placeholder: "Placeholder for text editor",
        width: "",
        textalign: "left"
    })),
    required: ko.observable(false),
    enable: ko.observable(true),
    readonly: ko.observable(false)
};`);
    
    sample["ntsDatePicker"] = new Control("テキストボックス（日付）", 5,
        `<div data-bind="ntsDatePicker: { name: '#[FND_L_SEARCH_RELEASE]', value: dateString, dateFormat: 'YYYY/MM/DD', required: true, acceptJapaneseCalendar: true}"></div>
<input data-bind="ntsTimeEditor: {value: dateString}"/>
<br/>
<b>Return ISO String:</b> <span data-bind="text: dateString"/>
<hr/>
<h3>Datepicker with Day of Week</h3>
<div data-bind="ntsDatePicker: {value: date, dateFormat: 'YYYY/MM/DD ddd'}"></div>
<div data-bind="ntsDatePicker: {value: date, dateFormat: 'YYYY/MM/DD dddd'}"></div>
<br/>
<b>Return Date:</b> <span data-bind="text: date"/>                      
<hr/>
<h3>YearMonth picker</h3>
<div id="test" data-bind="ntsDatePicker: {value: yearMonth, dateFormat: 'yearmonth', valueFormat: 'YYYYMM', enable: enable}"></div>
<span data-bind="ntsCheckBox: {checked: enable}">Enable</span>
<br/>
<b>Return Number:</b> <span data-bind="text: yearMonth"/>`,
        `self.dateString = ko.observable('20000101');
self.yearMonth = ko.observable("200002");
self.enable = ko.observable(true);
// NOTE: Un-comment to see diffirent between Date and UTC Date 
//self.date = ko.observable(new Date(2000,0,1));
self.date = ko.observable(nts.uk.time.UTCDate(2000, 0, 1));`);
    
    sample["ntsDatePicker (custom)"] = new Control("テキストボックス（日付）", 6,
        `<style>
    .round-green {
        background-color: green !important;
        border-radius: 20px;
    }
    .round-orange {
        background-color: orange !important;
        border-radius: 20px;
        font-weight: bold;
    }
    .rect-pink {
        background-color: pink !important;
    }
    .round-yellow {
        background-color: yellow !important;
        border-radius: 20px;
    }
    .round-gray {
        background-color: gray !important;
        border-radius: 20px;
    }
    .round-purple {
        background-color: purple !important;
        border-radius: 20px;
        font-style: italic;
        text-decoration: underline;
    }
    .round-red {
        background-color: red !important;
        border-radius: 20px;
    }
</style>
<div tabindex="1" data-bind="ntsDatePicker: {value: dateString, dateFormat: 'YYYY/MM/DD', required: true, fiscalMonthsMode: true, cssRanger: cssRangerYMD, defaultClass: 'round-orange', showJumpButtons: true }"></div>
<input data-bind="ntsTimeEditor: {value: dateString}"/>
<br/>
<b>Return ISO String:</b> <span data-bind="text: dateString"/>
<br/>                       
<hr/>
<h3>YearMonth picker</h3>
<div tabindex="2" id="yearmonth" data-bind="ntsDatePicker: {value: yearMonth, dateFormat: 'yearmonth', valueFormat: 'YYYYMM', cssRanger: cssRangerYM, fiscalMonthsMode: true, defaultClass: 'round-orange', showJumpButtons: true }"></div>
<br/>
<b>Return Number:</b> <span data-bind="text: yearMonth"/>
<hr/>
<h3>Year</h3>
<div data-bind="ntsDatePicker: {value: year, dateFormat: 'YYYY', valueFormat: 'YYYY', cssRanger: cssRangerY, showJumpButtons: true}"></div>
<br/>
<hr/>
<h3>Fiscal year</h3>
<div data-bind="ntsDatePicker: {value: fiscalYear, dateFormat: 'YYYY', valueFormat: 'YYYY', fiscalYear: true, cssRanger: cssRangerY, showJumpButtons: true}"></div>`,
        `self.dateString = ko.observable('20000101');
self.yearMonth = ko.observable("200002");
self.year = ko.observable("2010");
self.fiscalYear = ko.observable("2011");

// Define styles
self.cssRangerY = [{ 2000: "round-gray" }, { 2009: "round-green" }, { 2011: "rect-pink" }, { 2017: "round-purple" }];
self.cssRangerYM = { 2000: [{ 1: "round-green" }, { 5: "round-yellow" }],
                    2002: [ 1, { 5: "round-gray" }]};
self.cssRangerYMD = {
    2000: {1: [{ 11: "round-green" }, { 12: "round-orange" }, { 15: "rect-pink" }], 3: [{ 1: "round-green" }, { 2: "round-purple" }, 3 ]},
    2002: {1: [{ 11: "round-green" }, { 12: "round-green" }, { 15: "round-green" }], 3: [{ 1: "round-green" }, { 2: "round-green" }, { 3: "round-green" }]} 
};`);

    sample["ntsTimeWithDayEditor"] = new Control("日区分時刻入力フォーム", 7,
        `<span data-bind="ntsCheckBox: {checked: enable}">Enable</span>
<span data-bind="ntsCheckBox: {checked: readonly}">Readonly</span>
<p>
    <h3>Show Time With Day</h3>
    <input id="test" data-bind="ntsTimeWithDayEditor: { name: 'Time With Day', constraint:'TimeWithDayAttr', value: time, enable: enable, readonly: readonly, required: true }" />
    binding: <span data-bind="text: time"></span>
</p>
<p>
    <input id="test1" data-bind="ntsTimeWithDayEditor: { name: 'Time With Day', constraint:'TimeWithDayAttr', value: time2, enable: enable, readonly: readonly, required: true }" />
    binding: <span data-bind="text: time2"></span>
</p>
<p>
    <h3>Show Raw Time</h3>
    <input id="test2" data-bind="ntsTimeWithDayEditor: {name: 'Time With Day 2', constraint:'TimeWithDayAttr', value: time2, enable: enable, readonly: readonly, required: true, option: {timeWithDay: withDayAttr}}" />
    <div data-bind="ntsCheckBox: {checked: withDayAttr}">withDayAttr</div>
    binding: <span data-bind="text: time2"></span>
</p>`,
        `self.enable = ko.observable(true);
self.readonly = ko.observable(false);

self.timeOfDay = ko.observable(2400);
self.time = ko.observable(null);
self.time2 = ko.observable(3200);

self.withDayAttr = ko.observable(false);`,
        `nts.uk.shr.com.time.TimeWithDayAttr`);
    
    sample["ntsDateRangePicker"] = new Control("期間入力フォーム", 8,
        `<span data-bind="ntsCheckBox: { checked: enable }">Enable</span>
<span data-bind="ntsCheckBox: { checked: required }">Required</span>

<div>
    <h2>Value</h2>
    <label data-bind="text: dateValue"></label>
    <div>Start date: <label data-bind="text: dateValue().startDate"></label> <input data-bind="ntsTimeEditor: {value: startDateString}"/></div>
    <div>End date: <label data-bind="text: dateValue().endDate"></label> <input data-bind="ntsTimeEditor: {value: endDateString}"/></div>
</div>
<div id="daterangepicker" tabindex="1" data-bind="ntsDateRangePicker: { required: required, enable: enable, showNextPrevious: true, value: dateValue, maxRange: 'oneMonth'}"></div>
<br/>
<br/>
<div id="daterangepicker2" tabindex="2" data-bind="ntsDateRangePicker: { required: required, enable: enable, showNextPrevious: true, value: dateValue2, maxRange: 'oneYear'}"></div>
<br/>
<br/>
<div id="daterangepicker3" tabindex="3" data-bind="ntsDateRangePicker: { required: required, enable: enable, showNextPrevious: true, value: dateValue2, maxRange: 'oneYear', type: 'yearmonth', jumpUnit: 'year'}"></div>`,
        `self.enable = ko.observable(true);
self.required = ko.observable(true);

self.startDateString = ko.observable("");
self.endDateString = ko.observable("");
self.dateValue = ko.observable({});
self.dateValue2 = ko.observable({});

self.startDateString.subscribe(function(value){
    self.dateValue().startDate = value;
    self.dateValue.valueHasMutated();        
});

self.endDateString.subscribe(function(value){
    self.dateValue().endDate = value;   
    self.dateValue.valueHasMutated();      
});`);
    
    sample["ntsMonthDays"] = new Control("月日入力フォーム", 9,
        `<span tabindex="1" data-bind="ntsCheckBox: { checked: enable }">Enable</span>
<div id="monthdays" tabindex="2" data-bind="ntsMonthDays: {name: 'monthday', value: value, enable: enable, required: true}"></div>
<input tabindex="3" data-bind="ntsNumberEditor: {value: value}"/>
<div>
    <b>Localized:</b> <span data-bind="text: text"></span>
</div>`,
        `self.value = ko.observable('');
self.text = ko.observable('');
self.value.subscribe(function(newValue) {
    self.text(nts.uk.time.formatMonthDayLocalized(newValue));
});
self.enable = ko.observable(true);`);
    
    sample["ntsFileUpload"] = new Control("ファイル参照フォーム", 10,
        `<div id="file-upload" data-bind="ntsFileUpload:{
    name: controlName,
    required: required,
    filename: filename,
    accept: accept,
    text: textId,
    aslink: asLink,
    enable: enable,
    onchange: onchange,
    onfilenameclick: onfilenameclick,
    immediateUpload: immediate,
    stereoType: stereoType,
    uploadFinished: finished
}"></div>
<br/>
<div>File (stereo) Type: <input data-bind="ntsTextEditor: { value: stereoType, option: { width: '310' } }" /></div>
<div data-bind="ntsCheckBox: { checked: required }">Required</div>
<div data-bind="ntsCheckBox: { checked: asLink }">As Link</div>
<div data-bind="ntsCheckBox: { checked: enable }">Enable</div>
<div data-bind="ntsCheckBox: { checked: immediate }">Immediate Upload</div>
<div><button data-bind="click: validate">validate</button></div>
<div>File ID (when uploaded): <input data-bind="ntsTextEditor: { value: fileId, option: { width: '310' } }" /></div>

<br/><br/>
<h3>Upload file</h3>
<button data-bind="click: upload">Upload</button>
<br/><br/>
<h3>Download file</h3>
<button data-bind="click: download">Download</button>
<input data-bind="ntsTextEditor: { value: zipEntry, option: { width: '160' } }" />
<br/><br/>
<h3>Preview file</h3>
<button data-bind="click: preview">Preview</button>
<div id="file-review"></div>
<br/>
<h3>Check file exist</h3>
<button data-bind="click: isExist">IsExist</button>
<div id="check-exist"></div>
<br/>
<h3>Get file information</h3>
<button data-bind="click: getInfo">Get Info</button>
<div data-bind="text: ko.toJSON(fileInfo)"></div>
<br/>
<h3>Custom without Knockout</h3>
<input type="file" id="custom-upload" />
<button id="button">Upload</button>`,
        `self.controlName = ko.observable("テスト");
self.required = ko.observable(true);
self.stereoType = ko.observable("samplefile");
self.fileId = ko.observable("");
self.filename = ko.observable("");
self.zipEntry = ko.observable("");
self.fileInfo = ko.observable(null);
self.accept = ko.observableArray([".png", '.gif', '.jpg', '.jpeg', ".zip"]);
self.textId = ko.observable("KMF004_106");
self.asLink = ko.observable(true);
self.enable = ko.observable(true);
self.immediate = ko.observable(true);
self.onchange = function() {
};
self.onfilenameclick = function() {
};

ScreenModel.prototype.validate = function() {
    $("#file-upload").ntsError("check");
};

ScreenModel.prototype.upload = function() {
    var self = this;
    $("#file-upload").ntsFileUpload({ stereoType: "flowmenu" }).done(function(res) {
        self.fileId(res[0].id);
    }).fail(function(err) {
        nts.uk.ui.dialog.alertError(err);
    });
};

ScreenModel.prototype.download = function() {
    if (!_.isEmpty(this.zipEntry())) 
        nts.uk.request.specials.donwloadFile(this.fileId() + "/" + this.zipEntry());
    else nts.uk.request.specials.donwloadFile(this.fileId());
};

ScreenModel.prototype.isExist = function() {
   nts.uk.request.specials.isFileExist(this.fileId()).done(function(res) {
       $("#check-exist").text(res);
   });
};

ScreenModel.prototype.preview = function() {
    var self = this;
    var liveviewcontainer = $("#file-review");
    liveviewcontainer.html("");
    let fileId = self.fileId();
    if (!_.isEmpty(this.zipEntry())) fileId = self.fileId() + "/" + this.zipEntry();
    liveviewcontainer.append($("<img/>").attr("src", nts.uk.request.liveView(fileId)));
    liveviewcontainer.append($("<iframe/>").css("width", "100%").attr("src", nts.uk.request.liveView(fileId)));
};

ScreenModel.prototype.getInfo = function() {
    var self = this;
    nts.uk.request.ajax("/shr/infra/file/storage/infor/" + this.fileId()).done(function(res) {
        self.fileInfo(res);
    });
};

ScreenModel.prototype.finished = function(fileInfo) {
    var self = this;
    self.fileId(fileInfo.id);
};

$("#button").click(function() {
    $("#custom-upload").ntsFileUpload({ stereoType: "flowmenu" }).done(function(res) {
        nts.uk.ui.dialog.info("Upload successfully!");
    }).fail(function(err) {
        nts.uk.ui.dialog.alertError(err);
    });
});`);
    
    sample["ntsCombobox"] = new Control("ドロップダウンリスト", 11,
        `<div class="status">
    <span data-bind="ntsCheckBox: { checked: isEnable }">Enable</span>
    <span data-bind="ntsCheckBox: { checked: isEditable }">Editable</span>
    <span data-bind="ntsCheckBox: { checked: isRequired }">isRequired</span>
    <span data-bind="ntsCheckBox: { checked: selectFirstIfNull }">selectFirstIfNull</span>
</div>
<div class="control-group valign-center">
    <div id="combo-box"
        data-bind="ntsComboBox: {
                            name: 'Sample List',
                            options: itemList,
                            optionsValue: 'code',
                            visibleItemsCount: 5,
                            value: selectedCode,
                            optionsText: 'name',
                            editable: isEditable,
                            enable: isEnable,
                            required: isRequired,
                            nullText: 'Bypassed value',
                            selectFirstIfNull: selectFirstIfNull,
                            columns: [
                                    { prop: 'code', length: 4 },
                                    { prop: 'name', length: 10 },
                                ]}"></div>

    <div>
        Your selected code: <input type="text"
            data-bind="value:selectedCode" style="width: 50px;" />
        <button data-bind="click: validate">validate</button>
        <button data-bind="click: function() { selectFirstIfNull(false); selectedCode(undefined); }">clear
            value</button>
    </div>
</div>

<h2>Set width 300px:</h2>
<div class="control-group valign-center">
    <div id="combo-box2"
        data-bind="ntsComboBox: {
                            width: '300px',
                            options: itemList,
                            optionsValue: 'code',
                            visibleItemsCount: 5,
                            value: ko.observable(2),
                            optionsText: 'name',
                            editable: isEditable,
                            enable: isEnable,
                            required: isRequired,
                            columns: [
                                    { prop: 'code', length: 4 },
                                    { prop: 'name', length: 10 },
                                ]}"></div>
</div>

<h2>Expand width (auto):</h2>
<div class="control-group valign-center">
    <div id="combo-box2"
        data-bind="ntsComboBox: {
                            width: 'auto',
                            options: itemList,
                            optionsValue: 'code',
                            visibleItemsCount: 5,
                            value: selectedCode2,
                            optionsText: 'name',
                            editable: isEditable,
                            enable: isEnable,
                            required: isRequired,
                            columns: [
                                    { prop: 'code', length: 4 },
                                    { prop: 'name', length: 10 },
                                ]}"></div>
</div>

<h2>Attach dropdown to body:</h2>
<div class="control-group valign-center">
    <div id="combo-box2"
        data-bind="ntsComboBox: {
                            options: itemList,
                            optionsValue: 'code',
                            visibleItemsCount: 5,
                            value: ko.observable(5),
                            optionsText: 'name',
                            editable: false,
                            enable: isEnable,
                            required: false,
                            selectFirstIfNull: false,
                            dropDownAttachedToBody: true,
                            columns: [
                                    { prop: 'code', length: 4 },
                                    { prop: 'name', length: 10 },
                                ]}"></div>
</div>`,
        `var ItemModel = (function () {
    function ItemModel(code, name) {
        this.code = code;
        this.name = name;
    }
    return ItemModel;
}());

self.itemList = ko.observableArray([
    new ItemModel('1', '基本給'),
    new ItemModel('2', '役職手当'),
    new ItemModel('3', '基本給ながい文字列ながい文字列ながい文字列')
]);

self.selectedCode = ko.observable('1');
self.selectedCode2 = ko.observable('2');
self.isEnable = ko.observable(true);
self.isEditable = ko.observable(true);
self.isRequired = ko.observable(true);
self.selectFirstIfNull = ko.observable(true);

ScreenModel.prototype.setDefault = function() {
    var self = this;
    nts.uk.util.value.reset($("#combo-box, #A_SEL_001"), self.defaultValue() !== '' ? self.defaultValue() : undefined);
};

ScreenModel.prototype.validate = function() {
    $("#combo-box").trigger("validate");
};

ScreenModel.prototype.setInvalidValue = function() {
    this.selectedCode('aaa');
};`);
    
    sample["ntsColorPicker"] = new Control("カラーピッカー", 12,
        `<span data-bind="ntsCheckBox: { checked: enable }">Enable</span>
<input data-bind="ntsTextEditor: {value: value}"/>
<div id="colorpicker" data-bind="ntsColorPicker: {value: value, enable: enable, width: 200, name: '#[CCG013_19]', required: false}"/>

<input id="colorpicker2" data-bind="ntsColorPicker: {value: value2, enable: enable, width: 200, name: '#[CCG013_19]', required: false}"/>
<table id="colorpicker3" data-bind="ntsColorPicker: {value: value2, enable: enable, width: 200, name: '#[CCG013_19]', required: true}"/>`,
        `self.value = ko.observable('');
self.value2 = ko.observable('');
self.enable = ko.observable(true);`);
    
    sample["ntsRadioBoxGroup"] = new Control("ラジオボタングループ", 13,
        `<button data-bind="click: addBoxes">Add Box</button>
<button data-bind="click: removeBoxes">Remove Box</button>
<input id="number-1" data-bind="ntsNumberEditor: {value: value}"/>
<button data-bind="click: enableCheckBox">Enable CheckBox</button>
<span data-bind="ntsCheckBox: { checked: enable }">Enable</span>
<br/><br/>
<div>
    <input data-bind="ntsTextEditor: { value: defaultValue }" />
    <button data-bind="click: setDefault">Reset</button>
</div>
<br/>
<h3>Selected Values as objects</h3>
<div id="first-list" data-bind="ntsRadioBoxGroup: {options: itemList,
                    optionsText: 'name',
                    value: selectedValue,
                    enable: enable}"></div>
<h4>Selected values:</h4>
<div data-bind="text: ko.toJSON(selectedValue)"></div>
<br/>
<h3>Selected Values as value</h3>
<div id="second-list" data-bind="ntsRadioBoxGroup: {options: itemList,
                    optionsValue: 'id',
                    optionsText: 'name',
                    value: selectedId,
                    enable: enable}"></div>
<h4>Selected values:</h4>
<div data-bind="text: ko.toJSON(selectedId)"></div>
<br/>
<h3>Item list:</h3>
<div data-bind="text: ko.toJSON(itemList)"></div>`,
        `var BoxModel = (function () {
    function BoxModel(id, name) {
        var self = this;
        self.id = id;
        self.name = name;
        self.enable = ko.observable(id % 3 === 0);
    }
    return BoxModel;
}());

self.count = 10;
self.itemList = ko.observableArray([]);
for (let i = 1; i < 10; i++) {
    self.itemList.push(new BoxModel(i, 'box ' + i));
}
self.selectedValue = ko.observable(new BoxModel(3, 'box 3'));
self.selectedId = ko.observable(1);
self.enable = ko.observable(true);
self.value = ko.observable(0);
self.defaultValue = ko.observable();
ScreenModel.prototype.addBoxes = function() {
    var self = this;
    self.itemList.push(new BoxModel(self.count, 'box ' + self.count));
    self.count++;
};

ScreenModel.prototype.removeBoxes = function() {
    var self = this;
    self.itemList.pop();
};

ScreenModel.prototype.enableCheckBox = function() {
    var self = this;
    if(self.value() < self.itemList().length - 1){
        self.itemList()[self.value()].enable(true);
    }
};

ScreenModel.prototype.setDefault = function() {
    var self = this;
    nts.uk.util.value.reset($("#second-list"), self.defaultValue() !== undefined ? parseInt(self.defaultValue()) : undefined);
};`);
    
    sample["ntsCheckBox"] = new Control("チェックボックス", 14,
        `<div data-bind="ntsCheckBox: { checked: checked, enable: enable, readonly: readonly}">A simple yet elegant checkbox</div>
<div class="cf" style="background:#00B050; padding:10px 5px; margin: 10px -5px;">
    <div id="test" data-bind="ntsCheckBox: { checked: checked, enable: enable, readonly: readonly,  text: 'A simple yet elegant checkbox' }" class="outline"></div>
</div>
<div class="bg-yellow" style="padding: 10px 5px; margin: 10px -5px;">
    <div id="test2" data-bind="ntsCheckBox: { checked: checked, enable: enable, readonly: readonly, text: 'A simple yet elegant checkbox' }" class="minimalist"></div>
</div>
<div data-bind="ntsCheckBox: { checked: enable }">Enable</div>
<div data-bind="ntsCheckBox: { checked: readonly }">Readonly</div>

<h2>Specify style</h2>
<div data-bind="ntsCheckBox: { checked: enable, style: 'normal' }">style "normal" (default) ... スタイル＝一般</div><br />
<br />
<div data-bind="ntsCheckBox: { checked: enable, style: 'button' }">style "button" ... スタイル＝ボタン</div><br />
<br />
<div data-bind="ntsCheckBox: { checked: enable, style: 'warnpanel' }">style "warnpanel" ... スタイル＝警告パネル</div><br />`,
        `self.checked = ko.observable(true);
self.enable = ko.observable(true);
self.readonly = ko.observable(false);`);
    
    sample["ntsSwitchButton"] = new Control("スイッチボタングループ", 15,
        `<div class="valign-center">
    <input data-bind="ntsTextEditor: { value: defaultValue }"></input>
    <button data-bind="click: setDefault">Reset</button>
</div>
<br/>
<div id="switch-buttons" data-bind="ntsSwitchButton: {
    name: 'Sample Switch',
    options: roundingRules,
    optionsValue: 'code',
    optionsText: 'name',
    value: selectedRuleCode,
    required: required,
    enable: enable }"></div>
<div data-bind="ntsCheckBox: {checked: required, text: 'Required'}"></div>
<div data-bind="ntsCheckBox: {checked: enable, text: 'Enable'}"></div>
<button data-bind="click: validate">validate</button>
<div>Selected code: <span data-bind="text: selectedRuleCode"></span></div>`,
        `self.enable = ko.observable(true);
self.required = ko.observable(true);
self.roundingRules = ko.observableArray([
    { code: '1', name: '四捨五入' },
    { code: '2', name: '切り上げ' },
    { code: '3', name: '切り捨て' }
]);
self.selectedRuleCode = ko.observable();
self.defaultValue = ko.observable();

ScreenModel.prototype.setDefault = function() {
    var self = this;
    nts.uk.util.value.reset($("#switch-buttons"), self.defaultValue() !== '' ? self.defaultValue() : undefined);
};

ScreenModel.prototype.validate = function() {
    $("#switch-buttons").trigger("validate");
};`);

    sample["Button"] = new Control("ボタン", 16,
        `<button>Normal</button>
<button class="proceed">Proceed</button>
<button class="danger">Danger</button>
<h3>Size</h3>
<button class="small">Small</button>
<button>Normal</button>
<button class="large">Large</button>
<button class="x-large">X-large</button>
<h3>Disabled</h3>
<button data-bind="enable: false">Disabled</button>
<h3>Auto height</h3>
<button class="auto-height">lorem<br/>ipsum</button>
<button class="auto-height">lorem<br/>ipsum<br/>dolor<br/>sit amet</button>
<h3>Arrow Button</h3>
<button><i class="icon icon-button-arrow-left"></i></button>
<button><i class="icon icon-button-arrow-right"></i></button>
<button><i class="icon icon-button-arrow-left double"></i></button>
<button><i class="icon icon-button-arrow-right double"></i></button>

<button class="auto-height"><i class="icon icon-button-arrow-top"></i></button>
<button class="auto-height"><i class="icon icon-button-arrow-bottom"></i></button>`, ``);
    
    sample["ntsTabPanel"] = new Control("タブグループ", 17,
        `<div class="cf flex">
    <div style="width: 900px; padding-right: 10px; border-right: 1px solid #ccc;">
        <div id="tab-panel" data-bind="ntsTabPanel: { dataSource: tabs, active: selectedTab, direction: 'vertical' }">
            <div class="tab-content-1">
                <span>Tab Content 1</span><br/>
                <div id="tab-panel2" data-bind="ntsTabPanel: { dataSource: tabs2, active: selectedTab2, direction: 'horizontal' }">
                    <div class="x-tab-content-1">
                        <span>Tab Content 1</span><br/>
                        
                        <button id="test-button2">test-button2</button>
                    </div>
                    <div class="x-tab-content-2">
                        <table id="multi-list" data-bind="ntsGridList: {
                                height: 350,
                                options: items,
                                optionsValue: 'code',
                                columns: columns,
                                multiple: true,
                                value: currentCodeList }"></table>
                    </div>
                    <div class="x-tab-content-3">
                        <input id="number-1" data-bind="ntsNumberEditor: { name: 'Number', value: commonAmount, constraint: 'CommonAmount' }" />
                    </div>
                    <div class="x-tab-content-4">
                        <p>Fusce vitae libero non sem blandit pharetra a vel mi. Integer euismod pellentesque hendrerit. Nam interdum maximus lacus. Mauris dapibus pulvinar quam vitae maximus. Morbi dapibus vitae ligula at facilisis. Quisque rhoncus magna ut enim scelerisque, venenatis tempus lacus volutpat. Sed ut tellus erat. Morbi sollicitudin luctus condimentum. Sed malesuada hendrerit dignissim.</p>
                        <p>Vestibulum sodales nisl tellus, a bibendum ligula eleifend vitae. Proin dictum eget mi ac mattis. Integer ex lectus, dapibus vitae nibh sit amet, bibendum porta urna. Suspendisse quis iaculis mauris. Integer efficitur bibendum dolor nec posuere. Integer blandit ante eu dolor ullamcorper accumsan. Fusce imperdiet mattis augue sed finibus. Nunc condimentum mollis magna, a euismod risus dapibus ut. Sed dolor nisl, iaculis quis ante sed, pretium tincidunt augue. Fusce sed sapien sapien. Cras suscipit, urna vitae maximus scelerisque, est dolor rutrum elit, id luctus est metus quis nunc. Pellentesque facilisis nibh ut libero scelerisque, non dapibus velit aliquet.</p>
                        <p>Aliquam pharetra tempor neque sed feugiat. Morbi velit quam, porttitor ac metus quis, sodales efficitur dui. Praesent convallis ligula dui. Duis placerat dignissim egestas. Fusce fermentum eleifend risus quis fermentum. Nullam vel dolor arcu. Vivamus id varius arcu. Ut commodo risus erat, quis tincidunt nisl tristique vitae. Maecenas in pulvinar odio. Sed feugiat viverra congue.</p>
                    </div>
                </div>
            </div>
            <div class="tab-content-2">
                <table id="multi-list" data-bind="ntsGridList: {
                        height: 350,
                        options: items,
                        optionsValue: 'code',
                        columns: columns,
                        multiple: true,
                        value: currentCodeList }"></table>
            </div>
            <div class="tab-content-3">
                <div data-bind="ntsComboBox: {
                        options: items,
                        optionsValue: 'code',
                        value: currentCode,
                        editable: false,
                        optionsText: 'code'
                }"></div>
            </div>
            <div class="tab-content-4">
                <p>Fusce vitae libero non sem blandit pharetra a vel mi. Integer euismod pellentesque hendrerit. Nam interdum maximus lacus. Mauris dapibus pulvinar quam vitae maximus. Morbi dapibus vitae ligula at facilisis. Quisque rhoncus magna ut enim scelerisque, venenatis tempus lacus volutpat. Sed ut tellus erat. Morbi sollicitudin luctus condimentum. Sed malesuada hendrerit dignissim.</p>
                <p>Vestibulum sodales nisl tellus, a bibendum ligula eleifend vitae. Proin dictum eget mi ac mattis. Integer ex lectus, dapibus vitae nibh sit amet, bibendum porta urna. Suspendisse quis iaculis mauris. Integer efficitur bibendum dolor nec posuere. Integer blandit ante eu dolor ullamcorper accumsan. Fusce imperdiet mattis augue sed finibus. Nunc condimentum mollis magna, a euismod risus dapibus ut. Sed dolor nisl, iaculis quis ante sed, pretium tincidunt augue. Fusce sed sapien sapien. Cras suscipit, urna vitae maximus scelerisque, est dolor rutrum elit, id luctus est metus quis nunc. Pellentesque facilisis nibh ut libero scelerisque, non dapibus velit aliquet.</p>
                <p>Aliquam pharetra tempor neque sed feugiat. Morbi velit quam, porttitor ac metus quis, sodales efficitur dui. Praesent convallis ligula dui. Duis placerat dignissim egestas. Fusce fermentum eleifend risus quis fermentum. Nullam vel dolor arcu. Vivamus id varius arcu. Ut commodo risus erat, quis tincidunt nisl tristique vitae. Maecenas in pulvinar odio. Sed feugiat viverra congue.</p>
                <div id="x-tab-panel" data-bind="ntsTabPanel: { dataSource: tabs2, active: selectedTab2 }">
                    <div class="x-tab-content-1">
                        <span>Tab Content 1</span><br/>
                    </div>
                    <div class="x-tab-content-2">
                        <table id="multi-list" data-bind="ntsGridList: {
                                height: 350,
                                options: items,
                                optionsValue: 'code',
                                columns: columns,
                                multiple: true,
                                value: currentCodeList }"></table>
                    </div>
                    <div class="x-tab-content-3">
                        <table id="grid"></table>
                    </div>
                    <div class="x-tab-content-4">
                        <p>Fusce vitae libero non sem blandit pharetra a vel mi. Integer euismod pellentesque hendrerit. Nam interdum maximus lacus. Mauris dapibus pulvinar quam vitae maximus. Morbi dapibus vitae ligula at facilisis. Quisque rhoncus magna ut enim scelerisque, venenatis tempus lacus volutpat. Sed ut tellus erat. Morbi sollicitudin luctus condimentum. Sed malesuada hendrerit dignissim.</p>
                        <p>Vestibulum sodales nisl tellus, a bibendum ligula eleifend vitae. Proin dictum eget mi ac mattis. Integer ex lectus, dapibus vitae nibh sit amet, bibendum porta urna. Suspendisse quis iaculis mauris. Integer efficitur bibendum dolor nec posuere. Integer blandit ante eu dolor ullamcorper accumsan. Fusce imperdiet mattis augue sed finibus. Nunc condimentum mollis magna, a euismod risus dapibus ut. Sed dolor nisl, iaculis quis ante sed, pretium tincidunt augue. Fusce sed sapien sapien. Cras suscipit, urna vitae maximus scelerisque, est dolor rutrum elit, id luctus est metus quis nunc. Pellentesque facilisis nibh ut libero scelerisque, non dapibus velit aliquet.</p>
                        <p>Aliquam pharetra tempor neque sed feugiat. Morbi velit quam, porttitor ac metus quis, sodales efficitur dui. Praesent convallis ligula dui. Duis placerat dignissim egestas. Fusce fermentum eleifend risus quis fermentum. Nullam vel dolor arcu. Vivamus id varius arcu. Ut commodo risus erat, quis tincidunt nisl tristique vitae. Maecenas in pulvinar odio. Sed feugiat viverra congue.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<br/>
<div data-bind="foreach: tabs">
    <span data-bind="text: title + ':'"></span>
    <span data-bind="ntsCheckBox: { checked: enable }">Enable</span>
    <span data-bind="ntsCheckBox: { checked: visible }">Visible</span>
    <br/>
</div>`,
        `var ItemModel = (function () {
    function ItemModel(code, name, description, deletable, other1, other2) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.other1 = other1;
        this.other2 = other2 || other1;
        this.deletable = deletable;
    }
    return ItemModel;
}());

self.tabs = ko.observableArray([
    {id: 'tab-1', title: 'Tab Title 1', content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'tab-2', title: 'Tab Title 2', content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'tab-3', title: 'Tab Title 3', content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'tab-4', title: 'Tab Title 4', content: '.tab-content-4', enable: ko.observable(true), visible: ko.observable(true)}
]);
self.selectedTab = ko.observable('tab-1');
self.tabs2 = ko.observableArray([
    {id: 'x-tab-1', title: 'Tab Title 1', content: '.x-tab-content-1', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'x-tab-2', title: 'Tab Title 2', content: '.x-tab-content-2', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'x-tab-3', title: 'Tab Title 3', content: '.x-tab-content-3', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'x-tab-4', title: 'Tab Title 4', content: '.x-tab-content-4', enable: ko.observable(true), visible: ko.observable(true)}
]);
self.selectedTab2 = ko.observable('x-tab-1');

self.items = ko.observableArray([]);
for(let i = 1; i < 5; i++) {
    self.items.push(new ItemModel('00' + i, '基本給', "description " + i, i%3 === 0, "2010/1/1"));
}
self.columns = ko.observableArray([
    { headerText: 'コード', key: 'code', width: 125 },
    { headerText: '名称', key: 'name', width: 125 }, 
    { headerText: '説明', key: 'description', width: 125 }, 
    { headerText: '説明1', key: 'other1', width: 125},
    { headerText: '説明2', key: 'other2', width: 125, isDateColumn: true, format: 'YYYY/MM/DD' } 
]); 
self.currentCode = ko.observable("001");
self.currentCodeList = ko.observableArray([]);

$("#grid").igGrid({
     dataSource: self.items(),
     primaryKey: 'code',
     width: undefined,
     height: '350px',
     columns: self.columns(),
     virtualization: true,
     virtualizationMode: 'continuous',
     features: [
         { name: 'Selection', multipleSelection: true },
         { name: 'RowSelectors', enableCheckBoxes: true, enableRowNumbering: false }
     ]
 });

self.commonAmount = ko.observable(10);`,
        `nts.uk.shr.com.primitive.sample.CommonAmount`);
    
    sample["ntsSideBar"] = new Control("サイドバー", 18,
        `<table id="sidebar">
    <tbody>
        <tr>
            <td id="sidebar-area">
                <div class="sidebar-navigator">
                    <ul class="navigator">
                        <li><a data-id="0" href="#tabpanel-1" role="tab-navigator" class="active">の間</a></li>
                        <li><a data-id="1" href="#tabpanel-2" role="tab-navigator">操作</a></li>
                        <li><a data-id="2" href="#tabpanel-3" role="tab-navigator">切断</a></li>
                        <li><a data-id="3" href="#tabpanel-4" role="tab-navigator">接続</a></li>
                        <li><a data-bind="click: testSideMenu" data-id="4">DoSomething</a></li>
                    </ul>
                    <div class="divider"></div>
                    <span>ログインをしなおしてください</span>
                    <button>?</button>
                </div>
            </td>
            <td>
                <div class="sidebar-content">
                    <div id="tabpanel-1" role="tabpanel">
                        <div class="sidebar-content-header">
                            <span class="title">の間</span>
                            <button class="proceed">操作</button>
                            <button>の間</button>
                            <button>操作がなかったため</button>
                            <button>接続を切断しました</button>
                        </div>
                        <div class="contents-area">
                            Content 1<br />
                            <input data-bind="ntsTextEditor: {value: ko.observable('')}"></input>
                            <button id="set-error" data-bind="click: setError">Set Error</button>
                            <button id="clear-error" data-bind="click: clearError">Clear Error</button>
                            <div data-bind="ntsCheckBox: { checked: show }">Show Item "操作"</div>
                            <br />
                            <div data-bind="ntsCheckBox: { checked: enable }">Enable Item "1 &amp; 2"</div>
                            <hr />
                            <input data-bind="ntsTextEditor: {value: ko.observable(''), name: 'aa', required: true}" />
                        </div>
                    </div>
                    <div id="tabpanel-2" role="tabpanel">
                        <div class="sidebar-content-header">
                            <span class="title">操作</span>
                            <button class="proceed">操作</button>
                            <button>の間</button>
                            <button>操作がなかったため</button>
                            <button>接続を切断しました</button>
                        </div>
                        <div class="contents-area fixed-flex-layout">
                            <div class="fixed-flex-layout-left">
                                <input data-bind="ntsTextEditor: {value: ko.observable('')}"></input>
                                <button id="set-error" data-bind="click: setError">Set Error</button>
                                <button id="clear-error" data-bind="click: clearError">Clear Error</button>
                                <table id="multi-list" data-bind="ntsGridList: {
                                        height: 350,
                                        options: items,
                                        optionsValue: 'code',
                                        columns: columns,
                                        multiple: true,
                                        value: currentCodeList
                                    }"></table>
                            </div>
                            <div class="fixed-flex-layout-right">
                                <input data-bind="ntsTextEditor: {value: ko.observable(''), name: 'B', required: true}" />
                                <input data-bind="ntsTextEditor: {value: ko.observable(''), name: 'C', required: true}" />
                            </div>
                       </div>
                    </div>
                    <div id="tabpanel-3" role="tabpanel">
                        <div class="sidebar-content-header">
                            <span class="title">切断</span>
                            <button class="proceed">操作</button>
                            <button>の間</button>
                            <button>操作がなかったため</button>
                            <button>接続を切断しました</button>
                        </div>
                        <div class="contents-area">
                            <input data-bind="ntsTextEditor: {value: ko.observable('')}"></input>
                            <button id="set-error" data-bind="click: setError">Set Error</button>
                            <button id="clear-error" data-bind="click: clearError">Clear Error</button>
                            <table id="grid"></table>
                        </div>
                    </div>
                    <div id="tabpanel-4" role="tabpanel">
                        <div class="sidebar-content-header">
                            <span class="title">接続</span>
                            <button class="proceed">操作</button>
                            <button>の間</button>
                            <button>操作がなかったため</button>
                            <button>接続を切断しました</button>
                        </div>
                        <div class="contents-area">
                            <div id="tab-panel" data-bind="ntsTabPanel: { dataSource: tabs, active: selectedTab}">
                                <div class="tab-content-1">
                                    <span>Tab Content 1</span><br/>
                                </div>
                                <div class="tab-content-2">
                                    <span>Tab Content 2</span><br/>
                                </div>
                                <div class="tab-content-3">
                                    <span>Tab Content 3</span><br/>
                                </div>
                                <div class="tab-content-4">
                                    <span>Tab Content 4</span><br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
</table>`,
        `$(function(){
    $("#sidebar").ntsSideBar();
});

var ItemModel = (function () {
    function ItemModel(code, name, description, deletable, other1, other2) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.other1 = other1;
        this.other2 = other2 || other1;
        this.deletable = deletable;
    }
    return ItemModel;
}());

self.tabs = ko.observableArray([
    {id: 'tab-1', title: 'Tab Title 1', content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'tab-2', title: 'Tab Title 2', content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'tab-3', title: 'Tab Title 3', content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'tab-4', title: 'Tab Title 4', content: '.tab-content-4', enable: ko.observable(true), visible: ko.observable(true)}
]);
self.selectedTab = ko.observable('tab-2');

self.show = ko.observable(true);
self.show.subscribe(function(newVal) {
    if (newVal)
        $("#sidebar").ntsSideBar("show", 1);
    else
        $("#sidebar").ntsSideBar("hide", 1);
});

self.items = ko.observableArray([]);
self.tabs = ko.observableArray([
    {id: 'tab-1', title: 'Tab Title 1', content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'tab-2', title: 'Tab Title 2', content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'tab-3', title: 'Tab Title 3', content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'tab-4', title: 'Tab Title 4', content: '.tab-content-4', enable: ko.observable(true), visible: ko.observable(true)}
]);
self.selectedTab = ko.observable('tab-1');

for (let i = 1; i < 5; i++) {
    self.items.push(new ItemModel('00' + i, '基本給', "description " + i, i % 3 === 0, "2010/1/1"));
}

self.columns = ko.observableArray([
    { headerText: 'コード', key: 'code', width: 100, hidden: true },
    { headerText: '名称', key: 'name', width: 150, hidden: true },
    { headerText: '説明', key: 'description', width: 150 },
    { headerText: '説明1', key: 'other1', width: 150 },
    { headerText: '説明2', key: 'other2', width: 150, isDateColumn: true, format: 'YYYY/MM/DD' }
]);
self.currentCode = ko.observable("001");
self.currentCodeList = ko.observableArray([]);

self.enable = ko.observable(true);
self.enable.subscribe(function(newVal) {
    if (newVal) {
        $("#sidebar").ntsSideBar("enable", 1);
        $("#sidebar").ntsSideBar("enable", 2);
    }
    else {
        $("#sidebar").ntsSideBar("disable", 1);
        $("#sidebar").ntsSideBar("disable", 2);
    }
});

$("#grid").igGrid({
    dataSource: self.items(),
    primaryKey: "code",
    width: '100%',
    height: '350px',
    columns: [
        { headerText: 'コード', key: 'code', width: '30%' },
        { headerText: '名称', key: 'name', width: '30%' },
        { headerText: '説明', key: 'description', width: '30%' },
    ],
    virtualization: true,
    virtualizationMode: 'continuous',
});

ScreenModel.prototype.testSideMenu = function () {
    alert($("#sidebar").ntsSideBar("getCurrent"));
};
ScreenModel.prototype.setError = function () {
    $(".nts-input").ntsError("set", "Errors.");
};
ScreenModel.prototype.clearError = function () {
    $(".nts-input").ntsError("clear");
};`);
    
    sample["ntsLinkButton"] = new Control("リンクラベル", 19,
        `<h3>HyperLink Style</h3>
<a class="hyperlink" href="#">アイコン無し、ただのリンク</a>
<br/><br/>
<h3>Default Style</h3>
<a data-bind="ntsLinkButton: { jump: 'preview.html' }">振込元銀行の登録へ</a>
<a class="test" data-bind="ntsLinkButton: { action: doSomething.bind($data, '❤') }, text: linkText"></a>
<br/><br/>
<h3>Go out Style</h3>
<a class="goout" data-bind="ntsLinkButton: { jump: 'preview.html' }">振込元銀行の登録へ</a>
<br/><br/>
<h3>Go back Style</h3>
<a class="goback" data-bind="ntsLinkButton: { jump: 'preview.html' }">振込元銀行の登録へ</a>`,
        `self.linkText = ko.observable("振込元銀行の登録へ");
ScreenModel.prototype.doSomething = function(s) {
    var self = this;
    self.linkText(self.linkText() + s);
};`);
    
    sample["ntsAccordion"] = new Control("アコーディオン", 20,
        `<div data-bind="ntsCheckBox: { checked: enable }">Enable</div>
<div data-bind="ntsAccordion: { }">
    <h3>詳細検索</h3>
    <div>First content panel</div>
</div>
<div data-bind="ntsAccordion: { enable: enable }" tabindex="-1">
    <h3>
        詳細検索
        <span class="status">全選択</span>
        <span class="close-button ui-icon ui-icon-closethick"></span>
    </h3>
    <div>First content panel</div>
</div>
<h3>Group</h3>
<input data-bind="ntsTextEditor: { value: active }"></input>
<div id="group-accordion" data-bind="ntsAccordion: { active: active, enable: enable }" tabindex="3">
    <h3>詳細検索</h3>
    <div>
        <table id="multi-list" data-bind="ntsGridList: {
            height: 350,
            options: items,
            optionsValue: 'code',
            columns: columns,
            multiple: true,
            value: currentCodeList }"></table>
    </div>
    <h3>サブ画面</h3>
    <div><table id="grid"></table></div>
    <h3>画面ID</h3>
    <div>Third content panel</div>
</div>`,
        `var ItemModel = (function () {
    function ItemModel(code, name, description, deletable, other1, other2) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.other1 = other1;
        this.other2 = other2 || other1;
        this.deletable = deletable;
    }
    return ItemModel;
}());
self.active = ko.observable(false);
self.enable = ko.observable(true);

self.items = ko.observableArray([]);
for (let i = 1; i < 5; i++) {
    self.items.push(new ItemModel('00' + i, '基本給', "description " + i, i % 3 === 0, "2010/1/1"));
}
self.columns = ko.observableArray([
    { headerText: 'コード', key: 'code', width: 125 },
    { headerText: '名称', key: 'name', width: 125 },
    { headerText: '説明', key: 'description', width: 125 },
    { headerText: '説明1', key: 'other1', width: 125 },
    { headerText: '説明2', key: 'other2', width: 125, isDateColumn: true, format: 'YYYY/MM/DD' }
]);
self.currentCode = ko.observable("001");
self.currentCodeList = ko.observableArray([]);

$("#grid").igGrid({
    dataSource: self.items(),
    primaryKey: 'code',
    width: undefined,
    height: '350px',
    columns: self.columns(),
    virtualization: true,
    virtualizationMode: 'continuous',
    features: [
        { name: 'Selection', multipleSelection: true },
        { name: 'RowSelectors', enableCheckBoxes: true, enableRowNumbering: false }
    ]
});`,
        `nts.uk.shr.com.primitive.PersonId
nts.arc.time.YearMonth
nts.uk.shr.com.primitive.sample.ResidenceCode`);
    
    sample["ntsHelpButton"] = new Control("はてなアイコン", 21,
        `<style>
#btn-wrapper {
    padding-left: 100px;
}

.col-3 {
    width: 33.3333333333%;
    float: left;
    box-sizing: border-box;
    padding: 10px;
}

#title-pop-up {
    color: red;
}

#pop-up-element {
    width: 400px;
}

.label-new {
    float: right;
    display: block;
    height: 100%;
    margin-right: 5px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
}

.label-new:before {
    display: inline-block;
    height: 16px;
    line-height: 16px;
    padding: 0 5px;
    border-radius: 5px;
    box-sizing: border-box;
    background: #5cb85c;
    content: 'New';
}
</style>

<div class="cf" id="btn-wrapper">
    <button data-bind="ntsHelpButton: {image: '../component/helpbutton/test-image.png', position: 'bottom center', enable: enable }">?</button>
    <button data-bind="ntsHelpButton: {image: '../component/helpbutton/test-image2.jpg', position: 'right+6 top-50', enable: enable }">?</button>
    <button class="inline" data-bind="ntsHelpButton: { position: 'right center', textId: 'KTG027_11', textParams:['{#KTG027_7}', '{#KTG027_8}', '{#KTG027_1}', '{#KTG027_9}'] }, text: '？'">？</button>
    <button data-bind="ntsHelpButton: {popUpId: 'pop-up-element', position : 'bottom center', enable: true}">?</button>
</div>
<div data-bind="ntsCheckBox: { checked: enable }">Enable</div>
<div id="pop-up-element"> 
    <h2 id="title-pop-up">Pop-up Element</h2>
    <p> This pop-up element have a H2 tag and a P tag. You also can add other elements</p>
</div>`,
        `self.enable = ko.observable(true);`);
        
    sample["ntsLegendButton"] = new Control("凡例ボタン", 22,
        `<style>
    .bg-red {
        background-color: #ff0000;
    }
    .bg-green {
        background-color: #00aa00;
    }
    .bg-blue {
        background-color: #0000ff;
        color: #0000ff;
    }
</style>
<button data-bind="ntsLegendButton: legendOptions"></button>
<button id="with-template" data-bind="ntsLegendButton: legendWithTemplateOptions"></button>`,
        `self.legendOptions = {
    items: [
        { cssClass: { className: 'bg-red', colorPropertyName: 'background-color' }, labelText: 'RED' },
        { cssClass: { className: 'bg-green', colorPropertyName: 'background-color' }, labelText: 'GREEN' },
        { cssClass: { className: 'bg-blue', colorPropertyName: 'background-color' }, symbolText: '○', labelText: 'BLUE' }
    ]
};
self.legendWithTemplateOptions = {
    items: [
        { colorCode: '#ff0000', labelText: 'RED' },
        { colorCode: '#00AA00', labelText: 'GREEN' },
        { colorCode: '#0000FF', labelText: 'BLUE' }
    ],
    template : '<div style="color: #{colorCode}; "> #{labelText} </div>'
};`); 
    
    sample["ntsWizard"] = new Control("ウィザード", 23,
        `<div class="cf">
    <div>
        <input data-bind="ntsNumberEditor: { value: activeStep }"/>
        <select data-bind="options: stepList, optionsText: 'content', value: stepSelected" style="width: 200px"></select>
        <button data-bind="click: goto">Go to Step</button>
    </div>
    <br/>
    <div id="wizard" data-bind="ntsWizard: {active: activeStep, steps: stepList, theme: 'yellow'}" class="cf">
        <div class="header">
            <div class="image" data-icon="/nts.uk.com.js.web/lib/nittsu/ui/style/images/ntsWizard/start-images.jpg"></div>
            <div class="content">再集計</div>
        </div>
        <div class="steps">
            <div class="step-1">再集計</div>
            <div class="step-2"><span>処理方法を選ぶ</span><br /> └詳細設定をする</div>
            <div class="step-3">対象社員を選ぶ</div>
            <div class="step-4">対象社員を選ぶ</div>
            <div class="step-5">対象社員を選ぶ</div>
            <div class="end step-6">実行</div>
        </div>
        <div class="contents">
            <div class="step-1">contents step1</div>
            <div class="step-2">
                <div data-bind="ntsSearchBox: {searchMode: 'filter',targetKey: 'code', comId: 'multi-list', 
                items: items, selected: currentCodeList, selectedKey: 'code', fields: ['name', 'code'], mode: 'igGrid'}"></div>                                                                                                                                                                                     
                <h3>Multi Selection</h3>
                <table id="multi-list" data-bind="ntsGridList: {
                    height: 320,
                    options: items,
                    optionsValue: 'code',
                    columns: columns,
                    multiple: true,
                    value: currentCodeList
                }"></table>
            </div>
            <div class="step-3">
                <div id="inputSelectImplementAtr" tabindex="1" class="selectImplementAtr" data-bind="ntsSwitchButton: {
                        options: [{id: '1', name: 'Test 1'}, {id: '2', name: 'Test 2'}],
                        optionsValue: 'id',
                        optionsText: 'name',
                        name: '#[KSC001_81]',
                        value: ko.observable('1'),
                        required: true,
                        enable: true }"> 
                    </div>
            </div>
            <div class="step-4">
                <div id="list-box" data-bind="ntsListBox: {
                    options: items,
                    optionsValue: 'code',
                    optionsText: 'name',
                    multiple: false,
                    value: currentCode,
                    rows: 10,
                    columns: [
                        { key: 'code', length: 4 },
                        { key: 'name', length: 10 },
                        { key: 'description', length: 10 }
                    ]}"></div>
            </div>
            <div class="step-5">
                <div style="width: 100%; padding-right: 10px; border-right: 1px solid #ccc;">
                    <div id="tab-panel" data-bind="ntsTabPanel: { dataSource: tabs, active: selectedTab }">
                        <div class="tab-content-1">
                            <span>Tab Content 1</span><br/>
                        </div>
                        <div class="tab-content-2">
                            <span>Tab Content 2</span><br/>
                        </div>
                        <div class="tab-content-3">
                            <span>Tab Content 3</span><br/>
                        </div>
                        <div class="tab-content-4">
                            <p>Fusce vitae libero non sem blandit pharetra a vel mi. Integer euismod pellentesque hendrerit. Nam interdum maximus lacus. Mauris dapibus pulvinar quam vitae maximus. Morbi dapibus vitae ligula at facilisis. Quisque rhoncus magna ut enim scelerisque, venenatis tempus lacus volutpat. Sed ut tellus erat. Morbi sollicitudin luctus condimentum. Sed malesuada hendrerit dignissim.</p>
                            <p>Vestibulum sodales nisl tellus, a bibendum ligula eleifend vitae. Proin dictum eget mi ac mattis. Integer ex lectus, dapibus vitae nibh sit amet, bibendum porta urna. Suspendisse quis iaculis mauris. Integer efficitur bibendum dolor nec posuere. Integer blandit ante eu dolor ullamcorper accumsan. Fusce imperdiet mattis augue sed finibus. Nunc condimentum mollis magna, a euismod risus dapibus ut. Sed dolor nisl, iaculis quis ante sed, pretium tincidunt augue. Fusce sed sapien sapien. Cras suscipit, urna vitae maximus scelerisque, est dolor rutrum elit, id luctus est metus quis nunc. Pellentesque facilisis nibh ut libero scelerisque, non dapibus velit aliquet.</p>
                            <p>Aliquam pharetra tempor neque sed feugiat. Morbi velit quam, porttitor ac metus quis, sodales efficitur dui. Praesent convallis ligula dui. Duis placerat dignissim egestas. Fusce fermentum eleifend risus quis fermentum. Nullam vel dolor arcu. Vivamus id varius arcu. Ut commodo risus erat, quis tincidunt nisl tristique vitae. Maecenas in pulvinar odio. Sed feugiat viverra congue.</p>
                        </div>
                    </div>
                </div>
                <div style="width: 100%; padding-left: 10px;">
                    <div id="tab-panel" class="cf" data-bind="ntsTabPanel: { dataSource: tabs, active: selectedTab, direction: 'vertical' }">
                        <div class="tab-content-1">
                            <span>Tab Content 1</span><br/>
                        </div>
                        <div class="tab-content-2">
                            <span>Tab Content 2</span><br/>
                        </div>
                        <div class="tab-content-3">
                            <span>Tab Content 3</span><br/>
                        </div>
                        <div class="tab-content-4">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus laoreet magna sed massa feugiat, non accumsan nunc sollicitudin. Curabitur ligula nisl, rhoncus vitae feugiat nec, consequat posuere ex. Aenean accumsan a orci non vulputate. Sed fermentum metus vitae ex tristique, id cursus ex vehicula. Donec gravida felis lectus, sed iaculis sapien rutrum eget. Aliquam dui augue, ultricies non consequat ac, commodo vel mauris. Pellentesque molestie placerat justo sed ullamcorper. Quisque at suscipit mi, in mollis erat. Nulla congue ex eu ornare aliquet. Cras laoreet, odio vel tempor interdum, diam mi placerat nisl, in vehicula nisl mauris a sapien. Aenean id ex eros. Maecenas volutpat arcu at dolor mattis tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                            <p>Curabitur pulvinar molestie libero, non rutrum quam pharetra sed. Sed vel congue ex. Maecenas interdum lacus enim, in laoreet metus blandit in. Etiam sem elit, ornare nec pulvinar a, pellentesque sed dui. Pellentesque dignissim tortor id erat eleifend congue. Suspendisse vitae dapibus sapien. Suspendisse tristique risus in leo luctus sagittis. Nulla sodales, nisi ut viverra pretium, diam libero pulvinar risus, id gravida orci dolor gravida nisl. Praesent at consequat leo, et mattis ex.</p>
                            <p>Aliquam pharetra tempor neque sed feugiat. Morbi velit quam, porttitor ac metus quis, sodales efficitur dui. Praesent convallis ligula dui. Duis placerat dignissim egestas. Fusce fermentum eleifend risus quis fermentum. Nullam vel dolor arcu. Vivamus id varius arcu. Ut commodo risus erat, quis tincidunt nisl tristique vitae. Maecenas in pulvinar odio. Sed feugiat viverra congue.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step-6">
                <div data-bind="ntsDatePicker: {value: date, dateFormat: 'YYYY/MM/DD ddd'}"></div>
                <div data-bind="ntsDatePicker: {value: date, dateFormat: 'YYYY/MM/DD dddd'}"></div>
                <div id="test" data-bind="ntsDatePicker: {value: yearMonth, dateFormat: 'yearmonth', valueFormat: 'YYYYMM'}"></div>
                <h3>Time Of Day(HH:mm)</h3>
                <input data-name="Time Of Days Editor" data-bind="ntsTimeEditor: {name: 'Clock', constraint:'SampleTimeClock', value: timeOfDay, inputFormat: 'time', required: true}" />
                <h3>Time (HH:mm)</h3>
                <input data-name="Time Editor" data-bind="ntsTimeEditor: {name: 'Duration', constraint: 'SampleTimeDuration', value: time, inputFormat: 'time', mode: 'time', required: true}" />
                <hr/>
                <div data-bind="with: yearmontheditor">
                    <h3>YearMonth (YYYY/MM)</h3>
                    <input data-name="YearMonth Editor" data-bind="ntsTimeEditor: {value: value, constraint: constraint, option: option, required: true}" />
                </div>
            </div>
        </div>
    </div>
    
    <button data-bind="click: begin">Begin</button>
    <button data-bind="click: end">End</button>
    <button data-bind="click: previous">Previous</button>
    <button data-bind="click: next">Next</button>
    <button data-bind="click: getCurrentStep">Current Step Index</button>
</div>`,
        `var ItemModel = (function () {
    function ItemModel(code, name, description, other1, other2) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.other1 = other1;
        this.other2 = other2 || other1;
    }
    return ItemModel;
}());

self.items = ko.observableArray([]);
var str = ['a0', 'b0', 'c0', 'd0'];
for(var j = 0; j < 4; j++) {
    for(var i = 1; i < 51; i++) {    
        var code = i < 10 ? str[j] + '0' + i : str[j] + i;         
        self.items.push(new ItemModel(code,code,code,code));
    } 
}
self.columns = ko.observableArray([
    { headerText: 'コード', prop: 'code', width: 50 },
    { headerText: '名称', prop: 'name', width: 100 },
    { headerText: '説明', prop: 'description', width: 100 },
    { headerText: '説明1', prop: 'other1', width: 100 },
    { headerText: '説明2', prop: 'other2', width: 100 }
]);
self.currentCode = ko.observable();
self.currentCodeList = ko.observableArray([]);
self.currentCodeList.subscribe(function (newValue) { 
});
self.roundingRules = ko.observableArray([
    { code: '1', name: '四捨五入' },
    { code: '2', name: '切り上げ' },
    { code: '3', name: '切り捨て' }
]);
self.selectedRuleCode = ko.observable(1);

self.tabs = ko.observableArray([
    {id: 'tab-1', title: 'Tab Title 1', content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'tab-2', title: 'Tab Title 2', content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'tab-3', title: 'Tab Title 3', content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true)},
    {id: 'tab-4', title: 'Tab Title 4', content: '.tab-content-4', enable: ko.observable(true), visible: ko.observable(true)}
]);
self.selectedTab = ko.observable('tab-2');

self.yearMonth = ko.observable("200002");
self.date = ko.observable(nts.uk.time.UTCDate(2000, 0, 1));

self.timeOfDay = ko.observable("12:00");
self.time = ko.observable("1200");
self.yearmontheditor = {
    value: ko.observable(200001),
    constraint: 'LayoutCode',
    option: ko.mapping.fromJS(new nts.uk.ui.option.TimeEditorOption({
        inputFormat: 'yearmonth'
    })),
    required: ko.observable(false),
    enable: ko.observable(true),
    readonly: ko.observable(false)
};

self.stepList = [
    {content: '.step-1'},
    {content: '.step-2'},
    {content: '.step-3'},
    {content: '.step-4'},
    {content: '.step-5'},
    {content: '.step-6'}
];
self.activeStep = ko.observable(0);
self.stepSelected = ko.observable({content: '.step-1'});

ScreenModel.prototype.begin = function () {
    $('#wizard').ntsWizard("begin");
};
ScreenModel.prototype.end = function () {
    $('#wizard').ntsWizard("end");
};
ScreenModel.prototype.next = function () {
    $('#wizard').ntsWizard("next").done(function () {
        $('#inputSelectImplementAtr').focus();
    });
};
ScreenModel.prototype.previous = function () {
    $('#wizard').ntsWizard("prev").done(function () {
        $('#inputSelectImplementAtr').focus();
    });
};
ScreenModel.prototype.getCurrentStep = function () {
    alert($('#wizard').ntsWizard("getCurrentStep"));
};
ScreenModel.prototype.goto = function () {
    var index = this.stepList.indexOf(this.stepSelected());
    $('#wizard').ntsWizard("goto", index);
};`,
    `nts.arc.time.YearMonth
nts.uk.shr.com.primitive.sample.SampleTimeDuration
nts.uk.shr.com.primitive.sample.SampleTimeClock`);
    
    sample["Label"] = new Control("ラベル", 24,
        `<h2>"label" class</h2>
<div class="feature-box">
    <div class="content">
        <div class="control-group valign-center">
            <span class="label" style="padding:20px;color: #00b050;background: #dcf4e7;" title="">現在使用行数 / 最大行数</span>
            <span style="font-size: 1.5rem;">9行</span>
            <span>（+非表示0行） / </span>
            <span class="label" style="font-size: 1.5rem; margin-right: 15px;">10行</span>
            <span class="label" style="padding-top:5px;">&#9834;</span>
            <span class="label" style="padding-bototm:5px;">&#9836;</span>
            <span class="label" style="padding-top:10px;">&#9834;</span>
            <span class="label" style="padding-bototm:10px;">&#9833;</span>
            <span class="label" style="padding-top:12px;">&#9834;</span>
            <span class="label" style="padding-bottom:10px;">&#9835;</span>
        </div>
    </div>
</div>
<br/>
<hr/>
<h2>"warning" class</h2>
<div class="feature-box">
    <div class="content">
        <h3>&lt;div&gt;</h3>
        <div class="label warning">行いたい操作を選んでください。対象となる処理区分を選択</div>
        <hr/>
        <h3>&lt;span&gt;</h3>
        <span class="label warning">行いたい操作を選んでください。対象となる処理区分を選択</span>
    </div>
</div>
<br/>
<hr/>
<h2>"with-image" class</h2>
<div class="feature-box">
    <div class="content">
        <span class="label with-image">
            <i class="image image-calendar"></i>
            <span>行いたい操作を選んでください。対象となる処理区分を選択</span>
        </span>
    </div>
</div>`, ``);
    
    sample["ntsFormLabel"] = new Control("フォームラベル", 25,
        `<input data-bind="ntsTextEditor: {value: css}" /><br/>
<div data-bind="ntsFormLabel: {cssClass: 'test'}"><span>レイア</span><span style="font-size:1.4rem;">アウトコ</span><span>ウトコード</span></div><br /><br />
<div data-bind="ntsFormLabel: { cssClass: css, constraint: constraint, enable: false, text: text }"></div><br /><br />
<div data-bind="ntsFormLabel: { constraint: constraints, required: true }">レイアウトコード</div><br /><br />
<div data-bind="ntsFormLabel: { constraint: constraint, inline: inline, required: required, enable: enable}">レイアウトコード</div><br />
<div>
    <br />
    <label>Change primitive:</label>
    <br />
    <br />
    <button data-bind="click: changePrimitive">random maxLength</button>
    <br />
</div>`,
        `self.text = ko.observable("レイアウトコード");
self.constraint = ko.observable('ResidenceCode');
self.constraints = ko.observableArray(['ResidenceCode', 'ResidenceCode']);
self.inline = ko.observable(true);
self.required = ko.observable(true)
self.css = ko.observable("abc")
self.enable = ko.observable(true);
ScreenModel.prototype.changePrimitive = function() {
    let self = this;
    __viewContext.primitiveValueConstraints['ResidenceCode'].maxLength = Math.floor(Math.random() * 20) + 1;

    self.constraint.valueHasMutated();
    self.constraints.valueHasMutated();
};`,
        `nts.uk.shr.com.primitive.PersonId
nts.arc.time.YearMonth
nts.uk.shr.com.primitive.sample.ResidenceCode`);
    
    sample["ntsUserGuide"] = new Control("ガイドメッセージ", 26,
        `<style>
#content {
    padding-top: 160px;
    padding-left: 300px;
}
</style>
<button id="button-top" data-bind="click: showOverlayTop">Top &amp; Bottom</button>
<button id="button-bottom" data-bind="click: showOverlayBottom">Bottom</button>
<!-- UserGuide Top & Bottom -->
<div class="userguide-top" data-toggle="userguide" data-target="#button-top" data-direction="top" >
    <div data-target="#button-top" data-direction="top">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a nibh vel ligula pulvinar eleifend. Aenean finibus turpis eu suscipit mollis. In ipsum nibh, finibus at luctus et, venenatis non neque. Mauris volutpat leo ut consequat vulputate. Morbi vitae massa nec ligula congue pretium. Morbi tristique erat sed lacinia ornare. Fusce ut iaculis nulla, nec fringilla neque. Sed vehicula lorem neque, vel laoreet quam accumsan in.
    </div>
</div>
<!-- UserGuide Bottom -->
<div class="userguide-bottom" data-toggle="userguide" data-target="#button-bottom" data-direction="bottom" >
    <div data-target="#button-bottom" data-direction="bottom">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a nibh vel ligula pulvinar eleifend. Aenean finibus turpis eu suscipit mollis. In ipsum nibh, finibus at luctus et, venenatis non neque. Mauris volutpat leo ut consequat vulputate. Morbi vitae massa nec ligula congue pretium. Morbi tristique erat sed lacinia ornare. Fusce ut iaculis nulla, nec fringilla neque. Sed vehicula lorem neque, vel laoreet quam accumsan in.
    </div>
</div>`,
        `$("[data-toggle='userguide']").ntsUserGuide();
ScreenModel.prototype.showOverlayTop = function() {
    $(".userguide-top").ntsUserGuide("show");
};

ScreenModel.prototype.showOverlayBottom = function() {
    $(".userguide-bottom").ntsUserGuide("show");
};`); 
    
    sample["Caret"] = new Control("キャレット", 27,
        `<div class="feature-box">
    <div class="header"><h3>Inline</h3></div>
    <div class="content">
        <div class="control-group valign-center">
            <button>Button</button><span class="caret-right caret-inline"></span>
            <input data-bind="ntsTextEditor: {value: ko.observable('')}" /><span class="caret-right caret-inline"></span>
            <button class="small">Button</button><span class="caret-right caret-inline"></span>
            <span class="caret-left caret-inline"></span>
            <span class="caret-top caret-inline"></span>
            <span class="caret-bottom caret-inline"></span>
        </div>
    </div>
</div>
<div class="feature-box">
    <div class="header"><h3>Outline</h3></div>
    <div class="content">
        <div class="control-group valign-center" style="width: 830px; height: 150px; padding: 10px 15px; background: #97d155;">
            <span class="caret-right outline"></span>
            <span class="caret-left outline"></span>
            <span class="caret-top outline"></span>
            <span class="caret-bottom outline"></span>
            <span class="caret-right outline" style="font-size: 3rem"></span>
            <span class="caret-left outline" style="font-size: 3rem"></span>
            <span class="caret-top outline" style="font-size: 3rem"></span>
            <span class="caret-bottom outline" style="font-size: 3rem"></span>
            <span class="caret-right outline" style="font-size: 5rem"></span>
            <span class="caret-left outline" style="font-size: 5rem"></span>
            <span class="caret-top outline" style="font-size: 5rem"></span>
            <span class="caret-bottom outline" style="font-size: 5rem"></span>
        </div>
    </div>
</div>
<div class="feature-box">
    <div class="header"><h3>Button</h3></div>
    <div class="content">
        <div class="control-group valign-center">
            <button class="caret-bottom">Button</button>
            <button class="caret-top">Button</button>
            <button class="caret-right">Button</button>
            <span class="label" style="width: 30px;"></span>
            <button class="caret-left">Button</button>
        </div>
    </div>
</div>
<div class="feature-box">
    <div class="header"><h3>Background Caret</h3></div>
    <div class="content">
        <div class="bg-green caret-right caret-background" style="float:left; width:250px; height: 300px; margin:20px 50px;"></div>
        <div class="bg-green caret-left caret-background" style="float:left; width:250px; height: 300px; margin:20px 50px;"></div>
    </div>
</div>`);
    
    sample["ntsPanel"] = new Control("パネル", 28,
        `<article class="cf">
    <h3>Common Panel</h3>
    <div class="panel">背景色も枠線もなし</div>
    <div class="panel panel-frame">背景色も枠線もなし</div>
    <div class="panel panel-gray-bg">背景色も枠線もなし</div>
</article>
<br/>
<h3>Master Panel</h3>
<article class="cf" style="padding: 20px 0px 0px 10px">
    <div class="pull-left" data-bind="ntsPanel:{width: '40%', height: '400px', direction: 'right', showIcon: true, visible: true}">
        <input data-bind="ntsTextEditor: {value: ko.observable('')}" />
    </div>
    <div class="pull-left" data-bind="ntsPanel:{width: '40%', height: '350px', direction: 'bottom', showIcon: false, visible: true}"></div>
</article>`, ``);
    
    sample["ntsPopup"] = new Control("ポップアップパネル", 29,
        `<h3>Dismissible</h3>
<button class="show-popup1">Show Popup</button>
<button class="destroy-popup1">Destroy This Popup!</button>
<div class="popup-area1">
    <div id="combo-box" data-bind="ntsComboBox: {options: itemList,
        optionsValue: 'code',
        visibleItemsCount: 5,
        value: selectedCode,
        optionsText: 'name',
        columns: [
                { prop: 'name', length: 4 },
        ]}">
    </div>
    <h2>Popup 1!</h2>
    <input data-bind="ntsTextEditor:{value: ko.observable('DEEP BLUE')}" /><br />
    <br/>
    <button class="proceed close-popup">Save</button>
    <button class="close-popup">Cancel</button>
</div>
<br/><br/>
<h3>Un-dismissible</h3>
<button class="show-popup2">Show Popup</button>
<button class="toggle-popup2">Toggle the popup</button>
<div class="popup-area2">
    <h2>Popup 2!</h2>
    <input data-bind="ntsTextEditor:{value: ko.observable('ALPHA GO')}" /><br />
    <br/>
    <button class="proceed close-popup">Save</button>
    <button class="close-popup">Cancel</button>
</div>`,
        `var ItemModel = (function () {
    function ItemModel(code, name) {
        this.code = code;
        this.name = name;
    }
    return ItemModel;
}());

self.itemList = ko.observableArray([
    new ItemModel("1", "基本給"),
    new ItemModel("2", "役職手当"),
    new ItemModel("3", "基本給")
]);
self.selectedCode = ko.observable("1");

$(".popup-area1").ntsPopup({
    trigger: ".show-popup1",
    position: {
        my: "left top",
        at: "left bottom",
        of: ".show-popup1"
    },
    showOnStart: false,
    dismissible: true
});

$(".destroy-popup1").click(function() {
    $(".popup-area1").ntsPopup("destroy");
});

$(".popup-area2").ntsPopup({
    position: {
        my: "left top",
        at: "left bottom",
        of: ".show-popup2"
    },
    showOnStart: false,
    dismissible: false
});

$(".show-popup2").click(function() {
    $(".popup-area2").ntsPopup("show");
});

$(".toggle-popup2").click(function() {
    $(".popup-area2").ntsPopup("toggle");
});

$(".close-popup").click(function() {
    $(this).parent().ntsPopup("hide");
});`);
    
    sample["ntsFunctionPanel"] = new Control("ファンクションパネル", 30,
        `<h1>Function Panel</h1>
<div data-bind="ntsFunctionPanel: {width: 200, headerText: 'test super', dataSource: functionItems}"></div>
<br/>
<button data-bind="click: remove">Remove Item</button>`,
        `self.functionItems = ko.observableArray([]);
var functionItems = [];
for (var i = 0; i < 10; i++) {
    let x = i;
    functionItems.push({icon: "../component/functionpanel/19209343.png", text: 'item-' + i, action: function(evt, ui){ 
        alert(x); 
    }});
}
self.functionItems(functionItems);

ScreenModel.prototype.remove = function() {
    this.functionItems.shift();            
}`);
    
    sample["ntsSearchBox"] = new Control("リスト検索フォーム", 31,
        `<div class="cf">
    <div style="float:left"> 
        <button data-bind="click : addItem">add</button>
        <button data-bind="click : updateItem">update</button>
        <h3>Search mode: filter mode</h3>                                                                               
        <div style="width: 700px" data-bind="ntsSearchBox: {searchMode: 'highlight',targetKey: 'code', comId: 'multi-list', 
            items: items,  selectedKey: 'code', fields: ['name', 'code'], mode: 'igGrid'}"></div>                                                                                                                                                                                       
        <h3>Multi Selection</h3>
        <table id="multi-list" data-bind="ntsGridList: {
                height: 320,
                options: items,
                optionsValue: 'code',
                columns: columns,
                multiple: true,
                value: currentCodeList
            }"></table>
        <br />
    </div>
    <div style="float:left">
        <h4>Your multiple selected code:</h4>
        <span data-bind="text: currentCodeList"></span>
    </div>
</div>`,
        `var ItemModel = (function () {
    function ItemModel(code, name, description, other1, other2) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.other1 = other1;
        this.other2 = other2 || other1;
    }
    return ItemModel;
}());

self.indexUpdate = 0;
self.indexAdd = 51;
self.items = ko.observableArray([]);
var str = ['a0', 'b0', 'c0', 'd0'];
for(var j = 0; j < 4; j++) {
    for(var i = 1; i < self.indexAdd; i++) {    
        var code = i < 10 ? str[j] + '0' + i : str[j] + i;         
        self.items.push(new ItemModel(code,code,code,code));
    } 
}
self.columns = ko.observableArray([
    { headerText: 'コード', prop: 'code', width: 100 },
    { headerText: '名称', prop: 'name', width: 230 },
    { headerText: '説明', prop: 'description', width: 150 },
    { headerText: '説明1', prop: 'other1', width: 150 },
    { headerText: '説明2', prop: 'other2', width: 150 }
]);
self.currentCode = ko.observable();
self.currentCodeList = ko.observableArray([]);
self.currentCodeList.subscribe(function (newValue) { 
});

ScreenModel.prototype.addItem = function() {
    this.items.push(new ItemModel('a0' + this.indexAdd, '基本給', "description 1", "other1"));
    this.indexAdd++;
};

ScreenModel.prototype.updateItem = function() {
    this.items()[this.indexUpdate].name = "tests";
    this.items.valueHasMutated();
    this.indexUpdate++;
};

ScreenModel.prototype.removeItem = function() {
    this.items.shift();
};`);
}