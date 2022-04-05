package nts.uk.ctx.sys.auth.dom.employee.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.time.GeneralDate;

@Getter
@AllArgsConstructor
public class JobTitleValueImport {

	/** The company id. */
	private String companyId;

	/** The position id. */
	private String positionId;

	/** The position code. */
	private String positionCode;

	/** The position name. */
	private String positionName;

	/** The sequence code. */
	private String sequenceCode;

	/** The start date. */
	private GeneralDate startDate;

	/** The end date. */
	private GeneralDate endDate;
	
	public boolean isGreaterThan(JobTitleValueImport compared) {
		return this.getSequenceCode().compareTo(compared.getSequenceCode()) > 0;
	}

}