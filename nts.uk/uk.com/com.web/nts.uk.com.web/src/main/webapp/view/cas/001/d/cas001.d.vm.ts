    // blockui all ajax request on layout
    $(document)
        .ajaxStart(() => {
            $.blockUI({
                message: null,
                overlayCSS: { opacity: 0.1 }
            });
        }).ajaxStop(() => {
            $.unblockUI();
        });


module nts.uk.com.view.cas001.d.viewmodel {
    import close = nts.uk.ui.windows.close;
    import errors = nts.uk.ui.errors;
    import resource = nts.uk.resource;
    import alert = nts.uk.ui.dialog.alert;
    import getShared = nts.uk.ui.windows.getShared;
    import setShared = nts.uk.ui.windows.setShared;
    import block = nts.uk.ui.block;
    export class ScreenModel {
        categoryList: KnockoutObservableArray<CategoryAuth> = ko.observableArray([]);
        currentRoleCode: KnockoutObservable<string> = ko.observable('');
        currentRole: KnockoutObservable<PersonRole> = ko.observable(getShared('personRole'));
        isCanceled: boolean;
        selectedList:  KnockoutObservable<any>  = ko.observableArray([]);;

        constructor() {
            var self = this;
//            self.start();
        }

        start(): JQueryPromise<any> {
            
            let self = this,
                dfd = $.Deferred(),
                role: IPersonRole = ko.toJS(self.currentRole);
            block.grayout();
            self.categoryList.removeAll();
            service.getAllCategory(role.roleId).done(function(data: Array<any>) {
                if (data.length > 0) {
                    self.categoryList(_.map(data, x => new CategoryAuth({
                        categoryId: x.categoryId,
                        categoryCode: x.categoryCode,
                        categoryName: x.categoryName,
                        selfAuth: !!x.allowPersonRef,
                        otherAuth: !!x.allowOtherRef
                    })));
                    dfd.resolve();
                }
            }).always(() => {
                   block.clear(); 
            });
            return dfd.promise();
        }

        creatCategory() {
            let self = this,
                role: IPersonRole = ko.toJS(self.currentRole),
                category: Array<any> = $("#grid").igGrid("option","dataSource");
            self.update(category, role.roleId);

        }

        closeDialog() {
            let self = this;
            self.isCanceled = true;
            setShared('isCanceled', self.isCanceled);
            close();
        }

        update(items: Array<CategoryAuth>, roleId: string) {
            let self = this,
                data: Array<ICategoryAuth> = _.uniqBy(items, 'categoryId'),
                datas: Array<any> = _(data)
                    .map((x: ICategoryAuth) => {
                        return {
                            roleId: roleId,
                            categoryId: x.categoryId,
                            allowPersonRef: Number(x.selfAuth),
                            allowOtherRef: Number(x.otherAuth)
                        };
                    })
                    .value();
            service.updateCategory({ lstCategory: datas }).done(function(data) {
                nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function() {
                    close();
                });
            }).fail(function(res) {
                alert(res.message);
            })

            self.isCanceled = false;
            setShared('isCanceled', self.isCanceled);
        }

    }

    interface IPersonRole {
        roleId: string;
        roleCode: string;
        roleName: string;
    }

    export class PersonRole {
        roleId: string;
        roleCode: string;
        roleName: string;

        constructor(params: IPersonRole) {
            this.roleId = params.roleId;
            this.roleCode = params.roleCode;
            this.roleName = params.roleName;
        }
    }

    interface ICategoryAuth {
        categoryId: string;
        categoryCode: string;
        categoryName: string;
        selfAuth?: boolean;
        otherAuth?: boolean;
    }

    class CategoryAuth {
        categoryId: string;
        categoryCode: string;
        categoryName: string;
        selfAuth: boolean;
        otherAuth: boolean;
        constructor(param: ICategoryAuth) {
            this.categoryId = param.categoryId;
            this.categoryCode = param.categoryCode;
            this.categoryName = param.categoryName;
            this.selfAuth = param.selfAuth;
            this.otherAuth = param.otherAuth;
        }
    }
}