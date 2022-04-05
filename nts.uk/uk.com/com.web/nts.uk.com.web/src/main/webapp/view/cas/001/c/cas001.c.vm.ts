module nts.uk.com.view.cas001.c.viewmodel {
    import error = nts.uk.ui.errors;
    import text = nts.uk.resource.getText;
    import close = nts.uk.ui.windows.close;
    import dialog = nts.uk.ui.dialog;
    import getShared = nts.uk.ui.windows.getShared;
    import setShared = nts.uk.ui.windows.setShared;
    import block = nts.uk.ui.block;
    export class ScreenModel {
        roleList: KnockoutObservableArray<any> = ko.observableArray([]);
        roleCodeArray = [];
        roleCopy: KnockoutObservable<any> = ko.observable(getShared('currentRole'));
        isCanceled: boolean;

        constructor() {
            var self = this;

            self.roleList.subscribe(data => {
                if (data) {
                    $("#roles").igGrid("option", "dataSource", data);
                } else {
                    $("#roles").igGrid("option", "dataSource", []);
                }
            });

            self.start();
        }

        start() {
            let self = this;
            self.roleList.removeAll();

            if (self.roleCopy().roleList.length > 0) {
                _.each(self.roleCopy().roleList, function(c) {
                    if (c.roleId !== self.roleCopy().personRole.roleId) {
                        self.roleList.push(new PersonRole(c.roleId, c.roleCode, c.roleName));
                    }
                });
            } else {
                dialog.alert(text('CAS001_7'));
            }
        }

        createCategory() {
            let self = this,
                data: Array<any> = $("#grid0").ntsGrid("updatedCells"),
                objSet: any = { isCancel: true, id: null };
            self.roleCodeArray = _.map(data, (x) => { return x.rowId;});
            if (self.roleCodeArray.length > 0) {
                dialog.confirm({ messageId: "Msg_64" }).ifYes(() => {
                    let roleObj = { roleIdDestination: self.roleCopy().personRole.roleId, roleIds: self.roleCodeArray };
                    block.invisible();
                    service.update(roleObj).done(function(obj) {
                        dialog.info({ messageId: "Msg_926" }).then(function() {
                            objSet.id = self.roleCodeArray[0];
                            objSet.isCancel = false;
                            setShared('isCanceled', objSet);
                            close();
                        });
                    }).fail(function(res: any) {
                        dialog.alert(res.message);
                    }).always(() => {
                        block.clear();
                    });

                }).ifCancel(function() {
                })
            } else {
                dialog.alert({ messageId: "Msg_365" });

            }

                objSet.isCancel = false;
                setShared('isCanceled', objSet);
        }

        closeDialog() {
            let self = this,
                objSet: any = {};
            objSet.isCancel = true;
            setShared('isCanceled', objSet);
            close();
        }
    }

    export class PersonRole {
        check: boolean = false;
        roleId: string;
        roleCode: string;
        roleName: string;
        constructor(roleId: string, roleCode: string, roleName: string) {
            this.roleId = roleId;
            this.roleCode = roleCode;
            this.roleName = roleName;
        }
    }
}