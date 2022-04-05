package nts.uk.shr.pereg.app.command;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmployeeInputContainer {
	
	private String personId;
	//対象者
	private String employeeId;
	//対象者社員CD
	private String employeeCd;
	//対象者氏名
	private String employeeName;
	
	private int order;
	//item lst
	private ItemsByCategory input; 
}
