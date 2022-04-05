package nts.uk.ctx.sys.auth.app.command.wplmanagementauthority;

import lombok.Data;
import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.DailyPerformanceFunctionNo;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthority;

@Data
@NoArgsConstructor
public class CreateWorkPlaceAuthorityCmd {
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
	private int functionNo;
	/**
	 * 利用できる
	 */
	private boolean availability;
	public CreateWorkPlaceAuthorityCmd(String roleId, String companyId, int functionNo, boolean availability) {
		super();
		this.roleId = roleId;
		this.companyId = companyId;
		this.functionNo = functionNo;
		this.availability = availability;
	}
	
	public WorkPlaceAuthority toDomain() {
		return new WorkPlaceAuthority(
				this.roleId,
				this.companyId,
				new DailyPerformanceFunctionNo(this.functionNo),
				this.availability
				);
	}

}
