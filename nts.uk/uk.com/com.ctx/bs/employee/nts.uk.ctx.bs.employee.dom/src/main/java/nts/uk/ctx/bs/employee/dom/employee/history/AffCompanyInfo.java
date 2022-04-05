package nts.uk.ctx.bs.employee.dom.employee.history;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
/** 所属会社情報 */
public class AffCompanyInfo extends AggregateRoot {
	/** 社員ID */
	private String sid;
	
	/** 履歴ID */
	private String historyId;

	/** 採用区分 */
	private RecruitmentClassification recruitmentClassification;

	/** 本採用年月日 */
	private GeneralDate adoptionDate;

	/** 退職金計算開始日 */
	private GeneralDate retirementAllowanceCalcStartDate;

	public static AffCompanyInfo createFromJavaType(String sid,String histId, String recruitmentCategoryCode,
			GeneralDate adoptionDate, GeneralDate retirementAllowanceCalcStartDate) {
		return new AffCompanyInfo(sid, histId, new RecruitmentClassification(recruitmentCategoryCode), adoptionDate,
				retirementAllowanceCalcStartDate);
	}
}
