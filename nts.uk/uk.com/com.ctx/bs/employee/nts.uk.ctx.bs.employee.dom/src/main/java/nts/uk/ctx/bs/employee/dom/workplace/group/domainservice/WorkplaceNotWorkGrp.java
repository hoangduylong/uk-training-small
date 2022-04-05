package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class WorkplaceNotWorkGrp {
	/** The workplace id. */
	//職場ID
	private String workplaceId;

	/** The workplace code. */
	//職場コード
	private String workplaceCode;

	/** The workplace name. */
	//職場名称
	private String workplaceName;

	/** The wkp generic name. */
	//職場総称
	private String wkpGenericName;

	/** The wkp display name. */
	//職場表示名
	private String wkpDisplayName;

	/** The outside wkp code. */
	//職場外部コード
	private String outsideWkpCode;
}
