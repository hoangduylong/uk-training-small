module nts.uk.com.view.cmm013.f {

	import Position = base.Position;

	export module service {

		// Service path
		let servicePath: any = {
			findAllPosition: "basic/training/position/findAll",
			findByPositionCode: "basic/training/position/findByPositionCode",
			addPosition: "basic/training/position/add",
			removePosition: "basic/training/position/remove",
			updatePosition: "basic/training/position/update",
			updateOrder: "basic/training/position/updateOrder",
		}

		// findAllPosition
		export function findAllPosition(): JQueryPromise<Array<Position>> {
			return nts.uk.request.ajax(servicePath.findAllPosition);
		}

		// findByPositionCode
		export function findByPositionCode(positionCode: String): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.findByPositionCode, { positionCode: positionCode });
		}

		// addPosition
		export function addPosition(position: Position): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.addPosition, { Position: position });
		}

		// removePosition
		export function removePosition(positionCode: String): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.addPosition, { positionCode: positionCode });
		}

		// updatePosition
		export function updatePosition(position: Position): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.addPosition, { Position: position });
		}

		// update order
		export function updateOrder(positionList: Array<Position>): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.updateOrder, { positionList: positionList });
		}

	}
}