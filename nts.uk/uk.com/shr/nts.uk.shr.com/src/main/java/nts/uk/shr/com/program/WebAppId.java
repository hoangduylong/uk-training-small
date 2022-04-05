package nts.uk.shr.com.program;

/**
 * @author manhnd
 * 
 * WebAppId
 */
public enum WebAppId {
	// Common
	COM("com"),
	// Payroll
	PR("pr"),
	// Attendance
	AT("at"),
	// mobile
	MOBI("mobile"),
	// hr
	HR("hr");
	
	public String name;
	WebAppId(String name) {
		this.name = name;
	}
	
	public String getContextName() {
		switch(this){
		case COM:
			return "nts.uk.com.web";
		case AT:
			return "nts.uk.at.web";
		case HR:
			return "nts.uk.hr.web";
		case MOBI:
			return "nts.uk.mobi.web";
		case PR:
			return "nts.uk.pr.web";
		default:
			return "";
		}
	}
}
