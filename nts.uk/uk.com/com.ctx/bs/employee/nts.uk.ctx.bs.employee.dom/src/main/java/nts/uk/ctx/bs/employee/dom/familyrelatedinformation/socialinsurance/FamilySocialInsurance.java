package nts.uk.ctx.bs.employee.dom.familyrelatedinformation.socialinsurance;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FamilySocialInsurance extends AggregateRoot {

	/**
	 * 家族社会保険
	 */
	/** 家族メンバーID */
	private String familyMemberId;
	/**  社員ID*/
	private String sid;
	/** 家族社会保険ID */
	private String socailInsuaranceId;
	/** 開始日 */
	private GeneralDate startDate;
	/** 終了日 */
	private GeneralDate endDate;
	/** 介護社会保険適用 */
	private boolean nursingCare;
	/** 健康保険被扶養者区分 */
	private boolean healthInsuranceDependent;
	/** 国民年金第3号資格者*/
	private boolean nationalPensionNo3;
	/** 基礎年金番号*/
	private BasicPensionNumber basicPensionNumber;

	public static FamilySocialInsurance createFromJavaType(String familyMemberId, String sid, String socailInsuaranceId,
			GeneralDate startDate, GeneralDate endDate, boolean nursingCare, boolean healthInsuranceDependent,
			boolean nationalPensionNo3, String basicPensionNumber) {
		return new FamilySocialInsurance(familyMemberId, sid, socailInsuaranceId, startDate, endDate, nursingCare,
				healthInsuranceDependent, nationalPensionNo3, new BasicPensionNumber(basicPensionNumber));
	}

}
