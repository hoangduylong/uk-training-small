var cmm001;
(function (cmm001) {
    var aold;
    (function (aold) {
        var service;
        (function (service) {
            var paths = {
                getAllCompanys: "ctx/proto/company/findallcompany",
                getCompanyDetail: "ctx/proto/company/findCompanyDetail",
                addCompany: "ctx/proto/company/adddata",
                updateCompany: "ctx/proto/company/updatedata"
            };
            /**
             * get list company
             */
            function getAllCompanys() {
                var dfd = $.Deferred();
                nts.uk.request.ajax(paths.getAllCompanys)
                    .done(function (res) {
                    dfd.resolve(res);
                })
                    .fail(function (res) {
                    dfd.reject(res);
                });
                return dfd.promise();
            }
            service.getAllCompanys = getAllCompanys;
            function getCompanyDetail(companyCd) {
                var dfd = $.Deferred();
                nts.uk.request.ajax(paths.getCompanyDetail + "/" + companyCd)
                    .done(function (res) {
                    dfd.resolve(res);
                })
                    .fail(function (res) {
                    dfd.reject(res);
                });
                return dfd.promise();
            }
            service.getCompanyDetail = getCompanyDetail;
            function addData(company) {
                var dfd = $.Deferred();
                nts.uk.request.ajax(paths.addCompany, company).done(function (res) {
                    dfd.resolve(res);
                }).fail(function (res) {
                    nts.uk.ui.dialog.alert(res.messName);
                    dfd.reject(res);
                });
                return dfd.promise();
            }
            service.addData = addData;
            function updateData(company) {
                var dfd = $.Deferred();
                nts.uk.request.ajax(paths.updateCompany, company)
                    .done(function (res) {
                    dfd.resolve(res);
                })
                    .fail(function (res) {
                    dfd.reject(res);
                });
                return dfd.promise();
            }
            service.updateData = updateData;
            var model;
            (function (model) {
                // company
                var CompanyDto = /** @class */ (function () {
                    function CompanyDto(companyCode, companyName, address1, address2, addressKana1, addressKana2, companyNameAbb, companyNameKana, corporateMyNumber, depWorkPlaceSet, displayAttribute, // cot thu 3
                    faxNo, postal, presidentName, presidentJobTitle, telephoneNo, termBeginMon, useKtSet, useQySet, useJjSet) {
                        this.termBeginMon = 0;
                        this.use_Gr_Set = 0;
                        this.use_Kt_Set = 0;
                        this.use_Qy_Set = 0;
                        this.use_Jj_Set = 0;
                        this.use_Ac_Set = 0;
                        this.use_Gw_Set = 0;
                        this.use_Hc_Set = 0;
                        this.use_Lc_Set = 0;
                        this.use_Bi_Set = 0;
                        this.use_Rs01_Set = 0;
                        this.use_Rs02_Set = 0;
                        this.use_Rs03_Set = 0;
                        this.use_Rs04_Set = 0;
                        this.use_Rs05_Set = 0;
                        this.use_Rs06_Set = 0;
                        this.use_Rs07_Set = 0;
                        this.use_Rs08_Set = 0;
                        this.use_Rs09_Set = 0;
                        this.use_Rs10_Set = 0;
                        this.companyCode = companyCode;
                        this.companyName = companyName;
                        this.companyNameGlobal = "";
                        this.companyNameAbb = companyNameAbb;
                        this.companyNameKana = companyNameKana;
                        this.address1 = (address1);
                        this.address2 = (address2);
                        this.addressKana1 = (addressKana1);
                        this.addressKana2 = (addressKana2);
                        this.use_Gr_Set = 0;
                        this.use_Kt_Set = useKtSet;
                        this.use_Qy_Set = useQySet;
                        this.use_Jj_Set = useJjSet;
                        this.use_Ac_Set = 0;
                        this.use_Gw_Set = 0;
                        this.use_Hc_Set = 0;
                        this.use_Lc_Set = 0;
                        this.use_Bi_Set = 0;
                        this.use_Rs01_Set = 0;
                        this.use_Rs02_Set = 0;
                        this.use_Rs03_Set = 0;
                        this.use_Rs04_Set = 0;
                        this.use_Rs05_Set = 0;
                        this.use_Rs06_Set = 0;
                        this.use_Rs07_Set = 0;
                        this.use_Rs08_Set = 0;
                        this.use_Rs09_Set = 0;
                        this.use_Rs10_Set = 0;
                    }
                    return CompanyDto;
                }());
                model.CompanyDto = CompanyDto;
            })(model = service.model || (service.model = {}));
        })(service = aold.service || (aold.service = {}));
    })(aold = cmm001.aold || (cmm001.aold = {}));
})(cmm001 || (cmm001 = {}));
//# sourceMappingURL=cmm001.a.service.js.map