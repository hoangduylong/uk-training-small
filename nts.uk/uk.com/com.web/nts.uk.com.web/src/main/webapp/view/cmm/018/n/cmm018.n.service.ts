module nts.uk.com.view.cmm018.n {
    export module service {
        let servicePath = {
            getRightList: 'workflow/approvermanagement/workroot/find/applicationType',
            saveAsExcel: "approval/report/employee",
            getConfirm: 'workflow/approvermanagement/workroot/find/confirmRootType'
        };

        export function getRightList() {
            return nts.uk.request.ajax('com', servicePath.getRightList);
        }

        export function getInforRoot(data: model.appInfor) {
            return nts.uk.request.ajax('com', servicePath.getInforRoot, data);
        }

        export function saveAsExcel(data: model.appInfor) {
            return request.exportFile(servicePath.saveAsExcel, data);
        }
        
        export function getConfirmName(){
            return nts.uk.request.ajax('com',servicePath.getConfirm);
        }
        
        export module model {
            export class appInfor {
                baseDate: any;
                lstEmpIds: Array<any>;
                lstApps: any;
                sysAtr: number;
                constructor(baseDate: any, lstEmpIds: Array<any>, lstApps: any, sysAtr: number) {
                    this.baseDate = baseDate;
                    this.lstEmpIds = lstEmpIds;
                    this.lstApps = lstApps;
                    this.sysAtr = sysAtr;
                }
            }
        }
    }
}
