module nts.uk.com.view.cps009.b {
    __viewContext.ready(function() {
        __viewContext["viewModel"] = new viewmodel.ViewModel();
        __viewContext["viewModel"].start().done(function(data) {
            $("#grid0").ntsGrid({
                width: '300px',
                height: '465px',
                dataSource: __viewContext["viewModel"].itemInitLst || [],
                primaryKey: 'perInfoItemDefId',
                virtualization: true,
                virtualizationMode: 'continuous',
                columns: [
                    { headerText: '', key: 'perInfoItemDefId', dataType: 'string', width: '50px', hidden: true },
                    { headerText: '', key: 'isRequired', dataType: 'number', width: '50px', hidden: true },
                    { headerText: '', key: 'disabled', dataType: 'boolean', width: '50px', showHeaderCheckbox: true, ntsControl: 'Checkbox' },
                    { headerText: nts.uk.resource.getText('CPS009_33'), key: 'itemName', dataType: 'string', width: '250px' }
                ],
                ntsControls: [{ name: 'Checkbox', options: { value: 1, text: '' }, optionsValue: 'value', optionsText: 'text', controlType: 'CheckBox', enable: true }],
                features: [
                    {
                        name: 'Selection',
                        mode: 'row',
                        multipleSelection: true
                    },
                    {
                        name: "Tooltips",
                        columnSettings: [
                            { columnKey: "itemName", allowTooltips: true }
                        ],
                        visibility: "overflow"
                    }
                ],
                ntsFeatures: [{
                    name: 'CellState',
                    rowId: 'rowId',
                    columnKey: 'columnKey',
                    state: 'state',
                    states: __viewContext["viewModel"].state
                }]
            });
            __viewContext.bind(__viewContext["viewModel"]);

            $(document).ready(function() {
                $('#grid0_container').attr("tabindex","-1");
                $('#grid0_virtualContainer').attr("tabindex", "1");
                $('span.box').attr("tabindex", "2");
                let beforeIndex = -1;
                $(window).keyup((e) => {
                    if (e.which === 9) {
                        let tabindex = e.target.attributes.tabindex ? e.target.attributes.getNamedItem("tabindex").value : e.target.attributes.getNamedItem("tab-index").value;
                        if (beforeIndex == 6) {
                            $("#grid0_disabled > span > div > label > span.box").focus();
                        }
                        beforeIndex = parseInt(tabindex);
                    }
                });
            });
        });
    });
}

