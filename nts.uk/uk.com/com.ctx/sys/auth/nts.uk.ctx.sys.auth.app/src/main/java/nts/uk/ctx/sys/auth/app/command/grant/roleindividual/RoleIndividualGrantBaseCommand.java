package nts.uk.ctx.sys.auth.app.command.grant.roleindividual;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoleIndividualGrantBaseCommand {
	/** The user id. */
	// ユーザID
	protected String userID;

	/** The company id. */
	// 会社ID
	@Setter
	protected String companyID;

	/** The role type. */
	// ロール種類
	protected int roleType;

	/** The valid period. */
	// 有効期間
	protected GeneralDate startValidPeriod;
	
	protected GeneralDate endValidPeriod;
	
	//Screen C setting
	protected boolean setRoleAdminFlag;
	
	protected String decisionCompanyID;
	
}