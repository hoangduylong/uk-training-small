module ccg030.a.service {
    import model = nts.uk.com.view.ccg.model;
    var paths: any = {
        createFlowMenu: "sys/portal/flowmenu/create",
        fillAllFlowMenu: "sys/portal/flowmenu/findall",
        updateFlowMenu: "sys/portal/flowmenu/update",
        deleteFlowMenu: "sys/portal/flowmenu/delete",
        getFlowMenuById: "sys/portal/flowmenu/findbycode",
    }

    //add new flow menu
    export function createFlowMenu(flowMenu: model.FlowMenu) {
        return nts.uk.request.ajax("com", paths.createFlowMenu, flowMenu);
    }

    //fill all flow menu by companyId
    export function fillAllFlowMenu(): JQueryPromise<Array<model.FlowMenu>> {
        return nts.uk.request.ajax("com", paths.fillAllFlowMenu);
    }
    //update flowmenu
    export function updateFlowMenu(flowMenu: model.FlowMenu) {
        return nts.uk.request.ajax("com", paths.updateFlowMenu, flowMenu);
    }

    //fill by toppage part id
    export function getFlowMenuById(flowMenuID: string): JQueryPromise<Array<model.FlowMenu>> {
        return nts.uk.request.ajax("com", paths.getFlowMenuById, flowMenuID);
    }

    //delete flow menu
    export function deleteFlowMenu(flowMenuID: string) {
        var data = {
            toppagePartID: flowMenuID
        }
        return nts.uk.request.ajax("com", paths.deleteFlowMenu, data);
    }


}