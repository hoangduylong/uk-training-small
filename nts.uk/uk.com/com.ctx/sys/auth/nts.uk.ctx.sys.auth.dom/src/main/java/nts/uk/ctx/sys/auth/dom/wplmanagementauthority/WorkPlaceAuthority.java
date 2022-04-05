package nts.uk.ctx.sys.auth.dom.wplmanagementauthority;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
/**
 * class : 所属職場権限
 * @author tutk
 *
 */
@Getter
public class WorkPlaceAuthority extends AggregateRoot {
	/**
	 * ロールID
	 */
	private String roleId;
	/**
	 * 会社ID
	 */
	private String companyId;
	/**
	 * NO
	 */
	private DailyPerformanceFunctionNo functionNo;
	/**
	 * 利用できる
	 */
	private boolean availability;
	public WorkPlaceAuthority(String roleId, String companyId, DailyPerformanceFunctionNo functionNo,
			boolean availability) {
		super();
		this.roleId = roleId;
		this.companyId = companyId;
		this.functionNo = functionNo;
		this.availability = availability;
	}
	
	
}
