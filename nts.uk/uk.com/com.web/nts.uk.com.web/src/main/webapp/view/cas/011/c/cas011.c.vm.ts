module nts.uk.com.view.cas011.c.viewmodel {
    import block = nts.uk.ui.block;
    import errors = nts.uk.ui.errors;
    import dialog = nts.uk.ui.dialog;
    import windows = nts.uk.ui.windows;
    import resource = nts.uk.resource;

    export class ScreenModel {
        listDefaultRoleSets: KnockoutObservableArray<IDefaultRoleSet> = ko.observableArray([]);
        currentDefaultRoleSet: KnockoutObservable<DefaultRoleSet> = ko.observable(new DefaultRoleSet({
                    roleSetCd: ''
                    , roleSetName: ''
                }));

        constructor() {
        }

        //initial screen
        start(): JQueryPromise<any> {
            
            let self = this,
                dfd = $.Deferred(),
                listDefaultRoleSets = self.listDefaultRoleSets,
            currentDefaultRoleSet: DefaultRoleSet = self.currentDefaultRoleSet();

            errors.clearAll();
            listDefaultRoleSets.removeAll();

            service.getAllRoleSet().done((itemList: Array<IDefaultRoleSet>) => {
                // in case number of RoleSet is greater then 0
                if (itemList && itemList.length > 0) {
                    listDefaultRoleSets(itemList);
                    self.settingSelectedDefaultRoleSet();
                    $('#combo-box').focus();
                }   
            }).always(() => {
                dfd.resolve();
            });
            return dfd.promise();
        }

        /**
         * Setting selected Default Role Set
         */
        settingSelectedDefaultRoleSet() {
            let self = this,
            currentDefaultRoleSet: DefaultRoleSet = self.currentDefaultRoleSet(),
            listDefaultRoleSets = self.listDefaultRoleSets;

            service.getCurrentDefaultRoleSet().done((item: IDefaultRoleSet) => {
                
                // in case exist default role set
                if (item) {
                    currentDefaultRoleSet.roleSetCd(item.roleSetCd);
                    currentDefaultRoleSet.roleSetName(item.roleSetName);
                } else {
                    if (listDefaultRoleSets && listDefaultRoleSets().length > 0) {
                        currentDefaultRoleSet.roleSetCd(listDefaultRoleSets()[0].roleSetCd);
                        currentDefaultRoleSet.roleSetName(listDefaultRoleSets()[0].roleSetName);
                    } else {
                        currentDefaultRoleSet.roleSetCd('');
                        currentDefaultRoleSet.roleSetName('');
                    }
                }

            }).fail(error => {
                currentDefaultRoleSet.roleSetCd('');
                currentDefaultRoleSet.roleSetName('');
            });
            
        }
        
        closeDialog() {
            nts.uk.ui.windows.close()
        }
        /**
         * Request to register Default Role Set
         */
        addDefaultRoleSet() {
            let self = this,
                currentDefaultRoleSet : DefaultRoleSet = self.currentDefaultRoleSet();

            service.addDefaultRoleSet(ko.toJS(currentDefaultRoleSet)).done(function() {
                  dialog.info({ messageId: "Msg_15" }).then(function() {
                        nts.uk.ui.windows.close();
                    });
            });
        }
    }

    // Default Role Set:
    interface IDefaultRoleSet {
        roleSetCd: string;
        roleSetName: string;
    }

    class DefaultRoleSet {
        roleSetCd: KnockoutObservable<string> = ko.observable('');
        roleSetName: KnockoutObservable<string> = ko.observable('');

        constructor(param: IDefaultRoleSet) {
            let self = this;
            self.roleSetCd(param.roleSetCd || '');
            self.roleSetName(param.roleSetName || '');
        }
    }
}
