package nts.uk.ctx.bs.person.pub.person;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.arc.time.GeneralDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FullPersonInfoExport {

	/** The Birthday */
	// 生年月日
	private GeneralDate birthDate;

	/** The BloodType */
	// 血液型
	private int bloodType;

	/** The Gender - 性別 */
	private int gender;

	/** The person id - 個人ID */
	private String personId;

	/** The PersonNameGroup - 個人名グループ */
	private PersonNameGroupExport personNameGroup;
}
