module nts.uk.com.view.cmm013.c2 {
    import Position = base.Position;

    export module service {

        // Service path
        let servicePath: any = {
            findAllPosition: "basic/training/position/findAll",
        }

        // findAllPosition
        export function findAllPosition(): JQueryPromise<Array<Position>> {
            return nts.uk.request.ajax(servicePath.findAllPosition);
        }
    }
}
