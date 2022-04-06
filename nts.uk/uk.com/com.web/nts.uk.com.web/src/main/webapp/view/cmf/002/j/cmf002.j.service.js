var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf002;
                (function (cmf002) {
                    var j;
                    (function (j) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                getCharacterDataFormatSetting: "exio/exo/char/getdatatype",
                                setCharacterDataFormatSetting: "exio/exo/character/add"
                            };
                            function getCharacterDataFormatSetting() {
                                return ajax("com", format(paths.getCharacterDataFormatSetting));
                            }
                            service.getCharacterDataFormatSetting = getCharacterDataFormatSetting;
                            function setCharacterDataFormatSetting(data) {
                                return ajax("com", paths.setCharacterDataFormatSetting, data);
                            }
                            service.setCharacterDataFormatSetting = setCharacterDataFormatSetting;
                        })(service = j.service || (j.service = {}));
                    })(j = cmf002.j || (cmf002.j = {}));
                })(cmf002 = view.cmf002 || (view.cmf002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf002.j.service.js.map