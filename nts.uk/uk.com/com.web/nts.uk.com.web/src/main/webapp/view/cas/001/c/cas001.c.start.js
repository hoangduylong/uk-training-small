var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas001;
                (function (cas001) {
                    var c;
                    (function (c) {
                        __viewContext.ready(function () {
                            __viewContext["viewModel"] = new c.viewmodel.ScreenModel();
                            setTimeout(function () {
                                $("#grid0").ntsGrid({
                                    width: '300px',
                                    height: '345px',
                                    dataSource: __viewContext["viewModel"].roleList() || [],
                                    primaryKey: 'roleId',
                                    virtualization: true,
                                    virtualizationMode: 'continuous',
                                    columns: [
                                        { headerText: '', key: 'check', dataType: 'boolean', width: '40px', ntsControl: 'Checkbox' },
                                        { headerText: "roleID", key: "roleId", dataType: "string", width: "90px", height: "40px", hidden: true },
                                        { headerText: nts.uk.resource.getText('CAS001_8'), key: "roleCode", dataType: "string", width: "50px", height: "40px" },
                                        { headerText: nts.uk.resource.getText('CAS001_9'), key: "roleName", dataType: "string", width: "200px", height: "40px" }
                                    ],
                                    ntsControls: [{ name: 'Checkbox', options: { value: 1, text: '' }, optionsValue: 'value', optionsText: 'text', controlType: 'CheckBox', enable: true }],
                                    features: [
                                        {
                                            name: 'Selection',
                                            mode: 'row',
                                            multipleSelection: true
                                        }, {
                                            name: "Tooltips",
                                            columnSettings: [
                                                { columnKey: "roleName", allowTooltips: true }
                                            ],
                                            visibility: "overflow"
                                        }
                                    ]
                                });
                            }, 50);
                            __viewContext.bind(__viewContext["viewModel"]);
                            $(document).ready(function () {
                                $('#grid0_container').attr("tabindex", "-1");
                                $('#grid0_virtualContainer').attr("tabindex", "1");
                                $('span.box').attr("tabindex", "1");
                                var beforeIndex = -1;
                                $("#grid0 > tbody > tr:nth-child(1) > td:nth-child(1) > div > div > label > span").focus();
                                $(window).keyup(function (e) {
                                    if (e.which === 9) {
                                        var tabindex = e.target.attributes.tabindex ? e.target.attributes.getNamedItem("tabindex").value : e.target.attributes.getNamedItem("tab-index").value;
                                        //                    if (beforeIndex == 3) {
                                        //                        $("#grid0 > tbody > tr:nth-child(1) > td:nth-child(1) > div > div > label > span").focus();
                                        //                    }
                                        beforeIndex = parseInt(tabindex);
                                    }
                                });
                            });
                        });
                    })(c = cas001.c || (cas001.c = {}));
                })(cas001 = view.cas001 || (view.cas001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas001.c.start.js.map