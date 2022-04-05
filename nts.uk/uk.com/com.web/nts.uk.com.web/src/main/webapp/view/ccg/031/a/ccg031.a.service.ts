module nts.uk.com.view.ccg031.a.service {
    import model = nts.uk.com.view.ccg.model;

    var paths = {
        active: "sys/portal/layout/active",
        registry: "sys/portal/layout/registry",
        findByID: "sys/portal/topagepart/findPlacementPartByID"
    }

    export function active(layoutID: string): JQueryPromise<model.LayoutDto> {
        if (nts.uk.text.isNullOrEmpty(layoutID))
            return nts.uk.request.ajax("com", paths.active);
        else
            return nts.uk.request.ajax("com", paths.active, layoutID);
    }

    export function registry(parentCode: string, layoutID: string, pgType: number, placements: Array<model.Placement>): JQueryPromise<string> {
        var data = {
            portalLayoutCommand: {
                parentCode: parentCode,
                layoutID: layoutID,
                pgType: pgType
            },
            listPortalPlacementCommand: ko.mapping.toJS(placements)
        };
        return nts.uk.request.ajax("com", paths.registry, data, { dataType: 'text' });
    }

    export function findPlacementPart(topPagePartID: string): JQueryPromise<model.PlacementPartDto> {
        return nts.uk.request.ajax("com", paths.findByID + "/" + topPagePartID);
    }

}