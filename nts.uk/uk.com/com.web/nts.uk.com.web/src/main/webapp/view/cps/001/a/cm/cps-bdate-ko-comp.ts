let $: any = window['$'],
    _: any = window['_'],
    ko: any = window["ko"],
    moment: any = window['moment'],
    text: any = window['nts'].uk.resource.getText;

module nts.custom.component {
    ko.components.register('base-date', {
        template: `
        <div class="form-group">
            <div data-bind="ntsFormLabel: {text: text('CPS001_35')}"></div>
            <div tabindex="17" data-bind="ntsDatePicker: { enable: !!employeeId(), name: text('CPS001_35'), value: standardDate, dateFormat: 'YYYY/MM/DD'}"></div>
            <button tabindex="18" data-bind="enable: !!employeeId() && !!enableBtn(), click: function() { id.valueHasMutated() }, text: text('CPS001_37')"></button>
        </div>`,
        viewModel: function(params: any) {
            $.extend(params, {
                text: text,
                enableBtn: params.standardDate.enableBtn || (params.standardDate.enableBtn = ko.computed(() => moment.utc(params.standardDate(), _.indexOf(params.standardDate(), "Z") > -1 ? "YYYY-MM-DD" : "YYYY/MM/DD").isValid() && !!(ko.toJS(params.standardDate) || '').match(/((19|[2-9][0-9])\d{2})(-|\/)(\d{2}|\d{1})(-|\/)(\d{2}|\d{1})/)))
            });

            return params;
        }
    });
}