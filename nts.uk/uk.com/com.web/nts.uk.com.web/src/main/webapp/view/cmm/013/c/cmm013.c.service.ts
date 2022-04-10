module nts.uk.com.view.cmm013.b {

	import Position = base.Position;

	export module service {

		/**
	 	 * Service path
	 	 */
		let servicePath: any = {
			findAllPosition: "basic/training/position/find/all",
		}

		/**
         * getListPosition
         */
		export function findAllPosition(): JQueryPromise<Array<Position>> {
			return nts.uk.request.ajax(servicePath.findAllPosition);
		}
		
	}
}