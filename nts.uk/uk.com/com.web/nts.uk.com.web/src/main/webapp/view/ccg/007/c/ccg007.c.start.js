var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var pr;
        (function (pr) {
            var view;
            (function (view) {
                var ccg007;
                (function (ccg007) {
                    var c;
                    (function (c) {
                        __viewContext.ready(function () {
                            if ($('#contents-area').data('loaded')) {
                                $('[id=contents-area]:eq(1)').remove();
                                return;
                            }
                            $('#contents-area').data('loaded', true);
                            var screenModel = new c.viewmodel.ScreenModel();
                            screenModel.start().done(function () {
                                __viewContext.bind(screenModel);
                                nts.uk.characteristics.restore("form2LoginInfo").done(function (loginInfo) {
                                    if (!loginInfo || !loginInfo.companyCode) {
                                        $('#company-code-inp').focus();
                                    }
                                    else {
                                        if (!loginInfo.employeeCode) {
                                            $('#employee-code-inp').focus();
                                        }
                                        else {
                                            $('#password-input').focus();
                                        }
                                    }
                                });
                            });
                        });
                    })(c = ccg007.c || (ccg007.c = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.c.start.js.map