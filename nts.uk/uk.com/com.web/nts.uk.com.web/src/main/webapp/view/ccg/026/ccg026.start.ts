module nts.uk.com.view.ccg026 {
    import ROLE_TYPE = nts.uk.com.view.ccg026.component.ROLE_TYPE;
    import IPermision = nts.uk.com.view.ccg026.component.IPermision;

    class ViewModel {
        // role id
        roleId: KnockoutObservable<string> = ko.observable('');

        // role type | classification
        roleType: KnockoutObservable<ROLE_TYPE> = ko.observable(ROLE_TYPE.PERSONAL_INFO);

        lstRoleType: KnockoutObservableArray<any> = ko.observableArray([{
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

        constructor() {
            let self = this;
        }

        // event fire after change permision avaiable
        changeData = (data: Array<IPermision>) => {
            // code at here
        }
        
        permisions: KnockoutObservableArray<IPermision> = ko.observableArray([]);
    }

    __viewContext.ready(() => {
        __viewContext.bind(new ViewModel());
    });
}