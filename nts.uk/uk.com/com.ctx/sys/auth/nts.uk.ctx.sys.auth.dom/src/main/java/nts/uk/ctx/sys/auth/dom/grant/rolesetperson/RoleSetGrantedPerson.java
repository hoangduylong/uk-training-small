package nts.uk.ctx.sys.auth.dom.grant.rolesetperson;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.sys.auth.dom.roleset.RoleSetCode;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * 
 * @author HungTT - ロールセット個人別付与
 *
 */

@Getter
public class RoleSetGrantedPerson extends AggregateRoot {

	// ロールセットコード.
	private RoleSetCode roleSetCd;

	// 会社ID
	private String companyId;

	// 有効期間
	private DatePeriod validPeriod;

	// 社員ID
	private String employeeID;

	public RoleSetGrantedPerson(String roleSetCd, String companyId, GeneralDate startDate, GeneralDate endDate, String employeeID) {
		super();
		this.roleSetCd = new RoleSetCode(roleSetCd);
		this.companyId = companyId;
		this.validPeriod = new DatePeriod(startDate, endDate);
		this.employeeID = employeeID;
	}
	
	

}
