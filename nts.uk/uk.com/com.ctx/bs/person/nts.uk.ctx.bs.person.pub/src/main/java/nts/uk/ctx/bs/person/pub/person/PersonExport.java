package nts.uk.ctx.bs.person.pub.person;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PersonExport {
	/** The Birthday */
	// 生年月日
	private GeneralDate birthDate;
	
	/** The Gender - 性別 */
	private int gender;
	
	/** The person id - 個人ID */
	private String personId;
	
	/** The PersonNameGroup - 個人名グループ*/
	private PersonNameGroupExport personNameGroup;
}
