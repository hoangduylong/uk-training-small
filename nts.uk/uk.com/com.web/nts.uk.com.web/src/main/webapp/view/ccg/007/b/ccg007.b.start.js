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
                    var b;
                    (function (b) {
                        __viewContext.ready(function () {
                            if ($('#contents-area').data('loaded')) {
                                $('[id=contents-area]:eq(1)').remove();
                                return;
                            }
                            $('#contents-area').data('loaded', true);
                            var screenModel = new b.viewmodel.ScreenModel();
                            screenModel.start().done(function () {
                                __viewContext.bind(screenModel);
                                nts.uk.characteristics.restore("form1LoginInfo").done(function (loginInfo) {
                                    if (loginInfo) {
                                        $('#password-input').focus();
                                    }
                                    else {
                                        $('#login-id-inp').val();
                                        $('#login-id-inp').focus();
                                    }
                                });
                            });
                        });
                    })(b = ccg007.b || (ccg007.b = {}));
                })(ccg007 = view.ccg007 || (view.ccg007 = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg007.b.start.js.map