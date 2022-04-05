module nts.uk.com.view.cmf002.a.viewmodel {
    import block = nts.uk.ui.block;
    import alertError = nts.uk.ui.dialog.alertError;
    import jump = nts.uk.request.jump;

    export class ScreenModel {
        roleAuthority: any;

        constructor() {
            let self = this;
            self.setRoleAuthority([], []);
        }

        startPage(): JQueryPromise<any> {
            let self = this,
                dfd = $.Deferred();
            block.invisible();
            service.startMenu().done((data) => {
                self.setRoleAuthority(data.inChargeRole, data.empRole);
                block.clear();
                dfd.resolve();
            }).fail(err => {
                alertError(err);
                block.clear();
                dfd.reject();
            })
            return dfd.promise();
        }

        setRoleAuthority(inChargeRole, empRole): void {
            let self = this;
            self.roleAuthority = {
                inChargeRole: inChargeRole,
                empRole: empRole
            }
        }

        /**
         * request to create creation screen
         */
        importScreen(): void {
            let self = this;
            jump("/view/cmf/002/o/index.xhtml", {roleAuthority: self.roleAuthority});
        }

        /**
         * request to create creation screen
         */
        settingScreen(): void {
            let self = this;
            jump("/view/cmf/002/b/index.xhtml", {roleAuthority: self.roleAuthority});
        }

        /**
         * request to reference history screen
         */
        referenceHistoryScreen(): void {
            let self = this;
            jump("/view/cmf/002/x/index.xhtml", {roleAuthority: self.roleAuthority});
        }
    }
}