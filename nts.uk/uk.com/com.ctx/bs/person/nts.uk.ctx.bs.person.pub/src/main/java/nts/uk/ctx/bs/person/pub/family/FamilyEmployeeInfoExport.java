package nts.uk.ctx.bs.person.pub.family;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

/**
 * [RQ682]社員IDが一致する家族情報を取得
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FamilyEmployeeInfoExport {

	// 家族ID
	private String familyMemberId;

	// 生年月日
	private GeneralDate birthday;

	// 死亡年月日
	private  Optional<GeneralDate> deadDay;
}
