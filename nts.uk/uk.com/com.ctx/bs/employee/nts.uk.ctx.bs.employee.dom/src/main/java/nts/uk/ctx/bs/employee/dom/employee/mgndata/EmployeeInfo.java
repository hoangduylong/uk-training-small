package nts.uk.ctx.bs.employee.dom.employee.mgndata;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.arc.time.GeneralDate;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class EmployeeInfo {
	private String employeeCode;
	private String employeeName;
	private String personName;
	private String gender;
	private String pId;
	private String departmentCode;
	private String departmentName;
	private String position;
	private String contractCodeType;
	private GeneralDate birthday;
	private int numberOfWork;
	private int numberOfTempHist;
	private String hireDate;
}
