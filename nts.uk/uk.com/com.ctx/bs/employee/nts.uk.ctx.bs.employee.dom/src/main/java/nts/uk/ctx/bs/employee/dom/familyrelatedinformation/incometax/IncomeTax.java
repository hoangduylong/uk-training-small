package nts.uk.ctx.bs.employee.dom.familyrelatedinformation.incometax;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class IncomeTax extends AggregateRoot {

	/**
	 * domain: 家族所得税
	 */
	/** 所得税ID */
	private String IncomeTaxID;
	/** 家族メンバーID */
	private String familyMemberId;
	/** 社員ID */
	private String sid;
	/** 期間 */
	private DatePeriod period;
	/** 扶養者区分 */
	private boolean supporter;
	/** 障害区分*/
	private DisabilityType disabilityType;
	/** 控除対象区分*/
	private DeductionTargetType deductionTargetType;

	public static IncomeTax createFromJavaType(String IncomeTaxID, String familyMemberId, String sid,
			GeneralDate startDate, GeneralDate endDate, boolean supporter, int disabilityType,
			int deductionTargetType) {
		return new IncomeTax(IncomeTaxID, familyMemberId, sid, new DatePeriod(startDate, endDate), supporter,
				EnumAdaptor.valueOf(disabilityType, DisabilityType.class),
				EnumAdaptor.valueOf(deductionTargetType, DeductionTargetType.class));

	}

}
