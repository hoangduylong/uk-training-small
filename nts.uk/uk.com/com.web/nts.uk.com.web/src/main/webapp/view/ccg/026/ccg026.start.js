var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg026;
                (function (ccg026) {
                    var ROLE_TYPE = nts.uk.com.view.ccg026.component.ROLE_TYPE;
                    var ViewModel = /** @class */ (function () {
                        function ViewModel() {
                            // role id
                            this.roleId = ko.observable('');
                            // role type | classification
                            this.roleType = ko.observable(ROLE_TYPE.PERSONAL_INFO);
                            this.lstRoleType = ko.observableArray([{
                                    id: 0,
                                    nameJP: 'システム管理者',
                                    nameEN: 'System manager',
                                    avaiable: ''
                                }, {
                                    id: 1,
                                    nameJP: '会社管理者',
                                    nameEN: 'Company manager',
                                    avaiable: '⚪'
                                }, {
                                    id: 2,
                                    nameJP: 'グループ会社管理者',
                                    nameEN: 'Group company manager',
                                    avaiable: ''
                                }, {
                                    id: 3,
                                    nameJP: '就業',
                                    nameEN: 'Employment',
                                    avaiable: ''
                                }, {
                                    id: 4,
                                    nameJP: '給与',
                                    nameEN: 'Salary',
                                    avaiable: ''
                                }, {
                                    id: 5,
                                    nameJP: '人事 ',
                                    nameEN: 'Human resource',
                                    avaiable: ''
                                }, {
                                    id: 6,
                                    nameJP: 'オフィスヘルパー',
                                    nameEN: 'Office helper',
                                    avaiable: ''
                                }, {
                                    id: 7,
                                    nameJP: 'マイナンバー',
                                    nameEN: 'Self number',
                                    avaiable: ''
                                }, {
                                    id: 8,
                                    nameJP: '個人情報',
                                    nameEN: 'Personal Info',
                                    avaiable: '⚪'
                                }]);
                            // event fire after change permision avaiable
                            this.changeData = function (data) {
                                // code at here
                            };
                            this.permisions = ko.observableArray([]);
                            var self = this;
                        }
                        return ViewModel;
                    }());
                    __viewContext.ready(function () {
                        __viewContext.bind(new ViewModel());
                    });
                })(ccg026 = view.ccg026 || (view.ccg026 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg026.start.js.map