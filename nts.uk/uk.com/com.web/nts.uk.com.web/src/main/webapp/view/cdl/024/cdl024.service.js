var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var at;
        (function (at) {
            var view;
            (function (view) {
                var cdl024;
                (function (cdl024) {
                    var service;
                    (function (service) {
                        var servicePath = {
                            getAll: 'at/record/worktypeselection/getall'
                        };
                        function getAll() {
                            return nts.uk.request.ajax('at', servicePath.getAll);
                        }
                        service.getAll = getAll;
                    })(service = cdl024.service || (cdl024.service = {}));
                })(cdl024 = view.cdl024 || (view.cdl024 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl024.service.js.map