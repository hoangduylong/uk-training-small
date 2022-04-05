package nts.uk.ctx.sys.auth.pub.grant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.calendar.period.DatePeriod;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoleIndividualGrantEx {

	/** The user id. */
	// ユーザID
	private String userId;

	/** The role id. */
	// ロールID
	private String roleId;

	/** The company id. */
	// 会社ID
	private String companyId;

	/** The role type. */
	// ロール種類
	private int roleType;

	/** The valid period. */
	// 有効期間
	private DatePeriod validPeriod;

}
