package nts.uk.ctx.bs.employee.pub.temporaryabsence.frame;

import lombok.Getter;

@Getter
public class TempAbsenceFrameDto {
	/** The company id. */
	// 会社ID
	private String companyId;
	
	/** The temp absence fr no. */
	//休職休業枠NO
	private int tempAbsenceFrNo;
	
	/** The use classification. */
	//使用区分
	private int useClassification;

	/** The temp absence fr name. */
	//休職休業枠名称
	private String tempAbsenceFrName;

	public TempAbsenceFrameDto(String companyId, int tempAbsenceFrNo, int useClassification, String tempAbsenceFrName) {
		super();
		this.companyId = companyId;
		this.tempAbsenceFrNo = tempAbsenceFrNo;
		this.useClassification = useClassification;
		this.tempAbsenceFrName = tempAbsenceFrName;
	}

}