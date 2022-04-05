package nts.uk.ctx.sys.auth.dom.wplmanagementauthority.domservice;

import lombok.Data;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.DailyPerformanceFunctionNo;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.FeatureDescriptionOfDailyPerformance;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.FeatureNameOfDailyPerformance;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthority;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceFunction;

@Data
public class WorkPlaceAuthObject {

	private DailyPerformanceFunctionNo functionNo;

	private FeatureNameOfDailyPerformance displayName;

	private boolean available;

	private FeatureDescriptionOfDailyPerformance description;

	private int orderNumber;

	public WorkPlaceAuthObject(WorkPlaceFunction function) {
		this.functionNo = function.getFunctionNo();
		this.displayName = function.getDisplayName();
		this.available = function.isInitialValue();
		this.description = function.getDescription();
		this.orderNumber = function.getDisplayOrder();
	}

	public WorkPlaceAuthObject(WorkPlaceFunction function, WorkPlaceAuthority auth) {
		this.functionNo = function.getFunctionNo();
		this.displayName = function.getDisplayName();
		this.available = auth.isAvailability();
		this.description = function.getDescription();
		this.orderNumber = function.getDisplayOrder();
	}

}
