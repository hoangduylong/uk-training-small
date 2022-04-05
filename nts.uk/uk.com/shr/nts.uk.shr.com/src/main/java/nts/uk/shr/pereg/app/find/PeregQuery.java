package nts.uk.shr.pereg.app.find;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

@Getter
@Setter
@NoArgsConstructor
public class PeregQuery {
	
	// add new
	private String categoryId;

	private String categoryCode;

	private String employeeId;

	private String personId;

	private GeneralDate standardDate;

	private String infoId;
	
	public static PeregQuery createQueryLayout(String categoryCode, String employeeId, String personId,
			GeneralDate standardDate) {
		return new PeregQuery(categoryCode, employeeId, personId, standardDate);
	}
	
	public static PeregQuery createQueryCategory(String infoId, String categoryCode, String employeeId, String personId) {
		return new PeregQuery(infoId, categoryCode, employeeId, personId);
	}

	// layout case
	private PeregQuery(String categoryCode, String employeeId, String personId, GeneralDate standardDate) {
		this.categoryCode = categoryCode;
		this.employeeId = employeeId;
		this.personId = personId;
		this.standardDate = standardDate;
	}
	
	// category case
	public PeregQuery(String infoId, String categoryCode, String employeeId, String personId) {
		this.infoId = infoId;
		this.categoryCode = categoryCode;
		this.employeeId = employeeId;
		this.personId = personId;
	}
	
}
