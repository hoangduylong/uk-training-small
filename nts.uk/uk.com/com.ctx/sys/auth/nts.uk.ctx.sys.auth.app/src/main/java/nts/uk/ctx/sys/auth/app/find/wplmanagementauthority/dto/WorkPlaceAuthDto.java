package nts.uk.ctx.sys.auth.app.find.wplmanagementauthority.dto;

import lombok.Data;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.domservice.WorkPlaceAuthObject;

@Data
public class WorkPlaceAuthDto {
	
	private int functionNo;

	private String functionName;

	private boolean available;

	private String description;

	private int orderNumber;

	public WorkPlaceAuthDto(WorkPlaceAuthObject o) {
		this.functionNo = o.getFunctionNo().v();
		this.functionName = o.getDisplayName().v();
		this.available = o.isAvailable();
		this.description = o.getDescription().v();
		this.orderNumber = o.getOrderNumber();
	}
	
}
