var $ = window['$'], _ = window['_'], ko = window["ko"], moment = window['moment'], text = window['nts'].uk.resource.getText;
var nts;
(function (nts) {
    var custom;
    (function (custom) {
        var component;
        (function (component) {
            ko.components.register('base-date', {
                template: "\n        <div class=\"form-group\">\n            <div data-bind=\"ntsFormLabel: {text: text('CPS001_35')}\"></div>\n            <div tabindex=\"17\" data-bind=\"ntsDatePicker: { enable: !!employeeId(), name: text('CPS001_35'), value: standardDate, dateFormat: 'YYYY/MM/DD'}\"></div>\n            <button tabindex=\"18\" data-bind=\"enable: !!employeeId() && !!enableBtn(), click: function() { id.valueHasMutated() }, text: text('CPS001_37')\"></button>\n        </div>",
                viewModel: function (params) {
                    $.extend(params, {
                        text: text,
                        enableBtn: params.standardDate.enableBtn || (params.standardDate.enableBtn = ko.computed(function () { return moment.utc(params.standardDate(), _.indexOf(params.standardDate(), "Z") > -1 ? "YYYY-MM-DD" : "YYYY/MM/DD").isValid() && !!(ko.toJS(params.standardDate) || '').match(/((19|[2-9][0-9])\d{2})(-|\/)(\d{2}|\d{1})(-|\/)(\d{2}|\d{1})/); }))
                    });
                    return params;
                }
            });
        })(component = custom.component || (custom.component = {}));
    })(custom = nts.custom || (nts.custom = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cps-bdate-ko-comp.js.map