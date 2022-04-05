package nts.uk.ctx.bs.employee.pub.employmentstatus;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum EmploymentState {
	
	//在職
	INCUMBENT(1), 
	//休職
	LEAVE_OF_ABSENCE(2), 
	//休業
	CLOSURE(3), 
	//入社前
	BEFORE_JOINING(4), 
	//出向中
	ON_LOAN(5), 
	//退職
	RETIREMENT(6);
	
	public final int value;
	
}
