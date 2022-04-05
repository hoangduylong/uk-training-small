package nts.uk.ctx.sys.auth.pubimp.employee;

import lombok.Data;

@Data
public class EmployeeMap {
	
	public String wplID;
	public String empID;

	public EmployeeMap(String wplID, String empID) {
		super();
		this.wplID = wplID;
		this.empID = empID;
	}
}
