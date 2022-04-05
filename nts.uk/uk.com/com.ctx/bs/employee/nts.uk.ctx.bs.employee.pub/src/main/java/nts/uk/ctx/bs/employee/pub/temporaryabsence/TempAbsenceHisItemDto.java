package nts.uk.ctx.bs.employee.pub.temporaryabsence;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 
 * @author HieuLt
 *
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class TempAbsenceHisItemDto {
	//休職休業枠NO
	private int tempAbsenceFrNo;
	//履歴ID
	private String historyId;
	//社員ID
	private String employeeId;
	//備考
	private String remarks;
	//社会保険支給対象区分
	private Integer soInsPayCategory;
	//家族メンバーId
	private String familyMemberId;
	
	
	
	

}
