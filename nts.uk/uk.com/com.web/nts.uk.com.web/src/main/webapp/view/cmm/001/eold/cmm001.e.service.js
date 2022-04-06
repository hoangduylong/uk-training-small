var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var pr;
        (function (pr) {
            var view;
            (function (view) {
                var base;
                (function (base) {
                    var postcode;
                    (function (postcode_1) {
                        var service;
                        (function (service) {
                            var pathService = {
                                findPostCodeZipCode: "ctx/basic/postcode/find"
                            };
                            function findPostCodeZipCode(zipCode) {
                                return nts.uk.request.ajax(pathService.findPostCodeZipCode + '/' + zipCode);
                            }
                            service.findPostCodeZipCode = findPostCodeZipCode;
                            function findPostCodeZipCodeToRespone(zipCode) {
                                var dfd = $.Deferred();
                                var postCodeRespone;
                                postCodeRespone = new model.PostCodeRespone('0', '', null);
                                if (zipCode && zipCode != '') {
                                    service.findPostCodeZipCode(zipCode).done(function (data) {
                                        var datalength = 0;
                                        if (data != null) {
                                            datalength = data.length;
                                        }
                                        if (datalength == 0) {
                                            postCodeRespone = new model.PostCodeRespone('0', 'ER010', null);
                                            dfd.resolve(postCodeRespone);
                                        }
                                        if (datalength == 1) {
                                            postCodeRespone = new model.PostCodeRespone('1', '', data[0]);
                                            dfd.resolve(postCodeRespone);
                                        }
                                        if (datalength >= 2) {
                                            postCodeRespone = new model.PostCodeRespone('2', '', null);
                                            dfd.resolve(postCodeRespone);
                                        }
                                    }).fail(function (error) {
                                        postCodeRespone = new model.PostCodeRespone('0', error.messageId, null);
                                        dfd.resolve(postCodeRespone);
                                    });
                                }
                                else {
                                    postCodeRespone = new model.PostCodeRespone('0', 'ER001', null);
                                    dfd.resolve(postCodeRespone);
                                }
                                return dfd.promise();
                            }
                            service.findPostCodeZipCodeToRespone = findPostCodeZipCodeToRespone;
                            function findPostCodeZipCodeSelection(zipCode) {
                                var dfd = $.Deferred();
                                var postCodeRespone;
                                postCodeRespone = new model.PostCodeRespone('0', '', null);
                                nts.uk.ui.windows.setShared('zipCode', zipCode);
                                nts.uk.ui.windows.sub.modal("../e/index.xhtml", { height: 400, width: 530, title: "郵便番号" }).onClosed(function () {
                                    var zipCodeRes = nts.uk.ui.windows.getShared('zipCodeRes');
                                    if (zipCodeRes) {
                                        postCodeRespone = new model.PostCodeRespone('1', '', zipCodeRes);
                                        dfd.resolve(postCodeRespone);
                                    }
                                    else {
                                        postCodeRespone = new model.PostCodeRespone('0', 'ER010', null);
                                        dfd.resolve(postCodeRespone);
                                    }
                                });
                                return dfd.promise();
                            }
                            service.findPostCodeZipCodeSelection = findPostCodeZipCodeSelection;
                            //to address => UI
                            function toAddress(postCode) {
                                return postCode.prefectureName + ' ' + postCode.municipalityName + ' ' + postCode.townName;
                            }
                            service.toAddress = toAddress;
                            //to kana => UI
                            function toKana(postCode) {
                                return postCode.prefectureNameKn + ' ' + postCode.municipalityNameKn + ' ' + postCode.townNameKn;
                            }
                            service.toKana = toKana;
                            var model;
                            (function (model) {
                                var PostCode = /** @class */ (function () {
                                    function PostCode() {
                                    }
                                    return PostCode;
                                }());
                                model.PostCode = PostCode;
                                var PostCodeRespone = /** @class */ (function () {
                                    function PostCodeRespone(errorCode, message, postcode) {
                                        this.errorCode = errorCode;
                                        this.message = message;
                                        this.postcode = postcode;
                                    }
                                    return PostCodeRespone;
                                }());
                                model.PostCodeRespone = PostCodeRespone;
                            })(model = service.model || (service.model = {}));
                        })(service = postcode_1.service || (postcode_1.service = {}));
                    })(postcode = base.postcode || (base.postcode = {}));
                })(base = view.base || (view.base = {}));
            })(view = pr.view || (pr.view = {}));
        })(pr = uk.pr || (uk.pr = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm001.e.service.js.map